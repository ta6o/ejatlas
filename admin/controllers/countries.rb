Admin.controllers :countries do

  before do
    if current_account.editor?
      @name = "Countries"
    else
      redirect to "/sessions/login?return=#{request.path.sub(/^\//,'')}"
    end
  end

  get :index do
    @countries = Country.order(:slug)
    render 'countries/index'
  end

  get :new do
    @country = Country.new
    @regions = Region.all.order :slug
    render 'countries/new'
  end

  post :create do
    @country = Country.new(params[:country])
    if @country.save
      flash[:notice] = 'Country was successfully created.'
      redirect url(:countries, :edit, :id => @country.id)
    else
      render 'countries/new'
    end
  end

  get :edit, :with => :id do
    @country = Country.find(params[:id])
    @regions = Region.all.order :slug
    @countries = Country.where("id != ?",@country.id).select("name,id").map{|c|{:label=>c.name,:value=>c.id}}.to_json
    render 'countries/edit'
  end

  put :update, :with => :id do
    @country = Country.find(params[:id])
    if @country.update(params[:country])
      flash[:notice] = 'Country was successfully updated.'
      redirect url(:countries, :edit, :id => @country.id)
    else
      render 'countries/edit'
    end
  end

  post :merge do
    source = Country.find params['source']
    target = Country.find params['target']
    begin
      if source and target
        source.conflicts.each do |c|
          c.country_id = target.id
          c.save
        end
        source.destroy
        return "ok"
      else
        return 'no'
      end
    rescue => exc
      return exc.to_s
    end
  end

  delete :destroy, :with => :id do
    country = Country.find(params[:id])
    if country.destroy
      flash[:notice] = 'Country was successfully destroyed.'
    else
      flash[:error] = 'Unable to destroy Country!'
    end
    redirect url(:countries, :index)
  end
end
