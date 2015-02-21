#coding: utf-8
Admin.controller do

  before do
    @layout = :full
  end

  post "/image" do
    image = Base64::decode64 params["image"].sub("data:image/png;base64,","")
    File.open("#{Dir.pwd}/public/t.png","wb"){|f| f << image}
    return 'ok'
  end

  get :about do
    @name = "About"   
    #last_modified File.mtime("#{PADRINO_ROOT}/admin/views/base/about.haml")
    render "base/about", :layout => @layout
  end
  get :faq do
    @name = "Frequently Asked Questions"   
    #last_modified File.mtime("#{PADRINO_ROOT}/admin/views/base/faq.haml")
    render "base/faq", :layout => @layout
  end
  get :disclaimer do
    @name = "Disclaimer"   
    #last_modified File.mtime("#{PADRINO_ROOT}/admin/views/base/disclaimer.haml")
    render "base/disclaimer", :layout => @layout
  end

  get :contact do
    @name = "Contact"   
    #last_modified File.mtime("#{PADRINO_ROOT}/admin/views/base/contect.haml")
    render "base/contact", :layout => @layout
  end

  get :credits do
    @name = "Credits & Collaborators"   
    #last_modified File.mtime("#{PADRINO_ROOT}/admin/views/base/credits.haml")
    render "base/credits", :layout => @layout
  end

  get :welcome do
    @name = "Welcome"   
    #last_modified File.mtime("#{PADRINO_ROOT}/admin/views/base/welcome.haml")
    render "base/welcome", :layout => @layout
  end

  get :mailsent do
    @name = "You'll receive an email..."   
    #last_modified File.mtime("#{PADRINO_ROOT}/admin/views/base/welcome.haml")
    render "base/mailsent", :layout => @layout
  end

  get :index do
    ca = Cached.first
    #last_modified ca.updated_at
    @filterform = JSON.parse(ca.filterdata)
    @filter = render "base/filter", :layout => false
    @markercount = Conflict.where(approval_status: 'approved').count
    @markerinfo = ca.conflicts_marker
    @filterinfo = ca.conflicts_json
    countries = JSON.parse(ca.countries)
    companies = JSON.parse(ca.companies)[0..100]
    commodities = JSON.parse(ca.commodities)
    types = JSON.parse(ca.types)
    @browseinfo = {"country"=>countries,"company"=>companies,"commodity"=>commodities,"type"=>types}
    @maptitle = "World Map"
    #@vectors = VectorDatum.where(name:'Borders').select('name,url,style,description').to_json
    @desc = "One of the primary objectives of EJOLT is to compile and make available a ‘Map of Environmental Injustice’. This map will consist on an online unique database of resource extraction and disposal conflicts hosted on the project website, geographically referenced (mapped with GIS), and linked with social metabolism and socio- environmental indicators."
    @baselayers = "Esri.WorldImagery,Thunderforest.Landscape,Esri.WorldTopoMap"
    @recent = Conflict.select('id, headline, modified_at, name, slug').where("headline <> '' AND headline IS NOT NULL").order("modified_at desc").limit(6)
    @feats = Featured.select('id, description, name, slug, image').where(published:true).order("slug").limit(6)
    render "base/map", :layout => @layout
  end

  get :conflict, :with => :slug do
    c = Conflict.find_slug(params[:slug])
    #last_modified c.updated_at
    pass unless c
    @markerinfo = "[#{c.as_marker.to_json}]"
    @cmarker = c.as_marker.to_json
    @defs = []
    c.country.vector_data.each do |vd|
      if vd.vector_style and vd.vector_style.defs
        @defs << JSON.parse(vd.vector_style.defs)
      end
    end
    @defs = @defs.to_set.to_a
    @vectors = c.country.vector_data.where("url != ''").where("status = 'published'").select('name, url, description, style').to_json
    @name = c.name
    @id = c.id
    @slug = c.slug
    @desc = c.description
    @headline = c.headline
    @ogimage = c.images.first.file.url if c.images.any?
    @cid = c.id 
    @maptitle = c.name
    @pos = [c.lat,c.lon]
    @images = c.images
    @zoom = 8
    @zoom = [8,8,10,16][c.accuracy_level] if c.accuracy_level
    @baselayers = "Esri.WorldImagery,Thunderforest.Landscape,Esri.WorldTopoMap"
    @related = c.related
    @headline = c.headline and c.headline.length > 0 ? c.headline : nil
    @summary = c.table
    c.medialinks.each do |ml|
      if ml.url and ml.url.match(/\.jpg$/)
        @image = ml.url
        break
      end
    end
    render "base/conflict", :layout => @layout
  end

  get :print, :with => :slug do
    c = Conflict.find_slug(params[:slug])
    @markerinfo = c.country.conflicts_marker
    @cmarker = c.as_marker.to_json
    @defs = []
    c.country.vector_data.each do |vd|
      if vd.vector_style and vd.vector_style.defs
        @defs << JSON.parse(vd.vector_style.defs)
      end
    end
    @defs = @defs.to_set.to_a
    @vectors = c.country.vector_data.where("url != ''").where("status = 'published'").select('name, url, description, style').to_json
    @zoom = 8
    @zoom = [8,8,10,16][c.accuracy_level] if c.accuracy_level
    @baselayers = "Esri.WorldImagery,Thunderforest.Landscape,Esri.WorldTopoMap"
    @name = c.name
    @pos = [c.lat,c.lon]
    @cid = c.id
    @table = c.as_table(:print => true)
    @images = c.images
    render 'base/print', :layout => :print
  end

  get :country, :with => :slug do
    ca = Cached.select(:filterdata).first
    @filterform = JSON.parse(ca.filterdata)
    @filter = render "base/filter", :layout => false
    con = Country.find_slug(params[:slug])
    con = Region.find_slug(params[:slug]) unless con
    ##last_modified con.updated_at
    pass unless con
    @markerinfo = con.conflicts_marker
    contents = File.read('admin/views/base/filter.haml')
    @filterinfo = con.conflicts_json
    @load = con.conflicts_link
    @name = con.name
    @description = con.description
    @id = con.id
    @desc = con.description
    @markercount = con.conflicts_count
    @defs = []
    con.vector_data.each do |vd|
      if vd.vector_style and vd.vector_style.defs
        @defs << JSON.parse(vd.vector_style.defs)
      end
    end
    @defs = @defs.to_set.to_a
    @vectors = con.vector_data.where("url != ''").where("status = 'published'").select('name, url, description, style, choropleth, shown').to_json
    @image = nil
    @image = con.flag_images.first if con.flag_images.any?
    @maptitle = "Environmental Conflicts in #{@name}"
    @baselayers = "Esri.WorldImagery,Thunderforest.Landscape,Esri.WorldTopoMap"
    render "base/front", :layout => @layout
  end

  get :company, :with => :slug do
    ca = Cached.select(:filterdata).first
    @filterform = JSON.parse(ca.filterdata)
    @filter = render "base/filter", :layout => false
    con = Company.find_slug(params[:slug])
    pass unless con
    ##last_modified con.updated_at
    @markerinfo = con.conflicts_marker
    @filterinfo = con.conflicts_json
    @load = con.conflicts_link
    @name = con.name
    @description = con.description
    @id = con.id
    @markercount = con.conflicts.where(approval_status: 'approved').count
    @desc = "Description of #{con.name}"#con.description
    @image = nil
    @image = con.logo_images.first if con.logo_images.any?
    @maptitle = "Environmental Conflicts of #{@name}"
    @baselayers = "Esri.WorldImagery,Thunderforest.Landscape,Esri.WorldTopoMap"
    render "base/front", :layout => @layout
  end

  get :institution, :with => :slug do
    ca = Cached.select(:filterdata).first
    @filterform = JSON.parse(ca.filterdata)
    @filter = render "base/filter", :layout => false
    con = Supporter.find_slug(params[:slug])
    ##last_modified con.updated_at
    @markerinfo = con.conflicts_marker
    @filterinfo = con.conflicts_json
    @load = con.conflicts_link
    @name = con.name
    @description = con.description
    @id = con.id
    @markercount = con.conflicts.where(approval_status: 'approved').count
    @desc = "Description of #{con.name}"#con.description
    #@vectors = con.vector_data.select('name, url').to_json
    @maptitle = "Environmental Conflicts of #{@name}"
    @baselayers = "Esri.WorldImagery,Thunderforest.Landscape,Esri.WorldTopoMap"
    render "base/front", :layout => @layout
  end

  get :commodity, :with => :slug do
    ca = Cached.select(:filterdata).first
    @filterform = JSON.parse(ca.filterdata)
    @filter = render "base/filter", :layout => false
    con = Product.find_slug(params[:slug])
    ##last_modified con.updated_at
    @markerinfo = con.conflicts_marker
    #puts @markerinfo
    @filterinfo = con.conflicts_json
    @load = con.conflicts_link
    @name = con.name
    @id = con.id
    @markercount = con.conflicts.where(approval_status: 'approved').count
    @desc = "Description of #{con.name}"#con.description
    #@vectors = con.vector_data.select('name, url').to_json
    @maptitle = "Environmental Conflicts on #{@name}"
    @baselayers = "Esri.WorldImagery,Thunderforest.Landscape,Esri.WorldTopoMap"
    render "base/front", :layout => @layout
  end

  get :type, :with => :slug do
    ca = Cached.select(:filterdata).first
    @filterform = JSON.parse(ca.filterdata)
    @filter = render "base/filter", :layout => false
    con = Type.find_slug(params[:slug])
    ##last_modified con.updated_at
    @markerinfo = con.conflicts_marker
    #puts @markerinfo
    @filterinfo = con.conflicts_json
    @load = con.conflicts_link
    @name = con.name
    @description = con.description
    @id = con.id
    @markercount = con.conflicts.where(approval_status: 'approved').count
    @desc = "Description of #{con.name}"#con.description
    #@vectors = con.vector_data.select('name, url').to_json
    @maptitle = "Environmental Conflicts about #{@name}"
    @baselayers = "Esri.WorldImagery,Thunderforest.Landscape,Esri.WorldTopoMap"
    render "base/front", :layout => @layout
  end

  get 'country-of-company', :with => :slug do
    ca = Cached.select(:filterdata).first
    @filterform = JSON.parse(ca.filterdata)
    @filter = render "base/filter", :layout => false
    con = Country.find_slug(params[:slug])
    ##last_modified con.updated_at
    @markerinfo = con.companies_marker
    @filterinfo = con.companies_json
    @load = con.companies_link
    @name = "Companies from #{con.name}"
    @markercount = @load.split("</p><p").length
    @desc = "Description of #{con.name}"#con.description
    #@vectors = con.vector_data.select('name, url').to_json
    @maptitle = "Environmental Conflicts of #{@name}"
    @baselayers = "Esri.WorldImagery,Thunderforest.Landscape,Esri.WorldTopoMap"
    render "base/front", :layout => @layout
  end

  get 'country-of-institution', :with => :slug do
    ca = Cached.select(:filterdata).first
    con = Country.find_slug(params[:slug])
    ##last_modified con.updated_at
    @markerinfo = con.supporters_marker
    @load = con.supporters_link
    @name = "Financial Institutions from #{con.name}"
    @id = con.id
    @markercount = @load.split("</p><p").length
    @desc = "Description of #{con.name}"#con.description
    #@vectors = con.vector_data.select('name, url').to_json
    @maptitle = "Environmental Conflicts of #{@name}"
    @baselayers = "Esri.WorldImagery,Thunderforest.Landscape,Esri.WorldTopoMap"
    render "base/front", :layout => @layout
  end

  get :featured, :with => :slug do
    ca = Cached.select(:filterdata).first
    con = Featured.find_slug(params[:slug])
    pass unless con
    @markerinfo = con.conflicts_marker
    @load = @markerinfo.length > 60000 ? nil : con.conflicts_link
    @name = con.name
    @description = con.description
    @id = con.id
    @desc = con.description
    @headline = con.slogan
    @ogimage = con.images.where(prime:1)[0].file.url if con.images.where(prime:1).any?
    @markercount = JSON.parse(@markerinfo || "[]").count
    @defs = []
    con.vector_data.each do |vd|
      if vd.vector_style and vd.vector_style.defs
        @defs << JSON.parse(vd.vector_style.defs)
      end
    end
    @defs = @defs.to_set.to_a
    @vectors = con.vector_data.where("url != ''").where("status = 'published'").select('name, url, description, style, choropleth, shown, id, source, link').to_json
    @image = con.images.where(prime:1)[0]
    @feature = true
    @maptitle = con.slogan
    @baselayers = (con.baselayers != "" ? con.baselayers : "")
    #@domains = JSON.parse(con.filter)['tag']
    @fid = con.id
    @color = "##{con.color}"
    render "base/front", :layout => @layout
  end

  get :company_list do
    return Company.all.map{|c| "#{c.id}|#{c.name}"}.join('$%')
  end

  get :supporter_list do
    return Supporter.all.map{|c| "#{c.id}|#{c.name}"}.join('$%')
  end

  get '/json/:id' do 
    c = Conflict.find(params[:id].to_i)
    return c.as_json
  end

  get '/table/:id' do 
    c = Conflict.find(params[:id].to_i)
    hash = {:table=>c.table,:slug=>c.slug}
    return hash.to_json
  end

  get :csv, :with=>:model do
    redirect to "/sessions/login?return=csv/#{params[:model]}" unless current_account
    redirect to "/" unless ["admin","editor"].include? current_account.role
    filename = to_csv params[:model]
    send_file filename[0], :type=> :csv, :filename => filename[1]
    return filename+" sent."
  end

  get "/:model/?" do
    browseinfo = {"country"=>"countries","company"=>"companies","commodity"=>"commodities","type"=>"types"}
    pass unless browseinfo.has_key?(params[:model])
    ca = Cached.first
    @filterform = JSON.parse(ca.filterdata)
    @filter = render "base/filter", :layout => false
    @markercount = Conflict.where(approval_status: 'approved').count
    @markerinfo = ca.conflicts_marker
    @filterinfo = ca.conflicts_json
    info = eval("JSON.parse(ca.#{browseinfo[params[:model]]})")
    @browseinfo = {params[:model] => info}
    @name = browseinfo[params[:model]].titlecase
    @maptitle = "Browse #{@name}"
    @vectors = []#VectorDatum.where(name:'Borders').select('name,url').to_json
    @baselayers = "Esri.WorldImagery,Thunderforest.Landscape,Esri.WorldTopoMap"
    @desc = "One of the primary objectives of EJOLT is to compile and make available a ‘Map of Environmental Injustice’. This map will consist on an online unique database of resource extraction and disposal conflicts hosted on the project website, geographically referenced (mapped with GIS), and linked with social metabolism and socio- environmental indicators."
    render "base/map"
  end

  get :cache do
    redirect to "/sessions/login?return=cache" unless current_account
    redirect back unless ["admin","editor"].include? current_account.role
    render 'base/cache', :layout => :application
  end

  post :cache do
    redirect to "/sessions/login?return=cache" unless current_account
    redirect back unless ["admin","editor"].include? current_account.role
    AsyncTask.new.setcache params
    redirect to 'jobs'
  end

  post :forward do
    require 'mandrill'
    require 'pp'
    mandrill = Mandrill::API.new '1y8hsGaQBCSLuFhJ0I8dsA'
    begin
      mails = JSON.parse params['mandrill_events']
    rescue
      return 400
    end
    keys = ['subject','from_email','html']
    oks = []
    nots = []
    mails.each do |mail|
      msg = mail['msg']
      if msg.nil? or keys & msg.keys != keys
        nots << msg
      end
      recipients = [ {:email=> 'yakup.cetinkaya@gmail.com', :name=> 'Yakup' }, {:email=> 'ejoltmap@gmail.com', :name=> 'EJAtlas Team'} ]
      if msg['from_email'] == 'notifications@disqus.net'
        name = msg['subject'].sub('Re: ','').sub('New comment posted on ','').sub(' | EJAtlas','')
        if conf = Conflict.find_by_name(name)
          recipients = [{:email=>conf.account.email,:name=>conf.account.name}]
        end
      end
      message = {  
       :subject=> msg['subject'],
       :from_name=> "#{msg['from_name'] || 'no name'} <#{msg['from_email']}>",
       :headers=> {
         "Reply-To"=> msg['from_email']
       },
       :to=>recipients,  
       :html=> msg['html'],
       :from_email=> 'forwards@ejatlas.org'
      }  
      message['attachments'] = msg['attachments'] if msg.has_key?('attachments') and msg['attachments'].any?
      message['images'] = msg['images'] if msg.has_key?('images') and msg['images'].any?
      sending = mandrill.messages.send message  
      if sending[0]['status'] == "sent"
        oks << msg
      else
        nots << msg
      end
    end
    puts "MANDRILL INBOUND\n  SUCCESS: #{oks}\n  FAIL: #{nots}"
    [200,{},'']
  end

  get :export do
    redirect to "/sessions/login?return=export" unless current_account
    redirect back unless ["admin","editor"].include? current_account.role
    render 'base/export', :layout => :application
  end

  post :export do
    redirect to "/sessions/login?return=export" unless current_account
    redirect back unless ["admin","editor"].include? current_account.role
    AsyncTask.new.csvexport params
    redirect to 'jobs'
  end

  get :parse do
    redirect to "/sessions/login?return=parse" unless current_account
    redirect back unless ["admin","editor"].include? current_account.role
    render 'base/parse', :layout => :application
  end

  post :parse do
    redirect to "/sessions/login?return=parse" unless current_account
    redirect back unless ["admin","editor"].include? current_account.role
    file = params[:master]
    puts master = File.read(file[:tempfile])
    AsyncTask.new.parsedata master
    redirect to 'jobs'
  end

  get :jobs do
    @name = "Queued Jobs"
    redirect to "/sessions/login?return=jobs" unless current_account
    redirect back unless ["admin","editor"].include? current_account.role
    @jobs = Delayed::Job.all
    render 'base/jobs', :layout => :application
  end

  not_found do
    @name = "Page not found"
    render 'base/404'
  end

  error do
    @name = "Error"
    puts "ERROR #{request.xhr? ? "XHR " : ""}#{request.request_method} #{request.url} FROM  #{request.ip}#{current_account ? "(#{current_account.email})" : ""} ON #{request.user_agent} AT #{Time.now} WITH #{params}"
    render 'base/404'
  end

end
