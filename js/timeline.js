function getTimeline() {
  var query =
    "http://search.twitter.com/search.json?q=%23" + 
    channel_name + "&callback=jsonCallback";
  if (maxid) query += "&since_id=" + maxid;
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

function addRequests(res) {
  for(var i = res.length - 1; 0 <= i; i--) {
    var j = res[i];
    var videoID = cleanCode(j.text);
    if (videoID) {
      new_playlist.push({
        song: videoID,
        user: j.from_user,
        date: new Date(j.created_at)
      });
    }
  }
}

function cleanCode(text){
  var str = text.replace(/[@#]\S+/gim, '');
  var reg = /[A-Za-z0-9\-\_]{11}/im;
  var match = str.match(reg);
  if( match != null && 0 < match.length) {
    return match.pop();
  }
  return null ;
}

google.setOnLoadCallback(function() {
  $('#radioo-channel').text('#'+channel_name);
  $('#radioo-channel').attr('href', 'https://twitter.com/search?q=%23'+channel_name);
});

new_playlist = new Array();
all_playlist = new Array();
maxid = null;

setInterval(getTimeline, 60000);
getTimeline();

