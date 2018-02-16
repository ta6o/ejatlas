# coding: utf-8

class Admin < Padrino::Application
  #use ActiveRecord::ConnectionAdapters::ConnectionManagement
  #use ConnectionPoolManagement
  #register Padrino::Rendering
  register Padrino::Mailer
  register Padrino::Helpers
  register Padrino::Admin::AccessControl

  ##
  # Application configuration options
  #
  # set :raise_errors, true        # Raise exceptions (will stop application) (default for test)
  # set :dump_errors, true         # Exception backtraces are written to STDERR (default for production/development)
  # set :show_exceptions, true     # Shows a stack trace in browser (default for development)
  # set :logging, true             # Logging in STDOUT for development and file for production (default only for development)
  # set :public_folder, "foo/bar"  # Location for static assets (default root/public)
  # set :reload, false             # Reload application files (default in development)
  # set :default_builder, "foo"    # Set a custom form builder (default 'StandardFormBuilder')
  # set :locale_path, "bar"        # Set path for I18n translations (default your_app/locales)
  # disable :sessions              # Disabled sessions by default (enable if needed)
  # disable :flash                 # Disables sinatra-flash (enabled by default if Sinatra::Flash is defined)
  # layout  :my_layout             # Layout can be in views/layouts/foo.ext or views/foo.ext (default :application)
  #

  require 'pp'
  enable  :sessions
  enable :store_location

  set :login_page, "/sessions/login"

  $title = 'EJAtlas'

  $pagedesc = 'Mapping ecological conflicts and spaces of resistance'
  if ENV["RACK_ENV"] == "production"
    $siteurl = 'https://ejatlas.org'
    $filedir = '/mnt/data/ejatlas-static'
    $fileurl = 'https://file.ejatlas.org'
  else
    $siteurl = 'http://localhost:3000'
    $filedir = Dir.pwd
    $fileurl = 'https://file.ejatlas.org'
  end
  $pageauthor = 'EJOLT'
  $pagekeyws = ''
  $sitemail = 'ejoltmap@gmail.com'

  $baselayers = "Thunderforest.Landscape,Esri.WorldImagery,Esri.WorldTopoMap"
  $relatives = {"category_id" => "Categories", "types" => "Subcategories", "population_type" => "Population Type", "country_id" => "Country", "companies"=>"Companies","supporters"=>"IFI's","products"=>"Commodities", "mobilizing_groups" => "Mobilizing Groups", "mobilizing_forms" => "Mobilizing Forms", "env_impacts"=>"Environmental Impacts", "hlt_impacts"=>"Health Impacts", "sec_impacts"=>"Socioeconomical Impacts", "conflict_events" => "Outcomes"}
  
  $ips = Socket.ip_address_list.find_all{|ai| ai.ipv4?}.map &:ip_address

  $client = Elasticsearch::Client.new log:false

  Delayed::Worker.destroy_failed_jobs = false

  configure :development do
    $consurl = 'http://0.0.0.0:3000'
  end

  configure :production do
    $consurl = 'http://ejatlas.org'
  end

  after do
    ActiveRecord::Base.connection.close
  end

  def self.slugify str
    return str if str.nil?
    res = str.to_ascii
      .downcase
      .strip
      .gsub(/[-_\s\/]+/, '-')
      .gsub(/[^\w-]/, '')
      .gsub(/-+/,'-')
    return res
  end

  def self.send_mail user, subject, message
    require 'sendgrid-ruby'
    include SendGrid

    email = (user.id == 1 ? "ejoltmap@gmail.com" : user.email)
    stamp = Time.now.to_i.to_s

    sg = SendGrid::API.new(api_key:'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')

    from = Email.new(email: "no-reply@ejatlas.org", name: "EJOLT Project"  )
    to = Email.new(email: email, name: user.name)
    content = Content.new(type: 'text/html', value: message)

    mail = Mail.new(from, subject, to, content)
    email = {
      :to => [email],
      :toname => [user.name],
      :from => "no-reply@ejatlas.org",
      :fromname => from,
      :subject => subject,
      :html => message,
      "x-smtpapi" => {
        "asm_group_id" => 743,
      }.to_json
    }

    if ENV['RACK_ENV'] == "development" and false
      puts "SENDGRID omitting mail =>\n#{pp message}"
      return
    end
    begin
      sending = sg.client.mail._('send').post(request_body: mail.to_json)
      puts "SENDGRID #{sending.status_code} #{sending.body.to_json}"
      puts
      puts sending
      puts
    rescue => exc
      sending = exc
      puts "SENDGRID #{sending}"
    end
  end

  def self.new_account(a)
    @account = a
    html = Tilt.new("#{Dir.getwd}/admin/views/mailers/confirm.haml").render(self)
    Admin.send_mail(a, 'Welcome to EJAtlas', html)
  end

  def self.notify_new_account(a)
    @account = a
    html = Tilt.new("#{Dir.getwd}/admin/views/mailers/notify_new_account.haml").render(self)
    Admin.send_mail(Account.find(1), 'New collaborator', html)
  end

  def self.password_reset(a)
    @account = a
    html = Tilt.new("#{Dir.getwd}/admin/views/mailers/reset.haml").render(self)
    Admin.send_mail(a, 'Password reset request', html)
  end

  def self.notify_moderator(c)
    @account = c.account
    @conflict = c
    html = Tilt.new("#{Dir.getwd}/admin/views/mailers/notify_moderator.haml").render(self)
    Admin.send_mail(Account.find(1), "Case updated: #{c.name}", html)
  end

  def self.notify_collaborator(c)
    return
    @account = c.account
    return unless @account
    @conflict = c
    html = Tilt.new("#{Dir.getwd}/admin/views/mailers/notify_collaborator.haml").render(self)
    Admin.send_mail(@account, (c.approval_status == "approved" ? "#{c.name} approved on EJAtlas" : "Moderation update for #{c.name}"), html)
  end

  def self.notify_mod_msg(m)
    @msg = m.content
    @account = m.account
    @conflict = m.conflict
    return unless @account
    if ["admin","editor"].include?(@account.role)
      @collab = @conflict.account
      html = Tilt.new("#{Dir.getwd}/admin/views/mailers/notify_collaborator.haml").render(self)
      Admin.send_mail(@collab, (@conflict.approval_status == "approved" ? "#{@conflict.name} approved on EJAtlas" : "Moderation update for #{@conflict.name}"), html)
    else
      html = Tilt.new("#{Dir.getwd}/admin/views/mailers/notify_mod_msg.haml").render(self)
      Admin.send_mail(Account.find(1), "New message from #{@account.name}", html)
    end
    @conflict.conflict_accounts.each do |ca|
      @collab = ca.account
      next if @collab == @account
      html = Tilt.new("#{Dir.getwd}/admin/views/mailers/notify_collaborator.haml").render(self)
      Admin.send_mail(@collab, (@conflict.approval_status == "approved" ? "#{@conflict.name} approved on EJAtlas" : "Moderation update for #{@conflict.name}"), html)
    end
  end

  def self.newsletter(a)
    @account = Account.find a
    return 0 unless @account
    html = Tilt.new("#{Dir.getwd}/admin/views/mailers/newsletter.haml").render(self)
    Admin.send_mail(@account, "EJAtlas Newsletter", html)
  end

  access_control.roles_for :any do |role|
    role.allow '/'
    role.protect "/conflicts"
    role.protect "/countries"
    role.protect "/companies"
    role.protect "/commodities"
    role.protect "/types"
    role.protect "/featureds"
  end

  access_control.roles_for :user do |role|
    role.allow "/conflicts"
    role.protect "/countries"
    role.protect "/companies"
    role.protect "/commodities"
    role.protect "/types"
    #role.protect "/featureds"
  end

  access_control.roles_for :admin do |role|
    role.allow "/"
  end

  access_control.roles_for :editor do |role|
    role.allow "/"
  end

  $attrhash = {"Category" => "category_id", "Types" => "types", "Other Types" => "other_types", "Description" => "description", "Country" => "country_id", "Province" => "province", "Site" => "site", "Level of Accuracy" => "accuracy_level", "Project Area" => "project_area", "Project Length" => "project_length", "Type of Population" => "population_type", "Commodities" => "products", "Other Commodities" => "other_products", "Companies" => "companies", "IFI's" => "supporters", "Other IFI's" => "other_supporters", "EJO's" => "ejos", "Government Actors" => "govt_actors", "Mobilizing Groups" => "mobilizing_groups", "Other Mobilizing Groups" => "other_mobilizing_groups", "Mobilizing Forms" => "mobilizing_forms", "Other Mobilizing Forms" => "other_mobilizing_forms", "Environmental Impacts" => "env_impacts", "Other Environmental Impacts" => "other_env_impacts", "Health Impacts" => "hlt_impacts", "Other Health Impacts" => "other_hlt_impacts", "Socio-economic Impacts" => "sec_impacts", "Other Socio-economic Impacts" => "other_sec_impacts", "Outcomes" => "conflict_events", "Other Outcomes" => "other_outcomes", "Project Details" => "project_details", "Level of Investment" => "investment_string", "Potentially Affected Population" => "affected_people", "Intensity Level" => "status_id", "Reactionary Stage" => "reaction_id", "Start Date" => "start_date", "End Date" => "end_date", "Project Status" => "project_status_id", "Development of Alternatives" => "suggested_alternatives", "Succes Level" => "success_level", "Success Reason" => "success_reason", "Other Comments" => "other_comments"}

  def self.elasticify obj
    if obj.nil?
      {}
    elsif obj.is_a? String
      begin 
        Float(obj).to_i
      rescue
        obj
      end
    elsif obj.is_a? Array
      obj.map{|item| Admin.elasticify item}
    elsif obj.is_a? Hash
      terms = {}
      coc = nil
      range = nil
      obj.each do |key,val|
        if val.is_a? String and val.length == 0 and key == "must"
          obj[key] = {}
        end
        if val.is_a? Array
          if key == 'bool'
            bool = {'should'=>[],'must'=>[],'must_not'=>[]}
            obj['bool'].each do |arr|
              arr.each do |k,v| bool[k] << v end
            end
            bool.delete_if {|k,v| v == []}
            obj['bool'] = bool
          elsif key == 'term'
            val.each do |it|
              terms[it.keys.first] = [] unless terms.has_key? it.keys.first
              terms[it.keys.first] << it.values.first
            end
            obj.delete('term')
          end
        end
        if val.is_a? Hash 
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
            if k.match(/datestamp$/)
              r = val.values.first.split(':').map{|i| i.to_i}
              r[0] = Date.new(r[0])
              r[1] = Date.new(r[1]+1) - 1.days
            else
              r = val.values.first.split(':').map{|i| i.to_i}
            end
            puts r
            range = {k=>{"gte"=>r[0],"lte"=>r[1]}}
            obj.delete('term')
          end
        end
      end
      obj['range'] = range if range
      if terms == {}
        obj['terms'] = coc if coc
        obj.merge(obj){|k,v| Admin.elasticify v}
      else
        val = []
        obj.each do |k,v|
          val << {k=>v}
        end
        terms.each do |k,v| 
          #puts "#{k}, #{v}"
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
              v.each do |i|
                val << {'term'=>{k=>i}}
              end
            end
          end
        end
        val.map{|item| Admin.elasticify item}
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

  def self.filter filter, all_if_empty=true, stored_fields=[]
    return [] if !all_if_empty and ["{}","",nil].include?(filter)
    #puts JSON.pretty_generate(JSON.parse(filter))
    filter = Admin.elasticify( { bool: { must: { term: { approval_status: "approved" }}, filter: { bool: JSON.parse( filter ) }}} )
    #puts JSON.pretty_generate(filter)
    filter = Admin.cleanup(filter)
    #filter = { bool: { must: { term: { approval_status: "approved" }}, filter: { bool: JSON.parse( filter ) }}}
    #puts JSON.pretty_generate(filter)
    #pp stored_fields

    result = $client.search(index: 'atlas', type: 'conflict', body: {from:0,size:Conflict.count,"_source":{includes:stored_fields},query:filter})['hits']['hits']
  end

  def self.old_filter options
    require 'pp'
    map = {"cntry" => "country_id", "comp" => "company", "success" => "success_level", "poptype" => "population_type", "category" => "category_id", "types" => "type", "intensity" => "status_id", "envi" => "env_impact", "hlti" => "hlt_impact", "seci" => "sec_impact", "mobgroup" => "mobilizing_group", "mobform" => "mobilizing_form", "product" => "product", "pstatus" => "project_status_id", "stage" => "reaction_id", "outcome" => "conflict_event", "tag" => "tag"}
    simple = ["country_id", "success_level", "population_type", "category_id", "status_id", "project_status_id", "reaction_id"]
    relation = ["company", "type", "env_impact", "hlt_impact", "sec_impact", "mobilizing_group", "mobilizing_form", "product", "conflict_event", "tag"]
    comparison = ["invest-g","invest-l","start-g","start-l","end-g","end-l"]
    hash = {}
    if options.class == String
      #puts options
      if options[0] == "{"
        options = JSON.parse(options)
      else
        arr = options.split('/')
        options = {}
        arr.each do |a|
          h = a.split(/[~=]/)
          map.has_key?(h[0]) ? k = map[h[0]] : k = h[0]
          h[-1].match(/,/) ? v = h[-1].split(',').map{|i|i.to_i} : v = [h[-1].to_i]
          options[k] = v
        end
      end
    end
    rarray = []
    #pp options
    options.each do |k,v|
      map.has_key?(k) ? k = map[k] : k = k
      rarray << []
      if simple.include? k
        v.each do |va|
          va -= 1 if k == "population_type"
          rarray[-1] << Conflict.where(approval_status: 'approved').where("#{k} = ?",va)#.select('conflicts.id, name, slug, features, approval_status')
        end
      elsif relation.include? k
        model = eval(UnicodeUtils.titlecase(k.gsub(/[_-]/,' ')).gsub(/\s/,''))
        v.each do |va|
          if va.is_a?(Integer) or va == va.to_i.to_s
            rarray[-1] << model.find(va.to_i).conflicts.where(approval_status: 'approved')#.select('conflicts.id, name, slug, features, approval_status')
          else
            rarray[-1] << model.find_by_slug(va).conflicts.where(approval_status: 'approved')#.select('conflicts.id, name, slug, features, approval_status')
          end
        end
      elsif comparison.include? k
        operator = {'g'=>'>','l'=>'<'}[k.split('-')[-1]]
        field = {'invest'=>'investment_sum','start'=>'start_datestamp','end'=>'end_datestamp'}[k.split('-')[0]]
        v = v[0].to_i
        v = Date.parse("#{v}-12-31") if ['start-g','end-g'].include? k
        v = Date.parse("#{v}-01-01") if ['start-l','end-l'].include? k
        p Conflict.where("#{field} #{operator} ?",v).to_sql
        rarray[-1] << Conflict.where("#{field} #{operator} ?",v)#.select('conflicts.id, name, slug, features, approval_status')
      end
    end
    resu = []
    rarray.each do |res|
      re = []
      res.each do |r|
        re = re | r
      end
      resu << re
    end
    result = resu.first
    resu.each do |res|
      result = result & res
    end
    result
  end

  $goodies = [ "Dandelions", "Flowers and beetles", "A clean kitchen", "Blossoms", "Glitters", "Kisses and stuff", "Clean air", "A deep breath", "Power to the people"]
  $namies = [ "Herbie", "Barney", "Zahra", "Ernesto", "Turgut", "Igor", "Sebastian", "Akaki", "Bobo", "Ayşe"]

  before do
    puts "#{request.xhr? ? "XHR " : ""}#{request.request_method} #{request.url} FROM #{request.ip}#{current_account ? "(#{current_account.email})" : ""} ON #{request.user_agent} AT #{Time.now} WITH #{params}" unless request.path_info == "/error"
  end

  post :error do
    puts "CLIENT ERROR FROM  #{request.ip}#{current_account ? "(#{current_account.email})" : ""} ON #{request.user_agent} AT #{Time.now} WITH #{params}"
    return 200
  end

  def self.dump_capitals
    (Country.all.map(&:capital)-[nil]).sort
  end

end
