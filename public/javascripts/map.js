var markerc, info, markerLayer, markerBounds, disclaimer, map, sat, rect, geojson, markerCount, data, conflict, zoom, pan, bounds, maxBounds, lControl, homeButton, acme;
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

var rtlegend = '<div class="legend"><table> <tbody><tr> <td> <div class="vis map-icon min i_1 s_1"></div> </td> <td class="desc">Nuclear</td> </tr> <tr> <td> <div class="vis map-icon min i_2 s_1"></div> </td> <td class="desc">Mineral Ores and Building Extractions</td> </tr> <tr> <td> <div class="vis map-icon min i_3 s_1"></div> </td> <td class="desc">Waste Management</td> </tr> <tr> <td> <div class="vis map-icon min i_4 s_1"></div> </td> <td class="desc">Biomass and Land Conflicts</td> </tr> <tr> <td> <div class="vis map-icon min i_5 s_1"></div> </td> <td class="desc">Fossil Fuels and Climate Justice</td> </tr> <tr> <td> <div class="vis map-icon min i_6 s_1"></div> </td> <td class="desc">Water Management</td> </tr> <tr> <td> <div class="vis map-icon min i_7 s_1"></div> </td> <td class="desc">Infrastructure and Built Environment</td> </tr> <tr> <td> <div class="vis map-icon min i_8 s_1"></div> </td> <td class="desc">Tourism Recreation</td> </tr> <tr> <td> <div class="vis map-icon min i_9 s_1"></div> </td> <td class="desc">Biodiversity Conservation Conflicts</td> </tr> <tr> <td> <div class="vis map-icon min i_10 s_1"></div> </td> <td class="desc">Industrial and Utilities Conflicts</td> </tr></tbody></table></div>';
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
  $.each(layers.split(','),function(i,e){
    f = e.split('.');
    console.log(e);
    baselayers[f[f.length-1].replace(/([A-Z]+)/g, " $1").trim()] = L.tileLayer.provider(e, {minZoom: 1, maxzoom:18});
  })

  if (maptitle == "") {
    rtlegend = "";
    legend = "";
  }

  markerLayer = L.featureGroup();

  maxBounds = new L.LatLngBounds(new L.LatLng(90,240), new L.LatLng(-90,-240))
  bounds = maxBounds;

  if (Object.keys(baselayers).length > 0) {
    active = baselayers[(Object.keys(baselayers)[0])];
  } else {
    active = {};
    $('#map').css('background','transparent');
    $('#map').css('box-shadow','none');
  }
  console.log(active)
  map = L.map('map',{
    scrollWheelZoom: true,
    worldCopyJump: true,
    maxBounds: maxBounds,
    bounceAtZoomLimits: false,
    layers: [active, markerLayer]
  });

  $.each(vector,function(i,v){
    loadJS(v["vector_datum"]["url"])
  });

  lControl = L.control.layers(baselayers, overlayMaps).addTo(map);

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

  homeButton = new HomeButton();
  map.addControl(homeButton);

  $('.home-button').html('<span class="glyphicon glyphicon-home"></span>')

  markerCount = markers.length;
  markerc = {};
  var attrhash = {"category_id":"Category","types":"Types","other_types":"Other Types","description":"Description","country_id":"Country","province":"Province","site":"Site","accuracy_level":"Level of Accuracy","project_area":"Project Area","project_length":"Project Length","population_type":"Type of Population","products":"Commodities","other_products":"Other Commodities","companies":"Companies","supporters":"IFI's","other_supporters":"Other IFI's","ejos":"EJO's","govt_actors":"Government Actors","mobilizing_groups":"Mobilizing Groups","other_mobilizing_groups":"Other Mobilizing Groups","mobilizing_forms":"Mobilizing Forms","other_mobilizing_forms":"Other Mobilizing Forms","env_impacts":"Environmental Impacts","other_env_impacts":"Other Environmental Impacts","hlt_impacts":"Health Impacts","other_hlt_impacts":"Other Health Impacts","sec_impacts":"Socio-economic Impacts","other_sec_impacts":"Other Socio-economic Impacts","conflict_events":"Outcomes","other_outcomes":"Other Outcomes","project_details":"Project Details","investment_string":"Level of Investment","affected_people":"Potentially Affected Population","status_id":"Intensity Level","reaction_id":"Reactionary Stage","start_date":"Start Date","end_date":"End Date","project_status_id":"Project Status","suggested_alternatives":"Development of Alternatives","success_level":"Succes Level","success_reason":"Success Reason","other_comments":"Other Comments"};
  $.each(markers, function(i,m){
    mark = m;//JSON.parse(m);
    popcontent = "<div class='loading'><img src='/images/loading.gif'></div><h4 class='maplink'><a href='/conflict/"+mark.slug+"'>"+mark.name + "</a></h4><div class='clearfix' style='padding:24px 16px;'><div class='map-icon i_"+mark.clr+" s_1 pull-left'></div><div class='pull-left' style='position:relative;top:-20px;left:12px;width:210px;'>";
    if (mark.cat !== '' ) {popcontent += "<strong>"+mark.cat+"</strong>"};
    //if (mark.start !== '' ) {popcontent += "<br /><small><strong>Start date:</strong> "+mark.start+"</small>"} else {popcontent += "<br /><small>&nbsp;</small>"};
    popcontent += '</div>';
    if ('dmn' in mark) {
      dmns.push(mark.dmn[0])
      popcontent += "<div class='features'>";
      $.each(Object.keys(mark),function(i,n){
        if (isNaN(n[0])) return 0
        id = parseInt(n.split(':')[0]);
        if (id == fid && mark[n]) {
          console.log(n)
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
            className: 'map_icon mic i_'+mark.clr+' s_1 id_'+mark.id+' c_'+mark.dmn[0],
          }),
        riseOnHover: true,
      }).addTo(markerLayer);
    } else {
      var marker = L.marker([mark.lat, mark.lon],{
        icon: L.divIcon({
            className: 'map_icon mic i_'+mark.clr+' s_1 id_'+mark.id,
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
  map.on('overlayremove', function (el) {
    if (choropleths[el.name] != undefined) {
      legend = rtlegend;
      updateInfo(1,disclaimer)
    }
  });
  $('#conflict_summary').on('click','.seemore',function(e){
      e.preventDefault();
      $(this).hide();
      $(this).next('.more').slideDown();
  });

  $('#conflict_summary').on('click','.seeless',function(e){
      e.preventDefault();
      $(this).parent().prev('.seemore').show();
      $(this).parent().slideUp();
  });
  $(document).ready(function(){
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

function mapFit(){
  conflict = false;
  markerBounds = markerLayer.getBounds();
  console.log(markerBounds)
  if (markerBounds.getSouthWest() == undefined) {
    map.setView([16,26],2);
  } else {
    iw = window.innerWidth/1.8;
    console.log(iw);
    map.fitBounds(markerBounds,{paddingBottomRight: [iw,0]});
  }
}

function markerSize() {
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
    info.html(legend);
  } else if (type == 1) {
    html = "<div class='infocontent'>"+content+"</div>";
    if (dmns.length == 0){ 
      html += legend;
    }
    info.html(html);
  } else if (type == 2) {
    info.html(content);
  }
};

function getInfo(id,name,p,z) {
  conflict = true;
  zoom = z;
  marker = markerc[id]
  pan = marker.getLatLng();
  updateInfo(1,marker.content);
  map.setView(pan,zoom);
  $.getJSON('/table/'+id, function(dat){
    //console.log(dat)
    data = dat;//JSON.parse(dat);
    $('#disclaimer').hide();
    $('#name').html(name);
    $('#conflict_summary').html(data["table"]);
    $('#-').attr('href','/conflicts/print/'+id);
    if (clear) { 
      $('#edit').attr('href','/conflicts/edit/'+id);
      $('#new_version').attr('href','/conflicts/new_version/'+id);
    };
    if (clearuser) {
      $('#details').attr('href','/conflicts/details/'+id);
      $('#new_version').attr('href','/conflicts/new_version/'+id);
    };
    $('#commands').show();
    $('#conflict_summary').show();
    $('#name').show();
    //window.history.pushState(name, name, data["slug"]);
    //document.title = name+" | EJAtlas";
    $('.loading').hide();
  });
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
  ours = $('.legend .map-icon.i_'+id);
  mics = $('.leaflet-marker-icon.i_'+id);
  $('.legend .map-icon').addClass('hid').removeClass('vis');
  $('.leaflet-marker-icon').hide();
  ours.addClass('vis').removeClass('hid');
  mics.show();
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
  if (jsons[pn]['desc']){ inf += "<p><strong>"+jsons[pn]['desc']+"</strong></p>" }
  if (jsons[pn]['legend']){ inf += jsons[pn].legend.replace("class=\"legend\"","class=\"legend static\"") }
  ia = []
  if (layer.feature.properties && layer.feature.properties.data) {
    $.each(layer.feature.properties.data,function(k,v){
      if (v) {
        ia.push("<strong>"+k.replace(/^feature_/,"").replace(/_/g," ").replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1)})+":</strong> "+v);
      }
    });
  }
  inf += ia.join("<br />");
  if (jsons[pn]['source']){ inf += "<p><strong>Source: "+jsons[pn]['source']+"</strong></p>" }
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
  console.log(vr);
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
  if (vect["shown"] == '1') { overlayMaps[tl].addTo(map);}
  updateControl();
}

function getObjectSize(obj) {
  var size = 0, key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) size++;
  }
  return size; // return the size of the object
}

function updateControl () {
  lControl.removeFrom(map);
  lControl = L.control.layers(baselayers, overlayMaps).addTo(map);
  /*var choropleth_legend = L.Control.extend({
    options: {
      position: 'top'
    },

    onAdd: function (map) {
      var container = L.DomUtil.create('div', 'choropleth-legend');
      return container;
    }
  });*/
}

function vectorPing(varname) {
  loadQueue -= 1;
  if (varname.features[0].pn) {
    pn = varname.features[0].pn;
  } else if (varname.features[0].properties.pn) {
    pn = varname.features[0].properties.pn;
  }
  console.log(loadQueue+' '+varname['features'][0]['pn'])
  showVector(varname);
  if (loadQueue == 0) {
    console.log('all vectors loaded');
  }
}

function loadJS(filename){
  if (/(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/.test(filename)) {
    loadQueue += 1;
    var fileref = document.createElement('script')
    fileref.setAttribute("type","text/javascript")
    fileref.setAttribute("src", filename)
    document.getElementsByTagName("head")[0].appendChild(fileref)
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
      console.log(err);
      console.log(canvas);
      var dataURL = canvas.toDataURL("image/png");
      typeof dataURL
      $.post('/image',{image: dataURL},function(data){
        console.log(data);
        if (data != "ok") {
          console.log('$erif')
        }
      });
  });
}

function toSlug(url) {
  arr = url.split('/');
  return ascii(arr[arr.length-1].split('.')[0].toLowerCase().replace(/-+/g,' ').replace(/\d/g,'').replace(/\s+/g,'_'));
}

