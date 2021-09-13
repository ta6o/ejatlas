# coding: utf-8

class Admin < Padrino::Application

  #use ActiveRecord::ConnectionAdapters::ConnectionManagement
  #use ConnectionPoolManagement
  #register Padrino::Rendering
  register Padrino::Mailer
  register Padrino::Helpers
  register Padrino::Admin::AccessControl
  #register Sinatra::CrossOrigin

  ActiveSupport::Deprecation.silenced = true

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

  $tkeys = []
  Dir.foreach("#{Dir.pwd}/lib/locales") {|x| $tkeys << x.split(".")[0] unless x.match(/^\./)}

  require 'pp'
  require 'colorize'
  require 'net/http/persistent'
  require "./lib/i18n-translate-override.rb"
  load "./config/vars.rb"

  enable  :sessions
  enable  :store_location

  I18n::Backend::Simple.send(:include, I18n::Backend::Fallbacks)
  I18n.load_path << Dir[File.expand_path("./lib/locales/") + "/*.yml"]

  Admin.fetch_translations false
  I18n.backend.load_translations


  $title = 'EJAtlas'
  $iso639 = JSON.parse(File.read("#{Dir.pwd}/lib/iso639.json")).select {|x| $tkeys.include?(x)}

  $pagedesc = 'Mapping ecological conflicts and spaces of resistance'
  if ENV["RACK_ENV"] != "production"
    $domain  = 'localhost:3000'
    $siteurl = 'http://localhost:3000'
    $filedir = "#{Dir.pwd}/../file"
    $fileurl = 'https://file.ejatlas.org'
  else
    set :sessions, :domain => ".#{$siteurl.sub(/^https?:\/\//,"")}"
  end

  set :login_page, "/sessions/login"

  $pageauthor = 'EJOLT'
  $pagekeyws = ''
  $sitemail = 'ejoltmap@gmail.com'
  $session = nil

  $baselayers = "Esri.WorldImagery,Esri.WorldTopoMap,Esri.WorldPhysical"
  $alllayers = [ "OpenStreetMap.Mapnik", "OpenStreetMap.BlackAndWhite", "OpenStreetMap.DE", "OpenStreetMap.HOT", "Thunderforest.OpenCycleMap", "Thunderforest.Transport", "Thunderforest.Landscape", "Thunderforest.Outdoors", "OpenMapSurfer.Roads", "OpenMapSurfer.Grayscale", "Hydda.Full", "Hydda.Base", "MapQuestOpen.OSM", "MapQuestOpen.Aerial", "Stamen.Toner", "Stamen.TonerBackground", "Stamen.TonerLite", "Stamen.Terrain", "Stamen.TerrainBackground", "Stamen.Watercolor", "Esri.WorldStreetMap", "Esri.DeLorme", "Esri.WorldTopoMap", "Esri.WorldImagery", "Esri.WorldTerrain", "Esri.WorldShadedRelief", "Esri.WorldPhysical", "Esri.OceanBasemap", "Esri.NatGeoWorldMap", "Esri.WorldGrayCanvas", "HERE.normalDay", "HERE.normalDayCustom", "HERE.normalDayGrey", "HERE.normalDayMobile", "HERE.normalDayGreyMobile", "HERE.normalDayTransit", "HERE.normalDayTransitMobile", "HERE.normalNight", "HERE.normalNightMobile", "HERE.normalNightGrey", "HERE.normalNightGreyMobile", "HERE.carnavDayGrey", "HERE.hybridDay", "HERE.hybridDayMobile", "HERE.pedestrianDay", "HERE.pedestrianNight", "HERE.satelliteDay", "HERE.terrainDay", "HERE.terrainDayMobile", "Acetate.basemap", "Acetate.terrain", "Acetate.all", "Acetate.hillshading", "FreeMapSK", "MtbMap", "OpenMapSurfer.AdminBounds", "Hydda.RoadsAndLabels", "Stamen.TonerHybrid", "Stamen.TonerLines", "Stamen.TonerLabels", "OpenWeatherMap.Clouds", "OpenWeatherMap.CloudsClassic", "OpenWeatherMap.Precipitation", "OpenWeatherMap.PrecipitationClassic", "OpenWeatherMap.Rain", "OpenWeatherMap.RainClassic", "OpenWeatherMap.Pressure", "OpenWeatherMap.PressureContour", "OpenWeatherMap.Wind", "OpenWeatherMap.Temperature", "OpenWeatherMap.Snow", "Acetate.foreground", "Acetate.roads", "Acetate.labels"];

  $relatives = {"category_id" => "Categories", "types" => "Subcategories", "population_type" => "Population Type", "country_id" => "Country", "companies"=>"Companies","supporters"=>"IFI's","products"=>"Commodities", "mobilizing_groups" => "Mobilizing Groups", "mobilizing_forms" => "Mobilizing Forms", "env_impacts"=>"Environmental Impacts", "hlt_impacts"=>"Health Impacts", "sec_impacts"=>"Socioeconomical Impacts", "conflict_events" => "Outcomes"}

  $moderated_locales = []
  $available_locales = []

  def self.check_locales
    $moderated_locales = ["en"]
    Role.find_by_name("editor").account_roles.each do |ar| 
      if ar.account 
        ar.account.account_roles.each do |ro| 
          if ro.role.name.match(/^locale-/)
            loc = ro.role.name.sub(/^locale-/,"")
            if ConflictText.where(:locale=>loc,:approval_status=>"approved").any? and not $moderated_locales.include?(loc)
              $moderated_locales << loc 
            end
          end
        end
      end
    end
    []
  end
  self.check_locales

  def self.setOrder lgt, arr
    arr = arr.to_a
    other = nil
    arr.each do |a|
      if a.name == "Other"
        other = arr.delete(a) 
        break
      end
    end
    res = []
    stp = (arr.length/lgt).floor + 1
    srp = arr.length % lgt
    tur = 0
    stp.times do |s|
      tur = s - stp
      lgt.times do |l|
        l <= srp ? tur += stp : tur += stp - 1
        res.push arr[tur] if l < srp or s < stp - 1
      end
    end
    res << other unless other.nil?
    return res
  end

  if Conflict.table_exists?
    $countries = Country.all.order(:slug).select("name","id")
    $categories = Category.all.order :id
    if File.exists?("#{Dir.pwd}/public/data/alltypeoptions-en.html")
      $alltypeoptions = {}
      Dir.foreach("#{Dir.pwd}/public/data/").each do |file|
        next unless file.match(/^alltypeoptions-\w\w\.html/)
        loc = file.split("-")[1].split(".")[0]
        $alltypeoptions[loc] = File.read("#{Dir.pwd}/public/data/#{file}")
      end
    end
    $products = Admin.setOrder 4, Product.order('name asc')
    $impacts = [EnvImpact.all, HltImpact.all, SecImpact.all]
    $statuses = Status.all
    $reactions = Reaction.all
    $mobgroups = Admin.setOrder 3, MobilizingGroup.order('name asc')
    $mobforms = Admin.setOrder 3, MobilizingForm.order('name asc')
    $project_statuses = ProjectStatus.all.order :id
    $conflict_events = Admin.setOrder 2, ConflictEvent.order('name asc')
  end

  $ips = Socket.ip_address_list.find_all{|ai| ai.ipv4?}.map &:ip_address

  $client = Elasticsearch::Client.new({
    :host => 'localhost',
    :adapter => :net_http_persistent,
    :port => 9200,
    :user => 'elastic',
    :password => $espass,
    :scheme => 'http',
    :log => false,
  })
  $dlocale = :en

  Delayed::Worker.destroy_failed_jobs = false

  use Rack::Cors do
    allow do
      origins 'https://geo.ejatlas.org'
      resource '*', 
        :headers => :any, 
        :methods => [:get, :post, :options],
        :expose  => ['Content-Type']
    end
  end

  before do
    locale = request.host.split(".")[0].downcase
    if ["localhost","ejatlas","test","www"].include?(locale)
      I18n.default_locale = :en
      I18n.locale = :en
      @locale = :en
      @global = true
      @dir = "ltr"
      q = CGI::parse request.query_string
      if request.referrer and request.referrer.match(/translate=/) 
        q["translate"] = request.referrer.match(/translate=\w+/)[0].split("=")[1]
        I18n.locale = q["translate"]
        if I18n.locale != I18n.default_locale.to_s and request.get? and not request.query_string.match(/^translate=/) and not request.xhr?
          return redirect to "#{request.url.split(/\?/)[0]}?#{q.to_query}"
        end
      end
      if request.query_string.match(/^translate=/) and not request.xhr?
        loc = request.query_string.match(/&?translate=(\w+)/)[1]
        if $available_locales.include? loc
          I18n.locale = loc.to_sym
          @dir = (I18n.locale.to_s == "ar" ? "rtl" : "ltr")
        end
      end
      if I18n.locale.to_s != I18n.default_locale.to_s and (request.path.match(/\/new\/?$/) or request.path.match(/\/edit\/\d+\/?$/)) and not request.xhr?
        query = request.query_string.match(/^translate=\w+$/) ? "" : "?#{request.query_string.sub(/translate=\w{2}/,"")}"
        if $moderated_locales.include? I18n.locale.to_s 
          return redirect to "#{Admin.local_url}#{request.path}#{query}"
        else
          return redirect to "#{$siteurl}#{request.path}#{query}"
        end
      end
    elsif $moderated_locales.include? locale
      I18n.default_locale = :en
      begin
        @locale = locale
        I18n.locale = locale
      rescue
        @locale = :en
        I18n.locale = :en
      end
      @dir = (I18n.locale.to_s == "ar" ? "rtl" : "ltr")
    else
      return redirect to "#{$siteurl}#{request.path}?translate=#{locale}"
    end
    #puts "locale: #{@locale.to_s.yellow}"
  end

  after do
    ActiveRecord::Base.connection.close
  end

  get :translate do
    Admin.fetch_translations
    I18n.backend.reload!
    "Translation dictionaries updated at #{l Time.now}"
  end

  get :i18n do
    if params.has_key? "dl"
      Admin.fetch_translations
    end
    I18n.backend.reload!
    if params.has_key? "path"
      "Translation dictionaries updated at #{l Time.now}<br/><br/>#{I18n.load_path.join("<br/>")}"
    else
      "Translation dictionaries updated at #{l Time.now}"
    end
  end

  def self.cpp h,l,c,s
    h.each do |k,v|
      if v.is_a? String
        if s and v.length > 64
          puts "#{"  "*l}#{k.to_s.colorize(c)}#{":".red} #{"\"".magenta}#{v[0..64].gsub(/\n/,"↵")}#{"...\"".magenta}#{",".red}"
        elsif v.strip.match(/\n/)
          puts "#{"  "*l}#{k.to_s.colorize(c)}#{":".red} #{"\"\"\"".magenta}#{v.gsub(/\n/,"#{"↵".magenta}\n")}#{"\"\"\"".magenta}#{",".red}"
        else
          puts "#{"  "*l}#{k.to_s.colorize(c)}#{":".red} #{"\"".magenta}#{v}#{"\"".magenta}#{",".red}"
        end
      elsif v.is_a? Array
        puts "#{"  "*l}#{k.to_s.colorize(c)}#{":".red} #{"[".cyan}#{v.join(", ".cyan)}#{"]".cyan}#{",".red}"
      elsif v.is_a? Integer
        puts "#{"  "*l}#{k.to_s.colorize(c)}#{":".red} #{v.to_s.blue}#{",".red}"
      elsif v.is_a? Float
        puts "#{"  "*l}#{k.to_s.colorize(c)}#{":".red} #{v.to_s.green}#{",".red}"
      elsif v.is_a? Hash
        puts "#{"  "*(l)}#{k.to_s.colorize(c)}#{": {".red}"
        Admin.cpp v, l+1, c, s
        puts "#{"  "*(l)}#{"}".red}"
      end
    end
  end

  def self.color_pp hash, header=nil, color=:yellow, short=false
    if header
      puts "#{header}: {".red
    else
      puts "{".red
    end
    Admin.cpp hash,1,color.to_sym,short
    puts "}".red
  end

  def self.slugify str
    str.slug if str
  end

  def self.send_mail user, subject, message
    if ENV['RACK_ENV'] == "development"
      puts "SENDGRID omitting mail to #{user.email} =>".yellow
      puts subject
      return
    end
    require 'sendgrid-ruby'

    email = (user.id == 1 ? "ejoltmap@gmail.com" : user.email)
    stamp = Time.now.to_i.to_s

    sg = SendGrid::API.new(api_key:'***REMOVED***')

    from = SendGrid::Email.new(email: "no-reply@ejatlas.org", name: "EJOLT Project"  )
    to = SendGrid::Email.new(email: email, name: user.name)
    content = SendGrid::Content.new(type: 'text/html', value: message)

    mail = SendGrid::Mail.new(from, subject, to, content)
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

    begin
      sending = sg.client.mail._('send').post(request_body: mail.to_json)
      puts "SENDGRID #{sending.status_code} TO #{user.email}"
      puts sending
    rescue => exc
      sending = exc
      puts "SENDGRID #{sending}"
    end
  end

  def self.new_account(a)
    @account = a
    html = Tilt.new("#{Dir.getwd}/admin/views/mailers/confirm.haml").render(self)
    Admin.send_mail(a, I18n.t("emails.confirm.welcome_to_ejatlas"), html)
  end

  def self.notify_account_request(a)
    @account = a
    html = Tilt.new("#{Dir.getwd}/admin/views/mailers/notify_account_request.haml").render(self)
    Account.editors(@account.locale).each do |ed|
      Admin.send_mail(ed, I18n.t("emails.notify_account_request.new_message_from_var", account_name: @account.name), html)
    end
  end

  def self.notify_new_account(a)
    @account = a
    html = Tilt.new("#{Dir.getwd}/admin/views/mailers/notify_new_account.haml").render(self)
    Admin.send_mail(Account.find(1), I18n.t("emails.notify_new_account.new_message_from_var", account_name: @account.name), html)
  end

  def self.password_reset(a)
    @account = a
    html = Tilt.new("#{Dir.getwd}/admin/views/mailers/reset.haml").render(self)
    Admin.send_mail(a, I18n.t("emails.reset.password_reset_request"), html)
  end

  def self.notify_moderator(c)
    @account = c.account
    @conflict = c
    html = Tilt.new("#{Dir.getwd}/admin/views/mailers/notify_moderator.haml").render(self)
    Admin.send_mail(Account.find(1), I18n.t("emails.notify_moderator.case_updated_var", conflict_name: c.name), html)
  end

  def self.notify_collaborator(c)
    return
    @account = c.account
    return unless @account
    @collab = c.account
    @conflict = c
    html = Tilt.new("#{Dir.getwd}/admin/views/mailers/notify_collaborator.haml").render(self)
    Admin.send_mail(@account, (c.approval_status == "approved" ? I18n.t("emails.notify_collaborator.var_approved_on_ejatlas", conflict_name: c.name) : I18n.t("emails.notify_collaborator.moderation_update_for_var", conflict_name: c.name)), html)
  end

  def self.notify_mod_msg(m)
    @msg = m.content
    @account = m.account
    @conflict = m.conflict
    return unless @account
    if @account.editor?
      @collab = @conflict.account
      html = Tilt.new("#{Dir.getwd}/admin/views/mailers/notify_collaborator.haml").render(self)
      #Admin.send_mail(@collab, (@conflict.approval_status == "approved" ? "#{@conflict.name} approved on EJAtlas" : "Moderation update for #{@conflict.name}"), html)
      Admin.send_mail(@collab, (@conflict.approval_status == "approved" ? I18n.t("emails.notify_collaborator.var_approved_on_ejatlas", conflict_name: @conflict.name) : I18n.t("emails.notify_collaborator.moderation_update_for_var", conflict_name: @conflict.name)), html)
    else
      html = Tilt.new("#{Dir.getwd}/admin/views/mailers/notify_mod_msg.haml").render(self)
      #Admin.send_mail(Account.find(1), "New message from #{@account.name}", html)
      Admin.send_mail(Account.find(1), I18n.t("emails.notify_new_account.new_message_from_var", account_name: @account.name), html)
    end
    @conflict.conflict_accounts.each do |ca|
      @collab = ca.account
      next if @collab == @account
      html = Tilt.new("#{Dir.getwd}/admin/views/mailers/notify_collaborator.haml").render(self)
      #Admin.send_mail(@collab, (@conflict.approval_status == "approved" ? "#{@conflict.name} approved on EJAtlas" : "Moderation update for #{@conflict.name}"), html)
      Admin.send_mail(@collab, (@conflict.approval_status == "approved" ? I18n.t("emails.notify_collaborator.var_approved_on_ejatlas", conflict_name: @conflict.name) : I18n.t("emails.notify_collaborator.moderation_update_for_var", conflict_name: @conflict.name)), html)
    end
  end

  def self.language_suggested(cls,account)
    @account = account
    return unless @account
    @suggesting_account = cls.account
    @cls = cls
    @conflict = cls.conflict_text.conflict
    @language = $iso639[cls.locale]
    cloc = I18n.locale
    I18n.locale = cls.locale
    html = Tilt.new("#{Dir.getwd}/admin/views/mailers/language_suggested.haml").render(self)
    Admin.send_mail(@account, I18n.t("emails.conflict_locale_suggestion.moderation_request_for_var_on", conflict_name: @conflict.name, language:@language), html)
    I18n.locale = cloc
  end

  def self.collaborator_invite(ct,account,suggesting)
    @account = account
    @suggesting_account = suggesting
    @ct = ct
    @conflict = ct.conflict
    return unless @account or @suggesting_account or @ct or @conflict
    html = Tilt.new("#{Dir.getwd}/admin/views/mailers/collaborator_invite.haml").render(self)
    Admin.send_mail(@account, I18n.t("emails.conflict_collaborator_invite.collaboration_request", conflict: @ct.name), html)
  end

  def self.local_url locale=I18n.locale
    if locale and locale.to_s.length > 1
      $siteurl.split("://").join("://#{ locale.to_s == 'en' ? "" : locale.to_s+"." }")
    else
      $siteurl
    end
  end

  def self.export_markers locale=:en
    feats = []
    counter = 1
    total = ConflictText.where(:locale=>locale).count
    ConflictText.where(:locale=>locale).find_in_batches(batch_size: 64) do |batch|
      batch.each do |ct|
        c = ct.conflict
        next unless c
        next unless c.approval_status == "approved"
        print "\rProcessing conflict ##{c.id.to_s.red} (#{counter.to_s.green}/#{total.to_s.green})"
        counter += 1
        feats << {"type":"Feature","properties":{"id":c.id,"category_id":c.category_id,"name":ct.name},"geometry":{"type":"MultiPoint","coordinates":[[c.lon.to_f.round(5),c.lat.to_f.round(5)]]}}
      end
    end
    File.open("#{Dir.pwd}/public/data/ejatlas-cases_#{locale}.json","w") do |f|
      f << {"type":"FeatureCollection","features":feats}.to_json
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
  $cathash = {1 => "m.category_id.nuclear", 2 => "m.category_id.mineral_ores_and_building_materials_extraction", 3 => "m.category_id.waste_management", 4 => "m.category_id.biomass_and_land_conflicts_forests_agriculture_fisheries_and", 5 => "m.category_id.fossil_fuels_and_climate_justice_energy", 6 => "m.category_id.water_management", 7 => "m.category_id.infrastructure_and_built_environment", 8 => "m.category_id.tourism_recreation", 9 => "m.category_id.biodiversity_conservation_conflicts", 10 => "m.category_id.industrial_and_utilities_conflicts", 11 => "m.general.other"}

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
        #puts "#{key.to_s.magenta}, #{key.class}"
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
    result = $client.search(index: "#{$esindex}_#{global ? :en : I18n.locale}", body: {sort:{order=>{order:"desc"}},from:offset,size:size,"_source":{includes:[:id,:name,:slug,:headline,:modified_at]},query:filter})["hits"]["hits"].map{|x| x["_source"]}
    #pp result
    result
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
    if type == "conflict"
      if approved
        filter = Admin.elasticify( { bool: { must: { term: { approval_status: "approved" }}, filter: { bool: filter }}} )
      else
        filter = Admin.elasticify( { bool: { filter: { bool: filter }}} )
      end
      #puts filter.to_s.yellow
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
    #puts result.length.to_s.green
    #result
  end



  def self.get_elastic id
    begin
      return $client.get(index:"atlas_en", id:id)["found"]
    rescue
      return false
    end
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

  def self.divtime si=nil, shorten=false, detail=true
    if si.nil?
      puts "% divtime( seconds, [shorten=false], [detail=true] )".red
      return nil
    end
    if si.to_i == 0
      "no time"
    else
      mm, ss = si.to_i.divmod(60)
      hh, mm = mm.divmod(60)
      dd, hh = hh.divmod(24)
      if shorten
        y = ""
        o = ""
        d = dd > 0 ? "#{dd}d " : ""
        h = hh > 0 ? "#{hh}h " : ""
        m = mm > 0 ? "#{mm}m " : ""
        s = "#{ss}s"
      else
        mo, dd = dd.divmod(30)
        yr, mo = mo.divmod(12)
        y = yr > 0 ? (yr > 1 ? "#{yr} years, " : "1 year, " ) : ""
        o = mo > 0 ? (mo > 1 ? "#{mo} months, " : "1 month, " ) : ""
        d = dd > 0 ? (dd > 1 ? "#{dd} days, " : "1 day, " ) : ""
        h = hh > 0 ? (hh > 1 ? "#{hh} hours, " : "1 hour, " ) : ""
        m = mm > 0 ? (mm > 1 ? "#{mm} minutes, " : "1 minute, " ) : ""
        s = ss > 0 ? (ss > 1 ? "#{ss} seconds" : "1 second" ) : ""
      end
      if detail
        "#{y}#{o}#{d}#{h}#{m}#{s}".strip.sub(/,$/,"")
      elsif shorten
        "#{y}#{o}#{d}#{h}#{m}#{s}".strip.split(/\s+/)[0]
      else
        "#{y}#{o}#{d}#{h}#{m}#{s}".strip.split(/,\s+/)[0]
      end
    end
  end

	def self.human_bytes number
		units = %W(B KiB MiB GiB TiB).freeze
		if number.to_i < 1024
			exponent = 0
		else
			max_exp  = units.size - 1
			exponent = ( Math.log( number ) / Math.log( 1024 ) ).to_i
			exponent = max_exp if exponent > max_exp
			number  /= 1024 ** exponent
		end
		"#{number} #{units[exponent]}"
	end

  $goodies = [ "Dandelions", "Flowers and beetles", "A clean kitchen", "Blossoms", "Glitters", "Kisses and stuff", "Clean air", "A deep breath", "Power to the people"]
  $namies = [ "Herbie", "Barney", "Zahra", "Ernesto", "Turgut", "Igor", "Sebastian", "Akaki", "Bobo"]

  before do
    if current_account and current_account.privacy_accepted.nil? and not request.path.match(/^\/(privacy_policy|accept_privacy|legal)/)
      redirect to "/privacy_policy?return=#{request.path.sub(/^\//,'')}"
    end
  end

  after do
    #puts "#{request.xhr? ? "XHR " : ""}#{request.request_method} #{request.url} FROM #{request.ip}#{current_account ? "(#{current_account.email})" : ""} ON #{request.user_agent} AT #{Time.now} WITH #{params.keys}" unless request.path_info == "/error"
    Admin.log_stdout(request,response.status,current_account,params.keys)
  end

  not_found do
    Admin.log_stdout(request,404,current_account,params.keys)
    @name = "Page not found"
    render 'base/404'
  end

  error do
    @name = "Error"
    Admin.log_stdout(request,500,current_account,params.keys)
    render 'base/404'
  end

  post :error do
    platform = request.user_agent.gsub(/\([^\)]+\)/,"#|#").split("#|#")[-1].split(/\s+/)[-1]
    agent = request.user_agent.scan(/\([^\)]+\)/)[-1][1..-2].sub(/compatible;\s+/,"").split(/\s*[;,]\s*/)[0]
    color = :red
    color = :green if current_account
    color = :magenta if agent.downcase.match(/bot\//) or agent.downcase.match(/^\+http/)
    puts "#{Time.now.strftime("%Y%m%d%H%M%S%L")[2..-1].red} #{"ERROR".red} #{request.url.colorize(color)} FROM #{current_account ? "#{current_account.email.green}-" : ""}#{request.ip.cyan} ON #{platform.cyan} BY #{agent.cyan}"
    return 200
  end

  def self.find_fields model, field, index = 0
    model.where("#{field} is not ?",nil).where("#{field} is not ?","").map{|m| m.attributes[field]}[index]
  end

  def self.dump_capitals
    (Country.all.map(&:capital)-[nil]).sort
  end

  def self.parse_error error, color=:yellow
    error.backtrace.map{|x| x.match(/^(.+?):(\d+)(|:in `(.+)')$/); [$1,$2,$4] }.map {|x| x[0].match(/\/run/) ? "> #{x[0].split(/\//)[-1].colorize(color)} ##{x[1].colorize(color)} : #{x[2]}" : nil} - [nil]
  end


  def self.log_stdout request, status, account, keys
    begin
      platform = request.user_agent.gsub(/\([^\)]+\)/,"#|#").split("#|#")[-1].split(/\s+/)[-1]
      agent = request.user_agent.scan(/\([^\)]+\)/)[-1][1..-2].sub(/compatible;\s+/,"").split(/\s*[;,]\s*/)[0]
    rescue
      platform = request.user_agent || ""
      agent = request.user_agent || ""
    end
    color = :blue
    color = :green if account
    color = :magenta if agent.downcase.match(/bot\//) or agent.downcase.match(/^\+http/)
    scolor = :green
    scolor = color if request.xhr?
    if status >= 500
      color = :red 
      scolor = :red 
    elsif status >= 400
      color = :yellow 
      scolor = :yellow 
    end
    puts CGI.unescape("#{Time.now.strftime("%Y%m%d%H%M%S%L")[2..-1].colorize(color)} #{request.xhr? ? "X#{request.request_method}".rjust(5," ").colorize(color) : request.request_method.rjust(5," ").cyan} #{status.to_s.colorize(scolor)} #{I18n.locale.to_s.upcase.cyan}#{request.url.sub(/^https?:\/\/(\w+\.)?ejatlas\.org/,"").colorize(color)} #{account ? "#{account.email.green}" : ""}@#{request.ip.cyan} (#{platform.cyan}/#{agent.cyan})#{ (keys.any? and request.request_method != "GET") ? " [#{keys.map{|x| x.to_s.cyan}.join(",")}]" : ""}")
  end

  $tx_lock = false

  def self.tx_conflict ct, locale, all=false, verbose=false
    unless cn = ConflictText.where(:conflict_id=>ct.conflict_id, :locale=>locale).first
      ce = ConflictText.where(:conflict_id=>ct.conflict_id, :locale=>:en).first
      unless ce
        ce = ct
      end
      cn = ConflictText.new(:conflict_id=>ct.conflict_id, :locale=>locale, :approval_status=>"auto_tx", :slug=>ce.slug)
    end
    if cn.approval_status != "auto_tx"
      puts "translation already found!".yellow
      #return cn
    end
    unless $session
      puts "authenticating".red if verbose
      require "google_drive"
      api_id = "***REMOVED***.apps.googleusercontent.com"
      api_key = "***REMOVED***"
      $session = GoogleDrive.saved_session("./stored_token.json", nil, api_id, api_key)
    end
    puts "connecting".yellow if verbose
    ws = $session.spreadsheet_by_key("***REMOVED***").worksheet_by_title("auto_tx")
    fields = ["name", "headline", "site", "province", "project_area", "project_length", "other_types", "description", "other_products", "project_details", "investment_string", "affected_people", "other_supporters", "related_conflict_string", "other_mobilizing_groups", "other_mobilizing_forms", "other_env_impacts", "other_hlt_impacts", "other_sec_impacts", "other_outcomes", "suggested_alternatives", "success_reason", "other_comments", "ejos", "govt_actors", "translator"]
    fields.each_with_index do |x,i| 
      y = ct.attributes[x]
      if y
        if x == "description"
          ws[i+1,2] = y.gsub(/<br\/?>/,"$%&").gsub(/<\/(p|li)>/,"$%&$%&").strip_html.gsub(/&[^;]+;/,"")
        else
          ws[i+1,2] = y.gsub(/\n/," ")
        end
      else
        ws[i+1,2] = ""
      end
      ws[i+1,3] = "=GOOGLETRANSLATE(B#{i+1}, \"#{ct.locale}\",\"#{locale.to_s.sub(/^cn$/,"zh")}\")"
    end
    if $tx_lock
      puts "waiting for lock".yellow if verbose
      while $tx_lock
        sleep 0.1
      end
    end
    puts "updating".green if verbose
    $tx_lock = true
    ws.save
    puts "waiting".cyan if verbose
    b1 = nil
    while b1.nil?
      ws.reload
      b1 = ws[1,3]
      sleep 0.1
    end
    puts "loading".blue if verbose
    attrs = {}
    fields.each_with_index do |x,i| 
      val = ws[i+1,3]
      if val != "#VALUE!" and (all or cn.attributes[x].nil? or cn.attributes[x] === "")
        if x == "description"
          attrs[x] = val.gsub("$%&","<br/>")
        else
          attrs[x] = val 
        end
      end
    end
    $tx_lock = false
    pp attrs.symbolize_keys if verbose and false
    puts "saving".red if verbose
    cn.attributes = attrs
    cn.save!
    puts "pinging".yellow if verbose
    cn.conflict.ping
    cn
  end

  def self.update_all_cache
    cacheparams = {"filter"=>"on", "conflicts"=>"on", "countries"=>"on", "companies"=>"on", "ifis"=>"on", "commodities"=>"on", "categories"=>"on", "featureds"=>"on"}
    $available_locales.each do |loc|
      cacheparams["locale"] = loc
      AsyncTask.new.setcache cacheparams
    end
    "ack"
  end

  def self.svgwalk data, path
    Dir.foreach(path).sort.each do |f|
      next if f.match(/^\./)
      ff = "#{path.sub(/\/+$/,"")}/#{f}"
      if File.directory?(ff)
        data[f] = {"_files"=>[]}
        Admin.svgwalk(data[f],ff)
      elsif File.file?(ff)
        data["_files"] << f
      end
    end
  end

end

