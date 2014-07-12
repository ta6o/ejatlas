var map;
function initMap(markerinfo) {

    // The overlay layer for our marker, with a simple diamond as symbol
    var overlay = new OpenLayers.Layer.Vector('Overlay', {
        styleMap: new OpenLayers.StyleMap({
            externalGraphic: '/images/${icon}.png',
            graphicWidth: 20, graphicHeight: 24, graphicYOffset: -24,
            //title: '${tooltip}'
        })
    });

    // The location of our marker and popup. We usually think in geographic
    // coordinates ('EPSG:4326'), but the map is projected ('EPSG:3857').

    var turkeyBounds = new OpenLayers.Bounds(25.5,35.5,45,42.3).transform('EPSG:4326', 'EPSG:3857');
    
    markers = [];
    $.each(markerinfo,function(i,v){
      c = JSON.parse(v);
      //console.log(c)
      var confloc = new OpenLayers.Geometry.Point(c.lat,c.lon).transform('EPSG:4326', 'EPSG:3857');
      marker = new OpenLayers.Feature.Vector(confloc, {tooltip: c.name, id: c.id, icon: 'marker'});
      markers.push(marker);
    });
    //console.log(markers);
    overlay.addFeatures( markers );

    /* A popup with some information about our location
    var popup = new OpenLayers.Popup.FramedCloud("Popup", 
        myLocation.getBounds().getCenterLonLat(), null,
        '<a target="_blank" href="http://openlayers.org/">We</a> ' +
        'could be here.<br>Or elsewhere.', null,
        true // <-- true if we want a close (X) button, false otherwise
    );
    */

    var osm = new OpenLayers.Layer.OSM();
    /*var gsat = new OpenLayers.Layer.Google(
                "Google Satellite",
                {type: google.maps.MapTypeId.SATELLITE, numZoomLevels: 22});
    var ghyb = new OpenLayers.Layer.Google(
                "Google Hybrid",
                {type: google.maps.MapTypeId.HYBRID, numZoomLevels: 20});
                */
    OpenLayers.Control.DblClick = OpenLayers.Class(OpenLayers.Control, {                
        defaultHandlerOptions: {
            'single': false,
            'double': true,
            'pixelTolerance': 0,
            'stopSingle': false,
            'stopDouble': false
        },

        initialize: function(options) {
            this.handlerOptions = OpenLayers.Util.extend(
                {}, this.defaultHandlerOptions
            );
            OpenLayers.Control.prototype.initialize.apply(
                this, arguments
            ); 
            this.handler = new OpenLayers.Handler.Click(
                this, {
                    'dblclick': this.trigger
                }, this.handlerOptions
            );
        }, 

        trigger: function(e) {
          var lonlat = map.getLonLatFromPixel(e.xy);
          m = lonlat.transform('EPSG:3857', 'EPSG:4326');
          updateMapLL(m.lon, m.lat);
        }

    });

    var onFeatureHighlighted = function (evt) {
        var onPopupClose = function (evt) {
          var feature = this.feature;
          if (feature.layer) {
            hover.unselect(feature);
          }  
          this.destroy();
        }
        //console.log(evt)
        feature = evt.feature;
        evt.object.map.div.style.cursor = 'pointer';
        popup = new OpenLayers.Popup.FramedCloud("featurePopup",
                feature.geometry.getBounds().getCenterLonLat(),
                new OpenLayers.Size(100,50),
                "<h4><a onclick='getInfo("+feature.data.id+",'"+feature.data.tooltip+"')'>"+feature.data.tooltip + "</a></h4>",
                null, false, onPopupClose);
        feature.popup = popup;
        popup.feature = feature;
        map.addPopup(popup, true);
    }
    var onFeatureUnhighlighted = function (evt) {
      evt.feature.popup.destroy();
      evt.object.map.div.style.cursor = 'default';
    }

    hover = new OpenLayers.Control.SelectFeature( [overlay], { hover: true, highlightOnly:true, eventListeners: {'featurehighlighted': onFeatureHighlighted, 'featureunhighlighted': onFeatureUnhighlighted,} });

    clicks = new OpenLayers.Control.SelectFeature( [overlay], { clickout: true, toggle: false, multiple: false, hover: false, toggleKey: "ctrlKey" });

    overlay.events.on({
      "featureselected": function(e) {
        //console.log(e);
        getInfo(e.feature.data.id,e.feature.data.tooltip);
      },
      "featureunselected": function(e) {
        getBack();
      },
      
    });

    sline = new OpenLayers.Control.ScaleLine(),
    zum = new OpenLayers.Control.Zoom(),
    attr = new OpenLayers.Control.Attribution(),
    navi = new OpenLayers.Control.Navigation(),
    dbl = new OpenLayers.Control.DblClick();

    // Finally we create the map
    map = new OpenLayers.Map({
        div: "map", projection: "EPSG:3857",
        layers: [osm, overlay],
        restrictedExtent: turkeyBounds,
        numZoomLevels: null, 
        controls:[
          sline,
          zum,
          attr,
          navi,
          dbl,
          hover,
          clicks,
        ]
    });
    
    function activateMap() {
      sline.activate();
      zum.activate();
      attr.activate();
      navi.activate();
      dbl.activate();
      hover.activate();
      clicks.activate();
    }
    
    function deactivateMap() {
      sline.deactivate();
      zum.deactivate();
      attr.deactivate();
      navi.deactivate();
      dbl.deactivate();
      hover.deactivate();
      clicks.deactivate();
    }

    activateMap();

    function updateMapLL (n,t) {
      ln = OpenLayers.Util.getFormattedLonLat(n, 'lon', 'dms');
      lt = OpenLayers.Util.getFormattedLonLat(t, 'lat', 'dms');
    }

    map.zoomToExtent(turkeyBounds);
}
function getInfo(id,name) {
  $.get('table/'+id, function(data){
    $('#name').html(name);
    $('#conflict_summary').html(data);
    $('#print').attr('href','/conflicts/print/'+id);
    if (clear) { $('#edit').attr('href','/conflicts/edit/'+id); };
    $('#commands').show();
    $('#conflict_summary').fadeIn();
  });
}
function getBack() {
  $('#name').html('Çevre İhtilafları Haritası Hakkında');
  $('#conflict_summary').hide();
  $('#commands').fadeOut();
}

