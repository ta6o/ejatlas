#coding: utf-8
Admin.controller do

  before do
    @ol = true
    @layout = :full
    begin
      @featureds = Featured.where(:id=>JSON.parse(Cached.loc(I18n.locale).featureds||"[]")).order("created_at desc").select("name, slug").limit(6)
    rescue
      @featureds = []
    end
  end

  post "/image" do
    image = Base64::decode64 params["image"].sub("data:image/png;base64,","")
    File.open("#{Dir.pwd}/public/t.png","wb"){|f| f << image}
    return 'ok'
  end

  get /^\/(legal|privacy_policy|about|faq|disclaimer|contact|credits|welcome|datapolicy|resources)\/?/ do
    @slug = params[:captures].first
    if sp = StaticPage.where(:slug=>@slug, :locale=>I18n.locale).first
      @static = true
      @name = sp.name
      @content = sp.content
      render "base/static", :layout => :application
    else
      pass
    end
  end

  get :edit_static, :with => :page do
    pass unless current_account.editor?
    @slug = params[:page]
    if sp = StaticPage.where(:slug=>@slug,:locale=>I18n.locale).first
      @name = sp.name
      @content = sp.content
      render "base/edit_static", :layout => :edit_static
    elsif File.exists? "#{Dir.pwd}/admin/views/base/#{@slug}_#{I18n.locale}.haml"
      @name = @slug
      render "base/#{@slug}_#{I18n.locale}", :layout => :edit_static
    elsif sp = StaticPage.where(:slug=>@slug,:locale=>I18n.default_locale).first
      @name = sp.name
      @content = sp.content
      render "base/edit_static", :layout => :edit_static
    else
      @name = @slug
      render "base/#{@slug}_#{I18n.default_locale}", :layout => :edit_static
    end
  end

  post :edit_static do
    pass unless current_account.editor?
    @slug = params["slug"]
    pass if @slug.nil? or @slug == ""
    unless sp = StaticPage.where(:slug=>@slug,:locale=>I18n.locale).first
      sp = StaticPage.new(:slug=>@slug,:locale=>I18n.locale)
    end
    begin
      sp.update! :name => params["name"], :content => params["content"]
      return {:status=>:success}.to_json
    rescue => e
      return {:status=>:error, :message=>e.to_s}.to_json
    end
  end

  get :legal do
    @static = true
    @name = "Aviso legal"   
    if File.exists? "#{Dir.pwd}/admin/views/base/legal_#{I18n.locale}.haml"
      render "base/legal_#{I18n.locale}", :layout => :application
    else
      render "base/legal_es", :layout => :application
    end
  end

  get :privacy_policy do
    pass unless current_account
    @static = true
    @name = "Privacy policy"   
    if File.exists? "#{Dir.pwd}/admin/views/base/accept_privacy_#{I18n.locale}.haml"
      render "base/accept_privacy_#{I18n.locale}", :layout => :application
    else
      render "base/accept_privacy", :layout => :application
    end
  end

  get :about do
    @static = true
    @name = "About"   
    if File.exists? "#{Dir.pwd}/admin/views/base/about_#{I18n.locale}.haml"
      render "base/about_#{I18n.locale}", :layout => :application
    else
      render "base/about_en", :layout => :application
    end
  end

  get :faq do
    @static = true
    @name = "Frequently Asked Questions"   
    if File.exists? "#{Dir.pwd}/admin/views/base/faq_#{I18n.locale}.haml"
      render "base/faq_#{I18n.locale}", :layout => :application
    else
      render "base/faq_en", :layout => :application
    end
  end

  get :disclaimer do
    @static = true
    @name = "Disclaimer"   
    if File.exists? "#{Dir.pwd}/admin/views/base/disclaimer_#{I18n.locale}.haml"
      render "base/disclaimer_#{I18n.locale}", :layout => :application
    else
      render "base/disclaimer_en", :layout => :application
    end
  end

  get :contact do
    @static = true
    @name = "Contact"   
    if File.exists? "#{Dir.pwd}/admin/views/base/contact_#{I18n.locale}.haml"
      render "base/contact_#{I18n.locale}", :layout => :application
    else
      render "base/contact_en", :layout => :application
    end
  end

  get :credits do
    @static = true
    @name = "Credits & Collaborators"   
    if File.exists? "#{Dir.pwd}/admin/views/base/credits_#{I18n.locale}.haml"
      render "base/credits_#{I18n.locale}", :layout => :application
    else
      render "base/credits_en", :layout => :application
    end
  end

  get :datapolicy do
    @static = true
    @name = t("v.menu.data_use_policy")   
    if File.exists? "#{Dir.pwd}/admin/views/base/datapolicy_#{I18n.locale}.haml"
      render "base/datapolicy_#{I18n.locale}", :layout => :application
    else
      render "base/datapolicy_en", :layout => :application
    end
  end

  get :resources do
    @static = true
    @name = t("v.menu.resources")   
    if File.exists? "#{Dir.pwd}/admin/views/base/resources_#{I18n.locale}.haml"
      render "base/resources_#{I18n.locale}", :layout => :application
    else
      render "base/resources_en", :layout => :application
    end
  end

  get :welcome do
    @static = true
    @name = "Welcome"   
    render "base/welcome_#{I18n.locale}", :layout => :application
  end

  get :mailsent do
    @name = "You'll receive an email..."   
    @account = current_account || nil
    render "base/mailsent", :layout => :application
  end

  post :accept_cookies do
    return unless current_account
    current_account.update_attribute :cookies_accepted, Time.now
  end

  post :accept_privacy do
    return "{'status':'error','message':'No account registered'}" unless current_account
    return "{'status':'error','message':'Current account is different'}" if current_account.id != params["account_id"].to_i
    if current_account.update_attribute :privacy_accepted, Time.now
      result = params["redirect"].sub(/^\?/,"").split("&").map{|r| r.match(/=$/) ? [r.sub(/=$/,""), ""] : r.split("=") }
      pp result
      result = result.to_h
      result["status"] = "success"
      return result.to_json
    end
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
    #puts params[:slug]
    content_type :manifest
    man = "CACHE MANIFEST\n# #{File.read("./lib/stamp").strip}\n\nNETWORK:\n"
    man += "*\n"
    man
  end

  get :index do
    ca = Cached.loc(I18n.locale)
    pass unless ca
    #last_modified ca.updated_at
    @filterform = {}
    @filterform = JSON.parse(ca.filterdata) if ca
    @filterhtml = render "base/filter", :layout => false
    @markercount = ConflictText.where(:approval_status=> ['approved','modified'],:locale=>@global ? "en" : I18n.locale).count
    if @global
      cg = Cached.loc(:en)
      companies = cg.companies ? JSON.parse(cg.companies) : []
      commodities = cg.commodities ? JSON.parse(cg.commodities) : []
      types = cg.types ? JSON.parse(cg.types) : []
      countries = cg.countries ? JSON.parse(cg.countries) : []
      @browseinfo = {"country"=>countries,"company"=>companies,"commodity"=>commodities,"type"=>types}
    else
      companies = ca.companies ? JSON.parse(ca.companies) : []
      commodities = ca.commodities ? JSON.parse(ca.commodities) : []
      types = ca.types ? JSON.parse(ca.types) : []
      provinces = []
      @browseinfo = {"province"=>provinces,"company"=>companies,"commodity"=>commodities,"type"=>types}
    end
    @maptitle = @global ? "World Map" : "Local Map"
    #@vectors = VectorDatum.where(name:'Borders').select('name,url,style,description').to_json
    @desc = "One of the primary objectives of EJOLT is to compile and make available a ‘Map of Environmental Injustice’. This map will consist on an online unique database of resource extraction and disposal conflicts hosted on the project website, geographically referenced (mapped with GIS), and linked with social metabolism and socio- environmental indicators."
    @baselayers = $baselayers
    @recent = Admin.filter_recent(0,{},"modified_at",6,@global)
    @feats = Featured.select('id, description, name, slug, image, headline, published').where(:published=>true).order("updated_at desc").limit(2)
    render "base/map", :layout => @layout
  end

  get :conflict, :with => :slug do
    @conflict = Conflict.find_slug(params[:slug].downcase)
    pass unless @conflict
    if I18n.locale != I18n.default_locale and params.has_key?("translate")
      cta = ConflictText.where(:conflict_id=>@conflict.id, :locale=>I18n.locale)
      if cta.empty? or cta.first.updated_at < @conflict.updated_at or cta.first.updated_at < @conflict.conflict_texts.order(:created_at).first.updated_at 
        Admin.tx_conflict @conflict.conflict_texts.order(:created_at).first, I18n.locale, true
      end
    end
    pass unless ["approved","modified","auto_tx"].include?(@conflict.approval_status) or (current_account and current_account.contributor?(@conflict))
    @markerinfo = @conflict.accurate_marker
    @cmarker = @conflict.as_marker.to_json
    @defs = []
    if @conflict.country
      @conflict.country.vector_data.each do |vd|
        if vd.vector_style and vd.vector_style.defs
          @defs << JSON.parse(vd.vector_style.defs)
        end
      end
    end
    @defs = @defs.to_set.to_a
    @vectors = @conflict.country.vector_data.where("url != ''").where("status = 'published'").select('name, url, description, style').to_json
    @name = @conflict.name
    @modified = @conflict.modified_at ? "#{I18n.t('f.conflict.last_update',:locale=>I18n.locale)}:<br/><b>#{I18n.l(@conflict.modified_at.to_date)}</b>".gsub(/\s+/,"&nbsp;") : "&nbsp;"
    @title = @conflict.title
    @ogimage = @conflict.images.first.file_url if @conflict.images.any?
    @maptitle = @conflict.name
    @zoom = 8
    @zoom = [8,10,12,14][@conflict.accuracy_level] if @conflict.accuracy_level
    @baselayers = "Esri.WorldPhysical,Esri.WorldTopoMap,Esri.WorldImagery"
    @related = @conflict.related
    @headline = @conflict.headline
    @summary = @conflict.table
    @conflict.medialinks.each do |ml|
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
    @zoom = 8
    @zoom = [8,8,10,16][c.accuracy_level] if c.accuracy_level
    @baselayers = $baselayers
    @name = c.name
    @pos = [c.lat,c.lon]
    @cid = c.id
    @table = c.as_table(:print => true)
    @images = c.images
    render 'base/print', :layout => :print
  end

  get "/:model" do
    browseinfo = {"country"=>"countries","company"=>"companies","commodity"=>"commodities","type"=>"types"}
    pass unless browseinfo.has_key?(params[:model])
    ca = Cached.loc(I18n.locale)
    @filterform = JSON.parse(ca.filterdata)
    @filter = render "base/filter", :layout => false
    @name = I18n.t("f.menu.#{browseinfo[params[:model]]}")
    @maptitle = "Browse #{@name}"
    @vectors = []#VectorDatum.where(name:'Borders').select('name,url').to_json
    @baselayers = $baselayers
    if @global
      #puts "global".cyan
      cg = Cached.loc(:en)
      info = eval("JSON.parse(cg.#{browseinfo[params[:model]]})")
      @markercount = JSON.parse(cg.conflicts_marker).length
      @markerinfo = cg.conflicts_marker
      @filterinfo = cg.conflicts_json
    else
      info = eval("JSON.parse(ca.#{browseinfo[params[:model]]})")
      @markercount = JSON.parse(ca.conflicts_marker).length
      @markerinfo = ca.conflicts_marker
      @filterinfo = ca.conflicts_json
    end
    @browseinfo = {params[:model] => info}
    @desc = "One of the primary objectives of EJOLT is to compile and make available a ‘Map of Environmental Injustice’. This map will consist on an online unique database of resource extraction and disposal conflicts hosted on the project website, geographically referenced (mapped with GIS), and linked with social metabolism and socio- environmental indicators."
    render "base/front"
  end

  get :country, :with => :slug do
    ca = Cached.loc(I18n.locale)
    con = Country.find_slug(params[:slug])
    con = Region.find_slug(params[:slug]) unless con
    pass unless con
    @filterform = JSON.parse(ca.filterdata)
    @filter = render "base/filter", :layout => false
    @markerinfo = con.conflicts_marker
    #pp JSON.parse(@markerinfo).length
    contents = File.read('admin/views/base/filter.haml')
    @filterinfo = con.conflicts_json
    @name = I18n.t("countries.#{con.name.shorten_en}")
    @description = con.description
    @qt = "country_id"
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
    @image = con.flag_images.first.file_url if con.flag_images.any?
    @maptitle = I18n.t("v.index.environmental_conflicts_in_var",:country=>I18n.t("countries.#{con.name.shorten_en}"))
    @baselayers = $baselayers
    render "base/front", :layout => @layout
  end

  get :company, :with => :slug do
    ca = Cached.loc(I18n.locale)
    con = Company.find_slug(params[:slug])
    pass unless con
    @filterform = JSON.parse(ca.filterdata)
    @filter = render "base/filter", :layout => false
    ##last_modified con.updated_at
    @markerinfo = con.conflicts_marker
    @filterinfo = con.conflicts_json
    @name = con.name
    @description = con.description
    @qt = "companies"
    @id = con.id
    cf = {:must=>{:term=>{:companies=>con.id}}}
    @markercount = Admin.filter(cf, @locale, true, [], true, 'conflict', 'id', 'asc', true)
    @desc = "Description of #{con.name}"#con.description
    @image = nil
    @image = con.logo_images.first.file_url if con.logo_images.any?
    @maptitle = I18n.t("v.index.environmental_conflicts_var",:company=>con.name)
    @baselayers = $baselayers
    render "base/front", :layout => @layout
  end

  get :institution, :with => :slug do
    ca = Cached.loc(I18n.locale)
    con = Supporter.find_slug(params[:slug])
    pass unless con
    @filterform = JSON.parse(ca.filterdata)
    @filter = render "base/filter", :layout => false
    ##last_modified con.updated_at
    @markerinfo = con.conflicts_marker
    @filterinfo = con.conflicts_json
    @name = con.name
    @description = con.description
    @qt = "supporters"
    @id = con.id
    cf = {:must=>{:term=>{:supporters=>con.id}}}
    @markercount = Admin.filter(cf, @locale, true, [], true, 'conflict', 'id', 'asc', true)
    @desc = "Description of #{con.name}"#con.description
    #@vectors = con.vector_data.select('name, url').to_json
    @maptitle = I18n.t("v.index.environmental_conflicts_of_var",:company=>con.name)
    @baselayers = $baselayers
    render "base/front", :layout => @layout
  end

  get :commodity, :with => :slug do
    ca = Cached.loc(I18n.locale)
    @filterform = JSON.parse(ca.filterdata)
    @filter = render "base/filter", :layout => false
    con = Product.find_slug(params[:slug])
    pass unless con
    @markerinfo = con.conflicts_marker
    @filterinfo = con.conflicts_json
    cf = {:must=>{:term=>{:products=>con.id}}}
    @markercount = Admin.filter(cf, @locale, true, [], true, 'conflict', 'id', 'asc', true)
    @name = I18n.t("m.products.#{con.name.slug("_").split("_")[0..7].join("_")}")
    @qt = "products"
    @id = con.id
    @desc = "Description of #{con.name}"#con.description
    #@vectors = con.vector_data.select('name, url').to_json
    @maptitle = I18n.t("v.index.environmental_conflicts_on_var",:commodity=>I18n.t("m.products.#{con.name.slug("_").split("_")[0..7].join("_")}"))
    @baselayers = $baselayers
    render "base/front", :layout => @layout
  end

  get :type, :with => :slug do
    ca = Cached.loc(I18n.locale)
    @filterform = JSON.parse(ca.filterdata)
    @filter = render "base/filter", :layout => false
    con = Type.find_slug(params[:slug])
    pass unless con
    ##last_modified con.updated_at
    @markerinfo = con.conflicts_marker
    #puts @markerinfo
    @filterinfo = con.conflicts_json
    @name = I18n.t("m.types.#{con.name.slug("_").split("_")[0..7].join("_")}")
    @description = con.description
    @qt = "types"
    @id = con.id
    cf = {:must=>{:term=>{:types=>con.id}}}
    @markercount = Admin.filter(cf, @locale, true, [], true, 'conflict', 'id', 'asc', true)
    @desc = "Description of #{con.name}"#con.description
    #@vectors = con.vector_data.select('name, url').to_json
    @maptitle = I18n.t("v.index.environmental_conflicts_about_var",:category=>I18n.t("m.types.#{con.name.slug("_").split("_")[0..7].join("_")}"))
    @baselayers = $baselayers
    render "base/front", :layout => @layout
  end

  get 'country-of-company', :with => :slug do
    con = Country.find_slug(params[:slug])
    pass unless con
    ca = Cached.loc(I18n.locale)
    @filterform = JSON.parse(ca.filterdata)
    @filter = render "base/filter", :layout => false
    ##last_modified con.updated_at
    @markerinfo = con.companies_marker
    @filterinfo = con.companies_json
    @name = "Companies from #{con.name}"
    @name = I18n.t("m.products.#{con.name.slug("_").split("_")[0..7].join("_")}")
    @load = con.companies_link
    @markercount = @load.split("</p><p").length
    @desc = "Description of #{con.name}"#con.description
    #@vectors = con.vector_data.select('name, url').to_json
    @maptitle = "Environmental Conflicts of #{@name}"
    @baselayers = $baselayers
    render "base/front", :layout => @layout
  end

  get 'country-of-institution', :with => :slug do
    con = Country.find_slug(params[:slug])
    pass unless con
    ca = Cached.loc(I18n.locale)
    ##last_modified con.updated_at
    @markerinfo = con.supporters_marker
    @name = "Financial Institutions from #{con.name}"
    @name = I18n.t("m.products.#{con.name.slug("_").split("_")[0..7].join("_")}")
    @id = con.id
    @load = con.companies_link
    @markercount = @load.split("</p><p").length
    @desc = "Description of #{con.name}"#con.description
    #@vectors = con.vector_data.select('name, url').to_json
    @maptitle = "Environmental Conflicts of #{@name}"
    @baselayers = $baselayers
    render "base/front", :layout => @layout
  end

  get :featured do
    @feats = Featured.select('id, description, name, slug, image, headline, published').where(:published=>true).order("created_at desc")
    render "base/featured", :layout => "application"
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
    @ogimage = con.images.where(prime:1)[0].file_url if con.images.where(prime:1).any?
    @markercount = JSON.parse(@markerinfo || "[]").count
    @defs = []
    con.vector_data.each do |vd|
      if vd.vector_style and vd.vector_style.defs
        @defs << JSON.parse(vd.vector_style.defs)
      end
    end
    @defs = @defs.to_set.to_a
    @vectors = CGI.unescapeHTML(con.vector_data.where("url != ''").where("status = 'published'").select('name, url, description, style, choropleth, shown, id, source, link, rank, clickable, geometry_type').order(:rank).to_json).html_safe
    @ranks = []
    @layers = con.geo_layers.map{|x| [x.slug,x.info]}.reverse.to_h
    #pp @layers
    @layers.each do |n,l|
      att = GeoLayerAttachable.where(:attachable_type=>"Featured",:attachable_id=>con.id,:geo_layer_id=>l[:id]).first
      if att
        l["shown"] = att.shown || 0
        l["clickable"] = att.clickable || false
        l["legend"] = att.legend || false
        if att.rank
          l["rank"] = att.rank
          @ranks[att.rank] = n
        else
          l["rank"] = 0
          @ranks << n
        end
      end
    end
    @layers = @layers.to_json.html_safe
    @ranks = (@ranks - [nil]).reverse.to_json.html_safe
    @images = []
    @images = con.images.order("updated_at desc") if con.images.any?
    @ogimage = @images.first.file_url if @images.any?
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
    @ol = con.geo_layers.length > 0
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
    ca = Cached.loc(I18n.locale)
    pass unless ca
    @markercount = ConflictText.where(:approval_status=> 'approved',:locale=>I18n.locale).count
    @baselayers = $baselayers
    headers({ 'X-Frame-Options' => 'ALLOWALL' })
    render "base/embed", :layout => false
  end

  get :embed, :with => :slug do
    ca = Cached.select(:filterdata).first
    con = Featured.find_slug(params[:slug])
    pass unless con
    @markerinfo =  JSON.parse(con.conflicts_marker).map{|x| JSON.parse(x)}.to_json.html_safe
    @load = @markerinfo.length > 60000 ? nil : con.conflicts_link
    @name = con.name
    @description = con.description
    @id = con.id
    @desc = con.description
    @headline = con.slogan
    @ogimage = con.images.where(prime:1)[0].file_url if con.images.where(prime:1).any?
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
    @image = con.images.first.file_url if con.images.any?
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
    Admin.filter(fil.query, @locale, true, ["id","lat","lon","category_id"]).map{|x| x["_source"]}.each do |h|
      data << {:c=>h["category_id"],"i"=>h["id"],"a"=>h["lat"],"o"=>h["lon"]}
    end
    @markerinfo = data.to_json.html_safe
    @name = fil.name
    @description = fil.description
    @id = fil.id
    @desc = fil.description
    @markercount = data.length
    @maptitle = fil.name
    @title = fil.name
    @fid = fil.uid
    @filter = true
    @baselayers = $baselayers
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

  get :backup do
    pass unless $ips.include?(request.ip)
    AsyncTask.new.backup nil
    "TASK STARTED"
  end

  get :cache do
    redirect to "/sessions/login?return=cache" unless current_account
    redirect back unless current_account.editor?
    Admin.fetch_translations(false) if $tstatus.nil?
    @tkeys = $tstatus.values.map(&:keys).flatten.uniq.sort - ["master"]
    @iso639 = JSON.parse(File.read("#{Dir.pwd}/lib/iso639.json")).reject {|x,y| ! @tkeys.include?(x)}
    render 'base/cache', :layout => :application
  end

  post :cache do
    redirect to "/sessions/login?return=cache" unless current_account
    redirect back unless current_account.editor?
    params["run_by"] = current_account.name
    AsyncTask.new.setcache params
    redirect to 'jobs'
  end

  post :update_all_cache do
    redirect to "/sessions/login?return=cache" unless current_account
    redirect back unless ["admin"].include? current_account.role
    Admin.update_all_cache
  end


  get :filters do
    pass unless current_account
    @name = "Filters"
    if current_account.editor?
      @filters = Filter.order("updated_at desc")
    else
      @filters = Filter.where(:account_id => current_account.id).order("updated_at desc")
      @publics = Filter.where(:public => true).order("updated_at desc")
    end
    render "base/filters", :layout => "application"
  end

  post :delete_filter do
    return "nack" unless current_account
    filter = Filter.find(params[:id])
    return "nack" unless filter
    if current_account.editor? or current_account.filters.include? filter
      filter.destroy
      return "ack"
    end
    return "nack"
  end

  get "/filter/new/?" do
    @name = "New filter"
    @page_type = "feat"
    pass unless current_account
    @filter = Filter.new :query=>"{}"
    @filter.unique
    @filterform = {}
    ca = Cached.where(:locale=>I18n.locale)
    @filterform = JSON.parse(ca.first.filterdata) if ca.any?
    @filterhash = {}
    render "base/editfilter", :layout => "application"
  end

  get :editfilter, :with => :uid do
    @name = "Editing filter"
    @page_type = "feat"
    pass unless current_account
    filter = Filter.find_by_uid(params["uid"])
    if filter and filter.account == current_account or current_account.editor?
      @filter = filter
    else
      redirect to "/filters"
    end
    @filterform = {}
    ca = Cached.where(:locale=>I18n.locale)
    @filterform = JSON.parse(ca.first.filterdata) if ca.any?
    @filterhash = {}
    if @filter.query.match(/"(country_id|companies|supporters|country_of_company)":"/)
      @filter.query.scan(/("(country_id|companies|supporters|country_of_company)":"\d+")/).each do |a|
        @filterhash[a[1]] = {} unless @filterhash.has_key?(a[1])
        id = a[0].gsub(/"/,"").split(":")[-1].to_i
        val = {"country_id"=>Country,"companies"=>Company,"supporters"=>Supporter,"country_of_company"=>Country}[a[1]].find(id).name.strip
        @filterhash[a[1]][id] = val
      end
    end
    pp @filterhash
    render "base/editfilter", :layout => "application"
  end

  post :savefilter do
    pass unless current_account
    unless filter = Filter.find(params["uid"])
      filter = Filter.where(:query=>params["data"],:account_id=>current_account.id)
      if filter.any?
        filter = filter.first
      else
        filter = Filter.new(account_id: current_account.id,:uid=>params["uid"])
      end
    end
    filter.query = params["data"]
    filter.result_length = Admin.filter(params["data"], @locale,false).length
    filter.name = params["name"] if (params.has_key?("name"))
    filter.description = params["description"] if (params.has_key?("description"))
    filter.public = params["public"] if (params.has_key?("public"))
    if filter.save
      return filter.uid
    else
      return "error"
    end
  end

  post :filter do
    if params['page_type'] == "feat"
      Admin.filter(params["filter"], @locale,false).to_json
    elsif params['page_type'] == "network" or params['page_type'] == "graph"
      result = Admin.filter(params["filter"], @locale,true,params["fields"].split(","))
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
        resp = resp.sort_by{|k,v|v}.reverse.to_h
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
        prms["run_by"] = current_account.name
        response["_names"].each do |key,val|
          prms["fields"][key.sub(/_id$/,"").classify] = val.keys
        end
        AsyncTask.new.export_graphcommons prms
        response[:url] = "https://graphcommons.com/graphs/#{id}"
      end
      response.to_json
    else
      Admin.filter(params["filter"], @locale).map{|i| i['_id'].to_i }.to_json
    end
  end

  get :filter, :with => :uid do
    @page_type = "feat"
    pass unless current_account
    filter = Filter.find_by_uid(params["uid"])
    if filter and (filter.account == current_account or current_account.editor? or filter.public)
      @filter = filter
    else
      redirect to "/filters"
    end
    @conflicts = @filter.conflict_ids.map { |x| Conflict.find(x) }
    render "base/showfilter", :layout => "application"
  end


  post :search do
    pass unless params.has_key?("token")
    token = params.delete("token")
    return "[]" if token.nil? or token === ""
    filter = {
      "should": [
        {"match_phrase": { "name":token }},
        {"match_phrase": { "description":token }},
        {"match_phrase": { "project_details":token }},
        {"match_phrase": { "suggested_alternatives":token }},
      ]
    }
    Admin.filter(filter.to_json, @locale).map{|i| i['_id'].to_i }.to_json
  end

  get "/ac_json/:model" do
    token = params[:token]
    model = params[:model]
    model = "country" if model == "country_of_company"
    model = "tag" if model == "tags"
    return "[]" if model == "account" and not current_account
    filter = {bool:{must:[{query_string:{query:"#{token}*",fields:['name'],default_operator:"AND"}},{match:{type: model}}]}}
    res = $client.search(index: $esindex, body: {from:0,size:9999,"_source":{"includes":[:name,:id]},query:filter})['hits']['hits'].map{|i|{:value=>i['_source']['id'],:label=>i['_source']['name']}}
    if ["country","region"].include?(model)
      res = res.map{|c| {:value=>c[:value], :label=>I18n.t("countries.#{c[:label].shorten_en}")}}
    end
    res.to_json
  end

  get "/ac_id/:model" do
    id = params[:id]
    model = params[:model]
    filter = {bool:{must:[{query_string:{query:"#{token}*",fields:['name'],default_operator:"AND"}},{match:{type: model}}]}}
    res = $client.search(index: $esindex, body: {from:0,size:9999,"_source":{"includes":[:name,:id]},query:filter})['hits']['hits'].map{|i|{:value=>i['_source']['id'],:label=>i['_source']['name']}}
    if ["country","region"].include?(model)
      res = res.map{|c| {:value=>c[:value], :label=>I18n.t("countries.#{c[:label].shorten_en}")}}
    end
    res.to_json
  end

  get "/ac_coc/:country" do
    return 
  end

  get "/layer_style/:slug" do
    GeoLayer.find_by_slug(params[:slug]).style
  end

  get "/info/:id" do
    c = Conflict.find(params[:id])
    if request.referer and loc = request.referrer.match(/[\?&]translate=(\w+)/) and c.local_data(loc[1])
      I18n.locale = loc[1]
    end
    target = ""
    target = " target='_blank'" if request.referer and (request.referer.match(/\/embed/) or request.referer.match(/\/761317/))
    popcontent = "<h4 class='maplink'><a href='/conflict/#{c.slug(loc)}'#{target}>#{c.name}</a><a id='popup-closer' class='ol-popup-closer'><icon class='glyphicon glyphicon-remove'></icon></a></h4><p>#{c.title} <a href='/conflict/#{c.slug}'#{target}><em>#{I18n.t('v.info.see_more')}</em></a></p><table style='padding:24px 16px;'><tr><td style='width:42px'><div class='map-icon c_#{c.category_id}' style='margin:0 !important;cursor:default'></div><td>"
    popcontent += "<strong>"+t($cathash[c.category_id])+"</strong>" if c.category 
    popcontent += '</td></tr></table>'
    #puts popcontent
    return popcontent
  end

  get :more_recent do
    #puts params[:filter]
    result = []
    Admin.filter_recent(params[:offset],JSON.parse(params[:filter], :symbolize_names => true),"modified_at",6,@global).each do |c|
      j = {"conflict"=>c}
      begin 
        j["conflict"]["image"] = Conflict.find(c["id"]).images.first.thumb_url
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
    @filterform = JSON.parse(Cached.loc(I18n.locale).filterdata)
    @page_type = "network"
    @filter = render "base/filter", :layout => false
    render 'base/network', :layout => :application
  end

  get :graph do
    redirect to "/sessions/login?return=export" unless current_account
    #redirect back unless ["admin","editor"].include? current_account.role
    @filterform = JSON.parse(Cached.loc(I18n.locale).filterdata)
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
    redirect to "/sessions/login?return=export" unless current_account
    redirect back unless ["admin","editor"].include? current_account.role
    if params.has_key?("filter") and params["filter"].length == 6 and flt = Filter.find_by_uid(params["filter"])
      params["idset"] = Admin.filter(flt.query, @locale,false).map {|x| x["_id"]}
    end
    params.delete("filter")
    if params.has_key?("feat") and feat = Featured.find(params["feat"])
      params["idset"] = Admin.filter(feat.filter, @locale,false).map {|x| x["_id"]}
    end
    params.delete("feat")
    params["locale"] = I18n.locale
    params["run_by"] = current_account.name
    pp params
    if params.delete("filetype") == "csv"
      AsyncTask.new.csvexport params
    else
      AsyncTask.new.odsexport params
    end
    redirect to 'jobs'
  end

  post :export_companies do
    redirect to "/sessions/login?return=export" unless current_account
    redirect back unless ["admin","editor"].include? current_account.role
    puts "aman"
    params = {}
    params["run_by"] = current_account.name
    AsyncTask.new.export_companies(params)
    redirect to 'jobs'
  end

  get :translations do
    redirect to "/sessions/login?return=translations" unless current_account
    redirect back unless current_account.translator?
    Admin.fetch_translations(false) if $tstatus.nil?
    @tkeys = $tstatus.values.map(&:keys).flatten.uniq.sort
    @iso639 = JSON.parse(File.read("#{Dir.pwd}/lib/iso639.json")).reject {|x,y| ! @tkeys.include?(x)}
    render 'base/translations', :layout => :application
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
    params["run_by"] = current_account.name
    AsyncTask.new.parsedata master
    redirect to 'jobs'
  end

  get :jobs do
    @name = "Queued Jobs"
    redirect to "/sessions/login?return=jobs" unless current_account
    redirect back unless current_account.editor?
    @jobs = Delayed::Job.all
    @exports = []
    if ENV["RACK_ENV"] == "production"
      Dir.foreach("/mnt/data/exports").sort.reverse.each do |file|
        next if file.match(/^\./)
        @exports << [file, File.size("/mnt/data/exports/#{file}")]
      end
    elsif File.directory? "#{$filedir}/../exports"
      Dir.foreach("#{$filedir}/../exports").sort.reverse.each do |file|
        next if file.match(/^\./)
        @exports << [file, File.size("#{$filedir}/../exports/#{file}")]
      end
    end
    render 'base/jobs', :layout => :application
  end

  get :exports, :with => :fn do
    redirect to "/sessions/login?return=jobs" unless current_account
    redirect back unless ["admin","editor"].include? current_account.role
    if ENV["RACK_ENV"] == "production"
      file = "/mnt/data/exports/#{params["fn"]}"
      redirect back unless File.exists?(file)
      return send_file( file )
    else
      file = "#{$filedir}/../exports/#{params["fn"]}"
      redirect back unless File.exists?(file)
      return send_file( file )
    end
  end

  get :not_authorized do
    render 'base/not_authorized', :layout => :application
  end

  get :example do
    @conflict = Conflict.new
    @iso639 = JSON.parse(File.read("#{Dir.pwd}/lib/iso639.json")).reject {|x,y| ! $tkeys.include?(x)}
    @title = t("f.conflict.new_conflict_example")
    @name = t("f.conflict.new_conflict_example")
    @example = true
    render 'conflicts/new', :layout => :application
  end

  get :sitemap do
    pass unless current_account
    pass unless ["admin","editor"].include? current_account.role
    @name = "Sitemap"
    @routes = (Admin.routes.map{|r| r.verb != "HEAD" ? r : nil }-[nil]).sort_by{|r|r.path}
    render 'base/sitemap', :layout => :application
  end

=begin
  get "/help/:scope/:unit" do
    I18n.t("help.#{params[:scope]}.#{params[:unit]}")
  end
=end

end
