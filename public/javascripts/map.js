var markerc, markerLayer, featureLayer, markerBounds, disclaimer, map, sat, rect, geojson, markerCount, data, conflict, zoom, pan, bounds, maxBounds, lControl, homeButton, acme, mouseX, innerWidth, dragging, choro_last, $attrSlide, markerClusters;
var $msize = "mic";
var jsons = {};
var checkingTile = false;
var all = 0;
var loadQueue = 0;
var overlayMaps = { };
var choropleths = { };
var baselayers = { };
var dmns = [];
var info = $("#infopane");
var legendpane = $("#legendpane .legend");
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

function initMap () {
  console.log("map init")
  $.each(layers.split(','),function(i,e){
    if (e == "") return false;
    f = e.split('.');
    baselayers[f[f.length-1].replace(/([A-Z]+)/g, " $1").trim()] = L.tileLayer.provider(e, {minZoom: 1, maxzoom:18});
  })

  markerLayer = L.featureGroup();
  featureLayer = L.featureGroup({interactive:true});
  initLayers = [];

  maxBounds = new L.LatLngBounds(new L.LatLng(90,240), new L.LatLng(-90,-240))
  bounds = maxBounds;

  if (Object.keys(baselayers).length > 0) {
    initLayers.push( baselayers[(Object.keys(baselayers)[0])]);
  }
  initLayers.push(markerLayer)
  initLayers.push(featureLayer)
  map = L.map('map',{
    scrollWheelZoom: $('#map').css('position') == "fixed",
    worldCopyJump: true,
    //maxBounds: maxBounds,
    //maxBounds: [[-90,-270],[90,270]],
    bounceAtZoomLimits: false,
    center: new L.latLng([16,26]),
    zoom: 2,
    minZoom: 2,
    layers: initLayers,
    zoomControl: false,
    //renderer: L.canvas()
  });

  $.each(vectorinfo,function(i,v){
    loadJS(v["vector_datum"]["url"],true)
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
            //console.log(req);
            //console.log(req.getAllResponseHeaders());
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
    title = $(this).find('td:last')
    name = title.text();
    hit = e.target == box[0];
    chk = box.prop('checked');
    if ((chk && !hit) || (!chk && hit)) {
      box.prop('checked',false);
      map.removeLayer(overlayMaps[name]);
      title.css('font-weight','normal');
    } else if ((chk && hit) || (!chk && !hit)){
      box.prop('checked',true);
      map.addLayer(overlayMaps[name]);
      title.css('font-weight','bold');
    }
  });

  $(document).on('click','.vectorlegend .choropleths tr',function(e){
    if ($(this).hasClass('leg')) return
    $('body').css('cursor','wait !important');
    box = $(this).find('input');
    title = $(this).find('td:last')
    name = title.text();
    hit = e.target == box[0];
    chk = box.prop('checked');
    $('.vectorlegend .choropleths tr td').css('font-weight','normal');
    if (chk && !hit) {
      box.prop('checked',false);
      map.removeLayer(overlayMaps[name]);
      $('.vectorlegend .choropleths tr.leg').hide();
    } else if ((chk && hit) || (!chk && !hit)){
      if (box.attr('id') == choro_last && hit) {
        box.prop('checked',false);
        map.removeLayer(overlayMaps[name]);
        $('.vectorlegend .choropleths tr.leg').hide();
      } else {
        title.css('font-weight','bold');
        $('.vectorlegend .choropleths tr.leg').hide();
        $(this).nextAll('.leg.'+toSlug(name).replace(/\W/g,'')).fadeIn();
        $('.vectorlegend .choropleths .input').prop('checked',false)
        box.prop('checked',true);
        if (map.hasLayer(overlayMaps['Country Data'])) {
          map.removeLayer(overlayMaps['Country Data']);
          $('.vectorlegend .overlays input#checkbox_country_data').prop('checked',false);
          $('.vectorlegend .overlays input#checkbox_country_data').closest('tr').css('font-weight','normal');
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
    $('body').css('cursor','auto !important');
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
      var container = L.DomUtil.create('div', 'home-button leaflet-control-layers');
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

  map.on('zoomend', function(e) { i
    markerSize();
  });

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

  $('#conflict_summary, .horipane.description').on('click','.seemore',function(e){
    e.preventDefault();
    more = $(this).next('.more');
    $(this).fadeOut(100,function(){more.slideDown();});
  });

  $('#conflict_summary, .horipane.description').on('click','.seeless',function(e){
    e.preventDefault();
    more = $(this).parent().prev('.seemore');
    $(this).parent().slideUp(function(){more.slideDown();});
  });
  
  $('.horipane').on('mouseenter','.conflict-button',function(e){
    id = $(this).attr('data-id');
    selector = '#map .map_icon.id_'+id;
    $(selector).addClass('selected')
    markerc[parseInt(id)].setZIndexOffset(markerCount+1)
    transformItem(selector, 'scale', 1.25);
    $(selector).removeClass('mic').removeClass('min').addClass('hovered');
    updateInfo(1,markerc[id].content)
  })
  $('.horipane').on('mouseleave','.conflict-button',function(e){
    selector = '#map .map_icon.id_'+$(this).attr('data-id');
    transformItem(selector, 'scale', 0.8);
    $(selector).removeClass('hovered');
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
  mapFit();
}

function slideAttribution () {
  return
  c = $('.leaflet-control-attribution');
  //console.log(c.innerWidth()+" "+c.width());
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
  cluster = false;

  var attrhash = {"category_id":"Category","types":"Types","other_types":"Other Types","description":"Description","country_id":"Country","province":"Province","site":"Site","accuracy_level":"Level of Accuracy","project_area":"Project Area","project_length":"Project Length","population_type":"Type of Population","products":"Commodities","other_products":"Other Commodities","companies":"Companies","supporters":"IFI's","other_supporters":"Other IFI's","ejos":"EJO's","govt_actors":"Government Actors","mobilizing_groups":"Mobilizing Groups","other_mobilizing_groups":"Other Mobilizing Groups","mobilizing_forms":"Mobilizing Forms","other_mobilizing_forms":"Other Mobilizing Forms","env_impacts":"Environmental Impacts","other_env_impacts":"Other Environmental Impacts","hlt_impacts":"Health Impacts","other_hlt_impacts":"Other Health Impacts","sec_impacts":"Socio-economic Impacts","other_sec_impacts":"Other Socio-economic Impacts","conflict_events":"Outcomes","other_outcomes":"Other Outcomes","project_details":"Project Details","investment_string":"Level of Investment","affected_people":"Potentially Affected Population","status_id":"Intensity Level","reaction_id":"Reactionary Stage","start_date":"Start Date","end_date":"End Date","project_status_id":"Project Status","suggested_alternatives":"Development of Alternatives","success_level":"Succes Level","success_reason":"Success Reason","other_comments":"Other Comments"};
  var arrr = []

  if (cluster) {
    markerClusters = {}
    var cats = {1:"Nuclear",2:"Mineral Ores and Building Materials Extraction",3:"Waste Management",4:"Biomass and Land Conflicts (Forests, Agriculture and Livestock Management)",5:"Fossil Fuels and Climate Justice/Energy",6:"Water Management",7:"Infrastructure and Built Environment",8:"Tourism Recreation",9:"Biodiversity conservation conflicts",10:"Industrial and Utilities conflicts",11:"Other"}
    $.each(cats,function(i,e){
      markerClusters[i]= L.markerClusterGroup({
        showCoverageOnHover: false,
        maxClusterRadius: 64,
        iconCreateFunction: function(cluster) {
          return new L.divIcon({ 
            className: "map_icon cluster i_"+i+" "+$msize,
            //iconSize: [36,36],
            html: '<b>'+cluster.getChildCount() + '</b>' 
          });
        }
      }).addTo(map);
    })
  }

  $.each(markers, function(i,mark){
    if (!mark.a || !mark.o) {
      return 0
    }
    if (markers.length == 1){
      var marker = L.marker([mark.a, mark.o],{
        icon: L.divIcon({ className: 'map_icon s_1 i_'+mark.c+' id_'+mark.i }),
        riseOnHover: true,
      }).addTo(markerLayer);
      markerc[mark.i] = marker;
      $('.id_'+mark.i).css('cursor','grab');
      $('.id_'+mark.i).css('cursor','-webkit-grab');
      return false
    }
    popcontent = '<div>';

    cclass = "";
    if ('dmn' in mark && mark.dmn.length > 0) {
      dmns.push(mark.dmn[0])
      cclass = " c_"+mark.dmn[0];
      popcontent += "<div class='features'>";
      $.each(Object.keys(mark),function(i,n){
        if (isNaN(n[0])) return 0
        if (n.match(/^\d+:id$/i)) return 0
        id = parseInt(n.split(':')[0]);
        if (id == fid && mark[n]) {
          if (Object.keys(attrhash).indexOf(n.split(':')[1]) >= 0){
            popcontent += '<br />'+attrhash[n.split(':')[1]].replace(/\sId$/,'')+': <strong>';
          } else {
            popcontent += '<br />'+toTitleCase(n.split(':')[1].replace(/_/g,' '))+': <strong>';
          }
          popcontent += mark[n];
          popcontent += "</strong>";
        }
      })
      popcontent += "<br /><br />"
      $.each(mark.tags,function(i,n){
        popcontent += "<span class='badge' style='background-color:#"+mark.dmn[i]+"'>"+n+"</span> &nbsp; "
      })
      popcontent += "</div>";
    }
    popcontent += '</div>';

    pare = cluster ? markerClusters[mark.c] : markerLayer;
    var marker = L.marker([mark.a, mark.o],{
      icon: L.divIcon({ className: 'map_icon i_'+mark.c+' id_'+mark.i+''+cclass, }),
      riseOnHover: true,
    }).addTo(pare);
    
    $('.map_icon.id_'+mark.i).attr('data-id',mark.i);

    marker.id = mark.i;
    marker.cat = mark.c;
    marker.content = popcontent;
    marker.bindPopup(L.popup({
        autoPanPaddingTopLeft: L.point(24, -90),
        autoPanPaddingBottomRight: L.point(72, 82),
        keepInView: true
      }).setContent('<img src="/images/loading-bg.gif" class="loading"/>'));
    marker.on('mouseover', function(e){
      selector = '#map .map_icon.id_'+marker.id;
      $(selector).addClass('selected')
      transformItem(selector, 'scale', 1.25);
      $(selector).removeClass('mic').removeClass('min').addClass('hovered');
      updateInfo(1,marker.content);
    });
    marker.on('mouseout', function(e){
      selector = '#map .map_icon.id_'+marker.id;
      transformItem(selector, 'scale', 0.8);
      singleSize(selector);
      $(selector).removeClass('hovered');
    });
    marker.on('click', function(e){
      m = this;
      $.ajax({
        type: "get",
        url: "/info/"+this.id,
        success: function(data){
          m.getPopup().setContent(data+m.content).openOn(map);
        }
      })
    });
    markerc[mark.i] = marker;
    //oms.addMarker(marker);
    arrr.push(mark.i);
    all ++;
  });
  map.closePopup();

  $(document).ready(function(){
    onResize();
    if($('.popover').length > 0){
      showPopovers();
    }
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

    if (markerinfo && markerinfo.length == 0) {
      legendpane.hide();
    }
    setTimeout( markerSize, 200);
  });
  //$('.map_icon').addClass('mic');
  markerSize();
}


function transformItem(selector, property, value) {
  /*matrix = $(selector).css('transform');
  $(selector).css({
    '-webkit-transform' : matrix + property + '(' + value + ')',
    '-moz-transform'    : matrix + property + '(' + value + ')',
    '-ms-transform'     : matrix + property + '(' + value + ')',
    '-o-transform'      : matrix + property + '(' + value + ')',
    'transform'         : matrix + property + '(' + value + ')'
  });*/
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
    //console.log(mapWidth)
  }
  resetColumns();
  rightWidth = $('#rightpane .inner').width();
  $.each($('.horipane .block'),function(i,e){
    elWidth = parseInt($(e).attr('data-width'));
    cols = Math.floor(rightWidth / elWidth);
    if ($(e).attr('data-break')=="even" && cols%2 == 1) { cols --; }
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
  //console.log(arr)
  map.fitBounds(arr,{maxZoom:16});
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
  $('.map_icon').removeClass('mic').removeClass('min');
  if (conflict) { return }
  state = 0
  if (markerCount <= 128) { state ++; }
  if (markerCount <= 16) { state ++; }
  if (map.getZoom() < 3) { state --; }
  if (map.getZoom() > 9) { state ++; }
  switch (state) {
    case -1:
      if ($nomicmark) {
        $msize = "min";
        $('.map_icon').addClass('min');
      } else {
        $msize = "mic";
        $('.map_icon').addClass('mic');
      }
      break;
    case 3:
      $msize = "";
      break;
    default:
      $msize = "min";
      $('.map_icon').addClass('min');
  }
}

function singleSize(selector) {
  $(selector).removeClass('mic').removeClass('min');
  if (conflict) { return }
  state = 0
  if (markerCount <= 128) { state ++; }
  if (markerCount <= 16) { state ++; }
  if (map.getZoom() < 3) { state --; }
  if (map.getZoom() > 9) { state ++; }
  switch (state) {
    case -1:
      $(selector).addClass('mic');
      break;
    case 3:
      break;
    default:
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
    markerBounds = markerLayer.getBounds();
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
  //console.log(category)
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

function featurePopup(e) {
  var layer = e.target;
  //layer.getPopup().openOn(map);
}

function highlightFeature(e) {
  var layer = e.target;
  layer.setStyle({
    fillOpacity: 1
  });

  $("#map").css("cursor","pointer");

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
  $("#map").css("cursor","");

  if (!L.Browser.ie && !L.Browser.opera) {
    layer.bringToFront();
  }
}

function zoomToFeature(e) {
  map.fitBounds(e.target.getBounds());
}

function onEachFeature(feature, layer) {
  if (Object.keys(feature).indexOf('properties') == -1) {
    pn = feature.pn
  } else {
    pn = feature.properties.pn
  }
  inf = "<div class='maplink darkred'><p><strong>"+pn+"</strong></p></div><div class='scrollme'>";
  ia = []
  if (Object.keys(choropleths).indexOf(layer.feature.category) >= 0) {
    layer.setStyle(style(layer.feature));
  }
  if (layer.feature.properties && layer.feature.properties.data) {
    titled = false;
    if (pn == "Gas Pipelines (Pci 2015)") {
      for ( i = 0; i < Object.keys(layer.feature.properties.data).length; i += 1 ) {
        k = Object.keys(layer.feature.properties.data)[i];
        v = layer.feature.properties.data[k]
        if (v) {
          if (k.match(/country/) && !titled) {
            ia.push("<h3>"+v+"</h3>");
            titled = true;
          } else {
            ia.push("<strong>"+k.replace(/^feature_/,"").replace(/_/g," ").replace(/^\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1)})+":</strong> "+v.replace(/\n+/g,'<br /><br />')+"<br />");
          }
        } 
      }
    } else {
      $.each(layer.feature.properties.data,function(k,v){
        if (v) {
          if (k.match(/country/) && !titled) {
            ia.push("<h3>"+v+"</h3>");
            titled = true;
          } else {
            ia.push("<strong>"+k.replace(/^feature_/,"").replace(/_/g," ").replace(/^\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1)})+":</strong> "+v.replace(/\n+/g,'<br /><br />')+"<br />");
          }
        } 
      });
    }
  }
  if (pn == "Gas Pipelines (Pci 2015)") {console.log(ia)}
  inf += ia.join("<br />");
  if (jsons[pn].desc){ 
    inf += "<p><strong>"+jsons[pn]['desc']+"</strong></p>"; 
  }
  if (jsons[pn].source){ 
    inf += "<p><strong>Source:</strong> &nbsp; "+jsons[pn]['source'];
    if (jsons[pn]['link']){ inf += " &nbsp; <a href='"+jsons[pn]['link']+"' target='_blank'>"+jsons[pn]['link']+"</a>"; }
    inf += "</p>";
  }
  inf += "</div>"
  layer.bindPopup(inf,{
    autoPanPaddingTopLeft: L.point(24, 96),
    autoPanPaddingBottomRight: L.point(72, 64),
    keepInView: true
  });
  layer.on({
    mouseover:highlightFeature,
    mouseout: resetHighlight,
    click: featurePopup,
    dblclick: zoomToFeature,
  });
}

function showVector(v) {
  if (v.features[0].pn) {
    pn = v.features[0].pn;
  } else if (v.features[0].properties.pn) {
    pn = v.features[0].properties.pn;
  } else {
    //console.log('fail - no pn');
    return 0
  }
  vect = $.grep(vectorinfo,function(i,n){return i.vector_datum.name == pn});
  //console.log(vect)
  if(vect.length == 0) {
    //console.log('fail - no vect');
    return 0
  }
  vect = vect[0].vector_datum;
  if(vect['url']==="" || vect.loaded) {
    //console.log('fail - no url');
    return 0
  }
  vectorinfo[vect.rank - 1].vector_datum.loaded = true;
  vr = toSlug(vect['url']);
  ly = eval(vr);
  tl = vect['name']
  jsons[tl] = {features:[]};
  $.each(ly,function(k,v){
    if (k == 'features') {
      $.each(v,function(i,e){
          jsons[tl][k][i] = {};
        $.each(e,function(kk,vv){
          if (kk != 'geometry') {
            jsons[tl][k][i][kk] = vv;
          }
        });
      });
    } else {
      jsons[tl][k] = v;
    }
  });
  jsons[tl]['desc'] = vect['description']
  jsons[tl]['source'] = vect['source']
  jsons[tl]['link'] = vect['link']
  $.each(ly["features"],function(index,feature){
    feature["category"] = tl;
    feature["name"] = vr;
  });
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
    jsons[tl]['style'] = lStyle;
    if (vect.clickable) {
      overlayMaps[tl] = L.geoJson(ly['features'],{interactive: true, style: lStyle, pointToLayer: pToLayer, onEachFeature:onEachFeature});
    } else {
      overlayMaps[tl] = L.geoJson(ly['features'],{interactive: true, style: lStyle, pointToLayer: pToLayer});
    }
  } else {
    lStyle = {};
    sl = toSlug(tl).replace(/\W/g,'');
    choropleths[tl] = JSON.parse(vect['choropleth'])
    sp = '';
    if (vect['shown'] == '1') sp = 'style="display: table-row;"';
    leg = '';
    $.each(choropleths[tl],function(k,v){
      leg += '<tr class="leg '+sl+'" '+sp+'> <td>&nbsp;</td> <td class="icon"> <div class="chorostyle" style="background-color:#'+v['color'].replace(/^#/,'')+'"></div> </td> <td class="chdesc">'+toSentenceCase(v['legend'])+'</td> </tr>';
    });
    leg += '<tr class="leg last '+sl+'" '+sp+'> <td></td><td></td><td></td> </tr>';
    jsons[tl]['legend'] = leg;
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
    jsons[tl]['style'] = lStyle;
    if (vect.clickable) {
      overlayMaps[tl] = L.geoJson(ly['features'],{pointToLayer: pToLayer, onEachFeature:onEachFeature});
    }
  }
  overlayMaps[tl].setZIndex(vectorinfo.length - vect.rank + 1)
  if (vect["shown"] == '1') { overlayMaps[tl].addTo(featureLayer);}
  addOverlay(tl,lStyle,vect)
}

function addOverlay(name,lstyle,vect){
  if ($('#legendpane .vectorlegend').length == 0) {
    $('#legendpane').prepend('<div class="vectorlegend noselect block" data-width=240><table class="overlays"><tbody></tbody></table></div>');
  }
  if (Object.keys(choropleths).indexOf(name) >= 0) {
    if ($('#legendpane .vectorlegend .choropleths').length == 0) {
      $('#legendpane .vectorlegend').append('<table class="choropleths"><tbody></tbody></table>');
    }
    html = "<tr data-rank='"+vect["rank"]+"'><td class='input'><input type='radio' id='radio_"+toSlug(name).replace(/\W/g,'')+"' name='choropleth'"
    if (vect['shown'] == '1') { html += " checked='checked'" }
    html += "></input></td><td class='icon'><div class='chorostyle clearfix'>"
    clength = Object.keys(choropleths[name]).length;
    $.each(choropleths[name],function(k,v){
      html += "<div style='width:"+(16/clength)+"px;background-color:#"+v.color.replace(/^#/,'')+"'>&nbsp;</div>";
    });
    html += "</div></td><td";
    if (vect['shown'] == '1') { html += " style='font-weight:bold'" }
    html += ">"+name+"</td></tr>"
    html += jsons[name].legend.replace("class=\"legend\"","class=\"legend static\"");
    ranks = $("table.choropleths tbody tr").map(function(i,e){return $(e).data("rank")}).toArray();
    if (Math.min.apply(Math,ranks) > vect.rank) {
      $('#legendpane .vectorlegend table.choropleths tbody').prepend(html);
    } else {
      var rank = 0
      $.each(ranks,function(i,e){
        if (e > vect.rank) {
          rank = i-1;
          return false
        }
      })
      if (rank == 0) {
        $('#legendpane .vectorlegend table.choropleths tbody').append(html);
      } else {
        $(html).insertAfter('#legendpane .vectorlegend table.choropleths tbody tr:eq('+rank+')');
      }
    }
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
    html = "<tr data-rank='"+vect["rank"]+"'><td class='input'><input type='checkbox' id='checkbox_"+toSlug(name)+"'"
    if (vect['shown'] == '1') { html += " checked='checked'" }
    if (vect['geometry_type'] == "point") {
      html += "></input></td><td class='icon'><svg id='icon_"+toSlug(name)+"' width=20 height=20 xmlns='http://www.w3.org/2000/svg' viewport='0 0 20 20'><circle r='6' cx='10' cy='10'></circle></svg><style>svg#icon_"+toSlug(name)+" > circle "+stylestr+"</style></td>"
    } else if (vect['geometry_type'] == "line") {
      html += "></input></td><td class='icon'><svg id='icon_"+toSlug(name)+"' width=20 height=20 xmlns='http://www.w3.org/2000/svg' viewport='0 0 20 20'><path d='M 3 2 L 5 7 L 15 10 L 20 20'></rect></svg><style>svg#icon_"+toSlug(name)+" > path "+stylestr+"</style></td>"
    } else {
      html += "></input></td><td class='icon'><svg id='icon_"+toSlug(name)+"' width=20 height=20 xmlns='http://www.w3.org/2000/svg' viewport='0 0 20 20'><rect height='16' rx='4' ry='4' width='16' x='2' y='2'></rect></svg><style>svg#icon_"+toSlug(name)+" > rect "+stylestr+"</style></td>"
    }
    html += "<td";
    if (vect['shown'] == '1') { html += " style='font-weight:bold'" }
    html += ">"+name+"</td></tr>"
    ranks = $("table.overlays tbody tr").map(function(i,e){return $(e).data("rank")}).toArray();
    if (Math.min.apply(Math,ranks) > vect.rank) {
      $('#legendpane .vectorlegend table.overlays tbody').prepend(html);
    } else {
      var rank = 0
      $.each(ranks,function(i,e){
        if (e > vect.rank) {
          rank = i-1;
          return false
        }
      })
      if (rank == 0) {
        $('#legendpane .vectorlegend table.overlays tbody').append(html);
      } else {
        $(html).insertAfter('#legendpane .vectorlegend table.overlays tbody tr:eq('+rank+')');
      }
    }
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
  //console.log(varname)
  loadQueue -= 1;
  if (varname.features.length == 0) return
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
/*
function loadJS(filename,queue){
  $.ajax({
    url: filename,
    type: "GET",
    dataType: 'json',
    cache: true,
    success: function (data, status, error) {
      console.log('success', data);
      vectorPing(data);
    },
    error: function (data, status, error) {
      console.log('error', data, status, error);
    }
  });
}
*/

function pausecomp(millis) {
  var date = new Date();
  var curDate = null;
  do { curDate = new Date(); }
  while(curDate-date < millis);
}
function toTitleCase(str) {
  return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

function toSentenceCase(str) {
  return str.replace(/^\w/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

function render(){
  leafletImage(map, function(err, canvas) {
      var dataURL = canvas.toDataURL("image/png");
      typeof dataURL
      $.post('/image',{image: dataURL},function(data){
        //console.log(data);
      });
  });
}

if (localStorage['pageHits']) {
  localStorage['pageHits'] = parseInt(localStorage['pageHits']) + 1;
  hits = parseInt(localStorage['pageHits']);
  if (hits <= 10 && hits >= 3 && localStorage['surveyAsked'] == "0") {
    $('#survey').modal('show');
    localStorage['pageHits'] = 10;
  }
} else {
  localStorage['pageHits'] = 1;
  localStorage['surveyAsked'] = 0;
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

