# coding: utf-8
Admin.controllers :sessions do

  get :login do
    #puts session[:return_to]
    set_current_account(nil)
    render "/sessions/new"
  end

  get :create do
    configure :development do
      @account = Account.find params['id']
      if @account.surname == params['hash']
        set_current_account @account
      end
    end
    redirect to '/'
  end

  post :create do
    if account = Account.authenticate(params[:email], params[:password])
      set_current_account(account)
      redirect url(:index)
    elsif Padrino.env == :development && params[:bypass]
      account = Account.first
      set_current_account(account)
      redirect url(:index)
    else
      params[:email], params[:password] = h(params[:email]), h(params[:password])
      flash[:warning] = "E-posta veya şifre hatalı."
      redirect url(:sessions, :login)
    end
  end

  delete :destroy do
    set_current_account(nil)
    redirect to '/'
  end
end
