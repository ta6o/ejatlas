#!/bin/bash          
cd ../public/javascripts
cat jquery.js collapse.js affix.js dropdown.js tab.js transition.js leaflet.js leaflet-providers.js noui.js mapz.js> main.js
cd ../stylesheets
cat app.css leaflet.css noui.css > main.css

