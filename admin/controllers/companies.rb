Admin.controllers :companies do

  def self.mergeCompanies src, trg
    begin
      source = Company.find src
      target = Company.find trg
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
    @companies = Company.select("id, name, slug, acronym, description, url, logo_image, country_id").order("id desc").limit(64)
    puts 
    render 'companies/index'
  end

  get :more do
    return Company.select("id, name, slug, acronym, description, url, logo_image, country_id").order("id desc").offset(params[:page].to_i * 64).limit(64).to_json
  end

  get :merge do
    @keywords = {}
    render 'companies/merge'
  end

  post :mergethem do
    action = params.delete 'act'
    token = params.delete 'token'
    if action == "delete"
      line = []
      params.each do |k,v|
        if k[0] == 'p'
          line << k[2..-1]
        end
      end
      line.each do |i|
        Company.find(i).destroy
      end
    elsif action == 'merge'
      line = []
      master = 0
      params.each do |k,v|
        if k[0] == 'p'
          line << k[2..-1]
        elsif k[0] == 'a'
          master = v
        end
      end
      line.each do |i|
        Admin.mergeCompanies i, master
      end
    end
    slugz = ","
    puts token
    Company.order('slug').each {|c| slugz += "#{c.slug},"}
    key = []
    modifier = -1
    slugz.scan(/[^,]*#{token}[^,]*/).to_set.to_a.each do |slug,index|
      Company.find_all_by_slug(slug).each do |comp|
        country = ""
        country = comp.country.name if comp.country
        key << {:id => comp.id, :count => comp.conflicts.count, :name => comp.name, :slug => comp.slug, :confs => comp.conflicts.map{|c|"#{c.name} (##{c.id}) [#{c.approval_status}]"}.join("\n"), :country => country}
      end
    end
    @keywords = {}
    @keywords[token] = key
    return render 'companies/_merged', :layout => false
  end

  post :merging do
    keywordz = params['keys'].downcase.gsub(/\s*,\s*/,',').split(',')
    slugz = ","
    Company.order('slug').each {|c| slugz += "#{c.slug},"}
    @keywords = {}
    keywordz.each do |keyword|
      key = []
      modifier = -1
      slugz.scan(/[^,]*#{keyword}[^,]*/).to_set.to_a.each do |slug,index|
        Company.find_all_by_slug(slug).each do |comp|
          country = ""
          country = comp.country.name if comp.country
          key << {:id => comp.id, :count => comp.conflicts.count, :name => comp.name, :slug => comp.slug, :confs => comp.conflicts.map{|c|"#{c.name} (##{c.id}) [#{c.approval_status}]"}.join("\n"), :country => country}
        end
      end
      @keywords[keyword] = key
    end
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

  get :destroy, :with => :id do
    company = Company.find(params[:id])
    if company.destroy
      flash[:notice] = 'Company was successfully destroyed.'
    else
      flash[:error] = 'Unable to destroy Company!'
    end
    redirect url(:companies, :index)
  end
end
