var markerc, info, legendpane, markerLayer, markerBounds, disclaimer, map, sat, rect, geojson, markerCount, data, conflict, zoom, pan, bounds, maxBounds, lControl, homeButton, acme, mouseX, innerWidth, dragging;
var jsons = {};
var big = 0;
var all = 0;
var loadQueue = 0;
var overlayMaps = { };
var choropleths = { };
var baselayers = { };
var dmns = [];
var hoverStyle = {
  "fillOpacity": 0.5
};
function pToLayer(obj, latlng, color) {
  point = obj["category"];
  return new L.CircleMarker(latlng, {
    radius: 4
  });
}

var rtlegend = '<div class="legend noselect"><table> <tbody><tr> <td> <div class="vis map-icon i_1"></div> </td> <td class="desc i_1">Nuclear</td> </tr> <tr> <td> <div class="vis map-icon i_2"></div> </td> <td class="desc i_2">Mineral Ores and Building Extractions</td> </tr> <tr> <td> <div class="vis map-icon i_3"></div> </td> <td class="desc i_3">Waste Management</td> </tr> <tr> <td> <div class="vis map-icon i_4"></div> </td> <td class="desc i_4">Biomass and Land Conflicts</td> </tr> <tr> <td> <div class="vis map-icon i_5"></div> </td> <td class="desc i_5">Fossil Fuels and Climate Justice</td> </tr> <tr> <td> <div class="vis map-icon i_6"></div> </td> <td class="desc i_6">Water Management</td> </tr> <tr> <td> <div class="vis map-icon i_7"></div> </td> <td class="desc i_7">Infrastructure and Built Environment</td> </tr> <tr> <td> <div class="vis map-icon i_8"></div> </td> <td class="desc i_8">Tourism Recreation</td> </tr> <tr> <td> <div class="vis map-icon i_9"></div> </td> <td class="desc i_9">Biodiversity Conservation Conflicts</td> </tr> <tr> <td> <div class="vis map-icon i_10"></div> </td> <td class="desc i_10">Industrial and Utilities Conflicts</td> </tr></tbody></table></div>';
legend = rtlegend;

Array.prototype.distinct = function(){
   var u = {}, a = [];
   for(var i = 0, l = this.length; i < l; ++i){
      if(u.hasOwnProperty(this[i])) {
         continue;
      }
      a.push(this[i]);
      u[this[i]] = 1;
   }
   return a;
}

function toTitleCase(str) {
  return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

function initMap (markers, maptitle, layers, vector, fid) {
  info = $("#infopane");
  legendpane = $("#legendpane");
  $.each(layers.split(','),function(i,e){
    if (e == "") return false;
    f = e.split('.');
    //console.log(e);
    baselayers[f[f.length-1].replace(/([A-Z]+)/g, " $1").trim()] = L.tileLayer.provider(e, {minZoom: 1, maxzoom:18});
  })

  /*if (maptitle == "") {
    rtlegend = "";
    legend = "";
  }*/

  markerLayer = L.featureGroup();
  initLayers = [];

  maxBounds = new L.LatLngBounds(new L.LatLng(90,240), new L.LatLng(-90,-240))
  bounds = maxBounds;

  if (Object.keys(baselayers).length > 0) {
    initLayers.push( baselayers[(Object.keys(baselayers)[0])]);
  }
  initLayers.push(markerLayer)
  map = L.map('map',{
    scrollWheelZoom: $('#map').css('position') == "fixed",
    worldCopyJump: true,
    //maxBounds: maxBounds,
    maxBounds: [[-83,-210],[83,210]],
    bounceAtZoomLimits: false,
    center: new L.latLng([16,26]),
    zoom: 2,
    layers: initLayers,
    zoomControl: false
  });

  $.each(vector,function(i,v){
    loadJS(v["vector_datum"]["url"])
  });

  lControl = L.control.layers(baselayers, overlayMaps).addTo(map);

  $(document).on('click','.legend .map-icon, .legend .desc',function(e){
    //console.log(e)
    id = $(e.target).attr('class').match(/i_\d+/)[0].replace('i_','');
    vis = $(this).closest('tr').find('.map-icon').hasClass('vis');
    part = $('.legend .map-icon.vis').length < $('.legend .map-icon').length
    if (e.shiftKey) {
      e.preventDefault();
      toggleLegend(id,vis);
    } else if (vis && part){
      setLegend("0");
    } else {
      setLegend(id);
    }
  });

  var zoomControl = L.control.zoom({position:'topright'});
  map.addControl(zoomControl);
  var loadingControl = L.Control.loading({
    position: 'topright',
    zoomControl: zoomControl
  });
  map.addControl(loadingControl);
  var HomeButton = L.Control.extend({
    options: { position: 'topright' }, 
    onAdd: function (map) {
      var container = L.DomUtil.create('div', 'home-button');
      L.DomEvent.addListener(container, 'click', getBack);
      return container;
    }
  });

  homeControl = new HomeButton();
  map.addControl(homeControl);
  if (L.Browser.touch) { $('home-button').addClass('leaflet-touch'); }

  $('.home-button').html('<span class="glyphicon glyphicon-home"></span>')

  oms = new OverlappingMarkerSpiderfier(map,{keepSpiderfied:true,nearbyDistance:4});
  oms.legColors.usual = "black";
  oms.legColors.highlighted = "white";

  markerCount = markers.length;
  markerc = {};
  var attrhash = {"category_id":"Category","types":"Types","other_types":"Other Types","description":"Description","country_id":"Country","province":"Province","site":"Site","accuracy_level":"Level of Accuracy","project_area":"Project Area","project_length":"Project Length","population_type":"Type of Population","products":"Commodities","other_products":"Other Commodities","companies":"Companies","supporters":"IFI's","other_supporters":"Other IFI's","ejos":"EJO's","govt_actors":"Government Actors","mobilizing_groups":"Mobilizing Groups","other_mobilizing_groups":"Other Mobilizing Groups","mobilizing_forms":"Mobilizing Forms","other_mobilizing_forms":"Other Mobilizing Forms","env_impacts":"Environmental Impacts","other_env_impacts":"Other Environmental Impacts","hlt_impacts":"Health Impacts","other_hlt_impacts":"Other Health Impacts","sec_impacts":"Socio-economic Impacts","other_sec_impacts":"Other Socio-economic Impacts","conflict_events":"Outcomes","other_outcomes":"Other Outcomes","project_details":"Project Details","investment_string":"Level of Investment","affected_people":"Potentially Affected Population","status_id":"Intensity Level","reaction_id":"Reactionary Stage","start_date":"Start Date","end_date":"End Date","project_status_id":"Project Status","suggested_alternatives":"Development of Alternatives","success_level":"Succes Level","success_reason":"Success Reason","other_comments":"Other Comments"};
  $.each(markers, function(i,m){
    mark = m;//JSON.parse(m);
    if (!mark.lat || !mark.lon) {
      console.log(mark);
      return false
    }
    popcontent = "<h4 class='maplink'><a href='/conflict/"+mark.slug+"'>"+mark.name + "</a></h4><table style='padding:24px 16px;'><tr><td style='width:36px'><div class='map-icon i_"+mark.clr+" s_1' style='margin:0 !important;'></div><td>";
    if (mark.cat !== '' ) {popcontent += "<strong>"+mark.cat+"</strong>"};
    popcontent += '</td></tr></table>';
    if ('dmn' in mark) {
      dmns.push(mark.dmn[0])
      popcontent += "<div class='features'>";
      $.each(Object.keys(mark),function(i,n){
        if (isNaN(n[0])) return 0
        id = parseInt(n.split(':')[0]);
        if (id == fid && mark[n]) {
          if (Object.keys(attrhash).indexOf(n.split(':')[1]) >= 0){
            popcontent += '<br /><strong>'+attrhash[n.split(':')[1]].replace(/\sId$/,'')+':</strong> ';
          } else {
            popcontent += '<br /><strong>'+toTitleCase(n.split(':')[1].replace(/_/g,' '))+':</strong> ';
          }
          popcontent += mark[n];
        }
      })
      popcontent += "<br /><br />"
      $.each(mark.tags,function(i,n){
        popcontent += "<span class='badge' style='background-color:#"+mark.dmn[i]+"'>"+n+"</span> &nbsp; "
      })
      popcontent += "</div>";
    }
    popcontent += '</div>';
    if ('dmn' in mark) {
      var marker = L.marker([mark.lat, mark.lon],{
        icon: L.divIcon({
            className: 'map_icon mic i_'+mark.clr+' id_'+mark.id+' c_'+mark.dmn[0],
          }),
        riseOnHover: true,
      }).addTo(markerLayer);
    } else {
      var marker = L.marker([mark.lat, mark.lon],{
        icon: L.divIcon({
            className: 'map_icon mic i_'+mark.clr+' id_'+mark.id,
          }),
        riseOnHover: true,
      }).addTo(markerLayer);
    }
    marker.id = mark.id;
    marker.name = mark.name;
    marker.slug = mark.slug;
    marker.cslg = mark.cslg;
    marker.content = popcontent;
    marker.on('mouseover', function(e){updateInfo(1,marker.content)});
    //marker.on('mouseout', function(e){updateInfo(1,disclaimer)});
    if (window.location.pathname === "/embed") {
      marker.on('click', function(e){window.open("http://ejatlas.org/conflict/"+marker.slug,"_blank")});
    } else {
      marker.on('click', function(e){window.location="/conflict/"+marker.slug});
    }
    markerc[mark.id] = marker;
    oms.addMarker(marker);

    if (mark.val) {
      big ++;
    }
    all ++;
  });
  /*map.on('drag', function(e) { 
    b = map.getBounds();
    e = e || window.event;
    if (maxBounds.contains(b)) {
      bounds = b;
    } else {
      map.fitBounds(bounds);
      if (e.stopPropagation) {
        e.stopPropagation();
      }
      else {
        e.cancelBubble = true;
      }
    }
  });*/

  map.on('zoomend', function(e) { markerSize(); });

  $("#map").on("change","input.leaflet-control-layers-selector[type='checkbox']", function (e) {
    if ($(this).prop('checked')) {
      name = $(this).next('span').text().replace(/^\s+/,'')
      if (choropleths[name] != undefined) {
        $.each(Object.keys(choropleths),function(i,n){
          if (name != n && map.hasLayer(overlayMaps[n])) {
            map.removeLayer(overlayMaps[n]);
          }
          if (name == n && !map.hasLayer(overlayMaps[n])) {
            map.addLayer(overlayMaps[n]);
          }
        });
      }
    }
  });

  $('.resize').on('mousedown',function(e){
    e.preventDefault();
    mouseX = e.pageX;
    dragging = true;
    $(".rightpane .inner").css('display','block');
    if ($('.resize span').hasClass('glyphicon-chevron-left')) {
      if (localStorage.key('mapWidth')) { perc = localStorage['mapWidth'] } else { perc = 70 }
      $('.rightpane .inner').show();
      $('.leftpane').animate({'width':perc+"%"});
      $('.rightpane').animate({'width':(100-perc)+'%'});
      $('.resize').animate({'left':perc+"%"},function(){
        $('.rightpane').css('overflow-x','hidden');
        $('.rightpane').css('overflow-y','auto');
        $('.resize span').removeClass('glyphicon-chevron-left');
        $('.resize span').addClass('glyphicon-chevron-right');
        $('.resize span').css('cursor','e-resize');
        map.invalidateSize();
      });
    }
    $('body').bind('mousemove',function(e){
      px = Math.max(Math.min(Math.max(e.pageX,500),window.innerWidth - 480),500);
      $(".leftpane").css('width',px+'px')
      $("#rightpane").css('width',(window.innerWidth-px)+'px')
      $("#resize").css('left',(px)+'px')
    });
  });
  $('.resize span').on('mouseup',function(e){
    dragEnd();
  });
  $('body').on('mouseleave',function(e){
    if (dragging) { dragEnd(); }
  });
  $('body').on('mouseup',function(e){
    if (dragging) { dragEnd(); }
  });

  $('.resize span').on('click',function(e){
    if ($(this).hasClass('glyphicon-chevron-right')) {
      $('.leftpane').animate({'width':window.innerWidth - 16});
      $('.rightpane').animate({'width':'16px'});
      $('.resize').animate({'left':window.innerWidth - 16},function(){
        $('.rightpane .inner').hide();
        $('.resize span').removeClass('glyphicon-chevron-right');
        $('.resize span').addClass('glyphicon-chevron-left');
        $('.resize span').css('cursor','w-resize');
        map.invalidateSize();
      });
    } else {
      if (localStorage.key('mapWidth')) { perc = localStorage['mapWidth'] } else { perc = 70 }
      $('.rightpane .inner').show();
      $('.leftpane').animate({'width':perc+"%"});
      $('.rightpane').animate({'width':(100-perc)+'%'});
      $('.resize').animate({'left':perc+"%"},function(){
        $('.rightpane').css('overflow-x','hidden');
        $('.rightpane').css('overflow-y','auto');
        $('.resize span').removeClass('glyphicon-chevron-left');
        $('.resize span').addClass('glyphicon-chevron-right');
        $('.resize span').css('cursor','e-resize');
        map.invalidateSize();
      });
    }
  })

  $('.rightpane').on('click','.horipane .title',function(e){
    if($(this).hasClass('active')){
      $(this).next('.content').slideUp();
      $(this).removeClass('active');
    } else {
      $(this).next('.content').slideDown();
      $(this).addClass('active');
      if ($(this).next('.content').find('.columns').length > 0) resetColumns();
    }
  });

  $('#conflict_summary').on('click','.seemore',function(e){
    e.preventDefault();
    more = $(this).next('.more');
    $(this).fadeOut(100,function(){more.slideDown();});
  });

  $('#conflict_summary').on('click','.seeless',function(e){
    e.preventDefault();
    more = $(this).parent().prev('.seemore');
    $(this).parent().slideUp(function(){more.slideDown();});
  });
  
  window.onresize = onResize; 

  $(document).ready(function(){
    onResize();
    dmns = dmns.distinct();
    if (dmns.length > 0) {
      $.each(dmns,function(i,n){
        $(".c_"+n).css("border","4px solid #"+n);
      })
    }

    $.each(markerc,function(k,v){
      m = $(".id_"+k);
      m.attr('src',"/")
    })
  });

  updateInfo(1,disclaimer);
  markerSize();
}

function onResize() {
  if ($('#map').css('position')=='fixed'){
    map.scrollWheelZoom.enable();
    $('#map').css('height','100%');
    px = Math.max(Math.min(Math.max(parseInt($('#resize').css('left')),500),window.innerWidth - 480),500);
    $("#map").css('width',px+'px');
    $("#rightpane").css('width',(window.innerWidth-px)+'px');
    $("#resize").css('left',px+'px');
  } else {
    map.scrollWheelZoom.disable();
    $('#map').css('height',(window.innerHeight-96)+'px');
    $('.leftpane').css('width','auto');
    $(".rightpane").css('width','auto');
    if ($('body').css('font-size') =='12px'){
      $('.ejatlas-logo, .tagline').bind('click', function(){window.location = "/"});
      $('#map').css('height',(window.innerHeight-108)+'px');
    } else { $('.ejatlas-logo, .tagline').unbind('click'); }
  }
  if ($('#carousel_container').length > 0){resetCarousel();}
  resetColumns();
  dragEnd();
}

function dragEnd() {
  $('body').unbind('mousemove');
  dragging = false;
  if ($('#carousel_container').length > 0){resetCarousel();}
  map.invalidateSize();
  if (parseInt($('#resize').css("left")) > window.innerWidth - 16) $('#resize').css("left", window.innerWidth - 16)
  mapWidth = document.getElementById('map').style.width
  if (mapWidth.match(/px$/)) {
    mapWidth = Math.ceil(parseInt(mapWidth.replace(/px$/,'')) / window.innerWidth * 100);
  } else {
    mapWidth = parseInt(mapWidth.replace("%",""));
  }
  localStorage['mapWidth'] = mapWidth;
  resetColumns();
}

function mapFit(){
  markerBounds = markerLayer.getBounds();
  //console.log(markerBounds)
  if (markerBounds.getSouthWest() == undefined) {
    map.setView([16,26],2);
  } else {
    map.fitBounds(markerBounds);
  }
}

function markerSize() {
  if (conflict) {
    $('.map_icon').removeClass('mic').removeClass('min');
    return
  }
  if (markerCount > 100) {
    $('.map_icon').addClass('mic').removeClass('min');
  } else if (markerCount > 10) {
    $('.map_icon').removeClass('mic').addClass('min');
  } else {
    $('.map_icon').removeClass('mic').removeClass('min');
  }
  if (map.getZoom() > 3) {
    $('.map_icon').removeClass('mic').addClass('min');
  } else {
    $('.map_icon').addClass('mic').removeClass('min');
  }
  if (map.getZoom() > 9) {
    $('.map_icon').removeClass('min');
  } else {
    $('.map_icon').addClass('min');
  }
}

function borderStyle(feature) {
  return {
    fillColor: 'white',
    //fillColor: getColor(dense),
    weight: 1,
    opacity: 1,
    color: 'black',
    fillOpacity: .6
  };
}

function updateInfo (type, content) {
  if (disclaimer == undefined) disclaimer = content;
  info.show();
  if (type == 0 || type == undefined) {
    legendpane.html(legend);
  } else {
    info.html(content);
    legendpane.html(legend);
  }
};

function getInfo(id,name,p,z,upd) {
  conflict = true;
  zoom = z;
  marker = markerc[id]
  pan = marker.getLatLng();
  updateInfo(1,marker.content);
  map.setView(pan,zoom);
  if (upd) {
    $.getJSON('/table/'+id, function(dat){
      //console.log(dat)
      data = dat;//JSON.parse(dat);
      $('#disclaimer').hide();
      $('#name').html(name);
      $('#conflict_summary').html(data["table"]);
      $('#commands').show();
      $('#conflict_summary').show();
      $('#name').show();
      $('.loading').hide();
    });
  }
}

function getBack() {
  updateInfo(1,disclaimer);
  $('#name').html('');
  $('#name').hide();
  $('#disclaimer').show();
  $('#commands').fadeOut();
  $('.leaflet-marker-icon').show();
  if (conflict) {
    map.setView(pan,zoom);
  } else {
    $('#conflict_summary').hide();
    map.fitBounds(markerBounds);
  }
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
  if (parseInt(id) > 0) {
    ours = $('.legend .map-icon.i_'+id);
    mics = $('.leaflet-marker-icon.i_'+id);
    $('.legend .map-icon').addClass('hid').removeClass('vis');
    $('.leaflet-marker-icon').hide();
    ours.addClass('vis').removeClass('hid');
    mics.show();
  } else {
    ours = $('.legend .map-icon');
    mics = $('.leaflet-marker-icon');
    ours.removeClass('hid').addClass('vis');
    mics.show();
  }
}

function choropleth(varname) {
  vectorPing(varname)
}

function style(feature) {
  if (feature.pn) {
    chname = feature.pn;
    category = feature.category;
  } else if (feature.properties.pn) {
    chname = feature.properties.pn;
    category = feature.properties.category;
  }
  if (category) {
    dense = choropleths[chname][category]['color'];
  } else {
    keys = Object.keys(choropleths[chname])
    cat = keys[keys.length-1]
    dense = choropleths[chname][cat]['color'];
  }
  dense = dense.replace(/^#/,'');
  return {
    fillColor: "#"+dense,
    weight: 1,
    opacity: 1,
    color: 'white',
    fillOpacity: 0.6
  };
}

function highlightFeature(e) {
  var layer = e.target;
  pn = layer.feature.category
  inf = "<div class='infocontent'><h3><strong>"+pn+"</strong></h3>"
  if (jsons[pn]['legend']){ inf += jsons[pn].legend.replace("class=\"legend\"","class=\"legend static\""); inf += "<br />" }
  if (jsons[pn]['desc']){ inf += "<p><strong>"+jsons[pn]['desc']+"</strong></p>" }
  ia = []
  if (layer.feature.properties && layer.feature.properties.data) {
    $.each(layer.feature.properties.data,function(k,v){
      if (v) {
        ia.push("<strong>"+k.replace(/^feature_/,"").replace(/_/g," ").replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1)})+":</strong> "+v);
      }
    });
  }
  inf += ia.join("<br />");
  if (jsons[pn]['source']){ 
    inf += "<br /><br /><p>Source: &nbsp; <strong>"+jsons[pn]['source']+"</strong>" ;
    if (jsons[pn]['link']){ inf += " &nbsp; <a href='"+jsons[pn]['link']+"' target='_blank'>"+jsons[pn]['link']+"</a>"; }
    inf += "</p>";
  }
  inf += "</div>"
  updateInfo(2,inf);
  layer.setStyle({
    fillOpacity: 1
  });

  if (!L.Browser.ie && !L.Browser.opera) {
      layer.bringToFront();
  }
}

function resetHighlight(e) {
  var layer = e.target;
  if (Object.keys(choropleths).indexOf(layer.feature.category) >= 0) {
    layer.setStyle(style(layer.feature));
  } else {
    layer.setStyle(jsons[layer.feature.category]['style']);
  }
  if (!L.Browser.ie && !L.Browser.opera) {
    layer.bringToFront();
  }
}

function zoomToFeature(e) {
  map.fitBounds(e.target.getBounds());
}

function onEachFeature(feature, layer) {
  layer.on({
    mouseover:highlightFeature,
    mouseout: resetHighlight,
    dblclick: zoomToFeature,
  });
}

function showVector(v) {
  if (v.features[0].pn) {
    pn = v.features[0].pn;
  } else if (v.features[0].properties.pn) {
    pn = v.features[0].properties.pn;
  } else {
    console.log('fail - no pn');
    return 0
  }
  vect = $.grep(vectorinfo,function(i,n){return i.vector_datum.name == pn});
  if(vect.length == 0) {
    console.log('fail - no vect');
    return 0
  }
  vect = vect[0].vector_datum;
  if(vect['url']==="") {
    console.log('fail - no url');
    return 0
  }
  vr = toSlug(vect['url']);
  ly = eval(vr);
  if (vect['choropleth'] == null || vect['choropleth'] === "") {
    if (vect["style"] && vect["style"].length > 0) {
      lStyle = JSON.parse(vect["style"])
    } else {
      lStyle = vectorStyles[tl];
      if (!lStyle) {
        lStyle = {
          "color": "#06c",
          "fillcolor": "#06c",
          "weight": 1,
          "opacity": 1,
          "fillOpacity": 0.4
        }
      }
    }
    tl = vect["name"]
    jsons[tl] = ly;
    jsons[tl]['style'] = lStyle;
    overlayMaps[tl] = L.geoJson(ly['features'],{style: lStyle, pointToLayer: pToLayer, onEachFeature:onEachFeature});
  } else {
    tl = vect['name']
    jsons[tl] = ly;
    choropleths[tl] = JSON.parse(vect['choropleth'])
    leg = '<div class="legend"><table> <tbody>';
    $.each(choropleths[tl],function(k,v){
      leg += '<tr> <td> <div class="chlegend" style="background-color:#'+v['color'].replace(/^#/,'')+'"></div> </td> <td class="chdesc">'+v['legend']+'</td> </tr>';
    });
    leg += '</tr></tbody></table></div>';
    jsons[tl]['legend'] = leg;
    overlayMaps[tl] = L.geoJson(ly['features'],{style: style, pointToLayer: pToLayer, onEachFeature:onEachFeature});
  }
  $.each(ly["features"],function(index,feature){
    feature["category"] = tl;
    feature["name"] = vr;
  });
  jsons[tl]['desc'] = vect['description']
  jsons[tl]['source'] = vect['source']
  jsons[tl]['link'] = vect['link']
  if (vect["shown"] == '1') { overlayMaps[tl].addTo(map);}
  lControl.addOverlay(overlayMaps[tl],tl)
}

function getObjectSize(obj) {
  var size = 0, key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) size++;
  }
  return size; // return the size of the object
}

function vectorPing(varname) {
  loadQueue -= 1;
  if (varname.features[0].pn) {
    pn = varname.features[0].pn;
  } else if (varname.features[0].properties.pn) {
    pn = varname.features[0].properties.pn;
  }
  //console.log(loadQueue+' '+varname['features'][0]['pn'])
  showVector(varname);
  if (loadQueue == 0) {
    //console.log('all vectors loaded');
    $('leaflet-control-loading').hide();
  }
}

function loadJS(filename){
  if (/(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/.test(filename)) {
    loadQueue += 1;
    var fileref = document.createElement('script')
    fileref.setAttribute("type","text/javascript")
    fileref.setAttribute("src", filename)
    document.getElementsByTagName("head")[0].appendChild(fileref)
    $('leaflet-control-loading').show();
  }
}

function pausecomp(millis) {
  var date = new Date();
  var curDate = null;
  do { curDate = new Date(); }
  while(curDate-date < millis);
}
function toTitleCase(str) {
  return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

function render(){
  leafletImage(map, function(err, canvas) {
      var dataURL = canvas.toDataURL("image/png");
      typeof dataURL
      $.post('/image',{image: dataURL},function(data){
        console.log(data);
      });
  });
}

function toSlug(url) {
  arr = url.split('/');
  return ascii(arr[arr.length-1].split('.')[0].toLowerCase().replace(/-+/g,' ').replace(/^\d+/,'').replace(/\s+/g,'_'));
}

