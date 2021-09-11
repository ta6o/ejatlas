Admin.controllers :featureds do

  before do
    redirect to "/sessions/login?return=#{request.path.sub(/^\//,'')}" unless current_account
    @name = "Featured Maps"
  end

  get :index do
    @featureds = []
    if current_account.gis?
      Featured.select("id, name, slug, description, image").find_in_batches do |batch|
        @featureds << batch
      end
      @featureds.flatten!
    elsif current_account
      @featureds = current_account.featureds.select("id, name, slug, description, image")
    else
      redirect to "/sessions/login?return=#{request.path.sub(/^\//,'')}"
    end
    #puts @featureds.count
    render 'featureds/index'
  end

  get :help do
    render 'featureds/fm_doc'
  end

  get :new do
    @featured = Featured.new
    @features = []
    @followed = []
    @page_type = "feat"
    ca = Cached.loc(I18n.locale)
    @filterform = JSON.parse(ca.filterdata)
    @filterinfo = ca.conflicts_json
    @name = "New FM"
    render 'featureds/new'
  end

  post :create do
    @featured = Featured.new(params[:featured])
    if @featured.slug.nil? or @featured.slug == ""
      @featured.slug = @featured.name.slug
    end
    params[:featured][:color].gsub! /#/, ''
    if @featured.save!
      flash[:notice] = 'Featured was successfully created.'
      @featured.ping(Admin.filter(@featured.filter,false))
      return {:status=>"success",:id=>@featured.id}.to_json
    else
      return {:status=>"error",:message=>"featured map not saved"}.to_json
    end
  end

  get :edit, :with => :id do
    @featured = Featured.find(params[:id])
    unless current_account and @featured and (@featured.account_id == current_account.id or current_account.gis?)
      redirect to "/featureds"
    end
    @name = "Editing FM: #{@featured.name}"
    @featured.description = @featured.description.gsub("\n","<br />")
    @features = JSON.parse(@featured.features) - $attrhash.values  
    @page_type = "feat"
    @contained = {}
    (JSON.parse(@featured.features) & $attrhash.values).each do |val|
      @contained[$attrhash.select{|k,v| v == val}.keys.first] = val
    end
    begin
      @followed = @featured.followed
    rescue => e
      @followed = []
      #puts e.to_s.red
      #puts e.backtrace
      #puts "...".red
    end
    @filterform = JSON.parse(Cached.loc(I18n.locale).filterdata)
    @filterhash = {}
    if @featured.filter.match(/"(country_id|companies|supporters|country_of_company)":"/)
      @featured.filter.scan(/("(country_id|companies|supporters|country_of_company)":"\d+")/).each do |a|
        @filterhash[a[1]] = {} unless @filterhash.has_key?(a[1])
        id = a[0].gsub(/"/,"").split(":")[-1].to_i
        val = {"country_id"=>Country,"companies"=>Company,"supporters"=>Supporter,"country_of_company"=>Country}[a[1]].find(id).name.strip
        @filterhash[a[1]][id] = val
      end
    end
    @mania = ['types','products','conflict_events','mobilizing_groups','mobilizing_forms','companies']
    @imps = ['env_impacts','hlt_impacts','sec_impacts']
    render 'featureds/edit'
  end

  put :update, :with => :id do
    @featured = Featured.find(params[:id])
    redirect to "/featureds" unless current_account and @featured and (@featured.account_id == current_account.id or current_account.gis?)
    #pp params
    rank = 0
    (params.delete("vectors") || []).each do |id, data|
      vector = VectorDatum.find(id)
      next unless vector.status == "published"
      rank += 1
      vector.update_attribute(:rank, rank)
      if data.has_key?("shown") and data["shown"] == "on"
        vector.update_attribute(:shown, 1)
      else
        vector.update_attribute(:shown, 0)
      end
      if data.has_key?("clickable") and data["clickable"] == "on"
        vector.update_attribute(:clickable, true)
      else
        vector.update_attribute(:clickable, false)
      end
    end
    rank = 0
    (params.delete("geo_layers") || []).each do |id, data|
      p data
      vector = GeoLayer.find(id)
      attach = GeoLayerAttachable.where(:attachable_type=>"Featured",:attachable_id=>@featured.id,:geo_layer_id=>vector.id).first
      rank += 1
      attach.update_attribute(:rank, rank)
      if data.has_key?("legend") and data["legend"] == "on"
        attach.update_attribute(:legend, true)
      else
        attach.update_attribute(:legend, false)
      end
      if data.has_key?("shown") and data["shown"] == "on"
        attach.update_attribute(:shown, 1)
      else
        attach.update_attribute(:shown, 0)
      end
      if data.has_key?("clickable") and data["clickable"] == "on"
        attach.update_attribute(:clickable, true)
      else
        attach.update_attribute(:clickable, false)
      end
    end
    params[:featured][:color].gsub! /#/, ''
    @featured.published = false unless params[:featured].has_key?('published')
    if @featured.update(params[:featured])
      #puts "featured map saved".green
      flash[:notice] = 'Featured was successfully updated.'
      if params['conflict']
        #puts "featured conflicts...".cyan
        params["conflict"].each do |k,v|
          conflict = Conflict.find k.split(':')[-1]
          feats = JSON.parse(conflict.features || "{}")
          feats["#{@featured.id}:#{k.split(':')[0]}"] = v
          conflict.features = feats.to_json
          conflict.save
        end
      end
      if params.has_key? 'images_attributes' and params['images_attributes'].any?
        #puts "featured images...".cyan
        images = {}
        params['images_attributes'].each {|i,v| images["n#{i}"] = @featured.images.order(:created_at)[i.to_i]}
        #pp images
        params['images_attributes'].each do |i, v|
          img = images["n#{i}"]
          #puts v
          if v['_destroy'] == "on"
            img.destroy
            next
          end
          next unless img
          img.update_attribute :title, v['title']
          ih = {nil=>nil, "on"=>1}
          img.update_attribute :prime, ih[v['prime']] if ih[v['prime']] != img.prime
          #puts "ahoy! #{i}"
        end
      end
      begin
        #puts "featured tags...".cyan
        tags = params["tags"].split(/,\s*/).to_set.to_a.map{|t| Tag.find(t.to_i)}
        rem = @featured.tags - tags
        add = tags - @featured.tags
        rem.each do |t|
          FTag.where(:tag_id=>t.id,:featured_id=>@featured.id).each {|f| f.destroy}
        end
        add.each do |t|
          @featured.tags << t
        end
      rescue => e
        @error = e
        redirect url(:featureds, :edit, :id => @featured.id)
      end
      features = JSON.parse(@featured.features || '{}')
      puts "filterping".red
      puts @featured.inspect
      @featured.filterping
      puts @featured.inspect
      return {:status=>"success",:message=>@error}.to_json
    else
      return {:status=>"error",:message=>"featured map not saved"}.to_json
    end
  end

  post :update_attrs do
    begin
      GeoLayer.find(params["id"]).update_attrs
      return "ack"
    rescue => e
      return "Could not update layer attributes: #{e}"
    end
  end

  post :update_style do
    e = GeoLayer.find(params["id"]).update_attrs
    if e == true
      return "ack"
    else
      return e.to_s
    end
  end

  post :update_geoserver do
    GeoLayer.check_layers params["slugs"]
    return "ack"
  end

  get :geo_edit, :with => [:fid,:lid] do
    pass unless current_account.gis?
    @featured = Featured.find(params[:fid])
    @layer = GeoLayer.find(params[:lid])
    render 'featureds/geo_edit', :layout=>false
  end

  post :geo_edit, :with => [:fid,:lid] do
    pass unless current_account.gis?
    feat = Featured.find(params.delete(:fid))
    layer = GeoLayer.find(params.delete(:lid))
    params["attributes_omitted"] = params["attributes_omitted"].to_json
    layer.update(params)
    return redirect to "/featureds/edit/#{feat.id}"
  end

  get :geo_modal, :with => :id do
    pass unless current_account.gis?
    @featured = Featured.find(params[:id])
    render 'featureds/geo_modal', :layout=>false
  end

  post :geo_modal, :with => :id do
    pass unless current_account.gis?
    feat = Featured.find(params.delete(:id))
    oids = feat.geo_layers.map(&:id)
    nids = params.keys.map{|k| k.match(/(\d+)/)[1].to_i}
    (nids - oids).each do |add|
      GeoLayerAttachable.create(:attachable_type=>"Featured",:attachable_id=>feat.id,:geo_layer_id=>add)
    end
    (oids - nids).each do |rm|
      GeoLayerAttachable.where(:attachable_type=>"Featured",:attachable_id=>feat.id,:geo_layer_id=>rm).first.destroy
    end
    return redirect to "/featureds/edit/#{feat.id}"
  end

  get :delete, :with => :id do
    pass unless current_account.gis?
    featured = Featured.find(params[:id])
    if featured.delete
      flash[:success] = 'Map is deleted successfully.'
    else
      flash[:error] = 'Unable to delete map!'
    end
    redirect url(:featureds, :index)
  end

  get :export, :with => :id do
    featured = Featured.find(params['id'])
    redirect to '/featureds' unless featured
    unless current_account and featured and (featured.account_id == current_account.id or current_account.gis?)
      redirect to "/featureds"
    end
    begin
      filter = "{}"
      filter = featured.filter if featured.filter.length > 0
      stack = (Admin.filter(filter,false).map{|i| begin Conflict.find(i['_id'].to_i) rescue nil end} - [nil]).sort{|a,b| a.slug <=> b.slug}
    rescue => e
      stack = Admin.old_filter(featured.filter).sort{|a,b| a.slug <=> b.slug}
    end
    tags = (featured.filter || "").split('/').grep(/^tag~/)
    tags = tags[0].split('~')[-1].split(',') if tags.any?
    tags = tags.map {|t| Tag.find(t)}
    rows = []
    header = ['id','name']
    mania = ['types','products','conflict_events','mobilizing_groups','mobilizing_forms','companies','supporters']
    imps = ['env_impacts','hlt_impacts','sec_impacts']
    stack.each_with_index do |conf,index|
      nfields = 0
      line = [conf.id,conf.name]
      features = JSON.parse(conf.features || "{}")
      JSON.parse(featured.features).each do |k|
        next if ["json","table","marker",'licence','ready','affected_min','affected_max'].include? k
        if Conflict.attribute_names.include? k
          v = eval("conf.#{k}")
          if k.to_s[-3..-1] == "_id" and !["reaction_id","status_id","population_type","accuracy_level","other_supporters"].include? k
            begin
              ass = eval "conf."+k.to_s[0...-3]
            rescue
              next
            end
            header << k.to_s[0...-3].gsub("_"," ").titlecase if index == 0
            if ass.nil?
              line << ""
            elsif ass.name
              line << ass.name
            else
              line << ass.attributes
            end
          elsif k == "success_level"
            if v
              val = ["Success", "Not sure", "Failure"][v]
            else
              val = ""
            end
          elsif k == "reaction_id"
            header << "reaction_id" if index == 0
            if v
              line << Reaction.find(v).name
            else
              line << ""
            end
          elsif k == "status_id"
            header << "status_id" if index == 0
            if v
              line << Status.find(v).name
            else
              line << ""
            end
          elsif k == "population_type"
            header << "population_type" if index == 0
            if v
              line << ['Unknown','Urban','Semi-urban','Rural'][v]
            else
              line << ""
            end
          elsif k == "accuracy_level"
            header << "accuracy_level" if index == 0
            if v
              line << ['','LOW country/state level','MEDIUM regional level','HIGH local level'][v]
            else
              line << ""
            end
          else
            header << k if index == 0
            line << v.to_s
          end
        elsif mania.include? k
          header << k if index == 0
          line << eval("conf.#{k}").map(&:name).join(', ')
        elsif imps.include? k
          header << k if index == 0
          line << eval("conf.#{k}").map(&:name).join(', ')
        else
          header << k if index == 0
          line << features["#{featured.id}:#{k}"]
        end
        nfields += 1
      end
      tags.each do |tag|
        header << tag.slug if index == 0
        conf.tags.include?(tag) ? t = 1 : t = ""
        line << t
      end
      rows << line
    end
    tata = Time.now
    filename = "EJAFTD_#{featured.slug}_#{tata.strftime('%Y-%m-%d-%H%M')}.csv"
    CSV.open('/tmp/feat.csv',"w") do |output|
      output << header
      rows.each do |line|
        output << line
      end
    end
    send_file '/tmp/feat.csv', :type => :csv, :filename => filename
  end

  post :csv, :with => :id do
    require 'csv'
    unless feat = Featured.find(params['id'])
      redirect to '/featureds'
    end
    csvfile = File.read(params['featured']['file'][:tempfile])
    begin
      csv = ::CSV.parse(csvfile, :row_sep => :auto, :col_sep => "\t", encoding: "utf-8")
    rescue
      csv = ::CSV.parse(csvfile, :row_sep => :auto, :col_sep => ",", encoding: "utf-8")
    end
    puts "csv length: #{csv.length}"
    #csv = CSV.parse params['featured']['file'][:tempfile].read.force_encoding('utf-8')
    header = csv.shift
    tags = header.dup

    puts "TAGS".green

    csv.each do |row|
      row.each_with_index do |cell,index|
        if cell != '1' and cell != nil
          tags[index] = nil
        end
      end
    end
    
    tags -= [nil]
    ftags = []
    itags = []
    tags.each_with_index do |tag,index|
      if tag.match(/:/)
        domain = tag.split(":")[-1]
        tag = tag.split(":")[0]
      else
        domain = '0380A5'
      end
      slug = Admin.slugify(tag)
      ftags << slug
      if ftag = Tag.find_slug(slug)
        ftag.domain = domain
        ftag.save
      else
        ftag = Tag.create :name => UnicodeUtils::titlecase(tag.gsub(/[-_]/,' ')), :domain => domain
      end
      feat.tags << ftag unless feat.tags.include? ftag
      itags << ftag.id
    end
    p tags
    p ftags
    p itags

    name = UnicodeUtils::titlecase(params['featured']['file'][:filename].split('.')[0].gsub(/[-_]/,' '))

    filt = []
    puts "FILT".green
    csv.each do |row|
      next unless row[0]
      conflict = Conflict.find(row[0].to_i)
      filt << {:id=>row[0].to_s}
      features = JSON.parse(conflict.features || "{}")
      features.reject! {|k| k.match(/^#{feat.id}:/)}
      row.each_with_index do |cell,index|
        next if ['id','name'].include? header[index]
        next if Conflict.attribute_names.include? cell
        if tags.include? header[index]
          next unless cell == '1'
          tag = Tag.find_slug(Admin.slugify(header[index].split(":")[0]))
          conflict.tags << tag unless conflict.tags.include?(tag)
        else
          features["#{feat.id}:#{header[index]}"] = cell
        end
      end
      conflict.features = features.to_json
      conflict.save
      print "\r#{conflict.slug}"
    end
    header.delete 'id'
    header.delete 'name'
    features = header - tags
    feat.features = features.to_json

=begin
    filter = (feat.filter || "").split('/')
    tag = filter.index{|x| x =~ /^tag~/ }
    if tag
      curtags = filter[tag].split('~')[-1].split(',').map{|t| t.to_i}
      filter[tag] = "tag~#{(itags | curtags).join(',')}"
    else
      curtags = []
      filter << "tag~#{(itags | curtags).join(',')}"
    end
    feat.filter = filter.join('/')
=end
    feat.update_attribute(:filter,{"should":{"term":filt}}.to_json)

    feat.filterping
    feat.save
    puts "FIN".cyan
    redirect to "/featureds/edit/#{feat.id}"
  end

  delete :destroy, :with => :id do
    featured = Featured.find(params[:id])
    unless current_account and featured and (featured.account_id == current_account.id or current_account.gis?)
      redirect to "/featureds"
    end
    if featured.destroy
      flash[:notice] = 'Featured map was successfully destroyed.'
    else
      flash[:error] = 'Unable to destroy Featured map!'
    end
    redirect url(:featureds, :index)
  end

  post :getimage do
    #self.slug.downcase!
    #puts params
    f = Featured.find(params['image']['attachable_id'])
    image = Image.new(params['image'])
    image.prime = true if f.images.where(prime:1).empty?
    if image.save
      return {:file=>image.file_url,:thumb=>image.file.thumb_url,:n=>f.images.count,:title=>image.title}.to_json
    else
      return 'no'
    end
  end

end

