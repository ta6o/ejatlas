#!/bin/bash          
cd ../public/javascripts
cat jquery.js collapse.js affix.js dropdown.js tab.js transition.js modal.js leaflet.js leaflet-providers.js leaflet-loading.js oms.js noui.js ascii.js map.js ga.js > main.js
cat jquery.js collapse.js affix.js dropdown.js tab.js transition.js modal.js leaflet.js leaflet-providers.js leaflet-loading.js oms.js noui.js ascii.js devhelper.js > main-dev.js
cat jquery.js collapse.js affix.js dropdown.js tab.js transition.js modal.js leaflet.js leaflet-providers.js noui.js ascii.js jquery.validate.js jquery-ui.min.js maskedinput.js Google.js raphael.js colorwheel.js > backend.js
cd ../stylesheets
lessc bootstrap.less > app.css
lessc bootstrap-full.less > app-full.css
cat app.css leaflet.css leaflet-loading.css noui.css autocomplete.css > main.css
cat app-full.css leaflet.css leaflet-loading.css noui.css autocomplete.css > main-full.css
date
