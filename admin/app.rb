# coding: utf-8

class Admin < Padrino::Application
  use ActiveRecord::ConnectionAdapters::ConnectionManagement
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
  $siteurl = 'http://ejatlas.org'
  $pageauthor = 'EJOLT'
  $pagekeyws = ''
  $sitemail = 'ejoltmap@gmail.com'
  $baselayers = "Thunderforest.Landscape,Esri.WorldImagery,Esri.WorldTopoMap"

  $client = Elasticsearch::Client.new log:false

  configure :development do
    $consurl = 'http://0.0.0.0:3000'
  end

  configure :production do
    $consurl = 'http://ejatlas.org'
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

  def self.send_mail account, subject, message
    require 'mandrill'
    from = "EJOLT Project"  
    mandrill = Mandrill::API.new '1y8hsGaQBCSLuFhJ0I8dsA'
    message = {  
     :subject=> subject,
     :to=>[{  
       :email=> (account.id == 1 ? "ejoltmap@gmail.com" : account.email),
       :name=> account.name  
     }],  
     :html=> message,
     :from_email=>$sitemail,
     :from_name=> from
    }  
    if ENV['RACK_ENV'] == "development"
      puts "MANDRILL omitting mail =>\n#{pp message}"
      return
    end
    begin
      sending = mandrill.messages.send message  
    rescue => exc
      sending = exc
    end
    sending[0][:subject] = subject
    puts "MANDRILL #{sending}"
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
    @account = c.account
    return unless @account
    @conflict = c
    html = Tilt.new("#{Dir.getwd}/admin/views/mailers/notify_collaborator.haml").render(self)
    Admin.send_mail(@account, (c.approval_status == "approved" ? "#{c.name} approved on EJAtlas" : "Moderation update for #{c.name}"), html)
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
    role.protect "/featureds"
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
            Country.find_all_by_id(val.values.first).each do |c|
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

  def self.filter filter
    #puts JSON.pretty_generate(JSON.parse filter)
    filter = Admin.cleanup(Admin.elasticify({filtered:JSON.parse(filter)}))
    #puts JSON.pretty_generate(filter)
    p filter.to_json
    result = $client.search(index: 'atlas', type: 'conflict', body: {from:0,size:Conflict.count,fields:[],query:filter})['hits']['hits']
    puts result.length
    return result
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

end
