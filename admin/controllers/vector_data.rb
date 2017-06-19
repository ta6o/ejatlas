Admin.controllers :vectors do

  before do
    redirect to "/sessions/login?return=#{request.path.sub(/^\//,'')}" unless current_account
    @name = "Vectors"
  end

  get :index do
    if current_account and ["admin","editor"].include?(current_account.role)
      @vectors = VectorDatum.select("id, name, description, url, attachable_type, attachable_id, vector_style_id")
    elsif current_account
      @vectors = current_account.vector_data.select("id, name, description, url, attachable_type, attachable_id, vector_style_id")
    end
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
    if current_account and ["admin","editor"].include?(current_account.role)
      @countries = Country.order(:slug).select('id,name').map{|c| "<option value=#{c.id}>#{c.name}</option>"}.join().html_safe
      @featureds = Featured.order(:slug).select('id,name').map{|c| "<option value=#{c.id}>#{c.name}</option>"}.join().html_safe
      @styles = VectorStyle.all.order :name
    else
      @countries = []
      @featureds = current_account.featureds.order(:slug).select('id,name').map{|c| "<option value=#{c.id}>#{c.name}</option>"}.join().html_safe
      @styles = VectorStyle.all.order :name
    end
    render 'vector_data/new'
  end

  post :create do
    params['vector_datum']['name'] = UnicodeUtils.titlecase(params['vector_datum']['name'])
    params['vector_datum']['account_id'] = current_account.id
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
    pass unless @vector.account == current_account or ["admin","editor"].include?(current_account.role)
    if current_account and ["admin","editor"].include?(current_account.role)
      @countries = Country.order(:slug).select('id,name').map{|c| "<option value=#{c.id}>#{c.name}</option>"}.join().html_safe
      @featureds = Featured.order(:slug).select('id,name').map{|c| "<option value=#{c.id}>#{c.name}</option>"}.join().html_safe
      @styles = VectorStyle.all.order :name
    else
      @countries = []
      @featureds = current_account.featureds.order(:slug).select('id,name').map{|c| "<option value=#{c.id}>#{c.name}</option>"}.join().html_safe
      @styles = VectorStyle.all.order :name
    end
    render 'vector_data/edit'
  end

  get :delete, :with => :id do
    vector = VectorDatum.find(params[:id])
    vector.destroy
    redirect to "/vectors/"
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
      alpha = (Magick::QuantumRange * (1-alp)).to_i
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
        #puts 'nein!'
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
    #puts @style.attributes
    render 'vector_data/editstyle'
  end

  get :deletestyle, :with => :id do
    style = VectorStyle.find(params[:id])
    style.destroy
    redirect to "/vectors/styles"
  end

  put :updatestyle, :with => :id do
    @name = "Vector styles"
    @style = VectorStyle.find(params[:id])
    if params["pattern"].length > 0
      pattern = params['pattern'].split('-')
      params['style']['fill_opacity'] = pattern[2]
      pattern[4] = [pattern[4].to_i,pattern[2].to_i].min.to_s
      pattern[2] = '1' if pattern[2] == '0'
      alp = ((pattern[4].to_i/100.0) / (pattern[2].to_i/100.0))
      alpha = (Magick::QuantumRange * (1-alp)).to_i
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
        #puts 'nein!'
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

  put :update, :with => :id do
    params['vector_datum']['name'] = UnicodeUtils.titlecase(params['vector_datum']['name'])
    @vector = VectorDatum.find(params[:id])
    pp params
    if @vector.update_attributes(params[:vector_datum])
      if params['vector'] and params['vector']['file']
        result = Admin.vectorupload params['vector'], @vector, params['precision']
        if result == "ok"
          redirect to '/jobs' 
        elsif result[:status] == "error"
          @error = result[:error]
          #puts "erron: #{@error}"
          return render 'vector_data/edit'
        end
      end
      redirect url(:vectors, :edit, :id => @vector.id)
    else
      redirect url(:vectors, :edit, :id => @vector.id)
    end
  end

  def self.vectorupload params, vd, precision
    Dir.mkdir "/tmp/vectorupload" unless File.directory? "/tmp/vectorupload"

    source = "/tmp/vectorupload/#{params['file'][:filename].gsub(/\s/,'_')}"
    File.open(source,"wb") {|f| f << params['file'][:tempfile].read }
    params["filename"] = params["file"][:filename]
    params.delete "file"
    params["source"] = source

    if params['stat_file']
      stat_source = "/tmp/vectorupload/#{params['stat_file'][:filename].gsub(/\s/,'_')}"
      File.open(stat_source,"wb") {|f| f << params['stat_file'][:tempfile].read }
      params.delete "stat_file"
      params["stat_source"] = stat_source

      errors = []
      begin
        begin
          stat = CSV.read(stat_source, :row_sep => :auto, :col_sep => ",", encoding: "utf-8")
        rescue Exception => e
          #puts "CSV file not comma-separated, trying with tabs: #{e}"
          errors << "#{stat_source.split('/')[-1]} not comma-separated, trying with tabs: &nbsp; <strong>#{e}</strong>"
          stat = CSV.read(stat_source, :row_sep => :auto, :col_sep => "\t", encoding: "utf-8")
        end
      rescue Exception => e
        #puts "CSV file could not be parsed: #{e}"
        errors << "#{stat_source.split('/')[-1]} could not be parsed: &nbsp; <strong>#{e}</strong>"
      end

      return {:status=>"error", :error=>errors.join("<br />")} unless stat
      stat = CSV.read(stat_source, :row_sep => :auto, :col_sep => "\t", encoding: "utf-8") if stat[0].length == 1
      statjson = {}
      begin
        statheader = stat.shift.map {|h| h.downcase.strip.gsub(/[ _-]+/,'_').gsub(/_id$/,'')}
      rescue Exception => e
        #puts "CSV file header error: #{e}"
        errors << "#{stat_source.split('/')[-1]} header error: &nbsp; <strong>#{e}</strong>"
        return {:status=>"error", :error=>errors.join("<br />")}
      end
      statid = statheader.index("feature")
      return {:status=>"error", :error=>"#{stat_source.split('/')[-1]} does not contain required column <strong>feature_id</strong>."} unless statid

      stat.each do |l|
        unless l[statid]
          #puts "error: id column not found in line: [#{l.join(', ')}]"
        end
        statjson[l[statid]] = {}
        l.each_with_index do |c,i|
          next if i == statid
          statjson[l[statid]][statheader[i]] = c
        end
      end

      params['stat_json'] = statjson
      #puts 'Data layer read'
    end

    if params['legend_file']
      legend_source = "/tmp/vectorupload/#{params['legend_file'][:filename].gsub(/\s/,'_')}"
      File.open(legend_source,"wb") {|f| f << params['legend_file'][:tempfile].read }
      params["legend_filename"] = params["legend_file"][:filename]
      params.delete "legend_file"
      params["legend_source"] = legend_source

      errors = []
      begin
        begin
          legend = CSV.read(legend_source, :row_sep => :auto, :col_sep => ",", encoding: "utf-8")
        rescue Exception => e
          #puts "CSV file not comma-separated, trying with tabs: #{e}"
          errors << "#{legend_source.split('/')[-1]} not comma-separated, trying with tabs: &nbsp; <strong>#{e}</strong>"
          legend = CSV.read(legend_source, :row_sep => :auto, :col_sep => "\t", encoding: "utf-8")
        end
      rescue Exception => e
        #puts "CSV file could not be parsed: #{e}"
        errors << "#{legend_source.split('/')[-1]} could not be parsed: &nbsp; <strong>#{e}</strong>"
      end

      return {:status=>"error", :error=>errors.join("<br />")} unless legend
      legend = CSV.read(legend_source, :row_sep => :auto, :col_sep => "\t", encoding: "utf-8") if legend[0].length == 1
      legendjson = {}
      begin
        legendheader = legend.shift.map {|h| h.downcase.strip.gsub(/[ _-]+/,'_').gsub(/_id$/,'')}
      rescue Exception => e
        #puts "CSV file header error: #{e}"
        errors << "#{legend_source.split('/')[-1]} header error: &nbsp; <strong>#{e}</strong>"
        return {:status=>"error", :error=>errors.join("<br />")}
      end
      legendid = legendheader.index("category")
      return {:status=>"error", :error=>"#{legend_source.split('/')[-1]} does not contain required column <strong>category</strong>."} unless legendid

      legend.each do |l|
        unless l[legendid]
          #puts "error: id column not found in line: [#{l.join(', ')}]"
        end
        legendjson[l[legendid]] = {}
        l.each_with_index do |c,i|
          next if i == legendid
          legendjson[l[legendid]][legendheader[i]] = c
        end
      end

      params['legend_json'] = legendjson
      pp legendjson
      #puts 'Legend layer read'
    end

    #puts 'Vector parsing started'

    AsyncTask.new.vectorupload params, vd, precision.to_i
    return 'ok'
  end

end
