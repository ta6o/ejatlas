Admin.controllers :ifis do

  def self.mergeSupporters src, trg
    begin
      source = Supporter.find src
      target = Supporter.find trg
      if source and target
        source.c_supporters.each do |cc|
          cc.supporter_id = target.id
          cc.save
        end
        source.old_slugs.each do |os|
          os.supporter_id = target.id
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
    @countries = Country.all :order => :slug
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
    slugz = ","
    #puts token
    Supporter.order('slug').each {|c| slugz += "#{c.slug},"}
    key = []
    modifier = -1
    slugz.scan(/[^,]*#{token}[^,]*/).to_set.to_a.each do |slug,index|
      Supporter.find_all_by_slug(slug).each do |comp|
        country = ""
        country = comp.country.name if comp.country
        key << {:id => comp.id, :count => comp.conflicts.count, :name => comp.name, :slug => comp.slug, :confs => comp.conflicts.map{|c|"#{c.name} (##{c.id}) [#{c.approval_status}]"}.join("\n"), :country => country}
      end
    end
    @keywords = {}
    @keywords[token] = key
    return render 'supporters/_merged', :layout => false
  end

  post :merging do
    keywordz = params['keys'].downcase.gsub(/\s*,\s*/,',').split(',')
    slugz = ","
    Supporter.order('slug').each {|c| slugz += "#{c.slug},"}
    @keywords = {}
    keywordz.each do |keyword|
      key = []
      modifier = -1
      slugz.scan(/[^,]*#{keyword}[^,]*/).to_set.to_a.each do |slug,index|
        Supporter.find_all_by_slug(slug).each do |comp|
          country = ""
          country = comp.country.name if comp.country
          key << {:id => comp.id, :count => comp.conflicts.count, :name => comp.name, :slug => comp.slug, :confs => comp.conflicts.map{|c|"#{c.name} (##{c.id}) [#{c.approval_status}]"}.join("\n"), :country => country}
        end
      end
      @keywords[keyword] = key
    end
    render 'supporters/merge'
  end


  get :edit, :with => :id do
    @supporter = Supporter.find(params[:id])
    @countries = Country.all :order => :slug
    @supporters = Supporter.where("id != ?",@supporter.id).select("name,id").map{|c|{:label=>c.name,:value=>c.id}}.to_json
    render 'supporters/edit'
  end

  put :update, :with => :id do
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
