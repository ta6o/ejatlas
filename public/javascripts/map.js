
var markerc, markerLayer, featureLayer, markerBounds, disclaimer, map, sat, rect, geojson, markerCount, data, conflict, zoom, pan, bounds, maxBounds, lControl, homeButton, acme, mouseX, innerWidth, dragging, choro_last, $attrSlide, markerClusters, featureMap, shownMarkers;

var $msize = "mic";
var $leg = "category_id";
var jsons = {};
var checkingTile = false;
var all = 0;
var loadQueue = 0;
var wmsLayers = [ ];
var overlayMaps = { };
var choropleths = { };
var baselayers = { };
var dmns = [ ];
var info = $("#infopane");
var legendpane = $("#legendpane > .legend");
var rtlegend = legendpane.html();
var legend = rtlegend;

var hoverStyle = {
  "fillOpacity": 0.5
};

function pToLayer(obj, latlng, color) {
  point = obj["category"];
  return new L.CircleMarker(latlng, {
    radius: 4
  });
}


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

function geoEach(f,l) {
  console.log(f,l)
}

function identify(e) {
  console.log("NALAN")
  console.log(e)
  console.log(wmsLayers)
  if (wmsLayers.length == 0) return
  var sw = map.options.crs.project(map.getBounds().getSouthWest());
  var ne = map.options.crs.project(map.getBounds().getNorthEast());
  var BBOX = sw.x + "," + sw.y + "," + ne.x + "," + ne.y;
  var WIDTH = map.getSize().x;
  var HEIGHT = map.getSize().y;
  var X = Math.trunc(map.layerPointToContainerPoint(e.layerPoint).x);
  var Y = Math.trunc(map.layerPointToContainerPoint(e.layerPoint).y);
  var s = e.target.options.s;
  var l = layerinfo[s];
  var n = l["name"];
  var URL = 'https://geo.ejatlas.org/geoserver/wms?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetFeatureInfo&LAYERS=geonode:'+s+'&QUERY_LAYERS=geonode:'+s+'&BBOX='+BBOX+'&FEATURE_COUNT=1&HEIGHT='+HEIGHT+'&WIDTH='+WIDTH+'&INFO_FORMAT=application%2Fjson&TILED=false&CRS=EPSG%3A3857&I='+X+'&J='+Y;
  $.ajax({
    url: URL,
    dataType: "json",
    type: "GET",
    success: function(data) {
      if(data.features.length !== 0) {
        console.log(data)
        var returnedFeature = data.features[0];
        inf = "<div class='maplink darkblue'><h4>"+n+"</h4></div><div class='scrollme'><p>";
        $.each(returnedFeature.properties,function(k,v){
          if(l["omit"].indexOf(k) == -1 ) {
            inf += "<strong>"+k+":</strong> "+v+"<br/>"
          }
        });
        inf += "</p></div>"
        var popup = new L.Popup({ maxWidth: 300 });
        popup.setContent(inf);
        popup.setLatLng(e.latlng);
        map.openPopup(popup);
      }
    }
  });
}

function removeGutters() {
  $('#map > div.leaflet-pane.leaflet-map-pane > div.leaflet-pane.leaflet-tile-pane > div > div > img').each(function() {
    if (String($( this ).css("width")).includes('.5') === false) {
      var imgW = String($( this ).css("width")).split( "px" ).join( ".5" )
      var imgH = String($( this ).css("height")).split( "px" ).join( ".5" )
      $( this ).width(imgW);
      $( this ).height(imgH);
    }
  })
}

function geoLayers() {

  $.each(layerranks,function(i,s){
    f = layerinfo[s]
    console.log(f)
    if (f.type == "raster") {
      var styls = {}
      name = f["name"];
      overlayMaps[name] = L.tileLayer.wms("https://geo.ejatlas.org/geoserver/geonode/wms", {
          layers: f['name'],
          format: 'image/png',
          transparent: true,
      })
      checked = "";
      bold = "";
      if (f["shown"] == 1) {
        console.log(overlayMaps[name])
        overlayMaps[name].addTo(geoLayer);
        wmsLayers.push(name);
        checked = " checked='checked'"
        bold = " style='font-weight:bold'"
      }
      if ($('#legendpane .vectorlegend').length == 0) {
        $('#legendpane').prepend('<div class="vectorlegend noselect block" data-width=240><table class="overlays"><tbody></tbody></table></div>');
      }
      html = "<tr data-rank='"+f["rank"]+"'><td class='input'><input type='checkbox' id='checkbox_"+s+"'"+checked+"></input></td>"
      html += "<td class='icon'><svg id='icon_"+s+"' width=20 height=20 xmlns='http://www.w3.org/2000/svg' viewport='0 0 20 20'><rect height='16' rx='4' ry='4' width='16' x='2' y='2'></rect></svg><style>svg#icon_"+s+" > rect "+f["icon"]+"</style></td>"
      html += "<td"+bold+">"+name+"</td></tr>";
      ranks = $("table.overlays tbody tr").map(function(i,e){return $(e).data("rank")}).toArray();
      console.log(ranks)
      $('#legendpane .vectorlegend table.overlays tbody').prepend(html);



    } else if (f.type == "vector") {



      var styls = {}
      name = f["name"];
      styl = f["style"]
      idcol = f['id_column'];
      eval("styls[s] = "+styl);

      overlayMaps[name] = L.vectorGrid.protobuf('https://geo.ejatlas.org/geoserver/gwc/service/tms/1.0.0/geonode:{s}@EPSG%3A900913@pbf/{z}/{x}/{-y}.pbf', { 
        interactive: f["clickable"],
        transparent: true,
        buffer: 512,
        vectorTileLayerStyles: styls,
        getFeatureId: function(fi) {
          //console.log(fi.properties[idcol])
          return fi.properties[idcol];
        },
        s: s
      }).on( {
          click:identify,
          mouseover: function(e) {
            console.log(e)
            return
            layer = overlayMaps[name];
            idcol = f['id_column'];
            layer.clearHighlight();
            layer.highlight = e.layer.properties[idcol];
            console.log(layer.highlight)
            layer.setFeatureStyle(layer.highlight, {
              color: "#000000",
              fill: "#000000",
              fillOpacity: 1,
              weight: 4,
            })
            if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
              layer.bringToFront(layer.highlight);
            }

            L.DomEvent.stop(e);
          }, 
          mouseout:function(e){ overlayMaps[name].clearHighlight(); }
        }
      );

      overlayMaps[name].highlight = null;
      overlayMaps[name].clearHighlight = function() {
        layer = overlayMaps[name];
        if (layer.highlight) { layer.resetFeatureStyle(layer.highlight); }
        layer.highlight = null;
      };

      checked = "";
      bold = "";
      if (f["shown"] == 1) {
        overlayMaps[name].addTo(geoLayer);
        wmsLayers.push(name);
        checked = " checked='checked'"
        bold = " style='font-weight:bold'"
      }

      if ($('#legendpane .vectorlegend').length == 0) {
        $('#legendpane').prepend('<div class="vectorlegend noselect block" data-width=240><table class="overlays"><tbody></tbody></table></div>');
      }
      html = "<tr data-rank='"+f["rank"]+"'><td class='input'><input type='checkbox' id='checkbox_"+s+"'"+checked+"></input></td>"
      html += "<td class='icon'><svg id='icon_"+s+"' width=20 height=20 xmlns='http://www.w3.org/2000/svg' viewport='0 0 20 20'><rect height='16' rx='4' ry='4' width='16' x='2' y='2'></rect></svg><style>svg#icon_"+s+" > rect "+f["icon"]+"</style></td>"
      html += "<td"+bold+">"+name+"</td></tr>";
      ranks = $("table.overlays tbody tr").map(function(i,e){return $(e).data("rank")}).toArray();
      console.log(ranks)
      $('#legendpane .vectorlegend table.overlays tbody').prepend(html);
    }
  })
}

function initMap() {
  console.log(layers)
  $.each(layers.split(','),function(i,e){
    if (e == "") return false;
    f = e.split('.');
    try {
      baselayers[f[f.length-1].replace(/([A-Z]+)/g, " $1").trim()] = L.tileLayer.provider(e, {minZoom: 1, maxzoom:18});
    } catch(err) {
      console.log(err+": "+e);
    }
  })

  $topflo = ($dir == "ltr") ? "topright" : "topleft";
  $botflo = ($dir == "ltr") ? "bottomright" : "bottomleft";

  markerLayer = L.featureGroup();
  featureLayer = L.featureGroup({interactive:true});
  geoLayer = L.featureGroup({interactive:true});
  initLayers = [];

  maxBounds = new L.LatLngBounds(new L.LatLng(90,240), new L.LatLng(-90,-240))
  bounds = maxBounds;

  if (Object.keys(baselayers).length > 0) {
    initLayers.push( baselayers[(Object.keys(baselayers)[0])]);
  }
  initLayers.push(markerLayer)
  initLayers.push(featureLayer)
  initLayers.push(geoLayer)
  map = L.map('map',{
    scrollWheelZoom: $('#map').css('position') == "fixed",
    worldCopyJump: true,
    //maxBounds: maxBounds,
    //maxBounds: [[-90,-270],[90,270]],
    bounceAtZoomLimits: false,
    center: new L.latLng([16,26]),
    zoom: 1.667,
    minZoom: 1,
    zoomSnap: 0,
    layers: initLayers,
    zoomControl: false,
    //renderer: L.canvas()
  });

  $.each(vectorinfo,function(i,v){
    loadJS(v["vector_datum"]["url"],true)
  });
  
  function waitForVectorGrid(){
    if (typeof L.vectorGrid == "undefined") {
      window.setTimeout(waitForVectorGrid,10);
    } else {
      geoLayers();
    }
  }

  if (Object.keys(layerinfo).length > 0 ) {
    //loadJS('https://unpkg.com/leaflet.vectorgrid@latest/dist/Leaflet.VectorGrid.js')
    loadJS(window.location.protocol+'//'+window.location.host+'/javascripts/Leaflet.VectorGrid.js')
    window.setTimeout(waitForVectorGrid,10)
  }
  if (Object.keys(baselayers).length > 1){ 
    //lControl = L.control.layers(baselayers, overlayMaps).addTo(map); 
    lControl = L.control.layers(baselayers, overlayMaps, {position: $topflo}).addTo(map); 
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

  $('#legendpane select.leg').on('change',function(e){
    $leg = $("#legendpane select.leg option:selected").val();
    $("#legendpane table").hide();
    $("#legendpane table."+$leg).show();
    $(".map_icon").removeClass("cc rr ss pp");
    $(".map_icon").addClass($leg.substr(0,1)+''+$leg.substr(0,1));
    if ($page_query == "{}") {
      $query = '{}';
    } else {
      $query = '{"should":{"term":'+$page_query+'}}';
    }
    ours = $('.legend .map-icon');
    mics = $('.leaflet-marker-icon');
    ours.removeClass('hid').addClass('vis');
    mics.show();
    $('.recent tr').remove();
    scrolling = true;
    ask();
  })

  $(document).on('click','.legend .map-icon, .legend .desc',function(e){
    //console.log(e)
    l = $leg.substr(0,1);
    regexp = new RegExp(l+"_\\d+");
    id = $(e.target).attr('class').match(regexp)[0].replace(l+'_','');
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
      if (Object.keys(overlayMaps[name]).indexOf("_vectorTiles") >= 0) {
        wmsLayers.splice(wmsLayers.indexOf(name),1);
      }
    } else if ((chk && hit) || (!chk && !hit)){
      box.prop('checked',true);
      map.addLayer(overlayMaps[name]);
      title.css('font-weight','bold');
      //console.log(overlayMaps[name])
      if (Object.keys(overlayMaps[name]).indexOf("_vectorTiles") >= 0) {
        wmsLayers.push(name);
      }
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

  //var zoomControl = L.control.zoom({position:'topright'});
  map.removeControl(map.attributionControl)
  L.control.attribution({position: $botflo}).addTo(map);
  var zoomControl = L.control.zoom({position:$topflo});
  map.addControl(zoomControl);
  $(".leaflet-control.leaflet-control-zoom").addClass("leaflet-control-layers");
  var loadingControl = L.Control.loading({
    //position: 'topright',
    position: $topflo,
    zoomControl: zoomControl
  });
  map.addControl(loadingControl);
  var HomeButton = L.Control.extend({
    //options: { position: 'topright' }, 
    options: { position: $topflo }, 
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

  map.on('zoomend', function(e) { 
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
    //mouseX = e.pageX;
    mouseX = $dir == "ltr" ? e.pageX : window.innerWidth - e.pageX;
    dragging = true;
    $(".rightpane .inner").css('display','block');
    if ($flo == 'left' && $('.resize span').hasClass('glyphicon-backward')) {
      if (localStorage.key('mapWidth')) { perc = localStorage['mapWidth'] } else { perc = 70 }
      $('.rightpane .inner').show();
      $('.leftpane').animate({'width':perc+"%"});
      $('.rightpane').animate({'width':(100-perc)+'%'});
      $('.resize').animate({$flo:perc+"%"},function(){
        $('.rightpane').css('overflow-x','hidden');
        $('.rightpane').css('overflow-y','auto');
        $('.resize span').removeClass('glyphicon-backward');
        $('.resize span').addClass('glyphicon-forward');
        $('.resize span').css('cursor','e-resize');
        map.invalidateSize();
      });
    } else if ($flo == 'right' && $('.resize span').hasClass('glyphicon-forward')) {
      if (localStorage.key('mapWidth')) { perc = localStorage['mapWidth'] } else { perc = 70 }
      $('.rightpane .inner').show();
      $('.leftpane').animate({'width':perc+"%"});
      $('.rightpane').animate({'width':(100-perc)+'%'});
      $('.resize').animate({$flo:perc+"%"},function(){
        $('.rightpane').css('overflow-x','hidden');
        $('.rightpane').css('overflow-y','auto');
        $('.resize span').removeClass('glyphicon-forward');
        $('.resize span').addClass('glyphicon-backward');
        $('.resize span').css('cursor','e-resize');
        map.invalidateSize();
      });
    }
    $('body').bind('mousemove',function(e){
      px = Math.max(Math.min(Math.max( ($dir == "ltr" ? e.pageX : window.innerWidth - e.pageX ),500),window.innerWidth - 480),500);
      $(".leftpane").css('width',px+'px')
      $("#rightpane").css('width',(window.innerWidth-px)+'px')
      $("#resize").css($flo,(px)+'px')
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
    if ($flo == 'left') {
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
    } else if ($flo == 'right') {
      if ($(this).hasClass('glyphicon-backward')) {
        $('.leftpane').animate({'width':window.innerWidth - 16});
        $('.rightpane').animate({'width':'16px'});
        $('.resize').animate({'right':window.innerWidth - 16},function(){
          $('.rightpane .inner').hide();
          $('.resize span').removeClass('glyphicon-backward').addClass('glyphicon-forward');
          $('.resize span').css('cursor','e-resize');
          map.invalidateSize();
        });
      } else {
        if (localStorage.key('mapWidth')) { perc = localStorage['mapWidth'] } else { perc = 70 }
        $('.rightpane .inner').show();
        $('.leftpane').animate({'width':perc+"%"});
        $('.rightpane').animate({'width':(100-perc)+'%'});
        $('.resize').animate({'right':perc+"%"},function(){
          $('.rightpane').css('overflow-x','hidden');
          $('.rightpane').css('overflow-y','auto');
          $('.resize span').removeClass('glyphicon-forward').addClass('glyphicon-backward');
          $('.resize span').css('cursor','w-resize');
          onResize();
        });
      }
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
        //$('.resize').animate({'left':perc+"%"},function(){
        $('.resize').animate({$flo:perc+"%"},function(){
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
      if($(this).closest(".horipane").hasClass('browse')){
        $(this).closest(".horipane").find('.content').slideUp();
      }
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
    id = $(this).data('id');
    selector = '#map .map_icon.id_'+id;
    $(selector).addClass('selected')
    transformItem(selector, 'scale', 1.25);
    $(selector).removeClass('mic').removeClass('min').addClass('hovered');
    if(Object.keys(markerc).indexOf(String(id))>=0) {
      markerc[String(id)].setZIndexOffset(markerCount+1)
      //updateInfo(1,markerc[String(id)].content)
    }
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

  var attrhash = attributeHash;
  var arrr = []

  if (cluster) {
    markerClusters = {}
    var cats = categoryHash;
    //console.log(cats)
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

  shownMarkers = 0
  $.each(markers, function(i,mark){
    if (!mark.a || !mark.o) {
      return 0
    }
    if (markers.length == 1){
      classname = 'map_icon cc c_'+mark.c+' r_'+mark.r+' s_'+mark.s+' p_'+mark.p+' id_'+mark.i+' loc_'+mark.l;
      var marker = L.marker([mark.a, mark.o],{
          icon: L.divIcon({ className: classname }),
        riseOnHover: true,
      }).addTo(markerLayer);
      markerc[mark.i] = marker;
      $('.id_'+mark.i).css('cursor','grab');
      $('.id_'+mark.i).css('cursor','-webkit-grab');
      return false
    }
    popcontent = '<div>';
    cclass = "";

    if (featureMap) {
      popcontent += "<div class='features'>";
      $.each(Object.keys(mark),function(i,n){
        if (isNaN(n[0])) return 0
        if (n.match(/^\d+:id$/i)) return 0
        id = parseInt(n.split(':')[0]);
        //console.log(id, fid, mark[n])
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

      if ('dmn' in mark && mark.dmn.length > 0) {
        dmns.push(mark.dmn[0])
        cclass = " c_"+mark.dmn[0];
        $.each(mark.tags,function(i,n){
          popcontent += "<span class='badge' style='background-color:#"+mark.dmn[i]+"'>"+n+"</span> &nbsp; "
        })
      }
      popcontent += "</div>";
    }
    popcontent += '</div>';

    pare = cluster ? markerClusters[mark.c] : markerLayer;
    classname = 'map_icon cc c_'+mark.c+' r_'+mark.r+' s_'+mark.s+' p_'+mark.p+' id_'+mark.i+''+cclass;
    var marker = L.marker([mark.a, mark.o],{
      icon: L.divIcon({ className: classname }),
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
      //updateInfo(1,marker.content);
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
    shownMarkers ++;
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
    setTimeout( mapFit, 200);
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
    px = Math.max(Math.min(Math.max(parseInt($('#resize').css($flo)),500),window.innerWidth - 480),500);
    //console.log(px)
    $("#map").css('width',px+'px');
    $("#rightpane").css('width',(window.innerWidth-px)+'px');
    $("#resize").css($flo,px+'px');
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
  removeGutters();
}

function dragEnd() {
  $('body').unbind('mousemove');
  dragging = false;
  if ($('#carousel_container').length > 0){resetCarousel();}
  map.invalidateSize();
  //if (parseInt($('#resize').css("left")) > window.innerWidth - 16) $('#resize').css("left", window.innerWidth - 16)
  if (parseInt($('#resize').css($flo)) > window.innerWidth - 16) $('#resize').css($flo, window.innerWidth - 16)
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
      if ($dir == "ltr") {
        $(e).css('margin-right','2%');
      } else {
        $(e).css('margin-left','2%');
      }
      $(e).css('float',$flo);
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
  if (arr.length > 0) {
    map.fitBounds(arr,{maxZoom:16});
  }
}

function mapFit(){
  markerBounds = markerLayer.getBounds();
  //console.log(markerBounds)
  if (markerBounds.getSouthWest() == undefined) {
    map.setView([16,26],2);
  } else {
    map.fitBounds(markerBounds,{padding:[8,80]});
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
      if (typeof $nomicmark != "undefined") {
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
  $('.recent tr').remove();
  scrolling = true;
  if ($page_query == "{}") {
    $query = '{"must":{"term":{"'+$leg+'":"'+id+'"}}}';
  } else {
    $query = '{"must":[{"term":'+$page_query+'},{"term":{"'+$leg+'":"'+id+'"}}]}';
  }
  ours = $('.legend .map-icon.i_'+id);
  mics = $('.leaflet-marker-icon.i_'+id);
  if (vis) {
    ours.addClass('hid').removeClass('vis');
    mics.hide();
  } else {
    ours.addClass('vis').removeClass('hid');
    mics.show();
  }
  ask();
}

function setLegend(id) {
  $('.recent tr').remove();
  scrolling = true;
  l = $leg.substr(0,1);
  if (parseInt(id) > 0) {
    if ($page_query == "{}") {
      $query = '{"must":{"term":{"'+$leg+'":"'+id+'"}}}';
    } else {
      $query = '{"must":[{"term":'+$page_query+'},{"term":{"'+$leg+'":"'+id+'"}}]}';
    }
    ours = $('.legend .map-icon.'+l+'_'+id);
    mics = $('.leaflet-marker-icon.'+l+'_'+id);
    $('.legend .map-icon').addClass('hid').removeClass('vis');
    $('.leaflet-marker-icon').hide();
    ours.addClass('vis').removeClass('hid');
    mics.show();
  } else {
    $query = '{"should":{"term":'+$page_query+'}}';
    ours = $('.legend .map-icon');
    mics = $('.leaflet-marker-icon');
    ours.removeClass('hid').addClass('vis');
    mics.show();
  }
  ask();
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
  inf = "<div class='maplink darkblue'><h4>"+pn+"</h4></div><div class='scrollme'>";
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
    console.log('fail - no pn');
    return 0
  }
  vect = $.grep(vectorinfo,function(i,n){return i.vector_datum.name == pn});
  //console.log(vect)
  if(vect.length == 0) {
    console.log('fail - no vect');
    return 0
  }
  vect = vect[0].vector_datum;
  if(vect['url']==="" || vect.loaded) {
    console.log('fail - no url');
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

