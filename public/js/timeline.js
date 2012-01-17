var youtubeRequestRegex = /\b[A-Za-z0-9\-_]{11}\b/;
var searchRequestRegex = /(.+)聞きたい/;

function getTimeline() {
  $.ajax({
    url: "http://search.twitter.com/search.json",
    dataType: 'jsonp',
    data: {
      q: "%23"+channel_name,
      rpp: 30,
      since_id: twitterMaxID,
      lang: "all"
    },
    success: function(json) {
      if (json.results) {
        twitterMaxID = json.max_id_str;
        addRequests(json.results)
      }
    },
  });
}

function addRequests(res) {
  $("#marquee").empty();
  for(var i = 1; i <= res.length; i++) {
    var x = res[res.length-i];
    var r = cleanCode(x, function(j, videoID) {
        if (videoID) {
          new_playlist.push({
            song: videoID,
            user: j.from_user,
            icon: j.profile_image_url,
            date: new Date(j.created_at),
          });
        }
    });
    if (!r) {
        var text = x.text.replace(/\b#[a-zA-Z0-9_\-]+\b/g, "");
        text = text.replace(/\n/g, " ");
        $("#marquee").append("<li>" + x.from_user + ": " + text + "</li>");
	  }
  }
  $("#marquee").marquee();
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
    return true;
  } else if (res = text.match(searchRequestRegex)) {
    var url = search(j, res[1], callback);
    return true;
  }
  return false;
}




new_playlist = new Array();
all_playlist = new Array();
twitterMaxID = "0";
