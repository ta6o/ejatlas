var markerc, info, markerLayer, markerBounds, disclaimer, map, sat, rect, geojson;
var big = 0;
var all = 0;

var legend = '<div class="legend"><table> <tbody><tr> <td> <div class="vis map-icon min i_1 s_1"></div> </td> <td class="desc">Nuclear</td> </tr> <tr> <td> <div class="vis map-icon min i_2 s_1"></div> </td> <td class="desc">Mineral Ores and Building Extractions</td> </tr> <tr> <td> <div class="vis map-icon min i_3 s_1"></div> </td> <td class="desc">Waste Management</td> </tr> <tr> <td> <div class="vis map-icon min i_4 s_1"></div> </td> <td class="desc">Biomass and Land Conflicts</td> </tr> <tr> <td> <div class="vis map-icon min i_5 s_1"></div> </td> <td class="desc">Fossil Fuels and Climate Justice</td> </tr> <tr> <td> <div class="vis map-icon min i_6 s_1"></div> </td> <td class="desc">Water Management</td> </tr> <tr> <td> <div class="vis map-icon min i_7 s_1"></div> </td> <td class="desc">Infrastructure and Built Environment</td> </tr> <tr> <td> <div class="vis map-icon min i_8 s_1"></div> </td> <td class="desc">Tourism Recreation</td> </tr> <tr> <td> <div class="vis map-icon min i_9 s_1"></div> </td> <td class="desc">Biodiversity Conservation Conflicts</td> </tr> <tr> <td> <div class="vis map-icon min i_10 s_1"></div> </td> <td class="desc">Industrial and Utilities Conflicts</td> </tr></tbody></table></div>';


function initMap (markers) {

  info = $("#infopane");
  var popdns = new L.TileLayer.WMS("http://sedac.ciesin.columbia.edu/geoserver/gwc/service/wms", { layers: 'grump-v1-population-density_2000', transparent: true });
  var popcnt = new L.TileLayer.WMS("http://sedac.ciesin.columbia.edu/geoserver/gwc/service/wms", { layers: 'grump-v1-population-count_2000', transparent: true });
  var urban = new L.TileLayer.WMS("http://sedac.ciesin.columbia.edu/geoserver/gwc/service/wms", { layers: 'grump-v1-urban-extents', transparent: true });

  var tile = L.tileLayer('http://{s}.tile.cloudmade.com/a9c9a15704c24272a445317dc44a41c2/32994/256/{z}/{x}/{y}.png', { attribution: '' });
  var tile = L.tileLayer('http://{s}.tile.cloudmade.com/a9c9a15704c24272a445317dc44a41c2/77922/256/{z}/{x}/{y}.png', { attribution: '' });

  var grazingland = L.tileLayer('/overlay/grazingland/{z}/{x}/{y}.png', {
    attribution: '',
    opacity: 1,
    tms: true
  });

  var mining = L.tileLayer('/overlay/mining/{z}/{x}/{y}.png', {
    attribution: '',
    opacity: 1,
    tms: true
  });

  map = L.map('map',{
    scrollWheelZoom:false,
    zoom: 1,
    layers: [tile]
  });

  var baseMaps = {
  
  };
  var overlayMaps = {
    "Grazing Land": grazingland,
    "Mining": mining,
    "Population Density": popdns,
    "Polupation Count": popcnt,
    "Urban Extents": urban
  };
  L.control.layers(baseMaps, overlayMaps).addTo(map);

  maxBounds = new L.LatLngBounds(new L.LatLng(90,240), new L.LatLng(-90,-240))
  map.setMaxBounds(maxBounds);
  map.setView([27,10], 2);

  $(document).on('click','.legend .map-icon',function(e){
    //console.log(e)
    id = $(e.target).attr('class').match(/i_\d+/)[0].replace('i_','');
    if (e.shiftKey) {
      vis = $(e.target).hasClass('vis');
      toggleLegend(id,vis);
    } else {
      setLegend(id);
    }
  });

  var HomeButton = L.Control.extend({
      options: { position: 'topleft' }, 
      onAdd: function (map) {
          var container = L.DomUtil.create('div', 'home-button');
          L.DomEvent.addListener(container, 'click', getBack);
          return container;
      }
  });
  map.addControl(new HomeButton());
  $('.home-button').html('<span class="glyphicon glyphicon-home"></span>')

  $.each(markers, function(i,m){
    mark = JSON.parse(m);
    popcontent = "<div class='loading'><img src='/images/loading.gif'></div><h4 class='maplink'><a onclick=\"getInfo("+mark.id+",'"+mark.name+"')\">"+mark.name + "</a></h4><div class='clearfix' style='padding:24px 16px;'><div class='map-icon i_"+mark.clr+" s_1 pull-left'></div><div class='pull-left' style='position:relative;top:-20px;left:12px;width:210px;'>";
    if (mark.cat !== '' ) {popcontent += "<strong>"+mark.cat+"</strong>"};
    if (mark.start !== '' ) {popcontent += "<br /><small><strong>Start date:</strong> "+mark.start+"</small>"};
    popcontent += '</div></div>';
    var marker = L.marker([mark.lat, mark.lon],{
      icon: L.divIcon({className: 'map_icon min i_'+mark.clr+' s_'+mark.val}),
      riseOnHover: true,
    }).addTo(map);
    marker.id = mark.id;
    marker.name = mark.name;
    marker.content = popcontent;
    marker.on('mouseover', function(e){updateInfo(1,marker.content)});
    marker.on('click', function(e){getInfo(marker.id, marker.name);});
    if (mark.val) {
      big ++;
    }
    all ++;
    console.log(mark.lon)
    console.log(mark.lat)
    console.log(" ")
  });
  disclaimer = "<h4 class='maplink'>Environmental Justice Atlas</h4><p>"+all+" conflicts are documented so far.</p>"
  map.on('zoomend', function() {
    if (map.getZoom() > 7) {
      $('.map_icon').removeClass('min');
    } else {
      $('.map_icon').addClass('min');
    }
  });
  updateInfo(1,disclaimer);
}
function updateInfo (type, content) {
  //console.log(content);
  info.show();
  if (type==0 || type==undefined) {
    info.html(legend);
  } else if (type == 1) {
    info.html(content+legend);
  }
};

function getInfo(id,name) {
  $('.loading').show();
  $.get('table/'+id, function(data){
    $('#disclaimer').hide();
    $('#name').html(name);
    $('#conflict_summary').html(data);
    $('#print').attr('href','/conflicts/print/'+id);
    if (clear) { 
      $('#edit').attr('href','/conflicts/edit/'+id);
    };
    if (clearuser) {
      $('#details').attr('href','/conflicts/details/'+id);
    };
    $('#commands').show();
    $('#conflict_summary').show();
    window.history.pushState(name, name, data["slug"]);
    document.title = name+" | EJAtlas";
    $('.loading').hide();
    $('#name').show();
  });
}

function getBack() {
  updateInfo(1,disclaimer);
  $('#name').html('');
  $('#disclaimer').show();
  $('#conflict_summary').hide();
  $('#commands').fadeOut();
  $('.leaflet-marker-icon').show();
  map.setView([27,10], 2);
}

function toggleLegend(id,vis) {
  ours = $('.legend .map-icon.i_'+id);
  mics = $('.leaflet-marker-icon.i_'+id);
  if (vis) {
    ours.addClass('hid').removeClass('vis');
    mics.hide();
  } else {
    ours.addClass('vis').removeClass('hid');
    mics.show();
  }
}

function setLegend(id) {
  ours = $('.legend .map-icon.i_'+id);
  mics = $('.leaflet-marker-icon.i_'+id);
  $('.legend .map-icon').addClass('hid').removeClass('vis');
  $('.leaflet-marker-icon').hide();
  ours.addClass('vis').removeClass('hid');
  mics.show();
}

