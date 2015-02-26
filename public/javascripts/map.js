var markerc, info, legendpane, markerLayer, markerBounds, disclaimer, map, sat, rect, geojson, markerCount, data, conflict, zoom, pan, bounds, maxBounds, lControl, homeButton, acme, mouseX, innerWidth, dragging, choro_last, $attrSlide;
var jsons = {};
var checkingTile = false;
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

var rtlegend = '<table> <tbody><tr> <td class="icon"> <div class="vis map-icon i_1"></div> </td> <td class="desc i_1">Nuclear</td> </tr> <tr> <td class="icon"> <div class="vis map-icon i_2"></div> </td> <td class="desc i_2">Mineral Ores and Building Extractions</td> </tr> <tr> <td class="icon"> <div class="vis map-icon i_3"></div> </td> <td class="desc i_3">Waste Management</td> </tr> <tr> <td class="icon"> <div class="vis map-icon i_4"></div> </td> <td class="desc i_4">Biomass and Land Conflicts</td> </tr> <tr> <td class="icon"> <div class="vis map-icon i_5"></div> </td> <td class="desc i_5">Fossil Fuels and Climate Justice</td> </tr> <tr> <td class="icon"> <div class="vis map-icon i_6"></div> </td> <td class="desc i_6">Water Management</td> </tr> <tr> <td class="icon"> <div class="vis map-icon i_7"></div> </td> <td class="desc i_7">Infrastructure and Built Environment</td> </tr> <tr> <td class="icon"> <div class="vis map-icon i_8"></div> </td> <td class="desc i_8">Tourism Recreation</td> </tr> <tr> <td class="icon"> <div class="vis map-icon i_9"></div> </td> <td class="desc i_9">Biodiversity Conservation Conflicts</td> </tr> <tr> <td class="icon"> <div class="vis map-icon i_10"></div> </td> <td class="desc i_10">Industrial and Utilities Conflicts</td> </tr></tbody></table>';
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

function initMap () {
  info = $("#infopane");
  legendpane = $("#legendpane .legend");
  $.each(layers.split(','),function(i,e){
    if (e == "") return false;
    f = e.split('.');
    baselayers[f[f.length-1].replace(/([A-Z]+)/g, " $1").trim()] = L.tileLayer.provider(e, {minZoom: 1, maxzoom:18});
  })

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
    minZoom: 2,
    layers: initLayers,
    zoomControl: false
  });

  $.each(vectorinfo,function(i,v){
    loadJS(v["vector_datum"]["url"])
  });

  if (Object.keys(baselayers).length > 1){ 
    lControl = L.control.layers(baselayers, overlayMaps).addTo(map); 
  }

  if (Object.keys(baselayers).indexOf('World Imagery') >= 0){ 
    baselayers['World Imagery'].on('tileload',function(tile,url){
      if (!checkingTile) {
        checkingTile = true;
        /*
        var req;
        req = $.ajax({
          type: "HEAD",
          url: tile.url,
          success: function() {
            console.log(req);
            console.log(req.getAllResponseHeaders());
            setTimeout(function(){checkingTile = false},1000);
          }
        });
        */
      } 
    });
  }

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

  $(document).on('click','.vectorlegend .overlays tr',function(e){
    box = $(this).find('input');
    name = $(this).find('td:last').text();
    hit = e.target == box[0];
    chk = box.prop('checked');
    if ((chk && !hit) || (!chk && hit)) {
      box.prop('checked',false);
      map.removeLayer(overlayMaps[name]);
    } else if ((chk && hit) || (!chk && !hit)){
      box.prop('checked',true);
      map.addLayer(overlayMaps[name]);
    }
  });

  $(document).on('click','.vectorlegend .choropleths tr',function(e){
    box = $(this).find('input');
    name = $(this).find('td:last').text();
    hit = e.target == box[0];
    chk = box.prop('checked');
    if (chk && !hit) {
      box.prop('checked',false);
      map.removeLayer(overlayMaps[name]);
    } else if ((chk && hit) || (!chk && !hit)){
      if (box.attr('id') == choro_last && hit) {
        box.prop('checked',false);
        map.removeLayer(overlayMaps[name]);
      } else {
        $('.vectorlegend .choropleths .input').prop('checked',false)
        box.prop('checked',true);
        if (map.hasLayer(overlayMaps['Country Data'])) {
          map.removeLayer(overlayMaps['Country Data']);
          $('.vectorlegend .overlays input#checkbox_country_data').prop('checked',false);
        }
        $.each(Object.keys(choropleths),function(i,n){
          if (map.hasLayer(overlayMaps[n])) {
            map.removeLayer(overlayMaps[n]);
          }
        });
        map.addLayer(overlayMaps[name]);
      }
    }
    choro_last = box.attr('id');
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

  //oms = new OverlappingMarkerSpiderfier(map,{keepSpiderfied:true,nearbyDistance:4});
  //oms.legColors.usual = "black";
  //oms.legColors.highlighted = "white";

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
    if ($('.resize span').hasClass('glyphicon-backward')) {
      if (localStorage.key('mapWidth')) { perc = localStorage['mapWidth'] } else { perc = 70 }
      $('.rightpane .inner').show();
      $('.leftpane').animate({'width':perc+"%"});
      $('.rightpane').animate({'width':(100-perc)+'%'});
      $('.resize').animate({'left':perc+"%"},function(){
        $('.rightpane').css('overflow-x','hidden');
        $('.rightpane').css('overflow-y','auto');
        $('.resize span').removeClass('glyphicon-backward');
        $('.resize span').addClass('glyphicon-forward');
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
    $attrSlide = false;
  });
  $('body').on('mouseup',function(e){
    if (dragging) { dragEnd(); }
  });

  $('.resize span').on('click',function(e){
    if ($(this).hasClass('glyphicon-forward')) {
      $('.leftpane').animate({'width':window.innerWidth - 16});
      $('.rightpane').animate({'width':'16px'});
      $('.resize').animate({'left':window.innerWidth - 16},function(){
        $('.rightpane .inner').hide();
        $('.resize span').removeClass('glyphicon-forward').addClass('glyphicon-backward');
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
        $('.resize span').removeClass('glyphicon-backward').addClass('glyphicon-forward');
        $('.resize span').css('cursor','e-resize');
        onResize();
      });
    }
  })

  $('.rightpane').on('click','.horipane .title',function(e){
    if ($(this).parent().find('.content .block')) {
      elWidth = parseInt($(this).parent().find('.content .block').attr('data-width'));
      if ($('#rightpane .inner').width() < elWidth) {
        perc = 100 - ((elWidth+82) / window.innerWidth * 100);
        $('.rightpane .inner').show();
        $('.leftpane').animate({'width':perc+"%"});
        $('.rightpane').animate({'width':(100-perc)+'%'});
        $('.resize').animate({'left':perc+"%"},function(){
          $('.rightpane').css('overflow-x','hidden');
          $('.rightpane').css('overflow-y','auto');
          onResize();
        });
      }
    }
    if($(this).hasClass('active')){
      $(this).next('.content').slideUp();
      $(this).removeClass('active');
    } else {
      $(this).next('.content').slideDown();
      $(this).addClass('active');
      if ($(this).next('.content').find('.columns').length > 0) resetColumns();
      /*$('#rightpane').animate({
        scrollTop: $(this).offset().top
      }, 200);*/
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
  
  $('.conflict-button').on('mouseenter',function(e){
    id = $(this).attr('data-id');
    selector = '#map .map_icon.id_'+id;
    $(selector).addClass('selected')
    transformItem(selector, 'scale', 1.25);
    $(selector).removeClass('mic').removeClass('min');
    updateInfo(1,markerc[id].content)
  })
  $('.conflict-button').on('mouseleave',function(e){
    selector = '#map .map_icon.id_'+$(this).attr('data-id');
    transformItem(selector, 'scale', 0.8);
    singleSize(selector);
  })
  
  $('.leaflet-control-attribution').on('mouseenter',function(e){
    $attrSlide = true;
    slideAttribution();
  })
  $('.leaflet-control-attribution').on('mouseleave',function(e){
    $attrSlide = false;
    $(this).css('text-indent',0);
  })
  
  window.onresize = onResize; 

  updateInfo(1,disclaimer);
  markerSize();
}

function slideAttribution () {
  return
  c = $('.leaflet-control-attribution');
  console.log(c.innerWidth()+" "+c.width());
  if (c.innerWidth() > c.width() && $attrSlide ) {
    c.css('width',(c.width()+11)+'px');
    setTimeout(125,slideAttribution());
  } else {
    $attrSlide = false;
    c.css('width','100%');
  }
}

function showMarkers(markers) {
  markerCount = markers.length;
  markerc = {};

  var attrhash = {"category_id":"Category","types":"Types","other_types":"Other Types","description":"Description","country_id":"Country","province":"Province","site":"Site","accuracy_level":"Level of Accuracy","project_area":"Project Area","project_length":"Project Length","population_type":"Type of Population","products":"Commodities","other_products":"Other Commodities","companies":"Companies","supporters":"IFI's","other_supporters":"Other IFI's","ejos":"EJO's","govt_actors":"Government Actors","mobilizing_groups":"Mobilizing Groups","other_mobilizing_groups":"Other Mobilizing Groups","mobilizing_forms":"Mobilizing Forms","other_mobilizing_forms":"Other Mobilizing Forms","env_impacts":"Environmental Impacts","other_env_impacts":"Other Environmental Impacts","hlt_impacts":"Health Impacts","other_hlt_impacts":"Other Health Impacts","sec_impacts":"Socio-economic Impacts","other_sec_impacts":"Other Socio-economic Impacts","conflict_events":"Outcomes","other_outcomes":"Other Outcomes","project_details":"Project Details","investment_string":"Level of Investment","affected_people":"Potentially Affected Population","status_id":"Intensity Level","reaction_id":"Reactionary Stage","start_date":"Start Date","end_date":"End Date","project_status_id":"Project Status","suggested_alternatives":"Development of Alternatives","success_level":"Succes Level","success_reason":"Success Reason","other_comments":"Other Comments"};
  var arrr = []

  $.each(markers, function(i,m){
    mark = m;//JSON.parse(m);
    if (!mark.lat || !mark.lon) {
      console.log(mark);
      return 0
    }
    popcontent = "<h4 class='maplink'><a href='/conflict/"+mark.slug+"'>"+mark.name + "</a></h4><p>"+mark.title+"</p><table style='padding:24px 16px;'><tr><td style='width:42px'><div class='map-icon i_"+mark.clr+" s_1' style='margin:0 !important;'></div><td>";
    if (mark.cat !== '' ) {popcontent += "<strong>"+mark.cat+"</strong>"};
    popcontent += '</td></tr></table>';

    cclass = "";
    if ('dmn' in mark && mark.dmn.length > 0) {
      dmns.push(mark.dmn[0])
      cclass = " c_"+mark.dmn[0];
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

    var marker = L.marker([mark.lat, mark.lon],{
      icon: L.divIcon({ className: 'map_icon mic i_'+mark.clr+' id_'+mark.id+''+cclass, }),
      riseOnHover: true,
    }).addTo(markerLayer);
    
    $('.map_icon.id_'+mark.id).attr('data-id',mark.id);

    marker.id = mark.id;
    marker.name = mark.name;
    marker.slug = mark.slug;
    marker.cslg = mark.cslg;
    marker.content = popcontent;
    marker.on('mouseover', function(e){
      selector = '#map .map_icon.id_'+marker.id;
      $(selector).addClass('selected')
      transformItem(selector, 'scale', 1.25);
      $(selector).removeClass('mic').removeClass('min');
      updateInfo(1,marker.content);
    });
    marker.on('mouseout', function(e){
      selector = '#map .map_icon.id_'+marker.id;
      transformItem(selector, 'scale', 0.8);
      singleSize(selector);
    });
    if (window.location.pathname === "/embed") {
      marker.on('click', function(e){window.open("http://ejatlas.org/conflict/"+marker.slug,"_blank")});
    } else {
      marker.on('click', function(e){window.location="/conflict/"+marker.slug});
    }
    markerc[mark.id] = marker;
    //oms.addMarker(marker);
    arrr.push(mark.id);
    all ++;
  });
  $(document).ready(function(){
    onResize();
    dmns = dmns.distinct();
    if (dmns.length > 0) {
      $.each(dmns,function(i,n){
        $(".c_"+n).css("border","2px solid #"+n);
        $(".c_"+n).css("background-color","#"+n);
      })
    }

    $.each(markerc,function(k,v){
      m = $(".id_"+k);
      m.attr('src',"/")
    })
  });
}


function transformItem(selector, property, value) {
  matrix = $(selector).css('transform');
  $(selector).css({
    '-webkit-transform' : matrix + property + '(' + value + ')',
    '-moz-transform'    : matrix + property + '(' + value + ')',
    '-ms-transform'     : matrix + property + '(' + value + ')',
    '-o-transform'      : matrix + property + '(' + value + ')',
    'transform'         : matrix + property + '(' + value + ')'
  });
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
  if (mapWidth * window.innerWidth / 100 <= window.innerWidth - 475 ) {
    localStorage['mapWidth'] = mapWidth;
  } else {
    console.log(mapWidth)
  }
  resetColumns();
  rightWidth = $('#rightpane .inner').width();
  $.each($('.horipane .block'),function(i,e){
    elWidth = parseInt($(e).attr('data-width'));
    cols = Math.floor(rightWidth / elWidth);
    siblings = $(e).closest('.horipane').find('.block').length;
    if (cols == 0) {
      hori = $(e).closest('.horipane');
      hori.find('.title').removeClass('active')
      hori.find('.content').slideUp();
    } else if (cols == 1) {
      $(e).css('width','100%');
      $(e).css('min-width','0');
      $(e).css('float','none');
      $(e).find('.blocked').show();
    } else if (siblings > 1){
      perc = Math.floor(100/Math.min(cols,siblings))
      $(e).css('width',(perc-2)+'%');
      $(e).css('min-width',(perc-2)+'%');
      $(e).css('margin-right','2%');
      $(e).css('float','left');
      $(e).find('.blocked').hide();
    }
  });
}

function markerFit(ids){
  arr = []
  $.each(markerc,function(k,v){
    if(ids.indexOf(parseInt(k)) >= 0){
      arr.push(v.getLatLng());
    }
  })
  console.log(arr)
  map.fitBounds(arr);
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

function singleSize(selector) {
  if (markerCount > 100) {
    $(selector).addClass('mic').removeClass('min');
  } else if (markerCount > 10) {
    $(selector).removeClass('mic').addClass('min');
  } else {
    $(selector).removeClass('mic').removeClass('min');
  }
  if (map.getZoom() > 3) {
    $(selector).removeClass('mic').addClass('min');
  } else {
    $(selector).addClass('mic').removeClass('min');
  }
  if (map.getZoom() > 9) {
    $(selector).removeClass('min');
  } else {
    $(selector).addClass('min');
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
  if (upd && false) {
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
  console.log(category)
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
    fillOpacity: 0.8
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
    lStyle = {};
    tl = vect['name']
    jsons[tl] = ly;
    choropleths[tl] = JSON.parse(vect['choropleth'])
    leg = '<div class="legend"><table> <tbody>';
    $.each(choropleths[tl],function(k,v){
      leg += '<tr> <td class="chicon"> <div class="chlegend" style="background-color:#'+v['color'].replace(/^#/,'')+'"></div> </td> <td class="chdesc">'+v['legend']+'</td> </tr>';
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
  addOverlay(tl,lStyle,vect['shown'])
}

function addOverlay(name,lstyle,shown){
  if ($('#legendpane .vectorlegend').length == 0) {
    $('#legendpane').prepend('<div class="vectorlegend noselect block" data-width=480><table class="overlays"><tbody></tbody></table></div>');
  }
  if (Object.keys(choropleths).indexOf(name) >= 0) {
    if ($('#legendpane .vectorlegend .choropleths').length == 0) {
      $('#legendpane .vectorlegend').append('<table class="choropleths"><tbody></tbody></table>');
    }
    html = "<tr><td class='input'><input type='radio' id='radio_"+toSlug(name)+"' name='choropleth'"
    if (shown == '1') { html += " checked='checked'" }
    html += "></input></td><td class='icon'><div class='chorostyle clearfix'>"
    clength = Object.keys(choropleths[name]).length;
    $.each(choropleths[name],function(k,v){
      html += "<div style='width:"+(16/clength)+"px;background-color:#"+v.color.replace(/^#/,'')+"'>&nbsp;</div>";
    });
    html += "</div></td><td>"+name+"</td></tr>"
    $('#legendpane .vectorlegend table.choropleths tbody').append(html);
  } else {
    stylestr = "{\n"
    $.each(lstyle,function(k,v){
      k = k.replace('color','stroke');
      k = k.replace('fillColor','fill');
      k = k.replace('opacity','stroke-opacity');
      k = k.replace('fillOpacity','fill-opacity');
      k = k.replace('dashArray','stroke-dasharray');
      k = k.replace('weight','stroke-width');
      stylestr += k+":"+v+";\n";
    });
    stylestr += "}"
    html = "<tr><td class='input'><input type='checkbox' id='checkbox_"+toSlug(name)+"'"
    if (shown == '1') { html += " checked='checked'" }
    html += "></input></td><td class='icon'><svg id='icon_"+toSlug(name)+"' width=20 height=20 xmlns='http://www.w3.org/2000/svg' viewport='0 0 20 20'><rect height='16' rx='4' ry='4' width='16' x='2' y='2'></rect></svg><style>svg#icon_"+toSlug(name)+" > rect "+stylestr+"</style></td>"
    html += "<td>"+name+"</td></tr>"
    $('#legendpane .vectorlegend table.overlays tbody').append(html);
  }
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

function filterMarkers(m) {
  $.each($('.map .map_icon'),function(i,e){
    index = m.indexOf(parseInt($(e).attr('data-id')));
    if (index < 0 ) { 
      $(e).fadeOut('slow');
    } else {
      $(e).fadeIn('slow');
    }
  });
  markerFit(m);
}

if (typeof markerinfo != 'undefined') {
  initMap();
  showMarkers(markerinfo);
}

