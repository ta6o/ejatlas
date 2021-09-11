Admin.controllers :tags do

  before do
    if current_account.gis?
      @name = "Tags"
    else
      redirect to "/sessions/login?return=#{request.path.sub(/^\//,'')}"
    end
  end

  get :index do
    @tags = Tag.order("updated_at desc")
    render 'tags/index'
  end

  get :new do
    @tag = Tag.new
    render 'tags/new'
  end

  post :create do
    @tag = Tag.new(params[:tag])
    params["tag"]["domain"].sub!(/^#/,"")
    if @tag.save
      flash[:notice] = 'Tag was successfully created.'
      redirect url(:tags, :edit, :id => @tag.id)
    else
      render 'tags/new'
    end
  end

  get :edit, :with => :id do
    @tag = Tag.find(params[:id])
    @tags = Tag.where("id != ?",@tag.id).select("name,id").map{|c|{:label=>c.name,:value=>c.id}}.to_json
    @filters = Filter.where("name is not null").where("name <> ''").order(:name)
    render 'tags/edit'
  end

  put :update, :with => :id do
    @tag = Tag.find(params[:id])
    params["tag"]["domain"].sub!(/^#/,"")
    if @tag.update(params[:tag])
      flash[:notice] = 'Tag was successfully updated.'
      #redirect url(:tags, :edit, :id => @tag.id)
      @tags = Tag.order("updated_at desc")
      render 'tags/index'
    else
      render 'tags/edit'
    end
  end

  get :update_filter, :with => :id do
    tag = Tag.find(params[:id])
    if tag.update_from_filter
      flash[:notice] = 'Tag was successfully updated over its filter.'
    else
      flash[:error] = 'Unable to update Tag!'
    end
    redirect url(:tags, :index)
  end
  get :delete, :with => :id do
    tag = Tag.find(params[:id])
    if tag.destroy
      flash[:notice] = 'Tag was successfully destroyed.'
    else
      flash[:error] = 'Unable to destroy Tag!'
    end
    redirect url(:tags, :index)
  end
end
