/*
 * Chromeless player has no controls.
 */

function nextSong() {
  btnNextEnable(false);
  var rs_scale = 60 * 20 * 1000;
  
  if (0 < new_playlist.length) {
    new_playlist.sort(function(a,b){
      return a.date - b.date + (Math.random()-0.5) * rs_scale;
    });
    playing = new_playlist.pop();
    all_playlist.unshift(playing);
    all_playlist = all_playlist.concat(new_playlist);
    new_playlist.length = 0;
  } else {
    playing = all_playlist.pop();
    all_playlist.unshift(playing);
  }
  ytplayer.loadVideoById(playing.song);
  
  updatePlayingData(playing);
  setMovieTitle(playing);
}
function privSong() {
  if (2 <= all_playlist.length) {
    btnNextEnable(false);
    new_playlist.push(all_playlist.shift());
    playing = all_playlist[0];
    
    ytplayer.loadVideoById(playing.song);
    
    updatePlayingData(playing);
    setMovieTitle(playing);
  }
}
function setMovieTitle(songdata) {
  if (movie_dic[songdata.song] && movie_dic[songdata.song].embed) {
    updateHTML('videoTitle', movie_dic[songdata.song].title);
  } else {
    var q = "http://gdata.youtube.com/feeds/api/videos/" + 
            playing.song + "?alt=json&callback=jsonCallbackGData";
    setJsonpCode(q);
  }
}
function updatePlayingData(songdata) {
  $('#videoUserIcon').attr('src', songdata.icon);
  updateHTML("videoUser",
    '@<a href="http://twitter.com/' + songdata.user +
    '" target="_blank">' + songdata.user + '</a>'
  );
  $('#videoPostedTime').strftime('%m/%d %H:%M:%S', songdata.date);
  $('#videoLink').attr('href', "http://youtu.be/" + songdata.song);
}

function jsonCallbackGData(json){
  if (json.entry) {
    var t = json.entry.title.$t;
    updateHTML("videoTitle", t);
    if (json.entry.yt$noembed) {
      movie_dic[playing.song] = {title: t, embed: false};
      setTimeout(function(){ nextSong(); isPlayerError = false;}, 500);
    } else {
      movie_dic[playing.song] = {title: t, embed: true};
    }
  }
}

// http://code.google.com/intl/ja/apis/youtube/js_api_reference.html#Events
function onPlayerStateChange(newState) {
  console.log("PlayerState: " + newState);
  if (isFirstStateChange && newState == -1) {
    isFirstStateChange = false;
    nextSong();
  } else if (newState == 0) {
    nextSong();
  } else if (newState == 1) {
    setTimeout(function(){ btnNextEnable(true); }, 500);
  }
}
isFirstStateChange = true;

function onPlayerError(code) {
  if (!isPlayerError) {
    console.warn("VideoError: " + code);
    isPlayerError = true;
    setTimeout(function(){ nextSong(); isPlayerError = false;}, 500);
  }
}
var isPlayerError = false;

function updatePlayerInfo() {
  if(ytplayer && ytplayer.getDuration) {
    var cur = ytplayer.getCurrentTime();
    var dur = ytplayer.getDuration();
    //var ppph = parseInt(cur / dur * 100);
    var lbyte = ytplayer.getVideoBytesLoaded();
    var tbyte = ytplayer.getVideoBytesTotal();
    var lpph  = parseInt(100 * lbyte / tbyte);
    
    updateHTML("videoPlayTime",  sec2min(cur) + '/' + sec2min(dur));
    updateHTML("videoLoaded", num2str3z(lpph));
    updateHTML("videoVolume", num2str3(ytplayer.getVolume()));
    updateHTML("radiooo-playlist-length", 
        new_playlist.length + "/" + all_playlist.length); // + "/" + user_count
    if (playing && movie_dic[playing.song]) {
      document.title = '[' + movie_dic[playing.song].title + '] #' +
                       channel_name + ' - ' + base_title;
    }
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
function stopVideo() {
  if (ytplayer) ytplayer.stopVideo();
}
function rewindVideo() {
  if (ytplayer) ytplayer.seekTo(0, false);
}
function muteVideo() {
  if (ytplayer) ytplayer.mute();
}
function unMuteVideo() {
  if (ytplayer) ytplayer.unMute();
}

function muteVideoToggle() {
  if (ytplayer) {
    if ($('#chkMute').attr('checked')) {
      ytplayer.unMute();
      ytplayer.isMute = false;
    } else {
      ytplayer.mute();
      ytplayer.isMute = true;
    }
  }
}
function upVideoVolume(val) {
  if (ytplayer) {
    var v = ytplayer.getVolume() + val;
    if (v < 0)   v = 0;
    if (100 < v) v = 100;
    ytplayer.setVolume(v);
    updateHTML("videoVolume", num2str3(v));
    $("#volume-slider").slider('value', v);
  }
}

function twitAny(msg) {
  var thr = 50, t = movie_dic[playing.song].title;
  if (thr <= t.length) t = t.substring(0,thr-1) + "…"
  t = encodeURIComponent(t);
  window.open(
    'http://twitter.com/home/?status=' + encodeURIComponent(msg) + 
    '%20' + t + '%20http://youtu.be/' + playing.song + 
    "%20DJ%20@" + playing.user + "%20%23radioooo" +
    "%20" + document.location.href
  );
}

// This function is automatically called by the player once it loads
function onYouTubePlayerReady(playerId) {
  ytplayer = document.getElementById("ytPlayer");
  // This causes the updatePlayerInfo function to be called every 250ms to
  // get fresh data from the player
  setInterval(updatePlayerInfo, 250);
  updatePlayerInfo();
  ytplayer.addEventListener("onStateChange", "onPlayerStateChange");
  ytplayer.addEventListener("onError", "onPlayerError");
  $('#volume-slider').slider('value', ytplayer.getVolume());
  ytplayer.isMute = false;
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



/***** Utility Fuctions *****/

// Update a particular HTML element with a new value
function updateHTML(elmId, value) {
  document.getElementById(elmId).innerHTML = value;
}
function num2str3(num, val) {
  if (num < 10)       return '&nbsp;&nbsp;' + num;
  else if (num < 100) return '&nbsp;' + num;
  else                return '' + num;
}
function num2str3z(num, val) {
  if (num < 10)       return '00' + num;
  else if (num < 100) return '0' + num;
  else                return '' + num;
}
function sec2min(src) {
  var sec = parseInt(src % 60);
  var min = parseInt(src / 60);
  var sec2 = (sec < 10 ? "0" + sec : "" + sec);
  var min2 = (min < 10 ? "0" + min : "" + min);
  return min2 + ":" + sec2;
}



function getUserCount() {
  $.getJSON("/counter/?" + channel_name, function(data){
    user_count = data.co;
  });
}
var user_count = 1;



var playing;
var movie_dic = {};
