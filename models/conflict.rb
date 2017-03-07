#coding: utf-8
class Conflict < ActiveRecord::Base

  #validates_presence_of :name, :province, :category, :description

  belongs_to :country

  belongs_to :category

  belongs_to :account
  belongs_to :project_status
  belongs_to :status
  belongs_to :reaction

  belongs_to :related_conflict
  has_one :related_conflict

  has_many :c_tags
  has_many :tags, :through => :c_tags

  has_many :c_types
  has_many :types, :through => :c_types

  has_many :c_products
  has_many :products, :through => :c_products

  has_many :c_companies
  has_many :companies, :through => :c_companies

  has_many :c_supporters
  has_many :supporters, :through => :c_supporters

  has_many :c_mobilizing_groups
  has_many :mobilizing_groups, :through => :c_mobilizing_groups

  has_many :c_mobilizing_forms
  has_many :mobilizing_forms, :through => :c_mobilizing_forms

  has_many :c_env_impacts
  has_many :env_impacts, :through => :c_env_impacts

  has_many :c_hlt_impacts
  has_many :hlt_impacts, :through => :c_hlt_impacts

  has_many :c_sec_impacts
  has_many :sec_impacts, :through => :c_sec_impacts

  has_many :c_conflict_events
  has_many :conflict_events, :through => :c_conflict_events

  has_many :legislations, :dependent => :destroy
  has_many :weblinks, :dependent => :destroy
  has_many :references, :dependent => :destroy
  has_many :medialinks, :dependent => :destroy

  has_many :documents, :dependent => :destroy
  accepts_nested_attributes_for :documents

  has_many :old_slugs, class_name: "OldSlug", as: :attachable, dependent: :destroy

  has_many :images, class_name: "Image", as: :attachable, dependent: :destroy
  accepts_nested_attributes_for :images

  has_many :relations_to, :foreign_key => 'to_id',  :class_name => 'ConflictRelation', :dependent => :destroy
  has_many :relations_from, :foreign_key => 'from_id', :class_name => 'ConflictRelation', :dependent => :destroy
  has_many :related_to, :through => :relations_to,   :source => :from 
  has_many :related_from, :through => :relations_from, :source => :to 

  before_save :set_slug

  def title
    return "#{self.headline.sub(/\s+$/,'')}.".sub(/\.+$/,'.') if self.headline and self.headline.length > 0
    if self.description and self.description.split(".").any?
      desc = self.description.split(".")[0]
      if desc.length < 255
        return desc+'.'
      else
        return desc[0..255].split(/\s/)[0..-2].join(' ')+'...'
      end
    end
    return nil
  end

  def related
    rel = (self.related_to | self.related_from).map{|c| c.approval_status == "approved" ? c : nil} - [nil]
    return [] unless rel
    return rel
  end

  def self.find_slug slug
    if c = Conflict.where(:slug=>slug.downcase).first
      return c
    elsif os = OldSlug.where("attachable_type = 'Conflict'").where(:name=>slug.downcase).first
      return os.attachable
    else
      return nil
    end
  end

  def self.find_name name
    slug = Admin.slugify name
    Conflict.where(:slug=>slug.downcase).first
  end

  def old_slug
    if self.old_slugs.any?
      return self.old_slugs[0].name
    end
    return self.slug
  end

  def ping
    self.json = self.jsonize
    self.marker = self.as_marker
    self.table = self.as_table
  end

=begin
  def as_mark
    clr = self.category ? self.category.id : 0
    cat = self.category ? self.category.name : ''
    sta = self.start_date ? self.start_date : ''
    lat = 0
    lat = self.lat if self.lat.to_f.abs <= 180
    lon = 0
    lon = self.lon if self.lon.to_f.abs <= 180
    cslg = ''
    cslg = self.country.slug if self.country
    return {:name=>self.name,:lon=>lon,:lat=>lat,:id=>self.id,:cat=>cat,:start=>sta,:clr=>clr,:slug=>self.slug,:cslg=>cslg,:title=>self.title}.to_json
  end

  def compact_marker
    clr = self.category ? self.category.id : 0
    lat = 0; 
    lat = (self.lat.to_f * 100).to_i / 100.0 if self.lat and self.lat.to_f.abs <= 180
    lon = 0; 
    lon = (self.lon.to_f * 100).to_i / 100.0 if self.lon and self.lon.to_f.abs <= 180
    return "#{self.id},#{clr},#{lat},#{lon}"
  end
=end

  def as_marker
    clr = self.category ? self.category.id : 0
    lat = 0; 
    lat = (self.lat.to_f * 100).to_i / 100.0 if self.lat and self.lat.to_f.abs <= 180
    lon = 0; 
    lon = (self.lon.to_f * 100).to_i / 100.0 if self.lon and self.lon.to_f.abs <= 180
    return {:o=>lon,:a=>lat,:i=>self.id,:c=>clr}.to_json
  end

  def accurate_marker
    clr = self.category ? self.category.id : 0
    lat = 0; 
    lat = self.lat.to_f if self.lat and self.lat.to_f.abs <= 180
    lon = 0; 
    lon = self.lon.to_f if self.lon and self.lon.to_f.abs <= 180
    return {:o=>lon,:a=>lat,:i=>self.id,:c=>clr}.to_json
  end

  def get_start_date
    date = self.start_date
    if date.length == 4
      return '00/00/'+date
    elsif date.length == 7
      return '00/'+date
    else
      return date
    end
  end

  def get_end_date
    date = self.end_date
    if date.length == 4
      return '00/00/'+date
    elsif date.length == 7
      return '00/'+date
    else
      return date
    end
  end

  def jsonize
    c = self
    v = self

    @json = {}
    named = [
      'mobilizing_groups',
      'mobilizing_forms',
      'conflict_events',
      'products',
      'env_impacts',
      'hlt_impacts',
      'sec_impacts',
      'tags',
    ]
    shorthand = {
      'mobilizing_groups'=>'mobgroup',
      'mobilizing_forms'=>'mobform',
      'conflict_events'=>'outcome',
      'products'=>'product',
      'env_impacts' => 'envi',
      'hlt_impacts' => 'hlti',
      'sec_impacts' => 'seci',
      'tags' => 'tag',
    }

    @json['id'] = c.id
    @json['category'] = c.category.id unless c.category.nil?
    @json['types'] = c.types.map(&:id) if c.types.any?
    @json['cntry'] = c.country.id unless c.country.nil?
    @json['comps'] = c.companies.map(&:id) if c.companies.any?
    @json['cmpcntry'] = c.companies.map(&:country_id) if c.companies.any?
    @json['cmpcntry'].delete(nil) if @json.has_key?('cmpcntry')
    @json['poptype'] = c.population_type+1 if c.population_type
    @json['invest'] = v.investment_sum
    @json['start'] = c.start_datestamp.year if c.start_datestamp
    @json['end'] = c.end_datestamp.year if c.end_datestamp
    @json['success'] = v.success_level
    @json['intensity'] = v.status.id if v.status
    @json['pstatus'] = v.project_status_id if v.project_status
    @json['stage'] = v.reaction_id if v.reaction
    named.each {|n| @json[shorthand[n]] = eval("v.#{n}").map(&:id)}
    return @json.to_json
  end

  def elastic
    result = {}
    self.attributes.each do |k,v|
      next if v.nil? or v == "" or ['marker','table','json','notes'].include? k
      result[k] = v
    end
    self.methods.grep(/^validate_associated_records_for_.*$/).each do |m| 
      a = m.to_s.split("validate_associated_records_for_")[1]
      next if a[0..1] == "c_" or ['legislations','weblinks','medialinks','references','documents','images'].include? a
      assoc = eval "self."+a
      next unless assoc.any?
      result[a] = []
      assoc.each do |ass|
        result[a] << ass.id
      end
    end
    result[:region_id] = self.country.region_id if self.country
    result
  end

  def print
    self.attributes.each do |k,v|
      next if v.nil? or v == "" or ['marker','table','json'].include? k
      puts
      if k.to_s[-3..-1] == "_id" and k != "status_id"
        begin
          ass = eval "self."+k.to_s[0...-3]
        rescue
        end
        next unless ass
        if ass.name
          puts (k.to_s[0...-3]+": ")+ass.name
        else
          puts (k.to_s[0...-3]+": ")+ass.attributes
        end
      elsif k == "status_id"
        puts (k.to_s[0...-3]+": ")+Status.find(v).name
      else
        puts (k.to_s+": ")+v.to_s
      end
    end
    self.methods.grep(/^validate_associated_records_for_.*$/).each do |m| 
      a = m.to_s.split("validate_associated_records_for_")[1]
      next if a[0..1] == "c_"
      assoc = eval "self."+a
      next unless assoc.any?
      puts
      puts a
      assoc.each do |a|
        at = ""
        a.attributes.each do |k,v|
          next if v.nil? or v == "" or k.to_s == "version_id" or k.match /^conflicts_/
          if k.to_s == "id"
            at += ("  "+k.to_s+": ")+v.to_s 
          else
            at += ("  "+k.to_s+": ")+v.to_s 
          end
        end
        puts at
      end
    end
    nil
  end

  def get_name(val)
    return $attrhash.select{|k,v| v == val}.keys[0]
  end

  def as_button(options={})
    require 'pp'
    if options.empty?
      html = "<p class='conflict-button' data-id='#{self.id}'><a href='/conflict/#{self.slug}'>#{self.name}</a>"
    else
      html = "<p class='conflict-button' data-id='#{self.id}'><span class='ctitle'>#{self.name}</span>&nbsp;<a href='/conflict/#{self.slug}' target='_blank'><span class='glyphicon glyphicon-link'></span></a>"

      tags = []
      ftags = (options['tag'] || []).map do |t| 
        if t.is_a?(Integer) or t == t.to_i.to_s
          Tag.find(t.to_i)
        else
          Tag.find_slug(t)
        end
      end
      ftags.each do |tag|
        next unless self.tags.include?(tag)
        tags << "<span class='badge' style='background-color:##{tag.domain || '666'}'>#{tag.name}</span>"
      end
      html += " &nbsp; #{tags.join(" &nbsp; ")}" if tags.any?

      html += "<span class='cdata'>"

      features = JSON.parse(self.features || "{}")
      list = []
      options["data"].each do |data|
        dat = "#{options['id']}:#{data}"
        next unless features[dat]
        next unless data
        list << "<span class='small'><strong>#{UnicodeUtils::titlecase(data.gsub(/[-_]/,' '))}:</strong> #{features[dat]}</span>"
      end
      if options["attrs"]
        options["attrs"].each do |data|
          k = data
          v = eval('self.'+k)
          next unless v
          if k.to_s[-3..-1] == "_id" and !["reaction_id","status_id"].include? k
            k = k.to_s[0...-3]
            begin
              ass = eval "self."+k
            rescue
              next
            end
            if ass.nil?
              val = ""
            elsif ass.name
              val = ass.name
            else
              val = ass.attributes
            end
          elsif k == "success_level"
            if v
              val = ["Success", "Not sure", "Failure"][v]
            else
              val = ""
            end
          elsif k == "reaction_id"
            if v
              val = Reaction.find(v).name
            else
              val = ""
            end
          elsif k == "status_id"
            if v
              val = Status.find(v).name
            else
              val = ""
            end
          elsif k == "population_type"
            if v
              val = ['Unknown','Urban','Semi-urban','Rural'][v]
            else
              val = ""
            end
          elsif k == "accuracy_level"
            if v
              val = ['','LOW country/state level','MEDIUM regional level','HIGH local level'][v]
            else
              val = ""
            end
          elsif v
            if v.strip.match(/(?:(?:http|https|Http|HTTP|Https|HTTPS):\/\/)?([-a-zA-Z0-9.]{2,256}\.[a-z]{2,4})\b(?:\/[-a-zA-Z0-9@:%_\+.~#?&\/=]*)?/)
              val = "<a href='#{v.strip}' target='_blank'>#{v.strip}</a>"
            else
              val = v
            end
          end
          next if val.nil? or val == ""
          list << "<span class='small'><strong>#{get_name k}:</strong> #{val}</span>"
        end
      end
      if options["mania"]
        options["mania"].each do |data|
          val = eval('self.'+data)
          next if val.empty?
          list << "<span class='small'><strong>#{get_name data}:</strong> #{val.map(&:name).join(', ')}</span>"
        end
      end

      html += "<br class='small'/>#{list.join("<br class='small'/>")}" if list.any?
      html += "</span>"
    end
    html += "</p>"
    return html
  end

  def as_table(options={})
    c = self
    v = self

    others = {
      "products" => [57,v.other_products,'commodity'],
      "conflict_events" => [26,v.other_outcomes],
      "mobilizing_groups" => [21,v.other_mobilizing_groups],
      "mobilizing_forms" => [28,v.other_mobilizing_forms]
    }

    tab = ''

    self.structure.each do |val|
      ta = ''
      val[2].each do |va|
        case va[0]
        when :sect
          ta += '<tr class="sect"><td><p class="lead" style="margin-bottom:0;font-size:14px;line-height:16px">'+va[-1]+'</p></td><td>'
        when :date
          cnt = eval va[1]+'.'+va[2]
          ta += '<tr><td class="fld">'+va[-1]+'</td><td>'+cnt.strftime("%d/%m/%Y")+'</td></tr>' unless cnt.nil? or cnt == ''
        when :flat
          cnt = eval va[1]+'.'+va[2]
          cnt = cnt.to_s
          cnt.gsub!(/\r/,"\n")
          cnt.gsub!(/\n\n/,"\n")
          ta += '<tr><td class="fld">'+va[-1]+'</td><td>'+cnt.gsub(/\n/,"<br/><br/>")+'</td></tr>' unless cnt.nil? or cnt == ''
        when :mini
          cnt = eval va[1]+'.'+va[2]
          cnt = cnt.to_s
          cnt.gsub!(/\r/,"\n")
          cnt.gsub!(/\n\n/,"\n")
          cna = cnt.split(/\n/)
          if cna.length == 0
            ta += ''
          elsif cna.length == 1 or options[:print] == true
            ta += '<tr><td class="fld">'+va[-1]+'</td><td class="columns">'+cnt.gsub(/\n/,"<br/><br/>")+'</td></tr>' unless cnt.nil? or cnt == ''
          else
            cn1 = cna[0]
            cn2 = cna[1..-1].join("<br/><br/>")
            ta += '<tr><td class="fld">'+va[-1]+'</td><td class="columns"><div class="less">'+cn1+'</div><a class="seemore" href="#">See more...</a><div class="more" style="display:none">'+cn2+'<br/><br/><a class="seeless" href="#">(See less)</a></div></td></tr>'
          end
        when :name
          cnt = eval va[1]+'.'+va[2]
          ta += '<tr><td class="fld">'+va[-1]+'</td><td>'+cnt.name+'</td></tr>' unless cnt.nil? or cnt == ''
        when :link
          cnt = eval va[1]+'.'+va[2]
          ta += '<tr><td class="fld">'+va[-1]+'</td><td><a href="/'+va[3].to_s+'/'+cnt.slug.to_s+'">'+cnt.name.to_s+'</a></td></tr>' unless cnt.nil? or cnt == ''
        when :self
          cnt = va[1]
          ta += '<tr><td class="fld">'+va[-1]+'</td><td>'+cnt+'</td></tr>' unless cnt.nil? or cnt == ''
        when :arra
          cnt = eval va[1]+'.'+va[2]
          ta += '<tr><td class="fld">'+va[-1]+'</td><td>'+va[3][cnt]+'</td></tr>' unless cnt.nil? or cnt == ''
        when :many
          man = eval 'v.'+va[1]
          arr = []
          man.each do |m| 
            if others.has_key? va[1]
              if m.id == others[va[1]][0]
                arr << others[va[1]][1]
              else
                arr << m.name
              end
            else
              arr << m.name
            end
          end
          cnt = arr.join '<br /> '
          ta += '<tr><td class="fld">'+va[-1]+'</td><td>'+cnt+'</td></tr>' unless cnt.nil? or cnt == ''
        when :mlnk
          man = eval 'v.'+va[1]
          arr = []
          man.each do |m| 
            if others.has_key? va[1]
              if m.id == others[va[1]][0]
                arr << others[va[1]][1]
              else
                begin
                  arr << "<a href='/"+others[va[1]][2]+"/"+m.slug+"'>"+m.name+"</a>"
                rescue
                  arr << m.name
                end
              end
            else
              begin 
                inv = ""
                pl = {'companies'=> 'company', 'supporters'=>'supporter'}
                joi = eval("v.c_#{va[1]}.where(#{pl[va[1]]}_id: #{m.id}).first")
                inv = " - <small>#{joi.involvement}</small>" if joi and joi.involvement.length > 0
              rescue
                inv = ""
              end
              begin 
                cda = ""
                cda = " from <a href='/country-of-#{va[2]}/#{m.country.slug}'><small>#{m.country.name}</small></a>" if m.country
              rescue
                cda = ""
              end
              begin 
                acr = ""
                acr = " <small>(#{m.acronym})</small>" if m.acronym.length > 0
              rescue
                acr = ""
              end
              begin
                arr << "<a href='/"+va[2]+"/"+m.slug+"'>"+m.name+acr+"</a>"+cda+inv
              rescue
                arr << m.name
              end
            end
          end
          cnt = arr.join "<br />"
          ta += '<tr><td class="fld">'+va[-1]+'</td><td>'+cnt+'</td></tr>' unless cnt.nil? or cnt == ''
        when :refs
          man = eval 'v.'+va[1]
          arr = []
          man.each do |m|
            url = ''
            tit = ''
            dsc = ''
            if options[:print] == true
              url = m.url if m.has_attribute? 'url' and m.url and m.url.length > 2
              url = m.file.url if m.has_attribute? 'file' and m.file
            else
              url = '<a class="refanch small" href="'+m.url+'" target="_blank">[click to view]</a>' if m.has_attribute? 'url' and m.url and m.url.length > 2
              url = '<a class="refanch small" href="'+m.file.url+'" target="_blank">[click to view]</a>' if m.has_attribute? 'file' and m.file
            end
            tit = m.title if m.has_attribute?('title') and m.title and m.title.length > 2
            tit = m.name if m.has_attribute?('name') and m.name and m.name.length > 2
            tit = "<strong>#{tit}</strong>" if tit.length > 0
            dsc = m.description if m.has_attribute?('description') and m.description and m.description.length > 2
            sep = ''
            sep = '<br/>' if (tit.length > 0 or dsc.length > 0) and url
            arr << '<td><p>'+tit+' '+dsc+''+sep+''+url+'</p></td>'
          end
          cnt = '<table><tr>'
          cnt += arr.join '</tr><tr>'
          cnt += '</tr></table>'
          ta += '<tr><td class="fld">'+va[-1]+'</td><td>'+cnt+'</td></tr>' unless arr.length == 0
        when :impc
          man = eval 'v.c_'+va[1]+'_impacts'
          avis = []
          apot = []
          man.each do |m|
            imp = ''
            imp += eval 'm.'+va[1]+'_impact.name'
            if m.visible
              avis << imp
            else
              apot << imp
            end
          end
          if avis.length+apot.length > 0
            ta += '<tr><td class="fld">'+va[-1]+'</td><td>'
            ta += "<strong>Visible: </strong>"+avis.join(', ') unless avis.length == 0
            ta += "<br />" if avis.length > 0 and apot.length > 0
            ta += "<strong>Potential: </strong>"+apot.join(', ') unless apot.length == 0
            ta += '</td></tr>'
          end
        when :subm
          next if v.account.nil? or !v.account.public
          cnt = eval 'v.account.'+va[1]
          ta += '<tr><td class="fld">'+va[-1]+'</td><td>'+cnt+'</td></tr>' if cnt != '' and cnt != nil
        end
      end
      if options[:print] == true
        tab += '<h3>'+val[0]+'</h3><table class="table"><tbody>'+ta+'</tbody></table>' unless ta === ''
      else
        tab += '<div class="horipane"><div class="title active">'+val[0]+'</div><div class="content"><table class="table"><tbody>'+ta+'</tbody></table></div></div>' unless ta === ''
      end
    end

    return tab.gsub(/\r\n/,'<br />').gsub('\n','<br />')
  end

  def structure
    [

      ['Description', '1', [
        [:mini, 'c' ,'description', ''],
      ]],

      ['Basic Data', '1', [
        [:flat, 'c' ,'name', 'Name'],
        [:link, 'v', 'country', 'country', 'Country'],
        [:flat, 'c' ,'province', 'Province'],
        [:flat, 'c' ,'site', 'Site'],
        [:arra, 'v' ,'accuracy_level', ['','LOW country/state level','MEDIUM regional level','HIGH local level'], 'Accuracy of Location'],
      ]],

      ['Source of Conflict', '1', [
        [:name, 'v', 'category', 'Type of Conflict (1st level)'],
        [:many, 'types', 'Type of Conflict (2nd level)'],
        [:mlnk, 'products', 'Specific Commodities'],
      ]],

      ['Project Details and Actors', '10', [
        [:mini, 'v' ,'project_details', 'Project Details'],
        [:flat, 'c' ,'project_area', 'Project Area (in hectares)'],
        [:flat, 'v' ,'investment_string', 'Level of Investment (in USD)'],
        [:arra, 'v' ,'population_type', ['Unknown','Urban','Semi-urban','Rural'], 'Type of Population'],
        [:flat, 'v' ,'affected_people', 'Potential Affected Population'],
        [:flat, 'c' ,'start_date', 'Start Date'],
        [:flat, 'v' ,'end_date', 'End Date'],
        [:mlnk, 'companies', 'company', 'Company Names or State Enterprises'],
        [:flat, 'c', 'govt_actors', 'Relevant government actors'],
        [:mlnk, 'supporters', 'institution', 'International and Financial Institutions'],
        [:flat, 'c', 'ejos', 'Environmental justice organisations and other supporters'],
      ]],

      ['The Conflict and the Mobilization', '2', [
        [:arra, 'v' ,'status_id', ['',"UNKNOWN","LATENT (no visible organising at the moment)","LOW (some local organising)","MEDIUM (street protests, visible mobilization)","HIGH (widespread, mass mobilization, violence, arrests, etc...)"], 'Intensity of Conflict (at highest level)'],
        [:arra, 'c' ,'reaction_id', ['',"UNKNOWN","LATENT (no visible resistance)","PREVENTIVE resistance (precautionary phase)","In REACTION to the implementation (during construction or operation)","Mobilization for reparations once impacts have been felt"], 'When did the mobilization begin'],
        [:many, 'mobilizing_groups', 'Groups Mobilizing'],
        [:many, 'mobilizing_forms', 'Forms of Mobilization'],
      ]],

      ['Impacts', '10', [
        [:impc, 'env', 'Environmental Impacts'],
        [:flat, 'v' ,'other_env_impacts', 'Other'],
        [:impc, 'hlt', 'Health Impacts'],
        [:flat, 'v' ,'other_hlt_impacts', 'Other'],
        [:impc, 'sec', 'Socio-economic Impacts'],
        [:flat, 'v' ,'other_sec_impacts', 'Other'],
      ]],

      ['Outcome', '10', [
        [:name, 'v', 'project_status', 'Project Status'],
        [:many, 'conflict_events', 'Pathways for conflict outcome / response'],
        [:flat, 'v' ,'suggested_alternatives', 'Development of Alternatives'],
        [:arra, 'c' ,'success_level', ['Yes','Not Sure','No'], 'Do you consider this as a success?'],
        [:flat, 'v' ,'success_reason', 'Why? Explain briefly.'],
      ]],

      ['Sources and Materials', '3', [
        [:refs, 'legislations', 'Legislations'],
        [:refs, 'references', 'References'],
        [:refs, 'weblinks', 'Links'],
        [:refs, 'medialinks', 'Media Links'],
        [:refs, 'documents', 'Other Documents'],
        [:flat, 'v' ,'other_comments', 'Other Comments'],
      ]],

      ['Meta Information', '8', [
        [:flat, 'c', 'contributor', 'Contributor'],
        [:date, 'c', 'modified_at', 'Last update'],
      ]]]
  end

  private
  def set_slug
    self.slug = Admin.slugify self.name unless self.slug
=begin
    if self.general and self.country and self.country.capital and self.country.capital.length > 0
      capital = self.country.capital.gsub(',','.').split("|")
      self.lat = capital[1]
      self.lon = capital[2]
    end
=end
    #puts "#{self.id} saved #{self.changed_attributes}"
    #ping
  end

end

class ConflictRelation < ActiveRecord::Base
  self.primary_key = :id
  belongs_to :from, :class_name => 'Conflict', :foreign_key => 'from_id' 
  belongs_to :to, :class_name => 'Conflict', :foreign_key => 'to_id'
  validate :must_be_unique, on: :create

  def must_be_unique
    errors.add(:to_id, "relation not unique") if ConflictRelation.where(to_id: to_id, from_id: from_id).any?
    errors.add(:from_id, "relation not unique") if ConflictRelation.where(to_id: from_id, from_id: to_id).any?
  end

  def self.both fid, sid
    both = ConflictRelation.where(to_id: fid, from_id: sid) | ConflictRelation.where(to_id: sid, from_id: fid)
    return both.first if both.any?
    return nil
  end
end

