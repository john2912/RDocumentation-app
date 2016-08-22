$(document).ready(function() {
  $.getScript("http://code.jquery.com/ui/1.12.0/jquery-ui.js", function(){
    window.triggerIcon();
    $("#show").click(function(){
      $("#show").hide();
      $("#details").find(".hidden").removeClass("hidden");
    });
    window.packageVersionToggleHandler();
    window.activateTabs("#tabs");
    window.launchFullSearch();
  });
  $.getScript("http://cdnjs.cloudflare.com/ajax/libs/d3/3.5.17/d3.min.js",function(){
    $.getScript("http://cdnjs.cloudflare.com/ajax/libs/nvd3/1.8.3/nv.d3.min.js",function(){
      window.makeSlider();
      window.bindTabs();
      window.trendingPackagesLastWeek();
      trendingKeywords();
      dependencyGraph();
    });
  });
  $.getScript("http://cdnjs.cloudflare.com/ajax/libs/jquery.tablesorter/2.27.2/js/jquery.tablesorter.js",function(){
    // add parser through the tablesorter addParser method
    $.tablesorter.addParser({
        // set a unique id
        id: 'rating',
        is: function(s) {
            // return false so this parser is not auto detected
            return false;
        },
        format: function(s) {
            // format your data for normalization
            return parseFloat(s);
        },
        // set type, either numeric or text
        type: 'numeric'
    });
    $("table").tablesorter({
          headers: {
              2: {
                  sorter:'rating'
              }
          },
          textExtraction: function (node){
            if($(node).find("i").length>0){
              var stars = $(node).find("i");
              //console.log(stars);
              var count = 0.0;
              stars.each(function(i){
                if($(this).hasClass("fa-star")){
                  count += 1.0;
                }else if($(this).hasClass("fa-star-half-o")){
                  count += 0.5;
                }
              });
              return ""+count;
            }
            return $(node).text();
          }
    });
  });
  var addExpr = function(){
    // Make :eq case insensitive
    jQuery.expr[':'].containsRaw = function(a, i, m) {
      return jQuery(a).text().toUpperCase()
          .indexOf(m[3].toUpperCase()) >= 0;
    };
  };
  if(urlParam('viewer_pane') === '1'){
    addExpr();
  }else {
    $.getScript("https://cdn.datacamp.com/datacamp-light-latest.min.js",function(){
      addExpr();
    });
  }
});
