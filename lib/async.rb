class BackupDb < Struct.new :appname
  def args
    [""]
  end

  def method_name
    "backupdb"
  end

  def perform
    require 'open-uri'
    FileUtils.rmtree "#{PADRINO_ROOT}/tmp/backup" if File.directory? "#{PADRINO_ROOT}/tmp/backup"
    Dir.mkdir "#{PADRINO_ROOT}/tmp/backup" 
    puts "[#{Time.now}] heroku:backup started"
    puts `printf "yakup.cetinkaya@gmail.com\\naXu8aXo0" | heroku login`
    puts `heroku pgbackups:capture --expire --app ejatlas`
    ex = Backup.new
    bu = `heroku pgbackups:url --app ejatlas`
    File.open("#{PADRINO_ROOT}/tmp/backup/latest.dump","wb") {|f| f << open(bu).read }
    ex.file = File.open("#{PADRINO_ROOT}/tmp/backup/latest.dump","rb")
    if ex.save
      puts 'ja!'
      ex = nil
    else
      puts 'nein!'
    end
    FileUtils.rmtree "#{PADRINO_ROOT}/tmp/backup" if File.directory? "#{PADRINO_ROOT}/tmp/backup"
    puts "[#{Time.now}] heroku:backup complete"
  end
end

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
  #handle_asynchronously :csvexport

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
      Region.all.each {|c| countries << [c.jsonize,c.conflicts_count] if c.conflicts_count > 1; c.save}
      Country.where("region_id is null").all(:include=>:conflicts).each {|c| countries << [c.jsonize,c.conflicts.where(approval_status: 'approved').count] if c.conflicts.count > 1; c.save}
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
      docs.each do |d|
        doc = Document.find d
        fns = []
        doc.conflict.images.each {|i| fns << i.file.file.filename}
        if fns.include? doc.file.file.filename
          puts "\rimage already present: #{doc.file.file.filename}"
          next
        end
        img = Image.new
        img.remote_file_url = doc.file.file.url
        img.title = doc.title
        img.description = doc.description
        doc.conflict.images << img
        begin
          img.save!
        rescue
          puts "  problem saving image with url: \n#{doc.file.file.url}\n"
        end
        puts "#{img.title} (#{img.file.file.filename}) - #{img.attachable.name}"
      end
    end

    if params["conflicts"] == "on"
      puts "Updating conflicts..."
      Dir.mkdir "#{PADRINO_ROOT}/tmp"  unless File.directory? "#{PADRINO_ROOT}/tmp"
      FileUtils.rmtree "#{PADRINO_ROOT}/tmp/cache" if File.directory? "#{PADRINO_ROOT}/tmp/cache"
      Dir.mkdir "#{PADRINO_ROOT}/tmp/cache" 
      Conflict.find_in_batches(batch_size: 64) do |batch|
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
            open("#{PADRINO_ROOT}/tmp/cache/jsons.json","a") {|f| f.puts(c.json.to_json) }
          end
        end
      end
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
      ca.filterdata = filterdata.to_json
    end

    ca.save
    puts "Cache updated."
    GC.start

  end
  handle_asynchronously :setcache

  def parsevectors 
    require 'fog'
    s3 = Fog::Storage.new({
      :provider               => 'AWS',
      :aws_access_key_id      => 'AKIAJQV2IS77WH4CVNOQ',
      :aws_secret_access_key  => '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',
    })

    unless Country.where("iso_numeric is not null").any?
      require 'csv'
      iso = CSV.read "#{PADRINO_ROOT}/misc/iso_numeric.csv"
      missed = []
      iso.each do |i|
        if co = Country.find_by_slug(Admin.slugify(i[1]))
          co.iso_numeric = i[0]
          co.save
        end
      end
      puts "The following countries were not found: #{missed.join(', ')}"
    end

    unless VectorStyle.any?
      vstyles = {
        "borders"=> {
          "stroke_color"=> "#000000",
          "fill_color"=> "#FFFFFF",
          "stroke_opacity"=> 1,
          "fill_opacity"=> 0,
          "weight"=> 2,
          "dash_array"=> "5,5,1,5"
        },
        "pastures"=> {
          "stroke_color"=> "#000000",
          "fill_color"=> "#908030",
          "stroke_opacity"=> 1,
          "fill_opacity"=> 0.7,
          "weight"=> 2,
          "dash_array"=> "5,5"
        },
        "biodiversity"=> {
          "stroke_color"=> "#ffffff",
          "fill_color"=> "#66cc00",
          "stroke_opacity"=> 1,
          "fill_opacity"=> 0.7,
          "weight"=> 2,
        },
        "untouched"=> {
          "stroke_color"=> "#000000",
          "fill_color"=> "#106000",
          "stroke_opacity"=> 0,
          "fill_opacity"=> 0.7,
          "weight"=> 2,
        },
        "drought"=> {
          "stroke_color"=> "#000000",
          "fill_color"=> "#000030",
          "stroke_opacity"=> 1,
          "fill_opacity"=> 0.7,
          "weight"=> 5,
          "dash_array"=> ""
        },
        "indigenous"=> {
          "stroke_color"=> "#cc3300",
          "fill_color"=> "#ffcc00",
          "stroke_opacity"=> 1,
          "fill_opacity"=> 0.7,
          "weight"=> 5,
          "dash_array"=> "5,15"
        },
        "exploit"=> {
          "stroke_color"=> "#000000",
          "fill_color"=> "#000000",
          "stroke_opacity"=> 0,
          "fill_opacity"=> 1,
          "weight"=> 0,
        },
        "mines"=> {
          "fill_color"=> "#000000",
          "stroke_color"=> "#FFFFFF",
          "stroke_opacity"=> "0.4",
          "fill_opacity"=> "0.9",
          "weight"=>0
        },
        "dams"=> {
          "fill_color"=> "#006080",
          "stroke_color"=> "#FFFFFF",
          "stroke_opacity"=> "0.4",
          "fill_opacity"=> "0.9",
          "weight"=>1
        },
        "pipelines"=> {
          "stroke_color"=> "#503000",
          "stroke_opacity"=> "0.9",
          "weight"=>5,
        },
        "reactors"=> {
          "stroke_color"=> "#ffff00",
          "fill_color"=> "#000000",
          "stroke_opacity"=> "0.9",
          "fill_opacity"=> "0.9",
          "weight"=>3
        }
      }
      vstyles.each do |k,v|
        style = VectorStyle.new
        style.name = k
        v.each do |kk,vv|
          eval "style.#{kk} = '#{vv}'"
        end
        style.save
      end
    end

    styles = {
      ["Borders"] => "borders",
      ["Pasture", "Pasture Lands", "Pasture Lands Concentration", "Pasture Lands Concetration"] => "pastures",
      ["Biodiversity Hotspots", "Bws"] => "biodiversity",
      ["Pipelines", "Oil Pipelines"] => "pipelines",
      ["Reactors", "Nuclear Reactors"] => "reactors",
      ["Untouched Areas"] => "untouched",
      ["Dams"] => "dams",
      ["Mines"] => "mines",
      ["Afroamerican Communities Lands", "Indigenous Lands", "Municipalities With Indigenous Populations"] => "indigenous",
      ["High Vulnerability To Water Unavailability", "Water Scarce Areas"] => "drought",
      ["Land Overutilization", "Oil Exploration And Production Areas"] => "exploit",
    }

    hash = {}
    dir = s3.directories.get('eja-cnt')
    dir.files.each do |f|
      s = f.key.split('/')
      k = s[0]
      v = s[1]
      hash[k] = [] unless hash.has_key? k
      hash[k] << v
    end
    hash.each do |k,v|
      c = Country.find_slug(Admin.slugify(k))
      c = Region.find_slug(Admin.slugify(k)) unless c
      unless c
        cnts = k.split('_')
        cns = []
        ris = []
        cnts = ["south-africa","mozambique","zimbabwe"] if k == "South Africa_Mozambique_Zimbawe"
        cnts = ["united-states-of-america","canada"] if k == "USA_Canada"
        cnts = ["albania","bosnia-and-herzegovina","croatia","kosovo","macedonia-fyr","montenegro","serbia","slovak-republic"] if k == "Balkans"
        allfound = true
        cnts.each do |cnt|
          if ri = Country.find_slug(Admin.slugify(cnt))
            ris << ri
            cns << ri.name
          else
            allfound = false
          end
        end
        unless allfound
          puts "  Error: country #{k} not found"
          next
        end
        nam = cns[0..-2].join(', ')+" & "+cns[-1]
        nam = "Balkans" if k == "Balkans"
        c = Region.create :name => nam
        ris.each {|ri| c.countries << ri}
      end
      cn = c.name
      v.each do |vv|
        name = vv[4..-1].gsub('.js','').titlecase
        url = "https://s3.amazonaws.com/eja-cnt/#{cn}/#{vv}"
        if vd = VectorDatum.find_by_url(url)
          puts "#{name} datum already present for country #{k}"
        else
          vd = VectorDatum.new
          vd.name = name
          vd.url = url
          vd.attachable = c
          vd.save
        end
        styles.each do |s,vs|
          next unless s.include? name
          VectorStyle.find_by_name(vs).vector_data << vd
        end
        puts "#{name} datum created for country #{k}"
      end
    end
  end
  #handle_asynchronously :parsevectors

  def slugify str
    return str if str.nil?
    res = str
      .gsub(/[Çç]/,'c')
      .gsub(/[Ğğ]/,'g')
      .gsub(/[İı]/,'i')
      .gsub(/[Öö]/,'o')
      .gsub(/[Şş]/,'s')
      .gsub(/[Üü]/,'u')
      .downcase
      .strip
      .gsub(/[-_\s\/]+/, '-')
      .gsub(/[^\.\w-]/, '')
    return res
  end

  def vectorupload params, vd
    FileUtils.rmtree "#{PADRINO_ROOT}/tmp/vectorupload" if File.directory? "#{PADRINO_ROOT}/tmp/vectorupload"
    Dir.mkdir "#{PADRINO_ROOT}/tmp/vectorupload" 
    puts 'init vector upload job'
    require 'gdal-ruby/ogr'
    require 'csv'
    require 'open-uri'

    remote = params["source"]
    source = "#{PADRINO_ROOT}/tmp/vectorupload/#{params['filename'].gsub(/\s/,'_')}"
    File.open(source,"wb") {|f| f << open(remote).read }
    if ['kmz','shp'].include? params['type']
      Zip::ZipFile.open(source) do |zipfile|
        if params['type'] == 'shp'
          path = "#{source.gsub(/\.zip$/,'/').gsub(/\s/,'_')}"
          FileUtils.rmtree path if File.directory? path
          Dir.mkdir path 
        end
        zipfile.each do |c|
          if params['type'] == 'kmz'
            source = source.sub(/kmz$/,'kml')
            zipfile.extract c, source
            source = "#{PADRINO_ROOT}/tmp/vectorupload/#{params['filename'].sub(/kmz$/,'kml').gsub(/\s/,'_')}"
          else
            zipfile.extract c, path+c.name.gsub(/\s/,'_')
            if c.name[-4..-1] == '.shp'
              source = path+c.name.gsub(/\s/,'_')
            end
          end
        end
      end
    end
    varname = source.split('/')[-1]
    puts source

    limit = 1
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
    total.times do |i| 
      begin
        feat = layer.get_feature i
      rescue
        next
      end
      next unless feat
      hash = {'type'=>'Feature', 'pn'=>vd.name}
      geom = feat.get_geometry_ref
      next unless geom
      geom.flatten_to_2d
      json = geom.export_to_json
      hash['geometry'] = JSON.parse json
      feats.push hash
    end

    puts 'source data converted to json'

    output = {'type'=>'FeatureCollection', 'features'=>feats}
    geojson = output.to_json
    geojson.gsub!(/\\u([0-9a-z]{4})/) {|s| [$1.to_i(16)].pack("U")}
    jstr = 'var '+jsvar+' = '+geojson+"; "+"vectorPing"+"("+jsvar+");"
    tfile = slug.gsub(/\.(kml|shp)$/,".js")
    target = "#{PADRINO_ROOT}/tmp/vectorupload/#{tfile}"
    File.open(target,'w:UTF-8'){ |file| file.write(jstr) }

    puts 'target file created'

    puts target
    pat = GeoData.new
    pat.file = File.open(target,"r:UTF-8")
    if pat.save
      #puts target+' > '+layer.get_feature_count.to_i+' layers processed with '+tolerance.to_s+' tolerance, '+ ('%.2f' % (FileTest.size(target).to_f / 2**10) + 'K')+' total.'
      pat = nil
      puts 'target file uploaded to s3'
      vector_url = "https://s3.amazonaws.com/ejatlas/vector/#{tfile}"
      vd.url = vector_url
      if vd.save
        puts 'job completed successfully'
      else
        puts 'job failed'
      end
    else
      puts 'target file failed to be uploaded'
    end

    FileUtils.rmtree "#{PADRINO_ROOT}/tmp/vectorupload" if File.directory? "#{PADRINO_ROOT}/tmp/vectorupload"
  end
  handle_asynchronously :vectorupload

  def choropleth params, vd
    FileUtils.rmtree "#{PADRINO_ROOT}/tmp/choropleth" if File.directory? "#{PADRINO_ROOT}/tmp/choropleth"
    Dir.mkdir "#{PADRINO_ROOT}/tmp/choropleth" 
    puts 'init choropleth job'
    require 'gdal-ruby/ogr'
    require 'csv'
    require 'open-uri'

    remote = params["source"]
    source = "#{PADRINO_ROOT}/tmp/choropleth/#{params['geo']['filename'].gsub(/\s/,'_')}"
    File.open(source,"wb") {|f| f << open(remote).read }
    if ['kmz','shp'].include? params['geo']['type']
      Zip::ZipFile.open(source) do |zipfile|
        if params['geo']['type'] == 'shp'
          path = "#{source.gsub(/\.zip$/,'/').gsub(/\s/,'_')}"
          FileUtils.rmtree path if File.directory? path
          Dir.mkdir path 
        end
        zipfile.each do |c|
          if params['geo']['type'] == 'kmz'
            source = source.sub(/kmz$/,'kml')
            zipfile.extract c, source
            source = "#{PADRINO_ROOT}/tmp/choropleth/#{params['geo']['filename'].sub(/kmz$/,'kml').gsub(/\s/,'_')}"
          else
            zipfile.extract c, path+c.name.gsub(/\s/,'_')
            if c.name[-4..-1] == '.shp'
              source = path+c.name.gsub(/\s/,'_')
            end
          end
        end
      end
    end
    varname = source.split('/')[-1]
    if source.split('.')[-1] == "shp"
      ['shp','dbf','shx'].each do |ext|
        open("#{PADRINO_ROOT}/tmp/choropleth/source.#{ext}", 'wb') {|file| file << open("#{source.split('.')[0..-2].join('.')}.#{ext}").read}
      end
      source = "#{PADRINO_ROOT}/tmp/choropleth/source.shp"
    else
      open("#{PADRINO_ROOT}/tmp/choropleth/source.kml", 'wb') {|file| file << open(source).read}
      source = "#{PADRINO_ROOT}/tmp/choropleth/source.kml"
    end

    tolerance = params['geo']['tolerance'].to_f
    tolerance ||= 0.042

    limit = 1
    begin
      file = Gdal::Ogr.open source
      layer = file.get_layer 0
    rescue Exception => e
      puts "aman: #{e}"
      exit 2
    end
    slug = slugify varname.force_encoding('utf-8')
    jsvar = slug.split('.')[0].gsub(/\d/,'').gsub(/-+/,'_')

    puts 'source file parsed with ogr'

    feats = []
    total = layer.get_feature_count
    colname = params['headers']['name']
    colid = params['headers']['id']
    total.times do |i| 
      feat = layer.get_feature i
      next unless feat
      next unless params['data']['json'].has_key? "id#{feat.get_field(colid)}"
      hash = {'type'=>'Feature', 'properties'=>{'name'=>feat.get_field(colname).force_encoding('UTF-8'),'id'=>feat.get_field(colid),'value'=>params['data']['json']["id#{feat.get_field(colid)}"],'pn'=>vd.name}}
      geom = feat.get_geometry_ref
      geom.flatten_to_2d
      #geom = geom.simplify(tolerance)
      json = geom.export_to_json
      hash['geometry'] = JSON.parse json
      feats.push hash
    end

    puts 'source data converted to json'

    output = {'type'=>'FeatureCollection', 'features'=>feats}
    geojson = output.to_json
    geojson.gsub!(/\\u([0-9a-z]{4})/) {|s| [$1.to_i(16)].pack("U")}
    jstr = 'var '+jsvar+' = '+geojson+"; "+"choropleth"+"("+jsvar+");"
    tfile = slug.gsub(/\.(kml|shp)$/,".js")
    target = "#{PADRINO_ROOT}/tmp/choropleth/#{tfile}"
    File.open(target,'w:UTF-8'){ |file| file.write(jstr) }

    puts 'target file created'

    puts target
    pat = ChoroData.new
    pat.file = File.open(target,"r:UTF-8")
    if pat.save
      #puts target+' > '+layer.get_feature_count.to_i+' layers processed with '+tolerance.to_s+' tolerance, '+ ('%.2f' % (FileTest.size(target).to_f / 2**10) + 'K')+' total.'
      pat = nil
      puts 'target file uploaded to s3'
      vector_url = "https://s3.amazonaws.com/ejatlas/choropleth/#{tfile}"
      vd.url = vector_url
      vd.choropleth = params['legend']['json'].to_json
      if vd.save
        puts 'job completed successfully'
      else
        puts 'job failed'
      end
    else
      puts 'target file failed to be uploaded'
    end

    FileUtils.rmtree "#{PADRINO_ROOT}/tmp/choropleth" if File.directory? "#{PADRINO_ROOT}/tmp/choropleth"
  end
  handle_asynchronously :choropleth
end


