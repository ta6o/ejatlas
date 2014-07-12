Admin.controllers :requests do

  def self.protect_u(protected)
    condition do
      return redirect to '/' if current_account.nil? 
      redirect to '/' unless ['admin','editor','user'].include? current_account.role
    end if protected
  end

  get :index, :protect_u => true do
    @requested = current_account.requesteds
    @asked_for = current_account.asked_fors
    render 'requests/index'
  end

  get :accept, :with => :id, :protect_u => true do
    r = Request.find_by_id params[:id]
    if current_account.asked_fors.include? r
      v = r.version
      @id = params[:id]
      @requester = r.requester
      @table = v.as_table :request=>true
      render 'requests/accept'
    else
      redirect to '/requests'
    end
  end

  post :accept do
    req = Request.find params[:req_id]
    if current_account.asked_fors.include? req
      req.accepted = true
      if req.save
        Admin.accept_request req
      end
      redirect to '/requests'
    else
      redirect to '/'
    end
  end

  get :reject, :with => :id, :protect_u => true do
    r = Request.find_by_id params[:id]
    if current_account.asked_fors.include? r
      v = r.version
      @id = params[:id]
      @requester = r.requester
      render 'requests/reject'
    else
      redirect to '/'
    end
  end

  post :reject do
    req = Request.find params[:req_id]
    if current_account.asked_fors.include? req
      req.rejected = true
      req.rejection_note = params[:rejection_note]
      req.save
      if req.save
        Admin.reject_request req
      end
      redirect to '/requests'
    else
      redirect to '/'
    end
  end

end
