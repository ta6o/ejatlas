# coding: utf-8
Admin.controllers :conflicts do

  before do
    @name = "Conflicts"
  end

  require "unicode_utils/titlecase"

  def self.cutString string, classname
    array = string.split(/[\s]*[,;\n][\s]*/)
    items = []
    array.each do |k|
      key = classname.find(:first, :conditions => [ "name = ?", k ])
      if key
        items.push key
      else
        #items.push classname.create :name => k
      end
    end
    return items
  end

  def self.correctForm(params)
    params["conflict"]["lon"] = params["conflict"]["lon"].gsub(",",".")
    params["conflict"]["lat"] = params["conflict"]["lat"].gsub(",",".")
    params["conflict"]["description"] = Sanitize.fragment((params["conflict"]["description"]||"").gsub(/\r\n/,"\n").gsub(/<p>\s*<\/p>/,"").gsub(/''/,"\""), :elements => ['p', 'b', 'i', 'a'])
    multies = {
      'mobilizing_group'=>[],
      'mobilizing_form'=>[],
      'conflict_event'=>[],
      'product'=>[],
      'type'=>[]
    }
    impacts = {
      'env_radio'=>{'p'=>[],'g'=>[]},
      'hlt_radio'=>{'p'=>[],'g'=>[]},
      'sec_radio'=>{'p'=>[],'g'=>[]},
    }
    tobecut = {
      #'justice_parties'=>JusticeParty,
      #'government_actors'=>GovernmentActor,
      'companies'=>Company,
      'supporters'=>Supporter
    }
    refs = {
      'company'=>{},
      'supporter'=>{},
      'reference'=>{},
      'legislation'=>{},
      'weblink'=>{},
      'medialink'=>{},
      'document'=>{},
      'image'=>{},
      'related'=>{},
    }
    def stripDate prop, params
      par = params['conflict'][prop+'_date']
      matches = ['','01/','01/01/']
      subs = [0,3,6]
      n = 0
      return if par.length == 0
      begin
        s = par[subs[n]..9]
        d = Date.strptime matches[n]+s, '%d/%m/%Y'
      rescue ArgumentError
        n += 1
        retry
      ensure
        params['conflict'][prop+'_datestamp'] = d
        params['conflict'][prop+'_date'] = s
      end
    end

    stripDate 'start', params if params['conflict']['start_date']
    stripDate 'end', params if params['conflict']['end_date']
    psi = params.delete('project_status').to_i
    params['conflict']['project_status'] = ProjectStatus.find psi if psi > 0

    params.each do |k,v|
      if v.is_a? Hash
        v.each do |l,w|
          if tobecut.has_key? l
            arr = cutString w, tobecut[l]
            v[l] = arr
          elsif l == "project_status"
            ##puts (k+': ')+(l+': ')+w.name
          else
            ##puts (k+': ')+(l+': ')+w.to_s
          end
        end
        ##puts ''
      else
        kk = k.to_s.split '_'
        root = kk[0..-2].join('_')
        if multies.has_key? root
          multies[root].push k.split('_')[-1].to_i
          params.delete k
        elsif refs.has_key? kk[0]
          #p kk
          type = kk[-2]
          id = kk[-1].to_i
          params.delete k
          next if id == 0
          refs[kk[0]][id] = {} unless refs[kk[0]].has_key? id
          refs[kk[0]][id][type] = v
        elsif impacts.has_key? root
          impacts[root][v].push k.split('_')[-1].to_i
          params.delete k
        else
          ##puts (k.to_s+': ')+v.to_s
        end
      end
    end

    multies.each do |k,v|
      ##puts (k.to_s+': ')+v.to_s
    end
    ##puts ''
    impacts.each do |k,v|
      ##puts (k.to_s+': ')+v.to_s
    end
    refs.each do |k,v|
      ##puts (k.to_s+': ')+v.to_s
    end
    params['multies'] = multies
    params['impacts'] = impacts
    params['refs'] = refs
    params['conflict'].delete 'company_country'
    params['conflict'].delete 'contact_people'
    params['conflict'].delete 'company_country_id'
    return params
  end

=begin
  def self.protect(protected)
    condition do
      return redirect back if current_account.nil? 
      #redirect to '/sessions/new' unless ['admin','editor'].include? current_account.role
    end if protected
  end
=end

  def self.setOrder lgt, arr
    arr = arr.to_a
    other = nil
    arr.each do |a|
      if a.name == "Other"
        other = arr.delete(a) 
        break
      end
    end
    res = []
    stp = (arr.length/lgt).floor + 1
    srp = arr.length % lgt
    tur = 0
    stp.times do |s|
      tur = s - stp
      lgt.times do |l|
        l <= srp ? tur += stp : tur += stp - 1
        res.push arr[tur] if l < srp or s < stp - 1
      end
    end
    res << other unless other.nil?
    return res
  end

  before /^(?!\/(off))/ do
    #redirect to '/conflicts/off' unless ['admin','editor'].include?(current_account.role)
    redirect to "/sessions/login?return=#{request.path.sub(/^\//,'')}" if current_account.nil?
    @countries = Country.all.order(:slug).select("name","id")
    @categories = Category.all.order :id
    @alltypes = Type.where('category_id is not null').order('name asc')
    @types = [[{:type=>{:id=>'',:name=>'Please select a first level type.'}}]]
    @alltypeoptions = ""
    @categories.each do |c|
      @types.push c.types.all
      @alltypeoptions += "<option value='0' disabled='disabled'>#{t("m.category_id.#{c.name.slug("_")}")}</option>"
      c.types.each do |ct|
        @alltypeoptions += "<option value='#{ct.id.to_s}'>#{t("m.types.#{ct.name.slug("_")}")}</option>"
      end
      @alltypeoptions += "<option value='0' disabled='disabled'>&nbsp;</option>"
    end
    @alltypeoptions += "<option value='0'>Delete</option>"
    @products = Admin.setOrder 4, Product.order('name asc')
    @impacts = [EnvImpact.all, HltImpact.all, SecImpact.all]
    @statuses = Status.all
    @reactions = Reaction.all
    @mobgroups = Admin.setOrder 3, MobilizingGroup.order('name asc')
    @mobforms = Admin.setOrder 3, MobilizingForm.order('name asc')
    @project_statuses = ProjectStatus.all.order :id
    @conflict_events = Admin.setOrder 2, ConflictEvent.order('name asc')
    @lat = 0
    @lon = 0
  end

  get "off/?" do
    render 'conflicts/maintenance'
  end

  get :index do
    if current_account
      if ["admin","editor"].include? current_account.role
        @conflictos = Admin.filter("{\"must_not\":{\"term\":{\"approval_status\":\"deleted\"}}}", true, 'id,name,slug,account_id,category_id,modified_at,approval_status'.split(","),false).map{|x| x["_source"]}
        @accounts = Admin.filter("{}", true, 'id,name'.split(","),false,'account').map{|x| [x["_source"]["id"],x["_source"]["name"]]}.to_h
        @categories = Category.all.map {|c| [c.id,c.name]}.to_h
        @conflictos.sort_by! {|c| ( c["modified_at"] || Time.now ) }
        @conflictos.reverse!
      else
        proper = Conflict.select('id,name,slug,account_id,approval_status,category_id,modified_at').where(account_id: current_account.id)
        other =  Conflict.select('id,name,slug,account_id,approval_status,category_id,modified_at').where(id: current_account.conflict_accounts.map(&:conflict_id))
        @conflicts = proper.or(other).order('modified_at desc')
        #pp @conflicts.class
      end
    end
    render 'conflicts/index'
  end

  get :approved do
    if current_account
      if ["admin","editor"].include? current_account.role
        @conflictos = Admin.filter("{}", true, 'id,name,slug,account_id,category_id,modified_at,approval_status'.split(",")).map{|x| x["_source"]}
        @accounts = Admin.filter("{}", true, 'id,name'.split(","),false,'account').map{|x| [x["_source"]["id"],x["_source"]["name"]]}.to_h
        @categories = Category.all.map {|c| [c.id,c.name]}.to_h
        @conflictos.sort_by! {|c| ( c["modified_at"] || Time.now ) }
        @conflictos.reverse!
      else
        @conflicts = Conflict.where(approval_status: 'approved').where(account_id: current_account.id).order('modified_at desc').select('id,name,slug,account_id,approval_status,category_id,modified_at')
      end
    end
    render 'conflicts/index'
  end

  get :modified do
    if current_account
      if ["admin","editor"].include? current_account.role
        @conflicts = Conflict.where(approval_status: 'modified').order('modified_at desc').select('id,name,slug,account_id,category_id,modified_at,approval_status')
      else
        @conflicts = Conflict.where(approval_status: 'modified').where(account_id: current_account.id).order('modified_at desc').select('id,name,slug,account_id,approval_status,category_id,modified_at')
      end
    end
    render 'conflicts/index'
  end

  get :queued do
    if current_account
      if ["admin","editor"].include? current_account.role
        @conflicts = Conflict.where(approval_status: 'queued').order('modified_at desc').select('id,name,slug,account_id,category_id,modified_at,approval_status')
      else
        @conflicts = Conflict.where(approval_status: 'queued').where(account_id: current_account.id).order('modified_at desc').select('id,name,slug,account_id,approval_status,category_id,modified_at')
      end
    end
    render 'conflicts/index'
  end

  get :draft do
    if current_account
      if ["admin","editor"].include? current_account.role
        @conflicts = Conflict.where(approval_status: 'draft').order('modified_at desc').select('id,name,slug,account_id,category_id,modified_at,approval_status')
      else
        @conflicts = Conflict.where(approval_status: 'draft').where(account_id: current_account.id).order('modified_at desc').select('id,name,slug,account_id,approval_status,category_id,modified_at')
      end
    end
    render 'conflicts/index'
  end

  get :deleted do
    if current_account
      if ["admin","editor"].include? current_account.role
        @conflicts = Conflict.where(approval_status: 'deleted').order('modified_at desc').select('id,name,slug,account_id,category_id,modified_at,approval_status')
      else
        @conflicts = Conflict.where(approval_status: 'deleted').where(account_id: current_account.id).order('modified_at desc').select('id,name,slug,account_id,approval_status,category_id,modified_at')
      end
    end
    render 'conflicts/index'
  end

  get :confirm, :with=>:id do
    @account = Account.find(params[:id])
    unless @account.approved
      render 'conflicts/confirm'
    else
      redirect to '/'
    end
  end

  get :new  do
    if current_account
      @title = 'New Conflict'
      @name = 'New Conflict'
      @conflict = Conflict.new
      @cjson = ConflictText.where(approval_status: 'approved').order('slug').select('name,conflict_id').to_a.map(&:name)
      render 'conflicts/new'
    end
  end

  get :example do
    @conflict = Conflict.new
    @cjson = ConflictText.where(approval_status: 'approved').order('slug').select('name,conflict_id').to_a.map(&:name)
    @example = true
    render 'conflicts/example'
  end

  get :edit, :with => :id do
    if current_account
      begin
        @conflict = Conflict.find(params[:id])
      rescue
        pass
      end
      roles = current_account.roles.map(&:name)
      if ["admin","editor"].include?(current_account.role) or @conflict.account_id == current_account.id or @conflict.conflict_accounts.map(&:account_id).include?(current_account.id) or (roles.include?("locale-#{I18n.locale}") and roles.include?("editor"))
        #rels = Conflict.where(approval_status: 'approved').order('updated_at desc').map{|c| c.local_data } - [nil]
        rels = ConflictText.where(approval_status: 'approved').order('updated_at desc')
        @cjson = rels.map {|ct| {:id=>ct.conflict_id,:value=>ct.name}}.to_json
        @lat = @conflict.lat.match(/^-?\d+\.?\d*$/) ? @conflict.lat : nil
        @lon = @conflict.lon.match(/^-?\d+\.?\d*$/) ? @conflict.lon : nil
        @saves = []
        CSV.read("#{Dir.pwd}/misc/saves.csv").each do |row|
          @saves << row if row[2] == @conflict.id.to_s
        end
        render 'conflicts/edit'
      elsif roles.include?("locale-#{I18n.locale}") and roles.include?("translator")
        @translate_only = true
        rels = Conflict.where(approval_status: 'approved').order('updated_at desc').map{|c| c.local_data } - [nil]
        @cjson = rels.map {|ct| {:id=>ct.conflict_id,:value=>ct.name}}.to_json
        @lat = @conflict.lat.match(/^-?\d+\.?\d*$/) ? @conflict.lat : nil
        @lon = @conflict.lon.match(/^-?\d+\.?\d*$/) ? @conflict.lon : nil
        @saves = []
        CSV.read("#{Dir.pwd}/misc/saves.csv").each do |row|
          @saves << row if row[2] == @conflict.id.to_s
        end
      rescue
        pass
      end
    else
      redirect to '/sessions/login'
    end
  end

  get :conflict_account_revoke, :with => :id do
    if current_account and ["admin","editor"].include?(current_account.role)
      ca = ConflictAccount.find(params[:id])
      cid = ca.conflict_id
      ca.delete
      redirect to "/conflicts/edit/#{cid}#_meta"
    else
      redirect to '/sessions/login'
    end
  end

  get :conflict_account_create, :map => "/conflicts/conflict_account_create/:cid/:aid" do
    if current_account and ["admin","editor"].include?(current_account.role)
      ConflictAccount.create :conflict_id => params["cid"], :account_id => params["aid"]
      redirect to "/conflicts/edit/#{params["cid"]}#_meta"
    else
      redirect to '/sessions/login'
    end
  end

  post :ca_create do
    if current_account and ["admin","editor"].include?(current_account.role)
      if acc = Account.find_by_email(params["aid"])
        if ConflictAccount.where(:conflict_id => params["cid"], :account_id => acc.id).any?
          return "Error: contributor exists"
        else
          ConflictAccount.create :conflict_id => params["cid"], :account_id => acc.id
          return "ok"
        end
      else
        return "Error: account not found"
      end
    else
      redirect to '/sessions/login'
    end
  end

  post :msg_create do
    @conflict = Conflict.find(params["cid"])
    if current_account and ( ["admin","editor"].include?(current_account.role) or @conflict.account_id == current_account.id or @conflict.conflict_accounts.map(&:account_id).include?(current_account.id))
      msg = ConflictMessage.create :conflict_id => params["cid"], :account_id => params["aid"], :content => params["content"]
      Admin.notify_mod_msg msg
      return "ok"
    else
      return "You are logged out. Please log in again, and be sure to copy the message otherwise it will be lost!"
    end
  end

  post :msg_delete do
    if current_account and ["admin","editor"].include?(current_account.role)
      ConflictMessage.find(params["id"]).delete
      return "ok"
    else
      return "error"
    end
  end

=begin
  get :edit, :with => :slug do
    @conflict = Conflict.find_by_slug(params[:slug])
    @cjson = Conflict.where(approval_status: 'approved').order('slug').select('name,id').to_a.map(&:name)
    @lat = @conflict.lat
    @lon = @conflict.lon
    render 'conflicts/edit'
  end
=end

  post :create do
    pass unless current_account
    #params.each {|kk,vv| #puts; #puts kk; if vv.is_a? Hash then vv.each {|k,v| #puts "#{k.to_s}: #{v.to_s}"} else #puts vv end }
    updated = Admin.correctForm(params)
    @conflict = Conflict.create
    @conflict.update_attributes(updated[:conflict])
    #puts "CONFLICT CREATE '#{@conflict.name}' at #{Time.now} by #{current_account.email} from #{request.ip}"
    if @conflict.save :validate => false
      File.open("#{Dir.pwd}/misc/saves.csv","a") do |file|
        file << "NEW,#{Time.now.to_i},#{@conflict.id},#{current_account.id},#{Time.now.strftime("%Y-%m-%d %H:%M:%S")},#{@conflict.slug},#{Admin.slugify(current_account.name)},new\n"
      end
      @conflict.account = current_account
      @conflict.ping
      @conflict.modified_at = Time.now
      if @conflict.save :validate=>false
        flash[:notice] = 'Conflict was successfully created.'
        redirect url(:conflicts, :edit, :id => @conflict.id)
      end
    else
      render 'conflicts/new'
    end
  end

   put :update, :with => :id do
    #pp params["id"]
    #pp params["conflict"]["slug"]
    hash = params.delete 'activetab'
    params['conflict'].reject! {|a| a.match /company_country.*$/}
    updated = Admin.correctForm(params)
    @conflict = Conflict.find(updated[:id])
    pass unless current_account and ( ["admin","editor"].include?(current_account.role) or @conflict.account_id == current_account.id or @conflict.conflict_accounts.map(&:account_id).include?(current_account.id))

    oldstat = @conflict.approval_status
    sameslug = ConflictText.where(:slug=>params["conflict"]["slug"]).map(&:conflict_id) - [params["id"].to_i]
    if sameslug.any?
      return {:status=>"error",:errors=>["Name on address bar has been taken by conflict ##{sameslug.first}"]}.to_json 
    end

    unless params['conflict'].has_key?("approval_status")
      File.open("#{Dir.pwd}/misc/saves.csv","a") do |file|
        file << "ERR,#{Time.now.to_i},#{@conflict.id},#{current_account.id},#{Time.now.strftime("%Y-%m-%d %H:%M:%S")},#{@conflict.slug},#{Admin.slugify(current_account.name)},#{oldstat}\n"
      end
      return {:status=>"error",:errors=>["Request was not completed, omitting save.<br/><br/>Please try again."]}.to_json 
    end

    if  @conflict.save :validate=>false
      File.open("#{Dir.pwd}/misc/saves.csv","a") do |file|
        file << "UPD,#{Time.now.to_i},#{@conflict.id},#{current_account.id},#{Time.now.strftime("%Y-%m-%d %H:%M:%S")},#{@conflict.slug},#{Admin.slugify(current_account.name)},#{oldstat}\n"
      end
      multies = {
        'company'=>{:attr=>@conflict.companies,:class=>Company,:join=>@conflict.c_companies},
        'supporter'=>{:attr=>@conflict.supporters,:class=>Supporter,:join=>@conflict.supporters},
        'mobilizing_group'=>{:attr=>@conflict.mobilizing_groups,:class=>MobilizingGroup,:join=>@conflict.c_mobilizing_groups},
        'mobilizing_form'=>{:attr=>@conflict.mobilizing_forms,:class=>MobilizingForm,:join=>@conflict.c_mobilizing_forms},
        'conflict_event'=>{:attr=>@conflict.conflict_events,:class=>ConflictEvent,:join=>@conflict.c_conflict_events},
        'product'=>{:attr=>@conflict.products,:class=>Product,:join=>@conflict.c_products},
        'type'=>{:attr=>@conflict.types,:class=>Type,:join=>@conflict.c_types},
        'env_radio'=>{:attr=>@conflict.env_impacts,:class=>EnvImpact,:join=>@conflict.c_env_impacts},
        'hlt_radio'=>{:attr=>@conflict.hlt_impacts,:class=>HltImpact,:join=>@conflict.c_hlt_impacts},
        'sec_radio'=>{:attr=>@conflict.sec_impacts,:class=>SecImpact,:join=>@conflict.c_sec_impacts},
        'reference'=>{:attr=>@conflict.references,:class=>Reference},
        'legislation'=>{:attr=>@conflict.legislations,:class=>Legislation},
        'weblink'=>{:attr=>@conflict.weblinks,:class=>Weblink},
        'medialink'=>{:attr=>@conflict.medialinks,:class=>Medialink},
        'document'=>{:attr=>@conflict.documents,:class=>Document},
        'image'=>{:attr=>@conflict.images,:class=>Image},
      }
      multies.each do |k,v|
        #v[:join].clear if v[:join]
      end
      updated['multies'].each do |k,v|
        new = v
        old = multies[k][:attr].map(&:id)
        (old-new).each do |l|
          multies[k][:attr].delete(multies[k][:class].find(l))
        end
        (new-old).each do |l|
          begin
            multies[k][:attr] << multies[k][:class].find(l)
          rescue
            #puts "no #{k} found with id #{l}"
          end
        end
      end
      updated['impacts'].each do |k,v|
        new = v['g'] + v['p']
        old = multies[k][:attr].map(&:id)
        (old-new).each do |l|
          multies[k][:attr].delete(multies[k][:class].find(l))
        end
        (new-old).each do |l|
          begin
            multies[k][:attr] << multies[k][:class].find(l)
          rescue
            #puts "no #{k} found with id #{l}"
          end
        end
        v['g'].each do |l|
          imp = multies[k][:join].where("#{k.sub('radio','impact')}_id = ?", l).first
          imp.visible = true
          imp.save
        end
        v['p'].each do |l|
          imp = multies[k][:join].where("#{k.sub('radio','impact')}_id = ?", l).first
          imp.visible = false
          imp.save
        end
      end
      updated['refs'].each do |k,v|
        if k == "related"
          v.each do |l,w|
            rel = ConflictRelation.both(@conflict.id,l.to_i)
            if w['remove'] and rel
              rel.destroy
              next 
            elsif w['add'] and !rel
              @conflict.related_to << Conflict.find(l.to_i)
            end
          end
        else
          v.each do |l,w|
            ##puts "#{k}: #{l},#{w}"
            ref = multies[k][:class].find(l)
            if w['remove']
              multies[k][:attr].delete ref
              ref.save
              next 
            end
            ref.name = w['name'] if w['name']
            ref.title = w['title'] if w['title']
            ref.description = w['description'] if w['description']
            ref.country_id = w['country'] if w['country']
            ref.url = w['url'] if w['url']
            #ref.conflict = @conflict
            begin
              multies[k][:attr] << ref
            rescue
              #puts "#{k} been taken!"
            end
            ref.save
          end
        end
      end

      general = false
      updated['conflict'].each do |k,v|
        if k == 'name' and v.match(/"/)
          quotes = ["“","","”"]
          fi = -1
          while v.match(/"/)
            v = v.sub(/"/,quotes[fi+1])
            fi *= -1
          end
        elsif k == "general" and v == "on"
          general = true
          next
        end
        if @conflict.attributes.has_key?(k) or @conflict.attributes.has_key?("#{k}_id") or k.match(/_id$/)
          unless @conflict.attributes[k] == v or ( k.match(/_id$/) and @conflict.attributes[k] == v.to_i )
            begin
              @conflict.update_attribute k, v 
            rescue => e
              p e.methods
              return [200, {'Content-Type' => 'application/json'}, [{status:"error",errors:[k,e.cause]}.to_json]]
            end
          end
        else
          #puts k
          ct = @conflict.local_data
          unless ct.attributes[k] == v
            begin
              ct.update_attribute k, v 
            rescue => e
              puts e
              puts e.backtrace
              return [200, {'Content-Type' => 'application/json'}, [{status:"error",errors:[k,e.cause]}.to_json]]
            end
          end
        end
      end

      # puts "general: #{general}"
      if general
        capital = Country.find(updated['conflict']['country_id']).capital.gsub(',','.').split('|')
        @conflict.lat = capital[1]
        @conflict.lon = capital[2]
      end

      @conflict.general = general
      @conflict.ping
      @conflict.modified_at = Time.now
      @conflict.commented = false;

      begin
        if @conflict.save :validate=>false
          flash[:notice] = 'Conflict was successfully created.'
          if ['admin','editor'].include?(current_account.role)
            $client.index index: "atlas_#{I18n.locale}", type: "conflict", id: @conflict.id, body: @conflict.elastic
          end

          if oldstat != @conflict.approval_status and @conflict.account_id and @conflict.account_id > 0 
            if ['admin','editor'].include?(current_account.role)
              Admin.notify_collaborator @conflict
            elsif ["queued","modified"].include?(@conflict.approval_status)
              Admin.notify_moderator @conflict
            end
          end
          #redirect "/conflicts/edit/#{@conflict.id}#{hash}"
          response = {:status=>"success"}
        end
      rescue => e
        puts e.backtrace
        return [200, {'Content-Type' => 'application/json'}, [{status:"error",errors:[e.message]}.to_json]]
      end
    else
      #render 'conflicts/edit'
      response = {:status=>"error",:errors=>["Conflict could not be saved."]}
    end
    response.to_json
  end

  get :approve, :with => :id do
    conflict = Conflict.find(params[:id])
    conflict.approval_status = 'approved'
    if conflict.save :validate=>false
      flash[:notice] = 'Conflict was approved by your consent.'
    else
      flash[:error] = 'Unable to approve Conflict!'
    end
    redirect url(:conflicts, :index)
  end

  get :disapprove, :with => :id do
    conflict = Conflict.find(params[:id])
    conflict.approval_status = 'queued'
    if conflict.save :validate=>false
      flash[:notice] = 'Conflict was disapproved by your consent.'
    else
      flash[:error] = 'Unable to disapprove Conflict!'
    end
    redirect url(:conflicts, :index)
  end
  
  get :print, :with => :id do
    c = Conflict.find(params[:id])
    @name = c.name
    @id = c.id
    if current_account
      if ['admin', 'editor'].include? current_account.role
        @table = c.as_table(:full=>true) 
      elsif current_account.role == 'user' and current_account.conflicts.include? c
        @prop = true
        @table = c.as_table(:full=>true) 
      else
        @table = c.as_table
      end
    else
      @table = c.as_table
    end
    @print = true
    render 'conflicts/view'
  end

  get :view, :with => :id do
    c = Conflict.find(params[:id])
    @name = c.name
    @id = c.id
    if current_account
      if ['admin', 'editor'].include? current_account.role
        @table = c.as_table(:full=>true) 
      elsif current_account.role == 'user' and current_account.conflicts.include? c
        @prop = true
        @table = c.as_table(:full=>true) 
      else
        @table = c.as_table
      end
    else
      @table = c.as_table
    end
    @print = false
    render 'conflicts/view'
  end

  get "/modal/:cid/:model" do
    @actor = eval("#{params[:model].gsub('_',' ').titlecase.gsub(' ','')}.new")
    @cid = params[:cid]
    render 'conflicts/actor_modal', :layout => false
  end

  get "/modal/:cid/:model/:id" do
    @actor = eval("#{params[:model].gsub('_',' ').titlecase.gsub(' ','')}.find(#{params[:id]})")
    @cid = params[:cid]
    if params[:model] == 'company'
      @cactor = @actor.c_companies.where(conflict_id: @cid.to_i).first
    elsif params[:model] == 'supporter'
      @cactor = @actor.c_supporters.where(conflict_id: @cid.to_i).first
    end
    render 'conflicts/actor_modal', :layout => false
  end

  post :actor do
    pl = {'Company'=> 'companies', 'Supporter'=>'supporters'}
    cid = params.delete("cid").to_i
    model = params.delete 'model'
    involvement = params.delete 'involvement'
    conflict = Conflict.find cid if cid > 0
    if params['id'] and actor = eval("#{model}.find #{params['id']}")
      actor.update_attributes!(params)
    else
      actor = eval("#{model}.new(params)")
    end
    if conflict and not actor.conflicts.include? conflict
      actor.conflicts << conflict
      actor.save 
    end
    if involvement
      join = eval("actor.c_#{pl[model]}.where(conflict_id: #{cid}).first")
      join.involvement = involvement
      join.save
    end
    if actor.save
      return actor.attributes.to_json
    else
      return 'tombik'
    end
  end

  post :supporter do
    cid = params.delete("conflict_id").to_i
    conflict = Conflict.find cid if cid > 0
    supporter = Supporter.new(params)
    if supporter.save
      if conflict
        supporter.conflicts << conflict
        supporter.save 
      end
      return supporter.name
    else
      return 'tombik'
    end
  end

  post :reference do
    reference = Reference.new(params)
    if reference.save
      return reference.to_json
    end
  end

  post :legislation do
    legislation = Legislation.new(params)
    if legislation.save
      return legislation.to_json
    end
  end

  post :weblink do
    weblink = Weblink.new(params)
    if weblink.save
      return weblink.to_json
    end
  end

  post :medialink do
    medialink = Medialink.new(params)
    if medialink.save
      return medialink.to_json
    end
  end

  post :getfile do
    @file = Document.new(params['document'])
    if @file.save
      return @file.to_json
    else
      return 'no'
    end
  end

  delete "/destroy/:id" do
    c = Conflict.find(params[:id].to_i)
    if c.destroy
      #puts "DELETED: Conflict ##{c.id} (#{c.name}) is sent to the depths of history."
      redirect to "/conflicts"
    else
      redirect to "/conflicts/edit/#{c.id}"
    end
  end

end
