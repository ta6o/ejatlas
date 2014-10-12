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
    render 'featureds/new'
  end

  post :create do
    @featured = Featured.new(params[:featured])
    if @featured.save
      flash[:notice] = 'Featured was successfully created.'
      redirect url(:featureds, :edit, :id => @featured.id)
    else
      render 'featureds/new'
    end
  end

  get :edit, :with => :id do
    @featured = Featured.find(params[:id])
    @features = JSON.parse(@featured.features)
    @followed = []
    @features['tags'].each do |tag|
      t = Tag.find_slug(tag)
      @followed << t if t
    end
    render 'featureds/edit'
  end

  put :update, :with => :id do
    @featured = Featured.find(params[:id])
    if @featured.update_attributes(params[:featured])
      flash[:notice] = 'Featured was successfully updated.'
      redirect url(:featureds, :edit, :id => @featured.id)
    else
      render 'featureds/edit'
    end
  end

  get :csv do
    render 'featureds/csv'
  end

  post :csv do
    require 'csv'
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
    tags.each_with_index do |tag,index|
      domain = tag.split(":")[-1]
      tag = tag.split(":")[0]
      slug = Admin.slugify(tag)
      ftags << slug
      if ftag = Tag.find_slug(slug)
        ftag.domain = domain
        ftag.save
      else
        Tag.create :name => UnicodeUtils::titlecase(tag.gsub(/[-_]/,' ')), :domain => domain
      end
    end
    p tags
    p ftags

    name = UnicodeUtils::titlecase(params['featured']['file'][:filename].split('.')[0].gsub(/[-_]/,' '))
    unless feat = Featured.find_by_slug(Admin.slugify(name))
      feat = Featured.create :name => name
    end

    csv.each do |row|
      next unless row[0]
      conflict = Conflict.find(row[0].to_i)
      features = {}
      row.each_with_index do |cell,index|
        next if header[index] == 'id'
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
    features = {:data=>header - tags, :tags => ftags }
    feat.features = features.to_json
    feat.save
    redirect to '/featureds'
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
end

