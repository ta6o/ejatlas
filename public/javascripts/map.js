var markerc, info, markerLayer, markerBounds, disclaimer, map, sat, rect, geojson, markerCount, data;
var jsons = {};
var big = 0;
var all = 0;
var loadQueue = 0;
var overlayMaps = { };
var choropleths = { };
var baselayers = { };
var lControl;
var homeButton;
var acme;
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
  $.each(layers,function(i,e){
    f = e.split('.');
    baselayers[f[f.length-1].replace(/([A-Z]+)/g, " $1").trim()] = L.tileLayer.provider(e, {minZoom: 2, maxzoom:18});
  })

  markerLayer = L.featureGroup();

  map = L.map('map',{
    zoom: 1,
    layers: [baselayers[(Object.keys(baselayers)[0])], markerLayer]
  });

  /*
  sat = L.map('sat',{
    scrollWheelZoom:false,
    zoomControl: false,
    layers: [satellite]
  });
  */


  $.each(vector,function(i,v){
    loadJS(v["vector_datum"]["url"])
  });

  lControl = L.control.layers(baselayers, overlayMaps).addTo(map);

  //maxBounds = new L.LatLngBounds(new L.LatLng(90,240), new L.LatLng(-90,-240))

  $(document).on('click','.legend .map-icon',function(e){
    //console.log(e)
    id = $(e.target).attr('class').match(/i_\d+/)[0].replace('i_','');
    if (e.shiftKey) {
      vis = $(e.target).hasClass('vis');
      toggleLegend(id,vis);
    } else {
      setLegend(id);
    }var HomeButton
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
          popcontent += '<br /><strong>'+attrhash[n.split(':')[1]]+':</strong> ';
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
  
  markerBounds = markerLayer.getBounds();
  map.fitBounds(markerBounds);

  map.on('zoomend', function() { markerSize(); });
  updateInfo(1,disclaimer);
  markerSize();
  map.on('overlayremove', function (el) {
    if (choropleths[el.name] != undefined) {
      legend = rtlegend;
      updateInfo(1,disclaimer)
    }
  });
  map.on('overlayadd', function (el) {
    if (choropleths[el.name] != undefined) {
      legend = '<div class="legend"><h5>'+el.name+'</h5><table> <tbody>';
      $.each(choropleths[el.name],function(k,v){
        legend += '<tr> <td> <div class="chlegend" style="background-color:#'+v['hex']+'"></div> </td> <td class="chdesc">'+v['text']+'</td> </tr>';
      });
      legend += '</tr></tbody></table></div>';
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
        console.log($(".c_"+n));
        $(".c_"+n).css("border","4px solid #"+n);
      })
    }
  });


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
  }
};

function getInfo(id,name,pos,zoom) {
  marker = markerc[id]
  updateInfo(1,marker.content);
  pos = marker.getLatLng();
  //console.log(pos)
  map.setZoom(zoom);
  map.panTo(pos);
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
  $('#conflict_summary').hide();
  $('#commands').fadeOut();
  $('.leaflet-marker-icon').show();
  map.fitBounds(markerBounds);
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
  chname = feature.properties.pn
  if (feature.properties['value']) {
    dense = choropleths[chname][feature.properties['value']]['hex'];
  }else {
    dense = choropleths[chname]['1']['hex'];
  }
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
  var pn = layer.feature.pn
  if (pn == "Borders") return
  vector = $(vectorinfo).filter(function(i,n){
    return (n['vector_datum']['name']==pn)
  });
  var desc = vector[0]['vector_datum']['description']
  updateInfo(1,"<h4><strong>"+pn+"</strong></h4><p>"+desc+"</p>");
  layer.setStyle({
    fillOpacity: 1
  });

  if (!L.Browser.ie && !L.Browser.opera) {
      layer.bringToFront();
  }
}


function highlightChFeature(e) {
  var layer = e.target;
  //console.log(e)
  chname = layer.feature.properties.pn
  updateInfo(1,"<h4><strong>"+layer.feature.properties.name+"</strong> ("+choropleths[chname][String(layer.feature.properties.value)]['text']+")</h4>");
  layer.setStyle({
    fillOpacity: 1
  });

  if (!L.Browser.ie && !L.Browser.opera) {
      layer.bringToFront();
  }
}
var lay = null;
function resetHighlight(e) {
  //updateInfo(1,disclaimer);
  var layer = e.target;
  lay = e
  layer.setStyle(jsons[layer.feature.category]['style']);
  if (!L.Browser.ie && !L.Browser.opera) {
      layer.bringToFront();
  }
}

function resetChHighlight(e) {
  updateInfo(1,disclaimer);
  var layer = e.target;
  layer.setStyle(style(layer.feature));
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

function onEachChFeature(feature, layer) {
  layer.on({
    mouseover:highlightChFeature,
    mouseout: resetChHighlight,
    dblclick: zoomToFeature,
  });
}

function showVectors () {
  $.each(vectorinfo,function(i,v){
    vect = v["vector_datum"];
    if(vect['url']==="") return 0
    console.log(vect["name"]);
    sr = vect["url"].split('/')
    vr = sr[sr.length-1].split('.')[0].replace(/\d/g,'').replace(/[-_]+/g,'_');
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
      //tl = toTitleCase(vr.substr(4).replace('_',' '))
      tl = vect["name"]
      ly = eval(vr);
      console.log(ly)
      $.each(ly["features"],function(index,feature){
        feature["category"] = tl;
        feature["name"] = vr;
      });
      jsons[tl] = ly;
      jsons[tl]['style'] = lStyle;
      overlayMaps[tl] = L.geoJson(ly['features'],{style: lStyle, pointToLayer: pToLayer, onEachFeature:onEachFeature});
      if (vect["shown"] == '1') { overlayMaps[tl].addTo(map);}
    } else {
      tl = vect['name']
      vurl = vect['url'].split('/')
      vurl = vurl[vurl.length-1].split('.')[0]
      vurl = vurl.toLowerCase();
      vurl = vurl.replace(/[-_\s\/]+/g,'-');
      vurl = vurl.replace(/[^\.\w-]+/g,'');
      vurl = vurl.replace(/\d+/g,'');
      vurl = vurl.replace(/-+/g,'_');
      ly = eval(vurl);
      jsons[tl] = ly;
      choropleths[tl] = JSON.parse(vect['choropleth'])
      overlayMaps[tl] = L.geoJson(ly['features'],{style: style, pointToLayer: pToLayer, onEachFeature:onEachChFeature});
      if (vect["shown"] == '1') { overlayMaps[tl].addTo(map);}
    }
  });
  window.setTimeout(updateControl,1000)
}
function getObjectSize(obj) {
  var size = 0, key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) size++;
  }
  return size; // return the size of the object
}
function updateControl () {
  console.log("omaps: "+getObjectSize(overlayMaps))
  lControl.removeFrom(map);
  lControl = L.control.layers(baselayers, overlayMaps).addTo(map);
  var choropleth_legend = L.Control.extend({
    options: {
      position: 'top'
    },

    onAdd: function (map) {
      var container = L.DomUtil.create('div', 'choropleth-legend');
      return container;
    }
  });
}

function vectorPing(varname) {
  loadQueue -= 1;
  console.log(loadQueue+' '+varname['features'][0]['pn'])
  if (loadQueue == 0) {
    showVectors();
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
