class AsyncTask
  def csvexport params
    limit = params.delete("limit").to_i
    order = params.delete("order")
    ascdsc = params.delete("ascdsc")
    stack = Conflict.order("#{order} #{ascdsc}").select{|c| params.keys.include? c.approval_status}
    if limit > 0
      stack = stack[0..(limit-1)]
    end
    #return stack.map(&:name).to_s
    mania = {Type=>[],Product=>[],ConflictEvent=>[],ConflictEvent=>[],MobilizingGroup=>[],MobilizingForm=>[]}
    imps = {EnvImpact=>[],HltImpact=>[],SecImpact=>[]}
    numfields = []
    lines = []
    header = []
    stack.each_with_index do |conf,index|
      nfields = 0
      line = []
      puts "#{conf.id} #{conf.name}"
      conf.attributes.each do |k,v|
        next if ["json","table","marker",'licence','ready','affected_min','affected_max'].include? k
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
        elsif k == "reaction_id"
          header << "When did the mobilization begin" if index == 0
          if v
            line << Reaction.find(v).name
          else
            line << ""
          end
        elsif k == "status_id"
          header << "Intensity of Conflict" if index == 0
          if v
            line << Status.find(v).name
          else
            line << ""
          end
        elsif k == "population_type"
          header << "Type of Population" if index == 0
          if v
            line << ['Unknown','Urban','Semi-urban','Rural'][v]
          else
            line << ""
          end
        elsif k == "accuracy_level"
          header << "Accuracy of location" if index == 0
          if v
            line << ['','LOW country/state level','MEDIUM regional level','HIGH local level'][v]
          else
            line << ""
          end
        else
          header << k.to_s.gsub("_"," ").titlecase if index == 0
          line << v.to_s
        end
        nfields += 1
      end
      mania.each do |many, val|
        va = [conf.id]
        header << "#{many.to_s}" if index == 0
        at = []
        many.order(:id).each do |m|
          if m.conflicts.include? conf
            at << m.name
            va << "1"
          else
            va << "0"
          end
        end
        val << va
        line << at.join(":::")
        nfields += 1
      end
      ['companies','supporters'].each do |rel|
        rels = eval("conf.#{rel}")
        header << rel.titlecase if index == 0
        lin = ""
        rels.each do |m|
          acr = m.acronym ? " [#{m.acronym}]" : ""
          cnt = m.country ? " (#{m.country.name})" : ""
          cm = eval("m.c_#{rel}.find_by_conflict_id(#{conf.id})")
          inv = cm.involvement ? ":#{cm.involvement}" : ""
          lin += "#{m.name}#{acr}#{cnt}#{inv}\n"
        end
        line << lin
        nfields += 1
      end
      imps.each do |imp,val|
        va = [conf.id]
        header << imp.to_s if index == 0
        at = []
        imp.order(:id).each do |m|
          if m.conflicts.include? conf
            cm = eval("m.c_#{imp.to_s.gsub('Impact','').downcase}_impacts.find_by_conflict_id(#{conf.id})")
            if cm.visible
              at << "#{m.name} (V)"
              va << "V"
            else
              at << "#{m.name} (P)"
              va << "P"
            end
          else
            va << ""
          end
        end
        val << va
        line << at.join(":::")
        nfields += 1
      end
      ['references','legislations','weblinks','medialinks'].each do |rel|
        #puts 
        rels = eval("conf.#{rel}")
        header << rel.titlecase if index == 0
        at = "#{rel.titlecase} "
        lin = ""
        rels.each do |m|
          dsc = m.description ? "#{m.description}\n" : ""
          url = m.url ? "#{m.url}\n" : ""
          at += "#{dsc}#{url}\n"
          lin += "#{dsc}#{url}\n"
        end
        #puts at
        line << lin
        nfields += 1
      end
      ['documents','images'].each do |rel|
        #puts 
        rels = eval("conf.#{rel}")
        header << rel.titlecase if index == 0
        at = "#{rel.titlecase} "
        lin = ""
        rels.each do |m|
          ttl = m.title ? "#{m.title}\n" : ""
          dsc = m.description ? "#{m.description}\n" : ""
          url = m.file.url ? "#{m.file.url}\n" : ""
          at += "#{ttl}#{dsc}#{url}\n"
          lin += "#{ttl}#{dsc}#{url}\n"
        end
        #puts at
        line << lin
        nfields += 1
      end
      numfields << nfields
      lines << line
      #puts
    end
    p numfields
    CSV.open('tmp/cases.csv',"w") do |output|
      output << header
      lines.each do |line|
        output << line
      end
    end
    tata = Time.now
    csvs = ["ejatlas-export-#{tata.strftime('%Y-%m-%d-%H%M')}/cases.csv"]
    mania.each do |many,lines|
      header = ["id"]
      many.order(:id).each {|h| header << h.name}
      CSV.open("tmp/#{many.to_s.downcase}.csv","w") do |output|
        output << header
        lines.each do |line|
          output << line
        end
      end
      csvs << "ejatlas-export-#{tata.strftime('%Y-%m-%d-%H%M')}/#{many.to_s.downcase}.csv"
    end
    imps.each do |many,lines|
      header = ["id"]
      many.order(:id).each {|h| header << h.name}
      CSV.open("tmp/#{many.to_s.downcase}.csv","w") do |output|
        output << header
        lines.each do |line|
          output << line
        end
      end
      csvs << "ejatlas-export-#{tata.strftime('%Y-%m-%d-%H%M')}/#{many.to_s.downcase}.csv"
    end
    Zip::ZipOutputStream.open("tmp/ejatlas-export-#{tata.strftime('%Y-%m-%d-%H%M')}.zip") do |zio|
      csvs.each do |c|
        zio.put_next_entry(c)
        zio.write File.read("tmp/#{c.split('/')[-1]}")
      end
    end
    ex = Export.new
    ex.file = File.open("tmp/ejatlas-export-#{tata.strftime('%Y-%m-%d-%H%M')}.zip","rb")
    if ex.save
      ex = nil
    else
      puts 'nein!'
    end
  end
  handle_asynchronously :csvexport

  def setcache params
    unless ca = Cached.first
      ca = Cached.new
      #cachestamp = ca.created_at
      #else
      #cachestamp = ca.updated_at
    end

    if params["countries"] == "on"
      countries = []
      puts "Updating countries..."
      #Region.all.each {|c| countries << [c.jsonize,c.conflicts_count] if c.conflicts_count > 1; c.save}
      Country.all(:include=>:conflicts).each {|c| countries << [c.jsonize,c.conflicts.where(approval_status: 'approved').count] if c.conflicts.count > 1; c.save}
      countries.sort_by! {|c| c[1]}
      countries.reverse!
      ca.countries = countries.to_json
    end

    if params["companies"] == "on"
      companies = []
      puts "Updating companies..."
      Company.all(:include=>:conflicts).each {|c| companies << [c.jsonize,c.conflicts.where(approval_status: 'approved').count] if c.conflicts.where(approval_status: 'approved').count > 1; c.save}
      companies.sort_by! {|c| c[1]}
      companies.reverse!
      ca.companies = companies.to_json
    end

    if params["ifis"] == "on"
      supporters = []
      puts "Updating IFI's..."
      Supporter.all(:include=>:conflicts).each {|c| supporters << [c.jsonize,c.conflicts.where(approval_status: 'approved').count] if c.conflicts.where(approval_status: 'approved').count > 1; c.save}
      supporters.sort_by! {|c| c[1]}
      supporters.reverse!
      ca.supporters = supporters.to_json
    end

    if params["commodities"] == "on"
      commodities = []
      puts "Updating commodities..."
      Product.all(:include=>:conflicts).each {|c| commodities << [c.jsonize,c.conflicts.where(approval_status: 'approved').count] if c.conflicts.where(approval_status: 'approved').count > 1 and c.name != "Other"; c.save}
      commodities.sort_by! {|c| c[1]}
      commodities.reverse!
      ca.commodities = commodities.to_json
    end

    if params["categories"] == "on"
      types = []
      puts "Updating categories..."
      Type.all(:include=>:conflicts).each {|c| types << [c.jsonize,c.conflicts.where(approval_status: 'approved').count] if c.conflicts.where(approval_status: 'approved').count > 1 and c.name != "Other"; c.save}
      types.sort_by! {|c| c[1]}
      types.reverse!
      ca.types = types.to_json
    end

    if params["featureds"] == "on"
      #types = []
      puts "Updating featureds..."
      fids = Featured.all.map &:id
      Conflict.where('features is not null').each do |c|
        f = JSON.parse(c.features)
        f.each do |k,v|
          id = k.split(':')[0]
          next if id != id.to_i.to_s
          unless fids.include? id.to_i
            f.delete k
          end
        end
        c.features = f.to_json
        c.save
      end
      puts 'featureds now'
      Featured.all.each do |featured|
        #features = JSON.parse(featured.features || '{}')
        if confs = Admin.filter(featured.filter)
          confs.sort!{|a,b|a.slug<=>b.slug}
          featured.ping(confs)
        else
          featured.ping([])
        end
      end
    end

    if params["images"] == "on"
      puts "Updating images..."
      docs = []
      ext = ["jpg", "bmp", "png", "jpeg", "gif"]
      Document.all.each do |doc|
        if ext.include? doc.file.file.filename.split('.')[-1].downcase
          docs << doc.id
        end
      end
      puts "Found #{docs.length} images to update..."
      iids = []
      docs.each do |d|
        doc = Document.find d
        fns = []
        doc.conflict.images.each {|i| fns << i.file.file.filename}
        if fns.include? doc.file.file.filename
          #puts "\rimage already present: #{doc.file.file.filename}"
          next
        end
        img = Image.new
        img.remote_file_url = doc.file.file.url
        img.title = doc.title
        img.description = doc.description
        doc.conflict.images << img
        begin
          img.save!
          puts "\r#{img.title} (#{img.file.file.filename}) - #{img.attachable.name}"
        rescue => e
          #puts "  problem saving image with url: \n#{doc.file.file.url}\n"
          #p e
          puts doc.file.file.url
        end
      end
    end

    if params["conflicts"] == "on"
      puts "Updating conflicts..."
      Dir.mkdir "#{PADRINO_ROOT}/tmp"  unless File.directory? "#{PADRINO_ROOT}/tmp"
      FileUtils.rmtree "#{PADRINO_ROOT}/tmp/cache" if File.directory? "#{PADRINO_ROOT}/tmp/cache"
      Dir.mkdir "#{PADRINO_ROOT}/tmp/cache" 
      total = Conflict.count / 64.0
      counter = 0
      Conflict.find_in_batches(batch_size: 64) do |batch|
        print "\r #{(counter/total*100).to_i}% done."
        counter += 1
        batch.each do |c|
          if c.related_conflict_id.nil? and rc = Conflict.find_by_slug(Admin.slugify(c.related_conflict_string))
            c.related_conflict_id = rc.id
            c.ping
            c.save
          else
            c.ping
            c.save
          end
          if c.approval_status == "approved"
            open("#{PADRINO_ROOT}/tmp/cache/markers.json","a") {|f| f.puts(c.marker.to_json) }
            open("#{PADRINO_ROOT}/tmp/cache/jsons.json","a") {|f| f.puts (c.json.to_json) }
          end
        end
      end
      print "\rDone.         "
      puts
      ca.conflicts_marker = "["+File.read("#{PADRINO_ROOT}/tmp/cache/markers.json").gsub("\n",",")+"]"
      ca.conflicts_json = "["+File.read("#{PADRINO_ROOT}/tmp/cache/jsons.json").gsub("\n",",")+"]"
    end

    if params["filter"] == "on"
      puts "Updating filter..."
      filterdata = {}
      filterdata[:cntry] = Country.order(:name).select('name, id')
      filterdata[:comp] = Company.order(:name).select('name, id')
      filterdata[:success] = ['Success', 'Not sure', 'Failure']
      filterdata[:poptype] = ['Unknown','Urban','Semi-urban','Rural']
      filterdata[:category] = Category.order(:name).select('name, id')
      filterdata[:type] = Type.order(:name).select('name, id')
      filterdata[:intensity] = Status.order(:name).select('name, id')
      filterdata[:envi] = EnvImpact.order(:name).select('name, id')
      filterdata[:hlti] = HltImpact.order(:name).select('name, id')
      filterdata[:seci] = SecImpact.order(:name).select('name, id')
      filterdata[:mobgroup] =  MobilizingGroup.order(:name).select('name, id')
      filterdata[:mobform] =  MobilizingForm.order(:name).select('name, id')
      filterdata[:product] =  Product.order(:name).select('name, id')
      filterdata[:pstatus] =  ProjectStatus.order(:name).select('name, id')
      filterdata[:stage] =  Reaction.order(:name).select('name, id')
      filterdata[:outcome] =  ConflictEvent.order(:name).select('name, id')
      filterdata[:tag] =  Tag.order(:name).select('name, id')
      ca.filterdata = filterdata.to_json
    end

    ca.save
    puts "Cache updated."
    GC.start

  end
  handle_asynchronously :setcache


  def slugify str
    return str if str.nil?
    res = str.to_ascii
      .downcase
      .strip
      .gsub(/[-_\s\/]+/, '-')
      .gsub(/[^\w-\.]/, '')
      .gsub(/-+/,'-')
    return res
  end

  def vectorupload params, vd, precision
    puts "init vector upload job at #{Time.now}"
    require 'gdal-ruby/ogr'
    require 'csv'
    require 'open-uri'

    source = params['source']
    extension = source.gsub(/\?.*$/,"").gsub(/^.+\./,"").downcase
    if ['kmz','zip'].include? extension
      Zip::ZipFile.open(source) do |zipfile|
        if extension == 'zip'
          path = "#{source.gsub(/\.zip$/,'/').gsub(/\s/,'_')}"
          Dir.mkdir path unless File.directory? path
        end
        zipfile.each do |c|
          if extension == 'kmz'
            source = source.sub(/kmz$/,'kml')
            zipfile.extract c, source unless File.file? source
            source = "/tmp/vectorupload/#{params['filename'].sub(/kmz$/,'kml').gsub(/\s/,'_')}"
          else
            zipfile.extract c, path+c.name.gsub(/\s/,'_') unless File.file? path+c.name.gsub(/\s/,'_')
            if c.name[-4..-1] == '.shp'
              source = path+c.name.gsub(/\s/,'_')
            end
          end
        end
      end
    end
    varname = source.split('/')[-1]

    begin
      file = Gdal::Ogr.open source
      layer = file.get_layer 0
    rescue Exception => e
      puts "VectorUpload Error: #{e}"
      exit 2
    end

    slug = slugify varname.force_encoding('utf-8')
    jsvar = slug.split('.')[0].gsub(/\d/,'').gsub(/-+/,'_')

    puts 'source file parsed with ogr'

    feats = []
    total = layer.get_feature_count
    puts "#{total} features found"
    total.times do |i| 
      begin
        feat = layer.get_feature i
      rescue Exception => e
        puts "Error in feature: #{e}"
        next
      end
      next unless feat
      geom = feat.get_geometry_ref
      next unless geom
      geom.flatten_to_2d
      begin
        id = feat.get_field("feature_id").to_i.to_s
      rescue
        id = nil
      end
      if params['stat_json'] and id
        cat = params['stat_json'][id].delete("category") if params['stat_json'].has_key? id
        if precision > 0
          hash = {'type'=>'Feature', 'properties'=>{'id'=>id,'pn'=>vd.name,'data'=>params['stat_json'][id]},'geometry'=>JSON.parse(geom.export_to_json.gsub(/\d+\.\d+/) {|x|x.match(/\d+\.\d{#{[precision,x.split('.')[1].length].min}}/)}.gsub(/\s/,''))}
        else
          hash = {'type'=>'Feature', 'properties'=>{'id'=>id,'pn'=>vd.name,'data'=>params['stat_json'][id]},'geometry'=>JSON.parse(geom.export_to_json)}
        end
        hash["properties"]["category"] = cat if cat
      else
        if precision > 0
          hash = {'type'=>'Feature', 'properties'=>{'pn'=>vd.name},'geometry'=>JSON.parse(geom.export_to_json.gsub(/\d+\.\d+/) {|x|x.match(/\d+\.\d{#{[precision,x.split('.')[1].length].min}}/)}.gsub(/\s/,''))}
        else
          hash = {'type'=>'Feature', 'properties'=>{'pn'=>vd.name},'geometry'=>JSON.parse(geom.export_to_json)}
        end
      end
      feats << hash
    end

    puts 'source data converted to json'

    output = {'type'=>'FeatureCollection', 'features'=>feats}
    geojson = output.to_json
    geojson.gsub!(/\\u([0-9a-z]{4})/) {|s| [$1.to_i(16)].pack("U")}
    jstr = 'var '+jsvar+' = '+geojson+"; "+"vectorPing"+"("+jsvar+");"
    tfile = slug.gsub(/kml$/,"js").gsub(/shp$/,"js").gsub(/zip$/,"js")
    puts slug
    puts tfile
    target = "/tmp/vectorupload/#{tfile}"
    File.open(target,'w:UTF-8'){ |file| file.write(jstr) }

    puts "target file created at #{target}"

    pat = GeoData.new
    pat.folder = "#{vd.attachable_type.downcase}/#{vd.attachable.old_slug}"
    pat.file = File.open(target,"r:UTF-8")
    begin
      if pat.save
        puts "#{target}: #{feats.length} of #{total} layers processed, #{('%.2f' % (FileTest.size(target).to_f / 2**10) + 'K')} total."
        puts 'target file stored at file.ejatlas.org'
        vector_url = "https://file.ejatlas.org/vector/#{pat.folder}/#{tfile}"
        pat = nil
        vd.url = vector_url
        vd.choropleth = params['legend_json'].to_json if params['legend_json']
        if vd.save
          puts "job completed successfully at #{Time.now}"
        else
          puts "job failed at #{Time.now}"
        end
      else
        puts "target file failed to upload at #{Time.now}"
      end
    rescue Exception => e
      puts "File could not be uploaded: #{e}"
    end
  end
  handle_asynchronously :vectorupload
end

