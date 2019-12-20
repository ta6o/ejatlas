#!/bin/bash          

cd ../public/javascripts

cat jquery.js transition.js collapse.js affix.js dropdown.js tab.js modal.js \
  tooltip.js popover.js \
  leaflet.js leaflet-providers.js leaflet-loading.js leaflet.markercluster.js\
  oms.js noui.js ascii.js jquery-ui.min.js map.js ga.js xml2json.js > all.js

cat jquery.js transition.js collapse.js affix.js dropdown.js tab.js modal.js \
  tooltip.js popover.js \
  leaflet.js leaflet-providers.js leaflet-loading.js leaflet.markercluster.js\
  oms.js noui.js ascii.js jquery-ui.min.js devhelper.js xml2json.js VectorTileLayer.min.js > all-dev.js

cat jquery.js transition.js collapse.js affix.js dropdown.js tab.js modal.js \
  tooltip.js popover.js \
  alert.js leaflet.js leaflet-providers.js noui.js ascii.js jquery.validate.js \
  jquery-ui.min.js maskedinput.js Google.js raphael.js colorwheel.js \
  xml2json.js nicedit.js > backall.js

java -jar ../../lib/yui.jar --type js all.js > main.js
java -jar ../../lib/yui.jar --type js all-dev.js > main-dev.js
java -jar ../../lib/yui.jar --type js backall.js > backend.js

cd ../stylesheets

lessc bootstrap.less > app.css
lessc bootstrap-full.less > app-full.css
lessc bootstrap-rtl.less > app-rtl.css
lessc bootstrap-full-rtl.less > app-full-rtl.css

cat jquery-ui.min.css app.css leaflet.css leaflet-loading.css > all.css
cat jquery-ui.min.css app-full.css leaflet.css leaflet-loading.css > all-full.css
cat jquery-ui.min.css app-rtl.css leaflet.css leaflet-loading.css > all-rtl.css
cat jquery-ui.min.css app-full-rtl.css leaflet.css leaflet-loading.css > all-full-rtl.css

java -jar ../../lib/yui.jar --type css ./all.css > ./main.css
java -jar ../../lib/yui.jar --type css ./all-full.css > ./main-full.css
java -jar ../../lib/yui.jar --type css ./all-rtl.css > ./main-rtl.css
java -jar ../../lib/yui.jar --type css ./all-full-rtl.css > ./main-full-rtl.css

echo `date` > ../../lib/stamp
date
