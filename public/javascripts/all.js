/*! jQuery v1.7.1 jquery.com | jquery.org/license */
(function(a,b){function cy(a){return f.isWindow(a)?a:a.nodeType===9?a.defaultView||a.parentWindow:!1}function cv(a){if(!ck[a]){var b=c.body,d=f("<"+a+">").appendTo(b),e=d.css("display");d.remove();if(e==="none"||e===""){cl||(cl=c.createElement("iframe"),cl.frameBorder=cl.width=cl.height=0),b.appendChild(cl);if(!cm||!cl.createElement)cm=(cl.contentWindow||cl.contentDocument).document,cm.write((c.compatMode==="CSS1Compat"?"<!doctype html>":"")+"<html><body>"),cm.close();d=cm.createElement(a),cm.body.appendChild(d),e=f.css(d,"display"),b.removeChild(cl)}ck[a]=e}return ck[a]}function cu(a,b){var c={};f.each(cq.concat.apply([],cq.slice(0,b)),function(){c[this]=a});return c}function ct(){cr=b}function cs(){setTimeout(ct,0);return cr=f.now()}function cj(){try{return new a.ActiveXObject("Microsoft.XMLHTTP")}catch(b){}}function ci(){try{return new a.XMLHttpRequest}catch(b){}}function cc(a,c){a.dataFilter&&(c=a.dataFilter(c,a.dataType));var d=a.dataTypes,e={},g,h,i=d.length,j,k=d[0],l,m,n,o,p;for(g=1;g<i;g++){if(g===1)for(h in a.converters)typeof h=="string"&&(e[h.toLowerCase()]=a.converters[h]);l=k,k=d[g];if(k==="*")k=l;else if(l!=="*"&&l!==k){m=l+" "+k,n=e[m]||e["* "+k];if(!n){p=b;for(o in e){j=o.split(" ");if(j[0]===l||j[0]==="*"){p=e[j[1]+" "+k];if(p){o=e[o],o===!0?n=p:p===!0&&(n=o);break}}}}!n&&!p&&f.error("No conversion from "+m.replace(" "," to ")),n!==!0&&(c=n?n(c):p(o(c)))}}return c}function cb(a,c,d){var e=a.contents,f=a.dataTypes,g=a.responseFields,h,i,j,k;for(i in g)i in d&&(c[g[i]]=d[i]);while(f[0]==="*")f.shift(),h===b&&(h=a.mimeType||c.getResponseHeader("content-type"));if(h)for(i in e)if(e[i]&&e[i].test(h)){f.unshift(i);break}if(f[0]in d)j=f[0];else{for(i in d){if(!f[0]||a.converters[i+" "+f[0]]){j=i;break}k||(k=i)}j=j||k}if(j){j!==f[0]&&f.unshift(j);return d[j]}}function ca(a,b,c,d){if(f.isArray(b))f.each(b,function(b,e){c||bE.test(a)?d(a,e):ca(a+"["+(typeof e=="object"||f.isArray(e)?b:"")+"]",e,c,d)});else if(!c&&b!=null&&typeof b=="object")for(var e in b)ca(a+"["+e+"]",b[e],c,d);else d(a,b)}function b_(a,c){var d,e,g=f.ajaxSettings.flatOptions||{};for(d in c)c[d]!==b&&((g[d]?a:e||(e={}))[d]=c[d]);e&&f.extend(!0,a,e)}function b$(a,c,d,e,f,g){f=f||c.dataTypes[0],g=g||{},g[f]=!0;var h=a[f],i=0,j=h?h.length:0,k=a===bT,l;for(;i<j&&(k||!l);i++)l=h[i](c,d,e),typeof l=="string"&&(!k||g[l]?l=b:(c.dataTypes.unshift(l),l=b$(a,c,d,e,l,g)));(k||!l)&&!g["*"]&&(l=b$(a,c,d,e,"*",g));return l}function bZ(a){return function(b,c){typeof b!="string"&&(c=b,b="*");if(f.isFunction(c)){var d=b.toLowerCase().split(bP),e=0,g=d.length,h,i,j;for(;e<g;e++)h=d[e],j=/^\+/.test(h),j&&(h=h.substr(1)||"*"),i=a[h]=a[h]||[],i[j?"unshift":"push"](c)}}}function bC(a,b,c){var d=b==="width"?a.offsetWidth:a.offsetHeight,e=b==="width"?bx:by,g=0,h=e.length;if(d>0){if(c!=="border")for(;g<h;g++)c||(d-=parseFloat(f.css(a,"padding"+e[g]))||0),c==="margin"?d+=parseFloat(f.css(a,c+e[g]))||0:d-=parseFloat(f.css(a,"border"+e[g]+"Width"))||0;return d+"px"}d=bz(a,b,b);if(d<0||d==null)d=a.style[b]||0;d=parseFloat(d)||0;if(c)for(;g<h;g++)d+=parseFloat(f.css(a,"padding"+e[g]))||0,c!=="padding"&&(d+=parseFloat(f.css(a,"border"+e[g]+"Width"))||0),c==="margin"&&(d+=parseFloat(f.css(a,c+e[g]))||0);return d+"px"}function bp(a,b){b.src?f.ajax({url:b.src,async:!1,dataType:"script"}):f.globalEval((b.text||b.textContent||b.innerHTML||"").replace(bf,"/*$0*/")),b.parentNode&&b.parentNode.removeChild(b)}function bo(a){var b=c.createElement("div");bh.appendChild(b),b.innerHTML=a.outerHTML;return b.firstChild}function bn(a){var b=(a.nodeName||"").toLowerCase();b==="input"?bm(a):b!=="script"&&typeof a.getElementsByTagName!="undefined"&&f.grep(a.getElementsByTagName("input"),bm)}function bm(a){if(a.type==="checkbox"||a.type==="radio")a.defaultChecked=a.checked}function bl(a){return typeof a.getElementsByTagName!="undefined"?a.getElementsByTagName("*"):typeof a.querySelectorAll!="undefined"?a.querySelectorAll("*"):[]}function bk(a,b){var c;if(b.nodeType===1){b.clearAttributes&&b.clearAttributes(),b.mergeAttributes&&b.mergeAttributes(a),c=b.nodeName.toLowerCase();if(c==="object")b.outerHTML=a.outerHTML;else if(c!=="input"||a.type!=="checkbox"&&a.type!=="radio"){if(c==="option")b.selected=a.defaultSelected;else if(c==="input"||c==="textarea")b.defaultValue=a.defaultValue}else a.checked&&(b.defaultChecked=b.checked=a.checked),b.value!==a.value&&(b.value=a.value);b.removeAttribute(f.expando)}}function bj(a,b){if(b.nodeType===1&&!!f.hasData(a)){var c,d,e,g=f._data(a),h=f._data(b,g),i=g.events;if(i){delete h.handle,h.events={};for(c in i)for(d=0,e=i[c].length;d<e;d++)f.event.add(b,c+(i[c][d].namespace?".":"")+i[c][d].namespace,i[c][d],i[c][d].data)}h.data&&(h.data=f.extend({},h.data))}}function bi(a,b){return f.nodeName(a,"table")?a.getElementsByTagName("tbody")[0]||a.appendChild(a.ownerDocument.createElement("tbody")):a}function U(a){var b=V.split("|"),c=a.createDocumentFragment();if(c.createElement)while(b.length)c.createElement(b.pop());return c}function T(a,b,c){b=b||0;if(f.isFunction(b))return f.grep(a,function(a,d){var e=!!b.call(a,d,a);return e===c});if(b.nodeType)return f.grep(a,function(a,d){return a===b===c});if(typeof b=="string"){var d=f.grep(a,function(a){return a.nodeType===1});if(O.test(b))return f.filter(b,d,!c);b=f.filter(b,d)}return f.grep(a,function(a,d){return f.inArray(a,b)>=0===c})}function S(a){return!a||!a.parentNode||a.parentNode.nodeType===11}function K(){return!0}function J(){return!1}function n(a,b,c){var d=b+"defer",e=b+"queue",g=b+"mark",h=f._data(a,d);h&&(c==="queue"||!f._data(a,e))&&(c==="mark"||!f._data(a,g))&&setTimeout(function(){!f._data(a,e)&&!f._data(a,g)&&(f.removeData(a,d,!0),h.fire())},0)}function m(a){for(var b in a){if(b==="data"&&f.isEmptyObject(a[b]))continue;if(b!=="toJSON")return!1}return!0}function l(a,c,d){if(d===b&&a.nodeType===1){var e="data-"+c.replace(k,"-$1").toLowerCase();d=a.getAttribute(e);if(typeof d=="string"){try{d=d==="true"?!0:d==="false"?!1:d==="null"?null:f.isNumeric(d)?parseFloat(d):j.test(d)?f.parseJSON(d):d}catch(g){}f.data(a,c,d)}else d=b}return d}function h(a){var b=g[a]={},c,d;a=a.split(/\s+/);for(c=0,d=a.length;c<d;c++)b[a[c]]=!0;return b}var c=a.document,d=a.navigator,e=a.location,f=function(){function J(){if(!e.isReady){try{c.documentElement.doScroll("left")}catch(a){setTimeout(J,1);return}e.ready()}}var e=function(a,b){return new e.fn.init(a,b,h)},f=a.jQuery,g=a.$,h,i=/^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,j=/\S/,k=/^\s+/,l=/\s+$/,m=/^<(\w+)\s*\/?>(?:<\/\1>)?$/,n=/^[\],:{}\s]*$/,o=/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,p=/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,q=/(?:^|:|,)(?:\s*\[)+/g,r=/(webkit)[ \/]([\w.]+)/,s=/(opera)(?:.*version)?[ \/]([\w.]+)/,t=/(msie) ([\w.]+)/,u=/(mozilla)(?:.*? rv:([\w.]+))?/,v=/-([a-z]|[0-9])/ig,w=/^-ms-/,x=function(a,b){return(b+"").toUpperCase()},y=d.userAgent,z,A,B,C=Object.prototype.toString,D=Object.prototype.hasOwnProperty,E=Array.prototype.push,F=Array.prototype.slice,G=String.prototype.trim,H=Array.prototype.indexOf,I={};e.fn=e.prototype={constructor:e,init:function(a,d,f){var g,h,j,k;if(!a)return this;if(a.nodeType){this.context=this[0]=a,this.length=1;return this}if(a==="body"&&!d&&c.body){this.context=c,this[0]=c.body,this.selector=a,this.length=1;return this}if(typeof a=="string"){a.charAt(0)!=="<"||a.charAt(a.length-1)!==">"||a.length<3?g=i.exec(a):g=[null,a,null];if(g&&(g[1]||!d)){if(g[1]){d=d instanceof e?d[0]:d,k=d?d.ownerDocument||d:c,j=m.exec(a),j?e.isPlainObject(d)?(a=[c.createElement(j[1])],e.fn.attr.call(a,d,!0)):a=[k.createElement(j[1])]:(j=e.buildFragment([g[1]],[k]),a=(j.cacheable?e.clone(j.fragment):j.fragment).childNodes);return e.merge(this,a)}h=c.getElementById(g[2]);if(h&&h.parentNode){if(h.id!==g[2])return f.find(a);this.length=1,this[0]=h}this.context=c,this.selector=a;return this}return!d||d.jquery?(d||f).find(a):this.constructor(d).find(a)}if(e.isFunction(a))return f.ready(a);a.selector!==b&&(this.selector=a.selector,this.context=a.context);return e.makeArray(a,this)},selector:"",jquery:"1.7.1",length:0,size:function(){return this.length},toArray:function(){return F.call(this,0)},get:function(a){return a==null?this.toArray():a<0?this[this.length+a]:this[a]},pushStack:function(a,b,c){var d=this.constructor();e.isArray(a)?E.apply(d,a):e.merge(d,a),d.prevObject=this,d.context=this.context,b==="find"?d.selector=this.selector+(this.selector?" ":"")+c:b&&(d.selector=this.selector+"."+b+"("+c+")");return d},each:function(a,b){return e.each(this,a,b)},ready:function(a){e.bindReady(),A.add(a);return this},eq:function(a){a=+a;return a===-1?this.slice(a):this.slice(a,a+1)},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},slice:function(){return this.pushStack(F.apply(this,arguments),"slice",F.call(arguments).join(","))},map:function(a){return this.pushStack(e.map(this,function(b,c){return a.call(b,c,b)}))},end:function(){return this.prevObject||this.constructor(null)},push:E,sort:[].sort,splice:[].splice},e.fn.init.prototype=e.fn,e.extend=e.fn.extend=function(){var a,c,d,f,g,h,i=arguments[0]||{},j=1,k=arguments.length,l=!1;typeof i=="boolean"&&(l=i,i=arguments[1]||{},j=2),typeof i!="object"&&!e.isFunction(i)&&(i={}),k===j&&(i=this,--j);for(;j<k;j++)if((a=arguments[j])!=null)for(c in a){d=i[c],f=a[c];if(i===f)continue;l&&f&&(e.isPlainObject(f)||(g=e.isArray(f)))?(g?(g=!1,h=d&&e.isArray(d)?d:[]):h=d&&e.isPlainObject(d)?d:{},i[c]=e.extend(l,h,f)):f!==b&&(i[c]=f)}return i},e.extend({noConflict:function(b){a.$===e&&(a.$=g),b&&a.jQuery===e&&(a.jQuery=f);return e},isReady:!1,readyWait:1,holdReady:function(a){a?e.readyWait++:e.ready(!0)},ready:function(a){if(a===!0&&!--e.readyWait||a!==!0&&!e.isReady){if(!c.body)return setTimeout(e.ready,1);e.isReady=!0;if(a!==!0&&--e.readyWait>0)return;A.fireWith(c,[e]),e.fn.trigger&&e(c).trigger("ready").off("ready")}},bindReady:function(){if(!A){A=e.Callbacks("once memory");if(c.readyState==="complete")return setTimeout(e.ready,1);if(c.addEventListener)c.addEventListener("DOMContentLoaded",B,!1),a.addEventListener("load",e.ready,!1);else if(c.attachEvent){c.attachEvent("onreadystatechange",B),a.attachEvent("onload",e.ready);var b=!1;try{b=a.frameElement==null}catch(d){}c.documentElement.doScroll&&b&&J()}}},isFunction:function(a){return e.type(a)==="function"},isArray:Array.isArray||function(a){return e.type(a)==="array"},isWindow:function(a){return a&&typeof a=="object"&&"setInterval"in a},isNumeric:function(a){return!isNaN(parseFloat(a))&&isFinite(a)},type:function(a){return a==null?String(a):I[C.call(a)]||"object"},isPlainObject:function(a){if(!a||e.type(a)!=="object"||a.nodeType||e.isWindow(a))return!1;try{if(a.constructor&&!D.call(a,"constructor")&&!D.call(a.constructor.prototype,"isPrototypeOf"))return!1}catch(c){return!1}var d;for(d in a);return d===b||D.call(a,d)},isEmptyObject:function(a){for(var b in a)return!1;return!0},error:function(a){throw new Error(a)},parseJSON:function(b){if(typeof b!="string"||!b)return null;b=e.trim(b);if(a.JSON&&a.JSON.parse)return a.JSON.parse(b);if(n.test(b.replace(o,"@").replace(p,"]").replace(q,"")))return(new Function("return "+b))();e.error("Invalid JSON: "+b)},parseXML:function(c){var d,f;try{a.DOMParser?(f=new DOMParser,d=f.parseFromString(c,"text/xml")):(d=new ActiveXObject("Microsoft.XMLDOM"),d.async="false",d.loadXML(c))}catch(g){d=b}(!d||!d.documentElement||d.getElementsByTagName("parsererror").length)&&e.error("Invalid XML: "+c);return d},noop:function(){},globalEval:function(b){b&&j.test(b)&&(a.execScript||function(b){a.eval.call(a,b)})(b)},camelCase:function(a){return a.replace(w,"ms-").replace(v,x)},nodeName:function(a,b){return a.nodeName&&a.nodeName.toUpperCase()===b.toUpperCase()},each:function(a,c,d){var f,g=0,h=a.length,i=h===b||e.isFunction(a);if(d){if(i){for(f in a)if(c.apply(a[f],d)===!1)break}else for(;g<h;)if(c.apply(a[g++],d)===!1)break}else if(i){for(f in a)if(c.call(a[f],f,a[f])===!1)break}else for(;g<h;)if(c.call(a[g],g,a[g++])===!1)break;return a},trim:G?function(a){return a==null?"":G.call(a)}:function(a){return a==null?"":(a+"").replace(k,"").replace(l,"")},makeArray:function(a,b){var c=b||[];if(a!=null){var d=e.type(a);a.length==null||d==="string"||d==="function"||d==="regexp"||e.isWindow(a)?E.call(c,a):e.merge(c,a)}return c},inArray:function(a,b,c){var d;if(b){if(H)return H.call(b,a,c);d=b.length,c=c?c<0?Math.max(0,d+c):c:0;for(;c<d;c++)if(c in b&&b[c]===a)return c}return-1},merge:function(a,c){var d=a.length,e=0;if(typeof c.length=="number")for(var f=c.length;e<f;e++)a[d++]=c[e];else while(c[e]!==b)a[d++]=c[e++];a.length=d;return a},grep:function(a,b,c){var d=[],e;c=!!c;for(var f=0,g=a.length;f<g;f++)e=!!b(a[f],f),c!==e&&d.push(a[f]);return d},map:function(a,c,d){var f,g,h=[],i=0,j=a.length,k=a instanceof e||j!==b&&typeof j=="number"&&(j>0&&a[0]&&a[j-1]||j===0||e.isArray(a));if(k)for(;i<j;i++)f=c(a[i],i,d),f!=null&&(h[h.length]=f);else for(g in a)f=c(a[g],g,d),f!=null&&(h[h.length]=f);return h.concat.apply([],h)},guid:1,proxy:function(a,c){if(typeof c=="string"){var d=a[c];c=a,a=d}if(!e.isFunction(a))return b;var f=F.call(arguments,2),g=function(){return a.apply(c,f.concat(F.call(arguments)))};g.guid=a.guid=a.guid||g.guid||e.guid++;return g},access:function(a,c,d,f,g,h){var i=a.length;if(typeof c=="object"){for(var j in c)e.access(a,j,c[j],f,g,d);return a}if(d!==b){f=!h&&f&&e.isFunction(d);for(var k=0;k<i;k++)g(a[k],c,f?d.call(a[k],k,g(a[k],c)):d,h);return a}return i?g(a[0],c):b},now:function(){return(new Date).getTime()},uaMatch:function(a){a=a.toLowerCase();var b=r.exec(a)||s.exec(a)||t.exec(a)||a.indexOf("compatible")<0&&u.exec(a)||[];return{browser:b[1]||"",version:b[2]||"0"}},sub:function(){function a(b,c){return new a.fn.init(b,c)}e.extend(!0,a,this),a.superclass=this,a.fn=a.prototype=this(),a.fn.constructor=a,a.sub=this.sub,a.fn.init=function(d,f){f&&f instanceof e&&!(f instanceof a)&&(f=a(f));return e.fn.init.call(this,d,f,b)},a.fn.init.prototype=a.fn;var b=a(c);return a},browser:{}}),e.each("Boolean Number String Function Array Date RegExp Object".split(" "),function(a,b){I["[object "+b+"]"]=b.toLowerCase()}),z=e.uaMatch(y),z.browser&&(e.browser[z.browser]=!0,e.browser.version=z.version),e.browser.webkit&&(e.browser.safari=!0),j.test(" ")&&(k=/^[\s\xA0]+/,l=/[\s\xA0]+$/),h=e(c),c.addEventListener?B=function(){c.removeEventListener("DOMContentLoaded",B,!1),e.ready()}:c.attachEvent&&(B=function(){c.readyState==="complete"&&(c.detachEvent("onreadystatechange",B),e.ready())});return e}(),g={};f.Callbacks=function(a){a=a?g[a]||h(a):{};var c=[],d=[],e,i,j,k,l,m=function(b){var d,e,g,h,i;for(d=0,e=b.length;d<e;d++)g=b[d],h=f.type(g),h==="array"?m(g):h==="function"&&(!a.unique||!o.has(g))&&c.push(g)},n=function(b,f){f=f||[],e=!a.memory||[b,f],i=!0,l=j||0,j=0,k=c.length;for(;c&&l<k;l++)if(c[l].apply(b,f)===!1&&a.stopOnFalse){e=!0;break}i=!1,c&&(a.once?e===!0?o.disable():c=[]:d&&d.length&&(e=d.shift(),o.fireWith(e[0],e[1])))},o={add:function(){if(c){var a=c.length;m(arguments),i?k=c.length:e&&e!==!0&&(j=a,n(e[0],e[1]))}return this},remove:function(){if(c){var b=arguments,d=0,e=b.length;for(;d<e;d++)for(var f=0;f<c.length;f++)if(b[d]===c[f]){i&&f<=k&&(k--,f<=l&&l--),c.splice(f--,1);if(a.unique)break}}return this},has:function(a){if(c){var b=0,d=c.length;for(;b<d;b++)if(a===c[b])return!0}return!1},empty:function(){c=[];return this},disable:function(){c=d=e=b;return this},disabled:function(){return!c},lock:function(){d=b,(!e||e===!0)&&o.disable();return this},locked:function(){return!d},fireWith:function(b,c){d&&(i?a.once||d.push([b,c]):(!a.once||!e)&&n(b,c));return this},fire:function(){o.fireWith(this,arguments);return this},fired:function(){return!!e}};return o};var i=[].slice;f.extend({Deferred:function(a){var b=f.Callbacks("once memory"),c=f.Callbacks("once memory"),d=f.Callbacks("memory"),e="pending",g={resolve:b,reject:c,notify:d},h={done:b.add,fail:c.add,progress:d.add,state:function(){return e},isResolved:b.fired,isRejected:c.fired,then:function(a,b,c){i.done(a).fail(b).progress(c);return this},always:function(){i.done.apply(i,arguments).fail.apply(i,arguments);return this},pipe:function(a,b,c){return f.Deferred(function(d){f.each({done:[a,"resolve"],fail:[b,"reject"],progress:[c,"notify"]},function(a,b){var c=b[0],e=b[1],g;f.isFunction(c)?i[a](function(){g=c.apply(this,arguments),g&&f.isFunction(g.promisec@s����H�)������Q퀅\�iF7���]��I�fV�_��W��D�f�8W���#�v"�	��
��X����%�<b�s�Gмh�$rʅ]�Y%��0���:H�a�c���66pl���G�_�ƪ��h_�y��v\ͤ�� ���SUt�R��Mܮ|�1�Qc�>��3s"�E���@[��+�Y���䞲QB������ot+{�>���.�]�	{�U��dCu[QX�+g�I���Ѽ��� [Q"G#���FF,7�Y�w5>��?Gf��Zq�P�w])��o�~C�Lj����~1T���W0��
�j6S�:�S�&� � �����Vh�^��	��E�g����ܖ��a A-��*������hK�k'�я���d�E�E�Qu�_绋=�B��[f�0�@��9@�CQn&X�����D�ҋ1l?�O3R9u}G���$���4E�:Q'.���cAְ��O"n�Epڡ�2�u�6���shp-����A���u:�f4�]�9���C��¶�\q��E�����>��
�i5w��H���E?����ĵ;��i����ϔ��ܥ,�8iLb��i��/�ޛ'F�yg�l��l���?���襏M��&��6H��������s�s��B�0��1g��I����JS��UA������t�'��"|����.�	��"��V������H{]�W&�B��{��
�4��<�&,3�H����Ͷ�9�~Ӷ�S0#r�0�E�i�� e�CH3���%O~��e;�[�լ�p�o��,R���u�h���"M\�&s��ް~cjlc(���&�P���ޅP�ˠD"R��{]B��<�l���S�;=t�H};z���̃q4�D-\eP�#m� r�w{Ǚ)�� .��[4v	�t����%dl:�3�O(��w���sX�^9����>� ͎�����)O�]�۵�I� {��a]�1?b��:mO��_FI��It_��-��x;O3T�T �_��(Pf��	'6&߀\CL12��r?U���p`�~�Ou[l��!��6����!� �8��Uv,q�:e��SS%��au�>B�UNb�m<�.k���xZ��8P�:B�:N,ѱr<U2I3�z���1$�lT�5�
[1)x"��3	�o�>iܱ����tt�\�^~D��2v����LટSs������أ�oj�;o.@/}X�ˮc�5a����kw�
n�sl�rn��<)���'��>���.���ݻ�T���\T�a�x�&���#@�j�'VO71WK2q���g�{�Y���8r�5F7�1k:/h�/󞬱C[Z��T
������c�$��R�l��Mo�8#rN��X��?�����ƛJ(�����Y���x��7YV������~��D+�W���Z��-2���ŕ��$@�ϞU]��Y�z�ha&#�\Ƽ�|�HpE�k\W����aN���(�l7�:�����]������*,�c��h/#�]�|�㒛�jA�"\�7q�uE1�1.��V�Wh�A���`�7РPq����XJ�?f�ށ��!k�r �3�Kg�������-���'!�P�y��A���>�W�[;?9h:Ꞟ�s�%y���>h zi���U�9�/� ���w���4u�}e���p	P3���z��N��ˌ:�ѻ.X���ڗ��FП��=�Qz�Ty�$c��#v�]���7�%��j��7�ƵD��K���1.��/�6�U{�*4�F:yѵҋo^7eˡ2���
a�Ѝ�R��Y�5��g�&#���W��=��$J��&��kUqo��~[{V3��KYV�A�?nᛢ	!�JY00� ��OW�g]�'=���']ԃ�|��=?SL���w�`�j��b����7���5�`t%-i��L�
����~�:*��5_؂W��T߄{ rGL��/�:����LF����MU(�s���/0��]��^��>a��{��X��9��E�G1�j�#��^f�!��ia(��u=8(�$B���=:�ɖ���uKpɤ����a�*�?�Oiڿo�E��=U�~����L�D��)Bβ���-}]HC���oSN��sR�mX�������/���.M��w��/�>H�z�r�Vf��^�KK9��1�}���?�%u�ޏl�
�X���r�����d�ثPE��{��fώ���8�f� Rȁv^����X�.�G�{��Á3��F�朸
�Mv���Qj.?������.K��>�&=����?�0���U�^%ߝ��=��r��.��� �j�[���w9z��}P���b��,SY���H)�&A�Yzn��-K�#�]��I�T���RrC�ŏf�|9.��S{�P�A���	�iMM�	6��)g��)Q[�#E�ߡ�3�ՠ��5ӣ)vB|v;�*Hh}`S��%b��?�MVOQ:$��� U��j���]�˼B�[ɜ���ybV��
�$���\�|�kJ�+���h�[^X�i6��:^�n�mڪ�X��`VQ%�-P�c�&�Q��L���q���nQ�v�թ��B*�7��J\��/{��=�lG˄�T����%2/�g�;�G�;��v�絋�����xS�|�"����fK�N����d=�+���,��!ES#EYV�C�L��z�OO;���{A���p���Ջ�������+_�f�OUx\��j{x����Ƒ�pq'��ļ��sԘ���	�0|��`Q[�^�;����"�Ó�E"�@jU��>�*�X�&�A%l����w0=�8�H���	���*8�k�|�7��C��<W%��2r_��k!��ʥ!�Y#�)�)�t����э  �(��0����#��5��ᅁ���Y&�ۜ��AD ICl�:�߽���8���kLIY�D���H�9���C#��k�����T�MLN
xpD�&����;F20���+�@)���&-���ӥ��c]y�"T���Mb}��w�ũ?�\p3��1�D�B�3E׎��|Y	Os�=(���!�P������ �
͒*^��rq@�#�K��Y��3�C����VM�j���	tn\Ѷ"�V
�0�B&F;�^$w�uX(�ң��4T,�����a-1�Nx+Oɋ~��O0lq)�;'E&f�YFx��L�9��iq=x�E��^`�)8I�0���_�=I7<va��(s�Ks���,c7��a3�V���v��gҤ(����g�: >��ރp�7P_{T��;.����Cp��X�A��}�[�����r����N]�a�u3f��\36��bŦ�l�2�G[��W�t&[��@�'�4�ָjy����'��þ�~�JfI�k� ��WղؾHvYvk����還�n��s`P�3x:
��1.]yܮ�k+w�f�^��G��J���~�w���p[Jc8֣J/5eV�a��b���P��Z=�(x��u��O����}�p-�
���q�E����BO,#�:��G O��j/t���`���1�:,���^��.�D�]�G)P�aV3��۴V'_�5�;cɛ#@�3�n'����gO��.�+��]�(�vȪ7T�S#�#��d��䑸��6�4�
S]�)�ʠ\��Z>S���S� .s�dD��Խ\�.R��,H�ɜ���ղ8/OCw2��ۍ=��=��0+)3n���T:f�%��S�+�)W���?�NSL���Z��v�e��2��,<��놬� H�.�����j��,��ZS@ �@s��]�QWJ_#�����v�	#�h�-�u��QU�5�	*JU�z�J����:7�Z�:�]/�����"��|p�}s���;�y���M;T�Fhj,2ٖ���z_��V��:�!�Ҝ�=hM�<~{D!�g;�� ,��;��'����W�M�*"��deE/� ��^m��rh�[���P� ף�"$���W�p[�|x��{�M[	5��I����)���;�=�O�A�C�_J�����I&��!�Ԁ�3#��{7�0�䮑��{�V�K���_ʩڸ�5C��%~-�l����$M.n�H�RG�n|�^��ϻf�����3�����=�{{Jf��bR~����������Yz}8~|>]�̶�z��cc���R���=㿣��vxE�h��{}���1�N�d�[/��Q���ߖ�`8#A�ɹ��EI7�-z3��R.>I����O����Ґ�Q��ċ#��}�f��a�_��5W^ţС�g�Msr��\� ��C}������f@�BѾH���Ń�'�E<�|�Տ+�
~ÕZ7��`x��_�%�P�m[��]=���'��k�S���fa�O�����S�5�1�Ȉ�z�40(�e��	��t�<�Vʆ!�"�풖I=
��h���V��� @�2gp�%�����k�����ݝ��+n/��34�ϫ��7��C+ϨǦ�kt6�(�W��o��Ѧ�ke�?fiN
v#�{f���4[c��v}��t{{"�+��¯vMF��b@E 7���"@8��A����0�2�F����i7z��\9!���I��<�5����-���;�}f���*=�C!���3��?b��=Y'g��#i��{������Ԡi>28F:��b��LNJ�_Bo�5G��0'�f��l2T�#�U]�33�/�34�4�A�D���#{��������n�X ����fʠ/7�ȧ�A����� �(�Lt>=��݁&���y~Y�+�-p�6Ã!,d3�U��C�l�r0%āB��̡*XV}��u��lqDS�r���A~��0B��`Ƀ�Oc���1U��t�?�5����w��d�[s�&����:��t�X�o;��w�Δ�R�yc˥�:�[qkJɖ���i���w�nH���e�T�u��r^����&�~b�8���e�}��|�OE9?>���_�`[F��a[G$���ģ�p�6�0��Aк<X0�?G:���`&8�!G�{G����o�"���m��?~,������o�؝�|>$c�	*k�~�e�]��ϕS�2b��2�9\.X��Y�Ԙ����@�k�phjFqc$#!��*Ț�	��$,ZkA��Nz�������H�kɚZN�ہ����B�&A���sY!��O�:m/���
��E��m�X�΅�D&d��=�Q,}������o|η�v��Df�L��Μ �W���d�iڛ��`��O~�W���r\�ɰM�
��~��Wc���n�8�9=��y3�1-��]���=��W$�!>�G䝣2J/�,�_N�W��ф<��l�I�l�T~�;4]�̐�����q��0�7ہ8������'6�a��|�ZYU-��/U��|�	��ey���p�ED@[�	����(&�����'�$��0� )�l1�5=k���)�aj ��i��x��7|):���2�L�����K�{��D�$�����j]��׺�N���kQ):��)���ag����9/Su5m�K��P]:B*ѷ=i�4���+*8K�n��gW���ݭym��ڰQ?I?z���+���.��z*�	1�^�2��{�z��zm?�d&)|sH�	3���O!���?qE�(�)N��	�@�ш��U�}z������S�P�n֨8��[(���|��I^sag:��*��+{Ɨ�/*d���%�+�RR&���� =�gr�Ip��N:���A�te�-a�eX�$2`���h�Mf�Q@��L5&E��~�eV�UM\*�/�Z������Pj�����@^}O��$W>�ہ��ʉ�ze�Tp��K��[��p�n���X�"r��{q����2XߜA8U�O�U��l%N9 3�K������:Q� Q�t�dd��Q�o�-�vY�Р��v�_ϩ߄/���������:�R:;A�e���#�O5_��Tw�[aTCS�e],qY%��z��C�\�����Y
0o�uE/�<��f/���(�C�M�v��c�b� R�Tb4:��.aL��&{�S����\�����,	`��i�vy�У�x��p��O���w�Sǵ�i8i����	j�ݜc)��7�KLi`}N�e���_sn�c�y�f�XW�첋`�.I�'~���V�ot��
�IoJ�fN����Ͼ>�t
���Rl��"�n蝸��~4^�E�WK=u�o&%V��F�Q�$��.���F8���!�?=����B.� ���$=(���;��#5�B�6�U�)��g�$v'�d�?K���-��{,(-+�3�Tؓ"��\ ��mL��LH�9>�؅@f�
��x�uk��&�4�� ����H�F��M�_��Ρɒ�{�te^����>�����/�8���_�2�u�Oq�Ku��V���!r.Ċt���px�$�b5p���7�&U�H�M(�
��s���G�_�Y4y��=�3_lݰ���'�D�Obcx���k엯y���w�	�r!��Vz ��xt�q�per���^�f���|��"߱��S M	i�_b{���G��/��g�
� ��Qkݒ�_�!l&W�5���:��c)���:6���^�N���oN���o�2(���͙L+�h�Ǆ���̞7Z%�sà~i`l )�<��W8&�>|I.��e�SɈ��G*TR>���Pbo���K%mn�I�M�K8U?c���Wc8��$L��?�=H}�5��D�1���淍���:�e]UO� Κ�H��N��r��e]����@A{�����!�c:�/[D�8�/�6�{��1�[8Z�Ѧ�-�t�~/>Q�t�>�~�1nΏ�:d]̈KG��yD.&��ԉ�{���~¸s�a#/3ǁ��]S�&k�)��iq�]rOD�!$-}�-hmPI�V�6T���1���OUމ�&���@ݒ>8~��$��W#��O\�j�.J�9��@{d��ľ?�Z/��`�4�j}�$�L�M�=N9`P��?�N��k�M]� g�[蔿�"�5�>&�v�7؏�Z�/�x�K�5�r�^��&l�;�M��X��٥r�Qr0�Ǫ����Hˇ�W�4K�B�@�K�8��P�����U�+�I�����fq�T��	�o-I�e�(�xZ��Φ!A�K(+��P�z�����vɖ�₻._Y���B���#i^�B�����dN^����O\�5�=�����D�y�L@A�^{���e9��|���iD�����;�ޢOL��*��|�$�D��c�΃m�jI|�u�sHf�e q�9�&�i��68=�)�8�V!37��aT�[�H��\dȉ|_�be&���f���D��{�U�Qr��9�.�r�����1V3e�1 7
4 �T�V�W&��3d9�=TL䥁(�hX��ʖT�ěc��RQl�	z���,E؊�3���= |�k�2�\v�:ظ#�|����C���.�U�T!�i<)�����������N�H"k��wq�Uql�*qƳ���r���ԛ����զ<����`]���+����T�D�ݮ�`0�I2��7�H�d����f���^V|�bu�����*/��WD4�W<�cܦ a�MZj��[�D��~�d��{Jz?`U��f���Y8��.�g��7kS�%�a���K� �_B딠ʦ��e�*�"���4d#�$!ܵ�vd� Ǫ�bi:C�t����}�Be��T��XQ�Ꚗ�݌��0�D�Qi�����z�@��m��r"�PiQ�m��{�����%�C!�I �:�!�dPI>�T4'�P�5)^�C���ȩXC��Q�*QjT�3����X������'�+�/��#`�)�������&���'�C\���/�,0q�?��s4Ex�2Թg�,D׼�d:����ˊ}[��3g1"������{I���Xԍ�M�.*�J4��>�̹�ʯ����>#p��l$C�.�ݴ�+eZ41��|��2̧�C���7�h����+�N���,D���ܷ砍˰��PW�ph0ԒT�oY��i�]��"�Hj��a)(R(~d�r�d(�	oW����rhϮ�H��b)�EklMH8ڮ/�^e7 �[���*.]+��^�{�~HeX��_	��ǎ[����L�ER�R�*���EK�-(5��ًQ�r���A9�E��4���yѕ��9ޣ����L%H��pJD��~�}�( Q��p��� x>WfW/-��t43��nK?�%*� ��}��e	)�9OU,.39j�٠0o�E,�H0Bd��bY�@}�a���Q=#�����4RS�?�'檧V[j�;o"ҁ��x�W{Ǿ��ToQW��`�V�H��X��~���.JU�����R[�������T��>j䉮N��k�b��d�Jj��ho�[$@_���;$c����."p;�\i�؄C�DE�O�w�A�FT&ji�+��랟
zq"�ݯ\�(J���1��4��|��}\+����A)��ȴZq�c�)�i��>�%:�P;��������P�O-'k�n�jy-M�fg�x�Ј7��K� 3�Z�ݴw��w&ɟ�95��v6�|�oqTt����p��^Ŋ��(��?ШzW�����[���Tԣ�^y���&�F�󣂷$ �w40x"�WC`b���ֲ�&�~�4<�q+�Ġl�/_؅��#K~W�P�9� �f[�=}�ގ���kx�o��|!�*�yV��eR�xA��,�����ʱ�QG%��u�<_Z�d&Es�Y����婄��mq1$lV ��Ï�C���3��*C�ͬ�E��1� ���J�B\��\�o</�KҭM-p�2��֝��2��4�{|{�;��uN9��3T5�-���[��"Ϛav&A��I�i�I�-�e�&��xV��V��F�-���g�"q(+<9�C�Ϧ@�|��үC�������jX�uTK&?���Wcą@��/��#��`O+MV�\RU>S�lº�4*��|��X�LE"D ��#��؇Ӎ$;�P���!���{��9>���1�hazdX��EϿ�1�6��P;y58�	m������Ŧ����^9�Q�>��.k����7�6+rzW[Q�vx�:���ζh��rz��ݛ^Ѷ:@�7_�plQ�K?��q��$y��񖇸���������v�/������;U(]��oĢ���\���*�W��*(�xR�oFqG���f�z
�ier$+���c�ԇ�"��=_q��ԁ���� �v���Vw�g�@j�Z�E�M�L�Z[$�a1:}=�҃�z
@�:��ܡ�`�����9�g��P���ꤖ����Jݲ����h;�;���������T�=��Y�В�����B���Ȫf���q!����(?����ş�-���ܵ�D;�2�	��L��m�-�KK�������&��!��>�;N0�i�`co�l}`x.I�t����z�3\�@���N������}h{�e�AP��P�F�>;��`Z9�b(s7���%H&�$��*�Ή�٧ �c��3���`{i��5f�;��ݤ�ݒ)��"��/wj3I������3,���9&y'h̗���Ȣw{���{�Ks�f-���.r����Z&�\d7.�oR���@���@S�3�"�e>���i���u�w{����[��}������l/*����	�19,��0��?t�����H)O�L���)����>�n��oq����eG�̮͆��gx�Ϭ �W`�qA48��'(�܁�9{������,W^�i]*�x�t��0��=Bs���5���C����U{��@�!���y0.Kj�ŅS�+��9�	��9���Dً�J�"4>�� ;^G�����R�f �-����<�cN ���|��]WN��6=�A����CN��.���W�f����1**g���]8�� O���w�cc8Q[�� /$>lq�y�ma�'�VW�3�HH����.�
^#ɷ����dDu�;��Q�G�?�.2#�� f@zGY �j؍}P?���;����'����ST2��С��$$�l�[�q-�>���J
�0b�>�Ǘ��S�l�)��y���\�E3��N���tO��� e�1U���/�S?�^{��V�jb��r6�W���y �"Q��vw*��~L�0�RB(p��[�^͖Q�B��S����)vO<��Ā��r���2]0u>�6K�inRu��	\Z��-q�a$�����YYF]��:��e�]���&�Q0!��N+1��E`?ٖ[>���]���R� ��a�/O�\��^>�$P:�H�	�˯;�؞�!o~F	����Q�B�Կ��VM�#�T�8GZWT=�uߒ���q��h���1�u�|�xG@�������5���Ѹ�d �jWQsr%�� �U+�<":���D_���fwu,(U�o�I���ޖ�? 
��Is�`�ܒ_0|cj�hbNA<������UkJN���.��ɒ,R��9��GvY#�$��f����6�S�FU���Ƃ+:�ABE����0k"KY�ǳ������;�դ�Jo��t$N��c%���o�Ԡ��V�A������x�|"D@/9�Ӽ���1� \:r������`a>F��"�=ne�i�e+�'������j���N�y!�`��,&��d��S�	��^��v}�3���������0o�r��vg!f󶡴��5�?��u*��mw=!��i�q����ء�u@��2 �wAY�e��:Ʈ��r��;�S"c��|���՘(����H�K�Q�B�Uj�d����n*�N��J��]u ��Ӱm��d�n���&��l��gna�Rg��aE�yr;@Ҝ�3���&�
��6x���떉�e�䠲E���g�àpf�u:�Ⱥͫ�a�tV�d��냡{�'	�c��R|�f�4�X�q�����s�=X����xmw8FO-�ёE�p?�bc�ظ���:��F���l�r�p���Db�7��*k䣎�MU5mnD�����	���>}�HqS���Xː|���
n�y�8 ���ѷ�)��r����L�,����Ѩ���
�i7�I�����#v�ݕ�e��
�>=�eM.Ej��=	}�g����D���T�&�@�%cȽ�8H��n�&뿡"�������|����o�hUv�5\!���ʳ��X����ߝ����`�ʍ����Z�F�htp�Ot�����W(Q�.����B�1�����֥�Q�o����!��;d��d�9��o �g�+͗�3*l\!��O�FE�Dsb�RQ�qY�꥔loOq�r��"�n�|�d�s˂��l��q��CvOi�,�����eKj�
�%pVvj��L���P�=!�4é>y,ظg"�e�|q^���O�6ʓS�@��-er��hQ۾UO	lA��ԙ m��=���b>?���Y̊�@?Cρi/��!���@Chr�Z~mT=-�k��ɖ���{b��`wMг�[�7��j�Js+���I��߾',�O�3va�/mM����;�j��!>>%2��uh�M�ѝ��V���QA[%U'���*�7e8舋}�D��IP @w8�WI����f�	�C�����$�%��tl�L5�ְ�v�m�D��D��]����,�l��Z�6g������G�H���V��|�����>�!�t���#֠��bN4�xr���zQ?k�+N�ݳZBH�m�Z�09,����(�RQ��_c7���N���Ҵ�R�mi��H	>��|УL�H���{�z�6F�&{՛�C�M!AR��� �5͗��d����U�5j�&�Rh�,��Nj���{;�g��Z�����������۵_�	 ƒ��6�D���Ar��bEy�P�'�c�H�[`rJ�� ��?��A������Q� �Rf�a+�3��F �3?��FJ�Đ�te�b�zH�L��)��e��hS�A=�X��j�8PA��q"�e������n�=�� ++�~�b�YI��v������t��]���3�HQ2*�/��aC�{
�����A >o�B=�fDl��m�^`�|�K�y�Zx R="�����gM�Ix��2���2���?��PRl��R�%����P�r6X:5��
���� !���)j�nz**�P݌��82�����E������۱�>>���^e�m�0�^n��y8�.��[�]���� ����gpo�TJ��%흯�
�nn��ѳ�%�����%����0����$(��v�r Ep�y*X�*0���N�H��mn0$`��R"�Q`�Ԫ���8��z���b�NM_r�3a٘�u�	V�~Ֆ���N?2��Ɍ<h�4,bRvF
/s@�̚��{m�F�C57��T�.��T[��)H]ϸ�ul'�+��Tdן^��($5���)�@W yx��,e���v�M7����#-RR(�Ѿ/��h�e����^d�N��ﻔ���.���bڴaK��"�>��m�a�.�ck�� �����[7��˝ qu6C�1�\O�T���9�=���eݧ�TMuw���%aI���o@]W�-��zCʴ	�A?o����J\�?B�m'�~@l���em7���� v�����۰�AihE�$�5#E�J�Ӫ��#�vn	�.p e���ۤ��&Y���_ӼO>_P�]N�y�w� ��!|��ͯ�����%WF�J&��ݳ� �����5Rޔ-���� ��L�t۫���0�4"�t���8x����J�-��p�&h	փZ��{�f~p�ɷ)崟\���:Pz|Z�IE�p��kr��I ��s�6((7e�x��}�N���crEZ���W>�Mc���
?������K=���|DL���tl�W�7��kڈ�_�Zc�)����L���޵�=��0���-6���z1IG�z_fW��O�B0[�q*�e��/�(��c���kc1"*�	wS%��Z7������ǻN�H>�s��4V�y)������/�S�� j�=֌� ����PcS�%֊��`S[�_ܞ�s�Z�a�sni���(��4L702y���yaˀ�$
��H>�	�;�x��C��R��}9�>�{<)��_ǖ^���v�-����TĐ/��U��"�s�W���'#���'g7'_�h�f���hZ���(���ڱ���.$��>0����
�����t�����Βl�n����HZ�,��DR�y!�^�~fJqi7�o�qww�VKDy�!7r/7[����>�U����}m�@�C'7^4��#���|���i�Q�� #�X���d�g���,K��Y���l�{�m�i��6��LB��Y�?�	����/�)T0��5/��(��o�㋄������,������N��Q�j�Z���Bm�x�)N�"��U�W@�����Z+�%��!,�Saq��_;VU���ˤ��g��Q`�DDb�ȱN-J5r�����4�SD�P����"��KP�3�����,z�Ǖ�]�똘��u�\q�L�����.�>���Ȩ˩ ����X?�f�p@������{���=�Ƞ���r�����϶:�)��ghx�-B���(��*�qP�).dP�V�����hcxSޖ��s&Na���h�����$2�8��2��ݗ���=�p�ް�魋�Qˍ�W�QmR��v5R��[�Dʡ@�j.:�	������FmNE!�� �ө�Wq��Ժ(<n�_��נ6��3b�;���8����/0m1l�BK��\ݳn�b�����_�I�^42�h�������a4�"]�2���h�&�_xM
���=Cy}x�l7sc�Þ]N� �_N�V6ك�		
v���HH�f")�h��Fw�3k�����ma�-la��������; r����g���������4��<��ʖ�n���As�w��C^���d,��V�g����#���Li&\����V����L��싹P;��{�RV��K��#P�(\q��[A�˯�(��k�sl{�)Yo&�j���"�,!��J���V�������싋��X-(�M\��9k�	��l^1�bX�Qq����ߴ�]c�m��f+�秪��n/+oH�l�S��͔+����s^��{�B���6��SqQ.�s&'� 7}�����R��.Š�p1
�B�>|f��NB;aDMna���)6M�Sli�x�b�5�lci�Qc� �e��u��䃇�W���ㄘW&Q��CE-� 権��}J}M�^������ 3Έ�qn?U�s� �*�tyb�Pj��/��~�����r�,S� �gcW�P-�u>4�,��k>n4�n@����;q��������L�	W�ӽ��Cy�y�u�����˝�!���1�t�=����J��cc�m
z�M��X`�+�:�(��S)��x����\�=�� ��Z����9�10�����<z%��ᦨE�0��1 �R!g:ʗ�< ���hՓZU+��ܳ��[	��m��R�،�g�v�yc��1�8hvV�\0�A`Ï,gko+)7�Ў��9c��p�/�ڸ�J�M�q�A��g�69����F|��<O<�B�Y�j9�ڌ�^�%��o
(KM�A<�����k!?�0Y��zߌ�`�)}d
��t ��KN��&��h�m����k��S��_:};u�p��E�8�փ�r�ٍ��w��j��iC���S�D�g���M��!�ji��&.���+Y\����y�������i'i!s�o`���g=��ww$�<��S
RN����?�6���d-�!6+v��͒Ӷz*#�GW���wٓ�U~�ތ�(/�"�1����>[�6_i����1�hc�o����1�����ǫ��C�cI�:��V����)dF$��zk����0��46/�����ه}1n'���ݚ�o�h�����kl�����.p���M ��)�
R(��î�-��b���S�����_N����0����ݿ͆<շ��,�3�+��|m^��C�U�ӑ4Տ3��ӝ:Լ�D��ؖ{Pݪ�v[f���^;xMKq�0i�B-$�_�+W��鿶�M%�S��F;�8��d�5��'��0M x�ѣ Ad�CK�u�����aD�<u����Ja2����>��~fg��3��x��C䎽�ɗJ_�Hd��o�|VY?�ɮc�~���+R���R��d�FMf������X&�#s�\ N�.��G�ۂ	�$&8H'HgU�#?�?�?�A��^���)�+���X��p�0Q8�?<���1T	���;��7)&
���v5��g���kY�>��3~F�:N��7�,ܾFV��UG��8ԯ�Q��H�f�E��O���u�錸���t��è�B��xQ��"��7��%/o�${��,p�z���ݨ'Ε6Ʌ�@�;ӊ!�h�hf'x�@9��Q��FӲ+���N����ce�Z�pm�=�	����9�4-�~X
�Q%��!�s�RxZ���Y��X��<�������J&�x���:�ŭ�ހ��0˝�}ȴ���/�'^���M��\̤k(��Y>�c�}GE]w��D(@����]9wY�#Xݚ��_\�8I �j��SKh�1&��4�߿}��R��-��ぱ�Ӭ�7�A�r�]=(�쌇�5ק�k�k��`uu)��gL�Vī�织�WUT�f �t|�`���ً��e}�u:��x��-�=�`tr��#�Rv��߬����Y��&��w�>�����垜q���		��J���".Vu株Ixt�atr�m�aY�Y52��Q��iM��a6�/�K�>qWޙ��h��R�s��-�qP(+�g��I�LH�/��� ���3G�f*u:�T�`�Y�B!���y	��8̙��|?Z�DB���Z��F����w@ef����sa�*�p��_�c)p����	�PkA跪�+���OĝwXY�Bzo��u�Q����F���/�]�l�'�Gb|փR���.�)����`��X�/���`�b�ԩtE�z�ZY��k��4����t���TL�w�X���֟�1�!F�7H��0)�]D�����x�U
�MO<�AG�a���Nl��{xtّ��I�t�	=��䬣�ov�� M��4���w_.�0^�F/�͝����^k�2\�U�.��i)l{������n|�邀�U�=�eXp%�x����\Ƹ�{�q���o��ƃ���~=�Ki.�%�wS��=[%Оn�^@kЇ#��>$ŉ#�6#��~�m�!��0ݱ�U����nT۲�y���^��8tD�RR;��Ѵ7���s����\�1S&�����W���̜�Z^����2���z�,�ª���9���~	(cI�-	ѻ���k�3k�#�	�N1����t���y �MS�h��<ȱR-b��1A��J�%kƸ���o,d��t������Rd�r� یLH�0v�7vД�2�̱����v=�in�9F�vE�F���|��c�9X&d��(�n��5B0�g1����kL��$���7�ojZ\�~h~�j���&�]����4ғ�C�V;�E�zq%���k(o(C�5G��<�:�SVϺ�����DX�Y��Qe�<����S.�Ś��E#U\V5l��[�A��\fE���[��D/������9@�l����?�q+�I(=����U��B!��N�g�!�o���?sx������d1�K�gs�����"u(���@�2у��8�vT)�ۋD�~z���x�g���d�h��`�@��Kι�ʭ�:�C�9�f��j��d�(����Q9dN�RY.T�M�=���eP[E+C}Ϳ ^��/)��ɴ���YA���Jc�4�>�00���P;k��4��gG*�42dY����Q�d�c��)�ق�28�I�e#��v-�VXٛפ���;.ϥ �at/cʈ�Ӌ���h��Ϻ��sݱWj.��d߇2H'���`~���5�b��Ν���]�}S�NA�ށY6NT�d�X�!`��Dˬj�ڵ�R=4�\��Yry6�- y�a�Y餻��P��<��(Ҏ?
�8�w���%cT����Ϩ�-x%�L�q���yp�\q�*�����P����`�����\3�^�Yʃ[�\?�Qڤobl�VM,��dBo4�#�FO�RgȊ���u)����cZ1�sj���b�����hϸ����R�\_�	�š���:n3����J������@��0�����>V��@#ҷד��&M?�d�ԍ��	��K�|������@���'��|��"�q��B|?]��.�c:�*�3���F�}��c�EϔW��.���vX������N���]��~���@�%H��q�^��kH��U����9�&�<�?��F�p��2M�xfVHU�S�j���tS��\�I�Đ���L!3'&��}�zqIv8�Wv? ��hԒ;m��sB63�3�=ٶ��Dq=
���9��A#�͋���􉢷���
�;�j�"���B袖�<��E�(F��|e`�a�M����ɂ�Wd�������#S:�G�9����/J�1�N���3�*)dl[�v����q�(e���:�i�ﭻ. �`(�CB@���������|~m��
�(m(��aV�H�ÇE�{�7~��]TE�ק�d�� �]�����g�,}����hM�G��K��|"+��ĉo�o
���Ɣ@Z������c:��OjQdo�sU}��O&��4��P�m��M�Re�<�fuQ�Erٰ�_̧�3�&��rj��}�(X���L�����q�;-���	i)9WqK�ŭ�mе�µ҅&wg�$Xz�I!��#��ȏM|�����HI-�R�3��@����]=�]!�-�|�v��o):,%�����Z�K�[Տ�k�;Cu��)���&��v�B�B�֐�ĝ����e��#:FGa�KMo"A��F�X�+����ߦ]^~n��n$P9�N�����}��+�J�уGB	�2Q|>,r-|���`��5l�)����(lrOD��86����$�-��kL���)}%!/����G���2ږ/��߼�&~��о�)�8�6�[� �&�[R&�h�-Mȡ��ʿ�ИފƁo0�>e�fa?�/gZ�q���(�ȭZl"7q��_?�-��`xW�!�Nt˧nh��_���]�o��uRw	\�T@2��+� ����D�Оt WY�w�5��7��P��D�z6���pm�k��Q5cF��~�|�(�#fyC�%w=�@H�]�=�:ߟ�P��z)"���<����Bu\_�%��T��ڈ	r�����\q�#�)�#����kzT%/�>�w�Hl]�q�q�BЗ���t�c�QrتHkf<�p� �]}�Fn{�~�-~7�8l�<�r��揄���I�{ ��6�V��N$�&��)5��D����?�#Ȋ�v����S�9�l=���V�6�,t1���F]?w�x�3BWv�¡S ���/�$g��|Ϙ����-ҥ:�
�K�@a�6C����I�����}�[��oٱ.�]|R�tS_��bC5a�'�f�bH��(���� �Elf᧡�(|����"7������y4�ʶ��uB}�f�	HqY�������p��U��*����<�0h��bzM�b�O�q��,��7���0����͹�&d1�I���.L���O|�o|�*�7H�~\�#���n&M�d��|4f� }�?����Z��L\�)�1&-�h�G0BF��Y�v^M��|���� �c�z�B��q�^��������;K��\<e��"��4�:�䞺N���u�ޫ��,[���vq�=������m�q���&.+S��lmv�>�������YR^*������5d�ߒ�J;�H�{6l"JCG��Բf�x�=P�>�P��픚]�{8�C>��(�p��BB�� ��C��iuX�D@M��8���6�~S
�&@�s�܁��6�9���������0�?����`��1��� #m׍�N����_��1�M(�7�y�NX,a�����4y���E{��� |_�c�������*�Ј��5Q��l\}���⊟��[K*X��
��P^�5�y�6\�t�<�3��, �w�j��3�����ԀwvA$��ɢ�p��e�O���C(��v�0*�D�|�EejH��h[�s���4D3�ja->�v�0��Y����8K�2_��>�C�GKmB)�;ܔ�������)��b|
��z9	�����+��Oh���RpZGj������,�$�4�߸����(��@V7�ֺz����Ê��B��4�,����fdZ�&�f�If|�/�cǯ��h�YfJ����ٔ$�s���$�{P
�D�ҭk�@K�e��k�a�c��C(�O�?B�&���L��q���sG� ��D���:��*������a"�:�n0�P�DF�>�t�+�ƃ���@�������Ǔ�d�Y�l
ŕm��E�c����l"��v�Br�IV�'�L�92�A�u�~Vw�ث�w8ￅI`3>�H�X��i�f/ԋ����%,����e��mr?���Q�䃴E���¥�ְqt���ks//SC�-�%�Zd�ǵvi' �y�O�8�(����I��i�q~��0�9�0��P-�� 4����P�L=?�vn^Q~��A��T��{���P-���:Ɛ�;��]�}��	]�Ě*iMW%�;��p��d+8ʏ��@);Q��ۮcV��D�s��D𲠓~�x_eb�氵v.��H���˫ro�V`n�ey������@���ǰa���S��w��
�^e��ó�J��?Y�b���z�zNYݽ��i�,���y
v|�a��������������y�m�\�*:Ng4m7��b"�+�X�
�*�OV���<�$��� ���ZP��6�2�x7��h%�d-���>��`�^���QD�x%���WC/ll1�v�e�ihv�J
�h�Mٍ\��P�ɘ�X3��j�7�m�q�o��l��y�f�=g�5���G�� �r	�@�ò�3�����̎m�,VQ��t%]`#�sY�[ 2z=���=I�e�d�<p߅H�8EѼ��A8�"m+�DM���<5���ల����I�Ĭ��0��N�s��kw�?-�+�~V���,S�#a��3�%ovmhum9��XS;[ҕ_v�9���"�9�����6��Dŧ�Kr5���&�rYS��o}\^��f�̉{�u|�Qz��}���p�D��HkDy#'��{n�c�'*u�� u��Ĳ�mQ�Ǿ�c-xJ;�o���P�PF4u4s9��g�&�����Q�����T�U�I�*�7��	-ٞ��c�ŉ(�L�"��	N-� b1�"��Ϊ��� s��˘[(�]��M^�$H?�	�Ѷ\����}!��Т9��U5���R/ΗFf�S͕ʝ��ؓ'l���?1wa����3����w���°�y_�aR-fg�%\_C�Y?�nz��"������1�F)��J@����.вC���A�:cQӲ�#���CmCA��D�F\��Cߡ��T��A��(4�R�a�����}Ӌc�ED�ݞ�y.\0������2�"Y7�#sdsK	t}L5��'�P��}^�r�8�-y��'(�#�������F8\/G;�7��4¹�1LR�A)oMYf�z��T�v<1|�Ayv��,�!�ӟ�|�Aַ��%Ҽ	[r̾S��S��ˤP�.�s'&@}�v�d�'�E��ő�8�   L�Pm�����}zb��<�*��i�x�  d;y��iW��G�M#�9��p��k�~��n� /ד�mmD�$Í  �^A�UM�Amh�L ���X<X�r���ES��f�|C�v����W�1��G�0�X`�2J�'E9�GN�q��3-׮<��?+�s59��f	U�;�<:!w�����kb\!�|�>݁-��с4F�H9�i�R���B&\�U@��:z�m{s9���J�r�|�[QÖ5��@�"�V/Ϟ��%WN���ŉ0h4�7@�X�EM����Q�SX���f�Q�܉�0B�-ZM�`V�8R)#%Š+2<�5̇�}W4��p��OD�Ii�OMa�ES�D>R`G����@ WS�8���p��)l�Iݍq4�ik��2����\� ��J:1&h@�)Ү�����&F�i�L�!�/N@�?#���F�E�WJ�U��s�g����>s��������\���P��� =����.�׾��#�q�8-�G�$�1}��ʹ$�ZW�-D:����N�x��"~�[q��Eɸ2^����=�Z��O�����H嬕�6o"�~�Q��j���q%v1�ܗ�%����f��H��&��x����,uP�DNX��Х��B�5�O�&!g�/���Dl���j��T=�i��{��TQ7/+GoHCY�����*�2��_$�g'�2:�a[)��j�w�!��eEbTL�&b��A�6.7�����_R�`(,䟯R����NV����
Al�-����u��_f�ڜ'Қ�j�t�i+�xT��I�Ww�S^��T�5DJa�F
�)
skM�iYԆlD�,]��8wZ\���(�z��#_�&���G@:�����ô����m�ʨY?ч�M���fD@��YY��JP�˔�Q�2o
��l�hQd���MEo�����׶��Sտ�1�4װ����͉׽d��*9��r�P������^�jhX��?#v�0ά��Sb�s���H�@
�����Ɨ���9A���M���t9����a0#Om~������4~j���o�j���μ�!��+����<�_��X���т	��ȼ&��[�Ν�=JMs��BE���B���F���B�r�85>�b�ӬU�Fȋ�g��"y��'DX�l�Ք��m��6��[");W�����0o���qM�]�;�(sRe�;A�݉k�t�:b�G�d��e<�m�I��*e�4:*�俌��{\T��^H�;�]�@m��W���1��Z7�
rQ{�A�����@2a����L������Y@g9ÂH�O@�Ô;VF�~:>8��l;=�iP��n���٦@���k�O~��k^�&\��w�����-��_qe���7'�%�)�������2+�����*e�`��#*n�{"�A�Ȳ�ZO�KBIlP݇��wӭ�8�e�5��	��<�ۃqm�;�Pc.��A���R~�����#~%40s�GH����珀� 4��7D�#v5�7�%:�U�]%x�����^�sx.������SX3�Uszσ�	�{�([�r9�L"N�b��b5j��0�}6�>V�<���o 6��$lSd�_��nQL+0������=�Z���.�+T�
���y=���7��A��<���״�'$����Kt߂���o��4�j�'���	�2S�Odp��̢�W.-�� ��RY�6�Ğ@:#P�z�&*��l�o� ;jC��:�l���*�#�-t�EߞܑN�j~�lה�H*�N��a׽g��&|�lD�D����W�E�35q�����z���?-�[��t�y�e>�9{�3�����߬�=�YG8�-F왝�d%~��r �����ЮUX�g_�C�Ҏ��s$U0��L�lR�j��-W��X^pI�YY�&�+���KA�,�]�G��c���?)pO�(��轾u���%�-#��?���o���=��B�k=�%���~��n���TΘe�����sAqa�8!��cG�'���L��g��YW~�f4�jl��gFw���v�=]�O7F��ܢ�p���z�)��pڹ6sQ�ق̤BB9[���N�K�[9��N��]i_H9[�]���/�Փ<%�LQ�J�R-?�d>�5�YrJ��7"޷%��&�{l���R��V�<�g���E���㉚N�B�N�r63�J�Nh;Y"L�^h�n������,#Sb�BE�j�0�f�v1��t��9D��JXk����P;A����Y�~A�.t����33­J��3+n�b��&fe�b�b=����ٜ�����"����@��tS䓦���IdsG��7��_��<D���3����0J��S��q��p���,��9���s%�#����Y0o!ꮆᵱU�|���Տ|��8(��¹�"��f�q��;��3]�%<AE^�D.�"����Q��� Ѭ*r�R��E
j�ϡ�P!�5�Fh�%�d��)��ˑ��âFAy�q_�d��M�����7��JӖIH4!Vȑ<̤w��������Թ��|#`�;LNx�:w���/S�*�OS�� Ŵ�Sv������5�L��*���=���}��}�h��������G�@_�s�.M�����UM��d�8F��b#=:�Ae�5�2`"6��s]Fɰ:�p����h���(1D�n���&��jOI'�T����SIe^e�j�tX�ݖ���3c��Y?����{	\�z�'ʈ� <)��%Bb����Pd	 1�s��+/"�����3��,��L�$F�WKW�ر�Xu/ �L�S�ǃ.���V����� �H��x�����4 O�|g��Έ�0M9Q�@i�4��x��R�k%NV&���@���V���`HZ�af��ԵW���в���%)Bb~
���앵̘����/�#!K�Q�T>�eGk���x���i�r��}��&��ҝ�^i��/[k���,:��{/��5��0��������ԁbh��s s%�������tot��׊�9����1n%,�|����P��l|���	KwT����A�������R֋>F2���;
�v��e�a�B���B9XE�x&��k�Xm^�N��Q1"���NxP6R�E��i� `*u9�7,��B$tЎ^�L|��)kk3��nϿ%�Ɲ��+��c3�櫊�;q�dbem�ÔWj��|��#n�mZ���ӌ�.xȈqޅ]�|�$8�~���Lܯ�g�nY�W������ <�"+[-V�G�{�j����9寽�ø��������|Z�%�	g�����7����QHձ��uZ�p욾�M������NhNA��D�B�O�_ݨ�2�NvGu�ni8�^B^��&*[P)��SM�t�*ܾV�h�K����TP�ޭ:C|u���J�<��Ŷ��E��9ћ��?%D�ПS���{k�R]�P.�Sj��+z^	P�/�n����.z���0ԨAģ�2��1���z������p�½�1�D�V*����!����~�ɻ����pi�������˷�p� �!�r��HpQ�voS����	��)+N�I�vϥ�B�8sZ��c���x�����=�OW���]�L�A������(�������L_�hT����i�ݾ+ٮ'���ϻ�)�r�.�ϒI��7J�������qe깒<	�A&�s��l�q��9�>C����l�ۓt83B�X��p�dD�:���z{�p���_� �䗣�+�_F�9�Y����1R&IZ/�u1��v<:P\}x8��hUR>b;T��h?���X��DDc�m��A1�Xj�	��1�k��*4"�Ӂ/���|+�2�����%x@��_�f���5���Q�WF��g׵]rj2?�����x�d����
:SY>�I����z(��v�˸#�ˡ8:������� ��4�Rް�܄�F�|w3������1�w(-Rچ׹�~�Bc@~N�mΊ��`=Nz��=S�Rm�)�h�)���i_�A�����t��$��T����#A���c
j��^>�&��Ȋ#��=�T$6�1�ԯ�u��_аτ}���u$�u'Ȁ"�]��!��BR���A~��t����l
op�������� �9a���Xn�l�$���79?�Iݮ��n�]G h����}�{�`Js�kI�ٮ&�4���=4&���XG[6Q#7��u�ut�]�d�S�?Fݷ�|�XB��+�zI��dc~h�4�<��*L�rŐV�Z*�x�~V>0]��{����tl&[�k,fW�3�����=�j���ǾJ5A����T�O�^�>��,CL\]$evw����K�u,I����2�>��_C|J����':���+^�?Z��h���%��"�-�|��D���~,\)n`��`/f�Lo:��o��7ѯ�;P�Z����,�\�RS���n<����P�I�Io���@�.�{��������̘�Z��ܖc��xm�(tTt�0�jq�Y!6(O�/m���iE���7nOYSD�K�Q�k���ŗ���f�&��L��C�P*��SU���!W�R89���~�����?�!%�K&!B�],����%Z������B�򟁜���bh���o�p�u���./?���)SÍ�x���r�<G������o5;����� ��j>��C �{q��Lk��g^a�+n�1���<�(�KzBn�l>�B$���N	�#�����~T�tE	#>x.-�)�����b�轋+yr���=���d������J"����D��r�x.�1ߝ�0Ɇ��MLۓ�w@�O���тn!�����
��2�R_ӎ!��`L�����3���V��-Z�X��R �*ĉ�E}j��=ڒ�'1@��t�ܾ4Z�/^@7.��j���Jy_��ꭍ�<�b��`�N��'���K�C&�g_2^�ѫ��P�R ;'0S:�*q�M�g�r~y�����3r^ej��|��G��ލ$"F��> �[>�|��Q�_�ǐ�K~����C�u�����+��&��K�<�s�@*mS��E,i�J�z/�v])\�&��?��W��y�U�9�������['��/�=�2SO��P��&�ݦz\B�^�F��6W��R�}:�UC���Ջ*�����w�� �Qe�9��$�a9�����)�+�G��ܙ��xXp��J�6E.�%�w�G�i3���F���G7{��yH�и�F����˹8u�	�?C�ф2�������4���t��JǺTq<o�M�K�̱��B�1��{!ˣW!��/<�ow�T�Ԫ\Ի
hӌ�m`���
b��sf:Du�y�3�����&��eJ]��0�N)�����CzSB����R5�o��&��D��w;y����4��,k��6���M��6�oܛ��杺o�4��QJh��4/yӖ6�1����]�S���K`� �	�$N������-9�F�r�!�x>�- j=S��T;�c}9~:J�(d��ce]mE'�2c��[��*���+8�o�u�7x��i3� ��&���R��#�O�r/��	�.����_�'b9��:v�٢�0TyM�翍P��+<26aGH� ��e�={�w4����*����f�Ҹ�O9�F��Q<��xT���5�`�jI��<TZ�V����Q������q�X/��=���7�'�G�K�Z��h@�J"�~�K�+_'�r�bG{����4��*�q3�.-�,�.e�Mx�_(�/�"0�v�_.1�}qp�����"�K��m��jo-�cv��$EUĖ	��r�f)�`�2�����/�Л�0���ISU.BF]J�Ӣ �����o�X��*ƙh.��W5��H��LtƠ�7%l�h�ܱ6�����y��
AG��-�� o�3eвV|9c3��S�[>۔����B�PA}��c�k� �ݼ�Hkd� ��Ss�ˤ���K�v��B=������?�+������k�}�!��X��0���s�����y�࿕z���V���oؓ�Rz���_�6L�N�zF��E�ʙ@d��5Բ>�o|0őo�s�=��rKt����M��C
���[�{Q������C	y����?Z��Y�!p$��B(2�ќ��q�8�x��eż��-/����bE�;ť�[&���p1�o���
 D���<X�{����e��,�K ��=Ճ�;�Itk���F��	�i���]���ޅ�1Z0�,�au܈�G�>�-#= #'�B\��*�����1����x7K�	�կL�f�p�Ʈ�L�Wugm��K4M�0��Ad����Ù~�!�q�eaB�h�����B: DUz��<�~,6vE�/�G��W4�O|t�Ɠ4T� ���IG�F�N�j�*z��X9Jf��k?���5}�9c��:޾����	���糽�x]]���%\����ԅ^������H]�����sS�4*J5�#ϊ�N|� I"�ܼ*�Gs�Yc~�H�P���5� ̅�#C����:DA�dz�Ja�c����<�?�f����Z�t����?���>�������_�2�xw���<����"�}���U�h:�v��0���-����318�<|i���c݂K��x��.��I�!a����\�5)���Zt�KX��|�F���{�ҏc�5��7!W���Y�r�����m��`��R�Y�S*Ya7�~W.&ʢS�z�e�7^����pd�!���w�򎺄�.�X:���rV��|�ZCns��;�� s�n�h2���#hq��i���1Q���w��d�%g����t4Y��'���X�j`��3X$�OW0>�B��!�L?�@@��	�$�0�\�H�sj*���0x���M������`V�_�"9��<{#!�X̀i��x$%��@�D�jf����9ҮEgr	V�U�"Js>��P�X�J޼��nFV�*�X��T1�6(��Z�S�H������U��k��M����
��-�dئ����6�s�ܼ�]�����kzV�yӺM^�]|�u�3�u}&���D+sx�����~bN[㡇$��D��������kȔt@�^�S��c�<=��h�uaI�3�RI�ㅃ�8�T󆖦����?�0��������������`p-݊�)�}�4X�=�.)�Բ���_�?g; �I�)�0R�LC�N:���v�8�����2�.q��hc醲RVٓ��n��s��L�c��g#P:��^ �D���Y�:�I����{���v��~�ۜk�h��炵T� x��_�[���\4�|%��툶k!"�E�J��J:XU��sj�O�l� �S�f':PH�=���H��(qP�?6{��3�:C%b���M�۴�*���p<��*vϋ����&��!�4�c04�P;�K�G�Au�Pv�FV` ���h`�Q��K#a����Nn����7_��qX���@ �����9������q�%q5��smWi�	-�@g�8��;5��e�o�����x���u����NJ7�{�{Z�8C��LH��1l�s��^!��_f���(�pd*�.R�!�?�BQ�	�Zt_�=���R�F��sy�c3q�y.,n�X� ���a~ϔ�hp?��Y�T_T04��X8�8A�2����D��>��wi���XY���u�G�~_�C`e3�� �Pd���r`p�����?|�ߐ��2O�C���R�Ӗ���y�꧋i��ԸT�hI�.��P�ɸ9�)���A�49�G��T����oZQ!zm&�k��W�e`2{�T���K�e�QN�*�=QU��!�|��d�-}�Y=餂v��`~�����R��O���I�K�j\����QI*E�+��!��VB6
(�y�������W�k/^���~*'|��v�8Kj]&�\74�Fݦ�nVc�"����n :S��U�o)v�K����}�C�@�]��hO�=����j��?D��@� �W�(�6s�~�垥���+���l�B�����|�`^��rTn�=3a��d�IW޴�D|������W�c�=םh����	��ؖ����]�٠�^«}�7/����X6���И3��<�-o7_}������p�o�*mhO�	Q�(��:��_g�	�#����r���e�F�R7l�"����1�9j�����Ճ�.S�d��q��^d�N���戢U`G�]&lK?������>�V���f䟩� �&ۋ��JX�a��W��>Y�|�D��q�T���ǝ�D�6�8iW��B>�P oV�R��S�#��4 ���!�cy��b�*O�
���*���£$��E��ǐYw(�%��%���L�hSE~hvlb�Q�|�XSu�A�g�qi21Z����$?x(o1,���2t���{�4���q���|�0���}�9-��Kl��4bd��Q��pe��:�kۣ}��Kw5���R�I���ϐ�	�w+Y��89�<��n)��-{�eX-l��>Έ��n+����N���y�/�$oCG�j�vkE���9��lQ��ڥ��6�a��^:o6KY���Q����k|�x̿(b�rIzL��
�@h��E���l����^PG��G�u	�5�Lů�ˉ`��0U��~���J�e��G�:H.W��@:�qq� �`�k_�O�*\�>c4a����a��Pp/����߷�HW�����L &�d�❧��+�
��sC��,� �5"��lc��G��|��̕��\�ֽ��dG����H^/�N~.���J*Զ����J �6��ҫǖ��HeA��׳�a,�uϮ�8i-�&"�\I���}	{+Ϣ�!�gٛ��,X�ӯ3�]6�0��X����9f�~�:�mp���:}w��r��s�a����C�H��y�;q���Lg�H�1G�T�F���"Qrs��n���ȌP����]]Nj�}�
Gb��^;�l{�����9���M�b��Z�[��"�$�I��M]cf�/V�U{0nA���@����.��3x�#��k��e��3�@^�����g�d"	��9��}ck�caa�uGZbѦ��,�\��[�ɬ��C�:Up|Owd�l�v
����=O�gA�����{�-{+A�s��`�h�5nT_�v�Ca�������5�UܥƑ:��h_�W�L�=:��ȯ�Ϋ���oggF������G��u1'�]㊴�˽A���;��ó5�%���6��1ݯ�
���İ�[c�u�dpp8%uv�.+[4.���K������(]X\s�QפN��o38�8�<*l��2��Z�;TJ)�βPq1.���>��������yx|�/1=c���gR��&��J�ctлg�[Q�%�J����,�=r�\fՅz짠�N��(G�6+ ���Pݻ!�nk���&y�>R��sz�AH�K#Rg䙺�y�U��>:���W0�˺A�5ZA��&�/�G���1T��r��"��6��'#>�>v���˷��� ~~M�MF8�A*}!v��4��:��K���������O7��ǐ�l$X>��h�i�P�̔s��
xd�����Z@h�܉�Y�d��ɳ.�P\ܔ@37�����Z6怍�����(mxvl κt2������h!��It]�Nqጥ6��[�d\�(rē����\��,�p��p�'�P4VK%�ꇷ��xڜ� ���ےχi��L�7��W!8�����>m���8�0�s��^w����,��+*(���l2�4��s�́��S@1���<�����q���ԣ��:-<����Ȥa�d�d��AR�|�o��W�)n��P&졌�f��j��"�b�ΓJx�ކ��e!+��ڽ�����
�HӺ݁��� ��椛C�ԣ2��U�V�y�� �\EJ��/���4,�A��66���$i^/p&}�|��'��7aL��Y1�0 >�3/V�ug�	���}n5�s�[��]�	�ƥ�#������\��Qیo��1�Z>SH@A���xS��żNܴ�?�;�3�a�#\���th
�V\][I�晥ۇ�dO%g��^���F��IՇyN�%����,�~��p��xt��7��)��ѯPX>r�\|[�����x��#!� ��������X��	�4���0����q2w�s�g!e�L:��x*j�$�6�Ζ��2�rb����/=����OI�nk�

l���@�3�M̧��^��Rw./�Eb#���R�]�P�b%�#|-���1p��I�=��Q�Y\L�����Y�i6AE��H�k�F�_'�̉gv֚��� �U��i�$���f��j������v��w;��(�]z���I+�I�=�%z�Z��q����E"9X�m?��u��G���?��"$�	�50˪��P��T*����-S��H!��ۉ�1��mnc�2�nĠ�;A�!���~O�@�dpH[��`����pr�ه�Ú�Q�Jհ(&����I�tد@ѽ��%�
����y�_��4X��$/���X{��Gz��2�u���E9��͜����s�i�_X
|�T���P��k�A�@5�#tAc.3_ ��3WtP�QtHir�@Ί�ɸ�K<�)W
��P7 �:�'�<�T�����%��1����{!%46����{k���[,=Г�/�,�]����fL}F��h��D��B�V�!)\Ƀۣn���<��QޡH�=WB`���b�֒�AzV*eJE���HC����W�)�ԍ��c�H.��ib���������� �/�N?�%���V7ح�jm5��~{��4I�$I�2��!�ra�S�������lV:�}$_���=�(�M�	�2S��r��C	������	�h���U��7�>�u��}=��
��k�~�;B(;�֫^;��T�[��ys)}�f������9��^�=�=�����)��Ӡe!�ǉ�*'� ��A�1C�y`B^U�w�S������l�7��,9Fs���ڊE
�����r'"�:����>��g��>��>O�K]&�ƻ�!Ɇ�����P'��}�8��dV`�ix<���7���Fd®����f�v�E,���}�K��;�O����d=���%S�� �>���PN��eUH]�+969���恡�x�/��)1v�Ձu�H2�.<F&�K+$.�C���#!ȡ1��6,Of�0�t�:%�G��1@�C�w灿����^8gR�������#팔�XB,K�b��'�F٣/O ��lg��&���d�h�/��C���"��ņ'+�i,oVe<ؐ�}e��z!������XY��w�A*	���~ǻ_��g�Li��wt�w����`�yOP���J�7�����\�WSW�.��j���mO�y�@wm�;�^:��,guN>PΟ:I��:�fPwr+�wH؀ϐ����xЈ��F�P���� 3_���f��L��3��ޤ��3+�!LƏ�x����G0|�\������r�?���*����Z��u��C,�ˈ˳��>I��M�HE����������KÊH1^\!��Z�E�'�QR���GC��zp��$�`DSìU�^�>93Ű��Qmq(�Xxo�|��c�=&#E��T2O�&�FG���'�U���u[v�&���`�0�h"Ϻ.� <6ck-����g��7qR��� &��1Ϩ���e�?���늻��k�:y�B}���:b��R��Υp	��� _'��1_;0��_&�'����Ȏ>{F0�$P����4�>�S�U��ؠ���Ƹ�E^����?� +�@\Hz.U�����^�a������i񜞀���XuY�����z�<�ޠ�d�������C�M�C�k65��8kG��J�/�8�A4��g/�?�S�{��(Kc�P��;�a\���~�:�v%sM7���uMZ�g�Q�E֣~���W0*c�K��Y,Gh�Vv��� ��N�7p�a��S_P``6)3��qc^w�2�j5 ��K��B�'qZ�DV6&�+�6��S�КЧ�I	@Hs��3�e'¨��L8��z
�_��ۼQ������g��<�S}�Bm�wQ�T�R��ڐ����a����nD�Pq|f��E�"�>�d�Vz�^8!ཧ�ɬ�����ep'��6��i%.�N=��o>�¢�����"p��};zfF��l�e�E��f��}��6�t*ӎ�,�g���jSO<��S��-~��q2�d��H���#F���+"_\���b��Y�ft�\3���0��WX��=w!*5!9�6F8 �u�����;1̙�1Ny�_-�0�'BJ�"�C��q�d���Z>$(V���q�%B�&�5���9��,�?�\p#�T �Kc�B"�F�����#t�	�����r�ˣ�%�KV`�!�q~�P��U�@���ve�zo�e=[�x���4���w���b2���K��ޝ ��QT/�Kr�9��$�K�pB"ڼi�2��A�p����Ub���?+y�ƚ��R�pM���7d�^�3��'���jo��l�UBX[;�՝�m��{2�.�\^���0�.]nfxhO~��,�-��C�Q�LD)Y��㌜�1fNk>��<¬u
�m�X�o�c֋�G�$�)���lĩ5p �2<�H�Ƀ�}/�D���Ԫ L�C!���Iq]U�/�	sB\����2!Am|[�k�Dⅸ�B�;�i)�����/+8�>��D��ߡ��:�<E�����Q��$f����:��F�gׂ�|�m�9ð��d-�J=��Y��Տ�lWI������J�|�QUO'�����?��)+��U�g6��I��b h�ԣ�l���}��p�����nøc��
��@f4a�_Ez��07M�/ �����س1��o�b�6PMl��ɛ�yN�}�X����^��G#4��S,���OU��,�)�Փ6Z�xq�>����8��*�SL�&hcTno|wD$���p��"��f�u��b���OO�.���H��$~�k]n��x�C�4Wʴ��T�Y����tn�^ʏ�5S.{�U���Q����h�Xe�ӄY��J�P��!�:��C�4���9�q����.P�i�_0�z�`��}0(Oa9O<��H��i���>�F]�d��8��,�/���ŏ���.��pg�Z%>M(p�U�U3̈́����v�!��R�i����)����`-S�&���:6�������@/�,u���m�c| "J�C�P�2�Q��p�@��[ �ĂG���Z�[��ù��qkG�)Mj�PPa#�A�<՝��
%��<��2��ğ�<]�]<��;	�_<��Dgb�_%��c:t�ș�c��o�roi��s�솓�],��D�U��IpoD�p��Ґ��Ɗv#��'p�G�n�U�Ҟ��a��	�9�`�ӯƠ$��J/��P��܁ZE��-�8P��n2���XJ�M�ȸ��-�����Ĳ�7������<5;��[�w?b�s�m|U>Jè��¡$5�P��e��?���_�K,U
���r:����U�w�@�iX�Vzj�(	�P���1�NV�qҲ���@A w��������]����Q �`���y��-PYzp�����K�����
�K�����6�m����HS����H�H �TY���-���p���ƖY%���Ci>Bd��#3�TArm���~���V"-��l� �2?����7�	�sr��9C���?B�5!��>�1C^~OG�������k =�!�y��.ا��L}U�&��|���q����"T���|D��[&�c�����Ʒa��B��L�&�L��2�t(�wU���b�U�L�����p��R��%L��8@ #Q��I�>��us[BROv,��kB�q�?�϶@��-�wK�������͸��d�&́
.'2D�J�3?x�<�Z�Y�\R_+���5��ᱨ�o2��
�}��-�lI�b��+e�T��M]Hv]�1qoW�ʚ?=�'_����/�'��*rk��pn�䧊���E:b�Q�����E��|Dxy��c�0Ň�=+�A���ތd�T͛E��LtYUi�P��$��T�1w�n�T[BӜV���;(q�)��u���-�Ү��C��r�H�a+�j^E7�*U�٘4��䧨͙/^-MT�a�m���?,�K�%\	-��{�B�<�n����%W!u/�BCG,�2w�i��,�����\�,9�|;}���@)�١*���I�1�3�!�5QX�(�leS����K i|�)3c-:S���/qo<��=S�D��u�����&oQZ�4'I]ߘ�!2����M��^�8у͚\�mhbQ��Ia��P�E�=,h�6�+�PϮ�Q��1���O�w3��X>fM ���2��r,��Ŝ9�w^�ٰ�<��2�$F&�5E�-6��GR�2q��ߪ�L(��Vl��7�+y��l8�F�M2k�g��_q�I���6�����V���ћ'}�w���:a ��^!�s1"h��ʊɆt�M��_ŵy�%ttH=ѻ����%N�@͘��Pf�9U�Ń�Y8ɡ� �i֞�7W����m�����	{�d�_�΅$g���ŹD��'(	{��2,�n����"��z�_ �S��N�	b�Jlݣ;�[��Ӓ4�@7��p0�#E�@�( u�+'��"��@-~� Ǒf�vns��91>��y�}��u��i�i��n󓾝��	�>�ȩ#��Q N`����#�b�������v�?zr��Ƨ�>+�m�l.3fG���D'�G��ķ�����'�a��ƍf�&��Tl@:�[�9f�]JF}�+�3���r���
�ok��Ul��	������HY'�\�>c\'?a���U�8�:x�z1��D.��|
�?�1t��_�lס��kO��^�ر棩�&M-U��\�����?/�r�����f�
g�,WQ�/q�K�X�UWp���j)�P�F�]�3��Ee�X���|=�>�(�����/�H�wMO��p�V�$�+�~�!�iuͲ��l�8a
 '�͆��5)�>������do׃T]���-�Y��JǕ/u�{��)��5�������B{5i,��h�����_�j���{k�I�罎�;�9�����󃟁@�U��zo��u��3���Hq;�2�cHˍ1�g�n�{g��/�P�0*����4GJ���c^��Ң�A:�'�؜9�H���ꛇ�3[�*�����i�(d����q9������lH}�ZE��
���4K�q����1n��	�5j@�ܮs�cc�?���+H�u�m�Px��17!%t��D?�r�b���T5�e}�x������	<�F�n�g���}�P� 9U
sߗ_@�M:Tv�J��V�Z�uxtH�O�p,��?�7u:�-�W�v���<�a�����OJ�&a�?�2��Z�$/�Dx]\+�h�6�& ��2�=����G��ѵk�:#�{����~��w��|}_���F�Hu�O��mn��E��Ђ��z�d`�^��A.�Z����>��@�e�L!*c��$��8jMNlR)A�ģ��HR�a��@/^[L�
�g�͜?�޴H�$��0p�������Ϧ��aO�*\�d*��s^q��r"�8�p��U�w�Q��j eZ�ʤW�6���nlU�Yq�Y:��	[�a��W��LÎ�b'�S� &��pWP_Lꃬ
)�w�÷L���C|������p�"5;�.F��kKie��p��+B��X�W�s�t��R�1����z3ܪ�-%˱.[��A,��g�!�l�[�at�Z~��Z��m��#������O8#Own��#���~:��FT�깻���׭�%��V�{���*�R$l �$%~XV��?���� �{LN+1�Nʚ8�6���X?Ƭc��~��l�G$���qb�ܻ������s����ڏ	���З���R;�1���e۳���g������¡\쇟�2���/
��l���`B��"�N��P�8+~�Ҙ��FKĵFt���?7,�[[�FM��I�&�Mь�e&�W2z�f���dgc9��+�_��my��H^���J����s��ܼE���m�����a��Ȟ����I����^n����l�f�2��+yǬ�8`+����*��	EjHH�bY|����6$%�q��l���X�_H��]~H�� '�
IK_�E��U'��d	�\�t �}��������u��RAb��U;�ؚ%2��"G�sl}��D�c������{��r��#�J�^n�	p�S�a�Dt�q��_\*߭�2/!bc�W$���ʒS��b�Wp^ݚk�h��Nd-?
�N+l��� ܜ���[/V���:��	Q���`'C����ԍ޿,��ҋD�u��#Mn���\���c򣤯�>��t�7ʅ����c��z�m+CR�i���g����v�������đ� |l�P��>t�z#GD�(Ga�pfp;Wno����&��	9,�[DKg��{���G�Bv��9K������'?���P ���?�(�"�!O�XN F��b2Wd��C�l	7cv�l����G{za5آQ����唽�X2�Ĕ���L'9��+"����J(S�PX��h�F�bir�49��b�W�;Y��H~9P�h��]_�f>�f��P 2����<{���hF��<���I�9�(������.���tz�w�����eo��_a�&�5|5Պ&ʖS��pD�^��a��_�Q���4��9�ɛ7�	QU���2Tl����j����f��a]�B;K���I��V�^��!�D�mM�L.K���%���E��@�	��P�C�����/{�b��~�؃��F��GD��=���0�:��@s%M��%Iң/�I�
��C9r�P6m�O���
g}�P��l�ц�?����&�dikC�Q����a�^����CnȀ�a�m��ԩ�h낭p��o)�Ch>�SݡM$���a4Ң+��AV$�by,cc���H����f˘Ri���N�v6�|��LI�7o��ۺ�����%&��(g+hs�2�57��+�l�_>���5�IQP'�1狇��#��l�\����lY�<��a=f�N[����������r	,B��&�xI�J��~�2��\��H/�_u<-r�nnY�x9W"��^z���!shb�U���GD��pf	�)��Y,�Y�*w��ϫ{���{ub2��/�v�˰!(0�:���\��N��!�z2�Ye�s~U�i΀~��@*�7nl��n3�q��e�3&�?�_�P��( APō6�&��=�u�� d(��V(�6�&햃�Ex��yN,h]J�L���\ք,���U�PR;�yx�D��+���s�?d������`��p܅��\��5�i��k�AX��w�/�caغ>���_�%��KE���*�\�u����qLe���M�a���rQh�r35�y�1�����[)6�fȤ&�tZ�rk�j�η�:.�W����/�z�ְ�@x�8ш�u H.G�B�_f�v?��<o�*y�#�vׅI�n�|N[LC�VY���eb{����w��l���r����K����^���_�;�t\_�"ً�����I ���lC`; z�0������<�cN��p��C~"m�,��Rl��Y+�!z�9)��m[��+u|g�0먢ۨֈA����SQ�X�Mȥ��͌,��::��/\&������J\��v0��^3لA�If��O�\�^(��n�YȒ��'�W�b=�2�����M��5?W@�@�f��Q[������@�ba�i5��P�:�Ă68>��Q~��U�!��\F�h����/��+lS�>�cZ<_����+0�9P�
s���s,�����Xh	y��9yK/t�sAp;�����N�ׅ�	6-��sC��e�,�p�p$��)�R:��� x+?��fS�9��a��-A���:�2�0��VM;\DJ5���J޹��*��73yA�@o����	�_�ކ/H�[�"����O�F /~�o����{��ڤ=�� }L�s~�6.*��{>��O�ލ�Ր�:�
�˲.Bx��U��{��DLo�.	��j��d<��UJrT�̛�w>�/;R���wr#���>�^>���3���=S�Czl�2(A#V�ք@�詳��&C�pF��LB���jv�:I�_❓������}���ix����qT����zxC���?��M&�u��RЮ�8��&�O���V�g��u����`^
��e�n}�I1��RLz�ZPכ���y�-p�f�]у����{}Q��b/���ԅ�,NӏDV�ȸM���|�\��\Se�C��k�	�����jő�����H�9�ҷG��(�U}�v����&2�� t��s8�Blj�ab�L���o(-e�
�0P`	"g�,��r���l�����Opݧ��/D��R�����5F�h��Y
���ZP�\!LAx6��ԣi��s�0�V��v7�rѸ�\�E�@�,&[)/IE<u�,wMX+�RB�E��7}�� ���|-:���0퓣��%첷8[��N��3��c��x
���0xI�<���ԉ��c��o�|���(uZ�����~�]�f>/��{b�9��ņ��}]�D0}���SA�M�O��e��Y59�B�������s�hg�1�;D���G؆tWe�}�p}��/$�;E����x"�.T�*��}^&�Jqi,kX6��.A�Tp���"�ذ�O�[�#@2`ڴ�wg��� OrA��[�r-�|It���;���_5�!�l&
��9#҈�|����f��0����� %1L.����*�Uq=[܌���xh��&�������\��������g:O����C�(��W=�N�o�]��/;��ֹ���y�[k>��|LFQ;�DH��-F9��cT�����b��P�Zr������i�O��9-)�B��"(G:/7�7�D衯��M���u!ӟ�-S�7 ec�C⒇���O~0�}��{�~u8f�1O��wZ������oq]hЖ�q�g;�A��v0@ŖD�7�Ñ���d�+ �;����@-�]� �8�vj�]w�oS� �W[w�����]�5w?�<*pOqbNNW���Vx<�R兄J���%l3�Θ�
o�������BΩ<�����p��	Gy�b|�.IG�^r"%`�u��e�����s�pSݫvyD��VM8����u}S�η>&��}��Ō�D�~먕�I��u�Q^`f����C:����0|P�D� F*nܒ�~��H֍AӠ�AԴ�lmrƹ�����KX 3���sr3��7�9������Ò�r�M3s����k��C���J����3ˎ c��9l�a��u��r�E�@��������6!ơ�\fB֖OZGlF*�����6,�4���e��"'0���e4��iͬ�}����qB9��I�6��%��"R����J}�&i���6Ğ|(�0�
�b������-��Ԓ$c��	"Ŋ[���=�@�=���n�;G�-�t�
���fwi7�G"�֔��?�{�17N�D����q����B�ɤqV��_��¸"ҴOʤ�2�p��^ˁ����s�O�\����~U��b&@cAݥdY�߼���|���̜��v�W�
ڏV*���-�"�^�Kj'���fi̱�S�=�ìZ�H�^���T���'Z�V�����	o�~̋A�昿1��\V�f����0��>U����0w�0�z��Ae�� [0��##�B�����;<W�0t�>bq!F�
�z6�y�ױ���k0��̭ y<�)%KJWMԔ��d.ޤ�%��fD>EM4��_b�<��~pI%W�m��	� TL��5�Vp��X�i��1���U��n��������O|��>�����"GQU���[��F�@1���\��(,0�x��n�`E誛�I�~Î� ���N62�_P��A����:���+��T�c�t�JXB�ܰD��D��Q��C��;�<J��K%��w�I�����t���R2��Ų�̓ݰ/�x7��e���~��[u�E��cE�9#�Ӎ\���`�9�dksp֠��UL�#�f�i�	���i�z���r+U&�B=@��#���O��d��WOB�>�����΀��Lr�૝=#���/U�eZ$�2f\;��}��$̏F5EJ�>����c-:��>x]�]�Э��\��R&�*��ȶ�3]�������H�����E�\������AƳ���q��Y�R�
��[n�gO�3Qh��wI�Y3�=�|Q/�jn���-���] >2�Sm�;�4M��L	����[A���j�[�����u��3a򈴳<'}5�qQ�F��`�(kgc���$��C�*��;�+�n媀p���@��:�JN�Q~B��,����๚z(�v!�h^+� %P����t-��Э�������G�-aֶ䆌�M���ԉ7�4eV�Ϡ����(���J��cp�=���4� q{L�_B����.�����t�f^& ���n&�>���:���1���m,<�@y��?��UYTVP��n�
y��B	��1cg�^��`�������s避��S-�|�L�1�o^[�0�*����4�,"H��Qg9Y�y�ޖl�����*�>Y�w̖,v�)��ڤn��4Nwr��y�B�d3��������I:9��4ѥl�c��<������x���,��=�䘻o2�J� �q�Q毻�#c7Oͺ�(O�W>��qvh�"B�����|݁Q���'i�wJ���Ң��w�a5�p�w�]�9������x�;�����՛:wbd{�Zw��%O���E�Ó1�d�����V���İ�!D->U��&�*�z�s/�Q
֛�o(�����C-.+nʊ}���[�t�`���Ӓ���ϿZ��o�!w�F�Nx�R��!qʷL���˴�+�G�n�T�V:!�8�RHV�G�D0B�Ǚ�`��i�1���ͰE��	{8j,qt��!�>ժ�-Ue%)3�:�<�<����X"d�HJ'�ߟ�g���幾�zܿ
�7->��Iݯ���1B�s���W�>�k4 ~d$�*��>K:r�
�E��: ��5̯�~��>��1eŌ���]4�ˁeT�|FJ���\C&3S�_���[�R�C5ґ��f��m���� ��Gh��O�5(��0Yd���?�%��ޓ?�*np�i���?B����*K�_6��9]����Z*������̦ m:p��v�C��[X�|���Q[')G����eǅ$��>�*�s_u7�f�	�Qcz��֌�����h�{ɿ��a�!pC�B�=��xF���Ҥ)��EO����#˩�󁖐��j�q�����u	%c�N��%f�ph��&�	� �S���/��qB�o��&���ΫciEQ����������&(f&1�~�\0�b��>��[z���"���m�w#��K~��'��[��	��\+u
c�,yݨ���z��5�M���oٖ�\8�ܤs�r�i]��[����y�n?`>��`���.��t��n��h��Ш��ge��PO��Ћd���Cž�=`��V0ʕއ�e��G��x��ec�P�C����U��������%���;�d�~k�m��0�@��nAq�D떞_u�z��TUf��d��}����<��B���.#7h�8�߆��%����7�=�?I�4)�����uCSL�=@3����	>��w�q>j��7x�b�`��P!�q\�S���i2�����j`������I�!^��%�dd���I!T�)��FG8
.ms�#*|@��<���&������
���_侞Uh�Py-{��Ib]��kC��[�ǳ�����|��j���O����u��E=n`�4����"��zc]��&d��\*�#g�Y.;zlb�Ld3 ��ݠ 
��}��~>�3�=����.жa��'~�_8N#Re6��>�ⰻtŏi�ߤ90/֔�Ӻz������u�m�ʾ��6�SF�(�ɽ���F�(�Md:D�a����Wk�^��*&P��Vęz�5�y�|�|-�&Z�%\�gӖ\[�����'r�.�6�򃓽��6�����R6���<Qy*�	r��):���`���+�D)�Vh"ͦ�|��I5�d����S9�M�zcs�q���F��#K�y�şՎ�M�"�
�̷�ck�i7~5CJW\��t�0�m[���"0j���@�n,a�0a7��j`i�M����(�X��H���Ͷ�vxsZL�����]e��ٲ��ƺ�[)�,x;�UN�>,#eU�����}�B���D2�J��ۖ��w����� ���5H�uV3���*l۹)|���}}TH��;��d<�$1�|+��/@T8�=���oDӛTG�%k���Frq�څGAŷdp��������j�P�sq��f��I�ֶ;�|���M�rη�}�/�J����l���h���,��rO�eM��S�\e&�`�p+�ڧ�1�Hv�dd:�p���l�
�	J/�rf��C�.h8�A�[�j'��OZ�7�
��o�'��<�ߍW����3����� 0��t�����������T��ݹ�	�{�d��0�G�ԟ���\0YW���A�/��N*�;�R�+;LÙH��]�ֲ@Њ�����F73muE�S���]e���U(��j��yK2VGb�v�N��ꚁX��*��>h<�B{�أ;s*�aɵ���{�}�<'iH��N���B�)��ێ2 ç��\J�_��V���R\��ZL�����������V>~_73x�}'Kó�~�{�]�䷤��/&�����/>�[8M���l���r��4�N���;nފ
4Ⱦ��ڄ>o߮-6���t眗��6ҳ�LY��U�P��\j��k�[��E��$�eSZ��M��u����G~Y��:���sɝ����惂˝��R;�
�:t	t �#��2�\�?�5I�W{0�ڊ��눣����ɢ���4]A���$'�À֮h#X��i�����sX������X�h��{ .^/�~��4�����y:�^;޴���~��I��
Qz��1�T�q^m���"�&0�J�/�Jb(�|)�\�͝���v�t2-�\�{�'�ި�h0_W���]?�C]���E�;�UΣ��f���&1S���=f��8@�)P���`�=t�z)��#2���� �H(������um����!&�z
�r�k��
fm��&Ac�©=�e�?J�]7ܮ��sf�g���Ra����o�\�G3�+J������r���Bw������L����(*���Ƶ���,�Fqp��"fU�;??/��� �%oul�����L[�6���r�/�	�0V��ߎ5��p�f�Wm��\ɺ�l��Д��b�-(�^MW�kϷ4x�CCH�����a�Ir���!"�J����l��~(e�@�w��܆�˞�����3a� �7���@i��i�B|��Fىo�?#������<TR!���ױo����kϢ@7h��?ĩ��	���Z�K�̏1��B�t���)5&^��5��?�K�K�I���U�g��?�Z���K�y���z�~1�g����<��B��.e��uk�]�SB�q���(�VY��J��H��k�DP-��)�z��!� E�����:9~�}~J|~|4��Ȥ�ъ�md��%U{8p�n��\F��߃��&����=Oa�J��",���!���}�.[��ٻ��@2d�PD�.�Z�)Vh+g��ㅃ@��8�����D�ɑ	�A�2�����k\�=yЪt���s�d�j/���g@��U�*rIz~� �}����9o�Tr������7�i���"�{�3G�����j:�XH�#���b7*Qw�Q��o�"b4�s�v�dd�ޓ�~�����-�F��/1��xײuo�uO~�D��b�7���I�^���N g�ս�Zv�ւƺ҆��;���v�)r�LÎ>�sm��#��xvi�����@�t�õT��Fw�>=�vY��L-߻�E��D�hy�"I�:�y����	�� �wV�l��H\��Kƛ(3F]ގ/�11�Q4�\ߵ��?�'9YJq�)xi}����t��b�'ٱ^��PUxI���_�sU^!��f�9�//�+�'}�A�`�E����T"��P�GS��ce�_ԇ_����g�TF/���ޢN���82@��7WUwn�w�!H�����	�BV�$����:�W3���=�Չ2�"R2}���*U!0�������q�@n86f��Ձ��}�!�bI���Nv��U�:|��vg�
m�V?~ ;$��Cl$'�ɹ��!ԭ�������H�@�k8��V�9e��{��4.q<�5������W�5�J#�7Ǒ�Cm�:x��ӵT���i*�1���:y���ѣ�c��
/j	����
<T1e�2�l���:��c���j��L��}�{���(�/g��;�.7�~Հ)9	����zvl���3`�p�����_���EW�"qq��� ��N����{@�\U۞�n�]9>8���!�{�{mD��SR�qg�0\��[P���}y�h�I��\�ջ���Bm��1�Z��Td�\D�^A��Tr���#j!��kIP|�&�L����������ŘH�苵S��Е�=�}�����jb+S&�~�]����Cz~�������rD�G��_x�Z�#�S/D�����2G��VG�@5S�q���1���և�j�
���ҲWx�_I�#���:�G�z$�}y*K���/&r�ٱ�>�SҔ�k��P�Q�7�v���%D(0���|�۟������Vܙc���N��¬D�:¿��m!��m�\�V���ʩ+8G|"��<t��-r���B��cZD>m��>����~��1�z��e�;Oz%D��:�u�����k���N17$�BH�:}8l�΁Rѝ'����� >v�/�C��5���O��ܠt�i�w2�����&��I������|��X�ӳ��B0Ҋ���y��Z�5j$��=_`�0�R��=�$MB�'��&?���C��Sy(�{���W<�m���n6��غ�1D�L��"2Ӊ��F����,)E;Yˊ�am Cmτ�0�c&D��iӿ��_���_V8(-^�~�1��T��['8y�˦�1�9fO�~d-����3n�w���xL f�k_�+[I�	%cNkϯPo��3��ڬ��։v��^�NG��K��/�����*�HX04���~.�x\��U�F���}<��[\8T�r�K���j���T���$���N�t^��!�"gZ��p��~��q�7���U�s��q�%d���o�Ɗ��'���E��%Kv��7}��?�����ĈB=/��N)x OG�o�A�B�4��O�!8������rd��	���钍�4z��b�����kFfæ� �¤4�]H��x�����Ro;GCBN�ݡ�ܥ���}b��\}��Ѐ��J��QW�Ƣ?f�¬���9 �^������^~~7�vXs������ذ}���s��%Fm���>i�|��f�N���Ri[�a�}�a[8I�,ǯ{B��,��$6�Y��;�up.s��U���9��ZϺMx8�_��̄s�N�iR�^�Q@3�#O��Gü)Ycv����ʱ`\l�YDH�˴�{�����Q_*[͍��^���V �.��e�y�y,��<��Ix�Y���$���4H�WH�Ί�Q�a�1Y���4���e!�g�3��z��ZLS�O15�Iƽ�=�/�QeM	�S�
����͊?��t �Yã�9R�����% �ܳ�Z�bM^�_0wa"@|���N�p���|� �%�SQ'O�g����<�_�F@�#��C9�*M�	ڋ6_�#�K�6ʬ�q+Z�R��'���� ���٬XYN IE�$B���R��cETV{�@���V�?-�yB��4Pڼ:*ʼ�v�h���nI�=X����k�Tj�g�|إO�S���Z����'�^�����K�){ӡ��²��y�H�,��R� p�˜���O�{���'˯�htR��QY��z���l�׬J��Ea����'����ş���ca��P�O4��r���������>SLN�Z�-�.��*�g��zŞǓ���C��t<��F���U�Ë]<VR���B�y�@�|���`껇�XlM �j�]{L��*Ў��Q��&*ϱi�	-s~*ÐF�����Omľz!�-�	DÉ4E�����R�ebW��B�j�����5s�����m{���������2�u��>�J��C���KIG`t6=@�##C�U��'S`�V}S��tϰ_�4��(@��V�%�h_�C�X.�ct��5��)�tt���
0=��p�,�kR��.�z��9�L�ug񕸽�ߺq��>�x�2��0j�"}�PbN�E�J�d�Dj�|pHzW�/�ØD��t,o2~��/ɿ�u�a�@�b\��"ß*�}����ԅ�p����#�f�7m��:4������z��cIv.�>�0��Y� ��m��w���m�QA�d�Kl}3c�pLr���e�=r�a�h"��h�|�ʜ���~,�!��v�He���7�s���Y�O�r��t#ⷒ?5,�(}����Ղ�B�BQ�����yߺR�Ȓ�#@e��z��0q#�I.�v�����W+<cX'Ї�Ҋ��������C?
ڣ�3��Dl17iWī˙6)�-o��.�%�/�~�g�c	=��܂L,��OU4�Ь���+�<����iI��(�ۉ���?�H�#�Iqm�Z�k\Gx��byJ`n~*���lj�:)�>���fb`f���DH�2�\�%Nŀ��y�
{�����)`�T��+>����/�����p+��u!%W
�t�R��\ �#Od%�� _�Rƥ�'`T|7v�Nr��Oo����4.�*�1׵��++T]:���O}J���WR�����m|�}X��Z���S'�:�Ӻ�KaKoˑ����+�E��s_���&ͰJvbL��b_O/೫o�;��K��Y�zk���
�JO�BtM��g�68�:J�/���d����� o�ҳL��5D�"���,�{zB��n�J��W1-�NG��w�
L�k�s7��D��.ý�g:MF���Z!��a�F�oc\O܍6E��Ɓ��/�e��ѥJwC��nM�	�{�_��-��Y;3<���m�6�H@�K��C2�����c̄��\z��5��Eں3&$3�P8�;b����	r�����2��iJ1���R�r'D`�,��yY[(�P�����O��*�
v��D��X VIU�+o�1z,�^�i�#	�81j8X�S�Գr+.8�{��?�Œ�=@�+��(�Q���#1���� Ք�u�0�7�qs�ip}��ɞ ��߆W�9E+��m}�<)��.�$�yv1��SM�x�u����D) $,Q�f>w��&��>�?M�]o�%�3w�/=��IdI�贔/VcE���Vo4��;E��ծ�EH�c8�%��=��rM
!�&!��E��:�ᩍ�� D��K�v�`E%�A�X0�d���y��Ϭ�i&>�lU,y�
�����`�A��Z?����<��xix|$�kM�#"հk%�4l�%,u����BvPN�U�8}?{u[�R�(I�=RreJs�jMT����!s��P�c��z|�����{<	0AD���H!hЉ�R���w�}T�˚F��_�({�~l��*	 zv7A0��u��h��D�A���\��a��f��(�$��&�"��Q�5^M^�l8�Pl}�\�a���#*�/���s �c<�4�o4_����w����4kZh��g7g&h��{�����Rێ���2�wK�у[
Lhh*�`i�T�.T���)�	/�_8t\�#F��h�b��O�B'y���W�i�e[�/�)�����J��Ҷ�o�itt�i&6��Xu �,�' �} |r�r�K_�g}�p��vg����T��G�w��NT,k m��n�\h���*�9�)|#�?i����9B����VX�m�_D�K�����~:���m5B����= �UaAPY��N���$��4��w�����e�W�	��`H�
�L��K�0���G ���fL�xK���u���iF��?w1J��x
��t��I�@0������R ��>Z;�٪QC)���k��cB�j��
[�*�VE�Ѿ�܄m$ĕ̓=�A��:�٫��mi�a>*"[�łS���+#d��E�W�5�@؎)����`I�vC�E���	�+LA2Ґ�kx�[)����}�<YP����u�Z�(o���9q2����i�RW�����Hʌ�gf��e���y�"0��o�H����D�թ|$tt�QB[ga����+�<��on��gT�4��L2�}��'G��a}܀Ø�ޕ���J/}Wi.�G'ƹ�yf��k�|sJ�]ۡ0��k�B��N]1�K�Q���(6R���A5�U~�5@�w��U�C�?�
xQ�	�dJ��]$|�Y�E�/$�S��~�w��jgt��q�fV���+�����>�E��@�*��ƐM0Jz)o�~���@a�Y3O�2X��/�\������\�}�6�e.���5<ퟑyu,����[�L!�Mh��ZZ5_�ͬ8���m��G&m!%�}]}� 0�ZF�����'iC!I#cN��(�,|����tדP�X���W�s��kT��+�S�a=Ay^���GFY���A�m��	Z�gƏ~�ܚ :5�! ���e��4X��,ɑ:x������<���_Px���>?�7�ۂT�+�\��`��\�Z�m�3�Q�k��:s�b��W!�� �7��z�ݽ�����r�S"���W��2���x����O��R��~�nH˫gr�j
/�	��(�b$����!�^�ߒ�P�QK����l)�1�YX�/�yc+ {D��0�u濶�aFG&8�B�v�L���վ<��8~�C9G0�PX�i��7������c���~��X&���E��*i��Q�(��8�i��bE���̢�_�ۿ]�&�]rf}G�&ޛBʌ�#ַ=��ߵrv����I �"��������gXA"�Q��C۠Q���'@L�kyo�j'��𵆚��U�p�C<�)�?�q�):�C��z�j�4wa﹨K>Z\1�����${�I��YOs������3f���#X��[:�$��e`���E��ut��U􅠡���X�ĻT\G�Tp:}w��ٝC�XJ���7���ފA����hHyb����9��/1iM�`��ڸx�7\�A}��*ȧ��E�a�cx1�}�>�ͭ,��DB��B�=�냀?��CM��y;�P���D�s�r� ���p"��1�F��6�����B����9oԴ+jHi[��Y�Kl>/j�����g]���U\��ہ44狱�T!�����G�S���(XDN"b�TE���SLv<-����S�z�g�o��7�okx�\Yv.��馓���M�0r!�e�eˑΞ5z��N�݌���I0�������V8��JE��r�p��w3�Yh�5�ٺ��`v}r�@�R?�����D&d��q���VX9@#Q>;��Ld~ �R�_���E	m[ߡH�.�
�H%a^���,�_���W��,��c���u��Tѐ�vp�1�y���bQ����;���c0���!���� c���>����AI=�
�JX����%UO1��C�.4�T������b�>(n�H3Xê�*N��p������V?!g:�DP�Qo����Ey�����lq�T5'ti�h�5Cj769G��`.mMs?}����XA�ŗ�3˹��h)Å�X��wF�ch#<�[��k������oH%�Fi�����,Tr9��uuw�J+R��g�d߾5<����ۈ?W�\O�%��#�Ҹ�dj9��ܗ�8>8¡S<!�jĒ����{�ǞT��)�j"��i��ӫ��%kY:�`4��cA'`�է"��?�'���tЁDTj��1�U��C�zT�~;�Ed�ni�s]*F��э��U�Mg�7��)KL�Ws�,e��.�{�I �牧z�t������/)$z�;��1G�}�֙�/�?��o��&5��>R�g�a6���P:7��%w�q鯿N2�L>Ցrw'G�toO2GM{<F}�$'�bwZ�� x�@�(�����)��1��������Sh{�(J1��Y��(�9k��
�)T�1���˴��	je]�n���*�#|Ŕ�bL*킎����h
����s�G�#w�7�X ��s1�[͑/�ٲ�7��ݻoS{�WkJR�s3X��,�����cƦ�o���;�e�c��:�=���R,xԪ �U�EtA�U�����2�d)��d33����n�c>��tJDh:�b*$���opy;�V���{����dK��#��t@6Ԩ�@P�=Z$I�9K�5����<.�~�ig-�� �jkDQTB܄S\��\E9|�@Xj@6%J�u�7�f'�r*�n�!�#�$��E�K�Ǆ!8��_gq��\�B���[9��ܿ|@�����k��ؖsmX��j����;���%&���t��~�_6�5�W���O��$L�/��)bK��� |rt��A~TY�t�M����gY��%�)��MMC��%�h~�%�Ϯ�U�U��D��`sm������)�Ӑ��3�Im��N2��g
;�����v���~�z���F-k �Mb��a�U�P$�9�"�$�<}&��A0�P�$yEM	�92�(W�v����a�i�H���}^�>G`rO3�Rby�Y�!��� ��7R��0�kj�Z��K�jc���f���8�����R���mI��ο�΁F�m�ԓ��P�K�xs2�%I�ѭ���b��)��^:+��*Kq�*��H��YD
]��ԫM q��H�:���Ͼ�_�|�����b���x l�a���Nmd�;�V!\��t ��=r�˷[H�_ۙ�[�^U��� �m ����?z��+h��"�����v��Y,9���^lوw�+�q�dc���/܆��Qs���4'�H?��2��<x�����T�N��:���֋RŸ
=T֐L'S	�e���5h�^��P��w�l2*Y@km�-���N=F���O��n��;N���X��2;����'ѻ�q΅"%��/&f?��·/ �Zx���dO���|���ʐ�|a��"H��<�!ѹ+���u��;�ϔ�I����u�fϹݖ�?�<�7y��^�C�ڶ�d���B�����ƺ꾄��th�`-���m���b�s�`-�ʕ��P��nc�7���7�e���@5XY+e�F*PҲ��Ώ��~L��<S�lC�l�D;A�%~����?���A�X��.b�ˉ�0��,/C�D��:�����y��ћ���kH�-\���m��ҚL�f��H��`����Ų���ҍ��p ێh�{�
fTe�u�f�H*�F,L�zЃ;c�2���`��?:����u㶯�	��8��w�X�֊.��0p:���\{J"g0�]>���F�[
<ۄ�|>7s8�*$n�Wٸ9� +{
���P�R��}����l)�X=�R�p��?u���M�W�m���b��r���.!Q�����8=����v�vo��B`I
�.���1�Nz ��ݵ§}}�դ���	T�u���H*}_IKQ���6^+��P5�����8��*ֆX��'��~�,�����X/_O��=�}��|-a��߭�[W{�F�M�bUu�L��Js Lu�����l�d��)�t=L2�t�!�3�$��Ȫ\��Ib������ł��^��K�<��x�ϙf9����ʒ���i�m�(��|5�Q���~�NĢ\���_a��.��<�Z��f2]%`UG1p�!Lv�=��S�'�Uy�M��#�NVn�Y%UR��P@�Ng3��'�_�Q���:)X%*���/i?��n���_�QO��5[��k�=�,�nz,q���PZXQp�m�=�����JN��Ïo A�e�u�j�m(�Nj���#uG7��^ ��N�����Y_�$`n*���~� ���4���� �9�I�����!�s� ��q��T���ȏH�:�#�KׇoO,rSBq��)��JRո館�����T���ec��iA&0)9i3\jU�A��⟺����Z�A�JS�
�?џ�NV`�c��
�ݡ�u�3��c�+�7&@!��P�!o�5j�Y�P�>�Ç��D���_�Y`ĵ��n&��)!.N�j�̿��n\�e;�O�O���@.�D�7����0����ڗ$�ж�:�q?i�ýi�/?�k�S>�c����d��N���-����oj˨��$_	EP�/�R�Sp,�����< �K���mдT5�{�d
�p��S4�9y�H:n�7%�w��M��*֖����K+t��UQ&��D'��%ԍ��P�C��'M��Z�|�p	�N�0��  4#A��d���~B����[��>��Y�ET�t�Ofp ������a/�ڞ�,�&Zdaq�h�y�ܒ��c_J���ˣQp�57;����H�	^zA��D��಍7$�-��������6���.�K�u��6o��3G�l��� K��j�)8���^�_��� z��RI*<!�?Ȣ No���As%
��s�jP���Nz4��ر�--eC/:4���3p.�������Q��f8.k��~��H�)�3�D���2|��:�d�q�H4\��bt��V�g���� ����Z=_z�[֠"^{Uw���v0*h�R�֍����T�fn�N�
j��E&fU��������,Z?>�oF`���^��km`̛��귴F#���3����X���t;6�U9E:��F��!j=iu_35�=��Q��� `�f-U+"�_e�|\���Nh-�h��O����O	��sz����~�9ʃ�V�8�Z6���5�+ QU����	��cf��r�Y�Hqx�Q.��?O M�����j6����
~��&%�A�ՠ`\����L��|����Fo� ^�6�����%�':m��Y<,"_ ��k���}�fLZ=E$jr l�����1g�@��.ޭ$��Y���lj.O&a�n���ʈt�WL� 8%Bwo���Y:����Eq �:�8��Ζ$Ĵ��ʺ��u�B
�Y�6�e�H������i�K3�#�!�s�i�$bk#�p��� �x[��m����/�B6[�ڜ���/	�zy����lu�є��6U*��k8�#0q��X�ـ����E��[���FD#Br5���4�8n�lo#�Q�{Rp�sY\ ��86|�C
�]q$�[P��8'ɱw�;��Y*�7ꫢP),���p�3:̄WD�����N[z	��zE�ŗю_����3�z� �T��	�ns��4��i�������­	��z\����^	���W��VN��<�+��0,v-���KG�H<���~��S!�����7��/"�4���/+���6k���. DH�I8���e+>2j��q+͞�-�h�g9��bFz �R��nC~"Q�aD$"&[�_�'.&CA����ª����n7*���T�t 5�Q�"�է��K,��V�̋����K�Mԑڜ��:��$�����d?\�������X��K����b-TD
(�#S8o��kB�G�8Ί@K�dn��-K�&�PN�x�Dc�aF��^���+:\�"�቗���o���{m�Q<>��Aΐu�#Ur�PMe�Fܵ��	��������:�yV�D~%�(��aB�s���VB��F%U��y�ϙ�/B���_X�aig���^���5�S�݅[�	~��"�I��@;����T��#�<$������g2B�Gۛ� ��h�$R�'qj.p�Z����,�kAO?�:�(��ʙHK�oDf�N�՟�@�Y֠�ǈ�7������8g+B�
x���Z�Qҝ�I�\�sJ� �޵�ׁ�j���q������/��ɩE�S�jab"DP�q�����"YC�K~	|O)PW�"���o�I�����Q:�~)zH!D����Fy�M�]�O31�*�M�DE��(ǧ�8�5�tQc v�� LktG�ǈ	��I�WeR��Q_n��3$\��>B�au\�U,�'l��2�y��{8�c��5%����;ru�Ԩ��^��UO�={ջi��1��B���d�;)ZgU�I�x���g�}�Z�oMYVV�ý���x�g�=ޅUn*=�c^.t떉�M��"����\I�/� E�\����j�*��L��#Ͽ�~Z�#[����^�DD� ��po$�V0��+?�r����^�x�K'4�I؟�w�~E� P���#6��ó���v���V�b*/S=&P�%,n�!{�Eӟ?s��є�[G���hݜqrB��k���z�l���M�t}���k���e�@?����&47dX}V�:QK;9�-�0+Jy���+�T���=�M��a�6���eX��FBИ�%��t{�Tм.(������qx� ̋d$��,R�҃`�|����i����4�}�Xt���ԅ�̤��	�ϧ@�d۪!�@��p%�S��ff'�����+G֌S�x�2��u��j�q$�-w��ǼL�紳4��d��k�*s�C�J�5�v@U
��?4�ɋ5�����`A���b��b���/Ti*��>W����t]���T�'��}���/��i7e~p��I4���W������?�3�C�����xȃ�9g�v�~u��?��~GY���oO6j}�w7&N�j�;`f/�s�ޔ�����Hh5�b_�����fb�"���r��Xv;�(E�/K~���:��`c�-F��
>� \�'�
g�w/��f�\������r�xa: ���X�`�d�p(�m��-\J���Ü��z`툛n��q,p%@(�D�M��]��Hi	�鍒�c�U��Hln�8>_k�Ys+�E���������z+o�\D;���J��/lё!<�fR�K;��F1>F�V�(0��ڴ�Qv�A�V�z#�r3�>8=w�5�cL����Ȇ����v���v�@p8����on��25�?��;��Z+6m�� �W:��\Y��B���j�Sh):�mc@�}�k�$�J1Q�d�1)�x53۠���og�Ɗ���]/�q��b�K^>�ך�xm,�3�&�'���ռR�0�����*4��@a�,����[�v�Q�3K@�<-��[�h�������EYS��w'R2yU"��ݷ�t���C~�ڷ��^�[�Z�A@Ai�,wh}D%_�J��]L�knR6z��l5��/_:6d-(ַ����郑`ê6�����l+!�A����&�/�45�G���k�6i�� �!�\����<�]-�S �ڽ�@��ҋ�ے�d��JMp=B����8'����mQ�^n�^�;[W���G�E��>�I���U͔������>]�?�ܡ_	IM��yn��,���V+=��#gDW�~�����q��i��#8[�0|.����Q?A�s�Lcn��&��6�>���M<jz�9�&O�����Q9 _�;�f�5H�x��L�ޚ�r�H��a�hJ�?X�����7�,QIâ�%p;�e'�%�'Ҕ�qg��P�شSh߾g+ɰrm��4;���-���p9��G@�L뿄��h�<��0��ls�@0I�Pݎ��E|F��;�~��6���Ʃ�hP�>�zK�h��O�f��h�N�֐��6�&c�c(]�q�����^C��#�׊t_��C�,��$W����|I���!�Cv3�e��$�b�T�e	=����@u<+I�|ѰC��1A���T�h'�{�����L��qg���]9#��Ш�L�
�����Vo�T�V��U�z��B��5B�zq�mf�kj#Ml�`o���Ic�7��_�<����� ��څ�*���K���@�a����W�U�Hcۧ%�Ѳb#�;�ԏ�\��S�x�I/�t����7i�n�w�j}R�c����F�,��n��z�iݮ��_|2Q�������X�e~�e�5i�˦��}zZ	�����֊�;���Qg�$C��|
���_a9jM�l�=�c�X&�*��6֋F�p���zo��у���V@oKqi�Qo�ߤ�᏶��hw�r�
��;�R:3��6�	_�� P��:��<��ا/�JAL�"������3��4�кd,��|zV��¶���;����y|��z���-���p�P�h��!D��M�¢�����w�e^���8��;���z����"�7���Y�xFe�ʿ�է@�X�:/���Rn��XO(��T5&IE�ѳ�6��c��=-x��<�ށh$F�'��9x���[>��nT�$�A?��`%�cj�.�88s"��;�/OO	�:�'�b%����c�׿�,����#���h�g���o�E���S7C��b��og���)�j=��4[���Qnݝ~����}7�ɇ��|�6.����S+��rfv��]1H]l�
��ʤ�`���?A'�3���~�������֙E���'����~;���x�g��zV0�ɗ�����H̀�M���&K��=�R�s7W���|fԈh�tk4X�vu�J���k�;��w����Rv�о�^��}1��������/�K;L��������zzw �Os��L����)º���x�5�K܄Q�;8F�z�)��5��ua�˰w�B:p5��:�]��ؔ�GR ց"�@0,b�������Q����ŘPC�F5~*<��**W��r�# �*�~�	���K�շ��CTT�6'(P(��O .`����a� �@�>Æ�#� ���(��Yׇ�d��8
�h�{=2sCf:5�y2���6����
�1H���z&J?���o����I��]��������T���Q����荧�p�n)��HZ~U���,@#����ƾ��ɃJ�b�]��L6Ð1��Q��G���F�+r&����N�xMU��c4\w�>��9M�'��r� 븘]����
�EŉJ�`��e<.۔W��(��,ɍ�����s�}G���$ն��T���N�.�}�!�f��re�m��'i���"<	���]pJ��{͋�9��h�:Q��E�;�Ż&������Q��խ��M�5@��ヿ�f��\�gJe|J=j���#'���$
T�ni�+���'?�cD�d�x�a����p�{�=�w�w�����d(��a�oNa�����RyڛW�*��N
L�c`6)(����M0F=hP�K^@���=�:�O�i,�s4`,Qi���`8�i�z]�^l��ڙ;:��-�L�ط��	=���%rV5ؼjI%�� 6�l&�9\��[���f�|�[��[��n��ev���BUzw1�nEj���߶�}�����
L����ͫAD$�Z�8����"�K}oz�x	� �G˯��
��r�CbgS�,�k��J�E�M{�����fb#�I��$*�ݼ�3�vn�|�,�LDͅ%@w�������B�M�64>�P�X�6�v��L�ʬ}o�f��{B�[;¬u/���N���I��z�͍k�6�veܺNp�-�:��jߐi�[}Ӧ�'d�o���$�!*��I����7$�����L��zD��
@Ԡ�wwj��9k~�^j���q+5iY�m�/bE-p�Nά+�U�4$�XL^�rxD*�g5&��ǔ@���Mr�Ș��ޞG��6�P��}�Ʉ	���"wۣ<�R?��H"�q>��X�O��w'���B�am�o��A �0!��{ess�a=n(�u�[=��2�~�qͪ�����.9���uG��"
7��������5aB�IJL�b �Gݡ���\R\N�.Sj'�F��ta�t��$o��\I~d�7�w�L(�S��$��#���֪�������Y�D��l�ė���Y�kWxZZp!�L�j�q��1���1~^�Ǚ�]K8����32��ҹ\/双�t��fQc
ft�0A5�e�d�@U�=��-[^��E�o*�Z-o��+ݥx6�N㙎�!iZ_�R�����������5�'���fLէ��,)27]�*�	'�\�~;�s��C��		�~���v����D�I��`��!�I�|q{����ڄA�n �����d���x����x��c[6K�dݶc/����n�����N�({��ȉR��Нֲ�����dV���7��2_����'ݧԎ�}�5c�z���	��XL����NR0���IY�&�r~���>�M��hHk�HR�4;�>�8N���"dO��KH� (�0��?�s�K+�T%�a/S!�>���U�\Y<��8�H�vs�������D�����p�6!�v}3NҖm�%����/�g��W(�-��*��)9��<��÷��J	�ѐԇ2& #�JX���z�T`���0�&�
dVC*�ـ��]_Q�ūjj�0�/���*���v�TSZ���{�L�<��ql��ԗ2����\R~��b����J��X��>݃v�y+M;*)���`Rl��(~p��IB���O���T���)iG����D��`��Lq0L����Q�7�
�C��+��o6�s�LS��yI�G= ��{ݕ}���^�s����9��%���}2(z�C�:� f�7�b�}�{���߉p�#�B�]y��]k�M��JܸV��%�Ʋ�'B�t �%���m���G\m$��@�\�Ֆ����A1���!�:��g�#�
����q�mD����2Q���9	�A���1K~dQ�s[!š��qYm��V��<8��|�-vε����ky�����������X=Xl����oच�|h�<�$��o�.����g�,���"�F�-]0�鿵���oH�K�:�s�⢏��m-��.�ŵ��ӶG%s��hg#a���;�nG��d�g������c���DF�JW�/�5�4X]�Pѝ׽*o,�8����y�09��Yd�I���Ө 5��L��<6�����E �qL{�<ܫŁ3WBE9�:)چ��;C�=1ϳ2<�ltʚbޤG�;��E/��g��TI�MD;�n,U��Kki�\�Ok��s�N���]C���5^3f\ 	B.1ď��o�#��L���W�w$�՘k��͌r���8��Ƹ�yXΪ�%�A�]��)%�Dh`�c�92��ɗJO%�۴¹�"�=Dlk�X1�$�+[���i�%!Q�+1-���,�`���n�"��k�<NE���4ǗC��˘E�oc���	_k�B�f3�u.���ϵ}�����ԁF�*���_
�5����ö�{��C'�29Do�8h��J2A��x<*E��(�|<ʺ\'�IE�i%��q�vy�m���z���AL%r��󼉾hӂmѷk(��w��\�u!�M�6� PT���������X�R�i��nf����-��Y�Æ�k�]wd��*t\�o�VIDx������VP_�rZ�#�I�T�T=gH(��OKI�d���!�QJV� G��1�	%��kF�	K��)X�R�TNz�'{-Hү�k�x��G��U�UT����Y5b�a��x�ϐs'�	$�3d6��x�	�nx=���䩜�~�(���]G��A5Sx����n��%
�H�&aA���ʵSAy�B�>!7���Y�ߑ���\���w�� �o�;v�L�nz���q�g� F4��V/����:�|�����R 4�a�чH ��6��Cn��^	�Vq�jg1���c�dox�8�wJ��Ӳ#�u�\�,���[ז�Ex*"�C�G`%?�-�L������e�21����)��5����Ȧ�|�35�z�z�X�,3��/:�n�����`z�A��^%key�ȭ�K����Y
)�A�M@Y��?�0�?���=����*eE���އ6k�3�� �\~��R�F���@O��Q-��4�4*��UO��iw_�7���'��N�q%�Α���V�T�FL�|C'�X��a�������ȠO�ô���v�w��9��*����hT�gP�;���&d��y��S�8�����)�,�wZ���;Q��/�F����#jLr���:Q�["{�X�²�
�V��'�����ׁo@�ngs��2g��.�8�
޶Fq� �U���?f��|d�ђ&��f��~I��)G��`o��>�L�:>K�ŞW�3��ܻ���ɴ/�c�VGvy��0t��_��*VAm�L��K�����8~M��4Ø]x �_���M�nEٷ��z�'NIrO�g�P��M�|�T�˕���tFPZ8�ߚ���\6�${y��#�SM�sw�� qB{8:|tav�u��y��T���1�4��Z%pT\�;�Q���gVgJ���g3��,��C�_,�Ds������Q
Z�1�fk���r�Y3�}��\�&r��5��E�	�
��) ��� IA�
�dp�KS�|q�_���{@��}(���s�-&��z=3� �w`���@�̏�C�IGE�.�,�M��V�|��e�jCH�ku���>�xQtޝ�e�5���	^eiʍ�����>E]� �Q�r*Y���~Ո�B�������;Z���������K=��2?SS���T�zxk�iC��!׭?%��d�O��xN!��)wۘ�~���&j�~��"���"���j{_<�g�Vۅ�{:��ȼ����=9� GI[�� ���x�}�N[w�Uum��*�}q�BX'��T��ѡw
��G9xn�p[uYu��)��q�q��:��J��2
s�,)�)��0�ᆃ�K�cl�&{��]����Y���b�(��8���<�RO����:��L�3��e����H6A�]�������t��ʬ�X�����le�~�N{�3Z�D���V,�c�ulj�PGWef�t�Aå����$;��u�,8,�%/?��q;>}n�<x��Sk��.e��?`��>m�_�/J}��q.K1��ݜ�5�b�<�;��h�BQ��^��@<zڿw�-�!��V�����D�[`���5ه��>�N����m��Oϰ3Z����ВY҉Bw���i��L������W�PY����SN���L�*�o�U[Q�_�-�r�����Fu�a`�>������V��)��,��u��'���?L>�qA��vs�ƍ�BjMC�°&�Jd���̑����b���*�<���M��H�e[�r]Yw�w�p�b��u��~�݁GD<�DP�V?�� ���p�[ ����tu0TU����2$dҩJ0Y61bRB[="-�f���x� ��j)�ya~��D,�<z�t'i�x�o���z@�-3j��]�35�1�A�� ��K�O�s��#�C-m\�K�!s�'�0y9�ۤ��M������ż�G[�9�L�?�p�8R$��g�*�-�d��l4_��N�<��I^��fя$X;���T�[Md��^�a%����	t}׆�zf~��0	��Խ�wa�� �����(̵�� ��΍��g��;%nȐo{l��[�9"�BԪ�}gk�&����E�v}���隲(W��)ua�`b�Ke��Ϟ`�j��c�7��,f ���.����9�`Y/"��@ �a�#X��U��T�kL���93��C���Dd>EC�-H@���`�&{��J/sm�P���C��Q�qo�Iز�+�D�O�j-�� SX�!�2�"���֢�8����!i+�@�/���"�L��V2��A�/|w���h�W�R*��wT��ݶw[�7��p�F����(�g���n���T��=�������V5"����ui�8��_U���r�VUOj��?Ň8�bя	�v�c��<��m�o��W�Ȳ�C:�h[ky�a�Qh�1���J������)�SbCw�i��v����R���x�@y��!1b�۞N�+�Z��j����U\�����C�7p2�@~ �$������+�8�"t�d�C�H��r�p�P_�>�!:�Le���;�ӄ��}<a�� �-ė�|a �u��,��H�~��ts����s����r�9|"��UN�.M���jY��X[I�C8�����vј�5"b����b�{�&E�Y���wA/�T
��O�̛d�6�4l�Kw�96����l|#�*���L2����M�l�m�E{��mꊖ���ND���a���k׭q��e��!�<iO�hɑ�&Um����3Q!�� �l=Ǉ0��vS���2���%F��!45�i�<��z��>Nuv[�� ����mq��X�QSx���3����E�9oO��w��m�"���} +Dжf��<��n�Q`��=���������i�*��|.�%j q���GQY{r���ڜ�d5��m��༡�8U�a���S�K"s8t0�ǳU:�bY�:�Q�x^�ԙ�Az^��9�64X��R�-d�ft����fK{T�?y�U�_��Y *W}�A#+}�'�xæ4�YI���|(��Z(�����-���C�8m��^]��������!b����w*j�����_K�IS��2Rz�1�f�*H�fV*n����b���o��- �G��#�%�q�iW}t��f�1cF�4`�^��mD(�9�[��vt�׫V��
>�f]�վ>_������dX(���񋫳��Dܝ#�?M�=|���z�W�YH=g�\?��kZ5�;T���!�Ό�B��IfI �W��M`&y�s��
�^Q�G�>��z�aR�4���x7*��L����	����:i��X�`G�zQ78�b��pb��|�'��'��$f�Ԍ���X�eY�V�]c6���O�ރ�L�-U�u�����t�����͈=�nW���wM�[�N;���/�[��k�v]�~�a����
�մ.#H��f'V��:}���ט�&�|�}��V�^�4w��U*^-��ї�]3�j�G�,��
����M_U�,)P[�R75s'z����D���ꋏ$7ѕ�,�Y�lw3��Os��y��<��b�Y��R8�2����wI:�����ځ�숍R����Y�!e����"	t�Yz(����6z	`o��P�E0)�ط�.1㈳�z�K���|G� ���#(��u]{딞�����՗Z;'�0s�Z��]MF���ݱ3x���U0I
~_�����3a#�I<��.X�b��۰�Jfl�϶f�h{�}
�Y5�|ۍ&@�m`c�_U!Jo_(
*�פDѧ�!�*+���C�^�eQl3��qh�a�&}B��'�r�:Β�[)g��w�89�M]F��r*/$u{�L�x����tL��YWw,�;(�C'�F�^@�ݛ��!�@���SE00�h�˪(�vQ-�� �p��k13����Vo]����;�aA�?�eF�`���;�B��ߚ|�b.������:���ʣ�����?�P�c&E�����&�����@>Υ�5��9�(ƽ��v�4M�g�.E����I����:��B4��|z�^�V���!A|�&��+�d���R��^���
�lH-�l�I2&(��]����gK5�PV����Ou��D���Y��?:�y��|�s.sX֡�ǯ���Y�A�_�����$%VA���!+p��sVg0����:�ݭE7V��Ʀ5����Ĵ�XPL8ˠ�:� b*l�8�<{1#Ue-�@r������Qc_���'9`����Ta��T,���ę��8Q<ރ<xv�����j�>��K��L�F�B��'��wT��=$#�������v���[;�Z�0�v�㓎S����t&�>/T�+}p�C�s�>��:��D�4G�|D/!n�ҷ>�� �|E���u�'���Bh��
�BI�f�m(q��w�qc�Ȍ�NӔ��^ŔT�;o��}"�5D"%�8�K�Ol_Ö-��k�"�'"�i9���.JL� �Y֝)�{����Y
r�K�5�|�����xд�1n�N#��p~N_�,Dg׊4��|Vu�t,�b������m>;��T�+�+��Ŭ���
�F}�D���)@n�����К�5,��t�p?���HЁ���km�ȭ�d\�Й���mr�,�k�ݐI+�Yh�hR�MɣFm��҉�?�fيm��E�	B�J�o֗�	5;��$�R�]�ޭjB
#����<�U���1�~��΂���#�ԉ�y:kX�{b�Y# B�����	)�e򙐃��ۮ�X��b�C�J��m���H����xI�S���"��È�@���"v��0Q�����B��5�x-~<r��t�j9&�4��M��Q��b �<��$i:���谦v�چ���ʠi�F��2a_�Y��);�}y�o��uO���",���d�<nT�#�O�4��4̨�+�j�X藪��|�c�@w����	�)3 J4yK�IQ�$u����!�.2�N��g������:��?�4SAq�)RÙUJ�H}4K!x��z���j�2��{�+�:}�Q}�r��M���q�QDy��D������1�WM�Ǝ�(gY[�X�1�������D�o��O�ݺ�bu�$pq�1c��sf�S/�8�m�*0�~�l�NQ��s����U	�Z���Mn�|q`����~@��@�"����YU��%�ԵU��Ц���vM�t���`<B[�;͟���Uo-��"�܌��8�2�BVW<��EE ik��G���c�UfK�#Qp�Dϲ��~&uǻ蠉�#�� ߘY�M��灥�`��B3��mϳ' �G@�O��D�'0��;��o�(�?����ӓDZj��T[8�M�d���9[���������I�/.�|Ձ$�'�R@����.սהk�!�z'(~�3_vxD��z
���S���Ɇ�BXtߞ����s:f�9U@��>L���3(ݗ6Al�����v�ٰ,ڟB�N�ߧ�Ϸި7=��榼O�/�,T'�S�W`|�:Ab="ĭ�1�TV:�Lb��!��.,SYs�����R>Bf�����?�+J,l��� ]D@�s�CVl1<��7B����u�*#餁���e*�6Ε4�6��-3�'8��XyS���+ �!���ѩO�����Bn_@�HiV�"/}8�7H��68��H��C�g���7Je�˚�#��d�(<:���(��>�8)@�px��=���"RӞD�,p�����<�W��u�aq{������5�Ϳ����hb6sco���u��,�������h{F<�{��o�U}K�=�ġp�<[��V4���>��QA�g��)PU�4x�S���Q�f�Fr�'86������5.U�Z�Lu�B.^#UV����ҦW��w�Z�V�hr�9����[1���k%��t��s�+�􏙺x�X���]�/-���A��������6k���ͮ��؆~�ǟ&��:φ=k������Ñ�iqhٽ<H^Bӥ����)�2��   z�m�������Vu\�..+��DfG 4c{\���A+W�@��j�,�7P����kR�����a��	�%�������O/��(���|�"+m���$�|u �)j��~�C�Nru�4ޘ  ��A�M�Amh�L �������jĽ`�I�l�i���J�Q�xa�%k�݋_� I�Ȼ�Xq�t�bש�A�h�6셀��l�|�E�+��3���r�P��o�x�3�b��ː$~���,�޿�e��/E�'N�y;L�� a�Fn��f.��pА���F�E��n8)���G^ȯ�|�[J���l>{=�ܠ��To�B*p�
ɂ�M���P~.���4�{�#�>��_R��-{
�A��Zܴ�ی-b��*��Ļ�!�&�D���=�ZG����O\�Z�D"���Ca%piO1�TB��9���|C	�x�F*;ʂ�3X>b*ƴ�6jI/��Fc�8�}|ټ�4�C-�����������LD��פ 봩�"J�r�Euǐ4�B�OUO���c�tf�k1��T�q�hZ�rc�!� 7}b��n���C�緑�b�
�/����:�k^A_*�r�凈����]leiHj(�c�Xn����e�Ho�|����Z��_�z�p�6��8��ϩ|q�͟��bn!�	��`/��qK��%�Xx:�q���0�hⴸ!<s09�[���]�h[xbZ�y�ins�n�"�i� ���@4�+��e�q���R���H.´��K�>ߖ�E�n�K�Y���<;*:ao&�J��
��C`�U"%���}��E���P���NVR��==K�Yn���)F��=	'�#�ʬ���B>ֹ&�BzriCd�%#8j1t3�o�ǎ�����ʛ�o�GxhS�"�Y�-���E��]?�E�2eu]aa?�c0^M�U6Ћ)9�[FÜ����Q��_�g�N�.�x����n��=�s;�H6������GB��:o�f~;�u�+s����E��VK�`�+);���`�.Yv�/�: �{y@w���ނ7!��-��4�6󕊤��a���/j74��i:���
����"?qDL�:2d^��d��ܸ!�r��;�������x@ߴ�*����)ti��p��Ag=��n�"����������~��m�P��;�7J��?Xl���Z ����Ɲ�����7��] 	$9����a����SF`���s,���O���`6�Kg7ȿ��ݺWb���?��`�g���C
�	&� jo�L�9F��g�53p4OV�N}u\��#I�!�Z4�Ӣ_��c�����5�zH�r�������|�O�E���	%"�: �	w��UfU�4�	q�r5r����6���h����@�!��I"�����;s��L�Z8�}�30�f��U����2�Q�-k���ψv��C!U���ŕMv ��t�KMFu}
mDQw%�]7���B�oݿ{����D�f�"���-��b���A�p�N�z��/6G�=����L�ݍ��u���3m+b���͚�ZKO����*$�����5*�]�v24\{��`�T;G���AU�53��$6�#E�K6��#[�Y���u
�u@�Z��e6��(�h�D���'�ݾ 9��ۿ�Zɡt��N�"Z��J9L����1����:b�|/T��H67g\d4"�2H՚,k����Ƴ60r}<�&��1���a�D��{��U������ӊ��sB�A�/?N)�����LL%{ט�9�����5�S�����
�1��I}mH�Y�U�iT��ش_�ZW֛��M�dQ���`ǝ�xy8d�S� 8��0�'K$n�Zb3�f�a9�L�6���&h���#]X��>�I������}gl��i-@�G�4��p芝�g�fL������<�&$9���WO�yI9�N����Q���Q)�9�w��NNzJ�Py��3��f�%�\
����K���&.�t�H�f)!&��.�@�H���p��Me�^|��C%�U��B����
��ON�/�"�V"ym�8:��]������|��_Y��q$&N��������Vl�����}��\�oSx�uora���r�Ɩ�����H8�1T�Py���hw�To��k��S��w0�
��M� wW�<pm;*I�9o�@8�pj�΄9�6P7bu(��r�����I�E���%Cظ[�Yr V�t)
��r����pY��<^'�6+^kKfE6��9i��֨I����lt�=���(DA�R�x�������7�ěX`VIA��������ԫ��+-�j�0u�q�����ln��\<��S�<��c4�o?d�`��òe���JG����<�e|��YywhQ��Mȣ]� �~�D^�l~F�цL�bd߁}&Qr([&���j�O��4�c� ���\��9��|w���0.	XNP���q���b�f�r�u&$���h:�FV���T1�}l\�ti��ޓO[J�1K{����\[+p��F�t~g�W4�F�mό�����3��K@k�}NUfF���5K�0����<�>j)UnI3�V#�պ��d�p���ɲK����R�a�9�Z:xWx�aO9�	� �mR%j����r�[ݼ}�����3���R�����Q�3lx��Es#��"Wf�#S��7~�}�(�5����~��ki3��q�a��*Ȥ��'�cV�c��|ُi��L+�n-y��:�� Ƿq����?dc�c�c��XL�M�"3�DN�ü:)��_F�>�w��8Z(���W@ʂ�7�V�j�R��g��5�e� �@��ˬ��j@��T�ui�d'��٦���,�Ln�j��z"y��.j�ؐ��(x�����t��/�tFڣ��fRQ}�켋��d'9	I�g�e�V<����t��ܮ�����	�,���2����VdU;��3{lA�3�cI����ދ%x��w�^i{ː��M^�[�6���p�Ǣ��V�+z�ŝ=������4�KT���qF6�UA���)iWXe+�<�>N�\�#���W��v��5��)�,�m! ]�*z���q������a��ʓ�#D6�h��a��chy�^G��?x�:M�6G��,mU� 6�"�!�.d?w D�٩�X�>��AzUq�{�sP��]� �;�wA2mA��3X�O��{z���8[�ͷ�e��q�\ne��9�DV���*�j~t$r�	����������b��������@��l4GSӉ��O�	テ"ݨ��H��2���'����AҔ�YgP�{��M�8\��.'�F���0�X[̯mO�����i%�}+�pXQ+�P�{�1����qY�j���.?�� 9�/6���0�njmC9�M5����k�x�eF!.ؔI>SZgc:`2�υ��p�b�ŋ�m�o6�z�	�&=u��`�%�U^"H�oa�*V�l3/��r�Z��9P'L�.�F���A�9%}��!>e^�����{=�D\�B� ��-�vZ="�d��=���&H��J9XNO���k�ϭ>�u�s_���1V�I��W�f�I�ٛ����h����e&R���ٿ�f\�Bf���A�<�,Nj���J��T-�$a'��S���v��&xU�L�+l������j�0OC��v+��K�iL�#�ĶcX8|���z��rY_��ց��[%>���~n�$p�ҎRsnԯ6�V����e��UN��o�����JW��:��f�Yء����£�rJyG�2�#s�5���^�,},6��R��L�\_t�6�粍��N�l�TAK�����r2'w
@y�g���_B�T�d�\�lZ*�n��8{�Y��Ke��O�>��5&VK�B�"��Z�e�jH�\׼�&R������J�r�d�H֖��>��G������P5��]�� ��RwI�WF=�6=ŦeM��i�G���ABQ�JA���r1΁�0uN�$"�]�Hk¼Cě�.8ѕ�@fޠ�_��š����N"�Q_i6~��j�2!ʤ����2u�~h���H��$R�2���Ϭk � ����,��<�Xl��N���N01Ԃԧ�FN�dуT�U^_�d����r���R�C��&��(	���λ�?�c���.y��������~w<J'U��H`@Z�d�������s.C(�s��I$p�z�1[�%ֱ��z���
��I�H�`����N���[��c�u����Y���N�S�7��ÞOL�B.�%[)����ɴ@Y0�E�{:�H=� �$��Tw���C����'Wn���6�t:����1�e0
]	�Ρ=������m����i(ʓ�J"���f<�� �y������H�~fIE�����Σ����\[G���/�>LH��rzn�ٜ-���(q>g�'�`�~�Y���5����?^,#!f��a�|�P�z��(����]%������x� [�x'o�
\P�mv������8�J12 Т8�0P���B}�Bl�|f\hn�̆v�B\�ԣB[�!Z��z�Uv�9���?U:�~��(b-�M���~���9E�VI^�r8�}��T����ަ����/4�������V��z 4Y��x =�#�N����r���TQSb��|P�W��I%��<Õr�+�Q�u���ōf{M��i�t���HM\_[���`�v��~�f�q�����T����m!�.�:�9=�C�ջ�`���&LοҪ��1	��	�jb8tua0N1l������7-�C(�7%�?ˍ��ol��֘�T��J7<�����+�r���*�șъMNrǾn��ý�S��Τ/�J� b��1���V�9����8�n��>5f�%rsmM ����B+fs�y�]�6/����8\й����2�ٖZx#�쿊�<��O�ܡ��P}�w�׹�`-�6���nV(Ǌ�8�y��m�`:4��|rE�=��m6�d{,���t��CƧibo�Sl�GPC�s�(���x{n���,r�,��5	j���Y�īY�.�i����_�|p�������b�i(pe��G��jM���eD��>�ݏ}������I���F)D^.p"e����}��Qu-����� jE�m�e>��=��F�m=i�@"e�`=(���;}�W����@���AC�I6�4	�n_+O��@]Ҳ��ˆ�c"�'�lb�X��Pv�,�
w�$��֛Z1-��NU�{۬�:����&g}��$�𱣌-�E�����g
1fڴ��Z��P���:v�=��37�sQ��te��;z?`�r�O>��A׭�do}]�.�����yq.������^GĠq��mdULC�!wO�g��=Ij����;Ul҃�ds
Z���dw\�A+}�1ёa_�2�7T�$�A����AOmYx��'��Y=^�`�n��N,L��g���w#�f/K�ǎB�O�F5k5�G���#t	X}hZobWL��cvgs��iF����f����?θL��24���W����E�� �sĔ���)��'`3ߟ.U��:X˻jp����r��H!��б�؟����u}SE���7%���T��'�/�I��E�n�=5�AJ��v�j_�%<v���a	�������ͭˠ�!����L���w6faŊnv���ݱ�p�-�34�/�k�usġ����^[�e�V�l���c�!��L8Ǣ���j��>�1E��r�K��&r��I(�sW�im��ˋҭ^Ö<���89b��}�b�zGW��C����UT�
f��<���,>4�&?��=�At�)�8B��鬩��|LW��iۘ5m��a�3��}*wqDsW�gE+�Wgr����M�)3W�\�ȅ�wo*+��HIRV��諥��y�\+�^�+��2���1����˟�i�ֆ��#<�)q&�I~�4}����ܯ��j�:$ydz<������7�����jB��G���O>��z�^��m�_���%s�a��8D��b�]JACH��0�A@���4AW3��"䚣���#���n��4;r�X1���5[TEh��h*b�X$aN�'�L�p�Ro�8��!}�H�ď[Ź3
T&I�C�DUy�F0F� �%�^��9��t��B��5&�IRLqS:�,y��Y'���Ȕ��^P����� =����nEG
�I���`���K��JY��\{G=�Y��|l�
o�� K�K�1N̳i�>�x�'�]���=Ty��z���&����w,��%G"��2�)����W��F����L,<���t��Dp����[��i�>LNvsʄS�V�P�OQ,/�BP[}��%�^X��x�#�h��N��Cں�A�JS\y*�NQ�'�K��/�k	�yɰ&�������W�t�Mbk&�4�#�O� G<?_eG:��Nm���5+1X���k:퉿j�r�H�8�3�Po?��6�SKsKB�����'WW��[��o���I�@�1�8��"s����A��P�N����1��֨���@�3��9a����K�S�z�o��x�-䧆�8Lލ\����g��\W����
���Wj �UB^��t�4
D���GLF�қ\��p���"�8������:��N$�ʪ��u;�����Ց����]�AQ�x;�A�fa�æX鶘۶�y��
D[��f���h�a��tw��9Be��!ӹ�mv��o>�``�{'A���'J�-�}JV�χ��O����M$|��&���Z����5�dKζ�qU�&��_a�̖�S�l������Ql}o��Tfƀ﬛�Hϫ������b��_
�1G�����6���mɝ+.���ڌ%�׍4�]g��^J���5��u������/tǭx��'�Q�J}�;��X��D@�n������y�/+��,X�#E�G����������&�s�sp�x�N����F��}iz��
_��~�	|۵#���	lx,�j<'ծ%/z�s� ��l�u���}����[X��Oc�d�ݝΜ&�oF�%�1 ���7�|���<6sKF�"r�wP���FzI}��U�v��oGG��ŹMo�
�8]@$�7��)C%<G���K��M�H�s�ʫm��a�O9���.�i?����p�ˡQ�fL�]�u~�|��:�֠�1��Û
�&�t�t(w��;_����{�^��'#~�������,yX���p֔��j�we��z�ky����d�'V�4T�|&�SO��:B�à ���`/�z�2-�s�GM�lUC	@��R�
��k���'�m�{ �Hw��l�����^�2�>��@-)�Z�F8����b��%�6[K�_c��}��V�R�ύ�9/�`���x�{��K�~��YǇPi�u��V�F���ha�h�E���A~<B^:��lIgfٰ6�����ޅ�B����n��s%)���E��&>#��Rn���y�v����)�)E�bvB9pɺ*eV~f�c+�}7���4H�$��|u�
R-�iN?/��f���φ�mD=��JMb91l�>G��{��U���E���Իu��B��`P C��{�q_~=j-�yLW�\[:5�[E�	��������z��������%7ɡ�Dfr�d�N��n8�U�.�R��m��:��Q���
�[�{��*�JT�Ν���!�2��!�ڧ��,o����wD=�	ph,'=q>��MxL<J,�AA�C�����]s��vכ�7�W�=�kbi��M���
�R8��p�t~`Pp��À�3��_(�_�=�Y�2ZT^�_��5H�'�N���w��F��p�%z
��Ҽ�s�x����skǎ^�ܪ���_��;�zMs�0�ɜY+?-�o]�E5���<�v�#�lF�@�Ͳ�@@��p4�-�O��%&
����~C���}t�<-O���W��u�� ����r¸&�I���(y�r:(�C����oIo�� lՄ��AN�:Kg����@F�����Cb��3������ra�k�����0J��j�(�b�t�b�ϛ��s���IQ�+8��j�\̡ J��S�������wǭ��[:�==��C�3)��C�@�E-��=����Ō]�*+n��;�����$S��k�pҗ�/�^��8�/fe��M@0B��~���0gͦ��~t�d̚�/�c�;�[r�&�вy�����a��2����V	:+�[)*ej
�L	9���Rw ��R}&h{��x�l7bM|�f"�c��A����1!%Ft遜��y�}���1+���'���ji�=_��,�y|�����E�a��>��o#�[T��j�ҷ�Ix|��N�I�tt��O�L7����M/�q8QT�%�7�m~��R5^��l�y�d��EVꍪ�*�vK�"&p�uM�DC�}C�/���w�%+�*�T�n�;���Bp�VZMU�L�"�n���:ƣj
v�����	�w��|c~��2��-ُ��f4�sy�Y�L�k�F7'�,YW�W8�?�tW4�ch��}���U�3CBi��o\�/3�Z���v\��9�|@	���Ko�%|�Di|/�Z��Q���@�E�ڇ+.�w R�)�����A����H��M�H\� ��n����H�l������(? �W-�*����we6_:Ӂ}H��)m#}����k����Ff�'<�sIpk�]k�k�yU*@�?��M�c<��[(��x �3�����7����>^��y oaSҮ<�I��*P�ȍ��h<�5 � �U���A�b�z0���=�f�9M�'�WSKj����t{��g*M�F-�ܛ���ٺ�L��b�҇-_�g���-�~q�Q��6���������d1@�[�Y��3-I��AeF�˝��gL,�����܃��pYS�:Ζ1Q��=$(nP�g���-�[�c-� -9J�,Gq��=�����m,���z�w�R��cz7�y:�r���?�H��υmo�/|ɉ;[X��[Z0�?���C��!������ę�r�x��%5!���s5�|�]%��
�f�M��0��Q<�}��%���J��)�|���^}�lJ�[�fC=Â:����rH/�e�^*�!"��J�y�ݛ�|��>���5�4���g�k�V��l�e�������:�3�g<;���Ӿ�s��i��q(\�n��öN�4R�����x�o�dSJ���r�)J��I�	Gqv1�*����ؚ��E�{c`g���)��=��0ʡ�A:��|�����(r ���o�cq�i��u�FwM��c�GH�BXOZ��#���yL!����h���f�Ŏi�!u�ʹ,O�eKG�Y��C�R&��@�K�k��HR�"4�e|Y��~��H��8J��|�*�r�1�A}� !nP�zu'|4�(k�̜c���l%&�ܿU?`j�?��o&]ֵyLj�lP�)Wq�?Jy�w�n�Vk���{�tu�JX��+a�~�Ǹ;�<ԖkP���\���*X�}�W����cM�yH����PWC�3���1(�ۡ\��]��w�'􆷀?)���NH�| aX7d޺d����=P�t���"��9/rJ�	��(����yC��m>\[�%�P=c�5����b�&5f�9j��T^�ڋ�e�`��3�Q����.P���FN*ZuR8�� ��JEe�<y��t3���?�<�>^�pw?*jY38n�cܾ1����m���8� Ѥ��I�n%�����Y��@tƲ��8�T�2���?]���Ǽ�=�Z���y//e�b#�YI��y�FQ�8�l6d��\���0Nt���<CR��B��cØ^A)o[�Ly�ɯC��������}��E���B���8��E�<!`��avY��m3~	p�iD�p�S��[��z{��9��)�UX�Q+��Ox-k؇1�����d�Ir��5�]��i>E�|���W�,z��} 2k��ש�(�d$�WVm��r�����w�!����u(>���`(Y�^�wZ�[�o��5�R�}^s��`v�?�9~��8<�Z������� =�����bs����!���S:��>="2��e9�ċi�:�mrq���O��Km��{>������/CЕF�<���E(%R�s}�$0��#�ۧk'���Rd�[s^U��pC��
�C���;�MB�����0�q7��6k��D8���=@O��$S'%B�&���ryg��Gq�So�`��h�q\o��C;��[�	z�L�\��ԝ�]ߧDA侣'Se���g�\t5�X�<���i7�a�L�t{��k��`������ PN�Ay��	�Z?=����^L�F��Eb��Oc�5%��`G%�u,O?����{Nɒ��X�(� ���'�$�1�=���+hz�7��oN{�`��=իYlo�YГ���N;�Q'WK�ٳ�_�	�����w�ܡW��͒�}��@�f�m{W�.��Gځ�n� ��`��E������e��:�S>$����e{�\�[B�6�8�6��j�����)m�qMhh�]��������ΐ�tU'���A5�Km��"��;���'ηM��L��MJ��1d�AW�'�D��}Z���6�.�j0]��y�����t2=�ް٪���~Ⱥ��o��+�̹7�R���&�Y�Ρ�.y
WL�u�3��ߠ(y������Ծ�p��4�q�r�Ա'w�2�����
E��oe��fW�d����е8n�?���2'����2a̺U�쪪@V>��x"0i?IqIٹ��%���]r��&@sH��z&_�}2B�p���G7��j��K�Q9��I�������v��Ɋ)``�l�_Q��ճ��:����
�/�i:��}3.̇�|��tQN��r� I�&�5�d��^dmAP���$l�5C'b��6�|-E9��]�#p��3]3d��1��MĎ��S�?�,-�ݲʸE�*�3����^M\ �����=��'
���D�͏����*�ٶb�&�m�^,!! 8×��M{}2�MA���O���9�nx�&V�L�99r�fDdXvq���{(�;^����H[]J�[�B;��3��i��/�c�|\x0��cV�j����NIὃ�����ɸ��8�x(P��z����!��pB7�isJ��7���X�D"5�S]���+	�3)C��G�_�T@^���]$J{�\i�*�?A�~΢�Ӳ�O����5*px�@V��ۄ>�ӿ�@ ��O��G�V���ģ�	�缺{����Z���N�fkW��B!��g݁���8�T���{�'Z���);�o��z!�'�E�@͖���A����ʽRP��InC���ߌ��M$JE|ձ��Z�,o� ��uv6֦8a�Y;pP�|׿�� �2 P��W粕;��R >��@�GPl�ŬFT�,���CyD�$�� cz���2�,//ඕWK������,@�z���m\; ۫�"��$��zGcy{r�]���%s] ��ۉʾ�-�S�/��-�؄t'�P|��#8�����R���)N�p֬T�i�q;/F�`ק��3��:��� �5��3��y��4`�0mI������!�z�E�V��QqS�YJ�0�D3�n�󂊧�z?K��zc�F�gej-��].�o6w�d�!4}$����Ju���z�/�7Q���Q����o&85�?>�3��G��x��s�_�ES�;���\��4�B����Ǥ:7���8�[̆�C�?��ZJ�W-�U� �*�3�1��n�Ί��R��p�Z.a�z�ԓ_�}��D���ʩ]R+��b�$�y�IN�:��B��ݩԉ�d��G|^��5�n�AT�9���-��N���*���Q8��9���^U~���n��{�=&��[l%>)D��K�5LL."B1��`��jZS>}�9�İIs7�����tq% �gO�� N��L�h�`p�=�#���� C}��=�9u}�_�X�]�˥ �N���5�=�5������Iӧ����0�S���?/�"���nd���gBk�R�&��}D�m������w@B�N4��H��w< ��|�X>�x|5��ҵ���X��� ���I�&g�g����qXj�b v��|��C~�&�!��P3H5"3(�G�쯹�r��-_2��(i�|����V�}���׀�j��pz7��p���p�^����̀.+��������G0u��%���Rto�	v��j�l'˶-�8-�(Sq���Qt�>*i�X�B��6z�ʋ\�����"4&9����ѽ�M�S��}$~ DʨI�I��&�G�ϛ���3ٰS�ᴘpn��A-u���[Zsg��CH����'3�%�})������vl�A�w�P�!���̟?h�q��!As���Nm�ua�����}+Z�%�ȥ���F~6�~�Њ�9�9����g5�3���v����h�����~�����os�E}v��ͧ\�
-}u.��ߡ��4�."�1�j�Pg+SKeM�ษ%5�P�V�TV�����]���Y��bUӮ(D0Z�K?F�#��|�飚z���?0D]�e>DJ�i���R�����2}級|���f�v�ݤJ�~��s����O	[�Q-���H�h��n�C�'�!�4��G�Z���+�F|n/dE�Pe��^Op�ꦾ��=do��Ȗ�K��toj�U]�"|l�j�/�^�l �d�����Ŵ��ߍ�5T5���w�����=�p�Qg����k�l�]p:�oGn�<'��b���� h6#L:m�t���dQ���4�%���΋J�p�r��_�1�,�=<��G�1�y�?ky���nYLH��F�N��	;I�N%7��[f�U�P���o��)~�y\��k�틯�5��n�,����6YqM�#1|#���<*��o����������W|<�>�������.E�gE�fL�8����VgN,�5)/�_�<<�ߍe���Q����}9�y�Kje����>-����s���8�P�������␡�3���(^�i�v��Mr�#�f�����g� /��XK����(@tJ��������hC�0i�fR�Q��)�wzl� �cWv�P;O����@A௎>o�����]�nzm��S���o�J�Es�e�J�2���� ��7�l{K����`-�&�K2b�O��'ł�b�B�p�fl�}�0�_5y�h<Z���f����1��b6�2# )9��
�o�(���4(@�����P�eх�6>�1	XS�(��U�?�Z�Y�w2��St�RB�F�zZG�YX����S[����.��0v
W�0�:��Hk�S�0����<Pt�����C�h���^~<�9:�c�1�P���痂�z��"�����	(B<�)�D�R!��PY���g�/��m����i<�z{��	�IcS���<�k�������ڲ�����5��P�>��&�� �F=� �T�Aʘ�p9�9"��Cc�}RY_u��$Μ,`�ӏ������-��JR'd��������Y{���fי�V�E�d���@n�m�9A�
�?.R9SF��?��T�%AG���c���V��� vJ�'6��}���D��h=1�nY�	R��\�j��K������o��8y<���A�t��&/�Ko�L7�<B���ϔ3�(�3���T3G6[����F���S����@��P�ߞ.3���u��Ǣ���u�8)�=85���]�`ML�JW�O<�/�<nM�X<�m�3���蒟-um��[�	xZF�9�=<͖8���_W@ ��^d�P)E\��)S����n����D��b�KH v��d��>�����Y�.�z�L�
-G�p1��:*�|��3l2F(鿏 �#7��O��0Ec[5�}jL����3Ǖ�]�qu���u~�y���������6������II�������bW~3��������\� ��9��y���6�=<K�װ�?�N��X�~�q��*^m�r�R��ry��~��m�sŨ�4Z�k .t�*�{��U��Ó|��>�@˿7�3]Cen�3�Y��g�����Z��S6V�Ա�lq��t��N��<�����v|s��	Q��H��՞f�����H@����C	6���X���|?
�ϴ7�/�8&}Ϊ$� ��eU	�C/�ι*���l�u@'pe�a�8�?6����*��ۤM�QME�/��U�]	ܘwj����Iw�����E{\Er�ֶ�,�3�^�~H{L����Y�B���� �HCf�[���>?z{lֲ�ͯ���N��$ �������S��Ϭ�H�Ͼ��U[��Pɏf6�Ta�A�,c���/8{���f@/>?��x6�(���r��|��"��&��&�>�E4�0�St���V�Ll����zK�����J�5Mke.đa�8�i�Y���m�FSN��2Acb�~y
�r�9P����A*�#�޵�~���=��ty�U�c%%�G��E=����/�L�2a! ��e#�3V��H��p�[ޠ�*o���i��NpTv���J���Mjh��9�� �y�^��Q��MHXs �H	E7�Z����"^���ޤu|��\�O(��Z�-hP�,Y��_�k�Uuř���ӳ� =�a�1"
V
l��K�_<5f�|��.Ԋ��6��&�K-��G�EXe����o^��5��iݛ��w���/?�'du���P���6f%�K�@���>�X�oi��'Z�)Bw�_�f��F�k*lK~��ų��^$q%�l�����s�[���>���Y/*���Р�m�i�o���S)O����!�P��6�gt�~������t	RwpJ"����4�S�4F��WZ��w����g�d������Y�JE�Ɇ�U9[V|�ƹ��-�ơ�Y���7��:��i���L0m.��q_�o@�:3o���/^�2E�nQ���zr�&$a�"���ס�䲽�2>��D=,(����p�Oi/#�j��� �/4Bw�@�&ӓ�nC��Mbx�=�N��	�@���4�@Z�����U���.E����s��x�������M�{Uةu�/�-�uV�l�'F��}|3/�C��v|�iR�<.v�q�l"�`�cNp_5�.C�W1�XD� nܫ[������(�<[�#��H����E�ȸ8.0�����+}5�|Y(�,���z*Ã
����Ib�C���TNb�.F��V>�֍�s���̒�G�E�RP��`$�[}�pAp����d�F����.�c�Oo���S��Փ0��d�$pۓ��|$8ˬ@;���ƀ�]�R�7�#��2� G��]��ҽW��$|oLZX���i�e�����"��q��|"�q�QYZ}�ecc�B���������d@p,�g���ov7 0���-9M�}8��}]�'�b]�2����$�[b8�qڜ�pUg>�^P�5T� �<Xwu%e���""������k<�4w���";�K�y�|X�s��O������3�y%���l�C���
A0g���1�!�������[�]���3��E��$�huy�!d͛���"��@�Z�z�g8W�S�ɟ�و`�F��5#��F�b룴�}�2�a�.�����tf�%)��7���� ��?$�� �f7�Sd�Z�C	bp��&�d�5n��Ǥs�/��w-��6�c����u�����f
��U��&�q9�q���<t��}>M�r�H$�q)ZW[�m6Z���,�b+������`^O9z�<��t)����u��@k.2'Z}�g;dO!�Ty��G��=ij��'��$�T���P��?�Ko�xS�*;:qR��I��=��'�2imD�;p>N"�����y:'�6����߫���Ep�[��[���ɭɷ|��T�Nlǣ�(��ν��	�BT��0��%���41���h��1@������BB:���0, ��z�Y�ù�o��ܟ���F�i�̲��p͊�S�$���ڼo7y>ޒ�픵�i؞\o�5��H�}Q� M���O%�M��Tn�J�%ӥk��e���NWu��~]���(v�| ��:�7e�yX��X���<:	�-�iO�F�
^��u����)�'����� �(β������!SA_ZLF��X��,�R��ZtF�KR����x7�3�NF�0N�P#Sf�1@�9v���A��W@	�c �z��¾Nb����t��3Ё��6�����g��`5Le���KS��/ÖB�nx0z��������yK7��Nz�K�5ͥ�X㚲���Q�zDL��� lXT��so����Dh8t�xW�k���Й�.���.8��dXkqn�2k,����l�OM�E�Y�k�;��"~6M������u�ԕ
j�S�}�ȇA}�q�'"0�[��;�#����~����L�0�<өPAg���� ���k��˧�_�k��V���������Zk#(jX���?u	\��{m��
�x��<�(l�+�"�S���&/��/S�E����%�����b�E�9KLJ���{S=�gܵp,il��P.@��;�n��KYPv��tX���;:�i(;�h���0��cנ�ۤ"%W��e�N�@�A���n;6��6��B��Z �蓃�"o}n_��z��t�p�;w�}	Ѥ.N�t�ގ"�D�<Z �a��Q�Zu�4�F���m�>�(�:jz���R�8~5�W�U�����&&	�Rg�FM�ԗ�<H'�g�g�{}���^�u�����v剐���4�<.��>���p�V��'O܇����1����J\����p X�S���a�γ���u]��_�Nw�]MJ�q�P����Ʊ���'��#��o~����GoX7��d��lo��O�%h�u��c/y����z�%����6����3�8Q�꡺ˤ3"i��VY�V��/#e��p�%kـ��'�Dܾ@9;L(o�h�P,F��������F�XwEuA����f�-�L��ֿEW�5��)Z���G�[��-��A
��ŞPD�B:��Z+A>]���68��k���p�tB���`eZ.\��G}�5�9�m*Ӱ~��I�xk=|�g�O�]�l�Ys��ȽQ����mͿ��@O�Z�C�Qzƪ�\V�湍�[����DW.XƄd��x�}h��.�&��vN�Pѿ�4Z�-���#-u�!�_Z;�G\:\�Vē��2�����r��qD���W�z�J�5E�v�!p�ً���zF��0]�L�r��GY���o���f�LFf���kv�X��)�aM�,!C&���d+d���l{�R[M�ctu�<��\,�+�	͍�&�Q�c��i�(gi�)��|�C�Ξ�{�霂Ȕ�&R.jJ�̍��y��ca���󒓭6�r�J���o�Z0���,\�lơ�?LD��$jMK`�W|�]�u�{Ͷ����X��|�"G�j�5�gӅ`t�������gv`>�aK�l~�>����0�:5�����HS�[����d;� �̭H�F,�d+���E5���2:����'���=W<�dݸ��W�����O䴘��%�-�� ,�-M9!��&IW�t_�mWY�qډ,rU�1����UۀFnnѯ�:�oAN�󕒒~��#	.��Y �N���T]�������v�����׋�%Bz�-`��xF �d�*�:��N* G&oo�rFZt�]�U�}X�{�[�ē§3*�>�0?�+��lw�������
��x��Y�y�����z;7�U�n�v��Z�u�jx]�/��j�2�A/��%��)DE��� ���_�ڶA���l���ѝ���;1n�����[bP���;�m������!�c��b��$6������ J.���)�â"�`�{�_� ��FK1Q�t����]Łѭ�UkRR��d����q	`F�p�!CS��)�]����;i���t�h��6����$7C\0,to"1&���-�>��T��G	�ϳ�P���<yy�n�&�ږ�@>�R���=����j{��,��(�I6���5&s!��o��,&a+6J:l��:���8Ɵ�
�<,��ϜA̺�}�K�l��S_E���V�r'�`�=����zPO���D(J�(��
᷼b�A�P�F�KzU�t�S�#�B����+��=g! 7V�F�tY�I���h��������P���4�l��!��K�y����;h��+�+�C����d�#ц���c\}��w�攴�����x��m�5�eaO ����:�v�������H����ꨦL�G�����W���f"b�.�p�\2�>R�.�j҆Ky��̟��o,悌s�h����"�.�6�'��V-N�.*� �YsS�v%�Q>��#�#��|�3�ۥ~��di�{B���$�	:��6�fw�3$�BE�3ڕ�yt�����;�][��D���z~�*�L�m$���������0|���JvOT����\d�vq��%��Y2ϊ�zɏ��xM�I��������q�^[V�%��~	�|�n�pP5��ًeșk�ؘ�BT��32m��j�ͩ��D���m�P祥g��J�$`v|���>��}u�UqH>��WI���y���-� �6sђD�!�p54�=Z��8G u��fpO�n��֨�J�íw��Ճ�y_�������q��1���!��7>n�<�R��m	����.��V�wC������x�'l�e�{o#A�[�T�1Vw��eY1�b�?n$,N<��?�����Vƴ̩zSzR�,�g1	=h�Ǫn���2d2�Aa�"%e�ֺ��Z�$	�7uDnܴ�׻<@3�F�a���L �Ǵ3s��&F!rI���]���'[�M���h'k�8��� �a��`@2�^���.��Ɠ�ⰲ�E�0���
6���IG��i�&��
-�N"]:���_���8ֿ̹Qb��
�������I�����R(���e��s��4��f�+3W#�׫�����s��g�3�v�C�sV�-6a�SHb��(-��}��EH��ٸ���^��y�I�E#���)�ҟF1�o���H�򏩬6U��,G��ũ��ܘ�*���GJ�vщ9�5���FT6�N�]y�/,Qhe�%g�b����;&J���"N����h�z��q��� (�+��C�d�R@��_3�mh����Ob�ާAC����

9���,[�As=d����
��h�� w,�wO�nQ��9��� ��_�[��uH��6�����,��Z��G�dc˨y�EkWWV�s*��CW|��[�����=Ӭ���f6V�p���^�܉{4B���®2S���,@U��	g	D���gU�tā�[�[�|�����Z��`h�K��S^M����a�|'kځ�uxe�I�/��?ۛe�۷
�^�;T�;�>*P��VL�fe���������)��Y�mN�������4����!�����	����Bir��۠T@�qDu�� ��]ǌ3��r���L�'�P۽�����=j��p`�᧖�6ڷ�����`P��R ��ud�������� ٙ��-�d>��ȵ�
�%F�zKeo�A4Y�����1���7�)�0y7Di�y$��CO�wl���o��x�Zy�ޝ1�iVcټ<�����ї�J@>����~�<`Y{����|c�[���*��H��s���2�4��Ղ���m��m˙�CJ�">.���%�X�o�ކ�{2�Q��1k���������x��܇
�ա��qvW/����]9z��Э҈������i��	���8�����b�n��]�1���	�s�����:�#�Y��j����Z���`��}��S��Ĩ�?TW�����AI�Sܘ-Q?�eu�D�[�SeKAq�H/^��'��=9��D�������ݿ��J�F�ŋy#$ H�N�{[t�]|Z��׎�ԤdNDR����=�P�� �
��*<�WxxUf��O�ds��[ɳ��O�̟�#��RPK14L�
�JO����X���t�ΠT�����gf�S���|�K� _[���Y��w��4ÈG�m��ԛ����MPiq*_	���t(���P˖b����Uf�����	�L�2J���r�J��u��)���us?qJ7���c�y��,Y( �Z&��nf��Q��[���,n�
�z�����)V��<�h����b�3��$��7QX�J[J��X���4��h��L�"l1YOPx�};���d���?����0�ػ�c�?Eۡ�O�{�Pާ�*7�Q�l;��́H����zU�z7�|4{��%-��kPj|��2��S���Gӳ=��}ȭ�ҳ���.k�w h�w�5�f�Ҁ��b���(q���eՋCE��ML`\�qO��e?�H�8<q��اɅS�#��a�x�n �Bթ\���3�R� ��
�F���������2��휰�T�ѵЬ�};	ϵt��{����K����?Y�:��&
]�%���ֺ�Z�xx&^D��-���g+.�j�����,I��eB�����'I��|�ï51(�rp;;�F��zw`�,PWJ 
{绵����#�E6��3{9��44�}�w�
�BAP�C�E�m!�ٗ[0�{�o]_j��(-3��-ῗ��8�`����l~vs�g�;����~���bA�ـ5�Î�:0���e��H�®�m�	��;D#sm�����1oYWL�,��l�Td��$�����R9>z�B~�}�`z�%|k��s���Voz�N���L���꽠*�vGk�ӯ$�R	�t��M��� 3�\?�z�u@��T�|��]3sp�����eT�6frZ}SQ��os�Ĳ� /!�rNQ�@� |r�'5�o�n479.L��R�\G�[l�s7B"�IAa�d���R�			�־ݨ��е�����dZ.�+��B�.O�C5�9ݿtHBXFp`m���o�j��t�Z�}��;fP� ��^���Zk��n��~���c�qw	��l�X�Ҳ�JSrq�dA_��$3���T�ʹR�[ u���(���}\+�m�¬|^FYv��,U�l�rzځx�>1^}�]Q��&ݗ��`VS9�,U�ɉ�ѫm`
_*.u�����0Oa���f�h�;Qj�� ��Bpå����V;h?�*9�=�P����O^�t��#HJh�VE�;�s��[��/ԪN�rD>����#ؘ¦��1-G;_AgY����V���h6]���7块����X@�Wj�p%x'�\X�.2Yv@+�U���>���r���w��֊B%�:�=����<ZjŞ�(�_H�I�G'���m�
��Ḧ́���*2iD!{B�]�\u�,���	�ꁟc��h�e�E�cAs]%`6��l�Fz_ܤ����d杻Ee�1��N����=n�%w�#_N�x�C�ёq��۰��y���(R�~\}������ѫt,�fP���`#/�C'*ِ��nݒ��>����o�_E4���Z>v�61����tLy�5.�s;����а"B]�K8��M5�WxF��&�`�\���L�Qj��/Y�y<�@�c��13��(�[0Y8�Xݡ��4ְ+��.��,ȍAnm�#�����ah�|�r!�s�ܜ;�by���B�oO��~�7���.��LF�J��׷Z�U��ȟ��?�}��#�v��F�����0��΁�+֞0�~.qXL���[7����5�������F��0m^�|��N�V'WS<~0;"N�=�h����wz�<'�|�{ �gܯB�:���#��*�j;�2h�i�u��H�=m�H�H*�j:�_t���ƀ�8���<�ȵ"ŷ� Mɨ��R��OƛW�)�+��&�|�J�!;��)�3E�����sz��1�tNǍԄ(��]	U�a��4��/D#�6�U�ٶ#���*r1� V�ڧqV+��yN-L���|��)a��<-��׎Q�����$}�f��_h�t���ZJn��"��Š���Jg�04ޓǤ_PES؜T {����d��P�@.�oɊ�䶥pP�ա�Ȁ�]�%���p:���~��T�\2DY!�
���5*��`A9|�4�B*��� |�ʟ���&�T��ʘ�)�F�=�<�=��$eEb'��ׁ�� ٽ�hR��L��c��A���X�"΍��d��H�ͅ!��2B�Y�{�Ӿ ��pg�P�[���K�l���8�ɐ�����F:F���{LG�U�&c5T���͆�U+W�
wRǺ��3���x@�,�l�Y�3&#����ZXw����_���u����Z�ܰ{���%���Pgָ���>.+Գ����be�RV�|��U�9�ٿ�졊{��U4_�"F�|�h��3�����F�S���|s?y��r,�O��et`�6ј���bi5^�Vg6m�I��������������7*�B~�w��Y=�t�����)p��I��¿����	32�!��K�Q��"��e�J-�[�y- �`b%[k�m�M�����Sk��e^�f�'��n�B�h�+�E�08W�X�J�2�ƚ���(�F�0��1��5��)��
:��ŝ��Y��vY����<c,bbA���0�F�)�+9�Lh#�r2Q`fLQ<\'�a�CR��9��AXw޳ �ױ�B��]�Z�ϊ��N����0:���������A`�Gw�{,�b#o)>ܫv.���5�3{�ZqMvH`&uQ��N%���}��H��z���U�ep2T�����F}�L�-�;҉����m���!,.�R���� ����{��+k��F1�����,��hx�+�Q�^ 5���225#�=Uu�[��)Eӄ��S6l�x=i�a��1�G� [ˋ��e�zS����u*{���Њv�8���6����P������)�؜
.�w��S	�ʧ���#���Q�hI��C>���C�gG�>h0g<aڮSG$���>&E|��܏��5�sd���=����gd���q�Q�������^ x=:m��i��<Y���������\��M5��(��V�m������xJ��d�|��%]"��=j�{[~��&�S�/�4���d��z��Cb��tm_p�k�d�(h᤽�R�7F�*D]i�I��:������'�ކI��p�Ι�&�D����fTZ��n��nR��Z��H�i=O��N��I�T
�ɣ2M�3��Q"�$�x0�������t��C�{C6����:Ud�c�p�8���<=�j�R��/p̤�r���^��h�Ms0����w�B�Ȝ* �)"�j�8A*R vԼ�t���d�0Qf�z@(n�2N�@���mH�r�ЋH��c�_����°�s.ߦv�O^E#W{aA��s��IN�B�F���!�����t88�n����g?A�`�R8C���J'a�ؚ�7gSt�k�)�v�{:p6��y����_��\���V��	���,�R�*�n2�[J�<��B�>,btfe鞿��$e�������>Z�T8�+�����2j棧����ǉb��n�X���zE�����⹺�0��D$2C�R����!��L���+4�:�4~rv��7x�� �bR3�1�G�O9�a�SH
F��D�{b�=k�7���;"]{�t�y�
0����-Cj��8��%%۠;�-��'gm�T:��˳ܰ��-���������fg+��ݼ%U$x8��dі+(5���*�v��C�����c��Qi�p�nY�{`��ZR�JӚw�Ky�����kn��HD���פ#2��b��M[Qw�?5Z�|�<�?��J��q6�Ge�Z���e	9#(_1wŶ������8����@�2~�wJv���&��۞�(Z^vy�f�o	;�(2L�]����#+��'���;��1
�*
�C�����ک��|g���l����o�+�Mlm��B6J^�K����\4��5�{ �`D�{t���^�����FC��<��Z�%\�JL4�O$������(�li�Kc�<�_�X����a O ���@�(�x˝v�7 �������q�hOR�' ]S@�|��!�:��1×�Eh`CB��̢����/,ځs�=n���h��aЈ��x���_���졌u�j&�IG,�`�B9�,^=R����zL�i��{ˡ��Z̿R�;��Q���ي��=���ψ�����������8ѤXH���3o��&�@Y����Ohe�'�ĸu[tq��h,e��*

��`Q�
}�gi'ѐ���(�
��p۳a�拤�����]�x�F	�z��D#�����Tm��o%��h�&t&Ӕ	�|��<F�M�i6W�U3����^V6�QCu��((���mU�+nB����XtWs=�/���OٷAT;�5�'��w�ϡk���j25Y���e%7�=�^�q'�:�A)
�j��j`L��'g�݁W��BEO�uG!�Y5�qr�D&���N�-�K��.�s���aзg��>rn<�{�1�
��d�ZQ6�f�M�F$T�r�ι<!�j΀$�LZ�^�ߊ�U��X��x�ź� �'E�^��-��� ja+�a��Jm�>��X!S����,x�t�N�l������g�F�i�5�U�o� afiᠴ*��=��z�L�O8��� ������s����*U$�s�d���T/	���-Qo5�m�";�[�xxII1�NU��+���wՀ�y��:z�l3DcD�Y� ��g���`�bL7�[��v���]#�֌um3}�����_K�I�[؄���������+�'���~�<#K�����!�D�(�A�	�.��|. ���e��n���z��tM��*^���b�:��;���ٖ�}9���g_Yo����M��r��1�aA&��cZ�f����|�$V�X���2�QC�6Ԝ�݅���kc�l����wV��+y�,�?�rp�0�W�sV
�Y+Q<���D��uW��T"z�̂��[[;4;>�c�n-i't���������iNX&P�HP5D�v��R(Y���O��%����Q뇼ڡ�%�b��ڪ�Ɔ�vߪ�
���g�RR�E
4���d���_V��(������Fz��E���7��(p�!���89�X8!��nD��v�Q���6�"�_�}�e���Q#O��G�{̐I�zBw6�K���p6!y��T�ø�����f��a�-A!�q8(�=� ��,uyE���<�Q��vbӋ��U�@�A�q��?P�;ٴDa>J�ŕ�E>j'P�����F8h���fѦNɫgNz��yNE��ɐ>��,G����Xl��1��n!��;{û�������8#�2��iu����A��(u]�z���YBLYHi���`��j��^�V��x���P�4�t���) ��grp��2"���=#
�X���O����z��pu�u����NO�ì
��s7[�W��Z5�B	�x^�����>*�S���907��x��n��t������Ee�� FX[�������U�9�ʌjItR㐥�;0�hi��)S�Ɠb�^�r	�
֒	�U?�w|΃X 	���뼺���O��i����d��V`;���f������ÔkM�P`*�=L�[��}3�C�Z��2�#^3yl9k�d�ι��G*��g�j3�\���g�E[P�k]�/2��7/�F�G�Z�s峆�Z@�����+ꈸ�y���,����	��"R�˝2�|��]�m>-�2=��]�b�b"^AP��?_"��"�xk��bB} `��lr�3K����\.1�/*M���اn��·�<"��Aq��_a[��c�P![�'/j�8pŚt��^�I���p��Aن!�g��9�G,]�]�-%�	�q
�l7��iI�OJ�IWAv7�uA�C�	�j�{��,�	�~.m�&��c����t<�[5G�W�b���OmB�������$�m����Sr�Ϯ1^�o�Bx������	�R�]�|ub^Ne�U�\�}��
�DY׶B�WK�_��>�ј��ȹE�2�Y�嬙Z[5>o��	�˶�)�u��'(�4GCf�;�^q.'V�iS\�a���P�Wf^��#3�u�;����z$J���_#�q�V�xϴ��뙉�̈S�V��%�.�K�MJ�S�ִ|��ʤ.��٦1�3u��Q&U5MY<KQ�!ŗW�d��-����m�B��gL) �\rؿ��^^���Z[)H6��+M	v��p�9�Z�&��l2v��J\�_Ywx
$n3P#��>f8m/Ǎ��;�h���!K�
4r�]�j�D�mA�G8�b��9�{jry��-\,�G�Ʊ.���U6��0z��UT�Պ[5Qdl������&���(yÓ_<Z�뻋��o2/��'[�/%0IZ�0]8z��1� xy�F��A$�OA��ꪺ��v�����&>OA!�[�D��8EB�t�"��3�ߡ���#�S!��I�Q6���s�3��Sk����
��)�W �^�ą�O�`L�]Sfbl԰��S��ی鼡�	��6�o�ROEN�\��)=~��Y�l~Q���j�{�>�y�M	�ֿ�������}7��������?��1L�����ۮ$��ШC�k8o�6a��!Ā�(e<�ʣZ���)����޽2���ݫ]��,´3������Z�#�B�����-{�?6�Ǧ�|��m�%}�EN][�L��A��*']�Z�ǵ�C�`o�V� ǦP��)����� c]d/v�f�?�l�.�8�`���K�L��C��f��D�����8�0���;� R��s��p�B�	��"^n]7P�e+Ȉ_��T_od_G-�@_�)�h9h+��hC���[�����q/���/�/���-�h�/�L���fI!J-��*�X�Ll�6�+#U?$�M`��h��ƨ�ì����3eƞ�g`�A��nplpu�>ų����&����AA,�	դ�gn�rg�
m��&l�[̄�Lx�<��U�(/��>�#,�/�������H���U������9��n����E88� 9`�/2
�&�i_�&5�Y��O�C=vDIho1�ejs��9�XJ�f�z��52�=����s'���!E���^6�_n��Y9��춞�CIY-�:�J�!d&��D�	�7�۪f�KE�%�c���9��]8;4"��ٵ5����)nŠ�D$(��E|���=*�׻��+��=�}41r*�8�Oa��N��ŶA;X@/�M3�w�w�	�$T=O�5<�-���8�j�.�:�If,� �s��cP��;2l��FG�Mo�槺�w���YJã����H�8z�O����A���g7�kQ�����L�U]�������9��/ ���Y�񘁝3��푨�{�j:����=%��αy�r�O��D=IK�Y3�Ξ@wU�t-r:����kiC�$&�1`$#��=¡V������ܨ��=��_�ȇ+?�`x�ʕ��,v�QD �Q������i��D�s�cr�>�ǜU�l�d[`�=�]�4w���U��茽X&6�f�6Q)lC2H�ְH��
��5�1Y���\l x#��� ��h���Z������ǃ	&�Oآ������_��LI��5;�gBN�Ŝ���G���_��^H-��~�⤵jѯk�B4��F�a��`����l��<���~&7�)�Mvn�8�:P��Ȧ���@Ge�w�/��Bm�ק�fҮ�-��G�'��bC"�^p�ņʻ`���u:1��*�~¹�����D��+��Mg5.6�>,~�<�f�W���?�-��8[��� �
-a4l?����,��ފ�'���|v�'=N�]b�%�&9�rʐrJ����gN���#�4����]O�8�%w��M��&|�J{��㑓��+���<, ��y��E1��%4�o���q��7q�F~�3�a�SIEJ����;�M�D�a�#�5PK��*�v�o	��0���%5��S�
^���P���i2g=u'�'sl��(�ŁTŎ���@�q�u4Xp-���E(0L��#p��b}���.-q���v9�%�1x�Apo8�#9wO�U�|��_ �Q�Ւ�O���]��Ľ���>ɠ`O�Sp��@v6aQ�t���
�U;~�}��j���fц�G�M�J!Pq���s)�����ݽ{W��xa �KT�9{*e3��-�پ��a�609�3ZO����V��s Ή^Ƞ� �l��Y@���UCO�/�FYZ�����:9�ny~҉�=��+[���l;���>;�JJ�<�K��`�	�0��5���~�j4�a*¯���HyVBm|�r�؞1�%Ko�����y{Sz�I-�E�>֦�`BtPH�6Y�%+�,��`�8KE1i�2~a,w�U)��+l�H�8�:�b�ѬŞ�ZLgJ�����p�7�
�-�f�ϔ�Z�wՕ�4UʨgF�^#��U��q��Re^yK ���d���P���i��hX���x�Pto��<8�����?u�=�d0%��v���+Ȉ��6�K��$K��x�0G�z��y���O��/~�%P���"$�)p*��):)�b�.-�����4�rdaBZ��)���ì���!�i��8]��Z��-'"�e���H�G��	f���ւ
C�d 5�s�n��HD�;7z�3��aL���P���,��?��P�@ ��LF?��zD9~���z�є�W]��l�07�U���5���2�2%m��.ŗgv���Fڃ0����` �s�X������l0�7��V�
{008�G3���m��}�Kx7��wtQ�LC*G�����/�> ���������9��=F�����~y�8�a�a^��D��9h�q/c?�jH���Ad�G�uNBf�J��}l]J��D�`z��B�TR�R|����~afk��l�Pgx�c�/�j�,���;$^Ν<��̽�k�֟���:	Ogm�Ɏ�t797��.�e�̃`x��jB�V�����?ݼl9Qr���m��FڝZ���P/smd?t6"#&d�իQ�tW�%�JWzP���]�]u@p���"��&�}6sD7��W?�A�M�ȏҧ~�g�<�5ϒ�Y��p�lq��(	t
��o(\g&5��y�ƴ�>�C���f��ő
*�B���|2)Zz��kz�p��7!х):�vJ��kg�ᗾ���IG����|Ƚ�
�N�h�v�k9|�J�!K�1)d���q�hl��rq���ˌ�@e����;^�]7|�_Ӕ�E�b<]����[*��9��e�$���q�_m��޲���ͭI�<],B��Qt�\x�ivfw��)L}�Z�q�2��
d���p�s�lA9H���N��q�̴��A5�N�>E�U�P��%
ҩ��ڎ�u+/>c�@��ƈ��<'j�d�υ��9��J�X���X!���Q*���A�×�y����ꀔi��K*znJ?ѱh�׵�H�R�sP��{(Xg�ҙ�eI꥘����*��Ph����
ƭ_�ʨ�V_���d�S�q�ވa�(�7�Ɏ�KL7�X{m;C����3�1Z�w��ά����.���*�V6B">qX�[��k�Z��N�y��O�.i��T��*W�������Q���
w��Kh��8��<����?������&���Z�!�'����	�(����v׮mT�C9/���IO,�Z��ƿqO�ajg���x�?�VV���u��s��Qm�(�Y)����	oX�D�.1�9��d!J쬛�G��С͑����4����v�Q�kD��&]����'a���xNPL0���B��<��R�f���	N{�<%���C�=+^��,)�3a�W��Y��m_�$�LIX�2�)C�Pf8����m�M�����(aC�@���sǧ�����UN���i��@�<Y>�x\�aw��A�ɕC�T<��y���|���5�F�;qljnp�׭l'3�t��&2�*V�C���oH�C�=)�o�*�b�^�������s�t�:�V�t��!��1\;���B�[�ХH7�8������=	��D��~���9u�d������X�����M|{	"� ݲ��u���B�R���"���zu��Q������GH�2S򃣳"DG��G��PrI@�>k�m��fXDٗ���������ֶ�Z*!ڟ�Y@Un�؄d�����X(~��G�!N�WNS�g��=��K��Iw6#�敫o_�i��L�lt��t�~@��b�Ua�Pk������:�5��>�LI���ǅ��u	n�ur�:8"<��{9��N�S2��
ΐG�i�D�����L�y�C��(��^�P��L�g#'6�=�+$nG�*[��OE�N"��
��[��Bg#a�Ɖ��u�2�zr�6�E�1�Er���Np%��0N>mX5a��'}O����P�����	���`��P�;��;��#B�҃����������k�|���%�����҅���З�/2y%`�M�����MuS�ʻ���(!�3&`Q�� �=�)E�
�y�i���������I��:ܖ����B�v:Fc#qI��:��I�0�V~t;�>��'�>6�d���C )�H7��7.�#H3˄u	qT$��U�g�8CK�X4�������f�7�#����T� y�6�)^��c�no
��eNb������w�/&Q�O���/�z��E_+I���E�+Mν�l�Z��lR{�K�>6n��p����^n����<�"z^{?:��B�e0�c�k*��ҳ,��d-ř�EØwX	��([A�M��`(0rg��![%V�B�郰����iA�a!{���n��Φ`�U�>l����NJH���lUHզ/�K�__��8MS(�U��L(#��S�C��ju���7���N��:�۸^��i�ma�����J��?3���$���ߔ5�$C���h�m��p�:��q �#�q�b�m��r��q�CZ�����*�hd�����&Q������#����dd$�vt�"��I(+�I��!�,�J���_6�1�h]7ci���{lF����q�h��u�mk��}ݜA(Ĉ���Z⇀��5�a�d�P���g�[D��tp*nt4_�@)��[�Ȭw��A�����5Kn��Ύm��c�{��ƇW{��|j��$��@^�.L�o�h4�.i��,E�Ox-�-A^�Z��jo�hk�km�mcϖ(���}h��MD����_0E�?X!I[��@H�TB��eS�h$�z���w�7b�����
Q;��2��:'){_iP{=��p�C1bR�>�`*H�4fy�ql�ɮ9�"��3�d}N���9sڃQI��g:�Cs�75�Ģ��G�����F�*����!k�e���c�}V�J0�-����Gȹ�G�]�J�U�K3��	��>F,�c��c��1�m>6'����o�g LbJ��h:�C����W��q4b� ��� �y����sD�~����1'�̺�����t���j:gU�ā#�&��~ϯ2��y���ȳ+"�q���	qw��a�c'�;�T���J��ٞٮ}Q�*z����㱼�Ӑ�-��s?NE�r 7 <�jJ��VH�T�q�K�F2�ƒ�k-���/�>�Zɦ:�,�h�'�8|���Z&���g3{}V�i�Ev %�g�*�ۻ��	/aUu�6|<�2;���j�v�vE�F�k�i�!@�C�|�J9�ݨKR��XF�v��ø�"1�x�g���
�bn;��&=���~'w�݅��Ê�%�,��Q��=8�K3��,zM,��=���ڤ��#�D-����|��n�wh ī�A�SL�	� ؿ�/��F�<y����?�网��+�m0߬�%�/b���N��`
=��#�U�[�����|�@����,��>���Bqxur9֔Zw����B���"�K��)@�1K� :�������*�h���p������9T�t���[�"|!��؇�c�i)���!��D+����~o��[�$����=����n3�m����tl�DY��"mJ�"�����F������2�! MC";��`�f�v�� ���t��@YkZS�X
�H>h��v�Yl�=b�-��H���T?J�������rw��t���J>�6�^h: �����������"9�o�-�2@\������j����ȋ03У�Ӧ,�O!`���������\\�[9���!O�ǍI'n<��X1�j���&��dښdr���q�^vGoz�O��D��r����+(�":�}&�|hC�_a&����T*%����G�K�g�G{��`�s�� K0۸�|��9f�-ʩ�7ۺ�՜N�]��j8���:���(ı8��f��N�Kk0�}0׏{��J0S@Q) �vŃ+�`���I��B����fU��	���E�z��JL_/��0^�o6_=�T��	i#��ӟؗǗL�p ����J�2��(���Ҁ1�bp��N�L�EE=��r���.��CW�)'���ԄDU�x=�ڈ
��j2߂����5��-� m�H]�5�lON�����>�e.���Z�������#	�!G�*�����=(�ze�'����d@��,Z����ܥ�~�U��@y�4���&�,�p�}I�D��+[����<,̎��R��5�\��)x�����1�î;q#�gan�d M�	��F�9fGW���%��q��zuM���;e�sZ,�ό�"�aʢ�]F-�(���M�G���xZ��v%d�}�����~|>��>��7���_��
���g>��'r�s
/N��\�Ab�u�R��ԔV�(-�2�茮���6�L�`�l>CJr7�����b�&~P���H��DI�[I��r�z��F�*E[���.K�6�^��Z�~�ͅ0���(��L�`��	�����uDrg��ܓ Ȳ��f��HS����}O1n��7cߗ�>������N�-_@W�.�ޒP��B�u�� .--���p�?�;*psZ5E�bc�2=v(�nn#���UЉ�]u��<8���X�ϵ�����h��0��,)n���UGe�X����W�Q�,��H�h��2n�-�o�g��aK�Q��T�|̣ĩ�G�	7��}Jj�(JV޺3d��*�˝5頂�uP�����
�q(`z/�~[UF7��bڨ5 �K�)j��Yw6���w�Pl��5E m�n�Z��H�9��L��;2���������i��'F�-���(۔�|F�y�C=+�k�Z��5J���$Ȫ��:�4u$�_����3!���m*�X���EԘy1j����{=Z�^���}%G��:H�2ة�8I���1��h8)���R���J�D6&����R��r7o边� ���1��$ԚZ= �6�&��[����j���_Kx��L>��CB{Z5�>7��D�~��r����)����_M�D3�^�_�v����[g�����0������)Z,a����8&��)���e{��\�痃[��[�C���6~�+�&	n�p���DUƕ'5 33lN��gd\s�᩸ow���U��I����BV/*�ո���&��!�[�;�ƺo�(�	�H� x¡��V��5��R9h)��tҠD��w����ȟ�:�Qi�����i�h4�q����UX;��d,��n�o<�ɶ;��D�`h*���b;��ˏ7}�s=������)��P��ɺ�جQi'"+���Q�-A,m�zT\~~R�]DxL��"W=y�$�i2���rp�ٙA>��`Qw����#w��q�@B��Ѭ2�|>��E��@���1�h��bSM�I��K�Sư���@?HZ-�>��q�J�;�a�-;�E/�I���Բ�Ny��W���y׸us.�[T�K?�����Y������:�ǚ�xH$-�R��[���H8.̦24S��� ީf%�����A�[�Z�8��.jFY\��☤#����LG�b��f�x�'V��h/!�x�2(�6�q����!km�_z#�iV�B;r�?aa�)6����� �~�B����p"�S��B�P0"hԮ��/����$�"����`��v^ �9W5"0B���V���V��A���3~�y��YG,�Br���̏���cM��ː��t!��������F5S���%�񁴆�g�n	J~�Y�.����r�JU����s���3��,Z��S���Z)��B�12I��j����#j�n|��~>/矿�lC�;X�
��*{��m��fv��Y�� 4x���Kr�|�E���_�"Q7�r]���w�΀fL��)k!C��|�	l��=B������k�����0b��9�QV�p���?շ�j{�� � �Ch�Gv��'_��Undo|��� �5�<hN�0��䴟���SH;�
tmL
+�9��fN�R-�x'�[��8Pr���a{)��1�WD��J2uq�b�/N��X�W�"l+@���E�W� ��m*���g�?���w�Dn�������0��,#Y�[�5�S�q;��@��:"9�,ө�u��}}��	+��qQ%�2M��gš2���,��������u�>?:$h�^_:V>#F��T"�����>�&{"�&g�b �y�0�� ֜h�S��T�}���aͣ�ZT[?��ʇ�$���L ��'SC]z�H���(�<���;����H��ʴ�D���:/�q���lx�ɢS���Y��]Y�uQ���D&�p�^l��5+���p߼G�FZ�6ruDn����<�f��
N��G�	�fͮ��A�*=s���A����U/l�K�M�yʬ�G]��~%@�{.֋ݚڡ�/���>aIGn��2�����RXjU�մ�0�Q��ۘ_�X�̕��~��� C�\����ގ��<i�^�$�o��G�mB�`�!��:���T���$�_>[��<t��
|J���ca5�!���+!�cR>Ţ�ۧe��َ���O`�݋��؇�.�T�i[��v��,�i��	�;"Ul� [�EE5��> ��ΐ�Ql���%�F�/������{��X��&׶0������t���l`.}�3���{�e�Ȼ�vo�s�<>�R�OX/3�A�EG��j?3�p������E41q]�ѿ�b\���?	O��yQ	����p��ĸ:q�]�߻k4���Rϱ��6��	����L	�؀81��⻝�j]��T[�}���'�P����f-�Mr��5o���T:��;Y��{\\��Y�@p��j����
�\,ŞBm$�2oR+Via����Oj��5Bu��^�/�i��1��g>�N��L͑�JИ�o�'v��"���WV�����6A���?il�
O�+=��E���јw��y��(_�!���IY�[�~������\���R"�M��]w��u��/6�������t�B`lT��l�}�=�RI��<���Ѩ�os�wF�AQ��|c����9jY�Ծ�^+H�+������`��-�~F�9,D���:�%3�Pܪ���d����d��-�w���u�Y%~
�y#��_�s^�Nm����;+E�C�!���k�|�f��L=�^�$��q�wg�ʅ0�K�n���
�P�7�.�0�����|B����wQ��hu̎�����R�<�]8R��L	8�,Rs�'��&L���܉��,Y���f��α�_x8x�u%b{Ęlz��k!�Y��&�g�;l�C6�wH�C����NY0���+=�{�k��&z�������#c}d�W��0�ֈ/[ʲcCە\j�b��ͱ�࣯9���h���f�	 fr�ז�n�Z԰��'nǾ���_����..�����ks�)3���Y��~[�Og��w��|&i�m��;l�.�r4� ����,$���"�E	�Q��<ҹM��x�Q5��>YJՁB�i�'㎳\x%�\Ɨ�x�kk����s�s����͢l$K(� �S�P�g�2�VD�U��h���@F՜�������y1:d2�$�ʹ�E�R��a"��M�	��P���U8�}m�0���5�=-t��֤2������F+�Sk5mYҴ��i�!��9�"�1�fc�$��j�����\�_�%�T ){������XB�,���������
V�ԏa�;Z�k�nu�W�F��lӲ0�_<�h�'�`�W�B��{�]��^�.�Ԥdq�z	u����75�F�)�B�[P�J++7�\-g�Um�ۙ>��8�V2��w�e`߶/.=�ΐn���\H�q��y��A�٨�O�'�ȝ��L��s2<A��+�,X�x����S�I���؈�q��4��;V�^	���,��5�=:,|[�5���1�?�9�)S��z��U+�q�"n��x��p|�Q4o�BSY��re�oI�Ȉ�o�w�_�!|��B7/��gN@T���k-�yr�ݨ	�~3�QF��n�AM,��cɸf�s�$_�3�'���	���F}�	��FUyV����/���:;L�lq�}y:�í�0�@�h.�����<�ۛE�;߅s�
�|��� S�P(}a�)L����_� DǢ���!�r�|��ѩ���NqN=m.�+؁��6r6�"�K���<*�_�rrBخ��5@�70{a]�` {^�d�8"��>t�K��ؽ�>�I&I��|��HI�#Ǆ;p��Y��ˇ��g�c��Ό!����9K��c��Fe�g�����jq585�.ћ����i�.����f��Z-��M��sv��;�������M�ð�F���!������b����۠���,����!����"`[���Y� �_��>6W�I!��
v;���FH��\F�^��7�v���Áh3�-\��2u¾��		/����vAOE;�Y� �~��}��_�R�3]�ٹ�����~�O���>�C3���,���1��L��bo'��q�?߬���׈���3��P_d�a�n�WO�0���.@��QU���0��?<����ӝ
�1�<ח<�c�������I�Ӑ9�
/T�/'!'ɳw̏��{��E��,���T"�HBP?�^��[��A�w��� Ѐ�x~�*�#;�"��]�,���\~����8���-؞���HC齹������㖄��w{��,�}�Κ�o<$��t��]h�uP�~�^9�X���_&	\��}����b�^hJ�@�8��^aB�EYc����n���B�e1͚�ƶ"YaR�|�]ڜʪ3%��L�.O��<�<�E���=��۽s�Y�<�v[��d���,
���h$y)5sF�^մv7F���hd-	�$��˦ƞ���d��kUMB���щ��G��Ļ3�E(.��g) �ސ�^�PذBA43�� l�'��Rޢ�K��T����v�&H���&x-�/%�LZ��bV��O���/�~`.����~���]iI[���H$�/|i��ľ�Һ�bؽ{�Y�i��X����M+�<�r�_���|B�-�_��4���~Ҵ���2�S�sLd��)y%j�ފʓ����� �S��7�R�u5v(�HI�5m���p�_m�_�"������G-��c�y�^W��[`�mmbGNE/�o�U��A�g��V��cj��o��`�a#K�<�[��9��/��0�ޫ�jM�]9���OAyՕu;�"'>�.v���\�Q�D^2�s�GS����e����+���g
b�i�b�nد6tL?����
]ۀ��n��S��Wӽɘ~M��}����Z�o�����$V�q��=�L(f;R���@��5�O~+���O�¶oG�+R�J�`mΏi�0�iK]�$\-d�H��E��mʧ��0W�4�*ڤy�����z1�/�@3-da-f>آY��׋���٫������!��EM� ���ST(Ȍ+W
*��g03R��NW�;g�/\*�z��߱s!HH�]�n���,|�����F^p�8X�u��j���ܚI��~�Z/�El��R��y�����#�Rɯ�`��AA*3*�����Iy1cF��;�3f�H��hE���Bɣ�����-����u�����b�~ ��g��r&��BQ9#ۋ�M*L��PP�^cs�<��I�{�������&;�)�V/���xM~�RÂUP ��8_�5��z ��q����qVO%��|/��kw�,v����X��`�y�v�g�����6�N(�2�nH�oT{x�m��Ʈ1�qc��<��k��WXaPѥPM�HDy����k<a�4|%�B�ŝE���`)XH�Kڪ��mߍqE� X5��ŴE!k��YySu�O{:v��R4/�,
��s��옂�H�Ö:[�܉�ke��/٦�^��Қϰ������7H��m�5���T\j�ZJ;���U?��a-��\>RZSƬ�ef�Տ��/�ɛ9!��dq����Z�ï3c<��!��?]�p9'�@����4�/�����D�;�S|��{��l\H��%�!;�M��d��˫yvdYo�������Q��{c�w��"
���bGM�}3wH��(��Y��~��F���SO�S���~4�j��D�$֚rQ,%�15?$�b�J vU�q��K��7�5A^�!"F��P�I����VI�.��_w����;R�Ҳ�m|�y���94��@8!t���ˡ4(q�n_Zg�8v�k�*Dݰu�Μ�J� zn���LϽ�uW��]���E6�)�DՌ1���D�������&��W��&jq�M������V5A��OÞ~b}\�MN�i~w;�]���ݴr�c�;���1�M��ӌ�{� �-�o��P	䮏�/�BG<fZ�!�=�)�M�;Di���bJ���^N�a�t��UMN|��	��d��T4K��"��w�'=p�d5UMr:e)����Y^�	{M�#��oc޷�&L"L���sח	�La8	3S,���&;:���ݏ�Pԝ�}��Vu���	��Hz.N�- �s�����| Z�i�t�cX�����+����|�\q��� qT���x���rv�0�k�����Ǐ�_7���X@����iY��G���v��$ �>�_�xx%?�[J|�|΂������6��Z!�^[9f�)�E�WX�[���`T܆�|��E_Grі�2e���|{J��9����&$�������6�1���X�E�v����_7z1^~\Z)���o�u�1��%)�ߟ��SBey���Ke��I�r�ea(����?5m,���	�#z�?LכfRI6-�<-
�,� ��̖��H�u b��9��HD��
i��6�"6ځ��?���ۏDR�F����k�)��
�xn/��i�f^��}��q''e�ƌ����g.Q+�������J��� ްoY�
��G����MO�j�K�o[�N�T��b�F�����I����y�I2�.�����݌��	tT��=�F�n�}%�:H҈2���9כ�\��&ɃBLG$<��,��~�cHz�(��e�:L���OMS�x����k����M�թ�D�"���ۘC�ꧺ�C��9r'�}%�Ȭ��\^��f:S�;��+�`�̸lA�&^�X*Е��^�P��P��ٱ�I�q�� ^{̕��$^�j2�V<	��B�8[/|ؖ 4�_Cog�L�^���3<�����=ԀUD�XC����#�:t7KI3~[*t����<Y�F��8�O�1��O�s���BR�l��@s��=o�����L�Qyr4c���La�_WV�B�l ��@k�?9�!'g���J�8)���O�խ�)�Kx�/Μ\�z�_��J�L���SlD�;UEk�����2��Irch���LGQ1J�c�8�.���=�iA�)L�2���g�-�"�q���P�ϔA c�@��d��æ������*�������%����/��ij������p���ͼ�3a2�&-��Jd�Np�<�FG8K}�� K
�pa��@�� 4��+g&����7��r��03 ���׾�]��NxJT�����B��C�+��{��E��e2�{Z�mޜ��d�^q(�I�DD�jl��k8�>��c����*v���o[/W5��J2�~���Q�^1�1�Ղ����ٮ1��OY$�C`<�w@OZ�hl4�����������;X��]?_����2h�ܔ�+�$j�(�jX1g>�7@�z�Yژ�*�!�EB�v�l%�ƭ�-�$O
���w��|�Ҹ�ng��5q�ڨR�3�r=��@���2T����J/���B�8"���k
�ӕ������$I�٤�dn洶�7g|�oBݞu��e��Y��
X�1��y���E��a�dY���ɤ㣳���s~�	o��Q�0O3H��D�U�����*�/�e�f;��&�7�$RL�=�b+P�iە���k����Q�]\�|���FJ�|ǘX��˂a�%x�ދn��ͱ�O]꯴1��HLs-�T_d�!���,�*t��>�qR�� �4��bWcd�>�j���],=��5�wpH�x�*�t]�{���9s���,W�D8W/Ơ u�TX3Ky�����D���>�։�_��R��_8�!�Kٓ����:��0d��/��,"�]u��>
�
�~��`��+���Y�3�kD�&e�:��7��	�Zgc�����ى��2��� "��d-z�
L�Qi�Q0d�$�)
,�[{�PPQ�OW��ޯ3��H��3�A�Z�[؊��ĉsS��0�-��[t�H��~�-�S)�w��K#��3&���	���Ԋ]��+�/:A���I��Pp�Tyd�6�~�K#-S���wlI�QB�����H��o4!�|���ҙ"�r����y  Y�A�=d�-��i]���iZ�A�Nu����J#��#L��T�R��<��r�Ò )eb,ʂǷAP��Y��+�7�*�҄�!\�.c�ϱ��20����A���F�.��؞;zܓs�5�\�dZ�'�ty ��	¬M��S���XrU���b12�0��Ň��%�RjVF����,ˊwrĄ��8�����a���9���Ɗ�W{vj��2�WQ\y/'�8���wZ9�V��Dz1٣��zA�(7*7�y�|r�Y7zk��D0���q߃�X2��6#�6�l�kn�W�����9@r���ѝ6;H⫻5��ׄ��I	e��.Ya��g#g�-,c�9�6��\��tj�
\������-4r섡�:^��N��KImwj�]�g�1���i���1)ꯗ�7���Vf@�����a4h`~�?7hI[�>��ڣ��!nsj$'�kCL7�w�Y�n�_{���ι>����ј��jM�bݮ?SYj�h�˕mA=r�r�D�+ǟSy�&*+hv���w�6Ӊ��LY���Ο	l�#��~U���&��T)��̾T�� �4���ٞ��P^n��'Pg��t�m�ăH���ÉVBS
�;Y�y� �U��k\�۝�qN�<�(o�V)漇i�]r���� �����#��	3�Ɩ��KqW�uY�=0�����i�O=�Y��\�~�C��V�J���_�k�2�1 ��n��S�W�:3�$�݂d��g�V
����6{09�PY�7<�`��i���!v)����B]�͠�&:�nx-�,�Y��;�"�֔`��rP���|���ӈ��a�]�`��-��a��8�:��[�Z�f�<����Z�<���������]��^�l�t	�a*�=���I���''�l%I�W[+�櫷����� jފ��9���$��+:&5kK�zyh[��g#�S��1��#Z�c-w��ao����}Ĩ�6�|x?�zbC��ٔ,����0�;�䚔�a��yc����:] BB���HR�Vʰ�\C��)�� f������7�U���R{���/��S�y�P��n����&ok���B����k��$ڐn8�Wq-E��^CO���v%�A-�ă�͒�P���~�&'�������(+?%�.Al����	��<�wZ|	`��v�  �I;��9V�	�eS$|�9��HD$:��X,��Tq�O��G�v^�?����4B6/��Kh9�4y��A�c�ݢ�`�TF�Z'�HEZtu:fa;�J!ꪐ�Վ�@��风�!|4P�=��
��j��0�¢������uk�u�-C�O���`�l�Ш��Ԓ�:זd*ǥsK}���{���*D|hRѹm�b/��3�soy����������� �)f}���vK�����#�>��#��l����%8l!�� �q!�l�0���kTt���^	e�ݮ��ٙ�㚣�a�E޷Hex���l�np��X:����܃�� <z���6�{[樁+�E#w ���0	)�^r���W�pv���8Onp�m�����J1�g����G<�VUė�eR�V8yڕ��:�͎��H���ʂ��� (����8�/�F��](!�:�K�od'6���u�Jb�8,,�bAM�,F�o[j[��?�!�a��f)T3:��2�����辯�ok*1v������θ������5^-���J�m>�-���w�ݻ�hl9r.*�t؁�D���8/�!�>�O�xI��[D�q��"nZ��@c�7:��%���	zn�fn�D�"/��NK�;�ĭ"����|ST��is��r^a���{m�E6FGɼw�d�/��d����v�@��gQi�2e�(�H?����4ƒ���8D&�S�c�������\,������ 4�(*cZ��SO���S>f�x��i�]b��D��,4.�Rh��
����RH꛿D+��
��P�qw�E�����6�'hU}h`U��V�5a��\H[������}���a	<1�O݁��Vk�T��*M��ͽڪUd(�"���ׯ������e��ULT���[���P���I�l|�:������#�~%�1���f"�;�n!�VH�k���%���J����@�D��ʓ���ܞ�R��j���E?���=�%`��-�dC�օ�rx8yLA唉.C#�����[˯;����,/��0U��_���t��@U�ĦS���]�6���ï$���B(����� �u�F�Gj����g��������1�,�����b,o*���H2��}h���A��}7c?��������������5[�I�/E��]��v��O1_�2fZ�I+,���K��m��܇���<B�I�����f�$y�ה7����T��O7b�C]�߲�h].3�n�i*��!�kB��^!}7�����6�
2Wׂ��H�	$`Ϫ����/�+К��u�iy�Yr�rk0����[(������?5]ɖ���;r�.�dQ���<GOs��BM�����yG5�)a���៦�v)^�;y��o�_1�S:�XP�⹢؞�0�O�1r�`�΀���~���z�b�����&�T���E`
GW���UԪܘBA�tEx���KNu���� '�:�	+�5�Z�z�M�����ߣ���i(�=X���=[:��ƅ�^��$9J��h�}M	n���0���%��ް���gv�΋��oB�GIs��N5ag�d�p�b�d��_��OLm1�5g�kO�F'�X�^y��� �,��}����Q{��5ӆ�8����y��r�F����^�D'Ӗ]��U�u���XȄ�+������A��K�S�@����8�91���8~����O�����'�q��@�s\u������DO���-aq�ַ�Yh �2!���q�^E"<3�L�t��w���WƉ¹x[�P�	L;o�PG���T�I �|��S��'����(V��sk��.����
A0(|���% ��w-�l��#�o_Χ쫯���.��X,��d����L�;�WR�m���|�7��R��)a����忒����b��@�o��V�4�9��]t��-�Am��?��q��o2ekf��0%���y��X�l�4w�'��RB����A�me �	V�X�*��(�e��?��B��đ��'v�\]�Z�~��VN�1�"^�;6 n,O�^JL�d����!�E;���5�-d���w�d��m���Į"�+�[�i��yGY�8����T�K���˳G\�G�ۣ�S�x��y��"٣ߞz�z3����D��B��_*���p:!��_@|?�����.�׏ȼ��[�-�^��M��be"H�*vہ�y18(�zf ���P�E�����l(@#N�c���b��mǒ����<�5�ڱ'��ƣ����]�c�d�ώM��D<��+��nDu����R�z<�A�G"�v�Q��fz[�K>�
㎤��69��<�	��Q���=<e���[I�+XN�q����c�_U6F�q�T�#s��1)G O[g؁����?�B�ɳX�>�@^�dZε%�u�K��GY������؅.?����knT#ōc�]/��R�sJ��88��&��WX��adL9q�S�r�s��}Y�ͼ�S[�����������FYm@�����=�?־�;��e�e��ZWƆ�т���j�[so�+�ۊ��|�)��E�N��ε���Nz�Yj�0�e|�U}��;��,�����^e9��$W_�1��˾="�P�.���$p�ѫ�]���:β�����76~�9�T�Y8�BcT|�ʧ$~���8N�;a�
&�t�C9�\�-r�=B�\�-����[�����fO�P���竹� �Jt��	i�OЁ&��B;d�ySw�k �G @,�F���Eyss��`�����gW����I�}e�Eh&��UP39�q2\]�X�o:(�+#]��jX�ٺ�Ģ��`��v;����Eӝ���q�i�?�<U�R�m�����q�W��'�x�����/�-o�.P���	����7�êJ9������|[��`01w�'�C!��X�4�e�^����oZ��r�y2��CUR�w���Y��~�/��sK��2�i�a�+UE�u%�Oxa\��!�AN�K�v:�u��e"�v�m�g���ʴqc&a0���,c+����uuKho������:Wv^TtLk�GS�C86eѢ�]�F�L`�[1y^Ng�h#"L����|� �Iz8�l��f��(]��Ū�
����J��|ѵ,��W[2Gu��)[�c#.7�d�h��[�y�����4��4�ʸ�ٝ ��XjQ�V{%j�^�_���3~�ɝ~�5�z���)F4��,4��S
[�&��+#vj�p?�H+%�����I�Z�DF�?8j�Ęm�2 �J�����	��E[TN��#�&���n�a�*f�H��|w6�-�,�:\��Ps�=n�Gc1�:�����c��)�2�-$�1.J��U��(�Z)h���9�(j��$���V�����Q�kǸ��� [ދ [z�:�	[�}��k$�]���޳�Zi�ʔǤL~�邱�����Hf�B��P���
r�*��!9ߥ�8�"L\������"[��5��i���6��|�X�}�EzN����\.�s�h��+p��HP��aYG�PȀ7�/�K\�~�Ǽ&�/*��0�|SO/ſ��5�_�"��]�o6><���.��=5��u#���t��_��µ�\"*�4���*{Bƌ�~H���+�'�8g��ׄB$]�Oz$4�[#db��M#A}���˕gCG��%���
�F������3n��Ģ
��8����&����0�F�({�F�=?�{n[�R#'x�}a�V2|��_
�(��S0chR��=�`�*y�=��α��ͥ?)���_"&�f�ǩ@���&赍�JIF���TZ�W�� ���e,fl��hb������A��W�x%Hi��DWyKr�Yְι�b�B�Q��z���^e
7�ǯ�XW?g{�p����l���&Z�)*�z������4���᳹}a��Un�	�ȇ��u��Q��-5��D����%X��ډ�I�|�1�� ?��Hmn����u��H�v�;v�\?�#K��k��1�1S���6�y���������xA����/�V�10�s�px�F�����|�v�j����8��fe�M�~�Dhm�A��#�(�K������[�����b��V��A	�Xwn��܅��g��UD�=`�I)���I�b&��HS3[NP�>���+�7�"�π�(Bݾ�F&������s�`��d>ÊX%���nx�tEe�d+���)��3�쇋9y���%!E'B}i��J����8�=�/���Q7�y���n
� ���ƪ���pG�~zi���Ѵ)}4]y��ٕ�cU��̠x0���?�;wE�nź�PdL؇�fu�'�c�fO�70x�4YG����� �q�A�m�@n�1~���%�'>�4A���z����6C�g���[v���>d�(;���+�Ct20�Z�ӽ��Y܏�4��S7��D���4�|2�����g2YL�z�֡�ꋮ�'k-W�a��`�rU�ZQ�@�>�66�S&k��B՚�ZE�=Mk	��K��i���6�c�w�Ɂ����N��B�*C-D���o����U�R$����`���� M��|�wJ��,�A�]��*�:��zL�)�~V��J����=�M��]����ƙ>u��V:��SF�k1�(��zIT]���\߲������@�!�@S�/�`�Vb�4�9��:�2<U�j��5���
Q!5 9���i0����-��C�X�mI_���o��]����r���'1N����E�aX={4Ր�6qm�T�|L7l���i���9��%=�p��#?|�RI\�iR�3�͜6K��B��z�<�jK�-�t���,������3����Y��k�**zYT�]Cnj����}jym� n��D8oP(9�R����܌�(�5X^�@-�xSj]9�8r��kyɈE�BCw�e�A
�A��Վk�tQ,cw�Kd�᧲�̘Ky���n�+_o�BU�}�ے�����{^�_U|�b��%����<d��aW��,n�\2��U[ �_�z��Ӛ���E�Gq6y1hʎ��W�7j�ך�u��]�`w�~�y����l!J��1~E�f\Z5@@>�;"E�G0�����@N�_1��JK�AA�K�:�Ϳ��Ҧ���+�$1��`g��Ө��VW��T�y���^ѨC}��O�"_�꩝qܯ�_���B���Q��_�\{M�����V���<�y
�(�r`�_�E=��d/�'���[b#�C�Q3��J�,|�P�smD[L��z��hsZ�Ī��]�������+����wi'NjjF��P������c�CS���#��GSX�����o�L�t[��������xy�7�iy$�Vt6j~ye���M��f��m�����D3�W�,�{�p�}˓|�gK%E�2j]BO�I-�X���-�l��$���."J����G��l$3`�:���]V�;�k�Lt�Ӥ�1M��q�6�}��a�9g�p�����l����la�[�i�)�����@�^J����IZv����nGfg��1�b������v�8㈰$�\^�����o�ۜr*��ro*{��|��u�{��D+�%w��7�1��~x2м�4&���}�ylz^�W�q�K�љ�@�4��؊KIr���s�7D*�D�3~�I��һ�P�O�4�ɿz_!�'H�!<nu��A'������cw��2�P������,��o78��0^�c�?��W!��<)~��1y轓IA~��������]KH��>��#�'>�ʅ�:�Xҿ�r��嵹)��<s�)��R(m2��cgTYS�q�@�H�-�m�t�Ur=��+�]+}M�#L@5�=��-`7'�{��sU�^�`�q򋧩OxR��Kټ�V-f\�!����c�3g�@�68�0�ck0��Ґ�g�5S��{�������VAA ����b����
u�	���$d!�h�.Z㬚'4�];���hi��i3T�u���Y���M��� ���5���F�I�8Ǉ��9������3��h|b�����	g}h �ݐ(�.�du�g��[wG� �p��{r�s":�*v\롬��-dH�u1.�A�z?��k�D�\�0?]}u�`,D7�#i����UOX��9�w��*ڑ+%;}V��	��f��M[��k���MY�G����Շ-�(���.`�pQ�$���R�W��Y��K������N���Iص��9��6�~��&��N�SP$�QQ�-A!��O����kynP�M)�����*HZ`d��Ϟ���^�/�Ѻ��\d��^�i��l�_RSslk��r���R��	���Jw��o�G4�Bs���������:�VF��D��m/K�=j�D\�&]h��X�bԆMu�B�t87���v�;����'An:�,|��kx������UA���-�6�w��Kg3 R�u V�U����oҝ<���-
�xfE>�F4r��т5?]f!���u��(�C��WdT4�|��s{F�kۤ#- 	�4�M\҂ᢠQ��M��4�LX���߇45ib2��N�(���cu����$�K���M���W����ӻ���b�
1����0w%��|��o��ұD�������u�'�L��L�UGb�P�4h)�^����F��S��s�X�A7�.�h�Pg�_�ca��K�ķ2��*�@��{���/�׀#-��F�q+**q���Ah§���9�-3�Yٕ�<x���l��(�����˻��"�6�w�J󢶮dHC#t�`�=��]��u��I�?yں0Qb���J�XH�hx"zx�]��[����N_��Ȍ�M)N���ˋ��⨔m������$p��ŭ��|w>t��%q}�e�Q�o�zqT�c�gy��?�!}���ȏ�k,DHYŘFy��?経�n�~�v.r�"vo,���tW��e�|�Ԩ�M(���h���P�-J�y�B����Y��n8r��Ո̽P��d��O�Dr- ��>���������o�R2^��|ef���R�l�4���fG'������,��(�Oy(L�#{�L�ռ��<� L|���>�����&$���3n��-��O�8�z����3��f۟9ƃ47'-@ԯ_��+\м��%w��[x�x�z��fw�]�5x��n:��0;l^z_ I�� ��?Y�Ӣ�C����Nlğ�hU!v�ڢ�d�3�oWIA�W�Ej� �7´�6��-w	RFf�mL�?ڔ��p���kS�K�S1Mxj�`�-�P����+=~9xT:p#���9�+:�q���I�.�b��W����)��J,$��}���/�m2�ī���!.�5??�����sEm���ur�6Z�V�7�i<��#��H4�J�[�����u�82�NǑi���w¯�k����ӫ���d��ܕ^���`0]|�l���`�7s�\ـ:����G�XQ=U�A?�/�jla���&P�M��I^ �����&�d£��͆$)�pX;���Q�@��3���L��mԋϱ���0ZB}����<�d�s���t&��^7U�BL���tCt�(;Gn�rL�3�'7,���D-��`���o�T��\��f�:��S��U�T�m04����)�%�e@E	�~{]� �*�j��$�zA�؜�'���d)�u0mN�sd�Z�5�������c�n���{S<��GCb��#CQh�RBf�9�ɹ���t*���A\��w�V��7��C�^�5&�c�?q�|�Fq��T�7T_��
�6˔'�����S� ������9Qvd�W��Y�u�d����x5���v��=����M��`��7���u�J����^�帟�yˈ���=
��.���, :�W�j�hf��t��3#���F�c� �z+��	�c����sLd~��_��%��^bo��<�93�ô�1BY<��F�� ��ͨH�X�w��p�H�|���M��s��mW`�l��}X��=h��aHw.����#��H�9Rd<������$y�'�*��g!��`��;C00�������j��q��l"l���T�ŤR�@c*�U �+e���f�-��Qk�sV����Z@��č��I�1��}����*y�-'�"�o�8�@b�%�޷A�R�~4�.>�G���B'�g$:M���ɗc����U��ث�-�Y��:�rpi�����\�J��3矋q�x�Oc��梔��T;!�{�+O Na�y�S�1w�t諞4��t-�� ��8E����	 (-r�[�5��u���ՄZ�C^��0Q��Zfqg���n�m�1�"�,���J�~�=�j�N�jcY����86�9���R`C_��<�Zy �-�F��B˪.]|c�q��؈����H����mL��M���M}W��������]���pK�u�q��\: �c�f��Y�]�d���}T��ʂ��;B55�8�'���V��4BX�z��9�	�l���?�X�}6&Bm�:�X�b��='��V۲��g��Qf��+�*@_�g�[ɹ$�q3#uިT��=ؠ�K��.~�ET�� �gܥ�Wꪵ�->� �@�� ��)t����O�W��06�֢a�,���儍fh�	��AV$�J��vQ�|�YR(��	?���0�o3DJ������J乾���1'p�ZBvkU��]d��G�]��뇶�6�3�,�F�b�ά˫�)�!8mB5:IM��{*����t�qʐ���*�x�9'�,D�g|�Z5��ҡ�7"��Ҫ�c�T�5ǉ~��S��;�m��@E���/�zH'0J���ͬ+@`���]"ָɸ����R�v�p�2��}6����K��p������َ�ާ�����	)T>FL�dE�5S��4�9 }�����R��r'$�I�I;I���{�X���q
E�B_��}�3u�����:����-�Xp�"�$���t��W�\.v�_~��	�$��`��7��^������>v�k���S�K���2�C�
:�Zፀ|Y�52���m6}���7�����C�wCr˧�Y�@2(d�?�{.�U$Ҏ�,I�$ܽ�n?q��{�/��J;h�_��W�4�r9Wޙ�|�t��8%j������R�<+ ���!�`&3T�!�=�jF��s�1��{�}�^�o�x4�#
�*R^��e�Ꙏ@H�w�#<eoF��ע�)��S毂����ݮx�P�1�C�|z�,c2���}�� ��P�o��_fԞؒ1�;Ry���Kl�b�?x�P�>q(GV+��_��Ky�)�Q,��*^N�-X�G��[���9�?[;��.��P�2n��}�lr.���Ӻ�!`4=�:�Q7Q+�~�����;=/����~�7�d#id
��,]�����x�|���'W3����	�ك�UH���亂6s�-����������	�@��§$����f>{���t#����O�C@�o��G��6t�a�&G��s���g�'����h������|�h�pر˸�9c���)�����M\�:�Z���1�K������[!�vn�[�YɇN�S*�s��g������y���Ul.��mu�e�D9³ם���<�U��AJ�NG�af���ZM��*mW���]�������g=�7ƝG0]�X��X����ٜ�I�����p���Y���@�����#0�b�th��[Zo���/��h�Ͼ>���
�ׂ�G!��k��+������~�\�{`_����\;��7+A�8!���͐)M�� Z�PP¨��t��H��N�`r��U�̰��X`#�aؒ)c>q�g�L��Qsa" {�W]���n�	��4��i��t28��A{����o�o!A�W�`'݈�D=�T�B<���p����y�0.V���A>Ͼb��o�t図)[S���4)Κ
_������9ط��<d
1�T<!�J�c��Q�M>���:|�'�ǘkX4���S��.)� @��;H�����ܬbnTzp)�m�)���J��En�#ˠ&Ұ�DI�Y�-H@H\׈��|P �9
�R��@�s��N_M�p6����8�m
�/:כ���D��N��$XRCØP��j�����>��n�[��Ծ�C|��j?hT���;3_�@��3р�4���c5�SAX�V������A��:����"ãY�FI/u����S,	xz4dF	3��1��Vo~��4�G=�WH��\�$���*� "Kj������6���$�JC�տ��%��%��T��j]���ɂ��n^�a��5a�?����S���G�;�)�[i�n ,��o������5������f �{ך�	��]s����������y�,%�P�J�[�!�� ��Yrj�_�hoX�᭨�MW�w#�$yc���G�.;�1%H�&���렉%rɩ�&W��t��20$����F���Vl�W���.5u��S+�"Bk�O����P��*ֿ�\���N,vj� ��v���?�/�j�60������~�v_�/3';
e�<�!�`j�1����"{+�퇩����M�(/�18��q�%��x�s�㹻s�%�ܖ�Jev�Gd�`�V�l�Z�0_\��a������}����o��G��BCxi$��[���&�cOz����U�}����7����B��`$-��'����� ��l�~jh}5��?[M/�e��I��/t��.kw.{Km����8��j������Ik�ɐ)#���*1���I������N�[�<���$�s�#�E>�Y�*8g�6��V%��b�l
E�������XO(
��,1��S�ڋ��u��d�\k��k,�׳���y_�7�s���E{�
�Ő��{3����L���z6Ɍ�c۽�D@�Q��4+;O^9����;��c��'΃�'�T%S��u��ݳv~�<ԡ֫n����s0;f�v��!����]M:�'D�>���Rpm w�i�D5��1 �-g�Ȯ��9��������:�����Tv�2z��w�Cb*3�B�si�����Z��5YI ��l�k���T+�D��>f�.B\��M�Tt��t5��w�7��RJ�1��տ�����ۦ���z�
���+����]J���UP��p���>gl��~�ω��X���xM�:���6#�Ȼ���B��A��8P�E��H�+�.�Y��R��ߤD)�#_�Աh&�Ƒ��m�4�u;��&�Bo���?uT@����ҿ��I�������a|�Na���a���>��=�z�����A�y�E�5��j�͡΂��������T�E��	��i2)��H��@����ԕ�-2Q�I�B�
{�S�h�WUu=���֡�]X2Fv#�1���=�^�"��/���$�Ҁ������2�b�!�:h��|m�ƹ?���f�_����*Z��5�zݬ3`R�<�
��O�^��Zv./���*nEo�i��[��@f���_1\͌R()�K������G8��nIZ�bD���jX
���
�J������?ѓ�1�u����X�^o��56�q�T�R��W_�v�0�UDnnpR�_cڢ2�4�m��%/}�
-�W������.#����d7y�&^��3n��Y�Ǹer^K�@Lv�!f[eH�Ժ�D�l��E�����@���+.�P�l��*�o~�w������EH�U& �{Q��s������W�jd����`�vaSW����9�k#\܄�0w<�������N���$q���9��j��%�9W8X|�+9�'�ă�0��ƕ"I>��9��
�y�|p�k�5e�ba��bz�J3������4&���m@������v� $t^�<X�}��m;�p`k�۲�:�~u�ɊM�SZ� �n]��g ��>H)ҥ�k��"�6I��sn	t）��O�n���YF]���j!����}9�5��{`���b@��?%>x�Xܐ���1�����E��;�9���V�%�Y�1L�ŝ�����ڦW�R�*�]�ͣѤW���'3ј��D|�Z���p%��}�z8гMjn�$,tq0j��» 񻟝�CY	o��f�4�D9Z=|����œ"�z'e���2��ȋR��g�iC-���-��)�<ٯ��H8�;�?R`~�]�u�i�GL�.�w"8��Ë&����b�1��a������?6��Ɇ7#�򆒅/n�	jfv�َ"��H`��[m��Z���)r.��Y=b�(5\w�kr̽u�K�e"+C$�)y&s���!�:����g'�;�sS �jI��NaJ!��+YlD���b�x��sQ���v�7���>��'v�S�g�Y72� �d��z=XJ̙�e�ۣ��ʾJ�DSqA���Z�u¸�����;����Bܚ���ˍ��L��S%$�h`Z^���9��?�9�I���1�_��Ny�ߕ�f�[����Ba	6�>���DpS$�$v��igl�f�ҝp}�b���'8'���f�B�W��5Q9������cY��6չ> /Tۥ���	\���J[�jh7^���K�{�
 �	�}e@��5٤1�nL���k��āS΃�/N�CE���s��0$������ ����(ҵ��?��2�Z��OP��PF�NJ?
�s�2����fE~x荲�Y#5�F����Y�"�'��O#ۄђ�Tu�����^���#%�<���ǋ)��{m_���I�ϒx�c+04cvZ�h�R���� ��a�� ���GB%[��&u�Hls<H�������u@ec�N�Α)�)�ķ8���i~p��Z�*��H�XK�6 j,Cc־��dF�;�N�C/���x\�3�l�^��~�P(N;��W���|V�2_�i�Ҳ��������t��K��ſz����M���-�Ub��1٠�%�;ק�\StaHW�t���;��N)�M�U�لф��+ٝaTY��^��@��Qy�4qP��F�a_�)�ۯ�|�;�usR�p��`�OOW���g0Ye��.Z�l�|@��j���K1���x��������.i	���Яqz�����a'V���j$U4�iσ��O) S�Bڰ������Zݕѣ���S�"�3�ķ-��\��D�4!��Qm�U+4��a���_T�_��L_�'���씓���S�6il�%IǫwK�94®Rq�f�.��_b��:�6�S�ԕ�t w��7�wcJ#��l�ګ=��7g|���;���-���;��lj?�d�'{�.�O.o�����C�}�i.����%�t�7�q�F˭׆�m�p�Ľ4h���G�P�����Z}�yx�  ���~=)g<�!��O�]<`�~n"�
��@�R��w z�g���aQ6����{�B驥i)RtJ�60��;��v�͔�y����F���W���|>Ӏ�ԙ�X
�h���nl���]^ځN">�[��֘��ָ��$�ԉTzT�펠8���z}��=^D�Vk���YU���ǐ���c���ͬ�b�؅p�|�=[�6��$�9�aT��.|�a>�$|�4p����K(�|4Y&�>l{b��G�QC#��y�oESP>�@'޼Jˀ
9u�SS��{j^b��T?�Kk��,�1y5�1b��f�v�e��+<j���:#+nM�Q�%�׈���][��D��7�5<�����ncQ���H�8�'�2������5¯; ��ll��ݗ��}t)Ũ���ř[9M�w[',<�F���D���,��}ˡ���83:@7l}�d��zz�\�2���A:����-Q=st���C��Z+cn�-1$6P,�"�jhrX-8і�bWy�Xx&���l�j� A����ޓ(�����­�)*��cf��2w熞	�����ߨ&��� R��0�S��GF����8A\Uq�G�"_����vt�zCvt�r%��c����J�[R���'�xѦ�r��V�;����[�}������9Q¦�z�U�m��T�G@�W�|��gw�$(��g�&�q���ql��Y% k), yQ�~%c!Y�klR�w&۩1�/���IL6sޥ��=V��������\��3���v�<����%�v4�>9�X���0���#�7(���(���Z�AB���E
|$�Մr�kP�I��%��j��{������g�I�N�E4�P;��6��*}���+a<��,W�Vl;x��L��Ĉ0h$��:k���y���'���͏=yE�</��%z�ϋ!@)�q�L���y��!E�,6��мF$"�Pw��=Sa���`�:��B�d��i����$�[T-�Ml�ǥѭeh��2��ֈ�sR���hq�\F��p6g�:Ńm�lh6v��U��&Y����a���|����%k�)��{�q@�_��Sɋ��%�ab�� Ӓ6\����p�Y�!3��i�������
Å�Bo���ݕ�ȴ�g��������R��9I�fZ��T�,������ �����{C@&���N��ƿ�k�A��2�!J@��%t��v��'�j�p8C��L�+���g�ט�ءᾆ��q����Z�i*X0)�����Jl���k�����Q�n�6���c �X���7���-s��p螖ł�n��\�Z�7$�$��h�Ir�Z��4������;̵�%Q݁Z��WS��2����b���$:d�ʇדUK >gyo��78^����#k������8K�敀�{}i�c�r���ɕ/�u�͎��qB�0�+;����c�ƺa!v��Ʀ��������(������\�*���$G�]N�wk-���g���'�+/���W���Vc�1�����I�R��F���Aܠ���q�;�ؖ�O�G��Zζ�*�V����Prh=g�͢9�M�\Ğ)(m���V���a^j�c���"�� ��幄�������gϓȦǺ΂#���y�$���ri��6�EK_G
��YL��r���&�|�C�L̃��A)�>�x����J;0�W)~Z	��}�&���+߁�Jg��M�|��Z��S�E<��޶RcQb�A(K�y���g��Ħ�x���Je���s��r"�M�/�E��m!4ݪHek�&�J,�m�p�R$c�H�wJ���Sg"�H ;��_`�J�z�-\�H1:�uZ���s���݌O�%�_1(P��n����y �:�{.� �	���p��}���t�˳5�	~88_�-��/��@w���hOy1��d���:��B	q���gݸ�]�-~ހ����/񿀖��+w��w�'��c�I�B�膆0&�rt[
.1ɳtw�5��p�tG��J��.Rnsh��m�[�QT��q6{�=%n�g��鮆�"���]Bg7��6�����1z��#Co����=wP��R�*�
�ˀ��O��xh��(4rK�/N�2k$�S�g�:_&���ГHq�lF<GDMǳ��
Ha�-����
���=7Z���g�Gs����BT6%ǲ��Y���h%���;ؐ�SE�ك�t�B3�{5x�>�{/B�w���i��l:TF���՟��b�>�+�.8��F^��wp��\����^��=���_CH})7��km� k����=U�9T�d���b�U\��r�s?�9��e0���z���I�`x؇U!jk�⑭�2U�ӟf�M]� .wk�&_��;b۔u��;HO�6u��eᑰ�̼��+��`m��{�]Z�� �X���1|�I��t�WRǥ��v�-�c�$�Y��PWig@�UL;��|�ƢkD^�̓��B�����g~7J�w%f!1~�xX�����/"�<��yVP�����@�h�'IU�oE�������O�8�]��:E,���&c�o��hҪ�I`SV��8�%�Ͱ.�&	]�2�Z$��������_[�:��vq�c7�H6k�cZ�bˤ+(��*)�_y:���}�)KU���9�GI�h�nu;��;ɀ�M˹۰����|��Y�ˆ��a�LKB+�*A'��m�mgj��W'I��?�s�k�;��rѤu�cޤ�^�!(����S8�ܮp�Z�<D���nv��9��c�ڳxэ�Ŭ��_i)��{��W�̆�q#�Ό�r��T�..��XIG/`�-S�w(�w�<��H0G���e\zB |��AN4$z(�=��5��$�q��(,4�����ױ:�C�8��@�&qQ\�^j)�hw�J���f ޢ�w'U�D�����<h�E��-�A�9ѧ,�i�{�/g���kc�*P^�I�>5��:�F�'CĄ<�(�,_w�K"WTk���{e�a�O�~�nc�O��o�����z�~��]u-3��5�/)qO�ĥ��ٺ��['��6�r�;�R��C���0��[��u�,Q'���3���Krմ���Ϲk��G]$���	��La�� �E2���B�M���e/4V�	�����RͰp�;�#��s%�S��)�8H���tP��_/�2���w��n�f,3ţ��U(�X�}s{�!R�WZ�
�Ni3+���o��_��p�/t�e���91D_������+
 ���Ө6Ƃ�\�2X��<pEl�.PS��� ��k1y̥����34#i%�����h����j�f�5=B$��贴o����mI��y\Z��߈G�h0s��
+IAb�\��>���jpA$��5���	L�1�RfH�@-�/��\8þ��y�Y�-����;�8�Lvz�5ʍ�a%�?z�����~��X1��d���]�K�Q���Ÿ@K��5�+����n�� ������1��X/����P�B�|�>�@�E����֍�I� $J��s?Wt�7��;�,�a(�]�����B���T��̉x��ǋE 1�]�$�d�����X�􅥐oz��唙��&sbu��U�n��b[L<yӧ���.Z�(E�%))�^΀����j�tG����;�j��V4S�=چ�^��+p4).����.�|���z�"1X��T�g|�Q1#�i����3��py
���	�����CA�� �EE�l^j�.:�E4-��}��3�8�1�f'�TB�ًu�)I?|���x�Q_l|��x�����h���r���p�E�{�Lx�<�=��_�h�:��)a��j���i��Wu�_S]��㴑磋q�[�Iz�rG�aU�t�?��}��9��S&�ٚ�YvR�+�]L�-W�"�.0()������h�E͛�p�ʡ�{��C�xկ�:2��%�/�B��"����h���*CK��@�]��,�U�R��Ʀ@��l{�����B=h��W�����V�;E
�s���}�M�il��y�{�j4�{�Wx��I�0�+UH��y�zv���L�=c��ViM�xF��0���f;�-�E�rH���!���=��@��E9�5��ɛ��uQ�t	�+_;��S�M�;݊�r�] ɢtjK�M�����"�V7y�*��5�W`e+*C��7M!U�܀J������Dd6��^z˓S	�_V��8fp&�4~>Յ,�.9S�
�ϻ$Q90���eK`؆3�L$���a�Yp�a��jZ2��.?�v�a�J�#�]����Y�x\$�ʷ����LI�F�a㳱=�bDT Reg�i�Ux��[�O��� RC 7�q ��
>�H��#ѷ�)y7;�����\S8A�����k��{6Y0��)�ڃ��r��l����)��.ߐV (��h&�wO(�M��:M�t'e:�V*萩�.M~M.t_�;��g��&�5���z��w��z]S����}�>;֦fr��/���`����L7�5�?��o�"�� ��Ht����q'��u(����9��#��mr�U�0 �p>K��꭯��'��GLiL�\�Q�F�� 9�8��s��l�%�J{�~p�ѹ�q�&P�S��UXW5�=P��c���u���G����Qi~�����!��8a=��/힚�/�}9����qC�t��:N)���(ac�~�F���n.�Y=ټ	hD�⺵HM���w5tS�~p�P3�B:/���%��5�W��n2.����bg B�]ޛ�����3����+�W����hbQ?3y��`��IIп�^G���Ֆx8��N"��S��"޽��P[�W�i�v_��J��&�>a�Kv������ل�e�{-畫aݭ�n���b*��4��$'UC ���i[��ӭ^�#�ߗ�U��Gd@s��2�ROn	ڴ�왲vt����G���J��za�@u��[�w�ZjTH˅��3��y5����i�7�N?��g�W� 	{jR�q�r��ظ}�}+@�?���\MY�m����Ncs�6�[��5x��	W2��$M��k,�4t�{���=�Χ��	���������P�MŴ�!�S�Eeno�K�������� �hx��8.��9�""�7��8u��3f4���탟�;�m8ы�����'$$c���HdT=փ�~�a �� �Z���*U�Z�64��&Jz��5{���mب3)`^��׍/Jݣ�a���+ �g�F�9���Q�4<�[Y�� ФC�H��P^�dpJZ���K^����,d�����`�s% C�s�a���ԢM��uk�{����#�Nn�Z�1-<?��)���r"�(�Dnq��]H�;�
�Ou�2�Q�cn���P��HhX�Vſ�#D��k�������р	F�o1���w�yb��a��࿉f�������%\��I�hUg���<�L?w���M��lt�-��h���R�W�ՙ��\1�5/�$�vlh���������$��t�LE���7�!5���ۿ�'|�Y��̨B�����P({5tYP���+n��T�Yޢ����}�yiw����AGw�b�l����w|Є��HҞ���P�KI��>��>!M�t��B�ё� ���{x֒�:��\dY�e������� tܳ�U���䏯pѫ\�V����X�������0,������a" �1C4��U��usw���d#��E>�H�2 �Nkd���ջ)�}N��phR�۠�^���:���On�/���}��S��ٵ� �{���ߙ��j�&��'��MrUPOh
�^}k�i�/p�p>
 �#4��ƈ��H�D�*��{�h�p�3�O	��W�?�Ùg��d�������`����3�����щ�<VP|���I��~���X4��p�"̄�bS�I]�8��$	�����l�.=ˏ+�m�7{FP�א�鄴���R��/��?�y}��M�b��e{X�Ƈ���d����gUW�dҹ
�A�3D��3�3�/���tI_q�-�ח!��jA�����eXH[���.5C���5�v��\�K�O�uTgR�K����S��x�7�ٓ-��(c���2Ԧ�E+S"�R��U�i�t�%7�@��}������ޖrDz{�+[�|��3����?]����|E������
i��r���~�
�f������J�}�E[O��ȑ�,�1Y(��.�3�%P7�H++=le���Ӏ��	��B_��ޤa|��m�T#�w-�~��p]��E�~x��Q����!�
~����9w�ۤ��ӗ(tig ��`�c��f�!�l��T��V�iA���Ú�*����.����7y����z����e� �v_$t�=��f���I�m��������M	����
�H��nc�B�	�q�˲�(Hg���&��(��z����,v����{2�jೳz�9�xL��Y�%=��=`�i{tcy�ϻ���!q�9ȇ?��I�t@�Q�pL�P���xȯU���*:tL���14V
�35[Dv,g�N�pre�7b���4�*�i M�%a���걣���d̈́�Q�Os���8���m)�H���Si�	��~���5�6����<�k��)zitD�%��������¼n|��![U@J�]yOE@ /�=Bfʂ$�TG���x~��)<̲Z������1�u�5��·���ђ�6O��L��vw" Ӄ=��I�w�sRnQe+��B$��6���I��^��� ���6��=��ؼtܭ:��;�vr��mF��K�нŵ�#K��2a	�iD�N�t��{N��E+���*��[���kp�^��������jé:�J�z�O�g�v�Q������
�G:Ϧ�&�o��t�S(��`���7V�bg(�汋�EgNdP�?�
�R���~�^�t��S��aƣ�R��Yŵk���A�Gu��PL�b�6���Y4�iVӳ�ѽ�#e[�?�#���hf��L���o�m������ʆ!j�"���d~�2��2�e����$�.n#�줃l����k69�^�ۜ|
Ǹ�o	�2��ܨ������j�����Π�PB_W J!K�GE���=�;JfVTF�ʟ�M�E�#�/�Ҏ: ��:F�Z���$���3�wN���*�0jX9����;wn���iOl+�Хx
����s2?���93�֗}�wX@�8��p�8]�
�*��I�gAu�����/3��qT4����b�㔇Û�,�ع�,A�In�~W��W�Կ>�Y�y�ۀ�f����I����N`�0�Cen��@���3r�	�gP/f�笢Z�����X�_cd�xk��t���	��?�ni�P#���*�H�6��T�)o�ض�?�\�d}��t�w������?��(��eT^ �t[�s���4��p'6�-^�v��'3�V�7�|޶�1̏n%��H�Cɇ �*B��jL2n����������)��z>�����BR�.��7�8���N:�' �$Y�����P�)I�b�-y
)�[祯M
n �y>89ik�!��`��cLY��,�|1N��d���m��4�G�����ځ���I���Ԫ�7�����i�W]jm�~�V H��I�E��q�̼eJ�C�ӝ�*y�^�Ɗ�y���o`�Ma�,�W���GZ�A?�5��Y�D��%���7�Q%$S���M��̛{��6�
�"uМqZ�D���!lm�L����'R�2Wt�'|/t���ߋDщ�ӊ^���?�&Ԙݻ��dj�*�l9U�2k�����F�1�@[~ӏ��HMOQ����fC?=��Q/s����r��/��[F�m���k�������hԖ��]�o�Tlv|���#`[�̽EWu
����`�F]x�n��) ��)HpW�f6Bҁ ��m�C�]�23� �<$��Z����   n�\mV��'�ld/`Hj���B�rG���x�?,�	 ���1U����੖��W�,ƴH�P|~W�A�4[����q�2����u0s�>����V���tَ()�  �A�AM�Amh�L ���S��\�����8��!Cv�U�����|����ѿX��ц�rT0D~�Z
�3?�Roxzr��	�N�̤�?�,Ƕl�檟�e���W8�0F1ܙ��d?��G�G��4=I������_w7�[�+C
��|���>��{��d^MI��Ӽ��.s���$�D�.4)r.��e��T� ؝����eҠe5�.D
*B嬩�Υ-�R9�����V�юFHڟ�e cv]���"���df�e��rT�k���ц�bL� &H�E�c����(""w9/Dϡ�~:����s��d{w�a�Âr����[O���������X ��M�sI�iȡ���2�.�!�;t��õ�6��+�S�13�b�Ϟ��Q�6R����>�
-b\�@�в/@����cV.�pag�L���(�`�z"V%�V����o��?|�'�%Y�q��@��M��J�>��1�
h�ϼ�_ �-�n�,h4�R]�|<ܫK���x�tg(�	nE����ֽ�dєJ��&Dޭ$��p�oT߁�]V�@nT�^�ԝ��O��T5�4�l�����Σ_ߝ�d��+�C���w�L�]{���@`}���a�� ���3��8��N1�gj�5�/�����Ѹ�pkR��O&��X{�`�'��v�c�����n�z^��0�d�o�=��eE�Xl����c���M�Z�j�p�q=r7����iY��P��~T�1D*̤r�W���YSo%g[�C��.EB���Bf��.��@�S��в;�gF��������u�2�Q�k6��)�[�%� ��$�0����	���_��Q������K��)m�`u����t]0�y`׽=�{ .��s�
ɍ���.�7	�T/wo!��'�!>%s:�Vn=�k�F�<tU} ٝ,֑��Gm��[�U��d������M1� ���CD�\o�\Q縛{�w��^h�.K��K�b�8cG�
�I�*�\p�1�\r4�h��4+'B B:׻Aޓ���Y�s�5��4�a�x������%A�	���[VEz��b�r�{����x�)�x'�]4��(G���@lǮ��:��~/Gx���7)�����qH��4+�R�e3@r��=�^ۻ�3+�5틅�}T����n;��_��3ۗ�=��h�V�Z|���*,/�T���.�-\������oc�bPP�PbX\���-��� xl�A�d��B�K��ѡ�}`�з�!0�k1.�}2h=>R��t?�,�+�DYr�6������L	�F�*�G�؇����y����E��!ɞ�ӡ�x�s��f<s{���KV��NF�],RV�H_��j�ΓL�#&nS:��Et�
a�HR���Nڵ���P�����m��>c����+���l8�o̕���O@:��p�����[�C��j�4�M�XV�ܟt������¦�ߦ������n_�m����;����E~L"�g�+�oc��a��U'T����~̡y����G䚃�ّ�a��o��F'ٕ<�������<^���Ӄ�B�m�C��������)h��:6�H2��ӛ�e!n.w"	t�H�(�u#���*"����2t�hv;�"�g�	'�|�[��K��Չ�ĩ���+1w��pȳz�x��ߏT�{�%L=92�Q"��-vn:�l::�����xT��ؙWn>�B�\���w�C����B\�#�ڶ��+v qח1�Cyv�kS�;��؇��c��l�j��7;\g3$�4���#s�!v�5�P�$�ڨ���U�u%C|�.�׷��8��|���z��rS�D�7��E��Ǳ�������g�t��OC�&�XV��v&Ы{gyF���L[�U�n�����Ò�a�;�(&r4K��m�ʿ-�L���S�/��F\2�f�6���ԑZ�''dB)�v$��6��<�3��)n6@rN<�G�1��櫎��T�Fm�m]e�ݷ��:�'*�oNF�3�	����do��f����[ETF3�}�n�_C�W��0+1�!�5!z%���$L�G���/�&�'�A����SN��U�|_���a{,�K�:������	�i�<@�8x�F�E�����*B(����'@��ļ��Zג�є��9�ǐ-ؼ���-(9ۢVXT�g���hR�S?��9��y0�^�$n��X���(��7j�-��K<g;���so�rK!�-�|2��s���x��Xjڙ�&���$$���֗�-�y����o?V�bb���HF��-<8��`�y�摃�O)�Hb_��9z�Q�Ͼ����#n�����,����(/eQ�sz`��6��Q�������q��M�����M�0r���U�A$Yy� pt��a��h�X8������x΋j.|r�\n�k�����I�Lw�4<��vi��X�Є
c����s!�4<���箑�(DA��w5�}�7'�b^t�4ʒ�;N,ʿ�ٔR>)i���B6��s'QiY�F��l���<;n�&r�,���uq���*+V�C�R��P/��0&7
0v6J��ff��&X��%�����?��%�Y�g��L�t�����Fh�:, N��h��|f�0V8Xp.<K���	a��kF��3��Mq>�
�$E�
�9f��"F>�.q�B8�L	���%k	͸F�K�Rr�*
���,��T]a�-T�+�%�Kz8k�7�������39C��^ȟ��e�L� ���«��G����_�ˇlD٭�Nل2	�t�7�0$B�����S�s��������*���K�=����Uw���C٩������ �J�F����_��.V�.WM|ң�h���C�>Ǘ��X�U/f��O^T��=V�x����x�'K�a���O݋g������b]��E�o;"ĉ�)�7�v�y��b�%��H���^?�SΌ�5��C�>�h?Ȗ��b��W<l��u��Yƹ�Ov ��!��
7@5�v�2Ha6����y�fl~(i��KW'�B�8�hg��l�N�g��r�%�	:�m �ͲR-x�*����X�ƽ3��:�^�����5�u��N&�T�����`o�m3��4�A�b�*Y|�vBc�j-
���9n�?�L	F�>v��B7<Vͯ:2ً?�3,٠r�������+�������z���H׽�2�Xe`ͣ�8$o�4 g�Կ�J�����r�Zˉ��Ȱ"*G׸�F�U�?�=B���d�E��\ܶ	�'k�(2q���~�RW���c�b�k�c����L�A�
�>����	 ���TY��t�`�s;$�H��54��Fr���
?�4XA�A46�f
��u6㤥����`A�X�+k�p���l�����5:�/����Ζ��w�W�Pl���=D�Php5��{��nNܡՇ܀R�}-m����m_�jPv@�)m�'������3x��y�:S�Y�+.!S���!�z"�qE�乮���γ�����Bz�,�����0�H��+!��/�97�?���Ֆ�\A�������t��E.&V����{Zѷ-�^Թ�.��Yte�Mj$M��K��n(PI�(��`�6tC�9��
�����-��L�,�l⛆���K�I�fz� �Y47ml���E�^C�p�VI�d�����!cZN����ke���w���	Xiy�m��_�v��p�4$������1mM���ir�x?��%AXu���#�	G���(��ݸ߂-�h��	A%,l;-D��1����1�P��O����b?ȑ�+�W�G�ԱÇ����tQ��~����c��	��\*����@��f[�U����!�g[��FI�����{E�	�v 4��e#�Ћ����.M�=��`h�~)БhCa�̎�ї ^�uq��!Ocw�4��C�/�X�E��Z?��ٛR �M�t��rޡv�#��7�e#����8�����d�.+n�*VI����\�Q~�l��|:�=��bQ_�������J*��!�$����e���˴a��GW�
Խ�r���@�Wtt��װ�!.�f?�S��)�F���*m��,����+�q��x0Q:�Z|����v�>����r���^*u�u�7�����zw�3�n��lj���S�}p���`�q:��ȧ5�:���)�$㟤`O6����~Vg?5Hq߃6�EWjC=(oѩ�s��@��E�1R���p��N-��bn�P�E�@��R�j�p�(cf���bSr����(�;H��E\O>V�̶ִN��b�B3NO�_!�߅m�9F���S��˫��\2H��9�0Zg!8����/}���
��q~�(�N�<*f,6�.�H곏zx����P��-��1��u���@�H�WI�^EI�=�>������$h�1ݽ��(��;� }�H�0�~��tS�����ѷ@�f�	�{Iڳff٪�)����JO���;��4)Y%dx5�i��(9x�L$"���6��̘�'YC��]?������ �5&�F�P<�nӺ	QZy+�������b��Q�Y!�lo���{OXu1��},��0���{#c��Ӵ�}�������ѽ��1uZI�ѐ|�z����D�����x��鴑~�0�q��i�cZ �lkB�w{:�,C ��e����cH�u�:��!�`F75�s��#>�]���g)df�:EH63�X�=,�͟	�W���!��8l�,�ߝy/8�����kpB�a�F� �V�p�b�%VB�mǽ��UuwU�.���͏�l�����4�K�O?5
��IЛ(��JN5L8�[Z^ �0�EQ	^ȏ��Bm�k��	� E��A���tO��"a���eq]�U1ӷkk��32���?��r�kAj��a!��8Zh�@��[ԞN�*������Gм���>�U��^����8{�Xڐ�s��eY�с�k>��\�*[+&o����v�gr��m!��gmu����tw
�()Ur�N�
��m���'\E�S�4ۥ��P)�bg���4�ѻA��r��N��~L�G\�#fn占�bĝ��;��@)7�@��V-oP��E�6�7^ M+۳�ulwϼw![(�]ѕyB3m�&o�@�]#!Ór[��%x\i�LF׺����>���&����ya��(��0~=��"���-l`�{�+�������ӵH���hL��>x�t$����f��W%�O-`��R`�po`ף���@�A�'�7�j;@=M`����7�ɔO���'A<a��gEPO�^���n؂(�E�3���HǰW��X���x�,+4X�hba��������X��=6����3�l�0�(y s�㛤h�7V���ng��d$7��3�9��\�̻�1 ��ǿ%/���F`��-���F����aW �=�u�@a�R�k���l<af���k����9ҥ����C�*���D�g���㟝r��-�嫲��z�Wz5�<�loO���MZD�����1мV�⎨�0v��Z]��>��� ���}���fm�P���.�8 �Q��xz91���MNu���ܕ���]]�\������i���Gg���Zc�Q� Ӡ����e�v�?D�s�n���55W�d���̿����,��r�F��v��wQ��?�����T���Z2T����)F��ӹ��x�F�-[B�f3W%i��
��h��>�J�d�'qP>|B��Q�7�2��'�H�4��uƚ�4��i�rC�2_�r�|�NXܒ̬�fY�`(�*R�ɸT��q�0���¤�.}�ኝ���%ex�!����Hn/�Z®tV��_I
�+���Ix���؛x�n����tȶ��=�)Vf�5\�&5F�
5L�C_�8��ݐ0Ƒ#�>��.>l���ۡ�e�1h�y��W�%�E]�ht>ύDY	f��=���:�'�� �3}�/���UF�9���.������5oP�2��/�~f��G�J���m�J�m?4g�4�Aܩm��j`Ew�s�r�{��L��a��m��]B\����s�A+��y�6��y�O7š���Ӽ��� 1��t�h��޳���a��*t��\YYX4����'�<�L^���⹬i%�.I "��,���ZZȧ(�	�#	��
����ǃGՃ-_��Iʲ�t[OHA�v¢�D�L��+A�R�Ha�|U����2�L%�x�!��o��d�,!�	}K��d�M�ޗ�=��D�W��&l�ߢ��JcO���������^�sVݭ�X?(#A\�Q(�h8ͻD_�Kɧ�i��8,���_����j�<~h8	�"���"��$Z�|u��{��x����['1�������W��Fi�M�JMR�Pҍ�:��'���f��挲\�����DJZ'	&5K`�rWj����g���J��Z�@;��/<]K�D��p..b�A������2="9�=I��翱�Ggtp*1ྂ9�o�'S�O{���s���bFn�W4�xJAay���3��8�AD=��H��$��Epg?1l���H��.����8�����롃�DV>����'?�����ܩ���
g�ӻh���7�$���G5A�f�����a��'�!e�UkJ�#_7b�G+	BW��`�>���,8�#�����{�}v��Tn�vv4���ut�!�ܞ�L�,[�m�%��6>�,b�@��x� 1����w�X$x"�	�!L�z��4*H5C~G�p�ޔ"����q?斕ʸ�@�������uΧ�HU��K�޽]<�<jHp�g`t(Ѳ��K��眓y��Ֆ�]x��qƺ��������v��lʰ��&�Mi<�VI�Z� ��O"`-�X�r��v�6��fb �TU�q1|`���p7}�����X3�1M�Q��M����L!��f��l�Fu��� >��lf�М&��L���%=䷎ٱ�t�~{�h'b\�����\duͼ��5���ޚx����x7A����B�b���iI��m��w0��&��Ccy.���: [��
d):� zTo󽐫o 
�7O�o͑�S����Q��P�l.,�h�b�74�5�f�ܛ*=z��ѓF�?�C=+Ί����B�9ڗ�\-�|oc��kjD�Ʊ]UJo�>b�W�ac��[}��<^����vb(s6�i7��;Lx?�c���3d%���G��WD) &��e?�P2����V6�K��Ͳ�aS��-q�=����v�yPy8�>���h�K�[��iZ�â����O�� ��p�b:7H潘���!P"�l��lɾ��<�Y.s�;JhL�`V 2�ڌ*.F).Ib��SSX�S�����ꛯ��E��0����M�<i&3�s��C΄=�$e�4�"҇#��p�L��:�A(����P���s��H{ǤT�[Ѷ���
���I�I��9�������_%E�ަ����ⳒD��7�,��]�E�k�D��V�s��'�/�p2�Eu39���4@葴��]Z����N�D�:ҝ�cwg��U�Izĝ�l�%�%Z�ai�bs�������>N�}�7��u�/F�������l�M���s87J�}����7~_Aݵ�*Q|�t��b%�_?qDT�_��_F���۸p�P����l��u���'����p-�G2��Gî1�� m���W�����������J�2��Q.����� ���9�Y_~'aY�=v�8��R�Q�oR�my�K,�82f���O"����� ��΄}�����ۍVZ��c��"�&W��?�
�O	o6��oT�倛���s��A�c�a��� ��.�����'%�Q��㪈�����z���ܯH-+抟�l�+�<���@�����O�|���ab_���07����]�dͤl0䡂�J��ͤl���E�Bf��WHY^.���`�s�Yp�|󲺅�Ӭ�tb��R�p]-�Wќ;�s���s��Z\�B�}XǏ����������a�.b�6��m!�J�d}0�-�G��n X�ƫ�:0U�(33��+��� x�`�u�p�`�SoԱ8��C�%�Cbb����Եq*���Bg��N�ч�Ќ�1�֏���}����~��ɩ�J]�-1rL�]��
�_u+>5v�5��ޥo�O5
�.��'ET��h?���y���r���:�ʓ�t�RZ�۰��a�<�H�L̉3G�,�fd�f#zPh��$�R���zcCH�ʗίث��D@��c9N���
���]�݈�3	p�M�Pj.�>x���S���úbx�����A_	����w@*�s=#4�*{�5����s*�$�]�)+}������O�
F��^ � N�AJ��y�DY=��Ð�k��`U��<�k���ܾƾ��El(+��=�2*%���_z_Ia�ؽ��n�!1��`�ѳ�môniU-Fcc|���S#�@�wL?ȣ��T�(ڎ��'�JdP[�����/��r�ݓ���-����UbL������9%]������lp��]Rj08~b��<��z���������m��o�j'�^50E �S���G�H�����ODR3v��~~�y
�T ė�.�20E�>��K�K�bT^W�g�(��������R���5|� K77͋���X t���}'�a}�B,�B����[	��(^�z��0�b�Q� �Ȃޢ����X���A�w�$��U��-P���r3ł����\A&�]���&�ЙF���w�q�gE����Pr���L`�*��2ߖ~�t�Y�o��V�%!*S�{T/��\.a�B;k��.Vl��gѼ7�-�r��K��������y��'կ�o�)j����KqE�t# ���>�z	�k��ݕ�̸<N̫t�,��OC_���r��s��I1T�'8��2�����@����p���B%���J����\}��;Y�vF�]�5J]�tܰؐޢZ� �^�8Y�	�%�w��ٲ,p]d��[U��0���1��l�ٖf��]xz����}�Ҟ��h����n��6�;QΈ���@�Yn�������?W->����8B4lM�u���z�G�f�O��W
8���� r���&,�~��}i�V�,"���z ��#��f���+�|�S���w��q�v=�}���H�~�Y¦�'��̠�g<ەS��\W�?%\Ms���w�ER�d=�%nXi�mm!���Uc��/�D�N�CG�d�dL;��`�C�Y2�|�d�}V�H�l��X(g&�k6��P`x�j�$4�~����2���E���������J.nM�Gt��/r���OyB���}�I���(��Dy5Fʥ=Su�����ݔx��+[lC�/½�"��C�{��\\	���uj�|�⩰�	Mn=~���B m1
<$R�G����Sctk/�9Ymmr,o����J ��m¢��IFď''�ZL�nV��2Dʂ��"	+u�u�Kb-������$i����p1�4�k����L]}s#�v�A�G�'b�a��7������6i����)h�"8�7�K��X��W�1�	�U}Ǐ����J?5�B�{��+�h�J7�v7��>{: ��D��D�Tⰳ2�c�`iǑ������3:50���1c+�(�*s\�u� 7���E�r�()zX���7�|�yh5���q�c\�ѻ-�5"�irk#;s�o7p.�P���6ܰ?ߢw� +�~Kc�x�V���d^���� �sb�����.�g�V�s�D���	'c�j@0���G����ud޽  �6荊�%+H���4� ��L3����s�x�e� �
�]"�Rqr�
�;s��)P�M^�k�&��uņ�u�ⱊ�06�=�����R$'~�J�d�@	Û�=�d�sr��O)�x�҉�� �3�2�x�)�)mi��
V��	����P�/����� 0i�䦌Y�g/5�/���1'�< �۹h/�f'DB��bӅk)S��{��6K��iu�1i������y������L�S��-���7���-?1~X�(��,ehp�_<�([���p����3bH�E�22ÇȔ�Z=0���QW�c
@_*4���F��N};K򍜆(
�����b 2#�Sq�����+׷JF/��u7Z�0J�}��Y�?�������[yO�F��)򂪺&��:��-�������]rF��l�a�{���%daa4!lE^$�n��~��4<<��\x�[��s�u��+(9u�;	�Gn��y�o�q�C;ީ��	R4n�ϼ�j"�{�;E{ZU!��'	<^��H���d�/��T�w<HW�/��t�6�W��uh��Z�n���C��"���m�%�;�G�A O�߈��e�XDԛS��_5�+���ܿ���L̄Z*�(V��E�:� ȣ�*<��������K��]��Y�(�b��,Z@����fZ�Z��Ub�S��u�B�yy�>�6G��Ӣ|ݽi�s��w|"_�3Y�z{��F7�H˅U|Ȯ�^8S�0r
�nL���AE����Y�E�R�\�w�.2V "��M
i��AR�_)����%���=���UJ��Z2y-���,�ǠҌeM��6���-�
�(��U�Z���6Hلm��R<���X&��}/��8�R�h��&�B��X�1������'	�@���S$Q��y�~I{�7��!��q
�Ւ��l�y�LgNH�_YU�f�P�y!���.�Nv�����}��<0�	� ���&���($V���m��1@��֯
���d��mQ�����'��GJpE}N�R���H����A�z]�$���Q���qv'e��>d�F��<�~�n��YG���ߩ��1@����;�%��g�;��O@V��Rѳ�7�7��oz5i�kN1vr�4@��=l�8�ݡÃtҝI�O"�C��8mY�E�~�w�
��Ǎ0;������HVp
@v)Uz�\*�k�+
�?��8�>�L��l/U|X<��ul4����W��7w���^�Ț-�,�m�:h�6�gF�A�}��?})_ߒ��A�b�xY&5t��,q�u6��'�1��SbMpɋn���W�)}�K-���4gr�D�u����R/�M
�{I}(���|�ofNo����On�����!�gSC,顂�>(9��{�Ov��Y����D����Э[Z5�>���"?���~/�
���	��P�b���p����l���Uo�w5�df@^h߽ș!es .$�P����3l��zBG᜝,���	���~KW���L;�:4	�0�<m{���	���ٍ�C6��B
�E6@��jz��<5BJ�G��t�~B�N�^�:�������c��Y�-���Ƶ���$�H��ۢS��<�.��$���R����� W�j�A<��!��Z��b��MeQ����UZm1��/�M
�.Ѓ��{�urY��g_Z���B�5��Qѕ���R���*�	<f�<���{���t�v�S,\�Yz)��<��=ٱ�Dey<|Fn����\=�/Z�/���7�5*+e/���9]���'��;.Nc,d��g��'L�`�sP��,r�`�g�)CgXLJ{U��:޿$I_���c~\�^��+Gd��]�~�� ��˹6����Z]�����/-3��2�uhq]v������xΰ�5�#����}%m-A��4}3��K&� ߿�qǀ�����/U�0�f*�5�N��Mbs���Ih���\�?w��T7�H����lYI�'c��%4�QKf�
R��D�0�.܆�r��"[��4��"��A�
���5��!�	�\7E���D8؝�k�DJ��R��|�an��'"���^���tv�>͆�:Y�߲�j{l��̘�%�	/tk�N�DT��j"0�b?K�V�� ��/����럮GU��<���S̄�����&A�E�y�?��J=�cnX�鰍��Ew|���~��[2����ժ��/�� �ǭ�����1�:�},��F�=����3�%G��beg��j�.�m�]R��	x܊�X��V��S����~?u@ /�k>�q��D�s`�Wa p�_'���yh��C�[V�����«i%}�1l��b[����0R�!?�u��f3���!z*�յ �!e7��7b/�@*�������K�����Wgh�,��v����}�PN��Ѧ��ki�I����4o=�7�7�R+�s�Ҝ���x��-�}|l�q@�x�M@6�C�Q�{����"����KFw��p1�e*�T�c�\��T^�>n���w3H�]F�讔B��1U�XиK�`���l8�J�i���������)~qXn���D����P�T�Ki�q/+G)�y[%���n����.�/�)�v��M�.6R+p
���3��5���@�SzzӁ듦iю��T[��u�����l\4�wo��ڡ2��a�2�$�Zz�3
I7��}W��r[,*w͸�W7M\	�E�n��qc��
��b�=���I��7 +��i�w��J�-��srr�MHN�$�Wuq��"Wu}���5GI�C9dv6}c��e'j�8?&6�`�r�r ;��Ϛ.�:�x;{wS͎ϗ-��>��2u&F-�Rs 5��$�ߛ�a� �a��ں'U���*�9(r�Y�J�?!��	$�3��~v��zҶ�B�n�H���y��/��"��9D[�'_h�9Н��ST���Bo�cE�
X1��o- �0�bŚ���@��o�c,:|��Ư>-���cH-_n�kb���\��W��t�f�w��� g#��$ F�19�����(W����1nO��{�9Z�z�/�YA���fUE����v�
��-׽�@��B�}N�~~�������	��Ym�����f�7�~Gł{H5��"<�Ë�W9�;���`~�m?ku��`	�zY�ď��Q�.t:ߜ�r0i�✆�-"����4sHvG�Q+�X7M��r���8�JH�v�"М��];;>R���e&�n�0�e�.�f�	"�\�[da`��>⚐���3�ݧ>�z�����E���Q5E;d�'[$"�RU�y,��P��֋��ik�$�(�E�׳m{��Ҧz��nT�^X�zC�5��D��ci���+��ry��I7�,�G���Z�j�°�$�.�eת��c�YB����e�A/�V
�q7�̀i�,ܒ�Cڲ�嶿�.��5Ĥ�3��܃�4��V����1),\�wm��d�]�H%�U�LI�Ɇ�70����2K�:UMx[��I����_  e���^΄G�nN�C 8��n7����Rzeh��/&��������wp�=*ލB��4��3
.Yy���Y%��N�M�ϐ<�\��%�k�l��i�<��*"8�d�u�5xK/�8�Մ��Q��H�g ��<y��0:N�~|8�o�F�:���;�����n�4,�R1"���D�=4qt�`�&X�2��*jy�1����o�����B@HIa!�]��-w��l�>��U�7/t�)#������*H��)t	2� ՜�or���z���gy]�UK��s ���HV��cc��_�+V����hU�:�,ƿa��#�h�X��4��?E]ꐬ�"|R�HͰN�H�(�Y�x�����{������B'Y�M��=����7�q�g+��*<����=��6՗Ӓm;rU[3 o�t�i
c�~q#4q��R,'�B�n`�\�x�!���̴}��w��	xy�'L�57�|�ɐ?�>�_ƫ$����?��յ��"WQ{H*�����#��@N��h�)�7���X�1��S���]��@T�m��`��Z��Y�����IL&x�����������Rʅ�Ӟ�")(I'e�\@�d�eV����l��׹��ܯj��d�~�gE��z�:��`s�	67V�C\��=.��>1��G���yS�N�R6^:���%�oa��x8�U�a|LJ��W澗��Y�>����:sd�\F���/����M�]⋛��/��c�k����^��n���n��(j��#�h�c�#5)m���}�Vv���ݠ���㍟� �6��;*,���(��X%��%��R��xi��ag��,�zt?(����9	���BG|c3��[�N��yI��'������4g�{���C�����ؾV/e�^����������(:ߠ{4���̭DG�KK�#�C���\�x%�\��$�c�m@oc�����D)ް@Dgv����71B½��Mw�!E�tJ(�rv�mr��Zi�O�r�z��A�+��ܻb�EA�%9��k���Gq�Ӂ�`[q��Q��N�ُ�{�M�d���Ҥ�YT�%T�2 r����YT���0J��:�L��P~��~�G���/��x��h���R��5$�Z}\} ]�L�9z��+4UE/�+�!=`��gt��J �I�q�Q!�p���L��b��K�,����b��r��tY�<��"��y�gm6�(-����R\KI�}��Qas���'ծ�'V~�d���뷠*�E+w
�|du��8@Bn��_$y	$�}HJ]�`G/՗�tQ�L�uJ����a\�ӂB
Y�?Q�V��
��Ƙ��؋�-���+�Gx�¹2k�xf�;���R}ؚ!�)G�/����BĞJV˨���Lȴ[���ZHK���iY���zb7��ۂ���+�j��fj�s٥�tf�D/���3���vyĩ��Pk[�G�� ���J��5���s������A���D��BAJ���Fw�Ė��,��@��J�)E	�����0#��P	���o�Ư{�M�M�i ��*ԋ㊴�lWƍS)M��=�p�A��]3:]ek�h^1�ӫd�GAb�s��"��ڷ껣j�x/x9�[�c���sR��1� ʁ>���dy���==WI�X�/+jO��h5U�UY����z�x�{X|R ��y\�3v�dɒ.�q�#.B�b���G�h�h|�͂ɓ!tz���o��d��U��`�
d�v���ĞP�
�1�R}���G�lUI{xw)�yr�޷��TC�)A91���l�5��?6�O���E[7����C�L�.j4g�[B��9gA�2,�o����P��*�K&�|�̕u�7��t�T�Ku��TQ�Nм��Z�)M;6�9�*��e����bj,��uE{ @8߽ʘ�:I��T��IԧgM��D��R_������\��z�$�]d+J9�]�K�"�?.t����W��Bt^bi�����)v�"`�:=ը1%6�؋����:����M�cކe����J�&~�N](����5ه���������X���|�
��`@�Diq\϶�G��mտnR��Q�]`�1�����pT|�~�p�]�UON _��9�";�B|?=~�/T���p��5���1�М|�A��-���WL��>qG��r�!dv�uOfu$����a��A+�l^{��Dm�͹�����C�|B"9@[Dؙ�uTp�4��_B�/%q�2�}�{�~;_{�H4��o��f�!�����[2m��'�:�"����k����Uͩ�6!G�~44�om}�>������g-yljPs��^d[S�Ů�
\X����a�[_M�u��cU@�wި[0#�4w��kTDW4�#]�Rl���~����!������;���*�ɟ�0/v]�~��;�������Q��j��Rb��X��s**<�}P�4��K��	�C�jIy<�?��vr]d�����/vv��2$$�K�w�f�����[��N�>а��;����ZA˱A:���&	p��,�ר��Q�4[Cbc��I�,��f�+)91̈vV�e���u�����y�G�/��Da\p/���(R���2��DP�C��h���YX<����o-/;U?d��\m����R����}��lp����o%nL<���W�~�Y�`�!^����M'd����x��m�g5�)�����P^~B�z�����/vv�`[�f�����s���oK�S�ݚ��3ߤdf ����G�����9.,�3����<z�)���^���٩�96�S&=I����l��Ǣ@���a�y�w41��2�%5T�PĦ�I���y%G��qK�,�v�>;:�_�ϒUT��!k�qD�����b�S�O�"����(M��RQ��<��{�����#C��?�Y��~�	�m�,QO*��r"	��c�����n2�0Nd�_��9HdX��G�rw^d]� �9�����7�z\�k5��:��3I�^�R�%.]!���%���Wۅ�w<���1���)"�fe���$f���nY�#(fh�*D47_	�Kl�z]U!���WZEf�!�A��S��Q$�}���%�4�=�B�k��J��ꌭ�	H,Տ�R�;�6nQ��Q����q.����n���xc���s��UN�O�wu��ӊ�U)!(���ffTU�� q@A�?::&Hz<�\ 6�wx�;p���Q"�vDn�0^�L�x4�f����X��ɓ8B����<�{]�MW�OD�����	�����on���@s2�3|�/���Y����Q�	.��tA��U0��F��M�`��=}ʭ٘z�Tg�1�&���T���l����z��gWȉ�����ڦ��/�[$�/�hP�?|���uQ)�p'�_�-g��m�;��Qe�h�#Ż���g@�3��̖��P��ws`a/��T�v7	�w�[X��ӥ�����6
��x'p+��!��f��"�֎�
U3�j�3�-�T!%�+��vm�4����9Q��62+��W���q���Ȓ�����3tc����O�b@%Z��F�FzG�������j�	��7_|/�f	0]Y 3X�>�
�t��Gz�_��v~b�O(F�mْ�D�D��H@MWG��&� *V�d1��7�V��jDvN�3S2ʓ�S/���M� ���P�j�y;��i�>�����1�I*r�c��<#�`#�@�i3�M:�,��Kً�ͷY
,�(O���z�5�bIgIڪ�Vrq�|���c�{��XA��V�je ��0�#!<7�Ť�=8tX�S�hۦ��u<�X���3�������%�r����T�.� �h�*�:`-ھ��O���H��͈��O�VVt$ !	ĘЦ���;����eM�~�^���P�IT<��Ӎ�^9�mț3��_&'�/j_�����M�}4�B���l��9`��'�	+�v$}��b:�`W=�I<����va�u�=�H�m�Jx��B�����g��^�����#rH�?��䉻��U��d>}���R�X��I��կ��@���Z�����l<P>�����4 #JW*��WW[����a$�އԮe����3E�����.g4 K��Hv��PׯX9:|�BA����3Vi����6[�X�DDR���������~����*�=0�s��?w"Lh���B�1�ow���� /��v(�T����z�~��� �\8�S,T�{�ᵛ"����u�{n�m���l�֌蜎^���/�k��Q=�����JAS�p��8�k#5��e��E�g�-"�L�>i�CIa`K`-���h��Ơ�R3�e3��Em	S�ڼ2}�'A�����ZBU�o)���2���?�%�u��N�6{���
Z�.4��M*��!�(9\`w3��U>�<��&#y�&�˪n��j(z�7%��s$�ۥe��갽I����kn]����e�}�t���M��*���qd��ϣ���ꜘ�^u�����|�֔^S'E�M�?^����VW;�M;�h��S�Ϸ����O�S�Ya��#ښK׊m��3U54���M���!(����ﻹx��V7:	4��u�H:��i���!A��eX��MI�MD}�����	k�2�!��>�7X�(|0����Y#M�5�r������5�}�\O��f$��r�i�#�x�;�p*�%/*?����ygc�z����u����-�iQ.�q�48�L&�N�{�����IIc�ˣ��Ch^N�Kpw	�e[�I�����S���J	��vmԸ�F"�L���6^����m	G��ӛ����V@/�Y/���{~�
���U��{�C��G8h����[/��X��C!3w>�q���D�S���1M���A���)ŗj3iy��C�v�+T�2qA�*����R`CEP� j������D�6�.((�I�*��(��l�"2�zH�7���?�}�!���� ,�K��Pʷ�`����t2�m�>ؚe� H~��EY�\H�%ȕ���L��My:�q����PE4=m���Tj��C��zr`��^F�uGy������O4,ͲT]���i���ܑ�#�9��|�f�P�%�)��H$4��:��
���wH���k 	s^�����uU-B�WD׽-�)�VT�?m�l"y��[vDT54f[���8���?��$�|�vU`t�t����9a�+����rR�.�C��[�1�8�Bp��^��K��*�i�����3�<�I�(U�e�v!����bvйh��o੊��Ȝ�A[ �!0�y|��f*d��?��TK�����7�s�&��E/�@0[� 9�����7k�0��}4�P���Y�	�Z��h6T>]�|����$���lb�������������V([�!�+��;���Bb̎!M�z�bf�@����_t�kR�L=M2�%��
�����|3�|�1Ҽ�&����I��K�?�n���Qs�;�G�����8�`�
��"9�SZx�0��	˨�o X �\��*�^!5�"#���<$�^x��kĒ�^�	���PIK�q%��t�B�Z$?�R�<��������.��7
C.���q�4[��lJ� d���h�2ʷ�}J�}u�!�Kƣr�E�d����ΐ��+�N^�9�|7o�����m��'�giP��ZN�h�UK�nj�⥵��i?���Kq.= �C��L���f#B�J�RV&��9]�O���:{̼C����oq�{,�{��Ce9�A�h��G�ܮ"��8v��x�O������jA�i34P߂�p��J�O/�5J��A�dH{b[vECs�S�4�h7���NM�PR�F�,�'�Q�����4o������ibF@�F�rڂiե��+@'�Y�H��3_c��K-A���r��p���V�s�y���Vdz1���ݐ�{32kBhfQ�h���b��F���N�::���D9bC����׬��1�����wA�e��T����M�ZS��i�ytI�Qm�(3��tT!�A�<�e;N%��s<�0ؼ���d������O�C���W#fe���n7�K�pr��,%6����R���T2AMh(i���i�l��
a���s���{aI��)ˊԙ�<ƫ���,~ �!�Ig��8~Q.i>_w�Öh�(���D{��\��%�ƠQیm=�D��_V�N�`��6�KZZƼ	�ů0>����Wdo&oc�=u�T$�e�C�J��B�z�	�����@��y������v�D��_�
A�^���8',]˫d�)�V��O��I�L���5�z�A����R���N�՚yQ�����
�ANU��B���Q�KϒHü�6��3����-hl�x[^o��!id�16x$H��7n�b��9�v&n<U=(�W�=��l�P,�W�}�F�E�{m(�NХf7bzo*uS+��rXL�͆�T.�]>ǆ�\x�_���m���S!h�d�z7��~xQj��-|l��\����ԩ�wL�͜3�E���Y����؞g���与�fQ�`�����6~�X� ���PXK	Fn�:�tf��}�i�ƶ	�yh�f�-�W�ìf���4Z�^�{�Hz+���]l1�9h?@�g{6��FR�f�m���3핑�&��ɑ邸���(?��y�#�����3���yq��.{:����1�B�%��� 1���<fFb��d�����F�b�R��-�}D ,�ߨ�R�huv�O����a����M~�Ԣ'J������ɺ1o�k{��"G+V@U�7���b!tw>�O'�~�b����Ɵ������2���Rh���-';�<'k�VH	\�_LO�2N=��h��0�K�s�c�#�ܭ&~K?vk�1O��J������7c:�p����$,���c�e���/ ��"�h��ң��ҤC2���@S*��[����W��H�� M&��g?�_���~������*��c�CgH��L�O��^u�F݆Ԕ*��7X7\�<]��i�F#�/$eR�0�_ş+��Qh��@��L?SQkct�ˋ�Z0���7g������ �c�*]1�����:g�!" lq �Ɉ����B�5�� �@�OX�S��1��(l{��tZ$a�m��Ж�2�Y�=�1�}#�j)�Ź볁�M���Mk��Z�J�g]:��DyW�Ep�ڧ��<�z%���w�����4����+�o!Gj��r�N
�bܮ݀�T|�`�G�O~���S�4��0\y�c*�H׎��i��ey\	o*���F�8�����mD�������˛������

l��4pF�\����69�XA x���f�bDc�쫈|g� �7���n	���H� h0�u�'�C�,�-�?R,�^q��}B0�Gك������f���x�~���_o�'�KM4|^	ǌ�i���иφ˫P���ƕ ��?P��n.��6/��&�M���w�ǳ��b!d ��b�9��'��-�3�Re��_�V�B7����M���s���nw�r�2/�1	nAUb��'��/Ĝ��Ҭ`f/�����^S�p.JpX~�5��(g�4Z�~�v�;�b���֕g4���Ce��-��8���i5��F�:㑏M��SU�-*�zL��.�0=�a���/�DQ;�v�a���m�"+W(�Rb؇O�dj���
�A!UB�sB<��d�p�r���OV�z�m��g:8o�8Ԣc^3O)��xK��>�d>��&��-�p�P�`������+� ��!1a����R��/�8�̄���4��Kߊ1�t��X�$u���h��Q�S-sr�.\�	��H��5 o7��/$�������C+��p�G���Z�Eb��E��
Ko��� �ک&q�?ԏ��ѲɎ�K
�Q�&�
��RW$���+�uynK�&�$L�%���������� ��5����(���1����`	mDQ�N^��H�^y�3mү���D��C��y�I�ϐn���o�ۥ澘&"iG���[�e~�Ds�Ԗ���O�%�g���	��R�M�����(��1��TC[n��PG���q%A��4�M�X?�3g~)z�E�7����'ݜ<��%=N����8�&�݋�7�T�����t:3���>�����z���`p%�K����\k��U��Y`�7��� 1=������U䔘��j��"�x��?��uw�Bzm��V^��lb��%��rc�'��'�pW�j�G��[��з�#�>�r�H�(�k��|�j�S�i����c��ַ���C�"��y#b�_�ȋb����$M ��uǂ30�*?YV�"��Ԍc������5w���������{�i±��^D�؍.;�H��!��b)vҒ�m��$���Ł� xE�/ �X���sI#�W�ݿ�^w@}:��O���-}�)y.���L;��=�p��vÌ��)q��Zg�Eb}��M�fM�:��
k� u�Ǜͯ
�4�E��1n#7�γ��w��v<�O��hx���SZ���L	�g����e��3R�q�Z�a��())�U��(��I*E/z���^�2�6PBg��qy�x�+߹���K���h@(�`�]l���'2��Ӌ��Ɨ����@���� w�G��O�F�1f[|�5�\���4��v�Mc��mƟޒ)�^TsQW��K.u)�a�y����ɹO���L�ĳ��m��9S=G	q$�Ͳ���"l�H����YEIfn�B�=j{�A���QC���so�G�%/�^1��)��h�E�a��Ē]i��F�B����O�P��rr� ��s6�5���>�Ʈn�X-��L2K잠�8����_x�ԡ�|wEǢ�"�=�Z�#J��a]����DRҴF�Ù
�O�16��O��i���S��Qi�T�0����`���r͖.7���q��#�bNEIK��q�0y��X4���%�LHVm+��ת��s��:ۆ��0�'�Z��y�9��/W!�"�]ż�۹��[C'�7`�f�3�u���?@��1i�~��>H%NF�Ybf�]َ���r�b�}F���@マC[�o���Aj�_'�dQ�(.���=��~���iZ2C�(j�	��������(�Sa���%�[���˱�E#�Y	���A�������	V�i/V8]���g�w����<�t�"���q����*��?IL!��Mѽ���Ia��6��p�P@�B�~f�>�����,/CU�Y3MĘ�DM�V4�Bxձ��&p!\kPR���4@����^&dL��mp���{2 �x�e��	������"p��Ne�7^!�r�_���usˆ��.�- *���ɡ�B���1O�dJ7�E��C���9����^1�|QL�<8�
&�&�1�agװJ@551���mU�Z�:aq�~$;��!�7b��Q��M�+ƈ��;�6 �f����ʶ"����`�e�)o;f� �:�M��$o.���>�駳��8��UDпI��ǟ7�7�-B�b���CӃ�A�`.�*�N'��	9���@(�n�+�����Y+P(�7�p	i�@ةޤW�8ӟ§'�g����(zw(L���^)ƪ$R}F�1i}���іk� �I{E�]�j�<����mЀ�@r)��ߦ��;�-cfxZT3o�g�U����cǨ߿(7ͱC�O_H���*Ƃ&BB��_;^�$��rp�'�|[�db��_��,P���7�gc*� N�$�����P�2^�{�+߈�o�I�s�0k
C���Lv�i/��6γ��ҥ;����HZ@��(��`�����X%��
W�3>��]tT�2R�-n����G���/0��<����̀�u'����zܖ*\�С�A�e��Ɇ8��:t5k�����pR�/x,PE)F���=%}��h>�r���ww`�JT�@%�
��kc�Vp��=5#��ML��YeuN�ix���q��F��[�;D��( ƞæ���96OEaeQK܊W�n�r����z
�� �l�Ȋx�a :V�Ƚ@��`k�@9�-&?Q
�c@�\�'?����� *Y&7�U��pU䮘FfS�n�]���!n���o�P�d�Y��]zlSkW�ڻ=��ڗ�M��чs����Y�s߶�	̷X�A\���Bi}q�T�a-�hq��¼���A'Z����-���9#I���$7��"�cy�X�+8M�P+����yZP�*�聕_�i����ȩ�w���¡� �޻����~U��ڏ|9�B����4������p�Ө�B���$�$��_��y������r�U<ΜA�@����>����S���ܖ[(b�&�t6�����-^��S��'N����p� 9��6Fm���Gg���2�T�7 ��R�������~�G3���D$~U����>�9���ywQ5Ɖ��L�����O�"5�˼K�X���dY�� �G�'on�Ɍ�(j*�� SS���*>sH��h���<��cx�}a�ܧQ�|p�鸘�c��{�C��U�OT�����MV-�n�o;{��$�d���I���INg�����bD��Vu#��_��T��j������[�����PLp�G\QItڈs�O�k��!�s� ��j�YJ<D	��Ͻ'�c�:�U35D�&A��K�?��X� -MW�U?�8�}��nY4Q��M i�v�}|Nr�B�k�\���v$w�>\��E�uH(�Se����Z�<��f8���I��$��X�3�':���~����9�8�تw�T�>�����1���vGBPS�N���)ğ��mkS��<3:�1����27	��0���t8�����ߐ�}��OY��� ���i���;䗺�?5lG���e�e�]�A[�"=ﭣ����(ߑ��< ��k��6�
u�~ѐ�&�*|�w����	P���
��㏴��$�u�> ��S�儃M��n�
Z����56PrY�N�7f�[Ho�t��J_}������O�*�m�[ u�g�]8��D�'Q9�cɬ+1� M60$�6+�m���1�3�<Ʒ[����D ��2k�����祙2� F�*��B��w�H��-��ӯKo\Q� G�7#Mό���U�*�D��	�?�ew֪<����x.��Z#�82S�z_o��p�4fjn$ڽ�] d+�iUt���Xܝ�����O0�Ta���_R�QW٬S��w��7AR��4�^\^� ?��ɣW�uG�]T,���9�B�:�3��`��oM_P�]hi���G�f�"�&�/�Bq��Q7	�u���<�t6z�����\�ZR���)i�ɿ��p]��_5V�k������B�I���5�t�E�W��"N-�.��N�=F%,���G�xĽ�S�c5/���#क़||��,�IY�7a[���:�7�`��p��j��Lݠ�4܉��R��R�e��Z��[̈́$���u<#"�MtM�>�׉$�	[��d����(j6�۶��)�[���>iy����Xv��l�#z%q��]�UǥO�2�
I:�?p���g�[iG�Nyz�N�ͣ�� p]���>iW�fĨ�%����e�b��ް3�����gⷸ���k1-�?�������V�����J7�̴�3ar�6^±���5�@}ץ���Y���Ea}z����5���G��j"����c���(.�=|�k�������כּ��e#Q�Ʃ�����/86(���T�,������%�i�U�X����2��	C����������Y�x���dbx<�<_�G�6��=��	gX�����Qf�<�N�"!�K�G�*J/	����H�Ϋ�i�G��^���E&�X�P}���`�V4K�]�?]Pl��y�!�\VC΁����+���si��t5k@�^��1:���f�[}�6D�cn¹�Jɉc��t����>6P� �d�g�|����+��2 (k	֒n���y\�C�T9�	y`D�e�.�_�*>���R��0����i(HS��;t�*�9+�ɬ��`�Ug�\3��)?>4_�����D�q �/��'}�o��qI͢3˺B-��%7�c�xm������su��	&�Ͷy;�!������E������rRD�*jI�����Z��jw{�ݰ[ˣ�{п^�!2��;B 5m&�<�lN�Hq9�.�^��F��0�\k�Bʼ���f�n�8�+	J>!P	�0�%�b_>��:tW�J��a�B��5pj���0X���P��v�J���23_��j(y�u��� ��3N,�5�y���ZT�≏�·qթ
6���t<�.�˵e�h)_6����2����Y�]{�M
ۯw��|C�~�M��K.�C7* ��!�V�'z���5�Y18�]�r3���Û�xa����f.)��z���(��C�@q�<ж���a�3��t�z�^Ԭ�/�.��}�Lo$��J���T���?MM���F.z�,>\4���!�Ԕv[+���Do�Ju���F�i`��%݌)M�qNO��Wv����fÄyV�l����c�B2ӛ~�m��|s(���˰�*:�c��5=���T�����J½�ҧ:ɇ�T�M;�l�:J{��cr>�����XA$�Ha�~Z��4C��bK�2�b肷˷"�W���Mnu�������1�r�`��O�ɥG6�3�X{��b6rjd�l�5f~�Hr3��"o��ރ���$Nt|�p 2Y���>���j�T'���Y�p�-��n�_I���*�����H|N�8U;-N ��g̤S�DT�s�]b�y��`(�z�+"�k�}�V�z5���r�M//�4@��K�n�K8��n_.˂�}��ߍY<%�R(�&<m�S�֥69?�),6�q j�(n�}�s��4Ģ6��!%~��&�*�&ܪy4EOrޚRmKam��ux���\�cߦ"}�+�O�`�
���9����Ε�E����BA��%�<�R���������I1�>���I/�g����r��i�D�>Z��#t7��r���[_ĺ:�,�n�����Li�*���ܺoε��Cz�0�^����Z����APR����pE�9^pK�w�s��7�vFN�8��>�!iCK��1ԁ?�D�*F���%��rְ����t]f���G%�/�h���a]K�C��3��+�#J-sKRa:��#V��'&̠6�����{网��@���I���j���ê��.��c���אt��B/�ӥ����4���i<��M��(vB�|�~��d=@Va?ǉ�zf<�~�I����iRÌ�>��5k���U�⥝��z�C��,������3J�N�1�,��)g�Ҡ��ʙ�
t�� ����;�:�D�F �P)hK�
a�o�z ���r��59�V�4n�sf��]X@(CD���/�Q��[1���S:����N���S� ��+��|���X��� d�����{`��8�����t�	H:+0�2��%g����ql���o"�h�û4��?�y��,Ζ�!���fd��\7LZ�7�p׋$��ל|.�
̑���f���R������C=�W��;����j�5E��ō�e�ӆǲ��8���h��£�����x;w�lo�VZ��@�w2�!qc�/��쮇�}������~zf�L��?�접8=�&����eʑ���� /&M�i��!)ͭ�F9��k����O	Y�Y1�u)
�4Ii���l�~��5W�	bz���[��I��\FWqU���RM���5�C��@�F�_��g�5꾡���D�Y�c�������)ܨAI"�
��� �]��A':��m�M�O<l���6pt��"İ��ؖ8�/�9����Sw�WVi�RgR����b,״!y�&#z3YNC��]���	Y�u*zӈ��ߐ�����Y�b�0cD/� �h���G�̺���ĸ,2d��`��0P���/����LX��@L��E?F�Zw����/�Z��0ԓXo�Y��H�}*m�ET��I�B�z�X��`��:7����ZU�)}i���!�>h�����8�	T��r[�M��Z�Uo��,���iu�k�gn�ϣx�oCd�
"%e�s�?�����Y����Ik�6���iG��B�$��l���J��Lk�zh_�~��}5l��z�BB-!i~�9<���h���������t/���^(p��!|(�F|(�Wv `��Mn	�C�>�����k�'���D�k;?ھ�����pr�EZ@�lA#��7��vO��g�S�)�_�P �e㻀�d^)��X�'�J6�>��o�[�L�p^d�����[�����u�h~�M�������"=�md����".��C�W�����;��7ɸ��&(ӛd{��IĜ7��6&@&D~�J?�ŧ��șΐR�t��H�NGAH��2ϳ�C�p�����6Kl:��VQ��*8d�U��?f��+��]2�N���j9��]H�#��DSH���A��o�}�}��:t�~�q�,�[�ﮰ���P�VU�9��1���Y �.�H��Q*�7>6�>��ed�]T��"J\������ �~[_�NA����|���IQl���+�t�C�y�ʗŔ� :PP��k�(�B"�K�.��c�F����̦�cez���ٟ��lq2Q0h�s���i�֛�/�'����`�W�I��]~�+5Ŝϊ��yUF5���@�ps�Ow
AވU��^Nm��|�������f�q`��.<D�NA��ln��0����+.CkL��ڗ��UnX�w!rGI`���u��Q�ނ��wT�m'@������b ے.�t���}���y�#ē9��ͣD�M��ު��)2����gI�[��Q���C�\�̶��Jq`�H]��5�u��_L����u������6"�c�w"�鷂��P:�p��LW�B�pP����і6M��G�&�0܄�"�8..-�_�t�7�IKÕO��Q��1��hx�=�X-�PTȍa�d��么�Ͽ@��z�L�(m�a`Uc_C\�N�5ed����`�<��cXI0��>����:oN!2����ύ}Uw���a|3Y�v�D� ,��(t9g��U�p$����k�-Wڢ��~����4#~��C�k�����O�'��|R睕�������Q" *:�Y��:��S�6Č�HV8��+�֠J�]f��R����0�X���%�~���5�⾒�8S�ztwZq/��$�%�N)k<[_P#�J fف����z����N/Z��UؼQ�����n�̩OO�ʯ�r�pLf��q6@�2���a�7�n?�w�ޭ���2�|�7ƍ��Rߚ>t��/>C�*}�����x���fϒ
�~���9zM'ӏ�~MwLm�'h��H���Z>����OJm{֗�y���"�����<^��]*cpqS��~�G���*z���
�׎Q���r�CpJ�+���e��'3���={`�A���&L8m���3�ۆ�fÝ�<�䂻[���0�(����v|����e��Z�f��1�Ͻ��������놵�+�Bݫ±����.����Pn:�u�۾�f5S����m}h�'x���v����U/�4���5V,7����,9#�a�^᠝���si;��i�P�K���KT��kM�+��8�K:�阐!��	���
y�����z�Cz�&=�|X��J��j �ǜð�6z���:y�Z�G��-}A��(b[�~<B�P�0���q�\Ơ���\2俲�/`*����)MH:eqԋ�l�5�!J�`�ˆ�]`�v�A�iS�on��k��H��i��F���O��|�f�H~B{�MU�P}�-�s��~/vu�����Й����6r��o�,�vI%ܧ՟�D_��ض؟����b�Ya�#��g5�ڦ&9�co���h����KgO&$w�ʎX@w�f���/ZU�����Ù􅡛�#��CϾOD�Yz��R_Oz����+���?v9��Y.��sp�6��&�D0�DVVQ-��.<Y꜠ܤQ�[��,�*�K���Eq�N��A�A��(���PN����|y�}I+z˿�.��AZ���S�z�LZ�� �.E
NP9�r�	^J��\O�7|�;+O�Nfc]+n����W8�v�L���
!ͳP��hR�e�+�	��	�Ƶ�gj�ՏQ?86�"չи�R�D`d�R`쌠�!�z�sw�R���O88<jC�<�{�ָEI��n}j�`���`�����9N�&�h<���:�j������~N"�z�&W�� �I����҃	��INZn������Oǋ?ژ�� Ξ��r���6�}v�7�~��2t\�!,��T���)zZ���@+�)��aj��$�^hM&ܙ��t̅t��"4%2I�O�=d^��d�F���������_v.s���TzWk��~�$u x5y��B� =c���xf%����lµ��K�у�#�)�A��Plo��a%�qt�u�����aTD�r�
�G��%>X�ۉ��h��B�-'1|ç�C�G�G�[�"��0R�ߕc�e7�Nq��&'k�a.1�;�"���o��Ig?���\(V� �}���5Cz��]!�$�P��?�HH
9h����87�(b�g��2I�s���� h��M��䤌�V�1�GT�j�b���:��x�5�C����藃�.�gN�;�@E2~v��We���D������~��8�GmrC������ ��������y��X��I+s+�3g���1���o����ňv�k����jrx���gǙS��n)�z��|�@��?�t	/�@y0(��/�oe*�d�<�n#�{#5x�L�L0)(�딙�U���5�>_� a<'{�d������x����L�T�qW6D�\?��|��X���>2�D����(b}+Z�1���S)zV�x���K��L���{
�=ͦE���RS3���`l*�J11���A�D���	:���
���ϲD��t���?����72��A�1��R߱�B�����\3{D5�Z�ܭ�*�_�:�Mjhv0���"I!�o�}����#z:,F�)tZ%C�h'��jB�*B�Pl}{F�&g��< ��$T���}�n�0�@��
RX�Qa�[;2OY�2о	�r_\���;EβC��|-�_<{��;���w;E�4
u�4i�	[���i�
ُ�7Y@�z�*�`��K��?q�Y}Fͅg��6��9���f	\x"�<\3J���9��ʍ�g�{c��~|*����\����'�>sd��~-�V��J��'-����{>�T�]��ځ�Co��jN�,��H�ާB�x	�e�������sۦ�s���M�%���B�`c�o�1�����Q�ܴ���
&U�k�]�F����q���Ex�rP���G�:vg�&����ToےW��b����P�$��E�M���'8	�U�Xi{�|w7�?�|��%HS����.�{p�+�����>�ۨMQ�4�aB�#�V���5v�e=J�"#��5�LB+����3�.��E��Ez�N���=Aݸ@�kvzP�OK�ݡ[+v����g��v#[��:�Kh����&��o���m ���$y�Ba�mH$0��hqE�.�D�̷3PY%�˙1v2�yR�����$ɹ)�S�7$�����䀽���o�x�{�B�$�qG07+��ho;�lP�5�@�*D�(8�?�Ļ�[���K�����}g	m͍�X��$ps4p7���=G�`-q91�uc�U_��k ��ΚRf?43�I��� p.
�v�7��=��]]Ly���=��li�@�Q}�];3��Ώ3�j�g���ƹ"T֦�f�Jr�*��S0I��U���(Jk5H	�~��G6�^��)�hU|�A��
���TK{�/-c�^3�X9^{IHJݓ�-��V �5)p���P�����Ni5Ԓ��1�"�y����P�z����p9�:�5]̊�6��V��>-{ ��>�c���[���(���ᘧM0l(E 6��M��/I[=\���|�Ӌ
{tzK*B�r����"�Nc�K��̼�o��9�}�}D��]�{��؉/�s�/�6]X8��6��q,(ﾶB�I�nb2�Ax�������O&������WH�|4�#�Uq$$�c�z�(���˘2����z$��NU	:-���/��:�w�B��z�QUBL�h��f�����,��I���N�q�����S���$�Jr,�������rʝ�M�O�'��3VOS$r��k}�\��gj�Y��#I�r�5y?nB5��	Vbݽ,dY�h���**�ۣ?e����l��B�z{ک��CO����wP��9͔���wl�-z�
'ԇ,����)��Aɶ�D��+�;�������
�O&�@n��T�/�c�1ֆYѿi�(oB��y�S���q�Z4'1 $��?���O���k9��zn�A�̧9e�aR�3
k��\�&AY!�_O�)	��) M9�v��]P[�����]��z0�]v7%%>�����\bgx���3�C�Z�K/�,�<�fx����⥞_�g�����,�{��0</WB_C���i�fo>�q�rg�`�*��5���ه�Z:>he4�a������ct�8&\��Z��|�8J�c\��Ic��wr�)aD=>i��K,n�=`r%#0An�a��u��������Ý�!�L�Y'+��È+�5 �u�{�ێ$���3�)`}�.�u?{j�m2�n'�V�q���a�=���5�_St��~Y\�aw{���@�!�>����Q����=ׅϫM���v�$+!�_�&y� ��A�CBC������h�|������ďYВ��T�c�������z��
a���M�Ek�n��*"4��i�����-)���f����6)j�Re�a���*S٫E���h����\� ��k��p�z3w��k����1��30I��=�W���?H�L�
�J-Y�+S�K��Wk9�.Q����y�bz�FO�k��+���c�� 6sh�K����U�NE	M;�ܧ�/���]�d�L�pmx�!�R:�:,<2�R���2o�յ� �Ⱥ�4�Z��4-��Rq���*�oѯ);�~^��+�1b��-W��U������c�=�"N���_]�>��슺ī�7�}���&�{�q�ׂG��R��6n���?��c�UL�  o�ɀNVܙ�&���z�^���&3�@Y��ųE����)����J����~+��a�M�נ0ȋ����R�A�������ա�Cڕ�N3�<X\6{�a~�V�n|Z��)�D}�-(��\UC����(a�����΅��2T���^C�tŢ�����Ɨ�җ-fSgf�7�L��GL�R+>�B[bA �A�G6�"�A�4�P0��P�$�R5�tS���A�t�y֚>�QÅ�ء������:��HhO�+�[D,��k0E�3>�hYxC�K�:�M�%n�e;��c��7�Ϙ� �i��ee'a��(
Lg��~{�Q��߹��d�x�E#o ds�o��}��QO�p��sȔS�۫F��\��߄��71�����i�*����AZF����ex����ͳr#7 ��To��?�K��YXId�m�w_�� ���^B��>�Y�e�JW�t�ʵeu~��u)�>�r2𓍑��R�ʺ�r@Ό]Ru8'G�^�G�2���jg�{���i����j��K �a�2]Ɣ$&� �j�_0t�l�@�Fޔe�_��s��$�aI��+
�ں��X'M�k�H�6H�釆��\�p�a�����bs/�)��X���{�ۿ�?5�������#�dBeS	�M�H�dU⏑�;�Z8F�}N -N�S�~G�������G�]SsT,���������=/=��*���Cb����č=�asӁ� N1w�+=s�z�
��d�!�ҷ�6G�����HO�R���4 ���ڬ��sYg�p��|C !e�.!���l��G<��͓�>'j#w?o�ƆR}��7z
��_G/S�x�Jah�D�͙�]x��� r��>�4O���������N�x���͗�)�LpJ��F:/�0�~|d6l~�0�K|���Y������!��3[��3��o�ȼd1T�c�fBKv+�@8=�aH0��AG��S��o�a���%���t+�t�M[T�3,�<��0Ǖ�tULAM�T�{(V����ֆ���������T���H�.亩�\n?~^��
P�Ү��v') e��p�%ԣD��v�[�8�,�W���g���ȗ�_��g_�l���f �Q��򊻎�8W����n�<��k$�fg0���Y7(��G�#Z-��vwj7�L{س�!o��K1�����]y������]J�>�G�7Z�^M{�U�MIߛ�J�}�
PL��Iq����I����xSЊ��ꨁ���7�
��5����C��w��$�k�VS�^xIL�f�H8�i_~��uH��t}$���ђ��#v�YR �iTW�+����yS� ~�%��$�D���n�]z���qj��#���>���K��z�C�?zW�=�^"fY�}>�`��<×�Љ�&�����K&S�_��v(���ϭ^&��.ɻ�D���%21�. &�0d��v���p䀣n>q������>��ҏ�%`n�yz����Ǎ9��00�IE��k�Ex��WT ؕV��5 <�$9�jX�+m"ggi�f���)�=��A�FX�C�@[��)8H�{4�*�@��r���طl19�r}N�Ʉ��bE��@�q��N��BPw��6X��,W^���+m!B�d��S��w�Pl#2��N�q�Sq�|��'(,6�I�ʯ�O�d(��F5���@ �W�����`/������;�o�J��q�L�39��В=��FL��#5oᚸ�,�"�y�1�^E5��wq��'nNk�����7�I:�c5��:3���w}.���Ӡ}�1"������q�*�:CZ�[�<���P�6��<'�g�[�!L�	��*�D�B.�܌����pBۧ�'�(Yq��L�(��p,�����O7Ij�|���Z3���m�$a�6�L�-Ԡ._S\�0�aKS�����bJM�&\����<�Hq�� �23��0�g��r:z	h2 �_�^�k>�h�o�"K{�E�u��u���gi�;���Ie�TF�`C5�}�x����{� U����	͝ `9���V?n�6�.㿊�[ħ�V�I��?���K��Ä�D)&#�d�K/}��-���2��������)�7zQ��Xk]]��J5 ��7�<^�I�Q�nF:�	�ȋ�$���b�.s��,����>��YW\�.HF~(�j H�5%��|!V�%��Sj6\=� ���:K��V5o��Z|�� ˵@j�M2B������)���{� ��v�������B$D[�(:a����T4���� Nh�k�fwט۶ˀ��ϴ����<ud���6`�����&�DTo�%hL���Y)~��� �a�3#/����v�1Lz��Е���_�l�^�}�+	�"?� 8�0�ݾ�[1�a�?J��?i��:���j� Ø��˖�CCi(>�JR�T��ʊ~�]+/�ɵ g$�S ��`$���h���E��0s�D<��5h�Z>�K�b�3Q'o"�*��М�ą�-�s��զ������]}vbq��zo�3y��٘�.�{�},���\p�mꅂI%R�_r��c�*�·�'P:*����#ɰv.<iH��'>%!桛(-�c}w��.v�;X?�g�l�lġC)%QLodr��Fi�,��.�j��E��ǅ��[��x�;�#$��Sq�)��	���jmI�=n�D|���O��aĊ��o���f9��o���@ñ��$�qk��do���"MZ�Pn�����2�0x�>�ܑv�uM��'��}�o@�i��:�ˋ��T 6�[�������h�ߝ�CC���<r5�2��H���5��_�3%�~�)@�.�$����2�+n�
u_�߭y�"���\J��OmFCa��G��	CРr�j,��� �7��!:M�hV�9w����w	����)i���EɡF+4-�ʃh��@ٚ���������&�nl��J���
bH���~��Tj2�-��<�Z (���C�(ڶ��'�=	��)���l#���^oM  :�A�`d����
�_�^����;��ӕ�sV>Tl�|����HHZ\��~�j���^�Ӹ��qV�Sf��`�����Jۜ"R���ܽ*���0����d�&m��]i(F�E�c~W�W�$£rU��)�/6
>�w��.׳m�,&����6-ǌ�a
H��dU���ޚ��ϓ�O6�~v!���*M�{s �`�}�#����)�qN�#�S�U˯�?�f�:��"0�}�;����W����{�q[��6����Z��m��^".�	�f��Շ�!��(	hM�R[�u��/���{�/�����V�^S��^'}N�2D�=jb[��A��j<���Yu!�&��)obڿ�a��[4T���/��j(�E\HMD	
X�j���]��[g\�~/t,��-(>�"f���RZq1�g��΄��;om��r4+�@�ח�f�dXm��v�Y!�r�o�s&�#�Z����jd�`
[�9��QIh�e���s��$�";�x�5�y�ֲȓ�!����Xcʻ99����X�M�8;���ww������M���v�H_�-�aJ�O��U��*��He���~�l�9L�>���֏jH��o@��^:��^������]�����������;���k;�7�,�fP͏paP����G�q_��߼�m�܍�0�50�8j�R��yPW�%g�m���d�eQF�"7�����GW����s���SQ=�ct+�A�㟘r$�����}I�D}۬�xR�$�Z��� B	�*1Xm4u��˜�!����➟��nG������;9�<�f���(�N���!���QDov��P�,>7+p%L�:��s�p,����v�[[����V9�-:�݃��'Dǭ;x0�bՙ�o�ǣ��1�'���G_U1��"�vJb	��.�RrN
���QG
oL��|���Ƹ�%D�]�}�0�]�ހ��u���-�Fp�F�`Y���t��P7=�������+%#$�C��{��n��oB���(1~u���t�(}mG3��H�!�������翯�4��!<�X?�6��m����}y�sd�e}T2�ΦݝV19�	�F�RE1���/ana���ߖƒ�L�R*�Ňu����@����l��ތR_���l!��&�iύ����ɂd�@@E�� ��`���'�N/��9�π$5T���au��iM	� �a]�$��@:�Z�cQ䜾أ�A�1S�@`�����c�<����3�GF��?Ik�{,����b�V�M/#�&��G%.����
��m�ڜݬ�h��.�0��Z�
:��xH>�+�uMUvD�4U[`Q�ɞٟ�/���$�3NROX����	qB���O��!)m��!�E^K�~�Aٽ8��T#T�>��e�}c�l'�R���iE%*YD��ߚъ�4�K��ѯ6��6�n���������:�%���mg��	׮WU���x�=�'���^#�f=D�zkm;����"hP���o��3����J�iީ�'8�Z �,�u�)�_�yHm��
o�)�����D�,�K̡��y����B��������:V��d����Tkfyi��E�JA�"����Kd(!#��Rt|_L@�ʏ����83��A�ՄH��FN����d�� �x�ͮPM���AXj@B���M�B���AQ�� xX��s��sX��8���"�^a�Q$����N�)�FF�P�2��}���%ְ�7k6�Xڅ+�Y���n a=�4dpp�lx+y/��%t�F�b�؆c@�H���q�Ѣb:.u�������[�}g�����	�NJZ���m���d��#���q��b~'Icʇ����L�*
�W�6�$lI�o8C��`'ej�'%a���1J���D��;�g#1��I����Q���湁,ѝ�FYVM�T-B����L��������Qb&ÑX�`�gK�V{?Q�ec��<�.[���uo���3E����F��r�z|�~Xυ����ZYx�~���g-�Q�c1�F\^K��X�>�ܳ������Mz/t_��Tľ�WaAQ�by9���OOF�r�͞�������w>�\�4	�@�
dc�f�Q�N�M��U=}#�3/)�da��B�B��B�l9�up�:D�"�ظQ���O�ߎ�1@h�~�V�º\^|E�r��݊�Dl��zHI
�tR� ���������W�rw	�TS�#��	��
�`�B��V<��b����^Ȇ�xV�r�"b�g�	��G���c�uE��֕�Q����3�b�;�뫴�$(��譐>,��UC�9�ˏ8uDA@�imd�ǣ[hm��V���I_Ϗ�ی�v�٥��&�|��L�Y=rj%�3$��l\� lW�Bb����;���D�\��l��g1z�g{Qc �����ɿ�/'��p}ٚP��dEQ����ܥQ��γ���]�x�,�ęb��d�cM�=�<1���kژXڐV|7��Ys��+~��$)д� ��5�ߔ�e)��  �	���BI�OT�Q��|2��p��kC�Ĉ;F����l�zj��|�g�$o_=qI(m}�>c��VG�$���B�����y��憌ܹbO�����ֲ��ؗ�L>տ{�<��Ƞ.���!&�U)��.�Mb8�S�}7�cܿ�|��(�ٛ|�\��:.��P����e���S�lqH�����;�<|N2[�Y^���Xm��}�L��de��K������vO���igdV��.�"�Lp��;�e#���w��T0.;�֖����S�.ғ�J��\�zpo|}�=�)3�}��C��J�E����D��X��1��ti��(I��x��y�I���6���A�A�5����o%!(�zTJ�$V���zoۀ�/�Q0_��y3�gި�J�f���
��0=,Nx #�?�c��[�708,��P��˷0�$v��4�9���xIGk���"����ȷ7���G�y��C`�R���|LӓٴP�&4�P ��:6I�|jv�eZH�T�Ld*Ž�r�m/W�Eqa,�bxtJ	*���5�9<��3�
�`�5�r^G^?nt�y��_e[��[d���/{�~�x��賻�zGO̐�W��e��B�_�͖�0����@�c����X�^���֢ M����Օ
�cD͋��Z�D!�J5�������h�剚K���y`n���lvu:B�0L��XQa
7`��Y����YT�X(��Qf��f��ȇ;�k8�.@����_�m��L[k�A�qܐd1h�pi�W�uX}��J1�* ���h��NS���g}^�a�x+�+z���jsV��;��U}�K<�e�K��r����:�#	K�xxWK�B�Z8+'M*���݋|\z	���ۻ/L�sZ���:�f3}s�P�qr΀�ӆ�s%y�2�Z;=Kӵ!r!P�MBV��(�qmM�i��4:����q
����e��ӾH�0AZ�]�D_kUe�}�R����ٙ:��'_'p���ך���
�����е9/��?���.R*52}ί�-��F��� 9*�L&�m]����zgb'7)fm�"FVs�ȓ�����[ѻ���y{%B���rV�Ϡ��s]�1��Y8`lR��7�]	ɩٜ`���i��"�y8����K�F������&��uո(�iY8���PE��s;R��a//k<�.�5�I�g,�xV��f�R�+��H�i��,�n�9�X�MS��X2C���^����Y)(u�
��Yc���X8t��;m���<?Z�"����J�
��W����P*hy��8��3��k-:C�6�Z�P���CK
����������*8u�}܍�c�1��BJ��<Zd�5��FQRz�:���'�n��&�ǟ��enR�뿑`Հ�N��P��,�CQ���p���I��x��Ӥmd�z�.G?�{���#��0�r{u�6�kZJz���L.~��I�iI��vȿ�~|���G�\�>+w�ilV8+�eƖ7�����)�m�����_��ΉjP�_|��?�8��Ϡ��j�T�jI�2�,��eE�=�[fP0� ��v���]Lϐ�0d�~�[Kj�k�*����y��F����� '�K�w,�{&}��[v7�έ�:���	�(m=��ŧ�Fk�FC��-j�!L\���j޵�,���$�Y8�LT?Xr��6��m�)}�jܸ�������UbX�@�:J�\�.�NB��`n�6S�NV�A9��8��f�&����xW�K�R���(���jCyÄ���[�q��XN�p���vaЇ��'{d����n�����q��4�pZ!id]�6��VdD���nWB�b�0�D���o�F�������S��}�0�um�ۨM��Ȥ��餁�FO<�'��~
��vVݓ���,b	B��Έ�tҲ.���}d��t��vޞAc1E5�t��U2�2�O�
N0����4�22��_hgF��Wق�-��I�BË��}�;i[X�� �JC6��dm��W�K��D�y��:"yC�g{F����E�Z���?�D(�"'n�S�&؄�Ł�`�[0��-#}���2DrߋTS�E�������	ݒ�^V7�HO�%��{�d��W�el_�s���"9;��Z�s�[�OT��8����#��T��+r�M�TQ��tU&��\�j�`�QO��5.��Z >��E=�s��\�}Tp��EG�����h۰4���=�� ' 0�4m���J�Ǚu�����������5���bh��إ�b N��_-Z(�-~�S��~����T#���qU��)�P���j8�`!t�[gќ�|L���D��}LT�����Zx�S^r�Մ����Bރ��(ۇ�A<���R���&�m>��C���i�|7��k��zD:�D��+��*���Đ^ys�z�R��z��V��}Vt���Ö�ɤO5n"�ͪ��[��֟��r2?��J*�ҮiȗV=��=�5��O�>O#҃�(�/����Y���d
et�z��e�� ���@��L�U;-h ��B�����#k�F��'�6>m6NA'u%��_��i�R<C�>=��]-P�u�Ru����C"�(���j�_�
R_��ђ.��\:��v�s��R� Eci�$q�}�j E�x\��ōL���㮸�5���o������e�� �������Lև���ڜ���U��pׯnY��B^Эk�t��2<���lDN���g�M`n��+�1�y:1�t={�o�4�Ύ��Jݨ����@&�|\���!���dq�~�g�S{��2�x%��xz�ϱ��>k��H�`�^S.��敤M�5�i�$�:�A���V�?������Jr���>-N16���+�D��Y���fJ��W��E��Z��ز�� BɒD^m	?Nbt�~য়\,��j�����?���>�jf��1߉�{���J�n@'�̿�t�`�%N J8M0�F����v��y����q�,6�0��)�͠�	:��.h�F
V���P���b+�f����~w5 8iAIO!�� ��;�M��6���E�{ '��IJ~��I���*ǜ��M㔄q
���j�	g�jZ�F;�r]�G��=�-'��>g�����sDJ2��/�L���fg�Ip��@��V���I΄ohH��U�NC�GJ�!h�2'�E`~MD��RZ�P�\�����6��%B�:*�֐cV�e���(�k7YP���L0�Y�}�7-%�\�Y d�˩+������6Z���\_t�<��xŧ�������/����{;�u+ᖊ���2�@&�C��O1crp�@7�3~;�U���:�=ĵ�N�h�|�&����Ss��&w�+(�?t�®�V�-��,k5QC+&���3��ȭ��������=tz7�@��/5FX��]�|�}p�M��[��ً�m:�L�0�6������\�n9e����l5�Jo�y&�تx��pp{%�j���]� [��nC�OpS&ߞAy�V���៷ZZ�=(r��ޯ�v	rÜ1+�	E�S�V�� ��
U�n��h���܁D��[���q�V�((	XLz-$1� ȭ��9
��"E���Q�����8���ͤseJs�v:����A��XNʸzT�u�8^j� ���	i�=7i�0�fP�9���ˇ� ��Q�̰F8q	�<:�h��z\����|�uG�fC�cg����������.걖k^������1&���f�Y���M#���.��s'�=��Ud#48�x���WM-{/���V��O��5�+��@)�9'�3M
���ͣd���Ϊ-�;j�����E6"[�`[�N�b��� ^/��iH����;k�G������#��*���d^�i8(����ȩ%+����kk��S��
5'������r��K)g1�"o6�g�����C�Ms� �>ʑ݌
? ��6��͚S���i�S��{$w�%�S�y�H:��Cw���Q7��jD�l~��߆B6`~4/��T�1`�����x�����	�|�%�'ԗ�[@x�O5��q���N{��"H�犼μJ�@<�T��J�ư$ �<��f�V|�ĢO�����L�,��/��y�r8x�dm��j�/4Z$8�&�#o�������[1����Ϝ�/�:ָ`�̙��ԩ�Rf���V[=#��'W��n���ȸ�=�ˑR�H=���%��u����Qs�d�/>�N��#�d���-g���Q�����2g)��&âϑ^"�|�2Bm�W�ׁ�t�R��<V�D;y����`�P�	z:��L���,��vċ�;���T�9 >=���b��W��s9U�lɞZ�$.�w�)� �:�4{���ӣ��xͻ�v�_�2,�&��Q��#.o*��Ï�?iꀹ1ܸJŸNd�L �k\�V��,	aD.ɾ��"l�B,�ˏ\>��}H�a˜�F�C���[�8Ϲʍ�����o�4�O@.�� ^%0=#���(���M���̇��
��_��Ȓ�
�h��&.�Ί��;+Uq��.����H�����,`pQw��!���rX��*�*q˻��&��Jy������nF*r�Y���_2�g��/��t4O*v&��e���H��� �z��N_W(�v' /�/�:� �/n"[����M~��Y��Ê���+�I�88?/��]nC��*�D����]zqt���@Ɉл�D ��<�t��{Go9�pz�QMܨ��^��u���_&�2�_���(dZ�-d�-�i.x�
@�ԛɴ��ި��>$��ZY����~xi�l/ȩ^�O��sӵF9^������42i�y���5N\I�x0���GF��+�ل������"��"G"gܮ}q������H�?啨W�H�������V�	����(��(�9y���EJ�ٹ' A��q���x_�q��0^�nC�@Y��
���h�)�,�,��m�;m���ؚ��U��pz�rR�+ѮQ,y~ `VV���G^V��++� vI�(�ǖ�48g!�qʇ�L�#��q�Ԃ�<�
ν�I+�E���Ǟ)��+_p��i��nO��]U^V�V{�Q�tx=�m?~rh���g8"M6𯓛\l�+���d"J�zj g|k�O���o�!��n�� 6 <�Dp|̶�ȅ��9�<��{#��p5�|)���z2O�]d�Ru@3��f	3�St�gY�?B�*��_�f̑���(��y�i���'D�H���K ?�o���������O��5I��^���<Fr�f�4�)�%���S�z����Ҿ7��|���[4�do�X���$��g�!�(�9��O鰇���Z�@ק���z_{�p�D��d�����Kx ~�
�K�j�� �rn�����&�Oa[m��80]w��T\��7i�b�� Jv(�跞��/��j(0T�йХJI�Ug���1u��U;��@B�\!a���0�,�SY4�xJ�T�_�T�R��6K�p2R�B9�'�"���Έs�k��N��e�ԒC^j`)�B6D��h[1���s�
:Rp�iLq�9J�C.g�(R�m;�k���xFU�~�kw���$�rv#.T�m+�.��s� ��Cz 6f>7	q�j����5Dn�LO��f�'���)� �Kf&%�Q���؂�-�:1�����ق��|�����O$!`�Z)N{UH��
#C��b��?d�'� /Ч>�Z���m۸�k?��&*s�Q'��EXc����s(iض�&s*F)i�71ڄ�1Z0%�y�p���vF]��G䝺�פ�ѻ��z�� �YR��i�F}§��	4ݍ�\��A��\υd�^u��o;W�:6=� �9�?o�K���X:H���J�����O�C�X��: Y���u� ��X�xBE?..Ư�R�9�7*Lp8��5���3g?�ӣ�$�brў�J�/yOd��\-����\W?��V�7��&�"���=��2e�/�����(r�5���}z�9S!s�b*a���g�ۓ�$�Qw�<�-m+ɦ�䔔P��1G�qV"�<8nx���D�9��E$I�CS�z�"�)ű�zdA�	��@8[���U;4�	�t{5���I��u){�� \
7#W(v�*��M����@B�yVŗ��^�^�g�!��X͜a0d>%N,��Pǫ_���fdf�jo�8bb��L ��ϰ�Ȉds�z�]�z��'/�u�h�Tn*@�)����7l��q ����&!�u��J���*IS^ ��BƖ�$�yKS�@�'ـ!y��̂Zx�R��9'Ea��_��e�"�3��vhO0.k�a�,�;^�=c5�o�]��lL�Qg�D:+�TE��	n� ;�r	c�+X�a4��-��>L�34Y7��o�����%�wXD���%����G\���@�e����{���&}�KQ��$�����z}�?���b����`0<�"�){����4��U��>"6}���&����&<��* (!}�_��-��5<��ŮLG��!�a9�S/����h��@�o�s��A�h�5�	2���NW�t�}�����q.'w��E�����C�m���#�'�%�����/�/�W-��=IV!�n��Mȯ�j��RT;1No
�1E�ѫ���o[0<@�={ҹ�8��S��qZ
�fw�gsq<�P������thY�(�]0��+#QdĲ��m6AR���ƓtXn\���Ҥ���������s��(?W�O/��������w0�Y3�TVއ
`�I�b�Z�\�����
�MY��;�My-B��)��I��G ,=����󍟑}da>h28Ԝ+�3���Y��w��$�a:�E����4P_硗�E���b��wi�'�}�^ܡ��l�l퇷�������ldJ�Z_�("1�)Y�+�Y����YVE�:B&�=����c����F4�ؽ'Bd\�,&P�Ppv��x�90�/��O���r�R���s��v�)�(O�/�l�Y�e�^���E����/9ȼ�?B��`�{q�����D;~�ݦ-���b���FV콑��+��*�s�����A��G'�V��x+ʔ@�v�D�8���R2Y۩��Mp���Ựe��\�j�RAk%-�I�i�H�qd1��������l�ߩx�&釲_��2zO��b�O�y�6':Z v�hQ��O_�t�l�qh�'�����pJ���[���������M��/�2C�u@q��kO:�+���E�ɕ�K�e��}��Eb��ߧA�Ȼ~��@�����,˻3�o*�������p�Z���e���;�%A��V��C$y o�W��	]�d���'��p_�,�U(b
��җX�c麦1�r4�k��5�;��/>�����֥�
/���oC��쟦�ܠ2�B&6;���v)��!����+@B&�������:ӳ�㆖�|�n[j��/�2k=��%,L^�����<\qn���&�J�����#�Zwi{�;�\�[��R��Y|&��^���o
���Z�S=H�TR�I�j�(۳�	k,�1P�)��WU�H���xxEg�j�ѝ���]�ʖRK�;�g�c����>���B�G�&��V~;����=,P�h�������s�׶o$�2z�:�� p����;� R7ڟ��?��p�T����;��s���^$�A�����"��~�6 F��6n�R�8�`l]�����Oc����B�J����t�+�qL�<I$��8�br�Hf��Ϳ����a�p'&�l�F���Ue}���J�޽�Z;E�b�2e<��[��paT�L��&�Pk4A�;�V^��u�����)x~t���f���#g��o�&)~6��s�n������(;h�߽�/BŖx�pë����_��@�)����-SHZ�?����.�,GZ���0�>�<���g|?9i�ƶj?o�E����R��@��n��kÿ�(�R��%�SVb��N�ֳ�Owc���`��F���>���i;g�q����)�ɼ��lNߌ
��i�����3�3]�)Ȑ���м
���d��P7����5t��u��<�fY��){��;�C~�0~9͓�.�� �������cC�Nk^ȣs���I�7�S�6y@x����.��q٩���ff(E�n�fNs�׏��Y�x�K?[Oמv��y��Vѻ���g h�^���R(:���VB�(!&X��E��U��!5½���
Y�90��ނ�F�c㌅t�t��V���xt6	�'E�Hx^Fu������ԃ��ȣHU��`?�1^J�	,���5N�)b��q.�ݽ�P�9��k�$iX��	�kC��L �ib���vR��o)�V�GE��6�@�=�T��@'k#�x��r�}�<|�č�C���P�@DR�̻~�ᮀ3;5�`]lD":S�\~�����j@����v����A�q3��5�&�����u��d�b�X&7��1�c��0ut�T����dG�8j��g~p�;񲶬�l�^�y���dTzM�����F~�TJKd�����CLm(��S���+�}C�׮��T�{��NBR����J��u?��'��t4�����P6w{����˾��20�a�R�+�?m	��f߼{Jb$��RM�_��:KjR��M��/����)>��T���A�K�b��Vl�>��#�%z&%R��#Qh�sxX8����J�&5�A7(�6y�Q1(�R�!T"x�o��R��.C���-OĦ���4�[�����X`:�:��@�����T�fC���~VK�Kó�H�
;��ʿ�ցԋ,Sh� ��SbA�|L���E_�q��"�	<�Gr��<�_��I�-]��cB4n�`�$S��v?��!S�Gh(uF��[��)�=B#�5���ͦ�h=��Y
99 �T1-��xP{C����P�Q�~.3ao�Ϊ�`$��2ߡ�8J~2ki���ҹ��[�Q�|�S���j �@�ݖXYR���F���o�G�Wi�d��d���93W;wˈ'i� ��qc:�R��!T�}F�&:*)߳����ߙ���3��W�8�ޏ�6D�t��no����{�%�@�c���e8��lvuUt��ތ��&t�Oƨ��_��n�Ww��ٖ_'�opR�j����8`w}�1L�2_���ߠ���:�������N ��}�l$�%wop�ՙ?!�>):��}�k�ȾfE!Q�_�����E!�ǣ��
����}�bI�>m�y�[��d��.4p��tq�@b��C�C�~6�HF�kϭ�E� �b]�Ľ~`N�\z`Ϻ�·���G� Q������n���}<�@�p��M/���Wu�I����4����(�{K��/�#�	���z�I~��{[%�H����L�߮���^���k;"ސ����Ʌ.ِ;{�R�� ���� ��:�e.I�v�Cb��\(�)%ꡜ���o>0�Z	)�vlFqf�����ƛ�d�Ƽ~�>���0{!]���lS�A���ԺwwIƙ���m��r�|�^�1�f�l�u讱��{2l�����)�5�4B���e�zkRq�w�o���T�k?i�"#>%��(�m(Kjwt�����ŐQ1�9�4Y�Q�{jG�'Ն��a��8o����Ŕ8"dQ�vwH���-�ɕ��p����@&yW>��	&zS[��Ms�[�iӈ�8��މo��<�	'LF.9EP�����i΀c�ǐ�#oǐ\��c��o[a��P�T���n�2�:BR�6{_������ ��K��M��C>�a����?n]#&#���y��.�a��f)�q5n:e·��k����;cIi�B��h�%]��k�̉_e��׃��s�H�8��*�;���L��*�j��&��8���+��'i;�Q���~��|�'9��ў�[w�TB��ʓ�룕I^[��>b��q�r5�jˆ�J�6㱮jJ=������l#p�{��%��M=X���e)#y Sq�L��YE�tr k�.TP�����/l5�A�'@Z�P-�궚�P�_�����c�~�,~�%��������f�1L��?S�-����00Å̙�s�~+q�a8������?�ݿ|��)�V��V����煾u9���&ǝS4���m�OCu�Ŀcv�z�P��5��<���r��'�N[�MT햚����@����A>g�z,%���J�2���[M�?T�/��T#�{�=0���,I�^���x��m_������)��0�'�jZ�у+�0�4 �����!t��.-,/�A����{+l��Fh��7j�?+ f�~��7�rM��$�9rɡ��>����ia�:�re'�֬�q^Lea����{����/��6���V�]f#^����
v	�zh����'�yq6y�պ�T��-���!�&*��|����5;�(?�.��yK^I@䓒p#���мpʖ�Mk�PMof�n(�Z�%���3�Njq�`�	��"$Y���G��)�=�[[�SMAF���	C����^t���ӿ���3�F������x�8Z�諳՘^��n�/��4����dR���]b3,ӓV�n�Y����N��lFh�hSɔ�%X�s8��7C��ù�$B6�+���G�ȩ�H��D��t4����|(_�������XI_�bB�97sإF�F��s���?�������@�N�=WX���F߈�ނ�\��𺊩DlQ�{v�g�Px�7�d?��:^T�+s&!$�_aS<t-сn1���^�2��>[Xz���b�9��E�w�1�m꭮�yYr;s�y}�
D.٫��H1������v��Ba���,4��N-B`4��:���Q�#n!�G0r̓���}�������r��� �kejt��)�^���b���\��2��N��?��++6��9�=*�1J8�$�W��+�4�U����=1�*�9�R>��gI�)�Z��F0�"!牺�������ᒍ���������{+_%���Ru_Z�"Q��X�����5O:Zp§*g������m�)�S����1!Z Di��+ᤷe�(m�����FP"Ip�ݣZ����vZ�zU`_a�X�bI�Z���=�S�s����8Oƒ
f�>����k��׏_���o%;�
����C��j�e'J�Y�ۑ+
ذ>���6<����@��ųl��d�#H������9;Fz�q�����o�<�Q��x������1��e�%��������4Kj"��6?Ռ��R�P�[�SI!�o.��9#���&����U�õm���R��a�����"^��`�v�
�(�E���.���\3�w1,Q�·6����B�	�;��{R6]g�վ����$6z;R������+T�h�&��OԪZ�(Ȝ��j�$��{�_�>*����FI��VQ9?�j�9�PL_�vj��6�S�m݋��K�t�C�jF�'�D{}ϔ�U��2CuO%��O�j�;��*��R�lbZ֋����~�_���b�%4a�=稦o��y�o�@�d-����H,�q�T����-��p�P��2Svs%��T��,�w��4�|��eM3Ҷ�^����Rb'����엾VK�"���m��ާM3.�v�`q�)��f3���m{I��V�a��"1���l�Re9?��'>L,������X׻#��OL��4�wĥA1O�`���174"B�*�퓹_"��C�ϼ��r���t��e�����B�V+.�K�(d���> 3+~��7����3�ho[�r&Z.�S@((������"�w�^��7���^�տ�_�ꊾ;�wN�����Ԫ8�n8J
�̙�jg�=��5-�V\�w9/�9 +��#3a�q�.i��F.��͒�G�)��MP.���q��\y��w�C�^��ֱ�l� �L�0�4/�{wid�	P�{)�� ������8�h��ŗPV��r�)��0�s��~S��;�y�#S��u(c���	 WS}���mK�Om�:��P����k�>��-�It[���)�O. ��kC����]|�=꾑�ٟ�E�T[�=�R��W1�"�C}�:��G���g�
����v���/��ݠ�.?Q���B�d���q��#I�A���**����v�hd����:�B�,�.��A��zǇ��0��ܐ�rcа����?�>cd����*(=������X�`�N�]�TE�H�6+V-�R(�e   }��m�����58���M�al�y:�s\��Q�*�j����Jb�G�(��k�#�n�9{[)��.8��,+�ugv�=Adn��2=��1ei��.���4 �Z ��m��ƲOxS���B˟ż�  ��A��O�B[Z!��b(&P�� ��:����[���O���e������ʵ����
��[	2j�)P�\�Ng��Vڶ�͡"Aã�i�9�n�*Y^A�}�5��"���/���yh�o#���r<��8�6�l	]y��XS�x����jf0h/4h�'lK�n��
2_�2�qx5F'�S[�N����y�N8p�
��0Wq����o��HY/��sR�!$�c�n����4:���Ӊ�d�Pe����"��P�8�_}� �3��~�;ſ��tK9���4�Յ�o�sîP8nK��������>~��l ��Hn�|4f'q :�?�����?-�dK��$_&ؿ��o�e�r۰��м���;l��Ρ��e��l��r��`��޳ 7�mV^/_�.νk]}Ӡ-�"�m�d���KfƺW�[N��ި1����x��i-�j�w�(��K:�O����u�J���J�g��6��ĤD�P7��f��
�4�`_jX���blt8?�o[�ϮN+��U�� ��D(�D����)K�ʐ:a�p+ �,kQ7Cī�!'ۈhW�L8�ސ!XS�zע30\����<�5q��emb��V�b���Q���԰!���Q��?�.�Aկ���pR�'��r��֨�n�%�"���T;抟�HJ%d�����G�T�a�}�K&�Y���Uq�Q瞦4����O���6�� ��N1��'��o�鷺0_�������w��
~.-���d+ĩy��ma^_8'��阛�<�@O\q�4��D���ҵ��6Q�(\s�4k��9*^��*�����[f�ZU?�ӟ'�ډ�}�:��Ïdi"�PɆ�S���'����5�K��A?m�T����g���}�I��N
x�R��H�I+YQ�,����&9�B�au�Q�9O�%�		)�;����|���.m��R�����Cx������v�4���v��q�T��rk����3G禟!_�5��.�N8�~��y�͊��ۓ�@	��'��*q��ّ�!���L��0�vN����+߅�a޷kq�̀�sʹ
*> ��O?�����7+iG�Y8�{�2�+;��TC����5�|Mg����C��=s��c���������;t1��U��τ *�^��~��L1]Gr���[�mm�F���F���N[*�~�b�R�Az���R<�oگ�@��Z;
���9��T�eY��K���_��~\sns j^�l�f�pv%p�q;}?d������ �ꕅ�����Rln��y{꩷����7L|.dڌDnÍ��[�=�����\����i(c>L�ۗ��}T�`\�ׇ2�Jqk~�@�X�"�6jXM��p�n�7�-N���Q�)���'K2{�N<H�r���p�V�80kC��?�Ό��*�bII����f.���!|���ot=B��П�%Ie���n��Ah�kz�!�.��8��YK��]�����A�Լ�����m�3/Ēb4t��#����щyx��qd�B)O7o��2!�
��#+<uu$�����@5�5}��pH}㚡��"�V��>Jd�� r]��I|���wj��`���"�Ik��C`Lb�)��-������O�����ۦ��!�6˾��AƆu0�y�	�R�ow݆<�#<z���y�@5`�}o=�zhKJ{�W�T�# ^>������sp����,�����\U� O{sי�+��@\�p �������������q�ex��
���s������G��J3��I��FE�шN�A���n�VR���XT�H���{�&�fT��ϳ�2��)'��e�����]F����L��ߣ�ۉ��18��`��#��2��J؎���aNc۽�Y�PGSs&��� h����ѯ��W=�Gm�Y�e�GZ+L�O�������ϝ�L�tÇ���OhS��� ��XsS��vH1q�^����a�����o�`ix�[��5�d�D^\R��	[�}\��۝�hf|j�o���͆[�
3�/֒�:	qZ֛[
��(|^i|�)��q&�B_��5��^Ğ����m�1E��7�"HokA4Os�Ɲ�_��y��-�_-����1\f���8�)�k��A��q9v'tD���M�K"��9�Ԃ�@���H��_��/U��6ۭ�O�h���~ߊiH��d=^��}݃A��L��Tt%D����+#�o��	��N���cx�b���v =z�F*�������v;	�-<�t�1���ғ�9 ̻���v�,�>VX�;��i��]�G��Ƚ&���捆iP��䳏�(3�,m�^��w��u��6F�d��.�nCG�������Wau�*j0����|�I�_Pӂ&���c.� ;}ˬ����a%D�葐ā�Y��xw%����7.����0��m��n� ��g�����5 ��(��q��%�<qN7���������/��|d09����1*j%�@���j�c�����Ì�W9O�S*��+�H�����w:���;&��M@ǣ(���!�>��IZ�f2I8=��x����ΜqqK��f��AT����<��c�U]���r�D�X�tǞPq�Y��J�q�;qt&B�(��&�۝�DU���)?W8����xBzV�
�ft!$B�qg�2�"WFt&�!���mT�y�J?{�ʹ�R���zA\���|��Y�|[�}�<�V�����vȃ�W�q�������DלP��y΅����x��J�<Ŷ�䢤�l$�*捒���['O�|�ʿC���?�j�_��(&����h����а�Sm�Ζ��-�֌��*)�H�,��ar^g�a{+?�$�&�N�c�y���K�z�
�C�FqP��I�������w����/b���V�W]\�D�2�xMI��W��d��]��@�",(Ɩ��3�<ۭ?�	Y�e��܉�HZ�뫆r�Q�Z*iFh�,z`��$��'1�����ߩ����O%
��qim&m���m�q�͏mq��YǦ,S�dG�G�K��?�lK�έ'�tk�,{�h���7_oM�sC��J�����LNҎ�������3Ժ����1Wb������cQ떐�W|�/���S�}B���S�������r�zL�F];���E�dx��7���cX��4$Tv9c�߸�{(�N����=�O�J����ka�aQ����2z�e�;��_�ݝ��8|�!y��~�Q�X���}J��vuB����p�S��p�PNB*
���Oޫ�����=l�p��ԇ������T�Y�?��[��Q�c���"8 ��'�!�\QY���D���̕s�����A_	��|Z��j<c\��nS*� ��\��_<��/�ifC<���z��U��j���r�����Ya�"e($���N:-[Q|+I��>䜞�M�@�A�_���!/��8$�A��3x&z����<picwQ�= #�مژ?�W�ʜ?p���{��+��7��?]Ɂ��n��������B���d���pI����ߞķ`o�*'kj�Π�՚�S���������c9�����WW���i䈁2��U��ohWq��1�_��8�uS��0ؕJNզ���T�x��z���YK���#�
�Y�A ���rM0��k��7f�{2Qىd�p��!�g��̀����[�� 1�OjS;+M�.]:u3�ɚ�|�V�h��{[�	�������URy 赺�hV5f�¿GeRm���ɏp�M����35�̨��1C�Y���??��Y,�FKE�#����Z�<�}�Bg}�e���%'H����B��ܵ=�sL%݀L"(8�zq�5T{CH>���j���hBN\��S��C��<ty�ʙ�MrZ���۪P�� 6�'![���{无�Rվ�;h�k��{;"�8v��2��V��#��:�[c��:@t��B���+2��-p����Hs�,ڒ�S.���*���u7*�~�r|j�,#I�!�'��σ'��յ��!b0��R�,��B>�I�dqߺn��u�*��2��zM���猟���؜��kl
�Q&�>�q��S�ض�Yc��`Ē�_�R^ע$ z�c �1�q�\��9�\��!j�s�K���{'k~����0/���%�\b����i�e"�z�x"�_2�M�B]�~b+T���iO� ���O�M���(*��}�;�!m'�pyWc���I�/n=�N��@lIm��k���������)z��k���-�n��X|�6|�Է��#��疞y�S�˧;L���zxK��сya������[���0	]�㐆��[��ҏ�.צug����^߁۫�t�Sw?U!��
������iIy��^���� ���ƅ�xJ�F�Y}����mtZ�m@u~���z��}
����A ��Y%N�L&�F�1}@�S+�9�!�I�]Ǩ�N%�5vj�>a@������0�eLE�4�O�~�̜"�=�����`�뛻�3�ա��~l����}�ΝL����6�|d�|�dӄ<泩�{�C(7t�Jf��#gǿםo��8�v�����+��՗`=G�w�ޘ�I���W2^]_�|Ő �%�_ga}5��4˞/���;��S1�d�΂S�02I$����v�{o����V��9����Q� ���	v���5W��l�-��T�ӻ�<�@2�O��2\�o���^C��]����ه��KD������[���K<���+��Zg7gpWd�(-�]P���m�2D�!܌����@��qAͺ[�nP��Y��2��~سM�p��%3<v2�#|��&��XjAҿ�ڎ�x�c�����DM6XWY���o��s�:���mR�oJ�j!3GِELj��ZU!�M6,�(�-eR/��t���.��F����ݷ��9�`�D+ma�V�/,ϖÍL�6���������ɝ��h���7�h# a�rc�d��;�(yݑ���Wr��&��s��Q�ֳ2k��s��X��k�?#��� O:fr���*a)o���D��ޱI�L( q�R�_���K<�A�)D�{6D���#���iꪊٵ/7d��H��A��Q\����(RW�lb��n��d'��o�l�z=�3��Rf���D�f�/��3p����1��㘧S��Ej�#�5�%̓�A�$y��PX3;�PJ?�!����+y�8�c��WqF:���I07�i������J�������ܲ�[W�-4+���y���}?>�ݘ��Z� ��ӪR��B��15��ؑ���i葆�y��:J��NtLv�+�@�÷�  ւr}�8�|�|��;��� �n}���&-.\#�4Ӹ��Q�}��S�O*W#k|�X���_4�&���E�����h����cy.-(�ʓiW׽�h��e�6��ap3�e.\[c;z+J�WLJ�c'�r_bPe���O*��CӪ��^Sw�s��ל��u%��˓��~� �f����=&��)%�h��=�ix��sM�B�{�Ww�~Ol9FA�MQ8Q �]��)���WSw�N|"ޕ�mk��W��l�+�
�� ��R�
��>��g:�7��)�j���͛��B݂Q����b%��NR��<ۤp���--��c�l���޺3��?���ً"�]�*SdI]�I���	�Z�@��M2<@U�!�T�Q�7��~yz�z�|XZ!4jE\^>��Р�)_�bxY��g
�"Vް��_NV��$M��^�0Q�`/�У��;d���\I�&j�cuo�
5��/Z����@�B�p�1��[s�<�7tem�<���|._¨K/�Z�փ�P�D�o��W3&i�#�S�З�,�u�f��ս�S���*�DE�kw30�-���Cd�W0l� uv���u���9a�~:%}�Y"N�hF��_��e�=Pq��V�{�#��[.���;Zs�~s�[C�2�(��צ>w;˼��=~Zg���N-����9`*y5��*����*� �G\��E�FWi^��{�NlF=�9�Z�?�*���B�� ޒ{tu�p��7K��{�:����,���vk���U�Q���Y,)1�>�
HI�2��6���RIf�34�5	'i<���	]xJGv�K�S[�]y[5m����d8�$%?!��d	��!U���2���?�pB+}�@�Gm^�4��,�Sx��]�^T���$�Z�(��jvVjʎ���82���Ai~����jj�>��K���V�����U�� �C�A%��W>;h����d|�i�'��	�~����z����r�Y|���S�M4�s��)*%9qp�'yH�<��8*=��,�irGE޾b���RH5ך����V>�z�	�n	o�6C�.44�2�9Wd��Ϋ#�wh���Z��EP+|�j��ڨ��'���c ��t�0&��YZ-����c.�ȼ��P�62��N��[�7]��v�;��A�<�3ɰ#�Г�\����="yt��Ŀ�PX�_�y���P����}e�� ��nU<�� ������p������a��գ��A��Vi�k���klY
L��[!�gQ2��m��v43BL�6��`2�V��D�(�ڍp���#wɥ �cf��eB;���k�r��h0	�T�w���ȬR�GR�`WdBbδ�����6&��	�
�K<�<We�&h�	|�o[�������;�P��C��L16�l<�Y<���d�nƶ���s�������
t��1�|v�W(_�'{?�'�.���v�M~���׊pͲ�%d1g���3��6�R��{d��^�� � ���6�)X�?B5�
���r�π����%�42K��@��s;������p�| �)��WQ���*�d�&���Lm�07z������z4����悇�>������l2�%`�cd���+��0������~���0�#6z���,�=ɢ���c����y�㰓�}ډ�G�f��mˁ׾�_�`�8kO4g�/NF����%����1>�b���Z��5���b&C��+�?��ʑ��ujѫ+���
��h��VY�OK�\D�A;��S�'?��M'*��o2ثC�զ�ˋ�7��r�`��C�;��~�!d/iN�u�,�'��!E�6�g�7�1�Y���ˌ{�oZr���WgT<ۤY��ȷ�#*�<�˵N�z�~����h�qě�Q�7/�Lq�)]��8�z<�5�w�&��Վ���I,z'$m5��2���H�v����M��A��s�ז
*����"��9�* �S���]���j��x5���?�J]�l*�E�/C3`"	WQh��6�o-rD�Uh4%��=� .to�������׻�nl!��K�s�3_��$�26x\��z!!��{eڗވFK��> �D7�},�8F%	16��\vI�- �iu0�����0W0݅��O�|��}P����n�^c�[H�QF	��D$ѩ��i�i��xC@	DM@�7��h3L!�f�PM]�Ɂ�ٍ@t��@�%��qY�)���ņ�#5(@V��m+f�9�{�=�<�\�W������h������إ��<ņVΩ�P��\H��!G�Q~O�[M?DD᪟A���R*�E����0�&A�B�/gs��!F������v9L
�O�W@��25Pv��:M4�|Y��COB�>�W�]�(��Z��@�VY���d�ޏ��9{*n��������r0U������A��6��NE�Gf@�s8�]�I>�)Ƹ`�ܟ�K�l�,�}�/���m!no���#OD^F8T&Q��sZ����/A���9m�Wa�v���sЧ�1�#�0��$?�j�^K]�O����*�ک��L��5;�3i�O�S(U�؀Zj�$}bXĽԛE���ղ�~��9��|y0d��?M�6rG����w4�^���^��#F�spo`p�e���80L\�-�)~hrf�������mdC�9,���計L�mM0��,�v7����i�kg���o[3�*|N8����d0�b|��^LvY�[^�)��ט1���1V����g����5����>孹X���՜0�gr����T���:��>@R��w���k��0�(�Hsrx�l��9�ME����K�W,o��H�e	|BEQ�(�]}g���Q�W�t֥�ծ�C�@����n��-���H�t��Ҁ�b�0����}�n���\w�$��Ha"��9;���}��x�q�lB��ٕʥ�]��h!��<��u;m��i�?��:�����::T�Z<%�����	��8W��{��s���7�K���i�JM^Ѿ�d�e����?��4�nYTA���x�\���'7�UǕV�*�Ր��eèL�V�Ͳ��e��ɐ�"�JO,�!	n<��kHS��4
��l��K�p0��qb���/��N.г��?�!�sL����B�ȅ�����Â�Ћ��-�z�ƨ���D�NC�_`�<�~n(��op����q�3���N'+�!l�X܅(y2�������yn��ϣ���1G���ڍ��DU r��4���њ���.[(����Ҕ��b{o^:_��=�nP�" �1emÚ��Jv��I����1n��
B)-�6��3�� '�3Nz�afi��*�u�t�Z\�tT�~i>U���������k�	!�aĨ��g�򨓢�!�G[U�1$l��cj"����y.�I��#C^*�	���f�f>?���w՛�ׁ>�`�,N�/��k��!�*�k/�D�ҎB[##b���g���.9�ҡ����qU;���G��x���Dȁ	�Ց��ŞB��y� �N�NZՌ�;���c;��K����m��3R��0���2hb�9�O���
�`�T'ˊ����o�7Ce9M�ŁG\&��U,�zy�����z�s᫨����V&9���K��[�Ed���jɽ+�1��"0
���&T:/�!zn2:�^����n����?G`Ue�U>�1�k��~��Զ�W�@|Y=��n������_*���_#ϖ��g���7�2��F}7��N@�u���EQ@y�n��u6n�N}�O�IF�� �\�rUe��&X�{���4V��� ��Qol�I�oն��D�^w����GX�{���U���lQp9�Qݒ���ټu�j~vހF���6���C�Vޙ���J���'���tc��i�����PK/PvU5�6�H�&B�Enֱ��s-��Lɪx�Ԏɑp��U�����b���@�����ț�5�&��a[��/4w�Rq���� (aKp�)Yݒ��i���xb(��|4c~SXmm7�J�yO�=�Ej��nPm/��v)�>9>��29ֳx��8��a�(���r��?+X	[L�b�2gt[X�2-���/��Ɨ���H���&\0��e�MAŴFx��4�7�� HG7�0Oo����b#���7�7'Ó�ޒǃ}�����&�����t����&�Z��.>;�$��8�.�������|
6ύj:f8W7[��nɍ����nH-@�{��l��@���¹N2*��6�_��^O��"c�d}#6�H0���;�h���vM��ϸf#�T��'�wp+����|�������US@�TX�u�.�&����B}n��]�K�!Em@���a�w������ʶW+F�FVM�!�j-=gO�v�c{a����..~�e����z�&��}S�O]��gdfH��D�p~Zb����z/n���)��4yp?�����ĕط�=W��V8�+I�maŬ�cG���ݠ�;��v�Z�Y�u�>���E z�i6B�_��f0�Y����1♶W=�����h�{9��<zsH��R��2����h W��Kڑkv�us�ɸu�T��}�:2���(��t�o��;�CS���A�v\�W�3G)���3Mh�����8^�\{�pm	(��\Qk���$5�"�cG���B<�0��ӘC��!�z�b7SM�g��5��4���bE��AvQ��s/��$3�fB�Pk�q�V,a�
F\�����P�m���|O)p����"�'��Aj:�W��>2��'�����/��T
��5Lj2�����3]JmԺ�␰�ÿ�{�p��F9��OFSI��΅+� yQ��-26����)��Yr�g㉴4էm��)�J��1Z��`�*���aP+�j�Q�5!���1����>�X�B%��C�xo-3�o\�V0_����l��,�P�䨤2�=[]-�@AQ8q�,4_�|W��	�dx�B����!qRÜ�)��(3ز�ua�C���2�G�� ���H�7���@1����^��@t�2ߧM���֨��[���'��9�_\�Ε%�&�4`�
.���c
��/� l�����7�V����F1�XJr���(�$��v�~k��y"I��O�<_��Y����&f�F��[w�+n�R~Yṭ)�HF7�(�+'���vΞ}ڞ�����Vc����p� 5��]0�����.Ղ��e���C�z�&IM��u;�G/K }O^����3�J`gZ\��l@�C����$�,�������J�${+��&t>��bj�%m�q"���E��N�KR�m��t7!���a@�P6�^ZpV�/s��5&̺��W����gC�E"��[Ԫe�"%�߳�n)��jtڷ�5�[�@Lz�ULLX�X��]&�-��|x;Ӯ����� �(���68�J9�t��l��Z������8�"�՛��	�aM�4z\E�]���V��B������x�;� y��4%a�6H9f��^�{(�����T1�"L)�B ՝k�S�e�s����Z#�al�.��
M�n�  9��?�qK�37��5��)jiNE{�f��r9V"�jt�z��S��������2���#*P����q��J�Z^(��ǡD�U�cq��@�9��v�G_�,��$	�w��]z��\x�K^[!�n� �#��@��eޗ hp�+�%��'����N���.��X�����>�v!fh���#Z�� �g2dd�����÷�Rf���g_V)��uC"���6"�\�k�!�l���D��S���`��t2g|x'þ�4D��Rf�{Qq�ֱ�7�OS/�0����6A�ۿ8F��i���S�^�H�H:L@��m�q�S\{�w����e��
�TC�=Zx*f���׊');�L�?<2���kœ4h��4�ќK	���lez*K�&�1�]������AHf������t
߄���6�,�`��� ;�+��E�' ����h��\�|<�r����8S'�������K���2�,��Ơ�jE}"
�
���Xȋ( ڳ��p�)���y$�z��mg�/3��̵��5��NZwE�+t&���!�b]d�I^8`�n�� �)5��C ��w�����Ef�ck���#�s��ζ��>f|����$�(%���}���
�U������	��8�������lb�t��@����4#���D���a6�wK&�X�~�
]��e5���iUS^6�3�8޲*���\%��f�5a�9Ճ���pVa�{ܔ��ѿ�e���]���"���W�HQ#T���١~���c	�*~�x.NY�yaJ���=7�/�Trӏ���\��nJ���d�W�&ˬ���f^�A��6ʗ��TZy�t@���q������ �`^�/jN=��)�5h�Q�6.]1U�p+��dԶ��y�eN���r���Ps�Km�;���v�����~�ft׿��[���I�j�Ӵ�>�*y'K���K��L=[#�2,�3���!b��1I��H�2l��a����~3'��#j
#�_.�������0*�j0xQ0�>��X��s519���.L�	Ёd`ؤ���Ʃ��n���"��|�"Ţ��q��d"�|N���;�vqT;�(�6�i�����`��5�s%GG��2�l�fo��k6�ϖ���'OIz��=�g �y0C�o����Ǡ��m�C4Tf7��������!��eY�ϺO�>®�ǔ`�v�c�)�8B�kE����if;��~F轺���%צ��5�9��OFi{� �em�����NߎTΤ��̓��S���ˍ�������;�Z+[�< ���1�V&T|��iX�'ɛWJ��Z1���;���K�������sEF~��ȲiY.��ь��%���|�\��zR�m!�a=@<0GcV�\9ܕ5 ��`�x$5��% 㘅ةa�7�"X}��3�l6	0�i��o%��<��uvZ"S����������ds��(�08�Ex�`���pE��Mc�y}����e|���8b�b:��P3�+o��<[���6ێ���ذ���,��H�!�xH:⣂4��KIN� e�n����
i�����av;���ޚe����w�E�0�������,U�i�;f��/���r^Ȭ�'��ɊS��e�q@9�X)���Oy�vIx�M�`�*;I$���Y���k���) ]$QqHb�":��0�؜�m���QI�i''���q��o��2��!�%��	�8ɜ��Q,�%�v���؇`�5@@D�q�D&׮�7�B���a�`HfX�0*VB��/Q+��@�<���2A�(I��$����0��z:#%��#��X2�j�����[���;����^�5��d�a�.�<-̓�������H2.�龊k�����mob��.vx�p�;>��@����}��m�f
S�	�w�4�.r�,�:#���;-M�����i�m�Ae<-/ zMml��4�m�r���e\sI�N[i��.����g�*���)�>Vq��],[G:;��%�b���Z��,g0xqq�B�#�{d'�HX��%�����B�֊C�~h
䀍��pP6^b<�U�$*�D�3��:�jN�t���ll�`�$~��ܭ�.ʪӤ�uw�៵��_a1�g)3..I?�M�#�ĢR�6���>s8�����n��P���|�1Z���G��T�C�K�i��i��\��o�P������*`�PB���Y�:����]I8��ʏ��Ӊ֝��kcF���bm@(�~	�u<��5?���?��QI�v�`-���ց}�'ʚՉ��ҟ֌;k�F1*54��e{F����t�[p8U��j'9�!kۅ�w�l�������G��a ȃ�G0�	|*ľ�*�<i�_
���S����eGB*� ?;����b���(������S�%V�§�F�l��q`8��5�9^�O�����Sw�鑠-�D܎,���; _���~�pk�~ii�rܕ��gv����LƋ�F-�I9M:g��m.�������*KeW;Q�\*��R�X��ٷ}=�^��Z&]M�0�t`>�'1�\n��˕$�WR o��p�b��{�,��p�濄���ɧ9)�%�k4A���6�pϢ�?v1�x��1B�C�T����XB��~w!{bV���1�yd��t.�x�Ā-u�{N�%�#W.���(�3�p�!ˤO1M�h:�;X�z�R���9�&��m_ɭdSQ��������Ӫ-z˞NT-���8�7-�d�B�?��B�W/��Ra��Xd�Y5�Ije�i��� y�Y�[�j࡭��#����r�70y^�)�%U���ƙt�l�"`�&\����v�viH�,�V�je@��fUv�C��ip��x�C�Rk|UpUN�[��)7[�8e��kLWG���cT���O�{�/Y��U ��[E�!p9�H|��eqD-i	t��
~'**g���#���ow~�&C��ZY6��NwN:tXS���Z�U����/8���C�,i��	�}Mv	�X��ԯ>��]��*]^�*�d"=��5ɲ.��,�,x{�u\�~����81B����ȅ�#"^���Uav��lJ� ��tjӺF�4�z #���|�-�A�	��eS~��pl�boj�˼��t�c�.�wf��,��9�v"Z4m�S�%�tp� ��QJ{>�Q��=t#���}ʸ��<,�'>J��$�?��(aȬW�� ~<f[�B���~?�]l:�.�Κ϶�����L������m��.���nʿE>� �'����@lCve��EJ�n����[�o�1h=f�ʢ�ѡ�>v
D�<]�t{�ULH':�[�<wzj(�7�#Ѓ��UJ�S¾���=-���
�m���.����QX�
%�L�2�L������]��ש�{NB�T�����;(?iP	ӥ��%�t��\f(��{vd�aX�s�qmSy[P���zR���UD�[�䣑r7f�Gb�Y���q<-��	�q��`k�Co0�n��ג��ȶ��I�Z���w��^ji8��Jw
���w+�!d�w�v���rD��)K#�Rh��BUu}%���Oؑ
'2c��|�����ޢ��f�o��1�/���p<U7R�pM^��;0��K�Ù�^
TнY ��En=�Af�o��v�<�މ�%�*K[�u%��7��O�ߗ���X�1�f)�
O������	^M9�Ӵد]G��l�M�KE�U*m'F�uܯ^��ӽR�/cЯٖ�0��o�� �ŉ�{����9����<*?�p�{�X��4Y��� [�i+ϯ�$�en>x�c̝�x��3u 3�"ۿ�EDx��q{k�5��p	J��V�Ӄ)4{���c��/�-���r���8Y��*aܽ�Ԙ���iqf�v��BG��Ⰵcl~�e8KC^����#�@�u^7ԋ�^n��β�k�̯ �\���׶��)*.Q��������X
[)%�5s��C,�X���ο��vv7m�f����6��覣0<:�oLH�({[A�ڶ�,���VT�y�F�c|�N��n@�ŸVy��i-�X��qL:�4�/��|���+�-%PB]�N��R�,k���GE8�i�|;�8�B5���C�4���G�4uS�X��B� �a���PTrf�dF��Rf"&�rٷ�x��e�����ч@N�a�1&{�|}����C���l��D�3��C�4Wܸ��؏��E�$:+��x�:�����8�����>q��Z*):�Mu�5,޴��t�|>��X�������|}g���89�X�]n���"K��.�����9��I7W�N�zUʮ�Y��@q��
`��a*�h�( �l�_�v���cB^�1�MF?8�"Zv����c�\�-DE�u�Fhz��{�r7t����'Ǖ��j�����]�d��<݅f���p�F��l&~��lַ�K���M@����,�]&��6�[�v��c�2�j�2�d�d�X�B��(\��8�n|G(��V��/��F"�����V3�G��kX)��N[1��r<�Z��f;ۤ_��E��l�>�:~�
�X4�@=@J}@�u۩�~�f�pA��ۃ��9��6;!&��wھ�$&
؋�����{�<�6���f��=�0�xN?q��,k�2c/��Mޅ�?:��V�֢����YIG���l�G>�|�OL�1���3��]C�ic��2� �z�����l�ʴYEU���Ny9)3��X���_�Q%̕U�_�H��K`QY,,n��DةG�b&�c��� �>�ɷxA�_��E���]�dk�dE7�I"+k�G"��O@Z�i�I�a��͗G�=n��6)�P�$�G��{9T@j�7�u�q�_۬�蠣��x��Z�ءZ�AsIR�/�6���9�T�izQ��|"��3&�w (�����Z��S1����7o	��?��πv���;�>#J$��U߃��,�*p��}A�����2�M'��>���w���	p��O�[>X��t�D�;���6����E�=Z������ߐ���M��?�]�Qv��aq��\J+�+>�%�RV�7y����b�k���D�V��4�&(�󒝛�4�xS���+u=]�V���"a�ނ�U�-2��}�{wN�
ͥT�u�VT���|$d�-w��PU��o]wL�o@8�����6�u����H/�c�ݡ��{�6Q���ы�8�E�ea��P�~����c�|&&Gŕ��hQ%!��:��ݲv����\-#�9���pqWĹ�~%�e�0� �L/P��`�;��l~���Fo?l�?V��5���e��X{�v����u.��s�~C�W�eVd�?������
�]􎺩~0�h�/4('������M�,����1 ���*r:�C�����E?�ua����8�V���ӊl'.����4=_�9K�s���&ܮ^�x��:跅-b�R��S�^le�d5��t�ͯZ�Z�m�y��1�� f�>8BN�su-#Ni�%��T������;*u�$GB�Up���]ī�n�h٪���|��س�	e������5�vBv��d~�;�/y�>�]�D�o4����U�ax���H��2�
��F�����_Ѥ��,@+���1�h|���r1���q��E4&2�. �v�0B1A���<���b��D�����(��4�'�=�)52;�t5��ϗj�/���W<�ݞ��^Ks��g�ݐ�8r>� ��Hk���-���#���X�*��!�;���_�?�dm�@7�Y%9Q9O��?�6��QF��K�oT������� y�"=ǲ�#�H�"B���8��6,5q�;ۤ*�W�iԊ�v��)��9l"~��pf��[���jd�ɢ�0���8��0�x2��0��*�u"o>���Kk8��,�N�[/�G��.�"e����cےN�]���n�@��]��ʣ�T?�<�<Ds�{���>q^qޗ�*:��YX���ѳ�	
��y�b����ۅo��f���e����RMUO !�"�L;w�+P��!��	�v�y�7��m��TU�IY2��F�(KK��s�o$OF)|�6��9�ZC!`�[���4���t6t�+���3`2�����.ꊭ�]��uk�M����W��)鸏��?��a ���Z����-U��Yj�{bw\�e�3��[����a	��&��\d�Y �X��J���y���˅�/	��{]X�b�W����7	�2.�(,��GhB��	�!�֒�d?�ܜ��j%�)����F��)�;�G��u�'��vĒ��@�����.[��@�}Ə�L�4��ɫa.�%�����'x�3� tI�rR���E�b��Z�����Nx|<k�R1���?�ZhW�7맪�����Ol��<�ݯG���ȹL����=}&�vW	SR��l�}�{���~Z�!�%����QH���T-�Ҽ��'xp�|�<�F�!m�w]������c��d�4c�mQ>��W�H�11)"xg,�pO�l�D#���=����l�7���~��3��|��*e_��Q�%�믿���x���.4��-��c�ŏ�C������
B2}%-�jaA?�U8� �c9Gå�%�p�b�繚��l�m�cfC�[��Q��(<�*vg�j��L�.��T�@�5m�C(���)�}�(m��ޗ����H��P��by']�]��
®˩*��˭b�fw�_9kD�*@����������39�l$�����.�J�+���N��3X���`�U�@-`T�zW� (�޹�%��X�F��q8�u�K����߀���L�O�٩g׵#����z;��	BZy���˙%���-7���YP��L4Cd��d��Д�3;¼�]d��[m�=�W~�@D�؈����/�S7��w�ێZd6:�3?7�⺼oo�*�T�8yQ�rݣYL��Y��̉�*Kv� �ʵ��Aa�E��(��_�X��ʀ���J1�����L9^W��e8]������M�q�V\�Bd����m���aRĹ�lv�V���>a��~d���:��Hͱ�*�A�����	��%��K�b�+�Z��1 ��W��Ŧm��"��&X����e��I��_�JZ�dT����?Q�ӻ���Dq�N���ĭ�O� �+�xk�6�ֱ�q.���1�	_o��A�6��ѐZ%�)����2NQr����C�$!�o���糛o��Re�l���p��C��$�ռx�<���Ԫs��#�4����.����@S�A�?tĳ3	f/~���jd�u�2���_���P]u�����"��q�w1v�a�wl�������ɶ�ϟje���4GXD�+4���V����L&F"��C'%�LC�QN��'UVe[�J8n�Pl���4=fӝ�������H��E	|��&%O�z�ն&K2�tkDϮT!�v���HI����ae�����o�o�}��^��t;��8���*(��2G��S�o[	�s�,S����sm�/���������&g BΥ��Rc�2���l�
�u򢪎�s�w�u�!��Qv��E�Ey(o��ۯ"ҀqQ�hEMT(��sA�8�o�����y_��������%�u�em�e�G&+2����Й�|�9c�w=G��9ŭHk�6X�(�j�;óQ#�ǓX*\c�}��?E�y*DГ���������w�$���#n�C�7n�;o�'���[(���B���f��\��Oܕ�MG�Z߱Wm���+~;g���	B@EC��dcB�r��.�gkë��%q�-
�_�aOg������L�J~�g��bᾜH��*�O��Y6=���������.���������zē�Ww�|��،��
���8q|mp� �r͊��:�?��b�<�;�)a�Ǵ��o6Z��"��=���E���X��<��$B�́N�ƀ����K��K��5M�@l���?��v���I�՗W��L�r�._�-���ߧ{>�����	���~�1��{"�V{����{��U�1Hm�7�J#J��%�A젌%�	��w��^CwCתڐ:Ѷ�I�%�Tčʋ^GV���l��'�[��<��;1����s���W\a�T�)n��\Z^�Fk���樥(0�b-Ļ~\�I��ʙC��C�+b@��/H]�F���zH4�8�� :V���\�H��Tu`��7�UZ>������q�aB�e7��-�I��3���h���|��Cy�P�R��J3X�T⮜��r$':�_�?ʹe�At|(��r�P�
������;�3p+��><J�Z�xw{2if�ʑ�%��PG��Ht��3�;^�K���Lh!]�a��U����9-�L��L~��V�3�%�������ŷ�v_	��Yh������K��J��O��a(>hI�6AZb�V���W�ړ���8S�r*�Zy�N�@ [����6V��~�;s����
"%������I��=u���2�V�Ow:YD�():�|���%�0 utƗJ��,Fa�r�%��4�ͼ� CoE>-�yyT}5d²٭�G��q,�L����)%���x-A�8kZU�r���;B�7C� }iļW�(N����?D�.[��k��-X*__5[���6���e��h��kn,k�0�v���ᜋ�U����8wn�$N��f�u�=V��K7ߝ ;?�lƵŭ՛����>'�Z�5 sbd���h
�U��8��Tb��Ф�/��E=���������M�pـ�k��@����,ζ�DB�|9�r�*ɡ���c ��Q �:�%x���3g��AHpa��V_\^Ӈ�N���hB*܈��K�h'�R݌<�B�#��:�wN�����>R�_��(��530��
��`��p3.��$vc�\��,��WH��(bg�Q@�C[ˉ`�3I���Qx��1���{8����b����6�H���q�+gø:Nq��b�NN:�i}�A��K�ՀI$\���	��Y��b���a����%���G��n�ˡ�L��ԑ$�5���>UE���%Ow��9U������vOܾc.�p��ˍ��"5X�����p���1��p��Jm�W�ge��ur
���9�8B�I>���.����o?	1B��I��*HNe|���I��6�HSˁ�ͱ�m-��լ��-��O��A8�������{��d�Z\��Q6��c���[^��H3�jՁ�^>�w��o�5��v����ۈӛZ[Sڶ.�j�Q���"���ณ��b(�Űp��`�������%�N%�Y���F�K�=Q���J+���[����NT�O\�$Dv��Bσ"��	?BF������\�0$�ހ0��خɵ=�q��~аD깦^l9s��5�΂��v������5�,[]�4�\!k�[e�Pנ�o_�M���)W`�y�3�ix�?����XV���Ƞc�0T��mr��E��t�q�ۻ��9��%&р+����xLD�T�x���j��5ك�\

���3oSE6���vpb�!q�$j-V�k�������zП^����N�
'xz��{��叧�ʵ)�A�6��aي�����S/%��~��(�<;'�6��,���S��%SW���4�мm�i�Ņيq�����R�Z���q���O�)���ߧ�^���t41�
��Eqr�@��h��g%[� 4�a�EJ_:�{&ȴ�F�{~\U���>t�M������p��	�(������?*�Bb:k�"���r�U���7���
�U#�"���Y�� �>��ו�ջ�{��6$�Z�{V���-�jCF\m��*0�J,j>�Y:�ҸWTsn�_'������7��·�W[	;� �?W-1"��������H�Q��8_Y�r�S��6�[~~AW&�j�h�EE��3A�]��V���0�Y:n��3��IC�e�B_���L��L@<=���/��5<��G�����ځ<m��utǥ�ݟ�}&R`IZR�������U�yf�B%O��9S���w� ����^ ���K�-�����m�FnJ��4��k�xO��h��櫑�Ios����$N�M�K�+G���'#&�����~��Xq)�ӗ�\�f>ڦEӝUS�����n���s�Q�k�����]{K>_�$����ɟI���3C�]y�NFv,��K��N��~]�}ė�H}���Z�r ��M�����]���ٽPÿ����&��ع��j�;��{���W��[�["���r灵��F1\ Z�j�!B ���u������?�97��G����7{<��24=�%��� o�����5I�r,;O���ib��!�ͪH]���-�&��@{E�,�YN�2~�]z|N��z�Л�q`���]��$�:ÙP'ȵz"]!�_o|�N�5_��$du���-t��AO�C��D�`�/�*�$�|CW��X�/�<�o�T*S���"M4Y���N�o�>$cFt߉�W�f���È�����������v��S���;��0�Z�x3N3�`����F�2#)��,�م�$�F�ҚC�\ kP~YI �j*�q[���u�� :"g1�n���Ⱥ ,�Zp�۾��T[�ԆR�uX�CR�-r"�m�!/���N�|a�����V����y.ӎ?l>��s��- ��Bc���.Q�S�WLi��e�x��0,MF!y����{q�ɳa���o��o�W�YH��R�W�ZEFv�������*���ZC���<u[�5 S�"����
��{p����I����,��+�`����8��{}I���O)|l��8e
�!�uO������8�U��;��_%K	ȁ�a��]������!ߛ���?�k�d*S-p�A4l��I�������w$��3P�g���z7S��FXe�������L��vlts����7<�,5���L1E�����#'�4D��{>�[��!#O��Dүh\�e�c�V�nf(k�A��Q[Z�8�W��4�P²xNP��+����%u���KW�ު�[l�iP��e"1|@�`����5ws5�,���g��thJ�u,��%'��H�F ���3.�J��L����:���p���q�QT+�k��/���X]�ց�m���f�n�)gK�Uf�^�|��g̖�S0t'�0v��Q�b���(��S�Zx�d�i�d�	�Ct�����*�GV������5b*��p��~24������["�nT^%S��+���=�CC�3�W��V�>)����l�u|�F�`;7����4��I5�����l͚�ZN��>`Ի	L�ûU�V������]��-��tiG��Q`h�OZ�H�՝Y�s9M������h��CL�����t�]vsm@�@;2���N��]i��O`&�@�x*�w+���ԻF�� L������6$^,�>9ﭢ	�C&�i�.��i�Ş�9#� �#�8��m{�ML�،�YY����<:ih�ԛ9Ĩ�Z��D4�M4-�I�2�	d�KoJ�����0WpTԫf&��N�.���x}P�$3�/Yy?��>��b1�<>������}fNE_����y)5ֳ��yvQ��E����Ͱ���DǬP,G�&sS��D9�����3ՠ�P�g3]÷+��.�4�`��a�p��>f�o:���x:i{��"�Ko��b�'r��f wR..����R�<F����c2��"�:"t���1 T;`M�@P#�"Sd��Å��Y��J��H�w� -�l���5F���;���an[��*��C�q��G٦����(��Ac_�Q���;6�pq O|\��c�B�����E3E) �i��e���a��'r��t��1.�L��v�Ã�x5`����w��v�����gjͱT�b���Q��*(�8���`�mG��B�ݟ�F�>�s�nx)3`�[����b��*t�{>�U=1Lӌ\�;������܁�6t��<:I��,�N�X�k\^gH���k��=��2��!y�J���-�v-`�i�a��ՊYו��JT��$��:~Hĭ���ꜩ��J@��J�� n�������~�8�5L�6�EA2��-��e�sP����������@���E{y&6�YMO�De��6���D�����.1n`*m֯�Ӆ�]��ƥX2�5�3{�i_$�]N����?�/���D�&ȣ��}
�kS���nKk&�0?x��2 �����x�%�Tx���v��eT��D�մO����ہ�Tk��";5d9��M&a���I<}�۫FL\�$����$H��(o!	F���lt�',2���pn30 #�D�ɏ�B��Ab'�F`�#TKo��7d�����)��$����|ݷ�/%��8�pj�N�������Hז]�\-�g%���=�J;��x���jv�!t��(+tb?��+k$��l�%M^#g~X��TH��BQ�qvl֦K��	roM��8�Ȼ�CX�@����F��r�9:$��FN�!��2vsA�@��|�V��|)'�
��Y2��b0��o�*�3��lkqU�ȏڒ��@��S��Zd�@+�󩄿6�M�3NE戤eD�Ӄ���ި�Z�ҵ�/���ɒJ$�~��Q�[�>��9*Ʃ��vb�⥿\�]J|Ѕ�()���Z[t��y�]��:�SƑ�&�A��	9K� A	���2��v�ο�Z�a���/2z��C��� �x�\R�07��]����?7��p��>Y�G-��>�_�n���gRc�ż�k[�a�1�Ko+6�9��tFÃ����G~ -��Dи�￝a���U��<��>v������� �h���6��ˬ?�+�c�U��j$�n����u��]OO�\��8��H��ٽ����|��e���V��F�?������/�z�J8�E��Z�oiVΏ
���_�k�^e������2�B���d-/E�A$K�7��N�<>'}�UX�t4f��޵���L�|&u�T�+$UQ-'1��!��]���r�B�Tz��k�bN]��j��Q��kʎ*O��g�u���)�����B�*��՗�u�jhcD�뜔��@ ����d��8;�7��� ;��ݟ�dA������k�r�T�Į�3}%���z<�-���$CЄ�b��Gi�$�>	�Q�r8�<c�ϵ�\�
�?o��:�G��DrtdE��G�_ �ʭ;�嘺���W�c����-~8�C�ԨJ[<�OEΝ-��.o�,�o��t���F��{7k��QR@}�mQˍZ3g(���M�zg���̇�Z�����سEQ��^�x�m! ���!JG0B��[�^�x���9��p;�?+yǤ��lwem��F�6�qŶs���������v�;�/v�#JQPk�3�y7PL��w�e� v&��fs{m-ň`���*i�f�:���*��1��T�a⥝�5��Oe�����=�O��u��/D��B����a�VA����lX�Q�q-Q�{{h3��)غ������N���ZA9��m!-�
��X5�o�2GC�7����c<�礆|))�ߝ��sW=�֯��TAs*�YYE�k0�\�ĕ�;���
���?�>����Ks�y���Y���AU�A2d����d�t�'��b����)���s�I	?���]V�iD���,��xX��Qj!�B8	�!߾b�n�PHc� �r����'��e�A��۩t���n'l�5�'A[����P�1�J��A4`� �ŉ�i�v�$�#���B~�9���)m���I���]�ޏ�-,�{�~i �u��fj�Nr�M�NK�\��h~3�3X�D5d�w�i��,����M�3�LC0��T����r�c�{�z�ہ"��zGXʚ)˱ 8V���eI��m �NW8_��+h,eC{!��Z?�?rà��8&�����L�v�mige���B�M�! 8Q��q?�b�X�����B�%��)�T�Mٶ��qZ ˏ�:�q�(�C��"��/�"6/�������ן� �p�����@Y���ƪMKI�I\�����0��Q��5.Z&����� ���nTyVW�{"i��������F�[$���	�% =Ή?����IV=�ɤV)P���qQ���WVUfn�����z՝���JL��~Z�PC7�:C�B���
cR��|4bT�������Ln&7NY�p#�*�vp�Q��@w\(Z&�O��R`[P������"���*�M?%"�s�� Y(�CK�b�n������{���� �����*�)i�&T��d���ΞQ�O��SI(�#]�)Sqnx��xO��ހ-M�yu0�+�4��ޠ;�!ϸ��*_��[TCX��m�RI<t<���+� �i���vd�ʬ�_��!O�7O�g��:�o�|���ׂi��j��ؠ��;T��(+��@�>�R )�?�{����`�m��ؗ��x-�>:�>|��96H�0��m21}�
�E���i��^���I���>� ;�qt�}�r'���C����G����u*th��~l?�-�	,�&�~�/�F:�t�]̓m�
X��|��'.D�GD��t��4��/`���+E�$j?���)���5$�q�\�6��&�:	Jҹr���K��P]�"�;�3�a���(r������i����\�����H��K�(��"�;so�-WĞ��y~¥T��,��,)yF�R+�ҁ�ݙ#�HR�ۑ7�z�-��읠�T8�E�,�2�_�%v�zm���5W���X	q�<ϵ8�g;[��p��������N�i:�d�	B��M�@�m��6��������m��8�*Yܲh,�^L�*yv}V�\-]��ׅ�A�in��z�0�k���b^xh����ِ��p����;.���q���()�6EQO�E�Vx^���ǽxBf~c�m����7Zw}>8�W��׮�~�_#�!�8��-?��PD
�/l3�}8�wCMƝ��x�����He��7t�/b]��p\����I�"dAp.5���zN+jp�eT?;=���Y��}����� �U�p�~>G��yT�X1�z��2�x��C�,K��:�D'��Yp�P���\/��?T�����>�V}���]�0�:��~M�����P.ut�	x��G��V$������C��N{���e-�����2M���V1M��A�`�zVm�m����M��!
�ӵk'���5�!C�>ਏ��h���_�M�Pt�8�*�:x[K�����y#��B��vOx))I��$bn�;����=�^,;��]J�>1�"���+�9��O0v�ˣ/Y5Đ���툮)��fvƆ��	��zH�F�e�b`/�[���<[=ȷ?�g��A�&V:➎R6p��\�p����]�C�y�"��.8I�2f�p�B�,�������c*�D� ��;�k�=���j@���ڎ�����~�U%q�<֪�ƥ�����L5ȧ;��	B-U���o�:�| 4e��!Q�n:���V� b[�A����V��SN�EJ�Ď�j�����]@@�˱�7���E�<�L���!D\�bi�U�m�N����9�S�/I��*A5D�22\;RP�������Q�����:��D�V�0U�x��A�H�j��>g@�p*�vJ��ž+;D�'E���࠸��@{$%+:����T<C@&1��XK
}g�`��I��.4V��HL"�ԦL��N�*���'0d��F��-6��P@F=䝦��>��r[G���d��8"A'T��>������x�\R=8�hi�c�m�3�n�հf:hp�!j�9L��MBIaGrQ��4��ٙ�~�~��O:aԼ@�@~,aT��q�pz_��c��k ��!s��#p��+�� |�fk�2rQ����S��RĎ�w{�|�KI�k�:��,�r;�9#���Y"I���9]p�		�N��#4�|��GZ\�>G0"�]>HHw�>f[!p3J�ɇ)��7ƴ��)���W�����ة�\�\��å�����X%Y��uoB�&���n
� Q�L4��A2��$���\��M��rq���tDP�T1s��?=��gg�+��F�Ƞ59ǔR%�#zXZ[f�47�Ti�R�ӽν��:?p>�2���(������fDC����B�dѺ�&M��q�FMr�,����� -�~C��m��}���T�]�AP(��)@9z2�>�3�
w�ɞ�Z�� �ɄR7ԡ�L�;i>u�Q�� ��������mAn߹�i@6��&��q�yc������sr�����*Z�7�w�du��!��;XPi����)cg��XN��F��"\v�\����yu�ٶ��l�%Bu���A�3�֚-��zF}Ѭ�gbՓ{��V�kMTk\cZ��^*]M�: �xiGk)�����fb�D����(#�+�>�5�VO�E1�c�C? ֔����D��Χ	��m�n}�:�OU�J&�ٚ�C��K��L�a�����6`\����e6`ysq���ڼ�'���3�(�E�����@���e��?"Xq�����t���y�}����O�\ԋ����R��X&(��P���-��&�y>��4�~�\^�Ţ��N8���Uq/�V��M+��B��ȇD�������d��˶AV*�9�Z���'�XL�J��o�]��<D���Ώ���z� @�vSPlX��kާ�����>���h+\�,Gԇ�X�\�9����I��j�112bN�Ӯa�r4���$�c/ݼ��Y>lG��~'�L}P�@m�26���g\c��(O>oAt3㮢���:<33��µ�q�%��#tû�ND��	-*�W��u_�8�����A�4O�'���C��x�z뛄{�����n�q���"���)=�"w���HO�p^��x����[�B�Rl1�=��'竍�$SK�e��/��yL3�� ���ۤ��'�'^Y'�?ä��)LX��b@��2Ȧc�}�+dV�W��S��!��u�s�2.ڊT|g�u��=R@T��N �)*t�9\����`N;��@��$u�5h�Dc��/�F�[lS8{J��9����#��.��v0�Q(!W��mnX�����n{K9��BE,4���/ƨ��9�`�{+���4����a�t���k���Ѕ���p�q��!�`�{l@�h��cz۠%��UK�r����N������a�7&��pʷ�	�mj�r��A7��(A�ҵ��^
��{v�b�J�tz��Iv�L���z.'A��Kk�/A�ܦ���Z�_��=��3"nE��<�
�v+q��T���&9ρ�|;�3����[=F�=�=&������*^�t$�V��MQ�G�qk�:`;�����=��c� ~�D����k�m��hٖu�L»񐉼�rE(�s{���}2cn����qeq;v 49W�
�F�f3�PƏ�oA�4���/�8��Z�s��M/������T>0'�EG����+�6p�Z�������m�@��5�L�
<��kL��?~��{PmT�q�'
CF�xhH~�������RC句m��I�Bw@�1
F*���m�Od���^7��]]�B�D��V����JYe_���#)/����u�5���7��-zg�����N�
ZSF�Pg���I�l���%M�Ɵ#!�&K:?��p�tT�N.SC*�^���'�[_���lg��[[W:X�[~�	:�`(�=tz������XںV�e���^`oq`�!����_�ˀ4���M�1��̳t�N�xIk8_��!�ug��n]��Xx�����N$%ɜ*/�Sa�iF�R��&�g�'pz嶩*c��fH�JB��M����_��"��ۦ������6��}��赐/��~ �`��-���l"g{b9��ثi?ot������Z��N�-���F�b�/s��m��=��+�90��2,D��1H����Gju������{��-	�=k����&�c��&]뺚>Ğ���j���&�i�R��|]�%l�7Ni��=�_���b��+�K�+�)��2�`?��*�|�X�-��k�����%N��Y�~����#Q;�yV���pӿ��R�x���vN���yĐ~�%��ԵE=���ܑ�}=ǡۡ��%���N|#a��V�V��
�H+��Vv�"W�6�A��j.�`����"Rf݃���.��p�pN;S���H��u�p?k8�	iU[�L��!�^ә�͆Nk�X��?�m �cL�k��X�z�;�_0���C���6Nk|���|�Rڳ����ø�S�9!��^�fH��Sj�Vl&�y�/7�72�09�+��c�iʄ��_:�a�X�O7ZԥC9��x��T��H㕢A!}{+�BLA{��/�OuUC��`2"������Ѕ��t8�`,ik'N8����1/E9+�������P�F��d��3_�׺���kG-�	�ֿ1��~�#���{�����Q��5�;v�5	�0yW��zr�3tg�F�t�W&�7>-���!��v!}�Y�?b�6ecce��X����˞ȫ&=�냚 #�g�K�,�N������/�}9�3nx�c���~�Fqc�Y/S��<�o�-���Kדk�=�Qe�ȇ��p}�/L&������;��C�D�H��d͢�DSY{H
�c���!�C����9U����
e�}�H��1���l�#���	W�2Dd?�A~��
m�#P�6�奶Y��@s�����	~�u;.%��(3��n��7HV��D����cM6�;��]k�����B�:d�*�l]��&��O�����2�֔G��	��A��2���z�nN��u� �����kF�1\g�j!��$�ʋ�}�MMz�%�Z����f���9��o�H�|<��31%�S�](T��/"HɐpA�pz��Ok�9��tqE��(_�(�_�b���������ekWw�ڨ�#!|!���u1��5è�� _3-҅��4�p|�є�'5zu�'��IB1;o3�5�?U���W�����O�a�gC�Pb��%��\�3�������xo���r��b�n&8c�L����b?z��bOi)}u��F��>L��G'<�v�Q+M�¸�/��,pٮS��ɱ����߂2�[��F��K���{F�/h�r�&jzGc��K��0V:����m���gI*�O07�7�Iª��xk)�V)�ms�`���xu�"s~~j�u�;����O�T�⯐\��+L��*f�Q�+�5��SaV��E���n�2V�Q�J�#�������n/�Ҭ��/������l3��N6KL��T.4Mv��.��9q���\Qx�IAg�<���M��S�& ]���c̸������or� ���b|ډ�m�ф�2�X�@�s� "�Vy����p��L��+Dg_�z���Ğ���.�ܬ���C�D*��!-" w񎓧���Z`B����Y����n;��eTv��u9k7��L�6�b�r�(�F��2�u�R_�µN�����g7��n'K�+Y�����蹃s�ު��b�չ����y0�������B�h�\CO�A¾��NO�9��R��uj�z��8QQ����)F�3�fuv��)�F��`2K_ד�/�EW�;KG�]	���x��ũ���������ZJS_U������yrs�u�(��2�C�,�1C:��84�&�J-��o[�.:f�%����J�U�87a��e�$-���(��Nd�Y�|�j������7!�w���0$�������aX����ף�Y���;�!ί��7(�0q��qb%�әA]���:�2u����K�2������ĭ�ɪi�Xj4���p}�3	�8������l��1$�=!^�0�cixj����!64u�~}g�3�貣�<1�.�Pj7��㧾���?����-'0c�Y���1G�-��8�x"l���k��OL�5:�7-9�w��a�g�y����L�d?��"K���NX�&q0�K��%L����K��A�~��#�gJL=�$�T��;��|ܻ��6ݽG����q�Cͩ��/Z�F��&����x �F,�OX�ǥ%G0û�j�=�"�ܯ!�,k&\ʭ���7:#���}�*ɶ�U��
�L,}�2>��!&kV�??��`ߛ�2B� gB�9��}Ŧ��U�M�3�I��}C<mڴ���]S���5����Ӄn^��OCy���ϵ⩗G]��	<��-��\ɰ���AgKi���I��k�Se�~��oyҏ�%�'��0;���sn\���CN�r����9i���!Bg3a�˪w�j,%K�.4�A��݂��.��U�v�5�Oi��4�INP�{�D_BG����JT�Bg
�M�x� 4nl3��͔�����&�]!��G�L�L/�B�-U�rx �2����T?�33x�����i��l��A"����}�IH/�ם�kɻ�p)�����!3�%&�s��ft4�j�z�ܞ5�f��s��p���$��'��R���O����T����Z
�#�.�#F��S�j0i���%Zb���轇�T)KT^��z-��»�[GT���h�@�8|i�6�G��Qi�b�k�x2�֭�$gd��t���p ,�}>bu/�!H����t��r!�����<U����ҷ�����h���$�A�ɇ��^���h+����\���*��hA��R R>`�v��I�ޕ\Oh(�:VR�n8�RT�wI�L0��uET�	�S�dو:��}?�I��yl:t���IC7�CT�:\�9���R�����l�m_v�~����/޺��?�1��߽�5�f&+�,�=s�b',�s�O�C#��ԠK���06��.�d9�� �KP�O���⍄5Z����I��k�ZGJ�ş���$�K|L�ԭ�Y%�����Y�NRKM���JV����0��F���w��x�kΔ�pc��
�kU���L��Do;|����9H�L- ��5��*D�鏫�5��p����ܛ�MW 	(��(j���h�i.2��Xq6�E��������1XK�<阔_�ۜN�xH�i��A���2��N!0��ˈ~hzl^�m�Y�UC������$��ML�Ub���v���`R��~���jz|���������?P �����L�7�y�{LP*c���t�%md��/��Kr�@��&�j���i�hY�Tװj�3�7αM��;\��;4 �����}/ѤN�V?��O'П}[`%dp��a%/g(�Lfe1g��� ���͐����LBS����V�g�����G��ߌ�բ�����6�\���3��k�Fq�`�3�n6&Y�WM�˗{�U[nUt��M��<@�F��_�2��#,��qAZC=��ۦ�B�� l�G��=�*}���e�B�{b�&%8�	e����!w�!������U|��z�0��#�>���9�t�Zގg������ k��x����r�jN�_3�}��*�_H���d�E�m�D�D��-y#o�a�㛧���;>H���v�ʓ�:�=o����3���K�8�f�z��U�﫫M�˥��s��d����ہH�� �gB�&NI9�v�E��(�0��L��ib�Ћw[�s]	-�t�i!}��>g�3�n|f�hE&���سb�B�
5����c�׼�!}e@"�~c޵[�8+�K�JO�WQQ- Uf�"!Ɖ�(%Z��;��R��� W�"f�Nr���]�n<$v|���L1H�D�<�I���g��H'��; �U�BrΪ�� ������*B�$��Quc�|�����r��z�ě|L��Mr�Y#6��UC�ɺ.�R���I�
5���B!�3�b�݈ӱ��K_R }Ғ@�B�N���Z�#��&�+E�(�ʌ�w\����D�Oe�G^��q�IR{ N��i劷�g
�c����5˱?`X��M�z&#�+����o�pRm�������v���o-r�fr�:yx���W�;.:�^|]�X����Ҥ�u<D��a�a���©���s#Bڞȟ�苐m�4�Ё�'2?��6I��0q�%�����4��5���G~����d�^�'i>�f,^�"�%�a���Uxnm����j�/ N���!";��(�0�	���@���X�]9K�ho2�B�*��+:�v�fV�$t��OV�I1HB���"JSr�7 �����&a���y6!VB�ٻx-��S�_B��a����uy.���G����WJ�n�ܷ����xr���v�9؉ͽ�9�D�B���;��8�@o�
L#�@�5��$F�ǔ_��S�K8��r�j��J�a��WŖ��/QX�z@�h�f	y,frʒ�3F�!�$�i��ʬ��?iE&�ҿ ?�>R#��1�[�M��<��#HW&�e�!��5��:'9�ϋP���L0����l,�Dp��yޚ��/����A;W`[���P��P��@z��S��D$9�F;5���"�X� DB�t����C�^����BV�i����굶H�MZU������rj��T/�7�ۂ�NӏT�7��(4���w{�v�,槯�J-4���->a�ɩ���m��S�Ukn2F��hY�ca�k�o���!�O���U:��B�e�����O��l��Y~b7����p�8��֞ q+���d'KTe�A�\_߆2��n�)џ�Z)�
�$��~0�X�5�r����c̞����}|c�	��O���*�ͩ�>?8����;�e
�'�=��,�0�S�,̬�ڇ����e+҃P��F^3��̇�R� �Ka��2�2�~��4N��ɩa�ம~��wd!c/pRs���\-� �z>]�����t�<C�tsX�$��{��*� F�x$�G����Qm�'<�S=G����*1,0�7����:U��,Bq��K��_=��M0����g��I�CB꺿�N^���R�K$��
)凥��='57��3��|]��Z	y9�n�����,�ձr�7��nMw������49 ��W!��8Ie(���\��M���^<�fI���J�rH��I���Ή�9rbq�CH� ZEIڎ|���1W�jdF��Uu�ꨓ�E���y�Q4��8x���5���c���*u��hf	�<��`!Ϛo�E^]W�ڊ���g�FiL��?Ճ��q�>���g�H�GF��`�5.>� xwF�������'��'����o���n6�ξ?Ӌ�#a��qmp^��tN�"�����E�L�m_PhV����1C{�^��P�)��$��s>�#��d�����q*��^O������4��bD�`R�5%�����tP�0ʘ�}����|�yK)��$*�z�>���Ņ�dXoo��:�kԣ3�h;���I�/���6��<���*�z�A�*��L�O����ȍ���Ƀ�*���W�	 -,���q�}��S\��^?m��[e�V���M�n�ȼ^}��W�yzf��V�~Uƒ�$��t���g7��1��/
:}�-�XD�ઑ�v���X#�:��1nG7�u�&���������|�o�@�춢�D�{Wg��M*ѻ��/6�Wթ��^9�1\�x&>�-��b�,�(�
�/9D
���WiES���J�#
2cw�������0m��I�a�� ���D����Ir����u��s#G�R�z�Ǜ�d��#��)\�[�m�<��&pQ<��Yrʬ�ȳ��#�����n�%�r�{��oPp�4ߦA����5�J=Mk�!����=�����O~��-���C@�=@�ȒUb;|��s���j�۹9D�HwĢQ+��z���kvZ�ƯF-Z8;b�1*��z5��� �O�v������1BaK�a4�yp��NDi����'�
iL�=�4�C�{�G4�'.��R�ƈ������c�����(�Gq���_�����}��D�u1A�|���s���y�M,1t����P�!�h1 z��+�u��S$�Rb�*2���ΞWƤcDh�&�:q/�2����
��Sc]�L������R7��{�!�ƛ)�	�I
v�+p��jۅ��b/�7�	�X�xe�N4�P.��ޜd7s��!P�s��}jq�"�fB`q��wv��K@����J��%����H�
\��2�2�:�W.}hn^ ���g�w��+ӆ�;(�g��~��q�Ea�n�1��)�x���܋p8�Q�ۅ�ηڍ��Ӧ IQ��+�jS,H���S H3 ��l�2�Q�e3���ԙt�����·Ԩ>�[�f���2A��t�_L�Y8>����?h�C����b�24�%gCPr��%��\a��]Y����+��(�R�l��>�����]�;節����m�Q$��`�x�lصq]�����N�D�\���"�v�gʧ�õ���4Q�ǉA���)���-�6�\��Sp�v8Щ�@P�7� qr��f��[�?��l~~���ͬ�0�.;⿀���	dl6$�wSE��Ğ��E��~M�	ǌ��z�/��{�խ�]�J�/��R��ٺO36�&"!&A��y`��;����J�v��x/l���o��TԖ����-d����ȸsOM��i+�IBS�#��=�N؎˃����qR׻՚Y�!<������Q|�ȅ�vQi�R����3��t�cD�ي����I4C ڥ�F:�ʉ@+�f@�,~kZ�$]��>�e�)2��{���Ϸ$�X� �>�\į��&K�W\L���ʱ$���쫖��{�R��f��X����d����={�ȕ~.���A��]�$]h(�L^r5m\3�⩃�K�Ò-�_��\���"kE��W��.�sd�}k���|H�p�P�PѲ�z����J�~ {���	M%�@�N��ˎ�H�Ǟ���3��9�/+y�C~g=^w�9�qCN@I�����]V
1�8[H���Ź-������a)3�s)
-n�)LH�A���ڙ��Bh2� \�L� ��>I�Ϲ,#1��N񞔑�����#T�
;DJ�~�:Q��b
�z<��x�,&Ve������{ ��L0��ڕХ3�3d>�Wq�^�P��e�����)�9y�k7v1������E>o-J�L)]�J��riZ)cZ�s�m�8ؙ*�Ku��-�QX�"�r�3۵�K�9]��(L�����`�����Ez'*���Vh��i�^�Po�?x�����8����=z�Z~������0��5R	��	��4��qg/8/o9�Ԭ���dW]���"cn��qH,G�Iz�d��X���E�ۮ��6Kk|N�%wEIkk�a� ;q��~\�G&�.�D E��U��¥6�o�B?�]p�$l�H��j1D٪�p.ѣ�.�]Ɣ�.e�-|�q����u�Us��Rg�i��M�@s��|W��^�CP<�ܰ���ʭ���GE,����"��Q��z��5So�*1���xK`�o���M��6p`���l-�Ե��h?�j}I���o7����Gvɬ�B�N$�`�pK�ۑ
(n����ԇ#��葪˴C :��7i�E��}�0���}���6�R@�s�M���]�T����;�uB����#���U�$���I$�`k��К/ӻ��*�T�س���Je�M�)wv�YDSe�F��?� 0RH[�Lw7 ϱC���t��(9n�2�Q�`]Ƅ�]���u����oh{�^��C����q�����w��V���9<�+���va��z���[��}�K�T��l�0
0!��4!�����o#L�1��kY���ˎt	�N��H�WV#GyI��w� �A2�|,�t�Dª����D��rC�"��H=U�����0_6ye�%,�ͤ�,y�$^$�D��%��s�d/�)j=� �p.�}�;���2�b�B�^Q��,��X�F���e�S��_Rʗՠ�ҍ���ˊ5�V�Ueȡ�Q��<D�^���D���x��槫��?�*:��G*J0֚>�M�a��H:�Q���g/7ۭ�y�z>��X��u��� [%�x��_�ק�K=��z��Y�����𜨝L������Ь�-��H�����OKU�?����t#�M|.���d��+T�%�t[D)��EC�n�Ѕ��rD�5��zzz�����8����)a�
Vݶ��6֟���n~�;S�u0�P����������S۟���[��H�^G����eю���F�nC�Ċ#��� �������X�l���r"�e�!�_�r���Ǹ� ���v�[pw%5�B:R�j�F=Q���\A{�U(���rr#��!O.�T�y��GͦM��
e;P���۔�i�a�q�h� toh��f�h��� �y�p�Qj�ê�{hB?s���9��{�-8��-<@���0�ލ/_���pk�.�b��urm� x���O�����xDī���J��U�=n�ÁŻ
]���b.�@T�B�)F��Ϧ®|����U���ݖ,�����nm��s�($�/�Y%��� o4����
�C�=:A����K`����Q����w� ����8�~��2���_w�O�����U��E�ur�>�U`b���$*�5��mvtyT?ş�MT"���KW���������7)���e�W
L	v6gE�azV�#���� p"����&�f�T []?�A�O�«�E轪�6N.Q�/�b�L�b�/Hf�} FFpF<AN�D֊a�S���;;�A��5p�\?�����)��^9"�!ԓ��й��uă�6hv�Ro����✻#�	ȳ�ҦI*�9��̯9���5:��h2��c.q�*Y,�PF�(a��-Pr���ϾW9\��D,���Go�3��"ZX��,�1y-�=��j�]�+���'n��kt�0&}��{\�4�&C�^��`�iϻ��ebF�o�K6#6vl�ռ��r�9[��V���H�<�;�U39�R7�^������p���TUj�4���P��m[��Խ7���]���fi�+��T��X��5$�	\,�NCD�Ó�im�`���SӢ�aA�G�ME/W�$�׀�ý{]���P'N�����D�XV?c���N) $�������$yr����K��=%�����I0�LA�޺}��X��Y~"wS��@�9t'����͠�̷ꮿ�K��M�@Ģ�j3Eo~g���d��d�O�
�����ȶ8q�w[��E���z-�%ķ��	�l��l���\��@�M��q�Buկ���Z��O	���@����)4`��ix��b�X-���t�[�9�ɋI��b�"��~dS(�
�C�6P�X�l��+Wҗ;�>�k�h߾B?�@�(�j9��Ԝ��a]
[���~���|��&{O��g����Oy����@\�$y�7J�������
1F�/Ϡ\L����%)J�)\�A�~�{��)� !{��7!Z&�����ٚ3[,�%���Y�hb�/z�>�a�����^�O3��i��#f�� �F��_u>#�zYR�o�yS^�0�IG��m�PLHbi�ɛx�': '�9���	Ѓ��G\��Յe�;ҼB�n&�r1����J��7�~�V�}O�jUtM�>F|7ƲSl�!�$�"�F6��K�|ث��Ÿ٢�ywʂA{ϗ(,1=� IX�u&C��SW�
�W%"���YR�i�:�$�q���d����������x���A�ޭ�'�R���0�>����%��p�����Mڻ�'���
�i�F�n�LЛ���3~k4+�J-7�Q�n�5.
�|4�����GOkV�n�Ϗ�O\�lw��63��8�+��'\���0�.xdr���3e�cz@�x�aW�_�U�)��%w��X1���s��ߗ ���w� YBY�=��q=;N(P���㔤\3�Bؤ"�U�#(Ӷ�X84'�b��˨Wr<�r�)I F�o����θ�Hƞ��}>[B|�kt�hyܟ;^��q��o~�䯊#P3>���h�4Cb���F�M@_ߝ��i�׌���b��E�����޴���n�?�U��[�N�)IH~cTWک��*(�iQ��h�|L��C� �Y�O,���ZE����7�B��r��0���\�!d6Y2�+�L����p��M��zn���d���C������~���c��m�U��]��I����$\v	VQ�G P�`��9��>�	O�`+0�w�
�3����5���e���u��Q�>� �H�]��?Ac1XkW֘��$��5f��g�P"|�>����	7s��h§��t|s`�H����:*[����ƴ���J<#⬆ܺh��iM��j�Y��k6a�X�e����≩���='P�s�SL�ת�U`K�5�GWy�cPb"��/-O�rƀ�7�^�%�}ίQW�?�����Y�42G3�;:��Hj��>�t_v��O�)�k'��2n�$����э�z�K����4�)d�F����E6�:��807��T���+(�m��b�owD��E -�SY���R�6�a���`��I�����VL����R�,D�����p,�2�E������2$&�M�׮����dC$�`�B�^��׾M�����}��~�y�|�XZ7���J�ݰ���R��P�e��)��.q)
��ݜ/ �]���lSߧUb@�����bB�M����R���n�;�}
�$��I���Na���V���U#_�n��]��i��
��q���}¡��-�!@F��$| /ʬ��6�1C���_����y�s�z��
�0E��i��P�+�n+����f�}�����P7�*E�O�%Qa�IY�U��^��q�d��Sqk�؇Ѿ?�����AЏ� Q�<�2�Ov��s�+��)`��:�2�b�n�t��
nrD�In���2� K'�t黟].�$��WTy��J�P�ΗjQEs�<���ٛ�D04Sn$���iN����a�'�ˏ��Þ4�ƴ�~!����+}'�Ĭ	_�e��R�6�B�D{k�'�|H��ws����YO�=���!\.�f:�L��+*/��\4�zHs���XR���ߌv���&��r'��ϼy/g�{6���0~/D�k�
ߣ\v��A�"c�ߍ���ܕjV�&���F*�t�����D�Im������c�+�=&�:��sT�/�}_z�ƪ�	�`�Aq���9���| �;Xl��z�hyQO�FT���%�N�}�e�]L��R��m������ӜY>����芩s��GJ�4����аBYInYpe�O	ß����k΄0���9B�6��������#��M�|)�9A�皆���k�bEh��i��	��ծYv�t���p���k�]�j������S��E�Fw@�Mx*�ǯ�o�i`�A����F����n�W�G�j��v�lS=�(��!��a\U�T��cئ�J&5��I��G��뼈��l��y&���:;{iLZ�13^��q��7�+�����i��a R �P�a*��S�P���_�*+��\C��~�L|�#�݊�	�"녜U�0f� I���n��>�&�ݔ�Ǚ�v��"g�/�q�t����d�u�l/��5M!崺�F+$�'>�r`^'i���eJ�*�s�����p�+2ןKg���\U��s�-wc�������#����03,rB4�<_{�|�Q�r������Pa��hm����N�sA��2��\��(�{��6�q(�-�yjm��i��oՖZ�^��{o@	�RO�����"3]��uG�f64y�"L��:��S{.��#ʀ�>�wͱ�s܃�iO��n��t�+�֓A~҉q�Ǜz)�=nx��E|���E!��t�6f<�-��&JTѝ�����x�**��N�_�pʬ�����
Y�O28�r��p���\��������}u�������<7SS{�ꬪ�(%S7���C�8
�< �t����X]��rLPJ�o��l�G�U�t^ǁ`Y��J6ϦV-2�_̻+��:�i}�g���Ԭ��9��^�-���t�m�i����
� V�8}vJ�.���6�+vQ*��]��)�4t�};�--��׳�x-�V�WL1�TZ�l~�7��4��=�L�I��0b�'= �+0���48���&]s�~����!�h��Z�t��QN&vƧ���UK��a��%�e��Dq/&�[���	Ҩ��dp���������6��&�'�a!A�f�F� ���`�i��B�'x��(q� ��t�7�ڋ�Ff�_��ێ�-<�p�)O�dt�(uI���K4,d�{�P��q6��m�<G1�V��/�M���p+İ�Hy�	�N�tX��z�s��k���� �>^VU)���&j?a'�7�Oύ�QF����?-�p��y	�V6�z*��u���'�����j��L��2�2Qo��}�e��G�1i=�|)�լ
�9��\��l8���l���y_Š�m�X-�����yϋ,�<�QD%�lk���Ɲ�?����@%�d�7Ha��^��X�<Ͷx�H5Fͧj;���QVxc�p��R�ML�Ή�	����h�l/�c���E�~�0Dy~��ƽ�84����;0��C��
�A���5��i"Z�.�c���_
�/�gv� ���o336�����|�b��H���G�{:ek�rsY�*2����=������7�O��B���81����߂G����}�Y����@���@à->�a;P�Q�>���V�����Ƴh^�<�`&#�G���8����p����V�����TBf�X�v�8�W���9�!�/g�o�E�g�\���:��̟֓ڨ<�7Y���R<�W�Ζ��c
�
^PD�.)���^��4!'��!�����uf��&�ɔ@�Ϟ�#���)�	��r��K����-�1(���?��C�/� �S�@�Q���� �Y��_� iC�n�K���ǵ��ď���_0�tpE>���Ja���G����F����5t��f�0�-��O�,w6#����}z�o �ճ�(�48��0�����>�oەĢ5��6D2Nl��4с�e1x���}j���L��7���� �ɷ̮�˵�"���_0�MES�\/�s��f�>���BzIΓ'>u�h�?�]O膲c��P�[�F�:���}�+؀�^k|O|�GK��� S%�����+)��Q9'{[���N~�4�o�V�Q�(+)'Cֳ��2�2��E�Ek�`�Y�����8zX�R=䦮W>b�Ց@��i:�0��MRT[�;v*t��� d�Z=Z�xQ�q�~k���l�c�Pn�7!>K��������sK��I'7�t�~7ŝ$�FL�tlNxME����W)C��q�+i�U�[A�]{����l����U�;��Ρ���N���'� �C�)���V�
���[ӿaoe��	�J�Z��ú��r�]z�G���@jX y�-p�~XvO�;H�<����yh�P��������?���%(3�j�}�eT^3��/��4�`8e����6�8,�m���-�鷘�4dC+��Ǡ=���?��5����� T�l�*L��'�䄉֑�T&(��ޠ�i	|�2
�D�]`�\q���^�4������4����̔Q��e�����y�`v��g`��nN�)�c=�/�������?�T�_(D|�.�,�\gD��W
��o
L�3$9f�$X��^*��Ԥ���@�.$�b^a^s4���ҿOCAUD8kP|�n�A����3�҄�&��1�������S����s����@�(TK����O�����*7D71��p��V1��{3*y�q�!:Hx��.��� T$�a׶�>~�q��Z�7��w�nhVba�x|�]o9����W9���fC��\��,�U�ݢ�Ed������v�&+�?� �]>c
�Ǭ8�*���Sq�G�ۇ���V>#�j��M���6@7�?ZP��u��a곖y@��7�:^p�������=V�G'xT�8*�q|ܢ�1��D�D/Պ��.-P#�9ʖG7��oZo�n0{�&��*�(�
x�V��p��z����oP��+ߖ�?ϴ򮑜
B�f����Ux-��[~�ʧ����2=�v{w��ٙua����N�r����[9!��Ӂ�fj��@57Ar�X�����l�)�f��W�����n}�:Y<)(�?��<�,g�ݨ��,ć���Ȃ���HL�	��JN@L���oozjT�*��$�e2��A��yF�~����G�d����IM��_������u���MA��8�0}-p_�P" b�0z�����qP%�s_��&9�C�\՗g����~���ƾ��[#9��٨AƓ���K:\��s��Xm^ '�|��[��)Oݨ��$�K���_U��$d��ь`VD��?^m��T95)L<�:�\�G'-U�ύ�9����:{�sA�1� >��	���wϥ�9���+�W5l����_u��,"%��#P��L��[��b�~iF�+̳|Q̲#�F�;�?W��a>0雠<���Z�בֿ5�k(��}�!M���e�y�<'7�,8�1�=������2���b�E
��)�O�8 �iܞP�Qd���ﮜk������9ZK0}�}�*b�V�=b�,���.���#�Ԭ�ܒ�֋id�"f�""͇a9E�R��J/�&�a������7����V�}�,Mk�Ƽ)xgL�2�|d0{	�W6�ϤN�݁3��'P��4İ��j@06�V�JA�m�EH#�Q$�o'"Fĥ�g���<OV��S�F�6�+�G�
ˬwC-���|T�&}#E��)�fPS����F��eς�2�  T�A��d�-���嫖���������%�k#�5ɉ&�j;�LK�L"=��z׋�?��{�Vk)�CS�D,��yCh�T�a�����7Z�a���������P�*n�J���
�G����IK'���J!BZ�.ڑYe�<��� fo���(��e�A�n��/ zD�>�	��\�`��X�]�}^8l�;����[�5+��)jX�������'a[�[1��{���Q�"���M�'�ߚn�|+�&D_�z����Ì<16δ;Y LkJ�b�3Q"�/s<� .���#����
���˘D�]�4c�Don��8<�Y�b,ؓ_A`(� ��T���栀��t�i63�,��H{�cfS7w�]6O7ڱ�@��L�����ݮ1j���+Ol�{$�KoU�dפ0��u�Q84	Y��ĸx�y�G�`��%uV4��+�U�1���@��ґ Y���zJ@/L%i��AH��,uB��.� �c�}�[l[�M��=��%�7Ӯ��ڪ��PHЌt�)�K��A��lҵ������Im=�)�j]�%��dXDS%�m��ߚ@y���.��d�N����(��۷@=��	y����G� zχj�+)�^���,�����������-���a������3����7��^�C�x�����7A2�e�|��.�u�{�]�u��k���� |�!=��m�X���:��i~����Q��\oP?j�����0��L3��*ܯ�/���8��J~^0���h��t��PĎ�B��.��m�I�.d�� ��GezD\�(CX8k	n��B��/�4�s�`�\���UtFl�D)�ж,L̾�U����o�P�)��Ka�ٌL�%9Dq=j7՞�:��eȔ�Eͻ�ʉ�땸�:�Kw�e�cmn3���3��������<@�ʛ�={0���g-@���)_ ��&z���z8R�_���?�s��=�V#�:�I~�tM���T#m��V݇t3�24���8�l&+3��i;[��&��«�,�6��h2k�U�K��o�B��^X�/,�I��v��\¢m��V�pA�ۅ$nV{m���r�PAl�я�j�u C��'�Tzdw�*�O�S���ӗ�u)��	�=੺N&*��L�DWqШ��	`Vr�UA�R#͠�.�\+���ۅ̛�X�R�*B�8�p��R��A���(��ٙ�YP)]�u��mY�n��\�;$w���@]6ļ�5t(j�مj�_��� |圇tx�֜��*��/�>�d	!tNAlۊs4{�( =l��(s���X{�X���bS�?o-�Z�0
������H�x�/����z��E�����S�uϺ��T�?׷Qb������Z&�����zkKwv����9��������O��wSM�.S���v>{���&�Nn4� �U�����>;�I���χ|q��_ .���b�T��5�1�]0q��������/}|'��?N`��"�C���M�wdK�=�����ߧTuz(��=:/�DK�ޱ��� >�$V݈y����?<
3���;Ɗ�tF�--��?��h���}2��M�24���b@;�&�"�`��g��S�}�eɑ/����<�`?d�N'!Q:��"#s|4`Q�0��v��[����v�Jӣ���+$G���E� �����Am�;v ��?��沔w&0���|��"P�2nz͉��;��\b�'���[�Q�e��ׅZu��q���uE�&`uI��YY�ƭ[2NO�B�#}�\�2D��K	S�>���/�up�$�ۮ�M�!�Q�H��wa;u�ox;���7~�)=uk��Rz�q�� C���g��p�v�i��09؇�JH���
����i�'�qLq>jV�m�b��@�r����R��[�3=��0��IqHl�rc�\&cY�.��'V�P&;kd���uJ�şQ[��)�|�!>�P��WG�U����5o�a�bz;�W�"�l *<,ʹ(ք��]Y<�q�!�z�W|7;�hO�.t������S�Lz�7�}G7z ^D��HfE��Nwi3��֪�w���"��M���J^�&}sK�P�}/�(>��0����!��Sk4��*W��y=!���T���_rjUAҀ������EvԎڔ����L-_���=#����B}9Dg�j+�0\���4��wG�
��jrq���[� ��'��I1�c���_�=���&qG h�����9n�Y��n��G��]l5[�8i���j�k|5�ƞ����t�[��i��x7�%�R�4\!�Nh@�� 3�F��>9���3���g=����m_���r�)T��w�a���}_.'T�b���#4�]ՅP;��ɓ<�^Ds��2s�m@0z�c�}���$b�H�a�L�Bj
Ib�"(��R�l�v�����B!{܌T�[���㐝a1� q*OT�[(A{�@
���~�Nui�G��(!=T�pq��C��[��I6
�ᄝ2�O�ߵ����t&WE&�h�k�ȍ��Cgt��g���)����7v�2���1�.3��Y�J�?*8Z^�YY �>��� ;�E>���W��#+�_���y6��t����y�������1
�H����Ҝ�m+��oиZ��3��l�,�H*�ދ5�g�� ��8����s�S�=�R����e픕���"�8�2A��MU��3�8�HD@b�9�D{�+^憽��w�3n�1���ڶ5�j��L�_�ggjM���v� �������)��Y���S8q�<�I�d�44�w���;X!�.�ǝ R)�3�d������;"�������'ڽU�LY��2��4ڶjKZ��1+F�:��k/���4��XɅ��{��?��دؔQ���g�Moȓ-���i��@H8� b�����#{=��ȃ�^3���Zd�P��iW�[�c���L&]��REe�p-C�*��X�d�gDC�}��M�~��n���~%J�w?Bx _���܅�|"[!~��ﲷ�?��sn]E��Q�A�xeRK���:�ɭ�i���̀�t�2Y@E�D�rFɻN^+��B�*}��k�
����)��OYz�������,Z����9c�}����N,��H�(�B�vveԸM�:���
`�i��q�Q��S)�bXwl/����]j �����p���\׷����ўt�[�-�f�T� ��5�X;$���3Z�냉������$��5�F��J�6ioT�g�}�
�c����� 4�R�e�����2�'<���V$5�ye��:��N=��YT��'��(Ӏ.JN��X `&�Wv�L�cG������� �T�di0q{:L̯�_o�,X��p�����a�v�	C8;��qׯ�q��7ܻg# �T}��u�9l���4/��K�JQ�?(�=�.����J#�I�HH��Ω��y5X�מN	�SϚrR.~� )Kv�k4��d�&��	D0�yoOr�`˱:����XA�x�q�"3�-�0Z��nО�<Yn�(Se�cG��gv�������#��IR�֠�c��8�'t<�D}z�����E�~�Ơ��-kٻ�����������%���1�mD>Q�_�}�y%� ���7�"�3	&$}b���.2��阛vI�.)�$Z�l��N��������c3���#�ʆK�	�0\ s-��D5�Q�+����s����p��Tk����Z�g��|��=���. �bN��;,K��;���%*����Dt8c#�t���C���U 3����OO�p����g�V��� sќ�_�=Qg� g�yO�\��ֻ?��0/ �#@����$��tS9<f(�!o�9P���QO��A� vC�
C@b[�2�ۭf0��d���[Z��nX=B�[�hY��5ou��3En�[\K�Yx�XL�XA^!�bN�"����b�gG�����e��k���蚹�ԇ_�s@�C�av \�%��	��1����q�#jx�'���X���yx����l�0V� �}��V�ݪ4�|�����=�Uw��~ \���f��b_�u�������H��We���4v�9��1ok��1ė�.�r�Rt��i!�p�w>�ޗG֟��5~����M�K��N̄�"L�D�����p𠶠Z	⭌�K{��<w�X��eJ�7m#���45{JL������#}�te�k�t��Y->-�{,8��������F���%�y���6 �(V�Pz��H$P�גn{��&a_�?�C�S���d������T��\�L��F�mp��e��E}�m����y�,-]w�kKmA?�|�t������H�K�WS�G؁��3�l=V�Ņ�%��\\{�"^.B���H��y��wS�Ӌ[���
h��P�������6]�rl*s�Una��8(����6���DZB���Uѣ�6�����<XlB��N&�N�K��
U͚?uѴx�GΑSuǻ<#r6ɬ;�^��9�%��p�����T�&����^������~�h��U�nM^�)�E��=#�*!�#���
�Bm�E� cAxtD���#3�%��T�*V�9�_ć��Fۍ�|������/;t��S��>���<H^��~@�*� CD�.Ҫ�����BM�g�D��e�Vd����K�Ol�h�hk`��L������l��52��1��s^�x�-Z���9��<u�ʶ&�o+�oY�GD��imK:l��<�	����R\l�t��K˜[�k��y�g��(V�N�B�3
ǒ�ٝ����aj�����������o��MدtBm����E���L�q��g�����\�b{��!�7Ζ�I&�.3.r��(�6�Q�9\�4��f\7]X߮Ϙ<�	�~DUy|$Q��|W�3!ȼ|�ˬR�2�bp�����iG�䬂�"���j@*B&k����kG�V�E�f7�7v��������T��	_`8��cد�eL�K�A�-�����6�MW�M�I~���^�c@>�}9K���U�(`wt$v�q�������F�r�}$���z�U]BAOb�;;w�E�tc��f�Kr����zU�tק�d��`����)@��J5�`��u9�XX	`��Nd��a|,�1&���Or-��}U�f�R�YOO<b���)�mB�4(�9_e�N�bs��(����gyB�����|&�vsiߊn�����%U��h
�Y���K��k<-ȵ!���·��#�^�] �r��%O���!W����g���$������ �R����G8��js����tw����x���
��d�cت����Lh������
1����0@A�*�RKG�W��}��ci;1�2�S�5�laT.[F��3�;3��p�u7���na�訲��]V�}zH�j8P�п�<@@p�J���4�UL�-�;*,~;���\�֤E�EWo�K��
9����[ԣ��d�{%�v��ED5@��i�~5�l1�J��&�GپX�mV|��0�����X'���%Y ݹpy�W�
=`?b�g�h���	���ȿ����W�\����n���7��Hw��G�y�=犕(�I�;L���,\�b�c�ha�t�HT�V��x���8�)o�U�f7�\�]���#e6�!��<�W���>2b�i�R&4�щ�?��CIB�W�#�Y�
e�3��&�b@x���򓨸��5M�^0|� A���8�⯧ڱ����c��\c���$�2j*M8�&���]�U7�h&a�1�G�Fw5�1��j�3h�	[F���r��o5H���!���Q���m H쌑�ӃU�gt���.� �-'��>YKKa�evť���L�L[w������e��޹H"}>|JC�3�mOPc�Sh�P,��ք��u�C�%p��dr�e��k6�h�Ő�o���,�z,�@B���?>���ĺ�.��d-�-��i�=`�x� v���Ŀ�t��O��к�ra���ep����+��B��-\�nȷ2@�變`���z�l�$U�%i7�G��PEn��3y���hڐL����bUN�����tYS�d�Ϫ)�v9����J�|8����ڀ���i����w���E���� vG�,�"JM�2͟-+�����4�<��]�8��C�^�ꥀ߮6bS%�����JR�S� �ZU������|{�;5���|����3j��?OKMm�٩��V]��$�y�Ӆ�<e���>3<��JJ��%m��"�4�AXVZ�i�Zr��j�����M���@�q>��}�odR08���L��N{��x�z&w&c�����ߏج�`�s6�x֐ºm����ɥ�r��?�����페ߚ�F^�R��6��mG�	^z�	י+<=[����yS<�ZwJ;^6���/����kH�����ԺCi�K�)>�ADX_��todA7�]x��9f�)��S���^J �����Jx��-��)G�'u���ܹ�|�桰j�Q��
S��	xg�̂���3t"J��MD7�"V⑀��33�4;�^ca�����Z����_2�����̋G�����I��ռn�ξ�j3im���h�^���˓S�o����� .���&��c��b&�>x�<v��n�d�������	������!��L6�������{=ge����s���4����U,�i��X�
��Y'!��N���5��vx0�'K���17"��-W�t�ǯ.\AＰB_�$��m��)'�Z�i�ʭr�n�zfE�Q��Z?}�)4�J��i�>܋����Ȼ_��$����=c���2.�Wa�Њo+��Sa�Ѧ*(y�a����~u�!��o`T�8�,�V\���c�����˼P=��Q�����o�O����Q^�x1�*�?�v1Һp���j��[�wt3l�(����a��1�awhҍP���CmD�aB�z6X���}%/���;L���f��B7˫�Ԉ�,h�A5�&���|��c\�SՃ�U�m��;{_���j���,壩�Έ,>��D�}�+�t>]�c||~��ȼ���;�[&QX����s�n}��3�qF�x[3�o}�x)������bu�4��O�B��� �a��k� �*������kK������t�yϝ�R��:4�H�{��h�_�qX��K�p�������4���P�5�ܠ//�}'���|����3�4�����[I�9'�W`7���l��jɯ�����4Q�`�2>�(%�0�9v����K?���t�(�!����6RY�������,�<S}�Z�m�����^^=�J6�^4�Z��]_��|�.��h����(���$�:!Ă�	������a~��ͫ� ꆝ�nw<�\pV�p�@;�F�%��/�����k���e��4Hq�}l��k�0�6p/%a���D'�l�	�i�}R��D���&��>�V��F�i��� `��6Xq�3µϓ��ݓD)ww8F��_}�Wb_#�������5�hcC�Flb#lU�H|�߂��I-�ϗd�~$8�T+W��	\Jp�� �*�<�&Z	�1�Uߝ�����vDo���NXK ��KU~���{��/�>~[lR�7r�:6��9�^�~�!����������� a�T�^^�y�h:jr�]}	j-*�ҹjI�L������;�5h@�b��Y�f�W�A�=$�СNJ�6X^�Ǵ�n8��*Q۷oygLf�8!W��Z��b�T"�u�UjD���m4�0Ҫ+;�����k����ɠ@�� g6�M�{S�*�W��+v��Fˇ=6�0���U%�B
��E�K�{Ĝ��:�+�}!MmT���ЋQqP�*�uK��۞
�zl�tƨ�`���P��TP���!�)4��B\P(:��������ps8+���V01�O��*׭�kCk�kBd����^���	� L5��\�¸u��S�Z6emP,X� [rk�!��Ԛ�OPg�����=D�}9�uU&����j�6U��\�2�YM�w��� ���^�i�ϭ�?��ś�V�CB��Ҋg\��|x��`���#h>�YS�$$�ި����Ev�nEyLz���:2��%!sZb�43_�������:7�N�0�UD�k�vh�t[j�.:
A\�0�|����}5�Ψf���K�Bq`�%�E����u�i�,�wL�t�2��$%��5�����J!��Dڪ�g�������q`���}�	�*y~��6"b��t�j�ݷؚ��3��q�Yh�z����v�7��+ ˗⪠�u����^#rU�6c�w�r a"��Y�ȣ�?鏻}�����������	v�g�=� �� ��8�y�<�����3w��@�R��/��*�'�׀�7o�:!S���d�ʞ�|�>�#��Ȏ�_-ʌz��Oaxc�I�ʥ���Xب�C��l� �N�~ �"�^����_�����T#¸£l�YNI��yL�����h��r�f��l�;�`�Y��l���?9~��	�
�4�2ɑ{δ��r�c5� ����1���g�SE�J�!+K�9�Df8��	������`�
`�pn��"�+�Ɨ�F4��%��c���>ߡZ��?����Jp״��ꩽ�i2�^Q����`	�w������G�A����{w߆0
�G�I����ˢaqf�,2}
��'i�\��ٟ�5w�(����+q�����\��kb�C�p֣(zl��1�ICl��ب;7� 
��Yw����s�Y�-�L�k[�y����luC3�(�����U������1��.��@�wn�?r$�zq��&ߖ<XY<���V�y�|��褒�''q�^�E�Œ�s� �U�4�;��b-��B �)��!/q�@��p|� ����IFH_�ļ��"M�����gX��q���$�cwҫ��V�V��E}��8�i�U���%�|�Ttn1RD�N��1��ŋd~�bZb��-j��@7O���<8�t��l@��~������_�YeBv##��!���0D��eE���
j\yXM�=���n� z$)1_�ek�P_[�?����!��:���_8U��4��͹	�ů�&V@�E ���@�.huC���>@���ܪpnTe�7�V���$Zk�a3�0��H�a�lJ�j��M�QZ ����g�~,}	�m��U�����G��tށ���3��'KB���f%�[�}�w�A+>:��C�?D�-������j��'9��h���Z�n�J2�N��ƪ��O�a���~�c�����K6n?g�yr�#�	����"�iQZHO1�E��~��ݠ���X���Wd��NU�g��Ÿ�EG��i�7S�)�p��;YiU��b���YQw�S-�-yL5��3�'��^�0o�%��>���i�S#���/�+����V��|:�;�����UH�_�0�aF%�� ��~^�@�7=���J���N��Mo#�/��Hb���U$�r�y�&��&J����>������
����R�Sm�{l�Ƃ�0Nd&��m�{~A&-�\�j��]�U����g��cmo֠�=�*5H��.��7>!J/=u����u:	G�z]��~6]ai��{��lA�Kr'��}c���0����g�0�D �&_���ᔢG ��FuE�kZ�!L�u.��9���9��e��,��H^m�~���۳K�<�M����<@�b�,�BU+�K�/�C�E-��(3���7��+/��u�&l��:��`<�m8��/'H��)Xz�;�Ĳ��c���u���f�
���oJ´�c]�������)9�d=��!��}1��q=E�ҡ<RUO��rk?ynY��@Ms��v+Al��H�{_�����.᧻0Uq4G�s1%7��M2f/�e�6��c�\ʷ�*�9~��_qԯJ�!���$ݏd��]m����Oc�?�ag��4���`h�I@��P]O,|'�y_t�0.>늽�O?�-�P&ty͏��;��zU�;��Ҁ�{���ig���[k��A+��X�#��R�h9E��w�.���;?�r��%��Β�`r�����dn�w]#���1}i��y�ɒ����מ��z%�ű���p6�Oe��-��j?nq���a�߷�yI)*���GTrP�@���T>��,��\4��:��Cǎ�/o����uWy~$��捾�?mn��_�9��d9-�@���<���i�Lc��ӈ#�8��pEG��<��0�����}��ф���M� (����Oêۅl,`�K5��`Ũg���E7F���s�
3�t�d#�^/�j�h�:������I�C��h^B��<�d Wټ��8�3�*}x�h0U/	���b�i���?ޞ�SH�������8a]Ǔo� ]fKK6�4b�D�pB_��u��.t)QR��Jnbɡ9
�/t�?��A�L��,5�]�d�	�~|�f�ߡ�[ 4�	_�(l-�$a�3�W�:�l�`&�Č+T�q�ʼr���t<��b�J_ʻ2΅�_�̺@�����|P/��:>18�+���CHb�X�/6B����n'|�;��ohJ�b��^j��e�'����.nE�f��-W)	���P�˨�s������BUz���\2�x���X�IZ�hь%ʒ����ī�kV�PB���8�͝��Eo�϶~���Δ��42�9a3m���l7'��D��h���f��F4�"�yV �ؘ���[W���a�]�?1C��8l��&�d��dO�o��|R�n��C���j���\S���S���5Q�`�[u���{;������1+Ŗ-_=���������TOh�d�
������$!��X�=�S:1����f�u ���m/?�ZÞ70�! gmΨb-3D�m\�+����؏���8��Y��q���\��m��sL�^j�z�gqϪ�3,����X8�x��5u�\�����h��X��N|^��+��7WG��� ��AN��_�B۸�{�)��)�K��H�7鷛�e�����
.�2���+��v�ě�W�dѓ#ד3�w{�����4��1������΅rpӵ&�����,k�R?�4�!R�뱚U�Vk�i��Sx�W�Ϥ�����H��h+�~>���h���q�r-��7�nR)�qj�M^&(0*JP濲u�s�K�5v�ӹ�m	�s��^,h�����<C�>x���:+,� �\$�3׿�� `���̳��kgE4�:r���{q���?�ȴ�/Ze*��:�+�p�*"7r��%�@��{�k��G[<N%T��B:�\�:��{ѥ�o�O#��t��`v��HR���n�?�MM��Y�F��K���0�>���as�H: C�KSg=�+�j�?o��;�P��l�Rrf�����BlA�63@��G��hʋ��US�b>�y��5�چ�+���`\{A��q��Ih��K���_��đXU�q���]U]��$?++�Aj����G��HI��^]�G��B�@4~�v颷>�����<P�-�&\ի蕹��V{��&(���k����\���,���T�H	�MGˍ��._�>�dZq�p���7�<���&l>!*Z��F|�z�/Ą��_n�!�7&�ZE?/�&���ôJk]�򵒗0J  ��U�&��� ϟ��Ձ�bd��0D�w��>�=sf����LT�9�X�EKd����(�ǘ�иx�(����>xF�#�����X��,g�%N�),P�"ai��4U[�����bj�`ѽ��
RJN�l@�7/X�8�a�ʺ����SO�B0�	���ɑ2$��QRU���� �˖J	���kO��`k��Jl�\Ĝ�N���J���H�W]����<B6U���[Q���|C���H�����ʏ'}�b�K=��E�:�"^3'M<܁챴�jkt"�Ȥ��03~�'���8i�|0?��L>�V�� ����D�?�)ǣr�Z_���+HŪ�r�:�2�`V�w/�Wo���*�6ƇA�
���E��m8��7V��'�:�z��(#�_ccι�Hp��{�e���fV��n0R�G2Q����I_+Ǌ���:��?�]xܥ|f�mܩ���B��$�i�@ti�8S(5E��ٌ�~�7z�I�|R���;�ң a�1X�#�v@�Yٲ7)�'*��O��(������ꕃ}��pL��g(�b��J���$)��'N<��S���3j3���ې�_���r�^���c��Z�d;�]'E�����j\��tk��5�����g+���^ߛ����	���&� d߲"b2��Z��= S��Y>F#���@7����%�mt�MN��9|0����^�zo����K� Qp�(e��jh5�2��7���@��FDu��A�,��
��AL���BR��Ed�G��]�"��:���Kfs5.h�pR<��|w��ԅ#�3gs��,�
'ϑ���� .ͳ�9zW�әA�i�7#�R�~Pl�L�.[�G$f��#�7��-���N���J���z�:v\@���9xd�&������e���$���L��訶5�&��	���z���iq�_v;{��,��eh$>�a	�pI�2Ƨ�>�2�~�ނ���
�Q���* D\���D����F�H%�M���A����V�ubU���b.�
�6-�:������A��"�a�w��U�1���:����`��K��^1��~$!k�{"���U�}#vsx�n��]�	to:�G���iɁ�(�|�+m�A��0#*�	���íh�UR&4y=��y���p���ˈZO?�����4�o��c�F�湏kѢ%V����Z�ؐc�N�gZ5 �L��L��� ���P�Mo�2r�@V�Q�4y�j����9ak�b�iӡ�j8�h���]�氏<ΧA}U�E:Rp9I� H/�(��ꀭ~;�x���U�����{��e7W�XAs�w {�@KkS4i��'L���Q��>��2& �d��襘�]�q�qƩ����v⽒� �Cc�� �Y����#��������iu����TV��2��Ԋ7��x��`���	<����:#�J��҆n?�[�*�a	^P�C�����<P֮��t1��lؑex����,
�0��l^��8��U�35Q�NOֻ�^�&ٙF�@V+$	ec�^�@��@��_E��,������N�3�%�*��y//?,2�W��)
XN�NjtC�
�Loݮ4�|�Э�Si�R�Ƒ�⚕R�L� �GD�z-Ȭ�K�$pC�	<��C�a;��k',�ZBs�(D��:�\\�<V?1�Vz��dzTL��"c�HcC�G�=JYi�;z�)W��Kmfb�/^|�ع�>�J
.�6=�H��)�@!�-|���O��PA]�t�:~te�&]�^28s�tۺ���Yd�`�� ��Ɨ��] �q��0}7xP�I�?��V��d������^��g#'6;�|��hm�P�E��=Uђ�MW�xW)u�8�*�	�He�����Rt�L�6���֗�u;��'�-��U^z�~	��U=�;�=x8m��R�����L�O���?��� � ����[��y��⧦ |�P�ڄ�=��U�U�J��خ"ϐ��{Z��V�q�|r�- ���#+�j�Bس4���i_������:]��n�+�}���$���Z����41�)�(V��f�Z�W-�����5���\�z��2�2lI�����kL\�&?;����@�C9'��"Oq��%�X��u�G�t��"�g`�\~�>�@���a~��ƴ@��&i؎���l �3s:����B�li����\L��!ʪƍ�d�+�;"18v,�z�XϜ�ex8'd�;cOn�?��jOyg�������ە[���[�0����CP�POQ�*��:E{Poq�R�	�@�ws5r�'��&N*ϣL��Q�{�ˋۼ*o0 µfzV�+5Z������g�4ǹ'joZ 9n��灕q��4l}!?SRΰ�+����}��_2�:�K8�*6�0�������>��*�=;	�N��?�J �0���h�,m�W?>�r)���P�\o�5/_��MClP�����^f�a����X&)�9�r������_��塊��h�%l���xAV�c� �ǝ�o��
�*��zO�����-M~G9D&~VXV܉�V�j��։�uY��aWjz��ԟf�^*�N���?�W��� '�K�i�7?�O���wD'X�Zy�u,e!�?|*4H�6����ò��p"+��Ѕ¡�D���Ƃ%{[��2g��|X�3D��"��QE��A���ͳ��-�IRVd�6��6����o�A�<�(U����X�<z��0���G�<�>��[Wn2�Q\�n2jI����ԗ���I4l���.I�6�����&���M� ]h��Q�f�~�e~4��M�:�6n��m\A�=$�M��"�3Š��fefWp0c1/*~l���>��/B5�_Lܞ�1(�^������S�%�N��`4����};�VQ� �$4�xl�\�I�{�2����t)O4B�����ӓ�
��ˀ��.��F]��K�5���VE:�$�ua6K����̹��azs���>��(�7Z�mv�(����s8|\�_;�k��6��|<Y�р�n��	#���h��a��T��:.��rX]ŰK�IH���P&�<PI,�"'���f�O�in{`��N��Y)�Q ��m�{��͸�KR�C�Q����f��#���1g�EE�4g�y����%����Oj���K/��32RVx�	Q�� s�5:�w��#���lq��ȧ�3�8��lo�����d���5�w���2+�3E'��%��BtW�o�;c��b� ���w�Y0U��������?S���pǇ�|��ࠧT=��-��ݩ�A�4�͝���,a+��yU�֨���ƥ�#t˕s���O�2�D��5���OuOny��c�2��<f��Ʃ?���!�Z}�Z̳���ˉ�a��j�6'�;���l�e`�׉�Q�Z��z��G�v�I�.�;�!�8�*1��4 �ٚ���F��C;���R��(=��*�r�q���|��n��������p�����Ҷ��ԩ��W��@Ґ��Q�1�#�a)rT���q��-����~�?���5+Yeg!)��n�����R����D4�`���l�&1���+���v�%�@��(ņ¢8�˺�f�q�a��i��Ku&jZ�D�lǬ�=g����	W7�������3ܸ �8��	>��딟�{���2	�Gt�W<�X�Y=Q5:	ՠb��A)���ྊ��@��u��<�U�0���2�c�.��;�l">;zA��A�3c�N��^Br�7ԣ�$��h!��M���j�$�bI'��.Q��X���^Wݡ�@���l�o��*�>܈�NM&����7yih?� ��e�|���j߻�����~kR��lH��+��r;��	e��*�TY�b�KgA�D�^����������GJ��QC�oӿ�p+NmI�2;��� ���V��a0���lk�����!��{�sc}K��?\���0`�-`����b3���:Ҙ��/	.����i�E�{u��3ƌ��K͐c�Ƭ|�n�c$����XS0��!�]�������,����dV�=R*[��/d��ޤ�m�u������A��j%�a�7��F�_n�؈�!�fԫ|I}T��'K��sE}���ax8�0�J�35\���������g�:3�����3�~V�D�UR��Xe��a��d$�����o1�hUw
~_�3��7���_69�mCt�5*��O���lHM�~��+(�w�įSR�v4O��р��h�DF.R��~��)g����:��R�]e/}"��l�.$����`�[��n���ğ-H�5)h�ݵ���ÿ(Id�e�0��I�f�ѯCdqtm���Q�F��~���X4z�f`�Һt�}������xC��.r�y.��?�jK���R���>Kd��}e����&'!#��ф��isS F���҂��*��	Vp�m���"#U����(*�w�W&�=��6�*5�WH4��zzm4q�UfeE7[0WsI�T��#PT�N���"p�D��M��-8��ئ7�5
S�N�q��o�|ҩ�^�e�����6��*��������.uX��{�aZ��"�L���h~���
@'Ӓ`ZsOw�v(�M���r�L�ș&l����},;���H��NeY�>�k�V�jϼ���e�J

,�0���	N�t��䶊E��vAMF�$�T�0�$�ؾ��E�X��QȂe��(ۯ3��3�_�-�HNp������S^R;�
���$V ���&��MX-�(qƑ�Qu��oyۈ&6�u ȟ�����s���l������z%����
��~�i�.%�:��׼�%��4�j|�H�PZ>�I/��S��d^$�qv+H7�i����,�B֏��¯�Tl�|����>��K�n��a�y@�Ƣ�i����(}�NT�z:�P�&��F�*ߒQ���6Q��� d��~���.F8ۑ�
�/���'�Bb?����+����O�$I(�;$|R�*���oV�!úVJ�5\<�iOO F�Ŝ/�w27_-���
�J������|c����"�,�ye�Se͘��C\��\���9�j��&��؎������ұ:A҇�tas,a��Qx��N5��Y�5*J�/�N2��?�x&��Y�F��˿�s� e���&���ҋ��DG��	��U���zp���?�$L�y�O��UHp�d�Z��;��;Y�I���E]�u�қ�)%k���&�b��W���!��>Ct��xOo�v:�[��G%�����o��ĸ*<=4�^�Y��K�J�N�O�n:���m�(�Ϛ��߹�i����E�L@5����]|˶���x��� ��`�~�W���gx�-}��";�����bm����o� b�UB��{��X����	Uo�w�M;��X%֡�u�`�3����G��[^[�e��A��ҵb��-O���j(�ms�C.��,�lb��\��Gё�J����.��и��p��aqU�J}d���/B�^�7R��F�A�-�J9��TU�[(��f�P(�]f
�-����i��<e��(��IJ��<�
} ����rq��"�9 I��E��s.���Z�L�@^�..rO� n��ЂF˪�#Ȯ���Qzg=�0b�&&o9k���7���^�{כ�1㎃��$��a��6�U������{2�	~�qpm��������,��[Y��8~;�Oys����Ǿ!s��7���d!^K�Sye3�u�t��,~��7 <��*�0��2��pu��>��o`�X���P��F_n��[vR��y5�g^��u�(��*r`y�>��H�xa�q��<O�D$
G�ܚ��ؽ��h��PM�l�U1j����S1/yy��XK-�D���Ҥ�4�:*�tu��:g��j�����V�3dq��.a��� j��:򹯴k��V����Ἡ�a9�Cn��s\��E�!F9�Se�<!���T���B��u ��3*'la(��J���5o;��ٮh=SƬ+M�X���e�!�|Ct�Gf�`=��������G��F/�@�/
�:q��h��5������^��3���u�O8���r5�a��u�oD���I\�6����:4�F���ˣ��+^���J55Q�ӗJʥ!�5�Y�Ya(0@��B�Tz]0��.2��,�Y!z��L	�����-ށ0�h��|�>H�?��4�%Z�ܞ<�����d�ז����[�3z5�|:�`��_�|k_����s��U4YL�W��'��p�ޥ�g�/��6[)��7x�����Uh�����E��\����ؿO�pbh@�aW{Yp����B>~`�r:?�`3� x��`�$�Ψ0�T�1��|?���@#V�w��c�h+����հa&p�[���C�$�����s��36�&Zc������O�I}��W-������ib>�	~}�SCj���	��@��:>w�sӍ����#���b�/����^�<�W�2΋��R�iҬqyE�О��ן3귾��@��_dނF^F<ծ�[ܞ�gI<�by߈��,�G��B����׳5��AX��� ��a
�k���qR\���ࢊ`�X%~�H���:河����[�Ԭ�m��#�#_�?������L^��������;J��Ř���+�:�ڵ%�%�'CW�ła�;G{�hIӕ����< ڎ�7�V�7��k pBF�'��z�Ud��32nՉE�#\ug��&��C���3���W�}^�9?#���f�	�Ufȧ�s���wF��E���Vt�[\e
��j1�LM����]�n܁���DLwc��4b�d������N�
L.���΁�:�p}\�4����q��j�����O�|����`��헣���c��!���YZ��k�o&p[�^��_��H�h����P����C`KJ��*�D�`�^���� ]��c�VDc�M1/k�LdEl��+~�&t�O��׀'�
��*Պh����?z�x�������p�Y���b��mD�
#�͜ӟ����_D�)ds���E�=]X��)�� 4��EUOR��\v{dY	��U���5 b�.cNk#� � ��<o�(K���=`�A4�
��U<���I�c�'IJ
����vv�K]��~j`Ș��$��.�>�k�+��I(��s�nI����e�/������m��ҷ7m=����km���o�����7&�萤\� ϊ�a�w�2N �6�d��6� 7ݫ�O��t+�~ @�bW��hS����#��{�B)~~��9h��ɚ����"�������K�f\�jb.���B��ݣ/�?�5o�."q��%��`�؉dq����|$�����|���;�#9n�SӒ���5+ ���$��4�����w u�qǜW����Q��r��NL�Uv\� ��eD �ia�N屺3�Lc���uE����Г�s�X5��*�DX�(Vrv��<� �y1V(�v��4����v+5|Q	� 
*N�#�Aו�,5��c�Y6����^YЁ�0gn�Q�� �}�ahM��n�9����s�����J��:�Y��<���"��|J
؄\�x�S�+��
��	Z-#O�st��P~	h,�u;���cTH����Fk��+ �J�t�I�_)!T�O���#��[��d���\ �������j��19���q�$uf ��p��� ��,�d��M�$���su=�Ot㫵��LTu
[��S.�M�k�-���:��S(�T�R۫ ,�U�<�dg��%s1�&�>[8���_!�q)�ʽ��U�<�	y�l��[eS��O#���X',	���]Q�9!v���7�n(�SH���C0"��5"\" ����4^��V �tD�@��݀��ͺӱ��J���L���'I�0ɟ���q<��ܔ���3���o���}�:ĺ���"c��أ�'OJF��h�+V��J�P�S�� �R����w�JvЁ�
*g�9I�Є�@�#T�RX%F|�(�AҮ�F�����ġ���i��Չ}����P�p���ekO�o�ܜ����H���<~��`�F¿�<��8��F8���&���fN*��h^��X�ς���[��8����z2y����H��M��MU���TϊU�Oe)�ւ���������X��GYD�-bW���Q��I�����2�[�m^�3<yOǶ�T�!���>zj|:�::�L����k���S�D�w�[��G5*�� ���Ĝ'��B�ϢZ���r/�m���!�}�L9�m�����)� ���?��B��>�=-���ӑ״� &��t����{��a���8�.�N��܌��k����5�����9=�PD�V�R�������*#�<����"���L,5�֧�K��!��띑�^?���1��0=�zgxp�fap/fA�Z&��lqM�ȗ6_�  �1�F�)��@�Hr�s����h�.:�&���z�?��?���Xc'�Ú��̃��nM�;�������s&��>��J0����J3?C:�j;�Xr����c<�+�i����E�+�|�A���V�bz7|yn��+���fq5�K���A�R�O�6�/�"���c^�3*7��F�A����焍�U���HT!��Z��>�$v�n�͎��ls��5��ȫ��)5����f���rORd1a�VKh���+��b��^�{�ˋ�/b��[ga4�[�E[��$(}gXc�@g�`g������a���U��ô�Q�د���4�dv�8�:v��_�NI�XA��U�Ս+༗u0�z^�>��nW���:����K��^@^���������B���x�l�EZs�Ug���Rؓѭ8RFp"� �����H�a�W�zrӏ��숨c	�|קWA�R����z�P��3r�j�`��Y�ݔ.�SP�%W-Z#rR bl�~����q%<%b�{Ļ������]w��@+J[����G�#�ݔj�����KG��+������3H;/����nL�f)�ar+�JI9y���,����ً���_؋�V�	8w��%(�ʠ1������ˉ��f�8�f��� h�c{K?��pʘ�^�(�S1��ǉ�eN�<�!���z�`� ��,�벘7n%0#����;�y� �i�V�Sh4.�?a�ڪ^�����9��tJ����>榊��z�*j6Lan�UQ���E�ф~ү�D�j�Pm�j,��3 F�����,��`[��u9�n>���MT� .�-�Y�@����:.�&��/�n#�>b�i�W���Ol�w��z�߷'n�k�v'�B�����a��3C� o�Թ�GyXI�+�>���K�(�0�;l�.p�4�Oh�4�$nhT�E��ȋ�{��&=�jr�XB��4h��a%f}���K���7��T-6�ݜ͉�[	b�̅3����b���X����붩`�[e��N|�p�6[�ZxM2��^};��8q� J�u�[KA[��4F�s��r����q�ֹ���R�a}|3�0GI�9��!�:�J,��+��^�!N������a�XHW��A@�LB�N�W϶�k�⻞yf��g�a�$��e񛱺}���?#޻���P~BE߯�#�̼�H�óɤch���x�\|��2�4�a�B�T�J�!(�����^A���**�"0�D�!�*��i]f�K�������|�x?��*���e�v��}�Gn_�����0�k�W1���s���Sg��� Rwʦ�7���ڨ�iP�F/Pe�!OI�����b�P�
��0��"r���+�zj��/y�o]�����?-*�E�?n�۶�?E���j�%��Lx�'`��ڟ�����(ɳ�g���=�LJ#5���n%�+��X�T� L�@��`�P,�C0�Df3y���u�q\�4��_=y����+7 �DM�e8_�o?��_M�Z���l3��?_�)n��Ʀ�sP��Lki�c�J5��D���z�%�F��RUP��!(O���z~A�0�l��0�T$#��&S�U�ޫ��fU�����Șu'��7���?��w/�K�?L���d_�z<�<;�*-�=S~ƛ���ң���wL�V��-�Ɂ*�j�h���b/`��f#	�P�H*!I��>=K֯�$�Y���Rs�u?�G����|"��;��?�����O�j��p;�\r���p�]h��ı��&������Q|��g-K�C�6FZ��Y��#R@��� �!I���(�d��Ok�rh@GcCˍ����K3���u>@�)Q��Gl�Hݽ\Ő g��`
e9Y�y	?�>�ߓϔ�:KQ;��" �� ���V�4�a���^vx���y���A3�~#t��,P�b����u�W���:+��&���O�Z��\U�gI�c7�K�C�����\6��[l4�?��>��v�w�Rְ���@ ����l$F�2��0V4�, �����g����T�� Vs�}�p�K3O��Z	�!I���l�b���"�jJ�kw��P�?bg�q�m�����5u�T\�n�QT��;_pwE�m������>�x�R�}��(u�}���3��l�W���;˷tM�w�ѤFf�y:������QX��d��rp%,�r�J.52�\��=��$$+���S���󥒑R�ߛS!�ur��ꦶ�/n�3ŭXk0k�a�H|q8+�ؠ-ޛ��{����9�L�u
����*M�HsV���p�)v^����>ȯӦ�!R0��2kp��!I���h�d�IO3�����Χ;L.X����T�~���)��N��H	�Uc���u'-:��Z���VA�����뙄t����r�9AhFչ"2��>F6��
��*������PM7E�%&E<�K��b����BN�u������]2wNQ�OO�R��s8�i���T\����K��A�����O��=���N��p_U�p�#=]�������B����T�"��!I�����d���Z��tU�a.�Cw���g|b���h�[8�"ǻb��n�����|��춸�SQ+�6��SU��$�1��\��������3��K˧�j"��;�k�/Z�gMU�W�m(D]� ?R�LY��P��w��n���E��4�H$Fz=L��W�cAf��.�g�󶋸��|�$Aה��}R���.t(\�7��3��]�>w<��D�j���iv�r]�asN��0�V�m�IJT�x!Bo�(�!hM�����
��1Њ
B*{{�W]�R����"\-5:p��}��tb�W����"�'����țuf����y����k�1Q���L�/�*YH�s6O&;/҅�(��0R�I��H��0�T"��/Z�ܗ(�Yڪ�W�}ƣKk�{���d����n�ݵ�z��Lukѩ�_�Em��
��k|b>�?�����>5���_4י��
�-�rb�"�2",(
�@�p!N��ޖ����X0B�� �HF��#k��2L�%F����)'��J���Ib���>�M׶�=5w�Xl4yKpz|��0��}�<j	�)���׷�^xC�ɩU;�k��$�A�¤5�v2�h,!
ap�TF3����eq+�V��u�]N���{��z����}B�?���[{��ݳ�	��sC���`�t��PT�51�IV�������H�AqTq`Y+R���Q`�� ���:�AGx� p!M����Aa �(
��p��(	T��]7/Y%^��8��q�����oң���tq���߄����j�iF�#Pj�I�|�{4�U^�B�7�9{Z�4|���]�uvV�A����`�DҠ��M0`�4�B�.	�P��������^y��]o�yyھ��ʗ��X?��I��/d�����/�u/ڵ�=��|�����x��q����<��Hs��{'Rl���(k������p!NﵯƊ���P0#	� �H�3�׮-Oo]3N|��N�]�w����G���t�����Z}2�h.��?-�@������Rze���z���M�E�$�)j�����x(��; 3��a�A��`L�!ā�D玧:��7ījd�+�L��{��{���o�0�X{{}�w�_�����!V�cs+���F���C�Ț��UB~�
�k��!�[�N�KX� S�?�ȥą3�a]�P��M�!(O���֊�@�(B
�A0�E&��ַW�ۻ��zђo�?�Q�����&�>:t��[�؏Y�>�*t�x�����ݛjumvn�3��V_P�f���)Z�R)�S�	��B� =c�2��2,$���0�T"�;�˅$jg���q/�]:s�#��}�s��{��o�|f�m�;��R�]�]���ol�ⵂ�7f���i�ȸ?�����A
X���{�t��h��+h���!I���,�RDSεv��l;*5uj��NSG�����b��=5�������W�R�n8�J/����c���B�X��	/�b��p/�E����y�X�ShqB����z�V�*���P$�т��"���y�G��E�xl��f9�r���1xCЫ/�� V��x�+��?	�p��f44}bŴm���y�;�<�s���`1`��q���`*�ݔ��.��J��ȹ��P!hO������aT(b
��! D�3/�׵�����u�V����}o���g�Z�b��/{�������X����I��_��qK�������Z-�f�;nc�/�`�l�S1��0>op�D���P@�,D	�p�PD4��&L��u�ֲ���\I�է��9��cO�+=��W����?��,["G?�uQǋX��h�� ���/�8��ݩ���ܹ����ILϗ�rL�7��b<h���S0��!O����A����� �HB�q����7/]�^��n��^4��|�n��ʹK�oM/�|��]��Q�t_�0�����;���SN�U.���F�֒�e�a�`�9��/K�i� ��Ǽ�'���Bϰ
8���P�$��A@�HBvy�qQ.f��7WjT��J��穧�&��k����\:1�]_1�7ǽ�3A�I����������Gėa޶�nAo��Y�G�ikl��f�]2�v���ܯcq��!Og�����P�`,	�A(Pj��$s��|}��V��$׿Y�ʛ��{�{A��g���=�>V��R��ݹ@��F^�me�r��93)���}�L��wҀ`ۧs��+�
e�h�u�Rq'{3F���B(PN��@�H*)�D�Ƨ����y'�I-Uz}A��˞~5���x�uG-�O���_�W��fe��W��Ǟ���/�\�����>�:��Z)���U҅��#`P�x� �p!O������@�P,B�P�H(C��"0�"Mk\�l��+|Nk����G����|l�o�����_����K��w:��D]����x���g���{�e_�m���lN��J=Q\���%a#�$9���@X(	
AqP&
�A0�L*	�H�u+���\����w/��j�o�z]���d��i�_����}��}���<����L�=�9��Z�}��ϼ��S(~F��*���XS��YC1��N�0N�h.HD!L��������
��Q�BG�s��uR�w�v�8��������g~�_��g�ף��O�'�Tp^���o�;��{z����˾N�)UY�$�0����l^Tk��K�_ �
\ �HqO��PL4�@�\D	DB0�J���ߞzq=��~�Z�/wW���m��Y��Өn��/8]��t��y>4��=Kun�W�����ˑr�����L��ː���(!p� %AP!I�Aﾎ��p��*S�"S	5{��%o����WUY�O�`����=����]w�fM?��v=@O�O������ü�k]�ڙ���1q��� ;��S��2�ky27%�#3��( �/�{�%�4$� �\,
��0��"g�֗���z���ϧ�V��� ����շ-�S�8:?��_��ީ��~�n1��j�?]���6+����z�d�q}W��^�y��1/VM(�� �ˀ &�@!O����@�l�BAA�&!K۞���Y����g�{�\���~�n���y;ߟ��7s����Ǔ}ʯ�8��ĕ�~3��`���P��w�o8�^'��pN[�1�DT����BS�`�qb# 
(�A(Pd
�AD����q���75���;�Z���ֱ��6���N�o=�H�������b���~�W�C��=(�_xNxI�}Ռ���=���w+Qu���~�`TO�EHHq�!O����~�a `(c�D�QL*S�ǵgz����5�<��X�����7L\ɶ��>���C��K���g�-���k+�7e8v�,G�k_�����拈�ȭ*ChHp�
��\����c �H� �LBS��SϿ�~ػ�7��SJj�����O���������|?y���sT�����3�x֛���8Y��A����?[��&7�T�2쒲���9��ț�p!L������@�L��"�D�3~ʾx��z���Tn��|~�~���|���f��9K���_v֖�}�õ�=��	�����fx��ꖊ�DFsK����pDnd�1����Xh#
��P�LB�W�y��\�z��Χ�3������-�u�ޗ磴��侽����c��ռZ� ��C�x��Z��vt��������{:`N:.�X�ޡX�{n)�%    m��m�����6
t�"kY���됏�Nl�Ǵ�8��E�8�^򈚈)z���y8K	���@�W��_��"�/Z)VP|�,hP�5S�'H��9hAFa���IC�G��l��!  ��A��M�Amh�L ������3�G,�?1���4�A�e��VN*�u�k_e��v5��T�� �:�{����#���$�����W^ḁ$g�;���#�G�̯�4�����ؓ����ަ3�'6o�}=��Z�o���a�V@�J'Ԃ8z>��b�`"�F��%�S�S	�cXy��
i���`r6ay�ܗp!�JM5�_��4�b��>Ʒp���yIa�s�}�Anu�2���H��i0���È4ބ`�kR�K���.(ب�����R1��Z��^ �J<������!����k�-=k�0���]�\n���1�W��]m6 �M����|� �񲲰�5�Ѣ嫹�M!���dk��|�E\�ض�+�'�x���.�}?�ӈ�r.	Ľ��Ӳ�&�q��Θq:�����4
SI`��8�a5�r�"S+K�L-�b���r>c�^L�c#��%͂y��߯��j�x�]q��T���]�Q7��gc�i�>#0�*�@�Me���	�;.mDjr��oA��^2�?����7�Bj��'����7�Z��""D�yJ��C��xԧ"�������p�:
`�}R�T�`Y�!����. ��md��Wk3�D�R��Yz�.�X��G7E%��5�����i��e����1�-�l�D��T�T��p>r��-y��݁����v��E�ҥ�Am�v[�,{<�G��]��g�hqT$��a�<�I�;#�6=xn6S���@�����3���c���=?K9_�Wg�I_ّ��_,)�t�ʬ�6kV��6����~��1R��[d����VP,��5��(Y�d��#�G��Z�Ш�D�뀘�*���,(2�=Ͳ�#^��U�X�םg�5>�	 uS�JU��f��9�Hk���耚�i�a؞F����go��S�$��C◅I��t
�N���������I-)E�C>2��4�F���^�=�b��"#�z���k�+�g�|�M��?O�x��[�R�ʯ��߆�M�����P���XK�0c|��_�C�r/�\���3�C.kU��h4u�D� ��J�����ᒾ�N����}��fO��������<��T�Պ���)�G�.h�KG'/���9�D]2�b>oC$���E��\��.U��[%�Ӄ�RG�v}������;|�4ǩ�އN��ݷ�-��Ŝ�)ذ���C�����B'�¤�����yX���_i�]�����qWf�xBgŮ �2��sgZ��V�H��tB�/ξe�����WkB�^V1�|K�Dj���H�6��ޥ�8m��"F��<RY�T0�*m��P�gaD�:98X��435%4Xc�U�Ԝ?ygs�a!���x�Q�b����я�z9	���1��E�g^I$�$��O�Yxd�/v��'y����.�}�Ӿp���$��������*�s�V���D\�������qi�v��&1��:y���kw�Z�\`���2%��I�p�B+�n��G��4$�*9~a�ᶏ����pݮb� �	a�s+��}-�	�Q�I ��#з���SES�.FJ��~ӹ+c��"4�C��ή���В�3���ZVo�E'=�@	�w?�vWu�߽?gLi����]��*<�h�֫>&L�:C�u���=LŹ��)T����MS�f<6:m}wJ���I��؊Dn[I.N<����Ӂ��Kv��w�
�#:�U;ҋq|N�^Op��<[1 ����y�Y�e�O2�4|��^���B�%�!V�FE��I�a���|�ѥ���J��Ic(Huq��
�K�d(N�a��k����#��^Z=�q�WA] ^
����tC��'$�E������}���W��_�������[��Gy�u_��h�	�,�%�0]K�g�>wSO.ѓn�w��r���s���B>����L"�z�¿*P��Z�ʨ��M!a1�n�ţSR�V%�����zm�"b��b�����F�]4Y�p���Gٻ�����S8�h1�Y16h#J��}S�~����9%ʢ7:.�7u~�\�&ŨG��3�x(!�8M?,G�ò1R{MS�������A^�������il<����Y �
�ߤ7I�2�QU��|�2dv�8�!�9�����{
׀PI�OQH��U*w*�EJK:�� (.%�T �=�z�"�w˹�XN��?l�f9�U�6���������|��`x!P�|��^��'�h�e[�|Sw�I��c�g�
�5! �`I��r����\7���(2���gdw���+�AФ)�8��"朄b\��y�S��e4q[4'�a�5>f�<��y)������!�9^qp,��N��|�A����=�������V�B��Jf�oB�V5;!�IFN�\5Ƽʔ �|6���_qi4V�6����g�R�Gz�?@�ۄ����w�R�a��M3ο���-)���@���+D<������i����N�n�&pT�����0u-�E�����=�`�B��cz�0K����v�p[�ET��~��^�Fmder�G��t@�4MK]�*�tk/T�-P9t��T���[4p|XU���nz\bf>ʌ�[F@r��V��ş��b©l+��$�}�)���׬	��Um��]�lh�\lZp����R+o2 �����C�i xM&[Y��l;7m��jejz?�i�e�7o:&��ϙ���F��7}ػyG"�(�Ud�r��wE�o�v4d�!,�9���2{ۺ�t�#���D���7�*#o�������DG��Ȫ������_�ޔִl�\
=�RQc1�0�Qg"��vW�k���^�(P���2����֫��ِs�v�T��~�p�������@�T��;�(�#TAH������~��K�i�'u[l?ԧo�rί���uP��Q�2x��A6)
����r��c�b���h;����?�ǖ�J�t�7��ĺD��!�HO3��|85j,)7�г�P)���y�p{��@���M�1e}4͙�(�����6��K���t�p�q�,��a0�6aBu#]���� L'�k���vo�����.�~>c����Y
L��A���cϼ�(���n&�%����}O]H��N3)�K��6'��jR�'�a,C��͵d�y�aG�����?c�]b��I�b4�nU����$K.)�ˋ�����|�ny�V����x�� A�E�y�s����H-���:�u]�dހ���,�	⺦�m�[�ٞ*2����y�����B���� >x��̰�Ue����,����k�9�G�7#G�CU+���r?e�I�=��a�:��Hz�#v"[(�_�}���_���-]�qd�V +�̻�/�2Ӆ~sg�w���D��n�$��O�;3BT>�A0@A�X=�%]�W'c������Ł���a�(��d�Ɗ�x���qw|,��ڰ�*� �l&�
4�C�[��9"v�D��'\�p�Z��ʇ{���Ѥ��A��Q�n�ߏ�ks���T�a�d%��� *{#>�}�b��B���^�1�;6�.�@�,�KD����Fc�U�
�i.�9�����J�7�X�sI��pPC�Q�[��h�up"�s£�3�̠U��@�/���8�ny=hYF:7nylU�8i�����-
j��n�[�x��!��E��oa!���A�	z�'6�ص�hL��pد#���S�ϻu�czNځSSY�� ��� D���8<"�V	������i��u#<�]4�a�L������.��1���a�7]8k�G뀧c�+�bZ+~�e����od�sƅ.0a	&��zO �|�a��`7�]#}�F����i`^�n�n���o�iU���:h� �.�u������ ���!jr7�	�=��i)���I����At�6��D�1�{��j�s{��D72C��Jj$`��U��O��'��{����4(�\:w�[u3���G�U&�ra�W*�M�kE�u_^�M��;�}2E�?Z0u��=��M,$���^{lM�]5��{r����Y\Ϳ$[���5�^�@BL����x����ݡ� ubǍ����y�����.D�
wwP'��C��W��zt?�'���1 Mܭ�m�VNrm�K����{b�dz��7����S��n��y���nX��X.��Ԇ�	X�LԀ�)�YPd�s��T���F|.�V�ۘ� ?+yP�CD�`����,���̷�߳@��+��զ0�a����| ���Q
��H愑�?uq�#kvPhJk
�D��u^����ߠ�X�0�'}��,�_�0���B�̏"#���˕p��n�;���z�Y�N������A��0��h�n��Sjʹ_7d�q����~o���$��o��K����n�+���zq*(��«t��p�C�3���߂pX��葭��f�t.{F:��l��c���sF��<΁��4�L6D���>�?�c�xB���q������p��-�V/V2W�-��q�ƶ�6�Bp`q�j�8 
&����_g?$y�a@ʏ�x�}{�(�lIR�"�	�B#��KI�����+v߭��k��e{+�gƨ���W!Ʊ_����5h�$ZA��E�Y���������d��Ü2dm�,�׋Ҥ��(8mD7����Я�[�V2a�� ���������	[���WvN�h��l	L6�D�ti`��<��[�:�����N��ۦ	��ppS`�I��aQR3֒(��'��֝g�����c��Xq̋���z���.��`��U���- rQM΢o��k̶=�]M����0��c�VI�f�h���,K���v�����=|F��f���l��;:!!�w!���vR��m�T�c�8J����@y�+�w�?�f;����s�X	�h������^��Q�|������>�5��K:��*�GƩ�	���'p���g1z����{�Q��K?�+g��O<���[����a�%? �J�D,�U&T����e�J��+��Wу�eiHR,��PU!�<ɨ��� �/u�u!t6C���faiw ˭��)�)��"&���ZD!�ZkaY8���_�����[db`4��x	���͍M�C3���#�\���b��횢D���m�Z�m�`s���>��ZX�n����"RR���wP�W�����=D<Уv�`����d��7��,�Wlק��"�I(�G:!P�P���K.fWae�@����$b�={C
��1��Z|�/�?##���������C?�z�L5�K�B;�b�?�{��7�bv�DD��������hS$VZ7c�t{9	^|��]E)$%�:��&!�!�+8�R)ĖgO��V��7�{�[2M���ޜaz���t1?���5Mg����f�����aB%�W�ٯ΁]��f\�K�F75��"s'��,L�G�ۯ�`��Dc+4��?PG�T��p�bg������_�G��8�j	av#ǰ>"^���^�d�˂%>�?�r˒���K{l�'�dH��~�H���y��`�w�\(�VOt�����]���yT��Ƥq�X :�X�	!>�K��g/r�ʯN *��A�zfe���>�����\]Bꐢ�6�?��Z���Q��fl�-6�)�i�L?;��Q�yA�y�����=Q���&f$5x�(����Q��KG��:�E�f�ǀa
lAL��,y��T�Q}������80���j���f����ͩ�p��
g7�5'yPV�j�)����ުi]���g�`Z2�.��,.P���-J�%L�"�`��?Y�tY�=ts�I,gN��$�KF|�UT��^嚗_��2���T��B��a�V�Q�>��������������X�6:����)����N�fJ1�4��aJ��691$}3�T���A�/j�`�T���^������>���Tǫ��Q�PB&���J�j��n]���}�5a�(C��PX�U���+�C�א�%�,�FC��a�� 9�h(w�Ύs+܄���F�Bђ�$�$��ejbq��5�㧇7Le���<��ސ�Ӷ:q%"a��QkO����ԝ���G��_����������HT�z�w4Y=�w�ib��������0U#�"I�6��'�&؍�<D��{�3H�7�\��`�v6��ſ�YE��V��������� �5f���=*�&�J�v����,�?�������C��xӛ#��[Հ��w��j���3�G�J��F��%l8�4{�^�����V���>��6��y��5�|m�
�W�؆�'�j ��xė��U�%�yH2�O"6s���G޾���5b�W`��Tj��*�������ދH���3tٓ=�(4DO��������p���鞸���9{]�>^��MF���7�r�jOKi�M?ܪ!	q��I�q'�r�6p�EW�*\8��&�v�x�vm�ے�u�/&o��{��Hu�D�-�8ı�S�6)̬�ĴR�Ȏ�	�<��}�y��*�+(�����J]����E~�$
l1�r�� ���a��{n@D����R���q�I����%����`ig��Yr�z�%5p�	[w����B���X�(�^��� M��������9+����)�v�?�!T�Cc�C	O-mz6C2�(B�!���@�l�Fǃ�1�9�̺<3�I4���N^8�d���k�\hy�/UV�BoP~H�4�hm�#� j�'�����	�O՜�f�FA���3��ȶ��U�1ՙ���T7;�9�$�n��ǅ�c|X�̎	Q�h��1�Wx!dy�����V�z�eX,�}�ѿÙ�
�8Qd�9���O)]��p����~WL�
�lyÞ6B�m9E��܆�Uwb�CJk�[��Y��I��j⽶2��z�(e��-Hv[�!��_:��R�,�%�U���CEw@�2��%�~\�4�$�2���������tQy)&�aeE�1K�= ��=)q�*�?�~�`O�`8vup�����a�T3d�f�<vv�F�i�O'��Gk}�
�L-$��sxV��M��3~"6��ʬ�2Kw��e�/:W�>���<�cH
����{=�C��ق	��j�C�ha�9�ɜ�L��DbL�yy�H=d�|O�gD�E,#ؔ�R��;Fb7d�fN�Z��xr�b*�n�X���V�B���\����hy�X�Ⱥ�Í9]�~�t��a�>�(޽�����XV҈�f�߾!;n��0��
 ��D�G,3%�'����(�A`�fn�b@�l�O�]g�Li��#�L7�1�\�Q5��zV#�����)_��c�U<eɽ��a娻B�(|4�����T�ӌ�ILM��� � ��	�Bh�?4��eU���j�ki�c�?�O���(�?q�� ���h�B�l�8l��G5H�"���c�I=���k���t+u���NuN��n/���W�,��r|h���Ϩ�FS�HDp��x���Fô��t=8ᤒ�K�◩�^5���}n/l��F�"�Hf���n���y���5�V�� p��zgA��BԷz�>�ǥ�#J*�>3�@��<���"���
��r)�ǎ^HX���:��l���v>���j�4��@"�6aF��p��L�A�"eߌ!W�0歵�	���Q_?�2��x������J>z�6��e��	�%��|��*�g�@QC�I6�T���S�Sb��x�w����km�"��%[���B��х"BZ���"'w,(�����kQ!��[���f���L� Ά��IO��Y�s�^�)+�����,F#����~0Ϥ��Z������ś_>���������0�!��>�_�*Q²@(�ξ#���ޚ>�m�N��8N�,��V���_�D��N�X�Oo��_�%o�E�W��~<$O!��F�^�1�� שޫmN.j�w����	�*�jp�S��ƍv[u��%ޭ�<L�֧Ж#��(/�Y��5G)��葧��_��o�'�G���[���T>�@�d!�^Br�'���#= �q?�jA�t����Cݟs.;�k��$�-Y���&X[K�&&�+���z���\$�(qc|H ��8-5��x��J��
>�iK]�R���ϝD[!'�(&h\����j�#ҳ�5h���xp��4�`�x]�d���[�Wk��5�{\K���A%w��E�J&��ޤH�|_*�m�c0hwIB>��(&%i���/ߧ���m�wLZ�{����D���6��̏��s��'� �mYl�q�Č��Ҡ*���l5� GM�F'j�+@���G\�x���ov�������������Jw%�ő�ı�d$����D��[}}9R�-���$/c�15���ʍ1�6/|ծ.JtJ�Z�-�S4jL�:89��: )�տ�R� @�_��ڎ������"2�|�L���ڠ7ޏ��-
g\C{�����lZ�r���[�L�cm'Kc:h򉛞���O���~�);D�A˞�o/���Qg���'��sRT��*AG	]��|���� w���.2ed{�?+jbY���*����Q������LJ!���Қg�M�Z�ךiOa�t�V 1�5&��xG���8k����1��=��6r��pbr�7��uE۫f��{)�	�@Ʉ'j]Nl��߂�st4�3��X��=x�ƹ� =E�I��;iu����C+���+�XB<��f�����|�}
W��+���� �t�Oo�-,��h'kՓ��e.E%(?�Վ�In�XIL��2\�G�V�й����¢Q4ڷ支&����(��K�3v_�{�w�lT厀��h���I��������ܾjd�#�:G�<��Z��,/.yI-fU�z�u KL*�<�_(�v/nzo��ܧI��S7�t�.��X�� �QK'��#�Hy��f��Y�~|��f몀�B�f
�vX�f���?����I����hk�������B�`x���QhԪ�J� ��Ȱj�X{!������Lq%��bI����� ��S�)t]�l���۫~i���-���g,J��o�?/^���(��p��o��&ڂ;��u�L'�9��:	&�jP���'s��v���	�dv.���r�xZ�w9��Mg;��l����=<��ɹ[[��f��=lv"��r׶l���k���Z>qi0��&�9ƫt��B;
-�}���e�݀�z�}��hD����aV�!��x0eAЋ<d�J�844.�F�:X�AB�S<Me2=���S�c�������	����$�Ecso���7� `�"��Y��8�j�NK\`s��t�Y�ߝ�
8=Wg�2ծ�ֹf�bt��Z鼅LK�O���� �Í�y�U*�����O&A� ��!���Q�P���3{W�k���,�,u�f������QQ92�v�D�'0������1����̯z�-��XŌ*���a?qTZ��&��:>��ûb:��k��N�.����'gk��q�a[3���Qew�
�k��{\:W�x��Q�>��i���W�#���zT5���HW����^.�����6� ��
Ɏ�Ά�%�CH�{�-H���KvGl�DE�+E��n��|F����?0�,Ϸ!?,�NB�C��d��ԩ�1b#��&��>IV�S���G�*�8|��Ȳ��A2�^�.��KH���`�칅k��'�sZmgyӯڊ�a��U��W���D��)�B�}���0�f��';!� Ϧ|�Ϻz_�Qv��AןJG)�ӯ"����y%�]�?LV�ꈏʱի�����>kL��+��ϥ��JL����E��Uz6I�I�Ը�d|���L.%�C������~/U��C������\��O��P�j���6/��r]T�
`�4jB���h�v�~Gnm��Q�8l)J�Ԍ�L������W#ŝ���"�7��P��v��O�2�.�����M-a�r�k~��%e�)��L�Z�n��Io����锱��4Q��Z?�n���gAv.�I�f1�S��� :+� �*Hn�Ӱ��;�LH�]��O7�F�O��)��Z��I� ��[T&���m�_�n��}]ں=�m����:��*�#g�bn���e&�/W�_+c��ac�.{�߬0�f5'���t%i~ܖ�v�A��6#"O��dB���)�?�;A�&ro�ւ�����w�
w4�4Tj����6���&���>�$�Aً�*�!AYi�i��r/-�ц:J5/��-�8��1��o7�>�KLN�B��B+y�b�m��_�E% N��Mp�E��OZ[��C�����U���fO_�BD%�S4�L[�6y�%�x�:����"�)����o���!}ٰ��E�f��GW0*�|s5;V)�����J��yZ�d��ԃ '��mU�?��׋��~��I��4�m�X1��Z�bPts-ut�yȕ��1b4&?�׃5gA@�j�,z�~�zJG��:O�����.��"E��r�[��U.Y�߆.ޞ.0Z��nݚ�.n^�'w�S+N��,���ς��c-�gُ�̽�[%+�U/孀*F�<�n3��$��`�|z�Fah�g����C�`j�?�l��~4[�/�|̏v|n�cb���@`=�}�����>Tcf���5�u�ټ��)��#<h���.v��*W������)�P��Yvr2�\ �X��EP�#��B}���'T��WX�FI�Z%�OC�:�}�:�p�r��9��A���`�����r�T~�j���/�Y�����u���s�9�7��#�|���e�]0[�3:�	���l9>lХBs
�k�K+Hи�u��6/���xދ"e�r4�T!��$h��p�6�7�P���p���y���=MQ����G��$�������p�8j��_�A%Im7������xw	?i�\��Lb�&�`�j =G��1�s	 ��P��?/y����Y?��^\���=�B�ޚs��0֟���¨���^��SW>�e@��`|0��,3� ��S���8�=�"� ��1S$�zw���`��B�{]̔�;���aJD��9$C�p-)Sʃ�/m~x)d��� ����*�)��M�O� �s�D�J�X�+8�`�G�ŕ�E�)�r!��-��!���G4�pM��R�T����=��8�
	�[�����#˿o���<:b�[XQxԬ�b����{�7o��cL*�-g_氓�7���)�똅ۋQ��(X�l��;�1
n�C͚���s����02(�[�F�����j�Hmc3�ci��T#0�0 �M��k+Gt%����kdx�:�5t���m���?v�Ւ�[���s� G���XR������8𥳐�*?�z7W3���y�r�i⺔`eN2}se�6��!��O6X�|L���&�9+)}ϕ5?Z�7�<r�:��:̀\V�m�c����c�ѭ6��Q	`U��r�5#�|D]@��3h���i�ģ��9o�4����S#�0�a��)W-ԃ�����?oC~%��$�X�EN�zۢ�>~5�X�$��%	l��0�����x�4��ث�֯�Ff��IV�oEڃ0�D���G;[i!�1�g�ŞE]�b��R*�!��rc͠�9�{-;д\��ⓧ�\uDЦ��B��"C������W�E`��&��ϋ	Oo��GE>=�׎Y�7��v���h��v�7w-&��]�.�(����9���OB��-��&������M���iȻ�)>��1������b3	�4��}�r���*�=�a��z���5 UR3� =�J�xݜe�#R��y�FW߮y����u��J��N�+,�L�3��t���ዼ-�y؈� �a�TY.��PC%$1S-*������K�o�N��s�J�c`�m�j��TN9�
)FDhى���E��:�����z�5�`�����/o0M�=s����"�V�~:��RqxQ�Y�r�즏���E���eo`s�ۉ�3Q�ʀ��A���+�'�use�N���� �f	D� �Fk�*�nb3�����=F��
R>:)�C�FɉLI���M-L��z�w�bY�ۆ������K��	9�@���vU/��D�-�?p��� 2�u��/���w�g3�n�;����!��B�IB��AX�EO{#�2��1�ad�lZ�mbA>h8g��wp\� y߷��᜙��=
�=W��������'�D�-t��J_�ؑ�8�!�f���rn�e�GE`��v�����-���C��e�Ġ\�h���W�{v%��f�$�̛hA�[g'�
�C��X��1��ʧQ�z�S��-�
�n�+���fsÛ:jf��̰D���)�MԔ���=�c�������(J,�u��PDA�(�uC��<n�˟s21·�N��ޣ����A�f��e���<As�����V����If��F%DF)K��Ў5�n��u��5���$�5Y�j8=�|c�V0��.�bz�/��iN�R|GFtq[��ť]4����=���C���9I��{�va�^��q�	�����p�f�8<�;�+���,m�7gb"��Vvͬ�S��e_�Y���{B
AM�ؓ��6i�k碣P��$�1׺{�����[�;)�s��>����Z�_��oc�Z�ʺ���^�.�����%��C�y~�6�K�@�:IӼ�-�P@]�U|�2I�Jv������]�S�/�Xtg�w]����۪^i����(���G�����ˌ���W��"~k��U��Yޟ��Z\@#�MK�a���V�M��\�s�S��Ɣ�n��zK�?K/ x�Y��0���/��նQ,��N���*�#'��y��*v���W����%Ϣ*�}0���%�J�l�:3��4�>�Y����UG�fJ�<W�8F�-0��=c{6>#�EQrQؐ�ەM`#�\��l5`Ĺ�y�W	����l����r4�eB�>�N�-ܒ�[#E�����̸ ]B-�Y�ap�G	�|M�\�3���5 ߟ5�����A�u4%�� �!;�E�*��"Mv9�+d���L��Iam�yG;>�Td�)�����/{�J��������3�BVp�uÆJ�m�v�(*x�D|�.j�!*��uBƑ� I�&�b�/a�@��a&xkx�� 9^^eӶhh��`.\��]�o�� u�1�!@���N?�n6[�K^|����Y��mW/X4
r��i&�gN�s��/�N�v؉1���j'�"z�dp����U�n�����Rn1�c��J�ד��Pi�.��L�����+�=h��.�V�\=~}p��aɃ�<�(�ݍ0�1��!{2�AU>۽Wyϧ
��3� �?�������}(���ݩߒ�9��^ǋ"]e��Цs5w%�K�T��Gc�I����R����:����XgC+�s�Q3+��2iI "x��¨��s�}$AA�w}�&�>/|�pSTÜxxs��۬��]�ō���{L'�8���Q�k���.��L���v��i/���km#�R��������B�5T}�|�r�+Q)��������瓏X��*�lP:��7퇧�T�&��'H�K�'Z�ɒM#)��X������/�xD��N��|H�s��C���)��o��3�����:��	Dc� �<D�b^�੘zf��Vp`+j	d�Z����c���츌*X�K��ո�j!@h+���o�1��܋}�HG	
�jA�j�?W��%��[�M�:��D+ ��2F�q��+��K��lk����]3�:ߖ�q/��s��V����j�p=�����6x<51�.�۷!��<Lo��:��B+�A��7���)S{,��+dzP�^�`>FQ������B��l�\��k�+ޫ��-��0 I�<i�/���je����1�;v2��Y����l���8�#�ZO�4���M#������G�?�Vx�4z�>�8�ލ��<��q6O0W��H����f� k���P�.��P�)i�/�+�R�S��ъ���.�F��E@�L�/��v�'C�oMF����f�*�1E�RM� �iv���@[��~xb*<����Fhl����JzdU�[K����q���|�H��PǤk�A|��d�9�!}�M �.����/9����_�6�;2C�5�� ,�/7yM��h6��%�M]x��D�����.�����>����j�B&� ��������؞��!c�]�B���'(;�#˕�SE���r6Yes�	�b�xH��l�$��b��LU�@Z݄9�p��q�ShBFb�eGcjY�.&�DP�����,��<|ΛA�Y��7\�ʃ�p���=��{��KU�B@:���,�O|�Ӏ�;mh1���@5>��j�����M�$��-�Y�sZ'/ES�8Ϛdq
ir�\��;�vp�3}��Na �l+��)�4��qP<O�g��GӶ}��v�����	BU*����p�^��PM���3���D��6φ�g/����pF�NX�>�/�4��V1���}��Y���Y���U���1'�kǇ�'�G�h�	�а�%D�`ھEY[/�»_�Z����-��2W4_��'�S{i��2"W��Z�8���ঠ)���5��E�t�\Z�D���BE?�-?� o�Q}�/�Ð����đ�ZɆ$�&9"V��Kg��W�{�Rk�GA9��f��'X��L����%��ܱ�����]T;���#�lx�tW}�����~swNϤ@Ԃ��N���[G�C�R��9i�ww�̃vMu-�ް�������/�dVѕ1hOF�r3��z`/���p�uo:��m�YNl���Br�s�M��zl{_��
��sA"=���_o<"�Zl�;75�!��3E��������λҠ<�eg�N�܁���fXohؼ�DM��vh�k�p�:C|�r�T��
��y9Ʀ�I�<�-B]��S7b�]�Hn-�zUW��
� �lS����Qy��ޗI�Ivh���u���L5n<�T�2��'�*̚���n�Q�7!��+S:��s�����h<V"Յ7�3H�NTX�א��z\z�#%\�]�����y:��4�\xQ�U���@6w�i�u��b�=�Z!�0�X�q�������G�k����d��Y�� �~��IH;2} M���"��ƅ��IG�)>~�$�W�g_q~l�E ����Ng&��hz߁�����5ϖ;��]t8ʛlkO	�y�j�юBj�	=J��z6�m� E�v~6��q��5��SO�}�X�� !��0i+�7�|�]"^������F��uJYs���=	�v@�KP^�f
�|S��F��9<G���b�֍4��K�<l���'I���V�s�U� gG�-Hr��Q#71�� +�"���Mֲ+>I.��E��d�Y���QB�a��ŤU�h�q�qKP���
^�#��:EV��3�D<�#6�����ޅ_�0��ں��k�óf����awV��"�]*�K�C[Y�e��D�>d|����,^�)}I��{���)$q�g��y\CS+li�]ɃZ�\}������Ɉ��ȼ���ei��e�5��ߜE���i\��i��ƫ��"<����ADd�O��l:B�|��72���S�U=PX� �8��<�,�I�@Qc�����Jl�����E�A-��+Ԅ�q/p�=HoY%��1_~CZd<H�
In��I��� <���"	�/ҧ�]rM�3��f����呣6��M������S�7�#��Z��2d��C�����_^"���7��ڭ4��NmT���hK�y/B9 	|4\-�2��h����{Q;�)��	.���r���̓Bp�dc����_��;��U�Eq���#�����	!/?���X0�p9	�R$-=�ٚ�"O�s+�Q��x��0�C���/+\I4�B��@���4�ɤ�zQ��k�m�!}	ٗ�=�t���D��� �sBFĵ��b(q��� ʞl.�=�%����8r蓘��"�!��s\:�r��ڏX�4^J���u�{	�nY� 3�ؽP�������`J�R,�~V��� h�m��L�'D�.*��-�89Ѧ�	�/$��D7��(�A�Qz�}�Y��u3z�`u]�iI�jU�{����ͭ?�L��ϱ;X���v\���[�-E�9��H�eW��2���9��۟Y[ӄO(w�!��y���x�<Ji˹j�x6��~bmU��KC�1�l�o�{���=#�	/�8D
u����.����]xeR��b�Ɍ����M��B�>�Uxp�D���D.�On���i�<_��őI�`�r!�P�!�h�F��6=Ω?�WJ�+����y�X�� �Y�hW�[��_]{�EY��jo��#M�G'�Y;�Df`ۺ}�+��E�����D���o����~��s�M�ϳ72r7y���8X6�
s�����[GF A���t�<ٵ��ib�`P��X;K�4��$�y������ފv�����o��Nw����]��}`3���m�ԃ�e�@6��{o��* �R%묛�h�5�&e>��d��)�4s��'R�R�.+{h'b���q�VV��;���x��I`ь��V�|���q��G�v�ˡ܍)��z����>	�޴X5��Eqx/=�	/��t!�>��q�UO��P9� �!(y=\�K�eu�gS����FL�f�<�~S�ƌ�r���V���5 v����5�}�����7�?�Bo�׷�c�������L��kuK��[��e!TM0��3��}���TY�Y��(dV5���<K.���ŊÚ�4�rQl�g�
�1����ѫ�M&dMb/���� >�<x`��$��|8���1�%��?b�وf`=�to�0��+��/�d��v�d��T�*���%��qԎQģF�� ��h$�&����@����( �E�72�R:8��wU_��o�o�[�G!��i�,�o�A�#��;��k����ռ�S��<-6:�=(�>�E�4�4u�:�Qh=�xZMZ)���c<�Lc����m��5�	"⿆xiæz���h�[3���m�5Q%&�uv�MdnX�g�B�;|/PK�O���n�%D�]�;#Ɠͣi��������u�������D��4ع�a��opZ��;�=2�>��ŀ��>���t�K��E)+�/s�Lu�����p;���}9���L׍M�E�Xej�y��s*ۤmN��=nƃg^�'$��b��M����cFGeZ��xQ�57�HB��x��0�������١6�tYU8��måFz�e�%�����k���������4��]0 �i�l��r�W�?5����h���	� E��N�(7;�FF.����̢r��k�s�r��c}���䶠r'��)���F�V��_W� �� ��}�vL���������i,���Ƃr�+�`���i?t$(m֩/q�O9��H�T��S3�B�YN��z��j�"ձ�-�U�4c�ep���o���n�7�C#u}U a$�^Yߟf�oXk$o����.M���q�	��X�kP� _�ӛ�8M b��L���f ���]����E3?3��S�z^��n�v(���������F�Gӏ4�0�Uj�����-��;w�2.;K����c���4#$+f��-I�@�RܿY�����y��ex=�M�/�����/����X�iۿ�Q�(�5�\l���9g#������B-든ɂz�`�M�x���7Ɏ��V��>\2;?���	��8�³�p�\��Y��oj�%�g���m��}��]t@�-�B�1�%��y��Y"�#>2="�H�$$Zll>˳��b���n��r�c��e����H�����̏͉��hN߄�e�f�6'�F�x��>B
9N�mo~���2�mR1?AkN����]ￋ�]Ŵ�U�;pI��_����^��J�V�Y�eX�:�2�v��q�،@'< ې������U?1�}�
�6��z\���tY��s�;��>����I7b�!�-�	��(��"���kKF�`��=M�6�u�������Z��w�I]��(	�v$�plt��f�̇0���w&�4����u~��/h�%�|�߯�	�Q�C�w���`�����|��2�1���X����@Hu/,6��y��z*z�6���Q��o��Ȫ2*���ւ�J���S���ڱ�d��Xg��Q4�"&���^}�c���D��I"��n}ܫ	PȖ��]�k���b��[���Q���6Vp�����x^��+�`�{eeY�K���)zr�5t�8��/�5���)lv����N��Uz��TSY�'6˃j��v��#��S��~.Ӳ�P�u�l������:l	0���4m,����+�m�kxo���e�&��f�ǋFQ�p�i�A3��$�oL�;wo{���ξ���Eԛ͹#��L�Q>�ޕ�@����H"�e����,$���<�,��/���4l�2Oo]�Uͣ�K�,Y���H"�l6�*��`v�=$ɂ,�Wc�A�C�	����#3΁��]|���F�3������n���[���Y�QPHai���l�Ѡ'��/�:=�=y��M0]$���0Yֱ�w�P�]��9�U�>�����ӽʘ���[G_0lw�I&bnGv�&��#h���[YE2J�57��JɾEȦ�ݽ�q���c�U��)4���i��P�c�(��g��_axM��$�Z�*�`�P����u�;�B��)�Etlμ�`��:�>�g��*��z��NaÏC
���N�����]�]B!���y�|Љ��ܼ����	ޙB�Y�'d���Ϊ=�����R	���v@�b&`���I�O��5����NV����c���%k?AQc�RCP�Vd���>l:80�^���'R��~����|����y��Sf�ڞM��r���,���	�D����r����o��r�T+D���������g��'wOr֡�2���0����2�,�U�e����Nz���������W��-~���0=&��jX	�?�q�'��Г��O]�C��!�����'�9��)�1��SA�I0�	�&Eb=1�v�"�����i}c�O��>b	�����k� ա���T���ɔA>�/#,�?85z
��t�7d��&��vNs��0�j��p/M�	��1�r0y���l��9��0z�0>?�\~����ir-�<�˭Np��o./e�U(s�S�'V(�3ڞ�\˿{��փ;ڹnQ���]���b�k��<'�$��¼3�b�,;ɫB%r&���so|-!]�i�i(g����M�������n���=���ݼ�Ǡ�*��=��B�m�"%b�Q�V N��������\v�l,����ufo���n_A��^cj�����ݩ{Z��!������I��i���苏�kЈ��sd.���N���tT���I��V�l�
�q)	��t�����}�w�@壱\f]��"�c����0����x�	#�y��C�נ�%ȯ�Duk�SWzIW_s�Kx���ߓ�s��5ܓ�Iь�|�m$l��� �k݌	R��ˠW��et)�r(�^�T����yC���e�v@l[Eg6��Z�� <�W]���1ˉB&Vq�N���N���T4�ḙ����l�P��s��*�$�or�W�λ8i�ёª#s�wu��tXZ%E�]�EL�5�LuS4���eM�Q��U$u҆.�D)/���f�Q�~;Q�7�vb��w&.�n}|�����q��VV�����7��c����i�-d���y��d���0�*0�8����qs#Y�$ʜd�1���̩_�cW�����M��]/^P��<F)�F�9�R��w'�����`�al�Q�BP#�׋�ʇ+��;I[x�^&S=bݏ2��� �����@���ƪ���e�m������t�1�����DL��5�=@�۞��>��2�FD艐�,/b��n��YƕAЏ��Ȓx�ƨ���'藴<��p~J�r��c���Ջ���"���|�<'�tDb8������ E/Ɂ4f���d?hQ��U�!��qE3z���/���/�� �{��Jr˨?�i����Z��9�\C98��Q��R��o�>����4�Z�fD�2D��Z3���q�R�>����[�V�r :x����޻?���s�2�� �D҆� ���Q�؏����B����?�H�u+�E������U%���d=�?
�Auh��6���4��VN����klgc�-:����%�4�e�6�5��%��7��C]����>R��<qN�ہ��jWe���
�K�,l�;朖����A^;����u=$5#�ފ��`�A�����fZ���3��K"z���y�S��X��Lᡝ��C��+���!�rWz@_s�H�lJd@`ƛ!�����S�6#��3?(�r 
�iY��O��Ͷ����%�L��t-R�W��w���f��G�e�1*�^�(*���2�jӄ�w����n�y
��!��E�̏]��蒬�mNZT� ����-��6�ڤ��@�7{
c=4���z��8�����ެ��+���H�UR��f��2��bqly=���*�ؖ�C �{�o��Bs�U�t�B�Ϙ,��2,���Ȗ�Ŧ%L#�AJ�>� �V�9�V^*���3R������o�|*6�_l��Pk�y�-j�K���]N��x��F��U� ;���'&X�v8���5�6�m���K�$�6;�)F`.�Յ�7ct��F|a�j̽=3D"�V�����A��8a�\!�ئ<~����8�h���sKg��?�7By��X:9z�@��Eׇїz(�����;� ě|�b0$\ -���� ��׷����V�(�~� �����N^��.���Y��_����a�_������о�-aC���<�8*���nB"�p	����hĹ�����P�^�{�! ���Ycrv����f�=�l\,��MW"�Z�f�'^���-X�����;LO��^�o5[�@Bs��� [�~��|k������0�Q��Vؑ͝�)m��<h!��j[�)5�������p��L0%���+?nlŘ����rj)��l�f��lf�5��/r��+/�C��˥�����X`[j"bMW'�����<g�S��N��૎�L	�C�!ƙ�<���^dD�P���Z�l^L{����D6�a�;~�R?��5�O�k����bԶ/�*�Pu����weP�m��9���]��O���b?�,c�E�䛦��i��aw@�{_*��AE[R_�g�
�_�]�� s�*�$ثM�|F��3ˠ���ҁ�B��0 �[�l���a�%"t�1D)�N�>_���#|�Pc��mh�D����	G[lթ<�6!�q��y�0��C���ˤ��~�M�4	e�R��7{JK�
��-H��ݨWX祜4e\5M��?_2�#G���ILw{O�ǅ_�Q�s��l�Fa���DU@�����l�`Y}����6�L�uN̿ڂ>M�E�6��d�O���q��.�AP��O�y7����?��4�@*f�{�a�<|^�r;O�@cg�}0zU��:�����$��G۳�/����ZO�{� sӑ��$u	Ec���Y�����#
�|��-�3}��/l���a��T����ߒ_��9��?��܍P��s> ����%^���ӭb�� 6��74P�"E���]#�7f�D�y�'�Ƹ[/6Y�%=[R�0孟��3��~
��7&�/s<�gYw������^-^$G��� �7�V.�
�_��s�a�}�{�����%��&ωZ:�8I@F���Yp�^�����OsM�]��(� 	�6@��?.;�����l�ju��� sX0��+@�Z��S��s�3����_�.,�
��0�,�ҵ���e�.�Lm����E��hYCp��v.B�c���c�
��uq��-j`V�	�M
*�{��=b�4J���f�r�ʹ����<��Miہr���k! �	7e�Z��K�Z�Nl���D #�zC�tkלK��S��\�����}EJ;2`�!6zp��vW��~�_�:��H4\��g����.�Hp	�r-M�B��Y�}L����9�����U �tB���2v���<{$^���T5+��2>.;X�qX�ϖ��X=��i�����T�D:1"_�(,l?��%�	�{�7�t�g�,l���1��)9|�b"�K�Zn��Юdm�)� 8e]��.,�AD��G��S22�[°i���L�|a�h1�+�e�n/��Q��6� ӽ$��S�����:b�O�<~��ȵ��F��g���v=��V^�7����Rf24󻑙�xַl�����N���`�\v���==Q��C�-�������&5P�/J$l^�|F�O+ưk�;��Į`^<���XZ&G����j�&D��C�ÎT���3 �L��H������c�}����:� ɾ˲��kǉp�(^��C�VBt���e�8R�qe��j�����Iu��՜�x���]=-�c�0��iM����98��퇶X��܏f*b+zkؒ[�g��a3?�l[$+�w�CXT���*�e�s'������n�&�TQՖ�~��H�U�K����v��>���,�I�J�Q)��D���/���D��ż:6Z�>^��-c���Ix�����L��Y�������(�zf�ߞ��w0E��p�׽LQ��Ċ���'�鿣����9�8�S��R�Zs�`ps��V�;�D���"$���~K߄`����\*��� =������1�j1	����-���[���F�(���V:M���ckP��/�|��k����_'����v~mkV��$;D?g��������(����������Gi��c��
7�3��f�`��1|�[v�L��X<��#��y�ߥ�!�+L+樋C���1g����=�qFq�ʺ;�X��H����M���=sgh��(�� �@��R�F�<Jy���,J��	�}HQ9q9gNmZL��;UP\��������-�<y�\{�T�7o<�����	Ք�awhc��oB~�@����Hp�6�ф�s�	��r��7ށ��2ߠ��j\�'��I�?�P/���cʣ(vH"6��79k�N�;�g�"]��D2�|G�M�]+v�����;����\�t�,�b��Y6��L�.\fi_�1��l�7�R�-�vû��C����o��&�Bhf�������PN�(�o��|;�� � n4���p��s�Z�4Lf<cRS��c����=H��ofze��h&F!��"0u[�%9Hᕷ
�I��P��]���<�g3�ǉP����H�(�?���[S���4���Зխ5�L��o;'{e�a��쏞��4� ��,qN��h�Z��
&�Fc���Z�+�������q�yy7 �^�f���Φo��0�3�r�L��b����e\?��T�nt�ˍ,�pz��iN�*��DV�N\-h*R!i:��U|\k0d����1�ƂY��Ք$�sY'<��fx��*J+�i���ig �)�X2A��m�lEf������x�b�]1y@5Ϩ5 ){Sw�p���ML�a#��LCM��&9�_�\�66#f�)���!��FL��9�bd�B�}|Z#s��`�&V]��i#�s�fp��Od���9%!u&��`G�A�����(,YL�Z���H�������fV:k��O��ֱf�$���J��UL]$>�ї����Fnd}��-h3wEJy2���� ����˻���L�g�Dk�8Y_�9�\��}|*���4rœ��w6�n�[I�_�:/�zA���`���ڱk�?,U� D��T��4���86Ć}�'��� �~\J�:�eXk�©a���w�s*�p�[Js�[�*R~�K�Yd$"PEƁ	�`I�F��gH&K�t`w)a�z�K��$"#�y�&�-Rj#��1�۲7k�Dl\��>���;���F���<d������n
�3s��*��5l���m���pM��@Bհ��ͨ��GN�<T��H"�m)*#b�~��Q����s2�IA�Q�ӵ�,�ᖣ&Wk��2��ov.X���dߴ�u�y3�@��!��Zդ~���#�"�x7��M�İ�-qqN|n�k�c]��!���IgX�ʈw�Z�5x	ނ���e'�3��*W�w�#FbB�^2=��[�.FQ� ��fY�a@�����3��\�o���)_��&<+�R�ZRIq��3�HP�)�ccV�X�Ǭipg7��������aw:yg�+94����1�9d��r��4�R4F���\+��T�*������˗��wh���
.[��c�Vll=���>cLXY���R�xx]4��N`d5�>���>DT��Se�L ��P�ؕ��:;f�z�޾=���#)VOl�J3����̨�$��>�
'�����
��W�ҒiӜ{�^�᭗�ۊ��Ab���{@��_�� $�dB�k�|^P����9q�\q�&��(e�A���Ba{��3��8��N�P~n:�~�%���푈E�����L,��[\�5����[s�� OuoS��UR]�d`��=�6_��Fy���L��+g��ᚗ��Dy�@I�ehV�׾�Q?��	���m���B�q�e�I��»��Z�"�L�)LI��Z��x��ɥ�>��	�׃Y��64���P�<R�j�VF�ȸ�%�	�/,7�=�x�YW���_2$�� e2��֋tp�IB=�r�X�P��u�q�I�@��"sy�_19�M�A�ag!��K8�/����|����o���gy��wk�+q������Y؂���AۤPZ�F}���{PGc Od�wb�A�+$��������22�pO�C� 8JZ��%���h�7��K�{�˯F����|Ǉ�?p�Z[�}!�:ԟI�z�:���/�]\^�7YJ�����g�~����MpZ+�nJ�#�	�r��A,Z��"(������e tg9�к>⼴���Rj�»G���N�3Kv��9��쥵&!O�����
l�`��=�d�	�az�����;rx	K��n��_����N�ݫ�F��z@9��p�>
z�8p$&�İ����_�__�&��{��J�(NfVS�k�r�:��_�4M��
�P�t�A�nHf�W1)Xg'Tgs��s�
�7�=X�f;qW�'�\��[A���Bq2�}(�K=���<*��J5�Fn!�i-��J��9������j#3��r<�Fc~� 8e������+�a͛�+{Z'E���1�_S�ng�R7ѱ���0�T�U�^+n)�Ġ[�:+F4ڲj�3N�Ǥ>][b��o�G�����B��ǅ�D�i��6M�L������N���!В����.�����W��h���i�n'��TV�����׿�O����j�[���:�1i���$��"�	"2��s��]��(�R���ml�h���7��%Y��&�%��`A�4������_x���p|��
R8�D*�� [���̇ 땙����a�C$�$��m}��]0�N�Q���U�������!Qj�{�^>�u��Q[wQ��9�A��u�(�l��R��ܪ-yG���M�ke���;E�J�0��Ɠ
���qɏ���f�@���)�'mE��u-�rq�|,�R�՜���DM�ܵ�nED�8�t0���=H����,�s	Pۧ�Ńܕw����r�D[_��6�����bq�Q��,h��Ai��F-%���3u�
g��
����s��l@��] �������:�
}4\w��T�,�z��(;Y��(v`�?a�"&��׭)/>!��_"?#tؠ�J�������̥��x+P�mS�`�u�P�!�'B��@h��\��(i�ݓ�+е�?����r��#P���ixj!����?`��{"*�������zUc�P΃�1�HƆ�-���^~\�K���҅����;�A	�X��)Pƭc��>�&]�������S�3JQ��
��!�>�7����jݤ&��#t�o"��]k`��M3J���2qD5-�1�dE9;�A���R�\�R8R�!'��4�ު�p���֢��5%Җ�f�y�u�D�:���p�,6��3�5!Yn�h�X���z�:�s	Ve���Q��
��Ec�Ysq��V%<wd�U��f0�x�Juؐ���_��t
�����vR����b��F�V����4�"�����3F�w�c�q�=��dK�		qp��S�=�7&�9�p�<_�4	�FM��gZ��zJ2T�l�'�?RK��}�����@e2�y]�77��ͮt{��J�K8Rm��"n����JةZ�̘q�#����n4t�~�(|���nӓ�H��jZpU���P1�V�k-V�`9.�ܧ�.�l=_��EjJ�?�V�*s�U��r��3{���'gK^�~��5>ў%�!�����1�'�2[�-�W�����ۜ��� �-��Hf��RN��f�
�x�h��!�/���Fa�\��eX��Eg�]�nT�aB�q���&,��:��o�oƇ]��x	����}��R�4�W���@E5�❯��*�y�a�aɯ�+�En��7��8��iJU�V���>����?�	�ӑ	�ËY`��.��G���c��2�=@%6�	b ��;ޕ�Zb�/��3�{���_��0Gy�m�v�}���?;��ɹ��u-ǲtn��aV7��BO�6�NO�f����.R��C���6��&V?�f��5��L�H/���gx����ܜ/�1/����Q�����̳�3���`�x����S�=p�8Ъ�_��+�t#��sG��=v���;���O�J�PC�v�:�9�����?�RI22����v!���,k� ��z��f�O���D��S��#�BaH
�4��4�d?�b�u�`50�P4DW���J4��(�*BU_ (p4�������$ ~ݹ�J�n���ۮ�K,�����E^��t&����i�
���Aãb���Wݖ8���PW�NbG���$�o��k�:�߇�q/N�~���
�_�[CD�a0�v���]|�'R�=m�S�d��h�� �+ɮF6:"�@����d��V�/��f�+[[��M�]����iV���ڄ`{As]�	�vk����ٌ_G��О/��PV��B�ZM8Sњq�<�l���'�/!�B��v�BzlM1%3���)�v�������'�����y���e='��l<�� ��ֈ�kT��&5R��t:>��M�|27$ �\ϟ����&�]/[���I���UH0�|/4�4 ~XQ\Dr�$�m|�w�ڊ�R���o��>R�6�W@7@QW�Kܫ�n�UQbS��
^��>BQ�7�Q�l��d<�5%�j��s��w�h��%fQ��qO9��P�A�g��%/����/�c�R	�u�?I���^��ѣ�ϼ��`=�gפ] rS�q^�Aw�c�������v�ײ�y�8�uـ�l,M]��9��2�:����Vh�í��5E��ϛ�o|��db3Ֆ!��}���dm~G˛r�	�ؒL�z��9,���S��)
9��6�O��ү�����lCH�����̧٦6����X�@��!�K���_�h��HW���RMY�=���@� }��G��%�f�L��JQu��cmR�KA/+gU�LxT�%w�|oϝ�S�7�d���#�`ϖ*�Bx��z�M��a����Jd�����[uf�UM�)>&`��ׅחiϝT�u{³����=��#qX��y��Zg5�X&V�A{���4�S,�Fh��v�=D��v�a��9�"���'�պ`��i
����-����"���]�,Z�Ҡ�������D_���E��	!g6�'̃�RN>n�nE;��\��=N�������a�U���pL��ez��S��:��<�G>/�>S�E��>ZyX'���DfqK(���a;��̆����`�E5bc,�����y���ge��k���3<��C�pF������߬���5[b7L��"n�aQ��R��WN0�1�^�?�w�:�dX�[�M�X"���n(=���brp���hX�NT&�i|>ۆ(� G�{�>؍b����JX@}`����4�3	fe�_t��=D�:1he����I 	�v7�.*c������v�'NxKI��}J�*�Y�钙&�A�Iv��ʮeS�N��2X���>�I�Gݒ}5���-M�h���x9�����z)sOu��MjT�"nT,'g�ޘ�<V�T�֩��a�v�Ϙ�$��i�@9>�����®#NB��¨� �[%�ơ5O\9�c�&o��f�hՍ���~�3�s�u)��q�!Cf�`j�_"�-]-8�ɦ[�k����D�a���V_,�Wcؙx����q��s��
�J�N��3�4&\ɱJ�I�w�7k��1�O��Y�T��%w�y�Z��)t�@>�#U�lć�(��6�v��y��r=gj;��3����B���F�3��U(�WV6VP� ��opI�0�����a�1���V�7��/ !}�����iB�(P���}KԀ���>{y��J~�.���Y�`���~���ޔ{�h=�G� "n��dP��BS��-f��w7��U���~e�YxXLo�Fp1:s�x���V��נ�h��H͝��^Ti�R�{����2vV��#b�����{�C��L�������|ω��eÕ��)�v<aW�ғ��)��)���fT����(���c�W)��?�%\�	��8�0��m�,����U*��P����	��K�E�ZMD&\�����jǔ���<��c~WHXxWiE&�#�(��x�92�"]o;��K��Ȝ���^4�[��㙭�ဒ��l��v���a�e�}�]zP�J�;\s ��X\�X�Cv������^�?y���4Ҽ���.�Q�Pㅧ�Tg��N�s+9uPl��l��������(Ja_p���n�$�gt��X˔!�Մ~,lX^�X����������������x�gu�IY���"�g� �d{7]�����;��8�q8<��� ��G�(e�>��9Bw1�#iw�X� �˂lՄ��Xu���ֵ��b�\�#���J[�7��E#�p�#������F��w�,�Ĥ��b��v�]��)�=2��^�s��S�GO��.5�Õ��ЬpM�a\ ��W���5�U��H��;��C�j��)�Λ"]�5�DçUJ!�{�7�����i������8�9 �b��@��R� ���gC�,�	��,Z�n���>��WD�.?\DC���(��f��m���~.�U��d":ϵ�4�*�`X�"�;��b1u��6:��֨�5Hd��3c[uԶ�t9o>jٲĵ���$_VQDM�_�e���U������a�?H�����[~�9��v����ܭ^I���C�!2[.go�Bc��>������b%��Em�u�/l��� �?�!.�L#�_�� �h�ƈ6u�����b�����'q�K��F2e�'_��#�Z����d����ӥz�3V~��G�L�J��k 2�=�8(�aÍ�W�8�̓���A�y�xq��'ݯ΂0��.��9ꛤ�=ߥ�B�]�}�%�m����&Y���9�f:�<&k����n27[r|Wj��Xp�]�dh#���ꮳ�l�u\e�F�(ʴhq�-��g�Q��Z���*�&T�=1��Z�FZ��L}0K�2��/k�������*T�5O5�;\�S��D �"��//�����]I2��k�@�����@D�>ӿG�e��P�{3k�F�����x�и�M�	v��T����k���������Ir����[���m�C�sS��ۓ4��x}��F9H��.�	���t�]�f�x�n#Z�D�#�b_�'��uZî6�ul!>M�Ļ��o~:�I񫬈5����j��`aI�ms�u$��c�7{��</�<� 
T}�^?��,�<��/�������xz�i�7��	p�ds®O���0E����g��`>��j����jx)V_�o&��E��"~*����);��� ���NE?(����A{����P�:�j�\��80�[��2��y��6K�Ff�)x�h�YN���e�Sz�����E����`=Y5-�s��3y4��7 ���� J�K\����{^B��x��DМ��}w�an3�D���PϜ�Xi*�W�����[\G��x<�]���vB�F)����TWrۗ�:�C�u����)�i�/7�d���/��US�x��$[n�T{/��SS�}NK��l�����qiЄƈ�(>PS`�pi���h@%��n$�Ya��X�ϥk�}�г�2�y6�� MHS���⻏��j  �0W�="%
J<DR�v>�g��u�H�E��t�>���XE˙}|�4�r�\�����l��E��y{W���2�c�3n�徚i�vC.��O;��[���.�*[��:�Oшf���l�.�����C����m`ד�_�ͷ�NxVi!�aF#���GH:p��u6aΰ�݀�M�OW�t��:�΃��:�4@��ص�'̂N��P�Y��q��|c�MI����#��r�{І��iDŚ�������p�#�?\_fl)���&2�C'l❷��W��A����fI�����*�>�|�7u��,�N��8p|��[���|I��y:��d��rzK/��"����
B|���B��9I�p/<���j]��.�;Q��zlޒrWM��pFE�z�*�M3,���*V!��~�`������	�ػ�L��<��~_�k�~޼���f��6��-f�O_�B���?u�&��#�ԉB ��H|����	5�k�����斠&��_��<�	 ���� �"j�>�I���8_�P�a��e$Z_?u���ρ�.��C;߼LH�ց�{�{+�Kw�J\wҤy���-ѽ�a�P@�С��|҄���q0h��t�_����X�e)5��f��~q���^����W�G��	Sѡ�u�
C� |��hU�;]��c&F� �<��t�Xx����Mq�y�c1ğ�Za���[��/�d���]�)��m$�i j����^h*���6XR	���ς����IϞ�r.L~�?���;:��=��	~m$����F$�x�Y�<��چ~p��l"���z�f�z��+o��x���|0Z�ūd����4X1ܶ,/*Ћ+��	9��7Mrƶ|�p�/[���dH�1%�ll&��j��Q�;�;3�t�ަ��S2�(99F�mw�'�d��m�nw��x���8C��H�݅��)��Y���麥fݓ���ۭ�أ]U]��3Ɠ`-���!x�+�yB@DC��S��@�_-���T�BK��f���i�"qNcj��[��I�GzK���jZT��{66��HU����A��[I�ޟ��FP������ #�����X��:�6���_����i0�4�s'��|���R0Ү��P������������ik"��T�*����G��?,U�oޚ3�B��=���n�/�E��P9�K�BS�[-�N��O�	P?�j����h|ԅt{KF���, �i�g�[����#�l�|�#r�^i2�U6���?XR�R÷�*��,��*B6�'9ńl %z���F�͋��SnM���sK�/�3[PJ����+��;kL�,��U���1��Ow,A��1¨"�C���#���l���:���ͩ����3ż�puN����g�UBCN'�0���,$��+���m51ᩲ
V[�G^!qI4�*�ͳp�ZLT�u����=��]e�n>iK�2�[ҩn$��'���h�#��
�u�S㘊$XM-�[_Sf��N P�y/�����Dc�0˜���]�#�;��'�	")��||���[�yM�8���K(Ɵа� M?ZԼ�<2�u�Ƃ�QF��k8v2��ۧk�~�('�@�z!���k:��[H�M�FZ̫�`��g��Ǌ��:�n#R$(%i6��[�H]�-���B�5�>�D[��]���$�C:=tm�Qd�����¸�h�� >%�L��'c.�� �kVU:����9�\��E0��z'�f9
�T�v�JY�7�=� ��Q�0n�F����;�����
J{�]]�!��X/�ط��Q:b�^�{ W#;��gy��\�;W�~c9�iucw�SN�\�ZB8����ýIx��蝩��&��5��PIH?�ˣ�)\�Q͌ "��}��o�SA�<}c"����ߛJ>��y*����i�RV�(f�_c�����Y� 8�����sfT�G:4 �"����/��3#馁۾"�$x�u�0�kF�&+1I�K��^!��_�LE���4�NG6,�����m�{.o�gu�X�P�
���`��*���r���=������1rD�)��d:E�4��ޣ<�����.'�hƓ�����"�������:W���m�����c.�W�3�yX�h,��OZ���o(�w�Q��}�t�nm���<<fZ��P:G�y|�g�AEwh�6�B�=��3�{��"H�
(���uF�T�T��Qv�S-�#x袯��G����Wt80�s�nb��t8&�'h�qB�� \��� �g��F�����R��!��_���G���Ol�a8�]
��3t7��Ċ�ǄS0>/�c>� ՍE�����_�����N�c-T��K��7�ֳ�Pfz��x��Y�.'����9�e8���81�R�,����9�H~ɺe�rVO�IQ�9�jde���Ze�2������͓.j�
{�j�Hb�6r�k�|Ji���G9 _��q�nf(�R�M?�#T,��?�X�hrs藲��:�*�vWK"���p���ǒ׉�5��T��mkbɕaT����̥F�*�hF�A���5�{Z�{��T#�jk�l$�� Ԇ����;���B���;yx��#���7Բ��+�}YK�:�y�ɣ��Eei[��XM�I�AO�:4L�I�uW�����.Ӑ�H��U��pٯ0/�ɶ�}@=��&�;�&�$O��t�k��n�H��ã�ѝ�j���Ve�_/�q�%K������wM'�o:����GU��]v�*�Y�g��]��\���_����E�zÓRiS��.�a���rU֙�(/�S���Ӓx �2�fi���,t�� ��p7���^D����O~K�:#��	�v/&po E���]�2Ϻ!�d�#�H�s~�l���u�����&]��<6;�&{�p\�f��g����q{�?(���_�#�ԙ��W��P�^��
�NpL�O��-�Ųg?>k��y�t)�d��, �{�\�u@8�7mU1���FbZ���t�dk�"h(��>���b���Kr��e�ʀd6�ux�y)�O��)��!VE����B���xQYnް@�k�Nr�TT�˫�RhH�Z���A�)Ο���\�V�[ٓ��~�3)TM��ӥ�����.�J��<�:�h��\��jE��,,S-��>�3�oD�D��x��u�d��X��v?���46��'���qm�pA�;��%:>N�O��X规�4�L8�
Bk,/;RJ�Ϝ4���ah���w���%�8�˦�����#��Оh?	O"�Y���:�]V��B]���ceM�x�/�(E�J��%�A~���i�<$g+#x�ݖ��Dy�ta&��;�ll�U�*��e�k�ܑZ����{��Tu��2�.�r��Ò����m�F�u��Ȉx$O��Iq��J;�=3��	�8=U ��C���ͤ�A�����b{�*$�s�������0�Ǟ�!\n�8̀\Z�:Y.�t���">~�j@�%�|���]���<�Ϗ�m08Eؓ�3��IGѱ�ϙ��z]�J��C���X����d�\rE���C�{�@Ϳ0������p�S��������ө�|:5j��kӡ��f�z~F��IURA���P<2�7�����~V�Rk!Õ5S���#X���!_�؎{�i�s��%k�	��19�}�Ż'L����KM!�і� �Dc�ή΂:�%���р�VOQ��4L�g�½�$݁X�����>�:÷'x}،?����qf�@���y$ıot�W?��YV�nYm�lVւD5&��T� �U��; ��0�'3���z��c����h��Dj,�ߎ��6.�*�,A�O�-H�	�5}M.<"��x\f���RKi�ŲH���<������K��.k��2��$vRXg�Lt���n��<"1�O���Zu�65b�U�ּ�v��EL<���wo�C6==��.0c/O�=�GG�9ǟ�a�Z��E�_����`�;a�2c\��#��_��K8�_Q�z�>�˚
ӱMp�hjh�h3�&J�U����e��igfh��;q�#�T)��2�x���h!$��ٖH��vixA�Ĝ{��0<�sV��+��{w�ۢ����n�+3Vpϓ�'1�+��Na�����ԢP�4P4�zT̝+7ʹ�����k���G�˙�V���ңJb�S?�:N��K���LYܺ0hPi��6����/��2hBc�*�	���S '���q1���dʹP��+G�"�u��Y���D�R!Q��a.G�xܲ�K`q������!-�=N9^��j�
�S/���;���hkY�H*JkH�fYQ<�=!��ke6��<�;uǃ�m���4!{D-�y����f:�I�N��I*�6�WF��x�å5�o�\��Y��"�a��X��7��-b?�F}:L��;|�xg0j_�<�=�.Nݳ?��m��\��^�N�����c����;ħ{�єw���#�[�|PO��v~4qk�C���T6�媲3��[�C����ϥS6'�:�b��eի�ri^�n�r-~���%"o�����6�q=r�����XqTh^�.�a�l[���'��V7�<A��]�w/{O��b ��hԸxXfW�玲�)���4�L�Õfhk��T�u?%���׆�:5�X2k�~�wr�I��QjȂx���<��G�e#ÄK{T�n�2�@�7t~W�ҭ�X�?�)�ԉ�)X
>
.S�(�z-���Yk��
�V��gE.#g&L�(��^z��'Z�?h���9�9_��"��@&�0 pJ��c?��z�$��٭�dw�6G�F��ܒF��G7���X����b���
ߓC~p�G���"���#�z�6�r.�T����Cޑ��6����O�NO�]�xV=��"B_�=2��Me�6��Q�ӯn�L5��Bu�;%�`�"�C­�H��ޥx�8�ȞLCu�T,��8�ˠP���\4_d����2� :a��sJ���]i����NϊLm�kɳ��e�w�V��7K��+���3�Uc���:�tC-�H���z�����������&;:=��_O�aY�����u@qţ�1�+ER�p�l�>� �	�#f�t�����G�ơ4u,i*�k�Y�s@��tZb�����)���_�(���J8�Ϫ/I[m��_�j]+Y�o��"���x,�!��He�M��p�pv��>Ac�~M�kwr��}z)��mJD'}F����3�76��(����Z�VN�����T��}�.�i����CR3i�8Σp�P����_��cJ���<S�ן��H;djrH�6*�M:�Y�M��4%&*���B�̮�=��%��P�j@  �A��d���Eu���O���&��I=��&�b��L5��Bčs�BL��D��,6���}�iB�x�]f�lN��B�G��܊��e$b��l\�b��ޝt��Q���1$��p����
�O�l��y�"�lU�O|:ύߟ
W�8z	�)�8��N�#�MǠ����r9��EBi>軚�h���"9���*f� iۼـ`���wV�F_�Si��̚��)w 6m��Ka���[��7 �%�OY���b�ͪ2~�ML3Ge���2�B�|u���]~�0@�3d�X�u��jIx$S�bhY7�Z�@bd7&�u�c.V^W^J+���a{N6Z]��� ��O̊��ZNqI����q�IW��ɗ� ��\�U�e�GV�M����s&`�O�Qg�0i�dɮs�l�>�.âUs������tM��v}�rV/3�#������o�h�<[ʬ;h������X���F���vXt8�(~;$���nǦ���Ӻ���#�gzs�Sֺ��@~:.T�I���X-|$Ŭ>rB�U��V)*�G��o����w>;���6�g�� ��$���'�P�D#���TO�~�]��.�w�wP�^LΜ�W��=̈́m�u���������Q�-���b��Fн�4A`�/����C <BV3ٶ�Zx��>HP�_~ר�'(Ӕ�vd{��[�V]����3�$d3|�@k���#��D��QL�<�2�?�vz��c��"R�4p=�Po������2��H�&��/�gI�,\��h���<k/I�3����=�lM�u�����.[j��n/>2ɫ�����cw?�6a����삼 8�'cy&"��z�3�W]���ަ�[7�^�1'ڽy~V� `�L�y9vo��b�֬!Y�tg|9?��3L=d�����[ 	=+t��W�s��| ���<өsdQ�^�I����.]R�o� ��@��%xxF�w�&�VL�̹��=]�=J�6S�i��#����T=H���@��I,��Z�`u��?�r3��"�fճ�P��K�@��8D�{ueA�@1U�v�wҩdA��\��I(������F��s�[\��R�p��3It��^ d�T
3eUP�2�$�q���{[h�~�QK��j�k��F��cɠ��Uw��r�IC[��"mӹ�d5�$�Q`��>S��-��j.Ō�ޕ�|�Ycc�"ڐk�̦zN�F��,�&ż]qq��U��v
�3淁�+�q!aj��j��Ow�W�5�i��/gf��N;��]���p��!7_�S�5m���m]޴����aȊ����ъ��r�-z���q�M ˟e��x'S`{nvt���Pe�����bΗ�5?�^�!���[��T�����cf/���z[���#�;����P4Ĩp��*�8p��di�`y+�6�d�����WW�!��rs��n�k�	2����G�Jq��Q��i�0������B`�|^��Ѽf��}JH\����@�L���K(ܑ@$��]��
&PB�]��ih[ޠq�K�L%���#"!�+N���ה���d���6�L0�y�ʺ/���/�A�������i(o�ߛ�� �h�}/��Hx����3BJ��)��w+$i�\-&�2����!"����Ȭ����fq�f�-|rAsH�Z 5�5�=�&��|�����g��^�M�]Vy�����Ys��*9����j=�1��ʼ#�O�V�P�[h�e l�~�'o��\)�k�mi�ϭ���H�p�e$; {��G��C��K]	�]yw�Mºu��m+/BO%�W�p��7q��..8t���m}���7�EY�Cf�ӦX1�I��K<�z�V�|	49eO[ ��,T�B�.��/MD"�9F
�x!!� U��)dp��'�Br��l���_�j�]=I���!��Psx�b��6m���;���P�/�G���1N�V-�j��@VD��2w�p�d0h��iq
��/'å{0/�؜��4$��	�p�o�
5��zC�N��oc�(R��}�wUP�G8�
K��N��sjM*-�02[w�&��c_��e�[d��\�^���^pՔ^�}�)�	R�:���W�<4����*2��%�2��<����d:�Ԩ�h�Y�,�=z�X#�ݖxֹT��p:{����!!Q7��ЯHqSzȵ
,���#�0�n"M]V�Sk���J�Ke7h���+l/w�#���I�;�=m�qߥeԥ��'Ӛ��i�{7�|������+���B�I��
e�F�g�|�p(�	�`G��Z��{�}J�c�9�t���m�����N�Y��N��y�~��"� ��t��Yl޴�r����J�ߣؒ�4���Pܬ��
�ξv4�~�l!á�g}ķ��9a����6�A�~����^���`���>j��cP	f�0j����ō��C�4�2�(͜�eA��u��.�}?4�����36`U�dE&hK�LtR�6fX��/�D��A�vN��3�F���4��X���3VDe��8T�����F�\\S��\p~5�9�� l���Qq&O��<M]Wc	qI]<p�@��1��g���������l�J �q��q����b�ݏ���m�菇�c�X�I�ld�3=\24f���y�;�߳+��Q�i@��Q%�f�1�����Xy�qw�����,�irf�'RV�?�/�u���n��S1<��1�0/�N�L,�W`Ӓ�*�-����"���ss�A�������E���zç��9Lf�K�S U��Q���8`��bV�m�=���Gl��	���&ο���b��9%�f8� ������kr<��A=�%[? jw��=�|^��S����3e1΄�Fb���Z�,q'���9_R�SO�����.�뱖}��s��q ��1Fڰ��|Bt�_�W�����E���*�g�r�Eދ����
�s�߭�V��K�,�f��<��@���-�-�`�[�y��K�Ov;���%��68�����6���@bR���JU�SV���L�d2���R9W�G�ae���oT��[�mŸQ�JK��i������/�)w�jkd��ཾ�!���8��x�����o"���Uߗ?�g��)~<�RRn��'���[�d/}M� �CВ�B��@ͽ���+��m�9�'pǻ��������@q
�a�Qݐ�A�w��OXMR����te�;)���(�"R3��h`�>��0DQ<0H� @�����q\���������Ol�#�,H�m�im��bM���F�b��E�N��RH+�a'����1̈�me�LY��J'/�x��㙐:��WKc�,��ގ��"�v��n]�L��9v�[̺C��|<ե���l?�mo��>�,�V˥,�"!>�(X5����jd�冄�7�M��<�	�>���Ձ�[��НZ���N ẮC��������ZA�Į��mU|�Fd"�&%�8�ت7!�'�\`Gѝ���०\�ȸ9�b�l����/�.��a�*o��wb�M�F� A_[q�h�`�lT�g������A�؝��abѷ�}����ƃ��%,��z��R t8j�mL����|d���!��ۿ.MY�!]�Ö&�6�F-<LfU��27Ǔ��VT��?i-33ܦ�� ��;tl��'�e�v��Bx��Ze������ȏ\��cXDX;�m]&[|� Qa���PrXO��HnS����p[�f)�l���J7l~�;�=�;�#W��`V�;�� 5��\���������<�0,�W���zR?j(���R�\�'J�
2>0m���lz��J���Pݒ��&��A���ǀ�&{�.����9Qم�	L��ԭ���P�� ���}@�?��m�J��{�)�Š�5��Ŗa��8���hy��B/Vڬ[���0����   r�m����xW����(��6�y5���b:Ξ��-��~a�0J�Z�'R)`�᮱��t%!�/:�pk�P��J��̠ħk��Z��P�����xi���|U~W�!�TL$�  �[A�
O�B[Z!��(����p9` ���\�#{q�����l�B{g������u )���
ܱ��y�;{(<-��鵒�u�|�;�iЍ��[�e}]�ȧ��#�v:��יR�|�0`9�u��!��KN�[-[�_��uTU[�6V_��B+���tu��њ��$�#�U���-
H�@O X����h����3�R҉5�'=���%뷗�Y�v��5eO�dV�繙8�6\���v�J�x�lmA?��IO���J��T+����i�ve��}����;��U�!T��]���$�,���k�[��'�����=h���KEe��t.����ch�<x��Y���/r��t��������5fѵP^��!G_	�Hi2:r"�� ��L��T��YV��%������>yT`p���㴁*����-�}�Pp�]	?��e�P\SGr$&Z���,m-��M�����Tշ�B*�$_��{NEZ��a��}�o���K8G��ou�tM�;3j8�m|V8�+��d-�56�)wuW����3���,vRz��*�iV"8Y�ogA��S�qS���*0���$ٓ4.:��|�4y	"�:��BX�mн&���Wg��ٗ��tsc2=�^�Hr���p�Ui�B�	*���UwKXʤ�&{��Eo��0�$�R�ɭK7�q�}����H&����_۳T-PL%��^��g�}!�X ͨĉ�����4r�!����,5��n�42��j��gR9U�s��?�Wz��h�7�[v]�hk%�6.=��(tp��������{l��I�Db/@�Lh�MH��n��޺v8�Xp(�?Z�23�P���S�%^���3Nݩ3�ܻ/f�)�E:�/DJ��o6��(}��/fF�������5E�Ԡ��0o�����⭛�H��=���S��)ʀ�2�S��R�h Ң�e:�>ډq$�8���W�,^���S�\|��Ŏ�E; �h�x6�ᔻ���]���V3��]+�g�Tc��2�c�]�QP}�C\�Lզj��og�6-����<v���v��&:���	\|3nD���LA:��H��x�� h����D�^�-UD���gE N���0�8sx��u�ہ�[���u`��7DN�u@/�3㹬ec�eS�S���P�bH�gW~Z/i ��'�y/��I����!�i��jS�@[��D�b@CI$pʐ���`)�����f�oW暽0�=Y�eR�u=є_9�Nu��ki	N�vO��M���\��1f������4Zͧ����~A^v�\"6׹a���e�|�!�!�ck6��_�1��+����%�I��JDڥ��ފ�T�V��jP�֔����TB"e�j�S2!���׭�J�C�
���$l'3���ՠ���W:X��Db��{��G�鑟�0��}ԉ�VJ�[����'���-9�D���ĪCы�}�v��OJ���K����"����!��mS�M�{�,ǜ�=�L�ǋbo-��8�gl�5Q��4��@m���U����]��C$�g���roϝрaT(`@u�]�A���p"1�v��q����Ѕl��B�2q�>>u��c��e볊k�v�\l�>�\z��lPqC�� v��fS���Av�(�`r|tp����{�Q��G�q�"�-��m-�;�VN��a*����x����!���j�2���]��䅽����bɷQ�uǲbl�!�i/��>=�~;!���Hh���(��j���ɀ2������cXZ_3�CúȜ_��������:�WAM�#};���#�S_��3z��<��2��%
�cY�LXS$��DP�:T���	U9���c���w��?ai� y�u�6R}(�n�������� L��mT�.�B_i�R]�H�!�B0�BVi�C'藐x,ߢE�
��VőK���"�_A(��x�A�����l� �4R��r�TB��� kPN�qݛ��O�=��2�G��(7�Go=Z{��8{m7��J��F��8�ː<WU�B�.mP�OKP� Ok�N�'�P�T��E�����/,9��x+jre"XPy�W|ڲK�	C��n��0H-���:Nk��S�9@�L��YJZ�m�,Y훞����]����<�K-+���Y�ܬ�S�4������e�oh/s;�X�d�;&�\�/w�6B�~�ba��@E�i�*D�R���˹�>��2}��lo�/v�y�]7�ν�	4�SKTE�D�^��A�����C���$�'#
2�0���tRm�BFE8��'^�J������N��.�6W<&"l�6yP�v�ٝ�}�^���O�X�dE�؆��w<��Z�o��
P�oӌ-,r�#��EJ0��G�/�W�4�����B6�BF����$=�:���-��@8�K�Y���!a{`}J�D���آ�?�kZ^o�,�XM���e!�70���!f�ϭӰs�8gyi�l��>L�%)�[z�������WE��e1��B;Q�q��2p�n8�������i1��F/G?��������A��V6	g�G�Z<j0���`.�A��6C���AN��AG�J9��c���*�.�\l�D M����f..�z8�2$;D@�1�a+�|�9���z��'s�cBوb�^�x��]%�@)�I�~� &.��G��ס��/�jU>�!υ���c��N:t9o}�ƳUG������)7�]
��,��Ɯ̐�/������.W�$�@��+�o qI���|���R��.K
�w�f������-��GG��EI���ߎ�'��şy�/q|Ktȸ����q�d����4Yr��	���'饤�p����5}jnܸw%e��K��/��ꙭ���O��L���(��g7U�D\���ʑ�_ܩ����u�����Ɩo���zt%Ŧ�:��_r�b;�l�~��	��m+�<���m���a�`��������r������ק�gb)�ze��l t��Kֹ?�ZX�%���@�
���7-li���:�.�:!�X�lyL`S��%�/�8�����\��B
^�Yc`���r�D��W��Z�ߌ���J{+�U6����&�0�]����q-��	nn�� ��B�uzhpj�Gİ$��"P�ʔ�gLc@�T- �����I����ۙ�a,JII�K�9�xC
���?4�(�gG��it�:q|��]m�5d����I�?�L�%*�b�E�M�RΕ�#$�h��x��m��8?�x<���pZ���5j�BT(�
r���o�Yj�-jt@�^��[:C�?�Zv�E� Dj�
���Q���NXJ�E�:�l	��59���{rmҪ�Я:H!Z)����^��yXF�C玎�] �gO%�d��GN�������wEB�U��	�dL�߂��?�k�-n�+�VE�t�(���^�H�,K��{{�f��#]B������["8,<$�۳s������q:�����qL �xO��a����2Vk P?�)��7�Z��Ф?�!�[Ù������O)eZ-7��V�|m���D��_.'V^p���'��euK	-Ofcl?��y ���@��g�̄i�#K;eLV�93$X���2x��ؒ�(4@�1��;^7^����Y:�a���E�n�o��=Rk3iJ�^��3�f_���P�#X��ٴ�/7ë�j��C5���*z�h���Uط����a/�A>/1�rf���~SG�yaZ�dZփ|cN�_��%(0o�� ���$�%�y�=�9�1���U���2����%Bbun\����'�{Z&���� J2�(�y����ga�a�a�����w�m�
��c�Lt�$q�y�1�9����+�ݤA
o^e���� ���T�f"���8R;-�|�h�.a�ӵ�5�-=T�"8a1�L�+�o����'�yц��J��h�����`���E���w�wT酭����Pd�m��b��F{��5�(1��9��>i��1+�����A֔�r��+�TP�TZ�+L�3qE��֍)-��g�m2����2�f��+*�tg2BF��}7���.h�#;"U��0n��N�S|�B���&bXB��+OC��k�7��E�;N��f�lX�첪�b�g��_{h� a�'�>_"|�����@$�g=i3A%�����%��;�5~����-r^�^	r�Ԩ�')pӻ\D �
Л�N�W���=�x�L�q�B��	gi�1
X���E��k��e�}ş���e%����m�Qm��^��� �u��>`�W��,�f�����Q��fj:0��4igs���y�h��@�Y�Y�m��uJ��,B�3Y�����_a@��k[=� sކ�A�t�Fiյ\+�#A���2:����(���}\�
Ԇ�I���K����r��P�@��+�߼��<��O\�754$�6��K���Fkʄ�c?�=u���x�S[����0Q�m�h�.��8�^�uI�?؋Q���Š�sͷ>%~��ޭ�v�܍	��-:��@S!�NWC酸̮��T'�;���4���]���c2U����Q$������a�z�d޳;�1>:�tv �C���&X� ��}Jt>'�����6�:>�f�D�hmא�Og��b�Dm��'��e�Nل>�,�)H��VF-(�ã�Uš��/���P<П�N��{���m�� Ϩt>���'��,O֩��a��mg��+�Y�Y���MF�`��%���AfB�7ѧ����^"�2��]yD�Q���3�����T3��_�eJ�����S4�}��4�7�o���*�F�Yq��4rZV��B}�� ܦ�p2J�G� 'e����G+�o�?=u�B��v�W̩�$�2�_���R�V@z1V=�# ^O���Ҋ��2Vfl�Ӭ��9����AF�Z�����߻"=S7��7]�6T rCC�[�6�G�� E�s.� �_��Y��	�d@�P�q:ir�Bgf
i���}���H�<~u�.N�r�u"��(գd�"�`{G�u _��4 ��_�$�U������`�q��W�jc����EH]����~=8�LVr����ݵ���~�EP��R���ʠ,g�r0�5I����������F= ��F��y	��`�ʿ5ڮVК�:G�	_"���c�����k�N<���ѩGo4I*߹��\-ݤb_(b�V�T�\"�z�ay�ݓ��Q��� �3�{Ah�W�ӗ�/Ky�@q��"CQ�̖����w�j�k�C��+J��}9 �Vң,+Rǐ&kE�m�ӷ�����1��7C�sX�K��Y��]f8��� �vo�#-+h��;���_�箐�"ݿ}�H�wb��ɒ�|��No6�R�y�T�D)ɡ2B8q�	L�p"$�}��O:�U����L(60�C���k-�����6`#�@#�^���>���u'�eGc��Q��K�^�Py��xY*��/&��C�B���2��E��c���Ҡ?�3K��?Z(q/��>q�x[Qb�ե�Rj��,��A��:�ś,м����i�q�9p�%������-�!��L')��˼{s���4�n��Ǐx�?�BF�X��sXݗ.����_M{�Lg���O�b3�X����A�^(��T�*��+�M;��L���]��1�[1b��]o�6�Ut�rR�>T��ѣsױ"��=П.��}�X5�=�����s��V�HW�%��W\��!�pG��Ԯ8s���_�-�ڏe���U$��b�-<[x>���_�?��g���-)�w������ek�K|��G ���·(��jA@:��>$'M���?��4�_�|���lm���OR]]uG%�6H�gy����:���%E\���u?SH�t���Ɩ	/�Ƨj�樱vB#X��s���\\p��h��4T� #�\k2������	���ٟ�o�(YT�y0z#y���O� \ao7Z��FW�F�ѱ�@*���uH���0O�<�X\�a�ཿ���~��2L�>!G��tAxa�E�$�98,HCkD��:Tk.g"H4� =�+e�e�U�Ҡ.H����?vMvM�*[��!쟜���m��.��Q�ʇ)�U*B�%���>P���P$!*�Щ@H	�)�>�$-u�S�w{�wt<b��Z}�'�o1���0IK���Ӝ��Um�@<���W�;�?pz�c���kח���jj��������9�yڊ'��OB�`��zd�����~��ֻ^F�z�-M�/t%^��iza��9���-J~^SA!����x\6����D����0D{�'��ö�A��.o��B
�ǹ��!�2B�O�ԕۥi_'>�ҁ:a��]ߝ��}��(͈�����6���=b�Ё��Q�߀��.@�խ�h���r	�Hz6M7*$9W?�0�V�\3��1�)�6����*��i/ܷ���,��"��%E��W�"(�뺫ɻz�3������](��H_@Dy��Z0����<�`2�6G�C��!(��'F��xQ���s1�Q.6�{m�ҶDh�"k�2���9��_o�T��V��֞`��J@>M���pMtUn�������wJ4(��,7�;�������(�!C�wi�f��9�?���+w��L���L�g�2jb'�����8��H���]S�/����8�&���G���0X��KF�JAecp9@JPi�W���W���^�UFPEV�,%� %�J�����thg���E��᣷,��j
�:?k���-0m�P!qMw��R���?o�����Zŝ'��Ɩ�8x{���E��w�g�K;����T⃸◕\�ޜ��	LG&��x4��H���p��Y��T �M�
U�1]�U[���6�#�*�y]��O���oc��3�'kA�p:�� �]A���́���t�έ_2l���6�v@��iI@�;D,x`��n�z�F�9�e��A�\������wƽ�N�/�8��>�R:B���I;���F`��5։.}Q~� ��)�L�C~���������\�
Y�A]ɐ8ߞn��}ó��r�=���a'�-97Q/A����c�h8P���n���?r1{I)QI~7ϼK�y0��.���9���uX$���	�jȇNu�l�����}�J���3(0�[K:��<CRzs�#�w�۽��nu *6���S+G��p����&�}&�X�)��B��M�Hr@��̜�8���1�Vv(�?z��<KxIK�Ȍǎ��Sҽ�e�_����'#�x69��gM�8UȠ��:��r����S�0h�5�
�/�M��߀.�in�$�\�����膟;���B�g�wBT�F&i�uF��d#El��:z*���*EL�MMn����K����DU��j��
A�8P�m%��\��J��@�a���Þ,a_4�r3������e߽�ks��j�p/��>� td)"� �	��@��]�/�U���C�/����.]���;0� ��v�,f$3�U�W�2�H�V���ܐg���K���!�b�W�Xo�����`�%Ĝ�x}U�4MfHq`bBMeϯ&� 30L]tP���l�|�G����67�'�%U.��L�(ČBv�5����&������.<���������TʓgJ�pV�����25u�����X>�i+��DJ���k�=�*��ܖ���,>[,vO��W���JI�$W=w��^���������Wt�d\��,%���5���jG�Da�琘92E�}F�Z��!3����C �*�_���`� ��;��#X�r9��(�}�i���oxk��Z����_fV�>B�Ml:�#1<Hʶ�H^ǯ��`����|��Юi����_T�?���YD�H������S\���ɸV��z��sp-"�m�ݏ�na�"�I�w�][�s-�}���_�S�F��b�-��;r�*���ޣЙN�!UH~�Aܦ��{����ҧq�����㇇>M��<h�+��7m_:�<c��"�x)n�����K	z,�jGM�(�� �\D|%���2Y����N�h���0T���ڃt��橇T2w�+e���⥃��H����P��3J����䑯*���m�_��}/Ѳ(d�� a������U��R&�1)���g0"��G�)���	�A/RXpU��2�$��zũ�>	��1�9ʵ{����3��Gσ��H�:D�Taa7��̼�;y����B�}�ܦ:;�/�r�1Ż7�4S�q�����P~u�nG`�\�gW.����(	46`���=8xwG�0P��j��3���'�0q��K%�(1�� �Ǌ�h1AH�?�T���D� ��'F�{'��3[I�o.���MQq=��(iQ(8TN�TU�Eȼ�\Y	\�� e5K`���|�k�w�,V�g)Ή �q5����ׄz6�����	1�_��~/�4 '�ZLPkU-<K��z�,�t��P�?��I���CZJh[%Dӹ��3U�q�F��S�$j�%��v��r#�7�}��$%�P�f�����#�������؃q�S�7{Ը�Hlw�r��׾�X7��a�rP2\��J:2�XIƑ�Qmů�>�Ɨ��9�%�m?i:�sL�`'��Od�����. 6�&������8�%޽�; ~3�z�&w%:��_���2\D���怱�{�	�b@B%�+8(�>���J�m�0��A��#s���y���k��:�0nlw��tk�U�Ù�zEt#(I����p���#9��f���W��(W����%k��mmʀ������gt_v���J��MX<]�҅�և9I��tD��:���q64���%3X���|BKI�2G:;����&C��gY�R����Uv�`��?!f`A�3 o��C1<����D�sR�]����"o�%`4�c+��^��f�D��ّ���c1�.�A�̿08v ���s}|{\�ü�:�_U�c�X�ӣ����T%Z!_�]�sɋ���#>�s&Q�f����b"��V3XUh���9�����#Z�b,�tq���OP�;��h��qQ�~t�`�0�������
U��X���%>zYk<Q%�T��%�Қ?Y��t�=:2~z�R�S/�Rƅ�H�˹/���P��ˡ��S���}:]��U������426���aO����/��Ajg$e� �Mq�`{�`�l�����52����E2�����H�TC��:����r�S+/]܃�⪎㢵��$�P�t1�w\1�N��,I�I-�rT��Dt�?�j��l*��9�U+����|&��ʬ�fu'>xZ�;����󭋯�F�N�ǰ�U�XAnYr�1|L�x�aۄ�J��.b��*29�д�9O�� ݼ�%#�t�����?='a2�Ƕ�!~��qF�Q��>1u�-_���l�$�PEgZ\r��lr,�	���
dJ^ٻ�IʣK=�v���>��� j{��bY�x�TW5j<�����r!i��;�8�ÕJ1駰K��X
��P�y�[-�5,ǙՕ���D�>
�c����{���=3��[I���-��;8(�
�x�VB4Te��B7$\��1|0�2X�����k��W��ΐJu�����a�����;��hbW����N&!�4��Wq�bܨ_
uG��q7�v�/�@	|n�R��RBI+��L�P5��Ǝ�t%����d[n����#Q����'da�L��;�H�- �>A��Gb�����,�A���;�7eU����̒����KBc��IJ���(��ԃ�zj`Ձi��Yπ����-����k���x�8	���Ց ��N���4�����t�j�>�+:�����`���r�`H0N'�����:M>/��}�7
@��WH��%o�V1��)�L#!�
T�Q�@�\�Mǌ7�� �@9B�wCƤ }x<hR�pO��o��_x6�)��G���JHz�Hi��V��;���&�oauv���Վ�PT����> 	0;.�OM?�����Y8�|�*R̵�rܚD56�|gsS�p��iT\�l�ٱG�޼��M����n�c�t[�~p������14j�ٗ�8���&���Z��p�6�U��|RA���]���q��^W-i���rC�}RĹ��kX����PE
�3��y�]��%���pAl�dUb�r@Vʎ����حŁ��k���9b�r���"�� <�+��bK���8dE7�gF���8y�H��.�.~�e�d��I�Ğ��v�P< �Y�l��k�Ȭ�����lS�����S�tP�2+d�����;������� N�c��	"�?�>/GC݆6�NH��q��G7�5N<R�Rb81{�(0��>R�X�W3�Q-��$Qޅl>B��%�����"�oW��ђ𨍊0j�x�@���@�X�l���x��8�� ���J�)K�.l@ N��R$��w*��N�>��ew�>314��$X�=���GNp
ܼ�%�u�I��IM�9L�A+R��nַE���4�ө���3f2��]�:�YJ���8X�z_̽����3������o��������z�m�������6s^g��)�ce���|�^"�S�JE���o�����}D�MD�S2�u
��1���Z�ܟFo0��
H3Gl'j�,E��bY�>�@��c>��p�����?;�͸��ݬ�]Aw�n��x��|�9�Ze	]Iޚh!0lxؠr������-��aA�L���sN�[�S�*+��<3�&s�g�Bn�s%��K��O3��� @�����_�b���x���FbM�kA�X��� ���>ڙ��r��`�4�m:%֖���������H�"T�������`W"Jʋ���U�����&���P�D�*�Y��.=�ch�2�B��Y�fҴ��Z���1&�BA0�*�Z��].="�	D(#���'"���m\�𩖴( fs*�k�t�
�Y�D�S=�ABm������#|]���0�+�PD�o�6U3�mt�Ԯ�
��c�έC#k".EN�7�aO��V�pm��ðlk�#RV
V����G�x4�N�(�pU�Ƅ�z"�|��(L�{ ������k;be@DE�*0��J�bZ����זZz��a�:��i�؝��9�t�)돵ӽX��)�����/1�RZ�6������%�p�ؤ8-��WE��~_���  ���*����s�{������T�z(�)�!�����6�4$U���A��<��ع�w�����BWph�ƌJT���KM�_�=����DI�.9��,1nH��CI�%7�����p�$u��{������'T�����|�|����A�H9l�OG>�-vp�l���[����c+p1�3x��ݕ1�i��	ɋ,��I
S�O�o��e�Q�Qы�q�t�$*jA�9,�_a�<�P_xs3J89�&�?Hot�� �SU�>B�3*���[�fX
�5Gr���|�1�;�^��vi�&;v�~�͑�,5�sW#�v��D�yw|!J�j�m���k�[�Ua��ݭ��z+U'�(k �Iƃ�!��GȮkSq��\4��}�N^>o(�߇�^�u��@�W�X7>�o
jw`�e!uh���%j�R��	 >��,�o��RK3q�T:���@P�?.A��}�~W�%�^�l��Uɦ_Xym9�5�hy���.�e��;ă���!l3�n�r�F~��, ��BeY���P��)
�'m��]΋ͯ��ΎK�ɜϱ|�D��6A���N��#��%�bk�Db�ZA�Ə#��cry*駋Ca5��Zd��5�N���3��O�Xj�#�r{�����"�,��ߍc�f���&b���$�'���d��I�G��2u~�q��T�����~�/����T����}���*�7x�v�',������վ"�#�M��1҉��;ܠC�n6��\�w+��>L�kV�Z�O���L�l�[�ɖz�����)]��,o�üj��VRq�D�=���F5����".Gt�2�8^8���4n�3>w�� 2w��G�D�@��kUTY4;mA�\�N�G���;p��<�Z�<w���t�ԥ�yιނ����G�]�dK�m~M�M6���{�ˋ8�(n����	�Q�Ξh.�o���N#����h�x���im�Y6N����u}�W�b�mtI�ކݵ�2@I�9N���ڗe�1�����PwO�`�����	�q�+��VBK����6(;�gc���pjO���c�K�#��ĉ�7�2R����Xnlq�Ƃ��o�e���%�QN���F�h�ܵ�@��s�j��;��Y�]r_n�y�'2B�(��?��ט�k�s���I�Ǖ�� Y�^L/��B3�TN�:��Ԧ���Y+��L� ��r�马�8j%�{.������Nu�e�5d�A����P��Qp1+s��L�����b����Ͱ�ga�q���ui�ى	��<�SRz�i�̈́҆-�!�������ЪRE�1����X�e����B�2�K�2;���YZ��"��#v8��Z���L���L�ǖZ����E��	٘HJ&�UZ���������[����ZQ��B�D��P�v�\l����RG��đDsF��q�������5��ȍ[��b���F���pΪD�m�[hY�Q��O�4E�*��o��9�ja�����)���Y�	�oeK��������U�{�ꒇT ۙ�(�A0�z��R�ȣ�7,J{zR����.#���&R���Ki�h�M0�E��[A�W��ߏ������O܊c�,�N\��=<5ֺG�<O_�Y�;��x�ݥ�⢖g��ż݈k�����~�E�
Fܪ��P��,cs�:Q\�+���a��"���/]�W��9(!��G�q�o{Z7k��N��R��Q��ch����PzfUxs|V�roPѬ�|C��+��.}�OAԞᕂ* 9'�UJU�h^��<2���CZ���#�&�h򮒭��2L��
��,Nҫ�ϩT���Ү@��5��ʎ>��s�;�ec�ݯ�8{��b�t����ݾw򜼚O����J=��똹� $���N�ĥO�:�z�z4�B	�����)�}�+c��()Ŷ�R!��23:���w����Kj�L�ӄ%C�L�k�.ݜ�B�Pt��	�~o'��v5Ou��#�c�hu�����_�:f��\���(K$;�,��F�|�~Ͳ�#��@é��0AZ���@�s��fX�ۢL��I�)��1�*Ȏo��R�N�Dj'���ׂ8A͗������2���q�7='�d	F�඾�2�0A}���_*�z�,�Y��2���[g�J?m(I�]��R�,IN5 6��aѱ$��1��ˢI�-XjS��@~�V�����Q�N� ��h����8�H�?k�����m�A��['�Ԁ&�5�l*�Ր4�I�m�P�!��h�.ԅ�\���<>��K8�x}F��\�!#"ǫ-5�қ���RO��1ꐡ1k+��� �K�,u��T��!��4V<_��
)3�GcUn&$Vի�CR��L��!�g��R��?��#amCb&�J����g�\d�VG!����̋�pPg�qhK��ݞ�nbY~���1}����׹ș���Mԝ�4��%ZL�����q�o�s��x�'�*��ؒ�ϐG8��ֵ��aBn`�����+6�f�+��F�zk#^��c>2�'F6(G�� iӭN_�fS���G�D\na�>+�ފ{���q�,	�DE�U����1���O�[<�w�*���=�3�3|�]��yFM�͚�K'>����SK�M3+��b�����v�(q�ՓI�g��ߚ�O+?O����I����ٜ.v�!�qe�J�a��y��f�U�T�QvM�(�7L�4��D|R٬S%�G� ���9KdC,�S�b%g�A4�X��g�z�K���#�>����5��҉�i�3P�b�y���P�_1�S}��Dw��p^F��%JZ�t�('�8��6��
��+�����i�M#���	$�� /�O"(BP���")�.qc�����%���s8u(��hOhY&5��V��`�.bݨ�ׁ���� $�M)h7B5NF�w�9����Y�Ξ��)K=vU0�* ұm4�-��m�d��Hإs���>����wU�_.�fi}讉�`|���O�Q�@�lv��p������@2W̾H�CS��$fD6�fa��H���$&Ω_�c n!�9o|��G'�"�>W�y+(�̓C��(ڽ�˯�n[�.�@��Ht�!Ͷ̕����"��j�P	�
"�^y1��������0��&o���3��2����ܵ&j7�����E�{J��x���ǖg���ΰ���J_c'b��S{�=�l���e�Z��"�r��h�H
$�����k�D��D�0CW���Aa�Z	���c�2�H��E��u�FL�3�%ck3��b�m����+;�;�a/�����=�^�+:��o�y,��Xd�Z{�Y�YU���><�(�,�qV�H>��ͷ,;Y���0u�D�TL��r��`.�TP�}+�~
�9�>i���𩳨��'t��!
{�_���$��T9��U�zL�<��F�Od��狁���ޑ���a�:�n:���6
oD��,�.�\��q��� ����Xd�����>��!�����\��d���������Z��V'�D�AS6ժ�`3*B����I����+W1�*cl�+?Q`��,w�+������0��"�k�'��H��X�vϗ>ԁ��`VEה=�d���K��f>����Z��k�"��ͦa]���cl2Q�ݯ���}���ab��UIL�4Ur2w�A^˖�1��'��2�V�&PolU;���= x<0��ه�vW���2��Bm��_��Z�}$�( B������#M���*f1�!`�X��i�x&=xF�޶=�p:&�TR0�sy��!%��4�υ�����+tt�p/���P�h����LB�?Q� �bj-�ƚ����D(�3��H;�+PmS6��r5y �[�?�ON�L��L��1��e�%��.,@D�T�!ه+���b�G'�����z.��z��?��g�B�&�?o#�#?QOq��]_U�zX���ǣ��#_����?�Ne�2>�$0�����\��"a��|]E�
ny=�q_P-}��y�b��-��`b�~�t.�,�����ܔyվ�����kG��b����r"��$öp9w\�#�з��w�b)7y��J���J��|)Dz�$�蘔?z�&�*M�y�GC>
��bפxc�P_�RvX����38�:�M��$��󳴞>�ܬ�|�y��w;���)ϥ��e�4f��9��[SB�O�gϕ7�bC��RK]O���:��˨��f,)a�:إ��!�4� Z,�i�x���e'Q�f�a����ǃ�ɂ�N�NT���q)q�Ĺ��4ͨ���� k6/�qbN�+�����[S���X�}�;�������9�4��@�����N��%l*Do�`^g�G��FG�1G��}zE`�w�C��=�@�wI���3j�� �� ���֤�1�X�\�V2��ݗ�ϩ͌w(����YV�F��.��ڠ�O�[F�S�?�(�T@�n[�@��n;l9��%kckL���OJ"��M��������r>����}�U|���:ǂ�em_���Bs�
�9O��l�b����=�Sj��I\�R���l�D��|8?z��s K�߃��ϖQ.س�����X��GZ0y�(m�����C��n ix|��F��Q�{��׶&��!G{@����D���>m���ֶ�A=���S%=V��c�0{l܎�JK=��`�PN����Gɫܪ���sQ���M]6b��2��X%o��=�}�?��n���P�^8J�"z��cw��s7�"����n����O�5�,�pZ��#����z�C�¹�ڨ~�D^Cl]�=AKE�,hv9'��k>Mpf?ۆ��׽ D���F��5�;bz)Y�B]#3�;x[��JV{W���$�_uXu��9�jߥ��Qjb��(E�&�c���}�Οc���K�w=*�0�����cߣ��w'�j7��� ˡ}�5w�t����'a�M���%Ӱ[GP��ne��c�+My����"sO�M;���oQk��h�7H��`
�P��l9)�~�)��-����z��
��w��X�Ƹ&c<��2�[��奃��ߨk�[��	@�oQ����Ϸ�%J�`���l��H��fծ���h��VVW[!ѢXŰ?����,֟rL��DE����^�J%�r�؏X�ܓ�>�}0F ^��HB:�_*�~~1]�N���-m6hy��.�Rؓ-�x�����@��1�Q�p(����������ڍ�ʱ�Y-������1�9$��V�.p>��QǏM�fF�޷�s�����"�SD��7�0�r�=}����~�fG�*$�h�ϯ5%�������$�kS$/L���q���"����@+�c�b��,�"z4�d�ŧ�K*��g�%�n��H�n̄���:��/^H��P��8�f��C�JHde^��3y�#+ߦ�peP��#AZ ��ڋ�i����:�SH��d̏3�� Z��S���ҧ1 �ͬ��]R�3��4�+�Y��揤R�^>����z�tvbSΫ�E�x�0z(��Q���!�`����{r�B���q7�ǊN���Q|f��\4���|[�!�j&yH/����c��4���� �G�BR�ޤ������h����V�X:��<d|9#�7oO�A��/�i>?�J ���/�%��)���뙱�]I��|:ܨ�i�� 7m��l���g����PA\Va�T�x�����n�D�*��}(�#�!	D-8���7r�Nȅ���(��݄{��rڹ|ֱ����F��΂^,W^U�'V��9�p�v����Ae@�ɴo��/q���/�f�\`�i؀W�1��:Z ��)f��g�U�k�=�p>���:2Y�r͍W�`a�q��]�(u��M���-=�c�v�J%�<�'Y���p�����1��I��L���l 7��B����I�,5��xa�:�������k	�+�L�!#.�dEϨ�n�B�tC:�a[}x���U�[�^=�6���������<��a�#Ȫx��R�Y�Y7���� �@@&e���FS@�ޱ
��I�n�C'���ŝB�Qv�_���z�&%�Ti�DQ$0�:���ƨ4���K��z�W��P?�\�-1�J�%�L
h��K��ә;=L�#'D�D��s2ź��u���{�L�,&,�l���j��=�U�S�`���[�Ibr=osy�<�T�*�ڇb����L��̖&�Z�8:���B%�jv?�3pq;%GU���Z[���oN@Kde�O��+E{#�
a������c{a_���M6+���b﫽� ]�3>�Iќ�\��rѮy�QT|0*������s��F�AQ">��K�PD����D�� 3"+!��s\s�`�ҋV��g�Y�(F����dHM��cZ�#���=�eq�L��I=�%9yx�ʳ��|�ؐ����V������2�}�Z�N�R��)o�p��p�צP���z��a�~p'oR7�����&oiA)%"~^T"��]�4�����S%;��,$N��A_�W�V��{�ϯĐ�ϯ�9`�ѕ�ֹ��`O��=1"�(��b��n��t�ឍ�\��_��D�
v���獊}�ua����31��C�CJ����I�!���D#(�@m�Ӆ�҅11z<����JuQ����ƭ_��*�G�-q�v\��/�xm�,����̈́���7���y���EURZ����MRV�fw������%s ��:�ER�3�
��\cN\��L��o��*�;��?�X`�-�k�m�z~�6��H�,�WP��]%i�ѷ�7�f�&�*���i)������+u����Yij���㝪����2��3cB��1R���\���W�Y�F�����1ڶ.|�0�P�ݡ�M���LB'H������m�_.U+�'#~5�.�7B�ٛܩ�Ķ"��A���m@��t|��BD�y�!I�*�C���k5����F^!w�rr��2|ل+�Z��y��d<	s!Ia�k�
�mK(���{�,'/4z+��@��bm0�b��eB�����cZ���ٻ�Y�	�Z��O�_3udm+H�L� ��H�/S�+�β�#su�����M����^j�\}��R���
��y�_�U�CY���4�)��%!�q&ߚ�ľ���񆢚B�M��#��==�B�"%���7�0h�Ů�iY̏+;�׼T6M~=�!.c��	|CZf��8~�_��K闆̀a�^O�c"!��_/=r���}xt~\��čY���{#|�S��E�-g��z�9�p����*��Q�q�����s�DE�;��d��c���Y-�j�w�_�����	{X�9�i ��B�W(>,���Ϋ���c&K�T�Ԯ']n���ʹ*�����yCK#�:�M4&�0����b����\e[+�7��DjO���� ��SK�[�]��=8{�[z�U����"������{^�a	�g�^W]�-�/�H�~���-��3�G�wDbq_������V����z���C�O�8�tNJ�����N.�FL	��%����"omb��q��J̛�V���I�I�����������5�ya�&L��k����@��!sN��Br��G~��O�_�Kl�� *(>�qO[Sb��/���]&�S얠��&���@3��7�9�u�P���m�CO��?�E{�fB���Xn^��MLQC���uܳ_�'�
i�����$4!��zL�|*���������3
��*�`u7!�#�<�K?�M������i۳�����>�"�2�(3_�	���-B�z7E��rP�� nt���N>�\r�t0O0��z+Wx�,"O��O4J;�r�2`�a�� �TWk��7W�m�u�;�ڎ�Q�� 	����q��� &�� {�Ȼ�SV�e���<���y�o�	O�f�"�i�S�~]`�%���L� W�5ꀁ�#g�3�|���!'lP�2�2vxG�f�0��3q��,@�Y�����j5 �o���$�[�n����L�HB�4�g6n���kw�F9�~����jV�7�+j𒱘�E����Eu=A��^^�fF)������Q�-��1F]�D�ݘ�� �zoͧ+B�UW�46p�yg��#D?�$���,���IHOP����o�ki��h��S�=���ø���j8E�N���p@D�����|��蹘��X�w0x��w�m�9�ú?Ne�6,:������#���g���\�E��*��8�T" i�{9�3Ģע�t=e^�m���d����&j�i�s�g�s|y�b=�obK�f� {Kkt# ��3�F���N W͖����75���R��U�|��k���Xg S�)T	�+!�����_r�V���`%�:2�J�N��/��^y�4��a�~���.��y.?Bp2�xJb�L�NڨEf8��.�i���x\��JE�uc{�����'����uņ�
���s��{[�l������g�m���RxY��þL�S�հ^�� �q�x��u������] �]+x��l��%V�셆ڜ~�~Ggx�Cߋ�a�v�g��z|�0,ɭ�f�P{�{0H�LQ���^������B�%�}ziׄ-�B1��Us�8wS<dm[������%��Y9v����NZ�]��o�������8��X{LwO�_ҫ�N�9�� ��8S�K�GC�z6�`N�Q���\*��HACd���0yԕ���n�%���J��Č������DFB��&���f�Z27��S�#��R���E�bOYpE� �@�ݛ0�voRʊग�ϺD�ѯd�/����&iŴ�G؋N4��2��Fa������
�)2��������VJ��uT��q��Cڈ��(:<�a���L�it�-�,�xtM�ӭ�/,�::jH�2o*����b��Y��:.���M�.����4� ��N��Ӕ���9�k<��Pң�|J�D]�2�ߢ�KVz�m��IvѫM*ۼG����<S�/;钳N}�Mj�?6 T��oX�r,��~̕آ˦?�W+�E���DGr����Y�9"�EM�;��XQ-dΑ-Ы9B�F ߿��d�ej��``rPu[Ξ J��,�M�]_�5�0��g?2҃��Й�:1�D�y�����F~�\�r�����HF5BC�z�^F�l:�%3���~viI>V���H�����Bdc�먃(	�$�a����W/+�Od��'���蹲�rx�KH�Rϵ��698�Rbį$������z�N��jv�l��ݩ`�CR�}�g-�ČM��͚�(�k�g�B�=r=�g��fN��hF���^��T�sk�[������7���e�K�l���z�#ju�f8�QIu��?�.�w9�r�ͽ��U��
�΄��ײ��N��;YD.������߇�d
���&&�3���{�y.O[ȃzV�vז[Vf!m4��n9 \"ٸ���-�qA���+P<���a��c��/5��r�z���4�������S}Q�
��wMZ>?����YȘ0�_���Ӣ���
���⯇�E�pCF�ݗ���W�S���/bJ��0�烻�t�6y$b�MɩfFcޔ.s�C�]�'x�*�x�:��:!uGe=�5�Y�V��uB�"�d]dq�~�L��g/�`���b��3���Mќe 7�~ ��2������v�՘Ч��W�����Wu��@R�/��5�����d�h��h���=1{�FH�Y�F�~�x+>A�����LO��#n9��c��r����m~��q(���CU�덭F�-|�&Ip�4�}�2��M�3~8"к�膇G;������*�gx���ٞ�?�o�Pt"Mv���������3�S�9�dB+�U��h�]��3+�|��F֐%2��6�Ž�E��r��Ǻ�8����~1iZ�TFE!.�F�e_�ߙa�we*�-����'eQ����3�B����o\b�˥M����x�8��+law�TR�	S��8{l��=6�Sb~��h�R�ʄl;�T�����M�9������ɉzT�ؔ�4 v�����#��'&-\y(��p�ݹZ�Gٜ�6��FG�dӒ��A�h��n�B5ȗh�k�[ݦ�X��CPh��7DxX�����[�2SL4rA��:��Y��LM|��4��"���A�l�Њ�$��)su��H.Khp}�ÂJ�����U�MދX\�b���A9앯q��(�> k�~N;S�YU���P�6���U�zʄxrÙ2S.}@��nӬ�M���[�@[���H�vH����2ף�༣P�_��3�#F���%�%�]�J�3F��/͔�!B�W�0��/�w��s�{R)q�����"�Z�m��6��i��0(}�-���Ͱ� �r�Q"]���ך��!>�J��M~px����_U�;p�C|�%� 1�׸{�����������L�߅�
k *QF+���ԑv5�1 ~L��=$�^2�J�4[�$i����>F��^]:��h!���y��F���X�o`��`n��d���~8�\��j����h�q�Wm�td(5��W�ނ��' �d0s��W�¸�dƺ?>��� W4�o4qIXQ �V8h����n�"A ڨ��ތ�©؆"�]�z�Ϯ��`��1�-�J�����P0ہ�ÿrB�wN�y�y�̤1��b���%͘^qeB�l3i�T�=��������\u��|� �O�R��U��i���ҔLZ/��p�Y|9�ل����v�V����p_�o�p+B$He!#��(�v��&Ռ�!Q;�ZOnJ���b0Tr"ƃ�{>�U~Xp�;��'�_�\q�-:����*����FU�i�o؏�Ӟ�h[�����s�����ߓ���Q
�Of���ф-{E�̴����l���h�SF}!y�4;�~�������&�.$gY�{f}A�����D�rʮ�8U֊1��mw��3p����>�/�����c�;s��%�.NfF�g�ڋ�km�h@����#�$"�Qi�K#�C/�3ӌ���iDh������1I2���Z�2�R{� ���{�,��:Ņ�T+�q���O=ab6I٩�ڰV��nKR�[��e�z>-����bݷ��w�����
�T�L?�JǦl�rR�k���t�/����L��;�ަ-�C��>L�D4���μ�R
c�N���<�!�`��7�i��{�#�vOJ��e���!-�Vν�Bs���C�#����4:f>AR2�,���v�J��7i%\w���p�����*E��n����o�kcv�r��Sy��8{Z�\�r��ZSl4��(.�(2�a<�#h9\�Q:W�ڕ���!å*:v���ki���禘"���#��!��ٝ}̵>TC��2�����B[�Xtث�@��2�7
,> C�զ��%pJL�M'���%H�'�tP�ȟ����]$��C�<��ݚ���\CM�Cg:�Y3�鬌��o�RH��;�6oL���=9t>�e�"	<�C�`������D�C*I��t$+����g���C	}�ʘ�����qV|�T;��l�㏍J�3���U��I�C �3�r�U�MT�Y��K�������wP{�X��jc��Sƍ~2��h����f�� [F�4"��xO8�3�3��1��-�兮F���(6��O�r��*���y���8O
ǖ]+Z+�O� ��yB����N�`^�o���F�0�@��d|97��\\���!�ß�tO�[1~���	�X��)�%��S����f���K%V���o-�	�����F���\�>� J-ȃ�H��r�f0,5�p��/��^���u�7�]���q�,�^#���L|��|m&�=:m`����Sc	ݿ�L�u��rSA20+p~��h����o���Mgb\p�𼘦c��*r_;��u~z��g��%*�h)��8xOIɻ���o�,c�$�0�.%�7��ՐN�+7���~uP����1�9qâ��G,=���o�?�͗�t��A��c+!��
1��mU-�5#�CkF�	G�� G �OƩH�0Ѳ�/(U�sM����zbE[�Ӫ@Z"�g˅�G�o��٦^NԨ���8f��~n��KX	�=ǂw�kr�����ȫ ��[�:յ���dV�+��ı|�pà`E_��(n6f���F�??���x P�W��L�0�#�Տ�Zۇmi������[�I�0�[A�%�5J�R�������.S/�wA���\����SS'"*��C"����s�����\q)W�O�
���ա�tD���z���V�`��O�d)ןVSe
���_�̻

��V��?��)���F���Y�q�{+aw#�T�{��m�x+�}D�:��|R��oq�� ?l�f�B�ܻ�p!k~�E����$V�yh�}���1�E�[ �,�$����ĘW�&�4$x*����b����[�#p�^4�t�f��b��(�*�b��[�g�t`�q-f�����"����xק܉Gȱۏ)�XO����
�h�"���z��TK�GeVV�Vc��;!'�&��>��%���1�9X� �s|,_���� !_���뷳��7�)`������ [�Z[��Q/H6u���� N�9,͑�OrHQq�ƾ%A�Xz����G�G.��KFx�����˹�.�E�Q/U��.:�H}D+}�����)�Y	������vlV��k7�b0�l{�M*��/e�������jO�@l��8 �5uYW$��+?^���g��/�lr�+,����s�A�D!R8C�����A������7�)��"u� ��c��������St�7�-e?5wֶ�����X�����אN��24QY�&r��W���{�x��P�a��4�i=�6��Hf���,��2��T��ch�K�A�UD��et`vs���)�__%T��"[���b"Y���X�:h�Alg?�2{�y�w���<4xϲ�4&��a�ŀ���$���Y�'?X��	��rK�P�h@I]��ePS�(�; �l0���1�f�j�R$
Ԫ�2�*���,;��W�bdv��cݿ�?��گ�8l�.W���&�A�3�żpT��ڎ>��f���\���uVɏ�xI�B�&��l��p����D鳆8�gЌ�~�_��:��5�;Rϡk��(��,W��)t��<�O�){Ӄ~����'�w�x�6|L�c��	&����st҆
���Ɇrjj�!� X)}�� ��E�+l�����	�0n�^���]��	�	���(#�.���t���^	�~-���7�B��}�a[t^�7 iF��'HL=���WYb����S�I1��&�!��^
=���o�S��Ί�04�L���WZ|�NM�i�W~kl����k~EMN7���e����iK���yƝm�3����RtF�����p��w�"���z	o�b=��o`"���񭏲~�1H0X��Br�!��I��E�bA��Q��	��t���.�.ҟ�~ul:2%v���Тz����t�Y�h��T�s��?�r�<�5z<W��*�%t4���]cJ�r��X�uⓌ�gl��^n����M��n�c��'�z��3��tvb��g�8��y@�7T��w���X��L\{�F赲�D��b$�O��|�f�;��>�e��7ku�+3����'�l�L]��3���
��c�O)���e!j�(G8��G��	<��ɸ&��PK���7q��k ��ӹ���9��Y��G�[y���w*�RL;u�P�\^� o���S
�N��j#�����
�5�3�v��$~�scq��͑4FGԃ�,0 ��<��=����[A�r@�f3�ڸ��o�?��	���.ؗ(W��w�+���z������=����[/���������I�8���r>K�یO���zї�N,ӟ�����>X�ќĮ�4�ȧ����Kw0G-����V��r�g.�m���]h:��=%<��0��ľO�Z����c�+3}�ɯh�$xw�H�z%pDo��w!��R�;9��
tx���ХN��K���b[�M�
~!)���x��'[2t�#���D���Ԛ�<J}�pz-2��SCș_Wi=���4h�BI9/��u2o�\��\�m��SdN�w@���!Iq�lk�[af�e����`l�����0����:ǃ�Q9���hv��ݥ�o���P���52��a/��8�߷d�h]ȒZ��,T���g����e1T[e]6��`�Ǧ�T����:C:O��Ø �����4Í� -�Vڰfv�d�#��W!�ySB�w26�u	�ˑʆa���S+�"���^Ǆ?3ޑ�;g���:���>�R/XD#1�o�"��LF ����u���͂���Av�AK�����"Z�C�����D�PK�[.{�hY��k1�[�����wK7dW1�F��?Н�c���n���d�O�»��lP�Q,a����ܵi�:�=@҂y�j�����n��hm�:�Kƫ�F���w�#Ǝ�_fs�,wyQ)Qp�P~�j�(��;:�i�U�.!�����W.��)�`8kQ�n�ҹS�-�w�kyO��d�)�0.c�*t�������Ԉ=p+l,�����v����M��kc�q�Pms�x�F��� �q�2��ux�F�N�RH�z�0� ��Y@� w��'��dW�.;�E����$
�M��%��v^q^d`��n]�߇Uu7Y��2��ߐB��%������7n��`�͎���Ľ����z�>e��uj�
6�Q�>�7]�1��_��l&.J��9Ò ��rz�$N,�~��0�d�Q�Q暤���?@F��i�P	k�[>�ޠ���6�4�k9;�e�����8%�%L7+�?�?�;lH�u3�4*K�)��ݿ��k���e����	,��r���J�:E�+�v�����G�e%���c�a�ھYA�*���p�o�5��	9��q�H��N�ֆ")��B��j¯��)䇥�b��)N�X�4(�Hn�y�kQ&����d��H�C\�m�1�'���ޗ�2�2�(G��r~& WrnFĭ4TR�H%�Fbm*�^Y���C�{���n�߭������Z�t�\�P=.��O�|���^B.)7�~'pY�D�`��enH�cFP��^}���/�F�[1�#	!Ȇ[\x�z{��s�9�{X�Ϯ\�/6x(�h3R���W��e�,N2� $��(4�~g�;>���iH$��l��C��7|�~J����M'��d���CB�5t���w�x]V~!���5�RHaO��_�0;d�K����v[:N�o�6�����/�w4$(�VQ��������-�J���h�Z`'��j��0G���Ȓ��s��:劳���5�o�O�O���Y�/�
��Z�'l��ric���6I��1�6!����>)U���{��v�����O:�����8�K��{�����g2�M��zi��k�o�hT{2���9Y2_02�����Yd�M|qc�꺴�?o������&��+��d�ad�,���$í벮Z� *��R�� �L�l��ʥO��,W���p�v!԰ ���;�ޗm[�Z�EO�'R�.ې��2 ®�l�RP�c�fqfka�8��}t�L=�&���@w"�
/s��������ʩW*�s���<�G�;�8Ko�I�J��"h��@�%/^'*�X���]Z�]�rGcyz�ί2Jw��b|�ְ ��5�.w$�G:�u�j�lEL�Gq���R�F��*3>��T�2��}��$�㟀��&�T|v�։�Ϲ��>����x&^�N�	�󺜃0�LKf�c7����,(!""`���h��]�����ä����q��?��b�1i��E���4'���1��wa�r���4���T^�{�Hb�[<ɤ��׿nw�t}#�k�i�~�S��b�aϹl]id����3���>j�@��bop�O�j��I���ˎ3L�x꥘m沈10�䷋�</�m������x�O}�3A,�H�ȤJa=�N0Ppv.�T=U#Q��/4��A)	�������#屷�1���C� ��UsӦ��˯��Dc3���t�Ρz%��~s?����6����R�vl� n��ƒ�,��J/���N�bǝ�A0b�-��� ���`��:^u�0��K;NOGJB�ıyc7����~o���Z�kϛv�-�cJrz�Z����&��H���bū��B}�����b�U�J'��P��/�I���d�p�j#�{�����;�	K�e�����`�Wo�(;�x��uH�m_p��S��V)ϫ3r�)�w�&�@�$�E�h�s]y�1��u�/� ���I����Ÿ�Sh��̂�r��������׾����6⩑w"�]͍d@ArV�{�E�ZQ��-��p��e4ʁ�m��׼��	Zm)��!�6>�׊b�S,i4J4bС��@�b��;l0@����\jN�7wY|��M���:���a���C�Z�(�嗉�n{���iH
98{�٭��~T����@�UcKۮ;�7]At&f��ɴ��B�vcJ���n3��N�����"[�s���S���Gf�xN^�A�@"�����[�z�t�	UhzK-m>�������]&!UA�������'f����Q����ӷK���o.�r�s#1�bȌ�p� ,��ʈ=Ac6؊�\��K�;���H܁k^�l��]@�Z�j�RQ=y�H34"%�Х��Gɳ"5JC׌�TQ�,� 7�GE�LS'���?=Û��]��Neȁ�
��YR��(�t.��8��֖�o���7�	�_��-RwM���lH�{8�+Xɴ�I�,��ތ5r�ޢo���ܢy�E�H���rH��QϞ���QHKdT2P���ٗ�����'ah�����~�𦙺v��$U�1P�p-�;m����^^5e����i�h�B���OS6d�1@�e?mYn>/�+�~?m�B��轰ȰmF�ϝ�� "��9��[;�6�N��|�gj-�\r:��m�l/���=km|�y�HذW�thS&�r��0�t�`c��P��<.��fP �� ��j�m��I	���#������a%x�j9
V��BRX������6�p�� o���d:�]��
\O��`�Ⱦ�y̟�� ���}SK-�����m�R����"׭Q����86�oy��3��B:�@������k�fB���.�	s��Vو�ݿ�$fh���;�p�~:�����3OjM&�@q���A%���&�<��� e.#9�[p�MA�n�t��R�+1p)/��YKjesx�GzB�J�2�$���4#�����Q;K6�5#�����-~�4 �63Nr�I.Ԋt*{����̧�
�tIK����!m�XNs�dw$d��ظ[�!N�ݐ��U��Żx����Fq������Gᐨ�}�MG��辪3�t��<�6���/�����j��{c���f����K�TP����NɃ���4G�Y�%I�ʛ���R�Q�D��S�)y���r��s�t+,����?g��<��3��\������ޭ�qi��|���w�Ǿ�TXu ��g��z�s`uR|.\�������"?mc��
�)�R��~�$v��E�. 5���~t���L����$`����uG�(.�!��`�'���O����4�5\!����vx_ա�����ˠ �� 뼰ʣTY3�S� ���I�����KQԪu�n�b���L��&�>K���bƧ)�g�9�Q��������Z]���<���g0p�4�V1��ު��m��(�}�����1�u&��G/o핶N��>,����|�����ζt<�۪�~��N���dK�<��x��M�6�����	&����Аo?*ԟH�Vo��%5��*��L��TJ�,�?t7W_3��f+�������R��b(����&��ɚ����<�aW	ԙ�wɃ���H��̑�x���x��$r��c$��������a!�3�nT�zi^�"�����A��T��Y�����|�����呪DY���Hk"�-3�N2G�N�܏�EM���G���=��S�p�Ө4�����A&�"�3�D�)C���b��=���/5�;H��#������LP=Ǐ�6)��x��Xxj�i���bOI�T�z�%�vS�W#�Kh�[�� j����d'<�y�\R�-1	{u#u�%.[u��g��J�8���to����E��9Q�B�f�3ؗ@�R
�.'ZYz�c��z#-ܲ=v�n��]*BE��D�JR$ �qBl�_��(�jޫ"��*��}�[�3�8��ҽ��oK�t�N�K �>�L� �u1H[^���߉i�P� {��M���|_0��=��f�Ko�K?%1�r=�n���Uָڸf��.K��>�L��Z����-~?O`��֟�5���c�q���a�*�5ROT2 q���h��9s�ij�[8�>�L��X�ט�m$/$�J�Ցw���@PJ�iXCɦ2A��t���*�lT�.�n��r�R�j!0���e�)���Y�3슄/�`��qO���q���Ϊ��O�ɔr��W~g�C܎�d�p�%���$���*�`�Sz����ڬ��A`��b�҇�W9C@ܝ�� v@����u׀T�=�#>Z] M��%�eir�@k�t��3�[˯�01_8��B*�T��r\{�(q �$؍�7�y���������I��Y:0���@h"�}G׾��q���S�P!F����W#f"�#F�{�yL�Wx��y� �)�^8d)%W���?@;�(͓��E��]�8��4�⨦h_8Lmd�C�╶s��@L'�;�^��U;(6"��a�X�����i��U�j,XIt�tѿG$���S�Dkd�錑��{�B�����t�Ck�C5a�=�Y�.PV.�'�ŝ/4�¹_AW�0�]�K? �!����x}�T�'m|�o����DBR�]>=����B�G'e��N�}�rO�OA9��#rEi��8|۽`�-�KoP�b�o�Y@��f@g}P�8Bl؄��ȣ�14[�Ӵ��(d�t�k��#�ȭ����m�LQ� �@9`�v�?w/"�����H�<�Ĺ���\?�VK=��`��9�I�|�T�x�9���  1H��8����%�^M�O=Ԕ���C &�Tsr�=�@��
�����&��e��KM*�h@�M
J/��c/�HF�X�Ng��6q��9a�O�<z͹�2l�9�	�;[]�b���:�J�V[�R�H�d-y�e�R��\��g����'�<Y�hڼ31Q���|mQ�
�7OxeGt3��1�z1g������AP9�si�VIy#�n��xP&i\��"79�����e�
�8�����П;��i< �j�8���f��L��(�+�0��
�Y�-���L��?�q{[�u�Z����5�,|J��\��Fec:�\�u6p����m��Ŝ��7=��oԋ[�����ñ��;�H`�Hv��d!<��G�Ïx��#��>���curF���CcxC�P��7-�ml��p> Q�D .�e <��/��VP���4�4�;reR���)Ծ.��}zӑm�fhnZ���s�f<.;F�U[?�%�S�6�1=r*��E:��,}`��ZYBLϓ�����.����i$����G^��۝�U:\yk�C�7
a��|������'�w�Z$�??��2J���6f�02.;�k�͔�!������]#��A��SQ��
�W�q" ���|-ż��񈎅t�����-*`���
�j ����э}�+d`bS����D�
-��:�Ö�+"^�Ao��y�٢/0y���B����%�ec9�p�:Pb����3��I���R.~�j���<#�t���4��m�W%�ul�k���܇^�T��=[�1B�����F�L^��U$��
���˞��5­t��^������/&;�������?�`�������Ψv��ݕ �z�.p�j��x��l�Q��BҲ�h�s8UU�'=�
�����?D�{�6����0��w;��+�!z�G����cKѩ���r�:Q@Z2��L��';�)���=?ɥ�͉$H@k�斯ߤl��;��^��x��U��]�

���g5���;�i��}(�;�Xe���S�C:�ݾ��Q��^�����޼��Z3ʃv�����JUfj�s�������?�X����]u��	�k�Am�đd۷��Y�Ǟ4�Y�{��׎j��MD�,��X� ��fXH�9�#�14Lo
S��l�Q׷���(DǷ��+]�?�sڻ�e�."	_�H|}A�+�Af��3q����9�dk��j��nE�b��9t������� �G$�2rL!����j�ה��n��Q��7$� Sl�6�-A)Bkn�L��r߰���;�
�-�2S�)��P��2}���B63p��*c���9oG�6�����A9q����3����$J[Rh��Έ:��INpp��)�ב��ӱҾ��Dā9$�
�1N*��ޱ��LC��7��x$�p�MJ)�jhO��ŕ�u�̢X�0s�$�$DY��ʡ��@?$���	]��0$4<�l�f�4�)�
CdD��K� xG]w�g��fC���D1�4����zi���(��,��5�u�;$���ۇ�k�Š��?ʃ\�$���9�����Y7Lv���?6x�3��-%n-m=�UbD$s�t��,xh�s��.���Cg�RB����-Tͤ���Ř�He0czp+'x���I���d!ă@�鬺$XZ3'���	SXu�������*��h�3|&~cZ��~�R/欛��a�2p����6���=��z�-���+b7�~�Y��6�ⳙˍn߱���z���*��<f�H�;6�h�:Qt���mE��@a��i9�+c�>��a߉�.1{��b'�5��b��F��>&&_+ͷn^P_[�a@���Y��xM����E�V�7��b�M����V�0�кۭE���b\��[H��7K����,'j�� y�����*�&������{I������F-,G�Jt�Q��D�X+� g0'�o��istWrG�\�P��x�o���s�K�\���p�΃���:!{YO�m9�4;�8HE��m5}���_��%Ƀ@�d�SG�y(���h0t�
k",��'��_�݅@� ;`3���&W|���$>�ϲ�,d�z�T��i�/�v���لa�3��'�;A�>����Vw�Sڸ�W��Z$�[2�A�?��M2t��?9��b�tAb����+ gal~���2"����+$9�~�gC�^PeJ�W�wf�SG���$�����	5���t���k�ѾEI4�^P� ������yEI7<�l�hA�JU,�!�_1N.�c�3�/I�*�f�o!g�ζY�`�'��\�c�9e�;F���}�xռ��<GE�c�>�C�,.X�+���U�b\R\6N�5k��؁�>��NC}(��HB#<��f[j�ފe��tО�`� �X�a�dBx�J��5�.�P�[N�N���c�~5�T95M��(��������
�J��*���̲�j��5�,r�A	�8�Ce�wI��8I�#g����B� Z#��:\�9��0�t�e���2crp�A��P��i#�Q�{�@@K��9�g�[_��eS`��W>h���ez�e���Ryy_��h�}��E�������H��ŵ �T2Ad�#e(y�B�H�)�Y�HOA}o�0��*�]�~Vp#���ȏ
�qw�A�0���jQY����DA�i��u�S�i�99��\�2n��og3�P�f�P���Ѕ����Ǵ�~/@�A�R�Z��"=��a��x$�s:�ڄ�ǭg�Z��c'_.�Շ�d�ߌQ�j8ڴ�f�9+K��	���ŪQ�*�8`��\G���w����h��j�pd���K���$a,�B�"Z�I��u4 ��0��1z3�%�0u[Jz�[[�(�L�"1n#ɜ6(�	��5�Ao�/���~�$��8���u=��r�C�r$Է��T5`A6	�4�9ts��r��ϱld��ȇ� za���h�A����5RW�>�wE͵���zy`���U��(줒j����3�P{aM�^3�e9��!~�.�^�]�dĨ�b ��P#qP�n���K!��V�_�X o�{�Dr`���h*T\�=-T�'�X��#5_��Y��T��
��ݑ+w�ܙ�@�a-i�O Ao�c*B��[�j?�R#���8�}{��_k}2��:�5΂�70=4�<�c�z*ų��ى���H������i�@Ot٘�C4�J	�R�m���T���t|��bkBt��v�5�����۬�#A����*�Ϧ\�'R�(�up���K��']��j�;�̍5?E��H�p��iV7���!;m�"r$Y�wҗƓ+��e����w��&�?���M-�-"x8�l����c'���f�����֋hF�9,�͎�ˉ�L�	W�Qzf���
)��O�|W�O2��YŻ7.�N�`w�<��q��M5��	�z�;�R��A�t�>>J���2�m�G�n�\�\��+ٶ�;r�ڪ �B��]v��Yά�:�UW�g�$u}���_����U!�D���-�u$�\N#�
�-���a*��x�dO�^�.F�C��.e�nS.-�]�ړ�/�Op�y� d��т�zgoP�\-�G%�T@���y�Jh�&W���t�%��ƅֳb�����9w|����o~���9]�_�s��2U���ـlOu��G8Z��n�JE�-��[2�1�Z��&XUys�?	�%[�Q�m���o��K��FQ�k��F��e1w�j/%'+�N}�-X���R�7�
�(�,CF��by�fe���A��(��*1��垑���@,B˱)�,�gN^��6+����}������
�J����
���e��[��>�o'\Jx��wo�� �/���Ki�I�hȐ'%��]~0�j��"lUb겈�O
��II	d�kl�Ǜ��ŝYY8M�S�P͓�K�V�\O�{ӑ�v`��ٮ�۰}�R3NH&֫"��3'���7AGZ�_�m�Ԫ���IZdj�=$�4����붸&+�g����SK'25���FY�>�B's�"���[��F��O��ц/��~R���~���T���(v�bD!����ֆ&�G�j�^�n	Ǆ��0L��y�F�87�I�N_�чe=�O���fƆ�c��%2L'.&��57A���x����W8�q����VGv�y:�c疺Y��� ypЭ���uGo-4���pZ�iIv�x��:E��G�t� f̿�/
�ϣG�?.F.���qڡ}���I���_��������mHƞز_���1��yz`�]"�cQ��'y�s`��\���S�*^��ĺ���͸0CzOזPezb�����[�ɜ�	׆]D��9>��+���d�v�5,ݭv񔮬��v���us�w����6fq]ϴZ0& HC^�PV�4@���������b:��VV�D����(X\���;=|�2�I���� >"�P�\�cM>���H��H�ę_�� dDQ���1[(�^�n�<�8v���u{��$�g��n��h�Hp�S�1�>A�b9F'
,֠,��s�U��|�E�u��U���}X;{�XM����p�Ǆ��A��߁=�o�{#���N#�S!$�����t*�������/�~�:��pBN(����Ur���R�Lc��o�2I�?������9�16�[�5�M�XNFR����{@p=,mM�9�٧���4�t��/E�g� �us��T��~�Fd���P�4g��g�5�]0�
u��~���SE�7���9��ѭ�8t�X��*��m������j5���F ����&�e)n����h�ڦ	��Zവ������0���#P���"��������/)�T��=�@G"�G�q�:X�л�*񼀺V��<-y��{�, �-��6�,ى��c]ӟ���}D�3���������.̼�S���U����}�������үH2�TBd@���c�<s��"Q�X�!7���lJ1��t�����v�T�cYǆ<��{�Ȁ�,�R���� 0��O�)*�f8��d�W�MՂB��Mbh7�����tr���w�H C_+��X+� �{��ל�ir&����N� ����������@�zJјi�B�D���bߘQ�p\՜ra.���B�Lڌ�~q!���k��lI�"�Xͳ�z �G�#`�I��ZZ����]V㰜��>��p�K��!\N��o_ ��IEY�����UQy~I��6~\� �;n�6r%}�.ƻ\{1����
Q�k!�.���.�)�1�J6ΗL+Xڗ�؇m�H�����g9��:I*��8��o�v4�Yt^�-X�p���e��TQ�SI�^�CV�?Ө�*����?~
P�w|jY��A�G��wMޕYQ�8�c���6�,�:�a����Y.����U�y�> "(^4J��	A����}1��Q�y4�>R�[�m��R2Y�-&E�N�Ϧf�b���##�'�\���.�K��+bV�-�qϣ::�V 5�Ҋ8#��m�1Ȍ")�<��*V��x� ��H�'�;ڀC�'"CP�e�}�G�Ǧx.�+R��'hV�F��k��k�\�f�o3dnw��c��k�8-󲫞�����!�<BY��Vx���(�nw/�R������-�4��LK�n*���.#�wq0~�t��\�s�Y����wu��Hshb¯�����i~ Gz��i���+e�
��0\�g)r.�����q^�*_,�H�Tm�Ƈ��K7e��$��Ы2�f+RAY/���z�A�'�W�"��@E�{�U؃@CMI��H�G)A����M\��NTE���+�"xt"BS��b1[���k��N�8�{���FP}(r�n��1�*���O�+���3��p4�E�ŒfZ~L,r��ID%��5F��l�,#�T�� ���m�=��8/�2R?b�,�� ��n�����髠t|���+�d����ə��0J�`7gq푶
�
�& \q#�q�4%�҇&!�~2$�?c���w��"��N�h�4�l��=���G�\;B��=�(F���v�������Ѯ��XlM��i����U	M�y*H����8.�F8�	1Sr"L������@�k� �D/!rD?�Ò80.��\�&����v��r�,Z>}�U&�Ar"�k9������,Q�K a���H��u{��zD�O���(Dd�����B��!*(�){Q��H.������]��#��.ls$"v��Z�`@yEPEV�k͑/ɪ°O�9�w��6��z_e�+z�8P�������6	>@����6��wiLx��G�]q�xT�<A����QC���-P�gx�':��W�����cs	�||FjT�{�� ��?�>�	�$;����DG�:��S��!~��	@��� ���$`�Q����ʀɥՄ����%���>�����;u���dV�E��|�:y� �[*Ɍ�w̩e����e��yZ�s��z�Q�K(�B�ie<�n�5<�+e����ჩ�㛧ψy�x촬-���4�
\*�2r�B��!�0o5�'6����w�����/M�����Y�H%X	Ջذ�w_�6Co��z�Ң�� ���A��9�ߜ�l$l��c*�W8�i�K�Ǫ]5�9�����;�C�}hq�;�ׁ�r�>1��懪��E���E�]��mA�5)�����(�%d�{woV$e��H��i7H���͏��+E���cwlN�������l�#��߽[�D_ɭ�7��_:��%�].�>?��}���·��
�f�=�daA3����dߌ�p���9}�+o*hX"���/$�I��'���v!"�R����z(��Ӗ��a���FNK���>A�V�;N�d�p����#�j�H�����"}ŵA��?��,
���� 0�c�	�#�4�V�.g���]���*��Q���-��2D��i�6?n\��YJ"�ݔ� f�'�*Z�7Z�)�Z�E����7�I�)R������"����\`��h-T����~6����D~�d���^�z��}!�F��&]id�n��׈Ȼ]�K+@8^t��/�'�F�g��U,nTw��<�,M:Z���nT"�JV�p��V�&.rfg������$����(e�v,zT0<����B?G �ͬ�onyam�[з�e�d�5z?�JJ��|7"�.)&���4���b#�qo��R	�8�M[xڢ`���X�G_��Ų��[�aǅ%
t��k�k*�t�YȨ��h	�}�CW�������o�Q�{%}M���qlO�"sV��z0��T#�^2�&�w�W(��؛�@�����R�ŕf�q�~� ��?��G���»�)��Bg��s-^?����U��?:�=���{��I���rC�d��ƣ8|�Q2zx�; '���C%�P����p��Ho���(w6��%'�����{"��{�c:� g�7�b�=b���������E!�2��r8�[�����W���D@��[Ŧ���9}�gՄ�:������x����qxT�S
��q3�
��
ͨ��Ǆo6;�����n(��n ��U8N`�]�E�#&㪒�'���ؖqp�$���M��ퟂ��3"^C�IY��u4�	S����:I�K���\�L{{�2L�c�G�.>��Gz���T�f�kȑ�{��P.��J"��k~�m@���BQ�Q��Є���=��2h��mКI`���?�:��!�{d����߸�����yH����;� �m'�\k�N�,ň�7`M��� \����V�}wT�ڗ��R�@B��͞#�nWu��reVb	T��	̯�R���ҵ���(�;������e�"���4~;b�����z-Q�L�Y��d�w���nh�h�����]xt�/�&M�wmߞ0�˙P:��))!r�Cu
:S�����5���p��N$:lB����zI�G�a�5е��v������Q}�� lV���፵�ʉ���C�c����>3���qPr��@-H4/�ѱ����(��n<�6��ȑ����=�຅(�C��q���vM ��7�����󉵃a4�7�����zX${/Rh�Qf���=G��C;����s�����4t:[V�;��Os��RȬl�P9�)F06�!�b������֬FN	�9�T�Q��K]��a�Y�w������N�y�m/����v� B���`u���!E��`�M$;N�p� �2q5Ŋc둥�p��;Oi�s���y�9���Րj��F-����+��-�#��HU��n(�P֧v�Jm�oe/��G�����,E����"�n�|�Az�Kq��ڧm6:��1*�� ����(Jq���N���0Q~�l�d�xz`��~���L�O�7]�_L�2�^I ���Ҧ��F���+8��C,G���%��A�Z'N)L�KS���J����tح�6r��Y�i�y_57C=D��e�6�^h�����	������f��7��Fd�=f�DR��.�ks���j|�m�q\�y�!܆z��*��ow}$�vh��Kwr��e֕=��6���K����=eP
<I�R�v��J�	��2��$�\k�ץߌ	鼾L ];Q�a�Mt�I-��z�h���o��F�1����y��Mk�O@+���ZZK�:��f-���*g���6<XleR��Њ�'o$��`CE����(�]c?}cX��������W/����=�5�Eg���So���Ʊ����ř`���!n�g�Ro�^-^�����K��8L�B�����Ƴ�R�z�ޚ.4|��<Ց�eL�4H}/�3r�JA��&����i �<�n� �@���R��t�������K�Q!���=��T�h����W����)QGk�cq�n�x�n�����m��/"�LGz_�c=?�$h���2�(G8�e^@Tk3
(V��R{�'=�S���A(��8��"�H���"d�6��'.S�+�r�ـqʨ�_"SOo���ڭD��X��J<D��2��DZ�1?x���ͳrGʹ=���F�C�vvo`Wq<�>5����	��������WX�(�罃%)eK�#W`�\�ǹx�2�����z�u~�Z+͙Nꏒ�����F;���22�;�(�-��;�Vt�x@Lv�uH��F��uRT�Ŏ.m1n;��r�k�8�$�Էo���7�PM��z5"�Y@�aG^Fh��RE;u@��_��\�HƷ�s�v�8��J��qf�ϾC.?U��OgU��|Z��Ƶ�5
�=Ck��p��P�؎��5�@���  :�A�)d�������}��9'���:9-
�i�X��'�%TJ%�0��� �Ѹ.�F9^�-��ه���;���<�]�ʝ�D`R�\��E�ؔ6��W[�7e�,R�ѼR
L����B�x�?�Þa35>i�,k	2'�[����q�(+T�2H�����v"�9����!Q�Ѥ�K���z�0���<o�Qg�����;&�����>Dgjg��Yr�4���gǭ�k�IL�&
 �#�C���Q(Q!S]�=e��w����9���X���$�A��o��,�-%qI͙ZNN�'���zHY���
9T'��ؽf��? lMl)t3n����|�8��0Id*t��5��v��{ݭ�x��3ɻ�vJb�OH.��	F~���ۜ��.;a]!��j=M����ܽ:�>����o�oDo{_;q�*j7x)����	)��(�`FrV�����ټ�ը�"	�>d'\n��w�XZ��O� 4z��"v,m��^��'�f� n�p����B/�&&�n���ݹ_�$Z�J+�	�]�璿��(��Uuk�C)2_rڻT��N�3��t5!�-�/�s��`��=����I�����W��VmpeJ}�%�+���ʴ�޹���
��{P��Z���¸�j��9v��&HT�m#!w�gG�q����l�v�]� �,�.Nfw�2���E�[˔Oo�y���m81���y��^���4G��r�()@Y4�����{�u�� /����Q�P�� ��]E��Qwȴ�������I�!c�^����>�8'�
�UU�2q}�#��GM�#	"�a�?���C���~�lg'F�쁡�g�
/��+UH?�VT�:x$YԜ��q �LL���5!d��G�z/� ��g��/W�H�d�9���oQ���l|�w���`R���!���{�����4�)��+�Q�(�dcb56FnR�@�A��;U�5�)2�*�d�56�,��7�=��3�	sk$�����}z]M���\�!ߊ�6h��&j �癯��C1�����e�?��d�;��ὥ�-;ǘk�����8D��?f���&r�kW��ɹ�zQ� 3Ƨ�����}!�|C���kg�6`�d�>ps�G�P�z�����#��Х/f:����&�k���eP��3%���R�:��)�A%�Y��,�@p)-�w{M`��Sk�+@5�F{��q�R:�'�<���	;ӯ�z&�[�7V��b�@23D޲>��U�pZ���,͏�#*�� �TVҲ6�TCznŝ���A�n�)S�C�� �?��c%��^$x�ěa+n-�}�)H�e8�!���r���S����$y*-�΅��d��
��S��N�>�t�(�,t�b_��z:;"c��_�bn]Z�sUM5�.\6�j+|�Q,���<iYA}!�U��n���>&�LC3���c<��QK2}	^�l���t�:�)y��-���~�E�-�����ml�ِq������X�2��<��08�em���Tap�S��*�U��;�^dn'P0;%I��z����_,FYğzq�GF���w!\3�p�}0s6���%c���r�p91ٖ�3@�b���h?��V�(��9`�d�酁�"�5��|+?�`FAy �^�3�'#W�����z�mM�:�6fJ&�9�� 7H�e�;/�b��?9@@�3�����m�Y��&�Ëy6T�
���@������>����#'���������0}��a����Sp�x�:Lm��x/��(������%R@%��[k��\��
}":����G�<�2J�U��Y�i�9^꼋�����ȼ?q���;�������]�e*�4�$(�M_\M��5�	h��R�$��d|*3ǱV��pt��� [��]Ug�V<3,"��gw�(�'/���)��PX�#Qj�=(�R�������`=TU�N��k�=��(n�8�P��m���Bߜ9���l�@{H4g��g�9+ͥtj74�Z�>b	35Up�9y�|Y��W3�)a��C}9]�$� �zI���������c]Sԟ�:�S4�y~���
t��1�x�pb�YbO��A�pg��RN��d:-�$�YR�B�G�{��d�O�9�TT���J�~��̇�1D��,R!6��,�7y*7��D)�rQ��>�b��l�����gAO��Z^�Ku��$��ќϟI�&��L�`F�>�iAE�
אڶ�/A�D�7���.m�.���͔�
��/!zFC� ���j��ڐ(dN'���`��&���C�grC�&ͪWH�%�k�$�� �Y����Z�ˉf=8B�6��#N����)��Q��^�M�xL~�ȽN��e�
"���LY�eR��^�a��d�8uyÖ@�J؈rԀ6
��Y�D�eFƷjS��F�)�fc��i��P`�T�]�~���u�GxYzT3�c\=m~��No�s��Ȃ�i����"J�?ȝL>���]=Z�z*�(�,�-�o�U�at*�.71q�?�De��x�P�G����2�r.&�B�J�k��v���s2r�U����0�x�1�}��X�3�*�=_/G�mF��)��T.�G*�9�	p�9�2�6a(�Mx�Y]�8�q���CVp	0}?�[���^g�J,���9�8�5Y҂:f�PA9�ء3����l��"�k5u@]��H5Rl���i%V�d��Lb-�[;>�6���U����~�P����Ύt:�V�HG��m�Cڀ�m�ި�9(?˄EU�q�h�-�xs� J�ͦ4�N���,�N$'o�I�2�B����)-N{��#<�8�n�g`��w�G�vG�Z1(ԣ5�ŝνf,2+	 ������eՉ9�a��{m��SZ!ub�A�M ���|� N�9&����ó���������7":�hH6���_
�9M�E��Z J��H��X���>t�`�cy��2Q��A)ŵ0e4U�������F��f[
"Έ'��)-5��?5s��m~\��A$<�Y2�d�딫`�iQo�vx*�#�}e�*�~�� ���uE���@=(t|����l(���x]� �����'H��(U|�'��E�>fRQr�D�J�;5���ߗc��7��iT/2��B��It�#1�!��j���i��t�<��eH����蒹��j3Z��z�>�L!����E
�A�QˬĴ,׏u,m��[w�YY��<�]�ae�	x��>��o�V"�81͙9�AП�ź�\�xjQ
$��m�E!��h���.��|��X�fn�!�T�VP��yR���x��fQ^��6�3����Ql�6e�oą�*����u
ǝϗߘ�Ȱg
�@��n*���uDď҈ZCq�(��Fz��i%wn��V�|}��r[Rne�᰾O��qۆ�亹��}���3є������W>	�&`�<���zoa�]�a#�t����c�B���bW��	]�#&C�١�v��WL_�o��e^�|�gpb���l�tElH&����H���� ����GvV�º��� �r�w	'lg��5`,��߈�Ĳo��Ln	���n�`�di��J)�#���H	����>�%�3�!�ff����d��H;dMױ�(��9�r8^��|c����}��t*���5�D����L��Z���n�� ���FU-khu)��4`/tg>}��L�o���.��m����P��A�˘��S43���ZN�}��7��Ih�a�m^��-��̕�^n�H�G�ø�|��-��F^�>�ɧ>.D��h���S�=t�����5�7�����Q?$�A��Q��6��-��e~�l9�@��<�Z6I�(�4.C��C�����4
��2:�&�
����4w��s��[?��D��쀞;�sv���JWYZjB{��O(z.aekL@�c�K��wS�zx�]mA�.MD�Q���\��b*m��cf��z���R���׳����k���U[��(��V��-����<*�����(�[K�J����c��U�˱{��M�0���s���	Vn |!0�/d9IF��w)�*|?R�;4�͉s��r�f�x�Ck��35ɢ�kӆjJ��پ��2�^ںFĩ�P��7�>�mo�s�9�{�p3E�ej�LEK��c��[�[#<�~�aq��G�ދ�\�Ă���x)#Z���^Ll?!3hUL�掭ؖ�ʊ��MPފ��i
9&��<91Ҹ#���>ITpq��5h�A&�U^�Ɣ��OB@3a o���4F5��m`��egNMW���:	�����G�������F����Z�)��`����]�)��b�YA�xq��)�
�:R=�"�c��¹t��x�Z����PNW~*G˖�(��K8#�_r�dB��l}�\��l~�Ň8��S�|)�dE(gI�-��,�Σk���D�����y?O�]OK��%�|;�^��{ռ�O-� �8�3�fz�Kݮ`�O�&����ET6�"�y�-��`/�4v�b�0��4���c[|�U+H��"J������➜57`���X�jqa��j�P�X�����r&OmY�����KWS��'��1@0���Xzò�J�4f5���ȷ��Ф�����Q��S?�P������4��+�4�N���G(�YXP��zZ��� S���}�)8�髙�-�����S�w������Oˁ�S>�~z���,>n�.���5�e`�*���&|L��t;9h+����
T�zAҗ�M1�\Ib^���c��}>V��i��Ba,���A+�	Vq}��G��a�su0�P�P�������V��S��0Vp�����
�9�9>�Uq��Ч�K6��8 N���T��K����ԣW�N5<�j���M4k}�Uv3�C���kTW#��؀�P�0�
S��ꛯ������!xW��ckZ�s7��-��	GB��l�u&��˛�3�Ջ��vW����h���~g����syU[{��r���s�^cY)p�h��!��<V	Q%Fal"�����o�6M��c�PI�-X.+y���r�j)B�-�Sh��
*�d�	C��-*K���g�g`���ur�<���%4�"�h�&Q���Mx�������,�F��	�m8������������7<��/E��p��V����r ���cur�#�	E!{��u��4�!G���]&9ĺ���f`O|Jjs��:�������Qw����7܈���-h�K�׳�Ҹ�FD�
��A#^ I�kSI�L�y���7/��<���3gpܕ��V������F��g��JBLk���3��5�-���\�6����nm��ǃ2
��5�S�O�\"�˞s$�Z�A��q⇛���SF�\�4��0�6��6�N5���S�ϰ�\8�m�=	��|��� :E�⊪����q��*����R�������&>�O]�I�E�E �}$�tA���vp�&��F�W���J�1^�o��6b�.U�ǟ;�vҜ_9s��C��}qԈC��a����D:�!� ��Trך���/����i燽K�q*�Z$6O�qG����l��� ��6��&3�C�
pg1;Τ<�+���	����6�]� ���;'X �sIx�)K�;�I�6"��`�t��]D�yg���vx�.��f}�gr�ۍh��m@0�X�9.�:`��Ý(�1�~��=�˪�l\��KA�O�jl��zG��U�"���1HI7 Ta8*�%(�����\�6�O.��~ibO�X���$�6��|�ZFOC�����^�9����L��_:���M���'��	������|U���r��-�?�����hT�^�}��i'R.A��,O�J-��C��iun�0ig��*�&��������ӌ`��m���mg�X��qd�d�_}?�+l��u9�ے�8%�(�6y'�=��,�����i�¢��5�;��W�udM���a��M�?����x\n.x���@7/���8�2Y�c�I���_��c�Q�,��_�<���2Wt��@��\T�"�ܱۥ1��ô�5��@�s�5[�UR��=5�s����%�2�̚dV�\u��L��БM�p�~�-�g�6���,�����To-�=��#��j^B�9�ɣ��!Ϋ���hS��[M��ͨ.�c��Q�q+������{���T����*o�Ћ�S��m���x�:�]��� '��n���.��l�/D+���}~�b���J��a�����KߔwՍ �;%��si���>�D��>c�qe�x�4���^F�Tb^2��^Ƽ�Ȫ@|r����8<7�K�@&�|S ��|�;>m\�o�� @f�M�J2E(��W;c��!���C�x�R�=|+;c��ۿ�L��h���}���T{��v��
�����rR+����^�0כ��+��4���{��G}X
R'$��8E�b<_�Z8�)BpL��M�f5F�su"�Ã�qZP,��tL�5���BI��J	��,��U���E�����Y��a�f^�y�T��#�v�Y9f'Nt���Dyh�1�@K/��;�x�pe�^�[ʰM�NGW�zB�,©?P���Aa���������}q�G.��Zj�Ƣz��]�Y�H��Z+�6�ICn�=�m�&@�V�{�6��ZGPð�j�G�V60H��OEӰ0�'������_���2������q|Ͷ������(�k;�f����p�V�
ǚ1�I���(7�9vZ��2��u쌨3��$�e�����5*��LFQ�����+������S�:����̫�D)M�J��X+�㖺��o�tZ�_�b��%Q�L�}9�&�H�8�G?oߜ���V��u>�F��-�Q0S�eV�G�,��b�UqY�$]Z���+;��ܞ��!�P�0DV���`G�~�]8��[�z�B�8�L��O?��?l��䈽>-�E��몸���/�^?޶��`�%<g�����fu�q�<��v"�8T'�Q, ��Jc[pj�c���,��f�kK�b��3� '�a����[NII���W�7�#R>�y�i�e��Lg��Mm��	d0���5_�T��@E�LM
������V<��q��$Ysm�@ၤQ��AH�nɇ�܏�?7����m��.���Fu0
q�V��.�\���^�,���I)�n�%nb�]�-KB������"O������p��+3�-^��Qfb����y�gL\l\��Pes�y;�#�l8��Rnҕ���([ &��R��x�>�l馠O�\p���K� �Q�Li��r��n{Xn2�j��*a՞$�漩��1��M�o�!ӡq��O*X"�=%iN���@���bE��4�N&�t�`'OKHP�ݼ��#�NG�8q���E��~�+���z�E^�7��8j�[��n�:�Z|���:�͒B���,��z0��y���2�	,<d�R�GrqDٸ#p.�ڢ��>��n��J�'?QIy�ֆ읁 NX2SV����$��J�ˡ��ԪGLZ�B�1dpۏ5�%�#��C�F�0��p�ޤi�C�^�d��OT>��C�������<�𾎺������O��L���FN`���SS뷸��z��`�LN�����\ɇ"y]��a"$�!������ ?���>�(vv�q��f��-rӸ]V������3�Yk����"��T�${0�;c��oC�/`0��WI��WO��b���"Ud���`����s1?i؍qǈM�$�6�#�X!�D�9��,��ih���(֜���s��t^��щa�e�:��y�F�Uؠ�F">���A�O��&����k1V�&�<�S�g�JK@("���B�:�IR6!O`�'ƽ#Ⱦ5A�h���U��4�^j��WR �H������`/*�5�Cn�V�<GVFDjY
ϻԤ�:m�A�2p��Uؙ}~P����ͱ��}����L1ؓ��`q�w�8��G��a0��"���{<򵹙J�RV[!��P�=)�.^\�l�ەj��*?}���7�ɗ��ʝ	6rZ�Fg$u[�'�U�ZM�&
�9�oVO�D���:b���
�� �ֺĸ߫M*��>��{-��^����?�B?�0KH�c�9R�v��Wȡ�L���������/U��=�:s����2WT[�կLƓ���T��Eơ�n��Ԕ�3��}� -�ş	�0�2�X�����G���S���,-|1g���u���شwƿަ�����Q��)��u�|rY�@��ĖP]�;5��ϱ���e��Z��bN��]Fj+��s��і����ָ���Bu��ST���jm�:�/�1����t�e[B��_�e@��2�s�_c�B�c�N0f�>9ͅg��y�I�1h�[��1ë!�k�r.P B���k���M&0�����w����z|��ݾ�����kI��zx��g@��6�h�Ľ"��5�}��㍴�n>v�u���x�m_X��߅���k�b�!=�u;�L���9l�4�A�xU�$:�o4��Lz�p�)��da���Z���:�9���57!*�}��dg����t5;F�Q�UG$Z_m3#"�Z�p��RTL_�T��z�Vh��*'�z �F���$��5����MX�)z�G2AY�s����l*�0j����K}!v�\��ć`{Y��`8�,m�Ja8�*���3I>X��=��dNڌ��\�Z`�֊�7{s��j�62�������Ex��6��x�n�O�8.#�U�'�ܣ�� a�Op*H%Gs�2ƪkkS�b�;��[�y�Qrno��*�F�y��ƽd�&�]B���3}د�*�IŌIe}|I��I��$���c��P�cz��
T �D���ƭ�tm#�N�ն˹R�%�.�(=E��*vv Lu+��ߨR�� md���\�D~��緕 �짙<Y/��>�(�D#�HR2j*�j`�5Y/H�P�J��<�_)s�b^k���/9d4s��>$������������p�.-�����~��M�F,z�^�?��&H\�Κ����6^�}� �w��D���)/�u��oN�J/-X*�Q��E�֭k,�5r �Ž�)�o}aR��6a�µHK/TB����jXh�]��]� f�?��cgx�ѐ�Da�tZ{�V��ZzД�3!Z{���l�TS�i����� �~1}A(��`���:݈�`��"�� �E��v����z�����Y��VM~�Ϸ��Ụ$�$����v<�-�>�j����G�+�U+YoU)\�3�.�� 5 N�5�;� ہ"w"��I{�4_�Q�ϩh�X�%�BȾ̎|ud���P[n��)�@�d�#���*Z�⃡R�t����S5���䅁�Xծ�?1t�nTx�-�6K�Qhҏh�'ޤ��y�E(N�F��^��Cd�Z?\��oqې��l��$��=5�E\U��_�	����jH#��_s��Ī�n��sT ��Z��B���˷aФbK�H	���A�i�$I_�m.@%H�<Ɵs�l',��Rr��ZHR������/p6��t��Lz4�V��M��h��x^���r���p���U�����05.��۳��骂���[iծW�D� ����� �w'+�Ì>!�#_�ݚ��_|<�w�N�ҕBr�J�%1u�����%�9��x>Z6jx��?�-ޣ]�|�%`Q���H�k�����J(>AM�^ҵ�~@��	
�~�EN�Y���˕b�xKD���:�NtU��5��tBR3DG6eO1���=ĭDN-hؔ��	S�QJ>g�^6�c�j=raY�̙����SUF��% �B�]���MKV�:���T�f-;��Xr�!i'�+���]��K+� e�R)��6�o�f���D�6A���&y}�{P|Iy:��g��$�O2��'�j���������|�8
KD��և�DB�۱�P�|�:�D�1�OR����t-d�~�`e�1�#�����8�1'�2k��1�>���ʠHH��K���C�㱏�r�@�xO�h����}m���\w��w����K��)����
�Q�V�Z�E��AD�\�n�E��,W��^!F=:Q�*�G0k/�z��ǎ#�D�����_�O��[HR���:7E�W�v*�i�^/���� �)W7�5[�K�ݝm��Gl��<��^���|���f�ڭ����|V9�yKS��D� qu�PҊp���<�� w#�\���Xo�A�rx�Ū����J�2kJ���'��E���JH�K�`���E�֓Em�ۢ�J�8�6 P�o�	m}x�(�R=(�sT�Q��4Y1P�LQ��_D<���)���(0���=h�6� ��"in��W)+S�������..0�+���~@�Pa_��2ﷃ1C�1�A9OdiU^��]iC<����/Gr"]\1;�j�N�n�Z<� u�:��Nh��6 s����ڿ�6��?I�����f�lޜڳ`9�G�zu=r�[�<�K��<� f�����L%��/��kh�Ag��+ )8W�`	�hF��IB+���^7��� �}-0`ヾ�6�55:]qe�>a1�-�A����!��z�e�Z�*��)@l@�2�JȲ}��h��F�7sC�Ho�A�3��=�Tpv�������,�K��E�j�\�~�V�s"�+),�Ϛ�'�6�ڏq
Nf�S]b�? ն�!�x�!W7����d��d���8����A�L⟃ck��[����d�NVR(�S!:��\�Ģ�A��}�co�n�XFk�:�1�\����)��=��SUTOE���Bg��f��h}L�<�K �C���jH0. �yigFr�h�]�0���U�2b�gA��z����?��"��WM���͉�ZA>�R�U֍�4���-퇔74�"��됑��hv����V@K����K&ɦ)�k�C��z�����E?�k$���]/ڙ�	�
G����o{�]S;���5h��'7�!g�-�;�p�- ����u5B��v Dѓ��c�Z�������}/��D�;���P!�ǸQ������hqoh�����qJ����-z�ɗyI��K��;CY��k���)��c 3�n^��:����Ā�\z6���o6u��EXc�k&9���" !�9���� )��^P"w�Q^���\�*���f9�)��f�p�s����O3��=�1�J_�|bi���)�7�7����M�Y7<`�\�3�8�*��\��'S����g��4C��"x�nI�1+�K�,����rϭ.Ԉ��]�g;h)/B��)�������+|�_/�E5���"��h�wMQ���f��1ܾ�����v�
#N �QN=
�4p�@���(�C@_(K��'�� ��η �z���s��j��'f�D�;0$F��g�v!� �ֱ5��	���C^$^�q��:��������|�(��	��%u���`c��$���Z���g/�� ƹ�f�|���+�w��U/�-�rn�K@���cwT}V?�S&�D����q	ӐW���0�#9��8c���N�8Yk����2;�)��F��xx$��v��T�m$���BLW�!�޿r�D������BZ�"�E��Yy��KWy�J��C�Ĺ@���Fw�"5���D$I�V����*1b�Ϻ�n��`�����C�h�Ug�zN�{D�/q>0,v����q*0^�j1�@��j��艷�6ƫ��fSƅ����v���_4K�st�G%�T���rx
ȧD���8;���#�q��r�U�������OG��Ŀ�Y��F�^H6�u�������z�؞U�Zmߟ�����w:)�::�!3�@G����HŹ6u�Ą;݈|��2�'N[���L9��'�����5�Nc��K��~�`�s���c�w�_B�+y']�i=��X�C��7Ui�H��	W�Q���c,v��׫�W�aA�?Y��`��7����<�e�G�}��&ɬW��DV�zK�����(0'@K��t�%��ʴ{O�!�U�nqV�?X6�3ܮ�3�P��1�_6?r'��|h� C5�".�/�N�l��+���	���׶��s�	#���(�%Ԛ�p[:`m�tK��Gt�\O�d�p�;�?��Fb��
Z�~�6�//=lO���Aϖ�����f;�f�C���K��D H%��rW����&��U�y��#&��X��C�ʬO-r��c�M��N����"T��z��$�w�^��Z�(' ]��'6�,�� y�k�`@x�2@m����z��ziOD�gz�aG��	ژ�����x#�f�v�������_s�1�M�U"zAC��7�G'�9�)l^��xˮ��|e��b�x�]���q��#��y�h8P+�Ff&��fM�P*��Qa����SdX�)�T�����
Ț)���)nf�"��Y�j|uu����t�}���?@��<���j�uΉmt�5�yֺ��_z�n�>��L4���wir�Gs'em�*ڑ!}�]KK5�:9����z��w��!{d��LUB��n��(WѳQM7GYA�f|'g�U#��C\#�դʕWO@c8�	֣���9pR����"HA*(Ȫ"���t�_�����68�y���x��Y���=�����++��� <��_*� U�M<��Y	�F���_1���3�ۣ.�Ԏ',2.�zb�\&��A�[H`��f�w��dѽ�* ��.�����v5$��#t�� ~j��-��ǟ�	ح�J`y
F<��}_>��S�mћB`@�D�-���m��}�zy
O������H��F��ꔻUy�W	�n�g��-~_��0��f8+ڎ���6�!.��KG(Z�V4çL)�ڜ�߷�1���t�E���
mc�&�7N��Б$�G�K��[egɀt�n�_���Y�қ���S��/3��������X�((���l	��l="/6 �Mi�����m=�U,���r�/�&IIM��Ꝼ�����>��6�<QH�V���W������+����K�_��jXݣz��9#7�?b�nq�^�ohP�AAU���MnI�u6i��Q_�eBHe����Tp:A�Wm?�{������X��i����2�!ȣX�EwA��c{h���n�3*�gb�FM:}¼��ҙz�l�qI���5���|�a\�������+���`���\UL:??\F筨Y�e 4[.����@����+O�1QM˂�� ~?��tOS��{F�Ί[��*6�u���������Wi����E�o"��f���,�N���Sl#>�}!��V5���C�^ҟF*����Hb%�,4���Ob/�w��g#Ώ#��<��Ǣ|6����:8�p�0ml��W�!-'����5�ؽB�8�Ng��-i����K���	a��'I��<��h���1�]�$�q����B*[9�Ea4�z���\��,g��򗓵\D��<�OE��ߘ�� �ú/�@g�ޛ�T��D���z�5IJ`�k��'��H�7��&��(=hG��Κ��h~���zp�JJ	9�k�{��W��|-�_*��oo!���,�O+���>.b���Z?�_�Ō`�����!w�8�D)�� �{� ���࠷�'�F����G&-p60� �{��nXD�׏6�x��L��<O�s܄��"4�;��b����N,��s+'8uC����P!�Sކ��
_z?B��������
��	[���ɚ�7-!H���+W��}d����)Bi��-���B�HJ.����Q5��l���D��i�_ ��e� ��b��6K��75�'���5�s$q?Ђ�+AQs:7�14�^���wen��{~p�D!y���}tMl��L^Wk�=n���)�qoNԉ��ݞQ��fvk��A��>���b�T3:j/�Z�E�����$vz|�q�别��u�$T�V�d�!I��(�y�C˼�+xV��lH�"Eu�er\������	]�Tx��a���'Z���@V��	�k�ܵ���pH/�u��>LҼ��]�����IS��=��n��a��G��O�q͎��)�d1�!�ϗzp"<��\[�I��Oͅ��M!7:�e@4.�b�t"�[Iq��f�I8��W�x�[CH4}��#��Oj�)��o�׎�}�����#h�����e�9!�x�%�QVe2�s��c'�c�5E��[&�s9���g���ڋ���@Z�G�%�O��ل�����yn���7B�����u7�|�yd$ct��,za�k�x|!��{�1"C��4�LX�� ���*��l뼠$k�XD����.U��m�F��*X���1,�揧�+�U��p[87}��_�8�N�}��!�5��Џ�&�aL��%�Ht��7�Sf�&�&l<7�@s�:�>\�g��
̈́�yp�C�,T$�n��P���ug��F:�B�q��J����j�G,7����r�7[�@H%��փ��Kc�p�nJ���X�v��xT˗������bR.#Mg;'�h"�w
��| �yQ�@���>_�q�*��Y��w�?��~�H��r��=:���}'!*� :�T�MuC��4�=���B4X����4�Z�>M�Z=Z��_���<��a)�-�3����o{�[�Xij@�8I4q��y�EӒ7���ĸt#������o+�����"H�B��\D�Y��\��Q�_OuP�e�G)   s�Hm����*+�o�J��2�J��q��<rPNs?��p[�_Jl�hM���$�	ɛ�dL­�0%Rq&�8�"V/āNwPW���:���;dJI�+�g���'t9�,�d��x
q�gq"  �9A�MM�Amh�L ��꺎Nfđ�U+�$�ND�8������s�!V6��_�aa��;4sY�S2(��Bj�?�"Cy���nL3�gGqc���~KbM�����
`\G��"S����dLJ��˘�~nm/C���N�"}j��KHBX'(>��f+� ���2�) ��mi��^A��Q��Oh�mdMB�/���,���ܣ+`����<��n��̽E���9Ņè�<o�����[���o���v�5�ǖ���p�w�'K
��_�/C�;�2���4	���L�e6�����`�u�l��>!�`�B���G�q�U��U�	����� �R�eO��_�|�Q����yEHE90:�>~6����|`��]i�C�x�
�	rw�==��6�-{��i��~ٮ��+�}�l׬Z�uc��ݗnt�*>ًs�ʍ*[<_|X��<�q�)=�o!lfs���0�H�j�/g��6�Bّ����t�z9��S��w�z�]��l�����}�/�.פ0v�i��2��E/Q9e�5��t����N�(���|���ӓ%��K�>t7o����d�C�.�B�a}�0�
�>HӨ�E�~��/�!Ǵ1����W��i
d��o�Z>�`�鉌kFe���~�wl��,��mo'G�?�d���I��Q¨�(�\�\��N��=�w�<����
++2ۡMQ��W�!*Ҹ=�Yc��X�)K�ųgZ5��ǜ�H��Aʕ�KlI9�^VJ�Bq�&��s�6��r��h1�U���)�hb���Eg��c%0Rb�{���+�b��d�X83~$L94������Hze"Y�im��êJ�wg�j���d����$+�{/bx�*�"{�X,���$����Y��Ԏ��GN��\4���[ib	8�2Y;��/��o����0+�z�^$�'3H����@tn�ih�Y�1�T��n�W������Һ�'�c��Qd8�[$7w��9�ih��t���ͤBNb�O���c���s;(����\���v�� ����R��x+<ɃC�z'0���Coյ:H6��+ݓ�g�O�e~6���t搏�U�!
j�x4t]��)u�	��%��kV�VOB9�u!�#��'�K��0�6QS4����}�L�#uM�������Lv�j	��TW��>�q�5P�����P�w��ME�K��'G��ni������嚁��d
��J�61��o5y�# �ÛR����z?k*<���1�����S~'�7{B7���ۂb���!�����)IN^"��Z8�#.3k+=a}��ܢ����ya��JC-��?k#S�~�K��Q�
/�q��d���J~��e����-j��O�}� 	+k�đ�	]�w����@X��>iT'.��?JM�V,W?E1߉G(bT�AG�|L;$�s�n������h'���AY���]ifc����#��3J�?v#�DY��<=r$�A�
������x8mC)Oq���y<��'�T��S8YϿ�'���[e��?�Y�Y1�����'ퟃ���1��ġ�MAF#��6췐� �r�a�Վ�6�[-r��1��Z��Z��f{�m�Sރ|�3ܳ�G��J�'h��-z��o]·a�B�#�[�(��/]����Tٸ!�t�)uuկ�16~��g���?7�Լ���4�<~U9{2����}�]j�9|�p]'ߧ5��\ϭ��l4�)K��i���z�B$���<a�W$�w���#�n����#� ˡ�@|8�ẉ��ъ�χa�@��E���͎��bEO߂�0��>����P�!�C�
ȸ'J@�]���_%��oi
�M'ug�<��D4��?h<���4~o�1qL��&vZ�P���L �p}|Il�/�>%8��oR�&4��Fni������+Ho�%On>,���S�K�B�f�Tz���vt�0U}��}�ȁS����.�峱�/7F��`^O�k��� Et���)�kϭ�x�o����K3�����B]�����T]���y�T �D��q6@�n������o�/�&O0{�я\��+ao����Wy=��M�KīĀ�h�t<��vo�4�@Ā�r��O�:��] ���Tk���� j����e��X�B����gC�RL\b���0Z�G��!B����A��n���0hߔ6M�Y���>���D�2���%L�t/�=���^Lj������L�����O������+��'�k�L0� �q�eJ�ŕg��&�9��	����)�ߣ�s��7^�IWv�/!Vi۸]�Hj����1��n[�vj��� Ú�+|S0K��Z
���2���>��L���������nXX���QYn(���V�"�6����Ċi�o��5�'&RM0jX٦���s�C��K���5��K�)�#��[��Z2�Q�Ey�+S�C��P�D�8�B��J>�X�"e|���+DfM��9 ]sJW����	p,�aJ��Ġm̥X��F�U��P��S8A�}p���O6
�;B$���i�qSJ�c��S���+�'��~��$��;�(6�P��U���I̵�<��/��;^aa��,U�';wѡLzX�s�mv�e�W���{^J�W+�ٙltM��w���O�����7(�i�rOk�=�\]���)��f,~��Nleoq\L�U�K���b���X��*=+����?���� Qpz�X3�ق1���F�O�{���F0� h �Qbfl.Q�oQM��\�8l�(~��Jl*�J�'�'�H7:/0t���A���(I� �V���g�ڗOC{5�@<���M^=_$�U����6E�w����Ŧ������i�j�{��	��S���H{Ew��CQjb��9�-r}�.~Sq�� t�^��{�����]X�/<-�p��H��� '2���� �o�K��?���T�Z{�Ӿ�݆2�,%=QR���;�&��?`��-�=W�a���&���:��g�*����ЉB�\#�z�[��C���;}�J��'���� =��)9��}Ӗ|h����^���Q���X�E��y��9�)�G�Q,��$9�W�b��D�Iی��`O}m����b�ﮇ� ���G7F���Z�L��6i{|�i��y4�Ḛ�݆&B��31������U=�w�٢��'D�Z��{Z^ax8��bQQ#�UP����1�jm�\��-���&�L����{���ڱ��9�;ה��C26 R~�k�5W-�Ur��c�'���x�n�~9~Y�\�]�z��~14Sջ���U�LC ��_���/�MO�_4�����6�x��1�a%J��� �J/	��$.J#�z�Z��A@CJ.\aLr���� . ��\����,f���s[F��c����D�+�;e��#(�S��~����`����B^h��%�%��ǰ����];��6@{�+�a���Ga��_�D��T$��$����,�z��o%�R��ϯmp-�v^[Koo^�y�������x�:�U߯U�g
'R� ӒOLI�g�4�s%!T�����Yd/�1�/��?�+g
u�YQ��Z�a����%�_Q;��?�dn!�*�ep �ס
s�&��_G/���MS��k�7<ۜH��2���ƶ��K���5����;�C�wW��K����rXϖ�k��[�����9��'�9
9�1g ���f$�bУ���=J�]�Z@B3v>βA� ~!����tThl%;	����_��-"��E=����cxυ?=n�0+2���AH���zJ�����q�f�|��:�Ju����wXz��mO�b��������ͪ��ϻ-���棻��}^��Aim$U1'�<�y�8����d�ljG����i�B:%`K�Z��3�q�h�p�����TT�ۙ��],-���e�����;���׌aEwCX��~�ڞ�j>�������`3]%��uD�kQ��F���:�*�j��y��7�N�	�X.�/J}m=ԌՉ.����a�hE�����bw���]���`�,���3Hx��e�7�5�e�5f�s*�e:��)�K�#q����u���Ť��ib^��>��g�a�7M����G��n�o剛xK��l$��`�g~�L�o��}��c�$Ƚվ>{�3�'�T`��Q��y�hڧC ���}�
-71r�bң�*�_���]���&��H1����<�U��K��@{ ��c�����!���	X���g2��F���jC/3�H�/�\@M1�T��ơ�{3�cD��:�������D��vGq�ʘ�ɐ���]7����� Cԝs�0I�)�A�-�������I1���' I@)�1a�3�P�?R,N�[�����f�,@]�b	7.Q�n�#��]^��X4���ti�kX�X����}���=Ѽ��̚��M��D��Zx���W\3�:+6v��0�=-CrM>LD�y$�K�{/�_�1m~��T�������>�^�A�h�*Q�<�e�'C=m6+e�R���{�{N���X�H�Z��M�M��OEU�&�nL'�|���uj�UˬKT������$�ijr��r�|�g�u-Р��4N��uiNU��x7�V!]���I��,���!��J>{�*��ƯM� �W
��`���T٢���1��H�	T����ػ����O�8��$�Y�KT7��eG�(p�6���G��f���6��_D�!��������
��)��k�]�f����Aw:�e�$�P���mNn周&���(9yw�0�A�b��%�*����,���Ndl&� 9��ŃW(�)���ƒ�O�V/>�7nWq^��7 �+�צ����t�D�����Vg�6f<���������ໜ�ĥV�L������(L�V��(�/��\�&���_n���"�)�[�>�q��D��堃e�2���^��#?�~H#�����1�i�UԙZӶJ�HĎ�/�h�\��e���������Y$�}�,�6��l˼9k�� ���T�U�? bߐ�6{�.��x�͑�95l 4�mീ�B0�o�1ꅉ�%cL'��B~7:�*�:�ϝF&p���PJn���B�i�ԥ�j��X���遌�d�o�������@;6��u�π������6N������|r��{3u8;�S��Gsq��,L2�}Κh��
!��O�z���Grs����L������
+B��x�J�7İ�g=�E�k<5*��H��k!� `K��Q����Yɹ�޸����C��y\�VIA��$���X��� =b���5
:�i/��șE�F�*����p���+�;��W��ၥ�����X��,vN
jB�|~R���1��e f��_̐�|%��V(���z�v��e�po���>��H'6�ڎ�g>�M��d%W���f_n+��� ����/ؤ_�������p���Q0�Ř�i@8���K_��IG�~j�^�1Lc�bx�"xV����D�~L�P����%�ч�PE�;�T�������S�������� ��[�7�R��/ÏG�ǁo�C�R
��;fC4�_\ڣO��l����ݚ�����>��e��=�ߺi�#��B���F��D7�1�Gў&�VPB{�)�ۛFtD�Jj�ڇ�%���A��ɓC�a���V�`]�H������0&\I~���h��#2|�	܏J�j�]����41�L\�2��x�Ƨ�i z��{t��؜�Ȅvڏ����yC6k�~�Kg�D����[Tp�(V K��+SӁ��?G��VJ&���Dm�b� ���gjZ�9Ze�}O�m��&�]'��l����lUY�� ��E:��	�1')�/u-Q1a���M�z����^� >�o.L��0��$65�@Ic��Z�m��;s|�_����ڬwP�t���UPmd�_�
D#�~o���j���t+����ޣ�U_'�t��/�M��� ����ⷂ�n�r���'��
@B ?� w6��%lI�<�k�A7x=��AɥB_U݄�� v����9��O��T2F�"�&F�k��r�Z���#o���/�<��r���R9χ(�C�T�%����J�_�sۀŢ�`��$wc�!w���w��H��Il{1���%��k�ⅻ��`R�^-�cL�k�ر��[��\��T�G���JGK$^��l���F����*:���-�v��+c'	.�XUbvͺ�I�;�Q���u���/R�0	�5f���'�~~�n����Vm��A�=�ELW~�k���R'�aX�*��^8M���oMR���G�]2#�&�9�mn`Lk�[�Va�ƿ�%A���̺F���܇A�oJ���:����h0�b�_n�ͻ�bi?ǾD�����?�Z����s���E(j�H���>�@*9o��RY��Ҋ�w�v��}������Hv�6�X�E��8
��Wk��ѣ�N-գ@c*�2��
����E��w���1�{,f��b��\���Sԋ�4���9��`4���>�B�W��r�Cr�$-�����6Oۮ���LH/v�H�g-��N~j~� �'/���{Ϛ~���#�����E|z��Y�뫟KkխW+�Z��
)Eu܁��g%���fD¯`���~�Sy��TD])��Kr�Kf�],�g��m�[R4�dM�[(L����Lc�Go������d���]��~OA���qb�\"[E\a��:�hDZ��OI�;��c�4����6hm�-�'�,uɎ�	��m�N��48F䫣��hNgcҾ1��[Ey�C~�� ��PPrR��|�)j�f�a|�/�4�
���0)=f��RuEW�u?���nC�i ���<׆���P_�V�^Խ%�\E�v9P�I�����y͒�~�]�̐Ǎ_I,��dH��H{_�}���FR:1y+�<(��x�7�����		?�	�{�y���4a(�O�U�^*�F��c��0��a�G�en݂��K����L���G0�q� ������e�NϜ�xD,�Qb�H�!f&5 p�S,���E4V:��vx|�zf��(��[Qb�wLU>a����0l��_�mt���*��n0>R���8���*W[��?1��j��/�xC���,6o�+7�ܳƹ�`������-����C2A/���=d}��|�o0	��f�+`��N�?��)����x�J`�89J��r|�>���5@���4���rڙA�fU�l�i�'Fˈ�,�s�s��8�����)S�����O�q��-�Wb/��8o�i3,��[|�+"��=���I�+	΋c�$�iā������0�v/�zߡ=�ea�
%l�v�����y?�$��\�r�(5�=�,	 Q<��`�n�yCv�Q�NjZ.�W�=:k�G��
����˘���&�9����\��'���yF�D �
 N^&�3�iv�E�a�)����WՏI� �:���'������M��B�.Ƒ���S_Z��ǎ�u�r_1Z�AQ��67"у?�>��ǐ�0Ӿ�(��8�ۂ\���ڲϼi.�U�,�{�$$���	���t�= }/ �QZe;�r0P�u��F�(��R��7"�#�����;2�/�%�t�έ�d��!/y"�j=R��-�s3mɴb4��nC�IB+��Į|3�Yb+l�'!��a9.}��^�\~����g���tk��M4u��I�i�J���T���f�C	t�h��=K}���K���=4�s��q8��`Eb����\s�-�@:��9�X{z�w�����U������w���<��$�{�Ճ1l��thG��'�+À,��:C�%�Q�:z����i���v�L����_�D��d�~��[��,���o�8g����ur:��
[՝�>Ͻ>�0�o��ud�ҞQm�G?�)�?��Q�D��^Rv�.����@�X-~˻(��D�!���L�SزsT���s�@�����eC�^��;e��?I�M�$�}�Ҡ\��W�+	���'w+	8�H�t�B�!Ѐ@=o�G��r��4�ڈ��I[lf.R���[r��l���D��i��{M�Ëܕ�;���YR�<JN�J3��ć�������3y���|j'�(9���=d+:���$�*j��ZN�#�9k��R�5�!c 9���
���A�l�7;KȻ� b
��3U�y�6Wɴ
�{��bgyep�H��Y�,s�a*rA�↬a9���,���G�<hsjF�\�߾��9vU�҅�4�|����Ǩ�� '��K�>{�\k�؀�@��i�S�A<�7�u��J�!�v$Ñ�:�ǌj��%'���;<ph�#�>���ON�0���@�1}�ݝ�������11�)�dd"��O�QP������;�4RCpOꅙX=��ɒV�,'�Ts��qN�M 7ʿ�Lֺ����G}���'X$ra+[�V�2������5`Bpw�Uۤa����Ț�'kzr��ƍ�?ߐ��_�VN:���wO���N�J���|��E��e��Z�W;O�D�1!%�,\�M�y�����^��*G�B�?:q�?��a:(<��k���!�޻n+%�>��/�(A`�� i���> HVR����yi%���h�tͤ(Cڅ��,�)oex�b��T 2ͧ�;�<�7mM�}�ڛk�l��E ��OC�[�Y��U�<k��2�{s5�'���1���6��#=ð�s��d/A\M�?W��PR�M����p�j�hM ���im����C��K�aAK�	���K��\2�1�ot�Yc���D
���k��,5��dzv���ƻ�8D�3\�~���.�r�5&4s��Ar��e�n���������1����L��F�<�zA0��c����Q���.�K�f���H�̓���_3�8�V��:R�3X��b@������ͧ���~U�C�2G�u쵙����� �gޱ.�M�XL�r�a�Ԧ�{�Qg���Gr�ށR���T�e�I�����Hkt�����Zf!26���\�������0 ��KF6�*���9�b-���;�: ��[�g����X��:bw�p]���u��2'����䕹��R�=�"%q���p5}����m�v-����;z��Y+�-(�-+�	�SH��m�-[o��"b�5jB�tQy�%*�8qT��w�k�g.���$�Q����Fa�m��ܙ�
9��!%~ƹr=-�!6�FV\L����	jJײށ�o����՟�d��p�&y�\���Vl��~E�Ş��Ak�����Ox+A�rɍ4P�^�#�0yo�;HrgO��n�!�?"�ӂXk⭓;�e��ue��F�/��j��?��xEhʉ�L�G��,�b%�gx̦�+�2�w�R7[r��>�	-7z%85��n�r$��
��h�������I��}-�𿃙0��&�^�)YKFFO��.��n�:"��g1�q�0G4B�@���巃�31A��`�>p3* ϼȖ�쟦@2�w�h. $�]W���!�2���E6_��8רx����Hu Ó!���������<J��v��]X��5kC^F��Q�9m�-���ˀ+�\F��G �L,k��	�m����+G����#��>� 
����R��Qj#��M�R���Ռ��2�@�ߨ��T����Qu�X��s���[�A�r��ؿ{aH���,���c�`v�p��6���&�/ڊt-���Í!Vj��Q��<yJ�����|X臧>{rz('{�C=���]���cDL�3ٚ� �j��)��E��%�S?��@>���S`�t�PtѾ9�ਲ����e����C+r�5qTh�~%�q֪+� �|f�UI�ث����������c��y|��XX����+�ER�1ֻǶ�����^�4��	�V�J�
b��J��e��򨹠Rd/*�!��[���[���'�@�]���)��Mu���3ҷ����s�Ж��1*3��4(ACwdi�Ѥcl��&� j�F9X��c���op��5u����C�O�8���g�g���W�FW^�ȨЩ<͹��X+���miV@os���; ǳS�=*����/k���,�O�X�?���Ϫ} ��T��&�|�7;�?��/#�V���Fxv0�Gb�YW5�J���&�7�ݩ͸�[��#�%���=�L�:����J��������u�(ם��Q�P������Qǌe�����:$�\fX�C�_{p��&#y0%���j��}�(EB�=����]J�ͥ�\�Ua?�VNU�j����ϰ��C\	�q��������i؄�E	g���#�(L��Bym�:�`������J��<?�(��O��x��x�R��l��q�{�b�&W���c�
�9���OeGX�
������t.hS������>�D�6��f.�!��I:�;�v�^��ur'��o���DΊI���U�G�u��v�ŵ�&$�g$+����NO��a�F*I�p&6(�G/_�B0�P~��JD�$pєE?q0@Z\��X*3�86��C�l�>������N��-��LL�����'��jeS�}2O����-�:[��2��e8�ž��0l�t��zH-�B�L3��!���pn6n��l8��
::=L|�t"h�M2q�M�jN�`�����%��^��h�*4���2��vb��}����C|��U��a~X�~�x�RJ\V]�muK��W�'�-	_J/������ef$Ƶ7�����w�A� 𸜒�0��\cT�>� ��TKw�!de����P�du�J�;J'Pyl���������|�
�����P�__|Y��RϺ��Q1��+�又�N�q���!ڪ~N%*?[��4�$S�h�s	���m`H�'�q��!}stc���!ɨ'�?H=뱫���±�3��|�?OR9zH`9�~3����`	��뻺�kC��f������q2��=
��M셾��<�
�@��%2|4�Y��f�-�7i���p��YQr8�:����eF�E����?!s��D�I7�ߚ]?E�x���)�^�FE!ܷ��p�N��*aWk!~��)�!4���_��Fpr���n̔���31��6��i��2"�R�#��
�b��ku#��AH�~,���p*�._}ȸ�1�x�e�(6=�čӼ'�9W-�Ɇ�禅$�a�l�Í�蜟�R "T�)�! �p[J���\���=ّ77z���ڧ�'���?��ISQ��N�j�N�<b6���'���q�G�ח���,��+�H��1\'�@z�}�}�%-�\x�n
qŚ}�<l��?'�0'�w�d~4������j���5b�{�|u��6�,鿸(;�O[����v��H��`��3�?�u���X{Q3��ϲNZU��{�1�B��9T����%��S9Y������n},)7��+@�:����+���Rj���j$�N!T;z�I��]L���'z���z�B�_��Z�E�����Ċ�}�`}��,�Ɯ��H�J�~���U�@�'
���+m�'����2l�1/��G0TW>��U ��ӕsl2�1��[.��9iEl,��r�9�P�"ebN�9=�h@�xIDv"�.:x)��'i��ι�)�)rz���kӀ�u���7�m4{����W��R�����̓(	C	q~`8,�=b&�9Wv���Q��u62$Zy��Vi��G�3->��VMPY*pLm,7p���V@�2ԭ�[en�����xt�\6���쬾�����V�o#�M(.��O;�Nt�S=�tұ��:T��L�ʂ���6�g̦9���F�'�+Y;wЖ0�&��hg/�a�q��3u�:{��Y�D(�O@N���	;S�׾�
����R@{&X���CRvD4p���j�V �Q:��u�}<���kk�QC�8L�[쮣N�Y��d��c�+U+~ʦF�_�K���/��6d�y��(�[�g��TN�o��z���^D�f�� �S�MJ�f��5�R���M)(Q��Z<��u7ak-w�������"ז��꧸�v!/�߇�rӳF���SBG��y�0�G��Z�7y?�q���Y4�u�׌���:h��)��y�h�L~�\����Z����Y��#{J���r�ߔ`��RW�g��H�0��va���_�/*�籄�<�)|��`RQ���H�M5	�����3�ʁ�`d׏\��h[�1ט܄�b�ʑ;���w�O�E1�v����o���y��E�M�J�Ԥ�C#��H!1c�S����-p����@!����tߤ��DVʉ�)���E[�ZK�:Fɰ�v�>�Wm�+��e?�V-P::Js�,ihێ�"���5yʐ#��x�b_����)*w�'h�-�`W�@1i��.c�Y�W��@��٫�Qi�\��Q���U�1Ee
������p�t$�d���$N|C]":t��q`eXW������m��7��{�v�|Bxo���Al�.�9���ʂ3��Ҡ(?��T3�y��f��T	���B|��m�p�������:�'��-�y�!#��������h�^��e0%m;^��<s���+�����I��������F��BR{��)Ƀ*~D��Lz�=���Y���H@��`��#�:oH	A�h���oj�:�k�"7��I�3n�.�g�f���T��I�<|�|��[DD��;-I����h�_���
�NJ�kG),�c�:�o�1���׺x؊d�zL}�A|���I�ܺa���������6�A>xU�3B��20Vw��/`�sU�����I�<_A�|�=���A�G���O��B���(�G �Wt��儇JK�Pѝ��#	�JCY/
ML��[�^�-���(�_&�C�*6��2#���%�*�g0$�R���;�{6�dC΍P��.e�n��"u�
e"?t�2�7E)4qOr�=`�����)���W�m���݌����E�;L}����_���*�R/������nΛ����W�G�~�W�����F�-��[�e%���x||4,C�V�/`�����n富�@�B���u�J����Ol�y�i��Ql-va�`u3�����Zm�����B)9�%����XN=��X5�\DkǸ�_���~̢#R&�̭�qn?e�G/	���U�7!�h/tCr��?~�����5'`���p��G��
#�ι��|��A���ĬoQ�����(�J�hL&�Vi*��Ж�F*���sb�9'Q�?�𜙍nK��� �ҹ# ( �|:�w`�}>=�o6��vk�������ML�
��2��0 g�ᐳ���UQ�,��<T�:� ̝�V��y��Y�eZy�G�C���xP�^�b��Q�dt�(�ő�2���c��6�f]s��u�I�B?�eda	%������K���IK�od����'��c+�:���?��@��|:"�R��J��cs�n�e
G].SS�W�B�����D�d���((M��b� �/C�ЌBn`x�Xۗ9u��D'�\�����7)XW�{͐�(��0���,a���苕�,#^� ĭ�P+e��b3�J�zI��EF����g$X�Һ�	!R�n��1���N����^݌e�A�j2<H��Jy�õ�G#�q��PpYe�#���_��>.��e
�gE*+E�����h<�+nr�ܽ��UN��+����:���>�6�F�`��=�|-��H��t��J��v ��Um��b���\�)�M�*�b�~��90Tq{����K����qO�詰l8ri*N������es!}F�XcY��������v����v:y��q͡�,���aHF�"�6��R{�p�MT��`%����QՓ�χ��M�ʨ�_G\Ϣ{Q����'��~���b�zjM~o���>w�]���<ZR잿�\{�8`��S\wr�1�K3�yB���԰��~�h��+\7p�<g^ �ֵ+Y�2��wB��I\�v��x��<`�@H�f��G�^�����7���vdb��1X�s��k'<�ϧ� �p���\z��]%�B���le��4d�rءS���o�Ną����p��|~��R<�ټ�-��B\�T���uIu��s���t;쩢*�Z�Q����[}��p!��as�	�'b6��t��(�}��+5���6���L���g\��A�2s�7��VC$�Ij�g���7g�e�����5K�w-*�Q�g[�X��9�k��)���xwK��#��c~'�H�H��4r1��"掌���9=�L4+#[fJ�)�n$��M2�D$��JQ{[�m�1��J�Qǽ����>'M�]4q�Y6 ����0��K ���������E�#�p�Y��1�F�ʵ��Ԉ�(�����.�_�~��D�����ۄ�R�a�G� ����껝~7��k����L�+������Cz�ڼ�2���a��	�]��~����JH���t\k&��nP�U���G�M�0�� ��[�[:�m��.�y��O�k�\V<�T
�օ�$A��X.~vkՙ�:&�
 2D|9|��=s���Y�Q�HA��y|����5�'&띔S1���op7ڳ�xU�1,7�=k�hs����:ǾC�"���R9�RN��0��	�+�t=���ս'>�����V���IAW�*�Й�	{�1p��_�z~�]�m~��ܔb�q��]E�j5��Ć���]pѿ�>��A;wsa=�K���\EDgҮ�%Oݩw�e�%�X��Ǆy��B��w/=�&BZvbޕ�;E�R�{?nd�Eو�|mY���hM\��� pwf�Z"�_�`����0����@��;�8������� p*��@�l��^-�V����H�f�;1֡\�WF��&̜sk�c_� ��pG���+��H`���j�W�g�ɡ7�PŝfuUs��!�j����n�s����S�8�e��u=�X̘'�z?r3hh[���/�i��2��;Շ�9�����jv3A�̤][��a��u^O�X�VDil��t�hK��˷�o�粫S6���|���{l����b��Q�R�w^ݔ`KN=Aq��K}Wa��Gcj��FC?hk60�@K�fzqKY��A�|�W���Wz4���]<���yd�J.������Ζ�i�6���D�J����9ii�����	�D�I}�̧�H�Z�MDF#�{d�a77�u���L�UC�~U�Rtkr�O�'���2(N�H���E$�m��43Ӂ2P�$�7%��x�h����!l_��b+d���e,[������~�q����/İ�ڈ㔴�$�R�%��/����Gm.Y����jS���?�d�U��Ab2�4��g��_Z� �>ĵc;,�OW.W"�C�/�.L�lt��)7=gSH�x�d=���0�� ��2уO�$/f����R��
�.�ƒ���K����"(�k��C��a���D�u^BAjf�5���"+���]жֱtT�	���m�џd~�Iv�!K���]c��H|�O5�g�)S���-zNu��9g[b�/7��I�qg��j�r�4��q��u/��]�'�ǚ���L8�Tk�5�3���*gH�4�ԤP�*!8R&�ш��O�=�`�	�/����Yϫ��g�1����i,�W�)��$	�G��Aȁ�x���;+���_"���m�\܈�r_��I𦑧��We�Ĩ�ʝ^��'^�Ƌ.�ͭ��e�a�
�^��C�0�a��6&��]S����F�]�(z��l���l��_\���;�t�v��9�z���
��.��0k��i���g��_�~)�&������v�Ń)5�A�l�JhbF�>��b�?�q���c���É+:0�lY��0�(�Y��o�H�*k���gm.��Y�_2���mV�I;kV�[����`l�Ic�b����aX�G���iZ�%��:@�j�--k��5�f�y���O���$7�&��	"����gQ�����-�Y�	��]`g-��6��V�P^����+�Ю[#�~f�-�'���=1�x��说��'�_�L�-�6�P�J�Rz�(�c�}E-�C�Ù��9H��>F	��^��n�-K�XQ�|�ۉ�/�Z�#�k���r�C:N� !$>��ޟ��1�s`T%�~�0��rz��i7��i��Yp�G���z� Jw@9#Ed���8M1��ܺ
�5YDrR��_\�.�J�(,	E5���Z�vC�lH$�~�f+Qw�;-�~z\b�a����ϭ�/�m��^G7U��`���$�L,�u���^�ƞ�?�cu�G�!�-#`_aC{ߎ��b|�����+	���Oߟ��]�2(���U������RA�Nŗ����*����%�J��l�,�E&<�oNt��=��X	/q����M�k�*���s��3N����H� F��gI����F�ً��-��BJ����MŔA�.���n��F�~k�$\�1�<X�R��5���D�\���ު�X��Od�������Q#6ɝ��)�P[=�F�#{d�޴��b
V	��!|��ЖS=�b>�;��[_� <Z;�M��m��C�r�/q��i�DH-�S�0j?�.�6�����.���cJ��A�<�>�S��<�v3/0T,iq޹	��<_,O�����2�oD&^ ��";  t�~��R�O�8��F����Dt^���s��jj\�Z���a���fLg5Q�y_�z�1�Me;�r��i��Fjhs����l�����J�q��C75,K��#�|_գ���b^'k�7b�6)���~���,%_�<�W�F� fOp��S����B����?ETT����K] ik_����@�6��j���A1���p�U�Q�[���x��	�	/�&$������)��/�!�Q���R�v1{m�3m��H!kٛ�������f�=����<0fn'w:c�p@�Z+Ҧ겘�{7FufB���a$fO��������qKl�"Lg����|<E������Z_)+�c�0��z�n� &N��P&/,..j�ם�ff�A�}��#42n��3�$,�	e~�|�5�n.k�� Qx���\��ҁH�Ll�ԓ�"=8�O~��	�1D��dV]ج2t�� �d�N��rA�+�{*Ӌm�)}��*���䊃^��[����/��dr��X��*ܦB r
���e���L��N#��ph"�x���9�,oy��������j #��q����*? �M F��k�mo���S�:潘!�!'}���i�h1Q��{���4�N���&�$GI�.U4@xM����s���,I�#��eEa|��y
ә�e����_�>n��2̳�~4;��)%���3����C����okE%-��c��T���%�CP\�KVr���d�-�X�QF_zZm�azާ�?��?��Ǩ��O��*E>b�VU~&��}ǚ�\﹣'M��"|bP��k*�RCc��]��*�,��bc�6V�c1�.%��t�N*�L�#n�+Ũ�J�RR<���l�N�d�5*��d��+"C2�{��3�["��*(�N{��zùǔ����U-�~z�Ƣ�fyb��{F��JW˫��Y�W�����̍<�h�	�t��-�4�^<X�5�0Ļ��3eШ�{`��»���:��Q�*�nH;���P&�}/���(�C5��P�����	�5i�M��7s�����M��J��t����w.z�yv��J:�AK����:�y��A^^0�2rbbא�oрW�H��(��r��@���q5�W��0+����'K�oXN��R�j��Y�v��3�Em�Y�V���x���I�p��< Gߤk,�LO�.7N�5�NԨ�� gK^\���Dnz�o.ևWi׉Pέ�ڂ0�<2+z�l~5��߆���K���<q�+�(����Y�wd��`�i0Ý��oxi�!/L��ۡ�.�늭m�/�!M�"��]+�0���(9�xї�.�?ty��ŷ�#��1�Xo���p���S����U�˧�y^����'��v���
��'0SI�\]�0@�B���v�Z-a1>�SN5zcС�ޯ�jm�{s�2X�F�GVa�ad����0N;Y氼�'g��Z�Ͼ�s�/�98-$�5�9ɕcCӞ�!�%�訟D�>y}+�<D����!���y,"8�v��'fCZe���<3�8Σ4�q⛦X��>N���3�t���	G`��.o��̊��) ��|&�7��|��;�D��t�A�u�vq?�x�p��w�L�4�ac9���D{z19d�Vz���܋b�c�-y���߇�	:�]l�_��z�N�您M�1M&���!hU�~(\�o�~�Y�]Nf~0�m�.3�f�e�I���ەX	��K,���fcy������=s�Ӱ���a��Q����\y�"Qm9���zHQ��� o�?��2�7��/QC��ؼ�%�{���҆��c���dxu\��⹊4��l8���)�(o��ݤ\K��&������Hx3�d9�	�4\jCQ�!L���`��&,��AC5W+)��ݼ	a���L}��	��(
���x	2���-ۮu��\p�
�d<L"��D����V�5�yY�w��`������@s �ع/Z|�A�6ub�&@$ʘ�H^����iA\/�V2��<}[_����2��J(�ʐF�q� ��-�9 Z5���i�_�f��������K�4d��j�)�����`,�5�p}��@�Y���AX#��z�<N[c(�լ^]^�vl;�Ңf�6ݤD��命�0=�����H^��,��������fb��C��s@]�đ�(Usd«�M�3�9s��%ռ b��ڕ�7��� Y80D;�7��o�<�UB$�,9tG�6z��`W3�Dʵ�j�r� \�s&a����7 �_�e�P~��#p�^�����]+��;i�W 2�l��rJ�
?n��|�LU��y�a>��|&_��R�������颟�k�5�O�mBp�\�N|��0+���v���)��'��9ѩI*�W�]�%�Msx�T<��èIj�w�M����y.)[-|�@�:hX̂�ˌGT�@x��?T��;��U�����A�Rb��V��3���y�
�y�r�a�sYP�6
t�m\|�8��ǘE��-	,@�('?%���^�ؒܣ)�Ɉ5�)iV���CJ�jI��u,���	�����Gh*�=��j�"���,Uo�_0��qD1�.&���2HT��6.�OE��gY�}4�o�ک�H�{QQ�>WGwn��@�e�Z�=҄z�efH����7�f|�����K����"�l}K-Ư�c�aW:��������!�'{�^��A�a��xW��LPٹ�����3i��b��r�D�������i��ײ�AA��M�w�_�S�'e�ZX���,Χ���`�A۫� Y#�(=0 
51��,,�La���K)�;f��B���%k8T	�؛�*�_����wI<�!���,W�;rϏ>��Nw�]6��dR�>hi�:?�Od���e����?3�ދ�^��d�˴���l)9˜ز��x"�C����
�w ��^x��"��߭�����eEjw�;���6�@y�&�YX�}�H����8��ͻ�ư�2!zya���[3h.�"���X��'�{v�D�V�c��Q
.Q���r�TFq[�Z{���C��v8d�×��agh�f$!Kn.�r���j[g4A�xl���[E�V�����$�3�P���26]:��k|)>W.��&l#�5��!�+|,���&�Z�-`.J��⾖	�hZU��b�k�@L��w �����_yʾ�s3��	�j���3Y �O�3����bA���
:��ǎ ,;�5��
�UM.�Vٙ�S�k�S+k3L��ͣ�8��F$h%����l�<�:&�.�qL�� H��Y���^ $���ё�yJ_�+�X����&C���]��NU�қ`���t"���_h.D�=��L` |GF���ј�ɝE1u8-���'`���x��=�ɉi��Wl�`,b���[�M��pg���v���VZ���aΈ�,Ͱ))Ы?���E8�:���$BI�LyO�O��f��8D�P�=G�Y�N�`XG>&gG	�䌢�?9�p�v=�-�M�����Y�p�e`aLt��N������m���v������	�{�j������� C�w�"��P	����^-�� �Z�I����f5fu�����L��ƙ2���m�T����q�l.#��쟋�r�s ]��$H�|���h(�_5�F'Z�Uxi8:ƚ��4O�a�&��Q�9D���@����M��x�Rm%*0F�,���?��"x�l=	)��(�~��*�	�R
��w�cӈ��s�u�at�9xǝ�_�`o.^ɮ�TH1e�f����v�a��pe�ꦾ��e�7�bi�p���D}�K+GL��G����h��E�w��d�8X�]Å��~���.���L��G��B�\N{x�#h���/$��`zxe��@��%���1b��~0e�l��օ�ҴH�^<��:����ֱ+j\4{�%��QA�K8^���^I*���U���̿Jp�Kݰ�v�ʨ�*˦y d>	�#\i� 
N��]�G]U���:V���ށ�I`V��龍�i��ʊY�FI��|��+�B����pZECV��]���8G�Ak`y�
�Wz���gݖ,!��yp �#4;�؆�vk�����@�l8Z~�PAu�'Nff�����N�p	����Y�v�<��t�{����m^�l_k'V;t�>�u��V�	�w���9����Ja�'	m�5k�ku��˸�&
����N��[Z�~�;=���b�����}�Y�d�:�'C..�f�e�
��	����y�Ǿ�����ݾ�S �������2�j��b��n��v�t��U��R)����u�*�q�ɚ��9c�
Z�W������c/_�O*��K �۞��_w�~ ������U')����A��Z$浔�DE�AS�i�"�?1?�Ȕ�d��oB�p����dVV{����5��2S��b�䇌Q˗�)]��z����\�"k�B�ղ.�wHH�@R�H�+@��AE/1��� �u	ʢ�T���9B��y�q�B��^���@���vU]�mb��] �J���o���*;m��U�Z���]��A��,5R&�p18��"[#fRP��3�1��#V�P:����~�׆�1�8�Ա� �~G!1\�:�2a�����m���&�n�Q"�.	��	�u�ڳ�KQR���W�Bәޞ�F�(�<��T��a���o���S�����.�c铳�2Bi"�����/�O��<��JQ��!35љ�xE�B#�QI���A�6�?��tSo��^V��^1��>������	z�XSY{�����`�gN?�r�"��(0��۴�5�8���%E(֛�z�ʌ�|��"yT�Z��J �3Ol���"Z�W��wy��p�j���*^q���w���q����������Ae�i3)@F��t�*�g�*�3��?v]12�y�"���)a�G]���e�o��9p�C��(�P���������j�3H�0�AH�N�_�X�YԄp-AT��[9�&���(h�մ��g�x��I��^�.�����~\s|�-�\nxKA�O�7����	��t(�5aXgkS�V~���o��}y�39�⢶Qm9���9�|l��?����(slņ�A��1��M:v�E�M��2o���~/��q���з��YZ�&�h��]�2���Ǌ�y �'��ʦcx��� tE���7p?��'9Æ\� ���Q�mTi�tX`q����:��0����<�v����)�R\n�BF���痙��k	~�s���b� +m�������P!��Y�7��}���P�7�\a@�X���R�gYV�){�q��!q��3��9�WcV�id�!jQ��aOy��;��-4G2~��ϼ�FO�VX)�dP�sO��D����y�>R�=�p��5�����ɳ�����ɪ�s%o:��>�
���j��ǣa�׋�qt�͹+��^�6�*(�Z��z(P�>�@�&F�쟉a�q��\0-�b�T�H8'?��TF��N�2��,���}�\��#���T��K��b_���� �����]D+����Hf�+e���&�v�^ �H����o�M��eb(P�*�P�;CV3�t�zdͣ( ��(�ʍ��wA;a�1�)R����p�v����1�iӌ�Y�R�A���� �V��B0��7�1�J0-�`�������H�	Ny��}^Q��"��8���������*$�X6XQ�j4��U���6x�k�-�Qڂ	@���O�g��M�0��c~k�Hş ���6�ZZ�L�u�����qyu��	�`)|)�op��?yd�&e�	H���=�����Z���.%J��I.�RYl�+���*0g�_��ˋ��a�U���	{��mv�㚐7<��g�������b��N��*�*�Dq
ݭ���Rqp��q.�'��X&�S�>�"T��n  &㜄��vv�G�#yɑʹ4�P�� ��>�p�%��Ï��?�����b[�i8vZ'���N�ag]#i��������C�3��[.70�4<�3��ַ&�$_����ʤ�[����S�j�����"A�z����
�yC��b��;,�*�C���77��ؖ��de���VL�,3��y���P���Ds4\�W�ҢDf�_�M�38X�o^�b	�bl��݋�L@}�	d�a�
�A�}����u$9��I�1�e]ّ�2��#=�$��G� ^C侼/>, H�F�By_������n}��EC���Z��[Z���N&~NRxV��<WI� ���!ڣ��9#���y�>�,/���F{��"�Ɉ�NZ�8�CB����4�O�=%����Z��.��n�i��r�7m��)[�P	����s}��s�|$�i
����������c*R�r�>~�d��讖�'���_���T��tOi��u:��NJJ�N<�Y5�*������7?[hm_�Q҂�¾���B�?��	��ؗ?W�s&0�C+���x{�A�M+���T��I��G;ADR�g[�����^9�z%J�ؚ~ţ�.|�ﬞb@�}��o�äJ�sI�Э�����*k��
�����V��S��ԮZ�ȍѪB�Z��L�kJ��5+�l�����|൒�Qv0J詩L��`�����:`H&�[(��9cbjQ�%������h�3R�&{?�fF�3�ݽ����	��6H*s�򨥷L�C��)ús�/��uK�9P�b�{w��Fr�o�xc̥ȿ�;��:�����Y����xD$e�6�� rru����`Z�V�'r��}����Gp�V������2��И�A(���
P�� �'�V��Y�IK���Z	e����z�T Җ��c��Ƨ�q3��Z�U4jR�t��"��S�C�v��YpLsY���'d��\`��|�vWt��J��(��!\B�:u���p0�e�����_t!�<��E*��.��t]O�nQF�^���H�\h�)W���Ab=@�6�"�r�4� ��C�lie��0��%?3�wy��y�BҸ �T�>%���ID&�&�n����'[����l���{�Vg.�	h_le�@xv���Y�=*�����6���_�A���v�t/Bߙ&BL�i࠼��55'N�!A��
�7���a�]��nOH��s�j���E.b��{�Lg��-J)G��8�r�Ѵ����<5�LOϔ`O����sP���d8ku\yr��l{�XJR��t]İ���y[��p�������t�mlt�k�c� ��t�oG�%gՑ�"���Y���C�O�[�}驤SQ*��3�MK���g!�#����6ɺUQ�$=+B5�>8Oqҗ�)W>R�W�R���"�Fp�`B�̷.�|\u��)|D|NPGT��+Ғ��'��\{�'��$����?�-���(��	Id_9�5E<*
6�D(���M��T@v�7z�bf�,ҘD�J�Kp�Ua���iqvo��H�D�i�c�:�7Ѕ��+�����2�UZ�_�x'�*Q/��
'��9"f��v�%��G����gI�iu�u�wd^9Zk6LVS��S�CR��c�\��_Kݢ�Ɨ�C"PŹ�Y:e
}^?�:��h�	�$]��5K�/�>P�����ҤeBSF7F7>>@G�?ԧ�$^+���R��ʈ�Q�{���2��{�����D�=~�%z����ާ��w㠵���	��F�@l�ψɃ7��y��&���6�V�����̛�G}b�G�q3b��cd�� ;��ǫ�$O�K�@��ϰY���>�X�'��o/C��,�8������T��K�*� ���Ze���%uzN�.��.�w���H�Cdz�CL/����]�|��;G�� �6���qa p�uJ_jT��g%��Ӟ���E4ߗ���U�z�]:�8�p�R�y�\#�s�!��c���I��"�t�^��Y4DD���Y)]�Pm�\�E
��E�hnι-]K!)���
��7L]���w#��S7-Kxr�Ҍ�lM�&��2vP�-#T|W�)tJ܉��'�K\�����݇Z��E�Azg@
�R��?�އ�&K)?�t�B�&_������˷�:u��v
�okIk��F�51V�p	�X��S�Y�l�#j����k�AE������NA�ц�&��2ř�+�+�D�)�q�xK�N�N�ݍ�Ƣ���/��Վ;m����4�k�΋c��7e�C�����4�K5��r�<�����K5y�����~]��>Qq`����۹��# �m��鼸G�\�A�!�����y��]���������%���P���(-���\�VA�x��]����������o����]y9�(�C����߲��G��\�����#����Stlp���貜�W��*�t�@%"(�Ґ]Վ��kq�>�5<J�Ь�d�&i�f��V;J&��27mùq�O�<V(Y��E��3	%�p������*͒�Xu󧨿F2��=����{���|�UʀM�@"�0�:�v~�%JR�Ւ\�`��F�	&�{�L�>�"��Q���S�B�w*���'���-h9��^RuO��{Ԡg�%��1ԗ��_�<���V���+Һe�	��ԙ��w�!��d�4��{M9���Ũw�
�}����i�����ZGUwM�34%K3%���f4�?\4�M[�<}`�1�`��7A���p����ݡ� E�we���	�
�&�cb��q3�����Z_���B>�p�J[����3-O�Lp2Q�W@t:]��3JhZ������9�:V�y�HAZ�6No8DL-�%S��:V����Xp��^;5��Wxh ��<�Ğ�XK����KL֮�߭c= ��$�-2�@�G��܊;��Ŝ"�y+��I_�t*2\�����D�\�ubM������% �P�G/%?��tq�#�9����%��$1�D{������!&2R9\ٽ�`�q�,��p��O׭���(-����,(o2հU�$!�?"޴gg�:�],�6*P�ϒ�Rb�.� �1�F{r�b���g{S;L_�<=���=��\��X�PH���ۂ�q[n7T�A�2+ĴS������W>��,I���'��)+]2��٭�0����XÆ m�1�閚!M�%quʫ�+N��y��"2����*��v��vCbhn$���<��}�C�j9��UPX�h�1��]�6By{j��*ֿg�I�v	��ZZ?±�%58�H���ȰY�]�!���k+��|��4�ɘ��ƿ1Z����ל?��1��+�D�F�!@�%%o'�j!�p8�6?9�Kq���&�lԼ�[l��w�UPV��$���V�
���z�n"��|�k#wr�+�:������0��n�j� �i���nW;^�ɥo��j���%#a[�U���`Nj���?e�Qd�n��F�2xzCQ��x
;񘆰Yi�4����<���5��a3dS��jB���`@�f�sP��:WQA�e-�a���Y�0Z��T�:Rx�i�gS0c���@�~��g�/Lx�����G�)��H��N��n����Q���)O�Jqm�^ͧ��J5Є�.�#,�8+MR,��q�%��"���ףT��\XxC������?y������# o��?�tzj2��ם��z�3�'ěk�DG�x��(p�P�(�$�Y�D�i� <3�� �R���d���Z��@(�P�1s��%ҡ�e�(���҂қ}[���5O�=p���9��ezꊡjxK��V@�b1�ۋ^t�?�j�2D�v��-��Fyq���9'��A`�>��w�O���|_i�	;�������u�.-Ya 5lbzԑ��E��s^d���k�T��*nc����A���� �+q����6�9�[��n(�����T��;6��t#D��fZI<x��ir��6�ͣ��
��a�ҵK�A�?�g�(@3G�tKX�\9��)W덍jG��^�2C���usmUH�Y��2�XE
Mg�)�w_k��ژ:N��<�J^GH1�q��5�YTJ��}��bɇ��lDM#X�L\��?o��z������W���_�������Xq��>M�m�G�1H�ݞ �jJK�m�� ���e^g����������@��e���/`�5�k��`)c�"�@��Q��L����íR^�x����� ��MD��ZǬ���6�RwG��(��)�~0�`��`���B� '����&<��ֆ�g1NƳ����o�c�~�L��-�'�h4��tg9Ɏ��+#��Jp���?Ňk�{�מ'\*B9�C�6\$.����n��ȵr!4�Y��~_�ʕF~L4��
��hĜbS|�݂K��'~�����\� XS����XE��	*�-Qqǜ���1�"3�aI�9 m�h�u�_9+�=��!sp�F�������=jQ/D྾����A��c+T�X}l��Z�a�RG,����y~��y�S�<��g�k�z*Yx�ճ�e�`�2՜<A�EW9� 3�<h(#�����H��s(��"�����a�M�q{��)��&��I&�c'wT)��Ɠ#�
&�~G�DbH��^yg�����}�����J;�Gq��і�\8�]TޗǛd���Mr@~@ڡ�hZ�6G��N�wyc�g��A������SX�������b�u�����٥t�vkEy��f�>`߀����]g� � h7�65N��L��W�8>u�����$\���b�]�XA����2	A�R�)�<d�����q~FK��N%��<�6J�?�a$�����wG��EdoKI�Ӯ�:?G����t��,�ȸ�apy�{��m�UW��]�Q2Ќt����C|
w�cp��JT�fM�j�WQ�@���t�:A�(�0w�g��0C4���{�)ǖ���Pw��Ŭ�J���
���n>z'`�f���1��ϸ�;C�Ъ�"�Ⱥ�f�����Ν�XXaޤ&����8.e�?� ����#�wi��5;#�cQ����I�3��6x��U�a�p�uR�U��)�:��Xm� !��>��t�g�'^�ͨ0C�)�,�K�xMqƖ��Mi�1pȷ��*C����fH��խ�����նn�
���R�$�kJ|��S�g65����&g�o�^4�0�W�����$����5��s������\������VP|p�� ��8דF��B~:t���Vݙ?�'Zr���D֊��4���Z{h:nvGgܘ+?ϲO�ujf=�R(A��X|���UH��X^��>��\qΎ����x�芳#\��(�tt�q���E�ȵ�c� i;hh��s�;;��ʖ��n�)&��I��j���4�ɡ�+�UA���B�ב�lsB,!��)��L
��#t�癞�E7|�sv1����r\
7MϞ7�"�g�n�/��]��)�� 6�d�3Hn�?k{)HSQ�8�p�Ü?(f�{=�IMt�Ϭ�G��*v#���Po�p��2ׄ��Z0-c�uN|��U�H.V�w1�O	�xq,f.��[��#Y�^�;p�_Ooi����qEc��!�`\���L����d���k��X�腅A�'��TŨZ������d�;��䌥L��;�>�9D��5�-z$���^��-�+q������Ωc-�.;���R�~���@���>vuL i�V6�Ye�\��φ�W�5	Cۈ_����*M��W1F�*��`��[��p�˸�_�S�sI<�+�$��g�J�}�s�/Ꮔ�O�H^�z��]�j@�Ә�����f���sI)�J_V��n$�e��7Xr�gW����-d�.��b���+3~�
����
U ��;d.H�,Ư��!=���X7b^�Ƃ\n4��i�Me�7B6Q6����#��_�nåY:���E���/��}J�`��N�Û�E��� J
D�x܋�%Ёf�V&���xH
e���;�&��VC�I���b���K�&��0�_�T-��Z�[q2b�@Pn�Ύ�R��V�r���M������A}� �2��7����j�T@�D�.ayBu��'l��������Q��(���ڂ�)���q6�H��O�/���Rl����ۋ{fD�%�|(Q��-���U�C����r�rf�_���Sŵa4���������5��I!(Ij>$oZ���>��2�Np���]7RzSo��/���C��@P��i��r_va�!���H?�N�T�U�Ml�W[�c�yԓ��x@>mu�M�Z�V�\`L3,��f&}��'t.��7o���/�x�eL�pCb�Y�O[��Cx�:R2�ϥ;B5�C�G���%v�0�+jKqh=ᒑ4D�2�,H1��E�0)�����[1�Й��$g��7ֆ���z��؝P�?徢�����*%|��'��^Y�e7���ݷ������	���Ƣ�Hְk�76�	4I�̉۞&/҇&V���_��L0<@����W_w'EL<q��C����t>Ku/R�/)_Ik5`3�V�+'|1$5.�O�S�$:�jy��ھC��]h�f��Չ'�ߕ3�&�O*���k�.r�8��M#96؇�j�Ӭ�u#a���j�[�9����2�͚���e�m����)!�@�@�۞�w"N3�Zn��x�����_�+&�_�9EX�Ro/�@5�)�W�Յ�������D�IK�+<���;Tx���@���!�w֦ZwH�������������Y��w���P�zj7?��ҏ���u��T��~���0���V��j;�<-�U�o����/M�V��u���!D�lm��"��[8�-3ҟUG�i$�*�$neV�Q׷1��c����D۱�Σ�����@M�?E�0}D���M�u�UCri�"=Y�:���w��p�d��(�Ʈ R��}���nZ?�����,�䍩WV+3�����{�w�I�����e9,�o�V>=�X슦�bw�C�A1�4��k(�m�^G)�ħ���TS.sA����I
���vh��3,^�I҄�FD5�6�:�TrImD�PĖ�ɶ�%=�hΜR�$�����U�DK��3k�la�Z.\cɈ}m:�k��P#�	C�����R���6?3��l$��<�iA�]��[!���y��P*i�*{���֟�L
qa��lN�H6��������n�ԇ�X����L��v�H5����=��C�h��5���s�1�H��~m� ����&�*�d	(z�p�ɓ������f��V?���[Mׯ��(���3��� C��;ߐq�.j��Z�m��q�����|L��m;���Y/T*�|r��z�;�5�D�:�2��hY���s�%�Ipp��!h�%%#�v:cQ��P��-n�vP�䢦D��Ёyƹc�36�1A��A�HX��������U�������?kPކ(*��cŞ`���5�=z�3M^�����#�oe	!ݘI]¢0��H𿨓}��C).�>'���fJ���f	�M�:Xz������9b:�Cmo�M�P���pm5^3��0,��}ڔ���ݔղL���t��+��@h�����J�m��Bg�S���'�*��x�%�7S� �DrQ9cW�+��`�a�l�:m\�asU�ք�|�QV�΍Pƈ���/	`����񑃮�s{5}��5�mU}_��ײE�
��.W��&�/�=M���N�����E��p�,r������I`����O���bS���į>�Qh�T0��d��r�u9�m�HX�ƅ9�B�x[�e�k�-0x�zW|4j��9�B$9���#k�׫ek+��6f����0,_��W���ل��H11_S�Ueط��P,�ZΜ��P-�t#Ef����r/e�}t}�kBb/M�&"Z>�&�N�t�qx�[��V�m�vA�S�J����`���Rf�(~��}w��"l}�j�l�*�><�||܂�� ��}2�裻|w�Ѡ�+��8�a���A2w�ۃ 6�wi2��r�bm��cY�������l�K}�z,���k�c*o&��4���
���U�����^�nm�??u�{���!� ��K繊�����ۓE��aê �2�k�r����qEԔUt��xȕTy0�7�f?@��M�_�kܥ�/���:Zٛ��'N��j����$r��5�UDP�*���q958����t~W�2����ѥ3��:_�;���1��ȥL���{z�0a��*��������dQY���Db
?�ke��7i�O3�U|��၎�D��A�2�:�x=���!�?�ܢQ�Z��|�#6����Z�+���χmVyG���=�w_�݌�ޕ�/�;i[��i��z�'��o��S��R�:�e?JE��`o$I�CA(]7��yi~���E��F
'%����eH��4�un��t���Xs�F-�\К���p{G��J���,]�2׭�ko�P�p��F9i��J+��3Ɯ� opn������r�������ZN�ze������vdKp&�p�u7RK,�H� ��x��w��6^M���%]5�����P�(�n�#�Y"^T�ӡ������I�!��M�P���ZC�dN]���k�kj����K���Ʉch_��l�c�̑Գc��}�^IG���E��𑘝�4�ȳ���K*P�5��M�K���t�͒���0Vݟ.Υ�*��oŒ<s�� �4[���͋�%�=�A���$3u9Q*6��v�)+���6�k���)-�*ԛ������\�A�����n��}��k�))����~�J�ZN2��܆ܖI.��GhO������B����w������\pn���� ��Ԙ�G�fK��,��L�T��׭>f7��kwR��z号���q��jy�h�\Z���r#] ���H������%��7 ZV�~�M�՞��RK��`JT�\�[VL��a;�"3 L*s�hd~m;�y?wS��VhC-���+��?�6iK�
�b���p<#�������˔�a�O!��xNo�X �;mǕ�`�aъЁ�h>1����"�0���[�r�J��!��i�	k�E���Xa̤	����c�8��?"�6�����#m�/�k	<U�^��&�Q�%�Q�`q("dg��U�SU��X�|���Մ|������M*�B9IP����$��ӧ
��'�a����C�@(F>��%㸝��"�iu!� ���E�Bˏ_l�V���B��,x�{����$�k:1�юA* ��F��ܳ������gL3���.�"D)�F{#F���*�H
O��Vf3�F�U�7g\"�Vwv�A��+bR*�OuIZ��4��;ʶZi�.���������Ǉ��V�l���%ϻs�f��6z��2�)0 ��uP�l�_ȵ� ��5��|��1�ӆh���Sh�s뵽��m��	�8�[B����:�é��ݞ ���(Y.�L_�$)���~���3���8�5 ��_�}&���ނ�Uw��.\(��>9V%*y����ܨ��?������|��?^������k�Y	��O��������@,��Έ���Vs��yď<;;T���8&�����m���yx �!Qn�ׄ�bj��♕��e���:����g�\�ƹ�U.�\6I ����)α�n#����B��كN��MNg���[N�P�g��}Y{X��
��O��S���ʬ@��*���wH��|�mNhޛ����&����<`#E�)G�K�|
�"���Q ��"�9=�����:6EoN,8���O����7E����D������w�_�d���HF��@�.}�z�����w�GLRؒ~l^������W���GnΩW:swI�ͯ!�C��G��� w���F-@���ŴT�n��-�cM��$c�w�o�tz*�h�UI������\�)��%W�2�3��P_�Ф���Y��ly�+�����,>����*�0�	'E�����0w��~Y�̈�iѭ��_�!����]?I�Nt��Y�*+aٺ�p0���H��z�K�4�8Qv�����2�/c����DuS3��>����t2���;ҲSh�T��>�K3��R+t�'���1U4�'Rl���p��45�q̩i�a�BP#���*c���������A���;9�b�v� 5��0*��!W�u�i�������x����w�ۜ�;I�tq������8��1ZS���e��Tt�!�	_^/K,.�C����[��S���m�Q�\ŋ��p� ��k���?����A�j����cB��&:&\\�&$���f�'�w� "z+>�滌ֵㅒ=S�	�� ��;f#�W�V�p����Q�u2O�A>\���b��xd��-�B����yܖ���f�=��i�*�8=k�3�kؔǷ$���i�`ĺ��@1�tU�h�-f�8;���n��Y����p��e��9Q]� ���@_=�c��p���z�p�,�3S�#0��	Is�p h"�Eo}�63�0��9&F([HuO��LF/Z�j��I��9|���ɼp.#�ǘ�A��>�{��X���4�ɔ�M$�HFc���}5�j��F7�g�7�۵��e���a,-�����uJb���,��R ˯gz`C2�i�;/�
��{x�U��`Vx� �}���I�=�Z��aаt&l���zɮ�zt����'i�n^H�gAf��_�s�	g@�TJQ3a�U�-.���_����̇Zү���vRo�|�۱�'s���}���n�|=%�����c���a�Ҿ�C�ۈQ�.�л3�?Z����Ȳ<*����X!V�{���+�A(��r�rv7Q����:�-#�X0��3�kvn<��Vcv�޴�����cHVmB�+'���T�C)�r.!�|R�����˺���'��~3��e���£�G�)h�o{4��ǈ���N*����tn��M��:����Vf��2������{�?9M���0`�M��`�c���^*������F`�4a�yt�we�&c��]/�����	+�u�ƈLA��5�r�F+b/Cz�[+k� ���S�~q����^f��nC,�{[L�<����H-��5gx ��Q��A���s�ą����$��vi����0�Egk.}���#g���퓀�� �1�AE����!V�Оt��I�a�5���]:��'Yo �u���}�}0�������]�j��m��$�ݏ�<ny�#S�8����Q�$OiU��>��"�:��;��.��xd���V��^�KL��d5�i�K�LoZVr+����EkU+��'&�e��1X�It�b	p��ڰ��ŷ��qJ��n��-������'B� 4�3�q�Q�3���A�$����9٩����XE��P"4�{�T@���m��L�<Փ�tUO��A��a���l�#&�r�G�
�$�[�zVҪ���6�'9{(c�n����HE�ݼ�c�^�PQڣ�~M�r����������ռyuq�r�t"IQ�"U���0��J��a��D�(���(�ѥW�_�"��N�*�)�R(߈H�d38s��-0��s���w�TT�c��~^W/j����q
��+X�(�s�qƭ�E슮s	�V���B�^�d���RL&��,����W��d� ��Ϲ�����5�!�8Ydn;D���,k���|U�n�*�=F����_Ԩ'�0�,F~���Fd�M���>g�o�k�����±���K/�kB���4�S�Nj�a����d��b�v7adu~���<�f໛sd�}��Q#�=��@����CP�Y�@'��� ��{� :Md>�x�����g��^�]�0��p���`&6c�B{�
U��q�Kb��{���?�H<�n�c;l0�ć���G":6V� u�]o�+lRP��y����[DTϑ)Q`�^��Z���#�>A�t�y29{Iz/����4�/m��	����K}����c�Jw,�O��t��_0�j����H�	���
s�jCKWQ�
�L����>>$"��g�����E������2�d�ڏ��6�!SV5	�aM���ֹ}��V�*�����ϋ�D�^�c�}%�3�0���F�`��<%����:<�Ml�_Sǉv��}�Sı�~ ��V�f��U\m|�}�B�sf�剿X)1s��y��t��@��n 1�B���C{��E�AXN�`�|��9��(�~�/��S4�^璞"�#�7�w|�/?4�_U���NQ%ƽ3���lJA���2���/iedUI��]T@q��])�	���o;�����6N�s�˳�mM� ��\
:�,���Z_����ҵ�k`0�N
hx�_M[��i�{؇��ލ��̂"x��F=�^'�����^�rr�= $���	C�ކ$�*zR�"�;:��]R):�yj�����;���>���m0�x��SLA��
�
�k,�4
��@cL�B2���(OY{#�Cy�V�=o�8s����&��*��/����٢ϵ�J��=�	v�Ģ�GDZ?J�ƴ�I1�f{�����߮&݆%�Up��  <A�ld����.}&/�R	VW�C���ݤ:�"@rË�� wNDx�l��:��͉�P�)7�����-�c[�����x/�rriJ��T��ǰ� l��k���M0l�����0e�nμ�[ˉ�������t����}]�X�����rRQ}齞�{���������-�Vz��r~Di��������S�
.us��V�q����)Rz�̳Ϫl���5��Jȸt\����AQ}���/��D��͹�C\�Z���8��k2O�s�MNs4*�����_���G�J_>�F����V/�3�N�-� �F��u����W���M!�7S(�6��Bg�_�)?��YHz��4�����ɹ��`�]kr:2�1R��t�� f�]e�HF�ج��&zi:sf��x���5#x����ĩ�s0bh6�+���q�7Ƿ|8Z��z�.D~vxH�s*���>ί�<�ܣ�ޯ�T\����Z]b`��3����Q�}� Rtr�
��v�u��:�϶��f���b%~ݩz�)�\��I���b����7��^)�P��t�����1nPQ����X�/�o�&�#o��q9,��3y�^3`$�܍<_UH��c	���Rˡ��<���+CTnj������~��d�Z����yќSm�7�.$����.u0�kx��G�9ke�@ͬ=(��Q����V�)�����V���ʲ/�/ce���-��<�yDI�$	���p�h����Q����33�h��i~�j��f`��Z#R�
�ObH�֢و��f��k=���i�)+�}�@E�<M����J9P��r���i�1Q�rצtF�
�[w�PY�j��� H����Z{)bA�%�t�)n%I^��9��O�������#{�u��Y��.o�/DHu������
���\[�OԳ��Z�W��]Y�(~^~0�4�I���b�s�U��6��f���F�v�t�V��wn} �2���B8ܞ�1�mՍ�iZ�.��#��",F8�h�{���΃L�^�Y�*1�+v�6t8⨪�gϏc���^��nu6�e �\�ȹ�2�uãǽ��#t�.>X�8,x�b_W�w��_���q7��%�]�6&\���~��:�U ��b�g��f�R�9��gWXw�o8���b�����8��?Ӈ����u���V�>�ݳt�Y�3�Is����
�6N�˳߳;W��X4�N��������Z������sג;=�	�6�N�J�j�a��諿.7��d��]5�#+�m��Dh��;�xÌ���X���U�����E2>����V��*��l�C�ˡx�7\LN3���s�������m\?��b���Z8Z�(��=H�a�#�Z��>%����%Y�%�����*�d$D���@i�&euQ��,K�ǂũ��x�r?u���
�mc��T�8|B��G������xn4��S;.1mH���M#��9$�h�fCk�;��;���gr\3��Z��L�9i�ļ�^:x !��g���(���7��M�oh��b����������N�J	ɑ�h��.��iD��ׯ��@�l��s$V����5��I�Sv������ŘJ�H��4p'�1;`�{��68g!K���P"�x@� ��e@���Bv|�������� 4D0rxѹG^@rs����-j*&X0�hD@2V
��W[��G7�������Τ�N1b�˼�*[P�A�p]��)12~�	gY����!?�v�	NPH�BE��q}�_v� R���O6y�z;�����G���jgP�TC�j8���G6a6K�|IM1_x�E-�Ѫ�q�N=G�����	��OjA�tlk^�{��l��ʘ�����9˕3�	,[�B�ӈ�.X��^�,�%R ��$(d������$��[��-�Bζx�k/�PA��\f�?�>��FK潰4_���r�8�5�Z�SOmB���D?����r�	?�7�];A�k�	=iY����'�^�JZGuѸ*��f��(�	3\uKIL��m��C�|wD0Ia�Ƅ@Z�7j�d;-!���h��
��������d�U�>����W9F�k�`y�gP3��\w������c��y�E`�t���t�
��h3��� 9�;�F]�j-�:j�R��j$+�{�x�EQh�o�%����m����ltګ@�Bu�ģB���J�Z�A��&}B���>�7$��#�7����	����Bﴔ�/��yJ��PYc?���<��/�_�xȆ�оc���=�a������뉖�y���l����ԏ1��H����)P�ߠ�[?c������R�	���b�-d]�=�l��@#��)0)t��F?3���} �3H �s8��/;6U�|=�Φa�x�ӄU�L��F��gT5�,�{�O�N�$���dT�����������q�קF^�x��`�Y�A���i�\��9������r�<�ͩ���z$Q��^����O����R؜w�3�x�\��ˬkK!lF].�s�i+�")3�{5ş�A�?�\�t�	J�2Җv���k�8y]1`4�f.@X��u.3�o7�9=S�l��>�Y����]8��j#�����jz���yh#����Qrt�P��$[��"t�n:/*Y��~���frwV��w\*�=-����xQ��7j��4	'CÉ����#a�P̮�ɽIЀ��6C���Y��VKE@	=03�ȅǽC��� 6(?P�#�U�����;q�8�m��ٲ�����;B{��w��s2nh��s�C�R�ѦV=y�cN=��`6�'����Ԋk���I��
Af�e�9�+�]�jIY�O��0S�6S	w�/�R���6iJ���Q�l�gK^$Uם�]Xf�׊�t&�p�9��,�Z����Xni(*�i��Af��I�Z�n�]x���M��>�˗��}�H�3v�잖�սY5����Sȉ�>��D�����bJ�`Ͽ=c/�-����@n�jx�6.S��3�03�/tH߷z9�*4��>�U���ȏ�-��;�\��5Wn�����U�df�~������\DIuv˖u,?�M��c�t�]H43�K������⚠��8����u���[�VՈ'j�ʒ���dފ��ˆ���|4�(��M��H���D��Y�����Ŭx�H.q�z�<=(t�.������L8'�t	��[�޹d��A�5*�c;� \��_�*!�'�k���J)������a
��6M䷲gn k���<��ME`^����������#'񹙄k��Շ���m�ϥ��������T�>�J�z�Ϥ\�s7�O���/�6��IY���j�Y���e`�ng�R�����ԗ���AL����1L��c�j~;�y�+�sxhϸ$@�0j.L��Cü����nlT�߷�X��Z��R5B��`���d�HQp:q=)�)�LG���A���LQ����"B����-��b�������*�m]rHp��F���R39�mK����x��h��MZu��A�ծ�K~�L���q��=��ߞ�0ȡ�c��겔x�.)�槁�Q_�����L�t�Hn�@r���i��Zw��婤�v���+����i_Ս�7�|�|k���Ad2�$N��e8��c�;z_���k5�!��gՊ6J32���(ɧ��`�1.��!x��8�dD(�.�IW:�'�+����}������*��.�����q�8�W�[�)�/ ���ß�&��(�����=y{�',R�t�E�v��q���_��amoQ1ݒ�2Ht�w��h�����ɒ�	p���L���-|+Ӄ��h*�ۆ���\3�`Md���,jb��j��R�ꦤ�b�i�����'p*��Q�;~�尙�����:9'�l��C�ʋF� �U#+Լv��~:��$�!�޳X�u��WڨZP��7���1n ��I�c^���N*
S��޾	n<���!*��@�D
��o���,�CP0��%���٧�H�S�K���o1rP����<���DRr�?mz]� �y��u#��U�1U�Yݬ.G�ܼ��A   K��m����O���� *� `0X�_��C�$�熮�s�[Ť.�F89VJ&����;�����1*  Z�;f(  ��A��M�Amh�L ���"]��8豝e���LN#U]�U^�h��O�C�*��%�K��O)8h~���v['H���!$��v�1��M[koȨ�$��?�	xԤ�s�z��xa�卛����������7g�0���d�>����n��p[w��]�G?TU��mnű��SI8�n�?�R8�" Wf.R�Ǐ碾k�z�\�9�7L�	���_�{�N����襤��/��r�����!����圦���ĕʏ�M���$�mI�3�������2�XlQ�TI>���
�F[n�XY��6��[�hv忂�U&!Yդ��	���/Cm~�>8u�j�ԃ�W(!��B_����N��zN�N��}&�����;1Ȕ�ck>�٫a����;^L�V�a�������%:PA��fB^*N��aK��Rа�O?�y�s�%
����j�e��E�X=����]p>:2���w{rԺ�溳t ����x���al��X��=F<�"�Ahh���?@���U^T��Ց�ӷ��%�p��)k{LS��$ث}kB���3�1�t�@A��N	�0o�֧�r�ȃܕu�YHŹ߄��ĜN5�����q����M�6D|���;�=.,��ؕ$�c������^D�qXDq�ʐ�C��v�1vE{��XP���FXFwi�K���ݘ�.��KSHIL67��"���6��|�f��o���� �muU�5�$7=��+���l?m����{O����Eix�l��?������Alɱ����[����:E�9,z8�����B��J�5�If�8��+��� ��0��c��Br�O��;��xȮ�"����#�$f4 ��IOk�M�z��|���);�p.���P�hhhh��y�EE��e�L�z1���m�_��R��R�}�{��^��<�t(xq*��Ú_�ew��gN[����[S�jχ� x%8 �? egs��&o��):�SN���N���v@%^�0t�M�9�.��5�v ��9�rs���"����^�A ��Zק�O�%(A�%��D��m���D�U�����Rf�on�0�e|D�#+i�B!I�'ORe@�|����ϹT�Xv��&on�ܡ�s�0��kO��ި��j��01���+��Z��;<9[��	��Yy����.����V,&Q����}!�r
�u����$���އ�`R,4i
�pv]({��v���t+8ݕ�O1QO~�!�^�O=� _����� �8��k��hG���{�1_� 	����� �r��5�o�S��"�:�Z@�Q7
8�O��3<���:�'�'L�/қG_JX�'�"�d��#=�x!�`��AZ�W�p��р�n!CB�q
&!�I?GPj=���Rm�ߦ�'؜��̝��r��� ��]w������LC0�PP��$}l�)^�5�^���W����=��i�=���k')��dy�d�~�i1vW�T����0��"Z��1��������
YA����$�ؑ�Ȟ��{��T�KBc�)R���b��V�6V�p	�j�U�=��RK�e��4�pp�4p#�*5Wf����~ټ!�R~�K�$�}�_�)홽Cď�_;$��g��<)��|ld��-�
�m�v�%�Haj���d�����S���	���2#=V��}�l�|�v�0����Gd:���-��;��R�����^�������gΠ�u�[���6�[gv�-��@����ms��f�wu_���奇���z@��j	x��]�l�saL���"��i���!�w�~���
�0*��^�K��'&w��1=cČ��	oD��]�+8�:������ZG�i�C9�Yݑe�����X��_�48��^�F�T��{0���N���q0O�-�Qk9T��i�FU���]�����ְ��2bB�Q��8ؖ-y��BDq�A��#~�ؼ'��@��`����Q�j˦���>��|TMo��Lr�4Ч��V)����zK�6(z� )��OkioC7Ϥ��W��T}g�֦7פ�>��AP鶸�#�P����n5���*3i�2"��PV�+I�A�'�>s�!{)�1k���|����;����u:�(�I>����.c?h�F.ꢬ}@�x	Jl�Z��`�31�B�XZ�����M-�]q+�����Ȳ�":��G1������b9�.jD�$�$RP��ͅB�M��i�8�z�H���J�\��T�D1���3�І�;��d#�D�¡s����	�?���w�y�݆j�L
LO�c;�LF^Ygk��[�F�J6�6�2�,yU�M�2�vn�N�+Xy��f�י����%IFyú')g��#�ŕѶ����f
=x��0:�ռ2i��������v�&W��\*�t�.�Ĳ�<L�� �f�r!T�P�a�z�����na�GC��M�҄ ��W>L�Xc�!|mE�cA�NQ��f�;���AH>��ymH�z�i�Q�F��,S�_S�ս���O=Î V��_�7R��i�f����P����]��oꯌ����K�V;�¿��<�e|N�l��t��P^������<0������шh�(9и�K(j����.%��PC�����4�1��ͳft�a�i�kň�ĵdR"ݒy���T�����E-k�7(�c���T#Q�JA�yJ]d�/�:e��u���w�����
�rʁ舋~v��_�5�)�ΏC�E޽t{���=f.��-�m����k���f�?�83���&�kB�5Q��wK�k	N�-�UTC.V����7x"�?�b��������_Mg�G}'����Fx{r�M�Ԧ�b�;D9'ڷ��I�$An:��āU@6"��H	e�.k�~s>��S.ז^9��|C��,������EX��W�w��1������L<�C@#T�*� �|D��V�Z�TϦ�r����-�+s�9�ۗ*��/���Ky-2�ct��D�y70=�kl�r���s[���$��"V��=<%J8X[����nθ��IU�*�
�b�z/�pk��)�zO�t1����IH<Q�=�#<VA�U�C;8���=�y<�6�k���q��@����&�_9�8�JH� ��Rv�U������!8��U}�Ж�z�@f����L��G�
��T��̒ˏN�m�ٜS3Nf�C�����/�&��i�;+�^�|on�4<�:�V�s��\���h�{��5�iC\�ؚDz�A{��O����-� Җ&�UA���i_Ȕ8r��8m�����i
a��e	�Y1��;h��k� ��P�ۄ��dr��ArA�Zb�+֦����K��,�*�����mޮ����	]T��F⹭�4 >�v�UX���Wh�7vaM¡h�� �?B�X�J�!rhP�TBH%��ߧ����z�@=~�j�N}6x��m��S�݄�iAt:q�C�o�@1+ܷk���9���)M�4J>=�X�z���1��叧�f`��L]�ν�U:�,0�#�X���5��Ԗ}�eI�n��'ާGCpE>_�K��l>k&�{��	W�L��I�d��H�D�1u��ȌC&00$Bc2鷨�X���G�:��)A	
N;�9�aC���[Ȍ�%�407c�6��gU���A��rNw��V���]���J��ʾ �C�®��y6H��oQ2骒]�C��	rS�����N3�u����2�� �ӕG�"bm��
��B�=�빘���R�ݎA����{�5N�a�[N1�p�} ����:�5���I�gH�|O�S����.O�Y�.�wnu�r�Qd�a/�R=ɇ�8�#��k�3$,�e�V�q�	�O{_�m���:�|>�#��0}&�me��m��.\���4B�m�ڟ�}�Pc�7&��^�U��g/fF�B`&G%�L�
V����d���G:�Wj����OǺbY
��
"@#������K�BqU�	P��G� -@�B K�)���r�B�w�8�|!;�fᩙ����?��>��h?M�a������n̞�dSZ����xܐї_��Z$岌�s/�?���w�^Za��gWbz�7�Zmy)sY< �ah.�)E !��??�:v�mF*(��>,���L-����?QT֙�Ǽ�%pe���۩x��}p6M���/	��z�M_<�L���c�@�����X<�P��(�a�[k�:_ ��)�U�/�Y7�~{o�����6��ɤ�2Xrh`*��8�hPi rN�Ep��,>�l�H�ʆ����03lG�(	'�����bB�1��s��#C��,��|��b�����YҤĄy��{�_g�E���i,�I�a��q�� -�c�w��jS��
ܳ��#�q*�}u-9�P�Cޗ�@x!�F��	�S�7�~S�-��d2~��H���Jsn(`�%U���um�1��(�RM1�{�aX����.��i���|��,o����Tz���n�b��A����� -�X��� }h,�2��^�� ��+ F��B�~*��*{a&�5Ƞ�-6�LG�4��Qu�XӢ�棽yFkw��G�С�����b/���b �\�G>�4��x3�D�HV��D���A =���� �FS"��o��v8>�;`�,ï��(��6�����,?���I�TK��3�)��ܡ�'��٧�$cMՓ�k{�H�!��Vm�@ؚ	aP�^	%�_V�B��bc.j(^K���m��n�N����+��ld�7M�=�S���!T\�z��ܕK��vn%_)�U�o��A�bP��Y�/JבB�t����_XMt�c��Ee- ����{~�C� 1 ;_�&��EW p���ӽb��Dmm�8|��l�%CR�:ڶq�V�;��#�e<���I���ρ��_&�_�}�8��F�TIEO��Pg��b�~ۍ
oa�1b����LH��7���x2
2��R�c�3�Nq��:]+:�E�O �ՐO�߇ð��,�ީ_��dxM���ZL�r��c<�������2�L���?��
ݫ�R�X[��f��Ef�ݾ/akb�_��* U�\�$��tD���������*a�Ɠ�3$J�Yk˝��;t�N>'c��0*E��ț2��
ߍ�*\�\��v�'2��E`W}�!NL��{UВ9�5�t#�����ѻ��G䘞�������\ތO�����G?����B�Ab7:4@������� ��P������Z+�D(�����y�x*^�,�}�A�9ga�Di��K�~_��1H�)I�w�@@�рbJ�.Q��+�b6��jqn).!�xS#���hI;>�g-W���A�KG��%_ˠCE��j���Ѥ��H(h"�Cz��MtG7b�:�츋�k� K�h�p��P�S[��F�bZ�����I��6�=�����j�ѻX�7u����!,?)�ݔ���Ѽ��A_͙ɩ� "�lF�m�gվd��a�ޙ:�Ȍ�m��/�nI݅٧x̯�����	��0�i�{"C��d�UH.�Y�ա���w�Ӆ;��*|t�c l��X���jtR�w��/�e�9���ן�J����~Y��Pq��{'�7a��0V��t>Z�\C���3��ΰ�����w��|�V�Y���~��7:��2�����N-�T�3P��̓�c��vp�#ނ��� a*5e����fe�c]��0�s�vtt�Q(��S�L�
	���z�T.�[�q���.���Kj�p�r=�am(�V�������XB�GX%���b�������[*�A����_E(��i�&%�j^���)���[��^���/E�;�L��	KS�ܝCH�=V��?yz��՘%A�� ��Ȋ-�)�9c	�����d����+��D2a�Vl�r� ��Vc��$��_� �x�N�vV�&�`*]��&�Ѳo�E��y�h����'�&o@j�V,�a��u?�ie5����R�E���ZۧǷDZ�@f
��W�|�VF�����Rh��J+]�阾׉Fȡ�ev���t$*m�Ii�e� �68�8�$�I�Ґw��[������%�1���fH`c !?h>p��/hjU�e>�P��K�	�)�	�-`�Şv����?HK0��n-�$0�P��v��A��G�����Y�x&���C!J�jSR���LC���U�|��i�q_j��C�~ʛr�c�!��K�{-����20��wX�x���0R���v`�����P�w2,�1�c�CtJ��Wem&B2%:�K�h֘����A����e+���~�u�a�Ӗ�W����b�Q�ܯ��FM�Mr���$�Cq�@Mڿ/~6�Tטk���iJ�*�;0�zt��/�yM��l
��г���$�Ԁ�"�o(jz������o�YYv$'^ܪ6��T���w���֕�V��߸-6|:$�\����DD�IRBP�ε� �
�{�G�{�ѳB7�C�F���ƴq�tu��T��*����6F���}���4�y�_����@MZẐ�����C�n����Ӓ�9�vs�(t�+��T�#�x��T'���l{R�qo)�`��5�kXBQ'�#\�<߉Ơ{JY����`I�5���Y֗d'm�\��g�kSX��ʈd�; �av���Lv��9��R�-�U:���P��b��mj��_G��+�C_�����^b��V�z�Ʋ��@�	�n��>bu�U��M��?��'#7����?�r��߾Zcl��������X;t��`B�Qp~(2"#~��oӡ����=I��W�N���|���� D5o�i�d]˚�v<W<�1��r�?��Wߠ�K���"��u%K��+ư��'œʻ=�c��`Y���MA��j�셧��"��1PR�;�A>�*P�X�Υ{��k�	^J�`�Yj���۶���}��u��ķ?߀D���ELП�v�Ȑ���n|���)�T��gv�r�0�9x�l�+H�&_��_��*�FWX�o�H�~NQZ2�v��l�E��q�ϒ.v�UM�ꝅ��&%-�����% ���eۦ�:�x�
U~���� �ŐCl�6x��$#z?����&O���6�������W��,���d�n��b� ����^����f��qm���{֠~䧀P���;�n�.a�5�%
�B?�t� dL�E`�.2݃���ظK�|�l�o�:��e��h�E��a���C�h� �U�h=���-(��׈-[3�arL�v�zӖtk ��*�ņ��f��1�B�5�
�hy+���>rA�����6��btZ��e��A�R��m��~���ې�IX��	����g)��X.#�C�l=l�p4bƶ��	���o)�H<�?�`����,��M��q[)�<��+wo���4�(�EVm���Bǣ�IC�A��Lv
LG�у9<��RY�q$����6���$?��6�
|iz�}=+B.0)�k�-Mn��	 ��{hC�w�5�$�V�R��ru;���e��R�����i5��1�,����0@b�_��w^hr-��oN�O�:sZ�7��5<�B�(��\��5i=uX ���?W�E<O�k��m��$Yg�K�aԛ��	�����������=O�:�5l��0F,D ��46�60n��\t�U������,�	��7�>1�/�{�tz_S��p$j�56�_r~�� �E�oq��X�����w��+wV?r&��S�%��o���5�R�����8�LV�5b�ő�ӻ��0ob��&��X�ؿ��r�g�H��o�c�m� �H�l;��R�u*�tm�-�c]_���f���P�|�T��%��m��U��@Ť�#xyU���$���3�d�؟|Zre�T����r��	֏��{�G8-�J�7h�a�����Kv��Lת����{)Ew���*�l�Z�
�C��I>��I�f!�1��ߘ,, ����ҽ�}��1ć���.�B�6��PW�
Fn��ڰ��$�w�/���1O*"�^Ar��ŝ)K�_�qA+���������wz���w�э��Y� w��x`�*��	?����ϊ|�u9��"V�+
l�h�b>�p�/e�(����ꆴ� VɊ^V����4UXc
u�7�UUA��!�1�[u�rnVi4��Č�͋Xl.����z�'W�����N)��9���E� �ׂu�c�*�S�}��K���f�Q�{��*�)+�y��!�uJ�6��Ӳ�A�Z�j\ �������R���1��s��5�����+�_m�HGp�����}z�K������wQ��]����O��rP��J�pt��io.�㙓h5e_�q[�f���r�"j��!Mܖ
�3�}eϼ��vޅ�(ƫ
��I�2gePԀ����362���(��F�Z����/�9�������r�*�ɥ�����K�^.��rH{�����{�n��ڰ���=��{}���B��jt�/A)���N2�,+]!�%�����W�+'e|(�멶�D��֗W��Y�۵ao�]U<��	mN��\�2^����h�+�)�5�T�����'��,�r׸�yW?�-�����  /����~����L�7̫�u6}���1{T�Y�i`�˼j�������n����U��`���3��[Y�K4�J�����DPa�������:�O,�h�Wc��j�|�9!��N�ݖ���ĉC='N	�n����T�Ҷc����і�?=��Q��
���UZ�> ~�]
�;�f.�[�֢�D�~a3}����C�o�Ū@��?Ȏ�~�v�>8�c������4�X	���ꕪD��N�6�]�9���2�ȅ�<�!�4KNl%�x����WM���a�]g�������8�/�H9�v�_�V1C�y3�+{���@�8���s��Ls��f�,Z6�����a��%�7�QS0�\���(�k�d��]gɤ���Z�@j�O��/s���s�uw�ݫv&Eh���7/FםBw���#�C�C�ب�%�DZH��!��¬>�7u�����_ןX��q��uT�Lz̖۾U��>	+�� Ll�`/CoX�Ω�K�콰�m(�$ϊ�i�y�k���/�k�؇{HW�"��Ɩ�i��?;@rPS2�
6�V@�Z���/D�H�@�Ab9Ej7cs.}�D�A�S�������am����V���"8O�q9��eە'�	A[�Amb9okmE3����)�x$o�:M�KE.h9�g���3`LX�W�=��vʈ�_rR��!�O�]��+���.��Bn���z:���f�rb�Я�o�F��_�v�l�x�����#�b��2sL��q�Y�C*��dMź�5�쭬H���mmH��Pg1 ���&�:�`�2l"����Წ{qÞ� o?�V�m����M/r� ��Ԫ �]�������7� �Z�+Z�z�O��eW�3�7a=�)��h8Q���l{�E
�>��Ҥ"K��:��.��v��O5�Q�;m(�F���e���9i��Jk�o.���;GM�*�7�����Sא�7��Dآ��"I$���U�D�X8���MK{1��&�{�Ԯ,��yeZ��Q�h�m�?y ����.�a�ƙ`�x��M�͔9�I(�ĲN�Ih�9 ѫ~�y0��>�x�%!�7���|ŋD	_~����ዙmo�o�s���1��N�ʸ�T�y�AbIX�Z�3ug���~�78�\���Z*�\���p����N�X�I����Rw�!�W�[o�����c�����`�C�m!���:��c��ń~���������^�A���V�9[� XnP�_�q]1�Ȥ;���9x�n���a�&5`w���v쭹b���;��@��Kl�uL�Eʤ����m�6V df�K ���%K�[����اӮa�r������VX�QD�7~B�ֽ��i;���n�шy��%�S)��̽����Z���1���ӭ�0�d�;��1�Vb��9\����%>Oq�f��ܗ]x�Z��^�}&4��:P3!*�{"��(ғ5bˊ�1��R#�'�S}m3H%��{�.����b�����̼�R)��D��A��;6i�ɹI��0/O�?R�xf5)��_�b��(8����o���0�v��y��7��w��.Gy �2tmXe�I��=�=v�c�m�Py*��s�'٥e�#i�G��Hu�-=�HX�?�eB�b�t��^��W��ӵq�pT�@�����&����K�,�"��-NU/T! �R�JP�bv�2�i��Ul��ACj���4~��oK�?���88NH���n�˼�����r�͏Oy�)��K}Gx�\#I����Ra�pK�����i ��	�^.��p��Su��_�+�����W[م�J0�/��(�)H�V,�o�Wߡ�`��S���)�8�O���4��#�c� ��I�>��,&6�8)��j��r\�ɶ�W��̵ȕ ��ك7l�����	��J��A�f�U��yn���BXj}��
��dz���a�����kft"�XM<=PFS���m�h͔cYuYP���}�	�J��)�N������������Ӹ~���'����/�{�%*�{���>�&�nN�����V)�����eL/L�I��%����"�^�q���z!_I�D`�D]i��Kp#2 ��z�r�k��4y!n���5����^�"�-�g�`[�H�B �0gHǭ�q�?$W���c>��24ڥ"��+#�Ԑ(���
8�z����dPoг~�,�
��l`][G�m����1����F��~�,�����>T*#��1	U:����R����n=_�D6%JZ�\>,'h0]wZ5�t��_�k�J����/tĈ1Z����� ��N�^j.R�aOP����ʽ��$�p�m����C�2R��C]�%��]�y��ll	}�6Iߚ*��Y�Ӑ9�Ő>&��0�uk͔�' .�𻈹�p�0;f�;�y8����w.Ж��L�3{БDr�!u�|��1�bY�ua�NhΙ<�4���pG�QG2ɯ2����������I�ر�n�)�`����Y�SϷx�4�K�A��iY��S��H���V&�2L-�!��N��̴i+>���-�.�<2��V{�@-O����L	�-�	9���
z�L_�ˏ6�^/}�1�d(}O��l�'8T�
�!'�|��h��g ť-#��5~��Zg�G��F�5.jw�
����DN�Uڴ:60�%�A�iBy�Cc)�_�x�u}����=xx^)/s��|!.+��X��ǘ���sHp䆮��Ū�;)S���� �B�x�nѴ���7��*���1�Vw@�@=b��b� ��*q1>*�v`h��]q���/�E�Ca���M�e��^T�:K�%mq@�y"rl_"h���0u�����Q-Ɖd���{S��_U��waܻ���m��e	����tbkM��[A'�-�pS�t�WJ�bhO�B�ݠ|e�ehnU���-1�^!bsȡ�Y.��}��A�SN��T�s:zkH�]ĉ)�)_�Q�U,g�U��{�)>�i�|��or�/����"?G.������y�Lr�<�	���#Ix�l6��	����t�rH��n� ]��O���=��]ױy���H�FpX�LLHC�`��4RÚ�����y�Xy��)��&�TD;���>�Pl2b�"������Ȣð�G�HKCR�?��I�,�@5%�C��'H�?E&�̏qʈ�S����t�iM�w���R(���C|�I����Vp#���(\�Z��2c�nCq�\H�튦?�p]˦���o���)C�d8u�������t���"�&�ܮ""����]&]÷MO�Ճ�8>�t�Qm�n�V��dw٩a�( �d]O@�x��N�@��� xڜ�	� ����3p���ċN)������@�+�`f���{��Y�\Z�1�t�\y�Q�e������V��&�`���#�9"��xdT������&�#��;"�S�0Th���"{��I�9��/C��� E�.���"��E+.nK����
J!֤/�R�k��!J#� Uu�/-r?!\�Sk�!��z� �7n��RX�����.�6��gCk�{���I�����*�^��z��u�t�dBdRu?��skx���Xi�!���n�M�!p�������	��s@�W��t.��P4���O�!����nڧ��r��A��Z���Ĉ(H�#9����#�%'����q~���L��\�dC�Rς��Z��. US�i��X���,� �y����/�t�f.,���2a����tz���9�#�5�p��۳�f;��(��ͱ:�2���At�#9+��ᦗ���S>�m�Ռ��Ͷr�f�#<��+��# 6��P�q��X{%_Sn$*�%H
�l��}g�v���1��$<C���`�n���Z
4�������c�z��)�iMmd�:�P���xO]��[k��)u�/�d�N5����.R���Q�A�?�MO���[7������׃O�� �@��G��5ˊq�}CY���˭R�Z�\�F-,C�q��@����7���+�#3���,����(��:@�/�KB�ϽPSck�����
���HM�p����Yl0 .8r�vj�7��{���g��y�`{8\���^-����z�N��l?e��c�A�k�h��sf<mj�}J���7������^��LTNԣP�+�u�iEVa��M�����]u����W�yQ6�i�
�?�Y��7~|E�pK��c(Zq�K�JS������{�5�u��)c�Y��c�����qѓ��Z���g����ɜ���n��ϫ]�������ͪՂ3��̏y����Ry2Cl��	O��ĹA��EQ�8dЍ�ln|9?�(z��_K����oH�<�/z0m�x����z��be��Jd̴.x㦧u��*M�]��u��\� �2�6�%_0�)�"Yb�u�ҞG���_�d����n�j-�}�N{�G�a�w �nF�{0.�=�>�P��C��Ǯʟ} VO*��tΧ{r��5J���CJ��FG-�
����5��ANGC����m%��/G��K�]��d���ph�ŷЕ����+
6q3���m�sG[n��?9Ο��?��	�}��U�> 
[t��h��.b͊�oA�j��n(�H3B;�u�5��qL|�t��lΩP�M����D�&�.ZgA
��OR�Cc�#�����~��}5���&��`���78r��ڑ	^��ew������8����3����\�z�y:j�h�w��B�s�W�~��o�:�����w���*�o�+��;�[���� �d��[M�{fԪ#���,4�~@gg��b�(��oN�}��ީɘ�r�m,�M��?b�ii���{ �e
®�@b�0��H�2��d������ԥ4�}��9-�|���|r]���[	iRf�
'\��m��H cި��<�Y@�9�HQ��$v\�6���?0y��9�M���G�ltnV?�U��w��<��5��p6��7W���Ԕ.�3���s���S؜��0���h�zH������yJ��:��Wj��;�3؄��RƦ'8�2Jo�{�m��$}�?�`�8�9�iqi��Ԓ�g5�CA�+%n‵.�B=��m8�^�����5��[(��%:N�A�nO�t���1K���їC٠����=�af�[s�Ձ'�
��I�iA�"-��3����>ѣ��A��q��l�4�y}��-bZ�)�O��w�����8]H��pF�%^Ή�M��(2Z��ڑU�WrJŖ�a���p��X;��1d�՟����ӻ\[��{υ���౹�d��Bnw��0���;�\��d]]k���9hi�{�K��
"����1���}z�s�̲�����S��k�=�%xkSf.����K�Be�j���a��'MT5��D�v�З�ק@��3oPS���"HO-�~I.T�����%�պ�^=W��M����V]}$��`'�S��/�����*��}#����f!�0k����M�=	��4�s�҈�l�h?��<�a���;}ˁ�7�F�����wএ�`pG��ը|��4� �����j6�DjX'�,P��b�J���H����X8Ӱ���q���#�*�o���HXT�̀�(�A��!��~�H��������z��Ly9�~�k�1��\�+��o.��V�·ƙ�{�25~#&-�v��U~��>��g��{%�����X�n��߀�.�/��hF��+��5�hM�à�(�ķI�Ӷ��n���������%zʽ��j������] p-��f���y�
?Z��ܺ&�TMT>y��`9G�D��ꅖۅ�ȡ5e5j��{
U?��\�|PM�M���O����IH�$=
5�����\o�:�җ���O�$}�,��A�p�I"���׆�c2C}��Fw I��&&���.���Jv�ſ a3?m�C3�Onӏ����~|���ّtOy���x��t��kK(HQ0�{E�����1D��>�H�j�V:~�"Yf����3e��B;I <���W?���7����T�:4c���s��dm7��6B6%���vk"�㜥$4�]V�K���\E�Eb%�K�e�S���oM~K���)��� 1�&�b�3�̟��Y�_��i�fE<���4pl,�;��������?���>;��ԍx�����#�
��t� ���� ��t��������o��KZ�p#�n;g�ֲ��Z��or��g����mQ��{2BI�xf1
�yԆQ��FT���8���rRc�Db��Q3�p��xR�9��aT�$�m�E������4�
"�K�{��53u�/��+4|ﵗU:LQ��6�ExKE�O�M�3���1%�œc�O"G)|�ƝJ*��e��)Έ�����~I?YI�Y���Au�3H����oROf~�>C��o�_���B4�^�7��RS�~uӺ.�,r��%��b��'�l�ʣ޴���Tk +Ӈ\ ڹ��o����.� w�i��[\�s*�vX$&1j����Erȕ�y)T�Jw�bi]�"V�M��0i�'�x�0ڪ��Ɗ"�ҟ)��g�%ÔN��L?�8z�9_WX1J�V!�8g��ي�G2�/�f�=�'�W�&[$�1��������)�����9�(�J��b�6L����9��w�ԝ�Y6V"��IE3��/�,P!{�b.�q<ǣ�T�Hh3������ϩw^XEz�_�0,BV�+f�he0�Ԧ M���bֱ.���$W4A74�eS��2���3�a`�U��~0��g��;�Hl
��_#�R�Wz�7�*;>W[]mp�x�@7S*7&��#{V��:�r_���%{O,v2a��7����ᯔ5��P,==�����MD�;[}�������0��j -	f�����{�%|��cϭ۵�ica�H}���˺�>�j�ݠ�{��a����M��kQ��r�������&�Wq��F�ܕ����^6��ej;֫�x����yX;;o��Z�g���p�vOQS����_�?9{�%&k���T��G�*L��.��SI�X��b�l51E�<1��~�|���R��o�<�X�y�V� �/@{<��<M�x`�j��@{�c��R��*� �-G ���ˤV����"}�=}�G�1�0W�	8� ��=���%]n�?z��;x�֨U:�5�*۳�@�-;Ӊ�[h��2�:�#���,�PEUm���_&o�����P���Π��ix5*Xږ�*j@=�3��� �.��N_FM�u�jy���8����z0&$���cl����,�9(�)>Qg�\�v�������n����!����.���h�!_��	�����SH��R�z2�#6`Gg3dO�u�Q�_i�j" �4�k|����~J.���4K:��6-�j���~�bC�+�@EQu� ��顩�+pM@mn��.='S��R{����_x��m,��R��~�R-���;�E�K���g8���Iz�f~���Z��Rse�����T3�e�i!G�e�z��{4T�@Ш�A$xMt��YsX
�W��;�*�y��6��'�I��{{�<_?��
��E��"%|������{��E��`�k���2#"���g ^�Tk��܁��j��o�r�y��k"��en������=�\����G��/D
 �WX�LuAVa�����P��7��� �	����Z@�LL�9d�<�j�ʞ�O�M���c?m�A�� �Wr	\n���A1N���3�ܑ>jw��?G�#n�Ŏ��z��ʂ�&����F�q��lRxD�C�?���� '�wp��Q2��{cz����-���;P��q�k.�-�JI=�Ϗ��~�Ǟ]�-�ec>O�-�1p��,��(ᨪ^(��	긣x�<�j���B����jV�9y��$P4*#6a V���<�iW���'�F+��XLD�z=~FT��f����
�op��LJ���{iЀ�GU�j������5wt%��&��ޙ�M��D���C ~(��\;�Y�;�����7ޤ��t׀���`�׌�ltk#{�*7���Y�Q��+v�(L7���7sE/ԛ�T�:������D��0y{!�+���F��@�;hMeri��ȩ������용�Ǘ�5�dt���d�N��T˝�%4�zև��0E�1�����n��@:��܏[i���r�����.]�9�,\��>�?��0��v��j\�$Х��>I�>���y�>�ǰG^�W#��s?��J�D�|j*y�D��=���-�����f�p-L_W�>F�A��׫Ɨ�E�`jL����2I�,�s�{�?o>�:!l��b%2ʱ�ؐ��p����s���V�s�r�|$���n;�W�����X#���T@7���F���B)ܰ��~r; �a�9L��
�x#$~N�JH�K�?(lz3,(�������#���5�����~�&�茒����/�lZ�iV����c�Ѫ�Rb�В#}V����l�V�JH(X��*�d��y�h�~J</+�0ܙՂ�[u4;F��v�4�B���uXl��r:�1��8:$�L�w4��%3����lu�<�����My��
������>��X`&о��#OQ�O/?�Pv��)'�����d�T~��5��:G�I���E�ŋ�����QCu���'��ч��F�7'����a�"	���{��_����j2hw��+L\�Z~C�z_2P�G㴣�3�C��p�2r��S�6|)Yz�����$*�H}�����Ze�ߏ�toNT�k!#V��Et����BO¤�de|5~�],�"��E��W,}�j�~���NXp��JY��AHi#��� w�?;y'*Z2�C�q�k�ts�'s�$�`�M5�dF��h�������]._2��W��&������na,7��p;�^�
o���'m����_�#�C�����<C��6�)�ʋ�6z����dqG(lW��W�k7�f\�� ����wC�b�{�GDa��](��2۹M4GLJ]���8pP��x����f�`/L����`F_옦���z%��.�Ύ��;y
�%�B�����9�E�à����Bә��A��`��Ċg+��h'��/�HNSv�,fc���ۈb�����b��BY��v9��a�T4w�f�r�GJw�� ��Hlk��"�1d����{�Jm�M|auE[��;��m�:7�����hy��J)$��N��{�B�j�D:pB�Wbb6�V�ԩb͆�yct���X�H�&&��8"�q�:VE *�v>i�.�8�%��vg�!WGϲ�o|w��$5�~��+,{'�\���V�]@�!?��F�����`4��ף�yRsLM�������lhބ臩ԗWΓ��U�/)j`R��q��.�3.�-K�Zq�b���z���Ys�4���B�|y-R�:]�g}@�~��/o�X�[+����1�vi��������"fZ���]p�<]���,�b>_����!Ö��T`�4�G@	�
��]�u�J96K�R�����p�o�������(�Q�5��Y�g�0��M�P@��D`�LQ-�a\���81K%Z�q}C�#q�Cr��7�[Q�i�G���JS�%��@X6#}E�ΊBaӫ~%Ɂ���큛�bU�b�a�l�]CM��ք�<暆�|�����AC�@���F7�TD�N����L�T3VS��	�޲?k��(�G�L�Jz����b�`��'�"�j0G"da豄�ٓ�׃��Z����6߰Z]^�]|O�b�isě�V0�A����խ+���49A:ԅ)�tP���	�uAڲ��Z�`�dj*=��|&OO�Rr#8���b^��Y|0����mm�r��?�	>0���?2F��w�ۜŧ�{_��E72�{����|NB�GH�D۾��;?�c�eF�{�i
e���.5�i��K���E#�e� d�����|u�eܴ�d#e�����Y-��)8�KT�Q��	p`��)��?9?�1WP��o\dė��9�47������l�&"a�:O��J�����9r�G:�zw����({�Pș��P�%A��"�(�R?"R�����v����[w߭�����6_��C�e�R*6~��CG�
�pN�>������ ���[*}�bk}��(�>A%d}�~h�/z���`�Τ��PR �*��M�ԫMA�Fq�`�j0�9g�Ӿ��i*������ɭeQm&˧D�T[�y���:�
HKDun�Z�!�W��Ji���p�����85��:���+���/��^�y�����r���cJ�� �G�g�Of�� �)�sTk�2
�"pj�JO�����4�\C]�&�v_�;�Oq���w8}㓦��@�"�~5tpQ{M	R��"��xo�S�
ѝ0R�N�D*����+�_l����UxEo]^'l?Aj�L;�0Kp��8�*z+���/�?V3}�����׌4!b#�9����)kG�CZ�3�g�l.i��F]������)������89�����1�m{����sJ��PBn	C�vȻ�s��� U�۽Y.i���.u��ca7	�SpnTX�b����+~ �~F�a��.q��&�GrU���.��A�/"Q��Q�l�6��V^�����K&�d$S��T���<`�i��НjHMJYʌ��fE���4�RX��|O�7[7q�2fF� �s�:��@���L�]{�R3����( �KID���������z�H��]p��0D����+��l_4�j<��)���(Q� f���s��6s�v^"S�b��c�V�љ�H8+���y`�B�����~��X�؇ԓzN��K[�ūW�8�,l8O>E�f,�B���9{�&�o��X���~�#��[uB��S�j�h񧆒�	N+�t+	�\pȈǞ����e�	$�L�GV5�;�bzD*����Z��8�~��D��'�{�4����K�2.�n�gO�z񴆝�`m�q�)��N�q|t?�+|Œ���w&f$�:�˜�t�!����IǕ�l���,�qf��1I����(2�6.���a�G�Ў�#�]�893�����K�4�5E�����Ρv�Rڕ$�V������ݽY'�p�|�Nv��Z��J�˞�����v2X����&���W®2���[��4��7m�d��l�k#�,�
��e��I��%ќ������)L�j��� n�@⤈��7{
2�f�'F�Z��ok�@�Y����է��;�x�#�:�g�9������٨p����<�B�x0^�8���a��o+3�,ӂ4N�!��{k�RD�@t�8%ף�i	/P����s�zϫ��
W�PVUȪg��	��E3]%�2�+�w���6���&{壙\��X�6��5,B`u]ѕi��ϳK��R�����Վ���KX-Js�k��R����o�-�5F *6�MV'�ew��/��ly)vq�M��HJrm���}�N�؂X��QC��P:J(�a��v[%E��A0'��j��R�-��:����s%��TyXW����p�P��J6�?�W�i���y	�q�=Q����5H�,�8�K��Z@���$��4�
��RK�m`���9�=纹jY���FS����H+LϡM�FϳEZ�pζ+2�Wg)��|��^��U\�N௢a�6Ґ�F��:�UO��=0��B:�H�F�����cJ�gc��/�J/�@����]i�ߧ����p^���	�rRW�0IN,�O�X�a| ���]�s�����^8�(��&#!�;�Hϳ�y<H.�=^ٜ���[M��:A���*_U�/��[��N�'��8��7��R���סz�V�:��G ����E{�H���Ri�#��#ǽ�@s�	��pzScL�)r�bx5��)jO_�͚���ꟺ�|���?v��z25?O��!$��=�6��8��f�	���s��M�� ���ͽY���#abSF>�H<e]%�G�������6OJ�Jۻ�/�BxL�i ��uO���z���q��'�F9���
2�w���}���{����7�-v�N�S-E�m�0.��V4!�?��4�q\"����u����"��7��X���¬���\k�u�$�Pm;�c����ӎ`B����V�Â��f�ٍAgv���臃YD��(@<�j*�0��|
�2v9���^��	B���v~�hm����9~B Vz�OC�d�[�h�@Fw�G�������ޭ)|�HHa���"�C�I��T��dп4X��9���4��b魸��vF���|�ȝ�[��L��7SB{֯�wMBZ`�R)@/��Bq�g���=h
2�[JT���-*�x�(u���f<4W�������`�M�{!�]�eG%�(3������X�6���2��T��x����
��
�Mu�U�	�#ڞa��n��V��*�Tu�(D_��ɣÒ ]�?S��%4�*�p�L7��C���Hp�<VOХ$��܇��x_cR�@�d��|)[��M����/6�
=-���Y��Č��ѪP�|�z^��ߺ+���3ӵoa%ϥ���WR*f�zJVڊ��d�z
 ���9����X�U*E��S=L'eN��&��4[r,T��)���
�J��>9��¿#��A�/�����xP	1�㪙įr��F�U���fɂ���3GE�Ȏ��p�:|����C{pX�׹\��gkr�B�iϟ='�G<�5f��h�E��%��2Ʉ���T9��+CR��Fe=�EG2�\7>��Oߞ\�i�$��H�f�E#kɕ)���P�Q�}E��2�U��ɜ�V���(�A
-��~�t6X����(-E�1��6�4�҈?��Yc���aO�T5.���a��2tG�4�%�j��A�|�2����>����R�ݨ�Zïq���,�d2½���e
FO������r�f�K�/z�E)�Es�nH�8�d�k�[M�u�-b���"=[�Vx�ϰp���^d�"p�����L������m�o�O0�ي�d�+����3�덋D�(j�����8�����D#�6��fQ�ϛ�eE��[`�I�§�X�S�����ψ�+}����.�͐�@�����?�V�+b`�7o���+u\���ݛcI]��m 6���m����5x=uպ�E�"�lC���jL�|���~��cC
О���O�����﩮�,r�d�H�z��'��	�u�b4�wA��R� ���2K��ͰȞ��V�̂&'���ϻ��<sTm�ߦB�'B�_�!�]>�Z�S���F2u쁒0A�s+}^9�D+�;��v���s�=⻇�8e(��?b�B�a���K�����^��E��4am��~O�9�.E+�J��f�t D�|�ۍWz�I��������okܗ�|���;����?�0�䣈s*cd��wЧ���l�:�mӌ�\�Ț�)� =+v=�\vz�v����B4��5����ib�.�s@f#�sqUY8#���Ww3MF����M�SK'�kY��ځ־�c�~��X�1�]��llu��i�k�^�Y
�0_=����(�1��WV��+1��޲n��Q����$'_T���tGy�go�"2�J���d���������7��T|�$ 9�q��/�2F���{/��P,�3ăm���
q�^�&�G��D���.�b�\�&��?_�w���Zӹ����P�1i��- �+u��`�x7k.�^�A�G�Ű�2������`5�G�g��LI�GΎ�2僾G������J,og�D�A��l�]��t����T,������r�����к�9��:���^D��ɯr�A6�.|[��E(�Aپ��N���I�A^�;�윽�K�27@�7�`���:�v��x�L��5yY~�N���:�n���n��Y��OPB& Ua�2���]�S	�V8~�ʩ�a���B`��}���k�D%҅Pk�`��= ��M��L�&J����`�#�������F�`�W.CJ�8{=y_^���5�W�X���Gq�
�s]�Z�𤶽o���i�D�lfF�ED&�s�&�Xظ{.*��F�3�t��"��iky�ױ��C�?�C�tw�Ε	�n��c`��Ԋ��� .$�N���\�n�3��f&\_�=���¾�G2���p���ъ��`�����Ri	8x��u]I������Z<C�!I7R%�ݜ����X�n)��c��(/~̯.4����
�z�ca��83�E��������]}_�X��3�z^.XzJ�^p�]�����ը���~dy�����c"?��ߘU�Y l �+Z!r5X=&*��{�W�&��O�:��㠪�F�s�DD�L��PW�����E��7t4^0��7Ӵ�s+����MR�Hu4'4*�R��|�m�6zb�����j�����X6�|�Ԏ���,aҙd��̥����´p1�G��hm�����p��g{=Q����B�ꄮhSpW���q�7��,V�����gO��Vd����D3o���ҿWi��q;	+�/����12ܒ��#zk��3ٟ��xd�f�P-����<>�*�_��7F��Ǌ�PA��K�UH�~v�V_<bXX�槥1H~��ٷ���@��̂_n����
1u�Z���F���h�9���د�2��0!���w/$�Y��G����Qisn�Z�طqxX?):g���]Oq�Kea�h1f�V�}��c�����<��N���p3q��Mw�w���o߸n	p0���"��V���2ׂܣ}�=���X��8��HS�W�ǖ�_�0�,�Š������Y�Y���K��� �(��_�������Q�J�:�����]c3�����
�����$��¢C"yX��|�M����@a�Q�Oj6Bl+Ι�����4�VnB�m��)�����k�ζƤ�mBC�c�:�g�xY��{*a�yc뿄4#$��E\\��W��s���(����GoE}R=�Ci��a/F.�U?R$KY�
H�1.8����5�{*�"��|�����!d��qӲ0�s���?�:�,`�i�]wF��
�B�U[��*�ï5�8�{��b���lP���rqLZ^W��O>�C�7�ʍ�I���4��:a�ѽ�;A�bC�t=T%��t}vX(l��DV�E_܍3C�g�ȝ�T��Ώ���Q�5I�#ŕr`B��F�o��ˢ�h�?�I�<���z���5C�q}�F:�8oW�mWx�������4��Dي{~��Ɵ������q9!�yt	3>\��D2����w��4��5뱿�Y>H�/���&�p�6~�{ЎD��{v=
qI;�Q=S���ّ.���)���`�R�P�T)'��AoT�V��7�7`���`a��ϛ�g`Ǳ�(<���T r�f#�=�f���n3�I4�~- �K�#/ʍ�^#k���$�C�åi��d:�϶C���p}@�"�����߷�.D�hnYm]4�,��	0a
�SSCK>�g�d[a�A����'VƝ8γ�k闹Y�k �!�{#B��R��R�{�/<��}�
1���Ի�@.�����`׶}�w4���v��=<��O�Q�WD��M#��k'�ed����c�Ƌ����D�_ÿ���
LV��pM��Rh�.��X���\ ��<������q�H�VM<���ۈ��
?龙h���un�Q�O��y�娺���F����|�.�&hv�� �"\[ڴKx�^�|o����h�,���G�����GN�Eko�;Y&���&����*bU��'�91�@��vS�"t�d�vf� \�u��3�ޒ(�;�my��0=�5i�%�C��a��
i�T�f3�����	C��`}$T,0��Q�?&��ERPm��x�����fqѿ-R�v��S�������� l���t�R�{Oc�W��u�U����,GT�@���fV����t`�>��|��������]4G��lQ�C�����*��Bi{�Nc%hʸhk+I��*(�p´�%Gõ3�Y:4�S4�d�]�2H���
�vAɾ���fg��r��Su��݉�	+��d�*tB;��Ey�ls��4UݠΗVE��}(���]�����)@����x��5 �~�G������h��=fឋឋ���5!�_ߜ�/8���a�+;&H��.S�%in�2.��_X���+�:�"Ց�zr���3��`���y&�c�:��A�v����ؤ��2s�+�5�:���\C���]�!�rT���-6pK�yb�,w9��w�.�(+�e��y%M��{C�7q'Є-r��ko�wr+ ���N��KM��/�p_,�O�{Պ���Y�) �C>�-�� �݂d��-���6W�������^V�9���0.o~,��7�zF+:���Դ�4K�e��]��̈́<Nne��x�[j2�EZT�����|t�rk�W�u%��Nz�'��,�ac��`}4��k��[���G�+@M��rdJ�'�k3�Y�,+���q������Mn�ȀP���]K�Am:��9���VMaЛ�A����D$1���y�#�=�<3>�L����Os�|�F���p@��5��h�%��[��:��2{��j��b%J�������,�X��ڰ��G��d,���^)Ǯ�V
TAv�4�$��1JA�2���.�/9�Dy��s��B�����O��,��ï%��޷E�d��'Qi"��U��ys*����e�d���G�lãc�-��V�����KX�6k8�'d� ��q14!bJ��o�Q���c�/Ny���nß��v>��ͳ�'��dXޢ�<SI����xeZ����I���ob�|Oʁj��t�U��2".{�w����*d�����u��A���ωn���{�A�9��ܯX/)�9�ZDP�/Ȗ$6���(�B(�|Q��nW��q�u�@�`<���$L���5Eh�`	�k�w�Ê�|��0��K���+�`7�7�?�]��р�7��>Q�_��)��	�J��Y����j��0Y�����&��I����y��j.y@#k􅿡�oј}��d���3���t �ZU�7���ܼ�.'WL��y�V��{|���3	�_-4GV���R�E��݁��3H������B�����}�g:i��(��P}D8"#O��?]���WC�I�/���u���@�3�g�i�h�zb��.����(�E̟FpL ���A/�^f?�Z/�ؐ��yZ���qcE;2�+����ne�aQ_pRHea�V��;:8�����l��Z�ӯue��*V7��(D��uc/"���!q2���Yv�����2� D�;�8� ��F����C�3/]���c)/'R	��U^������uK.�t��P��.�T��ƭ��m����|�#PŔ�0�IN�Ҵ� ����X��d���ªƺs�c]��5
(�u7����-�<�� ����8����5ZP���RaS)^�%x1�W)���J�Х:Ĝ0I�q�;�Hl@�	G�(�O�餛f8vU�����T�oZώ48���9��֚ՏE�c������{z����Y!b� x]��c)5N,����y����G�K7><��(ϛ��k`��:J�r����r�k�3��s�dg��=;E,�vW������
���ҋ𕜅s+e��.�?I/��p�W;����*B���������2�2�3��@�HhO�!�%-LĆ�W���_�&Ъ���{g���y�W1}�Yp3mQ!ҽu���@6b5p#\e�bw��X�1&�}'���'��=�Ơx����:�_E߈���Ɗ�1\
QF-�Tꙑ���6�RF�i��
20|���eb���U���ΘZ{R?� P��%��XjǦ:��ؾ�@H7�|��X9�=�x��T�5�����d�&�~�@�Kg	��s�Z2gS@���h�3�S��J�b����y���L�J��o��H�����Ʉ�-Up��]��7�Z>�S�Bfg������SuW)�2���J/�R�.�hCF�N�X���Fi�(`m WWP����g���Stx��Ո�gNOz�����8Z�mG
�m�OG�ȱWukm���zwi)β��"��ޛ���T��,J5o����lV}�I3P��s�����B^���{��k�gyb  C�3dĒ��x+t*���G�F:]�Yf:<i�n!�ރUŦ�]&��⥈m���:����
OU��3��49έ���F�s���/]��Ia��s�|e�%��6���{w���L8�F�Xv����yep���1��ߍ۠wF����xzP�[n�ք�ڏX��e��lD 7-���H�,x	q{���m~p�u�֖���
�_���V��y
?:EێI�#�W{M��/�tO��ή�¢Pj#_ܱ��ȶ�e<�ͦ ���I]�5�+�JI�AS��*�o�@C�U\���ㅿ�8�+�'�g�X�2���4�XP;���r"Xg�b�U#����"��s�'4~��K���=�۫W�q�D�+(�}�κe�ڼ�et�_ +����;����L�8 ���8��<��5�uF���K|��.�Yz����η`Z4�D�śx�T�|���)ؑ#�����.nӦx��T}*��ڂ�� ��;FX]�K�S�i<&�6��٬���8T�=1>?H��Qݧ�}^�����0��Y�L���{^=���Y��Ѷ�뾤�����ҭee�%����d$��V>�M�c���+���ZA8�/A���xm�OG�������u8}�P��-ux��g��:�'���{	�:�Rx![
֒�#į6����Ϯ����AX.1��SWJh��}�3��'g\�q����p����L��G/�-T��g���P�PL
&�,�ͩ��c��⎞�g��u��K"Y�\ǌ�^(i�����H9�ŃV�M��W����mj�pY��S@�U���!(Ntk�*P=*�+fz��a�Mr� ��^���E��B	ߓw�
�E_���w�h�.��!��ѝ�Z@n�QI9����4X�v��ۘ�"��>�}dB����A�x9wg���w�����GS2�XȣB�by�8�=��o��� LCi"2fV����Ԙ��+6���X�3�KSs&�#�'���̭�=�6s���V��֋/����O{~7��%�U�F�ҿ|�ф��_�f�mI��k0�0o���X���?!n7�f� ��ࡹ��L8|�O�=YM����B��|��z���b0�,�.-%A�eL��3�<)���olC���g޺�o	�$&��o�}�ӑ� ?�씏�Fs19���1�f��Z���D8X�Ͼ���fA���x����*�%�4�����)F�J�.?�<�0���[�:�:����C���"f�y���2p�a�Ǉ��3ɕ���6c�m�p��6S�Z[�hیAn ��t�����X�/h޵b�rLeC�v���X��C���?Y5nǟ�h����^���v��-��?���u���ߍ�l�̸	s��tEnε�n7�<��a��Oe�c��m��j�f���|Ԇ�T�#Pb�)�b�������8�@UX��[��޴�Kl�%��a��"����"ӽ�<;k=�+��^)+�`��:\���:�c��ݸ
߃�8�q��]y}�ǝOCc$U1�A�-���g{[��:O��p=N�����]E�Xs��\�d�)Y��\|
�X˗��m�>�3�B����`���s��K{q�a���sm0���W��vm�!@��蜜�_-��Q��Ouȸ, Dtx=�,)�##�?��=��5{�<�;�j�bｙHH���ҫ���Vv�M�MK����@1�K}U���#��"�f,}��'�[�଱��.c^�\`����z�o�]]z�h��?�SiR�#`y|#&;���u;�� ��Z�:t�B�߳�[�엞�m�xp��M�V��Z�1��w�p�c�=����	�Y��Z����v���W˯�Un�S�/a#�a�q8��uk)��)g5���;��w]^L%K�LJDyC�����u
l��?6Oˣ�u==5~�[>bmH�C9&6`���yq��	,���|}�rG�͖ʌH�������g|�<��'���aGm��\f�/~����B��7���W�d���j�n��m��~��	#��_��;U����C2�Z5���M���xK{�zߟ�N�	�����;6]�g�d�GKl)�E��T:Kw�HN��b���<�8݂RT�4in�:ɍ�2T�(5��Hr��$,P��G.7N�Ǆ]� ���N�WH+h������@9�G��]z?��^ݻ����o��'TqDG���I����-[=�P���_@�)]�b���ocP
�^4+	�\�s�t�g6*����"'����\< ��@$̘�MQ�Q��Vnf宁���C��y<6m�Io�W`�<P��AZ��`c�L�z��49 �7�Ѳ[�p4ϜJ���)���I[�`���N;g��Gs���i]����G�4�ՑX�c��J{ ��e��̓�c�S���v6�lj�~��I<Z�q_�4S�GWd6x��c=3�$�k���aEVtV��'��2�*��fQ�e�YE��8'�Z�(�����+nC?P���d(��&+Y.��T�x���_Z�D�q�4(3|�qF1���B/{̹+u�Zci��\�Xޯ}�:־Z�����&��gw7rM�3�b�E)�qX��H��C����3�{Pނ�s~ٴsM�J?�﬷Kvz�HF�P�ս,��T`~�O8�����U����H�!�y�8K�t[������Q�J3:���3�G>���z�T���t���X�4�C�O�:�F.���.<},u ���<'g�֘L�  �پi�cM�А45'����vZ�0�%�#��h��!�}8��v���zg��X�y/��?�G4k��⃉S�Q�qO�m�T84@���� D�ZT�M|՗W���7��B{�����Ue��pL�֨4��}�I�}%����
��:���������b�ݷ�e�^�u�1*g��_�|����*׮@5P-�7��t2Q�I�Ud�Е�4�ć�N5V� �o��� ���B�UMT � ~�l&���Uxu?���2>w���p.*��'��4��T"&K�(^�cӅMd?'.7�`6�9'޾Qh�I���rR��=,ئ���(�V�]���������r8�v��+!J����>Rx�G*�(3\H��<Wԕ$�[�4��.���6�|b�Q�w���ڍ�̯o� ��Dt!����QQ��\'|�J��7�6Z���Iz�I#�h\�5�5 ��8[}<4���t�i��Ge�^�l��lm�v���h��ĕd��h���a�^	�BݟǨK��M1���'Lz�JoF��m��J���'��+3,�F�xC0�q���?�[�/ K������xyw5��|�ۃ$|��\���� �������3��R�T���T���FIfOre�޽�%T�ϟk[.!6�T-�V��������_�%�>� /I�u���<�Q��@3q��f�E{��!@�b�D�V�$<�9���{��0����\������N5�Ƃs'S�݅ߠH`��s2�[#��}�F?Of�ɖ+��C\���5��h��ڿ+�6��[��MM��G�g	��[��c]2� !�)b/���
2�O�]�h$�����j�^�G�^%=W�EI2銽N�b w� �V���Y�:K;z��=���/������?h~|�^�U@�Z�]~����%3&�5	�;�Х��,�K�����)�����	�b��ȵ��<�@��٠1G�p�&�0w-�i��~�r]��S��MB4�y�8� �y>�3�">�Ð��&a�}�
D2�0.'J�f?���YS�_~v��G��,�Zm�������[���&�RSI���A�Y�6��7G��-f���j�$��%��ì2���(�kͪ��e;}��ҩ�>��!�*9O��ٳyml#"O�Ԁ�$�{h�e��
3��8[\�bxi8xn���� ��	jW%s_8����`Gt��G�!�R.ה�?���Gb^�c�b�6�~�ɞ���|�&;v��T�$k>�s
���&w}Y=g�>�@�O�q�2�W������;����1w���N�OJqN-&}cӆ5������_�=��DJ�����	#k4�"��P���z6)��ܖH��h�T{q��`����;��	z�<ͮǤ������۶����������j,c_?,�	]��5��{�6\F.����{ǉ:��K88�N�|i"i4����#Z�2�2,���~���'�PQ|ϵ��Q5S�ӕŌdL�Oمh�&-�{#���C�����vQ�L���S�2�\O�=�j���|B1��(�T����!e{��p�K���?̋��G�����{6�V3a�Y���v[f"j-/#$lX����YqR8���m��VKĠ�]M��Ć��b��?#�ڿ~?�1yizPP�}(:��sVm�bM=b�5��vΆn2��l�L|=�:��E�w��d׮>�#(�)���D�{wd��9��A���Ѭ�C2�9���/#�W�t��v��;;~�L�AR��a�E�`F�@5�U�h��8H��g.<e����A� 7��푇$�����G&�0����屲 ��X���Z�����O3K�����]
-�օ� �1Q׭P�F���k��)��ۥ����O�'������Yh+����-��}��j���~Q���< Z��յk���ʉe���^ tϫ�����8�Q�tT��q?�b}O�%����=��BqL[1Ո�#�� ��sCN�kU���C�@ohW癳?�DL�L�@7F��{17�L���EƐ��1�u�����;Ԗb��L]N��֩��Yq��!�%�hEo��$ž�����ɪPL�jS��5���*@����j�!ԛӽO{m�Ss3�d�j>�YO���|������z���)#l���}#���Q[���@��Ct��&�٧��a���~����l��&�"�R�RgH-����78�|=n��)C���u(��S�6��G%��O���j�c��Aj��r�M�_����=���UU+��h_-��,�ʈ)�i
�RR�<u��$,�p���٨�H[�I�f1��U?0C�GV#��n��Cm� �:is��{Hȿ��1�H��;7��*?��1~h"���_c7�b�J��m��B�)�
A�,�2��Ӟ�軽~��E��Ѯ( 4LN��{�D��'���]b��vϷI$����gg4ی�e7_Ҩ�6��8�^��SGL�Ģ(�F� ����7k��ダ��lj6�"��}���!k��ۭ��{ݕ�<M�z���~�΢��&�8���-6�Q����1�X3+�y��{er��-O�๖M���8b]�o�H����BL��JZXC\$�-` ���M��U��`�nL�����U�\����5����	���uL�4LI�EFeb��Qe���@�'�l���b��c�'~�~X�7����ą�-�h\7�1ƺ�`��li!�//��A���,&�����ˬ�v�M@jB��]������D�9�:����	�I���D3�Fؓ Pf1�,(�(E�T��� ���X,�||�~y�/����W�6�l�N��<�W�"]vlc]sKd_��9SICOh*t,�.U}�C����u=�����Y�mN}1
�\�GS0��� ��������.��?��iL�X�T1`��pt�pDϼ�3yfC%h���Fq��!-�(��&)4^�ǋ_J�}�����J�	`���l	�j��=�瘑vw�]��c,�ҩ����Ai���PJ��Z#�31�䰲 L}�H�AT�#��!��mkR_��Ϛ���Q(�E4X��vp�����} t�$��7AG4�XydG-
v�<�����wAɟ*`�ڜ�X���3�ѽg|f�LG�`�lB����z�{R>|�Q����P�?-�k�Zf����vm©W�$�}0���2�����gKp��\i^��!��u2�Q�ٻ;[8ܜ���s�)]�4@�c��C�3[�Z��?C�.��c3����\����N$޼+����,��P�!�X���;E�'�	(_+�%˭�K��l������RG+bt{����qأk�?t�p��2��g��"Qv�i[zd*n���Z�^�Ѵ�i��8�D�E�J����I+��$�'|��?}r3USUGuNQ?g�A=��Y��َm�<ؖ�tI_��N���^��S1���Xv3&�b�A >;�}O�p�	�o9�C����"�f�U�^b`��jE��7�n��:>��mmH�� �3������<6>v�����z�e,��Ȕ�����1�]��sB���"�2i��ZJQE�E4&�bџF�& WIQ���;�u�
���Salk��e$��g��;5}*>��2�r�� ��rk~(kg�����E����#'���8�>/�e����a�#����]4�jG��!g��10���T� Qg�Hx>a`?Wi���Ym�'�eK�9:�Y9����V�9Lc�.��.��?���]Uè�v,cwΜK��-����aq�g= ��R�F���>X�T8��n&��͑������)�w�&��PO7�e\��2"��iR�p���&v[�M��ʫ;�2�lk7e�~��\�iY��ء)(O9S�����N�5��X4�0H��+�5�������?�pX
N$s��o�S��'�|����#����`T��Ԗ��7%!@$Wtg�e�`��=���\�f$}6g�a�d'�;]Z{��}��6�B�4}hA�l����*�ZqV�총>e�gb9|p�n�L�Q�"΄��Y4@�&B���_n@�JR������ ���ٿE]�v��<�N4˳�(�q.N���)�wQ1�{��'����lx�{�LL���ڦ���}�d��*2LIU������#\��#Ǯ�ȩ���O���/j��U6���	��92���[��/gxي'�x�c��|�<�c�S�� ��(�/�6���R˟��`�U�-���Bi��ٝK�9���H��j�μV�ĵ��+,�F�B��/����5qi��%h B���:�984��ʇ}�5/<sU>�J�&�p�)K�{u7 `LC� �<J�N��)l�����v�q�j,�����7&�,����mf޹��f����E|�X����nĻޔ"1�uDn!����D�}�����J �2��w� �"��[�����&����Q_ū�;��>��l#��I�V�q3��J#B����R���-S|M�)�'T��މ
 v��~?�F׳-s��m���>�6�Yn`g�T:y��-�-2�Հ!L������@�,
	¢@�T$
�T�W%~9�^���Wܺ�i�_ _E� :��7�.K�W�4d�[���8̏/�3g�lu��PW�ҧ���鴗�V�,���N��,Rt$ "P6���PX0��!�T&	R���������|k��˕3��H��ş(G���y��������4o]��ϗs�bG�����.�8D_��)Zm��R�,��#��R��P���	X#� ���Z&�!L�~�����P�P,�B�*�\y�����k�޳n7淨��9�#��g��Ѧ��&��x��,��~HQW1��}�%FDFţr��Mm��o�_� +��|AF��V+���
@� (`4(
�`�HB
�! �D�s�ή���1{��^K�,5���
��׷Ӭ���[�}g�?4�u�>f���{�e��u���<J_+E�b�o���a&G{�K}�!{��%ڐT]B�����!M���a�PL$B�P�P*	FaD,�5�j�������5u�U���ԺAZ��*]}�����:�����0Ą��ٕ�uJz�;�o�U�oj{?U�	�?s3�ʿ'�UY�# �GXs�!/�b� �����&
B�`��D	��&+����ܺZ��|5W[��8��/G#�����o���5~�R��⸿����>��_�mS�7�����w��?��k9qyĴP�&ڛ��Ry)� ��)[�j^�[��aW��!J������`�X0�� �(��#0�Rq�>��e�m^�y��n���U����Z�[���v��Sߧ���RidU�3����8
����?��+C��wB�V�R̥�0b�d�b��H�/qS�&7���PXH
0��(
��A@�EMs�T�_�޵t�"��Y�����t#m/����i���g����ӗ�׍���$o!�o�}&~.M
'�{�
se>ܒ���$���< ��R' !N�������0�PnB0��&�d�\�*��g/'7u�}��N��>�I���]:��~tɴto1����Ǚ��B��ߣy(WJZ>O�����D �&�C�oD{+��F�¥N#
J�aA0PjA@�EIS��]Uۛ�k9�3$��~��>�U���Ij�'�?s�����v���\�2<�^����M�$����r:J�gwV4Ni�{���)�@D@Pa�!O�O��r�a�X(
��P�T("�!0��k���u�7�[�5�}����_���/-q�/���JC����nr�t���/�V�C�U"S͗�3"���� -�X5h X%{n5� ��2P	�TkGB� Xf�A@�LJR�Ԯ�W��^��R7�MOaԹ�`�*�t��Ǿ�=M�i9��U�j��5�:_'Ac����w�[o�c|�_����,l;����}����
v�%AY�8!O}��������X*
	��P�\,	B0�H"#��/���W���iNx�M��}���a��ԇ�:a��Ne���0�����NC����1�{z�gD�n!����|��WСc��eI��]� )^@(h0&�`�X(5
Da�f��^{�_�������BU�?�}����rY�V������߲|���5����ߺ?'�/1�MU>�]��g��?f����fu��U(#�@����a��!N��v��a�P�$	a�D��w�{�z�8��[�k?M�^З��˯잙C������_�}t���{�y"�/_���#h޽ЕZ�9��̎|)��c9��� ��@��T,s�P�`lDB�P��(Hc�q��:�=�7ϔ��t^���<���j<6�#ן�����N���{�c���'� ���Tm���>�������+ ��n�#k��F�/#��A�?���TJ+dj4��!O���P�T,%
BA@��"3�w���5W��&����}������y������~۲�͹���������8��W�z0�Mpɏ�]M_�բ��w%DM��i��Z����'s�@��' h�.E�CA��Xp
¡A�B��^��殯��:��\':����G�d����T�+�|��ߕ����+!���rN�����WÞa�Rv����Q6���uWu�妑>ǜQA.S�z�Qkl�!O���f��b L(6
B� �T&��&8N;�s��nz_��;�W>�=����>}�k���L�c������i� ;�?p�͡��4��H:��_�����G�2��~���g�"��a�: ���d,SQ!(��%uμ�5n7|z�%1�UkO���?�����ƍ�|����~�����>�[��m����/_�Do�]����u_vO��F!��!k뻰��\�l ��h�0�h��p!(K��ca�X(eA@�T(��&[Vֻ������K��z����n���t���o�5�G�C��oڹ���}��3ѵy�h����J�)����v��0 ˑ������.��7 �: ����,(
��A�P�	BA0�L"G\�u�\��;ѫ�����>~�k?�����W����Gʋ����9�~���� tB@r�W�;}F�p.���E�8!���Z�1)O�"� =B�n�G���!I���l�f�I��Ų�UH�Q�a����4�PK �S~馯�.��D!76xJ���/'5���.t�����lLJbWW~��C��D��+��Tq�a�0|3����{��T�T oj��*D��N��ߨ�Xv���Խ�LԑR�ڬ��*��G��\�?jK6E�v^,�xM�����b�a?��D�,��Ӑ�'�ӆZ�O[Yd��U������Y82	$�<SL�5���q1��		����M��/��  ��O�����  i����\t�Xܸ!hJJ���������l
AALH	Hp�{e�x��9�)Ym��={��ߏ42y��}��c�Y��?�\�Ur��i#-����
M���\ ��ޯ��T��~5k�p��WOFc��x�	�^أx��K}3b�&
�H��&a��UP�,!��@�P$	C�_���]ן\o�kmd�TVI�3@o���u?�����>᤿����]��+�4?���]-o����Id�SWH��+�I�<eձ�2VȐ�I���c+���!L9{���Ba�X(
��P�"��8����)�*��V�z�C��}���EW��������}���;O�?>���о����?���L�Cpxv��ET^N<��N��2\�Z�̦F(�.���1�V�̴D���A�Pj)D����}x�f��]�*�}����!���g�r����#;+��xO�q��#�u\{����u�i��]Co?2A��<M6!O.�)t��cFC��P�Wp��!L�{~���a8P��a!�"SZqθ�V�\�^��I�ҵ?P���|��������m�_����o����Ŷ����a6�٥�?H9���c�B���h��z����2�X^u�v����jYjM	�b X(
BBALB���������KλL��@��1�_�q�-{�M?C��O�]�B�)j��'�S����ͅU��C��V�}���j�}k��܌���Vʋb@�ˉ�I\ p!M������a�L,%
B�P��(#�B"P��o�o����m�ަ�t�>=��x5�Ǿ}_�Z��T�'�_+B��U���
�;�~�����~O�y���H�3m%5@��H��M�E�e�
��O�]	��`�L(V
�� �H"���������ek4w|U����>�����e������&��?�k��} �9��z@�q�y����JA<{>T#�Q�3MCol �1�BQ��Ů��8!O+�����a�PL��A(�F��%M��<Oo}]��}f����N�ޣ�i��4z���^o�����-�����]��P�x�iF9G�=�y�.b�{����ע/�i���B��f�?P�ܤ��[}R��ʙb~�*�4��@�P����?_�����ی��l�]�Rs*���x���]>�������e��u�|O ^���+ߡ���G�L$�O�Lm*����ֳQ�+;애�E+�*Z�g�!O�������@��,�AA(HF	�B#0������{W����c�s�y~O��V6�7��!񗮏�ˮ�ݡ}`���(�ڨ�o�
�<��~iTT�q$���x_�d!$2@�����Ԁ�F� +�+A�lHv��@TP�h&
	��A�H�
�"0���yo�7��}w�]�/J�54~�Z}9km������a��_d9�A��ܯ�ߛ&��	���b������U�%4�[�M~� �]����@1��!L������p��	B�P�T(�Ba������k�|w�x��׎���p&�[3޼����q�����+�;���A��X<S��H	�_z�3�4���&���ElIU�}��^�*��D�Q@'��4&�@��,
�AP�L*���>�?_o���+����%i�&~���<>���5����x���F5�Jz͏h�K���7�� _�wkrGd������$�/�edZt4�x@�zK)Ǹ�!M�U�������P,���`�P*	¢�T&+�_�f��+��5u㉬����o��}=��o���)�2�M��ޖ�=84�;{4�O����9o�Z`k�l��� qbqC.	Q�U'��� %��Pb�� �@�?@6
	�a`�T(EAP�T"��$|^�������ﮪ���Fj����{�ӵ?��t>����?f��6��M�]O0={��ϟh�I���q�Y�Z�d|�CԖc�E�)���� O���&,;��!Om��~��`�P,4	�@�P����8�=e}�o�i��}s��_|�����o���u|����;�������27¤���u�o�>�{Պ�?����F����r��P��J�*�7�� �S� ���P�4*�J� )�6
��P�*
�A@�H&�J���w�޺��~�u��<T������	�I��=;��'2Ծ�����tٯ;f�EGc���K�������4���
c>_��B>�.�^��&,�� �!t[�p  9A��d�����wj�;�oK&#�eC�7˪�ι��t���|�
DW	��!����fԺ�)�A�@�g�m�kTW��=�"�a9d6˹Bj��揣j�|�Ҟ{'j�o·_��ҀϫW�h�.ȍ�N0��{C5��j�Kཾ�7��ǜ�����߬I����� �t�s��qf2��տ��;��Z+��IL�s!�H�b����B���VP��bB�xXH�=23(��ㅂCž����&:r�y�T�1]�[%|������o�8F��0:J�{+1��̑q��8ft|i��DC��H��8������E@��Xv��'�N��y��*�5����v��Ap+�*�C^�������w��؝�o���,e�T�6~��~��O`���{'g'�0Pڄ��;E��Ț�	TAfb=�s �s�#{q��ܢ\B[|��3'�(�{n�rt��/�j]S���_�z�x�����0��֏����,���ָ<߷��r�<�R��MJ�v2iB1���]�K����VaIR�q��������<^��1�C�&xi�+��C��<�U�#�@��*vA�_�[��nB�x�=�tg^]/fk��l΅�>9�y��x��o��%�1m������~'�	�ߌ����WU�g�i�*i�P�tj�ւ�͐�l�b.�\��� �)B��ni����9�{��α=!<�4`��u!�O�7ͧQMSY.%�"f��z	Zr*�7z�n�	~<M���u��E�K�$#�&� ����QǊ���nk3�jn��>���dfG�[cL�K�\�� ���/�rl�Z�&'8L��3�"�ʃ<<
W�]_��<��?��}�{p�d����b����y#��ORy0���l�ʈfL����]������Hc�9�~
���%�	U�u�?�K�_b�-��[�{�=�B����݅-J��j�w��bJ<�&���k{�YI��p'w�[��NS��c�齉m�;�eƟ��­�8�_=UY��߱Î���x�긦�7���؝��X�����D/w�?��&� ���c��������a��}��Mt��A��X����O)��'���I����$�v� In����e�y`�j�1��34��I���&��I�Z���R����`2~P���)�f���r-L�L�����Bܼ�m��� �*+e6.��*[�	_��� �*��M���5� }���E:�{���>Hj@��<����ǩ/�6��X��C�!�0M,��o�$�K��E�~f@/���=:-�K1�.�����P�F��G;�R2 �X�{�g���q��7�~l�!E�$���@��,�-3�@����N�s�@ps��Z��ɱW�mZ��㻨EC�G�٥!�Uį]{���fH���=\�$G��<(��<�P�i�>��V����>�b]�c{=%�q���4��$3�ي�X^w+�=����G�C�+�Ba/6�t�~'������V��֫�s��R����#�U(k���b=o�JLfj| �]�'x�iqu���EΝ��?�=9�H��Y�7�?�i�1� dn�0��W!���N�x�ɫ�U�0�������&Ti,�/E��eG���im(~�9%XA6z�-s�*ޡ�Y0�����q�J�� ^g��m�ʘ�}��i�΅�f�4i�:���� h��B�Y^L�XN��<�d��;u���+��������hFM5ldm�x��Z�q�f+��9���wo?�h���Zc��^G��ۮps�u����1'q�b~�b���l�M^�fR�{�Bw�n�8�5�7"_�{.�Hr�6��H�A܊ eK��r��^�|�f�`|�/n��n�Y�3 ɭ�r�����f-��I�S9�G<������	���ȎL*��&gN�w����Ԙ�I�"Eģ��D��+��<I���̏�FJh���<8�1�@�UR8�5�
���v�K&@x�iקC4>�Ž�1P��S�Q�S�0�@g�.&O�a8��H�t�Ả�i�k�K�x����S�It�\4�u�8�+���wI�m��鮆n�L�o=.� /fvӾo !�> �j�Q�uؖx�]����:��d~#n�2w8������^�Miw�R[8� ������i�)��@g���.Z �`��	n�+A�u�>��Fg=5k��x.^cFUy0@�G�;#2l녅�,��-a*�-�	���p��Gҋ��0'�n�][8|��g;�t� �!���׾R����h�W[M���G��ŊE�鏶M��׋�����r�s��IUgd���g�N�q�S`O
2зJ)[�v1�,'�����-00�i�@���UzΜ�L�����^c:G�w�7��ǃ�H����U�e��s&�Ҽ�h����ݜ����ɑ������{~B����6��eV��(��A�P���D)!>����x����L ��W��1]����-���dF6,yn������~�#A��0���݁jR$�@��xX��B��͏I>Z䊭jz��g��L��.Z����d����G�Q�{�N*�!v`���Y�α�c��B�F7\h�����8��y�D4��8⮙ͅ�Dɖ��m
3t��0�+���!d	U�3E���~<�J�#�B1}�!^����b����W5���",M`�|F*�HU�Ň&�u��T6�)���%�X�2[o,�=�i��F��e�1�!Ј��m�?F�m��:�-!0�I��҆�#���x"X�_T$���FT`�htD8����V�#)��!��U���`�<ve�,C�}��n�P��5�y$/Y.�J�,g�!���K[�l\sY*%�0����\�bᖌ4rK!6J��Fp���Z� ���t���y���l+V��-��� JuԈi*��w
7��v�T�H�w�>+]'�2}����%H� ݇����|��}���U�R�pW�B'�0���W��Px������rх�$�8����tQe+T�>#D�ِ_9z&΢���n��▤\Ľ��U�=ǩ�Z��Iݜ�z8gD`*���X�*$�E�C�����Ċ��%"ىI�B/���)^Y�1s�!�� ��R�O���Dө�i��ꆛ�ND�[P	���:���)u��<��G��a=�5ך(}s5�دn����Km���МܯE�œx鎲�?'l"1��l%�96��?o���x�5�ʜ~{Yy�%�xa�����7i;�B��3-	�H���G��xr����ߋ�������S*����&9�m�T���~��2^n?�;}Zo�*T�Պ/ϋ�ӋQ��`-�A�w�0��ƚt~c�"�kx6���R�?���yu�|�x"`ۈ��%�^�0���%�z�Т���DD5�g�U��4w"V������g(O�p�z �sS��a�с��XѢ8��'m��P��P�%� o�Ӻ�@����9C�_B(@���̕�
V�iF�o��*Dfr�O�/x6b��B�7��3���������R��; �dld�x��X=���]�|{�K
+��dں[L�n��w�:DAz��Y������Y� �Ȫ���Q��"rAz��?�r���HH4�*_�D$��4�v�O�ni=	Ѹ�q1��YjW4[Z9�췹�p�	=B��Bmٙ���<@��C$S�ir��	nyU��yX��0�ƲFß�`;KR��"�TyȖ���)K�+ɨ-�F��̆��Tu{bQ=^��ı��8����f�~Fƚ�ݣ��KY��]�쨮����s���29�|}Q%%�����A�$��Ir+�(�9�fp=��h;&?�_��h��Yo��vC��Y��% ��ccH����@\��a�F���(�(�е���ln�{�#�����6P�!^^��������}��n�۸$�
���J�(���ZX���zhU��.�N�����"4�J sp[����xUT��l=��g��ת��.kF�W���8}?/|������{VO�h�:Jł
�4[�� v\U��ɍb�����)��S�`y���mVՠ��Ve�>�zsg���M씐���\%�J�(*�ii�>��2P�W���w��>�5�Sb9=PG���+u[Xe���u��N�e�!���=�f�Y���ֺÔ��� ��m��д5��eʈ"�
/�gX1u�4Wh��=�������'	��@飳g��Z��O^z쁨B���͊Q��.���Vuy� ��ȼ�GL�|@�w� 4��ީ���������K��w�ܝ�h���w��#_z{�lUbO/�M�}�����ήUl��Y���Q&ijRO���1��+"��*�x�c^�D�VT���T�ET̘�.͞
}="�d�bS�s5Q%��Y�s�w�G�a���c�[��˽W2����[m� ��@ne�a.�����MOQcK�C�ɪ�3iv/�܃�wꦥ�W�����ǅI�9�ɤ�F<�����v�j�Y��̳m";�q"�_��ȃ�����m{b~����黆�r��#T�Rsw��&�	-S�"�=<��櫈��j���Y��`tY��R+XQ�y�8�ѡ�{_��g���(.��+aI��%RT�E௏"4V��R�]��x%�b�)��N܃�}R��Dq�e�wP9<;Z��^���S�N��&R�X�}��K�����B�o���d߮5Iʋո��贽�Q�d�K�(q���Q��{�V�t��%�^C�T������"RCq��զ,I�����Vo@N�����أ�B��]�Y�E~?�Bo��	���z�x��	��}>�Y3U�"������\���N�w��}o���� �6�+:݉�*�f�d'Y�}���j>L�:���#�2�ȷ�(��q<����Y�5��w\�祸r �d"'��aR؍�\=-]�A�W�~��8�4�*E���q/Z> �D�rO^�E|ןN�OC~Iܛb�ή�)��kdD�7ɐ��tՕ� Ҋ^\ў�\������2
̍U��=_��e�vG)NpEL�[,���b�E<��j��zﮕ�@R)j+Q(HtKb2g�qFbw癲$����� rg�����24`n?���&{�g����,��X�dl�1�Vӈ�}x����%�۲mN�{:1L
 ����X��L�[�W��T�?$k����a<3��&Q�����<�v�X�edg~��|�W0�,���'^�Q�h��&J����D�̵B������K'�W,�ƿ��~�pU��)ϔdm���G��e��:�U�Ϲ젇9y���ہ^��껺̼��M���� �C8r��qg&L]�`{�,��ɚ��������|.�q,�5��м���~s\«=�P8��w5��Qb�ζ�<Y�9���Q���i�J����r��镄4��n!�����^0�y<9�Y�>b$�N�����3��<���Qr6�y��T��qo��Ǽo0�ov���dXNҙ�ʒ^z�����D��iLT?9npڻ|{	�D<7��h����Y�<;)��O��t��	`9ⵁb9�)��`�sAW�'I�io���Pb*(F�b�`m��1�~� ,χ����]iot�_��45^��B� ���0�0z+!��.Ci��)L���"�������*�H`���	_�5ل��ÛQ��/?>tSI|���?~dL��Qe�W,�p�I�Or��B�B7r��T�mp�'\�ޠJ��vP"t�?$�c�e�7�{;�dZU����v�8X�e���.��?�6X(rw�}�0��DY<�*�e+�m\F��K�����������7��l�-^�/�L�.T~Z]7����'���9�k��*���j��	�@���N�^*��Ab׉k��Y�e�%�=Zʝ�ʄji{U��s�i�c��Oh��.���~�z��̈́h��g�;M˘G3�:�A�����`@7��C{��C�Uu�F���2cK(B�Ī�T��+4M�`���B^�a��4gt�.�fX��lD�����٥{�pިٷ��a��^�R�'H@�B�v����T���u�|�.�%�Wu0`����R�����$:X���v��+����H<�RU-�評� �";�s��\ڬ�ɻ��D�����id1a��L�o�C�V9�Kp77���i'�J0*�*���z�7����#ѹ}�Rw8���P�LHT��V��9jo�N�ˢy=���	/��y�4�Je�⁽9nC,��@�����5FyJ��$���ڤϤ�3��Z;�߲��^�!:���0*�b���g
����7�(��kV�ɠ�x�f�������8u��o}���BᲥB�ߟ��t-J��$�d�8!�퇀P1��d���{��ʪ��F|#��r0�*6��e��ݨ;���T�5&k�6��^cKB���tm����~)��eZ(B�NLMT�{�m���%�W4�Mkx��f���3\��
gm��]�N@f����1���YI�7[�p�4�Rn�r����+x�!' ��D���$/�/e	s�>�?x+wn*�l6�D���8KC}Vtº���\n�F��_A�� 2�Icݶ
��sD��������+�O�~W������!��$�-�E9��5�ya+I�� �r6�O9�l����l=M��e+f�D�N�Z�Â�XҶ�w$�x�%�#��rZ0�PyNM���ď,��ȣF���Y��zO�m[L����8Tʋ�r\ج��qp\�A��2�ȕ����M�Q���Ǵ���}ƾn����R��;�bv��_C)	2bݲ@�0�L!�������WU��wvRi� B��_���]8�_��i�]9iqzh6",؛��q9_��
a��������R�Ӧ��yL���K�4�w9v��	< _R��!�!�>��#DY�Qv���'��Wd3T�r��AR̩ʮo����WN+�	)EE��2z��� v��˭#�~ Ė�z�N,�����O+&0�n��UIj���q$꾙�O����T=�wRU2��mz����]����C	U\t�PzТ	����P��b��h�B9jF�7��1���0��k��r�f�n�}���L�̤��^�P!렄Я����ݷ@���o�!�~��:�I�o��>�=���I~c�{j��c�$�Z��AN�t�����Q;���M|������	�-/�� 3��t�I��o*c'�~���q��_$X��2�������~�� y܆V+l#�$zR��S:�i)s67:'�� +K��u{�Õ���\�F@sN��.���#����G;)��b����I�������T��d�~lw��ꍩsl��¨"��5�`�~�dQ6Kg�(KJÅ��پl�3e8VA�;���gM�\�mac��ौm_���a���#��H�ܘQ��c<�Ǟj��j�_;���{8 6���8`��;i�N�%�j��������Z�#?���T�H��)�4-��uom<g9j|�೗*C?˱�G�����j�Ю�m�
��H������{*R,,r��K�X��J9vIh�`��>V�Fs��"�l�� ʵ�v�H���Ɠ"!��6A��ߘ~F�J��҉�A�N�l��(C�6�g�=
%�f��VX��f�-nvA�����h�c� ��Șa����@�:���!��s	:6�F����"�{F~�+��]�f�*��`��q�8�}�[�z�1IG8<A"F�צ\���c�)pNwЊ}jzW�1�wQ�`9'͝�\��ٕk��;�T���bh�ˈk{�'��pو�����h���z�7A��ESAn)���ێbA��;�v!�nХp�T�LS�cn�3S��Z�F�Np���_H�f�a��� /L{}�հO�����i�Yr�{���7�肐��Z�Њ�#P,�z�٪EtDd��ADlQl` &u�ds�
u7q�@�	;RE}f�%����!�q᥆�R��XvM�1���X��Y7/3.,��a)+��/�u��xˁcT0E�DY/ޙ~vR.��Z1�N AgTM��,oa'���}���5"���Q8��
i�ؑC��
c9K#�}9�3�Aƛ�_���,}��	�������ډ���
��lwrΧsl8��$TRX�Ӱ �Xc�M���M�}���C�\��g�t��	:\�iG�W2�Cͣsn�`�>!E���[�h�G
�R0�\괫�Э*,��F��
�q�+�F��o�u�� ;8�&?�YX#IyGH�S�|����|�e�e��Y��5Ea��0��Z��¬�Q�.��>��Y�F�v�YH��|~��I:�Ųy�����!'�*�
�Bp�Iө�2�Q��T�����G~���o���3�a>"��s�nŝ�	'�Ug̮}�~�������mQ\W��c@�t��P��Ɉ� �X�mSn��͂r]�2�����3����fT��4�3Ke#ȟ�Гo���{F2�	ǰnVt��۲��G��㠪���S	T�)�����)�k`��&��WD)�N���Y�[c�$�c�:�(7&����<�yo
7��HX�!���c�@���H�r֍k�Ky!u�&,�z�N�4S21����� UY�� �%{��A��X�sMhb��<gp�r����F%��Ŷ���rб���km�]�t�D�ķ���N+���Hwz.�j�I`?K��k��6�\�<f8	����v�H�l�6!�k@bC;��S��6�!�;gh�b���㓮��
�@�U�/��<��x�Ԁ㤠��*�O8{�N�nk[������k�\ƹ���I/�u��a�B������삅��z�|>��9�����Л�C��6h�L�礂U><��5��(����hn����^�0���L���X�5ޜ�[=�t�#�OzXʪ��U_��z�uM��z4X����"��!��/V?�(��k�t�u�  `�eGb����M�-�<Q���譲u)&���/���m����!�̫��A��K���A҈nqJ5��_ ��F�B��0q`��������TW���U�(���G�
����ɻZ0��N���uF������ԉ��/%+[N2�yz�RՌ���W�2�������442�/�╜�����$��Z7k`�KڰI�v�;'+�-E�ֵ.��0tpoe�8��H/���Q��P���?0��R]O��+Y
�*�����t�%�݁yIQn�-�Da�G[qD,��,~f �E��y�� �Bg,	�t��a�s
 V��_����u衙�vj�݀R	&|�{���ҫm����׃�폿�C�PX1'���&���V��J*�?���S܈�V�m���i��n�7r6#T+��6��5u:Jc�}�����(	i֒j�hx�%O+��O]����Ӓ�����V�|o�í�r����Դ%���Sf��b^�&�:���5��©97:#�/oi����@�1S���%�)�Q�T�*���h'�>|���U���Y����n�����W�������it���wcq�׎��'p��0>\PKu8��L͐���\�Ɖ�UX�>� ەW4�*VB�1$�aߡ�K�J�-<R�
9B� �c������IV�BAV�!�X�ڄE��1ʑI����W~+�%cA������- �B�Ez��Y�~�:
4WX�ҡ�܌�����/`	Oz�����o	��y̞�r�KPi�/��y��"�HS76��8�
�ф��
ʽ0El��B�_�^
�<�-:����T(ڦ�GJ�4�6*��-�x�mz�}���q�{gsLW�}�� �e��cgc�qgk��1�T������}x����Ι�9ŀ�n�K�t���[7,�?�]�sp���I�]����5* ��|�!�W���u�4;�-}��x�:��ݡ��4�8 ~5��� )_�r�P��tTMg����4&>�5�`߿E5��v��%��^۩��ĩ���W��wFkf��iwǩ�Vs%�.0��P�~�(CQRo/����=���Q��`�0z�����k<��l�'�}4���y��e��������R�q�C�0:��[9�yN�U����G�)p��B4��4�3N����S�0��d��w����e��JV-�kz�o��w��`{�^�	}�"�qh��NgF1��n��)e��w�߭�ex&	J:픒p�A�.]�	�F�F4�.��Z9qLE��r$����N@_�+�J�0��I�ބ*���$�<k�AL��JV�Q��K������̯�@��|�%|��AS����Ku�v�?���v%�"9�n�m��-A^<Y>�@��<�
���]*�w�/)��*C�@U���[�7}N���RD�Vy_���Ⱦ�O���\_����ύ������
֬k�V�t��0W6/D{���=ε����C�� ��!�ｚ�VE(�J![w�'�zGǓ�L����{�Ҧ�u ds�糎���(���*��U;�t|�q`�
u3��^�RH3�� !66<4S��"Ŋ�Y����ʻs��P����Oqܨ�v�)-�jP2��AǙ�CRM�@:!fH��}۹'ub�bG���q���_q�g�(�&�����:�yB�Dq�u~6_Vh��xf�?dE�"��_&|�t8�9�2��:P׵3��q.0�r���0� V'����r�D��o@:`2�\`?�����()(+�3�q����q�Ѱ�Fȡ�&ؗ6̀ty1J��(�XIo�ssGC�ܧ!̃�W�/}Hp�[�n�_��i]���
H}{���{��� �9S<�������%��VHk�|�����ë(l�Q��׻��á�*�Z����~����ffG�aHP��lA�����v�1.��7y�;<��M&}�&/�H����Ƌ̤a�c+D��x>U��w��;F>�{0�<T�]0j����gIb�����5���I�4o�p���,��L�{j�lM
@v��-H����>��~l]����B�,�|���H9�(&��ݒ��W>�Z��Pp$)�������<���sM����IgP�]y�t�����-�.2Y���9?&�~*T���O Úg�	�CijH���K�(��xǦ�A[�F5�J���ޥ~Ff�.ܨ�]E�L�BT�~�����:�/�= 	7�L��poKh�'���^}N�*,"����#[\�&�_8�˳;�D��c�u��T1����+�C6����=���V`��/�[��7+��堸�4�R�e��2o��3�����t�����u���;��m��T�@i�tc���	;k��*T�̤0)�U
����GCw��R@�Of葶
�b��zs",6�������#=�.�͕b/��i��6���%�Ϛt+�t0����J���cnHr�#��Ey�23�Ó��?J�R�Ԣ?�Oٻ�g�W�)���7�p���W����B'&#��e�T�y���G/�F�o��	W�t�M�.����!��d�gf,}Cqc�g�n^�J/&h�2-� ������d�� _��^ ��ω�@k��}~
��|�x��I�?����E+B)%� ��;P��4-�*�a��%�Y%2�t��)@GhR���	��.P��m���fs�h�'(x��+��S��2@��H����K����?�/v�ڵIj��>d�ݧ F��N����y��F`6���Yt�T�=-�5V�
�gi�
; iL�gQmhYx�f��;�!�KY9�,�	�9U�Vp�'��+�7�ݾƜ*��D��P@�Ey�ZL�K�f�ZvߋQ�*���vY��u`'�繲�����
?>�D#����U�b7f��Z�܍���� }��DGPf����[9�v&�QY��,��Rг+�{�V����yڑH�p�'O.�u�Me��Ч���c �{<��w�n��N1�/�WE�	��ίC�9���Q�&`.6�m�7G�p�jG-�)�~��`X>yop!���p���h4������3IG���b��/��tp�}�A,5<+�U�$I������?�y`�����αS��tJ_�.nR$�Z�����h�#f��k�;lNh�i7����$f�Żx�s�I\\$�,�Q>�|Nj�%w�\Iu(,�>p�=].-_m�p��,9����ƈ9�3����,�z�7�k(4 ���s���ç�l�ni��H�u���h�&ɶuX��
z����O���0����89U�,�G��My&Hؾ�t�I�}�q�<�(|��q�r�Ǘ�d_J��`[q�7��Y=&���y�1��s��7���3�������JE��r�\��uw��M��5�!I�,�a�ô1A�X��=Ӿđ�Ql��%J�8(�߿��p�P�a�tJ�j�W-��3�>�ĥ~���&"�hwl0N�b
���iE�l�U�E��n�������2����Ly��Y 욤X�{x�K�);KR],�R�bK����7X4@FI��!o�!s��H�q�L(���Ǝ�����X�k!�D5���-x큩9��o��G��~$���L%�;�)b|����m�����E�M��������C�A�H�ۚ$��c&M�g����X�z�%���S����h��s��m���>?�D��a�;�-9{67v�
5	�2��w�v!�N��#/����Q��й�K��H3�O>Q����!�vn�ޢ�𷎧#5 �:��sl�P6,1�D.k���;zReY������X� B�4p���?���,B���
�(2k[� =�]Q)&g�N!�?���5L�Qd?���I��A_
{u؅\��	||�zDo�����fj��i\/]���O�Bۚ��Ij.-��qy�R���iԘ��o�Z�l��A�t(Ǿ�i
a�:��!�Ƥ0�&�u�y'�U���X��������Z������C�AEٽ���1�(8����b����pDcS���5���ȑp�)<��8��g���o�o����v�
^[�ߩ��N/��J��L����D��N��Q_�7Ro[�BP=r�w)�a�e����p��0-t��\����n!��$&p��J��\k�hm@�
��h��hD��Y��{_X6�>����nP��J�jT�WaV*���"^��H������d�������չ�"�H���o�şo!�1";�Ɍ�k�0�H�I&k�;�a�{�����[��8�a��̊���'x�?���ƛ�pi�(�%G"�v�Oc�͓��9�� (#���h�֣�zڅ<A��Y>1T'�B���1x���؇C��H�唤�>�4�*�i�&����zx��L��OH{�gmvX_&Xt����C#J��->�,���-v�%���rTrp{0G zHz�v.��{�ʌ�BC�KB*�JnW%!�.��ˋ89���\��mڋ�iI��*O�U�? a(YWt�b���b,�[��~�!���a�ݕ4&�_&�������ޤ���3;)�יlp�ڻ�j)��L"{�o�DF@�t7�^(��/��U��2�N>~FPEz�b��ǧF)�5y������������N�Z���:Ʉ�fN �lZg�猐qt�`��"ͽ]Ea؅�K,\s㰪�=.
����N�����nXſ��GC�M�����wz��z(o3�x��}�����Fd�-�uA��a�B(G�N���<�Y�C&����T?[��媒���+��v�u��UW3�(��ώ2�7j�7]T��q�xW������X���븶����<&��V����8������Gc<:l��Dz��O��Ã@HA�H�������
0�Y�#������x��!
hۯPE��h}�Ϯ�a]��bc�V�c�r\��6+����x�=��>�ww���N('o�-��b��/B�Ŏ�מm�2 i�X}"��Ơ��>�dW�(+q��/Ý�L����.��^v&�Aʦm��5��r��&�C�䅧��2A�%�[�K�k&/�9c1��u�o��e�-]�x��ʹл���,�Ζ�dx�s.㳈0��8�P�4�d��h��>�J�=3�4�m��vف3��3�5	�Ъ�k�Q��ǥŁ�Er-��������X�o����K㢢o�
��#�y�1wQn����V�z��Z1��UBm-d	v���0!��M9{h�M�h�-S9��!/M��hu�V\<+L[z'|%���x�)�
q�e��Y����ZU.:i�����%:̈�id�u�%���?5G�d�UF!:̈�v���B�>J���-A�O���{6���!�(��9X�|�
���N������z���A`�8p]g	"�|ҭ���vly� NL�/XU�S����	m�P3�|�9��^�E�   u��m����D�L�;�gC� Y%��NOEs>��ݙ���4UL�B�W h�x�*�׺�;�b� ��}F����^�Ԟ�iF�RM���MP�&��
����P��g9�������^2�p>  � A��O�B[Z ��{
����t�� �������Z��9�J���/S���~��(��L&���%�Si4VƂ]��j�a����E�H?���gR>2����e�m��#�sՐT����8��m
�k�� ;qn�gBN�E����5��%1q�W8��4���0>�Ą]�4Z}�An���.ox�"��d���<�
��/�s�g��i�o��aɲh@��4->�t�{x���Մ�ZJ*�,�6Bh�úC@��Si-�9���g��!<�oc,k��֋ ��~�t��^���7A�ڐ���t�i"��}U9�؟Хn�J\	Dg.�@d]o]2��k'N�h�	_���'&<�z� �okD��9�.�\y���f�mMV>T;ɵN��)Y#-H�J�n�����ܪ��;��h���e��D!�{f8��JN���F _��ϛA����'SS��g��J>�D�#�:@�j����y���5X�3��B����� ^>�_|�]���!��G3�Z)BZ�δ��t��� |����_A�{�a�"���@��8	 I�Q�Xb4,��}���<��'2`���!�*^#����H�E�Q������P�'�Ι�Ik��5�.�ސ�h{p���+�=C�;�"��}�y���u����zyLI���Y�ژ57=5ߊb{��>t��}�]y/�
��ۯ�����O�ZY�i!u~��F�����NWn���B�T誮��h�$:�ny����d	j56m�wO-��7y��m����J�
��S�	?�$����J6��#f��x"5�ǘrUc�$͎�~�_^���fT��W?�ͧ�4�RS4df���`�`�b)�`��U|�u�ᔥ��L �<�t'�� �Y�H�u����S�pbm��ϰ��c�RN��{��C�N��麧�o��
�m�q��m��P9g��"�hv���H뱠�{W)���2(�y�� R��!���q�_o�V:�(��꺞K�^9��r�:�X��1c@q���J>G�ٹ+AEސ��6�����5%�4˦a���<3�{�ɰS�9j]��ﺇ���Y3�̫��(;����l�	����EF��U:�{�2���ܻ��Z�͈�!�7�:�K�����*_;�����~[D�o#�?_tG��<�ˮIv�/������U)�=�i���Ռ�<ho6$�K�3����D}m$mW9�,w�_��~b��;%W�����+���Rar�ѣ�{0XJ�R�w�8*e4KokY�z��,�{u�=^2��C�e
��]>`�	��҈ջfLA^	�\�Rʫ�U�D°���'Q״�ʳey��4([��^�ף☀%U$P�����r�`���;2X�S@����?�m<k
q�"H��G��^C�]7�P��LC���(��GOτt�����"�Ș�nyW��Щ�Ke/��l��}�r������پ�ʰ��*�4m�{ ����Z��HV� ���;^Tp���5_8+7,Q�����-�m��\-K��o[y7Ns�9)�O@T�,����9/�κ�vP="�&�6ݫT�M`-j)]��\`m����h[�Uw���c8�>J�b�B��]�`��ㄱh�)w�Q!K���"�����V�� ��n�I�_Ls���)�egӡͲ�3m7�H]`KG5�TN����L�jIlۭ�&�����s�'7K�vwK�(���g�U/�wEm��[~�r}�7�������c���N���n�G�C���x�u�x��'zXd�.�����o��')
���_@����m�{�R3��H����`�t��$;Z��J��]���qD��:v4�<���=�B,\K�y�T\���[���d�x�w�7H4�гn�(�װ1}J�%�Eͺx4��60>W�QL\�_�2$?Ofj���؄,�*��w��؊5&Y3�<d1��ou`��&I*���&'aT�܎e�d�f�u`e��ه�c���q�D[cX��&z����EN2�+'U�@C�<n��p����oU���]�%�%B�u�)�RѮ�GPtH踪"��8����,c�vE�j�,�ϑ
�
c8�^�a6;��L���>�Œ��'����+�"�%N^JI��:%7�U/�a��V)�B��(�3>*m�]J�鑪��[@������m�ztǾ�{ǗF��b�;υ(d������=Zm��d�@���/�Đ�$r�D�~r�t�����
p��+��i3}����34��EV���5�O=Aݩ��*:J�ݚe�& H�F���Mo��/{�w�1�t�j�5y���������dt[���meւ8������[������2�U+�K�ͫ��Z���Ͼ���?�{:�L�.���t���H���=k�p�p�^�L��� y�EO��9���;i���=�?fJm�o������<Lh�f��l B��*����t.bp�g�H,}�km�ݪ ^&d9��>m/��0��(��>�͜� �I�zwM��ٚ�����B�F�0�)��V�����m���=�z<�C��P�����V<��
7���������/0��v>T��	Yu�ab�G��9�i*{�E:�d�����TNIKF3m"r�>��2�վÜ/�bg=�V~���f��6H�!}�����2|���24\e�2�{�m��
:
�׆��wA�	o5�����`�z2��^t.;Ƴͽ²�"�b�V��$*51��տ�� ��m(IH�����I���]�T�P���B�qЀ�r����B�u�6���:xl�-_y�۽�1��������2������8I�,�������ޤ�<����U:�����k�{/^?���J��'���e�hg�#�UtdH������'�G���q���V�ڠt��bb�ZTU���K����HbM�k��A���Vŋɛ��� �f��#���ʏ�G�}�p��*�$��t�@K��WP�,�^�8� �Ⱦ&z��d�"ÜR<<�J�'ͤd���]��F�A(��t�i�$���6zHPYX�i�~�F���g�v�*�[�y���U�ރ�>##N���y2�A1.Vݶ�[	{F�]L�8�����ײ8���_�h4?�p�럋|e�2}�5;�:ś�Ya�7+�� 2
���^.��\+H�?\Ē|]���@N	ϒ��4��a0߯��@����u�)}�;�0҅�����.T�Q���=lO�(�{}��,�V��(�$M5	��4@����5���(��b��O��i�嬷���$��\�0�٠ö����X\�RQ�O|;�0��<��B!�Ԙc�f��0/�bK�Wdj��4���z"+�[��~��<��0gc�o�0��͉�ڧs��Q�����w�cNs���#����ija�R�	�P
��k��Q�uNd9���n��mR���0C܏�J'j��
�A���}~$�>�a>��.��O��z�3v|}nSa���nЎt �)\� ���]+�_ޒ��z��Vr���� 0Ok)l���� .Wxt��oh�i.v�f����l��F�M�	h*�g�������Sޞ����Q&!/w\�8�y9�U��4X$e��3���Ĥ+Rj�*G�|�K�7�Q�-k&9M]ؔn�)�9`7E�>C��
9��/��p��;�l# �hJ�_�9���ԪS�ý�r��`G.��
���h�\֚\�b�^3?�DZ}���-ǕQ�h ���r��K?+i��7�v�t]�珨������J�Q�^�蝷�m���C<�R[$X�1
z֮{9/��P�'��n:f�S>�ld�]��ƴ��kJ�;�����������1o>O�A�'V�a t����Q�R.�30�f���M���6:w=��8�����^�TX��YW�c�����!8�*�&c�\E��%�߰����t���d-Kj�4E��ԇ�5�p6�n9�8�Gpu���oj��yA�+OU��n�Xt�S6�:Q�HXD�`Q�p| |5���C�'���iCj�z�29��gg<���3�S�
K0()<p�wM͕�5�vE���MO��vz����qi��{0��ʂi��Q�s�������`��ͷ*q��p�:V��)x�#�E}�ZX�;�n����\��A_	?�=�z�4=���i wI�V{��1"��N;ӚgR��d9ʴ����'�C�XVMB[��~`�K�"šԑ��`I�wU��H�c���ug j�!��Z�JQ�����2���^"�n�+�|49,&a�#c�m	)�2y^�p\	�����{=u�X���J�C9�TT�H��aɞr��<5�sun��Q�En@*,��Ӷ���=N�+˝8k���f�����
l
mY&�?���(�ZC��"�ٟ� ��=�P��4*͕����&��Hf��p����e+�[?O��G��s�C|��f���X5�k�7VfaI�V����G�+`��"NL�������y��&�g־� V�E�gO�e�<vG�������
���K�e���#yJ�Yk��w�"2ՇQ^�/��Y\Gم�h.=D��~Q�xL[��B�N�5B:\��i�g�)?�T56-4������abl0߽�Y����%�v��R���i(}�e�Z�*�����
$�����)I��64>��k,#8q�5V����k�S�! �k�I��VIk5t�[�!<kјu�`�[n���.
s{��`^ˍ���nӲ�H��8�IR�xy��$�,��\�H��#��˫�~������_Ɵڕ��ɟ�V��Ԅ�@�Á��`+�00%���0���S�m�n�p�1n}�:X�~��|��p����� ���*��1��j������Wh��?h^w?�tH�t�@RBi���CG$����_�'�&kkJ�մ�7+;rviL��{�byPʆ�����r�_��|�]a�	��7e�tG*>�>�,$�>(&���v����Ry��!�R����P���i!��*�z�/����'�v���`H(,S���mO�d)������6H�`.4�S�J5&6�G,�Β��}dLf�Y��w5m�4I���9P�����Z]�����]kc�|X�kݺ��Q�@� ���E������>�����yQ�|�X�M�DX�:<���K�[U�� �8�(;���L*������-}]������=�E�c/�EgQȍ�Z!��@��x�+����Y`�����	��1-z����`��k7��l��IP�[-c��?2,9��c��ت�9w��4{��;@����D�X%��2$Q2۳D%n��*S��hj�y#�+�a]�&m)y5g��i�3������~c�ܶ����4�̍`���U��nL1��m9�ҹ5�C%.����<h)�B+�&�BP�v܎��a�Ǆ���n��6;TL��X�g��_SF��4/�	��T�?u�t�V��,Ѵd�V��ď�Mՠ�{߳l)9�~���d_��w<�[�!�����P;�:����b7�e����#��g�4Gv%Y���T���S;)�r+�?�'U��ĦŇC��C��ǉ���񨛦J�������z�K�,4UF����������6z���@v���ר�i���=�+ =i�r�Ëc.��/qgSN2Uo��f&ηT�xS��#SS*9k"kL����'ޞ�!<�OLJ鸄�q��A�-�2�.�����P�t3z���Z }*r�h�.)v�*{=��!��R%.��|"�Z�1��`͏�#�@H��pό�ͱp��*�+A9�/�v�Fl��i��!��7�[��NX�JR.�����lsDz&+�Z+h���,M���i��qQ��뱖���מ͐�ˠ���p(+;W=bN�Wl���5�6+r�ioM�1�P� ﷤B�ʨX>�o+$e��;?
���Z��7�aBġسk��P��YWq���{�\UB���P�����(�]�b�Tϔ����lh�������rs"���h*	�W��{��Nmb�e�g�o�e�����w�mJ��.����W�!���P޿���F���D��߁R�×�d��a�'ȎæiP����sSq�Z�go�\/�N��u�ZE�e�i:G�t?
��D�T�)q�R2��TT��]�	�K=�1:�F��|?e�����0 ���T3�J��-)�sO̖�Dm#V�
{)�K	/+5�\B�E�[3���UX�U���G�Xo��^K0��H�v���Z�,2� 蒺���WQ�LM��3#�a+�[��'��[���h� �Q�!?(I��S��B���	��g�]���hg<_�� �7a!�{��Fif��(Z��������1"���F����+�R���&�ԥ'��~��8��m�B�3��4�9*�J�k��U]G�����!?����Ē[�qHum�ma�' o��de󸣟XC����֍���4�ߗ�6D���ZK����l$��鶪�L��q4��5�7��[�d:��O���Ѝ�c�05����u����n]�P�'hK����J1}�g��g#�uz���U]�Z�e�PC��$̞զ���DJɩj�ù{r6e^T�z\L0:�N+��.�� l;�;�괵��[�+V�����/���X��=?ȷ���X#�����2�|��4	����T���������,�����������h����w�#C�R��rI�ۧ�c?:R�s���M�-<ತ������r��$1'#8�";4�K��l(I�l����T��a���	/Lm�#2_��Lcxa��t\
' .�ڻLoIfn�䎚�۟�,s��yƿH�B�&e�S��7���3�����򑣤W��*���Q�����7`
�1d�)S�s��]�Cc�$�@]=T�G��#>3���Dv �&tOm��t��4�SK�w"ȋ5k��h�� �Ek2[����Wf�6gާc"���d	j�~��1}�l� �v�O�Љ����"�&���lc$��>�	E��~Ռl�������c�6'�G�fǓ`.[�s�
>`����f�8��� J+A��]�0���~��������0��Jf����w���x��� E����ч���Y�Cڐ60���B�B����,�7�g~��x�8Tn'�/�r1�J�]����a��V�2�ێ[����:ђ���-� �"K��@�@�!���,L�˵��|�G.��S~�y�2XR��J��A���d%z|7���-�A�Q�=)߀�	��F�ۉ��cd�P^z�h�X}�䭛�/u��u4t<��;�����R��TpTu�#z��	�~QtJo�[�e_w�a����OD�B��Shѥ�R�.��r&��y����1���@3,)���]���z��6 q����\v�n��3��cC��W�[^r�si�}(���T���|���D"��Q?+�|m��x��b����J��g�:큟'���,󞇊��A����*�37ɐ�k��5/��꠮v�7*�ĻҔ�j���a���(�[S��d������yT%9'�7A|"/��S���e��TD��g�!d����ևB8��.�	=���'��9�'	S<�$ѵ ~k�)�-��t��Wb��O���b�5�L�j��6l��(Pa�$�}P��� ����9�j�&�~��F��)r�G�� �؃X�y
_�)jD̙���TѵR��J�l�2����o����P`��ͳ��y�ʶ(x�hp�,�M�9�0�tlD������V?�P�>������b�f'��b$���39��E6��[Mb0��5�K!����q�X,���ҡ�p�o��bi�];����wnW�4�a}��l]b��׶o�����Y����*9���t����Mwj��oD*�G�#�o��(7t��	Ձ�~5ޟ�MKr:���m��PɄN6�[Pt*�[��+�n{��;R�{����2m�����$�]����J�cR�kk��\4�Ü�yrn��᱄ms���_��+��IYe�qD����Q��M&����#��'�&����1R5�9x��~17�2����Ej7�P���8���Abn��rJ݀���@]]�n� ꐔ�8z߬�QC��C��eQ��Գ�2�{�RA7�.[��i֧3��LШ�b��H!�ay�hL(ч�:%��QX'��� �4���3\Y��Ӱ��9}٣UBSd40{�Ey�'��A�"��`�b�&���i{-"�L�^��q	�a��5�� +�9��ze�v�����9�nRXp�s�I�h�"5�;��T{s�~�p�݇���"y~�P�z��ȴ}�[�k�I��$@��J^�=7.�o���_j�"E���ؓ�2�!��h���8�����*\�'@��d��̝���)p��b��3ǌ��@m���zT��B���Kn|��7}�ϗ��J��u��v�c��zr�f��J�(�ϫ>)��45����"9��>24�E����'n�TZ�*qb�Ҍ>.'����X\��<ѧ^)(�7���b������+2Xh���8S�}��J�&����.���+�γ������]��V��,|�\Va�ʖy޻:��}��ݑ�j�0J��u&��7E�Q--�2јL����MW��n�
AOl�#��Ɍ[W���@�o�ɋ<o=ǽ��L�Yaѯ���}���=�f�(�K�X����Y#��0{Woo�2_H�n�������^`[��->����Cp�:��*��B�?��c�c�%!q���SW_���t#h��[�Ws���Kݴ�Y+��D5ӑn���^�A�hk�4`�S1���k��$9���k���ٸ��`�l��*O��w�;Ԍ���@��s��`��(>n�t��B/ ڊ]΃v���H�� ����/����13�P��lq���qmq���S�*6$2!&.�����\'k�+�������ԤH'Z9��P��2C$��0�{|Ø ��W[%3��>��R�D
�C�j؏=���<I��h����I���Ȥ�����}3����lc�����Y�Ic9�g����.��n �>}������$8c#��/c�/)�5�sn��
�c�h`]�溳t�I�A^H�)�T�ks����8���#O�8F���<9��l,tMl��g�a�*��L��Y�e�r�1����9F�T��p�b��0�����?�[��\������ۄ	m�>kâ��"=�E�ϰ1c����~��a~�Q��V^�J�yG�IB�ʪY��ީ�USE*'=��-�;��N�Ԃ������8ό�:�/(M�!�����B��=�V;��iŲC�{=�ze\�1�z6ʢY���8�|\fB�(@$cOuxjXcT�̣l'��Ή��ːk��E��6`N��n����#i���a��.���,ܿ�G��~�%n���d'�I�Լ�֞���G�w����1�u4蠰��~�l	�,�����E�0k�d�hE2��{}��!̏���e�Խ��àޠd��[��n�����nI~�ԘO�u>�B��cB�Dƍ���9pFeǣS �/�w�$����*�Օ�S3�,�
�PA��D6���c���A���Q ���yf�d1�C��9����>�:���[�>��zu�5�=J���g0�'3���u���R}�� +V��U�s%��P�5o��Q�[M��&���2�0�_Jλ`4�]��?�2C�{�H�a���񭬲��3�Gc�*516ԂloT���2��ˇ1|�E���C�`��k2Gz�Mr,t�Hz
�#�Jyus%|tGk�W0
߬�R��]GJɷ왂L LH�`JС�4�|ـ�����*~�O�$[x�� +�F���Ϙ2)�K�N=���Aϭ�**#�T���O3��bi`Ň��g۰�g2����1�!�
�l|s"��Y(X�ah�������eFv�s��be�D���}�=m�P8��7!�ygV&�����YL��������<0������p�bJ�]Y�ӥJ���r�H�
b�$��r��{^V�5��:;�Y%\�lҳ��a���X�'ڎ�.w���{p��U�TC�&%�CD�{I7I�6���u'��+����^�%��g�! ���]�i�P�C'��	��G튀�2�ŶL�\A��jCH:��90�e�~0c��*��Ew� ��Ѹ��50�]�?�xyGG;!gG��^D���~�p�CwO�╵�L4��AsN��N%�'�Lh�<�~�#|�u�GP���͆?p�}n&�4SeZ�����6����q�N�s���M>��5��o��<J=3V�{U~�pޔJ��l'�dI�T�T�=����KꌖϜ?�=�7��i�<���B/�'k�`�����M����I�����f����kz}R�f���HX���Is�}&�u~�*R�&|��a��f��A	ݾ�<R���d�/s�D��	�X���Ԩ)Z���+)S|��B�V+4PH���5,�.Y�D���F����uW�ܝ���ܜY�]����ӗJX�<,D΋��y�7m�!t[�/|��]GiC��+`�)ڒ���5�1^�[ow�����u���|~��a��VF=g�0�Ļ�n�}�I�ЎLݰ�4/�$[���[�~
�SI7�gOݍ!~�AEc�O���&��~�.���Gn2k�_ۘB�eK� ��=	�ˈ���H堨��Y�[:$�A���D�k_�$Ř�MQu�L���1��:G� �	�\����En�s� l�����}Y����2�V�y�K$�L�$�@l��XC��n�SM�e�>�o<�����-�����s'�u�"�CC�'��#@������/Y�s��x\ꧼi&���? \lk���I}E�����򞀍���ܱj�GQrA/v΋��IYt�Ҥ:��0�#��Wf����꽰B���<��u�<�/2�	������v�ە�N�]��D�t��?S�f���!�s����N�5�O��,��W�9�s�t�E��|�Z��zhfO�QU��[B�*L��fi��dJV&����C�g�z��ӥ>�5g���Ŵ0���Og0v�O�]?7e��3�����Ru�0!�n�1y�ǯά�ۀ��0�_0����$Jd}�r����Hx3@���$d�7�G��,"��ì�&���=���ù��?�X'�k��Very��#��EU|1s�W�nf 4<H�{9�`k&�61����pfK�vZ*\չ���,�.����$�K�#�qX�������vbFs\���[Oǔ��o�!� .�=�<ÜD3�{� zu]E��qf7Wq<��gIR�7[�ȒQ������=��9d8�� ����nxx9�4�"�c;��Hc�����o� `tC���c�7�o�Y�ð��$�v :'N�SHWU���X�ꐎ�)3:"8��<=�N	�����-���9�~��~�S���,�v� ���3����f
��U�W��H�h�P5�(Q�i���w$\f��(,=�}��ѽ��	��V��bud����LHU�=�@Yg����N#�1��B�[W���b0"s����K=RIaJ7�7�Y?i��a�� �l�S�]9�4���R�ڃ�����h���2ٜ��M^�i���0y�B{���B�o4��a�A�,����lPc�FT�!�!����q�1n����0����'8D5~������g9��gt��k8m��*[U�-X���L�n�~"?��l�W�Ͷ+����r��_/����Ջy�d�zK��o�/� ,�n/7�p]�um��R(|'����3Ѭ9��j�h'bz�@�����*�U�s���ཌྷ�H-�j�D����0"�.e��^G_�<�딹���IAG�l�צl��u���7n起;����CĊT��h_�$D��u�_���+�>��7ś�a��lޒ�'B<�Z��J������D�z���%�����s�3����̲ �uh��xh_���,G�(z� ����Qً2�n�Kby�@ͩ�Uˣe~ӗr��������M�AdI�rҊ�E����qy!e���,�&)�>d�1j�N!i��B��w)䵩A'�5�
!�VX��=�-3�f���^Z�+Q��?[�Cv��T�����7��ú�v��`( �{K)! ]�����zg&����[$DfV���9��=���HL�����e�o����q��*�J��o�)��b�Y���m�� >�����rҫӾ0d�R�����ylR	�Un��
-_��+�÷4�TͮMM�i<��h�^�����*��cN6�%�Qq,K1R�yk�����⮹���ǡ>sļ��D�������Bu5��c�%v̗���&&�g���ꂁ��`��N�:i�H�
4��=�xmXh�a8j
��g�&��wr�b���cc�'%:�>�ii�����'�l�q�+�^�1�k}hP�m~� �Ѹ��Ɯ6���G	98�z:���O��TЩ�Dt�Ƥ#X�?�7��S�N`����M��%�q��|v)}(g��Uk��dOA�}4�*���8XV�	���!�T%�W�.����74�ؒ^�;�t-�Ꮁ��>��$�,3�?��ʏ�8��/o���3oPBd8�A�:�.�=f���F��bm�tRvp���,�d�V�0 ]GA8����g b��񽳖���̄ǂ�����$�BM�mV�W�:n+�R ��p������N��@�4!����IQ�;��<�h�H�pb�(v�Cr'W����x���j��3�·�2�c:��"-��a$��iH==�Bi���ꪭ��������'�(mr!�7M��7�:�ԕ��x��F��%�����{���{�C-b`�<�9Ѣ�>|?t�5Z6�7����[��"�Rj!�t�,���q��@M����l�4o
]��l	5��E����B�hw޺7?��n�X�LJ�D�i�{��1� ����K�0��
�o�4��S&����[B��I}G��J�� cX) ��0}#��b)����f�����P�TJp�/2pg�n�FuS��c]N�<m�W����GOφOD�mq�\�-�ܲ��K��t�Fn�^��'�T�!����s�������^�?@���cg�7[�˝����@f�DD����Or��~���Y��͐�R�"$4�	g
����Y
������l2�Mo����6v�^����?(%�<x�\�*D87AQ�EM�Kg��Eu5�[o���?@ �F�Dk�"-t����Q���)w�ЖD��Z��������L����3$����G���4uk��s��Z�d�!�$��n����D��>鴓}�%b$���1:��P~�y��f`F9C���V���hy��.z1�D����kp��ubˊn��3I�b����K��[�CU�KZx�#|������CL�\^0��;�))n��N�	�'D[C@������4O<8#��ܧuyG^�\�+��̸A��zvŰ/ה��Y�mp�Ofˆ..ޜ�=IB��"�ߪ(	5�>��JX����x�|-�4A�����Is�DV%Ӧ]`����}s&��?�kL�����j�at����œ�lcksl���P�u����s�낓Mv����ֵ�dʥ{:�D:���K
�fef�
 ��4\xr:Ό ���@���:��p��C���ٻ�zT߿TF>�'�'�4��:�!sa!㾙�(O�C�A��}�R��=�����6��d��Di���l�k��<Q�s���h����T����K��Z�Y�%��!��FR*��OO_Y�|��� �X5�k�^�x϶�9~1��>N^�ɞ�Q˸;N���NE�*��V��E����__d�`cl��VO)h�����(wVds�w*��MVQ���w$3:5�}fz��[�W�q0��&괼���HN�F�H��]����z y(b���w�$��K�p��m�i�偝7Rk(u˼�L��:��q@���X�3�`���O<r^΀7$�z���z�ɗ�vupS���C�2����k��L�����5¼F]����1e�|�~f��#ӓ�U&5��R�3�h1NR�p)����Z�=͙Gp�ަ�_�t"[ַӜyޞ4ڇtdL���<!lm84�>��#*���h%��M��R�1@/'yC�mi�0oі�*�!�$BM�z�Z����q皝�E����`y�`�w�����6���V冴���tJ���Ŷ0ל�b��]��J*����n�g'�^پ!���m��@ج��{#�ͺQ�֞���d����]i^�Ub����xY+����y/� ��LAf�/�=��'�N�9ᘀ`[M\@��[�~�Fޘ����eH=��n��]Y��c���'q��a?g�J�\wP�@�ǳ%\Ζ��&�� ռ�&%f>�{���m+�ا!�gR�p���Z��3��.^�dζ��������h����
��1F�5}z�d+8���v��8��j<X��e�Ό&<�ƙm�h��������*��^�ix[N/�v��8B��lεN��)�N&��JH�DB�3Ӵ��������(���2��v��Do�ӵ�f�o_�/��a���7JOApť�y��i|��&���cG_6_w��ha$ύ�.�oG�n������$0 �����0v6�CY%�{�Y+˲ҥ%����!�i~������Ao<�Ro�����ݴ�\�V-/g=��z-ػ�Qy��ɠ��A��hœ����u��)���b(g/ ����mZ�*��,@��Ş��{��L��W,L��K��IUf g����B��.��+]7ȤGH���T�+;e%f,-��,�m�8�"a��_���TF���m�f��X�Qg��jj��.�Tc4 ��'�°_q")��u�5�R�J���)E��LG�{*�Uޕ�z!�{;�wא��+�d��j�2߁�Q�H`��H�\�A�+�*��U�b���2�&��%��_z�Z�?�KL�oé2�`U��U�:抛�<�5��p`�Ù#�e�Ѝ���řRUTM7�2O������zޢR��h]X@�UD��BwO�,��,$��V�v�Z���J��H�,	��j=�n3`A�9�e��-{�A`u�/(��YV|�����ޛ��%R�b�D����P�~�,άZ���5�|������|�'�N������0��^L�`��o- �1A�5�4h#0�ʇ�0���٫�����a7�ZI����S�HZ���t׃�����lߨ#�[X�~�!�-r�DĶ��~%�#�o����v�bnB�G~
��9�{+ϣ	}��e��s]�"���۳%�U[���SW#�����^��;�-W���Z���k�w5X���%�j��G
�h�W �Ԃ���W���b�4��R��G�NFҭ�[�
xJM�*��fj�x�|vu+`y'q�N��x(�n5��F.��zA&��WA�M�Z��lzW�����F�q�,�D�E�l%w0ن	~���@��s������v���֦��*��4~O�%?c���D'>d�ďG��u.�IĄƺ�X��ц���D_��`@IC�|�}�ל�J�u�3Ⴎ���oHF�<�b��:h�N=t>lXհh���aĕ��dd����["�yY˒�1v�
^P{C�ne퀵/fDg�����&��g�9v�����/�!��y덃�)ˏ�"JX�P����T@hL<���,�}��{W;,o�N3l�#4���?��}Ӵ���I��\yh��G�qp)���-��������&ۋ�h�m�5>�S�uTI���e�;�/?��o�%�z+w�vT�:��Au=��`��z�N�6��
\����H��F����k�Y����Bp��}㌶iJ�?Մ3����[��4ك+2�����k����X7I`��B'~ `҇6#~n�+�=qrܘp�}�*2H����K�B�����i��z�`fjQ��h�
x����#���.��#�x�)����#h�ם��63�IB�D���<mqA�Ь���>TE8�D�q�D��|"- �V��;=2}�;^3�2I�z�R4���t�F�i���̱p݁(�,�Ѣ@�r��=��\��e����%�-���&� ��Nфz��}�By��Pϯ������㞁�H���w��K��j��4�X�=6�i���  ��v��<��>6���<���C�I��AW��q����T:�����U,Ֆ:yI�UT�M4J*LYh0�4w��g�TV%�w��X��Y��M惙h4�OB*��]`�{��X��{��A��=a-����ڗ��@C-�锲�d�*���M�?	J'��:mm�E�1}�No�@n����U�u�b���A���ߕ���O_D����yK.�X#�^ձۖXa�B)�5(���*�S_�%�S�7�/��-9@{o^��7�����_�� ��k��j)����̊�E��K�lefQ܆��˅ϔ�*�\z��u<lڣ����ɷ٦��<�O���e��ѩ�}ݹl�CMH�Q�Aj�8J��|��Cc�So���bÆ�3Е�;���{c���6+'!�׻��9�����~ir�"B Qc?:��p�1�c|��2�$�DDғ"��*�D��.TϬ4A�'>r���;�^XJʰ/ c0��tQ ;օZG�؞Z>�yOMNиbn��"v ���E%�M].�}k�!�AT
� ��ۺ<A5E[�'���e�k���2��t2��D>��[��r���ߩ�Shڿ�Tex=S��������9�.��nzhe^��Z(�
E��y�Bv[�#����e�,��[F\�Rw�S�LH��}ەu�C
��^��5���q4���m$B�:@ŋ��״X%��L���N=�a�9>�m��ҡ��_]��2o"���Q�3�g�˗	_�y�����
�KU�'�34���ų��F����^�IF�]I:���gf���bܛ��jJJ$1� οt��&}�TӉY6x(�c�S���"�W�3��M� Ƶө�~�w��_YM`�o�33#E���X��0'�S���^��"���C5�W��B ��ǆ����`����)�l$�KyAm w��רy�O�ȀEJ�8��
iB�lZTm�+��O��Bdd�<5R?�5����R�K�(Z��$��r_�DV$�mg�K�r���C�)ן�$a8��P��B!<�ZJʪ.��9r�J)�ǣ�\�����+�W���:�󃝐r�]��F-��E�%�a�m��e2���W�}Y>@�k���b���9��K���j�MF�F�_��Sjk�vI�CL�2���ާ�<��.�J�P|�j�Q҉��l�RH���nnv�x
��!1O/_JB��hҋ�a�6���ޤ*[5�P5)�<i�qX�(#�����k�������ȍ�{�|������	�8p�C�H����J����16�A�����-�R�0��M
��o��/�_�	�.)��\q��R9�T��͕ ��H��f���DJ(sJi���a$��<�{л��J܏�l�����s�0�]?��U �T���}ٞ���9�;�;��6@��+TvdP�u�6��R|�W�H�%ksMV�rEM�"���74��mhOR�x��Z�$-���
������l�&25���܆w{�3m���l@��\5��Y�u�h����ա��ao�4O��Sa@zDK��.�	�
�8ă�ܔ��r~��'�WV/��+�C�w�a��P`�3������z���b�M8�ٿNj��(
Z��1��\Nމ��x���q�q����9����H�q�?���HJ臙�fe~����n�F{�@�W�FG���O\�l|�U�`d� 0L�W����D�$U�;w��aڞU��ß>�.3��a�u�׆�@�+�Xi�QQs�+��X�0���"4�o�W�Q������b�B���v
��0�/�0��ݻ�:��Oiy�8����}�KҖF��^�lB�u������i�!�1<P���,3|� �(��_�:��O��Ŧ�(�xֳX�Bg5���ۼ�5QQ=N-+�n�UlK��t�֌g���Y���zoeڏ��#���TvqdM�B���W��0����1Da��4�8�Z�s[f(�gqf�X�~�b:Ce�q�q�Y�sI�M�� �fps`Ʌ��~�6N"#2@C�XJUxg��*�>�]u�c���x\p*rf+��]����(N�d�K��K�
AX�@ʼ��Y[a�j��^�v���e�
��k�G%���\�N8K�/�:�/�{�hҳ�俎L�|��)�:����LB�w�|x6�ĨW�.�n3�MIJ~V��״�pT��x�Ň鎮�Rar��C�A.6_�>���0>���z�/$�?���$Aµ7�Ȝ�����B3EEk��S'}يGj�SF⩒��j�W�^�؛�s`	��MAS����ma�� ���׌ݥB%�B �dSG�G�L���seە�(HQA��B�aCl7��~�q�YY�">��0��ō�ȣ����_b��������%�l!^e�K�3�΂gHj1Avhv's��Q����V�����B�cHC&q߉IW�����D�o���tɄs\����q��|�莳�E�Z������֯^��B=��/ڑ�3<�B�n�2?�� �4�� �~��J7��]�3�����%����Hf��{��^��5�B��M��_��MrS�zRrc$�	��;��}?N�з�>&o�ii	�g �WM�
�wM��y/K|л�]Un
T7C�7�u��/ȆNbjS�[ԚIʷ}�y�R_"�wE����P��Hǃ�������C7��Xמ��z*�6�V��\���oe{G����I���R�,�W�а�ǲ�%����s��s���P�����Xf�.$�/����w3�|����#|B5���M�\��|ne�E�ER��������9�S��n L�߇o�ȉq�F}�R���
gŪx�� Y�Q���к$l*;l���&j!��R��w�M�'KŸ�
�b�#���2�����в�a�mK��|�NN��	K��s�N�ꢩ	���������������zz�Q!�$#۸?(�}�v�Z��[���!,��"�MCe���.� �z$5n��O��^�#8�TA�E�4a��.������W��j����&�̜:!9
�z�^3-��u/��vT}��1�(��z9`�^7|�0�� ��ҩ�}���zO��{�FY���P��|$�v`�Q��H����U�^�_\���z �v�^�N��B�[2\�*�#�{벱�S	�j���=/h��Q�:d0z��I�6�o��Y_�Asl��e��a
P| �?]��>�¬�a�jC��F���ԯ���i1��,mmb����1��E_9.ib��g��,U$c?ʃ����i��xfVM�n��6M�򬝷��5i0�H��d��U��i&�:rAC0Dy����;����@��(��z���4�.�t��4ǐU8�!%�$�E��� #-�����"��Æ/�3�~��Eٌ���z�-�I�I�6 3xZRk�N�����n��B�K�EN[�6�I�)D!����%�Sw`;�Ȑ�Cl��
�'�N�i}��M�$���58����5[�
Fj���&jV��;�IJ1����,�h7|�R�3)դ�ޣr8<���%TO���Ʒ�iFo�a��~��2����������[T�6X%�����M!Q�̒0�����e=�,��B�=��ӌ�>1�ʳt��JDzTbb�,֩Y��J��pOo*['�O�sqW�DUM]2bTHh>��)�Ltw�t�"/E�l�'�Z��8����c�pn��:�.�B�i7��>�}������O���7?
v��G�mG0����F,Bԛ(�-�p�	N�$&�cc�2�(4!��%��n���!Yg/5u����_�J�\[�P��B���:=�����l�Qs�j���g��W��Z��ӭ	0*#��(�*':0���Yh��l~��� �#[���Иn��Ȝ�ϯˏ��`z�~�5k�6�o����FfDLA���;��i��A
�Zу���۵��5���v4b�#4�~/"1�S��S#�o
!����0�Un�j�w�/�D�h��z�멹�	x4�!��	7��;�A��i�h3%��S�m-_�^�P���B�l���-rhr�t���,NrD���ݧ�j���`�%UB�'�!q�{�;�b��~�	s����1��`�����U�5D>���czNa+������k�a��o6��Ņ	{��R��2��~c��1n:�x��o ��oα��������ꜙ�A�F����:Q�c�ZM'�σ�/�]�wLA�H��e&�.����$����	ӮT���ٳ��q�PU�������e $�[��C��{K�y��44��s2b�!(�`l���QI��v�M��LK82@@C�4�@���b�A;��	�lgN�O�9��n5����N�R��<p2T���f��%0Sh�NN��k���yb���a��|0y"�Țm�Aԏ�6���E��&d|n�y��a�RB��fCW�w��� ??�(*V%#��OM؀�2�H��%sB@���<�@�����(��6�j�0G��B������a�æ��b $a�-��H��֐�|�ܸ����w������JQ] `r�����nA⣇��W����-���z!+���*����
6��	�g`P�p�j"/tA�w�1��-�3ڛ$;�b��[�����K���5�5�Wl��y.�b!�st=�$M�̧��>�Rvm��C�An	�y�8�'����]�x
Z!?�-6�6�����N۫�:�zK�6ω�6����Sʷ��̇}����U�7����9�u%9�S���]1N�0r�߳u�&h�Q=�0<�)I
gYv��1���]J�4���wz��T�g��`��f��	9
�mԑ�6����\�4�E�e���[����f�b�Z7\��­ت���ٜ�ʹ�5��ߏ>��.��Pf�p1ӳ
��CQ^�!K� �vv����G��=��x�_�X��W��%~��J$����1��$[!�/���(	يe�؈-��n��}}���N��	�Qz��ta�ԅ�`� �1b}U�I^���� �[�s�8JR\��+��[�_o�4���o�:ꬹ��*�go<<6���*w"��֊�e���\�&��Zj���#>���rX��S�h��!C��ڼg$��vh�P���_=��F	6�	�.C��Ө���_�\aib�^ cg�� ��<�&`�.�Z�51���A�h{��*�a�����$�Qn�FQ��vb�ƅgL��P�n	l���p�}�c� �\N�b�J)�H�54���-W!ݒ��H�?�m��D��4�02�%��7�^��W�H�@��Жჽ� z��R�[7�ɾ��}�I��j���:�C<KU_��hRmE�|�[�;%K!t&>�q�6����Ep0A� H,U�'���͵��P�C^�d�W2i9{s��B�5��t�\���t:y�%-��9���i���Wa�9@JG�8ֹ�O�ߪq�� ��}lUb��	R>��8 |��������`�Q�ej44��~�j	�:� �^��qJʋa7o�S-A�\^�|��*��?���+�מS���7���m��G��_ L����c����� 㕾.�Ǯ���_��"��F�q��#Vg<M�k�y&o�S�r.*V��.L���|Y��Ѹ'�V&x!	��V�/��v{�����S%ea�{�?��~�*�Y!�L�8��E�N��A�VCz�J��:�y�5%�d{�Ċ_��>/(�'�- ��iČ��D��k�>k#�����
�TI~1��J�@�Lۑ�x�P;L05�Cr��]�e~]S���.>��c��0��f�	,�f�&*�=2�G/r�t��(�Q���9��ـ:�V�U�K��xv�g�o�k��'���.�榦�./���W�	h�}�l���!� ���V�7�ZI#���\�a�����!�0���$� �{��+�H��?�����t�:%ԋ`������y#6l��Wn4�ߊT\=V�A��Y��b��Rk��-��=2	���'���3�F n䚗�w.M�G��v�n�SXy����$��c�]lu�+�����C�z��Jt��"d~��s|�)��ڂ��3��gi����6Q�InK��R��6�|+%���ԻI��$�$)��<'�!q�8*���l���Șd�5�͂^�<o
�� �iV�7��!Xr�ȆI��G�\k��œ�!o>NWZޒžt룶��8���O[���uƐ��h��hQ�"��	��sM�=��s�Zl$�Ŗ����m��c'g�2G�VC����i��o��SG����M�'���r-0�0�G9Gu����TCC�ߞ�@�����>b��PY�܄���se椁F�nM��-�e��
cH x���B��5��|�)D*������7�b??Q$��t��XZZ��d��4�*?��=�{���3e�?]�2.�K�ه�a��d�2�"x��
P ����G�.%�]���jo�@����6�%;���]�y�0e�}|dT�"::a5�p�]��V����cD�!'���q׸��&[2�C+�Q�[��xh�In��� ����k^�X���R�� �����ع�8�l��X���v��K��n��[3J�u����[����>�A�CQ<�քy��{�J��.Г��j������W�����b��%1$�N��l�1��D���_�rS"�o�X(_��-�Tw/��^��R�@��r����Z�=x[C���" �4�AU	J�lρ2;c�&�m���Դ�t�}Y�n���uq��\ʚ�G0��Z5�u�r�a��A�P�mI �m||re�%����Ğ+�p�!�]�S��w��y/d2���o��%�ኇRG�u�T҆3�
2��w��QAW��e�� ḩ�m�*j�C�&:��lY97qgF�H�
cߒG�h������^�I�߾%����RY#c�)~��yu�4�'�]|#���\[�y�m@��$�����F;��-ښ^��$.x����n
�}��;l�]~�����XRgKc`g�S�;��~_m�n�zuhH��a�M�/��wq�`a�b�*�W���APq�9c���%��zNO���?�ʶ���'5�j0���}=tKx�+�Q�d�	H��o���'!��$��l���!��(�hڬ�gG<D%�T.%JR�kt|3�K�%�;��әT��7&!�iT���}�;��%�zWm���А���tJx����<�o�����C��wa#�F��{E�G�����<�H�z"�4]I �7�JW�N	?%������3����f+�!b��������<�Up�o�?�S�¨Ep��a+h�p~"HR����Ƨd��-�!�K�g��,��Z��*��!��J�tO�aZX�篃���W��x�RI��a��:��(D�M�����3�
�%�rQ-.�k�:V4�#ks��Va�ӆ~���U�k��(�W�����Ǘ���%�_ϩ�pzC���u�sy��f�?RnzN*�acqr�cO�c�R��L�����5�RO�n�)ʩh���趛����	A�v!�F��&Q�ga^���j��5q�i�]$JO]�5PB¯��$�j�]�4���pBt7��H�_�6 ������˓C�ߴ�k��D_�)�d��>��G�T£^�(6L��6㞔(X^��v����Z�������3���R[n)#�"ƒ�k�t����3�!��9Mj-������`��ToR��ث){pfuP����Z�Q�e;�(�����`+�L� �E��'���_�>Z����d���7Pu4T�B��m���Q�H�&Y<�Ш��YH/�o{��ĸ����K{BC_B1��*Q���`�z!n�e���8f�����z����w���-����"-��$O��%��K�!����9�@� �CC����Y��i���W��V����~L�̏c�fטŦ���h;�_�_�{���<Ж�	��`s�(Yہ�$��9���s!!�Q7�q�5��PyB�e�"���#7||S�g�r;3�Kb�x�`}.�>�h�3�u���{N�Y��w����9ol�Pm�lojSy����'�:�>w$5 m��\d剧��_�
�ߦ��hqVt��l8�����8�Kw�Z�T#3 ����ۇ#��3H`��b����[���=�ř��e�Ц�U�̍~o�M��5֚�
�@����.e�?d�/IE��BԖ�9��1�dΖ�ߧ�+:w÷c�y��]m�H����-�p�{=�,�"�C�>����(k�w��sWY�����t$l4KΪ�R�ܰ�����3/(Z�;�Ǖ�ā�fA`��Z�W$��"�z�~�L|���e����*
,LQ�񢔘�bʧU8��-U�a��ΥVr��ࠝ�d��#�����?��k��������c�F�0.f��j�pZZ��ʭ*W� CO7`�6��`\�����M
2��,ݟ�NH��+�)�	t���Z�>k����X�@~&�	�K�Y���Q��Yqۮ��A���;7�.��.KXj-����Tr�oK�Ϭ��=�>�2=I�D���<2A2K��̱�SR7�)+� ��rl^�	q�r�Ƴ~����d/�k��jO~̒	Ga ͼ?]��to�
�G(��UO[C[��>Z��ng��(C�Y2'F�yӑx����1"��t�
I0����aAO��w�l[�<�y��n\�z��!����G�y�|�[<���K���[�&���?����N���J�v�������Z*w<Q�D��6���uqC�I5�����*��S��:�q��9��oQ�	�&��HIuc$�O��1���Z<
�!R��P�z�ZVeݦ�5�����2���o'I�g�$�T� ���aFQ7������$&9���.Ґj{}�]���#��r3�B:���R�E�4y�jJ�ua�_"��Ľ�錣��&��W���c�����-�2�B �=�3��sZL�i7���|kZ&6F�މ��VEFTL5Vb�}�9�-�䢓���o�X�a-�l���9��&�18č6���V��(�3�{[}:Wwo����yj�?���O}�X�+)�i�2d��ݕ'���dv9�}�G�T��k��w��WO�"k"8�NL����a;/��_}4�k���V�e���# ��z�=��� ��
Ȁ1l��d�/��@Zg��jh8<�s0 ���XsL�h�@���O��V�]���\`�&`�IpY�а:dU�����j��ܼ���R̹a"KE�/�1�I���������\�Y;.�K0d����~�Y���Ӱ�tp�T1�C����T�v����FY# ���EGb�}��{ۇ�/�7�`0�`�li�֓@]�!�����<�Jpt��� .yp��;v���i:�u�e�ͦ-�p)9�������N&�k��'�� =�x���AS����2G����3q�i��6��c�:��jC*�i��-&!s,\_��߹���N�O��;j1�a\wɷ�GZF�P���T~�~0��:������?�uۮ��)�z�#�Jɝ����ڧC�Mι�v�V�����?�����?���3�s"Jw=
tH9��EfI���l�h1B���$	[��P�b'5��;-Ō~�>����/��$E��b�j'�����>���1A���`����@��&��H�lDj`[���f�1ΫrN��(NДm���:��_0�����Zj-�@(�\��$i�F<v�_���o�MGq\��n��\�7��Ca�N�~ 8Ծ'��9aU�xn�]��C�p�k��B��(��!��ع�nƾ{'��n�6��o�4��ؼ�x�@����I�����Ah�rx�����-���IF��K����6R�V�(\7r-�#'C�������#Z8�UM��ks1�PЮ�`�
�k�u�����3���O��U[v��ٮ��֣
��P����&;�ot���x��A��������
Ŏ2�^!l{��LG����\a����_�Qs G�d�;h[
,��ˉ~s�G\"���77>-��_��L�iu��Y�B�����)��_?�r=��/yS���_�Y�&蒙����;G������d�tOV����.m�]ey�n9�d��@�����������	� �ޭ�Y�+u��B8E���_�t��7�6�X[.�'V^�=�%g�Y����f��XQ�|Uyb�\�̚���Efg���~��Ԁ���ST�����b�J��K;p���A|�쑫�H�����`^t�DV$�b��7�i��O�FJ�Bj�x��:/��*���,���`+���!2�τ�(�.?:_�F���&.͹fN��:���F�˴�'�,�4�o��]n`��9�Q�SD�����H<�:u��+�[�	P���<�ВY:��h̀͢0�R}E<?����g+9��j7�`dn
�,��3�dE�)�����D؛�_�<�����8�Ȥ!���.�+^ �4Q��Xx!�"���qpj=K��~[%���G6���!����[,��*D�g��GMaX����\��EIq����@�q���y��j1 ���3��]���o�%���e��/������׉��U��*i0_|��ǐ�NT��>.��-kԛ�T?oX���ʟA<�M���ϸ�r\���Ha���*&��C]e����Ts2ԥvXX�;�͐�M��ZG��e/���?�\�7��c�TVh+t��w�jWt4��
Qt��nzk4uVƷg�+ӆW����C2�z���Is&�, �.��ѭ樀�VN3�l��,6À�G�K��}��Y3{�ȝ��4o5삈��Kc�d��|�;��X.�}�R�52�s�7�$��d�oz}S��vS�&�l�=-gX�D�s9���K(�;�Ta{�k�O�Ο'5h�2�_���$8�Pd1�^3@٥�6�wV�Ď����F7#ę�=ʑ�}`qpd��rz�L��K�9��nh����StZ��.��g��2cV"M�J�����4� ���)
i�AJ޾o[�n���<��Z��6��?9	���Γ3%t�\O�>�XM�@��%���(���z�������+l��`O��Nă����s������`_�R�ae[C}"�Hl�B�T�_��EN�Wg47�%�h��UZE~#�{���$�~���+�U4{�,��xz�Sn���~gV��46�8��*���GB+�&�]!+)�'m]3��Y��Q*kk�<����r���i������!�'�_P�U��f�g�O�f��>�[O5�4���OrX�U\n�U�r���d��!�X�|o�v��z��$U��5�*�b�%������	��S����x9�95��H{T��s��AK�K��Q^Aڑ�T��Sw����|�P�wO�P<eKê����z�K�&�b�yT]���:X��T��Z���D�N��#�,a��e�\o�+�D�%e�^���q�ݽy�`ȴ$��ݫ��,L�����"���� %G9�ˢ��:�_�	����+��K�����*\q,|J�ۚ�z�!ԞY;a��J{�f�Z#�e 5��Ԑc�����6:'AON�!�㮠/R%��pK=^���Z�e	.M.�g�'�+��ls
ڶ����"gg(C�t��/�Ȏ:>��nɿ��(������%�<���}Ɍ)����Wr�D�#owɬ)M�H�5��8-�U�n�`NH���O�!��7�e�U���$�&;N�f��&Vuݴ�>|ҝwHUp0�7�� =�;au�v���{G�p��N����\�3��U�i��J���A�c"�(��D����8���	����c IBp; @E,���>�i��8ݳ��xK㴠�7�e�E�s���9��29��&��Aʮʿ�h�;d�̎i$a|����dea�?vw/o�f�y#5�7�톃��7�ݐ�<�DVֆ~�~u�����e���7��p����_Q���H b����\�ٲ��a����m��4�!��+�0:h���z��)vȽƩ[h�,ߓ·g��~QY 2���E_����LT��*��B[/��M��޵�܋4�[c}����J������؉弬:;�wKU ��X��Ng� �<�3E�r��kn�^�O(nP���o{���b$�|���9��N��ȵ�6��Q3f�P�RTY�~��1,��H��%���PdCh8-W�`ih��f30iDN/��6�	� ����GVh��y=�=���g_�|Жu�1M���1�E�wG��D�B�����)������v r3g�צ�X裉�c�Yw�@s�9lI(T+A���ȹ?�8��KE�"EZP���g�j��� �Il�&����{��	�Z,r��u������ٹ0���Z3m>��
G�k��I���8- mt��g�%,��7n�_O�t8b<�b�0v���5E����Vy@>������ih��Sڊ������p&��}���1�s���٫H��C�\�
!����~V�����Z�����,69��G���X��/.�fzd���o?s#��ּtS��`�mTM��z:���4�i��H���y��*����!܍VY@�o�����v8M�md�'�ό��"�7��yyG�nL9�β�J�I!��A\�L-��`�"����3�3Qҙ5�5	��k7��J �*	����M�M��Ď�M�WJ�xN9�^mPC�kO����x�lqV�����9K��5��s�+_F�?�y9J$�f'[�4��w�����}��]��9h� s� fbb�\�W>X�ߪD��Q 1������h��g�!�����{���H�� �=td�v�~6�i��-�Q�Z�w��5noh���b
/�=^�h���is�F�����5����nY�{��pN�rA�qB�+$IG����^&(Zޖ�e���븈��qX�~��.~��$�/��8avDu���~���}�k/��/�y�@8���~�|ݟQ �t�y"�y�q�;����K�7�ѱ �?*����2�PV�8�'��5�r9F}���dNP,qD��7s�� N6�yǳ�;��~���h� n��C�������w�D������A�ܧ#L�HgG��c�Y�X��3�K�#�E2�C��w��z�M��~1��(�BZ�A*�C��#S��,�ڶ��#V��=�Q�I�:�%� ���4�A(s 7yRx�����E�bE����Uz*ґ�u����͓A�'&4�~��MV��Y�� }������.!q�_ s��q'r�J���H�2�೤$ނ�����+�0[<��֞�W�b����.�ҵ���>�<+UUK�0ޓ�>�\���<{PB�t9~��UDYO�7����1\�$�ǥ�s�`U�.#%ꉊ/���mK�Nsn��gX�n#�g%��<�zeb��f��/8��������.�b:�w���1�������W�(?6)�,����zi#V��:3���g��J�$�:�j�um	�:�S�Т���FK�P�N�H�͋
��_�AE���*Z���ͯ��l,q�;G���k�Ж��#bId�H�=9�/�P���}Ίti`�)�͹��?�k%@����?� S>��z;$\�w�Ͻ�@9����k@Y�RTkCK-�Ǔ����F�X>����	��bt}��g��e�G�mwק���ou��jx������|��ֺP��=���nm-�A�GvCGē�C����w9�o#�F�%3J��bXĄi��>�����v̱P ь_�7�Fj�u.B���ޮ��B��_q�T��S|�}�'�h��� P�W�n �C�@QOvћ�`۬h
�'��g���E���mj�������������ZS�5h���E|�����[T[Eܖ8��X�ck�CZǖ�j���Z�8A�xNSon�$J���i4r�u�5n�lc#q�)
X���ű�7�+�6�3�����H(����)�bu?O�_6�������ܬϗ�p���%œI�i�˖gv^h��d�������*����H��ޕ�y�R�:p�~���̖���IJ�%�� �q]���댷'Q`�ݪ�+��~̅���>�Y�T��($Q�H֋@�e�=[G�xd�{M�כh`:$}�.K0h�ي��~)m�B�%�y �!��(��~�A�r�l�>�;��0ө�hQcs5��q'�a�E+}i�i�K.����y ���.�g�ȸ���$P:��C��$��D!OS|=q߿�-�+�3�z����#���A����I>����Ԇn��
}�e�1��'-<*'��"�
k#��4~uת��V`Α���[�5���v���B��)�4�pu���%IrD�5*��tK �[~��S��`���Z���t�ssN���Tj�V5X�3���!�wuV%Q�мF|�����A~aՉ�v8�>�?<�!V S��F�������zjR5t}ʥ����z�溂eG�}�٠Q��ݥp�EBo��j+*��j2��x����N��K\@��	���3��/����J#���Ǣ���^�O�:���!?wy� 	����|cb��0,�_^�n��X�K�1y\�ӄ-V}��d#����(������ g
Kv:��P��v�����T�}?��������Cw<�*���jP؈���L�p`�������v���o	\,�X�	Q��w�ɮ��~-����`Mn��g����87�Ho�����"�f������wq��`O�.�-�>�Ř�S�\���3����jTq�6���oXp �ߛ�ym ��z�0'���?r�!��>�ںx�Уl����%V3�z��TB������̤T�"�'��Q�(1��\�|�ы
�X����	k�#K�쾓c6"7��'W1�N�26�&* �����\��fQ#n�&���@�[��:k������\z�2|%�\������WՐ :��Ծ�C,&_Y���ף����ہ�Q���)��̰>�ϣs.���3�+N���|����RvchpT�It��o.��EoͰ,�������8�
p������z�"pkX�98��MLv(�V�}$�߸���r�!�hJ�6;���6RD�biwO
7L}��r}�gMݸ'c��/��
�g~jm1]������ P���WI��G���`FN�9��⎫ v��v];�v���q��u0b��)�K�$���VLŖ5���[�N�+�a�w�+A..U�Eu�����W���g"k��o��:�h�*  ����*�e�m-���;������U�!IGɗ	�ob��m^����<Ӎ��$�e��G<��K�g]BG�n��|��'*�Y��y�i�j�]ꩫ�>V�%NuCx��h:l"����/x.���XE���0��^&�[I,��֜8k���A�rqb0�
�3��b�+�e{D���I�C-N��AE��[��;gT�W懄4�F{��/�7QW���|��2�g�w��|S���I�����މ*�M���!Ĭ�3����v����꼙���R����ەڃ5h8tO| �AK����B�>�l"�#k�i7�� �����p�̾�߿?m�)=	�BA�ށU~`�l�<�s.��n"�D�Y�.�k����]�>��X�]rd��o�0� �M�#�~�*���O[q S�~M�����xh����|z�24M>��<�j���Lw�|홁�f09�sK�V�/4 4����s��ذTN����kD�7�xb���I=0���tsB�Ų<q�S�'	�t>�=��_��{�d��0[�ۺ�Q�F��^��c�i��%�׷h�r���m�_eB�8'E�}�2�����T0��C���%V�P2�2���� >y��>�~��u�SZ�9c�/M!������I�L���-#�n!<إ	:e�Y�3J�9�#��
l���޼t�(���q�V�Vn�Y%�C�L�c�[D_�����o&Z�-��
U���3Gm��g�r��o:�FA�t7����yZ/�gߧ�y�"��1�O��[.��w��&���b-v�@#�lo�`���y�~�$� �o�
��bw�v(DG��,/�����72��λo�9��Z������PQ]������;�s��ƁG����ԝx�ʔh���Pf��M"�V�;
�M�_�A��]ё�u��U3���=��札U{�9h�M�Y�o�i<�`=����� \l$9���nB�UYyW	�p�e�b���+pA�a>��(Wt���[��e����m�8vP��������*�&�����-�8�%�qg��Y2R&ΰ�I>��
�r>�Ӈ�Hf�.�݌�%G�וk�^D�V���N��m5
��#�w���7 շ~Y���V.\79��Zm��,�j"�^���e��{��P~(�j�_k�H�O�bK�"^�aϋlw�x/�YO.�[�Ù����̋S<��|�ѧ
��̞�M�Z�@_C�nS}"�00�� �#�/�R$�aJ� X�
�S��
���W"��2/���f�����5���`�۲�c&��
��.=-;n�����e5��wb��u4�����&0'
t 	r����ߧg�O.N�!��|��4�����f�M�R5_�sΧ��X%�%@����Kp��N��Ŷ5`�>�Z�"/k��q�3}lA��9�K{����������y�9'�ꆁ���~���D�=^�}�N�c�J`���WC�_0��)�3�E�HU�MJv���C���nE/�'���;�ζcur��g.b���v��8�[<�k�2��ʣ�[�FM�d<��� by��G�
i[c�;�s�����:����=}tb��N�FC8���#\T�Ը�xԹ��B���cj�xgG>r��6t��f�A�L�^��#�h�0�j�O���mtS��?����?������i-�}ެ�l��w~=��R��d�>��uN��V?���)�۰#�^���e���;t�3�6=���֙�Fh�e�����1#�h��h=�՟�v{o���7?upi���{��~�G�J����y-O$�i��S���t���{<�#r-�E��k�'��K�^�R�!�a�@�䧚�C2�����FAV�E�@�Mb���9�\��W�7:5\'ZVZ��Y��������%9}�Бri��HS�H�EDR���}�P8�g4����z�.]P�O& fe9{{�u�K��h����j�*qW� �q7[�:7m�!�椑d��a��s��R`�ξ� ��� #	��m���!;�`�leI4#�V��H�݄`��M��p�)�ڃʳ�`�Ǡ��:B����kbV�!�z8JA��Pjd �8�dm����I�g(~��S�]WO�6K'����~��y��.?I�U�d�	j��y�#�R��j䷯o�[����Q_t�@����:&ǔ��`�ߗv���6oY�ل
���Ҿ��?^IѦ�]x�$�u����8�)�-���,5G�ZGS`u���`���5���d��'�r�ޅ'߼1-k�,��R�i��T�$���oCa
ᐖx7����{_����7
r�Y�uQ��fS\s@�����>󷜡��~_�9/:̓]cJ�&�4=)�#�4�嫋9�o!<ѾװaD�X;��t�7�B�^1>�sʭ�@JG�L:{�n���k�h�&�ZQ����*ik�O|贃�:����iP�Kۓ��h�ykL��6Z$��DNj} ��y�_e�
�X�ҹ��Nع5L�=�.
�Fp�[F�0�ls��p�[��M�1i9;v��-<dЖ�{l���	3��g2����!Ij�@��M��"#�zL�I�����'���g�H�B����=C��w��3��c�˱CI�9�DS8�h0x.��W<j�a7��8�J��+>4�(�<�����As�/}�9���/}������G��[��Z�*2l0�[4����f:�����F��,HB�	q�T�N{�R��*5?XR�&J�w�5�B_7=_½Q/�
5w;j����9Kt-���+�%�ʹ�9*�QZJ��3@�|\UzL�c�ĵw�ލ���3�l�'�B�ha$m��a���A�\�!�'��aOW����E��y!�|��c�m g��U�����+%�_�G!�'a�R�z[	T3"���U,��p4;g�ؔ��5_�ڜ7a�Q�)�@U���Num�>҆#I*��~�L��9��o)F���QF�E�!>�"� ����[(�F�ޖ�M]+:�@#X���0k_ÿ�v�:�v{�ҿK��BPK(�د0ȣ�=t)
sϸto�����󉬷1�  �A��d����#|U�Tl�Ҵ�����p+���02� 8c��1�����bT�#Vl��s�w<�Q2��g��t��N��6�˰�~8�SXa���T<���>�0�z���v b�4���@`"���Aw$��ޓW����D��������V��n7��<�ћ�o��_	VIፐ��0 �(l�9o�f�
��0~���t�����">.�ZS����%Sb�,�?���Txa��ZM	%�N�2��H��	~�5
h��+z����4�)��_����T��m:��W��c��Y��Ϋ��{�����Œ��ʗk���a9��!_�FOa�X~'l�Z�O���0���Հ�]x6�O�?���߫�3�#��HI�j߱�8�9��j}�~�z����fuz���_Z)��\�B&��7�V�/�.T�#4�?��5��~z�o�@��(C��[V70�l��߱o|����kMMlv����"b�ӡء�y�f���o�F/M(jO���k��� ���w�gf�lt*�m��s�Ղ���b�A	��K�-��Y�S�]��W�Q:Sx��!f������O�EגO�n�Ygk������Qb�0��V[,U����m`9ygcJ�2�Fv�������v���B��N��mIk0��	Q � 1�6h��������CQ�[�4��:��ϫhI��D��0M~Nܮ>�T�Єo�1��МB�mY��c��6M��GWo�[��`���&��<3/����)>)om3���>�*@��������H'��N��(����P�A����q�'�7�=�Y8ms���]�Y�]��-@�;a��LI���;�0-X��O�cn:��"�fߨ�rZ�R��zJ>����K�0d�Ԟ5��z��i�ݝQ"�m�C>��JJ��H<��x����@�"��~�h���,D�t�ҋ��L��QS�
�(�D�{�-����<��Q:;>�ͱ��ot�M�Y���|���~c�uq5&/acJ[t�=�%�̗
����0��Y�cJ�#+���CKu@u�����;Įi�!=*���t��8���r�4�o�j��YX�C�A�k^}�8`���qZx$	?�B�(aH��+�(l�;�Ρ�[��fE�Q�i��yP����Q@�X5l��{~��pٺGRM(�K�Υ�h!����ƵT:�	dli�@��M�:�l�#������,��@X5����t�LT�=)%</�`��C:I����b�>M�^H)|�5?$�F)`���q�I���f=a�z�k[�Tm�-�9}!�����ZUL_������w�G���$�A��$��;�Jȓ���Bä��.Br��̭�1L9vcN����v��5Eϰ\�ƚ� 5�����p{6����lc�p�/	� r��7�ut�I��LgM����a!h�U����c�G�a"����#� ��:y_aJ�$a2���?�����V�"ox(R�;/z���1��+�jU����4JQ?B����4r�ǃJ!0���]�L2�&cq}�J���e.��� �RK\jV�?Q�k!��b�����41�2��WI���Z�߀,��ң�6{��e�-ys#��j �_�9��ѕ^����u�U*no��V��_5Zc���ί�&UG���٫^�HAk�����~�'��6G$��sOh�-ē�7ڝ�.O�!��B ��g�A%�hc��Z��%����^�b�1 ������XCjQYAr@d�G��2��� �,��ޭ�e���&Ѩ��Ͽ�u��5�*�X�>x�~Lpo�8���yDd_q�ms���C�ԝ��u�8�u:E���B�x	9(�k�Z�l��'�G-?�pw�x�|�r��o��rt;�O��'��7Y?��T�������:�����nOᱧ��EOs7L�.�9Zc{�R���42�w�_��I�:*Ev��B��c�7@9^%�Wo������/�D���q;������g u�Y���a��U�b��t;}������Ett��P��e����l��d�E�!�I�[?�G���;l�L�T���ݛ�[�K.%�+q0�>��b���diY�|�#䈢u�ϕ�^Ŗ�bΛ��)�>����2�Y���L@��6������}u��ע�Y���|�	�/��ژ����4 >]�0#e���h�b�4?�o��
�m�@\GD�֧k�Vgix��d��ٖ�3j`Po8vbU�����!��d�!P�s�X��JH��v�OPo[���� �>�O.���=�(O�TC_N&s��&�x���X����0�sl�DK��z�֚��o��AR��D]j2en�z�]��}I�͘ĭp�����Rpa�M�ԯICŧ��(�[kP�������^�~&����⁋t��1j����U-�tԘ��^;�>���2!ك�N=_Z��$�ؐ��`�q L*�(��	�s�����)�u@����`Cl�����Շ�k�i�n'��=5���u"8~����OM�0�����!)g�̾���ȕG��b�
� ,�w�bRt$�G�t�X¨D^J9������a���]ZǁÆ��{��pESg��Híf�p�V��4s��t��O� ��1��9
F�L-���_�]����_)Ӳ=GD��s�L��Hh3�t*s�glE"���L��K��	o�GkeO�1|K��tLqu�z �[ṕ
����:�(�+U2f{�R��G�B���H�N ��qc�9������)\�D��X"0�I2ZV��!�9F���4ܖRm<�an��K�bxxx\��^�R�|A�fys���㷇�Vzۋ;�3���J/r_�G��*����7c����Ki�Yz�q&�a����VDF��h"v9�-��%�q�7���Y����4%�X�%�� %���h�pcy)�k7��:�#NYg,�`�231������p�N�B����v]��5_3vL���ȵ�����H��@�������q+�
�`�L�������y�\߽�g"��`��R�a_�8�M���fL=���Hc�EV
�=])z�Eo(ޱd&�_p�9���I3��)�(�]R�j�U�I�-)��al����@���QY�ä��8�Ĥdx�J�7�G�Q)ۣ+����x;I�@���GXn �|���6>*�!�ϒTg`�J���E}����h�#{��#C;���5�{����$Z���V���X�.�ٹx^Dy�,�Fı�ZZ1?W��m����C7wK�>W=#C�J��vM��c�!�[����0�4����ۄ ���Ey�(ܲ�5X�Uy'���X�R��[���r��fUCt,��\A.�� �<������đ٧?Al��e�~ݢ�X���"Z(��Gc���Z�]�+� SuJ�-�:���e�ҧ�ឡ���/�W<A��ݖ������\�4��ĵk���5�j�P���� :�n�>�O�{���xF��Y�'�Ip 5� ������a�:Ygc|�9�܏9�W+���3�sOؿ���K59�;�.��kL�*�)%́V�y�!����N�`��I6f_q�r��ӷ�"��Գ�B��,��T[YXW�����Z�/^j��@E�;S[k̄���L�¡y%�ӊ��W�=�����<#1!m�gxӭv���M��� ��*��7�.>S������R"��m	�P��OO��d�°6�����b>N	�������XM����
�1�f�־ż��C�NR����,Э���$I6W��D)�]<��
�u.�*���	����*��6I��?�9B�����7'�3�lK��'[����-@�HV��Q�0�SV�#3� zZN_B�%h�<�*�|��xo}_����֠M�7�>)�������E���_ˈguň�T���������%��t��3�A����z�2y���$ô����lM���w�g��!�uc���d�sO�1`C|�'�nU�;Pޢ�G�l�ЭGx��u�q��N���t�%�k@k"2M����v���?�.���g���\�=�#�gR�4[��ek�ş&˺��4n�ɪ���i�R��sm�0���y=�*�����χǧ�4�mT�O�l+�f�ߑ$���n/x ����ٯ�%�1���2�:��]�&6(�E�Y��p���\�A1�_����	�U�{��g��]��Q�|.��[�̿��AM�k%�~`�7_����n��u��eM��K�
��%q{6Yk�^��J ��0#m�Ѕ��A��^��]���c�8P�[����>��ā��GC�e��G-�d��G�6�mY������j�0�QF���Vw��)�`��,R�a�[D��8v阊�t3�4�����N߼���Qx�(bm퐊]�m,B��ќ	���ldK�xL! ������ļ������f�΂�h�4{��BN��}����\���	������~!l��l�~���7��d�bt�mVXD��<ܹ�u�«�o�r�.�5M ��n�$��5-qԭ���:��������
�V��"�o���ϑ�5�����u�z4'�b#��Dl1���MR���Ҫ�*_�k=�(h$�qT#:�e(Ą�Y���zP~YppN��&".�y����XLϰw�&B�_� 9)��?����8c��eӢm���V����N5u�G{�?�����U�C�B{x`��1��F�AIEV��0��d�.��HU���g�0Ba!�ޕ&ٝ��4��[͗^	\�2�^(����{������ ���h-�	�j|����� ��!3Y��ڊ`�ܚF���X��*�X�,����Q�i��ݙ^�X�v^��VέC�4gG��$$_D��1*�7������l�X��$��DH5����}O��Qe���*Ϧ�u�K׃w��7��fTYI�A�F%$@���1|����^���4��+N�Z_�~A{��9Ђ/�b����Ts!��K�{Z����˳(u �ѓ��
ts��ʭ���/	�U�ή[K�������t��Di�9���jפ��#ɑ�[�%�,"UxOU�'ف�P߅Z�;���8���V�"����@�o�
�I��o����e=cnCܲK����͓�yoU��*�V�<7����N�ٍ	6��z�>{��}��g���"�>��q����M���t�����k C��߃�<�G��>X���X��	?��|b�w$Y�+ʵ/�.���n�+��D��t�kz.��   ��m����;�M]�1;ԏ����`yq��r/P���uS;I��z �9����`Y��A8%x���j����F��N���-ɚ�b��T䦉���K�T[�(���Ԇ:����	Ja�0�P����Te7�i  �A�M�Amh�L ��ڲ�Jz��I�6Esk��ǡ�~��*�I��Hu�W"paB/p�n��T�s��l�t���I��'�U�"<ǐ�+R-��m�HK���Hl�@ĩ��}P�8�2(��+8 ޾�����_;i}��0Ai����}n&P�����:��Hw8/��8��5{��.%`Q5�bd^�'�<k����t,m1�;�S����H�F3ȅ��fDm� 7_��T�Z�t��6Ah���nx2�9a�u)Ե�������r��	����ͯOi�>D\[:g�Ʉ��ܶ��������.Z��H���5��옦ػ��HN&<mz��I^�iL!D���Q�
�5���2\��5��e�'Bf�T�6+��G���D�A��lt~I��		������-� bd#Ē��z�K�X"���zP{�@M#����<]~�I���V[��9u̵��U��}8��}˭6�"6U�{r��2�>Ɣ��X�Σ�����\(Z�y�+K�l�ޒw链��9&p�zN��I����r�O�[_7�/�8�=-�=IB��?�.o��@��Sy�b��r�ļ�x��c���
�$��Q���m�>�f��m����yM�a��9h�H��|GW�L�z�C�{�t���]������_ҙ��$q-�QXP��9��!�O�����D5���-C��y-��=1}5}YܳJ�$B����&��Ʌ�l�9ӭ��XT;��xm�y�ɗ "��c�r2�̽�b+�t /Ζ��n�*w:��"��w��g�5�����;R'��>����v��SHb>Ea�O��r��w ��c���@�����h���{!--��N-�R�W_i�+pKQ!��+{E�88�ČFl����?�X�D#[���љ���\������u������l�N�?�P�����S�R��x�����Ku�w#|h�� �ļ���(�ӉYߤ�%d!��ww3�
�{N��_�آL��WqO��wW�.�y-�X�lh���F���&��}g�����p�vs�"���Sj����лOj���5���uɡ��+v�Ֆ%����x��..֕��-��<�޴�N�5�<B9��n�f�]��5���\@I�1c�z"�� �&�=�`��[����+�$���"��O?�A]eeA�$I�j���E��/◵��"����#97�?����Ec�*퐥�!8#��8�c���ɂ��݆��LUɺQBo�ꝽeX~Ɇ6XM�D��zX5��a�vh���/ !R^+dܜ}@!n�dԕ�[Z��!�/��=:�B쥽K���ǘG*O��%L�±�ڭ%@q���Ű�X-��O`��ߓ��*����<C�잚�$�����;�+s�U�vUF6G��L��(ꑭ;���)�0ߏ��[��h�7u�%(Z��e���ώ�����'��&�bg8��#�F���!�E˒	ʻܘ��Ct��-�|ɾ>Eq��0E܊(}>�H�n^�=��̟Y�i���0�� �}�r1E<Œ$��xT=�����F���گ�&x��[0ǒ���n�D-�]�%P4x��&��k���K�O5��(�3"�mN�C��Cb#������G!KzO�2��]�E�6�H�HS�ۂɖW��kjX�E�<�S�����׳p_)
�(�IC~�O� �l�+���e;��JQ���F� 
سNj 3�AVja�k����:Tێsl>|TʞNr\a	� ������"���y|!��h�+�䦋;:ːe�(k�_�������8�m&Ng&*��t���դ�g2/{���Rő��]�vҙ`[L�'��+��\���iBoi�{�k$�Ps�RvC?3�@�a�;�X�,��O��l��
wZ|�7���0F()|'�'I,F�2;R-i�{r	�
���3ʏu%���8�k�"ː�>��j���#T|�� Fl]���v��^b����%��:�O��|��$9�kSo!��o�Ŕ_�i�������Yȇ�>��$�u�R�7�p7��G���O�4�~q�̀|���\�V���K��-)� 17��Ӱ�~w8���8��S��E}Df_�1��@+I�z(bZ;�/5
M���@lBC����+�y���ִ��Rh]�O�m��K	��h�H6q�>���7BK���J�_��uHe*pi�6�����耲;<��oV��m-T|J���9t ���Vmi���y�Әd�<��j?4�rG� Q*�E{� �{����di��'-��G�Ԓ���%ʂ���=$U٩�U��7�y9]:����6�&TjX�G����np�R��+��|B�ٔgW�"���}e�b�(���*�l{��J\�2�z��.�(�~i��5�XX7��e�!w =DE�X�O���ex&ֱD���ݖ����XMȢ�4V�e�g�ZG�wv�ﱊ��`5��Yvfn�"3B�0���@�u���2��@T�� �# F�]�C�\w�H��������(HP�,�\��cԇ==+�������[v],?(ß��MfY^R�$�-��������eZK�G	p�kV�"�K�澳�.Qg ��"[��$gZ gʪ|j_����6Gu�}�h^R���r���T��r���AZ�%���3�8��9b��Uo6�uMSj��<-N�����������X�.Ӫ�[ _�v�x��>�����4T3a�3G:����g����j%�G��^~�������b��8Q��q���D6y��8��c� c~3��I�/�BTf�_��5&�}�+���=H�n��(���.���ʑ��aoVWe�j8�m� %�+d��c_B������z4�!�Jz�����ߓ���>'��	E�� ���ͪ��,!��ǂk0+�S�FOy���^(����,�Ėn���=�po�jB.='�}��[ך�i�\I�*�Y�ݐ(�3�^=�}.�^�1r$��F%����`_�#&0'���,���*L�ơ�����j�*�����Q�Y_�#s�_#�?u`0�έd�-/L�!��Qp�+/B�8t��|(@x�Jlfu$+�Mȹ��P_�_#F�y|����:"),E	�'w>�r�tI�����y����Z�����Q�_~?'�x��T^�q����6��6y��&�%Ǒ��b3'n�\t �0����?�*?�s���\2D��Q^S�1"&�x��[z2���cL�?!��O��hB��b�b<��g�Go� g�I�5� c�MoVE��,���e-Ԧ�I0���t׻��1>	j��㣎� �K��S�^s���_J���n�2tB7�NIQ�25S�YE��A�)V�⫮Ùf6��(����&�nw�ϘQst��ߥ����fa��f	e��Yh/��O `�j
��G�i	oI��F{�����1�`Ls^ή�����6����Sw*���Xp���\�^U���=����}Y��D��=�J�Ι�}T˭Ґ8r)�] O(z�#Ә|	����a�#�З�{l���(3�k�އ�m�1A&�� R@��P5��:?m-d�MxQ㎮��O�N���m3���0�#��w�B���B��5{O���4k������&�:�n/���N��%P!r]b�A�x�I.��_�Y/�����Af9k�~"��ƀ����M΄�F�1"~��_&����b�aF�r,�[�;��u� �D�H�`S�$nO�c�_\�"���X����ب2��/�"��N��=����?X��T?�.���l#/,g~�B�Z ���ȭ/�ͼ�˩A�gq�jJ�GSh��}VhgS��F|�A�}.O7���|��|0�e5��	?<�����)Ri��[�i���J���3��鞉���d�ѳ ��'�m���QŶ<���~�+r$���(�\��"W�K�eD��CA�.�#3�P�΢�#.ly0������l��Gp[�
�s��Q���������$>�Uox��,�[8�*�L��ip�WMe
n��^���#����;N]��}\b�.o�/V���Y7����oH��Y*���߆묂���_}~п�,�P�5Xk���w�]}��
j��y���"�����F���s�+"y��DZ��>4�4[����h�ձZ�Wylg���:�!����+k9�%��d�Z�b���|�=i���s7���� ���ޚ�p�=�:�TK��#~�v�)c4ѫ��s�qVBBS�zW]�S�v@���k���:�5oTt0e1#'E��]�����S��
J�<sk�H�*q�K� �$Q�[(�?�g��.5\��`��\����>+�o�Z��-�׺<�;+�w)z��ͨ�%�����׻�<�ZC� 8��
@�◺6$:���;��(|ӹTS�<��E�8q)��H5�����h�+�r��r�?8�^����8����S���ZO0R^�Y>�oA�N<�L]�b�'�B����p.�a�Od�+�C�q��v= �}p7�$�UL�E@�I 523t7��K�d`K�V�E��ÝP�]5c�	�	�gC,R<ȸG���M1�3�����x���v{��I�&>�n&ғkm!�D f�7��22�/����=G�"*l2�v�ӵ1\�o}§ܸ���5��Q�,DI���?d���St���ۡ�-�W�I�Вpd�e�|�t�JlĞ6�(_��3��.���������p�C �"����'�d8��9G0���RP��s���e�<x$S�`��<3���F01�R����-x ��R6��s��
c����'�R[�`��7�S��`���l�~�I&�e	˽U&%�O^~���m#|�`�av������K�=r|5Ir��߹����MM�]��5Q�$�m�"PH,�x{6N����=��,����#�p :�C�3+*h�ݔ8w�[H��
;�?C�̖��\/7%'ۅ
ͰO�^�:�fI���B)Q'��j�0K�ο�A�T�i~QT�tl�2d��h
n�+���cS��T� ��D������+g����O6_Ê�+�X�tn܍x��/�'[ ��+[oV�a�F�������8���Y�Kk��i)�U��#A��f*$KC{_,}+����Xx����R��0�6f�����>����J~���Q���v�R�@)%�QЍeet����}-3x�S�,y+q��P24$(��:��B,݆
E����r=�v�{��\��v�"D��=O���z+�ꡤ1����*�Ti~���6/���t�|�ٸM��5@#_FW	
�#9�h��v���g:y.�>�r��{K�6���������/ۆ�s��L21�ͫ�?2͓����E{I#��9IdoK�����$������/��d�����ϚJǎ��[G�sy�1��<�/����Di-{���}��Ⲇ��M3�R(��I�g��!�"�� 
�qHwG�,�!�'0)�h�١��f��t#ٰ6]����U��@~bBҽ�&i$>$�5�IhO����Cu��Q��N@�kð����x��s�^�3�6�G�G���|���{����밼�U��3���BN�+!���n�#�O�)^��
� �����%#Jd�^Ѕ�0dό��]b �J�Q�:4,ԧ�#���_������o璅���@A����9 S	<�#�.	m�u��KL��`��R�&c9��P�\��>t��	�I#��D��ÆÈ�"YͼU4��()Biኃ��K�R�n��z�sH_�J���`}����Tw5�����';Ӭ),?�ݠeO���+�Н�}�
͸X���9C��`r���X�b�$~
��m��))24��<�{���Baah�>�Ļ�:�����g�۷�)U'����f�A?�C#66>d�0��>f��6/E�qt%�qQ;�V��M+[����^e�\*܅�_p0>�\b�\ю����t
�|(��k�c��;���@�j>K�a����j3>�H�s�c��d��3_.�`b�����������,�Ţ��z2s�W/�a�Ь{���~�b���$t�jy�8v�5?� J���� �O���ʠ~9-�/��c��5�9�ee���Y+�a�Yi߰���J�4�c��}�c�!�M4�r�����k�\O����v!
߈ʗPl
�o�� ۻ&���ǈ�Gd��"uI8�_��Q"(	�+t���zFLi��SĔ�	QB;�S�XL���0s�Z.#�|A�`�0R�UX�R�*�91ŝ���](�R.$�4y���^�N�;���W��RWɅ(����#(-͛K?�*��g��Wގ���\��L��� 0@��Bl�v,���5l+� c�j�jfs��b�Ȍxl��	lJ���W���������r���g`k�jl���FM�y&�������Rԝ�T�����t�|��
X��[g�Q0؉��wv%�)�:29N�I�ßOƬ5g&P���0�p�{?��:A�3P�f��NG�V��H1ϥA�w5a͸�q�&�o�CNc�72����]��V�����گ˪o�'\*��gm4$U�ߕ;VY�%�6/�5�1�s*D�[0Y��u���8:���`�o8/������^�(���l�U��߂�w/W�+eu���;����4X��q|�'s ����m�͖`�0�����xV?�-�}�OU9��
sG0����iT
�1��PȇU������(=oo�G�q�^0�<KT3)��f���g�w�f��� ���nR�3�W���`PX���c�W�BcyHZų��̨Y�<S6P����q3�K�S��j�3X(4��-s~
aQ2��k���@���I�*;ԾQ 6zޯo�nz8s�"�͚/d�P4}0����L_�𞑵�;��]xܓ�&*1�4�-7�҇��A�*xdR�����J�	��]��8���p<Y���w}��~���p��IR�d�3�W�~�`�c��tKEg5�;�%XїA	y]�:m�緢d���Y�����
R�ӊI����h'~� �~K����YZR7hj�{=̭q�(6��z�T=� �;~-3�!7Z��a~8yㆶ��L/n�|%�zVN�>�%�8�F��ho�x]�d樒�ccN�D?�m�H�/f���J�(���o:�rS�O��h��߈ʱ�M��G>��72��m-=;3M��K1ؿeD0���C\�im=x&Z��9�����}�[��^ɏ`��l�'�H�VVCm��L�z���j�ß�b�̼#}�\�U���x��<O=��4k�[+�Xci�_�+ɠ��U���a��`Q�"}��  �����D'��)��M(50gf��i�s�:]k����ƭmݶ�V�����%n��Rʅ�SбS�A�(Wlb���Ȭ�@�g�y/R��_���;��,�J���8�Z��wq85����u�lJ����K����������x��è�s�z�u}#��.����Z�yw۶,����{	��~���\C���G������w��T>�`)�'SjN	�e��(I��3�PU�C��b�W��3�&�-�,E*@��x���z�+f[[�����^8'�-�O�]	ya	�函����A� 4N�
���-r'ʐ����@mT?�{vG�G�r�o�s�H����vH�,FvȲ�l.d���Q-.?�f�hY�g�e8l�$��o"F��yF���Ҷ�xq˺5�g/�5wݻK=|6�eU$Mͦru�!"�`�_e�\@�4M1�{�tc��es(��`�x��[�ED�C�^�8���0S�0�������~YK��߇(M�gzl|W���������mQR�+���9�KY��&b��J�����y�:�J���N0D�_^���ڧ�t��m8��~	�;��Tܭ����9�J����K�#D�-�I�>�6X��YH�,M�>~�<�ƃ41*=:�BF��lE���㋅&#A�q�B�vI��qΎ���y�EV�g��SSi�I22��<:�-u��R�ұ���8�1��*�;"~G,L�`���`d����<��5���vF�DF�ɞ�7Jk��:XuZ��9e�7a���F���N�o}�yT!�hͼ2V�ry�j#$W,�!B$��Fۛ�h5Rػ�*���+�@�)�%�!q��=;U	W~�(D�@^oh�i�a����4�#8�d����
��`t0��	�D�r<������@Tf��ǽ�Y�8��jhw�Ev� (�1�	���a��!�@`�R�>�̧��՝�rY>;����o��m"��8���S�?X��������4UHg�ϜSi�p�]�T���`W�ǫ��6�1�%�nmA�!'�]��46x�5�+��7�h�����x��em_�-?$���*g���/X�@J��G��ɞ�������Ø�%���Q����X�T�'y&��lM���ظۑ0J�F�۾>~��_s�IJ��_hr�S���[J�/K�������R�!��+��z��E�/�5���79�V[�5@�w?<���t�[5��������DAX܆�2��Bm����ݵ}�V�L�\vs%W;���+�WGy��ϥ�v��G�:�w�}V��(m�Zqͻ>Ҙ�|4�m��'����Ά��2.J(�e_#F�����5?��A�B�M�� 1-�pdR��I��/e��ja`$J�Î����FbPs�	�r4ސ�0
0����;�3	�l���?*_ʉ�پ�����ՠG=m����&S"b&���a"�����ǵ[,}R�N^Y�m�:���a�MJ_
I��N<���F:Y'E��".W9�B�h=�K�Ⱥp���d&�4���"�W.�_�;m7�8�>0�78d57Q�uV=x��'�"q��nn���w�f�\'5�	Qa�ِ��O�)'��is�����,���}��µZ�V��IUB������l��4	[�v?�;]ڰ;ˬz|�{� �@��γ��e�Я��f��A�+x6��hP�P��-j���U5��b�hK|%k�2z%h��'ٰ��8Q���Hl��0j r�QM�eL�8B`=�t�o��{���-~���#�/�+AÙ�D�}���y�|�ȉj
�-��j��@w��6G�v�_�g�H�P�g(���ܿ1y��;lNU��a�R&�Êf��@�Ӿhl�H���@�M	�[�T����]@�P�{�ŝ��U�Yii�+�=O���4-\�)N��4~W��t�}��n��Y�w�����xb��m�&<�x�ժCϼ�f/��+��t���ם�Nы��b�d�A.�RPS0p�JIp�݃0Q�ס�N��3s����v�q�a'���E?�d=)uY˿,�d�Tv�?��f ��"(5�(�Ղ��ԣViC���F'�O�攱.�d<#"( }+�.`��k��Fۄ����ty��?��DF�R�C�b�G�%���6��[��U&���e�7v[����	u��%i��>�V���_W1x^%�Z,���x�uj�L�:���~��Q�<1u`Y���91b8�si�[Gr��P&W���7�0h s��k�b~X@��x���J�s����\��!�g��B� �a�㣖����ˏ�A���ڷCӦ]&X������Yf~US ��{�8R�����TU{m�y��F0M�KHѬ8���x�EC܉2m�2���fX�,^�g�0i��2u�W��K&��Ӑ�p ���g�O�l�.cO�ē0��,����b�4q V�O��]����ܟ�BZc�$�����Q�*�r�"��>���� ��A�N���ٻ����P*�������WP#�,��އ߉d�����5
��D��s��.U=��]f,��Y���y.ǎ��i�5{�H�+-���o�3���f7{`:(��0���.O���n�4hE����~���$ KU�~=H�q�l�C�P�O���9
�B��^��8�V�%�.�)�)и�d�(����H��T��/nƅ�������T-E�o�e�zw^�pN������:\��g颻�~��̊x��-m�
R�@��C�
ka���)��*��0(��C����|���DĨ`���q�K7F+#�Wn$��,ŀU_`����'Ն�`�Iwpޅ����;�ǰߨ�`�"��}�^�{���!6vP}8O�_�st�1�7�b��%(�hX�m�X�|f� �dol%̡4�:&��T�%�dz�R����>ƆH�T�ĔDGw��ء�
؋�9r��-�^��8�
�L����RnL)���,��H���^�뉊`�N`]��k
Z2��*�Fn�d�٪ ����V�d2�����w�o38j�?�qϑ�8��q�̸�rAF�1�2O�P���FɽP8;��$��-��~ �O�ot2���]k�C��7�	�e�~,\AjL�<�/�Us]�Tϙ�1}��c͘g\���T�?l�>t���q�EM9���5-�k�L���k�f�?���8��}��)�V2��	���b+���0�R�����Gu9.gr��RU�/�ê]\��4���@��g��<%�jxZw\:N<�K��r�)��D�C���p����T<<q�&������k�A�9z��b��қ\���A�#h�i9�R���YN��?�	�Fb{�����l���~�Hq�V�׾+`�j��g߸�{sA�8/���
*�ʳn�Q����x��*ֵ�4���Dc�m?���t˒�3DK��;�4e���z�}~iDپ|��k�6!K��4�֏���}������܂��g�ں��Z������'��%S�$VT㇈�Ah�o�`��K������46W�S�H&6P��.�)�����N��	k����6��[-A��h��.5Z���0�vw9wT&r�p���^_J��|�2��%����͆�+Tׇ涫_M��j`�چH��w3�g��%�}�y�kA�9�TĻ��1G༰�jN�\R5�fr�.�2���;����m�R֧��$/z|������)�7Jg��E��ZD�!e;��U_�%t-�V[e`�~zیvY2��o�Qd
֔�}����%��N��t�Oz�����U:����&}�QhC�5���Ey>>�%ТR���_�#<a�x�0�x�4�hZx[{�4�B�@�n��K�ǭ�+�����0���7�Oіo�[�^��O$���'������*H���_�}����:�����|x}��JC�����_�ݬ�C}�3�U:�Z�;h0V��щ�ޖ��9�QJ圉5Ҝ�x{ �6�eLɆ�1P�Q��d�žK}�E�O�H�iG�K��*n寢�nca�f����3�����Ƃ�ݍN��:}K:{��� N�(���p�O^܀�2�i(�Q7
�O�5����m�޴��2��n۷��ɳ�v���5gJ~j-�|?��KY ���*��tx!X��i��s�M��W�.*D��,}��q��1��v���8ͥ��qv��[(���y���ss'۲�t�]S���~E��e-�a{�|��I��J���.�ʹ�g��/*�N������]x�w��=�C.（�f�^R5_q�"�C��%�B69�͕��$�,Ֆ�M��o��;���jԦ�pA��岀�pC��T��7ʬZ�i_�����/CV�K�>�s�IAt�F8i�ɑa;an�NEj��h�@ŪO1f�9�:�������m�],L�����!�a�'k�'�&�]%�I�Z	��#?�oQ5D��)�ʼ����xȤ�([4���s�J׼�Ub �mE�^-���xB�m�J�����|��Oؑ;�����q}�1�8y��^�D���O��/����$j�j��/�J��I0���&�0礜L>�~7��+�]L\�_�Dzp�4�ψ6FޣP�f"ڴl�zS�D�&ӆ3,d���c?��w�x꥓�{����	�5�����R���_��%E�ƥ�p�%�����`P澃�O�8b2+%'�_�U��O��l���N��Y�l��!w�P#�'�S��y��(W[o�~�r�9sn�kr�Y-A�l,��2�^K�P$�hxK�zjG��qK��SM@�>���ȓ|g1x�y)D	1c����B zXƠ<�͵,=�+�9wLE�����5匯��ɭ.%���|";�̐.�[�S�f��fp+�]�#��f���v[Wi�o�8\��t#O��K��䴙�1��q|M��1�jPk���U^1�3�H�^K4PAD����#�����gkP�3�͒��R�/�G��S�^Jwk�]�R�K�ܾ_�	[_�d~j"'d�Y1>3�Q�۱�Q	^�~m�},�6tyv���5,` ��������Do�������2T~�hJ&egd��d\>��� F�-9��zZ����K��rtL�g��c���'�X���3�7�0Q��u��%����{�M�\�|s��A�D^�lJ����Ūz3����7�z~�6�����@ٟ����4���?������<o���xc����2i�����j����u�V��Ԉ+Y��S��!nD�>�hP�5T�,�v�'�ъT:$������\�/���o^�j��LV� 2��iM"+-c�FvR���jS_��C�T��.���{�ƍUhV:q�Ȁ68��]RCek�ZWZe��~�^b�9��"+�tL�Wc���xN��ۯ��U]mE̼~y�U���\y���o ������g��I�JBQQ�^�b�D��'�%��4���?�B��ߓ�F�~�4��}���mN�3�H'}1T�,�-`�FGƗ9�t���Ќ<;�h|�(��%��̬?�7��gߢ��!�IA� �`6P��RX*F��Y��L͐�ISR���Sl&/�5��0��!�1@%�T�b���\]UD]����w�+�3���1`�S���y=e,ay�|��}w��or�����]����j^B�H��?d+���I�G�X���0�ɽP��[`����2JiBk;�5a$�X��c|����L��������.�����Π��کWݵ�/�g?��.���n�!Z��T��נG�A�~�c�|H��e?A�B��\"�T���KG\�2+�s�=p�`�6��s�]Uv�A�x����%�c�K����ҡ:ΉL7��s�k� ��gv�|�6f1V�y��GwrU)�Hf�3/�n���X;*_��+�ف83�t�R����Q,�lg���~J�
IO�;���^������j�M��e~��#�V��Iw��1ٝ�;NuL���B?`ǈu4��فCw���`D�XT3��1�;$��e��8����#3 6w��`���Xs2C7�I�!���6i�ꈏ#Hmw�>[8R?Kː�P2���^��m_����p�J�C��)̼���W�V�!p���)����Į2��K�P��y�!�SQ�xm	¾��I�[�?È�ۦ��ܐ�
�����l�;������T�.�'cg��凯d+B͏����u-�A��b,e����=%���
mG�f#���D|U7��#�Ϗ����x�*�e�D�x�3]���Q_�|���
���H�����S��j�n�@�I,�I�u�Z����1u�M�\�48'�w]�Ow\�4)����N�Ҏ+[GN-w6.����1��Իت�M��5ȥ�U0�* o�=�i�o_��rg�9�e�H�DO��H�S��3%�J8\��Ƭk�As�〗V�s���K�zP���@�E\������'l��[�-K)p�goL��ԝ%���eQ�PV�Gj�\ �w�I��u�h�ڽ��w�WU`l}h��V�Z�U�
������hͰ���r�;W�a4 �]�j����f<bvTSQ#��,Y���1�o|�F������F��{�BW�@��Z���_Ȫ{j����2@O!)��+[��l|D\(�t�o��Q���ڏ,�c��x&3��U�ס���v��ԡ�J�7"S�U{���Y�%�R��-=F��G����a���3J��<G
Q��fJ�u<�0���ظU7=X� ���%����?��D���?�F4�7� �Bm�D-6������Ŵ�D��pI��T{���gN#��![�L�X|�����>hK��+�u�["$�`P�u��'��.�������{{�-�V_x���r������FL�!����YJٕ����[��+�b�Z uV�7�W�n�YFg�R��*�]yW�VA2�<&�����
e��ѢY�l$��ś�_Q�}%WW����*�.w���֔�p+%��?��6���8:B���>��j�s���=��H$��rsE��TcF�YCv����s@
�RG��������{�(��)t�yۙ���w���V2K|���I��'��BH�Һ�r����(G��ߦ
�z���b�^������m���9�)pc��%�d��V.h�����E��%%+�N��ng� S��))�B��o�p��}�A,��m����+�B��'%���*N������j�[z�e�V�<*M�F�)
H����8c�`��z���a����J����r������p�w����X�y�EV��<Q�Z�߷!I�� ��&����Q�!.b(�9�e
���6��������*��G��pZ
n��։G�IB���¶ym����w�L�퍐�����IA٭��:|���N<|�:�M*/~������*�rU�!���M�3�4`��Da�����k�c�u����!��D?��|῿$)�!n�Zf��GАc{��.'�Q7�� �P�)��f�*7q���i��h�H~D��o��20��˩(��,%����4r͗UH�Ҩ+A���+�#���PcŐ! �fKY?�We�љ�s�����������R$���Z����
 W��2��A�" 8�j^�Ǘ���[�7���Gn�j��_�9d���6����g�=W�����.�Gԫ2�a_i��LPg�F�S�}J(~Ri@\�!�j�h:�qD/��H�g�NnV���Pҹ	~\�@/�`ḏ�p�R�ۇ~�#ׁ"�*�'@_��!'����*&�PoWVϐ^�n�E�Ҙ�[W�Cl�pף�Y3����*���9�v\�#ܡ�勅 y��C�x�z�?����*�O�,}O]��6l@��#�°S=�� ٹq��
�l�]�v���c�9 �76K��>y�͉��s"��;KLB�hL���z@�G$=�|��V����/�7CS�-<�!�iz6t����x�s�dzLZ]� zcU���qM��)]�5�y;|-�;"��������V�l�q�:�����U�(iНB���X}~���ep��f{7n�&M< A�F�'�0�6���?ɝ�H�%4��6"z"2��e/ݭ��������_Ҽ�=*�I�����$.i#�M�\�7����6��CJ
��l�.nZ>�#`��M���E��3�P� 1Jz�'苝F���n�I����!��V�-ޛ�d��G�a+ZfSD�FF��I"n���wd�Y�>�<�`V3R#��lM#v�_	��n��8��ʢ��r�!͖~3J��k�i���C5ӆ�m�a�&�@�T٥�X�m�<��2��Wu��`~~5Ѳ� �Ru=�B����D�#Zm��� ��3����Ej�4,�a}��4�����z�B� \�C3I�&^�7��}�:v���S�����
�K�@�j`O�d+߳c��?�x;���[2o#֔L C}w�_Ñ�{�Ec�����2��{�9H���"��Ӭ�����s ��4�d�o�
�<��߼���Q��w8^O��6>F8�$�� UlO:�;�O
�0ϛ�,��,�����YL����Go�Ɠ�׉!6�y�2E՚��qyuM�	�8ǽ���"F"���9���4B�1�E+�ͻ�IQ����+��SD��s�=TN6P���hoX�)�J��Y_kK�W�|%����FrLI��%@�m# �GmP[ͥ�
�7(�gzUi*t�J2s䉘t
���D����m�@�Z��ow<���URl��� kS3��!`����m���bf�Պ��	�0c�&v~�pݘ&�%���ll�0,}ǵ�B�v�=�(v�)�C�GF�5�bz��@�p�k#-��8����M��&p.�$���S������Bi��6�m���,�綉"nMz���W�|�"b_y��j�65_�8[%��4���.?��<9�Z���C�o�)�-�)����̙`n
.(�:]������	Ȳ@������N�k?.����~�`�x���H�w��*!6����
��f�9C�P[b��q�*�}��]��f�Z���nm9�}r���=���d��ɘn��w��FԂ�$�Z��at�?��Eq}>C�Α-w�g�7�`��[f�d��J�/���jޮ4m]i��7ݣc��bَ�-��h�FE}d&�|�]Q��ss�t\O[����L����O�+��|�4n$��۞0vK]f!v�ǰ�9@j���5�Չr��[G^U���X�61 ������qܴj�> 2��w��D�W�����QnY�o&wJ�M޻6�Q`qH�c�Jܳ:����Lo.k��� �:�0�/X�X#��3���=6�O($/�M�V0d 7�˖,��5���I��D-�R��P������E�Ɇ�YO;n��}�`\�yF�q?���;^����KS/�.܂
�Ri��%��	 ;�������yx��|A*�:�8��Xʧs�y�Hy^��q�\b?��j�?��R�X����C؃L�f���Ʉ��.@�?������^���W���3�vr�����ri�R^O�#���m�d�����ʆ��>��}Q�9OtrY`$�'�萂���5kQvA��ױ��70۪q�������F:��zk�c�J���^_�� �Y��ҩa;��q���O�T��Rn�`�kJ͙~偣i*�_��R�
�']�:%� �Px� dfy�6"\k��>���24��5��o60C���X�?Z�|�a���6E���-߅XlT�s��|#� ��4PJ,ƅ�sm���ƗAJ���o��p���6x�.yv�&��?�G2YE���u���9�'�Q������	�qʋ�i2�#��_��v�y����b��Lmca5��?H�3�}��NP	���^˾�,�t��hN�#;�i�?�\��K|E3���9�
�5�2��Y<U��W�.:�Yp���͎��ly�!I���)�������[݌�{(�)�b�4��j����$=���i�:�c�˽�*z�$�.�\��|4�+��y>��KB��J!������mIA���Jȉ���g�r���.��d�������{���ϸ���� ��=�r�a��i���#�@Ǆg��t~�= �(��MKdђ�p)O�e��e]=xƹ�D!��|�(�,v���H�G�Pܤ8<�ݐ�j�>7��^��aU���i�ϠsGL��T~�l�M���mk�%��%���L��	�r�8Of)�� m�50�(�ȳv�َղ)�=���I��zB�b��>v�xw�:T0|��*b����J�%�_f�5C��)���Ӂ�Ba��Z��B+xV��0�*�<��]ta��e=�J��T��w��ĩw`č�l�5Ls���ٰ��I����1�f�XR�旒Z�I=R�:�s�W8�U^]49�Dn4
���v�|���Pt*�bqS�P����X�W
�P)I`�S�����?���͟H��'�z�ǡ���Z����|ʈ��=Xm9��nUL�D����xZT���g�!���g5�d�����΁�@֕�m썺�̅�}�����D������%K	-e���z b��Pl�u5L�ш���@�F&U�[���?Id�.HԻ��q�&��A�#p�:���%[*t؛��2�a�#��޻a�I�2]����njM[�E2�Cw}�{/�;`gh�n&��|�ek$uI���q�M\�u���\0�e���}��n��'��5u�#&~���uA<���t�& �d^$�­A��if*�QƤ���m�8��������/P��w�ʠK�F��x~E��"��}+�F���-R�I�2h��j��ry���&,as$���q5	ח^��ɠ�����a�rk+n�����,d�Q�c�~tcb�.P6`;�4)�NbN\QiZ��i�]�U�]����o��&�|a��kc�|��|����f�Yuٰ�ÅU&3�c��}�p!�Ȇ}/�=e㌷2�vo*��bi�0H���cO�QF�RH���	X'h�1���?x8_6��>��z4��5�ø��^t�eRo���������~BO���_ �~F���[>�}=y�-�U��D��F]�V���q!f�j�k1gW�(��	>���8_��`�o�Ae`���H��ũ}�fG�i8�7��"`-���;�t�~O�
]�_�JD;2�����x�{��n�<�}��н.��� ��#��C�a����ψ�0�hE/�ס�;�j� j򾂐�k蟝 x�c8�X(�.@<����l5�n�ؒ>d��m�i�1gL��)C=�į`kF�:/-�"u|�i�7�dE�Ō1�w��-�x]kB��Ʀs�� ���qY�X���t�7�!��	G�&���^��v�-���,V#�T��Ig��`)�J�X?�0T�)��,c���3ؒ�Y�Aa��_���Ekl+i�%Ⱥ�
�E�aa<:��W��!�'�ŀj���d�!�Mh�{�]s�o;��@Oe��?��_��G��s�.�l�N~�K��`�v�@�Ϡ��8SY�xY���)���Gi�iDr�;�M�];�1�9l���=5���:��) ��P\���-ȂW:G�j���(����L��9Ja:~������,�^�,�F����,"{ ~}牍�s��=���!��BgԮ��D|��(�P�G�����8 ��x����`JK��h����E"[�l�p7Ɏ9Y�f^�ˆ��޴Rr�p��fg�_�z[�	������_�Q�0x8��8�u$Z�6)��>��r��Β5� [�Q;i"|��Ns_�-����:a�-��.�ï��_���GM�1�H�����`�X���"�����wp�8�2G4�����̀k��;Tj��#m�`�6����!j�h�TU�v�ڷ^n����ُ���ˍ0��Ӑ>3���+o�L���1ނ��8����%�j/n�x�v�+���{��؁�>���Ag���m�%��ܮ��s��k9��o?S��]'r;��#�Z�n�/�ׯ-�lJ,�_�S|� ��%3r��CS�`����|��k��ڇ\�U�F��9,�ʫ��^��/�C}���i���py!�
,ҟ	��C�$�J1&ܯ�= ��5���'*�d��F@e�2#�Q���ɵa\Ԙ��7�#���� B���!7
�
��Ӵ:)걨z��0���eY\�7]�?���#a<��B}2w�
��mzH՞W0N+_%�:(%IS�z+Vd<����يey�@�V���y���5M��\�qLM?���;t+����k�A��+t;Y�	J�n�b>�'y�.�Y���a(�~d���F���~��^{7(t�	��n�O�r,xRC)�pX�\y�cd�����o#_��X��M�!�i�<�L��'��{�
 ����;���7�NG��:�֩�s�/Ӻ��͋�3}����M,�%*�H A���F�⑍��p�Cn�t��H-�;LX��{���i<UG
g�������׮,�H��m��N�ž���U�e�գ
Э�My�2{z3E,S�x:�Is�i���j���cIq�ӘD)K����0��=���n�<mʔ���e/|��o����MmW�D`�j�v���lX�����g`��|n���^\�W:w8��ҧ�l��Z?�>cny�,��o�0��F2Yd���DuJ����y�|d����ܺ��;��lMF!�J´�h��E ���s��}mS�rQy��|ih�Wd+��=�8��Ѕ���m5�I,O!�^	��?��F2��oe<����ȟ���jͳ���R�Y  �Ә`�P~���U� �����=����@̩�Rk��QE�Ul\�͋�E�z��W`��Y�'۝� c_�Π<�(��4Mw��\tذB."l�i=���r�6FD��r���f�ejl�/H�Vx�+��c5�����ͽi�j�8�E&i��P��t����Z����a[�m�u.T�r�	��:��"�=Bl����Ɗ�����O��<�d�� b�x0���H�����J�0�̽\/�D<��ީ8Mk���7}��X���kO�wquMK��#�ïU�����t!�uG2��o�b��?�\��:�q��\-~���B;�HLt�/=��O{m�˲��Ec��f�lj�pr(XR�!���y#�DA�O�2��qCe=Iw����h��`w�}�������[������M�+ �Hiat�g��� �2X�x<���(U�u/���eK_�Sar���Wwh����&Ie���ͳ�]�h�b�Kf��0R:V����i�ɹ���.Ẃ��P}tH8s%Yq�L̡������(�y���-AA4�&V?��	 gO��<�k�����B$K�_�*�V_Mdv���%����p��EB�^S�j���!�=���G2���N*0�3(w���9١�"�t�AW.�a<rK���%�ܧk���5r��m��?7�	��`�Ux\���	�@|5Z�U�]�n���j���0�M�"����`%�Ap9�&+a�I��s"Ml�hh�9�L;�5�/0��?��m*V<���{:3S,�\���:�v�ͤ;I��ҡ[����5#3�X�8FW��X��Hd���`I�-,�7���p��RNbW�IلD>DK�}W�ZopB��Kɋ&r+&Fs��CX'��ձԄ��[@�J��B�@��=��f=%<��2[���81] �X�8�CV��9�W�x�c~1�ۨ�v����Z�����f�D]�&6N�H�?6����+(*Q�x���.:r��G��F��F=,��_�X͠2O���u��%�Z�����9�ӣg8����@4���}�WJκ+�V��ی\�������`آ��&u��3Y�����]���I(���!�K2M%Z�%{�&�1���⏘�n$���߁�y��K���P��V�7^��"r��*jf�6��lN��Ғ���t�1S�1�M
 8!6�r���c�/`���ll~�*mV�5р~��P(��?�N{��>ے�A��a�C�=�Vlr2P��/���Ȼo>@W	��7���G�:�F���J�Zߦ�4ү��F;�7$&�Q(�=����`^�C p���J��/g눚GoG���D�r!M
5�����9����B�p���d����,35��x�o�RH�"
]�������C?�Gv�ǖ ��;�"�f�~�	�t{ѱ�8��J�*\όbe���M��ä���f��"������vVU��t�H�խ���%���H��K���y�2ê�Gvsր���H��� 2�߮,�EP�Y;��V/m;Sy���#��*�'�:g�MtpI�T��7�%�cd����|٪��*šQu|Mdo���'s7�bŇ˗p�|���C�h�3�l����P_r����v#-�*��s�>�f�^�9<v�I����W�]s�~mU�E�XS�^��{O�vVt�w�b�x�ll}���p�A��S��"�>VnT���P��͐Z�)%T�����+DǳTA��R:*tfBM��P�YW{�p�]�{ى��mh��E���0���U�?����HL�x� Z�Qg%e,���s�_��cg�dbK�AI%Qi'G?�7�W����=Iɛ����6�|Z�ű8��̍_�
���_ns�����=�X�FI�<����0���yz�=N�m�Ip$ C�!�:��-��<�����{�I��q��آ��2�<j�D��mJ�FIY+�f��f�Za�@�V���fF>T�j;nX!�E��T�^b�PK���p�F\��� &�O'��~�g>Yˠݛ:B�� 6"�U�þ��gI���\��c{M ���ʩj�,=l�"�1%��ˤp�����sp���6�P�8.�'��f!�U�z�g &غ�Z�@?-��! �G�R/2�]$�	J��K����\Jr���Ws�	�>ӊ8�@�H�:)��#�j�ՖO���WI�݂�]~y�[L��|�z������)��^\�p��j��z#!�M&fʽ�A��:���D[I��JuK��R�y��P�S���2t��<���>�\���f�Lฎˡ��EuD�@D�;
h���u���B/6��ְ�lv����ǙDtJ[:5�/k~Q���E�?�1�q }��kz�οw��0Ӝ84�1q����>7�{�i�B�Ώ*	�"�kJep��	#�5��%�Q��`�x�����1"T��<�:�	�]bfNo��J���)�\E[��M�3|��C�O��9_8+v9��m��<�4�D�4�~�P��Hq�EȒ�����*��/m��nU@�\��Af�8]<m��U�+BuU�B\]m'S�t��v�c*�2��Tq�<:��u9��I��\��;˂��2|�
���"ԙ8�j�X�����	���/q-Fn[��Ę���}\F4���x��_ܮ� �W5+B�G���qȌ���W�e
wkJ!&ģ)�(��a
8�%�oO��͝�L!��SwM�6Tl�n�@/�������Σ�9?�2S����8dΔ�Gܼ�
.����}k~C{�����y�����/jU 
cb��ӆ6�Xh&gN�|[��bf�𴢵�ܶh�����k��z��Mn�f���q�<o�I�}pMN�p��[�����)Hz�,��y�o���I�8kdS�j��&A#��|U���&Ny!����呖��lP<��t��_����$-�'D�a�Տ�J��5�k�qv�Y�:����
� �
�A�I��tѬ�	0�c�F�e%�5#�0�������ދ�4ǒ��?E���o5|K[�4�gT�HA�2���\d��}�&��Wm����{�~�<��o���r\;b�:�7XL�� �N��eߵ���q��3��X�L���Zl��)���O�Ùj`��Z�KZB �,�z��P�1~��}���dj�μr�_��^(�Ǽ�fІxW��>�����1���GtT[Vt�$�A���LJ�k��:w\�t͜���X�~�/8��%FiMRl����)���	�cJ}���u�0BV�h��G����Ŷ1G��^u��(Tfΐ��H�Ԭ<�"A��E��6�gCE#���)QA/��8�6rɪ�L�>���7�Y6�Qr���ئ��E]x�o�c��|+�I>��� tݚ"�{9��w{�-ˉ��ů�S��S��H7Bj�7������>%�6���'_���*��Ϭ�2���Z������f��)���l ĺ� �X�!���o����]*	��7^7��1͜Y�D���E����q��`�����]�|��=(ȯuek�oF���s��F$Ԯe�Y�F�Q�� ir᭏��:��Ҳ-�΁)Sȣ��a�$�\Y���-\d�i#������ؼ�51:;���c�K.~��B��J���X�*�m���]�X���w	0tǡ�[C�`��}P�H�Ѯ@�3�I/��r��P�Jn]�Ő��]{�f��^_�-���ޭ�ز1��͌�~i�nW�[�`����c����^=&š[zp=A��J"�A���ن*x6� n@��U�'&�am�4���ӄ�K��h�.�Z̐ࣻ��2Hr�c�T��UqE�ƾR��m�?��m3��4�w5��"��j0�%��[6[�\�/��f�%�1�R*/�ǫSJ�'\�;�D�{�~B��̫yE�	�o�ɪ0��srb0E��:~�IW/���DV����d�KѨT����iC�뜇rG�f�ρ����V�t�[��v����8�6���iNn���BqX#�+�o�T��5tf��=���.bX��ж��4��F��K��7z|��wW�ڀ_ʶ*�F�$������>δ3:��g$�m���fK����2�^��Ub��C�R���]Hb���b�X�~D�
m�k�]LPJ�+�~w�{��y>�F����h5�a�s~��>���\�E$�.;��GI2"�����6��!�'���%t�2�E{�R�OO�Ö	�EH/��x.�S��C���Σ�}1��Q�xt�����Z�M�`��Z&�� �+	��G�=�I��6����1!� U��!��of6����ь]����%@ G�����yA'�*ʏ�Q�#��&�Q�����cQ�zB��q���elTf#!��o�;{恤%k:��-
Q�y�J��������s�m�@�m����[�~~���14�c�\�X��gO\HH%����L7[CcP^�C�J��Y���K�!�,�S%{(�]��������4�gw�+�zW���9��2o�߬��\��0wKZ^;��ccY��:����%��T�/OVoj�P�)�����dmaX�����m�Q�%��#U� �%p�5����<ݳ��G�5����lPW ���4��:d�ҹA�n�_4�@��~9xj]�o��eˇ�[����/K
vʬ0���B줧4����v:W��2e=�'�y�z��}�3��K���ÜW/v�'� e�`��������ӱ�%y���;(�源T�b(�>)_(�>�I3z'�fEu��Y���#�;��k5d��!KV��D�X����a���&�Y,�g/�h�M.݀�^���U��/��kq,��1x��}��?O��=�湝�=ȡ7�4ڼ&':a���ï�Nh�@l���l�� �����q��{�^�K��o�,���E�Jo����_,X����[���P�vu96�}�p$C�ӟ�נ��'��%�����K�R����'�vv~O� X�S��F�,!�M�+6�HZ���zj�Q�	�B{������O��ѳ���;� f|���B[�M���FА�Yf��j!|-a��
)*��%�����%��<���5�&��������ƹ��Ct��%�Z��ɴ2Z��.��A2D�
�=�i#2���?x&L�@g�l$��6
|iK 9u�> c�����<�u����22`^�֓����X��"���NXm�[�t�h�0\�W�\�%�n��C�8y@{t��5��e�*�5�f��t��^��r0ϯ��:��R��݀)?�I.�5X��L+���7�����E]5���fћFK�á�����0��9G��� �&�O+�(/�1;������+�o�YR�����Z(��/a�k$kkפ�m�:�gPq2��f)�(�Y�^�D4T�CB��!RFJw	�&h�T]�U���1�gЫ���D�XX_�ĩrH�EX/x�N�����+p_�PPLw�ڊ��?Ѓ�-��Qq����j��ʹ�Z��ʑN�)Co�B|�0%�=O����r��1�[�* l�	=X �g�<y���NQ ��e��aޑ�LR'���J;�xܕ�������8o��ot		&�g������ϱ����:��[{m�J�
D�n��=��E�����=�����\X%\W��5�C���\[�I���|s��B�ދϺ�O�#h7�S2 �P�R�=�ByZyBx���7Č4�~�m �E�t��\b�O��.�����zy8��`}���5
g+v w���[����ce)/�����9������s���n�+t0E�~UH�J��y�*��lmͭ;w�ۑnz0߶<2�xO�A�m�`���d����0W=ca�s�!� ����H��&�rh�8Q@��^�e�j�W�O+閄��4<�,�1�*��m�b��e�NS�$�/�B`���>��c�+S R���)A�/�H�;�>��驻���"B����Cz$�P�W
���FA�F�ʊw�&H�K�\LS�!+�G�����<Ւl.�A�.$���x�Þa��O��O�8��qќDm{�x�n�CP&�������8*�b�x����5��s��/��r\�m�E*��ȋ�y��1sh�8�ԧTv���Ψ�Q�'/���.�Z�S��J�p�T�_ڬ���N�ÌNAn�kQ�U�š��a��ʽ��Km���bٷ�|d�ؼ�a�,=�a��މ1��7��R��Oza��o�O3 0�[��#VR9!5!�?�"f��Z�Bs2J
�G[�*`u��}������X�S�y���`�*D�L���yDF�꽁R�>�Hk�Zb�vS���e��M�A�8UDp�:"D1v��B�Y�󂗁��Nau}w��쉉vGƩ�=鞖��.����GI��z_�,��&FU�9ʈǏ���{����LIr/��6҈�\j�`�Ix��!5� Ka�3O
��nS՝Lͪ|��P�);8�2[�Ūw�
�lD�U)1���%���	�3!��5A��ޒ&q�&��⾕O�jm��O>z��L	�rgZ+����k��{��۹A�b+��N>�|9=�
�@�\�(1�E���arL b�D��5�h�87ɨ޹4���r)׼#iPuhv�A����7J�_n��@�r�E���2'�|�%@�:�a{X�xq��F��$����T�粂C���S�Ss�θӒ>
���tps://{s}.basemaps.cartocdn.com/{variant}/{z}/{x}/{y}{r}.png',
			options: {
				attribution: '{attribution.OpenStreetMap} &copy; <a href="https://carto.com/attributions">CARTO</a>',
				subdomains: 'abcd',
				maxZoom: 19,
				variant: 'light_all'
			},
			variants: {
				Positron: 'light_all',
				PositronNoLabels: 'light_nolabels',
				PositronOnlyLabels: 'light_only_labels',
				DarkMatter: 'dark_all',
				DarkMatterNoLabels: 'dark_nolabels',
				DarkMatterOnlyLabels: 'dark_only_labels',
				Voyager: 'rastertiles/voyager',
				VoyagerNoLabels: 'rastertiles/voyager_nolabels',
				VoyagerOnlyLabels: 'rastertiles/voyager_only_labels',
				VoyagerLabelsUnder: 'rastertiles/voyager_labels_under'
			}
		},
		HikeBike: {
			url: 'https://tiles.wmflabs.org/{variant}/{z}/{x}/{y}.png',
			options: {
				maxZoom: 19,
				attribution: '{attribution.OpenStreetMap}',
				variant: 'hikebike'
			},
			variants: {
				HikeBike: {},
				HillShading: {
					options: {
						maxZoom: 15,
						variant: 'hillshading'
					}
				}
			}
		},
		BasemapAT: {
			url: 'https://maps{s}.wien.gv.at/basemap/{variant}/normal/google3857/{z}/{y}/{x}.{format}',
			options: {
				maxZoom: 19,
				attribution: 'Datenquelle: <a href="https://www.basemap.at">basemap.at</a>',
				subdomains: ['', '1', '2', '3', '4'],
				format: 'png',
				bounds: [[46.358770, 8.782379], [49.037872, 17.189532]],
				variant: 'geolandbasemap'
			},
			variants: {
				basemap: {
					options: {
						maxZoom: 20, // currently only in Vienna
						variant: 'geolandbasemap'
					}
				},
				grau: 'bmapgrau',
				overlay: 'bmapoverlay',
				highdpi: {
					options: {
						variant: 'bmaphidpi',
						format: 'jpeg'
					}
				},
				orthofoto: {
					options: {
						maxZoom: 20, // currently only in Vienna
						variant: 'bmaporthofoto30cm',
						format: 'jpeg'
					}
				}
			}
		},
		nlmaps: {
			url: 'https://geodata.nationaalgeoregister.nl/tiles/service/wmts/{variant}/EPSG:3857/{z}/{x}/{y}.png',
			options: {
				minZoom: 6,
				maxZoom: 19,
				bounds: [[50.5, 3.25], [54, 7.6]],
				attribution: 'Kaartgegevens &copy; <a href="kadaster.nl">Kadaster</a>'
			},
			variants: {
				'standaard': 'brtachtergrondkaart',
				'pastel': 'brtachtergrondkaartpastel',
				'grijs': 'brtachtergrondkaartgrijs',
				'luchtfoto': {
					'url': 'https://geodata.nationaalgeoregister.nl/luchtfoto/rgb/wmts/1.0.0/2016_ortho25/EPSG:3857/{z}/{x}/{y}.png',
				}
			}
		},
		NASAGIBS: {
			url: 'https://map1.vis.earthdata.nasa.gov/wmts-webmerc/{variant}/default/{time}/{tilematrixset}{maxZoom}/{z}/{y}/{x}.{format}',
			options: {
				attribution:
					'Imagery provided by services from the Global Imagery Browse Services (GIBS), operated by the NASA/GSFC/Earth Science Data and Information System ' +
					'(<a href="https://earthdata.nasa.gov">ESDIS</a>) with funding provided by NASA/HQ.',
				bounds: [[-85.0511287776, -179.999999975], [85.0511287776, 179.999999975]],
				minZoom: 1,
				maxZoom: 9,
				format: 'jpg',
				time: '',
				tilematrixset: 'GoogleMapsCompatible_Level'
			},
			variants: {
				ModisTerraTrueColorCR: 'MODIS_Terra_CorrectedReflectance_TrueColor',
				ModisTerraBands367CR: 'MODIS_Terra_CorrectedReflectance_Bands367',
				ViirsEarthAtNight2012: {
					options: {
						variant: 'VIIRS_CityLights_2012',
						maxZoom: 8
					}
				},
				ModisTerraLSTDay: {
					options: {
						variant: 'MODIS_Terra_Land_Surface_Temp_Day',
						format: 'png',
						maxZoom: 7,
						opacity: 0.75
					}
				},
				ModisTerraSnowCover: {
					options: {
						variant: 'MODIS_Terra_Snow_Cover',
						format: 'png',
						maxZoom: 8,
						opacity: 0.75
					}
				},
				ModisTerraAOD: {
					options: {
						variant: 'MODIS_Terra_Aerosol',
						format: 'png',
						maxZoom: 6,
						opacity: 0.75
					}
				},
				ModisTerraChlorophyll: {
					options: {
						variant: 'MODIS_Terra_Chlorophyll_A',
						format: 'png',
						maxZoom: 7,
						opacity: 0.75
					}
				}
			}
		},
		NLS: {
			// NLS maps are copyright National library of Scotland.
			// http://maps.nls.uk/projects/api/index.html
			// Please contact NLS for anything other than non-commercial low volume usage
			//
			// Map sources: Ordnance Survey 1:1m to 1:63K, 1920s-1940s
			//   z0-9  - 1:1m
			//  z10-11 - quarter inch (1:253440)
			//  z12-18 - one inch (1:63360)
			url: 'https://nls-{s}.tileserver.com/nls/{z}/{x}/{y}.jpg',
			options: {
				attribution: '<a href="http://geo.nls.uk/maps/">National Library of Scotland Historic Maps</a>',
				bounds: [[49.6, -12], [61.7, 3]],
				minZoom: 1,
				maxZoom: 18,
				subdomains: '0123',
			}
		},
		JusticeMap: {
			// Justice Map (http://www.justicemap.org/)
			// Visualize race and income data for your community, county and country.
			// Includes tools for data journalists, bloggers and community activists.
			url: 'http://www.justicemap.org/tile/{size}/{variant}/{z}/{x}/{y}.png',
			options: {
				attribution: '<a href="http://www.justicemap.org/terms.php">Justice Map</a>',
				// one of 'county', 'tract', 'block'
				size: 'county',
				// Bounds for USA, including Alaska and Hawaii
				bounds: [[14, -180], [72, -56]]
			},
			variants: {
				income: 'income',
				americanIndian: 'indian',
				asian: 'asian',
				black: 'black',
				hispanic: 'hispanic',
				multi: 'multi',
				nonWhite: 'nonwhite',
				white: 'white',
				plurality: 'plural'
			}
		},
		Wikimedia: {
			url: 'https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}{r}.png',
			options: {
				attribution: '<a href="https://wikimediafoundation.org/wiki/Maps_Terms_of_Use">Wikimedia</a>',
				minZoom: 1,
				maxZoom: 19
			}
		},
		GeoportailFrance: {
			url: 'https://wxs.ign.fr/{apikey}/geoportail/wmts?REQUEST=GetTile&SERVICE=WMTS&VERSION=1.0.0&STYLE={style}&TILEMATRIXSET=PM&FORMAT={format}&LAYER={variant}&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}',
			options: {
				attribution: '<a target="_blank" href="https://www.geoportail.gouv.fr/">Geoportail France</a>',
				bounds: [[-75, -180], [81, 180]],
				minZoom: 2,
				maxZoom: 18,
				// Get your own geoportail apikey here : http://professionnels.ign.fr/ign/contrats/
				// NB : 'choisirgeoportail' is a demonstration key that comes with no guarantee
				apikey: 'choisirgeoportail',
				format: 'image/jpeg',
				style : 'normal',
				variant: 'GEOGRAPHICALGRIDSYSTEMS.MAPS.SCAN-EXPRESS.STANDARD'
			},
			variants: {
				parcels: {
					options : {
						variant: 'CADASTRALPARCELS.PARCELS',
						maxZoom: 20,
						style : 'bdparcellaire',
						format: 'image/png'
					}
				},
				ignMaps: 'GEOGRAPHICALGRIDSYSTEMS.MAPS',
				maps: 'GEOGRAPHICALGRIDSYSTEMS.MAPS.SCAN-EXPRESS.STANDARD',
				orthos: {
					options: {
						maxZoom: 19,
						variant: 'ORTHOIMAGERY.ORTHOPHOTOS'
					}
				}
			}
		},
		OneMapSG: {
			url: 'https://maps-{s}.onemap.sg/v3/{variant}/{z}/{x}/{y}.png',
			options: {
				variant: 'Default',
				minZoom: 11,
				maxZoom: 18,
				bounds: [[1.56073, 104.11475], [1.16, 103.502]],
				attribution: '<img src="https://docs.onemap.sg/maps/images/oneMap64-01.png" style="height:20px;width:20px;"/> New OneMap | Map data &copy; contributors, <a href="http://SLA.gov.sg">Singapore Land Authority</a>'
			},
			variants: {
				Default: 'Default',
				Night: 'Night',
				Original: 'Original',
				Grey: 'Grey',
				LandLot: 'LandLot'
			}
		}
	};

	L.tileLayer.provider = function (provider, options) {
		return new L.TileLayer.Provider(provider, options);
	};

	return L;
}));
/*
 * L.Control.Loading is a control that shows a loading indicator when tiles are
 * loading or when map-related AJAX requests are taking place.
 */

(function () {

    function defineLeafletLoading(L) {
        L.Control.Loading = L.Control.extend({
            options: {
                position: 'topleft',
                separate: false,
                zoomControl: null,
                spinjs: false,
                spin: { 
                  lines: 7, 
                  length: 3, 
                  width: 3, 
                  radius: 5, 
                  rotate: 13, 
                  top: "83%"
                }
            },

            initialize: function(options) {
                L.setOptions(this, options);
                this._dataLoaders = {};

                // Try to set the zoom control this control is attached to from the 
                // options
                if (this.options.zoomControl !== null) {
                    this.zoomControl = this.options.zoomControl;
                }
            },

            onAdd: function(map) {
                if (this.options.spinjs && (typeof Spinner !== 'function')) {
                    return console.error("Leaflet.loading cannot load because you didn't load spin.js (http://fgnass.github.io/spin.js/), even though you set it in options.");
                }
                this._addLayerListeners(map);
                this._addMapListeners(map);

                // Try to set the zoom control this control is attached to from the map
                // the control is being added to
                if (!this.options.separate && !this.zoomControl) {
                    if (map.zoomControl) {
                        this.zoomControl = map.zoomControl;
                    } else if (map.zoomsliderControl) {
                        this.zoomControl = map.zoomsliderControl;
                    }
                }

                // Create the loading indicator
                var classes = 'leaflet-control-loading';
                var container;
                if (this.zoomControl && !this.options.separate) {
                    // If there is a zoom control, hook into the bottom of it
                    container = this.zoomControl._container;
                    // These classes are no longer used as of Leaflet 0.6
                    classes += ' leaflet-bar-part-bottom leaflet-bar-part last';

                    // Loading control will be added to the zoom control. So the visible last element is not the
                    // last dom element anymore. So add the part-bottom class.
                    L.DomUtil.addClass(this._getLastControlButton(), 'leaflet-bar-part-bottom');
                }
                else {
                    // Otherwise, create a container for the indicator
                    container = L.DomUtil.create('div', 'leaflet-control-zoom leaflet-bar');
                }
                this._indicator = L.DomUtil.create('a', classes, container);
                if (this.options.spinjs) {
                  this._spinner = new Spinner(this.options.spin).spin();
                  this._indicator.appendChild(this._spinner.el);
                }
                return container;
            },

            onRemove: function(map) {
                this._removeLayerListeners(map);
                this._removeMapListeners(map);
            },

            removeFrom: function (map) {
                if (this.zoomControl && !this.options.separate) {
                    // Override Control.removeFrom() to avoid clobbering the entire
                    // _container, which is the same as zoomControl's
                    this._container.removeChild(this._indicator);
                    this._map = null;
                    this.onRemove(map);
                    return this;
                }
                else {
                    // If this control is separate from the zoomControl, call the
                    // parent method so we don't leave behind an empty container
                    return L.Control.prototype.removeFrom.call(this, map);
                }
            },

            addLoader: function(id) {
                this._dataLoaders[id] = true;
                this.updateIndicator();
            },

            removeLoader: function(id) {
                delete this._dataLoaders[id];
                this.updateIndicator();
            },

            updateIndicator: function() {
                if (this.isLoading()) {
                    this._showIndicator();
                }
                else {
                    this._hideIndicator();
                }
            },

            isLoading: function() {
                return this._countLoaders() > 0;
            },

            _countLoaders: function() {
                var size = 0, key;
                for (key in this._dataLoaders) {
                    if (this._dataLoaders.hasOwnProperty(key)) size++;
                }
                return size;
            },

            _showIndicator: function() {
                // Show loading indicator
                L.DomUtil.addClass(this._indicator, 'is-loading');

                // If zoomControl exists, make the zoom-out button not last
                if (!this.options.separate) {
                    if (this.zoomControl instanceof L.Control.Zoom) {
                        L.DomUtil.removeClass(this._getLastControlButton(), 'leaflet-bar-part-bottom');
                    }
                    else if (typeof L.Control.Zoomslider === 'function' && this.zoomControl instanceof L.Control.Zoomslider) {
                        L.DomUtil.removeClass(this.zoomControl._ui.zoomOut, 'leaflet-bar-part-bottom');
                    }
                }
            },

            _hideIndicator: function() {
                // Hide loading indicator
                L.DomUtil.removeClass(this._indicator, 'is-loading');

                // If zoomControl exists, make the zoom-out button last
                if (!this.options.separate) {
                    if (this.zoomControl instanceof L.Control.Zoom) {
                        L.DomUtil.addClass(this._getLastControlButton(), 'leaflet-bar-part-bottom');
                    }
                    else if (typeof L.Control.Zoomslider === 'function' && this.zoomControl instanceof L.Control.Zoomslider) {
                        L.DomUtil.addClass(this.zoomControl._ui.zoomOut, 'leaflet-bar-part-bottom');
                    }
                }
            },

            _getLastControlButton: function() {
                var container = this.zoomControl._container,
                    index = container.children.length - 1;

                // Find the last visible control button that is not our loading
                // indicator
                while (index > 0) {
                    var button = container.children[index];
                    if (!(this._indicator === button || button.offsetWidth === 0 || button.offsetHeight === 0)) {
                        break;
                    }
                    index--;
                }

                return container.children[index];
            },

            _handleLoading: function(e) {
                this.addLoader(this.getEventId(e));
            },

            _handleLoad: function(e) {
                this.removeLoader(this.getEventId(e));
            },

            getEventId: function(e) {
                if (e.id) {
                    return e.id;
                }
                else if (e.layer) {
                    return e.layer._leaflet_id;
                }
                return e.target._leaflet_id;
            },

            _layerAdd: function(e) {
                if (!e.layer || !e.layer.on) return
                try {
                    e.layer.on({
                        loading: this._handleLoading,
                        load: this._handleLoad
                    }, this);
                }
                catch (exception) {
                    console.warn('L.Control.Loading: Tried and failed to add ' +
                                 ' event handlers to layer', e.layer);
                    console.warn('L.Control.Loading: Full details', exception);
                }
            },

            _addLayerListeners: function(map) {
                // Add listeners for begin and end of load to any layers already on the 
                // map
                map.eachLayer(function(layer) {
                    if (!layer.on) return;
                    layer.on({
                        loading: this._handleLoading,
                        load: this._handleLoad
                    }, this);
                }, this);

                // When a layer is added to the map, add listeners for begin and end
                // of load
                map.on('layeradd', this._layerAdd, this);
            },

            _removeLayerListeners: function(map) {
                // Remove listeners for begin and end of load from all layers
                map.eachLayer(function(layer) {
                    if (!layer.off) return;
                    layer.off({
                        loading: this._handleLoading,
                        load: this._handleLoad
                    }, this);
                }, this);

                // Remove layeradd listener from map
                map.off('layeradd', this._layerAdd, this);
            },

            _addMapListeners: function(map) {
                // Add listeners to the map for (custom) dataloading and dataload
                // events, eg, for AJAX calls that affect the map but will not be
                // reflected in the above layer events.
                map.on({
                    dataloading: this._handleLoading,
                    dataload: this._handleLoad,
                    layerremove: this._handleLoad
                }, this);
            },

            _removeMapListeners: function(map) {
                map.off({
                    dataloading: this._handleLoading,
                    dataload: this._handleLoad,
                    layerremove: this._handleLoad
                }, this);
            }
        });

        L.Map.addInitHook(function () {
            if (this.options.loadingControl) {
                this.loadingControl = new L.Control.Loading();
                this.addControl(this.loadingControl);
            }
        });

        L.Control.loading = function(options) {
            return new L.Control.Loading(options);
        };
    }

    if (typeof define === 'function' && define.amd) {
        // Try to add leaflet.loading to Leaflet using AMD
        define(['leaflet'], function (L) {
            defineLeafletLoading(L);
        });
    }
    else {
        // Else use the global L
        defineLeafletLoading(L);
    }

})();

/*
 Leaflet.markercluster, Provides Beautiful Animated Marker Clustering functionality for Leaflet, a JS library for interactive maps.
 https://github.com/Leaflet/Leaflet.markercluster
 (c) 2012-2013, Dave Leaver, smartrak
*/
!function(e,t,i){L.MarkerClusterGroup=L.FeatureGroup.extend({options:{maxClusterRadius:80,iconCreateFunction:null,spiderfyOnMaxZoom:!0,showCoverageOnHover:!0,zoomToBoundsOnClick:!0,singleMarkerMode:!1,disableClusteringAtZoom:null,removeOutsideVisibleBounds:!0,animate:!0,animateAddingMarkers:!1,spiderfyDistanceMultiplier:1,spiderLegPolylineOptions:{weight:1.5,color:"#222",opacity:.5},chunkedLoading:!1,chunkInterval:200,chunkDelay:50,chunkProgress:null,polygonOptions:{}},initialize:function(e){L.Util.setOptions(this,e),this.options.iconCreateFunction||(this.options.iconCreateFunction=this._defaultIconCreateFunction),this._featureGroup=L.featureGroup(),this._featureGroup.addEventParent(this),this._nonPointGroup=L.featureGroup(),this._nonPointGroup.addEventParent(this),this._inZoomAnimation=0,this._needsClustering=[],this._needsRemoving=[],this._currentShownBounds=null,this._queue=[],this._childMarkerEventHandlers={dragstart:this._childMarkerDragStart,move:this._childMarkerMoved,dragend:this._childMarkerDragEnd};var t=L.DomUtil.TRANSITION&&this.options.animate;L.extend(this,t?this._withAnimation:this._noAnimation),this._markerCluster=t?L.MarkerCluster:L.MarkerClusterNonAnimated},addLayer:function(e){if(e instanceof L.LayerGroup)return this.addLayers([e]);if(!e.getLatLng)return this._nonPointGroup.addLayer(e),this.fire("layeradd",{layer:e}),this;if(!this._map)return this._needsClustering.push(e),this.fire("layeradd",{layer:e}),this;if(this.hasLayer(e))return this;this._unspiderfy&&this._unspiderfy(),this._addLayer(e,this._maxZoom),this.fire("layeradd",{layer:e}),this._topClusterLevel._recalculateBounds(),this._refreshClustersIcons();var t=e,i=this._zoom;if(e.__parent)for(;t.__parent._zoom>=i;)t=t.__parent;return this._currentShownBounds.contains(t.getLatLng())&&(this.options.animateAddingMarkers?this._animationAddLayer(e,t):this._animationAddLayerNonAnimated(e,t)),this},removeLayer:function(e){return e instanceof L.LayerGroup?this.removeLayers([e]):e.getLatLng?this._map?e.__parent?(this._unspiderfy&&(this._unspiderfy(),this._unspiderfyLayer(e)),this._removeLayer(e,!0),this.fire("layerremove",{layer:e}),this._topClusterLevel._recalculateBounds(),this._refreshClustersIcons(),e.off(this._childMarkerEventHandlers,this),this._featureGroup.hasLayer(e)&&(this._featureGroup.removeLayer(e),e.clusterShow&&e.clusterShow()),this):this:(!this._arraySplice(this._needsClustering,e)&&this.hasLayer(e)&&this._needsRemoving.push({layer:e,latlng:e._latlng}),this.fire("layerremove",{layer:e}),this):(this._nonPointGroup.removeLayer(e),this.fire("layerremove",{layer:e}),this)},addLayers:function(e,t){if(!L.Util.isArray(e))return this.addLayer(e);var i,n=this._featureGroup,r=this._nonPointGroup,s=this.options.chunkedLoading,o=this.options.chunkInterval,a=this.options.chunkProgress,h=e.length,l=0,_=!0;if(this._map){var u=(new Date).getTime(),d=L.bind(function(){for(var c=(new Date).getTime();h>l;l++){if(s&&0===l%200){var p=(new Date).getTime()-c;if(p>o)break}if(i=e[l],i instanceof L.LayerGroup)_&&(e=e.slice(),_=!1),this._extractNonGroupLayers(i,e),h=e.length;else if(i.getLatLng){if(!this.hasLayer(i)&&(this._addLayer(i,this._maxZoom),t||this.fire("layeradd",{layer:i}),i.__parent&&2===i.__parent.getChildCount())){var f=i.__parent.getAllChildMarkers(),m=f[0]===i?f[1]:f[0];n.removeLayer(m)}}else r.addLayer(i),t||this.fire("layeradd",{layer:i})}a&&a(l,h,(new Date).getTime()-u),l===h?(this._topClusterLevel._recalculateBounds(),this._refreshClustersIcons(),this._topClusterLevel._recursivelyAddChildrenToMap(null,this._zoom,this._currentShownBounds)):setTimeout(d,this.options.chunkDelay)},this);d()}else for(var c=this._needsClustering;h>l;l++)i=e[l],i instanceof L.LayerGroup?(_&&(e=e.slice(),_=!1),this._extractNonGroupLayers(i,e),h=e.length):i.getLatLng?this.hasLayer(i)||c.push(i):r.addLayer(i);return this},removeLayers:function(e){var t,i,n=e.length,r=this._featureGroup,s=this._nonPointGroup,o=!0;if(!this._map){for(t=0;n>t;t++)i=e[t],i instanceof L.LayerGroup?(o&&(e=e.slice(),o=!1),this._extractNonGroupLayers(i,e),n=e.length):(this._arraySplice(this._needsClustering,i),s.removeLayer(i),this.hasLayer(i)&&this._needsRemoving.push({layer:i,latlng:i._latlng}),this.fire("layerremove",{layer:i}));return this}if(this._unspiderfy){this._unspiderfy();var a=e.slice(),h=n;for(t=0;h>t;t++)i=a[t],i instanceof L.LayerGroup?(this._extractNonGroupLayers(i,a),h=a.length):this._unspiderfyLayer(i)}for(t=0;n>t;t++)i=e[t],i instanceof L.LayerGroup?(o&&(e=e.slice(),o=!1),this._extractNonGroupLayers(i,e),n=e.length):i.__parent?(this._removeLayer(i,!0,!0),this.fire("layerremove",{layer:i}),r.hasLayer(i)&&(r.removeLayer(i),i.clusterShow&&i.clusterShow())):(s.removeLayer(i),this.fire("layerremove",{layer:i}));return this._topClusterLevel._recalculateBounds(),this._refreshClustersIcons(),this._topClusterLevel._recursivelyAddChildrenToMap(null,this._zoom,this._currentShownBounds),this},clearLayers:function(){return this._map||(this._needsClustering=[],delete this._gridClusters,delete this._gridUnclustered),this._noanimationUnspiderfy&&this._noanimationUnspiderfy(),this._featureGroup.clearLayers(),this._nonPointGroup.clearLayers(),this.eachLayer(function(e){e.off(this._childMarkerEventHandlers,this),delete e.__parent},this),this._map&&this._generateInitialClusters(),this},getBounds:function(){var e=new L.LatLngBounds;this._topClusterLevel&&e.extend(this._topClusterLevel._bounds);for(var t=this._needsClustering.length-1;t>=0;t--)e.extend(this._needsClustering[t].getLatLng());return e.extend(this._nonPointGroup.getBounds()),e},eachLayer:function(e,t){var i,n,r,s=this._needsClustering.slice(),o=this._needsRemoving;for(this._topClusterLevel&&this._topClusterLevel.getAllChildMarkers(s),n=s.length-1;n>=0;n--){for(i=!0,r=o.length-1;r>=0;r--)if(o[r].layer===s[n]){i=!1;break}i&&e.call(t,s[n])}this._nonPointGroup.eachLayer(e,t)},getLayers:function(){var e=[];return this.eachLayer(function(t){e.push(t)}),e},getLayer:function(e){var t=null;return e=parseInt(e,10),this.eachLayer(function(i){L.stamp(i)===e&&(t=i)}),t},hasLayer:function(e){if(!e)return!1;var t,i=this._needsClustering;for(t=i.length-1;t>=0;t--)if(i[t]===e)return!0;for(i=this._needsRemoving,t=i.length-1;t>=0;t--)if(i[t].layer===e)return!1;return!(!e.__parent||e.__parent._group!==this)||this._nonPointGroup.hasLayer(e)},zoomToShowLayer:function(e,t){"function"!=typeof t&&(t=function(){});var i=function(){!e._icon&&!e.__parent._icon||this._inZoomAnimation||(this._map.off("moveend",i,this),this.off("animationend",i,this),e._icon?t():e.__parent._icon&&(this.once("spiderfied",t,this),e.__parent.spiderfy()))};e._icon&&this._map.getBounds().contains(e.getLatLng())?t():e.__parent._zoom<Math.round(this._map._zoom)?(this._map.on("moveend",i,this),this._map.panTo(e.getLatLng())):(this._map.on("moveend",i,this),this.on("animationend",i,this),e.__parent.zoomToBounds())},onAdd:function(e){this._map=e;var t,i,n;if(!isFinite(this._map.getMaxZoom()))throw"Map has no maxZoom specified";for(this._featureGroup.addTo(e),this._nonPointGroup.addTo(e),this._gridClusters||this._generateInitialClusters(),this._maxLat=e.options.crs.projection.MAX_LATITUDE,t=0,i=this._needsRemoving.length;i>t;t++)n=this._needsRemoving[t],n.newlatlng=n.layer._latlng,n.layer._latlng=n.latlng;for(t=0,i=this._needsRemoving.length;i>t;t++)n=this._needsRemoving[t],this._removeLayer(n.layer,!0),n.layer._latlng=n.newlatlng;this._needsRemoving=[],this._zoom=Math.round(this._map._zoom),this._currentShownBounds=this._getExpandedVisibleBounds(),this._map.on("zoomend",this._zoomEnd,this),this._map.on("moveend",this._moveEnd,this),this._spiderfierOnAdd&&this._spiderfierOnAdd(),this._bindEvents(),i=this._needsClustering,this._needsClustering=[],this.addLayers(i,!0)},onRemove:function(e){e.off("zoomend",this._zoomEnd,this),e.off("moveend",this._moveEnd,this),this._unbindEvents(),this._map._mapPane.className=this._map._mapPane.className.replace(" leaflet-cluster-anim",""),this._spiderfierOnRemove&&this._spiderfierOnRemove(),delete this._maxLat,this._hideCoverage(),this._featureGroup.remove(),this._nonPointGroup.remove(),this._featureGroup.clearLayers(),this._map=null},getVisibleParent:function(e){for(var t=e;t&&!t._icon;)t=t.__parent;return t||null},_arraySplice:function(e,t){for(var i=e.length-1;i>=0;i--)if(e[i]===t)return e.splice(i,1),!0},_removeFromGridUnclustered:function(e,t){for(var i=this._map,n=this._gridUnclustered,r=Math.floor(this._map.getMinZoom());t>=r&&n[t].removeObject(e,i.project(e.getLatLng(),t));t--);},_childMarkerDragStart:function(e){e.target.__dragStart=e.target._latlng},_childMarkerMoved:function(e){if(!this._ignoreMove&&!e.target.__dragStart){var t=e.target._popup&&e.target._popup.isOpen();this._moveChild(e.target,e.oldLatLng,e.latlng),t&&e.target.openPopup()}},_moveChild:function(e,t,i){e._latlng=t,this.removeLayer(e),e._latlng=i,this.addLayer(e)},_childMarkerDragEnd:function(e){e.target.__dragStart&&this._moveChild(e.target,e.target.__dragStart,e.target._latlng),delete e.target.__dragStart},_removeLayer:function(e,t,i){var n=this._gridClusters,r=this._gridUnclustered,s=this._featureGroup,o=this._map,a=Math.floor(this._map.getMinZoom());t&&this._removeFromGridUnclustered(e,this._maxZoom);var h,l=e.__parent,_=l._markers;for(this._arraySplice(_,e);l&&(l._childCount--,l._boundsNeedUpdate=!0,!(l._zoom<a));)t&&l._childCount<=1?(h=l._markers[0]===e?l._markers[1]:l._markers[0],n[l._zoom].removeObject(l,o.project(l._cLatLng,l._zoom)),r[l._zoom].addObject(h,o.project(h.getLatLng(),l._zoom)),this._arraySplice(l.__parent._childClusters,l),l.__parent._markers.push(h),h.__parent=l.__parent,l._icon&&(s.removeLayer(l),i||s.addLayer(h))):l._iconNeedsUpdate=!0,l=l.__parent;delete e.__parent},_isOrIsParent:function(e,t){for(;t;){if(e===t)return!0;t=t.parentNode}return!1},fire:function(e,t,i){if(t&&t.layer instanceof L.MarkerCluster){if(t.originalEvent&&this._isOrIsParent(t.layer._icon,t.originalEvent.relatedTarget))return;e="cluster"+e}L.FeatureGroup.prototype.fire.call(this,e,t,i)},listens:function(e,t){return L.FeatureGroup.prototype.listens.call(this,e,t)||L.FeatureGroup.prototype.listens.call(this,"cluster"+e,t)},_defaultIconCreateFunction:function(e){var t=e.getChildCount(),i=" marker-cluster-";return i+=10>t?"small":100>t?"medium":"large",new L.DivIcon({html:"<div><span>"+t+"</span></div>",className:"marker-cluster"+i,iconSize:new L.Point(40,40)})},_bindEvents:function(){var e=this._map,t=this.options.spiderfyOnMaxZoom,i=this.options.showCoverageOnHover,n=this.options.zoomToBoundsOnClick;(t||n)&&this.on("clusterclick",this._zoomOrSpiderfy,this),i&&(this.on("clustermouseover",this._showCoverage,this),this.on("clustermouseout",this._hideCoverage,this),e.on("zoomend",this._hideCoverage,this))},_zoomOrSpiderfy:function(e){for(var t=e.layer,i=t;1===i._childClusters.length;)i=i._childClusters[0];i._zoom===this._maxZoom&&i._childCount===t._childCount&&this.options.spiderfyOnMaxZoom?t.spiderfy():this.options.zoomToBoundsOnClick&&t.zoomToBounds(),e.originalEvent&&13===e.originalEvent.keyCode&&this._map._container.focus()},_showCoverage:function(e){var t=this._map;this._inZoomAnimation||(this._shownPolygon&&t.removeLayer(this._shownPolygon),e.layer.getChildCount()>2&&e.layer!==this._spiderfied&&(this._shownPolygon=new L.Polygon(e.layer.getConvexHull(),this.options.polygonOptions),t.addLayer(this._shownPolygon)))},_hideCoverage:function(){this._shownPolygon&&(this._map.removeLayer(this._shownPolygon),this._shownPolygon=null)},_unbindEvents:function(){var e=this.options.spiderfyOnMaxZoom,t=this.options.showCoverageOnHover,i=this.options.zoomToBoundsOnClick,n=this._map;(e||i)&&this.off("clusterclick",this._zoomOrSpiderfy,this),t&&(this.off("clustermouseover",this._showCoverage,this),this.off("clustermouseout",this._hideCoverage,this),n.off("zoomend",this._hideCoverage,this))},_zoomEnd:function(){this._map&&(this._mergeSplitClusters(),this._zoom=Math.round(this._map._zoom),this._currentShownBounds=this._getExpandedVisibleBounds())},_moveEnd:function(){if(!this._inZoomAnimation){var e=this._getExpandedVisibleBounds();this._topClusterLevel._recursivelyRemoveChildrenFromMap(this._currentShownBounds,Math.floor(this._map.getMinZoom()),this._zoom,e),this._topClusterLevel._recursivelyAddChildrenToMap(null,Math.round(this._map._zoom),e),this._currentShownBounds=e}},_generateInitialClusters:function(){var e=Math.ceil(this._map.getMaxZoom()),t=Math.floor(this._map.getMinZoom()),i=this.options.maxClusterRadius,n=i;"function"!=typeof i&&(n=function(){return i}),null!==this.options.disableClusteringAtZoom&&(e=this.options.disableClusteringAtZoom-1),this._maxZoom=e,this._gridClusters={},this._gridUnclustered={};for(var r=e;r>=t;r--)this._gridClusters[r]=new L.DistanceGrid(n(r)),this._gridUnclustered[r]=new L.DistanceGrid(n(r));this._topClusterLevel=new this._markerCluster(this,t-1)},_addLayer:function(e,t){var i,n,r=this._gridClusters,s=this._gridUnclustered,o=Math.floor(this._map.getMinZoom());for(this.options.singleMarkerMode&&this._overrideMarkerIcon(e),e.on(this._childMarkerEventHandlers,this);t>=o;t--){i=this._map.project(e.getLatLng(),t);var a=r[t].getNearObject(i);if(a)return a._addChild(e),e.__parent=a,void 0;if(a=s[t].getNearObject(i)){var h=a.__parent;h&&this._removeLayer(a,!1);var l=new this._markerCluster(this,t,a,e);r[t].addObject(l,this._map.project(l._cLatLng,t)),a.__parent=l,e.__parent=l;var _=l;for(n=t-1;n>h._zoom;n--)_=new this._markerCluster(this,n,_),r[n].addObject(_,this._map.project(a.getLatLng(),n));return h._addChild(_),this._removeFromGridUnclustered(a,t),void 0}s[t].addObject(e,i)}this._topClusterLevel._addChild(e),e.__parent=this._topClusterLevel},_refreshClustersIcons:function(){this._featureGroup.eachLayer(function(e){e instanceof L.MarkerCluster&&e._iconNeedsUpdate&&e._updateIcon()})},_enqueue:function(e){this._queue.push(e),this._queueTimeout||(this._queueTimeout=setTimeout(L.bind(this._processQueue,this),300))},_processQueue:function(){for(var e=0;e<this._queue.length;e++)this._queue[e].call(this);this._queue.length=0,clearTimeout(this._queueTimeout),this._queueTimeout=null},_mergeSplitClusters:function(){var e=Math.round(this._map._zoom);this._processQueue(),this._zoom<e&&this._currentShownBounds.intersects(this._getExpandedVisibleBounds())?(this._animationStart(),this._topClusterLevel._recursivelyRemoveChildrenFromMap(this._currentShownBounds,Math.floor(this._map.getMinZoom()),this._zoom,this._getExpandedVisibleBounds()),this._animationZoomIn(this._zoom,e)):this._zoom>e?(this._animationStart(),this._animationZoomOut(this._zoom,e)):this._moveEnd()},_getExpandedVisibleBounds:function(){return this.options.removeOutsideVisibleBounds?L.Browser.mobile?this._checkBoundsMaxLat(this._map.getBounds()):this._checkBoundsMaxLat(this._map.getBounds().pad(1)):this._mapBoundsInfinite},_checkBoundsMaxLat:function(e){var t=this._maxLat;return t!==i&&(e.getNorth()>=t&&(e._northEast.lat=1/0),e.getSouth()<=-t&&(e._southWest.lat=-1/0)),e},_animationAddLayerNonAnimated:function(e,t){if(t===e)this._featureGroup.addLayer(e);else if(2===t._childCount){t._addToMap();var i=t.getAllChildMarkers();this._featureGroup.removeLayer(i[0]),this._featureGroup.removeLayer(i[1])}else t._updateIcon()},_extractNonGroupLayers:function(e,t){var i,n=e.getLayers(),r=0;for(t=t||[];r<n.length;r++)i=n[r],i instanceof L.LayerGroup?this._extractNonGroupLayers(i,t):t.push(i);return t},_overrideMarkerIcon:function(e){var t=e.options.icon=this.options.iconCreateFunction({getChildCount:function(){return 1},getAllChildMarkers:function(){return[e]}});return t}}),L.MarkerClusterGroup.include({_mapBoundsInfinite:new L.LatLngBounds(new L.LatLng(-1/0,-1/0),new L.LatLng(1/0,1/0))}),L.MarkerClusterGroup.include({_noAnimation:{_animationStart:function(){},_animationZoomIn:function(e,t){this._topClusterLevel._recursivelyRemoveChildrenFromMap(this._currentShownBounds,Math.floor(this._map.getMinZoom()),e),this._topClusterLevel._recursivelyAddChildrenToMap(null,t,this._getExpandedVisibleBounds()),this.fire("animationend")},_animationZoomOut:function(e,t){this._topClusterLevel._recursivelyRemoveChildrenFromMap(this._currentShownBounds,Math.floor(this._map.getMinZoom()),e),this._topClusterLevel._recursivelyAddChildrenToMap(null,t,this._getExpandedVisibleBounds()),this.fire("animationend")},_animationAddLayer:function(e,t){this._animationAddLayerNonAnimated(e,t)}},_withAnimation:{_animationStart:function(){this._map._mapPane.className+=" leaflet-cluster-anim",this._inZoomAnimation++},_animationZoomIn:function(e,t){var i,n=this._getExpandedVisibleBounds(),r=this._featureGroup,s=Math.floor(this._map.getMinZoom());this._ignoreMove=!0,this._topClusterLevel._recursively(n,e,s,function(s){var o,a=s._latlng,h=s._markers;for(n.contains(a)||(a=null),s._isSingleParent()&&e+1===t?(r.removeLayer(s),s._recursivelyAddChildrenToMap(null,t,n)):(s.clusterHide(),s._recursivelyAddChildrenToMap(a,t,n)),i=h.length-1;i>=0;i--)o=h[i],n.contains(o._latlng)||r.removeLayer(o)}),this._forceLayout(),this._topClusterLevel._recursivelyBecomeVisible(n,t),r.eachLayer(function(e){e instanceof L.MarkerCluster||!e._icon||e.clusterShow()}),this._topClusterLevel._recursively(n,e,t,function(e){e._recursivelyRestoreChildPositions(t)}),this._ignoreMove=!1,this._enqueue(function(){this._topClusterLevel._recursively(n,e,s,function(e){r.removeLayer(e),e.clusterShow()}),this._animationEnd()})},_animationZoomOut:function(e,t){this._animationZoomOutSingle(this._topClusterLevel,e-1,t),this._topClusterLevel._recursivelyAddChildrenToMap(null,t,this._getExpandedVisibleBounds()),this._topClusterLevel._recursivelyRemoveChildrenFromMap(this._currentShownBounds,Math.floor(this._map.getMinZoom()),e,this._getExpandedVisibleBounds())},_animationAddLayer:function(e,t){var i=this,n=this._featureGroup;n.addLayer(e),t!==e&&(t._childCount>2?(t._updateIcon(),this._forceLayout(),this._animationStart(),e._setPos(this._map.latLngToLayerPoint(t.getLatLng())),e.clusterHide(),this._enqueue(function(){n.removeLayer(e),e.clusterShow(),i._animationEnd()})):(this._forceLayout(),i._animationStart(),i._animationZoomOutSingle(t,this._map.getMaxZoom(),this._zoom)))}},_animationZoomOutSingle:function(e,t,i){var n=this._getExpandedVisibleBounds(),r=Math.floor(this._map.getMinZoom());e._recursivelyAnimateChildrenInAndAddSelfToMap(n,r,t+1,i);var s=this;this._forceLayout(),e._recursivelyBecomeVisible(n,i),this._enqueue(function(){if(1===e._childCount){var o=e._markers[0];this._ignoreMove=!0,o.setLatLng(o.getLatLng()),this._ignoreMove=!1,o.clusterShow&&o.clusterShow()}else e._recursively(n,i,r,function(e){e._recursivelyRemoveChildrenFromMap(n,r,t+1)});s._animationEnd()})},_animationEnd:function(){this._map&&(this._map._mapPane.className=this._map._mapPane.className.replace(" leaflet-cluster-anim","")),this._inZoomAnimation--,this.fire("animationend")},_forceLayout:function(){L.Util.falseFn(t.body.offsetWidth)}}),L.markerClusterGroup=function(e){return new L.MarkerClusterGroup(e)},L.MarkerCluster=L.Marker.extend({initialize:function(e,t,i,n){L.Marker.prototype.initialize.call(this,i?i._cLatLng||i.getLatLng():new L.LatLng(0,0),{icon:this}),this._group=e,this._zoom=t,this._markers=[],this._childClusters=[],this._childCount=0,this._iconNeedsUpdate=!0,this._boundsNeedUpdate=!0,this._bounds=new L.LatLngBounds,i&&this._addChild(i),n&&this._addChild(n)},getAllChildMarkers:function(e){e=e||[];for(var t=this._childClusters.length-1;t>=0;t--)this._childClusters[t].getAllChildMarkers(e);for(var i=this._markers.length-1;i>=0;i--)e.push(this._markers[i]);return e},getChildCount:function(){return this._childCount},zoomToBounds:function(e){for(var t,i=this._childClusters.slice(),n=this._group._map,r=n.getBoundsZoom(this._bounds),s=this._zoom+1,o=n.getZoom();i.length>0&&r>s;){s++;var a=[];for(t=0;t<i.length;t++)a=a.concat(i[t]._childClusters);i=a}r>s?this._group._map.setView(this._latlng,s):o>=r?this._group._map.setView(this._latlng,o+1):this._group._map.fitBounds(this._bounds,e)},getBounds:function(){var e=new L.LatLngBounds;return e.extend(this._bounds),e},_updateIcon:function(){this._iconNeedsUpdate=!0,this._icon&&this.setIcon(this)},createIcon:function(){return this._iconNeedsUpdate&&(this._iconObj=this._group.options.iconCreateFunction(this),this._iconNeedsUpdate=!1),this._iconObj.createIcon()},createShadow:function(){return this._iconObj.createShadow()},_addChild:function(e,t){this._iconNeedsUpdate=!0,this._boundsNeedUpdate=!0,this._setClusterCenter(e),e instanceof L.MarkerCluster?(t||(this._childClusters.push(e),e.__parent=this),this._childCount+=e._childCount):(t||this._markers.push(e),this._childCount++),this.__parent&&this.__parent._addChild(e,!0)},_setClusterCenter:function(e){this._cLatLng||(this._cLatLng=e._cLatLng||e._latlng)},_resetBounds:function(){var e=this._bounds;e._southWest&&(e._southWest.lat=1/0,e._southWest.lng=1/0),e._northEast&&(e._northEast.lat=-1/0,e._northEast.lng=-1/0)},_recalculateBounds:function(){var e,t,i,n,r=this._markers,s=this._childClusters,o=0,a=0,h=this._childCount;if(0!==h){for(this._resetBounds(),e=0;e<r.length;e++)i=r[e]._latlng,this._bounds.extend(i),o+=i.lat,a+=i.lng;for(e=0;e<s.length;e++)t=s[e],t._boundsNeedUpdate&&t._recalculateBounds(),this._bounds.extend(t._bounds),i=t._wLatLng,n=t._childCount,o+=i.lat*n,a+=i.lng*n;this._latlng=this._wLatLng=new L.LatLng(o/h,a/h),this._boundsNeedUpdate=!1}},_addToMap:function(e){e&&(this._backupLatlng=this._latlng,this.setLatLng(e)),this._group._featureGroup.addLayer(this)},_recursivelyAnimateChildrenIn:function(e,t,i){this._recursively(e,this._group._map.getMinZoom(),i-1,function(e){var i,n,r=e._markers;for(i=r.length-1;i>=0;i--)n=r[i],n._icon&&(n._setPos(t),n.clusterHide())},function(e){var i,n,r=e._childClusters;for(i=r.length-1;i>=0;i--)n=r[i],n._icon&&(n._setPos(t),n.clusterHide())})},_recursivelyAnimateChildrenInAndAddSelfToMap:function(e,t,i,n){this._recursively(e,n,t,function(r){r._recursivelyAnimateChildrenIn(e,r._group._map.latLngToLayerPoint(r.getLatLng()).round(),i),r._isSingleParent()&&i-1===n?(r.clusterShow(),r._recursivelyRemoveChildrenFromMap(e,t,i)):r.clusterHide(),r._addToMap()})},_recursivelyBecomeVisible:function(e,t){this._recursively(e,this._group._map.getMinZoom(),t,null,function(e){e.clusterShow()})},_recursivelyAddChildrenToMap:function(e,t,i){this._recursively(i,this._group._map.getMinZoom()-1,t,function(n){if(t!==n._zoom)for(var r=n._markers.length-1;r>=0;r--){var s=n._markers[r];i.contains(s._latlng)&&(e&&(s._backupLatlng=s.getLatLng(),s.setLatLng(e),s.clusterHide&&s.clusterHide()),n._group._featureGroup.addLayer(s))}},function(t){t._addToMap(e)})},_recursivelyRestoreChildPositions:function(e){for(var t=this._markers.length-1;t>=0;t--){var i=this._markers[t];i._backupLatlng&&(i.setLatLng(i._backupLatlng),delete i._backupLatlng)}if(e-1===this._zoom)for(var n=this._childClusters.length-1;n>=0;n--)this._childClusters[n]._restorePosition();else for(var r=this._childClusters.length-1;r>=0;r--)this._childClusters[r]._recursivelyRestoreChildPositions(e)},_restorePosition:function(){this._backupLatlng&&(this.setLatLng(this._backupLatlng),delete this._backupLatlng)},_recursivelyRemoveChildrenFromMap:function(e,t,i,n){var r,s;this._recursively(e,t-1,i-1,function(e){for(s=e._markers.length-1;s>=0;s--)r=e._markers[s],n&&n.contains(r._latlng)||(e._group._featureGroup.removeLayer(r),r.clusterShow&&r.clusterShow())},function(e){for(s=e._childClusters.length-1;s>=0;s--)r=e._childClusters[s],n&&n.contains(r._latlng)||(e._group._featureGroup.removeLayer(r),r.clusterShow&&r.clusterShow())})},_recursively:function(e,t,i,n,r){var s,o,a=this._childClusters,h=this._zoom;if(h>=t&&(n&&n(this),r&&h===i&&r(this)),t>h||i>h)for(s=a.length-1;s>=0;s--)o=a[s],e.intersects(o._bounds)&&o._recursively(e,t,i,n,r)},_isSingleParent:function(){return this._childClusters.length>0&&this._childClusters[0]._childCount===this._childCount}}),L.Marker.include({clusterHide:function(){return this.options.opacityWhenUnclustered=this.options.opacity||1,this.setOpacity(0)},clusterShow:function(){var e=this.setOpacity(this.options.opacity||this.options.opacityWhenUnclustered);return delete this.options.opacityWhenUnclustered,e}}),L.DistanceGrid=function(e){this._cellSize=e,this._sqCellSize=e*e,this._grid={},this._objectPoint={}},L.DistanceGrid.prototype={addObject:function(e,t){var i=this._getCoord(t.x),n=this._getCoord(t.y),r=this._grid,s=r[n]=r[n]||{},o=s[i]=s[i]||[],a=L.Util.stamp(e);this._objectPoint[a]=t,o.push(e)},updateObject:function(e,t){this.removeObject(e),this.addObject(e,t)},removeObject:function(e,t){var i,n,r=this._getCoord(t.x),s=this._getCoord(t.y),o=this._grid,a=o[s]=o[s]||{},h=a[r]=a[r]||[];for(delete this._objectPoint[L.Util.stamp(e)],i=0,n=h.length;n>i;i++)if(h[i]===e)return h.splice(i,1),1===n&&delete a[r],!0},eachObject:function(e,t){var i,n,r,s,o,a,h,l=this._grid;for(i in l){o=l[i];for(n in o)for(a=o[n],r=0,s=a.length;s>r;r++)h=e.call(t,a[r]),h&&(r--,s--)}},getNearObject:function(e){var t,i,n,r,s,o,a,h,l=this._getCoord(e.x),_=this._getCoord(e.y),u=this._objectPoint,d=this._sqCellSize,c=null;for(t=_-1;_+1>=t;t++)if(r=this._grid[t])for(i=l-1;l+1>=i;i++)if(s=r[i])for(n=0,o=s.length;o>n;n++)a=s[n],h=this._sqDist(u[L.Util.stamp(a)],e),d>h&&(d=h,c=a);return c},_getCoord:function(e){return Math.floor(e/this._cellSize)},_sqDist:function(e,t){var i=t.x-e.x,n=t.y-e.y;return i*i+n*n}},function(){L.QuickHull={getDistant:function(e,t){var i=t[1].lat-t[0].lat,n=t[0].lng-t[1].lng;return n*(e.lat-t[0].lat)+i*(e.lng-t[0].lng)},findMostDistantPointFromBaseLine:function(e,t){var i,n,r,s=0,o=null,a=[];for(i=t.length-1;i>=0;i--)n=t[i],r=this.getDistant(n,e),r>0&&(a.push(n),r>s&&(s=r,o=n));return{maxPoint:o,newPoints:a}},buildConvexHull:function(e,t){var i=[],n=this.findMostDistantPointFromBaseLine(e,t);return n.maxPoint?(i=i.concat(this.buildConvexHull([e[0],n.maxPoint],n.newPoints)),i=i.concat(this.buildConvexHull([n.maxPoint,e[1]],n.newPoints))):[e[0]]},getConvexHull:function(e){var t,i=!1,n=!1,r=!1,s=!1,o=null,a=null,h=null,l=null,_=null,u=null;for(t=e.length-1;t>=0;t--){var d=e[t];(i===!1||d.lat>i)&&(o=d,i=d.lat),(n===!1||d.lat<n)&&(a=d,n=d.lat),(r===!1||d.lng>r)&&(h=d,r=d.lng),(s===!1||d.lng<s)&&(l=d,s=d.lng)}n!==i?(u=a,_=o):(u=l,_=h);var c=[].concat(this.buildConvexHull([u,_],e),this.buildConvexHull([_,u],e));return c}}}(),L.MarkerCluster.include({getConvexHull:function(){var e,t,i=this.getAllChildMarkers(),n=[];for(t=i.length-1;t>=0;t--)e=i[t].getLatLng(),n.push(e);return L.QuickHull.getConvexHull(n)}}),L.MarkerCluster.include({_2PI:2*Math.PI,_circleFootSeparation:25,_circleStartAngle:Math.PI/6,_spiralFootSeparation:28,_spiralLengthStart:11,_spiralLengthFactor:5,_circleSpiralSwitchover:9,spiderfy:function(){if(this._group._spiderfied!==this&&!this._group._inZoomAnimation){var e,t=this.getAllChildMarkers(),i=this._group,n=i._map,r=n.latLngToLayerPoint(this._latlng);this._group._unspiderfy(),this._group._spiderfied=this,t.length>=this._circleSpiralSwitchover?e=this._generatePointsSpiral(t.length,r):(r.y+=10,e=this._generatePointsCircle(t.length,r)),this._animationSpiderfy(t,e)}},unspiderfy:function(e){this._group._inZoomAnimation||(this._animationUnspiderfy(e),this._group._spiderfied=null)},_generatePointsCircle:function(e,t){var i,n,r=this._group.options.spiderfyDistanceMultiplier*this._circleFootSeparation*(2+e),s=r/this._2PI,o=this._2PI/e,a=[];for(a.length=e,i=e-1;i>=0;i--)n=this._circleStartAngle+i*o,a[i]=new L.Point(t.x+s*Math.cos(n),t.y+s*Math.sin(n))._round();return a},_generatePointsSpiral:function(e,t){var i,n=this._group.options.spiderfyDistanceMultiplier,r=n*this._spiralLengthStart,s=n*this._spiralFootSeparation,o=n*this._spiralLengthFactor*this._2PI,a=0,h=[];for(h.length=e,i=e-1;i>=0;i--)a+=s/r+5e-4*i,h[i]=new L.Point(t.x+r*Math.cos(a),t.y+r*Math.sin(a))._round(),r+=o/a;return h},_noanimationUnspiderfy:function(){var e,t,i=this._group,n=i._map,r=i._featureGroup,s=this.getAllChildMarkers();for(i._ignoreMove=!0,this.setOpacity(1),t=s.length-1;t>=0;t--)e=s[t],r.removeLayer(e),e._preSpiderfyLatlng&&(e.setLatLng(e._preSpiderfyLatlng),delete e._preSpiderfyLatlng),e.setZIndexOffset&&e.setZIndexOffset(0),e._spiderLeg&&(n.removeLayer(e._spiderLeg),delete e._spiderLeg);i.fire("unspiderfied",{cluster:this,markers:s}),i._ignoreMove=!1,i._spiderfied=null}}),L.MarkerClusterNonAnimated=L.MarkerCluster.extend({_animationSpiderfy:function(e,t){var i,n,r,s,o=this._group,a=o._map,h=o._featureGroup,l=this._group.options.spiderLegPolylineOptions;for(o._ignoreMove=!0,i=0;i<e.length;i++)s=a.layerPointToLatLng(t[i]),n=e[i],r=new L.Polyline([this._latlng,s],l),a.addLayer(r),n._spiderLeg=r,n._preSpiderfyLatlng=n._latlng,n.setLatLng(s),n.setZIndexOffset&&n.setZIndexOffset(1e6),h.addLayer(n);this.setOpacity(.3),o._ignoreMove=!1,o.fire("spiderfied",{cluster:this,markers:e})},_animationUnspiderfy:function(){this._noanimationUnspiderfy()}}),L.MarkerCluster.include({_animationSpiderfy:function(e,t){var n,r,s,o,a,h,l=this,_=this._group,u=_._map,d=_._featureGroup,c=this._latlng,p=u.latLngToLayerPoint(c),f=L.Path.SVG,m=L.extend({},this._group.options.spiderLegPolylineOptions),g=m.opacity;for(g===i&&(g=L.MarkerClusterGroup.prototype.options.spiderLegPolylineOptions.opacity),f?(m.opacity=0,m.className=(m.className||"")+" leaflet-cluster-spider-leg"):m.opacity=g,_._ignoreMove=!0,n=0;n<e.length;n++)r=e[n],h=u.layerPointToLatLng(t[n]),s=new L.Polyline([c,h],m),u.addLayer(s),r._spiderLeg=s,f&&(o=s._path,a=o.getTotalLength()+.1,o.style.strokeDasharray=a,o.style.strokeDashoffset=a),r.setZIndexOffset&&r.setZIndexOffset(1e6),r.clusterHide&&r.clusterHide(),d.addLayer(r),r._setPos&&r._setPos(p);for(_._forceLayout(),_._animationStart(),n=e.length-1;n>=0;n--)h=u.layerPointToLatLng(t[n]),r=e[n],r._preSpiderfyLatlng=r._latlng,r.setLatLng(h),r.clusterShow&&r.clusterShow(),f&&(s=r._spiderLeg,o=s._path,o.style.strokeDashoffset=0,s.setStyle({opacity:g}));this.setOpacity(.3),_._ignoreMove=!1,setTimeout(function(){_._animationEnd(),_.fire("spiderfied",{cluster:l,markers:e})},200)},_animationUnspiderfy:function(e){var t,i,n,r,s,o,a=this,h=this._group,l=h._map,_=h._featureGroup,u=e?l._latLngToNewLayerPoint(this._latlng,e.zoom,e.center):l.latLngToLayerPoint(this._latlng),d=this.getAllChildMarkers(),c=L.Path.SVG;for(h._ignoreMove=!0,h._animationStart(),this.setOpacity(1),i=d.length-1;i>=0;i--)t=d[i],t._preSpiderfyLatlng&&(t.closePopup(),t.setLatLng(t._preSpiderfyLatlng),delete t._preSpiderfyLatlng,o=!0,t._setPos&&(t._setPos(u),o=!1),t.clusterHide&&(t.clusterHide(),o=!1),o&&_.removeLayer(t),c&&(n=t._spiderLeg,r=n._path,s=r.getTotalLength()+.1,r.style.strokeDashoffset=s,n.setStyle({opacity:0})));h._ignoreMove=!1,setTimeout(function(){var e=0;for(i=d.length-1;i>=0;i--)t=d[i],t._spiderLeg&&e++;for(i=d.length-1;i>=0;i--)t=d[i],t._spiderLeg&&(t.clusterShow&&t.clusterShow(),t.setZIndexOffset&&t.setZIndexOffset(0),e>1&&_.removeLayer(t),l.removeLayer(t._spiderLeg),delete t._spiderLeg);h._animationEnd(),h.fire("unspiderfied",{cluster:a,markers:d})},200)}}),L.MarkerClusterGroup.include({_spiderfied:null,unspiderfy:function(){this._unspiderfy.apply(this,arguments)},_spiderfierOnAdd:function(){this._map.on("click",this._unspiderfyWrapper,this),this._map.options.zoomAnimation&&this._map.on("zoomstart",this._unspiderfyZoomStart,this),this._map.on("zoomend",this._noanimationUnspiderfy,this),L.Browser.touch||this._map.getRenderer(this)},_spiderfierOnRemove:function(){this._map.off("click",this._unspiderfyWrapper,this),this._map.off("zoomstart",this._unspiderfyZoomStart,this),this._map.off("zoomanim",this._unspiderfyZoomAnim,this),this._map.off("zoomend",this._noanimationUnspiderfy,this),this._noanimationUnspiderfy()},_unspiderfyZoomStart:function(){this._map&&this._map.on("zoomanim",this._unspiderfyZoomAnim,this)},_unspiderfyZoomAnim:function(e){L.DomUtil.hasClass(this._map._mapPane,"leaflet-touching")||(this._map.off("zoomanim",this._unspiderfyZoomAnim,this),this._unspiderfy(e))},_unspiderfyWrapper:function(){this._unspiderfy()},_unspiderfy:function(e){this._spiderfied&&this._spiderfied.unspiderfy(e)
},_noanimationUnspiderfy:function(){this._spiderfied&&this._spiderfied._noanimationUnspiderfy()},_unspiderfyLayer:function(e){e._spiderLeg&&(this._featureGroup.removeLayer(e),e.clusterShow&&e.clusterShow(),e.setZIndexOffset&&e.setZIndexOffset(0),this._map.removeLayer(e._spiderLeg),delete e._spiderLeg)}}),L.MarkerClusterGroup.include({refreshClusters:function(e){return e?e instanceof L.MarkerClusterGroup?e=e._topClusterLevel.getAllChildMarkers():e instanceof L.LayerGroup?e=e._layers:e instanceof L.MarkerCluster?e=e.getAllChildMarkers():e instanceof L.Marker&&(e=[e]):e=this._topClusterLevel.getAllChildMarkers(),this._flagParentsIconsNeedUpdate(e),this._refreshClustersIcons(),this.options.singleMarkerMode&&this._refreshSingleMarkerModeMarkers(e),this},_flagParentsIconsNeedUpdate:function(e){var t,i;for(t in e)for(i=e[t].__parent;i;)i._iconNeedsUpdate=!0,i=i.__parent},_refreshSingleMarkerModeMarkers:function(e){var t,i;for(t in e)i=e[t],this.hasLayer(i)&&i.setIcon(this._overrideMarkerIcon(i))}}),L.Marker.include({refreshIconOptions:function(e,t){var i=this.options.icon;return L.setOptions(i,e),this.setIcon(i),t&&this.__parent&&this.__parent._group.refreshClusters(this),this}})}(window,document);(function(){/*
 OverlappingMarkerSpiderfier
https://github.com/jawj/OverlappingMarkerSpiderfier-Leaflet
Copyright (c) 2011 - 2012 George MacKerron
Released under the MIT licence: http://opensource.org/licenses/mit-license
Note: The Leaflet maps API must be included *before* this code
*/
(function(){var q={}.hasOwnProperty,r=[].slice;null!=this.L&&(this.OverlappingMarkerSpiderfier=function(){function n(c,b){var a,e,g,f,d=this;this.map=c;null==b&&(b={});for(a in b)q.call(b,a)&&(e=b[a],this[a]=e);this.initMarkerArrays();this.listeners={};f=["click","zoomend"];e=0;for(g=f.length;e<g;e++)a=f[e],this.map.addEventListener(a,function(){return d.unspiderfy()})}var d,k;d=n.prototype;d.VERSION="0.2.6";k=2*Math.PI;d.keepSpiderfied=!1;d.nearbyDistance=20;d.circleSpiralSwitchover=9;d.circleFootSeparation=
25;d.circleStartAngle=k/12;d.spiralFootSeparation=28;d.spiralLengthStart=11;d.spiralLengthFactor=5;d.legWeight=1.5;d.legColors={usual:"#222",highlighted:"#f00"};d.initMarkerArrays=function(){this.markers=[];return this.markerListeners=[]};d.addMarker=function(c){var b,a=this;if(null!=c._oms)return this;c._oms=!0;b=function(){return a.spiderListener(c)};c.addEventListener("click",b);this.markerListeners.push(b);this.markers.push(c);return this};d.getMarkers=function(){return this.markers.slice(0)};
d.removeMarker=function(c){var b,a;null!=c._omsData&&this.unspiderfy();b=this.arrIndexOf(this.markers,c);if(0>b)return this;a=this.markerListeners.splice(b,1)[0];c.removeEventListener("click",a);delete c._oms;this.markers.splice(b,1);return this};d.clearMarkers=function(){var c,b,a,e,g;this.unspiderfy();g=this.markers;c=a=0;for(e=g.length;a<e;c=++a)b=g[c],c=this.markerListeners[c],b.removeEventListener("click",c),delete b._oms;this.initMarkerArrays();return this};d.addListener=function(c,b){var a,
e;(null!=(e=(a=this.listeners)[c])?e:a[c]=[]).push(b);return this};d.removeListener=function(c,b){var a;a=this.arrIndexOf(this.listeners[c],b);0>a||this.listeners[c].splice(a,1);return this};d.clearListeners=function(c){this.listeners[c]=[];return this};d.trigger=function(){var c,b,a,e,g,f;b=arguments[0];c=2<=arguments.length?r.call(arguments,1):[];b=null!=(a=this.listeners[b])?a:[];f=[];e=0;for(g=b.length;e<g;e++)a=b[e],f.push(a.apply(null,c));return f};d.generatePtsCircle=function(c,b){var a,e,
g,f,d;g=this.circleFootSeparation*(2+c)/k;e=k/c;d=[];for(a=f=0;0<=c?f<c:f>c;a=0<=c?++f:--f)a=this.circleStartAngle+a*e,d.push(new L.Point(b.x+g*Math.cos(a),b.y+g*Math.sin(a)));return d};d.generatePtsSpiral=function(c,b){var a,e,g,f,d;g=this.spiralLengthStart;a=0;d=[];for(e=f=0;0<=c?f<c:f>c;e=0<=c?++f:--f)a+=this.spiralFootSeparation/g+5E-4*e,e=new L.Point(b.x+g*Math.cos(a),b.y+g*Math.sin(a)),g+=k*this.spiralLengthFactor/a,d.push(e);return d};d.spiderListener=function(c){var b,a,e,g,f,d,h,k,l;(b=null!=
c._omsData)&&this.keepSpiderfied||this.unspiderfy();if(b)return this.trigger("click",c);g=[];f=[];d=this.nearbyDistance*this.nearbyDistance;e=this.map.latLngToLayerPoint(c.getLatLng());l=this.markers;h=0;for(k=l.length;h<k;h++)b=l[h],this.map.hasLayer(b)&&(a=this.map.latLngToLayerPoint(b.getLatLng()),this.ptDistanceSq(a,e)<d?g.push({marker:b,markerPt:a}):f.push(b));return 1===g.length?this.trigger("click",c):this.spiderfy(g,f)};d.makeHighlightListeners=function(c){var b=this;return{highlight:function(){return c._omsData.leg.setStyle({color:b.legColors.highlighted})},
unhighlight:function(){return c._omsData.leg.setStyle({color:b.legColors.usual})}}};d.spiderfy=function(c,b){var a,e,g,d,p,h,k,l,n,m;this.spiderfying=!0;m=c.length;a=this.ptAverage(function(){var a,b,e;e=[];a=0;for(b=c.length;a<b;a++)k=c[a],e.push(k.markerPt);return e}());d=m>=this.circleSpiralSwitchover?this.generatePtsSpiral(m,a).reverse():this.generatePtsCircle(m,a);a=function(){var a,b,k,m=this;k=[];a=0;for(b=d.length;a<b;a++)g=d[a],e=this.map.layerPointToLatLng(g),n=this.minExtract(c,function(a){return m.ptDistanceSq(a.markerPt,
g)}),h=n.marker,p=new L.Polyline([h.getLatLng(),e],{color:this.legColors.usual,weight:this.legWeight,clickable:!1}),this.map.addLayer(p),h._omsData={usualPosition:h.getLatLng(),leg:p},this.legColors.highlighted!==this.legColors.usual&&(l=this.makeHighlightListeners(h),h._omsData.highlightListeners=l,h.addEventListener("mouseover",l.highlight),h.addEventListener("mouseout",l.unhighlight)),h.setLatLng(e),h.setZIndexOffset(1E6),k.push(h);return k}.call(this);delete this.spiderfying;this.spiderfied=!0;
return this.trigger("spiderfy",a,b)};d.unspiderfy=function(c){var b,a,e,d,f,k,h;null==c&&(c=null);if(null==this.spiderfied)return this;this.unspiderfying=!0;d=[];e=[];h=this.markers;f=0;for(k=h.length;f<k;f++)b=h[f],null!=b._omsData?(this.map.removeLayer(b._omsData.leg),b!==c&&b.setLatLng(b._omsData.usualPosition),b.setZIndexOffset(0),a=b._omsData.highlightListeners,null!=a&&(b.removeEventListener("mouseover",a.highlight),b.removeEventListener("mouseout",a.unhighlight)),delete b._omsData,d.push(b)):
e.push(b);delete this.unspiderfying;delete this.spiderfied;this.trigger("unspiderfy",d,e);return this};d.ptDistanceSq=function(c,b){var a,e;a=c.x-b.x;e=c.y-b.y;return a*a+e*e};d.ptAverage=function(c){var b,a,e,d,f;d=a=e=0;for(f=c.length;d<f;d++)b=c[d],a+=b.x,e+=b.y;c=c.length;return new L.Point(a/c,e/c)};d.minExtract=function(c,b){var a,d,g,f,k,h;g=k=0;for(h=c.length;k<h;g=++k)if(f=c[g],f=b(f),"undefined"===typeof a||null===a||f<d)d=f,a=g;return c.splice(a,1)[0]};d.arrIndexOf=function(c,b){var a,
d,g,f;if(null!=c.indexOf)return c.indexOf(b);a=g=0;for(f=c.length;g<f;a=++g)if(d=c[a],d===b)return a;return-1};return n}())}).call(this);}).call(this);
/* Mon 14 Oct 2013 10:54:59 BST */
/*! $.noUiSlider
 @version 5.0.0
 @author Leon Gersen https://twitter.com/LeonGersen
 @license WTFPL http://www.wtfpl.net/about/
 @documentation http://refreshless.com/nouislider/
*/

// ==ClosureCompiler==
// @externs_url http://refreshless.com/externs/jquery-1.8.js
// @compilation_level ADVANCED_OPTIMIZATIONS
// @warning_level VERBOSE
// ==/ClosureCompiler==

/*jshint laxcomma: true */
/*jshint smarttabs: true */
/*jshint sub: true */

/*jslint browser: true */
/*jslint continue: true */
/*jslint plusplus: true */
/*jslint white: true */
/*jslint sub: true */

(function( $ ){

  'use strict';

  if ( $['zepto'] && !$.fn.removeData ) {
    throw new ReferenceError('Zepto is loaded without the data module.');
  }

  $.fn['noUiSlider'] = function( options, rebuild ){

    var
    // Cache the document and body selectors;
     doc = $(document)
    ,body = $('body')

    // Namespace for binding and unbinding slider events;
    ,namespace = '.nui'

    // Copy of the current value function;
    ,$VAL = $.fn.val

    // Re-usable list of classes;
    ,clsList = [
    /*  0 */  'noUi-base'
    /*  1 */ ,'noUi-origin'
    /*  2 */ ,'noUi-handle'
    /*  3 */ ,'noUi-input'
    /*  4 */ ,'noUi-active'
    /*  5 */ ,'noUi-state-tap'
    /*  6 */ ,'noUi-target'
    /*  7 */ ,'-lower'
    /*  8 */ ,'-upper'
    /*  9 */ ,'noUi-connect'
    /* 10 */ ,'noUi-horizontal'
    /* 11 */ ,'noUi-vertical'
    /* 12 */ ,'noUi-background'
    /* 13 */ ,'noUi-stacking'
    /* 14 */ ,'noUi-block'
    /* 15 */ ,'noUi-state-blocked'
    /* 16 */ ,'noUi-ltr'
    /* 17 */ ,'noUi-rtl'
    /* 18 */ ,'noUi-dragable'
    /* 19 */ ,'noUi-extended'
    /* 20 */ ,'noUi-state-drag'
    ]

    // Determine the events to bind. IE11 implements pointerEvents without
    // a prefix, which breaks compatibility with the IE10 implementation.
    ,actions = window.navigator['pointerEnabled'] ? {
       start: 'pointerdown'
      ,move: 'pointermove'
      ,end: 'pointerup'
    } : window.navigator['msPointerEnabled'] ? {
       start: 'MSPointerDown'
      ,move: 'MSPointerMove'
      ,end: 'MSPointerUp'
    } : {
       start: 'mousedown touchstart'
      ,move: 'mousemove touchmove'
      ,end: 'mouseup touchend'
    };


// Percentage calculation

  // (percentage) How many percent is this value of this range?
    function fromPercentage ( range, value ) {
      return (value * 100) / ( range[1] - range[0] );
    }

  // (percentage) Where is this value on this range?
    function toPercentage ( range, value ) {
      return fromPercentage( range, range[0] < 0 ?
        value + Math.abs(range[0]) :
          value - range[0] );
    }

  // (value) How much is this percentage on this range?
    function isPercentage ( range, value ) {
      return ((value * ( range[1] - range[0] )) / 100) + range[0];
    }


// Type tests

  // Test in an object is an instance of jQuery or Zepto.
    function isInstance ( a ) {
      return a instanceof $ || ( $['zepto'] && $['zepto']['isZ'](a) );
    }

  // Checks whether a value is numerical.
    function isNumeric ( a ) {
      return !isNaN( parseFloat( a ) ) && isFinite( a );
    }


// General helper functions

  // Test an array of objects, and calls them if they are a function.
    function call ( functions, scope ) {

      // Allow the passing of an unwrapped function.
      // Leaves other code a more comprehensible.
      if( !$.isArray( functions ) ){
        functions = [ functions ];
      }

      $.each( functions, function(){
        if (typeof this === 'function') {
          this.call(scope);
        }
      });
    }

  // Returns a proxy to set a target using the public value method.
    function setN ( target, number ) {

      return function(){

        // Determine the correct position to set,
        // leave the other one unchanged.
        var val = [null, null];
        val[ number ] = $(this).val();

        // Trigger the 'set' callback
        target.val(val, true);
      };
    }

  // Round a value to the closest 'to'.
    function closest ( value, to ){
      return Math.round(value / to) * to;
    }

  // Format output value to specified standards.
    function format ( value, options ) {

      // Round the value to the resolution that was set
      // with the serialization options.
      value = value.toFixed( options['decimals'] );

      // Rounding away decimals might cause a value of -0
      // when using very small ranges. Remove those cases.
      if ( parseFloat(value) === 0 ) {
        value = value.replace('-0', '0');
      }

      // Apply the proper decimal mark to the value.
      return value.replace( '.', options['serialization']['mark'] );
    }

  // Determine the handle closest to an event.
    function closestHandle ( handles, location, style ) {

      if ( handles.length === 1 ) {
        return handles[0];
      }

      var total = handles[0].offset()[style] +
            handles[1].offset()[style];

      return handles[ location < total / 2 ? 0 : 1 ];
    }

  // Round away small numbers in floating point implementation.
    function digits ( value, round ) {
      return parseFloat(value.toFixed(round));
    }

// Event abstraction

  // Provide a clean event with standardized offset values.
    function fixEvent ( e ) {

      // Prevent scrolling and panning on touch events, while
      // attempting to slide. The tap event also depends on this.
      e.preventDefault();

      // Filter the event to register the type, which can be
      // touch, mouse or pointer. Offset changes need to be
      // made on an event specific basis.
      var  touch = e.type.indexOf('touch') === 0
        ,mouse = e.type.indexOf('mouse') === 0
        ,pointer = e.type.indexOf('pointer') === 0
        ,x,y, event = e;

      // IE10 implemented pointer events with a prefix;
      if ( e.type.indexOf('MSPointer') === 0 ) {
        pointer = true;
      }

      // Get the originalEvent, if the event has been wrapped
      // by jQuery. Zepto doesn't wrap the event.
      if ( e.originalEvent ) {
        e = e.originalEvent;
      }

      if ( touch ) {
        // noUiSlider supports one movement at a time,
        // so we can select the first 'changedTouch'.
        x = e.changedTouches[0].pageX;
        y = e.changedTouches[0].pageY;
      }
      if ( mouse || pointer ) {

        // Polyfill the pageXOffset and pageYOffset
        // variables for IE7 and IE8;
        if( !pointer && window.pageXOffset === undefined ){
          window.pageXOffset = document.documentElement.scrollLeft;
          window.pageYOffset = document.documentElement.scrollTop;
        }

        x = e.clientX + window.pageXOffset;
        y = e.clientY + window.pageYOffset;
      }

      return $.extend( event, {
         'pointX': x
        ,'pointY': y
        ,cursor: mouse
      });
    }

  // Handler for attaching events trough a proxy
    function attach ( events, element, callback, pass ) {

      var target = pass.target;

      // Add the noUiSlider namespace to all events.
      events = events.replace( /\s/g, namespace + ' ' ) + namespace;

      // Bind a closure on the target.
      return element.on( events, function( e ){

        // jQuery and Zepto handle unset attributes differently.
        var disabled = target.attr('disabled');
          disabled = !( disabled === undefined || disabled === null );

        // Test if there is anything that should prevent an event
        // from being handled, such as a disabled state or an active
        // 'tap' transition.
        if( target.hasClass('noUi-state-tap') || disabled ) {
          return false;
        }

        // Call the event handler with three arguments:
        // - The event;
        // - An object with data for the event;
        // - The slider options;
        // Having the slider options as a function parameter prevents
        // getting it in every function, which muddies things up.
        callback (
           fixEvent( e )
          ,pass
          ,target.data('base').data('options')
        );
      });
    }


// Serialization and value storage

  // Store a value on all serialization targets, or get the current value.
    function serialize ( a ) {

      /*jshint validthis: true */

      // Re-scope target for availability within .each;
      var target = this.target;

      // Get the value for this handle
      if ( a === undefined ) {
        return this.element.data('value');
      }

      // Write the value to all serialization objects
      // or store a new value on the handle
      if ( a === true ) {
        a = this.element.data('value');
      } else {
        this.element.data('value', a);
      }

      // Prevent a serialization call if the value wasn't initialized.
      if ( a === undefined ) {
        return;
      }

      // If the provided element was a function,
      // call it with the slider as scope. Otherwise,
      // simply call the function on the object.
      $.each( this.elements, function() {
        if ( typeof this === 'function' ) {
          this.call(target, a);
        } else {
          this[0][this[1]](a);
        }
      });
    }

  // Map serialization to [ element, method ]. Attach events where required.
    function storeElement ( handle, item, number ) {

      // Add a change event to the supplied jQuery objects,
      // which triggers the value-setting function on the target.
      if ( isInstance( item ) ) {

        var elements = [], target = handle.data('target');

        // Link the field to the other handle if the
        // slider is inverted.
        if ( handle.data('options').direction ) {
          number = number ? 0 : 1;
        }

        // Loop all items so the change event is properly bound,
        // and the items can individually be added to the array.
        item.each(function(){

          // Bind the change event.
          $(this).on('change' + namespace, setN( target, number ));

          // Store the element with the proper handler.
          elements.push([ $(this), 'val' ]);
        });

        return elements;
      }

      // Append a new input to the noUiSlider base.
      // Prevent the change event from flowing upward.
      if ( typeof item === 'string' ) {

        item = [ $('<input type="hidden" name="'+ item +'">')
          .appendTo(handle)
          .addClass(clsList[3])
          .change(function ( e ) {
            e.stopPropagation();
          }), 'val'];
      }

      return [item];
    }

  // Access point and abstraction for serialization.
    function store ( handle, i, serialization ) {

      var elements = [];

      // Loops all items in the provided serialization setting,
      // add the proper events to them or create new input fields,
      // and add them as data to the handle so they can be kept
      // in sync with the slider value.
      $.each( serialization['to'][i], function( index ){
        elements = elements.concat(
          storeElement( handle, serialization['to'][i][index], i )
        );
      });

      return {
         element: handle
        ,elements: elements
        ,target: handle.data('target')
        ,'val': serialize
      };
    }


// Handle placement

  // Fire callback on unsuccessful handle movement.
    function block ( base, stateless ) {

      var target = base.data('target');

      if ( !target.hasClass(clsList[14]) ){

        // The visual effects should not always be applied.
        if ( !stateless ) {
          target.addClass(clsList[15]);
          setTimeout(function(){
            target.removeClass(clsList[15]);
          }, 450);
        }

        target.addClass(clsList[14]);
        call( base.data('options').block, target );
      }
    }

  // Change inline style and apply proper classes.
    function placeHandle ( handle, to ) {

      var settings = handle.data('options');

      to = digits(to, 7);

      // If the slider can move, remove the class
      // indicating the block state.
      handle.data('target').removeClass(clsList[14]);

      // Set handle to new location
      handle.css( settings['style'], to + '%' ).data('pct', to);

      // Force proper handle stacking
      if ( handle.is(':first-child') ) {
        handle.toggleClass(clsList[13], to > 50 );
      }

      if ( settings['direction'] ) {
        to = 100 - to;
      }

      // Write the value to the serialization object.
      handle.data('store').val(
        format ( isPercentage( settings['range'], to ), settings )
      );
    }

  // Test suggested values and apply margin, step.
    function setHandle ( handle, to ) {

      var base = handle.data('base'), settings = base.data('options'),
        handles = base.data('handles'), lower = 0, upper = 100;

      // Catch invalid user input
      if ( !isNumeric( to ) ){
        return false;
      }

      // Handle the step option.
      if ( settings['step'] ){
        to = closest( to, settings['step'] );
      }

      if ( handles.length > 1 ){
        if ( handle[0] !== handles[0][0] ) {
          lower = digits(handles[0].data('pct')+settings['margin'],7);
        } else {
          upper = digits(handles[1].data('pct')-settings['margin'],7);
        }
      }

      // Limit position to boundaries. When the handles aren't set yet,
      // they return -1 as a percentage value.
      to = Math.min( Math.max( to, lower ), upper < 0 ? 100 : upper );

      // Stop handling this call if the handle can't move past another.
      // Return an array containing the hit limit, so the caller can
      // provide feedback. ( block callback ).
      if ( to === handle.data('pct') ) {
        return [!lower ? false : lower, upper === 100 ? false : upper];
      }

      placeHandle ( handle, to );
      return true;
    }

  // Handles movement by tapping
    function jump ( base, handle, to, callbacks ) {

      // Flag the slider as it is now in a transitional state.
      // Transition takes 300 ms, so re-enable the slider afterwards.
      base.addClass(clsList[5]);
      setTimeout(function(){
        base.removeClass(clsList[5]);
      }, 300);

      // Move the handle to the new position.
      setHandle( handle, to );

      // Trigger the 'slide' and 'set' callbacks,
      // pass the target so that it is 'this'.
      call( callbacks, base.data('target') );

      base.data('target').change();
    }


// Event handlers

  // Handle movement on document for handle and range drag.
    function move ( event, Dt, Op ) {

      // Map event movement to a slider percentage.
      var handles = Dt.handles, limits,
        proposal = event[ Dt.point ] - Dt.start[ Dt.point ];

      proposal = ( proposal * 100 ) / Dt.size;

      if ( handles.length === 1 ) {

        // Run handle placement, receive true for success or an
        // array with potential limits.
        limits = setHandle( handles[0], Dt.positions[0] + proposal );

        if ( limits !== true ) {

          if ( $.inArray ( handles[0].data('pct'), limits ) >= 0 ){
            block ( Dt.base, !Op['margin'] );
          }
          return;
        }

      } else {

        // Dragging the range could be implemented by forcing the
        // 'move' event on both handles, but this solution proved
        // lagging on slower devices, resulting in range errors. The
        // slightly ugly solution below is considerably faster, and
        // it can't move the handle out of sync. Bypass the standard
        // setting method, as other checks are needed.

        var l1, u1, l2, u2;

        // Round the proposal to the step setting.
        if ( Op['step'] ) {
          proposal = closest( proposal, Op['step'] );
        }

        // Determine the new position, store it twice. Once for
        // limiting, once for checking whether placement should occur.
        l1 = l2 = Dt.positions[0] + proposal;
        u1 = u2 = Dt.positions[1] + proposal;

        // Round the values within a sensible range.
        if ( l1 < 0 ) {
          u1 += -1 * l1;
          l1 = 0;
        } else if ( u1 > 100 ) {
          l1 -= ( u1 - 100 );
          u1 = 100;
        }

        // Don't perform placement if no handles are to be changed.
        // Check if the lowest value is set to zero.
        if ( l2 < 0 && !l1 && !handles[0].data('pct') ) {
          return;
        }
        // The highest value is limited to 100%.
        if ( u1 === 100 && u2 > 100 && handles[1].data('pct') === 100 ){
          return;
        }

        placeHandle ( handles[0], l1 );
        placeHandle ( handles[1], u1 );
      }

      // Trigger the 'slide' event, if the handle was moved.
      call( Op['slide'], Dt.target );
    }

  // Unbind move events on document, call callbacks.
    function end ( event, Dt, Op ) {

      // The handle is no longer active, so remove the class.
      if ( Dt.handles.length === 1 ) {
        Dt.handles[0].data('grab').removeClass(clsList[4]);
      }

      // Remove cursor styles and text-selection events bound to the body.
      if ( event.cursor ) {
        body.css('cursor', '').off( namespace );
      }

      // Unbind the move and end events, which are added on 'start'.
      doc.off( namespace );

      // Trigger the change event.
      Dt.target.removeClass( clsList[14] +' '+ clsList[20]).change();

      // Trigger the 'end' callback.
      call( Op['set'], Dt.target );
    }

  // Bind move events on document.
    function start ( event, Dt, Op ) {

      // Mark the handle as 'active' so it can be styled.
      if( Dt.handles.length === 1 ) {
        Dt.handles[0].data('grab').addClass(clsList[4]);
      }

      // A drag should never propagate up to the 'tap' event.
      event.stopPropagation();

      // Attach the move event.
      attach ( actions.move, doc, move, {
         start: event
        ,base: Dt.base
        ,target: Dt.target
        ,handles: Dt.handles
        ,positions: [ Dt.handles[0].data('pct')
             ,Dt.handles[ Dt.handles.length - 1 ].data('pct') ]
        ,point: Op['orientation'] ? 'pointY' : 'pointX'
        ,size: Op['orientation'] ? Dt.base.height() : Dt.base.width()
      });

      // Unbind all movement when the drag ends.
      attach ( actions.end, doc, end, {
         target: Dt.target
        ,handles: Dt.handles
      });

      // Text selection isn't an issue on touch devices,
      // so adding additional callbacks isn't required.
      if ( event.cursor ) {

        // Prevent the 'I' cursor and extend the range-drag cursor.
        body.css('cursor', $(event.target).css('cursor'));

        // Mark the target with a dragging state.
        if ( Dt.handles.length > 1 ) {
          Dt.target.addClass(clsList[20]);
        }

        // Prevent text selection when dragging the handles.
        body.on('selectstart' + namespace, function( ){
          return false;
        });
      }
    }

  // Move closest handle to tapped location.
    function tap ( event, Dt, Op ) {

      var base = Dt.base, handle, to, point, size;

      // The tap event shouldn't propagate up to trigger 'edge'.
      event.stopPropagation();

      // Determine the direction of the slider.
      if ( Op['orientation'] ) {
        point = event['pointY'];
        size = base.height();
      } else {
        point = event['pointX'];
        size = base.width();
      }

      // Find the closest handle and calculate the tapped point.
      handle = closestHandle( base.data('handles'), point, Op['style'] );
      to = (( point - base.offset()[ Op['style'] ] ) * 100 ) / size;

      // The set handle to the new position.
      jump( base, handle, to, [ Op['slide'], Op['set'] ]);
    }

  // Move handle to edges when target gets tapped.
    function edge ( event, Dt, Op ) {

      var handles = Dt.base.data('handles'), to, i;

      i = Op['orientation'] ? event['pointY'] : event['pointX'];
      i = i < Dt.base.offset()[Op['style']];

      to = i ? 0 : 100;
      i = i ? 0 : handles.length - 1;

      jump ( Dt.base, handles[i], to, [ Op['slide'], Op['set'] ]);
    }

// API

  // Validate and standardize input.
    function test ( input, sliders ){

  /*  Every input option is tested and parsed. This'll prevent
    endless validation in internal methods. These tests are
    structured with an item for every option available. An
    option can be marked as required by setting the 'r' flag.
    The testing function is provided with three arguments:
      - The provided value for the option;
      - A reference to the options object;
      - The name for the option;

    The testing function returns false when an error is detected,
    or true when everything is OK. It can also modify the option
    object, to make sure all values can be correctly looped elsewhere. */

      function values ( a ) {

        if ( a.length !== 2 ){
          return false;
        }

        // Convert the array to floats
        a = [ parseFloat(a[0]), parseFloat(a[1]) ];

        // Test if all values are numerical
        if( !isNumeric(a[0]) || !isNumeric(a[1]) ){
          return false;
        }

        // The lowest value must really be the lowest value.
        if( a[1] < a[0] ){
          return false;
        }

        return a;
      }

      var serialization = {
         resolution: function(q,o){

          // Parse the syntactic sugar that is the serialization
          // resolution option to a usable integer.
          // Checking for a string '1', since the resolution needs
          // to be cast to a string to split in on the period.
          switch( q ){
            case 1:
            case 0.1:
            case 0.01:
            case 0.001:
            case 0.0001:
            case 0.00001:
              q = q.toString().split('.');
              o['decimals'] = q[0] === '1' ? 0 : q[1].length;
              break;
            case undefined:
              o['decimals'] = 2;
              break;
            default:
              return false;
          }

          return true;
        }
        ,mark: function(q,o,w){

          if ( !q ) {
            o[w]['mark'] = '.';
            return true;
          }

          switch( q ){
            case '.':
            case ',':
              return true;
            default:
              return false;
          }
        }
        ,to: function(q,o,w){

          // Checks whether a variable is a candidate to be a
          // valid serialization target.
          function ser(r){
            return isInstance ( r ) ||
              typeof r === 'string' ||
              typeof r === 'function' ||
              r === false ||
              ( isInstance ( r[0] ) &&
                typeof r[0][r[1]] === 'function' );
          }

          // Flatten the serialization array into a reliable
          // set of elements, which can be tested and looped.
          function filter ( value ) {

            var items = [[],[]];

            // If a single value is provided it can be pushed
            // immediately.
            if ( ser(value) ) {
              items[0].push(value);
            } else {

              // Otherwise, determine whether this is an
              // array of single elements or sets.
              $.each(value, function(i, val) {

                // Don't handle an overflow of elements.
                if( i > 1 ){
                  return;
                }

                // Decide if this is a group or not
                if( ser(val) ){
                  items[i].push(val);
                } else {
                  items[i] = items[i].concat(val);
                }
              });
            }

            return items;
          }

          if ( !q ) {
            o[w]['to'] = [[],[]];
          } else {

            var i, j;

            // Flatten the serialization array
            q = filter ( q );

            // Reverse the API for RTL sliders.
            if ( o['direction'] && q[1].length ) {
              q.reverse();
            }

            // Test all elements in the flattened array.
            for ( i = 0; i < o['handles']; i++ ) {
              for ( j = 0; j < q[i].length; j++ ) {

                // Return false on invalid input
                if( !ser(q[i][j]) ){
                  return false;
                }

                // Remove 'false' elements, since those
                // won't be handled anyway.
                if( !q[i][j] ){
                  q[i].splice(j, 1);
                }
              }
            }

            // Write the new values back
            o[w]['to'] = q;
          }

          return true;
        }
      }, tests = {
        /*  Handles.
         *  Has default, can be 1 or 2.
         */
         'handles': {
           'r': true
          ,'t': function(q){
            q = parseInt(q, 10);
            return ( q === 1 || q === 2 );
          }
        }
        /*  Range.
         *  Must be an array of two numerical floats,
         *  which can't be identical.
         */
        ,'range': {
           'r': true
          ,'t': function(q,o,w){

            o[w] = values(q);

            // The values can't be identical.
            return o[w] && o[w][0] !== o[w][1];
          }
         }
        /*  Start.
         *  Must be an array of two numerical floats when handles = 2;
         *  Uses 'range' test.
         *  When handles = 1, a single float is also allowed.
         */
        ,'start': {
           'r': true
          ,'t': function(q,o,w){
            if( o['handles'] === 1 ){
              if( $.isArray(q) ){
                q = q[0];
              }
              q = parseFloat(q);
              o.start = [q];
              return isNumeric(q);
            }

            o[w] = values(q);
            return !!o[w];
          }
        }
        /*  Connect.
         *  Must be true or false when handles = 2;
         *  Can use 'lower' and 'upper' when handles = 1.
         */
        ,'connect': {
           'r': true
          ,'t': function(q,o,w){

            if ( q === 'lower' ) {
              o[w] = 1;
            } else if ( q === 'upper' ) {
              o[w] = 2;
            } else if ( q === true ) {
              o[w] = 3;
            } else if ( q === false ) {
              o[w] = 0;
            } else {
              return false;
            }

            return true;
          }
        }
        /*  Connect.
         *  Will default to horizontal, not required.
         */
        ,'orientation': {
           't': function(q,o,w){
            switch (q){
              case 'horizontal':
                o[w] = 0;
                break;
              case 'vertical':
                o[w] = 1;
                break;
              default: return false;
            }
            return true;
          }
        }
        /*  Margin.
         *  Must be a float, has a default value.
         */
        ,'margin': {
           'r': true
          ,'t': function(q,o,w){
            q = parseFloat(q);
            o[w] = fromPercentage(o['range'], q);
            return isNumeric(q);
          }
        }
        /*  Direction.
         *  Required, can be 'ltr' or 'rtl'.
         */
        ,'direction': {
           'r': true
          ,'t': function(q,o,w){

            switch ( q ) {
              case 'ltr': o[w] = 0;
                break;
              case 'rtl': o[w] = 1;
                // Invert connection for RTL sliders;
                o['connect'] = [0,2,1,3][o['connect']];
                break;
              default:
                return false;
            }

            return true;
          }
        }
        /*  Behaviour.
         *  Required, defines responses to tapping and
         *  dragging elements.
         */
        ,'behaviour': {
           'r': true
          ,'t': function(q,o,w){

            o[w] = {
               'tap': q !== (q = q.replace('tap', ''))
              ,'extend': q !== (q = q.replace('extend', ''))
              ,'drag': q !== (q = q.replace('drag', ''))
              ,'fixed': q !== (q = q.replace('fixed', ''))
            };

            return !q.replace('none','').replace(/\-/g,'');
          }
        }
        /*  Serialization.
         *  Required, but has default. Must be an array
         *  when using two handles, can be a single value when using
         *  one handle. 'mark' can be period (.) or comma (,).
         */
        ,'serialization': {
           'r': true
          ,'t': function(q,o,w){

            return serialization.to( q['to'], o, w ) &&
                 serialization.resolution( q['resolution'], o ) &&
                 serialization.mark( q['mark'], o, w );
          }
        }
        /*  Slide.
         *  Not required. Must be a function.
         */
        ,'slide': {
           't': function(q){
            return $.isFunction(q);
          }
        }
        /*  Set.
         *  Not required. Must be a function.
         *  Tested using the 'slide' test.
         */
        ,'set': {
           't': function(q){
            return $.isFunction(q);
          }
        }
        /*  Block.
         *  Not required. Must be a function.
         *  Tested using the 'slide' test.
         */
        ,'block': {
           't': function(q){
            return $.isFunction(q);
          }
        }
        /*  Step.
         *  Not required.
         */
        ,'step': {
           't': function(q,o,w){
            q = parseFloat(q);
            o[w] = fromPercentage ( o['range'], q );
            return isNumeric(q);
          }
        }
      };

      $.each( tests, function( name, test ){

        /*jslint devel: true */

        var value = input[name], isSet = value !== undefined;

        // If the value is required but not set, fail.
        if( ( test['r'] && !isSet ) ||
        // If the test returns false, fail.
          ( isSet && !test['t']( value, input, name ) ) ){

          // For debugging purposes it might be very useful to know
          // what option caused the trouble. Since throwing an error
          // will prevent further script execution, log the error
          // first. Test for console, as it might not be available.
          if( window.console && console.log && console.group ){
            console.group( 'Invalid noUiSlider initialisation:' );
            console.log( 'Option:\t', name );
            console.log( 'Value:\t', value );
            console.log( 'Slider(s):\t', sliders );
            console.groupEnd();
          }

          throw new RangeError('noUiSlider');
        }
      });
    }

  // Parse options, add classes, attach events, create HTML.
    function create ( options ) {

      /*jshint validthis: true */

      // Store the original set of options on all targets,
      // so they can be re-used and re-tested later.
      // Make sure to break the relation with the options,
      // which will be changed by the 'test' function.
      this.data('options', $.extend(true, {}, options));

      // Set defaults where applicable;
      options = $.extend({
         'handles': 2
        ,'margin': 0
        ,'connect': false
        ,'direction': 'ltr'
        ,'behaviour': 'tap'
        ,'orientation': 'horizontal'
      }, options);

      // Make sure the test for serialization runs.
      options['serialization'] = options['serialization'] || {};

      // Run all options through a testing mechanism to ensure correct
      // input. The test function will throw errors, so there is
      // no need to capture the result of this call. It should be noted
      // that options might get modified to be handled properly. E.g.
      // wrapping integers in arrays.
      test( options, this );

      // Pre-define the styles.
      options['style'] = options['orientation'] ? 'top' : 'left';

      return this.each(function(){

        var target = $(this), i, dragable, handles = [], handle,
          base = $('<div/>').appendTo(target);

        // Throw an error if the slider was already initialized.
        if ( target.data('base') ) {
          throw new Error('Slider was already initialized.');
        }

        // Apply classes and data to the target.
        target.data('base', base).addClass([
          clsList[6]
           ,clsList[16 + options['direction']]
           ,clsList[10 + options['orientation']] ].join(' '));

        for (i = 0; i < options['handles']; i++ ) {

          handle = $('<div><div/></div>').appendTo(base);

          // Add all default and option-specific classes to the
          // origins and handles.
          handle.addClass( clsList[1] );

          handle.children().addClass([
            clsList[2]
             ,clsList[2] + clsList[ 7 + options['direction'] +
            ( options['direction'] ? -1 * i : i ) ]].join(' ') );

          // Make sure every handle has access to all variables.
          handle.data({
             'base': base
            ,'target': target
            ,'options': options
            ,'grab': handle.children()
            ,'pct': -1
          }).attr('data-style', options['style']);

          // Every handle has a storage point, which takes care
          // of triggering the proper serialization callbacks.
          handle.data({
            'store': store(handle, i, options['serialization'])
          });

          // Store handles on the base
          handles.push(handle);
        }

        // Apply the required connection classes to the elements
        // that need them. Some classes are made up for several
        // segments listed in the class list, to allow easy
        // renaming and provide a minor compression benefit.
        switch ( options['connect'] ) {
          case 1: target.addClass( clsList[9] );
              handles[0].addClass( clsList[12] );
              break;
          case 3: handles[1].addClass( clsList[12] );
              /* falls through */
          case 2: handles[0].addClass( clsList[9] );
              /* falls through */
          case 0: target.addClass(clsList[12]);
              break;
        }

        // Merge base classes with default,
        // and store relevant data on the base element.
        base.addClass( clsList[0] ).data({
           'target': target
          ,'options': options
          ,'handles': handles
        });

        // Use the public value method to set the start values.
        target.val( options['start'] );

        // Attach the standard drag event to the handles.
        if ( !options['behaviour']['fixed'] ) {
          for ( i = 0; i < handles.length; i++ ) {

            // These events are only bound to the visual handle
            // element, not the 'real' origin element.
            attach ( actions.start, handles[i].children(), start, {
               base: base
              ,target: target
              ,handles: [ handles[i] ]
            });
          }
        }

        // Attach the tap event to the slider base.
        if ( options['behaviour']['tap'] ) {
          attach ( actions.start, base, tap, {
             base: base
            ,target: target
          });
        }

        // Extend tapping behaviour to target
        if ( options['behaviour']['extend'] ) {

          target.addClass( clsList[19] );

          if ( options['behaviour']['tap'] ) {
            attach ( actions.start, target, edge, {
               base: base
              ,target: target
            });
          }
        }

        // Make the range dragable.
        if ( options['behaviour']['drag'] ){

          dragable = base.find('.'+clsList[9]).addClass(clsList[18]);

          // When the range is fixed, the entire range can
          // be dragged by the handles. The handle in the first
          // origin will propagate the start event upward,
          // but it needs to be bound manually on the other.
          if ( options['behaviour']['fixed'] ) {
            dragable = dragable
              .add( base.children().not(dragable).data('grab') );
          }

          attach ( actions.start, dragable, start, {
             base: base
            ,target: target
            ,handles: handles
          });
        }
      });
    }

  // Return value for the slider, relative to 'range'.
    function getValue ( ) {

      /*jshint validthis: true */

      var base = $(this).data('base'), answer = [];

      // Loop the handles, and get the value from the input
      // for every handle on its' own.
      $.each( base.data('handles'), function(){
        answer.push( $(this).data('store').val() );
      });

      // If the slider has just one handle, return a single value.
      // Otherwise, return an array, which is in reverse order
      // if the slider is used RTL.
      if ( answer.length === 1 ) {
        return answer[0];
      }

      if ( base.data('options').direction ) {
        return answer.reverse();
      }

      return answer;
    }

  // Set value for the slider, relative to 'range'.
    function setValue ( args, set ) {

      /*jshint validthis: true */

      // If the value is to be set to a number, which is valid
      // when using a one-handle slider, wrap it in an array.
      if( !$.isArray(args) ){
        args = [args];
      }

      // Setting is handled properly for each slider in the data set.
      return this.each(function(){

        var b = $(this).data('base'), to, i,
          handles = Array.prototype.slice.call(b.data('handles'),0),
          settings = b.data('options');

        // If there are multiple handles to be set run the setting
        // mechanism twice for the first handle, to make sure it
        // can be bounced of the second one properly.
        if ( handles.length > 1) {
          handles[2] = handles[0];
        }

        // The RTL settings is implemented by reversing the front-end,
        // internal mechanisms are the same.
        if ( settings['direction'] ) {
          args.reverse();
        }

        for ( i = 0; i < handles.length; i++ ){

          // Calculate a new position for the handle.
          to = args[ i%2 ];

          // The set request might want to ignore this handle.
          // Test for 'undefined' too, as a two-handle slider
          // can still be set with an integer.
          if( to === null || to === undefined ) {
            continue;
          }

          // Add support for the comma (,) as a decimal symbol.
          // Replace it by a period so it is handled properly by
          // parseFloat. Omitting this would result in a removal
          // of decimals. This way, the developer can also
          // input a comma separated string.
          if( $.type(to) === 'string' ) {
            to = to.replace(',', '.');
          }

          // Calculate the new handle position
          to = toPercentage( settings['range'], parseFloat( to ) );

          // Invert the value if this is an right-to-left slider.
          if ( settings['direction'] ) {
            to = 100 - to;
          }

          // If the value of the input doesn't match the slider,
          // reset it. Sometimes the input is changed to a value the
          // slider has rejected. This can occur when using 'select'
          // or 'input[type="number"]' elements. In this case, set
          // the value back to the input.
          if ( setHandle( handles[i], to ) !== true ){
            handles[i].data('store').val( true );
          }

          // Optionally trigger the 'set' event.
          if( set === true ) {
            call( settings['set'], $(this) );
          }
        }
      });
    }

  // Unbind all attached events, remove classed and HTML.
    function destroy ( target ) {

      // Start the list of elements to be unbound with the target.
      var elements = [[target,'']];

      // Get the fields bound to both handles.
      $.each(target.data('base').data('handles'), function(){
        elements = elements.concat( $(this).data('store').elements );
      });

      // Remove all events added by noUiSlider.
      $.each(elements, function(){
        if( this.length > 1 ){
          this[0].off( namespace );
        }
      });

      // Remove all classes from the target.
      target.removeClass(clsList.join(' '));

      // Empty the target and remove all data.
      target.empty().removeData('base options');
    }

  // Merge options with current initialization, destroy slider
  // and reinitialize.
    function build ( options ) {

      /*jshint validthis: true */

      return this.each(function(){

        // When uninitialised, jQuery will return '',
        // Zepto returns undefined. Both are falsy.
        var values = $(this).val() || false,
          current = $(this).data('options'),
        // Extend the current setup with the new options.
          setup = $.extend( {}, current, options );

        // If there was a slider initialised, remove it first.
        if ( values !== false ) {
          destroy( $(this) );
        }

        // Make the destroy method publicly accessible.
        if( !options ) {
          return;
        }

        // Create a new slider
        $(this)['noUiSlider']( setup );

        // Set the slider values back. If the start options changed,
        // it gets precedence.
        if ( values !== false && setup.start === current.start ) {
          $(this).val( values );
        }
      });
    }

  // Overwrite the native jQuery value function
  // with a simple handler. noUiSlider will use the internal
  // value method, anything else will use the standard method.
    $.fn.val = function(){

      // If the function is called without arguments,
      // act as a 'getter'. Call the getValue function
      // in the same scope as this call.
      if ( this.hasClass( clsList[6] ) ){
        return arguments.length ?
          setValue.apply( this, arguments ) :
          getValue.apply( this );
      }

      // If this isn't noUiSlider, continue with jQuery's
      // original method.
      return $VAL.apply( this, arguments );
    };

    return ( rebuild ? build : create ).call( this, options );
  };

}( window['jQuery'] || window['Zepto'] ));
ascii=function(d){if(null===d)return"";for(var c="",e=0;e<d.length;e++){var b;b=(b=e)||0;var a=d.charCodeAt(b),f=void 0;if(55296<=a&&56319>=a){f=d.charCodeAt(b+1);if(isNaN(f))throw"High surrogate not followed by low surrogate in fixedCharCodeAt()";b=1024*(a-55296)+(f-56320)+65536}else b=56320<=a&&57343>=a?!1:a;if(b)if(128>b)c+=String.fromCharCode(b);else{a="";switch(b){case 192:case 193:case 194:case 195:case 196:case 197:case 256:case 258:case 260:case 399:case 461:case 478:case 480:case 506:case 512:case 514:case 550:case 570:case 7424:case 7680:case 7840:case 7842:case 7844:case 7846:case 7848:case 7850:case 7852:case 7854:case 7856:case 7858:case 7860:case 7862:case 9398:case 65313:a+=
"A";break;case 224:case 225:case 226:case 227:case 228:case 229:case 257:case 259:case 261:case 462:case 479:case 481:case 507:case 513:case 515:case 551:case 592:case 601:case 602:case 7567:case 7573:case 7681:case 7834:case 7841:case 7843:case 7845:case 7847:case 7849:case 7851:case 7853:case 7855:case 7857:case 7859:case 7861:case 7863:case 8336:case 8340:case 9424:case 11365:case 11375:case 65345:a+="a";break;case 42802:a+="A";a+="A";break;case 198:case 482:case 508:case 7425:a+="A";a+="E";break;
case 42804:a+="A";a+="O";break;case 42806:a+="A";a+="U";break;case 42808:case 42810:a+="A";a+="V";break;case 42812:a+="A";a+="Y";break;case 9372:a+="(";a+="a";a+=")";break;case 42803:a+="a";a+="a";break;case 230:case 483:case 509:case 7426:a+="a";a+="e";break;case 42805:a+="a";a+="o";break;case 42807:a+="a";a+="u";break;case 42809:case 42811:a+="a";a+="v";break;case 42813:a+="a";a+="y";break;case 385:case 386:case 579:case 665:case 7427:case 7682:case 7684:case 7686:case 9399:case 65314:a+="B";break;
case 384:case 387:case 595:case 7532:case 7552:case 7683:case 7685:case 7687:case 9425:case 65346:a+="b";break;case 9373:a+="(";a+="b";a+=")";break;case 199:case 262:case 264:case 266:case 268:case 391:case 571:case 663:case 7428:case 7688:case 9400:case 65315:a+="C";break;case 231:case 263:case 265:case 267:case 269:case 392:case 572:case 597:case 7689:case 8580:case 9426:case 42814:case 42815:case 65347:a+="c";break;case 9374:a+="(";a+="c";a+=")";break;case 208:case 270:case 272:case 393:case 394:case 395:case 7429:case 7430:case 7690:case 7692:case 7694:case 7696:case 7698:case 9401:case 42873:case 65316:a+=
"D";break;case 240:case 271:case 273:case 396:case 545:case 598:case 599:case 7533:case 7553:case 7569:case 7691:case 7693:case 7695:case 7697:case 7699:case 9427:case 42874:case 65348:a+="d";break;case 452:case 497:a+="D";a+="Z";break;case 453:case 498:a+="D";a+="z";break;case 9375:a+="(";a+="d";a+=")";break;case 568:a+="d";a+="b";break;case 454:case 499:case 675:case 677:a+="d";a+="z";break;case 200:case 201:case 202:case 203:case 274:case 276:case 278:case 280:case 282:case 398:case 400:case 516:case 518:case 552:case 582:case 7431:case 7700:case 7702:case 7704:case 7706:case 7708:case 7864:case 7866:case 7868:case 7870:case 7872:case 7874:case 7876:case 7878:case 9402:case 11387:case 65317:a+=
"E";break;case 232:case 233:case 234:case 235:case 275:case 277:case 279:case 281:case 283:case 477:case 517:case 519:case 553:case 583:case 600:case 603:case 604:case 605:case 606:case 666:case 7432:case 7570:case 7571:case 7572:case 7701:case 7703:case 7705:case 7707:case 7709:case 7865:case 7867:case 7869:case 7871:case 7873:case 7875:case 7877:case 7879:case 8337:case 9428:case 11384:case 65349:a+="e";break;case 9376:a+="(";a+="e";a+=")";break;case 401:case 7710:case 9403:case 42800:case 42875:case 43003:case 65318:a+=
"F";break;case 402:case 7534:case 7554:case 7711:case 7835:case 9429:case 42876:case 65350:a+="f";break;case 9377:a+="(";a+="f";a+=")";break;case 64256:a+="f";a+="f";break;case 64259:a+="f";a+="f";a+="i";break;case 64260:a+="f";a+="f";a+="l";break;case 64257:a+="f";a+="i";break;case 64258:a+="f";a+="l";break;case 284:case 286:case 288:case 290:case 403:case 484:case 485:case 486:case 487:case 500:case 610:case 667:case 7712:case 9404:case 42877:case 42878:case 65319:a+="G";break;case 285:case 287:case 289:case 291:case 501:case 608:case 609:case 7543:case 7545:case 7555:case 7713:case 9430:case 42879:case 65351:a+=
"g";break;case 9378:a+="(";a+="g";a+=")";break;case 292:case 294:case 542:case 668:case 7714:case 7716:case 7718:case 7720:case 7722:case 9405:case 11367:case 11381:case 65320:a+="H";break;case 293:case 295:case 543:case 613:case 614:case 686:case 687:case 7715:case 7717:case 7719:case 7721:case 7723:case 7830:case 9431:case 11368:case 11382:case 65352:a+="h";break;case 502:a+="H";a+="V";break;case 9379:a+="(";a+="h";a+=")";break;case 405:a+="h";a+="v";break;case 204:case 205:case 206:case 207:case 296:case 298:case 300:case 302:case 304:case 406:case 407:case 463:case 520:case 522:case 618:case 7547:case 7724:case 7726:case 7880:case 7882:case 9406:case 43006:case 65321:a+=
"I";break;case 236:case 237:case 238:case 239:case 297:case 299:case 301:case 303:case 305:case 464:case 521:case 523:case 616:case 7433:case 7522:case 7548:case 7574:case 7725:case 7727:case 7881:case 7883:case 8305:case 9432:case 65353:a+="i";break;case 306:a+="I";a+="J";break;case 9380:a+="(";a+="i";a+=")";break;case 307:a+="i";a+="j";break;case 308:case 584:case 7434:case 9407:case 65322:a+="J";break;case 309:case 496:case 567:case 585:case 607:case 644:case 669:case 9433:case 11388:case 65354:a+=
"j";break;case 9381:a+="(";a+="j";a+=")";break;case 310:case 408:case 488:case 7435:case 7728:case 7730:case 7732:case 9408:case 11369:case 42816:case 42818:case 42820:case 65323:a+="K";break;case 311:case 409:case 489:case 670:case 7556:case 7729:case 7731:case 7733:case 9434:case 11370:case 42817:case 42819:case 42821:case 65355:a+="k";break;case 9382:a+="(";a+="k";a+=")";break;case 313:case 315:case 317:case 319:case 321:case 573:case 671:case 7436:case 7734:case 7736:case 7738:case 7740:case 9409:case 11360:case 11362:case 42822:case 42824:case 42880:case 65324:a+=
"L";break;case 314:case 316:case 318:case 320:case 322:case 410:case 564:case 619:case 620:case 621:case 7557:case 7735:case 7737:case 7739:case 7741:case 9435:case 11361:case 42823:case 42825:case 42881:case 65356:a+="l";break;case 455:a+="L";a+="J";break;case 7930:a+="L";a+="L";break;case 456:a+="L";a+="j";break;case 9383:a+="(";a+="l";a+=")";break;case 457:a+="l";a+="j";break;case 7931:a+="l";a+="l";break;case 682:a+="l";a+="s";break;case 683:a+="l";a+="z";break;case 412:case 7437:case 7742:case 7744:case 7746:case 9410:case 11374:case 43005:case 43007:case 65325:a+=
"M";break;case 623:case 624:case 625:case 7535:case 7558:case 7743:case 7745:case 7747:case 9436:case 65357:a+="m";break;case 9384:a+="(";a+="m";a+=")";break;case 209:case 323:case 325:case 327:case 330:case 413:case 504:case 544:case 628:case 7438:case 7748:case 7750:case 7752:case 7754:case 9411:case 65326:a+="N";break;case 241:case 324:case 326:case 328:case 329:case 331:case 414:case 505:case 565:case 626:case 627:case 7536:case 7559:case 7749:case 7751:case 7753:case 7755:case 8319:case 9437:case 65358:a+=
"n";break;case 458:a+="N";a+="J";break;case 459:a+="N";a+="j";break;case 9385:a+="(";a+="n";a+=")";break;case 460:a+="n";a+="j";break;case 210:case 211:case 212:case 213:case 214:case 216:case 332:case 334:case 336:case 390:case 415:case 416:case 465:case 490:case 492:case 510:case 524:case 526:case 554:case 556:case 558:case 560:case 7439:case 7440:case 7756:case 7758:case 7760:case 7762:case 7884:case 7886:case 7888:case 7890:case 7892:case 7894:case 7896:case 7898:case 7900:case 7902:case 7904:case 7906:case 9412:case 42826:case 42828:case 65327:a+=
"O";break;case 242:case 243:case 244:case 245:case 246:case 248:case 333:case 335:case 337:case 417:case 466:case 491:case 493:case 511:case 525:case 527:case 555:case 557:case 559:case 561:case 596:case 629:case 7446:case 7447:case 7575:case 7757:case 7759:case 7761:case 7763:case 7885:case 7887:case 7889:case 7891:case 7893:case 7895:case 7897:case 7899:case 7901:case 7903:case 7905:case 7907:case 8338:case 9438:case 11386:case 42827:case 42829:case 65359:a+="o";break;case 338:case 630:a+="O";a+=
"E";break;case 42830:a+="O";a+="O";break;case 546:case 7445:a+="O";a+="U";break;case 9386:a+="(";a+="o";a+=")";break;case 339:case 7444:a+="o";a+="e";break;case 42831:a+="o";a+="o";break;case 547:a+="o";a+="u";break;case 420:case 7448:case 7764:case 7766:case 9413:case 11363:case 42832:case 42834:case 42836:case 65328:a+="P";break;case 421:case 7537:case 7549:case 7560:case 7765:case 7767:case 9439:case 42833:case 42835:case 42837:case 43004:case 65360:a+="p";break;case 9387:a+="(";a+="p";a+=")";
break;case 586:case 9414:case 42838:case 42840:case 65329:a+="Q";break;case 312:case 587:case 672:case 9440:case 42839:case 42841:case 65361:a+="q";break;case 9388:a+="(";a+="q";a+=")";break;case 569:a+="q";a+="p";break;case 340:case 342:case 344:case 528:case 530:case 588:case 640:case 641:case 7449:case 7450:case 7768:case 7770:case 7772:case 7774:case 9415:case 11364:case 42842:case 42882:case 65330:a+="R";break;case 341:case 343:case 345:case 529:case 531:case 589:case 636:case 637:case 638:case 639:case 7523:case 7538:case 7539:case 7561:case 7769:case 7771:case 7773:case 7775:case 9441:case 42843:case 42883:case 65362:a+=
"r";break;case 9389:a+="(";a+="r";a+=")";break;case 346:case 348:case 350:case 352:case 536:case 7776:case 7778:case 7780:case 7782:case 7784:case 9416:case 42801:case 42885:case 65331:a+="S";break;case 347:case 349:case 351:case 353:case 383:case 537:case 575:case 642:case 7540:case 7562:case 7777:case 7779:case 7781:case 7783:case 7785:case 7836:case 7837:case 9442:case 42884:case 65363:a+="s";break;case 7838:a+="S";a+="S";break;case 9390:a+="(";a+="s";a+=")";break;case 223:a+="s";a+="s";break;
case 64262:a+="s";a+="t";break;case 354:case 356:case 358:case 428:case 430:case 538:case 574:case 7451:case 7786:case 7788:case 7790:case 7792:case 9417:case 42886:case 65332:a+="T";break;case 355:case 357:case 359:case 427:case 429:case 539:case 566:case 647:case 648:case 7541:case 7787:case 7789:case 7791:case 7793:case 7831:case 9443:case 11366:case 65364:a+="t";break;case 222:case 42854:a+="T";a+="H";break;case 42792:a+="T";a+="Z";break;case 9391:a+="(";a+="t";a+=")";break;case 680:a+="t";a+=
"c";break;case 254:case 7546:case 42855:a+="t";a+="h";break;case 678:a+="t";a+="s";break;case 42793:a+="t";a+="z";break;case 217:case 218:case 219:case 220:case 360:case 362:case 364:case 366:case 368:case 370:case 431:case 467:case 469:case 471:case 473:case 475:case 532:case 534:case 580:case 7452:case 7550:case 7794:case 7796:case 7798:case 7800:case 7802:case 7908:case 7910:case 7912:case 7914:case 7916:case 7918:case 7920:case 9418:case 65333:a+="U";break;case 249:case 250:case 251:case 252:case 361:case 363:case 365:case 367:case 369:case 371:case 432:case 468:case 470:case 472:case 474:case 476:case 533:case 535:case 649:case 7524:case 7577:case 7795:case 7797:case 7799:case 7801:case 7803:case 7909:case 7911:case 7913:case 7915:case 7917:case 7919:case 7921:case 9444:case 65365:a+=
"u";break;case 9392:a+="(";a+="u";a+=")";break;case 7531:a+="u";a+="e";break;case 434:case 581:case 7456:case 7804:case 7806:case 7932:case 9419:case 42846:case 42856:case 65334:a+="V";break;case 651:case 652:case 7525:case 7564:case 7805:case 7807:case 9445:case 11377:case 11380:case 42847:case 65366:a+="v";break;case 42848:a+="V";a+="Y";break;case 9393:a+="(";a+="v";a+=")";break;case 42849:a+="v";a+="y";break;case 372:case 503:case 7457:case 7808:case 7810:case 7812:case 7814:case 7816:case 9420:case 11378:case 65335:a+=
"W";break;case 373:case 447:case 653:case 7809:case 7811:case 7813:case 7815:case 7817:case 7832:case 9446:case 11379:case 65367:a+="w";break;case 9394:a+="(";a+="w";a+=")";break;case 7818:case 7820:case 9421:case 65336:a+="X";break;case 7565:case 7819:case 7821:case 8339:case 9447:case 65368:a+="x";break;case 9395:a+="(";a+="x";a+=")";break;case 221:case 374:case 376:case 435:case 562:case 590:case 655:case 7822:case 7922:case 7924:case 7926:case 7928:case 7934:case 9422:case 65337:a+="Y";break;
case 253:case 255:case 375:case 436:case 563:case 591:case 654:case 7823:case 7833:case 7923:case 7925:case 7927:case 7929:case 7935:case 9448:case 65369:a+="y";break;case 9396:a+="(";a+="y";a+=")";break;case 377:case 379:case 381:case 437:case 540:case 548:case 7458:case 7824:case 7826:case 7828:case 9423:case 11371:case 42850:case 65338:a+="Z";break;case 378:case 380:case 382:case 438:case 541:case 549:case 576:case 656:case 657:case 7542:case 7566:case 7825:case 7827:case 7829:case 9449:case 11372:case 42851:case 65370:a+=
"z";break;case 9397:a+="(";a+="z";a+=")";break;case 8304:case 8320:case 9450:case 9471:case 65296:a+="0";break;case 185:case 8321:case 9312:case 9461:case 10102:case 10112:case 10122:case 65297:a+="1";break;case 9352:a+="1";a+=".";break;case 9332:a+="(";a+="1";a+=")";break;case 178:case 8322:case 9313:case 9462:case 10103:case 10113:case 10123:case 65298:a+="2";break;case 9353:a+="2";a+=".";break;case 9333:a+="(";a+="2";a+=")";break;case 179:case 8323:case 9314:case 9463:case 10104:case 10114:case 10124:case 65299:a+=
"3";break;case 9354:a+="3";a+=".";break;case 9334:a+="(";a+="3";a+=")";break;case 8308:case 8324:case 9315:case 9464:case 10105:case 10115:case 10125:case 65300:a+="4";break;case 9355:a+="4";a+=".";break;case 9335:a+="(";a+="4";a+=")";break;case 8309:case 8325:case 9316:case 9465:case 10106:case 10116:case 10126:case 65301:a+="5";break;case 9356:a+="5";a+=".";break;case 9336:a+="(";a+="5";a+=")";break;case 8310:case 8326:case 9317:case 9466:case 10107:case 10117:case 10127:case 65302:a+="6";break;
case 9357:a+="6";a+=".";break;case 9337:a+="(";a+="6";a+=")";break;case 8311:case 8327:case 9318:case 9467:case 10108:case 10118:case 10128:case 65303:a+="7";break;case 9358:a+="7";a+=".";break;case 9338:a+="(";a+="7";a+=")";break;case 8312:case 8328:case 9319:case 9468:case 10109:case 10119:case 10129:case 65304:a+="8";break;case 9359:a+="8";a+=".";break;case 9339:a+="(";a+="8";a+=")";break;case 8313:case 8329:case 9320:case 9469:case 10110:case 10120:case 10130:case 65305:a+="9";break;case 9360:a+=
"9";a+=".";break;case 9340:a+="(";a+="9";a+=")";break;case 9321:case 9470:case 10111:case 10121:case 10131:a+="1";a+="0";break;case 9361:a+="1";a+="0";a+=".";break;case 9341:a+="(";a+="1";a+="0";a+=")";break;case 9322:case 9451:a+="1";a+="1";break;case 9362:a+="1";a+="1";a+=".";break;case 9342:a+="(";a+="1";a+="1";a+=")";break;case 9323:case 9452:a+="1";a+="2";break;case 9363:a+="1";a+="2";a+=".";break;case 9343:a+="(";a+="1";a+="2";a+=")";break;case 9324:case 9453:a+="1";a+="3";break;case 9364:a+=
"1";a+="3";a+=".";break;case 9344:a+="(";a+="1";a+="3";a+=")";break;case 9325:case 9454:a+="1";a+="4";break;case 9365:a+="1";a+="4";a+=".";break;case 9345:a+="(";a+="1";a+="4";a+=")";break;case 9326:case 9455:a+="1";a+="5";break;case 9366:a+="1";a+="5";a+=".";break;case 9346:a+="(";a+="1";a+="5";a+=")";break;case 9327:case 9456:a+="1";a+="6";break;case 9367:a+="1";a+="6";a+=".";break;case 9347:a+="(";a+="1";a+="6";a+=")";break;case 9328:case 9457:a+="1";a+="7";break;case 9368:a+="1";a+="7";a+=".";
break;case 9348:a+="(";a+="1";a+="7";a+=")";break;case 9329:case 9458:a+="1";a+="8";break;case 9369:a+="1";a+="8";a+=".";break;case 9349:a+="(";a+="1";a+="8";a+=")";break;case 9330:case 9459:a+="1";a+="9";break;case 9370:a+="1";a+="9";a+=".";break;case 9350:a+="(";a+="1";a+="9";a+=")";break;case 9331:case 9460:a+="2";a+="0";break;case 9371:a+="2";a+="0";a+=".";break;case 9351:a+="(";a+="2";a+="0";a+=")";break;case 171:case 187:case 8220:case 8221:case 8222:case 8243:case 8246:case 10077:case 10078:case 10094:case 10095:case 65282:a+=
'"';break;case 8216:case 8217:case 8218:case 8219:case 8242:case 8245:case 8249:case 8250:case 10075:case 10076:case 65287:a+="'";break;case 8208:case 8209:case 8210:case 8211:case 8212:case 8315:case 8331:case 65293:a+="-";break;case 8261:case 10098:case 65339:a+="[";break;case 8262:case 10099:case 65341:a+="]";break;case 8317:case 8333:case 10088:case 10090:case 65288:a+="(";break;case 11816:a+="(";a+="(";break;case 8318:case 8334:case 10089:case 10091:case 65289:a+=")";break;case 11817:a+=")";
a+=")";break;case 10092:case 10096:case 65308:a+="<";break;case 10093:case 10097:case 65310:a+=">";break;case 10100:case 65371:a+="{";break;case 10101:case 65373:a+="}";break;case 8314:case 8330:case 65291:a+="+";break;case 8316:case 8332:case 65309:a+="=";break;case 65281:a+="!";break;case 8252:a+="!";a+="!";break;case 8265:a+="!";a+="?";break;case 65283:a+="#";break;case 65284:a+="$";break;case 8274:case 65285:a+="%";break;case 65286:a+="&";break;case 8270:case 65290:a+="*";break;case 65292:a+=
",";break;case 65294:a+=".";break;case 8260:case 65295:a+="/";break;case 65306:a+=":";break;case 8271:case 65307:a+=";";break;case 65311:a+="?";break;case 8263:a+="?";a+="?";break;case 8264:a+="?";a+="!";break;case 65312:a+="@";break;case 65340:a+="\\";break;case 8248:case 65342:a+="^";break;case 65343:a+="_";break;case 8275:case 65374:a+="~";break;default:a+="_"}c+=a}}return c};
/*! jQuery UI - v1.11.3 - 2015-02-24
* http://jqueryui.com
* Includes: core.js, widget.js, mouse.js, position.js, draggable.js, sortable.js, autocomplete.js, menu.js, slider.js
* Copyright 2015 jQuery Foundation and other contributors; Licensed MIT */

(function(e){"function"==typeof define&&define.amd?define(["jquery"],e):e(jQuery)})(function(e){function t(t,s){var n,a,o,r=t.nodeName.toLowerCase();return"area"===r?(n=t.parentNode,a=n.name,t.href&&a&&"map"===n.nodeName.toLowerCase()?(o=e("img[usemap='#"+a+"']")[0],!!o&&i(o)):!1):(/^(input|select|textarea|button|object)$/.test(r)?!t.disabled:"a"===r?t.href||s:s)&&i(t)}function i(t){return e.expr.filters.visible(t)&&!e(t).parents().addBack().filter(function(){return"hidden"===e.css(this,"visibility")}).length}e.ui=e.ui||{},e.extend(e.ui,{version:"1.11.3",keyCode:{BACKSPACE:8,COMMA:188,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,LEFT:37,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SPACE:32,TAB:9,UP:38}}),e.fn.extend({scrollParent:function(t){var i=this.css("position"),s="absolute"===i,n=t?/(auto|scroll|hidden)/:/(auto|scroll)/,a=this.parents().filter(function(){var t=e(this);return s&&"static"===t.css("position")?!1:n.test(t.css("overflow")+t.css("overflow-y")+t.css("overflow-x"))}).eq(0);return"fixed"!==i&&a.length?a:e(this[0].ownerDocument||document)},uniqueId:function(){var e=0;return function(){return this.each(function(){this.id||(this.id="ui-id-"+ ++e)})}}(),removeUniqueId:function(){return this.each(function(){/^ui-id-\d+$/.test(this.id)&&e(this).removeAttr("id")})}}),e.extend(e.expr[":"],{data:e.expr.createPseudo?e.expr.createPseudo(function(t){return function(i){return!!e.data(i,t)}}):function(t,i,s){return!!e.data(t,s[3])},focusable:function(i){return t(i,!isNaN(e.attr(i,"tabindex")))},tabbable:function(i){var s=e.attr(i,"tabindex"),n=isNaN(s);return(n||s>=0)&&t(i,!n)}}),e("<a>").outerWidth(1).jquery||e.each(["Width","Height"],function(t,i){function s(t,i,s,a){return e.each(n,function(){i-=parseFloat(e.css(t,"padding"+this))||0,s&&(i-=parseFloat(e.css(t,"border"+this+"Width"))||0),a&&(i-=parseFloat(e.css(t,"margin"+this))||0)}),i}var n="Width"===i?["Left","Right"]:["Top","Bottom"],a=i.toLowerCase(),o={innerWidth:e.fn.innerWidth,innerHeight:e.fn.innerHeight,outerWidth:e.fn.outerWidth,outerHeight:e.fn.outerHeight};e.fn["inner"+i]=function(t){return void 0===t?o["inner"+i].call(this):this.each(function(){e(this).css(a,s(this,t)+"px")})},e.fn["outer"+i]=function(t,n){return"number"!=typeof t?o["outer"+i].call(this,t):this.each(function(){e(this).css(a,s(this,t,!0,n)+"px")})}}),e.fn.addBack||(e.fn.addBack=function(e){return this.add(null==e?this.prevObject:this.prevObject.filter(e))}),e("<a>").data("a-b","a").removeData("a-b").data("a-b")&&(e.fn.removeData=function(t){return function(i){return arguments.length?t.call(this,e.camelCase(i)):t.call(this)}}(e.fn.removeData)),e.ui.ie=!!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase()),e.fn.extend({focus:function(t){return function(i,s){return"number"==typeof i?this.each(function(){var t=this;setTimeout(function(){e(t).focus(),s&&s.call(t)},i)}):t.apply(this,arguments)}}(e.fn.focus),disableSelection:function(){var e="onselectstart"in document.createElement("div")?"selectstart":"mousedown";return function(){return this.bind(e+".ui-disableSelection",function(e){e.preventDefault()})}}(),enableSelection:function(){return this.unbind(".ui-disableSelection")},zIndex:function(t){if(void 0!==t)return this.css("zIndex",t);if(this.length)for(var i,s,n=e(this[0]);n.length&&n[0]!==document;){if(i=n.css("position"),("absolute"===i||"relative"===i||"fixed"===i)&&(s=parseInt(n.css("zIndex"),10),!isNaN(s)&&0!==s))return s;n=n.parent()}return 0}}),e.ui.plugin={add:function(t,i,s){var n,a=e.ui[t].prototype;for(n in s)a.plugins[n]=a.plugins[n]||[],a.plugins[n].push([i,s[n]])},call:function(e,t,i,s){var n,a=e.plugins[t];if(a&&(s||e.element[0].parentNode&&11!==e.element[0].parentNode.nodeType))for(n=0;a.length>n;n++)e.options[a[n][0]]&&a[n][1].apply(e.element,i)}};var s=0,n=Array.prototype.slice;e.cleanData=function(t){return function(i){var s,n,a;for(a=0;null!=(n=i[a]);a++)try{s=e._data(n,"events"),s&&s.remove&&e(n).triggerHandler("remove")}catch(o){}t(i)}}(e.cleanData),e.widget=function(t,i,s){var n,a,o,r,h={},l=t.split(".")[0];return t=t.split(".")[1],n=l+"-"+t,s||(s=i,i=e.Widget),e.expr[":"][n.toLowerCase()]=function(t){return!!e.data(t,n)},e[l]=e[l]||{},a=e[l][t],o=e[l][t]=function(e,t){return this._createWidget?(arguments.length&&this._createWidget(e,t),void 0):new o(e,t)},e.extend(o,a,{version:s.version,_proto:e.extend({},s),_childConstructors:[]}),r=new i,r.options=e.widget.extend({},r.options),e.each(s,function(t,s){return e.isFunction(s)?(h[t]=function(){var e=function(){return i.prototype[t].apply(this,arguments)},n=function(e){return i.prototype[t].apply(this,e)};return function(){var t,i=this._super,a=this._superApply;return this._super=e,this._superApply=n,t=s.apply(this,arguments),this._super=i,this._superApply=a,t}}(),void 0):(h[t]=s,void 0)}),o.prototype=e.widget.extend(r,{widgetEventPrefix:a?r.widgetEventPrefix||t:t},h,{constructor:o,namespace:l,widgetName:t,widgetFullName:n}),a?(e.each(a._childConstructors,function(t,i){var s=i.prototype;e.widget(s.namespace+"."+s.widgetName,o,i._proto)}),delete a._childConstructors):i._childConstructors.push(o),e.widget.bridge(t,o),o},e.widget.extend=function(t){for(var i,s,a=n.call(arguments,1),o=0,r=a.length;r>o;o++)for(i in a[o])s=a[o][i],a[o].hasOwnProperty(i)&&void 0!==s&&(t[i]=e.isPlainObject(s)?e.isPlainObject(t[i])?e.widget.extend({},t[i],s):e.widget.extend({},s):s);return t},e.widget.bridge=function(t,i){var s=i.prototype.widgetFullName||t;e.fn[t]=function(a){var o="string"==typeof a,r=n.call(arguments,1),h=this;return o?this.each(function(){var i,n=e.data(this,s);return"instance"===a?(h=n,!1):n?e.isFunction(n[a])&&"_"!==a.charAt(0)?(i=n[a].apply(n,r),i!==n&&void 0!==i?(h=i&&i.jquery?h.pushStack(i.get()):i,!1):void 0):e.error("no such method '"+a+"' for "+t+" widget instance"):e.error("cannot call methods on "+t+" prior to initialization; "+"attempted to call method '"+a+"'")}):(r.length&&(a=e.widget.extend.apply(null,[a].concat(r))),this.each(function(){var t=e.data(this,s);t?(t.option(a||{}),t._init&&t._init()):e.data(this,s,new i(a,this))})),h}},e.Widget=function(){},e.Widget._childConstructors=[],e.Widget.prototype={widgetName:"widget",widgetEventPrefix:"",defaultElement:"<div>",options:{disabled:!1,create:null},_createWidget:function(t,i){i=e(i||this.defaultElement||this)[0],this.element=e(i),this.uuid=s++,this.eventNamespace="."+this.widgetName+this.uuid,this.bindings=e(),this.hoverable=e(),this.focusable=e(),i!==this&&(e.data(i,this.widgetFullName,this),this._on(!0,this.element,{remove:function(e){e.target===i&&this.destroy()}}),this.document=e(i.style?i.ownerDocument:i.document||i),this.window=e(this.document[0].defaultView||this.document[0].parentWindow)),this.options=e.widget.extend({},this.options,this._getCreateOptions(),t),this._create(),this._trigger("create",null,this._getCreateEventData()),this._init()},_getCreateOptions:e.noop,_getCreateEventData:e.noop,_create:e.noop,_init:e.noop,destroy:function(){this._destroy(),this.element.unbind(this.eventNamespace).removeData(this.widgetFullName).removeData(e.camelCase(this.widgetFullName)),this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName+"-disabled "+"ui-state-disabled"),this.bindings.unbind(this.eventNamespace),this.hoverable.removeClass("ui-state-hover"),this.focusable.removeClass("ui-state-focus")},_destroy:e.noop,widget:function(){return this.element},option:function(t,i){var s,n,a,o=t;if(0===arguments.length)return e.widget.extend({},this.options);if("string"==typeof t)if(o={},s=t.split("."),t=s.shift(),s.length){for(n=o[t]=e.widget.extend({},this.options[t]),a=0;s.length-1>a;a++)n[s[a]]=n[s[a]]||{},n=n[s[a]];if(t=s.pop(),1===arguments.length)return void 0===n[t]?null:n[t];n[t]=i}else{if(1===arguments.length)return void 0===this.options[t]?null:this.options[t];o[t]=i}return this._setOptions(o),this},_setOptions:function(e){var t;for(t in e)this._setOption(t,e[t]);return this},_setOption:function(e,t){return this.options[e]=t,"disabled"===e&&(this.widget().toggleClass(this.widgetFullName+"-disabled",!!t),t&&(this.hoverable.removeClass("ui-state-hover"),this.focusable.removeClass("ui-state-focus"))),this},enable:function(){return this._setOptions({disabled:!1})},disable:function(){return this._setOptions({disabled:!0})},_on:function(t,i,s){var n,a=this;"boolean"!=typeof t&&(s=i,i=t,t=!1),s?(i=n=e(i),this.bindings=this.bindings.add(i)):(s=i,i=this.element,n=this.widget()),e.each(s,function(s,o){function r(){return t||a.options.disabled!==!0&&!e(this).hasClass("ui-state-disabled")?("string"==typeof o?a[o]:o).apply(a,arguments):void 0}"string"!=typeof o&&(r.guid=o.guid=o.guid||r.guid||e.guid++);var h=s.match(/^([\w:-]*)\s*(.*)$/),l=h[1]+a.eventNamespace,u=h[2];u?n.delegate(u,l,r):i.bind(l,r)})},_off:function(t,i){i=(i||"").split(" ").join(this.eventNamespace+" ")+this.eventNamespace,t.unbind(i).undelegate(i),this.bindings=e(this.bindings.not(t).get()),this.focusable=e(this.focusable.not(t).get()),this.hoverable=e(this.hoverable.not(t).get())},_delay:function(e,t){function i(){return("string"==typeof e?s[e]:e).apply(s,arguments)}var s=this;return setTimeout(i,t||0)},_hoverable:function(t){this.hoverable=this.hoverable.add(t),this._on(t,{mouseenter:function(t){e(t.currentTarget).addClass("ui-state-hover")},mouseleave:function(t){e(t.currentTarget).removeClass("ui-state-hover")}})},_focusable:function(t){this.focusable=this.focusable.add(t),this._on(t,{focusin:function(t){e(t.currentTarget).addClass("ui-state-focus")},focusout:function(t){e(t.currentTarget).removeClass("ui-state-focus")}})},_trigger:function(t,i,s){var n,a,o=this.options[t];if(s=s||{},i=e.Event(i),i.type=(t===this.widgetEventPrefix?t:this.widgetEventPrefix+t).toLowerCase(),i.target=this.element[0],a=i.originalEvent)for(n in a)n in i||(i[n]=a[n]);return this.element.trigger(i,s),!(e.isFunction(o)&&o.apply(this.element[0],[i].concat(s))===!1||i.isDefaultPrevented())}},e.each({show:"fadeIn",hide:"fadeOut"},function(t,i){e.Widget.prototype["_"+t]=function(s,n,a){"string"==typeof n&&(n={effect:n});var o,r=n?n===!0||"number"==typeof n?i:n.effect||i:t;n=n||{},"number"==typeof n&&(n={duration:n}),o=!e.isEmptyObject(n),n.complete=a,n.delay&&s.delay(n.delay),o&&e.effects&&e.effects.effect[r]?s[t](n):r!==t&&s[r]?s[r](n.duration,n.easing,a):s.queue(function(i){e(this)[t](),a&&a.call(s[0]),i()})}}),e.widget;var a=!1;e(document).mouseup(function(){a=!1}),e.widget("ui.mouse",{version:"1.11.3",options:{cancel:"input,textarea,button,select,option",distance:1,delay:0},_mouseInit:function(){var t=this;this.element.bind("mousedown."+this.widgetName,function(e){return t._mouseDown(e)}).bind("click."+this.widgetName,function(i){return!0===e.data(i.target,t.widgetName+".preventClickEvent")?(e.removeData(i.target,t.widgetName+".preventClickEvent"),i.stopImmediatePropagation(),!1):void 0}),this.started=!1},_mouseDestroy:function(){this.element.unbind("."+this.widgetName),this._mouseMoveDelegate&&this.document.unbind("mousemove."+this.widgetName,this._mouseMoveDelegate).unbind("mouseup."+this.widgetName,this._mouseUpDelegate)},_mouseDown:function(t){if(!a){this._mouseMoved=!1,this._mouseStarted&&this._mouseUp(t),this._mouseDownEvent=t;var i=this,s=1===t.which,n="string"==typeof this.options.cancel&&t.target.nodeName?e(t.target).closest(this.options.cancel).length:!1;return s&&!n&&this._mouseCapture(t)?(this.mouseDelayMet=!this.options.delay,this.mouseDelayMet||(this._mouseDelayTimer=setTimeout(function(){i.mouseDelayMet=!0},this.options.delay)),this._mouseDistanceMet(t)&&this._mouseDelayMet(t)&&(this._mouseStarted=this._mouseStart(t)!==!1,!this._mouseStarted)?(t.preventDefault(),!0):(!0===e.data(t.target,this.widgetName+".preventClickEvent")&&e.removeData(t.target,this.widgetName+".preventClickEvent"),this._mouseMoveDelegate=function(e){return i._mouseMove(e)},this._mouseUpDelegate=function(e){return i._mouseUp(e)},this.document.bind("mousemove."+this.widgetName,this._mouseMoveDelegate).bind("mouseup."+this.widgetName,this._mouseUpDelegate),t.preventDefault(),a=!0,!0)):!0}},_mouseMove:function(t){if(this._mouseMoved){if(e.ui.ie&&(!document.documentMode||9>document.documentMode)&&!t.button)return this._mouseUp(t);if(!t.which)return this._mouseUp(t)}return(t.which||t.button)&&(this._mouseMoved=!0),this._mouseStarted?(this._mouseDrag(t),t.preventDefault()):(this._mouseDistanceMet(t)&&this._mouseDelayMet(t)&&(this._mouseStarted=this._mouseStart(this._mouseDownEvent,t)!==!1,this._mouseStarted?this._mouseDrag(t):this._mouseUp(t)),!this._mouseStarted)},_mouseUp:function(t){return this.document.unbind("mousemove."+this.widgetName,this._mouseMoveDelegate).unbind("mouseup."+this.widgetName,this._mouseUpDelegate),this._mouseStarted&&(this._mouseStarted=!1,t.target===this._mouseDownEvent.target&&e.data(t.target,this.widgetName+".preventClickEvent",!0),this._mouseStop(t)),a=!1,!1},_mouseDistanceMet:function(e){return Math.max(Math.abs(this._mouseDownEvent.pageX-e.pageX),Math.abs(this._mouseDownEvent.pageY-e.pageY))>=this.options.distance},_mouseDelayMet:function(){return this.mouseDelayMet},_mouseStart:function(){},_mouseDrag:function(){},_mouseStop:function(){},_mouseCapture:function(){return!0}}),function(){function t(e,t,i){return[parseFloat(e[0])*(p.test(e[0])?t/100:1),parseFloat(e[1])*(p.test(e[1])?i/100:1)]}function i(t,i){return parseInt(e.css(t,i),10)||0}function s(t){var i=t[0];return 9===i.nodeType?{width:t.width(),height:t.height(),offset:{top:0,left:0}}:e.isWindow(i)?{width:t.width(),height:t.height(),offset:{top:t.scrollTop(),left:t.scrollLeft()}}:i.preventDefault?{width:0,height:0,offset:{top:i.pageY,left:i.pageX}}:{width:t.outerWidth(),height:t.outerHeight(),offset:t.offset()}}e.ui=e.ui||{};var n,a,o=Math.max,r=Math.abs,h=Math.round,l=/left|center|right/,u=/top|center|bottom/,d=/[\+\-]\d+(\.[\d]+)?%?/,c=/^\w+/,p=/%$/,f=e.fn.position;e.position={scrollbarWidth:function(){if(void 0!==n)return n;var t,i,s=e("<div style='display:block;position:absolute;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>"),a=s.children()[0];return e("body").append(s),t=a.offsetWidth,s.css("overflow","scroll"),i=a.offsetWidth,t===i&&(i=s[0].clientWidth),s.remove(),n=t-i},getScrollInfo:function(t){var i=t.isWindow||t.isDocument?"":t.element.css("overflow-x"),s=t.isWindow||t.isDocument?"":t.element.css("overflow-y"),n="scroll"===i||"auto"===i&&t.width<t.element[0].scrollWidth,a="scroll"===s||"auto"===s&&t.height<t.element[0].scrollHeight;return{width:a?e.position.scrollbarWidth():0,height:n?e.position.scrollbarWidth():0}},getWithinInfo:function(t){var i=e(t||window),s=e.isWindow(i[0]),n=!!i[0]&&9===i[0].nodeType;return{element:i,isWindow:s,isDocument:n,offset:i.offset()||{left:0,top:0},scrollLeft:i.scrollLeft(),scrollTop:i.scrollTop(),width:s||n?i.width():i.outerWidth(),height:s||n?i.height():i.outerHeight()}}},e.fn.position=function(n){if(!n||!n.of)return f.apply(this,arguments);n=e.extend({},n);var p,m,g,v,y,b,_=e(n.of),x=e.position.getWithinInfo(n.within),w=e.position.getScrollInfo(x),k=(n.collision||"flip").split(" "),T={};return b=s(_),_[0].preventDefault&&(n.at="left top"),m=b.width,g=b.height,v=b.offset,y=e.extend({},v),e.each(["my","at"],function(){var e,t,i=(n[this]||"").split(" ");1===i.length&&(i=l.test(i[0])?i.concat(["center"]):u.test(i[0])?["center"].concat(i):["center","center"]),i[0]=l.test(i[0])?i[0]:"center",i[1]=u.test(i[1])?i[1]:"center",e=d.exec(i[0]),t=d.exec(i[1]),T[this]=[e?e[0]:0,t?t[0]:0],n[this]=[c.exec(i[0])[0],c.exec(i[1])[0]]}),1===k.length&&(k[1]=k[0]),"right"===n.at[0]?y.left+=m:"center"===n.at[0]&&(y.left+=m/2),"bottom"===n.at[1]?y.top+=g:"center"===n.at[1]&&(y.top+=g/2),p=t(T.at,m,g),y.left+=p[0],y.top+=p[1],this.each(function(){var s,l,u=e(this),d=u.outerWidth(),c=u.outerHeight(),f=i(this,"marginLeft"),b=i(this,"marginTop"),D=d+f+i(this,"marginRight")+w.width,S=c+b+i(this,"marginBottom")+w.height,N=e.extend({},y),M=t(T.my,u.outerWidth(),u.outerHeight());"right"===n.my[0]?N.left-=d:"center"===n.my[0]&&(N.left-=d/2),"bottom"===n.my[1]?N.top-=c:"center"===n.my[1]&&(N.top-=c/2),N.left+=M[0],N.top+=M[1],a||(N.left=h(N.left),N.top=h(N.top)),s={marginLeft:f,marginTop:b},e.each(["left","top"],function(t,i){e.ui.position[k[t]]&&e.ui.position[k[t]][i](N,{targetWidth:m,targetHeight:g,elemWidth:d,elemHeight:c,collisionPosition:s,collisionWidth:D,collisionHeight:S,offset:[p[0]+M[0],p[1]+M[1]],my:n.my,at:n.at,within:x,elem:u})}),n.using&&(l=function(e){var t=v.left-N.left,i=t+m-d,s=v.top-N.top,a=s+g-c,h={target:{element:_,left:v.left,top:v.top,width:m,height:g},element:{element:u,left:N.left,top:N.top,width:d,height:c},horizontal:0>i?"left":t>0?"right":"center",vertical:0>a?"top":s>0?"bottom":"middle"};d>m&&m>r(t+i)&&(h.horizontal="center"),c>g&&g>r(s+a)&&(h.vertical="middle"),h.important=o(r(t),r(i))>o(r(s),r(a))?"horizontal":"vertical",n.using.call(this,e,h)}),u.offset(e.extend(N,{using:l}))})},e.ui.position={fit:{left:function(e,t){var i,s=t.within,n=s.isWindow?s.scrollLeft:s.offset.left,a=s.width,r=e.left-t.collisionPosition.marginLeft,h=n-r,l=r+t.collisionWidth-a-n;t.collisionWidth>a?h>0&&0>=l?(i=e.left+h+t.collisionWidth-a-n,e.left+=h-i):e.left=l>0&&0>=h?n:h>l?n+a-t.collisionWidth:n:h>0?e.left+=h:l>0?e.left-=l:e.left=o(e.left-r,e.left)},top:function(e,t){var i,s=t.within,n=s.isWindow?s.scrollTop:s.offset.top,a=t.within.height,r=e.top-t.collisionPosition.marginTop,h=n-r,l=r+t.collisionHeight-a-n;t.collisionHeight>a?h>0&&0>=l?(i=e.top+h+t.collisionHeight-a-n,e.top+=h-i):e.top=l>0&&0>=h?n:h>l?n+a-t.collisionHeight:n:h>0?e.top+=h:l>0?e.top-=l:e.top=o(e.top-r,e.top)}},flip:{left:function(e,t){var i,s,n=t.within,a=n.offset.left+n.scrollLeft,o=n.width,h=n.isWindow?n.scrollLeft:n.offset.left,l=e.left-t.collisionPosition.marginLeft,u=l-h,d=l+t.collisionWidth-o-h,c="left"===t.my[0]?-t.elemWidth:"right"===t.my[0]?t.elemWidth:0,p="left"===t.at[0]?t.targetWidth:"right"===t.at[0]?-t.targetWidth:0,f=-2*t.offset[0];0>u?(i=e.left+c+p+f+t.collisionWidth-o-a,(0>i||r(u)>i)&&(e.left+=c+p+f)):d>0&&(s=e.left-t.collisionPosition.marginLeft+c+p+f-h,(s>0||d>r(s))&&(e.left+=c+p+f))},top:function(e,t){var i,s,n=t.within,a=n.offset.top+n.scrollTop,o=n.height,h=n.isWindow?n.scrollTop:n.offset.top,l=e.top-t.collisionPosition.marginTop,u=l-h,d=l+t.collisionHeight-o-h,c="top"===t.my[1],p=c?-t.elemHeight:"bottom"===t.my[1]?t.elemHeight:0,f="top"===t.at[1]?t.targetHeight:"bottom"===t.at[1]?-t.targetHeight:0,m=-2*t.offset[1];0>u?(s=e.top+p+f+m+t.collisionHeight-o-a,(0>s||r(u)>s)&&(e.top+=p+f+m)):d>0&&(i=e.top-t.collisionPosition.marginTop+p+f+m-h,(i>0||d>r(i))&&(e.top+=p+f+m))}},flipfit:{left:function(){e.ui.position.flip.left.apply(this,arguments),e.ui.position.fit.left.apply(this,arguments)},top:function(){e.ui.position.flip.top.apply(this,arguments),e.ui.position.fit.top.apply(this,arguments)}}},function(){var t,i,s,n,o,r=document.getElementsByTagName("body")[0],h=document.createElement("div");t=document.createElement(r?"div":"body"),s={visibility:"hidden",width:0,height:0,border:0,margin:0,background:"none"},r&&e.extend(s,{position:"absolute",left:"-1000px",top:"-1000px"});for(o in s)t.style[o]=s[o];t.appendChild(h),i=r||document.documentElement,i.insertBefore(t,i.firstChild),h.style.cssText="position: absolute; left: 10.7432222px;",n=e(h).offset().left,a=n>10&&11>n,t.innerHTML="",i.removeChild(t)}()}(),e.ui.position,e.widget("ui.draggable",e.ui.mouse,{version:"1.11.3",widgetEventPrefix:"drag",options:{addClasses:!0,appendTo:"parent",axis:!1,connectToSortable:!1,containment:!1,cursor:"auto",cursorAt:!1,grid:!1,handle:!1,helper:"original",iframeFix:!1,opacity:!1,refreshPositions:!1,revert:!1,revertDuration:500,scope:"default",scroll:!0,scrollSensitivity:20,scrollSpeed:20,snap:!1,snapMode:"both",snapTolerance:20,stack:!1,zIndex:!1,drag:null,start:null,stop:null},_create:function(){"original"===this.options.helper&&this._setPositionRelative(),this.options.addClasses&&this.element.addClass("ui-draggable"),this.options.disabled&&this.element.addClass("ui-draggable-disabled"),this._setHandleClassName(),this._mouseInit()},_setOption:function(e,t){this._super(e,t),"handle"===e&&(this._removeHandleClassName(),this._setHandleClassName())},_destroy:function(){return(this.helper||this.element).is(".ui-draggable-dragging")?(this.destroyOnClear=!0,void 0):(this.element.removeClass("ui-draggable ui-draggable-dragging ui-draggable-disabled"),this._removeHandleClassName(),this._mouseDestroy(),void 0)},_mouseCapture:function(t){var i=this.options;return this._blurActiveElement(t),this.helper||i.disabled||e(t.target).closest(".ui-resizable-handle").length>0?!1:(this.handle=this._getHandle(t),this.handle?(this._blockFrames(i.iframeFix===!0?"iframe":i.iframeFix),!0):!1)},_blockFrames:function(t){this.iframeBlocks=this.document.find(t).map(function(){var t=e(this);return e("<div>").css("position","absolute").appendTo(t.parent()).outerWidth(t.outerWidth()).outerHeight(t.outerHeight()).offset(t.offset())[0]})},_unblockFrames:function(){this.iframeBlocks&&(this.iframeBlocks.remove(),delete this.iframeBlocks)},_blurActiveElement:function(t){var i=this.document[0];if(this.handleElement.is(t.target))try{i.activeElement&&"body"!==i.activeElement.nodeName.toLowerCase()&&e(i.activeElement).blur()}catch(s){}},_mouseStart:function(t){var i=this.options;return this.helper=this._createHelper(t),this.helper.addClass("ui-draggable-dragging"),this._cacheHelperProportions(),e.ui.ddmanager&&(e.ui.ddmanager.current=this),this._cacheMargins(),this.cssPosition=this.helper.css("position"),this.scrollParent=this.helper.scrollParent(!0),this.offsetParent=this.helper.offsetParent(),this.hasFixedAncestor=this.helper.parents().filter(function(){return"fixed"===e(this).css("position")}).length>0,this.positionAbs=this.element.offset(),this._refreshOffsets(t),this.originalPosition=this.position=this._generatePosition(t,!1),this.originalPageX=t.pageX,this.originalPageY=t.pageY,i.cursorAt&&this._adjustOffsetFromHelper(i.cursorAt),this._setContainment(),this._trigger("start",t)===!1?(this._clear(),!1):(this._cacheHelperProportions(),e.ui.ddmanager&&!i.dropBehaviour&&e.ui.ddmanager.prepareOffsets(this,t),this._normalizeRightBottom(),this._mouseDrag(t,!0),e.ui.ddmanager&&e.ui.ddmanager.dragStart(this,t),!0)},_refreshOffsets:function(e){this.offset={top:this.positionAbs.top-this.margins.top,left:this.positionAbs.left-this.margins.left,scroll:!1,parent:this._getParentOffset(),relative:this._getRelativeOffset()},this.offset.click={left:e.pageX-this.offset.left,top:e.pageY-this.offset.top}},_mouseDrag:function(t,i){if(this.hasFixedAncestor&&(this.offset.parent=this._getParentOffset()),this.position=this._generatePosition(t,!0),this.positionAbs=this._convertPositionTo("absolute"),!i){var s=this._uiHash();if(this._trigger("drag",t,s)===!1)return this._mouseUp({}),!1;this.position=s.position}return this.helper[0].style.left=this.position.left+"px",this.helper[0].style.top=this.position.top+"px",e.ui.ddmanager&&e.ui.ddmanager.drag(this,t),!1},_mouseStop:function(t){var i=this,s=!1;return e.ui.ddmanager&&!this.options.dropBehaviour&&(s=e.ui.ddmanager.drop(this,t)),this.dropped&&(s=this.dropped,this.dropped=!1),"invalid"===this.options.revert&&!s||"valid"===this.options.revert&&s||this.options.revert===!0||e.isFunction(this.options.revert)&&this.options.revert.call(this.element,s)?e(this.helper).animate(this.originalPosition,parseInt(this.options.revertDuration,10),function(){i._trigger("stop",t)!==!1&&i._clear()}):this._trigger("stop",t)!==!1&&this._clear(),!1},_mouseUp:function(t){return this._unblockFrames(),e.ui.ddmanager&&e.ui.ddmanager.dragStop(this,t),this.handleElement.is(t.target)&&this.element.focus(),e.ui.mouse.prototype._mouseUp.call(this,t)},cancel:function(){return this.helper.is(".ui-draggable-dragging")?this._mouseUp({}):this._clear(),this},_getHandle:function(t){return this.options.handle?!!e(t.target).closest(this.element.find(this.options.handle)).length:!0},_setHandleClassName:function(){this.handleElement=this.options.handle?this.element.find(this.options.handle):this.element,this.handleElement.addClass("ui-draggable-handle")},_removeHandleClassName:function(){this.handleElement.removeClass("ui-draggable-handle")},_createHelper:function(t){var i=this.options,s=e.isFunction(i.helper),n=s?e(i.helper.apply(this.element[0],[t])):"clone"===i.helper?this.element.clone().removeAttr("id"):this.element;return n.parents("body").length||n.appendTo("parent"===i.appendTo?this.element[0].parentNode:i.appendTo),s&&n[0]===this.element[0]&&this._setPositionRelative(),n[0]===this.element[0]||/(fixed|absolute)/.test(n.css("position"))||n.css("position","absolute"),n},_setPositionRelative:function(){/^(?:r|a|f)/.test(this.element.css("position"))||(this.element[0].style.position="relative")},_adjustOffsetFromHelper:function(t){"string"==typeof t&&(t=t.split(" ")),e.isArray(t)&&(t={left:+t[0],top:+t[1]||0}),"left"in t&&(this.offset.click.left=t.left+this.margins.left),"right"in t&&(this.offset.click.left=this.helperProportions.width-t.right+this.margins.left),"top"in t&&(this.offset.click.top=t.top+this.margins.top),"bottom"in t&&(this.offset.click.top=this.helperProportions.height-t.bottom+this.margins.top)},_isRootNode:function(e){return/(html|body)/i.test(e.tagName)||e===this.document[0]},_getParentOffset:function(){var t=this.offsetParent.offset(),i=this.document[0];return"absolute"===this.cssPosition&&this.scrollParent[0]!==i&&e.contains(this.scrollParent[0],this.offsetParent[0])&&(t.left+=this.scrollParent.scrollLeft(),t.top+=this.scrollParent.scrollTop()),this._isRootNode(this.offsetParent[0])&&(t={top:0,left:0}),{top:t.top+(parseInt(this.offsetParent.css("borderTopWidth"),10)||0),left:t.left+(parseInt(this.offsetParent.css("borderLeftWidth"),10)||0)}},_getRelativeOffset:function(){if("relative"!==this.cssPosition)return{top:0,left:0};var e=this.element.position(),t=this._isRootNode(this.scrollParent[0]);return{top:e.top-(parseInt(this.helper.css("top"),10)||0)+(t?0:this.scrollParent.scrollTop()),left:e.left-(parseInt(this.helper.css("left"),10)||0)+(t?0:this.scrollParent.scrollLeft())}},_cacheMargins:function(){this.margins={left:parseInt(this.element.css("marginLeft"),10)||0,top:parseInt(this.element.css("marginTop"),10)||0,right:parseInt(this.element.css("marginRight"),10)||0,bottom:parseInt(this.element.css("marginBottom"),10)||0}},_cacheHelperProportions:function(){this.helperProportions={width:this.helper.outerWidth(),height:this.helper.outerHeight()}},_setContainment:function(){var t,i,s,n=this.options,a=this.document[0];return this.relativeContainer=null,n.containment?"window"===n.containment?(this.containment=[e(window).scrollLeft()-this.offset.relative.left-this.offset.parent.left,e(window).scrollTop()-this.offset.relative.top-this.offset.parent.top,e(window).scrollLeft()+e(window).width()-this.helperProportions.width-this.margins.left,e(window).scrollTop()+(e(window).height()||a.body.parentNode.scrollHeight)-this.helperProportions.height-this.margins.top],void 0):"document"===n.containment?(this.containment=[0,0,e(a).width()-this.helperProportions.width-this.margins.left,(e(a).height()||a.body.parentNode.scrollHeight)-this.helperProportions.height-this.margins.top],void 0):n.containment.constructor===Array?(this.containment=n.containment,void 0):("parent"===n.containment&&(n.containment=this.helper[0].parentNode),i=e(n.containment),s=i[0],s&&(t=/(scroll|auto)/.test(i.css("overflow")),this.containment=[(parseInt(i.css("borderLeftWidth"),10)||0)+(parseInt(i.css("paddingLeft"),10)||0),(parseInt(i.css("borderTopWidth"),10)||0)+(parseInt(i.css("paddingTop"),10)||0),(t?Math.max(s.scrollWidth,s.offsetWidth):s.offsetWidth)-(parseInt(i.css("borderRightWidth"),10)||0)-(parseInt(i.css("paddingRight"),10)||0)-this.helperProportions.width-this.margins.left-this.margins.right,(t?Math.max(s.scrollHeight,s.offsetHeight):s.offsetHeight)-(parseInt(i.css("borderBottomWidth"),10)||0)-(parseInt(i.css("paddingBottom"),10)||0)-this.helperProportions.height-this.margins.top-this.margins.bottom],this.relativeContainer=i),void 0):(this.containment=null,void 0)},_convertPositionTo:function(e,t){t||(t=this.position);var i="absolute"===e?1:-1,s=this._isRootNode(this.scrollParent[0]);return{top:t.top+this.offset.relative.top*i+this.offset.parent.top*i-("fixed"===this.cssPosition?-this.offset.scroll.top:s?0:this.offset.scroll.top)*i,left:t.left+this.offset.relative.left*i+this.offset.parent.left*i-("fixed"===this.cssPosition?-this.offset.scroll.left:s?0:this.offset.scroll.left)*i}},_generatePosition:function(e,t){var i,s,n,a,o=this.options,r=this._isRootNode(this.scrollParent[0]),h=e.pageX,l=e.pageY;return r&&this.offset.scroll||(this.offset.scroll={top:this.scrollParent.scrollTop(),left:this.scrollParent.scrollLeft()}),t&&(this.containment&&(this.relativeContainer?(s=this.relativeContainer.offset(),i=[this.containment[0]+s.left,this.containment[1]+s.top,this.containment[2]+s.left,this.containment[3]+s.top]):i=this.containment,e.pageX-this.offset.click.left<i[0]&&(h=i[0]+this.offset.click.left),e.pageY-this.offset.click.top<i[1]&&(l=i[1]+this.offset.click.top),e.pageX-this.offset.click.left>i[2]&&(h=i[2]+this.offset.click.left),e.pageY-this.offset.click.top>i[3]&&(l=i[3]+this.offset.click.top)),o.grid&&(n=o.grid[1]?this.originalPageY+Math.round((l-this.originalPageY)/o.grid[1])*o.grid[1]:this.originalPageY,l=i?n-this.offset.click.top>=i[1]||n-this.offset.click.top>i[3]?n:n-this.offset.click.top>=i[1]?n-o.grid[1]:n+o.grid[1]:n,a=o.grid[0]?this.originalPageX+Math.round((h-this.originalPageX)/o.grid[0])*o.grid[0]:this.originalPageX,h=i?a-this.offset.click.left>=i[0]||a-this.offset.click.left>i[2]?a:a-this.offset.click.left>=i[0]?a-o.grid[0]:a+o.grid[0]:a),"y"===o.axis&&(h=this.originalPageX),"x"===o.axis&&(l=this.originalPageY)),{top:l-this.offset.click.top-this.offset.relative.top-this.offset.parent.top+("fixed"===this.cssPosition?-this.offset.scroll.top:r?0:this.offset.scroll.top),left:h-this.offset.click.left-this.offset.relative.left-this.offset.parent.left+("fixed"===this.cssPosition?-this.offset.scroll.left:r?0:this.offset.scroll.left)}},_clear:function(){this.helper.removeClass("ui-draggable-dragging"),this.helper[0]===this.element[0]||this.cancelHelperRemoval||this.helper.remove(),this.helper=null,this.cancelHelperRemoval=!1,this.destroyOnClear&&this.destroy()},_normalizeRightBottom:function(){"y"!==this.options.axis&&"auto"!==this.helper.css("right")&&(this.helper.width(this.helper.width()),this.helper.css("right","auto")),"x"!==this.options.axis&&"auto"!==this.helper.css("bottom")&&(this.helper.height(this.helper.height()),this.helper.css("bottom","auto"))},_trigger:function(t,i,s){return s=s||this._uiHash(),e.ui.plugin.call(this,t,[i,s,this],!0),/^(drag|start|stop)/.test(t)&&(this.positionAbs=this._convertPositionTo("absolute"),s.offset=this.positionAbs),e.Widget.prototype._trigger.call(this,t,i,s)},plugins:{},_uiHash:function(){return{helper:this.helper,position:this.position,originalPosition:this.originalPosition,offset:this.positionAbs}}}),e.ui.plugin.add("draggable","connectToSortable",{start:function(t,i,s){var n=e.extend({},i,{item:s.element});s.sortables=[],e(s.options.connectToSortable).each(function(){var i=e(this).sortable("instance");i&&!i.options.disabled&&(s.sortables.push(i),i.refreshPositions(),i._trigger("activate",t,n))})},stop:function(t,i,s){var n=e.extend({},i,{item:s.element});s.cancelHelperRemoval=!1,e.each(s.sortables,function(){var e=this;e.isOver?(e.isOver=0,s.cancelHelperRemoval=!0,e.cancelHelperRemoval=!1,e._storedCSS={position:e.placeholder.css("position"),top:e.placeholder.css("top"),left:e.placeholder.css("left")},e._mouseStop(t),e.options.helper=e.options._helper):(e.cancelHelperRemoval=!0,e._trigger("deactivate",t,n))})},drag:function(t,i,s){e.each(s.sortables,function(){var n=!1,a=this;a.positionAbs=s.positionAbs,a.helperProportions=s.helperProportions,a.offset.click=s.offset.click,a._intersectsWith(a.containerCache)&&(n=!0,e.each(s.sortables,function(){return this.positionAbs=s.positionAbs,this.helperProportions=s.helperProportions,this.offset.click=s.offset.click,this!==a&&this._intersectsWith(this.containerCache)&&e.contains(a.element[0],this.element[0])&&(n=!1),n
})),n?(a.isOver||(a.isOver=1,a.currentItem=i.helper.appendTo(a.element).data("ui-sortable-item",!0),a.options._helper=a.options.helper,a.options.helper=function(){return i.helper[0]},t.target=a.currentItem[0],a._mouseCapture(t,!0),a._mouseStart(t,!0,!0),a.offset.click.top=s.offset.click.top,a.offset.click.left=s.offset.click.left,a.offset.parent.left-=s.offset.parent.left-a.offset.parent.left,a.offset.parent.top-=s.offset.parent.top-a.offset.parent.top,s._trigger("toSortable",t),s.dropped=a.element,e.each(s.sortables,function(){this.refreshPositions()}),s.currentItem=s.element,a.fromOutside=s),a.currentItem&&(a._mouseDrag(t),i.position=a.position)):a.isOver&&(a.isOver=0,a.cancelHelperRemoval=!0,a.options._revert=a.options.revert,a.options.revert=!1,a._trigger("out",t,a._uiHash(a)),a._mouseStop(t,!0),a.options.revert=a.options._revert,a.options.helper=a.options._helper,a.placeholder&&a.placeholder.remove(),s._refreshOffsets(t),i.position=s._generatePosition(t,!0),s._trigger("fromSortable",t),s.dropped=!1,e.each(s.sortables,function(){this.refreshPositions()}))})}}),e.ui.plugin.add("draggable","cursor",{start:function(t,i,s){var n=e("body"),a=s.options;n.css("cursor")&&(a._cursor=n.css("cursor")),n.css("cursor",a.cursor)},stop:function(t,i,s){var n=s.options;n._cursor&&e("body").css("cursor",n._cursor)}}),e.ui.plugin.add("draggable","opacity",{start:function(t,i,s){var n=e(i.helper),a=s.options;n.css("opacity")&&(a._opacity=n.css("opacity")),n.css("opacity",a.opacity)},stop:function(t,i,s){var n=s.options;n._opacity&&e(i.helper).css("opacity",n._opacity)}}),e.ui.plugin.add("draggable","scroll",{start:function(e,t,i){i.scrollParentNotHidden||(i.scrollParentNotHidden=i.helper.scrollParent(!1)),i.scrollParentNotHidden[0]!==i.document[0]&&"HTML"!==i.scrollParentNotHidden[0].tagName&&(i.overflowOffset=i.scrollParentNotHidden.offset())},drag:function(t,i,s){var n=s.options,a=!1,o=s.scrollParentNotHidden[0],r=s.document[0];o!==r&&"HTML"!==o.tagName?(n.axis&&"x"===n.axis||(s.overflowOffset.top+o.offsetHeight-t.pageY<n.scrollSensitivity?o.scrollTop=a=o.scrollTop+n.scrollSpeed:t.pageY-s.overflowOffset.top<n.scrollSensitivity&&(o.scrollTop=a=o.scrollTop-n.scrollSpeed)),n.axis&&"y"===n.axis||(s.overflowOffset.left+o.offsetWidth-t.pageX<n.scrollSensitivity?o.scrollLeft=a=o.scrollLeft+n.scrollSpeed:t.pageX-s.overflowOffset.left<n.scrollSensitivity&&(o.scrollLeft=a=o.scrollLeft-n.scrollSpeed))):(n.axis&&"x"===n.axis||(t.pageY-e(r).scrollTop()<n.scrollSensitivity?a=e(r).scrollTop(e(r).scrollTop()-n.scrollSpeed):e(window).height()-(t.pageY-e(r).scrollTop())<n.scrollSensitivity&&(a=e(r).scrollTop(e(r).scrollTop()+n.scrollSpeed))),n.axis&&"y"===n.axis||(t.pageX-e(r).scrollLeft()<n.scrollSensitivity?a=e(r).scrollLeft(e(r).scrollLeft()-n.scrollSpeed):e(window).width()-(t.pageX-e(r).scrollLeft())<n.scrollSensitivity&&(a=e(r).scrollLeft(e(r).scrollLeft()+n.scrollSpeed)))),a!==!1&&e.ui.ddmanager&&!n.dropBehaviour&&e.ui.ddmanager.prepareOffsets(s,t)}}),e.ui.plugin.add("draggable","snap",{start:function(t,i,s){var n=s.options;s.snapElements=[],e(n.snap.constructor!==String?n.snap.items||":data(ui-draggable)":n.snap).each(function(){var t=e(this),i=t.offset();this!==s.element[0]&&s.snapElements.push({item:this,width:t.outerWidth(),height:t.outerHeight(),top:i.top,left:i.left})})},drag:function(t,i,s){var n,a,o,r,h,l,u,d,c,p,f=s.options,m=f.snapTolerance,g=i.offset.left,v=g+s.helperProportions.width,y=i.offset.top,b=y+s.helperProportions.height;for(c=s.snapElements.length-1;c>=0;c--)h=s.snapElements[c].left-s.margins.left,l=h+s.snapElements[c].width,u=s.snapElements[c].top-s.margins.top,d=u+s.snapElements[c].height,h-m>v||g>l+m||u-m>b||y>d+m||!e.contains(s.snapElements[c].item.ownerDocument,s.snapElements[c].item)?(s.snapElements[c].snapping&&s.options.snap.release&&s.options.snap.release.call(s.element,t,e.extend(s._uiHash(),{snapItem:s.snapElements[c].item})),s.snapElements[c].snapping=!1):("inner"!==f.snapMode&&(n=m>=Math.abs(u-b),a=m>=Math.abs(d-y),o=m>=Math.abs(h-v),r=m>=Math.abs(l-g),n&&(i.position.top=s._convertPositionTo("relative",{top:u-s.helperProportions.height,left:0}).top),a&&(i.position.top=s._convertPositionTo("relative",{top:d,left:0}).top),o&&(i.position.left=s._convertPositionTo("relative",{top:0,left:h-s.helperProportions.width}).left),r&&(i.position.left=s._convertPositionTo("relative",{top:0,left:l}).left)),p=n||a||o||r,"outer"!==f.snapMode&&(n=m>=Math.abs(u-y),a=m>=Math.abs(d-b),o=m>=Math.abs(h-g),r=m>=Math.abs(l-v),n&&(i.position.top=s._convertPositionTo("relative",{top:u,left:0}).top),a&&(i.position.top=s._convertPositionTo("relative",{top:d-s.helperProportions.height,left:0}).top),o&&(i.position.left=s._convertPositionTo("relative",{top:0,left:h}).left),r&&(i.position.left=s._convertPositionTo("relative",{top:0,left:l-s.helperProportions.width}).left)),!s.snapElements[c].snapping&&(n||a||o||r||p)&&s.options.snap.snap&&s.options.snap.snap.call(s.element,t,e.extend(s._uiHash(),{snapItem:s.snapElements[c].item})),s.snapElements[c].snapping=n||a||o||r||p)}}),e.ui.plugin.add("draggable","stack",{start:function(t,i,s){var n,a=s.options,o=e.makeArray(e(a.stack)).sort(function(t,i){return(parseInt(e(t).css("zIndex"),10)||0)-(parseInt(e(i).css("zIndex"),10)||0)});o.length&&(n=parseInt(e(o[0]).css("zIndex"),10)||0,e(o).each(function(t){e(this).css("zIndex",n+t)}),this.css("zIndex",n+o.length))}}),e.ui.plugin.add("draggable","zIndex",{start:function(t,i,s){var n=e(i.helper),a=s.options;n.css("zIndex")&&(a._zIndex=n.css("zIndex")),n.css("zIndex",a.zIndex)},stop:function(t,i,s){var n=s.options;n._zIndex&&e(i.helper).css("zIndex",n._zIndex)}}),e.ui.draggable,e.widget("ui.sortable",e.ui.mouse,{version:"1.11.3",widgetEventPrefix:"sort",ready:!1,options:{appendTo:"parent",axis:!1,connectWith:!1,containment:!1,cursor:"auto",cursorAt:!1,dropOnEmpty:!0,forcePlaceholderSize:!1,forceHelperSize:!1,grid:!1,handle:!1,helper:"original",items:"> *",opacity:!1,placeholder:!1,revert:!1,scroll:!0,scrollSensitivity:20,scrollSpeed:20,scope:"default",tolerance:"intersect",zIndex:1e3,activate:null,beforeStop:null,change:null,deactivate:null,out:null,over:null,receive:null,remove:null,sort:null,start:null,stop:null,update:null},_isOverAxis:function(e,t,i){return e>=t&&t+i>e},_isFloating:function(e){return/left|right/.test(e.css("float"))||/inline|table-cell/.test(e.css("display"))},_create:function(){var e=this.options;this.containerCache={},this.element.addClass("ui-sortable"),this.refresh(),this.floating=this.items.length?"x"===e.axis||this._isFloating(this.items[0].item):!1,this.offset=this.element.offset(),this._mouseInit(),this._setHandleClassName(),this.ready=!0},_setOption:function(e,t){this._super(e,t),"handle"===e&&this._setHandleClassName()},_setHandleClassName:function(){this.element.find(".ui-sortable-handle").removeClass("ui-sortable-handle"),e.each(this.items,function(){(this.instance.options.handle?this.item.find(this.instance.options.handle):this.item).addClass("ui-sortable-handle")})},_destroy:function(){this.element.removeClass("ui-sortable ui-sortable-disabled").find(".ui-sortable-handle").removeClass("ui-sortable-handle"),this._mouseDestroy();for(var e=this.items.length-1;e>=0;e--)this.items[e].item.removeData(this.widgetName+"-item");return this},_mouseCapture:function(t,i){var s=null,n=!1,a=this;return this.reverting?!1:this.options.disabled||"static"===this.options.type?!1:(this._refreshItems(t),e(t.target).parents().each(function(){return e.data(this,a.widgetName+"-item")===a?(s=e(this),!1):void 0}),e.data(t.target,a.widgetName+"-item")===a&&(s=e(t.target)),s?!this.options.handle||i||(e(this.options.handle,s).find("*").addBack().each(function(){this===t.target&&(n=!0)}),n)?(this.currentItem=s,this._removeCurrentsFromItems(),!0):!1:!1)},_mouseStart:function(t,i,s){var n,a,o=this.options;if(this.currentContainer=this,this.refreshPositions(),this.helper=this._createHelper(t),this._cacheHelperProportions(),this._cacheMargins(),this.scrollParent=this.helper.scrollParent(),this.offset=this.currentItem.offset(),this.offset={top:this.offset.top-this.margins.top,left:this.offset.left-this.margins.left},e.extend(this.offset,{click:{left:t.pageX-this.offset.left,top:t.pageY-this.offset.top},parent:this._getParentOffset(),relative:this._getRelativeOffset()}),this.helper.css("position","absolute"),this.cssPosition=this.helper.css("position"),this.originalPosition=this._generatePosition(t),this.originalPageX=t.pageX,this.originalPageY=t.pageY,o.cursorAt&&this._adjustOffsetFromHelper(o.cursorAt),this.domPosition={prev:this.currentItem.prev()[0],parent:this.currentItem.parent()[0]},this.helper[0]!==this.currentItem[0]&&this.currentItem.hide(),this._createPlaceholder(),o.containment&&this._setContainment(),o.cursor&&"auto"!==o.cursor&&(a=this.document.find("body"),this.storedCursor=a.css("cursor"),a.css("cursor",o.cursor),this.storedStylesheet=e("<style>*{ cursor: "+o.cursor+" !important; }</style>").appendTo(a)),o.opacity&&(this.helper.css("opacity")&&(this._storedOpacity=this.helper.css("opacity")),this.helper.css("opacity",o.opacity)),o.zIndex&&(this.helper.css("zIndex")&&(this._storedZIndex=this.helper.css("zIndex")),this.helper.css("zIndex",o.zIndex)),this.scrollParent[0]!==this.document[0]&&"HTML"!==this.scrollParent[0].tagName&&(this.overflowOffset=this.scrollParent.offset()),this._trigger("start",t,this._uiHash()),this._preserveHelperProportions||this._cacheHelperProportions(),!s)for(n=this.containers.length-1;n>=0;n--)this.containers[n]._trigger("activate",t,this._uiHash(this));return e.ui.ddmanager&&(e.ui.ddmanager.current=this),e.ui.ddmanager&&!o.dropBehaviour&&e.ui.ddmanager.prepareOffsets(this,t),this.dragging=!0,this.helper.addClass("ui-sortable-helper"),this._mouseDrag(t),!0},_mouseDrag:function(t){var i,s,n,a,o=this.options,r=!1;for(this.position=this._generatePosition(t),this.positionAbs=this._convertPositionTo("absolute"),this.lastPositionAbs||(this.lastPositionAbs=this.positionAbs),this.options.scroll&&(this.scrollParent[0]!==this.document[0]&&"HTML"!==this.scrollParent[0].tagName?(this.overflowOffset.top+this.scrollParent[0].offsetHeight-t.pageY<o.scrollSensitivity?this.scrollParent[0].scrollTop=r=this.scrollParent[0].scrollTop+o.scrollSpeed:t.pageY-this.overflowOffset.top<o.scrollSensitivity&&(this.scrollParent[0].scrollTop=r=this.scrollParent[0].scrollTop-o.scrollSpeed),this.overflowOffset.left+this.scrollParent[0].offsetWidth-t.pageX<o.scrollSensitivity?this.scrollParent[0].scrollLeft=r=this.scrollParent[0].scrollLeft+o.scrollSpeed:t.pageX-this.overflowOffset.left<o.scrollSensitivity&&(this.scrollParent[0].scrollLeft=r=this.scrollParent[0].scrollLeft-o.scrollSpeed)):(t.pageY-this.document.scrollTop()<o.scrollSensitivity?r=this.document.scrollTop(this.document.scrollTop()-o.scrollSpeed):this.window.height()-(t.pageY-this.document.scrollTop())<o.scrollSensitivity&&(r=this.document.scrollTop(this.document.scrollTop()+o.scrollSpeed)),t.pageX-this.document.scrollLeft()<o.scrollSensitivity?r=this.document.scrollLeft(this.document.scrollLeft()-o.scrollSpeed):this.window.width()-(t.pageX-this.document.scrollLeft())<o.scrollSensitivity&&(r=this.document.scrollLeft(this.document.scrollLeft()+o.scrollSpeed))),r!==!1&&e.ui.ddmanager&&!o.dropBehaviour&&e.ui.ddmanager.prepareOffsets(this,t)),this.positionAbs=this._convertPositionTo("absolute"),this.options.axis&&"y"===this.options.axis||(this.helper[0].style.left=this.position.left+"px"),this.options.axis&&"x"===this.options.axis||(this.helper[0].style.top=this.position.top+"px"),i=this.items.length-1;i>=0;i--)if(s=this.items[i],n=s.item[0],a=this._intersectsWithPointer(s),a&&s.instance===this.currentContainer&&n!==this.currentItem[0]&&this.placeholder[1===a?"next":"prev"]()[0]!==n&&!e.contains(this.placeholder[0],n)&&("semi-dynamic"===this.options.type?!e.contains(this.element[0],n):!0)){if(this.direction=1===a?"down":"up","pointer"!==this.options.tolerance&&!this._intersectsWithSides(s))break;this._rearrange(t,s),this._trigger("change",t,this._uiHash());break}return this._contactContainers(t),e.ui.ddmanager&&e.ui.ddmanager.drag(this,t),this._trigger("sort",t,this._uiHash()),this.lastPositionAbs=this.positionAbs,!1},_mouseStop:function(t,i){if(t){if(e.ui.ddmanager&&!this.options.dropBehaviour&&e.ui.ddmanager.drop(this,t),this.options.revert){var s=this,n=this.placeholder.offset(),a=this.options.axis,o={};a&&"x"!==a||(o.left=n.left-this.offset.parent.left-this.margins.left+(this.offsetParent[0]===this.document[0].body?0:this.offsetParent[0].scrollLeft)),a&&"y"!==a||(o.top=n.top-this.offset.parent.top-this.margins.top+(this.offsetParent[0]===this.document[0].body?0:this.offsetParent[0].scrollTop)),this.reverting=!0,e(this.helper).animate(o,parseInt(this.options.revert,10)||500,function(){s._clear(t)})}else this._clear(t,i);return!1}},cancel:function(){if(this.dragging){this._mouseUp({target:null}),"original"===this.options.helper?this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper"):this.currentItem.show();for(var t=this.containers.length-1;t>=0;t--)this.containers[t]._trigger("deactivate",null,this._uiHash(this)),this.containers[t].containerCache.over&&(this.containers[t]._trigger("out",null,this._uiHash(this)),this.containers[t].containerCache.over=0)}return this.placeholder&&(this.placeholder[0].parentNode&&this.placeholder[0].parentNode.removeChild(this.placeholder[0]),"original"!==this.options.helper&&this.helper&&this.helper[0].parentNode&&this.helper.remove(),e.extend(this,{helper:null,dragging:!1,reverting:!1,_noFinalSort:null}),this.domPosition.prev?e(this.domPosition.prev).after(this.currentItem):e(this.domPosition.parent).prepend(this.currentItem)),this},serialize:function(t){var i=this._getItemsAsjQuery(t&&t.connected),s=[];return t=t||{},e(i).each(function(){var i=(e(t.item||this).attr(t.attribute||"id")||"").match(t.expression||/(.+)[\-=_](.+)/);i&&s.push((t.key||i[1]+"[]")+"="+(t.key&&t.expression?i[1]:i[2]))}),!s.length&&t.key&&s.push(t.key+"="),s.join("&")},toArray:function(t){var i=this._getItemsAsjQuery(t&&t.connected),s=[];return t=t||{},i.each(function(){s.push(e(t.item||this).attr(t.attribute||"id")||"")}),s},_intersectsWith:function(e){var t=this.positionAbs.left,i=t+this.helperProportions.width,s=this.positionAbs.top,n=s+this.helperProportions.height,a=e.left,o=a+e.width,r=e.top,h=r+e.height,l=this.offset.click.top,u=this.offset.click.left,d="x"===this.options.axis||s+l>r&&h>s+l,c="y"===this.options.axis||t+u>a&&o>t+u,p=d&&c;return"pointer"===this.options.tolerance||this.options.forcePointerForContainers||"pointer"!==this.options.tolerance&&this.helperProportions[this.floating?"width":"height"]>e[this.floating?"width":"height"]?p:t+this.helperProportions.width/2>a&&o>i-this.helperProportions.width/2&&s+this.helperProportions.height/2>r&&h>n-this.helperProportions.height/2},_intersectsWithPointer:function(e){var t="x"===this.options.axis||this._isOverAxis(this.positionAbs.top+this.offset.click.top,e.top,e.height),i="y"===this.options.axis||this._isOverAxis(this.positionAbs.left+this.offset.click.left,e.left,e.width),s=t&&i,n=this._getDragVerticalDirection(),a=this._getDragHorizontalDirection();return s?this.floating?a&&"right"===a||"down"===n?2:1:n&&("down"===n?2:1):!1},_intersectsWithSides:function(e){var t=this._isOverAxis(this.positionAbs.top+this.offset.click.top,e.top+e.height/2,e.height),i=this._isOverAxis(this.positionAbs.left+this.offset.click.left,e.left+e.width/2,e.width),s=this._getDragVerticalDirection(),n=this._getDragHorizontalDirection();return this.floating&&n?"right"===n&&i||"left"===n&&!i:s&&("down"===s&&t||"up"===s&&!t)},_getDragVerticalDirection:function(){var e=this.positionAbs.top-this.lastPositionAbs.top;return 0!==e&&(e>0?"down":"up")},_getDragHorizontalDirection:function(){var e=this.positionAbs.left-this.lastPositionAbs.left;return 0!==e&&(e>0?"right":"left")},refresh:function(e){return this._refreshItems(e),this._setHandleClassName(),this.refreshPositions(),this},_connectWith:function(){var e=this.options;return e.connectWith.constructor===String?[e.connectWith]:e.connectWith},_getItemsAsjQuery:function(t){function i(){r.push(this)}var s,n,a,o,r=[],h=[],l=this._connectWith();if(l&&t)for(s=l.length-1;s>=0;s--)for(a=e(l[s],this.document[0]),n=a.length-1;n>=0;n--)o=e.data(a[n],this.widgetFullName),o&&o!==this&&!o.options.disabled&&h.push([e.isFunction(o.options.items)?o.options.items.call(o.element):e(o.options.items,o.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"),o]);for(h.push([e.isFunction(this.options.items)?this.options.items.call(this.element,null,{options:this.options,item:this.currentItem}):e(this.options.items,this.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"),this]),s=h.length-1;s>=0;s--)h[s][0].each(i);return e(r)},_removeCurrentsFromItems:function(){var t=this.currentItem.find(":data("+this.widgetName+"-item)");this.items=e.grep(this.items,function(e){for(var i=0;t.length>i;i++)if(t[i]===e.item[0])return!1;return!0})},_refreshItems:function(t){this.items=[],this.containers=[this];var i,s,n,a,o,r,h,l,u=this.items,d=[[e.isFunction(this.options.items)?this.options.items.call(this.element[0],t,{item:this.currentItem}):e(this.options.items,this.element),this]],c=this._connectWith();if(c&&this.ready)for(i=c.length-1;i>=0;i--)for(n=e(c[i],this.document[0]),s=n.length-1;s>=0;s--)a=e.data(n[s],this.widgetFullName),a&&a!==this&&!a.options.disabled&&(d.push([e.isFunction(a.options.items)?a.options.items.call(a.element[0],t,{item:this.currentItem}):e(a.options.items,a.element),a]),this.containers.push(a));for(i=d.length-1;i>=0;i--)for(o=d[i][1],r=d[i][0],s=0,l=r.length;l>s;s++)h=e(r[s]),h.data(this.widgetName+"-item",o),u.push({item:h,instance:o,width:0,height:0,left:0,top:0})},refreshPositions:function(t){this.offsetParent&&this.helper&&(this.offset.parent=this._getParentOffset());var i,s,n,a;for(i=this.items.length-1;i>=0;i--)s=this.items[i],s.instance!==this.currentContainer&&this.currentContainer&&s.item[0]!==this.currentItem[0]||(n=this.options.toleranceElement?e(this.options.toleranceElement,s.item):s.item,t||(s.width=n.outerWidth(),s.height=n.outerHeight()),a=n.offset(),s.left=a.left,s.top=a.top);if(this.options.custom&&this.options.custom.refreshContainers)this.options.custom.refreshContainers.call(this);else for(i=this.containers.length-1;i>=0;i--)a=this.containers[i].element.offset(),this.containers[i].containerCache.left=a.left,this.containers[i].containerCache.top=a.top,this.containers[i].containerCache.width=this.containers[i].element.outerWidth(),this.containers[i].containerCache.height=this.containers[i].element.outerHeight();return this},_createPlaceholder:function(t){t=t||this;var i,s=t.options;s.placeholder&&s.placeholder.constructor!==String||(i=s.placeholder,s.placeholder={element:function(){var s=t.currentItem[0].nodeName.toLowerCase(),n=e("<"+s+">",t.document[0]).addClass(i||t.currentItem[0].className+" ui-sortable-placeholder").removeClass("ui-sortable-helper");return"tr"===s?t.currentItem.children().each(function(){e("<td>&#160;</td>",t.document[0]).attr("colspan",e(this).attr("colspan")||1).appendTo(n)}):"img"===s&&n.attr("src",t.currentItem.attr("src")),i||n.css("visibility","hidden"),n},update:function(e,n){(!i||s.forcePlaceholderSize)&&(n.height()||n.height(t.currentItem.innerHeight()-parseInt(t.currentItem.css("paddingTop")||0,10)-parseInt(t.currentItem.css("paddingBottom")||0,10)),n.width()||n.width(t.currentItem.innerWidth()-parseInt(t.currentItem.css("paddingLeft")||0,10)-parseInt(t.currentItem.css("paddingRight")||0,10)))}}),t.placeholder=e(s.placeholder.element.call(t.element,t.currentItem)),t.currentItem.after(t.placeholder),s.placeholder.update(t,t.placeholder)},_contactContainers:function(t){var i,s,n,a,o,r,h,l,u,d,c=null,p=null;for(i=this.containers.length-1;i>=0;i--)if(!e.contains(this.currentItem[0],this.containers[i].element[0]))if(this._intersectsWith(this.containers[i].containerCache)){if(c&&e.contains(this.containers[i].element[0],c.element[0]))continue;c=this.containers[i],p=i}else this.containers[i].containerCache.over&&(this.containers[i]._trigger("out",t,this._uiHash(this)),this.containers[i].containerCache.over=0);if(c)if(1===this.containers.length)this.containers[p].containerCache.over||(this.containers[p]._trigger("over",t,this._uiHash(this)),this.containers[p].containerCache.over=1);else{for(n=1e4,a=null,u=c.floating||this._isFloating(this.currentItem),o=u?"left":"top",r=u?"width":"height",d=u?"clientX":"clientY",s=this.items.length-1;s>=0;s--)e.contains(this.containers[p].element[0],this.items[s].item[0])&&this.items[s].item[0]!==this.currentItem[0]&&(h=this.items[s].item.offset()[o],l=!1,t[d]-h>this.items[s][r]/2&&(l=!0),n>Math.abs(t[d]-h)&&(n=Math.abs(t[d]-h),a=this.items[s],this.direction=l?"up":"down"));if(!a&&!this.options.dropOnEmpty)return;if(this.currentContainer===this.containers[p])return this.currentContainer.containerCache.over||(this.containers[p]._trigger("over",t,this._uiHash()),this.currentContainer.containerCache.over=1),void 0;a?this._rearrange(t,a,null,!0):this._rearrange(t,null,this.containers[p].element,!0),this._trigger("change",t,this._uiHash()),this.containers[p]._trigger("change",t,this._uiHash(this)),this.currentContainer=this.containers[p],this.options.placeholder.update(this.currentContainer,this.placeholder),this.containers[p]._trigger("over",t,this._uiHash(this)),this.containers[p].containerCache.over=1}},_createHelper:function(t){var i=this.options,s=e.isFunction(i.helper)?e(i.helper.apply(this.element[0],[t,this.currentItem])):"clone"===i.helper?this.currentItem.clone():this.currentItem;return s.parents("body").length||e("parent"!==i.appendTo?i.appendTo:this.currentItem[0].parentNode)[0].appendChild(s[0]),s[0]===this.currentItem[0]&&(this._storedCSS={width:this.currentItem[0].style.width,height:this.currentItem[0].style.height,position:this.currentItem.css("position"),top:this.currentItem.css("top"),left:this.currentItem.css("left")}),(!s[0].style.width||i.forceHelperSize)&&s.width(this.currentItem.width()),(!s[0].style.height||i.forceHelperSize)&&s.height(this.currentItem.height()),s},_adjustOffsetFromHelper:function(t){"string"==typeof t&&(t=t.split(" ")),e.isArray(t)&&(t={left:+t[0],top:+t[1]||0}),"left"in t&&(this.offset.click.left=t.left+this.margins.left),"right"in t&&(this.offset.click.left=this.helperProportions.width-t.right+this.margins.left),"top"in t&&(this.offset.click.top=t.top+this.margins.top),"bottom"in t&&(this.offset.click.top=this.helperProportions.height-t.bottom+this.margins.top)},_getParentOffset:function(){this.offsetParent=this.helper.offsetParent();var t=this.offsetParent.offset();return"absolute"===this.cssPosition&&this.scrollParent[0]!==this.document[0]&&e.contains(this.scrollParent[0],this.offsetParent[0])&&(t.left+=this.scrollParent.scrollLeft(),t.top+=this.scrollParent.scrollTop()),(this.offsetParent[0]===this.document[0].body||this.offsetParent[0].tagName&&"html"===this.offsetParent[0].tagName.toLowerCase()&&e.ui.ie)&&(t={top:0,left:0}),{top:t.top+(parseInt(this.offsetParent.css("borderTopWidth"),10)||0),left:t.left+(parseInt(this.offsetParent.css("borderLeftWidth"),10)||0)}},_getRelativeOffset:function(){if("relative"===this.cssPosition){var e=this.currentItem.position();return{top:e.top-(parseInt(this.helper.css("top"),10)||0)+this.scrollParent.scrollTop(),left:e.left-(parseInt(this.helper.css("left"),10)||0)+this.scrollParent.scrollLeft()}}return{top:0,left:0}},_cacheMargins:function(){this.margins={left:parseInt(this.currentItem.css("marginLeft"),10)||0,top:parseInt(this.currentItem.css("marginTop"),10)||0}},_cacheHelperProportions:function(){this.helperProportions={width:this.helper.outerWidth(),height:this.helper.outerHeight()}},_setContainment:function(){var t,i,s,n=this.options;"parent"===n.containment&&(n.containment=this.helper[0].parentNode),("document"===n.containment||"window"===n.containment)&&(this.containment=[0-this.offset.relative.left-this.offset.parent.left,0-this.offset.relative.top-this.offset.parent.top,"document"===n.containment?this.document.width():this.window.width()-this.helperProportions.width-this.margins.left,("document"===n.containment?this.document.width():this.window.height()||this.document[0].body.parentNode.scrollHeight)-this.helperProportions.height-this.margins.top]),/^(document|window|parent)$/.test(n.containment)||(t=e(n.containment)[0],i=e(n.containment).offset(),s="hidden"!==e(t).css("overflow"),this.containment=[i.left+(parseInt(e(t).css("borderLeftWidth"),10)||0)+(parseInt(e(t).css("paddingLeft"),10)||0)-this.margins.left,i.top+(parseInt(e(t).css("borderTopWidth"),10)||0)+(parseInt(e(t).css("paddingTop"),10)||0)-this.margins.top,i.left+(s?Math.max(t.scrollWidth,t.offsetWidth):t.offsetWidth)-(parseInt(e(t).css("borderLeftWidth"),10)||0)-(parseInt(e(t).css("paddingRight"),10)||0)-this.helperProportions.width-this.margins.left,i.top+(s?Math.max(t.scrollHeight,t.offsetHeight):t.offsetHeight)-(parseInt(e(t).css("borderTopWidth"),10)||0)-(parseInt(e(t).css("paddingBottom"),10)||0)-this.helperProportions.height-this.margins.top])},_convertPositionTo:function(t,i){i||(i=this.position);var s="absolute"===t?1:-1,n="absolute"!==this.cssPosition||this.scrollParent[0]!==this.document[0]&&e.contains(this.scrollParent[0],this.offsetParent[0])?this.scrollParent:this.offsetParent,a=/(html|body)/i.test(n[0].tagName);return{top:i.top+this.offset.relative.top*s+this.offset.parent.top*s-("fixed"===this.cssPosition?-this.scrollParent.scrollTop():a?0:n.scrollTop())*s,left:i.left+this.offset.relative.left*s+this.offset.parent.left*s-("fixed"===this.cssPosition?-this.scrollParent.scrollLeft():a?0:n.scrollLeft())*s}},_generatePosition:function(t){var i,s,n=this.options,a=t.pageX,o=t.pageY,r="absolute"!==this.cssPosition||this.scrollParent[0]!==this.document[0]&&e.contains(this.scrollParent[0],this.offsetParent[0])?this.scrollParent:this.offsetParent,h=/(html|body)/i.test(r[0].tagName);return"relative"!==this.cssPosition||this.scrollParent[0]!==this.document[0]&&this.scrollParent[0]!==this.offsetParent[0]||(this.offset.relative=this._getRelativeOffset()),this.originalPosition&&(this.containment&&(t.pageX-this.offset.click.left<this.containment[0]&&(a=this.containment[0]+this.offset.click.left),t.pageY-this.offset.click.top<this.containment[1]&&(o=this.containment[1]+this.offset.click.top),t.pageX-this.offset.click.left>this.containment[2]&&(a=this.containment[2]+this.offset.click.left),t.pageY-this.offset.click.top>this.containment[3]&&(o=this.containment[3]+this.offset.click.top)),n.grid&&(i=this.originalPageY+Math.round((o-this.originalPageY)/n.grid[1])*n.grid[1],o=this.containment?i-this.offset.click.top>=this.containment[1]&&i-this.offset.click.top<=this.containment[3]?i:i-this.offset.click.top>=this.containment[1]?i-n.grid[1]:i+n.grid[1]:i,s=this.originalPageX+Math.round((a-this.originalPageX)/n.grid[0])*n.grid[0],a=this.containment?s-this.offset.click.left>=this.containment[0]&&s-this.offset.click.left<=this.containment[2]?s:s-this.offset.click.left>=this.containment[0]?s-n.grid[0]:s+n.grid[0]:s)),{top:o-this.offset.click.top-this.offset.relative.top-this.offset.parent.top+("fixed"===this.cssPosition?-this.scrollParent.scrollTop():h?0:r.scrollTop()),left:a-this.offset.click.left-this.offset.relative.left-this.offset.parent.left+("fixed"===this.cssPosition?-this.scrollParent.scrollLeft():h?0:r.scrollLeft())}},_rearrange:function(e,t,i,s){i?i[0].appendChild(this.placeholder[0]):t.item[0].parentNode.insertBefore(this.placeholder[0],"down"===this.direction?t.item[0]:t.item[0].nextSibling),this.counter=this.counter?++this.counter:1;var n=this.counter;this._delay(function(){n===this.counter&&this.refreshPositions(!s)})},_clear:function(e,t){function i(e,t,i){return function(s){i._trigger(e,s,t._uiHash(t))}}this.reverting=!1;var s,n=[];if(!this._noFinalSort&&this.currentItem.parent().length&&this.placeholder.before(this.currentItem),this._noFinalSort=null,this.helper[0]===this.currentItem[0]){for(s in this._storedCSS)("auto"===this._storedCSS[s]||"static"===this._storedCSS[s])&&(this._storedCSS[s]="");this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper")}else this.currentItem.show();for(this.fromOutside&&!t&&n.push(function(e){this._trigger("receive",e,this._uiHash(this.fromOutside))}),!this.fromOutside&&this.domPosition.prev===this.currentItem.prev().not(".ui-sortable-helper")[0]&&this.domPosition.parent===this.currentItem.parent()[0]||t||n.push(function(e){this._trigger("update",e,this._uiHash())}),this!==this.currentContainer&&(t||(n.push(function(e){this._trigger("remove",e,this._uiHash())}),n.push(function(e){return function(t){e._trigger("receive",t,this._uiHash(this))}}.call(this,this.currentContainer)),n.push(function(e){return function(t){e._trigger("update",t,this._uiHash(this))}}.call(this,this.currentContainer)))),s=this.containers.length-1;s>=0;s--)t||n.push(i("deactivate",this,this.containers[s])),this.containers[s].containerCache.over&&(n.push(i("out",this,this.containers[s])),this.containers[s].containerCache.over=0);if(this.storedCursor&&(this.document.find("body").css("cursor",this.storedCursor),this.storedStylesheet.remove()),this._storedOpacity&&this.helper.css("opacity",this._storedOpacity),this._storedZIndex&&this.helper.css("zIndex","auto"===this._storedZIndex?"":this._storedZIndex),this.dragging=!1,t||this._trigger("beforeStop",e,this._uiHash()),this.placeholder[0].parentNode.removeChild(this.placeholder[0]),this.cancelHelperRemoval||(this.helper[0]!==this.currentItem[0]&&this.helper.remove(),this.helper=null),!t){for(s=0;n.length>s;s++)n[s].call(this,e);this._trigger("stop",e,this._uiHash())}return this.fromOutside=!1,!this.cancelHelperRemoval},_trigger:function(){e.Widget.prototype._trigger.apply(this,arguments)===!1&&this.cancel()},_uiHash:function(t){var i=t||this;return{helper:i.helper,placeholder:i.placeholder||e([]),position:i.position,originalPosition:i.originalPosition,offset:i.positionAbs,item:i.currentItem,sender:t?t.element:null}}}),e.widget("ui.menu",{version:"1.11.3",defaultElement:"<ul>",delay:300,options:{icons:{submenu:"ui-icon-carat-1-e"},items:"> *",menus:"ul",position:{my:"left-1 top",at:"right top"},role:"menu",blur:null,focus:null,select:null},_create:function(){this.activeMenu=this.element,this.mouseHandled=!1,this.element.uniqueId().addClass("ui-menu ui-widget ui-widget-content").toggleClass("ui-menu-icons",!!this.element.find(".ui-icon").length).attr({role:this.options.role,tabIndex:0}),this.options.disabled&&this.element.addClass("ui-state-disabled").attr("aria-disabled","true"),this._on({"mousedown .ui-menu-item":function(e){e.preventDefault()},"click .ui-menu-item":function(t){var i=e(t.target);!this.mouseHandled&&i.not(".ui-state-disabled").length&&(this.select(t),t.isPropagationStopped()||(this.mouseHandled=!0),i.has(".ui-menu").length?this.expand(t):!this.element.is(":focus")&&e(this.document[0].activeElement).closest(".ui-menu").length&&(this.element.trigger("focus",[!0]),this.active&&1===this.active.parents(".ui-menu").length&&clearTimeout(this.timer)))},"mouseenter .ui-menu-item":function(t){if(!this.previousFilter){var i=e(t.currentTarget);i.siblings(".ui-state-active").removeClass("ui-state-active"),this.focus(t,i)}},mouseleave:"collapseAll","mouseleave .ui-menu":"collapseAll",focus:function(e,t){var i=this.active||this.element.find(this.options.items).eq(0);t||this.focus(e,i)},blur:function(t){this._delay(function(){e.contains(this.element[0],this.document[0].activeElement)||this.collapseAll(t)})},keydown:"_keydown"}),this.refresh(),this._on(this.document,{click:function(e){this._closeOnDocumentClick(e)&&this.collapseAll(e),this.mouseHandled=!1}})},_destroy:function(){this.element.removeAttr("aria-activedescendant").find(".ui-menu").addBack().removeClass("ui-menu ui-widget ui-widget-content ui-menu-icons ui-front").removeAttr("role").removeAttr("tabIndex").removeAttr("aria-labelledby").removeAttr("aria-expanded").removeAttr("aria-hidden").removeAttr("aria-disabled").removeUniqueId().show(),this.element.find(".ui-menu-item").removeClass("ui-menu-item").removeAttr("role").removeAttr("aria-disabled").removeUniqueId().removeClass("ui-state-hover").removeAttr("tabIndex").removeAttr("role").removeAttr("aria-haspopup").children().each(function(){var t=e(this);
t.data("ui-menu-submenu-carat")&&t.remove()}),this.element.find(".ui-menu-divider").removeClass("ui-menu-divider ui-widget-content")},_keydown:function(t){var i,s,n,a,o=!0;switch(t.keyCode){case e.ui.keyCode.PAGE_UP:this.previousPage(t);break;case e.ui.keyCode.PAGE_DOWN:this.nextPage(t);break;case e.ui.keyCode.HOME:this._move("first","first",t);break;case e.ui.keyCode.END:this._move("last","last",t);break;case e.ui.keyCode.UP:this.previous(t);break;case e.ui.keyCode.DOWN:this.next(t);break;case e.ui.keyCode.LEFT:this.collapse(t);break;case e.ui.keyCode.RIGHT:this.active&&!this.active.is(".ui-state-disabled")&&this.expand(t);break;case e.ui.keyCode.ENTER:case e.ui.keyCode.SPACE:this._activate(t);break;case e.ui.keyCode.ESCAPE:this.collapse(t);break;default:o=!1,s=this.previousFilter||"",n=String.fromCharCode(t.keyCode),a=!1,clearTimeout(this.filterTimer),n===s?a=!0:n=s+n,i=this._filterMenuItems(n),i=a&&-1!==i.index(this.active.next())?this.active.nextAll(".ui-menu-item"):i,i.length||(n=String.fromCharCode(t.keyCode),i=this._filterMenuItems(n)),i.length?(this.focus(t,i),this.previousFilter=n,this.filterTimer=this._delay(function(){delete this.previousFilter},1e3)):delete this.previousFilter}o&&t.preventDefault()},_activate:function(e){this.active.is(".ui-state-disabled")||(this.active.is("[aria-haspopup='true']")?this.expand(e):this.select(e))},refresh:function(){var t,i,s=this,n=this.options.icons.submenu,a=this.element.find(this.options.menus);this.element.toggleClass("ui-menu-icons",!!this.element.find(".ui-icon").length),a.filter(":not(.ui-menu)").addClass("ui-menu ui-widget ui-widget-content ui-front").hide().attr({role:this.options.role,"aria-hidden":"true","aria-expanded":"false"}).each(function(){var t=e(this),i=t.parent(),s=e("<span>").addClass("ui-menu-icon ui-icon "+n).data("ui-menu-submenu-carat",!0);i.attr("aria-haspopup","true").prepend(s),t.attr("aria-labelledby",i.attr("id"))}),t=a.add(this.element),i=t.find(this.options.items),i.not(".ui-menu-item").each(function(){var t=e(this);s._isDivider(t)&&t.addClass("ui-widget-content ui-menu-divider")}),i.not(".ui-menu-item, .ui-menu-divider").addClass("ui-menu-item").uniqueId().attr({tabIndex:-1,role:this._itemRole()}),i.filter(".ui-state-disabled").attr("aria-disabled","true"),this.active&&!e.contains(this.element[0],this.active[0])&&this.blur()},_itemRole:function(){return{menu:"menuitem",listbox:"option"}[this.options.role]},_setOption:function(e,t){"icons"===e&&this.element.find(".ui-menu-icon").removeClass(this.options.icons.submenu).addClass(t.submenu),"disabled"===e&&this.element.toggleClass("ui-state-disabled",!!t).attr("aria-disabled",t),this._super(e,t)},focus:function(e,t){var i,s;this.blur(e,e&&"focus"===e.type),this._scrollIntoView(t),this.active=t.first(),s=this.active.addClass("ui-state-focus").removeClass("ui-state-active"),this.options.role&&this.element.attr("aria-activedescendant",s.attr("id")),this.active.parent().closest(".ui-menu-item").addClass("ui-state-active"),e&&"keydown"===e.type?this._close():this.timer=this._delay(function(){this._close()},this.delay),i=t.children(".ui-menu"),i.length&&e&&/^mouse/.test(e.type)&&this._startOpening(i),this.activeMenu=t.parent(),this._trigger("focus",e,{item:t})},_scrollIntoView:function(t){var i,s,n,a,o,r;this._hasScroll()&&(i=parseFloat(e.css(this.activeMenu[0],"borderTopWidth"))||0,s=parseFloat(e.css(this.activeMenu[0],"paddingTop"))||0,n=t.offset().top-this.activeMenu.offset().top-i-s,a=this.activeMenu.scrollTop(),o=this.activeMenu.height(),r=t.outerHeight(),0>n?this.activeMenu.scrollTop(a+n):n+r>o&&this.activeMenu.scrollTop(a+n-o+r))},blur:function(e,t){t||clearTimeout(this.timer),this.active&&(this.active.removeClass("ui-state-focus"),this.active=null,this._trigger("blur",e,{item:this.active}))},_startOpening:function(e){clearTimeout(this.timer),"true"===e.attr("aria-hidden")&&(this.timer=this._delay(function(){this._close(),this._open(e)},this.delay))},_open:function(t){var i=e.extend({of:this.active},this.options.position);clearTimeout(this.timer),this.element.find(".ui-menu").not(t.parents(".ui-menu")).hide().attr("aria-hidden","true"),t.show().removeAttr("aria-hidden").attr("aria-expanded","true").position(i)},collapseAll:function(t,i){clearTimeout(this.timer),this.timer=this._delay(function(){var s=i?this.element:e(t&&t.target).closest(this.element.find(".ui-menu"));s.length||(s=this.element),this._close(s),this.blur(t),this.activeMenu=s},this.delay)},_close:function(e){e||(e=this.active?this.active.parent():this.element),e.find(".ui-menu").hide().attr("aria-hidden","true").attr("aria-expanded","false").end().find(".ui-state-active").not(".ui-state-focus").removeClass("ui-state-active")},_closeOnDocumentClick:function(t){return!e(t.target).closest(".ui-menu").length},_isDivider:function(e){return!/[^\-\u2014\u2013\s]/.test(e.text())},collapse:function(e){var t=this.active&&this.active.parent().closest(".ui-menu-item",this.element);t&&t.length&&(this._close(),this.focus(e,t))},expand:function(e){var t=this.active&&this.active.children(".ui-menu ").find(this.options.items).first();t&&t.length&&(this._open(t.parent()),this._delay(function(){this.focus(e,t)}))},next:function(e){this._move("next","first",e)},previous:function(e){this._move("prev","last",e)},isFirstItem:function(){return this.active&&!this.active.prevAll(".ui-menu-item").length},isLastItem:function(){return this.active&&!this.active.nextAll(".ui-menu-item").length},_move:function(e,t,i){var s;this.active&&(s="first"===e||"last"===e?this.active["first"===e?"prevAll":"nextAll"](".ui-menu-item").eq(-1):this.active[e+"All"](".ui-menu-item").eq(0)),s&&s.length&&this.active||(s=this.activeMenu.find(this.options.items)[t]()),this.focus(i,s)},nextPage:function(t){var i,s,n;return this.active?(this.isLastItem()||(this._hasScroll()?(s=this.active.offset().top,n=this.element.height(),this.active.nextAll(".ui-menu-item").each(function(){return i=e(this),0>i.offset().top-s-n}),this.focus(t,i)):this.focus(t,this.activeMenu.find(this.options.items)[this.active?"last":"first"]())),void 0):(this.next(t),void 0)},previousPage:function(t){var i,s,n;return this.active?(this.isFirstItem()||(this._hasScroll()?(s=this.active.offset().top,n=this.element.height(),this.active.prevAll(".ui-menu-item").each(function(){return i=e(this),i.offset().top-s+n>0}),this.focus(t,i)):this.focus(t,this.activeMenu.find(this.options.items).first())),void 0):(this.next(t),void 0)},_hasScroll:function(){return this.element.outerHeight()<this.element.prop("scrollHeight")},select:function(t){this.active=this.active||e(t.target).closest(".ui-menu-item");var i={item:this.active};this.active.has(".ui-menu").length||this.collapseAll(t,!0),this._trigger("select",t,i)},_filterMenuItems:function(t){var i=t.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&"),s=RegExp("^"+i,"i");return this.activeMenu.find(this.options.items).filter(".ui-menu-item").filter(function(){return s.test(e.trim(e(this).text()))})}}),e.widget("ui.autocomplete",{version:"1.11.3",defaultElement:"<input>",options:{appendTo:null,autoFocus:!1,delay:300,minLength:1,position:{my:"left top",at:"left bottom",collision:"none"},source:null,change:null,close:null,focus:null,open:null,response:null,search:null,select:null},requestIndex:0,pending:0,_create:function(){var t,i,s,n=this.element[0].nodeName.toLowerCase(),a="textarea"===n,o="input"===n;this.isMultiLine=a?!0:o?!1:this.element.prop("isContentEditable"),this.valueMethod=this.element[a||o?"val":"text"],this.isNewMenu=!0,this.element.addClass("ui-autocomplete-input").attr("autocomplete","off"),this._on(this.element,{keydown:function(n){if(this.element.prop("readOnly"))return t=!0,s=!0,i=!0,void 0;t=!1,s=!1,i=!1;var a=e.ui.keyCode;switch(n.keyCode){case a.PAGE_UP:t=!0,this._move("previousPage",n);break;case a.PAGE_DOWN:t=!0,this._move("nextPage",n);break;case a.UP:t=!0,this._keyEvent("previous",n);break;case a.DOWN:t=!0,this._keyEvent("next",n);break;case a.ENTER:this.menu.active&&(t=!0,n.preventDefault(),this.menu.select(n));break;case a.TAB:this.menu.active&&this.menu.select(n);break;case a.ESCAPE:this.menu.element.is(":visible")&&(this.isMultiLine||this._value(this.term),this.close(n),n.preventDefault());break;default:i=!0,this._searchTimeout(n)}},keypress:function(s){if(t)return t=!1,(!this.isMultiLine||this.menu.element.is(":visible"))&&s.preventDefault(),void 0;if(!i){var n=e.ui.keyCode;switch(s.keyCode){case n.PAGE_UP:this._move("previousPage",s);break;case n.PAGE_DOWN:this._move("nextPage",s);break;case n.UP:this._keyEvent("previous",s);break;case n.DOWN:this._keyEvent("next",s)}}},input:function(e){return s?(s=!1,e.preventDefault(),void 0):(this._searchTimeout(e),void 0)},focus:function(){this.selectedItem=null,this.previous=this._value()},blur:function(e){return this.cancelBlur?(delete this.cancelBlur,void 0):(clearTimeout(this.searching),this.close(e),this._change(e),void 0)}}),this._initSource(),this.menu=e("<ul>").addClass("ui-autocomplete ui-front").appendTo(this._appendTo()).menu({role:null}).hide().menu("instance"),this._on(this.menu.element,{mousedown:function(t){t.preventDefault(),this.cancelBlur=!0,this._delay(function(){delete this.cancelBlur});var i=this.menu.element[0];e(t.target).closest(".ui-menu-item").length||this._delay(function(){var t=this;this.document.one("mousedown",function(s){s.target===t.element[0]||s.target===i||e.contains(i,s.target)||t.close()})})},menufocus:function(t,i){var s,n;return this.isNewMenu&&(this.isNewMenu=!1,t.originalEvent&&/^mouse/.test(t.originalEvent.type))?(this.menu.blur(),this.document.one("mousemove",function(){e(t.target).trigger(t.originalEvent)}),void 0):(n=i.item.data("ui-autocomplete-item"),!1!==this._trigger("focus",t,{item:n})&&t.originalEvent&&/^key/.test(t.originalEvent.type)&&this._value(n.value),s=i.item.attr("aria-label")||n.value,s&&e.trim(s).length&&(this.liveRegion.children().hide(),e("<div>").text(s).appendTo(this.liveRegion)),void 0)},menuselect:function(e,t){var i=t.item.data("ui-autocomplete-item"),s=this.previous;this.element[0]!==this.document[0].activeElement&&(this.element.focus(),this.previous=s,this._delay(function(){this.previous=s,this.selectedItem=i})),!1!==this._trigger("select",e,{item:i})&&this._value(i.value),this.term=this._value(),this.close(e),this.selectedItem=i}}),this.liveRegion=e("<span>",{role:"status","aria-live":"assertive","aria-relevant":"additions"}).addClass("ui-helper-hidden-accessible").appendTo(this.document[0].body),this._on(this.window,{beforeunload:function(){this.element.removeAttr("autocomplete")}})},_destroy:function(){clearTimeout(this.searching),this.element.removeClass("ui-autocomplete-input").removeAttr("autocomplete"),this.menu.element.remove(),this.liveRegion.remove()},_setOption:function(e,t){this._super(e,t),"source"===e&&this._initSource(),"appendTo"===e&&this.menu.element.appendTo(this._appendTo()),"disabled"===e&&t&&this.xhr&&this.xhr.abort()},_appendTo:function(){var t=this.options.appendTo;return t&&(t=t.jquery||t.nodeType?e(t):this.document.find(t).eq(0)),t&&t[0]||(t=this.element.closest(".ui-front")),t.length||(t=this.document[0].body),t},_initSource:function(){var t,i,s=this;e.isArray(this.options.source)?(t=this.options.source,this.source=function(i,s){s(e.ui.autocomplete.filter(t,i.term))}):"string"==typeof this.options.source?(i=this.options.source,this.source=function(t,n){s.xhr&&s.xhr.abort(),s.xhr=e.ajax({url:i,data:t,dataType:"json",success:function(e){n(e)},error:function(){n([])}})}):this.source=this.options.source},_searchTimeout:function(e){clearTimeout(this.searching),this.searching=this._delay(function(){var t=this.term===this._value(),i=this.menu.element.is(":visible"),s=e.altKey||e.ctrlKey||e.metaKey||e.shiftKey;(!t||t&&!i&&!s)&&(this.selectedItem=null,this.search(null,e))},this.options.delay)},search:function(e,t){return e=null!=e?e:this._value(),this.term=this._value(),e.length<this.options.minLength?this.close(t):this._trigger("search",t)!==!1?this._search(e):void 0},_search:function(e){this.pending++,this.element.addClass("ui-autocomplete-loading"),this.cancelSearch=!1,this.source({term:e},this._response())},_response:function(){var t=++this.requestIndex;return e.proxy(function(e){t===this.requestIndex&&this.__response(e),this.pending--,this.pending||this.element.removeClass("ui-autocomplete-loading")},this)},__response:function(e){e&&(e=this._normalize(e)),this._trigger("response",null,{content:e}),!this.options.disabled&&e&&e.length&&!this.cancelSearch?(this._suggest(e),this._trigger("open")):this._close()},close:function(e){this.cancelSearch=!0,this._close(e)},_close:function(e){this.menu.element.is(":visible")&&(this.menu.element.hide(),this.menu.blur(),this.isNewMenu=!0,this._trigger("close",e))},_change:function(e){this.previous!==this._value()&&this._trigger("change",e,{item:this.selectedItem})},_normalize:function(t){return t.length&&t[0].label&&t[0].value?t:e.map(t,function(t){return"string"==typeof t?{label:t,value:t}:e.extend({},t,{label:t.label||t.value,value:t.value||t.label})})},_suggest:function(t){var i=this.menu.element.empty();this._renderMenu(i,t),this.isNewMenu=!0,this.menu.refresh(),i.show(),this._resizeMenu(),i.position(e.extend({of:this.element},this.options.position)),this.options.autoFocus&&this.menu.next()},_resizeMenu:function(){var e=this.menu.element;e.outerWidth(Math.max(e.width("").outerWidth()+1,this.element.outerWidth()))},_renderMenu:function(t,i){var s=this;e.each(i,function(e,i){s._renderItemData(t,i)})},_renderItemData:function(e,t){return this._renderItem(e,t).data("ui-autocomplete-item",t)},_renderItem:function(t,i){return e("<li>").text(i.label).appendTo(t)},_move:function(e,t){return this.menu.element.is(":visible")?this.menu.isFirstItem()&&/^previous/.test(e)||this.menu.isLastItem()&&/^next/.test(e)?(this.isMultiLine||this._value(this.term),this.menu.blur(),void 0):(this.menu[e](t),void 0):(this.search(null,t),void 0)},widget:function(){return this.menu.element},_value:function(){return this.valueMethod.apply(this.element,arguments)},_keyEvent:function(e,t){(!this.isMultiLine||this.menu.element.is(":visible"))&&(this._move(e,t),t.preventDefault())}}),e.extend(e.ui.autocomplete,{escapeRegex:function(e){return e.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&")},filter:function(t,i){var s=RegExp(e.ui.autocomplete.escapeRegex(i),"i");return e.grep(t,function(e){return s.test(e.label||e.value||e)})}}),e.widget("ui.autocomplete",e.ui.autocomplete,{options:{messages:{noResults:"No search results.",results:function(e){return e+(e>1?" results are":" result is")+" available, use up and down arrow keys to navigate."}}},__response:function(t){var i;this._superApply(arguments),this.options.disabled||this.cancelSearch||(i=t&&t.length?this.options.messages.results(t.length):this.options.messages.noResults,this.liveRegion.children().hide(),e("<div>").text(i).appendTo(this.liveRegion))}}),e.ui.autocomplete,e.widget("ui.slider",e.ui.mouse,{version:"1.11.3",widgetEventPrefix:"slide",options:{animate:!1,distance:0,max:100,min:0,orientation:"horizontal",range:!1,step:1,value:0,values:null,change:null,slide:null,start:null,stop:null},numPages:5,_create:function(){this._keySliding=!1,this._mouseSliding=!1,this._animateOff=!0,this._handleIndex=null,this._detectOrientation(),this._mouseInit(),this._calculateNewMax(),this.element.addClass("ui-slider ui-slider-"+this.orientation+" ui-widget"+" ui-widget-content"+" ui-corner-all"),this._refresh(),this._setOption("disabled",this.options.disabled),this._animateOff=!1},_refresh:function(){this._createRange(),this._createHandles(),this._setupEvents(),this._refreshValue()},_createHandles:function(){var t,i,s=this.options,n=this.element.find(".ui-slider-handle").addClass("ui-state-default ui-corner-all"),a="<span class='ui-slider-handle ui-state-default ui-corner-all' tabindex='0'></span>",o=[];for(i=s.values&&s.values.length||1,n.length>i&&(n.slice(i).remove(),n=n.slice(0,i)),t=n.length;i>t;t++)o.push(a);this.handles=n.add(e(o.join("")).appendTo(this.element)),this.handle=this.handles.eq(0),this.handles.each(function(t){e(this).data("ui-slider-handle-index",t)})},_createRange:function(){var t=this.options,i="";t.range?(t.range===!0&&(t.values?t.values.length&&2!==t.values.length?t.values=[t.values[0],t.values[0]]:e.isArray(t.values)&&(t.values=t.values.slice(0)):t.values=[this._valueMin(),this._valueMin()]),this.range&&this.range.length?this.range.removeClass("ui-slider-range-min ui-slider-range-max").css({left:"",bottom:""}):(this.range=e("<div></div>").appendTo(this.element),i="ui-slider-range ui-widget-header ui-corner-all"),this.range.addClass(i+("min"===t.range||"max"===t.range?" ui-slider-range-"+t.range:""))):(this.range&&this.range.remove(),this.range=null)},_setupEvents:function(){this._off(this.handles),this._on(this.handles,this._handleEvents),this._hoverable(this.handles),this._focusable(this.handles)},_destroy:function(){this.handles.remove(),this.range&&this.range.remove(),this.element.removeClass("ui-slider ui-slider-horizontal ui-slider-vertical ui-widget ui-widget-content ui-corner-all"),this._mouseDestroy()},_mouseCapture:function(t){var i,s,n,a,o,r,h,l,u=this,d=this.options;return d.disabled?!1:(this.elementSize={width:this.element.outerWidth(),height:this.element.outerHeight()},this.elementOffset=this.element.offset(),i={x:t.pageX,y:t.pageY},s=this._normValueFromMouse(i),n=this._valueMax()-this._valueMin()+1,this.handles.each(function(t){var i=Math.abs(s-u.values(t));(n>i||n===i&&(t===u._lastChangedValue||u.values(t)===d.min))&&(n=i,a=e(this),o=t)}),r=this._start(t,o),r===!1?!1:(this._mouseSliding=!0,this._handleIndex=o,a.addClass("ui-state-active").focus(),h=a.offset(),l=!e(t.target).parents().addBack().is(".ui-slider-handle"),this._clickOffset=l?{left:0,top:0}:{left:t.pageX-h.left-a.width()/2,top:t.pageY-h.top-a.height()/2-(parseInt(a.css("borderTopWidth"),10)||0)-(parseInt(a.css("borderBottomWidth"),10)||0)+(parseInt(a.css("marginTop"),10)||0)},this.handles.hasClass("ui-state-hover")||this._slide(t,o,s),this._animateOff=!0,!0))},_mouseStart:function(){return!0},_mouseDrag:function(e){var t={x:e.pageX,y:e.pageY},i=this._normValueFromMouse(t);return this._slide(e,this._handleIndex,i),!1},_mouseStop:function(e){return this.handles.removeClass("ui-state-active"),this._mouseSliding=!1,this._stop(e,this._handleIndex),this._change(e,this._handleIndex),this._handleIndex=null,this._clickOffset=null,this._animateOff=!1,!1},_detectOrientation:function(){this.orientation="vertical"===this.options.orientation?"vertical":"horizontal"},_normValueFromMouse:function(e){var t,i,s,n,a;return"horizontal"===this.orientation?(t=this.elementSize.width,i=e.x-this.elementOffset.left-(this._clickOffset?this._clickOffset.left:0)):(t=this.elementSize.height,i=e.y-this.elementOffset.top-(this._clickOffset?this._clickOffset.top:0)),s=i/t,s>1&&(s=1),0>s&&(s=0),"vertical"===this.orientation&&(s=1-s),n=this._valueMax()-this._valueMin(),a=this._valueMin()+s*n,this._trimAlignValue(a)},_start:function(e,t){var i={handle:this.handles[t],value:this.value()};return this.options.values&&this.options.values.length&&(i.value=this.values(t),i.values=this.values()),this._trigger("start",e,i)},_slide:function(e,t,i){var s,n,a;this.options.values&&this.options.values.length?(s=this.values(t?0:1),2===this.options.values.length&&this.options.range===!0&&(0===t&&i>s||1===t&&s>i)&&(i=s),i!==this.values(t)&&(n=this.values(),n[t]=i,a=this._trigger("slide",e,{handle:this.handles[t],value:i,values:n}),s=this.values(t?0:1),a!==!1&&this.values(t,i))):i!==this.value()&&(a=this._trigger("slide",e,{handle:this.handles[t],value:i}),a!==!1&&this.value(i))},_stop:function(e,t){var i={handle:this.handles[t],value:this.value()};this.options.values&&this.options.values.length&&(i.value=this.values(t),i.values=this.values()),this._trigger("stop",e,i)},_change:function(e,t){if(!this._keySliding&&!this._mouseSliding){var i={handle:this.handles[t],value:this.value()};this.options.values&&this.options.values.length&&(i.value=this.values(t),i.values=this.values()),this._lastChangedValue=t,this._trigger("change",e,i)}},value:function(e){return arguments.length?(this.options.value=this._trimAlignValue(e),this._refreshValue(),this._change(null,0),void 0):this._value()},values:function(t,i){var s,n,a;if(arguments.length>1)return this.options.values[t]=this._trimAlignValue(i),this._refreshValue(),this._change(null,t),void 0;if(!arguments.length)return this._values();if(!e.isArray(arguments[0]))return this.options.values&&this.options.values.length?this._values(t):this.value();for(s=this.options.values,n=arguments[0],a=0;s.length>a;a+=1)s[a]=this._trimAlignValue(n[a]),this._change(null,a);this._refreshValue()},_setOption:function(t,i){var s,n=0;switch("range"===t&&this.options.range===!0&&("min"===i?(this.options.value=this._values(0),this.options.values=null):"max"===i&&(this.options.value=this._values(this.options.values.length-1),this.options.values=null)),e.isArray(this.options.values)&&(n=this.options.values.length),"disabled"===t&&this.element.toggleClass("ui-state-disabled",!!i),this._super(t,i),t){case"orientation":this._detectOrientation(),this.element.removeClass("ui-slider-horizontal ui-slider-vertical").addClass("ui-slider-"+this.orientation),this._refreshValue(),this.handles.css("horizontal"===i?"bottom":"left","");break;case"value":this._animateOff=!0,this._refreshValue(),this._change(null,0),this._animateOff=!1;break;case"values":for(this._animateOff=!0,this._refreshValue(),s=0;n>s;s+=1)this._change(null,s);this._animateOff=!1;break;case"step":case"min":case"max":this._animateOff=!0,this._calculateNewMax(),this._refreshValue(),this._animateOff=!1;break;case"range":this._animateOff=!0,this._refresh(),this._animateOff=!1}},_value:function(){var e=this.options.value;return e=this._trimAlignValue(e)},_values:function(e){var t,i,s;if(arguments.length)return t=this.options.values[e],t=this._trimAlignValue(t);if(this.options.values&&this.options.values.length){for(i=this.options.values.slice(),s=0;i.length>s;s+=1)i[s]=this._trimAlignValue(i[s]);return i}return[]},_trimAlignValue:function(e){if(this._valueMin()>=e)return this._valueMin();if(e>=this._valueMax())return this._valueMax();var t=this.options.step>0?this.options.step:1,i=(e-this._valueMin())%t,s=e-i;return 2*Math.abs(i)>=t&&(s+=i>0?t:-t),parseFloat(s.toFixed(5))},_calculateNewMax:function(){var e=this.options.max,t=this._valueMin(),i=this.options.step,s=Math.floor((e-t)/i)*i;e=s+t,this.max=parseFloat(e.toFixed(this._precision()))},_precision:function(){var e=this._precisionOf(this.options.step);return null!==this.options.min&&(e=Math.max(e,this._precisionOf(this.options.min))),e},_precisionOf:function(e){var t=""+e,i=t.indexOf(".");return-1===i?0:t.length-i-1},_valueMin:function(){return this.options.min},_valueMax:function(){return this.max},_refreshValue:function(){var t,i,s,n,a,o=this.options.range,r=this.options,h=this,l=this._animateOff?!1:r.animate,u={};this.options.values&&this.options.values.length?this.handles.each(function(s){i=100*((h.values(s)-h._valueMin())/(h._valueMax()-h._valueMin())),u["horizontal"===h.orientation?"left":"bottom"]=i+"%",e(this).stop(1,1)[l?"animate":"css"](u,r.animate),h.options.range===!0&&("horizontal"===h.orientation?(0===s&&h.range.stop(1,1)[l?"animate":"css"]({left:i+"%"},r.animate),1===s&&h.range[l?"animate":"css"]({width:i-t+"%"},{queue:!1,duration:r.animate})):(0===s&&h.range.stop(1,1)[l?"animate":"css"]({bottom:i+"%"},r.animate),1===s&&h.range[l?"animate":"css"]({height:i-t+"%"},{queue:!1,duration:r.animate}))),t=i}):(s=this.value(),n=this._valueMin(),a=this._valueMax(),i=a!==n?100*((s-n)/(a-n)):0,u["horizontal"===this.orientation?"left":"bottom"]=i+"%",this.handle.stop(1,1)[l?"animate":"css"](u,r.animate),"min"===o&&"horizontal"===this.orientation&&this.range.stop(1,1)[l?"animate":"css"]({width:i+"%"},r.animate),"max"===o&&"horizontal"===this.orientation&&this.range[l?"animate":"css"]({width:100-i+"%"},{queue:!1,duration:r.animate}),"min"===o&&"vertical"===this.orientation&&this.range.stop(1,1)[l?"animate":"css"]({height:i+"%"},r.animate),"max"===o&&"vertical"===this.orientation&&this.range[l?"animate":"css"]({height:100-i+"%"},{queue:!1,duration:r.animate}))},_handleEvents:{keydown:function(t){var i,s,n,a,o=e(t.target).data("ui-slider-handle-index");switch(t.keyCode){case e.ui.keyCode.HOME:case e.ui.keyCode.END:case e.ui.keyCode.PAGE_UP:case e.ui.keyCode.PAGE_DOWN:case e.ui.keyCode.UP:case e.ui.keyCode.RIGHT:case e.ui.keyCode.DOWN:case e.ui.keyCode.LEFT:if(t.preventDefault(),!this._keySliding&&(this._keySliding=!0,e(t.target).addClass("ui-state-active"),i=this._start(t,o),i===!1))return}switch(a=this.options.step,s=n=this.options.values&&this.options.values.length?this.values(o):this.value(),t.keyCode){case e.ui.keyCode.HOME:n=this._valueMin();break;case e.ui.keyCode.END:n=this._valueMax();break;case e.ui.keyCode.PAGE_UP:n=this._trimAlignValue(s+(this._valueMax()-this._valueMin())/this.numPages);break;case e.ui.keyCode.PAGE_DOWN:n=this._trimAlignValue(s-(this._valueMax()-this._valueMin())/this.numPages);break;case e.ui.keyCode.UP:case e.ui.keyCode.RIGHT:if(s===this._valueMax())return;n=this._trimAlignValue(s+a);break;case e.ui.keyCode.DOWN:case e.ui.keyCode.LEFT:if(s===this._valueMin())return;n=this._trimAlignValue(s-a)}this._slide(t,o,n)},keyup:function(t){var i=e(t.target).data("ui-slider-handle-index");this._keySliding&&(this._keySliding=!1,this._stop(t,i),this._change(t,i),e(t.target).removeClass("ui-state-active"))}}})});
var markerc, markerLayer, featureLayer, markerBounds, disclaimer, map, sat, rect, geojson, markerCount, data, conflict, zoom, pan, bounds, maxBounds, lControl, homeButton, acme, mouseX, innerWidth, dragging, choro_last, $attrSlide, markerClusters, featureMap, shownMarkers;

var $msize = "mic";
var jsons = {};
var checkingTile = false;
var all = 0;
var loadQueue = 0;
var overlayMaps = { };
var choropleths = { };
var baselayers = { };
var dmns = [];
var info = $("#infopane");
var legendpane = $("#legendpane > .legend");
var rtlegend = legendpane.html();
var legend = rtlegend;

var hoverStyle = {
  "fillOpacity": 0.5
};

function pToLayer(obj, latlng, color) {
  point = obj["category"];
  return new L.CircleMarker(latlng, {
    radius: 4
  });
}


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

function initMap () {
  console.log("map init")
  $.each(layers.split(','),function(i,e){
    if (e == "") return false;
    f = e.split('.');
    try {
      baselayers[f[f.length-1].replace(/([A-Z]+)/g, " $1").trim()] = L.tileLayer.provider(e, {minZoom: 1, maxzoom:18});
    } catch(err) {
      console.log(err+": "+e);
    }
  })

  $topflo = ($dir == "ltr") ? "topright" : "topleft";
  $botflo = ($dir == "ltr") ? "bottomright" : "bottomleft";

  markerLayer = L.featureGroup();
  featureLayer = L.featureGroup({interactive:true});
  initLayers = [];

  maxBounds = new L.LatLngBounds(new L.LatLng(90,240), new L.LatLng(-90,-240))
  bounds = maxBounds;

  if (Object.keys(baselayers).length > 0) {
    initLayers.push( baselayers[(Object.keys(baselayers)[0])]);
  }
  initLayers.push(markerLayer)
  initLayers.push(featureLayer)
  map = L.map('map',{
    scrollWheelZoom: $('#map').css('position') == "fixed",
    worldCopyJump: true,
    //maxBounds: maxBounds,
    //maxBounds: [[-90,-270],[90,270]],
    bounceAtZoomLimits: false,
    center: new L.latLng([16,26]),
    zoom: 1,
    minZoom: 1,
    zoomSnap: 0,
    layers: initLayers,
    zoomControl: false,
    //renderer: L.canvas()
  });

  $.each(vectorinfo,function(i,v){
    loadJS(v["vector_datum"]["url"],true)
  });

  if (Object.keys(baselayers).length > 1){ 
    //lControl = L.control.layers(baselayers, overlayMaps).addTo(map); 
    lControl = L.control.layers(baselayers, overlayMaps, {position: $topflo}).addTo(map); 
  }

  if (Object.keys(baselayers).indexOf('World Imagery') >= 0){ 
    baselayers['World Imagery'].on('tileload',function(tile,url){
      if (!checkingTile) {
        checkingTile = true;
        /*
        var req;
        req = $.ajax({
          type: "HEAD",
          url: tile.url,
          success: function() {
            //console.log(req);
            //console.log(req.getAllResponseHeaders());
            setTimeout(function(){checkingTile = false},1000);
          }
        });
        */
      } 
    });
  }

  $(document).on('click','.legend .map-icon, .legend .desc',function(e){
    //console.log(e)
    id = $(e.target).attr('class').match(/i_\d+/)[0].replace('i_','');
    vis = $(this).closest('tr').find('.map-icon').hasClass('vis');
    part = $('.legend .map-icon.vis').length < $('.legend .map-icon').length
    if (e.shiftKey) {
      e.preventDefault();
      toggleLegend(id,vis);
    } else if (vis && part){
      setLegend("0");
    } else {
      setLegend(id);
    }
  });

  $(document).on('click','.vectorlegend .overlays tr',function(e){
    box = $(this).find('input');
    title = $(this).find('td:last')
    name = title.text();
    hit = e.target == box[0];
    chk = box.prop('checked');
    if ((chk && !hit) || (!chk && hit)) {
      box.prop('checked',false);
      map.removeLayer(overlayMaps[name]);
      title.css('font-weight','normal');
    } else if ((chk && hit) || (!chk && !hit)){
      box.prop('checked',true);
      map.addLayer(overlayMaps[name]);
      title.css('font-weight','bold');
    }
  });

  $(document).on('click','.vectorlegend .choropleths tr',function(e){
    if ($(this).hasClass('leg')) return
    $('body').css('cursor','wait !important');
    box = $(this).find('input');
    title = $(this).find('td:last')
    name = title.text();
    hit = e.target == box[0];
    chk = box.prop('checked');
    $('.vectorlegend .choropleths tr td').css('font-weight','normal');
    if (chk && !hit) {
      box.prop('checked',false);
      map.removeLayer(overlayMaps[name]);
      $('.vectorlegend .choropleths tr.leg').hide();
    } else if ((chk && hit) || (!chk && !hit)){
      if (box.attr('id') == choro_last && hit) {
        box.prop('checked',false);
        map.removeLayer(overlayMaps[name]);
        $('.vectorlegend .choropleths tr.leg').hide();
      } else {
        title.css('font-weight','bold');
        $('.vectorlegend .choropleths tr.leg').hide();
        $(this).nextAll('.leg.'+toSlug(name).replace(/\W/g,'')).fadeIn();
        $('.vectorlegend .choropleths .input').prop('checked',false)
        box.prop('checked',true);
        if (map.hasLayer(overlayMaps['Country Data'])) {
          map.removeLayer(overlayMaps['Country Data']);
          $('.vectorlegend .overlays input#checkbox_country_data').prop('checked',false);
          $('.vectorlegend .overlays input#checkbox_country_data').closest('tr').css('font-weight','normal');
        }
        $.each(Object.keys(choropleths),function(i,n){
          if (map.hasLayer(overlayMaps[n])) {
            map.removeLayer(overlayMaps[n]);
          }
        });
        map.addLayer(overlayMaps[name]);
      }
    }
    choro_last = box.attr('id');
    $('body').css('cursor','auto !important');
  });

  //var zoomControl = L.control.zoom({position:'topright'});
  map.removeControl(map.attributionControl)
  L.control.attribution({position: $botflo}).addTo(map);
  var zoomControl = L.control.zoom({position:$topflo});
  map.addControl(zoomControl);
  $(".leaflet-control.leaflet-control-zoom").addClass("leaflet-control-layers");
  var loadingControl = L.Control.loading({
    //position: 'topright',
    position: $topflo,
    zoomControl: zoomControl
  });
  map.addControl(loadingControl);
  var HomeButton = L.Control.extend({
    //options: { position: 'topright' }, 
    options: { position: $topflo }, 
    onAdd: function (map) {
      var container = L.DomUtil.create('div', 'home-button leaflet-control-layers');
      L.DomEvent.addListener(container, 'click', getBack);
      return container;
    }
  });

  homeControl = new HomeButton();
  map.addControl(homeControl);
  if (L.Browser.touch) { $('home-button').addClass('leaflet-touch'); }

  $('.home-button').html('<span class="glyphicon glyphicon-home"></span>')

  //oms = new OverlappingMarkerSpiderfier(map,{keepSpiderfied:true,nearbyDistance:4});
  //oms.legColors.usual = "black";
  //oms.legColors.highlighted = "white";

  map.on('zoomend', function(e) { 
    markerSize();
  });

  $("#map").on("change","input.leaflet-control-layers-selector[type='checkbox']", function (e) {
    if ($(this).prop('checked')) {
      name = $(this).next('span').text().replace(/^\s+/,'')
      if (choropleths[name] != undefined) {
        $.each(Object.keys(choropleths),function(i,n){
          if (name != n && map.hasLayer(overlayMaps[n])) {
            map.removeLayer(overlayMaps[n]);
          }
          if (name == n && !map.hasLayer(overlayMaps[n])) {
            map.addLayer(overlayMaps[n]);
          }
        });
      }
    }
  });

  $('.resize').on('mousedown',function(e){
    e.preventDefault();
    //mouseX = e.pageX;
    mouseX = $dir == "ltr" ? e.pageX : window.innerWidth - e.pageX;
    dragging = true;
    $(".rightpane .inner").css('display','block');
    if ($flo == 'left' && $('.resize span').hasClass('glyphicon-backward')) {
      if (localStorage.key('mapWidth')) { perc = localStorage['mapWidth'] } else { perc = 70 }
      $('.rightpane .inner').show();
      $('.leftpane').animate({'width':perc+"%"});
      $('.rightpane').animate({'width':(100-perc)+'%'});
      $('.resize').animate({$flo:perc+"%"},function(){
        $('.rightpane').css('overflow-x','hidden');
        $('.rightpane').css('overflow-y','auto');
        $('.resize span').removeClass('glyphicon-backward');
        $('.resize span').addClass('glyphicon-forward');
        $('.resize span').css('cursor','e-resize');
        map.invalidateSize();
      });
    } else if ($flo == 'right' && $('.resize span').hasClass('glyphicon-forward')) {
      if (localStorage.key('mapWidth')) { perc = localStorage['mapWidth'] } else { perc = 70 }
      $('.rightpane .inner').show();
      $('.leftpane').animate({'width':perc+"%"});
      $('.rightpane').animate({'width':(100-perc)+'%'});
      $('.resize').animate({$flo:perc+"%"},function(){
        $('.rightpane').css('overflow-x','hidden');
        $('.rightpane').css('overflow-y','auto');
        $('.resize span').removeClass('glyphicon-forward');
        $('.resize span').addClass('glyphicon-backward');
        $('.resize span').css('cursor','e-resize');
        map.invalidateSize();
      });
    }
    $('body').bind('mousemove',function(e){
      px = Math.max(Math.min(Math.max( ($dir == "ltr" ? e.pageX : window.innerWidth - e.pageX ),500),window.innerWidth - 480),500);
      $(".leftpane").css('width',px+'px')
      $("#rightpane").css('width',(window.innerWidth-px)+'px')
      $("#resize").css($flo,(px)+'px')
    });
  });
  $('.resize span').on('mouseup',function(e){
    dragEnd();
  });
  $('body').on('mouseleave',function(e){
    if (dragging) { dragEnd(); }
    $attrSlide = false;
  });
  $('body').on('mouseup',function(e){
    if (dragging) { dragEnd(); }
  });

  $('.resize span').on('click',function(e){
    if ($flo == 'left') {
      if ($(this).hasClass('glyphicon-forward')) {
        $('.leftpane').animate({'width':window.innerWidth - 16});
        $('.rightpane').animate({'width':'16px'});
        $('.resize').animate({'left':window.innerWidth - 16},function(){
          $('.rightpane .inner').hide();
          $('.resize span').removeClass('glyphicon-forward').addClass('glyphicon-backward');
          $('.resize span').css('cursor','w-resize');
          map.invalidateSize();
        });
      } else {
        if (localStorage.key('mapWidth')) { perc = localStorage['mapWidth'] } else { perc = 70 }
        $('.rightpane .inner').show();
        $('.leftpane').animate({'width':perc+"%"});
        $('.rightpane').animate({'width':(100-perc)+'%'});
        $('.resize').animate({'left':perc+"%"},function(){
          $('.rightpane').css('overflow-x','hidden');
          $('.rightpane').css('overflow-y','auto');
          $('.resize span').removeClass('glyphicon-backward').addClass('glyphicon-forward');
          $('.resize span').css('cursor','e-resize');
          onResize();
        });
      }
    } else if ($flo == 'right') {
      if ($(this).hasClass('glyphicon-backward')) {
        $('.leftpane').animate({'width':window.innerWidth - 16});
        $('.rightpane').animate({'width':'16px'});
        $('.resize').animate({'right':window.innerWidth - 16},function(){
          $('.rightpane .inner').hide();
          $('.resize span').removeClass('glyphicon-backward').addClass('glyphicon-forward');
          $('.resize span').css('cursor','e-resize');
          map.invalidateSize();
        });
      } else {
        if (localStorage.key('mapWidth')) { perc = localStorage['mapWidth'] } else { perc = 70 }
        $('.rightpane .inner').show();
        $('.leftpane').animate({'width':perc+"%"});
        $('.rightpane').animate({'width':(100-perc)+'%'});
        $('.resize').animate({'right':perc+"%"},function(){
          $('.rightpane').css('overflow-x','hidden');
          $('.rightpane').css('overflow-y','auto');
          $('.resize span').removeClass('glyphicon-forward').addClass('glyphicon-backward');
          $('.resize span').css('cursor','w-resize');
          onResize();
        });
      }
    }
  })

  $('.rightpane').on('click','.horipane .title',function(e){
    if ($(this).parent().find('.content .block')) {
      elWidth = parseInt($(this).parent().find('.content .block').attr('data-width'));
      if ($('#rightpane .inner').width() < elWidth) {
        perc = 100 - ((elWidth+82) / window.innerWidth * 100);
        $('.rightpane .inner').show();
        $('.leftpane').animate({'width':perc+"%"});
        $('.rightpane').animate({'width':(100-perc)+'%'});
        //$('.resize').animate({'left':perc+"%"},function(){
        $('.resize').animate({$flo:perc+"%"},function(){
          $('.rightpane').css('overflow-x','hidden');
          $('.rightpane').css('overflow-y','auto');
          onResize();
        });
      }
    }
    if($(this).hasClass('active')){
      $(this).next('.content').slideUp();
      $(this).removeClass('active');
    } else {
      $(this).next('.content').slideDown();
      $(this).addClass('active');
      if ($(this).next('.content').find('.columns').length > 0) resetColumns();
      /*$('#rightpane').animate({
        scrollTop: $(this).offset().top
      }, 200);*/
    }
  });

  $('#conflict_summary, .horipane.description').on('click','.seemore',function(e){
    e.preventDefault();
    more = $(this).next('.more');
    $(this).fadeOut(100,function(){more.slideDown();});
  });

  $('#conflict_summary, .horipane.description').on('click','.seeless',function(e){
    e.preventDefault();
    more = $(this).parent().prev('.seemore');
    $(this).parent().slideUp(function(){more.slideDown();});
  });
  
  $('.horipane').on('mouseenter','.conflict-button',function(e){
    id = $(this).data('id');
    selector = '#map .map_icon.id_'+id;
    $(selector).addClass('selected')
    transformItem(selector, 'scale', 1.25);
    $(selector).removeClass('mic').removeClass('min').addClass('hovered');
    if(Object.keys(markerc).indexOf(String(id))>=0) {
      markerc[String(id)].setZIndexOffset(markerCount+1)
      //updateInfo(1,markerc[String(id)].content)
    }
  })
  $('.horipane').on('mouseleave','.conflict-button',function(e){
    selector = '#map .map_icon.id_'+$(this).attr('data-id');
    transformItem(selector, 'scale', 0.8);
    $(selector).removeClass('hovered');
    singleSize(selector);
  })
  
  $('.leaflet-control-attribution').on('mouseenter',function(e){
    $attrSlide = true;
    slideAttribution();
  })
  $('.leaflet-control-attribution').on('mouseleave',function(e){
    $attrSlide = false;
    $(this).css('text-indent',0);
  })
  
  window.onresize = onResize; 

  updateInfo(1,disclaimer);
}

function slideAttribution () {
  return
  c = $('.leaflet-control-attribution');
  //console.log(c.innerWidth()+" "+c.width());
  if (c.innerWidth() > c.width() && $attrSlide ) {
    c.css('width',(c.width()+11)+'px');
    setTimeout(125,slideAttribution());
  } else {
    $attrSlide = false;
    c.css('width','100%');
  }
}

function showMarkers(markers) {
  markerCount = markers.length;
  markerc = {};
  cluster = false;

  var attrhash = attributeHash;
  var arrr = []

  if (cluster) {
    markerClusters = {}
    var cats = categoryHash;
    console.log(cats)
    $.each(cats,function(i,e){
      markerClusters[i]= L.markerClusterGroup({
        showCoverageOnHover: false,
        maxClusterRadius: 64,
        iconCreateFunction: function(cluster) {
          return new L.divIcon({ 
            className: "map_icon cluster i_"+i+" "+$msize,
            //iconSize: [36,36],
            html: '<b>'+cluster.getChildCount() + '</b>' 
          });
        }
      }).addTo(map);
    })
  }

  shownMarkers = 0
  $.each(markers, function(i,mark){
    if (!mark.a || !mark.o) {
      return 0
    }
    if (markers.length == 1){
      var marker = L.marker([mark.a, mark.o],{
          icon: L.divIcon({ className: 'map_icon s_1 i_'+mark.c+' id_'+mark.i+' loc_'+mark.l }),
        riseOnHover: true,
      }).addTo(markerLayer);
      markerc[mark.i] = marker;
      $('.id_'+mark.i).css('cursor','grab');
      $('.id_'+mark.i).css('cursor','-webkit-grab');
      return false
    }
    popcontent = '<div>';
    cclass = "";

    if (featureMap) {
      popcontent += "<div class='features'>";
      $.each(Object.keys(mark),function(i,n){
        if (isNaN(n[0])) return 0
        if (n.match(/^\d+:id$/i)) return 0
        id = parseInt(n.split(':')[0]);
        if (id == fid && mark[n]) {
          if (Object.keys(attrhash).indexOf(n.split(':')[1]) >= 0){
            popcontent += '<br />'+attrhash[n.split(':')[1]].replace(/\sId$/,'')+': <strong>';
          } else {
            popcontent += '<br />'+toTitleCase(n.split(':')[1].replace(/_/g,' '))+': <strong>';
          }
          popcontent += mark[n];
          popcontent += "</strong>";
        }
      })
      popcontent += "<br /><br />"

      if ('dmn' in mark && mark.dmn.length > 0) {
        dmns.push(mark.dmn[0])
        cclass = " c_"+mark.dmn[0];
        $.each(mark.tags,function(i,n){
          popcontent += "<span class='badge' style='background-color:#"+mark.dmn[i]+"'>"+n+"</span> &nbsp; "
        })
      }
      popcontent += "</div>";
    }
    popcontent += '</div>';

    pare = cluster ? markerClusters[mark.c] : markerLayer;
    var marker = L.marker([mark.a, mark.o],{
      icon: L.divIcon({ className: 'map_icon i_'+mark.c+' id_'+mark.i+''+cclass, }),
      riseOnHover: true,
    }).addTo(pare);
    
    $('.map_icon.id_'+mark.i).attr('data-id',mark.i);

    marker.id = mark.i;
    marker.cat = mark.c;
    marker.content = popcontent;
    marker.bindPopup(L.popup({
        autoPanPaddingTopLeft: L.point(24, -90),
        autoPanPaddingBottomRight: L.point(72, 82),
        keepInView: true
      }).setContent('<img src="/images/loading-bg.gif" class="loading"/>'));
    marker.on('mouseover', function(e){
      selector = '#map .map_icon.id_'+marker.id;
      $(selector).addClass('selected')
      transformItem(selector, 'scale', 1.25);
      $(selector).removeClass('mic').removeClass('min').addClass('hovered');
      //updateInfo(1,marker.content);
    });
    marker.on('mouseout', function(e){
      selector = '#map .map_icon.id_'+marker.id;
      transformItem(selector, 'scale', 0.8);
      singleSize(selector);
      $(selector).removeClass('hovered');
    });
    marker.on('click', function(e){
      m = this;
      $.ajax({
        type: "get",
        url: "/info/"+this.id,
        success: function(data){
          m.getPopup().setContent(data+m.content).openOn(map);
        }
      })
    });
    markerc[mark.i] = marker;
    //oms.addMarker(marker);
    arrr.push(mark.i);
    all ++;
    shownMarkers ++;
  });
  map.closePopup();

  $(document).ready(function(){
    onResize();
    if($('.popover').length > 0){
      showPopovers();
    }
    dmns = dmns.distinct();
    if (dmns.length > 0) {
      $.each(dmns,function(i,n){
        $(".c_"+n).css("border","2px solid #"+n);
        $(".c_"+n).css("background-color","#"+n);
      })
    }

    $.each(markerc,function(k,v){
      m = $(".id_"+k);
      m.attr('src',"/")
    })

    if (markerinfo && markerinfo.length == 0) {
      legendpane.hide();
    }
    setTimeout( markerSize, 200);
    setTimeout( mapFit, 200);
  });
  //$('.map_icon').addClass('mic');
  markerSize();
}


function transformItem(selector, property, value) {
  /*matrix = $(selector).css('transform');
  $(selector).css({
    '-webkit-transform' : matrix + property + '(' + value + ')',
    '-moz-transform'    : matrix + property + '(' + value + ')',
    '-ms-transform'     : matrix + property + '(' + value + ')',
    '-o-transform'      : matrix + property + '(' + value + ')',
    'transform'         : matrix + property + '(' + value + ')'
  });*/
}

function onResize() {
  if ($('#map').css('position')=='fixed'){
    map.scrollWheelZoom.enable();
    $('#map').css('height','100%');
    px = Math.max(Math.min(Math.max(parseInt($('#resize').css($flo)),500),window.innerWidth - 480),500);
    console.log(px)
    console.log(px)
    $("#map").css('width',px+'px');
    $("#rightpane").css('width',(window.innerWidth-px)+'px');
    $("#resize").css($flo,px+'px');
  } else {
    map.scrollWheelZoom.disable();
    $('#map').css('height',(window.innerHeight-96)+'px');
    $('.leftpane').css('width','auto');
    $(".rightpane").css('width','auto');
    if ($('body').css('font-size') =='12px'){
      $('.ejatlas-logo, .tagline').bind('click', function(){window.location = "/"});
      $('#map').css('height',(window.innerHeight-108)+'px');
    } else { $('.ejatlas-logo, .tagline').unbind('click'); }
  }
  if ($('#carousel_container').length > 0){resetCarousel();}
  resetColumns();
  dragEnd();
}

function dragEnd() {
  $('body').unbind('mousemove');
  dragging = false;
  if ($('#carousel_container').length > 0){resetCarousel();}
  map.invalidateSize();
  //if (parseInt($('#resize').css("left")) > window.innerWidth - 16) $('#resize').css("left", window.innerWidth - 16)
  if (parseInt($('#resize').css($flo)) > window.innerWidth - 16) $('#resize').css($flo, window.innerWidth - 16)
  mapWidth = document.getElementById('map').style.width
  if (mapWidth.match(/px$/)) {
    mapWidth = Math.ceil(parseInt(mapWidth.replace(/px$/,'')) / window.innerWidth * 100);
  } else {
    mapWidth = parseInt(mapWidth.replace("%",""));
  }
  if (mapWidth * window.innerWidth / 100 <= window.innerWidth - 475 ) {
    localStorage['mapWidth'] = mapWidth;
  } else {
    //console.log(mapWidth)
  }
  resetColumns();
  rightWidth = $('#rightpane .inner').width();
  $.each($('.horipane .block'),function(i,e){
    elWidth = parseInt($(e).attr('data-width'));
    cols = Math.floor(rightWidth / elWidth);
    if ($(e).attr('data-break')=="even" && cols%2 == 1) { cols --; }
    siblings = $(e).closest('.horipane').find('.block').length;
    if (cols == 0) {
      hori = $(e).closest('.horipane');
      hori.find('.title').removeClass('active')
      hori.find('.content').slideUp();
    } else if (cols == 1) {
      $(e).css('width','100%');
      $(e).css('min-width','0');
      $(e).css('float','none');
      $(e).find('.blocked').show();
    } else if (siblings > 1){
      perc = Math.floor(100/Math.min(cols,siblings))
      $(e).css('width',(perc-2)+'%');
      $(e).css('min-width',(perc-2)+'%');
      if ($dir == "ltr") {
        $(e).css('margin-right','2%');
      } else {
        $(e).css('margin-left','2%');
      }
      $(e).css('float',$flo);
      $(e).find('.blocked').hide();
    }
  });
}

function markerFit(ids){
  arr = []
  $.each(markerc,function(k,v){
    if(ids.indexOf(parseInt(k)) >= 0){
      arr.push(v.getLatLng());
    }
  })
  //console.log(arr)
  map.fitBounds(arr,{maxZoom:16});
}

function mapFit(){
  markerBounds = markerLayer.getBounds();
  console.log(markerBounds);
  //console.log(markerBounds)
  if (markerBounds.getSouthWest() == undefined) {
    map.setView([16,26],2);
  } else {
    console.log("padme");
    map.fitBounds(markerBounds,{padding:[8,80]});
  }
}

function markerSize() {
  $('.map_icon').removeClass('mic').removeClass('min');
  if (conflict) { return }
  state = 0
  if (markerCount <= 128) { state ++; }
  if (markerCount <= 16) { state ++; }
  if (map.getZoom() < 3) { state --; }
  if (map.getZoom() > 9) { state ++; }
  switch (state) {
    case -1:
      if (typeof $nomicmark != "undefined") {
        $msize = "min";
        $('.map_icon').addClass('min');
      } else {
        $msize = "mic";
        $('.map_icon').addClass('mic');
      }
      break;
    case 3:
      $msize = "";
      break;
    default:
      $msize = "min";
      $('.map_icon').addClass('min');
  }
}

function singleSize(selector) {
  $(selector).removeClass('mic').removeClass('min');
  if (conflict) { return }
  state = 0
  if (markerCount <= 128) { state ++; }
  if (markerCount <= 16) { state ++; }
  if (map.getZoom() < 3) { state --; }
  if (map.getZoom() > 9) { state ++; }
  switch (state) {
    case -1:
      $(selector).addClass('mic');
      break;
    case 3:
      break;
    default:
      $(selector).addClass('min');
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
    legendpane.html(legend);
  } else {
    info.html(content);
    legendpane.html(legend);
  }
};

function getInfo(id,name,p,z,upd) {
  conflict = true;
  zoom = z;
  marker = markerc[id]
  pan = marker.getLatLng();
  updateInfo(1,marker.content);
  map.setView(pan,zoom);
  if (upd && false) {
    $.getJSON('/table/'+id, function(dat){
      //console.log(dat)
      data = dat;//JSON.parse(dat);
      $('#disclaimer').hide();
      $('#name').html(name);
      $('#conflict_summary').html(data["table"]);
      $('#commands').show();
      $('#conflict_summary').show();
      $('#name').show();
      $('.loading').hide();
    });
  }
}

function getBack() {
  updateInfo(1,disclaimer);
  $('#name').html('');
  $('#name').hide();
  $('#disclaimer').show();
  $('#commands').fadeOut();
  $('.leaflet-marker-icon').show();
  if (conflict) {
    map.setView(pan,zoom);
  } else {
    $('#conflict_summary').hide();
    markerBounds = markerLayer.getBounds();
    map.fitBounds(markerBounds);
  }
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
  if (parseInt(id) > 0) {
    ours = $('.legend .map-icon.i_'+id);
    mics = $('.leaflet-marker-icon.i_'+id);
    $('.legend .map-icon').addClass('hid').removeClass('vis');
    $('.leaflet-marker-icon').hide();
    ours.addClass('vis').removeClass('hid');
    mics.show();
  } else {
    ours = $('.legend .map-icon');
    mics = $('.leaflet-marker-icon');
    ours.removeClass('hid').addClass('vis');
    mics.show();
  }
}

function choropleth(varname) {
  vectorPing(varname)
}

function style(feature) {
  if (feature.pn) {
    chname = feature.pn;
    category = feature.category;
  } else if (feature.properties.pn) {
    chname = feature.properties.pn;
    category = feature.properties.category;
  }
  //console.log(category)
  if (category) {
    dense = choropleths[chname][category]['color'];
  } else {
    keys = Object.keys(choropleths[chname])
    cat = keys[keys.length-1]
    dense = choropleths[chname][cat]['color'];
  }
  dense = dense.replace(/^#/,'');
  return {
    fillColor: "#"+dense,
    weight: 1,
    opacity: 1,
    color: 'white',
    fillOpacity: 0.8
  };
}

function featurePopup(e) {
  var layer = e.target;
  //layer.getPopup().openOn(map);
}

function highlightFeature(e) {
  var layer = e.target;
  layer.setStyle({
    fillOpacity: 1
  });

  $("#map").css("cursor","pointer");

  if (!L.Browser.ie && !L.Browser.opera) {
      layer.bringToFront();
  }
}

function resetHighlight(e) {
  var layer = e.target;
  if (Object.keys(choropleths).indexOf(layer.feature.category) >= 0) {
    layer.setStyle(style(layer.feature));
  } else {
    layer.setStyle(jsons[layer.feature.category]['style']);
  }
  $("#map").css("cursor","");

  if (!L.Browser.ie && !L.Browser.opera) {
    layer.bringToFront();
  }
}

function zoomToFeature(e) {
  map.fitBounds(e.target.getBounds());
}

function onEachFeature(feature, layer) {
  if (Object.keys(feature).indexOf('properties') == -1) {
    pn = feature.pn
  } else {
    pn = feature.properties.pn
  }
  inf = "<div class='maplink darkred'><p><strong>"+pn+"</strong></p></div><div class='scrollme'>";
  ia = []
  if (Object.keys(choropleths).indexOf(layer.feature.category) >= 0) {
    layer.setStyle(style(layer.feature));
  }
  if (layer.feature.properties && layer.feature.properties.data) {
    titled = false;
    if (pn == "Gas Pipelines (Pci 2015)") {
      for ( i = 0; i < Object.keys(layer.feature.properties.data).length; i += 1 ) {
        k = Object.keys(layer.feature.properties.data)[i];
        v = layer.feature.properties.data[k]
        if (v) {
          if (k.match(/country/) && !titled) {
            ia.push("<h3>"+v+"</h3>");
            titled = true;
          } else {
            ia.push("<strong>"+k.replace(/^feature_/,"").replace(/_/g," ").replace(/^\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1)})+":</strong> "+v.replace(/\n+/g,'<br /><br />')+"<br />");
          }
        } 
      }
    } else {
      $.each(layer.feature.properties.data,function(k,v){
        if (v) {
          if (k.match(/country/) && !titled) {
            ia.push("<h3>"+v+"</h3>");
            titled = true;
          } else {
            ia.push("<strong>"+k.replace(/^feature_/,"").replace(/_/g," ").replace(/^\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1)})+":</strong> "+v.replace(/\n+/g,'<br /><br />')+"<br />");
          }
        } 
      });
    }
  }
  if (pn == "Gas Pipelines (Pci 2015)") {console.log(ia)}
  inf += ia.join("<br />");
  if (jsons[pn].desc){ 
    inf += "<p><strong>"+jsons[pn]['desc']+"</strong></p>"; 
  }
  if (jsons[pn].source){ 
    inf += "<p><strong>Source:</strong> &nbsp; "+jsons[pn]['source'];
    if (jsons[pn]['link']){ inf += " &nbsp; <a href='"+jsons[pn]['link']+"' target='_blank'>"+jsons[pn]['link']+"</a>"; }
    inf += "</p>";
  }
  inf += "</div>"
  layer.bindPopup(inf,{
    autoPanPaddingTopLeft: L.point(24, 96),
    autoPanPaddingBottomRight: L.point(72, 64),
    keepInView: true
  });
  layer.on({
    mouseover:highlightFeature,
    mouseout: resetHighlight,
    click: featurePopup,
    dblclick: zoomToFeature,
  });
}

function showVector(v) {
  if (v.features[0].pn) {
    pn = v.features[0].pn;
  } else if (v.features[0].properties.pn) {
    pn = v.features[0].properties.pn;
  } else {
    //console.log('fail - no pn');
    return 0
  }
  vect = $.grep(vectorinfo,function(i,n){return i.vector_datum.name == pn});
  //console.log(vect)
  if(vect.length == 0) {
    //console.log('fail - no vect');
    return 0
  }
  vect = vect[0].vector_datum;
  if(vect['url']==="" || vect.loaded) {
    //console.log('fail - no url');
    return 0
  }
  vectorinfo[vect.rank - 1].vector_datum.loaded = true;
  vr = toSlug(vect['url']);
  ly = eval(vr);
  tl = vect['name']
  jsons[tl] = {features:[]};
  $.each(ly,function(k,v){
    if (k == 'features') {
      $.each(v,function(i,e){
          jsons[tl][k][i] = {};
        $.each(e,function(kk,vv){
          if (kk != 'geometry') {
            jsons[tl][k][i][kk] = vv;
          }
        });
      });
    } else {
      jsons[tl][k] = v;
    }
  });
  jsons[tl]['desc'] = vect['description']
  jsons[tl]['source'] = vect['source']
  jsons[tl]['link'] = vect['link']
  $.each(ly["features"],function(index,feature){
    feature["category"] = tl;
    feature["name"] = vr;
  });
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
    jsons[tl]['style'] = lStyle;
    if (vect.clickable) {
      overlayMaps[tl] = L.geoJson(ly['features'],{interactive: true, style: lStyle, pointToLayer: pToLayer, onEachFeature:onEachFeature});
    } else {
      overlayMaps[tl] = L.geoJson(ly['features'],{interactive: true, style: lStyle, pointToLayer: pToLayer});
    }
  } else {
    lStyle = {};
    sl = toSlug(tl).replace(/\W/g,'');
    choropleths[tl] = JSON.parse(vect['choropleth'])
    sp = '';
    if (vect['shown'] == '1') sp = 'style="display: table-row;"';
    leg = '';
    $.each(choropleths[tl],function(k,v){
      leg += '<tr class="leg '+sl+'" '+sp+'> <td>&nbsp;</td> <td class="icon"> <div class="chorostyle" style="background-color:#'+v['color'].replace(/^#/,'')+'"></div> </td> <td class="chdesc">'+toSentenceCase(v['legend'])+'</td> </tr>';
    });
    leg += '<tr class="leg last '+sl+'" '+sp+'> <td></td><td></td><td></td> </tr>';
    jsons[tl]['legend'] = leg;
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
    jsons[tl]['style'] = lStyle;
    if (vect.clickable) {
      overlayMaps[tl] = L.geoJson(ly['features'],{pointToLayer: pToLayer, onEachFeature:onEachFeature});
    }
  }
  overlayMaps[tl].setZIndex(vectorinfo.length - vect.rank + 1)
  if (vect["shown"] == '1') { overlayMaps[tl].addTo(featureLayer);}
  addOverlay(tl,lStyle,vect)
}

function addOverlay(name,lstyle,vect){
  if ($('#legendpane .vectorlegend').length == 0) {
    $('#legendpane').prepend('<div class="vectorlegend noselect block" data-width=240><table class="overlays"><tbody></tbody></table></div>');
  }
  if (Object.keys(choropleths).indexOf(name) >= 0) {
    if ($('#legendpane .vectorlegend .choropleths').length == 0) {
      $('#legendpane .vectorlegend').append('<table class="choropleths"><tbody></tbody></table>');
    }
    html = "<tr data-rank='"+vect["rank"]+"'><td class='input'><input type='radio' id='radio_"+toSlug(name).replace(/\W/g,'')+"' name='choropleth'"
    if (vect['shown'] == '1') { html += " checked='checked'" }
    html += "></input></td><td class='icon'><div class='chorostyle clearfix'>"
    clength = Object.keys(choropleths[name]).length;
    $.each(choropleths[name],function(k,v){
      html += "<div style='width:"+(16/clength)+"px;background-color:#"+v.color.replace(/^#/,'')+"'>&nbsp;</div>";
    });
    html += "</div></td><td";
    if (vect['shown'] == '1') { html += " style='font-weight:bold'" }
    html += ">"+name+"</td></tr>"
    html += jsons[name].legend.replace("class=\"legend\"","class=\"legend static\"");
    ranks = $("table.choropleths tbody tr").map(function(i,e){return $(e).data("rank")}).toArray();
    if (Math.min.apply(Math,ranks) > vect.rank) {
      $('#legendpane .vectorlegend table.choropleths tbody').prepend(html);
    } else {
      var rank = 0
      $.each(ranks,function(i,e){
        if (e > vect.rank) {
          rank = i-1;
          return false
        }
      })
      if (rank == 0) {
        $('#legendpane .vectorlegend table.choropleths tbody').append(html);
      } else {
        $(html).insertAfter('#legendpane .vectorlegend table.choropleths tbody tr:eq('+rank+')');
      }
    }
  } else {
    stylestr = "{\n"
    $.each(lstyle,function(k,v){
      k = k.replace('color','stroke');
      k = k.replace('fillColor','fill');
      k = k.replace('opacity','stroke-opacity');
      k = k.replace('fillOpacity','fill-opacity');
      k = k.replace('dashArray','stroke-dasharray');
      k = k.replace('weight','stroke-width');
      stylestr += k+":"+v+";\n";
    });
    stylestr += "}"
    html = "<tr data-rank='"+vect["rank"]+"'><td class='input'><input type='checkbox' id='checkbox_"+toSlug(name)+"'"
    if (vect['shown'] == '1') { html += " checked='checked'" }
    if (vect['geometry_type'] == "point") {
      html += "></input></td><td class='icon'><svg id='icon_"+toSlug(name)+"' width=20 height=20 xmlns='http://www.w3.org/2000/svg' viewport='0 0 20 20'><circle r='6' cx='10' cy='10'></circle></svg><style>svg#icon_"+toSlug(name)+" > circle "+stylestr+"</style></td>"
    } else if (vect['geometry_type'] == "line") {
      html += "></input></td><td class='icon'><svg id='icon_"+toSlug(name)+"' width=20 height=20 xmlns='http://www.w3.org/2000/svg' viewport='0 0 20 20'><path d='M 3 2 L 5 7 L 15 10 L 20 20'></rect></svg><style>svg#icon_"+toSlug(name)+" > path "+stylestr+"</style></td>"
    } else {
      html += "></input></td><td class='icon'><svg id='icon_"+toSlug(name)+"' width=20 height=20 xmlns='http://www.w3.org/2000/svg' viewport='0 0 20 20'><rect height='16' rx='4' ry='4' width='16' x='2' y='2'></rect></svg><style>svg#icon_"+toSlug(name)+" > rect "+stylestr+"</style></td>"
    }
    html += "<td";
    if (vect['shown'] == '1') { html += " style='font-weight:bold'" }
    html += ">"+name+"</td></tr>"
    ranks = $("table.overlays tbody tr").map(function(i,e){return $(e).data("rank")}).toArray();
    if (Math.min.apply(Math,ranks) > vect.rank) {
      $('#legendpane .vectorlegend table.overlays tbody').prepend(html);
    } else {
      var rank = 0
      $.each(ranks,function(i,e){
        if (e > vect.rank) {
          rank = i-1;
          return false
        }
      })
      if (rank == 0) {
        $('#legendpane .vectorlegend table.overlays tbody').append(html);
      } else {
        $(html).insertAfter('#legendpane .vectorlegend table.overlays tbody tr:eq('+rank+')');
      }
    }
  }
}

function getObjectSize(obj) {
  var size = 0, key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) size++;
  }
  return size; // return the size of the object
}

function vectorPing(varname) {
  //console.log(varname)
  loadQueue -= 1;
  if (varname.features.length == 0) return
  if (varname.features[0].pn) {
    pn = varname.features[0].pn;
  } else if (varname.features[0].properties.pn) {
    pn = varname.features[0].properties.pn;
  }
  //console.log(loadQueue+' '+varname['features'][0]['pn'])
  showVector(varname);
  if (loadQueue == 0) {
    //console.log('all vectors loaded');
    $('leaflet-control-loading').hide();
  }
}

function loadJS(filename){
  if (/(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/.test(filename)) {
    loadQueue += 1;
    var fileref = document.createElement('script')
    fileref.setAttribute("type","text/javascript")
    fileref.setAttribute("src", filename)
    document.getElementsByTagName("head")[0].appendChild(fileref)
    $('leaflet-control-loading').show();
  }
}
/*
function loadJS(filename,queue){
  $.ajax({
    url: filename,
    type: "GET",
    dataType: 'json',
    cache: true,
    success: function (data, status, error) {
      console.log('success', data);
      vectorPing(data);
    },
    error: function (data, status, error) {
      console.log('error', data, status, error);
    }
  });
}
*/

function pausecomp(millis) {
  var date = new Date();
  var curDate = null;
  do { curDate = new Date(); }
  while(curDate-date < millis);
}
function toTitleCase(str) {
  return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

function toSentenceCase(str) {
  return str.replace(/^\w/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

function render(){
  leafletImage(map, function(err, canvas) {
      var dataURL = canvas.toDataURL("image/png");
      typeof dataURL
      $.post('/image',{image: dataURL},function(data){
        //console.log(data);
      });
  });
}

if (localStorage['pageHits']) {
  localStorage['pageHits'] = parseInt(localStorage['pageHits']) + 1;
  hits = parseInt(localStorage['pageHits']);
  if (hits <= 10 && hits >= 3 && localStorage['surveyAsked'] == "0") {
    $('#survey').modal('show');
    localStorage['pageHits'] = 10;
  }
} else {
  localStorage['pageHits'] = 1;
  localStorage['surveyAsked'] = 0;
}

function toSlug(url) {
  arr = url.split('/');
  return ascii(arr[arr.length-1].split('.')[0].toLowerCase().replace(/-+/g,' ').replace(/^\d+/,'').replace(/\s+/g,'_'));
}

function filterMarkers(m) {
  $.each($('.map .map_icon'),function(i,e){
    index = m.indexOf(parseInt($(e).attr('data-id')));
    if (index < 0 ) { 
      $(e).fadeOut('slow');
    } else {
      $(e).fadeIn('slow');
    }
  });
  markerFit(m);
}

var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-49025282-1']);
_gaq.push(['_trackPageview']);
(function() {
  var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
  ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();
/*
 ### jQuery XML to JSON Plugin v1.3 - 2013-02-18 ###
 * http://www.fyneworks.com/ - diego@fyneworks.com
  * Licensed under http://en.wikipedia.org/wiki/MIT_License
 ###
 Website: http://www.fyneworks.com/jquery/xml-to-json/
*//*
 # INSPIRED BY: http://www.terracoder.com/
           AND: http://www.thomasfrank.se/xml_to_json.html
                      AND: http://www.kawa.net/works/js/xml/objtree-e.html
*//*
 This simple script converts XML (document of code) into a JSON object. It is the combination of 2
 'xml to json' great parsers (see below) which allows for both 'simple' and 'extended' parsing modes.
*/
// Avoid collisions
;if(window.jQuery) (function($){
 
 // Add function to jQuery namespace
 $.extend({
  
  // converts xml documents and xml text to json object
  xml2json: function(xml, extended) {
   if(!xml) return {}; // quick fail
   
   //### PARSER LIBRARY
   // Core function
   function parseXML(node, simple){
    if(!node) return null;
    var txt = '', obj = null, att = null;
    var nt = node.nodeType, nn = jsVar(node.localName || node.nodeName);
    var nv = node.text || node.nodeValue || '';
    /*DBG*/ //if(window.console) console.log(['x2j',nn,nt,nv.length+' bytes']);
    if(node.childNodes){
     if(node.childNodes.length>0){
      /*DBG*/ //if(window.console) console.log(['x2j',nn,'CHILDREN',node.childNodes]);
      $.each(node.childNodes, function(n,cn){
       var cnt = cn.nodeType, cnn = jsVar(cn.localName || cn.nodeName);
       var cnv = cn.text || cn.nodeValue || '';
       /*DBG*/ //if(window.console) console.log(['x2j',nn,'node>a',cnn,cnt,cnv]);
       if(cnt == 8){
        /*DBG*/ //if(window.console) console.log(['x2j',nn,'node>b',cnn,'COMMENT (ignore)']);
        return; // ignore comment node
       }
       else if(cnt == 3 || cnt == 4 || !cnn){
        // ignore white-space in between tags
        if(cnv.match(/^\s+$/)){
         /*DBG*/ //if(window.console) console.log(['x2j',nn,'node>c',cnn,'WHITE-SPACE (ignore)']);
         return;
        };
        /*DBG*/ //if(window.console) console.log(['x2j',nn,'node>d',cnn,'TEXT']);
        txt += cnv.replace(/^\s+/,'').replace(/\s+$/,'');
                // make sure we ditch trailing spaces from markup
       }
       else{
        /*DBG*/ //if(window.console) console.log(['x2j',nn,'node>e',cnn,'OBJECT']);
        obj = obj || {};
        if(obj[cnn]){
         /*DBG*/ //if(window.console) console.log(['x2j',nn,'node>f',cnn,'ARRAY']);
         
                  // http://forum.jquery.com/topic/jquery-jquery-xml2json-problems-when-siblings-of-the-same-tagname-only-have-a-textnode-as-a-child
                  if(!obj[cnn].length) obj[cnn] = myArr(obj[cnn]);
                  obj[cnn] = myArr(obj[cnn]);
         
                  obj[cnn][ obj[cnn].length ] = parseXML(cn, true/* simple */);
         obj[cnn].length = obj[cnn].length;
        }
        else{
         /*DBG*/ //if(window.console) console.log(['x2j',nn,'node>g',cnn,'dig deeper...']);
         obj[cnn] = parseXML(cn);
        };
       };
      });
     };//node.childNodes.length>0
    };//node.childNodes
    if(node.attributes){
     if(node.attributes.length>0){
      /*DBG*/ //if(window.console) console.log(['x2j',nn,'ATTRIBUTES',node.attributes])
      att = {}; obj = obj || {};
      $.each(node.attributes, function(a,at){
       var atn = jsVar(at.name), atv = at.value;
       att[atn] = atv;
       if(obj[atn]){
        /*DBG*/ //if(window.console) console.log(['x2j',nn,'attr>',atn,'ARRAY']);
        
                // http://forum.jquery.com/topic/jquery-jquery-xml2json-problems-when-siblings-of-the-same-tagname-only-have-a-textnode-as-a-child
                //if(!obj[atn].length) obj[atn] = myArr(obj[atn]);//[ obj[ atn ] ];
        obj[cnn] = myArr(obj[cnn]);
                
                obj[atn][ obj[atn].length ] = atv;
        obj[atn].length = obj[atn].length;
       }
       else{
        /*DBG*/ //if(window.console) console.log(['x2j',nn,'attr>',atn,'TEXT']);
        obj[atn] = atv;
       };
      });
      //obj['attributes'] = att;
     };//node.attributes.length>0
    };//node.attributes
    if(obj){
     obj = $.extend( (txt!='' ? new String(txt) : {}),/* {text:txt},*/ obj || {}/*, att || {}*/);
     //txt = (obj.text) ? (typeof(obj.text)=='object' ? obj.text : [obj.text || '']).concat([txt]) : txt;
     txt = (obj.text) ? ([obj.text || '']).concat([txt]) : txt;
     if(txt) obj.text = txt;
     txt = '';
    };
    var out = obj || txt;
    //console.log([extended, simple, out]);
    if(extended){
     if(txt) out = {};//new String(out);
     txt = out.text || txt || '';
     if(txt) out.text = txt;
     if(!simple) out = myArr(out);
    };
    return out;
   };// parseXML
   // Core Function End
   // Utility functions
   var jsVar = function(s){ return String(s || '').replace(/-/g,"_"); };
   
      // NEW isNum function: 01/09/2010
      // Thanks to Emile Grau, GigaTecnologies S.L., www.gigatransfer.com, www.mygigamail.com
      function isNum(s){
        // based on utility function isNum from xml2json plugin (http://www.fyneworks.com/ - diego@fyneworks.com)
        // few bugs corrected from original function :
        // - syntax error : regexp.test(string) instead of string.test(reg)
        // - regexp modified to accept  comma as decimal mark (latin syntax : 25,24 )
        // - regexp modified to reject if no number before decimal mark  : ".7" is not accepted
        // - string is "trimmed", allowing to accept space at the beginning and end of string
        var regexp=/^((-)?([0-9]+)(([\.\,]{0,1})([0-9]+))?$)/
        return (typeof s == "number") || regexp.test(String((s && typeof s == "string") ? jQuery.trim(s) : ''));
      };
      // OLD isNum function: (for reference only)
      //var isNum = function(s){ return (typeof s == "number") || String((s && typeof s == "string") ? s : '').test(/^((-)?([0-9]*)((\.{0,1})([0-9]+))?$)/); };
                                
   var myArr = function(o){
    
        // http://forum.jquery.com/topic/jquery-jquery-xml2json-problems-when-siblings-of-the-same-tagname-only-have-a-textnode-as-a-child
        //if(!o.length) o = [ o ]; o.length=o.length;
    if(!$.isArray(o)) o = [ o ]; o.length=o.length;
        
        // here is where you can attach additional functionality, such as searching and sorting...
    return o;
   };
   // Utility functions End
   //### PARSER LIBRARY END
   
   // Convert plain text to xml
   if(typeof xml=='string') xml = $.text2xml(xml);
   
   // Quick fail if not xml (or if this is a node)
   if(!xml.nodeType) return;
   if(xml.nodeType == 3 || xml.nodeType == 4) return xml.nodeValue;
   
   // Find xml root node
   var root = (xml.nodeType == 9) ? xml.documentElement : xml;
   
   // Convert xml to json
   var out = parseXML(root, true /* simple */);
   
   // Clean-up memory
   xml = null; root = null;
   
   // Send output
   return out;
  },
  
  // Convert text to XML DOM
  text2xml: function(str) {
   // NOTE: I'd like to use jQuery for this, but jQuery makes all tags uppercase
   //return $(xml)[0];
   
   /* prior to jquery 1.9 */
   /*
   var out;
   try{
    var xml = ((!$.support.opacity && !$.support.style))?new ActiveXObject("Microsoft.XMLDOM"):new DOMParser();
    xml.async = false;
   }catch(e){ throw new Error("XML Parser could not be instantiated") };
   try{
    if((!$.support.opacity && !$.support.style)) out = (xml.loadXML(str))?xml:false;
    else out = xml.parseFromString(str, "text/xml");
   }catch(e){ throw new Error("Error parsing XML string") };
   return out;
   */

   /* jquery 1.9+ */
   return $.parseXML(str);
  }
    
 }); // extend $

})(jQuery);

