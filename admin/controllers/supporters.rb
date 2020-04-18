Admin.controllers :ifis do

  def self.filter_merged_ifis params
    keywordz = params['keys'].strip.downcase.split(/\s*,\s*/).map(&:strip) - [""]
    filter = Admin.elasticify( { bool: { must: { query_string: { query: "(*#{keywordz.join("*) OR (*")}*)", fields:["name","slug"]}}, filter: { term: { type: "financial_institution"}}}} )
    #puts JSON.pretty_generate(filter).green
    begin
      result = $client.search(index: $esindex, type: "doc", body: {"size":10000,"_source":{includes:[:id]},query:filter})["hits"]["hits"].map{|x| x["_source"]["id"]}
    rescue =>e
      puts e.to_s.red
    end
    keywords = {}
    key = []
    Supporter.where(:id=>result).each do |comp|
      ky = {:id => comp.id, :appc => comp.conflicts.where(:approval_status=>"approved").count, :resc => comp.conflicts.where("approval_status <> 'approved' or approval_status is null").count, :name => comp.name, :slug => comp.slug, :appd => comp.conflicts.where(:approval_status=>"approved").map{|c|"#{c.name} (##{c.id})"}.join("\n"), :rest => comp.conflicts.where("approval_status <> 'approved' or approval_status is null").map{|c|"#{c.name} (##{c.id})"}.join("\n")}
      ky[:former] = comp.former_infos.last.former_db.upcase.sub(/^EJ/,"") if comp.former_infos.any?
      ky[:country] = comp.country.name if comp.country
      ky[:acronym] = comp.acronym if comp.acronym and comp.acronym.length > 0
      key << ky
    end
    keywords[keywordz.join(", ")] = key
    keywords
  end

  def self.mergeSupporters src, trg
    begin
      source = Supporter.find src
      target = Supporter.find trg
      if source and target
        source.c_supporters.each do |cc|
          cc.update_attribute :supporter_id, target.id
        end
        source.old_slugs.each do |os|
          os.update_attribute :supporter_id, target.id
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
    if current_account.editor?
      @name = "IFI's"
    else
      redirect to "/sessions/login?return=#{request.path.sub(/^\//,'')}"
    end
  end

  get :index do
    @supporters = Supporter.order('slug')
    render 'supporters/index'
  end

  get :new do
    @supporter = Supporter.new
    @countries = Country.all.order :slug
    render 'supporters/new'
  end

  post :create do
    @supporter = Supporter.new(params[:supporter])
    if @supporter.save
      flash[:notice] = 'supporter was successfully created.'
      redirect url(:ifis, :edit, :id => @supporter.id)
    else
      render 'supporters/new'
    end
  end

  get :merge do
    @keywords = {}
    render 'supporters/merge'
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
        Supporter.find(i).destroy
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
        Admin.mergeSupporters i, master
      end
    end
    pa = {'keys'=>token}
    @keywords = Admin.filter_merged_ifis pa
    render 'supporters/merge_thin', :layout=>false
  end

  post :merging do
    if params["keys"] == ""
      @keywords = {"blank search"=>[]}
    else
      @keywords = Admin.filter_merged_ifis params
    end
    render 'supporters/merge'
  end

  post :locale do
    if params["locale"] == ""
      @keywords = {"blank search"=>[]}
    else
      @keywords = {}
      key = []
      FormerInfo.where(:attachable_type=>"Supporter",:former_db=>"ej#{params["locale"]}").map do |fi|
        comp = fi.attachable
        ky = {:id => comp.id, :appc => comp.conflicts.where(:approval_status=>"approved").count, :resc => comp.conflicts.where("approval_status <> 'approved' or approval_status is null").count, :name => comp.name, :slug => comp.slug, :appd => comp.conflicts.where(:approval_status=>"approved").map{|c|"#{c.name} (##{c.id})"}.join("\n"), :rest => comp.conflicts.where("approval_status <> 'approved' or approval_status is null").map{|c|"#{c.name} (##{c.id})"}.join("\n")}
        ky[:former] = comp.former_infos.last.former_db.upcase.sub(/^EJ/,"") if comp.former_infos.any?
        ky[:country] = comp.country.name if comp.country
        ky[:acronym] = comp.acronym if comp.acronym and comp.acronym.length > 0
        key << ky
      end
    end
    @keywords[$iso639[params["locale"]]] = key
    render 'supporters/merge'
  end


  get :edit, :with => :id do
    @supporter = Supporter.find(params[:id])
    @countries = Country.all.order :slug
    @supporters = Supporter.where("id != ?",@supporter.id).select("name,id").map{|c|{:label=>c.name,:value=>c.id}}.to_json
    render 'supporters/edit'
  end

  put :update, :with => :id do
    local = params.delete "local"
    local[local["new"].delete("locale")] = local["new"]
    local.delete "new"
    local.delete ""
    params["supporter"]["local_names"] = local.to_json
    @supporter = Supporter.find(params[:id])
    if @supporter.update_attributes(params[:supporter])
      flash[:notice] = 'supporter was successfully updated.'
      redirect url(:ifis, :edit, :id => @supporter.id)
    else
      render 'supporters/edit'
    end
  end

  post :merge do
    return Admin.mergeSupporters params['source'], params['target']
  end

  get :destroy, :with => :id do
    supporter = Supporter.find(params[:id])
    if supporter.destroy
      flash[:notice] = 'supporter was successfully destroyed.'
    else
      flash[:error] = 'Unable to destroy supporter!'
    end
    redirect url(:ifis, :index)
  end
end
