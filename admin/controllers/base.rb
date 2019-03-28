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
    render "base/about", :layout => :application
  end
  get :faq do
    @name = "Frequently Asked Questions"   
    #last_modified File.mtime("#{PADRINO_ROOT}/admin/views/base/faq.haml")
    render "base/faq", :layout => :application
  end
  get :disclaimer do
    @name = "Disclaimer"   
    #last_modified File.mtime("#{PADRINO_ROOT}/admin/views/base/disclaimer.haml")
    render "base/disclaimer", :layout => :application
  end

  get :contact do
    @name = "Contact"   
    #last_modified File.mtime("#{PADRINO_ROOT}/admin/views/base/contect.haml")
    render "base/contact", :layout => :application
  end

  get :credits do
    @name = "Credits & Collaborators"   
    #last_modified File.mtime("#{PADRINO_ROOT}/admin/views/base/credits.haml")
    render "base/credits", :layout => :application
  end

  get :welcome do
    @name = "Welcome"   
    #last_modified File.mtime("#{PADRINO_ROOT}/admin/views/base/welcome.haml")
    render "base/welcome", :layout => :application
  end

  get :mailsent do
    @name = "You'll receive an email..."   
    @account = current_account || nil
    #last_modified File.mtime("#{PADRINO_ROOT}/admin/views/base/welcome.haml")
    render "base/mailsent", :layout => :application
  end

  get "/manifest.txt" do
    content_type :manifest
    man = "CACHE MANIFEST\n# #{File.read("./lib/stamp").strip}\n\nCACHE:\n"
    #man += "/\n"
    man += "/stylesheets/main-full.css\n"
    man += "https://fonts.googleapis.com/css?family=Ubuntu:400,700\n"
    man += "/fonts/glyphicons-halflings-regular.woff\n"
    man += "/fonts/glyphicons-halflings-regular.ttf\n"
    man += "/javascripts/jQl.js\n"
    if ENV["RACK_ENV"] == "production"
      man += "/javascripts/main.js\n"
    else
      man += "/javascripts/main-dev.js\n"
    end
    man += "/data/markers.js\n"
    man += "/images/tw.png\n"
    man += "/images/fb.png\n"
    man += "/images/eu.jpg\n"
    man += "/images/cc.png\n"
    man += "/images/bg.png\n"
    man += "/images/ack.png\n"
    man += "/images/move.png\n"
    man += "/images/ejolt_logo.png\n"
    man += "/images/envjustice.png\n"
    man += "/images/ejatlas-logo.png\n"
    man += "/stylesheets/images/layers.png\n"
    man += "/stylesheets/images/ui-bg_highlight-soft_100_eeeeee_1x100.png\n"
    man += "#{$fileurl}/static/ikon.png\n"
    man += "/images/favicon.ico\n"
    man += "\nNETWORK:\n/\n*\n"
    man
  end

  get "/:slug/manifest.txt" do
    puts params[:slug]
    content_type :manifest
    man = "CACHE MANIFEST\n# #{File.read("./lib/stamp").strip}\n\nNETWORK:\n"
    man += "*\n"
    man
  end

  get :index do
    ca = Cached.first
    #last_modified ca.updated_at
    @filterform = JSON.parse(ca.filterdata)
    @filter = render "base/filter", :layout => false
    @markercount = Conflict.where(approval_status: 'approved').count
    countries = JSON.parse(ca.countries)
    companies = JSON.parse(ca.companies)[0..100]
    commodities = JSON.parse(ca.commodities)
    types = JSON.parse(ca.types)
    @browseinfo = {"country"=>countries,"company"=>companies,"commodity"=>commodities,"type"=>types}
    @maptitle = "World Map"
    #@vectors = VectorDatum.where(name:'Borders').select('name,url,style,description').to_json
    @desc = "One of the primary objectives of EJOLT is to compile and make available a ‘Map of Environmental Injustice’. This map will consist on an online unique database of resource extraction and disposal conflicts hosted on the project website, geographically referenced (mapped with GIS), and linked with social metabolism and socio- environmental indicators."
    @baselayers = "Esri.WorldTopoMap,Esri.WorldImagery,Thunderforest.Landscape"
    @recent = Conflict.select('id, headline, modified_at, name, slug, commented').where("approval_status = 'approved' AND headline <> '' AND headline IS NOT NULL").order("modified_at desc").limit(6)
    @feats = Featured.select('id, description, name, slug, image, headline, published').where(:published=>true).order("created_at desc").limit(2)
    render "base/map", :layout => @layout
  end

  get :conflict, :with => :slug do
    c = Conflict.find_slug(params[:slug].downcase)
    #last_modified c.updated_at
    pass unless c
    if c.approval_status != "approved"
      if current_account and (["admin","editor"].include?(current_account.role) or c.account_id == current_account.id or c.conflict_accounts.map(&:account_id).include?(current_account.id))
      else
        pass
      end
    end
    @markerinfo = c.accurate_marker
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
    @title = c.title
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
    pass unless c
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
    con = Country.find_slug(params[:slug])
    con = Region.find_slug(params[:slug]) unless con
    pass unless con
    ca = Cached.select(:filterdata).first
    @filterform = JSON.parse(ca.filterdata)
    @filter = render "base/filter", :layout => false
    ##last_modified con.updated_at
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
    @image = con.flag_images.first.file.url if con.flag_images.any?
    @maptitle = "Environmental Conflicts in #{@name}"
    @baselayers = "Esri.WorldTopoMap,Esri.WorldImagery,Thunderforest.Landscape"
    render "base/front", :layout => @layout
  end

  get :company, :with => :slug do
    con = Company.find_slug(params[:slug])
    pass unless con
    ca = Cached.select(:filterdata).first
    @filterform = JSON.parse(ca.filterdata)
    @filter = render "base/filter", :layout => false
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
    @image = con.logo_images.first.file.url if con.logo_images.any?
    @maptitle = "Environmental Conflicts of #{@name}"
    @baselayers = "Esri.WorldTopoMap,Esri.WorldImagery,Thunderforest.Landscape"
    render "base/front", :layout => @layout
  end

  get :institution, :with => :slug do
    con = Supporter.find_slug(params[:slug])
    pass unless con
    ca = Cached.select(:filterdata).first
    @filterform = JSON.parse(ca.filterdata)
    @filter = render "base/filter", :layout => false
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
    @baselayers = "Esri.WorldTopoMap,Esri.WorldImagery,Thunderforest.Landscape"
    render "base/front", :layout => @layout
  end

  get :commodity, :with => :slug do
    ca = Cached.select(:filterdata).first
    @filterform = JSON.parse(ca.filterdata)
    @filter = render "base/filter", :layout => false
    con = Product.find_slug(params[:slug])
    pass unless con
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
    @baselayers = "Esri.WorldTopoMap,Esri.WorldImagery,Thunderforest.Landscape"
    render "base/front", :layout => @layout
  end

  get :type, :with => :slug do
    ca = Cached.select(:filterdata).first
    @filterform = JSON.parse(ca.filterdata)
    @filter = render "base/filter", :layout => false
    con = Type.find_slug(params[:slug])
    pass unless con
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
    @baselayers = "Esri.WorldTopoMap,Esri.WorldImagery,Thunderforest.Landscape"
    render "base/front", :layout => @layout
  end

  get 'country-of-company', :with => :slug do
    con = Country.find_slug(params[:slug])
    pass unless con
    ca = Cached.select(:filterdata).first
    @filterform = JSON.parse(ca.filterdata)
    @filter = render "base/filter", :layout => false
    ##last_modified con.updated_at
    @markerinfo = con.companies_marker
    @filterinfo = con.companies_json
    @load = con.companies_link
    @name = "Companies from #{con.name}"
    @markercount = @load.split("</p><p").length
    @desc = "Description of #{con.name}"#con.description
    #@vectors = con.vector_data.select('name, url').to_json
    @maptitle = "Environmental Conflicts of #{@name}"
    @baselayers = "Esri.WorldTopoMap,Esri.WorldImagery,Thunderforest.Landscape"
    render "base/front", :layout => @layout
  end

  get 'country-of-institution', :with => :slug do
    con = Country.find_slug(params[:slug])
    pass unless con
    ca = Cached.select(:filterdata).first
    ##last_modified con.updated_at
    @markerinfo = con.supporters_marker
    @load = con.supporters_link
    @name = "Financial Institutions from #{con.name}"
    @id = con.id
    @markercount = @load.split("</p><p").length
    @desc = "Description of #{con.name}"#con.description
    #@vectors = con.vector_data.select('name, url').to_json
    @maptitle = "Environmental Conflicts of #{@name}"
    @baselayers = "Esri.WorldTopoMap,Esri.WorldImagery,Thunderforest.Landscape"
    render "base/front", :layout => @layout
  end

  get :featured, :with => :slug do
    con = Featured.find_slug(params[:slug])
    pass unless con
    ca = Cached.select(:filterdata).first
    @markerinfo = con.conflicts_marker
    @load = con.conflicts_link.length > (2**17) ? nil : con.conflicts_link
    @name = con.name
    @id = con.id
    if @id == 75
      begin
        @descriptions = JSON.parse(File.read("#{Dir.pwd}/public/data/feat75desc.json"))
      rescue
        @description = con.description
      end
    else
      @description = con.description
    end
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
    @vectors = CGI.unescapeHTML(con.vector_data.where("url != ''").where("status = 'published'").select('name, url, description, style, choropleth, shown, id, source, link, rank, clickable, geometry_type').order(:rank).to_json).html_safe
    @images = []
    @images = con.images.order("updated_at desc") if con.images.any?
    @ogimage = @images.first.file.url if @images.any?
    @feature = true
    @maptitle = con.slogan
    @title = con.headline
    @view = con.view
    @baselayers = (con.baselayers != "" ? con.baselayers : "")
    begin
      @domains = []
      JSON.parse(con.filter).each{}
      #puts JSON.pretty_generate @domains
    rescue
    end
    @fid = con.id
    @color = "##{con.color}"
    headers({ 'X-Frame-Options' => 'ALLOWALL' })
    render "base/feat", :layout => @layout
  end

  get "/761317/?" do
    @markercount = 176
    @markerinfo = Conflict.select("lat, lon, id, category_id").where(:id=>[181,158,346,464,795,804,1016,1092,1026,1140,1196,1522,1749,1820,1839,1869,1953,1958,1969,2007,2089,2386,2387,2307,2299,2287,2461,2435,2586,35,455,509,477,677,682,674,695,725,727,811,809,1165,1168,1276,1223,1194,1464,1629,1742,1712,1758,1804,1911,1942,1983,2005,2026,2091,2229,2462,2432,2524,2779,2773,833,160,224,344,471,445,694,683,702,781,813,927,1042,1157,1213,1195,1569,1895,1919,2002,2003,1976,2146,2070,2196,2248,2364,2402,2518,2474,2566,2568,2593,2526,2574,99,123,206,240,222,227,452,486,468,478,520,708,672,782,784,785,752,792,803,1185,1359,1591,1620,1740,1724,1838,1878,1915,2006,2134,2139,2217,2279,2373,2573,2591,2579,165,194,291,325,504,510,680,686,706,783,812,807,1024,1062,1065,1068,1086,1148,1149,1218,1260,1193,1368,1504,1747,1748,1753,1767,1798,1967,1938,2199,2343,2345,2408,2450,2559,2523,2679,2587]).map do |c| 
      if c and c.lat
        lat = c.lat; lat = "#{lat}.000" unless lat.match(/\./); lat = "#{lat}000" unless lat.match(/\.\d{3}$/)
        lon = c.lon; lon = "#{lon}.000" unless lon.match(/\./); lon = "#{lon}000" unless lon.match(/\.\d{3}$/)
        "{'a':#{lat.to_s.match(/^-?\d+\.\d{2}/)[0]},'o':#{lon.to_s.match(/^-?\d+\.\d{2}/)[0]},'i':#{c.id},'c':#{c.category_id}}"
      else
        nil
      end 
    end 
    @markerinfo = (@markerinfo - [nil]).join(",")
    @baselayers = "Stamen.TonerBackground"
    headers({ 'X-Frame-Options' => 'ALLOWALL' })
    render "base/reuters", :layout => false
  end

  get :embed do
    ca = Cached.first
    @markercount = Conflict.where(approval_status: 'approved').count
    @markerinfo = ca.conflicts_marker.gsub('\\"', '"').gsub('","',',').sub(/^\["/,'[').sub(/",\]$/,']').html_safe
    headers({ 'X-Frame-Options' => 'ALLOWALL' })
    render "base/embed", :layout => false
  end

  get :embed, :with => :slug do
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
    @image = nil
    @image = con.images.first.file.url if con.images.any?
    @ogimage = @image
    @feature = true
    @maptitle = con.slogan
    @title = con.headline
    @baselayers = (con.baselayers != "" ? con.baselayers : "")
    begin
      @domains = []
      JSON.parse(con.filter).each{}
      #puts JSON.pretty_generate @domains
    rescue
    end
    @fid = con.id
    @color = "##{con.color}"
    headers({ 'X-Frame-Options' => 'ALLOWALL' })
    render "base/feat_embed", :layout => :embed
  end

  get :embed_filter, :with => :uid do
    ca = Cached.select(:filterdata).first
    fil = Filter.find_by_uid(params["uid"])
    pass unless fil
    dmap = {"id"=>"i","category_id"=>"c","lat"=>"a","lon"=>"o"}
    data = []
    Admin.filter(fil.query, true, ["id","lat","lon","category_id"]).map{|x| x["_source"]}.each do |h|
      data << {:c=>h["category_id"],"i"=>h["id"],"a"=>h["lat"],"o"=>h["lon"]}
    end
    @markerinfo = data.to_json.html_safe
    @name = fil.name
    @description = fil.description
    @id = fil.id
    @desc = fil.description
    @markercount = JSON.parse(@markerinfo || "[]").count
    @maptitle = fil.name
    @title = fil.name
    @fid = fil.uid
    @filter = true
    @baselayers = "Esri.WorldTopoMap,Esri.WorldImagery,Esri.WorldPhysical"
    headers({ 'X-Frame-Options' => 'ALLOWALL' })
    render "base/embed", :layout => false
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

  get "/:model" do
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
    puts @browseinfo
    @name = browseinfo[params[:model]].titlecase
    @maptitle = "Browse #{@name}"
    @vectors = []#VectorDatum.where(name:'Borders').select('name,url').to_json
    @baselayers = "Esri.WorldTopoMap,Esri.WorldImagery,Thunderforest.Landscape"
    @desc = "One of the primary objectives of EJOLT is to compile and make available a ‘Map of Environmental Injustice’. This map will consist on an online unique database of resource extraction and disposal conflicts hosted on the project website, geographically referenced (mapped with GIS), and linked with social metabolism and socio- environmental indicators."
    render "base/front"
  end

  get :backup do
    pass unless $ips.include?(request.ip)
    AsyncTask.new.backup nil
    "TASK STARTED"
  end

  get :cache do
    redirect to "/sessions/login?return=cache" unless current_account
    puts current_account.email
    puts current_account.role
    redirect back unless ["admin","editor"].include? current_account.role
    render 'base/cache', :layout => :application
  end

  post :cache do
    redirect to "/sessions/login?return=cache" unless current_account
    redirect back unless ["admin","editor"].include? current_account.role
    AsyncTask.new.setcache params
    redirect to 'jobs'
  end


  get :filters do
    pass unless current_account
    if ["admin","editor"].include?(current_account.role)
      @filters = Filter.all
    else
      @filters = Filter.where(:account_id => current_account.id)
    end
    render "base/filters", :layout => "application"
  end

  get :editfilter, :with => :uid do
    pass unless current_account
    filter = Filter.find_by_uid(params["uid"])
    if filter and filter.account == current_account or ["admin","editor"].include?(current_account.role)
      @filter = filter
    else
      redirect to "/filters"
    end
    render "base/editfilter", :layout => "application"
  end

  post :savefilter do
    pass unless current_account
    unless filter = Filter.find_by_query(params["data"])
      filter = Filter.create(query: params["data"], account_id: current_account.id)
    end
    return filter.uid
  end

  post :filter do
    if params['page_type'] == "feat"
      (Admin.filter(params["filter"]).map{|i| begin Conflict.select('id, slug, name').find(i['_id'].to_i) rescue nil end }-[nil]).sort{|a,b| a.slug <=> b.slug}.to_json
    elsif params['page_type'] == "network" or params['page_type'] == "graph"
      result = Admin.filter(params["filter"],true,params["fields"].split(","))
      response = {"_count"=>result.length,"_names"=>{}}
      params["fields"].split(",").each do |field|
        resp = {}
        name = {}
        (result.map{|x| x["_source"][field] }.flatten - [nil]).each do |z|
          if field == "population_type"
            y = ['Unknown','Urban','Semi-urban','Rural'][z]
          else
            y = eval(field.sub(/_id$/,"").classify).select("name").find(z).name.strip
          end
          resp[y] = 0 unless resp.has_key?(y)
          resp[y] += 1
          name[z] = y
        end
        resp.delete_if {|k,v| v < params["limit"].to_i}
        response[field] = resp
        response["_names"][field] = name
      end
      if params["page_type"] == "network"
        id = 1
        require "graphcommons"
        unless Graphcommons::API.check_key
          Graphcommons::API.set_key($gc_api_key)
        end
        id = Graphcommons::Endpoint.new_graph(:name => params["name"],:subtitle=>params["subtitle"],:description=>params["desc"])["graph"]["id"]
        prms = {"id"=>id,"name"=>params["name"],"subtitle"=>params["subtitle"],"description"=>params["desc"]}
        prms["cons"] = result.map{|x| x["_id"]}
        prms["fields"] = {}
        response["_names"].each do |key,val|
          prms["fields"][key.sub(/_id$/,"").classify] = val.keys
        end
        AsyncTask.new.export_graphcommons prms
        response[:url] = "https://graphcommons.com/graphs/#{id}"
      end
      response.to_json
    else
      Admin.filter(params["filter"]).map{|i| i['_id'].to_i }.to_json
    end
  end

  get "/ac_json/:model" do
    token = params[:token]
    model = params[:model]
    model = 'country' if model == 'country_of_company'
    #filter = {match:{name:"#{token}"}}
    filter = {query_string:{query:"#{token}*",fields:['name'],default_operator:"AND"}}
    result = $client.search(index: 'atlas', type: model, body: {from:0,size:9999,"_source":{"includes":[:name]},query:filter})['hits']['hits'].map{|i|{:value=>i['_id'].to_i,:label=>i['_source']['name']}}
    pp result
    puts result.length
    return result.to_json
  end

  get "/ac_coc/:country" do
    return 
  end

  get "/info/:id" do
    c = Conflict.find(params[:id])
    target = ""
    target = " target='_blank'" if request.referer.match(/\/embed/) or request.referer.match(/\/761317/)
    popcontent = "<h4 class='maplink'><a href='/conflict/#{c.slug}'#{target}>#{c.name}</a></h4><p>#{c.title} <a href='/conflict/#{c.slug}'#{target}><em>See more</em></a></p><table style='padding:24px 16px;'><tr><td style='width:42px'><div class='map-icon i_#{c.category_id} s_1' style='margin:0 !important;cursor:default'></div><td>"
    popcontent += "<strong>"+c.category.name+"</strong>" if c.category 
    popcontent += '</td></tr></table>'
    puts popcontent
    return popcontent
  end

  get :more_recent do
    result = []
    Conflict.select('id, headline, modified_at, name, slug').where("approval_status = 'approved' AND headline <> '' AND headline IS NOT NULL").order("modified_at desc").offset(params[:offset]).limit(6).each do |c|
      j = JSON.parse(c.to_json)
      begin 
        j["conflict"]["image"] = c.images.first.file.thumb.url
      rescue 
        j["conflict"]["image"] = "/images/bg.png"
      end
      result << j
    end
    return result.to_json
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
          conf.modified_at = Time.now
          conf.commented = true
          conf.save
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

  get :network do
    redirect to "/sessions/login?return=export" unless current_account
    redirect back unless ["admin","editor"].include? current_account.role
    @filterform = JSON.parse(Cached.first.filterdata)
    @page_type = "network"
    @filter = render "base/filter", :layout => false
    render 'base/network', :layout => :application
  end

  get :graph do
    redirect to "/sessions/login?return=export" unless current_account
    redirect back unless ["admin","editor"].include? current_account.role
    @filterform = JSON.parse(Cached.first.filterdata)
    @page_type = "graph"
    @filter = render "base/filter", :layout => false
    render 'base/network', :layout => :application
  end

  get :export do
    redirect to "/sessions/login?return=export" unless current_account
    redirect back unless ["admin","editor"].include? current_account.role
    render 'base/export', :layout => :application
  end

  post :export do
    pp params
    redirect to "/sessions/login?return=export" unless current_account
    redirect back unless ["admin","editor"].include? current_account.role
    if params.has_key?("filter") and params["filter"].length == 6 and flt = Filter.find_by_uid(params.delete("filter"))
      params["idset"] = Admin.filter(flt.query).map {|x| x["_id"]}
    end
    puts params
    params.delete("filter")
    if params.delete("filetype") == "csv"
      AsyncTask.new.csvexport params
    else
      AsyncTask.new.odsexport params
    end
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
    if ENV["RACK_ENV"] == "production"
      @exports = Dir.foreach("/mnt/data/exports").to_a - [".",".."]
    elsif File.directory? "/tmp/export"
      @exports = Dir.foreach("/tmp/export").to_a - [".",".."]
    end
    render 'base/jobs', :layout => :application
  end

  get :exports, :with => :fn do
    pp params
    redirect back unless ENV["RACK_ENV"] === "production"
    redirect to "/sessions/login?return=jobs" unless current_account
    redirect back unless ["admin","editor"].include? current_account.role
    file = "/mnt/data/exports/#{params["fn"]}"
    redirect back unless File.exists?(file)
    return send_file( file )
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
