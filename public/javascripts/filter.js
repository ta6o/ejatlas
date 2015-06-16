
function filterMarkers(filter) {
  //console.log(filter);
  if (filter.length == 0 || (filter.length == 1 && filter[0] == "")) {
    markers = [];
    $.each(filterinfo,function(i,v){
      markers.push(v["id"]);
    });
    showMarkers(markers);
  } else {
    query = [];
    ops = {"=":"==","-g=":">","-l=":"<"};
    $.each(filter,function(i,v){
      r = v.split(/(=|-g=|-l=)/)
      query.push('n["'+r[0]+'"]'+ops[r[1]]+'["'+r[2]+'"]');
    });
    command = "("+query.join(" && ")+")";
    result = grepFields(command);
    markers = [];
    $.each(result,function(i,v){
      markers.push(v["id"]);
    });
    showMarkers(markers);
  }
}

function grepFields (command) {
  result = $.grep(filterinfo,function(n,i){
    return eval(command);
  });
  return result
}
function showMarkers (ids) {
  updateInfo(1, ids.length+" cases filtered." )
  classes = ".id_"+ids.join(", .id_");
  //console.log(classes)
  $('.leaflet-marker-icon').hide();
  $(classes).show();
}


$(document).ready(function(){
  $('#filterlink button').on('click',function(){
    //window.location = "#filter-row";
    $('#filter-row .dnone').slideDown()
  });
});
