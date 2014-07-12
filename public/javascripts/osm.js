var map;
function initMap(loc) {
    
    // The overlay layer for our marker, with a simple diamond as symbol
    var overlay = new OpenLayers.Layer.Vector('Overlay', {
        styleMap: new OpenLayers.StyleMap({
            externalGraphic: '/images/marker.png',
            graphicWidth: 20, graphicHeight: 24, graphicYOffset: -24,
            title: '${tooltip}'
        })
    });

    // The location of our marker and popup. We usually think in geographic
    // coordinates ('EPSG:4326'), but the map is projected ('EPSG:3857').
    var myLocation = new OpenLayers.Geometry.Point(loc[0],loc[1])
        .transform('EPSG:4326', 'EPSG:3857');

    var turkeyBounds = new OpenLayers.Bounds(25.5,35.5,45,42.3).transform('EPSG:4326', 'EPSG:3857');
    marker = new OpenLayers.Feature.Vector(myLocation, {tooltip: 'OpenLayers'})
    // We add the marker with a tooltip text to the overlay
    overlay.addFeatures([ marker ]);

    // A popup with some information about our location
    var popup = new OpenLayers.Popup.FramedCloud("Popup", 
        myLocation.getBounds().getCenterLonLat(), null,
        '<a target="_blank" href="http://openlayers.org/">We</a> ' +
        'could be here.<br>Or elsewhere.', null,
        true // <-- true if we want a close (X) button, false otherwise
    );

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
                  marker.move(lonlat);
                  m = lonlat.transform('EPSG:3857', 'EPSG:4326');
                  updateMapLL(m.lon, m.lat);
                }

            });
    sline = new OpenLayers.Control.ScaleLine(),
    zum = new OpenLayers.Control.Zoom(),
    attr = new OpenLayers.Control.Attribution(),
    navi = new OpenLayers.Control.Navigation(),
    dbl = new OpenLayers.Control.DblClick();
    overdrag = new OpenLayers.Control.DragFeature(overlay)
    // Finally we create the map
    map = new OpenLayers.Map({
        div: "map", projection: "EPSG:3857",
        layers: [osm, overlay],
        controls:[
          sline,
          zum,
          attr,
          navi,
          overdrag,
          dbl
        ]
    });
    
    function activateMap() {
      sline.activate();
      zum.activate();
      attr.activate();
      navi.activate();
      overdrag.activate();
      dbl.activate();
    }
    
    function deactivateMap() {
      sline.deactivate();
      zum.deactivate();
      attr.deactivate();
      navi.deactivate();
      overdrag.deactivate();
      dbl.deactivate();
    }

    activateMap();

    overdrag.onComplete = function (marker){
      m = marker.geometry.clone().transform('EPSG:3857', 'EPSG:4326');
      updateMapLL(m.x, m.y);
    };

    m = marker.geometry.clone().transform('EPSG:3857', 'EPSG:4326');
    updateMapLL(m.x, m.y);

    function updateMapLL (n,t) {
      ln = OpenLayers.Util.getFormattedLonLat(n, 'lon', 'dms');
      lt = OpenLayers.Util.getFormattedLonLat(t, 'lat', 'dms');
      $('#maplat').html(lt);
      $('#imaplat').val(n);
      $('#maplon').html(ln);
      $('#imaplon').val(t);
    }

}
