#!/bin/bash          

cd ../public/javascripts

cat jquery.js transition.js collapse.js affix.js dropdown.js tab.js modal.js \
  tooltip.js popover.js \
  leaflet.js leaflet-providers.js leaflet-loading.js oms.js noui.js ascii.js \
  jquery-ui.min.js map.js ga.js xml2json.js > all.js

java -jar ../../misc/yui.jar --type js all.js > main.js

cat jquery.js transition.js collapse.js affix.js dropdown.js tab.js modal.js \
  tooltip.js popover.js \
  leaflet.js leaflet-providers.js leaflet-loading.js oms.js noui.js ascii.js \
  jquery-ui.min.js devhelper.js xml2json.js > main-dev.js

cat jquery.js transition.js collapse.js affix.js dropdown.js tab.js modal.js \
  leaflet.js leaflet-providers.js noui.js ascii.js jquery.validate.js \
  jquery-ui.min.js maskedinput.js Google.js raphael.js colorwheel.js \
  xml2json.js nicedit.js > back.js

java -jar ../../misc/yui.jar --type js back.js > backend.js

cd ../stylesheets

lessc bootstrap.less > app.css
lessc bootstrap-full.less > app-full.css
cat app.css leaflet.css leaflet-loading.css jquery-ui.min.css > all.css
cat app-full.css leaflet.css leaflet-loading.css jquery-ui.min.css > all-full.css
java -jar ../../misc/yui.jar --type css all.css > main.css
java -jar ../../misc/yui.jar --type css all-full.css > main-full.css
date
