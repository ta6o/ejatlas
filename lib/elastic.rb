
Admin.helpers do

  def self.elasticify obj, depth=0
    #puts
    #puts "#{depth.to_s.rjust(3).yellow}#{"  " * depth} #{obj.to_s.cyan}"
    if obj.nil?
      {}
    elsif obj.is_a? String
      begin 
        Float(obj).to_i
      rescue
        obj
      end
    elsif obj.is_a? Array
      if obj.map(&:class).uniq == [Hash]
        keys = obj.map(&:keys).flatten.uniq
        if keys.include?("term") and keys.include?("bool")
          b = []
          t = []
          obj.each do |i|
            if i.keys.first == "term"
              t << {"should"=>i}
            elsif i.keys.first == "bool"
              b << {"bool"=>[i.values.first].flatten}
            end
          end
          t.each do |i|
            b.first["bool"] << i
          end
          obj = b
        end
      end
      obj.map!{|item| Admin.elasticify item, depth+1}
      obj = obj.first if obj.length == 1
      obj
    elsif obj.is_a? Hash
      terms = {}
      coc = nil
      range = nil
      obj.each do |key,val|
        if val.is_a? String and val.length == 0 and key == "must"
          obj[key] = {}
        elsif val.is_a? Array
          if key == 'bool'
            bool = []
            obj['bool'].each do |arr|
              arr.each do |k,v| bool << {"bool"=>{k=>v}} end
            end
            bool.delete_if {|k,v| v == []}
            obj = bool
          elsif key == 'term'
            val.each do |it|
              terms[it.keys.first] = [] unless terms.has_key? it.keys.first
              terms[it.keys.first] << it.values.first
            end
            obj.delete('term')
          end
        elsif val.is_a? Hash 
          if obj.values.map(&:class).include?(Array)
          end
          if val.has_key?('bool') and key != 'filter'
            arr = []
            val.each do |k,v|
              arr << {k => v}
            end
            obj[key] = arr
          elsif key == "term" and val.keys.first == "country_of_company"
            a = []
            Country.where(:id => val.values.first).each do |c|
              a = a | c.companies.map(&:id)
            end
            coc = {'companies'=>a}
            obj.delete('term')
          elsif key == "term" and val.values.first.is_a? String and val.values.first.match(/\d+:\d+/)
            k = val.keys.first
            if k.match(/_datestamp$/)
              r = val.values.first.split(':').map{|i| i.to_i}
              r[0] = Date.new(r[0])
              r[1] = Date.new(r[1]+1) - 1.days
            else
              r = val.values.first.split(':').map{|i| i.to_i}
            end
            range = {k=>{"gte"=>r[0],"lte"=>r[1]}}
            obj.delete('term')
          end
        end
      end

      obj['range'] = range if range
      if terms == {}
        obj['terms'] = coc if coc
        if obj.is_a?(Hash)
          obj.merge(obj){|k,v| Admin.elasticify(v, depth+1)}
        else
          obj.map{|v| Admin.elasticify(v, depth+1)}
        end
      else
        val = []
        obj.each do |k,v|
          val << {k=>v}
        end
        terms.each do |k,v| 
          #puts "#{k.to_s.magenta}, #{v}"
          if k =='country_of_company'
            a = []
            Country.find(v).each do |c|
              a = a | c.companies.map(&:id)
            end
            val << {'terms'=>{'companies'=>a}}
          else
            if v.length == 1
              val << {'term'=>{k=>v[0]}}
            else
              val << {'terms'=>{k=>v}}
            end
          end
        end
        val.map{|item| Admin.elasticify item, depth+1}
      end
    else
      obj
    end
  end

  def self.cleanup obj
    if obj.is_a? Array
      if obj.length == 1 and obj.first.is_a?(Hash) and obj.first.keys.length == 1 and obj.first.keys.first == "bool" and obj.first["bool"].values.any?{|x| x.length > 1 and x.all?{|y| y.is_a? Array}}
        obje = []
        obj[0]["bool"].each do |k,v|
          if v.length == 1 or not v.all?{|x| x.is_a?(Array)}
            v.each do |x|
              obje << {"bool"=>{k=>x}}
            end
          else
            v.each do |x|
              obje << {"bool"=>{k=>x}}
            end
          end
        end
        obj = obje
      end
      arr = []
      obj.each do |item|
        if item.is_a? Array
          item.each {|i| arr << i}
        else
          arr << item
        end
      end
      arr.map {|item| Admin.cleanup item }
    elsif obj.is_a? Hash
      obj.merge( obj ) {|k, val| Admin.cleanup val }
    else
      obj
    end
  end

  def self.filter filter, locale=:en,  all_if_empty=true, stored_fields=[], approved=true, type="conflict", sort="id", order="asc", count_only=false
    if ["help",:help].include? filter
      puts "Admin.filter #{'filter'.magenta} => Hash, #{'all_if_empty'.cyan} => Bool(true), #{'stored_fields'.cyan} => Array([]), #{'approved'} => Bool(true), #{'type'.cyan} => String('conflict'), #{'sort'.cyan} => String('id'), #{'order'.cyan} => String('asc'), #{'count_only'.cyan} => Bool(false)"
      return
    end
    return [] if !all_if_empty and ["{}","",nil].include?(filter)
    if stored_fields == []
      source = false
    else
      source = {"includes"=>stored_fields}
    end
    if filter.is_a? String
      filter = JSON.parse(filter,:symbolize_keys => true)
    end
    #puts JSON.pretty_generate(filter).green
    begin
      if type == "conflict"
        if approved
          filter = Admin.elasticify( { bool: { must: { term: { approval_status: "approved" }}, filter: { bool: filter }}} )
        else
          filter = Admin.elasticify( { bool: { filter: { bool: filter }}} )
        end
        #puts JSON.pretty_generate(filter).yellow
        if count_only
          result = $client.count(index:"#{$esindex}_#{locale}", body: {"query"=>filter})["count"]
        else
          result = $client.search(index:"#{$esindex}_#{locale}", body: {"from"=>0,"size"=>Conflict.count,"_source":source,"query"=>filter,"sort"=>{sort=>{"order"=>order}}})["hits"]["hits"]
        end
      elsif "account,company,country,financial_institution,tag".split(",").include?(type)
        filter = Admin.elasticify( { bool: { must: { match: { type: type }}, filter: { bool: filter }}} )
        filter = Admin.cleanup(filter)
        if count_only
          result = $client.count(index: $esindex, body: {"query"=>filter})["count"]
        else
          result = $client.search(index: $esindex, body: {"from"=>0,"size"=>Conflict.count,"_source":source,"query"=>filter,"sort"=>{sort=>{"order"=>order}}})["hits"]["hits"]
        end
      end
    rescue => e
      puts e.to_s.red
      []
    end
    #puts result.length.to_s.green
    #result
  end


  def self.filter_recent offset=0, query={}, order="modified_at", size=6, global=false
    #puts JSON.pretty_generate(query).magenta
    if query.length > 0
      filter = Admin.elasticify( { bool: { must: { term: { approval_status: "approved" }}, filter: { bool: JSON.parse(query.to_json) }}} )
    elsif I18n.locale == :en or global
      filter = Admin.elasticify( { bool: { must:   { term: { approval_status: "approved" }}, must_not: { term: { headline: "" }}, filter: {exists: { field: "headline"}, }}} )
    else
      filter = Admin.elasticify( { bool: { must:   { term: { approval_status: "approved" }}}} )
    end
    #Admin.color_pp(filter)
    #puts JSON.pretty_generate(filter).yellow
    begin
      result = $client.search(index: "#{$esindex}_#{global ? :en : I18n.locale}", body: {sort:{order=>{order:"desc"}},from:offset,size:size,"_source":{includes:[:id,:name,:slug,:headline,:modified_at]},query:filter})["hits"]["hits"].map{|x| x["_source"]}
    rescue => e
      p filter.values.first.values.last
      puts e.to_s.red
      result = []
    end
    #pp result
    result
  end


  def self.get_elastic id
    begin
      return $client.get(index:"atlas_en", id:id)["found"]
    rescue
      return false
    end
  end

end
