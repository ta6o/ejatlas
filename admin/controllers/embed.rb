# coding: utf-8
Admin.controllers :embed do

  get :index do
    ca = Cached.first
    @filterform = JSON.parse(ca.filterdata)
    @filter = render "base/filter", :layout => false
    @markercount = Conflict.where(approval_status: 'approved').count
    @markerinfo = ca.conflicts_marker
    @filterinfo = ca.conflicts_json
    @vectors = VectorDatum.where(name:'Borders').select('name,url').to_json
    headers({ 'X-Frame-Options' => 'ALLOWALL' })
    render "base/embed", :layout => false
  end

end
