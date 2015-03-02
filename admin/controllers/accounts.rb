Admin.controllers :accounts do

  before do
    @name = "User Profiles"
  end

  get :index do
    redirect to "/sessions/login?return=#{request.path.sub(/^\//,'')}" unless current_account
    redirect to "/accounts/edit/#{current_account.id}" unless ["admin","editor"].include? current_account.role
    @accounts = Account.order "name"
    @accounts = @accounts.where("role not like 'admin'") if current_account.role == "editor"
    render 'accounts/index'
  end

  get :new do
    @name = "Collaborate"
    @account = Account.new
    render 'accounts/new'
  end

  get :resetpassword do
    render 'accounts/pwdreset'
  end

  post :resetpassword do
    @email = params[:email]
    acc = Account.find_by_email @email
    if acc
      Admin.password_reset acc
    end
    render 'accounts/resetsent'
  end

  get :reset do
    @account = Account.find params['id']
    if @account.surname == params['hash']
      set_current_account @account
      render 'accounts/reset', :layout => false
    else
      redirect to '/'
    end
  end

  get :confirm do
    @account = Account.find params['id']
    if @account.surname == params['hash']
      @account.approved = true
      @account.save
      set_current_account @account
      Admin.notify_new_account @account
      render 'accounts/confirmed'
    else
      redirect to '/'
    end
  end

  post :create do
    pwd = (0..8).map{ (('a'..'z').to_a+('A'..'Z').to_a+(0..9).to_a)[rand(62)] }.join
    params['account']['password'] = pwd
    params['account']['password_confirmation'] = pwd
    @account = Account.new(params[:account])
    @account.surname = '%12x' % (rand((8 ** 16)*15)+(8**16))
    @account.role = "user"
    #puts @account.id
    if @account.save
      Admin.new_account @account
      redirect to "/mailsent"
    else
      render 'accounts/new'
    end
  end

  get :edit, :with => :id do
    redirect to "/sessions/login" unless current_account
    @account = Account.find(params[:id])
    @name = "My Profile" if @account == current_account
    if ["admin","editor"].include? current_account.role or @account == current_account
      redirect to '/accounts/edit/'+current_account.id.to_s if @account.role == "admin"
      @pass = true
      render 'accounts/edit'
    else
      redirect to '/accounts/edit/'+current_account.id.to_s
    end
  end

  put :update, :with => :id do

    redirect to "/sessions/login" unless current_account
    @account = Account.find(params[:id])
    #puts @account.crypted_password
    p params
    @account.surname = '%12x' % (rand((8 ** 16)*15)+(8**16))
    #puts params[:account]
    params[:account][:public] = (params['account']['public'] == 'true' ? true : false ) if params['account'].has_key?('public')
    if ["admin",'editor'].include? current_account.role or @account == current_account
      if @account.update_attributes(params[:account])
        #puts @account.crypted_password
        if params.has_key? :images_attributes and params['images_attributes'].any?
          images = {}
          params['images_attributes'].each{|i,v| images["n#{i}"] = @account.images[i.to_i]}
          params['images_attributes'].each do |i, v|
            img = images["n#{i}"]
            #puts i
            #puts img
            if v['_destroy'] == "on"
              img.destroy
              next
            end
            img.title = v['title'] if v['title'] != img.title
            ih = {nil=>nil, "on"=>1}
            img.prime = ih[v['prime']] if ih[v['prime']] != img.prime
            img.save
          end
        end
        return redirect url(:accounts, :index) if ["admin",'editor'].include? current_account.role
        return redirect url(:conflicts, :index)
      else
        render 'accounts/edit'
      end
    else
      redirect to '/'
    end
  end

  put :confirm, :with => :id do
    @account = Account.find(params[:id])
    @account.surname = '%12x' % (rand((8 ** 16)*15)+(8**16))
    @account.approved = true
    if ["admin",'editor'].include? current_account.role or @account == current_account
      if @account.update_attributes(params[:account])
        flash[:notice] = 'Account was successfully updated.'
        redirect to 'welcome'
      else
        render 'accounts/edit'
      end
    else
      redirect to '/'
    end
  end

  delete :destroy, :with => :id do
    redirect to "/accounts/edit/#{current_account.id}" unless ["admin","editor"].include? current_account.role
    account = Account.find(params[:id])
    if account != current_account && account.destroy
      flash[:notice] = 'Account was successfully destroyed.'
    else
      flash[:error] = 'Unable to destroy Account!'
    end
    redirect to '/accounts'
  end

  post :getimage do
    aid = params['image']['account_id']
    a = Account.find(aid)
    image = Image.new(params['image'])
    image.attachable = a
    image.prime = true if a.images.where(prime:1).empty?
    if image.save
      return {:file=>image.file.url,:thumb=>image.file.thumb_url,:n=>a.images.count,:title=>image.title}.to_json
    else
      return 'no'
    end
  end

end
