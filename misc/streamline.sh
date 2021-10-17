#!/bin/bash          

cd ../public/javascripts/dist

cat jquery-3.5.0.min.js transition.js collapse.js affix.js dropdown.js tab.js modal.js \
  tooltip.js popover.js ../filter.js \
  leaflet.js leaflet-providers.js leaflet-loading.js leaflet.markercluster.js\
  oms.js noui.js ascii.js jquery-ui-1.12.1.js ../map.js ga.js xml2json.js > ../all.js

cat jquery-3.5.0.min.js transition.js collapse.js affix.js dropdown.js tab.js modal.js \
  tooltip.js popover.js ../filter.js leaflet.js leaflet-providers.js leaflet-loading.js leaflet.markercluster.js\
  oms.js noui.js ascii.js jquery-ui-1.12.1.js devhelper.js xml2json.js VectorTileLayer.min.js > ../all-dev.js

cat jquery-3.5.0.min.js transition.js collapse.js affix.js dropdown.js tab.js modal.js \
  tooltip.js popover.js ../filter.js \
  alert.js leaflet.js leaflet-providers.js noui.js ascii.js jquery.validate.js \
  jquery-ui-1.12.1.js jquery.maskedinput.min.js Google.js raphael.js colorwheel.js \
  xml2json.js nicedit.js modal.js > ../backall.js


cat jquery-3.5.0.min.js transition.js collapse.js affix.js dropdown.js tab.js modal.js \
  tooltip.js popover.js ../filter.js \
  oms.js noui.js ascii.js jquery-ui-1.12.1.js providers.js xml2json.js > ../ol-dev.js

cat jquery-3.5.0.min.js transition.js collapse.js affix.js dropdown.js tab.js modal.js \
  tooltip.js popover.js ../filter.js oms.js noui.js ascii.js \
  jquery-ui-1.12.1.js providers.js xml2json.js ol.js > ../all-ol.js

cd ..

java -jar ../../lib/yui.jar --type js --nomunge all.js > main.js
#cp all.js main.js

#java -jar ../../lib/yui.jar --type js --nomunge all-dev.js > main-dev.js
cp all-dev.js main-dev.js

java -jar ../../lib/yui.jar --type js --nomunge backall.js > backend.js
#cp backall.js backend.js

#java -jar ../../lib/yui.jar --type js --nomunge all-ol.js > main-ol.js
cp all-ol.js main-ol.js

cd ../stylesheets/bootstrap

lessc bootstrap.less > ../app.css
lessc bootstrap-full.less > ../app-full.css
lessc bootstrap-rtl.less > ../app-rtl.css
lessc bootstrap-full-rtl.less > ../app-full-rtl.css

cd ../dist

cat jquery-ui.min.css ../app.css          leaflet.css leaflet-loading.css > ../all.css
cat jquery-ui.min.css ../app-full.css     leaflet.css leaflet-loading.css > ../all-full.css
cat jquery-ui.min.css ../app-rtl.css      leaflet.css leaflet-loading.css > ../all-rtl.css
cat jquery-ui.min.css ../app-full-rtl.css leaflet.css leaflet-loading.css > ../all-full-rtl.css

cat jquery-ui.min.css ../app-full.css     ol.css ol-layerswitcher.css > ../ol-full.css
cat jquery-ui.min.css ../app-full-rtl.css ol.css ol-layerswitcher.css > ../ol-full-rtl.css

cd ..

java -jar ../../lib/yui.jar --type css ./all.css > ./main.css
java -jar ../../lib/yui.jar --type css ./all-full.css > ./main-full.css
java -jar ../../lib/yui.jar --type css ./all-rtl.css > ./main-rtl.css
java -jar ../../lib/yui.jar --type css ./all-full-rtl.css > ./main-full-rtl.css

java -jar ../../lib/yui.jar --type css ./ol-full.css > ./main-ol.css
java -jar ../../lib/yui.jar --type css ./ol-full-rtl.css > ./main-ol-rtl.css

echo `date` > ../../lib/stamp
date
