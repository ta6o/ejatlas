Admin.controllers :companies do

  def self.mergeCompanies src, trg
    source = Company.find src
    target = Company.find trg
    begin
      if source and target
        source.c_companies.each do |cc|
          cc.company_id = target.id
          cc.save
        end
        source.old_slugs.each do |os|
          os.company_id = target.id
          os.save
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

  get :merge do
    @keywords = {}
    render 'companies/merge'
  end

  post :mergethem do
    action = params.delete 'act'
    if action == "delete"
      line = []
      params.each do |k,v|
        if k[0] == 'p'
          line << k[2..-1]
        end
      end
      p line
    elsif action == 'merge'
      line = []
      master = nil
      params.each do |k,v|
        if k[0] == 'p'
          line << k[2..-1]
        elsif k[0] == 'a'
          master = Company.find v.to_i
        end
      end
      puts master.name
      p line
    end
    return params.to_s
  end

  post :merging do
    keywordz = params['keys'].downcase.gsub(/\s*,\s*/,',').split(',')
    slugz = ","
    Company.all.each {|c| slugz += "#{c.slug},"}
    @keywords = {}
    keywordz.each do |keyword|
      key = []
      modifier = -1
      slugz.scan(/[^,]*#{keyword}[^,]*/).to_set.to_a.each do |slug,index|
        Company.find_all_by_slug(slug).each do |comp|
          key << {:id => comp.id, :count => comp.conflicts.count, :name => comp.name, :slug => comp.slug, :confs => comp.conflicts.map{|c|"#{c.name} (##{c.id})"}.join("\n")}
        end
      end
      @keywords[keyword] = key
    end
    puts @keywords
    render 'companies/merge'
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
    return Admin.mergeCompanies params['source'], params['target']
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
