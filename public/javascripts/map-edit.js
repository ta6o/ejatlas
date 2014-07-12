var marker;
function initMap (mltln) {
  zoomLevel = 12;
  if (mltln == [undefined,undefined]) {
    mltln = [0,0];
    zoomLevel = 2;
  }
  map = L.map('map',{
    scrollWheelZoom:false,
  })
  var gray = L.tileLayer.provider('Esri.WorldGrayCanvas', {minZoom: 1, maxZoom: 18, }).addTo(map);
  //var terrain = L.tileLayer.provider('Esri.WorldTerrain', {minZoom: 1, maxZoom: 18, });
  var street = L.tileLayer.provider('OpenStreetMap.Mapnik', {minZoom: 1, maxZoom: 18, });
  var mapsat = L.tileLayer.provider('Esri.WorldImagery', {minZoom: 1, maxZoom: 18, });

  baseMaps = {
    "Basic": gray,
    //"Terrain": terrain,
    "Street": street,
    "Satellite": mapsat
  };
  var lControl = L.control.layers(baseMaps, {}).addTo(map);

  marker = L.marker(mltln,{
    icon: L.divIcon({className: 'map_icon i_ s_0'}),
    draggable: true,
  }).addTo(map);
  map.panTo(mltln);
  map.setZoom(zoomLevel);

  marker.on('dragend', function(event){
    var mark = event.target;
    var position = mark.getLatLng();
    updateMap(position);
  });

  return marker.getLatLng();
}

function updateMap(position) {
  map.panTo(position)
  $('#maplat').html(position.lat);
  $('#imaplat').val(position.lat);
  $('#maplon').html(position.lng);
  $('#imaplon').val(position.lng);
}
