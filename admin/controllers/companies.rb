Admin.controllers :companies do

  def self.filter_merged_comps params
    keywordz = params['keys'].strip.downcase.split(/\s*,\s*/).map(&:strip) - [""]
    filter = Admin.elasticify( { bool: { must: { query_string: { query: "(*#{keywordz.join("*) OR (*")}*)", fields:["name","slug"]}}, filter: { term: { type: "company"}}}} )
    #puts JSON.pretty_generate(filter).green
    begin
      # TODO: fix score filter, name => slug
      result = $client.search(index: "atlas", type: "doc", body: {"size":10000,"_source":{includes:[:id]},query:filter})["hits"]["hits"].map{|x| x["_source"]["id"]}
    rescue =>e
      puts e.to_s.red
    end
    keywords = {}
    key = []
    Company.where(:id=>result).each do |comp|
      ky = {:id => comp.id, :appc => comp.conflicts.where(:approval_status=>"approved").count, :resc => comp.conflicts.where("approval_status <> 'approved' or approval_status is null").count, :name => comp.name, :slug => comp.slug, :appd => comp.conflicts.where(:approval_status=>"approved").map{|c|"#{c.name} (##{c.id})"}.join("\n"), :rest => comp.conflicts.where("approval_status <> 'approved' or approval_status is null").map{|c|"#{c.name} (##{c.id})"}.join("\n")}
      ky[:former] = comp.former_infos.last.former_db.upcase.sub(/^EJ/,"") if comp.former_infos.any?
      ky[:country] = comp.country.name if comp.country
      ky[:acronym] = comp.acronym if comp.acronym and comp.acronym.length > 0
      key << ky
    end
    keywords[keywordz.join(", ")] = key
    keywords
  end

  def self.mergeCompanies src, trg
    begin
      source = Company.find src
      target = Company.find trg
      if source and target
        source.c_companies.each do |cc|
          cc.update_attribute :company_id, target.id
        end
        source.old_slugs.each do |os|
          os.update_attribute :company_id, target.id
        end
        if source.former_infos.any? and source.former_infos.last.former_db and lo = source.former_infos.last.former_db.sub(/^ej/,"") and $tkeys.include?(lo)
          begin
            ln = JSON.parse((target.local_names || "{}") == "" ? "{}" : (target.local_names || "{}"))
          rescue
            puts "Corrupt data: ".red
            puts "  #{target.local_names}"
            ln = {}
          end
          ln[lo] = {}
          source.attributes.except("id","slug","logo_image","other_products","conflicts_marker","conflicts_json","conflicts_link","local_names").each do |k,v|
            ln[lo][k] = v if v
          end
          target.update_attribute :local_names, ln.to_json
        end
        source.destroy
        return true
      else
        return false
      end
    rescue => e
      puts e
      return false
    end
  end

  before do
    if current_account and ["admin","editor"].include?(current_account.role)
      @name = "Companies"
    else
      redirect to "/sessions/login?return=#{request.path.sub(/^\//,'')}"
    end
  end

  get :index do
    @companies = Company.select("id, name, slug, acronym, description, url, logo_image, country_id").order("id desc").limit(64)
    #puts 
    render 'companies/index'
  end

  get :more do
    list = Company.select("id, name, slug, acronym, description, url, logo_image, country_id").order("id desc").offset(params[:page].to_i * 64).limit(64).to_json
    result = []
    JSON.parse(list).map do |c| 
      begin 
        c["company"]["country_id"] = Country.find(c["company"]["country_id"]).name 
      rescue 
        c["company"]["country_id"] = ""
      end
      result << c
    end
    return result.to_json
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
    pa = {'keys'=>token}
    @keywords = Admin.filter_merged_comps pa
    render 'companies/merge_thin', :layout=>false
  end

  post :merging do
    if params["keys"] == ""
      @keywords = {"blank search"=>[]}
    else
      @keywords = Admin.filter_merged_comps params
    end
    render 'companies/merge'
  end

  post :locale do
    if params["locale"] == ""
      @keywords = {"blank search"=>[]}
    else
      @keywords = {}
      key = []
      FormerInfo.where(:attachable_type=>"Company",:former_db=>"ej#{params["locale"]}").map do |fi|
        comp = fi.attachable
        ky = {:id => comp.id, :appc => comp.conflicts.where(:approval_status=>"approved").count, :resc => comp.conflicts.where("approval_status <> 'approved' or approval_status is null").count, :name => comp.name, :slug => comp.slug, :appd => comp.conflicts.where(:approval_status=>"approved").map{|c|"#{c.name} (##{c.id})"}.join("\n"), :rest => comp.conflicts.where("approval_status <> 'approved' or approval_status is null").map{|c|"#{c.name} (##{c.id})"}.join("\n")}
        ky[:former] = comp.former_infos.last.former_db.to_s.upcase.sub(/^EJ/,"") if comp.former_infos.any?
        ky[:country] = comp.country.name if comp.country
        ky[:acronym] = comp.acronym if comp.acronym and comp.acronym.length > 0
        key << ky
      end
    end
    @keywords[$iso639[params["locale"]]] = key
    render 'companies/merge'
  end

  get :new do
    @company = Company.new
    @countries = Country.all.order :slug
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
    @countries = Country.all.order :slug
    @companies = Company.where("id != ?",@company.id).select("name,id").map{|c|{:label=>c.name,:value=>c.id}}.to_json
    render 'companies/edit'
  end

  put :update, :with => :id do
    local = params.delete "local"
    local[local["new"].delete("locale")] = local["new"]
    local.delete "new"
    local.delete ""
    params["company"]["local_names"] = local.to_json
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
