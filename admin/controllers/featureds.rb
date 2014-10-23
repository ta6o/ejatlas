Admin.controllers :featureds do

  before do
    if current_account and ["admin","editor"].include?(current_account.role)
      @name = "Featured Maps"
    else
      redirect to "/sessions/login"
    end
  end

  get :index do
    @featureds = []
    Featured.select("id, name, slug, description, image").find_in_batches do |batch|
      @featureds << batch
    end
    @featureds.flatten!
    puts @featureds.count
    render 'featureds/index'
  end

  get :new do
    @featured = Featured.new
    @features = []
    @contained = {}
    @filterform = JSON.parse(Cached.last.filterdata)
    @filterinfo = Cached.last.conflicts_json
    render 'featureds/new'
  end

  post :create do
    @featured = Featured.new(params[:featured])
    if @featured.save
      flash[:notice] = 'Featured was successfully created.'
      begin
        @featured.ping(Admin.filter(@featured.filter))
      rescue => e
        @error = e
        redirect url(:featureds, :edit, :id => @featured.id)
      end
      redirect url(:featureds, :edit, :id => @featured.id)
    else
      render 'featureds/new'
    end
  end

  get :edit, :with => :id do
    @featured = Featured.find(params[:id])
    @features = JSON.parse(@featured.features) -$attrhash.values  
    @contained = {}
    (JSON.parse(@featured.features) & $attrhash.values).each do |val|
      @contained[$attrhash.select{|k,v| v == val}.keys.first] = val
    end
    p @contained
    @followed = Admin.filter(@featured.filter || "")
    @followed.sort! {|a,b| a.slug <=> b.slug}
    @filterform = JSON.parse(Cached.last.filterdata)
    @filterinfo = Cached.last.conflicts_json
    @mania = ['types','products','conflict_events','mobilizing_groups','mobilizing_forms','companies']
    @imps = ['env_impacts','hlt_impacts','sec_impacts']
    render 'featureds/edit'
  end

  put :update, :with => :id do
    @featured = Featured.find(params[:id])
    puts params
    if @featured.update_attributes(params[:featured])
      flash[:notice] = 'Featured was successfully updated.'
      if params['conflict']
        params["conflict"].each do |k,v|
          conflict = Conflict.find k.split(':')[-1]
          feats = JSON.parse(conflict.features || "{}")
          feats["#{@featured.id}:#{k.split(':')[0]}"] = v
          conflict.features = feats.to_json
          conflict.save
        end
      end
      if params['images_attributes'].any?
        images = {}
        params['images_attributes'].each{|i,v| images["n#{i}"] = @featured.images[i.to_i]}
        params['images_attributes'].each do |i, v|
          img = images["n#{i}"]
          puts i
          puts img
          if v['_destroy'] == "on"
            img.destroy
            next
          end
          img.title = v['title'] if v['title'] != img.title
          ih = {nil=>nil, "on"=>1}
          img.prime = ih[v['prime']] if ih[v['prime']] != img.prime
          img.save
        end
      end
      begin
        @featured.tags = params["tags"].split(',').map{|t| Tag.find(t.to_i)}
        @featured.ping(Admin.filter(@featured.filter))
      rescue => e
        @error = e
        redirect url(:featureds, :edit, :id => @featured.id)
      end
      redirect url(:featureds, :edit, :id => @featured.id)
    else
      redirect url(:featureds, :edit, :id => @featured.id)
    end
  end

  get :export, :with => :id do
    featured = Featured.find(params['id'])
    stack = Admin.filter(featured.filter || "")
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
      p tags
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
    csv = CSV.parse params['featured']['file'][:tempfile].read.force_encoding('utf-8')
    header = csv.shift
    tags = header.dup

    csv.each do |row|
      row.each_with_index do |cell,index|
        if cell != '1' and cell != nil
          tags[index] = nil
        end
      end
    end
    
    tags.delete nil
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
      itags << ftag.id
    end
    p tags
    p ftags
    p itags

    name = UnicodeUtils::titlecase(params['featured']['file'][:filename].split('.')[0].gsub(/[-_]/,' '))

    csv.each do |row|
      next unless row[0]
      conflict = Conflict.find(row[0].to_i)
      features = JSON.parse(conflict.features || "{}")
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
    end
    header.delete 'id'
    header.delete 'name'
    features = header - tags
    feat.features = features.to_json
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
    feat.save
    redirect to "/featureds/edit/#{feat.id}"
  end

  delete :destroy, :with => :id do
    featured = Featured.find(params[:id])
    if featured.destroy
      flash[:notice] = 'Featured map was successfully destroyed.'
    else
      flash[:error] = 'Unable to destroy Featured map!'
    end
    redirect url(:featureds, :index)
  end

  post :getimage do
    puts params
    fid = params['image']['featured_id']
    f = Featured.find(fid)
    image = Image.new(params['image'])
    image.attachable = f
    image.prime = true if f.images.where(prime:1).empty?
    if image.save
      return {:file=>image.file.url,:thumb=>image.file.thumb.url,:n=>f.images.count,:title=>image.title}.to_json
    else
      return 'no'
    end
  end

end
