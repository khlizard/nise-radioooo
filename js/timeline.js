function getTimeline() {
  var query =
    "http://search.twitter.com/search.json?lang=en&q=%23radioooo-kichi&callback=jsonCallback";
  if(maxid){ query += "&since_id=" + maxid; }
  var script = document.createElement("script");
  script.setAttribute("type", "text/javascript");
  script.setAttribute("src", query);
  document.getElementsByTagName('head')[0].appendChild(script);
}

function jsonCallback(json){
  if (json.results) {
    maxid = json.max_id;
    addRequests(json.results)
  }
}

function addRequests(results) {
  for(var i = results.length-1; i >= 0; i--) {
    var videoID = cleanCode(results[i].text);
    if(videoID){ 
      songlist.push({song:videoID, user:results[i].from_user});
    }
  }
  if(results.length > 0){ newrequest = true; }
}

function cleanCode(text){
  var reg = new RegExp("@radioyoutube|#radioooo-kichi" ,"gim")
  var str = text.replace( reg , "");
  var reg = new RegExp("[A-Za-z0-9\-\_]{11}" , "im");
  var match = str.match( reg );
  if( match != null && match.length > 0) {
    return match.pop();
  }
  
  return null ;
}


songlist = new Array();
newrequest = new Boolean(false);
maxid = null;
setInterval(getTimeline, 60000);
getTimeline();

