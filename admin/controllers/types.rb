Admin.controllers :types do

  before do
    if current_account and ["admin","editor"].include?(current_account.role)
      @name = "Types"
    else
      redirect to "/sessions/login?return=#{request.path.sub(/^\//,'')}"
    end
  end

  get :index do
    @types = Type.order "slug"
    render 'types/index'
  end

  get :new do
    @type = Type.new
    @categories = Category.all :order => :id
    render 'types/new'
  end

  post :create do
    @type = Type.new(params[:type])
    if @type.save
      flash[:notice] = 'Type was successfully created.'
      redirect url(:types, :edit, :id => @type.id)
    else
      render 'types/new'
    end
  end

  get :edit, :with => :id do
    @type = Type.find(params[:id])
    @categories = Category.all :order => :id
    render 'types/edit'
  end

  put :update, :with => :id do
    @type = Type.find(params[:id])
    if @type.update_attributes(params[:type])
      flash[:notice] = 'Type was successfully updated.'
      redirect url(:types, :index)
    else
      render 'types/edit'
    end
  end

  delete :destroy, :with => :id do
    type = Type.find(params[:id])
    if type.destroy
      flash[:notice] = 'Type was successfully destroyed.'
    else
      flash[:error] = 'Unable to destroy Type!'
    end
    redirect url(:types, :index)
  end
end
