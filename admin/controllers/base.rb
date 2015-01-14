#coding: utf-8
Admin.controller do

  before do
    puts params
    if params.has_key? 'fullpage'
      @layout = :full
    else
      @layout = :front
    end
    #cache_control :max_age => 60*60*24*30 
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
    ##last_modified ca.updated_at
    @filterform = JSON.parse(ca.filterdata)
    @filter = render "base/filter", :layout => false
    @markercount = Conflict.where(approval_status: 'approved').count
    @markerinfo = ca.conflicts_marker
    @filterinfo = ca.conflicts_json
    countries = JSON.parse(ca.countries)[0..13]
    companies = JSON.parse(ca.companies)[0..11]
    commodities = JSON.parse(ca.commodities)[0..13]
    types = JSON.parse(ca.types)[0..9]
    @browseinfo = {"country"=>countries,"company"=>companies,"commodity"=>commodities,"type"=>types}
    @maptitle = "Browse maps"
    #@vectors = VectorDatum.where(name:'Borders').select('name,url,style,description').to_json
    @desc = "One of the primary objectives of EJOLT is to compile and make available a ‘Map of Environmental Injustice’. This map will consist on an online unique database of resource extraction and disposal conflicts hosted on the project website, geographically referenced (mapped with GIS), and linked with social metabolism and socio- environmental indicators."
    render "base/map", :layout => @layout
  end

  get :conflict, :with => :slug do
    c = Conflict.find_slug(params[:slug])
    #last_modified c.updated_at
    redirect to "/" unless c
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
    @name = c.name
    @id = c.id
    @desc = c.description
    @headline = c.headline
    @ogimage = c.images.first.file.url if c.images.any?
    @cid = c.id 
    @maptitle = c.name
    @pos = [c.lat,c.lon]
    @images = c.images
    @zoom = 8
    @zoom = [6,8,10,12][c.accuracy_level] if c.accuracy_level
    c.medialinks.each do |ml|
      if ml.url and ml.url.match(/\.jpg$/)
        @image = ml.url
        break
      end
    end
    render "base/conflict", :layout => @layout
  end

  get :country, :with => :slug do
    ca = Cached.select(:filterdata).first
    @filterform = JSON.parse(ca.filterdata)
    @filter = render "base/filter", :layout => false
    con = Country.find_slug(params[:slug])
    con = Region.find_slug(params[:slug]) unless con
    ##last_modified con.updated_at
    return redirect to '/' unless con
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
    render "base/front", :layout => @layout
  end

  get :commodity, :with => :slug do
    ca = Cached.select(:filterdata).first
    @filterform = JSON.parse(ca.filterdata)
    @filter = render "base/filter", :layout => false
    con = Product.find_slug(params[:slug])
    ##last_modified con.updated_at
    @markerinfo = con.conflicts_marker
    puts @markerinfo
    @filterinfo = con.conflicts_json
    @load = con.conflicts_link
    @name = con.name
    @id = con.id
    @markercount = con.conflicts.where(approval_status: 'approved').count
    @desc = "Description of #{con.name}"#con.description
    #@vectors = con.vector_data.select('name, url').to_json
    @maptitle = "Environmental Conflicts on #{@name}"
    render "base/front", :layout => @layout
  end

  get :type, :with => :slug do
    ca = Cached.select(:filterdata).first
    @filterform = JSON.parse(ca.filterdata)
    @filter = render "base/filter", :layout => false
    con = Type.find_slug(params[:slug])
    ##last_modified con.updated_at
    @markerinfo = con.conflicts_marker
    puts @markerinfo
    @filterinfo = con.conflicts_json
    @load = con.conflicts_link
    @name = con.name
    @description = con.description
    @id = con.id
    @markercount = con.conflicts.where(approval_status: 'approved').count
    @desc = "Description of #{con.name}"#con.description
    #@vectors = con.vector_data.select('name, url').to_json
    @maptitle = "Environmental Conflicts about #{@name}"
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
    @markercount = @load.split("</p><p>").length
    @desc = "Description of #{con.name}"#con.description
    #@vectors = con.vector_data.select('name, url').to_json
    @maptitle = "Environmental Conflicts of #{@name}"
    render "base/front", :layout => @layout
  end

  get 'country-of-institution', :with => :slug do
    ca = Cached.select(:filterdata).first
    @filterform = JSON.parse(ca.filterdata)
    @filter = render "base/filter", :layout => false
    con = Country.find_slug(params[:slug])
    ##last_modified con.updated_at
    @markerinfo = con.supporters_marker
    @filterinfo = con.supporters_json
    @load = con.supporters_link
    @name = "Financial Institutions from #{con.name}"
    @id = con.id
    @markercount = @load.split("</p><p>").length
    @desc = "Description of #{con.name}"#con.description
    #@vectors = con.vector_data.select('name, url').to_json
    @maptitle = "Environmental Conflicts of #{@name}"
    render "base/front", :layout => @layout
  end

  get :featured, :with => :slug do
    ca = Cached.select(:filterdata).first
    @filterform = JSON.parse(ca.filterdata)
    @filter = render "base/filter", :layout => false
    con = Featured.find_slug(params[:slug])
    return redirect to '/' unless con
    @markerinfo = con.conflicts_marker
    contents = File.read('admin/views/base/filter.haml')
    @filterinfo = con.conflicts_json
    @load = con.conflicts_link
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
    @vectors = con.vector_data.where("url != ''").where("status = 'published'").select('name, url, description, style, choropleth, shown').to_json
    @image = con.images.where(prime:1)[0]
    @feature = true
    @maptitle = con.slogan
    @baselayers = ((con.baselayers.nil? or con.baselayers == "") ? $baselayers.join(',') : con.baselayers).split(',')
    #@domains = JSON.parse(con.filter)['tag']
    @fid = con.id
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

=begin
  get :vector do
    parseVectors
  end

  get :ping do
    checkdocs
  end

  get :mergea do
    mergeAccounts
    redirect to '/'
  end

  get :fix do
    fixissues
  end

=end

  get :parse do
    parsePart
    #redirect to '/'
  end

  get :invites do
    redirect to "/sessions/login" unless current_account
    redirect to "/sessions/login" unless ["admin","editor"].include? current_account.role
    html = ''
    Account.where(role: 'user').each do |a|
      next if a.approved
      next unless a.conflicts.map(&:approval_status).include?('approved')
      html += "<p>#{a.email}</p>"
      html += Haml::Engine.new(File.read("#{PADRINO_ROOT}/admin/views/mailers/invite.haml")).render(Object.new, "@account" => a)
    end
    html += "<p>&nbsp;</p><h2>NOT APPROVED</h2>"
    Account.where(role: 'user').each do |a|
      next if a.approved
      next if a.conflicts.map(&:approval_status).include?('approved')
      html += "<p>#{a.email}</p>"
      html += Haml::Engine.new(File.read("#{PADRINO_ROOT}/admin/views/mailers/invite.haml")).render(Object.new, "@account" => a)
    end
    return html
  end

  get :csv, :with=>:model do
    redirect to "/sessions/login" unless current_account
    redirect to "/sessions/login" unless ["admin","editor"].include? current_account.role
    redirect to "/" unless current_account
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
    @vectors = VectorDatum.where(name:'Borders').select('name,url').to_json
    @desc = "One of the primary objectives of EJOLT is to compile and make available a ‘Map of Environmental Injustice’. This map will consist on an online unique database of resource extraction and disposal conflicts hosted on the project website, geographically referenced (mapped with GIS), and linked with social metabolism and socio- environmental indicators."
    render "base/map"
  end

  get :cache do
    redirect to "/sessions/login" unless current_account
    redirect back unless ["admin","editor"].include? current_account.role
    render 'base/cache', :layout => :application
  end

  post :cache do
    redirect to "/sessions/login" unless current_account
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
    puts "  MANDRILL \n  SUCCESS: #{oks} \n  FAIL: #{nots}"
    [200,{},'']
  end

  get :export do
    redirect to "/sessions/login" unless current_account
    redirect back unless ["admin","editor"].include? current_account.role
    render 'base/export', :layout => :application
  end

  post :export do
    redirect to "/sessions/login" unless current_account
    redirect back unless ["admin","editor"].include? current_account.role
    AsyncTask.new.csvexport params
    redirect to 'jobs'
  end

  get :jobs do
    @name = "Queued Jobs"
    redirect to "/sessions/login" unless current_account
    redirect back unless ["admin","editor"].include? current_account.role
    @jobs = Delayed::Job.all
    render 'base/jobs', :layout => :application
  end

  not_found do
    @name = "Page not found"
    render 'base/404', :layout => false
  end

  error do
    @name = "Error"
    render 'base/404', :layout => false
  end

end
