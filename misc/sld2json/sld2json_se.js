var us = require('underscore');
var util = require('util');
var path = require('path');
var parseString = require('xml2js').parseString;
var fs = require('fs');
var xml2js = require('xml2js');
var parser = new xml2js.Parser();
var nrToParse = 1; //nr to check if last file is converted - if so the end of json file is written!
var nrParsed = 0; //Nr of parsed files so far
var filename = process.argv[2]
var targetname = filename
targetname = targetname.split("/")[targetname.split("/").length - 1].split(".")[0]+".json"


//-----------------------TODO-------------------------------------
//ADD YOUR SPECIFIC INFO HERE BEFORE RUNNING THE CODE:
var styleSpecName = 'MapboxGLStyle2';//choose the name you want
var sourceName = ''; //name of source for the tiles you want the style specification to apply for
var sourceUrl = ''; //URL to the tileJSON resource
var type = 'vector';//vector, raster, GeoJSON ++


//-----------------------  Run script  ------------------------//

//You can run the script either from one file or a directory of files.
//Comment out the one you don't want

//add path for directory where all files you want to convert are placed
//var DIRECTORY_PATH = 'exampleMultipleLayers';
//parseAllFiles(DIRECTORY_PATH); //parse all files in given directory

var SPECIFIC_FILE_PATH = filename; //path of specific file
parse_sld_to_rules_tag(SPECIFIC_FILE_PATH); //Parse only one file


//-------------------------------------------------------------//

var RESULT_PATH = '/tmp/'; //Add path you want result files written to

var VALID_SYMBOLIZERS = [
  'se:LineSymbolizer',
  'se:TextSymbolizer',
  'se:PolygonSymbolizer',
  'se:PointSymbolizer'
];

var VALID_ATTR_TAGS = [
  'se:Stroke',
  'se:Fill',
  'se:Label',
  'se:Font',
  'se:Halo',
  'se:Mark',
  'se:Size',
  'se:Geometry',
  'se:Graphic'
];
//attribute-tags that must be handeled different than the rest
var DIFF_ATTR_TAG = ['se:Label', 'se:Halo', 'se:Mark', 'se:Geometry', 'se:Graphic'];

//mapping from sld symbolizer til mapbox GL type-attribute
var CONV_TYPE = {
  'se:LineSymbolizer': 'line',
  'se:PolygonSymbolizer': 'fill',
  'se:TextSymbolizer': 'symbol',
  'se:PointSymbolizer': 'symbol'
};

//attributes that must be handeled different than the rest,
//and has relevant info placed differently (inner tag)
var DIFF_ATTR = ['stroke', 'opacity', 'fill', 'fill-opacity', 'font-size', 'stroke-width'];

//attrbiutes that belongs to the paint-object in Mapbox gl
var PAINT_ATTR = [
  'line-color', 'line-width', 'line-dasharray', 'line-opacity',
  'text-color', 'text-halo-color', 'text-halo-width', 'text-halo-blur', 'text-size',
  'fill-color', 'fill-opacity', 'fill-image',
  'icon-color', 'icon-opacity', 'icon-size'
];

//attributes that belongs to the layout-object in Mapbox gl
var LAYOUT_ATTR = [
  'text-field', 'text-font', 'text-max-size', 'text-max-witdth',
  'line-join', 'symbol-placement', 'icon-image'
];

//mapping from sld to mapbox
var CONVERT_ATTR_NAME = {
    'stroke': 'line-color',
    'stroke-width': 'line-width',
    'stroke-dasharray': 'line-dasharray',
    'stroke-linejoin': 'line-join',
    'opacity': 'line-opacity',
    'PolygonSymbolizer-Fill-fill': 'fill-color',
    'PolygonSymbolizer-Fill-fill-opacity': 'fill-opacity',
    'PolygonSymbolizer-Fill-opacity': 'fill-opacity',
    'font-size': 'text-size',
    'font-family': 'text-font',
    'Label': 'text-field',
    'TextSymbolizer-Halo-Fill-fill': 'text-halo-color',
    'TextSymbolizer-Fill-fill': 'text-color'
};

var PUNKT = 'circle-12'; //?
//get the icon-image
var CONV_ICON_IMG = {
  'FKB_Gravplass.xml': 'religious-christian-12',
  'FKB_BautaStatue.xml': 'monument-12',
  'FKB_Bensinpumpe.xml': 'fuel-24',
  'FKB_Broenn.xml': '',
  'FKB_Kum.xml': 'circle-stroked-24'
  //, 'FKB_MastTele':,'FKB_Mast_Telesmast'
};

var FILES_WRITTEN = [];


//translate zoom-scale to zoom-level
function scale_to_zoom(scale) {
  if (scale > 500000000) {
    return 0;
  }
  if (scale > 250000000) {
    return 1;
  }
  if (scale > 150000000) {
    return 2;
  }
  if (scale > 70000000) {
    return 3;
  }
  if (scale > 35000000) {
    return 4;
  }
  if (scale > 15000000) {
    return 5;
  }
  if (scale > 10000000) {
    return 6;
  }
  if (scale > 4000000) {
    return 7;
  }
  if (scale > 2000000) {
    return 8;
  }
  if (scale > 1000000) {
    return 9;
  }
  if (scale > 500000) {
    return 10;
  }
  if (scale > 250000) {
    return 11;
  }
  if (scale > 150000) {
    return 12;
  }
  if (scale > 70000) {
    return 13;
  }
  if (scale > 35000) {
    return 14;
  }
  if (scale > 15000) {
    return 15;
  }
  if (scale > 8000) {
    return 16;
  }
  if (scale > 4000) {
    return 17;
  }
  if (scale > 2000) {
    return 18;
  }
  if (scale > 1000) {
    return 19;
  }
  return 20;
}

//parses the xml and finds symbolizer-element and type
function parse_sld_to_rules_tag(file) {
  fs.readFile(file, function (err, data) {
    if (err) {
      console.log(err);
    }
    parseFile(data, file);
  });
  nrParsed++;
  if (nrParsed === nrToParse) {
    //TODO: Find a way to remove the timeout? Problem is that there is no way to
    //know how many layers will be written to the result json
    //and you can therefor not do a check if the last is written or not.
    //You cannot send a callback since it should only be written the last time.
    setTimeout(function () {
      writeEndOfJSON();
    }, 500);
  }
}

function errorCallback(e) {
  console.log(e)
  return
}

function writeStartOfJSON() {
  // var top = '{ "version": 7, "name": "' + styleSpecName + '", "sources": { "' + sourceName + '": { "type": "vector", "url": "' + sourceUrl + '" } }, "glyphs": "mapbox://fontstack/{fontstack}/{range}.pbf", "sprite": "https://www.mapbox.com/mapbox-gl-styles/sprites/sprite", "layers": [ { "id": "background", "type": "background", "paint": { "background-color": "rgb(237, 234, 235)" } }';
  var top = '{ "layers": [ { "id": "background", "type": "background", "paint": { "background-color": "rgb(237, 234, 235)" } }';
  fs.writeFile(RESULT_PATH + targetname, top + '\n', err => errorCallback);
  fs.writeFile(RESULT_PATH + './errorFiles.txt', 'Files that could not be converted:' + '\n', err => errorCallback);
}

function writeEndOfJSON() {
  var end = ']}';
  fs.appendFile(RESULT_PATH + targetname, end, err => errorCallback);
}

var parseFile = function (data, file) {
  writeStartOfJSON();
  parser.parseString(data, function (err, result) {
    var FeatureTypeStyle = result.StyledLayerDescriptor.NamedLayer[0].UserStyle[0]['se:FeatureTypeStyle'];
    var rulesArr = [];
    var k;
    var rules = [];
    for (k = 0; k < FeatureTypeStyle.length; k++) { //some files had more than one FeatureTypeStyle
      var rulesVer = (FeatureTypeStyle[k]['se:Rule']);
      var rule;
      for (rule = 0; rule < rulesVer.length; rule++) {
        //pushes all rules-tag in different FeatureTypeStyle-tags to one array
        rules.push(rulesVer[rule]);
      }
    }
    var j;
    var maxzoom;
    var minzoom;
    for (j = 0; j < rules.length; j++) {
      rule = rules[j];
      filter = {}
      if (typeof rule["ogc:Filter"] != "undefined" ) {
        if (Object.keys(rule["ogc:Filter"][0]).indexOf("ogc:PropertyIsEqualTo") >= 0) {
          fils = rule["ogc:Filter"][0]["ogc:PropertyIsEqualTo"]
        } else if (Object.keys(Object.values(rule["ogc:Filter"][0])[1][0]).indexOf("ogc:PropertyIsEqualTo") >= 0){
          fils = Object.values(rule["ogc:Filter"][0])[1][0]["ogc:PropertyIsEqualTo"];
        }
        for (var fi=0; fi<fils.length; fi++){
          if (Object.keys(filter).indexOf(fils[fi]['ogc:PropertyName'][0]) == -1 ) { filter[fils[fi]['ogc:PropertyName']] = []; }
          filter[fils[fi]['ogc:PropertyName'][0]].push(fils[fi]['ogc:Literal'][0])
        }
      }
      name = ""
      if (Object.keys(rule).indexOf("se:Name") >= 0 ){
        name = rule['se:Name'][0];
      }
      if (Object.keys(filter).length > 0 && (typeof name == "undefined" || name.length == 0)) {
        name = Object.values(filter)[0][0];
      }
      if (Object.keys(rule).indexOf('se:MaxScaleDenominator') >= 0) {
        maxzoom = scale_to_zoom(rule['se:MaxScaleDenominator'][0]);
      } else {
        maxzoom = "";
      }
      if (Object.keys(rule).indexOf('se:MinScaleDenominator') >= 0) {
        minzoom = scale_to_zoom(rule['se:MinScaleDenominator'][0]);
      } else {
        minzoom = "";
      }
      //Checks if the tag is valid, and if it is: saves the object and type-name
      var i;
      var ruleArray = Object.keys(rule);
      for (i = 0; i < ruleArray.length; i++) {
        if ((VALID_SYMBOLIZERS.indexOf(ruleArray[i])) > -1) {
          //Sends object, symbolizer and filename
          writeJSON(rule[ruleArray[i]], ruleArray[i], name, minzoom, maxzoom, filter, file);
        }
      }
    }
  });
};


//called for each symbolizer
//this runs the rest of the methods through make_JSON and so on, and writes the objects to file
function writeJSON(symbTag, type, name, minzoom, maxzoom, filter, file) {
  var errorFiles = [];
  var convType = convertType(type);
  try {
    var cssObj = getSymbolizersObj(symbTag, type, file);
    var styleObj = make_JSON(name, convType, cssObj, minzoom, maxzoom);
    if (Object.keys(filter).length >= 0) { styleObj['filter'] = filter; }
    print = JSON.stringify(styleObj,null,4);
    fs.appendFile(RESULT_PATH + targetname, ',\n' + print, err => errorCallback);
  } catch (err) {
    console.log("err")
    console.log(err)
    //writes a file with all the sld-files with errors
    fs.appendFile(RESULT_PATH + './errorFiles.txt', file + '-' + name + '\n', err => errorCallback);
  }
}

//this makes the layout of each mapbox-layout-object
//name=file name, css is an object [cssName: cssValue]pairs, cssName is ie stroke, stroke-width
function make_JSON(name, type, cssObj, minzoom, maxzoom) {
  var paint = getPaintAndLayoutAttr(cssObj);

  //Removing default-values, they are redundant
  if (Object.keys(paint).indexOf('fill-opacity') > -1) {
    if (paint['fill-opacity'] === 1) {
      delete paint['fill-opacity'];
    }
  }

  var styleObj = {
    'type': type,
    'source-layer': name,
    'paint': paint
  };
  if (typeof minzoom == 'number') { styleObj["minzoom"] = minzoom; }
  if (typeof maxzoom == 'number') { styleObj["maxzoom"] = maxzoom; }
  return styleObj;
}


function getSymbolizersObj(symbTag, type, file) {
  //have to check all taggs in symbolizer
  var i;
  var cssObj = {};
  for (i = 0; i < Object.keys(symbTag[0]).length; i++) { //for all tags under <-Symbolizer>
    var tagName = Object.keys(symbTag[0])[i];
    if (VALID_ATTR_TAGS.indexOf(tagName) > -1) {  //if tag exists in valid-array, except Stroke

      //if values are not in the regular place
      if (DIFF_ATTR_TAG.indexOf(tagName) > -1 ||
          ((tagName === 'se:Fill') && symbTag[0]["se:Fill"][0]["se:SvgParameter"] !== undefined)) {
        var obj = getObjFromDiffAttr(tagName, type, symbTag, file);
        for (var key in obj) {
          cssObj[key] = obj[key];
        }
      } else {//if common cssParameterTags
        //array with key-value pairs to add to cssObj
        var cssArray = getCssParameters(symbTag, tagName, type);
        var k;
        for (k = 0; k < cssArray.length; k++) {
          cssObj[cssArray[k][0]] = cssArray[k][1];
        }
      }
    } else if (tagName !== undefined) {
      console.log(tagName+" is not a valid attribute tag");
    }
  }
  return cssObj;
}

function getCssParameters(symbTag, validAttrTag, type, outerTag) {
  var cssArr = [];
  if (outerTag === undefined) {
    var allCssArray = symbTag[0][validAttrTag][0]['se:SvgParameter'];
  } else {
    var allCssArray = symbTag[0][outerTag][0][validAttrTag][0]['se:SvgParameter'];
  }

  var nrOfCssTags = Object.keys(allCssArray).length;
  var j;
  for (j = 0; j < nrOfCssTags; j++) { //for all cssParameters
    var cssTag = allCssArray[j];
    var conv = convert_css_parameter(cssTag, validAttrTag, type, outerTag);
    cssArr.push(conv); //array with arrays of cssName and cssValue
  }
  return cssArr;
}

//gets called if attribute-values are not placed as the rest and therefor needs
//a different method the get the css-value
function getObjFromDiffAttr(tagName, type, symbTag, file) {
  var obj = {};
  if (tagName === 'se:Label') {
    obj = getLabelObj(tagName, type, symbTag, obj);
  } else if (tagName === 'se:Fill') { //some fill-attributes are defined differently than the rest
    obj['fill-color'] = symbTag[0][tagName][0]["se:SvgParameter"][0]["_"];
  } else if (tagName === 'se:Halo') {
    obj = getHaloObj(tagName, type, symbTag, obj);
  } else if (tagName === 'se:Geometry') {
    obj = getGeometryObj(symbTag, obj);
  } else if (tagName === 'se:Graphic') {
    obj = getGraphicObj(file, symbTag, type, obj);
  }
  return obj;
}

function getLabelObj(tagName, type, symbTag, obj) {
  var convertedTagName = convertCssName(tagName, tagName, type);
  obj[convertedTagName] = '{' + symbTag[0].Label[0]['ogc:PropertyName'][0] + '}';
  return obj;
}

function getHaloObj(tagName, type, symbTag, obj) {
  var j;
  for (j = 0; j < Object.keys(symbTag[0].Halo[0]).length; j++) {
    var innerTagName = (Object.keys(symbTag[0].Halo[0]))[j];

    if (innerTagName === 'se:Radius') {
      var value = symbTag[0].Halo[0]['se:Radius'][0]['ogc:Literal'][0];
      obj['text-halo-width'] = parseInt(value, 10);
    } else if (innerTagName === 'se:Fill') {
      //array with key-value pair to add in obj
      var cssArray = getCssParameters(symbTag, innerTagName, type, 'se:Halo');
      var k;
      for (k = 0; k < cssArray.length; k++) {
        obj[cssArray[k][0]] = cssArray[k][1];
      }
    } else {
      console.log('translation of: ' + innerTagName + ' is not added');
    }
  }
  return obj;
}

function getGeometryObj(symbTag, obj) {
  if (symbTag[0].Geometry[0]['ogc:Function'][0].$.name === 'vertices') {
    obj['icon-image'] = PUNKT;
  } else {
    console.log('Cannot convert attribute value: ' + symbTag[0].Geometry[0]['ogc:Function'][0].$.name + ', for tag Geometry');
  }
  return obj;
}
function getGraphicObj(file, symbTag, type, obj) {
  var fillColor;
  try {
    fillColor = symbTag[0].Graphic[0].Mark[0].Fill[0]['se:SvgParameter'][0]['ogc:Function'][0]['ogc:Literal'][1];
    var color = '#' + fillColor;
    var regInteger = /^\d+$/;
    if (!regInteger.test(fillColor)) {
      //console.log('Different graphic tag: '+fillColor+ ' from file: '+ file);
    } else {
      obj['icon-color'] = color;
    }
  } catch (err) {
    console.log('Could not set fill color for graphic tag in file: ' + file);
  }
  //Sets size
  try {
    var size = symbTag[0].Graphic[0].Size[0];
      obj['icon-size'] = parseInt(size, 10);
  } catch (err) {
      console.log('Size does not exist in this graphic-tag');
  }
  var img = getIconImage(file);
  if (img !== undefined) {
    obj['icon-image'] = img;
  } else {
    obj['icon-image'] = 'circle-12';
  }
  return obj;
}

function getIconImage(file) {
  try {
    var img = CONV_ICON_IMG[file];
  } catch (err) {
    console.log('Unknown icon');
    img = undefined;
  }
  return img;
}

//returns an array with css parameter name and value, correctly converted
//validAttrTag=name of outer tag, example stroke, fill, label
function convert_css_parameter(cssTag, ValidAttrTag, type, outerTag) {
  var cssName = cssTag['$'].name;
  var cssValue;
  var regLetters = /^[a-zA-Z]+$/;
  var regInt = /^\d+$/;
  var regDouble = /^[0-9]+([\,\.][0-9]+)?$/g;
  var regNumbers = /^\d+$/;

  try {
    var cssColorValue = cssTag['_'].split('#')[1];
    //testing if the value is a color:
    if ((DIFF_ATTR.indexOf(cssName)) > -1
      && !(regInt.test(cssTag['_']))
      && !(regDouble.test(cssTag['_']))
      && !regLetters.test(cssColorValue)
      && !regNumbers.test(cssColorValue) ) {//Check if different type of attribute
      cssValue = (cssTag['ogc:Function'][0]['ogc:Literal'][1]);
    } else {
      cssValue = cssTag['_'];
    }
  } catch (err) {
    if ((DIFF_ATTR.indexOf(cssName)) > -1
      && !(regInt.test(cssTag['_']))
      && !(regDouble.test(cssTag['_']))) {//Check if different type of attribute
      cssValue = (cssTag['_']);
    } else {
      cssValue = cssTag['_'];
    }
  }
  var convertedCssName = convertCssName(cssName, ValidAttrTag, type, outerTag);
  var convertedCssValue = convertCssValue(cssValue, cssName);
  return [convertedCssName, convertedCssValue];
}

//Makes sure the attribute values are returned in the correct type and defined
//correctly (ie colors with a # in front)
function convertCssValue(cssValue, cssName) {

  //linejoin describes rendering with values; mitre/round/bevel
  if ((cssName === 'stroke' || cssName === 'stroke-linejoin' || cssName === 'stroke-linecap')) {
    //some colors are defined with #, others not.
    //Split removes the # if it exists, so i always end up with the color value without the #
    //linecap is a line-border with values; butt/round/square
    return '#' + cssValue.split('#')[cssValue.split('#').length - 1];
  }

  if (cssName === 'stroke-width'
    || cssName === 'stroke-opacity'
    || cssName === 'stroke--dashoffset') {
    return parseFloat(cssValue);
  }
  if (cssName === 'stroke-dasharray') {
    return cssValue.split(' ').map(Number);
  }

  if (cssName === 'fill') {
    //some colors are defined with #, others not. Split removes the # if it exists,
    //so i always end up with the color value without the #
    return '#' + cssValue.split('#')[cssValue.split('#').length - 1];
  }

  if (cssName === 'opacity' || cssName === 'fill-opacity') {
    return parseFloat(cssValue);
  }

  if (cssName === 'font-size') {
    return parseFloat(cssValue);
  }

  return cssValue;

}

function convertCssName(cssName, validAttrTag, type, outerTag) {
  var newName;
  if (cssName === 'fill'
    || cssName === 'fill-opacity'
    || cssName === 'opacity'
    && validAttrTag === 'Fill') {
    if (outerTag === undefined) {
      newName = CONVERT_ATTR_NAME[type + '-' + validAttrTag + '-' + cssName];

    } else {
      var newName = CONVERT_ATTR_NAME[type + '-' + outerTag + '-' + validAttrTag + '-' + cssName];
      if (newName === undefined) {
        console.log(
          'could not convert the attribute name: ' + type + '-' +
          outerTag + '-' + validAttrTag + '-' + cssName
        );
      }
    }
    return newName;
  } else {
    var newName = CONVERT_ATTR_NAME[cssName];
    //List to print those I know cannot be translated
    var ACCEPTED = ['font-weight', 'font-style'];
    //skip printing the ones I know are not translated
    if (newName === undefined && ACCEPTED.indexOf(newName) > -1) {
      console.log('could not convert the attribute name: ' + cssName);
    }
    return newName;
  }
}

function convertType(type) {
  try {
    return CONV_TYPE[type];
  } catch (err) {
    console.log('could not convert the type: ' + type);
  }
}

//Makes paint object og layout object
function getPaintAndLayoutAttr(cssObj) {
  var paint = {};
  var i;
  for (i = 0; i < Object.keys(cssObj).length; i++) {// for all in cssObj
    var key = Object.keys(cssObj)[i];//becomes line-color
    var value = cssObj[key];
    paint[key] = value;
  }
  return paint;
}
