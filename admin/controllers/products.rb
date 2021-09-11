Admin.controllers :products do

  before do
    if current_account.editor?
      @name = "Commodities"
    else
      redirect to "/sessions/login?return=#{request.path.sub(/^\//,'')}"
    end
  end

  get :index do
    @products = Product.order('slug').select('name,id,slug,description')
    render 'products/index'
  end

  get :new do
    @product = Product.new
    render 'products/new'
  end

  post :create do
    @product = Product.new(params[:product])
    if @product.save
      flash[:notice] = 'Product was successfully created.'
      redirect url(:products, :edit, :id => @product.id)
    else
      render 'products/new'
    end
  end

  get :edit, :with => :id do
    @product = Product.find(params[:id])
    render 'products/edit'
  end

  put :update, :with => :id do
    @product = Product.find(params[:id])
    if @product.update(params[:product])
      flash[:notice] = 'Product was successfully updated.'
      redirect url(:products, :edit, :id => @product.id)
    else
      render 'products/edit'
    end
  end

  delete :destroy, :with => :id do
    product = Product.find(params[:id])
    if product.destroy
      flash[:notice] = 'Product was successfully destroyed.'
    else
      flash[:error] = 'Unable to destroy Product!'
    end
    redirect url(:products, :index)
  end
end
