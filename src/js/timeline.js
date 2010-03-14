function getTimeline() {
  var q =
    "http://search.twitter.com/search.json?lang=all&rpp=30&q=%23" + 
    channel_name + "&callback=jsonCallbackTimeline";
  if (maxid) q += "&since_id=" + maxid;
  q += '&rndid=' + Math.random() * 100000000;
  setJsonpCode(q);
}

function jsonCallbackTimeline(json){
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
        icon: j.profile_image_url,
        date: new Date(j.created_at),
      });
    }
  }
}

function cleanCode(text){
  var re01 = /[@#]\S+|[&?=;:,./^\r\n]/gim;
  var remt = / ([a-z0-9\-\_]{11}) /i;
  var str = ' ' + text.replace(re01, ' ') + ' ';
  var match = str.match(remt);
  return (match && 2 <= match.length) ? match.pop() : null;
}

function setJsonpCode(query) {
  var script = document.createElement("script");
  script.setAttribute("type", "text/javascript");
  script.setAttribute("src", query);
  document.getElementsByTagName('head')[0].appendChild(script);
}



/***** Initialize *****/

new_playlist = new Array();
all_playlist = new Array();
maxid = null;

