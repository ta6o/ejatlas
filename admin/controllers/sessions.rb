# coding: utf-8
Admin.controllers :sessions do

  get :login do
    #pp request.referer
    set_current_account(nil)
    render "/sessions/new"
  end

  post :create do
    return_to = "/"
    return_to = "/#{params['return_to']}" if params.has_key? 'return_to'
    #puts params !!!!!
    if account = Account.authenticate(params[:email], params[:password])
      set_current_account(account)
      redirect url(return_to)
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
