/*
 * Chromeless player has no controls.
 */

// Update a particular HTML element with a new value
function updateHTML(elmId, value) {
  document.getElementById(elmId).innerHTML = value;
}

function nextSong() {
  $('#btnNext').attr('disabled', true);
  
  if (0 < new_playlist.length) {
    new_playlist = new_playlist.sort(function(){return 0.5-Math.random()});
    playing = new_playlist.pop();
    all_playlist.unshift(playing);
    all_playlist = all_playlist.concat(new_playlist);
    new_playlist = [];
  } else {
    playing = all_playlist.pop();
    all_playlist.unshift(playing);
  }
  
  ytplayer.loadVideoById(playing.song);
  updateHTML( "videoUser",
    '@<a href="http://twitter.com/' + playing.user +
    '" target="_blank">' + playing.user + '</a>'
  );
  $('#videoLink').attr('href', "http://www.youtube.com/watch?v=" + playing.song);
  
  if (movie_dic[playing.song]) {
    updateHTML('videoTitle', movie_dic[playing.song]);
  } else {
    var q = "http://gdata.youtube.com/feeds/api/videos/" + 
            playing.song + "?alt=json&callback=jsonCallbackGData";
    setJsonpCode(q);
  }
}

function jsonCallbackGData(json){
  if (json.entry) {
    var t = json.entry.title.$t;
    movie_dic[playing.song] = t;
    updateHTML("videoTitle", t);
  }
}

// This function is called when the player changes state
function onPlayerStateChange(newState) {
  if (newState <= 0) {
    nextSong();
  } else if (newState == 1) {
    var obj = $('#btnNext');
    if (obj.attr('disabled')) {
      setTimeout(function(){ obj.attr('disabled', false) }, 6000);
    }
  }
}

// Display information about the current state of the player
function updatePlayerInfo() {
  // Also check that at least one function exists since when IE unloads the
  // page, it will destroy the SWF before clearing the interval.
  if(ytplayer && ytplayer.getDuration) {
    var cur = ytplayer.getCurrentTime();
    var dur = ytplayer.getDuration();
    var pph = parseInt(cur / dur * 100);
    updateHTML("videoCurrent", sec2min(cur));
    updateHTML("videoDuration", sec2min(dur));
    updateHTML("videoCurrentPph", pph);
    updateHTML("videoLoaded", parseInt(100*ytplayer.getVideoBytesLoaded()/ytplayer.getVideoBytesTotal()));
    updateHTML("videoVolume", ytplayer.getVolume());
    updateHTML("radiooo-playlist-length", new_playlist.length + "/" + all_playlist.length);
    //updateHTML("", );
  }
}

// Allow the user to set the volume from 0-100
function setVideoVolume(volume) {
  if (ytplayer) ytplayer.setVolume(volume);
}
function playVideo() {
  if (ytplayer) ytplayer.playVideo();
}
function pauseVideo() {
  if (ytplayer) ytplayer.pauseVideo();
}
function muteVideo() {
  if (ytplayer) ytplayer.mute();
}
function unMuteVideo() {
  if(ytplayer) ytplayer.unMute();
}

function muteVideoToggle() {
  if (ytplayer) {
    if ($('#chkMute').attr('checked')) {
      ytplayer.unMute();
      $('.volValue').css('color','black');
    } else {
      ytplayer.mute();
      $('.volValue').css('color','#bbb');
    }
  }
}
function upVideoVolume(val) {
  if (ytplayer) {
    var v = ytplayer.getVolume() + val;
    if (v < 0)   v = 0;
    if (100 < v) v = 100;
    ytplayer.setVolume(v);
    updateHTML("videoVolume", v);
  }
}

function twitAny(msg) {
  var thr = 50, t = movie_dic[playing.song];
  if (thr <= t.length) t = t.substring(0,thr-1) + "…"
  t = encodeURI(t);
  window.open(
    'http://twitter.com/home/?status=' + encodeURI(msg) + 
    '%20' + t + '%20http://youtu.be/' + playing.song + 
    "%20DJ%20@" + playing.user + "%20%23radioooo"
  );
  // http://portal.radiooofly.com/clip/
  // %20http://j.mp/E4TgH
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

function sec2min(src) {
  var sec = parseInt(src % 60);
  var min = parseInt(src / 60);
  var sec2 = (sec < 10 ? "0" + sec : "" + sec);
  return min + ":" + sec2;
}


// This function is automatically called by the player once it loads
function onYouTubePlayerReady(playerId) {
  ytplayer = document.getElementById("ytPlayer");
  // This causes the updatePlayerInfo function to be called every 250ms to
  // get fresh data from the player
  setInterval(updatePlayerInfo, 250);
  updatePlayerInfo();
  ytplayer.addEventListener("onStateChange", "onPlayerStateChange");
  ytplayer.addEventListener("onError", "nextSong");
}

// The "main method" of this sample. Called when someone clicks "Run".
function loadPlayer() {
  // Lets Flash from another domain call JavaScript
  var params = { allowScriptAccess: "always" };
  // The element id of the Flash embed
  var atts = { id: "ytPlayer" };
  // All of the magic handled by SWFObject (http://code.google.com/p/swfobject/)
  swfobject.embedSWF("http://www.youtube.com/apiplayer?" +
                     "&enablejsapi=1&playerapiid=player1", 
                     "videoDiv", "480", "295", "8", null, null, params, atts);
}
function _run() {
  loadPlayer();
}

google.setOnLoadCallback(_run);

google.setOnLoadCallback(function() {
  $('#VolumeControl').bind('mousewheel', function(event, delta) {
    if (0 < delta) {
      upVideoVolume(5);
    } else {
      upVideoVolume(-5);
    }
    return false;
  });
});

var movtitle
var playing

var movie_dic = {};