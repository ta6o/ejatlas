var marker, map;
var bases = [ "OpenStreetMap.Mapnik", "OpenStreetMap.BlackAndWhite", "OpenStreetMap.DE", "OpenStreetMap.HOT", "Thunderforest.OpenCycleMap", "Thunderforest.Transport", "Thunderforest.Landscape", "Thunderforest.Outdoors", "OpenMapSurfer.Roads", "OpenMapSurfer.Grayscale", "Hydda.Full", "Hydda.Base", "MapQuestOpen.OSM", "MapQuestOpen.Aerial", "Stamen.Toner", "Stamen.TonerBackground", "Stamen.TonerLite", "Stamen.Terrain", "Stamen.TerrainBackground", "Stamen.Watercolor", "Esri.WorldStreetMap", "Esri.DeLorme", "Esri.WorldTopoMap", "Esri.WorldImagery", "Esri.WorldTerrain", "Esri.WorldShadedRelief", "Esri.WorldPhysical", "Esri.OceanBasemap", "Esri.NatGeoWorldMap", "Esri.WorldGrayCanvas", "HERE.normalDay", "HERE.normalDayCustom", "HERE.normalDayGrey", "HERE.normalDayMobile", "HERE.normalDayGreyMobile", "HERE.normalDayTransit", "HERE.normalDayTransitMobile", "HERE.normalNight", "HERE.normalNightMobile", "HERE.normalNightGrey", "HERE.normalNightGreyMobile", "HERE.carnavDayGrey", "HERE.hybridDay", "HERE.hybridDayMobile", "HERE.pedestrianDay", "HERE.pedestrianNight", "HERE.satelliteDay", "HERE.terrainDay", "HERE.terrainDayMobile", "Acetate.basemap", "Acetate.terrain", "Acetate.all", "Acetate.hillshading", "FreeMapSK", "MtbMap", "OpenMapSurfer.AdminBounds", "Hydda.RoadsAndLabels", "Stamen.TonerHybrid", "Stamen.TonerLines", "Stamen.TonerLabels", "OpenWeatherMap.Clouds", "OpenWeatherMap.CloudsClassic", "OpenWeatherMap.Precipitation", "OpenWeatherMap.PrecipitationClassic", "OpenWeatherMap.Rain", "OpenWeatherMap.RainClassic", "OpenWeatherMap.Pressure", "OpenWeatherMap.PressureContour", "OpenWeatherMap.Wind", "OpenWeatherMap.Temperature", "OpenWeatherMap.Snow", "Acetate.foreground", "Acetate.roads", "Acetate.labels"];
var blayers = { }

function initMap (mltln,google) {
  //console.log(google)

  if (google) {
    blayers = {
      "Google Satellite": new L.Google(),
      "Google Street": new L.Google('STREET'),
      "Google Terrain": new L.Google('TERRAIN'),
    }
  }
  zoomLevel = 12;
  map = L.map('map');

  $.each(bases,function(i,n){
    if (i > 5) { return 0}
    blayers[n] = L.tileLayer.provider(n, {minZoom: 1, maxzoom:18});
  })
  map.addLayer(Object.values(blayers)[0])

  var lControl = L.control.layers(blayers,{}).addTo(map);

  if (mltln[0] == 0 && mltln[1] == 0) {
    //$.getJSON('https://telize.com/geoip/',function(data,error){
      //ll = new L.latLng(data['latitude'],data['longitude']);
      //map.setView(ll,zoomLevel);
      ll = new L.latLng(0,0);
      map.setView(ll,3);
      marker = L.marker(ll,{
        icon: L.divIcon({className: 'map_icon i_ s_0'}),
        draggable: true,
      }).addTo(map);
      marker.on('dragend', function(event){
        var mark = event.target;
        var position = mark.getLatLng();
        updateMap(position);
      });
      updateMap(ll);
      return ll;
    //});
  } else {
    map.setView(mltln,zoomLevel);
    marker = L.marker(mltln,{
      icon: L.divIcon({className: 'map_icon i_ s_0'}),
      draggable: true,
    }).addTo(map);
    marker.on('dragend', function(event){
      var mark = event.target;
      var position = mark.getLatLng();
      updateMap(position);
    });
    updateMap(mltln);
    return mltln;
  }
}

function updateMap(position) {
  position = new L.latLng(position);
  map.panTo(position)
  $('#maplat').html(position.lat);
  $('#imaplat').attr('value',position.lat);
  $('#maplon').html(position.lng);
  $('#imaplon').attr('value',position.lng);
}
