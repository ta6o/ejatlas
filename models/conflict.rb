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

  has_many :c_government_actors
  has_many :government_actors, :through => :c_government_actors

  has_many :c_supporters
  has_many :supporters, :through => :c_supporters

  has_many :c_justice_parties
  has_many :justice_parties, :through => :c_justice_parties

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

  before_save :set_slug

  def self.find_slug slug
    if c = Conflict.find(:first, :conditions => ["slug = lower(?)", slug])
      return c
    elsif os = OldSlug.where("attachable_type = 'Conflict'").find(:first, :conditions => ["name = lower(?)", slug])
      return os.attachable
    else
      return nil
    end
  end

  def self.find_name name
    slug = Admin.slugify name
    Conflict.find(:first, :conditions => ["slug = lower(?)", slug])
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

  def as_marker
    clr = self.category ? self.category.id : 0
    cat = self.category ? self.category.name : ''
    sta = self.start_date ? self.start_date : ''
    lat = 0
    lat = self.lat if self.lat.to_f.abs <= 180
    lon = 0
    lon = self.lon if self.lon.to_f.abs <= 180
    cslg = ''
    cslg = self.country.slug if self.country
    return {:name=>self.name,:lon=>lon,:lat=>lat,:id=>self.id,:cat=>cat,:start=>sta,:clr=>clr,:val=>(self.project_details == "" ? 0 : 1),:slug=>self.slug,:cslg=>cslg}.to_json
  end

  def as_filter
    clr = self.category ? self.category.id : 0
    cat = self.category ? self.category.name : ''
    sta = self.start_date ? self.start_date : ''
    parea = self.project_area ? self.project_area.to_i : self.project_length.to_i
    products = []
    self.products.each {|p| products << {:name=>p.name,:id=>p.id}}
    companies = []
    self.companies.each {|p| companies << {:name=>p.name,:id=>p.id}}
    supporters = []
    self.supporters.each {|p| supporters << {:name=>p.name,:id=>p.id}}
    mgrps = []
    self.mobilizing_groups.each {|p| mgrps << {:name=>p.name,:id=>p.id}}
    mfrms = []
    self.mobilizing_forms.each {|p| mfrms << {:name=>p.name,:id=>p.id}}
    envi = []
    self.env_impacts.each {|p| envi << {:name=>p.name,:id=>p.id}}
    hlti = []
    self.hlt_impacts.each {|p| hlti << {:name=>p.name,:id=>p.id}}
    seci = []
    self.env_impacts.each {|p| seci << {:name=>p.name,:id=>p.id}}
    outcomes = []
    self.conflict_events.each {|p| outcomes << {:name=>p.name,:id=>p.id}}
    return {
      :id=>self.id,
      :name=>self.name,
      :slug=>self.slug,
      :cnam=>self.country.name,
      :cslg=>self.country.slug,

      :parea=>parea,
      :clr=>clr,
      :cat=>cat,

      :comm=>products,
      :cmps=>companies,
      :fncl=>supporters,
      :status=>self.status_id,
      :reaction=>self.reaction_id,
      :ptype=>self.population_type,

      :isum=>self.investment_sum,
      :start=>sta,
      :mgrps=>mgrps,
      :mfrms=>mfrms,

      :envi=>envi,
      :hlti=>hlti,
      :seci=>seci,

      :stage=>self.project_status_id,
      :success=>self.success_level,

      :outcomes=>outcomes,

      :lon=>self.lon.to_i,:lat=>self.lat.to_i,
    }.to_json
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
    ]
    shorthand = {
      'mobilizing_groups'=>'mobgroup',
      'mobilizing_forms'=>'mobform',
      'conflict_events'=>'outcome',
      'products'=>'product',
      'env_impacts' => 'envi',
      'hlt_impacts' => 'hlti',
      'sec_impacts' => 'seci',
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
    @json['start'] = c.start_date if c.start_date
    @json['end'] = v.end_date if c.end_date
    @json['success'] = v.success_level
    @json['intensity'] = v.status.id if v.status
    @json['pstatus'] = v.project_status_id if v.project_status
    @json['stage'] = v.reaction_id if v.reaction
    named.each {|n| @json[shorthand[n]] = eval("v.#{n}").map(&:id)}
    return @json.to_json
  end

  def print
    puts
    self.attributes.each do |k,v|
      next if v.nil? or v == ""
      if k.to_s[-3..-1] == "_id" and k != "status_id"
        ass = eval "self."+k.to_s[0...-3]
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
      puts a
      assoc.each do |a|
        at = ""
        a.attributes.each do |k,v|
          next if v.nil? or v == "" or k.to_s == "version_id"
          if k.to_s == "id"
            at += ("  "+k.to_s+": ")+v.to_s 
          else
            at += ("  "+k.to_s+": ")+v.to_s 
          end
        end
        puts at
      end
    end
    puts
  end

  def as_button(options={})
    return "<p><a href='/conflict/#{self.slug}'>#{self.name}</a></p>"
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
          ta += '<tr><td class="fld">'+va[-1]+':</td><td>'+cnt.strftime("%d/%m/%Y")+'</td></tr>' unless cnt.nil? or cnt == ''
        when :flat
          cnt = eval va[1]+'.'+va[2]
          cnt = cnt.to_s
          cnt.gsub!(/\r/,"\n")
          cnt.gsub!(/\n\n/,"\n")
          ta += '<tr><td class="fld">'+va[-1]+':</td><td>'+cnt.gsub(/\n/,"<br/><br/>")+'</td></tr>' unless cnt.nil? or cnt == ''
        when :mini
          cnt = eval va[1]+'.'+va[2]
          cnt = cnt.to_s
          cnt.gsub!(/\r/,"\n")
          cnt.gsub!(/\n\n/,"\n")
          cna = cnt.split(/\n/)
          if cna.length == 0
            ta += ''
          elsif cna.length == 1
            ta += '<tr><td class="fld">'+va[-1]+':</td><td>'+cnt.gsub(/\n/,"<br/><br/>")+'</td></tr>' unless cnt.nil? or cnt == ''
          else
            cn1 = cna[0]
            cn2 = cna[1..-1].join("<br/><br/>")
            ta += '<tr><td class="fld">'+va[-1]+':</td><td>'+cn1+'<br/><br/><a class="seemore" href="#">See more...</a><div class="more" style="display:none">'+cn2+'<br/><br/><a class="seeless" href="#">(See less)</a></div></td></tr>'
          end
        when :name
          cnt = eval va[1]+'.'+va[2]
          ta += '<tr><td class="fld">'+va[-1]+':</td><td>'+cnt.name+'</td></tr>' unless cnt.nil? or cnt == ''
        when :link
          cnt = eval va[1]+'.'+va[2]
          ta += '<tr><td class="fld">'+va[-1]+':</td><td><a href="/'+va[3].to_s+'/'+cnt.slug.to_s+'">'+cnt.name.to_s+'</a></td></tr>' unless cnt.nil? or cnt == ''
        when :self
          cnt = va[1]
          ta += '<tr><td class="fld">'+va[-1]+':</td><td>'+cnt+'</td></tr>' unless cnt.nil? or cnt == ''
        when :arra
          cnt = eval va[1]+'.'+va[2]
          ta += '<tr><td class="fld">'+va[-1]+':</td><td>'+va[3][cnt]+'</td></tr>' unless cnt.nil? or cnt == ''
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
          ta += '<tr><td class="fld">'+va[-1]+':</td><td>'+cnt+'</td></tr>' unless cnt.nil? or cnt == ''
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
                pl = {'companies'=> 'company', 'supporters'=>'supporter'}
                joi = eval("v.c_#{va[1]}.where(#{pl[va[1]]}_id: #{m.id}).first")
                inv = " - <small>#{joi.involvement}</small>" if joi and joi.involvement.length > 0
              rescue => exc
                inv = ""
              end
              begin 
                cda = " <a href='/country-of-#{va[2]}/#{m.country.slug}'><small>(#{m.country.name})</small></a>" if m.country
              rescue => exc
                cda = ""
              end
              begin 
                acr = " <small>(#{m.acronym})</small>" if m.acronym.length > 0
              rescue => exc
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
          ta += '<tr><td class="fld">'+va[-1]+':</td><td>'+cnt+'</td></tr>' unless cnt.nil? or cnt == ''
        when :refs
          man = eval 'v.'+va[1]
          arr = []
          man.each do |m|
            url = ''
            tit = ''
            dsc = ''
            url = '<a class="refanch" href="'+m.url+'" target="_blank">'+m.url+'</a>' if m.has_attribute? 'url' and m.url and m.url.length > 2
            url = '<a class="refanch" href="'+m.file.url+'" target="_blank">'+m.file.url.split("#{c.slug}/")[-1]+'</a>' if m.has_attribute? 'file' and m.file
            tit = m.title if m.has_attribute?('title') and m.title and m.title.length > 2
            tit = m.name if m.has_attribute?('name') and m.name and m.name.length > 2
            dsc = m.description if m.has_attribute?('description') and m.description and m.description.length > 2
            sep = ''
            sep = '<br/>' if (tit or dsc) and url
            arr << '<td><p>'+tit.to_s+''+dsc.to_s+''+sep+''+url.to_s+'</p></td>'
          end
          cnt = '<table><tr>'
          cnt += arr.join '</tr><tr>'
          cnt += '</tr></table>'
          ta += '<tr><td class="fld">'+va[-1]+':</td><td>'+cnt+'</td></tr>' unless arr.length == 0
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
            ta += '<tr><td class="fld">'+va[-1]+':</td><td>'
            ta += "<strong>Visible: </strong>"+avis.join(', ') unless avis.length == 0
            ta += "<br /><br />" if avis.length > 0 and apot.length > 0
            ta += "<strong>Potential: </strong>"+apot.join(', ') unless apot.length == 0
            ta += '</td></tr>'
          end
        when :subm
          next if v.account.nil? or !v.account.public
          cnt = eval 'v.account.'+va[1]
          ta += '<tr><td class="fld">'+va[-1]+':</td><td>'+cnt+'</td></tr>' if cnt != '' and cnt != nil
        else
          puts 'none'
        end
      end
      tab += '<h4>'+val[0]+'</h4><table class="table"><tbody>'+ta+'</tbody></table>' unless ta === ''
    end

    return tab.gsub(/\r\n/,'<br />').gsub('\n','<br />')+"<br />"
  end

  def structure
    [

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
        [:mini, 'c' ,'description', 'Description'],
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

      ['', '8', [
        [:flat, 'c', 'contributor', 'Contributor'],
        [:date, 'c', 'updated_at', 'Last update'],
      ]]]
  end

  private
  def set_slug
    self.slug = Admin.slugify self.name unless self.slug
    #ping
  end

end
