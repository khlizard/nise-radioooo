var youtubeRequestRegex = /[A-Za-z0-9\-_]{11}/;
var searchRequestRegex = /(.+)聞きたい/;

function getTimeline() {
  var q =
    "http://search.twitter.com/search.json?lang=all&rpp=30&q=%23" + 
    channel_name + "&callback=jsonCallbackTimeline";
  if (maxid) q += "&since_id=" + maxid;
  setJsonpCode(q);
}

function jsonCallbackTimeline(json){
  if (json.results) {
    maxid = json.max_id_str;
    addRequests(json.results)
  }
}

function addRequests(res) {
  for(var i = res.length - 1; 0 <= i; i--) {
    cleanCode(res[i], function(j, videoID) {
        if (videoID) {
          new_playlist.push({
            song: videoID,
            user: j.from_user,
            icon: j.profile_image_url,
            date: new Date(j.created_at),
          });
        }
    });
  }
}


function search(j, query, callback) {
    $.ajax({
        type:"GET",
        url:'http://gdata.youtube.com/feeds/videos',
        data: {
        'vq':query,
        'start-index':'1',
        'max-results':1,
        'alt':'json-in-script',
        'format':'5'
    },
    async:false,
    dataType: 'jsonp',
    success: function(data) {
        var e = data.feed.entry[0];
        var group = e.media$group;
        var url = group.media$player[0].url;
        var m;
        if (m = url.match(/\?v=([A-Za-z0-9\-_]{11})/)) {
            callback(j, m[1]);
        }
    },
    error: function(xOptions, textStatus){
        url = null
    }
    });
}

function cleanCode(j, callback){
 
 var text = j.text.replace(/\s*[@#][a-zA-Z0-9_\-]+\s*/g, "");
 
  var res;
  if (res = text.match(youtubeRequestRegex)) {
    callback(j, res[0]);
  } else if (res = text.match(searchRequestRegex)) {
    var url = search(j, res[1], callback);
  }
}

function setJsonpCode(query) {
  var script = document.createElement("script");
  script.setAttribute("type", "text/javascript");
  script.setAttribute("src", query);
  document.getElementsByTagName('head')[0].appendChild(script);
}



new_playlist = new Array();
all_playlist = new Array();
maxid = null;
