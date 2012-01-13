var youtubeRequestRegex = /[A-Za-z0-9\-_]{11}/;
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
  for(var i = 1; i <= res.length; i++) {
    cleanCode(res[res.length-i], function(j, videoID) {
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




new_playlist = new Array();
all_playlist = new Array();
twitterMaxID = "0";
