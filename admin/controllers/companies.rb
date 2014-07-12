Admin.controllers :companies do

  before do
    if current_account and ["admin","editor"].include?(current_account.role)
      @name = "Companies"
    else
      redirect to "/sessions/login"
    end
  end

  get :index do
    @companies = Company.order('slug').select("id, name, slug, acronym, description, url, logo_image, country_id")
    render 'companies/index'
  end

  get :new do
    @company = Company.new
    @countries = Country.all :order => :slug
    render 'companies/new'
  end

  post :create do
    @company = Company.new(params[:company])
    if @company.save
      flash[:notice] = 'Company was successfully created.'
      redirect url(:companies, :edit, :id => @company.id)
    else
      render 'companies/new'
    end
  end

  get :edit, :with => :id do
    @company = Company.find(params[:id])
    @countries = Country.all :order => :slug
    @companies = Company.where("id != ?",@company.id).select("name,id").map{|c|{:label=>c.name,:value=>c.id}}.to_json
    render 'companies/edit'
  end

  put :update, :with => :id do
    @company = Company.find(params[:id])
    if @company.update_attributes(params[:company])
      flash[:notice] = 'Company was successfully updated.'
      redirect url(:companies, :edit, :id => @company.id)
    else
      render 'companies/edit'
    end
  end

  post :merge do
    source = Company.find params['source']
    target = Company.find params['target']
    begin
      if source and target
        puts source.name
        puts target.name
        source.c_companies.each do |cc|
          cc.company_id = target.id
          cc.save
        end
        puts source.conflicts
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
    company = Company.find(params[:id])
    if company.destroy
      flash[:notice] = 'Company was successfully destroyed.'
    else
      flash[:error] = 'Unable to destroy Company!'
    end
    redirect url(:companies, :index)
  end
end
