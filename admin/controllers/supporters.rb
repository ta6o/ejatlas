Admin.controllers :ifis do

  before do
    if current_account and ["admin","editor"].include?(current_account.role)
      @name = "IFI's"
    else
      redirect to "/sessions/login"
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
      redirect url(:supporters, :edit, :id => @supporter.id)
    else
      render 'supporters/new'
    end
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
      redirect url(:supporters, :edit, :id => @supporter.id)
    else
      render 'supporters/edit'
    end
  end

  post :merge do
    source = Supporter.find params['source']
    target = Supporter.find params['target']
    begin
      if source and target
        puts source.name
        puts target.name
        source.c_supporters.each do |cc|
          cc.supporter_id = target.id
          cc.save
        end
        puts source.conflicts
        source.destroy
        return "ok"
      else
        return 'no'
      end
    rescue => exc
      return exc.to_s
    end
  end

  delete :destroy, :with => :id do
    supporter = Supporter.find(params[:id])
    if supporter.destroy
      flash[:notice] = 'supporter was successfully destroyed.'
    else
      flash[:error] = 'Unable to destroy supporter!'
    end
    redirect url(:supporters, :index)
  end
end
