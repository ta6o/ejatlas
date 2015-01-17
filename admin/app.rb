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
  set :show_exceptions, true     # Shows a stack trace in browser (default for development)
  # set :logging, true             # Logging in STDOUT for development and file for production (default only for development)
  # set :public_folder, "foo/bar"  # Location for static assets (default root/public)
  # set :reload, false             # Reload application files (default in development)
  # set :default_builder, "foo"    # Set a custom form builder (default 'StandardFormBuilder')
  # set :locale_path, "bar"        # Set path for I18n translations (default your_app/locales)
  # disable :sessions              # Disabled sessions by default (enable if needed)
  # disable :flash                 # Disables sinatra-flash (enabled by default if Sinatra::Flash is defined)
  # layout  :my_layout             # Layout can be in views/layouts/foo.ext or views/foo.ext (default :application)
  #

  enable  :sessions
  enable :store_location

  set :login_page, "/sessions/login"

  $title = 'EJAtlas'
  $pagedesc = 'Mapping ecological conflicts and spaces of resistance'
  $siteurl = 'http://ejatlas.org'
  $pageauthor = 'EJOLT'
  $pagekeyws = ''
  $sitemail = 'ejoltmap@gmail.com'
  $baselayers = ["Esri.WorldImagery", "Thunderforest.Landscape", "Esri.WorldTopoMap"]

  configure :development do
    $consurl = 'http://0.0.0.0:3000'
  end

  configure :production do
    $consurl = 'http://console.ejatlas.org'
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
    puts mandrill
    begin
      sending = mandrill.messages.send message  
    rescue => exc
      sending = exc
    end
    sending[0][:subject] = subject
    puts "  MANDRILL #{sending}"
  end

  def self.new_account(a)
    @account = a
    html = Tilt.new("#{Dir.getwd}/admin/views/mailers/confirm.haml").render(self)
    Admin.send_mail(a, 'Welcome to EJAtlas', html)
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

  def self.filter options
    require 'pp'
    map = {"cntry" => "country_id", "comp" => "company", "success" => "success_level", "poptype" => "population_type", "category" => "category_id", "types" => "type", "intensity" => "status_id", "envi" => "env_impact", "hlti" => "hlt_impact", "seci" => "sec_impact", "mobgroup" => "mobilizing_group", "mobform" => "mobilizing_form", "product" => "product", "pstatus" => "project_status_id", "stage" => "reaction_id", "outcome" => "conflict_event", "tag" => "tag"}
    simple = ["country_id", "success_level", "population_type", "category_id", "status_id", "project_status_id", "reaction_id"]
    relation = ["company", "type", "env_impact", "hlt_impact", "sec_impact", "mobilizing_group", "mobilizing_form", "product", "conflict_event", "tag"]
    comparison = ["invest-g","invest-l","start-g","start-l","end-g","end-l"]
    hash = {}
    if options.class == String
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
    pp options
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
end
