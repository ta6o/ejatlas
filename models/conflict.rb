#coding: utf-8
class Conflict < ActiveRecord::Base

  #validates_presence_of :name, :province, :category, :description

  has_many :conflict_texts
  has_many :conflict_accounts
  has_many :conflict_messages
  belongs_to :country

  belongs_to :category

  belongs_to :account
  belongs_to :project_status
  belongs_to :status
  belongs_to :reaction

  belongs_to :related_conflict
  has_one :related_conflict

  has_many :c_tags, :dependent => :destroy
  has_many :tags, :through => :c_tags

  has_many :c_types, :dependent => :destroy
  has_many :types, :through => :c_types

  has_many :c_products, :dependent => :destroy
  has_many :products, :through => :c_products

  has_many :c_companies, :dependent => :destroy
  has_many :companies, :through => :c_companies

  has_many :c_supporters, :dependent => :destroy
  has_many :supporters, :through => :c_supporters

  has_many :c_mobilizing_groups, :dependent => :destroy
  has_many :mobilizing_groups, :through => :c_mobilizing_groups

  has_many :c_mobilizing_forms, :dependent => :destroy
  has_many :mobilizing_forms, :through => :c_mobilizing_forms

  has_many :c_env_impacts, :dependent => :destroy
  has_many :env_impacts, :through => :c_env_impacts

  has_many :c_hlt_impacts, :dependent => :destroy
  has_many :hlt_impacts, :through => :c_hlt_impacts

  has_many :c_sec_impacts, :dependent => :destroy
  has_many :sec_impacts, :through => :c_sec_impacts

  has_many :c_conflict_events, :dependent => :destroy
  has_many :conflict_events, :through => :c_conflict_events

  has_many :legislations, :dependent => :destroy
  has_many :weblinks, :dependent => :destroy
  has_many :references, :dependent => :destroy
  has_many :medialinks, :dependent => :destroy

  has_many :documents, :dependent => :destroy
  accepts_nested_attributes_for :documents

  has_many :old_slugs, class_name: "OldSlug", as: :attachable, dependent: :destroy
  has_many :former_infos, class_name: "FormerInfo", as: :attachable, dependent: :destroy

  has_many :images, class_name: "Image", as: :attachable, dependent: :destroy
  accepts_nested_attributes_for :images

  has_many :relations_to, :foreign_key => 'to_id',  :class_name => 'ConflictRelation', :dependent => :destroy
  has_many :relations_from, :foreign_key => 'from_id', :class_name => 'ConflictRelation', :dependent => :destroy
  has_many :related_to, :through => :relations_to,   :source => :from 
  has_many :related_from, :through => :relations_from, :source => :to 

  before_save :set_slug
  after_destroy :delete_index

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
    if c = ConflictText.where(:slug=>slug.downcase).first
      return c.conflict
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

  def native_locale?
    self.original_locale == I18n.locale.to_s
  end

  def original_locale
    self.conflict_texts.order(:created_at).first.locale
  end

  def local_data locale=I18n.locale
    self.conflict_texts.where(:locale=>locale).first
  end

  def get_local_text attr, locale=I18n.locale
    if d = self.conflict_texts.where(:locale=>locale).first
      d.attributes[attr.to_s]
    elsif d = self.conflict_texts.order(:created_at).first
      d.attributes[attr.to_s]
    end
  end

  def set_local_text attr, val, locale=I18n.locale
    if d = self.local_data(locale)
      d.update_attribute attr.to_s, val
    elsif d = self.conflict_texts.order(:created_at).first
      d.update_attribute attr.to_s, val
    elsif self.id and d = ConflictText.create(:conflict_id => self.id, :locale=>locale)
      d.update_attribute attr.to_s, val
    end
  end

  def ping locale=I18n.locale
    ts = []

    t = Time.now
    self.json = self.jsonize(locale)
    ts << Time.now - t

    t = Time.now
    self.marker = self.as_marker.to_json
    ts << Time.now - t

    t = Time.now
    self.set_local_text "table", self.as_table(:locale=>locale), locale
    ts << Time.now - t

    ts
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
    clr = self.category ? self.category_id : 0
    rea = self.reaction ? self.reaction_id : 0
    sta = self.status ? self.status_id : 0
    pst = self.project_status ? self.project_status_id : 0
    lat = 0; 
    lat = (self.lat.to_f * 100).to_i / 100.0 if self.lat and self.lat.to_f.abs <= 90
    lon = 0; 
    lon = (self.lon.to_f * 100).to_i / 100.0 if self.lon and self.lon.to_f.abs <= 180
    return {:o=>lon,:a=>lat,:i=>self.id,:c=>clr,:r=>rea,:s=>sta,:p=>pst,:l=>self.conflict_texts.map(&:locale).join("-")}
  end

  def accurate_marker
    clr = self.category ? self.category.id : 0
    lat = 0; 
    lat = self.lat.to_f if self.lat and self.lat.to_f.abs <= 180
    lon = 0; 
    lon = self.lon.to_f if self.lon and self.lon.to_f.abs <= 180
    return {:o=>lon,:a=>lat,:i=>self.id,:c=>clr,:l=>self.conflict_texts.map(&:locale).join("-")}.to_json
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

  def jsonize locale
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

  def relations
    self.methods.grep(/^validate_associated_records_for_.*$/).map{|m|m.to_s.split("validate_associated_records_for_")[1]}
  end

  def elastic loc=I18n.locale
    result = {}
    self.attributes.each do |k,v|
      next if v.nil? or v == "" or ['marker','table','json','notes','start_date','end_date'].include? k
      if ["lat","lon"].include?(k)
        result[k] = v.to_f
      else
        result[k] = v
      end
    end
    self.local_data(loc).attributes.each do |k,v|
      next if v.nil? or v == "" or ['marker','table','json','notes','start_date','end_date'].include? k
      result[k] = v
    end
    result["id"] = self.id
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
    result["region_id"] = self.country.region_id if self.country
    result["collaborators"] = ConflictAccount.where(:conflict_id=>self.id).map(&:account_id)
    result
  end

  def index loc=I18n.locale
    $client.update index: "#{$esindex}_#{loc}", type: "conflict", id: self.id, body: { doc: self.elastic }
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
        if features[dat].strip.match(/(?:(?:http|https|Http|HTTP|Https|HTTPS):\/\/)?([-a-zA-Z0-9.]{2,256}\.[a-z]{2,4})\b(?:\/[-a-zA-Z0-9@:%_\+.~#?&\/=]*)?/)
          if features[dat].strip.match(/\s/)
            vvv = features[dat].split(/\s+/).map(&:strip).map { |vv| vv and vv.length > 0 ?  "<a href='#{vv}' target='_blank'>#{vv}</a>" : nil }-[nil]
            list << "<span class='small'><strong>#{UnicodeUtils::titlecase(data.gsub(/[-_]/,' '))}:</strong> #{vvv.join('<br/>')}</span>"
          else
            list << "<span class='small'><strong>#{UnicodeUtils::titlecase(data.gsub(/[-_]/,' '))}:</strong> <a href='#{features[dat]}' target='_blank'>#{features[dat]}</a></span>"
          end
        else
          list << "<span class='small'><strong>#{UnicodeUtils::titlecase(data.gsub(/[-_]/,' '))}:</strong> #{features[dat]}</span>"
        end
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
    loc = (options["locale"] || options[:locale] || I18n.locale).to_sym
    c = self
    v = self
    ct = self.local_data(loc)
    return "" unless ct

    others = {
      "products" => [57,ct.other_products,'commodity'],
      "conflict_events" => [26,ct.other_outcomes],
      "mobilizing_groups" => [21,ct.other_mobilizing_groups],
      "mobilizing_forms" => [28,ct.other_mobilizing_forms]
    }

    tab = ''

    self.structure(loc).each do |val|
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
          ta += '<tr><td class="fld">'+va[-1]+'</td><td>'+cnt.gsub(/\n/,"<br/>")+'</td></tr>' unless cnt.nil? or cnt == ''
        when :mini
          cnt = eval(va[1]+'.'+va[2]).to_s
          cnt.gsub!(/\r/,"\n")
          cnt.gsub!(/\n+/,"\n")
          cnt = "<p>#{cnt.gsub(/\n/,"</p><p>")}</p>" unless cnt.match(/<p>/)
          cna = cnt.split(/<\/p>\s*<p>/)
          if cna.length == 0
            ta += ''
          elsif cna.length == 1 or options[:print] == true
            ta += '<tr><td class="fld">'+va[-1]+'</td><td class="columns">'+cnt.gsub(/\n/,"<br/><br/>")+'</td></tr>' unless cnt.nil? or cnt == ''
          else
            cn1 = "#{cna[0]}</p>"
            cn2 = "<p>#{cna[1..-1].join("</p><p>")}"
            ta += '<tr><td class="fld">'+va[-1]+'</td><td class="columns"><div class="less">'+cn1+'</div><a class="seemore" href="#">'+I18n.t("v.info.see_more",:locale=>loc)+'</a><div class="more" style="display:none">'+cn2+'<br/><br/><a class="seeless" href="#">(See less)</a></div></td></tr>'
          end
        when :name
          cnt = eval va[1]+'.'+va[2]
          ta += '<tr><td class="fld">'+va[-1]+'</td><td>'+I18n.t("m.#{va[2]}_id.#{cnt.name.slug('_').split("_")[0..7].join("_")}",:locale=>loc)+'</td></tr>' unless cnt.nil? or cnt == ''
        when :link
          cnt = eval va[1]+'.'+va[2]
          if va[2] == "country"
            ta += '<tr><td class="fld">'+va[-1]+'</td><td><a href="/'+va[3].to_s+'/'+cnt.slug.to_s+'">'+I18n.t("countries.#{cnt.name.shorten_en}",:locale=>loc)+'</a></td></tr>' unless cnt.nil? or cnt == ''
          else
            ta += '<tr><td class="fld">'+va[-1]+'</td><td><a href="/'+va[3].to_s+'/'+cnt.slug.to_s+'">'+cnt.name.to_s+'</a></td></tr>' unless cnt.nil? or cnt == ''
          end
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
                arr << I18n.t("m.#{va[1]}.#{m.name.slug("_").split("_")[0..7].join("_")}",:locale=>loc)
              end
            else
              arr << I18n.t("m.#{va[1]}.#{m.name.slug("_").split("_")[0..7].join("_")}",:locale=>loc)
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
                  arr << "<a href='/"+others[va[1]][2]+"/"+m.slug+"'>"+I18n.t("m.#{va[1]}.#{m.name.slug('_').split("_")[0..7].join("_")}",:locale=>loc)+"</a>"
                rescue
                  arr << I18n.t("m.products.#{m.name.slug('_').split("_")[0..7].join("_")}",:locale=>loc)
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
          if va[1] == "documents" and false
            man = v.documents.where("copied?"=>nil,:locale=>loc)
          else
            man = eval "v.#{va[1]}.where(:locale=>:#{loc})"
          end
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
            dsc = CGI.unescapeHTML(m.description).gsub(/(<br\/>)+/,"<br/><br/>").gsub(/\n+/,"<br/><br/>") if m.has_attribute?('description') and m.description and m.description.length > 2
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
            imp = I18n.t("m.#{va[1]}_impacts.#{eval('m.'+va[1]+'_impact.name').slug('_').split("_")[0..7].join("_")}",:locale=>loc)
            if m.visible
              avis << imp
            else
              apot << imp
            end
          end
          if avis.length+apot.length > 0
            ta += '<tr><td class="fld">'+va[-1]+'</td><td>'
            ta += "<strong>#{I18n.t("f.conflict.visible",:locale=>loc)}: </strong>"+avis.join(', ') unless avis.length == 0
            ta += "<br />" if avis.length > 0 and apot.length > 0
            ta += "<strong>#{I18n.t("f.conflict.potential",:locale=>loc)}: </strong>"+apot.join(', ') unless apot.length == 0
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

  def structure loc
    [

      [I18n.t('f.conflict.description',:locale=>loc), '1', [
        [:mini, 'ct' ,'description', ''],
      ]],

      [I18n.t('f.conflict.basic_data',:locale=>loc), '1', [
        [:flat, 'ct' ,'name', I18n.t('f.conflict.name_of_conflict',:locale=>loc)],
        [:link, 'c', 'country', 'country', I18n.t('f.conflict.country',:locale=>loc)],
        [:flat, 'ct' ,'province', I18n.t('f.conflict.state_or_province',:locale=>loc)],
        [:flat, 'ct' ,'site', I18n.t('f.conflict.location_of_conflict',:locale=>loc)],
        [:arra, 'c' ,'accuracy_level', ['', I18n.t('m.accuracy_level.low_country_level',:locale=>loc), I18n.t('m.accuracy_level.medium_regional_level',:locale=>loc), I18n.t('m.accuracy_level.high_local_level',:locale=>loc)], I18n.t('f.conflict.accuracy_of_location',:locale=>loc)]
      ]],

      [I18n.t('f.conflict.source_of_conflict',:locale=>loc), '1', [
        [:name, 'c', 'category', I18n.t('f.conflict.type_conflict_1st_level',:locale=>loc)],
        [:many, 'types', I18n.t('f.conflict.type_conflict_2nd_level',:locale=>loc)],
        [:mlnk, 'products', I18n.t('f.conflict.specific_commodities',:locale=>loc)]
      ]],

      [I18n.t('f.conflict.project_details_actors',:locale=>loc), '10', [
        [:mini, 'ct' ,'project_details', I18n.t('f.conflict.project_details',:locale=>loc)],
        [:flat, 'ct' ,'project_area', I18n.t('f.conflict.project_area',:locale=>loc)],
        [:flat, 'ct' ,'investment_string', I18n.t('f.conflict.level_of_investment',:locale=>loc)],
        [:arra, 'c' ,'population_type', [ I18n.t('m.population_type.unknown',:locale=>loc), I18n.t('m.population_type.urban',:locale=>loc), I18n.t('m.population_type.semi_urban',:locale=>loc),I18n.t('m.population_type.rural',:locale=>loc)], I18n.t('f.conflict.type_of_population',:locale=>loc)],
        [:flat, 'ct' ,'affected_people', I18n.t('f.conflict.affected_population',:locale=>loc)],
        [:flat, 'c' ,'start_date', I18n.t('f.conflict.start_conflict',:locale=>loc)],
        [:flat, 'c' ,'end_date', I18n.t('f.conflict.end_conflict',:locale=>loc)],
        [:mlnk, 'companies', 'company', I18n.t('f.conflict.company_names_or_state_enterprises',:locale=>loc)],
        [:flat, 'ct', 'govt_actors', I18n.t('f.conflict.relevant_government_actors',:locale=>loc)],
        [:mlnk, 'supporters', 'institution', I18n.t('f.conflict.international_finance_institutions',:locale=>loc)],
        [:flat, 'ct', 'ejos', I18n.t('f.conflict.environmental_justice_organizations_other_supporters',:locale=>loc)]
      ]],

      [I18n.t('f.conflict.conflict_and_mobilization',:locale=>loc), '2', [
        [:arra, 'c' ,'status_id', ['', I18n.t('m.status_id.unknown',:locale=>loc), I18n.t('m.status_id.latent_no_visible_organising_at_the_moment',:locale=>loc), I18n.t('m.status_id.low_some_local_organising',:locale=>loc), I18n.t('m.status_id.medium_street_protests_visible_mobilization',:locale=>loc), I18n.t('m.status_id.high_widespread_mass_mobilization_violence_arrests_etc',:locale=>loc)], I18n.t('m.status_id.intensity',:locale=>loc)],
        [:arra, 'c' ,'reaction_id', ['', I18n.t('m.reaction_id.unknown',:locale=>loc), I18n.t('m.reaction_id.latent_no_visible_resistance',:locale=>loc), I18n.t('m.reaction_id.preventive_resistance_precautionary_phase',:locale=>loc), I18n.t('m.reaction_id.in_reaction_to_the_implementation_during_construction_or',:locale=>loc), I18n.t('m.reaction_id.mobilization_for_reparations_once_impacts_have_been_felt',:locale=>loc)], I18n.t('m.reaction_id.reaction_stage',:locale=>loc)],
        [:many, 'mobilizing_groups', I18n.t('f.conflict.groups_mobilizing',:locale=>loc)],
        [:many, 'mobilizing_forms', I18n.t('f.conflict.forms_of_mobilization',:locale=>loc)]
      ]],

      [I18n.t('f.conflict.impacts_project',:locale=>loc), '10', [
        [:impc, 'env', I18n.t('m.env_impacts.environmental_impacts',:locale=>loc)],
        [:flat, 'ct' ,'other_env_impacts', I18n.t('m.env_impacts.other_environmental_impacts',:locale=>loc)],
        [:impc, 'hlt', I18n.t('m.hlt_impacts.health_impacts',:locale=>loc)],
        [:flat, 'ct' ,'other_hlt_impacts', I18n.t('m.hlt_impacts.other_health_impacts',:locale=>loc)],
        [:impc, 'sec', I18n.t('m.sec_impacts.socio_economical_impacts',:locale=>loc)],
        [:flat, 'ct' ,'other_sec_impacts', I18n.t('m.sec_impacts.other_socio_economic_impacts',:locale=>loc)]
      ]],

      [I18n.t('f.conflict.outcome',:locale=>loc), '10', [
        [:name, 'c', 'project_status', I18n.t('m.project_status_id.project_status',:locale=>loc)],
        [:many, 'conflict_events', I18n.t('f.conflict.conflict_outcome_response',:locale=>loc)],
        [:flat, 'ct' ,'suggested_alternatives', I18n.t('f.conflict.development_of_alternatives',:locale=>loc)],
        [:arra, 'c' ,'success_level', [I18n.t('f.conflict.yes',:locale=>loc),I18n.t('f.conflict.not_sure',:locale=>loc),I18n.t('f.conflict.no',:locale=>loc)], I18n.t('f.conflict.do_you_consider_this_an',:locale=>loc)],
        [:flat, 'ct' ,'success_reason', I18n.t('f.conflict.briefly_explain',:locale=>loc)],
      ]],

      [I18n.t('f.conflict.sources_and_materials',:locale=>loc), '3', [
        [:refs, 'legislations', I18n.t('f.conflict.related_laws_legislations_juridical_texts',:locale=>loc)],
        [:refs, 'references', I18n.t('f.conflict.references_to_published_books_academic',:locale=>loc)],
        [:refs, 'weblinks', I18n.t('f.conflict.links_to_general_newspaper_articles',:locale=>loc)],
        [:refs, 'medialinks', I18n.t('f.conflict.related_media_links_to_videos',:locale=>loc)],
        [:refs, 'documents', I18n.t('f.conflict.other_documents',:locale=>loc)],
        [:flat, 'ct' ,'other_comments', I18n.t('f.conflict.other_comments',:locale=>loc)]
      ]],

      [I18n.t('f.conflict.meta_information',:locale=>loc), '8', [
        [:flat, 'c', 'contributor', I18n.t('f.conflict.contributor',:locale=>loc)],
        [:date, 'c', 'modified_at', I18n.t('f.conflict.last_update',:locale=>loc)]
      ]]]
  end


  def name locale=I18n.locale
    self.get_local_text("name",locale.to_s)
  end
  def name= val, locale=I18n.locale
    self.set_local_text("name",val,locale.to_s)
  end

  def slug locale=I18n.locale
    self.get_local_text("slug",locale.to_s)
  end
  def slug= val, locale=I18n.locale
    self.set_local_text("slug",val,locale.to_s)
  end

  def site locale=I18n.locale
    self.get_local_text("site",locale.to_s)
  end
  def site= val, locale=I18n.locale
    self.set_local_text("site",val,locale.to_s)
  end

  def province locale=I18n.locale
    self.get_local_text("province",locale.to_s)
  end
  def province= val, locale=I18n.locale
    self.set_local_text("province",val,locale.to_s)
  end

  def project_area locale=I18n.locale
    self.get_local_text("project_area",locale.to_s)
  end
  def project_area= val, locale=I18n.locale
    self.set_local_text("project_area",val,locale.to_s)
  end

  def project_length locale=I18n.locale
    self.get_local_text("project_length",locale.to_s)
  end
  def project_length= val, locale=I18n.locale
    self.set_local_text("project_length",val,locale.to_s)
  end

  def other_types locale=I18n.locale
    self.get_local_text("other_types",locale.to_s)
  end
  def other_types= val, locale=I18n.locale
    self.set_local_text("other_types",val,locale.to_s)
  end

  def description locale=I18n.locale
    self.get_local_text("description",locale.to_s)
  end
  def description= val, locale=I18n.locale
    self.set_local_text("description",val,locale.to_s)
  end

  def other_products locale=I18n.locale
    self.get_local_text("other_products",locale.to_s)
  end
  def other_products= val, locale=I18n.locale
    self.set_local_text("other_products",val,locale.to_s)
  end

  def project_details locale=I18n.locale
    self.get_local_text("project_details",locale.to_s)
  end
  def project_details= val, locale=I18n.locale
    self.set_local_text("project_details",val,locale.to_s)
  end

  def investment_string locale=I18n.locale
    self.get_local_text("investment_string",locale.to_s)
  end
  def investment_string= val, locale=I18n.locale
    self.set_local_text("investment_string",val,locale.to_s)
  end

  def affected_people locale=I18n.locale
    self.get_local_text("affected_people",locale.to_s)
  end
  def affected_people= val, locale=I18n.locale
    self.set_local_text("affected_people",val,locale.to_s)
  end

  def other_supporters locale=I18n.locale
    self.get_local_text("other_supporters",locale.to_s)
  end
  def other_supporters= val, locale=I18n.locale
    self.set_local_text("other_supporters",val,locale.to_s)
  end

  def related_conflict_string locale=I18n.locale
    self.get_local_text("related_conflict_string",locale.to_s)
  end
  def related_conflict_string= val, locale=I18n.locale
    self.set_local_text("related_conflict_string",val,locale.to_s)
  end

  def other_mobilizing_groups locale=I18n.locale
    self.get_local_text("other_mobilizing_groups",locale.to_s)
  end
  def other_mobilizing_groups= val, locale=I18n.locale
    self.set_local_text("other_mobilizing_groups",val,locale.to_s)
  end

  def other_mobilizing_forms locale=I18n.locale
    self.get_local_text("other_mobilizing_forms",locale.to_s)
  end
  def other_mobilizing_forms= val, locale=I18n.locale
    self.set_local_text("other_mobilizing_forms",val,locale.to_s)
  end

  def other_env_impacts locale=I18n.locale
    self.get_local_text("other_env_impacts",locale.to_s)
  end
  def other_env_impacts= val, locale=I18n.locale
    self.set_local_text("other_env_impacts",val,locale.to_s)
  end

  def other_hlt_impacts locale=I18n.locale
    self.get_local_text("other_hlt_impacts",locale.to_s)
  end
  def other_hlt_impacts= val, locale=I18n.locale
    self.set_local_text("other_hlt_impacts",val,locale.to_s)
  end

  def other_sec_impacts locale=I18n.locale
    self.get_local_text("other_sec_impacts",locale.to_s)
  end
  def other_sec_impacts= val, locale=I18n.locale
    self.set_local_text("other_sec_impacts",val,locale.to_s)
  end

  def other_outcomes locale=I18n.locale
    self.get_local_text("other_outcomes",locale.to_s)
  end
  def other_outcomes= val, locale=I18n.locale
    self.set_local_text("other_outcomes",val,locale.to_s)
  end

  def suggested_alternatives locale=I18n.locale
    self.get_local_text("suggested_alternatives",locale.to_s)
  end
  def suggested_alternatives= val, locale=I18n.locale
    self.set_local_text("suggested_alternatives",val,locale.to_s)
  end

  def success_reason locale=I18n.locale
    self.get_local_text("success_reason",locale.to_s)
  end
  def success_reason= val, locale=I18n.locale
    self.set_local_text("success_reason",val,locale.to_s)
  end

  def other_comments locale=I18n.locale
    self.get_local_text("other_comments",locale.to_s)
  end
  def other_comments= val, locale=I18n.locale
    self.set_local_text("other_comments",val,locale.to_s)
  end

  def table locale=I18n.locale
    self.get_local_text("table",locale.to_s)
  end
  def table= val, locale=I18n.locale
    self.set_local_text("table",val,locale.to_s)
  end

  def ejos locale=I18n.locale
    self.get_local_text("ejos",locale.to_s)
  end
  def ejos= val, locale=I18n.locale
    self.set_local_text("ejos",val,locale.to_s)
  end

  def govt_actors locale=I18n.locale
    self.get_local_text("govt_actors",locale.to_s)
  end
  def govt_actors= val, locale=I18n.locale
    self.set_local_text("govt_actors",val,locale.to_s)
  end

  def features locale=I18n.locale
    self.get_local_text("features",locale.to_s)
  end
  def features= val, locale=I18n.locale
    self.set_local_text("features",val,locale.to_s)
  end

  def headline locale=I18n.locale
    self.get_local_text("headline",locale.to_s)
  end
  def headline= val, locale=I18n.locale
    self.set_local_text("headline",val,locale.to_s)
  end

  def translator locale=I18n.locale
    self.get_local_text("translator",locale.to_s)
  end
  def translator= val, locale=I18n.locale
    self.set_local_text("translator",val,locale.to_s)
  end

  def reset_doc_pids
    self.documents.order(:id).order(:pid).each_with_index do |doc,ind|
      doc.update_attribute(:pid,ind+1)
    end
  end

  def reset_img_pids
    self.images.order(:id).order(:pid).each_with_index do |img,ind|
      img.update_attribute(:pid,ind+1)
    end
  end

  def inspect
    "##{self.id.to_s.rjust(5,"0").cyan}: #{self.name} (#{self.approval_status.magenta}, #{(self.attributes.values-[nil]).length.to_s.blue}/#{self.attributes.length.to_s.blue})"
  end

  private
  def delete_index
  end

  def set_slug
    if self.conflict_texts.any?
      self.slug = Admin.slugify self.name unless self.slug
    end
  end

end

class ConflictText < ActiveRecord::Base
  validates_each :conflict_id, :locale do |record, attr, value|
    unless value
      record.errors.add(attr, "#{attr} must be present!") 
    end
    if ConflictText.where(:conflict_id=>record.conflict_id,:locale=>record.locale).any?
      record.errors.add(attr, "Already exists!") 
    end
  end

  belongs_to :conflict

  def inspect
    "##{self.conflict_id.to_s.rjust(5,"0").cyan}-#{self.locale.to_s.green}-#{self.id.to_s.green}: #{self.name} (#{self.approval_status.magenta}, #{(self.attributes.values-[nil]).length.to_s.blue}/#{self.attributes.length.to_s.blue})"
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
