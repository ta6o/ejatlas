Admin.controllers :vectors do

  before do
    redirect to "/sessions/login" unless current_account
    redirect back unless ["admin","editor"].include? current_account.role
    @name = "Vectors"
  end

  get :index do
    @vectors = VectorDatum.select("id, name, description, url, attachable_type, attachable_id, vector_style_id")
    @defs = VectorStyle.where("defs is not null").select("defs").map {|s| JSON.parse(s.defs)}
    render 'vector_data/index'
  end

  get :styles do
    @name = "Vector styles"
    @styles = VectorStyle.all
    @defs = VectorStyle.where("defs is not null").select("defs").map {|s| JSON.parse(s.defs)}
    render 'vector_data/styles'
  end

  get :new do
    @vector = VectorDatum.new
    @countries = Country.order(:slug).select('id,name').map{|c| "<option value=#{c.id}>#{c.name}</option>"}.join().html_safe
    @featureds = Featured.order(:slug).select('id,name').map{|c| "<option value=#{c.id}>#{c.name}</option>"}.join().html_safe
    @styles = VectorStyle.all :order => :name
    render 'vector_data/new'
  end

  post :create do
    params['vector_datum']['name'] = UnicodeUtils.titlecase(params['vector_datum']['name'])
    @vector = VectorDatum.new(params[:vector_datum])
    if @vector.save
      flash[:notice] = 'vector was successfully created.'
      redirect url(:vectors, :edit, :id => @vector.id)
    else
      render 'vector_data/new'
    end
  end

  get :edit, :with => :id do
    @vector = VectorDatum.find(params[:id])
    @countries = Country.order(:slug).select('id,name').map{|c| "<option value=#{c.id}>#{c.name}</option>"}.join().html_safe
    @featureds = Featured.order(:slug).select('id,name').map{|c| "<option value=#{c.id}>#{c.name}</option>"}.join().html_safe
    @styles = VectorStyle.all :order => :name
    render 'vector_data/edit'
  end

  get :delete, :with => :id do
    vector = VectorDatum.find(params[:id])
    vector.destroy
    redirect to "/vectors/"
  end

  put :update, :with => :id do
    puts params
    params['vector_datum']['name'] = UnicodeUtils.titlecase(params['vector_datum']['name'])
    @vector = VectorDatum.find(params[:id])
    if @vector.update_attributes(params[:vector_datum])
      if params['vector']['file'] and params['vector']['type']
        Admin.vectorupload params['vector'], @vector
      end
      flash[:notice] = 'vector was successfully updated.'
      redirect url(:vectors, :edit, :id => @vector.id)
    else
      render 'vector_data/edit'
    end
  end

  get :newstyle do
    @name = "Vector styles"
    @style = VectorStyle.new
    render 'vector_data/newstyle'
  end

  post :createstyle do
    @name = "Vector styles"
    if params["pattern"].length > 0
      pattern = params['pattern'].split('-')
      params['style']['fill_opacity'] = pattern[2]
      pattern[4] = [pattern[4].to_i,pattern[2].to_i].min.to_s
      alp = ((pattern[4].to_i/100.0) / (pattern[2].to_i/100.0))
      alpha = (Magick::MaxRGB * (1-alp)).to_i
      plain = Magick::Image.read("#{PADRINO_ROOT}/public/img/canvas.png").first
      canvas = plain.colorize(1,1,1,0,"##{pattern[3]}")
      canvas.alpha(Magick::ActivateAlphaChannel)
      canvas.opacity = alpha
      img = Magick::Image.read("#{PADRINO_ROOT}/public/img/#{pattern[0]}.png").first
      mod = img.colorize(1,1,1,0,"##{pattern[1]}")
      pattern.delete_at(2)
      pattern[-1] = (alp * 255).to_i.to_s(16).rjust(2, '0')
      params['style']['fill_color'] = "url('##{pattern.join('')}')"
      params['style']['defs'] = {:filename => pattern.join(''), :scale => params['scale']}.to_json
      tempfile = "tmp/#{pattern.join('')}.png"
      canvas.composite!(mod, 0, 0, Magick::OverCompositeOp)
      canvas.write tempfile
      pat = Pattern.new
      pat.file = File.open(tempfile,"rb")
      if pat.save
        pat = nil
      else
        puts 'nein!'
      end
    end
    params['style']['fill_opacity'] = (params['style']['fill_opacity'].to_i / 100.0).to_s
    params['style']['stroke_opacity'] = (params['style']['stroke_opacity'].to_i / 100.0).to_s
    if params['style']['name'] == 'borders' or params['style']['fill_opacity'] == "0"
      params['style']['fill_color'] = 'none'
    end
    @style = VectorStyle.new(params[:style])
    if @style.save
      flash[:notice] = 'style was successfully created.'
      redirect url(:vectors, :editstyle, :id => @style.id)
    else
      render 'vector_data/newstyle'
    end
  end

  get :editstyle, :with => :id do
    @name = "Vector styles"
    @style = VectorStyle.find(params[:id])
    puts @style.attributes
    render 'vector_data/editstyle'
  end

  get :deletestyle, :with => :id do
    style = VectorStyle.find(params[:id])
    style.destroy
    redirect to "/vectors/styles"
  end

  put :updatestyle, :with => :id do
    puts params
    @name = "Vector styles"
    @style = VectorStyle.find(params[:id])
    if params["pattern"].length > 0
      pattern = params['pattern'].split('-')
      params['style']['fill_opacity'] = pattern[2]
      pattern[4] = [pattern[4].to_i,pattern[2].to_i].min.to_s
      pattern[2] = '1' if pattern[2] == '0'
      alp = ((pattern[4].to_i/100.0) / (pattern[2].to_i/100.0))
      alpha = (Magick::MaxRGB * (1-alp)).to_i
      plain = Magick::Image.read("#{PADRINO_ROOT}/public/img/canvas.png").first
      canvas = plain.colorize(1,1,1,0,"##{pattern[3]}")
      canvas.alpha(Magick::ActivateAlphaChannel)
      canvas.opacity = alpha
      img = Magick::Image.read("#{PADRINO_ROOT}/public/img/#{pattern[0]}.png").first
      mod = img.colorize(1,1,1,0,"##{pattern[1]}")
      pattern.delete_at(2)
      pattern[-1] = (alp * 255).to_i.to_s(16).rjust(2, '0')
      params['style']['fill_color'] = "url('##{pattern.join('')}')"
      params['style']['defs'] = {:filename => pattern.join(''), :scale => params['scale']}.to_json
      tempfile = "tmp/#{pattern.join('')}.png"
      canvas.composite!(mod, 0, 0, Magick::OverCompositeOp)
      canvas.write tempfile
      pat = Pattern.new
      pat.file = File.open(tempfile,"rb")
      if pat.save
        pat = nil
      else
        puts 'nein!'
      end
    end
    params['style']['fill_opacity'] = (params['style']['fill_opacity'].to_i / 100.0).to_s
    params['style']['stroke_opacity'] = (params['style']['stroke_opacity'].to_i / 100.0).to_s
    if params['style']['name'] == 'borders' or params['style']['fill_opacity'] == "0"
      params['style']['fill_color'] = 'none'
    end
    if @style.update_attributes(params['style'])
      @style.vector_data.each {|v| v.save!}
      flash[:notice] = 'vector was successfully updated.'
      redirect url(:vectors, :editstyle, :id => @style.id)
    else
      render 'vector_data/editstyle'
    end
  end

  delete :destroy, :with => :id do
    vector = VectorDatum.find(params[:id])
    if vector.destroy
      flash[:notice] = 'Vector was successfully destroyed.'
    else
      flash[:error] = 'Unable to destroy Vector!'
    end
    redirect url(:vectors, :index)
  end

  def self.vectorupload params, vd
    puts params['file'].class

    FileUtils.rmtree "#{PADRINO_ROOT}/tmp/vectorupload" if File.directory? "#{PADRINO_ROOT}/tmp/vectorupload"
    Dir.mkdir "#{PADRINO_ROOT}/tmp/vectorupload" 
    source = "#{PADRINO_ROOT}/tmp/vectorupload/#{params['file'][:filename].gsub(/\s/,'_')}"
    File.open(source,"wb") {|f| f << params['file'][:tempfile].read }
    pat = TmpData.new
    pat.file = File.open(source,'r')
    puts params['file'][:filename]
    if pat.save
      pat = nil
      puts '  S3 file uploaded'
      source = "https://s3.amazonaws.com/ejatlas/tmp/#{params['file'][:filename].gsub(/\s/,'_')}"
    else
      puts '  S3 file upload failed'
      return 0
    end
    puts source
    FileUtils.rmtree "#{PADRINO_ROOT}/tmp/vectorupload" if File.directory? "#{PADRINO_ROOT}/tmp/vectorupload"

    params["filename"] = params["file"][:filename]

    seps = {"comma"=>",","tab"=>"\t"}
    puts 'vectorupload info parsing started'

    params.delete "file"
    params["source"] = source

    AsyncTask.new.vectorupload params, vd
    return 'ok'
  end

  post :choropleth do
    puts 'choro!'

    FileUtils.rmtree "#{PADRINO_ROOT}/tmp/choropleth" if File.directory? "#{PADRINO_ROOT}/tmp/choropleth"
    Dir.mkdir "#{PADRINO_ROOT}/tmp/choropleth" 
    source = "#{PADRINO_ROOT}/tmp/choropleth/#{params['geo']['file'][:filename].gsub(/\s/,'_')}"
    File.open(source,"wb") {|f| f << params['geo']['file'][:tempfile].read }
    pat = TmpData.new
    pat.file = File.open(source,'r')
    puts params['geo']['file'][:filename]
    if pat.save
      pat = nil
      puts '  S3 file uploaded'
      source = "https://s3.amazonaws.com/ejatlas/tmp/#{params['geo']['file'][:filename].gsub(/\s/,'_')}"
    else
      puts '  S3 file upload failed'
      return 0
    end
    puts source
    FileUtils.rmtree "#{PADRINO_ROOT}/tmp/choropleth" if File.directory? "#{PADRINO_ROOT}/tmp/choropleth"

    params["geo"]["filename"] = params["geo"]["file"][:filename]

    seps = {"comma"=>",","tab"=>"\t"}
    datasep = seps[params['data']['type']]
    colorsep = seps[params['legend']['type']]
    puts 'choropleth info parsing started'

    datafile = File.read(params['data']['file'][:tempfile])
    data = CSV.parse(datafile, :row_sep => :auto, :col_sep => datasep, encoding: "utf-8")
    dataheader = data.shift
    puts 'data layer read'

    colorfile = File.read(params['legend']['file'][:tempfile])
    color = CSV.parse(colorfile, :row_sep => :auto, :col_sep => colorsep, encoding: "utf-8")
    colorheader = color.shift
    puts 'color layer read'

    datajson = {}
    dataval = dataheader.index(params['headers']['value'])
    dataid = dataheader.index(params['headers']['id'])
    data.each do |d|
      datajson["id#{d[dataid]}"] = d[dataval]
    end

    colorjson = {}
    colorval = colorheader.index(params['headers']['value'])
    colornam = colorheader.index(params['headers']['desc'])
    colorhex = colorheader.index(params['headers']['color'])
    color.each do |d|
      colorjson[d[colorval]] = {"hex"=>d[colorhex], "text"=>d[colornam]}
    end

    params["geo"].delete "file"
    params["data"].delete "file"
    params["legend"].delete "file"
    params["source"] = source

    if false
      params.each do |k,v|
        puts k
        if v.is_a? Hash
          v.each do |kk,vv|
            puts "  #{kk}: #{vv}"
          end
        else
          puts "  #{v}"
        end
      end
    end

    params['data']['json'] = datajson
    params['legend']['json'] = colorjson

    AsyncTask.new.choropleth params, VectorDatum.find(params['choropleth']['vector_data_id'])
    return 'ok'
  end

end
