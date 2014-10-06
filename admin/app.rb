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
    mandrill = Mandrill::API.new '1y8hsGaQBCSLuFhJ0I8dsA'
    message = {  
     :subject=> subject,
     :from_name=> "EJOLT Project",  
     :to=>[{  
       :email=> account.email,
       :name=> account.name  
     }],  
     :html=> message,
     :from_email=>$sitemail
    }  
    puts mandrill
    sending = mandrill.messages.send message  
    puts "  MANDRILL #{sending}"
  end

  def self.new_account(a)
    @account = a
    html = Tilt.new("#{Dir.getwd}/admin/views/mailers/confirm.haml").render(self)
    Admin.send_mail(a, 'Welcome to EJAtlas', html)
  end

  def self.welcome(c)
    configure :production do
      deliver(:welcome, :confirm, c)
    end
    configure :development do
      puts Conflict.find(c).id
      acc = Conflict.find(c).versions.first.account
      puts 'Mailing: '+acc.full_name
      puts acc.name
      puts acc.id
      puts acc.surname
    end
  end

  def self.resetpwd(a)
    configure :production do
      deliver(:password, :reset, a)
    end
    configure :development do
      acc = Account.find a
      puts 'Mailing: '+acc.full_name
      puts acc.email
      puts acc.surname
    end
  end

  def self.invite(a)
    configure :production do
      deliver(:welcome, :invite, a)
    end
    configure :development do
      acc = Account.find a
      puts 'Mailing: '+acc.full_name
      puts acc.email
      puts acc.surname
    end
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

end
