class AsyncTask
  def odsexport params
    puts require 'rodf'
    limit = params.delete("limit").to_i
    order = params.delete("order")
    ascdsc = params.delete("ascdsc")
    if params.has_key?("idset")
      stack = Conflict.order("#{order} #{ascdsc}").find(params["idset"])
    else
      stack = Conflict.order("#{order} #{ascdsc}").select{|c| params.keys.include? c.approval_status}
    end
    stack = stack[0..(limit-1)] if limit > 0
    puts "#{stack.length} cases to be exported."
    #return stack.map(&:name).to_s
    mania = {Type=>[],Product=>[],ConflictEvent=>[],ConflictEvent=>[],MobilizingGroup=>[],MobilizingForm=>[]}
    imps = {EnvImpact=>[],HltImpact=>[],SecImpact=>[]}
    actors = {Company=>{},Supporter=>{},:ids=>[]}
    numfields = []
    lines = []
    header = []
    stack.each_with_index do |conf,index|
      nfields = 0
      line = []
      #puts "#{conf.id} #{conf.name}"
      print "\r #{(index/stack.length.to_f*100).to_i}% done."
      conf.attributes.each do |k,v|
        next if ["json","table","marker",'licence','ready','affected_min','affected_max'].include? k
        if k.to_s[-3..-1] == "_id" and !["reaction_id","status_id","population_type","accuracy_level","other_supporters"].include? k
          begin
            ass = eval "conf."+k.to_s[0...-3]
          rescue
            next
          end
          header << k.to_s[0...-3].gsub("_"," ").titlecase if index == 0
          if ass.nil?
            line << ""
          elsif ass.name
            line << ass.name
          else
            line << ass.attributes
          end
        elsif k == "reaction_id"
          header << "When did the mobilization begin" if index == 0
          if v
            line << Reaction.find(v).name
          else
            line << ""
          end
        elsif k == "status_id"
          header << "Intensity of Conflict" if index == 0
          if v
            line << Status.find(v).name
          else
            line << ""
          end
        elsif k == "population_type"
          header << "Type of Population" if index == 0
          if v
            line << ['Unknown','Urban','Semi-urban','Rural'][v]
          else
            line << ""
          end
        elsif k == "accuracy_level"
          header << "Accuracy of location" if index == 0
          if v
            line << ['','LOW country/state level','MEDIUM regional level','HIGH local level'][v]
          else
            line << ""
          end
        else
          header << k.to_s.gsub("_"," ").titlecase if index == 0
          line << v.to_s
        end
        nfields += 1
      end
      mania.each do |many, val|
        va = [conf.id]
        header << "#{many.to_s}" if index == 0
        at = []
        many.order(:id).each do |m|
          if m.conflicts.include? conf
            at << m.name
            va << "1"
          else
            va << "0"
          end
        end
        val << va
        line << at.join(":::")
        nfields += 1
      end
      [Company,Supporter].each do |mod|
        rel = mod.to_s.downcase
        if mod == Company
          rels = conf.companies
        else
          rels = conf.supporters
        end
        header << rel.titlecase if index == 0
        lin = ""
        rels.each do |m|
          acr = m.acronym and m.acronym.length > 0 ? " [#{m.acronym}]" : ""
          cnt = m.country ? " (#{m.country.name})" : ""
          if mod == Company
            cm = eval("m.c_companies.find_by_conflict_id(#{conf.id})")
          else
            cm = eval("m.c_supporters.find_by_conflict_id(#{conf.id})")
          end
          inv = cm.involvement and cm.involvement.length > 0 ? ":#{cm.involvement}" : ""
          lin += "#{m.name}#{acr}#{cnt}#{inv}\n"
          unless actors[mod].has_key? m.id
            actors[mod][m.id] = { :attrs => [m.id, m.name, m.slug, m.description, m.url, m.acronym, m.country ? m.country.name : nil],
                                  :invs => {}} 
          end
          inv = cm.involvement and cm.involvement.length > 0 ? cm.involvement : "-"
          actors[mod][m.id][:invs][conf.id] = inv
        end
        line << lin
        nfields += 1
      end
      imps.each do |imp,val|
        va = [conf.id]
        header << imp.to_s if index == 0
        at = []
        imp.order(:id).each do |m|
          if m.conflicts.include? conf
            cm = eval("m.c_#{imp.to_s.gsub('Impact','').downcase}_impacts.find_by_conflict_id(#{conf.id})")
            if cm.visible
              at << "#{m.name} (V)"
              va << "V"
            else
              at << "#{m.name} (P)"
              va << "P"
            end
          else
            va << ""
          end
        end
        val << va
        line << at.join(":::")
        nfields += 1
      end
      ['references','legislations','weblinks','medialinks'].each do |rel|
        #puts 
        rels = eval("conf.#{rel}")
        header << rel.titlecase if index == 0
        at = "#{rel.titlecase} "
        lin = ""
        rels.each do |m|
          dsc = m.description ? "#{m.description}\n" : ""
          url = m.url ? "#{m.url}\n" : ""
          at += "#{dsc}#{url}\n"
          lin += "#{dsc}#{url}\n"
        end
        #puts at
        line << lin
        nfields += 1
      end
      ['documents','images'].each do |rel|
        #puts 
        rels = eval("conf.#{rel}")
        header << rel.titlecase if index == 0
        at = "#{rel.titlecase} "
        lin = ""
        rels.each do |m|
          ttl = m.title ? "#{m.title}\n" : ""
          dsc = m.description ? "#{m.description}\n" : ""
          url = m.file.url ? "#{m.file.url}\n" : ""
          at += "#{ttl}#{dsc}#{url}\n"
          lin += "#{ttl}#{dsc}#{url}\n"
        end
        #puts at
        line << lin
        nfields += 1
      end
      actors[:ids] << conf.id
      numfields << nfields
      lines << line
      #puts
    end
    Dir.mkdir "/tmp/export" unless File.directory? "/tmp/export"
    tata = Time.now
    odsname = "#{$filedir}/../exports/ejatlas-export-#{tata.strftime('%Y-%m-%d-%H%M')}.ods"
    RODF::Spreadsheet.file(odsname) do
      table 'conflicts' do
        row do
          header.each {|x| cell x }
        end
        lines.each do |line|
          row do
            line.each {|x| cell x }
          end
        end
      end
      mania.each do |many,lines|
        header = ["id"]
        many.order(:id).each {|h| header << h.name}
        table many.to_s.downcase do
          row do
            header.each {|x| cell x }
          end
          lines.each do |line|
            row do
              line.each {|x| cell x }
            end
          end
        end
      end
      imps.each do |many,lines|
        header = ["id"]
        many.order(:id).each {|h| header << h.name}
        table many.to_s.downcase do
          row do
            header.each {|x| cell x }
          end
          lines.each do |line|
            row do
              line.each {|x| cell x }
            end
          end
        end
      end
      actors.each do |many,lines|
        next if many == :ids
        header = ["id", "name", "slug", "description", "url", "acronym", "country"]
        actors[:ids].uniq.each {|c| header << c}
        table many.to_s.downcase do
          row do
            header.each {|x| cell x }
          end
          lines.each do |line|
            row do
              line.each {|x| cell x }
            end
          end
        end
=begin
        ::CSV.open("/tmp/export/#{many.to_s.downcase}s.csv","w") do |output|
          output << header
          lines.each do |id, comp|
            line = comp[:attrs]
            step = 7
            pp comp[:invs]
            comp[:invs].each do |conf, inv|
              (header.index(conf)-step).times { line << nil }
              inv ||= '-'
              line << inv
              step = header.index(conf)
            end
            output << line
          end
        end
        csvs << "ejatlas-export-#{tata.strftime('%Y-%m-%d-%H%M')}/#{many.to_s.downcase}s.csv"
=end
      end
    end
    puts "Done."
    GC.start
  end
  handle_asynchronously :odsexport

  def csvexport params
    require 'csv'
    limit = params.delete("limit").to_i
    order = params.delete("order")
    ascdsc = params.delete("ascdsc")
    if params.has_key?("idset")
      stack = Conflict.order("#{order} #{ascdsc}").find(params["idset"])
    else
      stack = Conflict.order("#{order} #{ascdsc}").select{|c| params.keys.include? c.approval_status}
    end
    puts "#{stack.length} cases to be exported."
    puts ::CSV
    if limit > 0
      stack = stack[0..(limit-1)]
    end
    #return stack.map(&:name).to_s
    mania = {Type=>[],Product=>[],ConflictEvent=>[],ConflictEvent=>[],MobilizingGroup=>[],MobilizingForm=>[]}
    imps = {EnvImpact=>[],HltImpact=>[],SecImpact=>[]}
    actors = {Company=>{},Supporter=>{},:ids=>[]}
    numfields = []
    lines = []
    header = []
    stack.each_with_index do |conf,index|
      nfields = 0
      line = []
      #puts "#{conf.id} #{conf.name}"
      print "\r #{(index/stack.length.to_f*100).to_i}% done."
      conf.attributes.each do |k,v|
        next if ["json","table","marker",'licence','ready','affected_min','affected_max'].include? k
        if k.to_s[-3..-1] == "_id" and !["reaction_id","status_id","population_type","accuracy_level","other_supporters"].include? k
          begin
            ass = eval "conf."+k.to_s[0...-3]
          rescue
            next
          end
          header << k.to_s[0...-3].gsub("_"," ").titlecase if index == 0
          if ass.nil?
            line << ""
          elsif ass.name
            line << ass.name
          else
            line << ass.attributes
          end
        elsif k == "reaction_id"
          header << "When did the mobilization begin" if index == 0
          if v
            line << Reaction.find(v).name
          else
            line << ""
          end
        elsif k == "status_id"
          header << "Intensity of Conflict" if index == 0
          if v
            line << Status.find(v).name
          else
            line << ""
          end
        elsif k == "population_type"
          header << "Type of Population" if index == 0
          if v
            line << ['Unknown','Urban','Semi-urban','Rural'][v]
          else
            line << ""
          end
        elsif k == "accuracy_level"
          header << "Accuracy of location" if index == 0
          if v
            line << ['','LOW country/state level','MEDIUM regional level','HIGH local level'][v]
          else
            line << ""
          end
        else
          header << k.to_s.gsub("_"," ").titlecase if index == 0
          line << v.to_s
        end
        nfields += 1
      end
      mania.each do |many, val|
        va = [conf.id]
        header << "#{many.to_s}" if index == 0
        at = []
        many.order(:id).each do |m|
          if m.conflicts.include? conf
            at << m.name
            va << "1"
          else
            va << "0"
          end
        end
        val << va
        line << at.join(":::")
        nfields += 1
      end
      [Company,Supporter].each do |mod|
        rel = mod.to_s.downcase
        if mod == Company
          rels = conf.companies
        else
          rels = conf.supporters
        end
        header << rel.titlecase if index == 0
        lin = ""
        rels.each do |m|
          acr = m.acronym and m.acronym.length > 0 ? " [#{m.acronym}]" : ""
          cnt = m.country ? " (#{m.country.name})" : ""
          if mod == Company
            cm = eval("m.c_companies.find_by_conflict_id(#{conf.id})")
          else
            cm = eval("m.c_supporters.find_by_conflict_id(#{conf.id})")
          end
          inv = cm.involvement and cm.involvement.length > 0 ? ":#{cm.involvement}" : ""
          lin += "#{m.name}#{acr}#{cnt}#{inv}\n"
          unless actors[mod].has_key? m.id
            actors[mod][m.id] = { :attrs => [m.id, m.name, m.slug, m.description, m.url, m.acronym, m.country ? m.country.name : nil],
                                  :invs => {}} 
          end
          inv = cm.involvement and cm.involvement.length > 0 ? cm.involvement : "-"
          actors[mod][m.id][:invs][conf.id] = inv
        end
        line << lin
        nfields += 1
      end
      imps.each do |imp,val|
        va = [conf.id]
        header << imp.to_s if index == 0
        at = []
        imp.order(:id).each do |m|
          if m.conflicts.include? conf
            cm = eval("m.c_#{imp.to_s.gsub('Impact','').downcase}_impacts.find_by_conflict_id(#{conf.id})")
            if cm.visible
              at << "#{m.name} (V)"
              va << "V"
            else
              at << "#{m.name} (P)"
              va << "P"
            end
          else
            va << ""
          end
        end
        val << va
        line << at.join(":::")
        nfields += 1
      end
      ['references','legislations','weblinks','medialinks'].each do |rel|
        #puts 
        rels = eval("conf.#{rel}")
        header << rel.titlecase if index == 0
        at = "#{rel.titlecase} "
        lin = ""
        rels.each do |m|
          dsc = m.description ? "#{m.description}\n" : ""
          url = m.url ? "#{m.url}\n" : ""
          at += "#{dsc}#{url}\n"
          lin += "#{dsc}#{url}\n"
        end
        #puts at
        line << lin
        nfields += 1
      end
      ['documents','images'].each do |rel|
        #puts 
        rels = eval("conf.#{rel}")
        header << rel.titlecase if index == 0
        at = "#{rel.titlecase} "
        lin = ""
        rels.each do |m|
          ttl = m.title ? "#{m.title}\n" : ""
          dsc = m.description ? "#{m.description}\n" : ""
          url = m.file.url ? "#{m.file.url}\n" : ""
          at += "#{ttl}#{dsc}#{url}\n"
          lin += "#{ttl}#{dsc}#{url}\n"
        end
        #puts at
        line << lin
        nfields += 1
      end
      actors[:ids] << conf.id
      numfields << nfields
      lines << line
      #puts
    end
    Dir.mkdir "/tmp/export"  unless File.directory? "/tmp/export"
    ::CSV.open('/tmp/export/cases.csv',"w") do |output|
      output << header
      lines.each do |line|
        output << line
      end
    end
    tata = Time.now
    csvs = ["ejatlas-export-#{tata.strftime('%Y-%m-%d-%H%M')}/cases.csv"]
    mania.each do |many,lines|
      header = ["id"]
      many.order(:id).each {|h| header << h.name}
      ::CSV.open("/tmp/export/#{many.to_s.downcase}s.csv","w") do |output|
        output << header
        lines.each do |line|
          output << line
        end
      end
      csvs << "ejatlas-export-#{tata.strftime('%Y-%m-%d-%H%M')}/#{many.to_s.downcase}s.csv"
    end
    imps.each do |many,lines|
      header = ["id"]
      many.order(:id).each {|h| header << h.name}
      ::CSV.open("/tmp/export/#{many.to_s.downcase}s.csv","w") do |output|
        output << header
        lines.each do |line|
          output << line
        end
      end
      csvs << "ejatlas-export-#{tata.strftime('%Y-%m-%d-%H%M')}/#{many.to_s.downcase}s.csv"
    end
    actors.each do |many,lines|
      next if many == :ids
      header = ["id", "name", "slug", "description", "url", "acronym", "country"]
      actors[:ids].uniq.each {|c| header << c}
      ::CSV.open("/tmp/export/#{many.to_s.downcase}s.csv","w") do |output|
        output << header
        lines.each do |id, comp|
          line = comp[:attrs]
          step = 7
          pp comp[:invs]
          comp[:invs].each do |conf, inv|
            next unless header.include?(conf)
            (header.index(conf)-step).times { line << nil }
            inv ||= '-'
            line << inv
            #step = header.index#{$filedir}/../exports(conf)
          end
          output << line
        end
      end
      csvs << "ejatlas-export-#{tata.strftime('%Y-%m-%d-%H%M')}/#{many.to_s.downcase}s.csv"
    end
    Zip::ZipOutputStream.open("#{$filedir}/../exports/ejatlas-export-#{tata.strftime('%Y-%m-%d-%H%M')}.zip") do |zio|
      csvs.each do |c|
        zio.put_next_entry(c)
        zio.write File.read("/tmp/export/#{c.split('/')[-1]}")
      end
    end
    GC.start
  end
  handle_asynchronously :csvexport

  def export_companies params
    require 'csv'
    puts "xportin"
    tata = Time.now
    path = "#{$filedir}/../exports/ejatlas-companies-export-#{tata.strftime('%Y-%m-%d-%H%M')}.csv"
    path = "#{Dir.pwd}/../ejatlas-companies-export-#{tata.strftime('%Y-%m-%d-%H%M')}.csv"
    CSV.open(path,"w") do |csv|
      csv << ["company_name", "acronym", "country_of_origin", "conflict_name", "conflict_link", "description","environmental_impacts","health_impacts","socioeconomical_impacts"]
      Company.order(:name).includes(:conflicts).each_with_index do |c,i|
        print "\r#{i} / #{Company.count}"
        c.conflicts.where(approval_status: 'approved').each do |cc|
          row = [c.name, c.acronym, (c.country ? c.country.name : ""), cc.name,"https://ejatlas.org/conflict/#{cc.slug}"]
          if cc.headline and cc.headline.length > 12
            row << cc.headline
          else
            row << cc.description.split("</p>")[0].gsub(/<[^>]>/,"")
          end
          row << [cc.env_impacts.map(&:name),cc.other_env_impacts].flatten.join("\n").strip
          row << [cc.hlt_impacts.map(&:name),cc.other_hlt_impacts].flatten.join("\n").strip
          row << [cc.sec_impacts.map(&:name),cc.other_sec_impacts].flatten.join("\n").strip
          csv << row
        end
      end
    end
    puts "Done."
  end
  handle_asynchronously :export_companies

  def export_graphcommons params
    start = Time.now
    require "graphcommons"
    unless Graphcommons::API.check_key
      Graphcommons::API.set_key($gc_api_key)
    end
    id = params["id"]
    puts "Creating graph ##{id}"
    Conflict.find(params["cons"]).each_with_index do |con,ind|
      print "\rProcessing case #{ind+1} of #{params["cons"].length}             "
      ops = {}
      ops[:type] = "Conflict"
      ops[:name] = con.name.strip
      ops[:reference] = "https://ejatlas.org/conflict/#{con.slug}"
      ops[:properties] = {
        :category => con.category.name,
        :types => con.types.any? ? con.types.map(&:name).join(", ").strip : "",
        :description => con.headline ? con.headline.strip : ""
      }
      begin
        ops[:image] = con.images.first.file.url
      rescue
        ops[:image] = ""
      end
      Graphcommons::Signal.node_create id, ops
    end
    params["fields"].each do |key, value|
      eval(key).find(value).each_with_index do |act,ind|
        print "\rProcessing #{key} #{ind+1} of #{value.length}             "
        ops = {}
        ops[:type] = key
        ops[:name] = act.name.strip
        begin
          ops[:image] = act.images.first.file.url
        rescue
          ops[:image] = ""
        end
        Graphcommons::Signal.node_create id, ops
        act.conflicts.where(:id=>params["cons"]).each do |con|
          ops = {}
          ops[:from_type] = key
          ops[:to_type] = "Conflict"
          ops[:from_name] = act.name.strip
          ops[:to_name] = con.name.strip
          ops[:name] = "RELATED"
          Graphcommons::Signal.edge_create id, ops
        end
      end
    end
    print "\rProcess completed in #{(Time.now - start).to_i} seconds.                                              "
    puts
    GC.start
    nil
  end
  handle_asynchronously :export_graphcommons

  def backup params
    now = Time.now.strftime('%y%m%d%H%M')
    `/usr/bin/pg_dump -Fc --no-acl --no-owner postgres://root:***REMOVED***@0.0.0.0:5432/ejatlas > #{$filedir}/../backup/ej-#{now}.dump`
    bak = Backup.new
    bak.file = File.open("#{$filedir}/../backup/ej-#{now}.dump","rb")
    puts "#{$filedir}/../backup/ej-#{now}.dump"
    if bak.save
      bak = nil
    else
      #puts 'nein!'
    end
    GC.start
  end
  handle_asynchronously :backup

  def setcache params
    puts "Starting cache update;"
    ca = Cached.new unless ca = Cached.first
    client = Elasticsearch::Client.new log: false

    if params["conflicts"] == "on"
      puts "Updating conflicts..."
      Dir.mkdir "#{PADRINO_ROOT}/tmp"  unless File.directory? "#{PADRINO_ROOT}/tmp"
      FileUtils.rmtree "#{PADRINO_ROOT}/tmp/cache" if File.directory? "#{PADRINO_ROOT}/tmp/cache"
      Dir.mkdir "#{PADRINO_ROOT}/tmp/cache" 
      total = Conflict.count / 64.0
      counter = 0
      Conflict.find_in_batches(batch_size: 64) do |batch|
        print "\r #{(counter/total*100).to_i}% done."
        counter += 1
        batch.each do |c|
          c.ping
          c.save
          client.index index: 'atlas', type: 'conflict', id: c.id, body: c.elastic
          if c.approval_status == "approved"
            open("#{PADRINO_ROOT}/tmp/cache/markers.json","a") {|f| f.puts(c.marker.to_json) }
            #open("#{PADRINO_ROOT}/tmp/cache/jsons.json","a") {|f| f.puts (c.json.to_json) }
          end
        end
      end
      print "\r              "
      puts
      ca.conflicts_marker = "["+File.read("#{PADRINO_ROOT}/tmp/cache/markers.json").gsub("\n",",")+"]"
      ca.conflicts_json = ""#"["+File.read("#{PADRINO_ROOT}/tmp/cache/jsons.json").gsub("\n",",")+"]"
      open("#{PADRINO_ROOT}/public/data/markers.json","w") {|f| f.puts("["+File.read("#{PADRINO_ROOT}/tmp/cache/markers.json").gsub("\n",",").gsub(/","/,",").gsub('\\"', '"').sub('"','').sub(/",$/,"")+"]")}
    end


    if params["countries"] == "on"
      countries = []
      puts "Updating countries..."
      #Region.all.each {|c| countries << [c.jsonize,c.conflicts_count] if c.conflicts_count > 1; c.save}
      Country.includes(:conflicts).each do |c| 
        countries << [c.jsonize,c.conflicts.where(approval_status: 'approved').count] if c.conflicts.count >= 1
        c.save
        client.index index: 'atlas', type: 'country', id: c.id, body: {id:c.id,name:c.name}
      end
      countries.sort_by! {|c| c[1]}
      countries.reverse!
      ca.countries = countries.to_json
    end

    if params["companies"] == "on"
      companies = []
      puts "Updating companies..."
      Company.includes(:conflicts).each do |c|
        companies << [c.jsonize,c.conflicts.where(approval_status: 'approved').count] if c.conflicts.where(approval_status: 'approved').count > 1
        c.save
        client.index index: 'atlas', type: 'company', id: c.id, body: {id:c.id,name:c.name}
      end
      companies.sort_by! {|c| c[1]}
      companies.reverse!
      ca.companies = companies.to_json
    end

    if params["ifis"] == "on"
      supporters = []
      puts "Updating IFI's..."
      Supporter.includes(:conflicts).each do |c|
        supporters << [c.jsonize,c.conflicts.where(approval_status: 'approved').count] if c.conflicts.where(approval_status: 'approved').count >= 1
        c.save
        client.index index: 'atlas', type: 'financial_institution', id: c.id, body: {id:c.id,name:c.name}
      end
      supporters.sort_by! {|c| c[1]}
      supporters.reverse!
      ca.supporters = supporters.to_json
    end

    if params["commodities"] == "on"
      commodities = []
      puts "Updating commodities..."
      Product.all.includes(:conflicts).each {|c| commodities << [c.jsonize,c.conflicts.where(approval_status: 'approved').count] if c.conflicts.where(approval_status: 'approved').count >= 1 and c.name != "Other"; c.save}
      commodities.sort_by! {|c| c[1]}
      commodities.reverse!
      ca.commodities = commodities.to_json
    end

    if params["categories"] == "on"
      types = []
      puts "Updating categories..."
      Type.all.includes(:conflicts).each {|c| types << [c.jsonize,c.conflicts.where(approval_status: 'approved').count] if c.conflicts.where(approval_status: 'approved').count >= 1 and c.name != "Other"; c.save}
      types.sort_by! {|c| c[1]}
      types.reverse!
      ca.types = types.to_json
    end

    if params["featureds"] == "on"
      #types = []
      puts "Updating featureds..."
      fids = Featured.all.map &:id
      Conflict.where('features is not null').each do |c|
        f = JSON.parse(c.features)
        f.each do |k,v|
          id = k.split(':')[0]
          next if id != id.to_i.to_s
          unless fids.include? id.to_i
            f.delete k
          end
        end
        c.features = f.to_json
        c.save
      end
      if false
        Featured.all.each_with_index do |featured, index|
          print "\r#{index+1} / #{Featured.count}"
          features = JSON.parse(featured.features || '{}')
          begin
            filter = "{}"
            filter = featured.filter if featured.filter.length > 0
            featured.ping((Admin.filter(filter,false).map{|i| begin Conflict.find(i['_id'].to_i) rescue nil end}-[nil]).sort{|a,b| a.slug <=> b.slug})
          rescue => e
            #puts "#{featured.name} | #{e}"
            featured.ping((Admin.old_filter(featured.filter) || []).sort{|a,b| a.slug <=> b.slug})
          end
        end
      end
      print "\r              "
    end

    if params["images"] == "on"
      puts "Updating images..."
      docs = []

      # TODO: use mimetypes
      ext = ["jpg", "bmp", "png", "jpeg", "gif"]
      Document.all.each do |doc|
        if ext.include? doc.file.file.filename.split('.')[-1].downcase
          docs << doc.id
        end
      end
      puts "Found #{docs.length} images to update..."
      iids = []
      docs.each do |d|
        doc = Document.find d
        next unless doc.conflict
        fns = []
        doc.conflict.images.each {|i| fns << i.file.file.filename}
        if fns.include? doc.file.file.filename
          #puts "\rimage already present: #{doc.file.file.filename}"
          next
        end
        img = Image.new
        img.remote_file_url = doc.file.url
        img.title = doc.title
        img.description = doc.description
        doc.conflict.images << img
        begin
          img.save!
          puts "\r#{img.title} (#{img.file.file.filename}) - #{img.attachable.name}"
          doc.update_attribute :copied?, true
        rescue => e
          puts "  problem saving image at: \n#{doc.file.url}\n"
          p e
        end
      end
    end

    if params["filter"] == "on"
      puts "Updating filter..."
      Tag.all.each {|c| client.index index: 'atlas', type: 'tag', id: c.id, body: {id:c.id,name:c.name}}
      Account.where(public:true).each {|c| client.index index: 'atlas', type: 'account', id: c.id, body: {id:c.id,name:c.name}}
      filterdata = {}

      filterdata["basic_data"] = {}
      filterdata["basic_data"]["name"] = {:content=>'flat'}
      filterdata["basic_data"]["success_level"] = {:content=>[{0=>'Success'},{1=>'Not sure'},{2=>'Failure'}]}
      filterdata["basic_data"]["population_type"] = {:content=>[{0=>'Unknown'},{1=>'Urban'},{2=>'Semi-urban'},{3=>'Rural'}]}
      filterdata["basic_data"]["country"] = {:content=>'auto',:name=>"country_id"}
      filterdata["basic_data"]["region"] = {:content=>Region.order(:name).select('name, id').map{|c|{c.id=>c.name}},:name=>"region_id"}

      filterdata["category"] = {}
      filterdata["category"]["category"] = {:content=>Category.order(:name).select('name, id').map{|c|{c.id=>c.name}},:name=>"category_id"}
      filterdata["category"]["type"] = {:content=>Type.order(:name).select('name, id').map{|c|{c.id=>c.name}},:name=>"types"}
      filterdata["category"]["other_types"] = {:content=>'flat'}
      
      filterdata["project"] = {}
      filterdata["project"]["commodity"] = {:content=>Product.order(:name).select('name, id').map{|c|{c.id=>c.name}},:name=>"products"}
      filterdata["project"]["level_of_investment"] = {:content=>"0:24",:name=>"investment_sum"}
      filterdata["project"]["company"] = {:content=>'auto',:name=>"companies"}
      filterdata["project"]["country_of_company"] = {:content=>'auto',:name=>"country_of_company"}
      filterdata["project"]["financial_institution"] = {:content=>'auto',:name=>"supporters"}
      filterdata["project"]["government_actors"] = {:content=>'flat',:name=>"govt_actors"}
      filterdata["project"]["project_details"] = {:content=>'flat'}
      
      filterdata["conflict"] = {}
      filterdata["conflict"]["start_date"] = {:content=>"#{(Time.now-100.years).year}:#{Time.now.year}",:name=>"start_datestamp"}
      filterdata["conflict"]["end_date"] = {:content=>"#{(Time.now-100.years).year}:#{Time.now.year}",:name=>"end_datestamp"}
      filterdata["conflict"]["intensity"] = {:content=>Status.order(:name).select('name, id').map{|c|{c.id=>c.name}},:name=>"status_id"}
      filterdata["conflict"]["reaction_stage"] =  {:content=>Reaction.order(:name).select('name, id').map{|c|{c.id=>c.name}},:name=>"reaction_id"}
      filterdata["conflict"]["description"] = {:content=>'flat'}

      filterdata["resistance"] = {}
      filterdata["resistance"]["mobilizing_groups"] =  {:content=>MobilizingGroup.order(:name).select('name, id').map{|c|{c.id=>c.name}}}
      filterdata["resistance"]["mobilizing_forms"] =  {:content=>MobilizingForm.order(:name).select('name, id').map{|c|{c.id=>c.name}}}
      filterdata["resistance"]["env_justice_organizations"] = {:content=>'flat',:name=>"ejos"}

      filterdata["impacts"] = {}
      filterdata["impacts"]["environmental_impacts"] = {:content=>EnvImpact.order(:name).select('name, id').map{|c|{c.id=>c.name}},:name=>"env_impacts"}
      filterdata["impacts"]["health_impacts"] = {:content=>HltImpact.order(:name).select('name, id').map{|c|{c.id=>c.name}},:name=>"hlt_impacts"}
      filterdata["impacts"]["socio-economical_impacts"] = {:content=>SecImpact.order(:name).select('name, id').map{|c|{c.id=>c.name}},:name=>"sec_impacts"}

      filterdata["outcomes"] = {}
      filterdata["outcomes"]["suggested_alternatives"] = {:content=>'flat'}
      filterdata["outcomes"]["project_status"] =  {:content=>ProjectStatus.order(:name).select('name, id').map{|c|{c.id=>c.name}},:name=>"project_status_id"}
      filterdata["outcomes"]["outcome"] =  {:content=>ConflictEvent.order(:name).select('name, id').map{|c|{c.id=>c.name}},:name=>"conflict_events"}

      filterdata["meta"] = {}
      filterdata["meta"]["collaborator"] =  {:content=>'auto',:name=>"account_id",:model=>'account'}
      filterdata["meta"]["tags"] = {:content=>'auto',:name=>"tags",:model=>'tag'}
      #filterdata["meta"]["created"] = {:content=>"#{(Time.now-100.years).year}:#{Time.now.year}",:name=>"created_at"}
      #filterdata["meta"]["modified"] = {:content=>"#{(Time.now-100.years).year}:#{Time.now.year}",:name=>"modified_at"}

      ca.filterdata = filterdata.to_json
    end

    ca.save
    GC.start
    puts "Cache updated."

  end
  handle_asynchronously :setcache


  def slugify str
    return str if str.nil?
    res = str.to_ascii
      .downcase
      .strip
      .gsub(/[-_\s\/]+/, '-')
      .gsub(/[^-\w\.]/, '')
      .gsub(/-+/,'-')
    return res
  end

  def vectorupload params, vd, precision
    puts "init vector upload job at #{Time.now}"
    require 'gdal-ruby/ogr'
    require 'csv'
    require 'open-uri'

    source = params['source']
    extension = source.gsub(/\?.*$/,"").gsub(/^.+\./,"").downcase
    if ['kmz','zip'].include? extension
      Zip::ZipFile.open(source) do |zipfile|
        if extension == 'zip'
          path = "#{source.gsub(/\.zip$/,'/').gsub(/\s/,'_')}"
          Dir.mkdir path unless File.directory? path
        end
        zipfile.each do |c|
          if extension == 'kmz'
            source = source.sub(/kmz$/,'kml')
            zipfile.extract c, source unless File.file? source
            source = "/tmp/vectorupload/#{params['filename'].sub(/kmz$/,'kml').gsub(/\s/,'_')}"
          else
            zipfile.extract c, path+c.name.gsub(/\s/,'_') unless File.file? path+c.name.gsub(/\s/,'_')
            if c.name[-4..-1] == '.shp'
              source = path+c.name.gsub(/\s/,'_')
            end
          end
        end
      end
    end
    varname = source.split('/')[-1]

    begin
      file = Gdal::Ogr.open source
      layer = file.get_layer 0
    rescue Exception => e
      puts "VectorUpload Error: #{e}"
      exit 2
    end

    slug = slugify varname.force_encoding('utf-8')
    jsvar = slug.split('.')[0].sub(/^\d+/,'').gsub(/-+/,'_')

    puts 'source file parsed with ogr'

    feats = []
    total = layer.get_feature_count
    puts "#{total} features found"
    total.times do |i| 
      begin
        feat = layer.get_feature i
      rescue Exception => e
        puts "Error in feature: #{e}"
        next
      end
      next unless feat
      geom = feat.get_geometry_ref
      next unless geom
      geom.flatten_to_2d
      begin
        id = feat.get_field("feature_id").to_i.to_s
      rescue
        id = nil
      end
      if precision > 0
        pts = JSON.parse(geom.export_to_json.gsub(/\d+\.\d+/) {|x|x.match(/\d+\.\d{#{[precision,x.split('.')[1].length].min}}/)}.gsub(/\s/,''))
      else
        pts = JSON.parse(geom.export_to_json)
      end
      if ["linestring", "multipoint"].include?(pts["type"].downcase)
        ngeom = []
        last = []
        pts["coordinates"].each do |point|
          ngeom << point unless point == last
          last = point
        end
        pts["coordinates"] = ngeom
      end
      if params['stat_json'] and id
        cat = params['stat_json'][id].delete("category") if params['stat_json'].has_key? id
        hash = {'type'=>'Feature', 'properties'=>{'id'=>id,'pn'=>vd.name,'data'=>params['stat_json'][id]},'geometry'=>pts}
        hash["properties"]["category"] = cat if cat
      else
        hash = {'type'=>'Feature', 'properties'=>{'pn'=>vd.name},'geometry'=>pts}
      end
      feats << hash
    end

    puts 'source data converted to json'

    output = {'type'=>'FeatureCollection', 'features'=>feats}
    geojson = output.to_json
    geojson.gsub!(/\\u([0-9a-z]{4})/) {|s| [$1.to_i(16)].pack("U")}
    jstr = 'var '+jsvar+' = '+geojson+"; "+"vectorPing"+"("+jsvar+");"
    tfile = slug.gsub(/kml$/,"js").gsub(/shp$/,"js").gsub(/zip$/,"js")
    puts slug
    puts tfile
    target = "/tmp/vectorupload/#{tfile}"
    File.open(target,'w:UTF-8'){ |file| file.write(jstr) }

    puts "target file created at #{target}"

    pat = GeoData.new
    pat.folder = "#{vd.attachable_type.downcase}/#{vd.attachable.old_slug}"
    pat.file = File.open(target,"r:UTF-8")
    begin
      if pat.save
        puts "#{target}: #{feats.length} of #{total} layers processed, #{('%.2f' % (FileTest.size(target).to_f / 2**10) + 'K')} total."
        puts "target file stored at #{$fileurl}"
        vector_url = "#{$fileurl}/vector/#{pat.folder}/#{tfile}"
        pat = nil
        vd.url = vector_url
        vd.choropleth = params['legend_json'].to_json if params['legend_json']
        if vd.save
          puts "job completed successfully at #{Time.now}"
        else
          puts "job failed at #{Time.now}"
        end
      else
        puts "target file failed to upload at #{Time.now}"
      end
    rescue Exception => e
      puts "File could not be uploaded: #{e}"
    end
  end
  handle_asynchronously :vectorupload

  def parsedata master
    masterheader = ["id", "Name of conflict", "Country", "Location of conflict (municipality or city/town)", "State or Province", "Accuracy of location", "Project Area (in hectares)", "Type of Conflict (Please pick one based on the activity most responsible for the environmental disturbance)", "Type of Conflict (select a max. of 3 secondary level conflicts)", "Description (Please describe the project and the point of conflict here in maximum 200 words)", "Specific commodity", "Other commodities", "Project details (Please insert specific details on the relevant quantitative data eg tons of mineral extracted per year, kwh of electricity, etc...)", "Directly Affected people (number of people (may also be a range)", "Companies", "Relevant government actors", "Home country (The country or countries where the company or companies main office is)", "International and financial Institutions (eg WB, IFAD, IUCN, ILO, etc...)", "Environmental justice organisations and other supporters", "Status of Conflict", "When did the mobilization begin", "Is this conflict directly related to any other ecological conflict? (Please enter the name of the conflict)", "Type of population", "Potential affected population (number of people (may also be a range)", "Level of investment (If you know the level of investment of the project please enter in USD)", "Start of the conflict (dd/mm/yyyy or XX/mm/yyyy)", "End of the conflict leave blank if on going (dd/mm/yyyy or XX/mm/yyyy)", "Groups mobilizing (select all that apply)", "Other groups mobilizing", "Forms of mobilization (select all that apply)", "Other forms of mobilization", "Environmental impacts [Air pollution ]", "Environmental impacts [Biodiversity loss (wildlife, agro-diversity) ]", "Environmental impacts [Desertification/Drought]", "Environmental impacts [Fires ]", "Environmental impacts [Floods (river, coastal, mudflow)]", "Environmental impacts [Food insecurity (crop damage)]", "Environmental impacts [Genetic contamination]", "Environmental impacts [Global warming]", "Environmental impacts [Loss of landscape/aesthetic degradation]", "Environmental impacts [Noise pollution]", "Environmental impacts [Soil contamination]", "Environmental impacts [Soil erosion]", "Environmental impacts [Waste overflow]", "Environmental impacts [Oil spills]", "Environmental impacts [Deforestation and loss of vegetation cover]", "Environmental impacts [Surface water pollution / Decreasing water (physico-chemical, biological) quality]", "Environmental impacts [Groundwater pollution or depletion]", "Environmental impacts [Large-scale disturbance of hydro and geological systems ]", "Environmental impacts [Reduced ecological / hydrological connectivity]", "Environmental impacts [Mine tailing spills]", "Other Environmental impacts", "Health impacts [Accidents ]", "Health impacts [Exposure to unknown or uncertain complex risks (radiation, etc…) ]", "Health impacts [Malnutrition]", "Health impacts [Mental problems including stress, depression and suicide]", "Health impacts [Violence related health impacts (homicides, rape, etc..) ]", "Health impacts [Health problems related to alcoholism, prostitution]", "Health impacts [Occupational disease and accidents]", "Health impacts [Infectious diseases]", "Health impacts [Deaths]", "Health impacts [Other environmental related diseases]", "Other Health impacts", "Socio-economic impacts [Increase in Corruption/Co-optation of different actors]", "Socio-economic impacts [Displacement ]", "Socio-economic impacts [Increase in violence and crime]", "Socio-economic impacts [Lack of work security, labour absenteeism, firings, unemployment]", "Socio-economic impacts [Loss of livelihood]", "Socio-economic impacts [Loss of traditional knowledge/practices/cultures]", "Socio-economic impacts [Militarization and increased police presence]", "Socio-economic impacts [Social problems (alcoholism, prostitution, etc..)]", "Socio-economic impacts [Specific impacts on women]", "Socio-economic impacts [Violations of human rights]", "Socio-economic impacts [Land dispossession]", "Socio-economic impacts [Loss of landscape/sense of place]", "Other socio-economic impacts", "Current status of the project development", "Do you consider this an Environmental Justice success. Was environmental justice served (e.g.  Project)", "Briefly explain", "Pathways for conflict outcome / response", "Other pathways for conflict outcome / response", "Development of Alternatives (What are the proposals being brought forward by the mobilizers)", "Relevant legislation", "References (articles, books, video documentaries, etc...)", "Links(to web-pages with information, newspaper articles)", "Links(to photos, video)", "Other comments", "Contributor", "Contact Name ", "Contact Email", "Contact Address", "Video Title", "Video Description", "Video Tags", "Expiry Date", "Approved", "lng", "lat", "geom_loc"]
    puts 'Parsing started'
    ::CSV.open("#{Dir.pwd}/misc/textconversion.csv") do |csv|
      csv.each do |c|
        r = c[2]
        #puts "#{r.to_s} (#{master.count(r.to_s).to_s}) #{c[2]} => #{c[1]}"
        master.gsub! (r) { |x| c[1] }
      end
    end
    begin
      conflicts = ::CSV.parse(master, :row_sep => :auto, :col_sep => "\t", encoding: "utf-8")
    rescue
      conflicts = ::CSV.parse(master, :row_sep => :auto, :col_sep => ",", encoding: "utf-8")
    end
    header = conflicts.shift
    #puts header == masterheader
    errors = []
    merrs = {}
    testing = false
    parsedcount = 0
    conflicts.each_with_index do |row,index|
      parsedcount += 1
      break if parsedcount > 200 and testing
      break if row[1] == "" or row[1].nil?
      if c = Conflict.find_by_name(row[1])
        c.destroy
      end
      c = Conflict.new

      c.formerid = row[0].to_i
      c.name = row[1]
      puts
      puts "#{index} #{c.name if c.name}"
      country = Country.find_name(row[2].to_s)
      unless country
        country = Country.create(:name=>row[2])
        c.formerid = row[0].to_i
      end
      c.country = country
      c.site = row[3]
      c.province = row[4]
      c.accuracy_level = ["","Low","Medium","High"].index(row[5])

      project_area = row[6]
      project_length = nil
      if project_area
        if project_area.match(/\b(hectar|ha)/)
          project_area.gsub! /\D/, ""
        elsif project_area.match(/\b(acre)/)
          project_area.gsub! /\D/, ""
          project_area = (project_area.to_i * 0.404686).to_i.to_s
        elsif project_area.match(/\b(sqkm|square km|square kilom)/)
          project_area.gsub! /\D/, ""
          project_area = (project_area.to_i * 100).to_i.to_s
        elsif project_area.match(/\b(sqmi|square mi|square mile)/)
          project_area.gsub! /\D/, ""
          project_area = (project_area.to_i * 258.999).to_i.to_s
        elsif project_area.match(/\b(km|kilometer)/)
          project_length = project_area.gsub! /\D/, ""
          project_area = nil
        elsif project_area.match(/\b(mi|mile)/)
          project_length = project_area.gsub! /\D/, ""
          project_length = (project_length.to_i * 1.60934).to_i.to_s
          project_area = nil
        end
        c.project_area = project_area
        c.project_length = project_length
      end

      merrs[:category] = []
      if row[7] and cate = Category.find_by_slug(Admin.slugify row[7])
        c.category = cate
      else
        merrs[:category] << [row[1], row[7]]
      end
      c.save!
      merrs[:type] = []
      row[8].split(':::').each_with_index do |t,i|
        if tt = Type.find_by_slug(Admin.slugify t)
          ct = CType.new
          ct.conflict_id = c.id
          ct.type_id = tt.id
          ct.ordering = c.types.count
          merrs[:type] << [row[1], t] unless ct.save!
        else
          merrs[:type] << [row[1], t]
        end
      end

      c.description = rmlines row[9]
      puts c.description if c.description

      merrs[:commodity] = []
      if row[10]
        row[10].split(':::').each do |t|
          p = Product.find_by_name(t) unless t.nil?
          unless p.nil?
            c.products << p 
          else
            merrs[:commodity] << [row[1], row[7]]
          end
        end
      end

      c.other_products = row[11]
      c.products << Product.find_by_name('Other') if c.other_products.nil? and !c.products.include?(Product.find_by_name('Other'))

      c.project_details = rmlines row[12]
      puts c.project_details

      c.affected_people = row[13]
      if row[13] and aps = row[13].gsub('thousand','000').gsub('million','000000').gsub('billion','000000000').gsub(/[\.,\s]+/,'').scan(/\d+/)
        c.affected_min = aps.min
        c.affected_max = aps.max
      end


      organ(row[14],Company,c,'companies')

      c.govt_actors = row[15]
      organ(row[17],Supporter,c,'supporters')

      c.ejos = row[18]

      c.status = Status.find_by_name(row[19])
      c.reaction = Reaction.find_by_name(row[20])
      c.related_conflict_string = row[21]
      merrs[:poptype] = []
      c.population_type = ['Unknown','Urban','Semi-urban','Rural'].index(row[22])
      unless c.population_type
        merrs[:poptype] = [[row[1], row[22]]]
      end
      if c.affected_people
        puts c.affected_people 
      else
        c.affected_people = row[23]
        puts c.affected_people if c.affected_people
      end


      isum = row[24]
      if isum
        puts isum
        c.investment_string = isum
        nisum = isum.scan(/\(([^\)]+)\)/)[0]
        isum = isum.gsub(nisum[0],'') if nisum
        #isum = isum.split('-')[0] if isum.match(/-/)
        isum = isum.gsub('million','000000').gsub('billion','000000000').gsub(/[\.,\s]+/,'') if isum
        isum = isum.scan(/\d+/).map{|x| x.to_i} if isum
        isum = isum.max if isum
        puts isum.to_s if isum
        c.investment_sum = isum.to_i
      end

      puts 'danger'

      sdate = row[25]
      sdate.to_s.downcase.gsub('x','0').gsub(/[-\/]/,'/')
      puts sdate
      sdates = stripDate(sdate)
      puts sdates
      olddate = Date.parse('1800-01-01')
      if sdates and sdates[0] > olddate
        c.start_datestamp = sdates[0]
        c.start_date = sdates[1]
        puts sdates[0]
      end

      edate = row[26]
      edate = []
      edate.to_s.downcase.gsub('x','0').gsub(/[-\/]/,'/')
      edates = stripDate(edate)
      if edates and edates[0] > olddate
        c.end_datestamp = edates[0]
        c.end_date = edates[1]
        puts edates[0]
      end

      merrs[:mobgroup] = []
      if row[27]
        row[27].split(':::').each do |t|
          p = MobilizingGroup.find_by_name(t) unless t.nil?
          unless p.nil?
            c.mobilizing_groups << p
          else
            merrs[:mobgroup] << [row[1], t]
          end
        end
      end

      c.other_mobilizing_groups = row[28]
      c.mobilizing_groups << MobilizingGroup.find_by_name('Other') if c.other_mobilizing_groups and !c.mobilizing_groups.include?(MobilizingGroup.find_by_name('Other'))

      merrs[:mobform] = []
      if row[29]
        row[29].split(':::').each do |t|
          p = MobilizingForm.find_by_name(t) unless t.nil?
          unless p.nil?
            c.mobilizing_forms << p
          else
            merrs[:mobform] << [row[1], t]
          end
        end
      end

      c.other_mobilizing_forms = row[30]
      c.mobilizing_forms << MobilizingForm.find_by_name('Other') if c.other_mobilizing_forms and !c.mobilizing_forms.include?(MobilizingForm.find_by_name('Other'))

      p = ["Yes","Not sure","No"].index row[77]
      c.success_level = p unless p.nil?


      merrs[:env_impact] = []
      31.upto(50) do |imp|
        re = row[imp]
        im = ['No Data','Latent, Potential or Uncertain','Observed or Documented'].index re
        next unless im
        if im > 0
          impa = EnvImpact.find(imp-30)
          cimp = CEnvImpact.new
          cimp.conflict = c
          cimp.env_impact = impa
          cimp.visible = (im == 2)
          cimp.save!
        else
          merrs[:env_impact] << [row[1],re]
        end
      end
      c.other_env_impacts = row[51]

      merrs[:hlt_impact] = []
      52.upto(61) do |imp|
        re = row[imp]
        im = ['No Data','Latent, Potential or Uncertain','Observed or Documented'].index re
        next unless im
        if im > 0
          impa = HltImpact.find(imp-51)
          cimp = CHltImpact.new
          cimp.conflict = c
          cimp.hlt_impact = impa
          cimp.visible = (im == 2)
          cimp.save!
        else
          merrs[:hlt_impact] << [row[1],re]
        end
      end
      c.other_hlt_impacts = row[62]

      merrs[:sec_impact] = []
      63.upto(74) do |imp|
        re = row[imp]
        im = ['No Data','Latent, Potential or Uncertain','Observed or Documented'].index re
        next unless im
        if im > 0
          impa = SecImpact.find(imp-62)
          cimp = CSecImpact.new
          cimp.conflict = c
          cimp.sec_impact = impa
          cimp.visible = (im == 2)
          cimp.save!
        else
          merrs[:sec_impact] << [row[1],re]
        end
      end
      c.other_sec_impacts = row[75]

      t = row[76]
      merrs[:status] = []
      p = ProjectStatus.find_by_name(t) unless t.nil?
      if p and p.class == ProjectStatus
        puts p.name
        c.project_status = p 
      else
        merrs[:status] << [row[1],t]
      end

      c.success_reason = row[78]
      puts c.success_reason if c.success_reason

      merrs[:outcome] = []
      if row[79]
        row[79].split(':::').each do |t|
          p = ConflictEvent.find_by_name(t) unless t.nil?
          unless p.nil?
            c.conflict_events << p 
          else
            merrs[:outcome] << [row[1],t]
          end
        end
      end

      c.other_outcomes = row[80]
      c.conflict_events << ConflictEvent.find_by_name('Other') unless c.other_outcomes.nil?

      c.suggested_alternatives = row[81]

      linking(row[82]).each do |l|
        ref = Legislation.create :description => l[:desc], :url => l[:url]
        c.legislations << ref
      end

      linking(row[83]).each do |l|
        ref = Reference.create :description => l[:desc], :url => l[:url]
        c.references << ref
      end

      linking(row[84]).each do |l|
        ref = Weblink.create :description => l[:desc], :url => l[:url]
        c.weblinks << ref
      end

      linking(row[85]).each do |l|
        ref = Medialink.create :description => l[:desc], :url => l[:url]
        c.medialinks << ref
      end

      c.other_comments = row[86]
      c.contributor = row[87]

      cem = row[89]
      unless ac = Account.find_by_email(cem) 
        ac = Account.new
        unless cem and cem.match /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\Z/i
          cem = "ejoltmap@gmail.com"
        end
        ac.email = cem
        if row[88]
          ac.name = row[88]
        else
          ac.name = "No Name"
        end
        ac.address = row[90]
        ac.surname = '%12x' % (rand((8 ** 16)*15)+(8**16))
        ac.password = ac.surname
        ac.password_confirmation = ac.surname
        ac.role = "user"
        ac.save!
      end
      puts ac.name
      puts ac.email
      c.account = ac

      if row[95]
        aps = row[95].downcase.strip
        aps = 'queued' if aps == 'pending moderation'
        aps = 'draft' if aps.nil?
        aps = 'draft' if aps.match(/.*\d+.*/)
        c.approval_status = aps
      end
      c.lon = row[96].to_f
      c.lat = row[97].to_f

      begin
        c.save!
      rescue => exc
        errors << "#{c.name}: #{exc.inspect}"
        12.times do
          puts
        end
      end

    end
    if errors.length > 0
      12.times do
        puts
      end
      errors.each {|e| puts e+"\n\n"}
      12.times do
        puts
      end
    end
    merrs.each do |t, m|
      if m.any?
        puts t
        m.each do |mt|
          puts "#{mt[0]}: #{mt[1]}"
        end
      end
    end
    puts
    GC.start
  end
  handle_asynchronously :parsedata

  def organ row, cls, c, cnam
    if row
      puts cnam
      gdesc = nil
      row.split("\n").each do |comp|
        next if comp.match(/^\s*$/)
        gd = comp.split(":")
        if gd[0]== ""
          gdesc = gd[1..-1].join(":")
          next
        end
        x = comp.gsub(/^\s*(-|\)|\d|\.|»|=|>|•)*\s*/,"")
        x = x.gsub("CAN","Canada").force_encoding("utf-8")
        f = {}
        f[:name] = x.match(/^[\p{L}\d\s\-\,\.\/’&]+(\[|\(|:|$)/).to_s.chomp('[').chomp('(').chomp(':').chomp(' ')
        f[:name] = f[:name][0..254]
        puts f[:name]
        acr = x.scan(/\[([^\]]+)\]/)
        f[:acronym] = acr[0][0].gsub(/[\[\]]/,'') if acr.length > 0

        cnt = x.scan(/\(([^\)]+)\)/)
        if cnt.length == 1
          if cnt[0][0].match(/[,-\/]/)
            f[:country] = cnt[0][0].gsub(/[\(\)]/,'').split(/\s*[,-\/]\s*/)
          else
            f[:country] = [cnt[0][0].gsub(/[\(\)]/,'')] 
          end
        elsif cnt.length > 1
          cns = []
          cnt.each do |cn|
            cns << cn[0].gsub(/[\(\)]/,'')
          end
          f[:country] = cns
        end
        cid = nil
        if f[:country] and cnt = Country.find_slug(Admin.slugify(f[:country][0]))
          cid = cnt.id
        end

        dsc = x.split(":")
        f[:description] = gdesc.to_s+" "+dsc[1..-1].join(":") if dsc.length > 1
        url = f[:description].match(/(?:(?:http|https):\/\/)?([-a-zA-Z0-9.]{2,256}\.[a-z]{2,4})\b(?:\/[-a-zA-Z0-9@:%_\+.~#?&\/=]*)?/).to_s if f[:description]
        f[:website] = url.to_s if url

        unless f[:name].nil? or f[:name] == ""
          company = cls.find_by_slug(Admin.slugify(f[:name]))
        end
        unless ! cls.attribute_names.include? 'acronym' or f[:acronym] == "" or f[:acronym].nil?
          company = cls.find_by_acronym(f[:acronym]) unless company
        end
        unless company 
          if (f[:name].nil? or f[:name] == "") and (f[:acronym].nil? or f[:acronym] == "")
            next
          elsif cls.attribute_names.include? 'acronym'
            company = cls.create( :name => f[:name], :acronym => f[:acronym], :country_id => cid )
          elsif cls.attribute_names.include? 'country_id'
            company = cls.create( :name => f[:name], :country_id => cid )
          else
            company = cls.create( :name => f[:name] )
          end
        end
        company.name = f[:name] if company.name.nil?
        company.acronym = f[:acronym] if cls.attribute_names.include? 'acronym' and company.acronym.nil? 
        company.website = f[:website] if cls.attribute_names.include? 'website' and company.website.nil? 
        company.country_id = cid if cls.attribute_names.include? 'country_id' and company.country_id.nil? 
        company.save!
        c_c = eval "c.#{cnam}"
        c_c << company unless c_c.include? company
        if cnam == "companies" and cc = c.c_companies.find_by_company_id(company.id)
          cc.involvement = f[:description]
          cc.save!
        end
      end
      c.companies.each {|cc| puts cc.name}
    end
  end

  def first r,i
    return r.children[i].children.first.text if r.children[i].children.any?
    return nil
  end

  def linking field
    rows = {}
    urls = {}
    rsls = []
    return rsls if field.nil?
    field.to_s.force_encoding("utf-8").gsub(/\r\n/,"\n").split(/\n/).each_with_index do |f,ind|
      unless f.match(/^\s*$/)
        f.gsub!(/^\s*(-|\)|\d|\.|•|)*\s*/,"")
        url = f.match(/(?:(?:http|https):\/\/)?([-a-zA-Z0-9.]{2,256}\.[a-z]{2,4})\b(?:\/[-a-zA-Z0-9@:%_\+.~#?&\/=]*)?/)
        url = f.match(/(?:(?:http|https|Http|HTTP|Https|HTTPS):\/\/)?([-a-zA-Z0-9.]{2,256}\.[a-z]{2,4})\b(?:\/[-a-zA-Z0-9@:%_\+.~#?&\/=]*)?/)
        if url
          url = url.to_s
          if url.length == f.length
            urls[ind] = url[0..254]
          else
            desc = f.gsub(url,"")[0..254]
            rsls << {:desc=> desc, :url=>url}
          end
          f.gsub!(url,"")
        else
          rows[ind] = f
        end
      end
    end
    desc = ""
    lasturl = 0
    urls.each do |k,url|
      if rows[k-1]
        desc = rows.delete k-1
        desc = desc[0..254]
        rsls << {:desc=> desc, :url=>url}
      else
        if lasturl == k-1
          rsls << {:desc=> desc, :url=>url}
        else
          rsls << {:desc=> nil, :url=>url}
        end
      end
      lasturl = k
    end
    rows.each do |k,v|
      rsls << {:desc=> v, :url=>nil}
    end
    return rsls
  end

  def rmlines str
    return nil if str.nil?
    arr = str.split("\n")
    res = []
    arr.each do |a|
      if a.match(/[.!?]+\s*$/)
        res << a.strip.sub(/^\s*(-|\)|\d|\.|»|=|>|•)*\s*/,"")
        res << "\n"
      else
        res << a.strip.sub(/^\s*(-|\)|\d|\.|»|=|>|•)*\s*/,"")
      end
    end
    return res.join(" ")
  end

  def stripDate par
    return if par.nil? or par.length == 0
    par.reverse! if par.match /\d{4}.\d{2}.\d{2}/
    matches = ['','01/','01/01/']
    subs = [0,par.length-7,par.length-4]
    n = 0
    begin
      s = par[[subs[n],0].max..-1]
      puts matches[n]+s
      d = Date.strptime matches[n]+s, '%d/%m/%Y'
      y = d.year
    rescue ArgumentError
      n += 1
      unless n > 2
        retry
      end
    end
    return [d,s] if d and s and d.class == Date
    return
  end
end

