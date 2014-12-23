#!/bin/bash          
cd ../public/javascripts
cat jquery.js collapse.js affix.js dropdown.js tab.js transition.js modal.js leaflet.js leaflet-providers.js noui.js map.js ga.js > main.js
cd ../stylesheets
lessc bootstrap.less > app.css
lessc bootstrap-full.less > app-full.css
cat app.css leaflet.css noui.css > main.css
cat app-full.css leaflet.css noui.css > main-full.css

