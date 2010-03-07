/*
 * Chromeless player has no controls.
 */

// Update a particular HTML element with a new value
function updateHTML(elmId, value) {
  document.getElementById(elmId).innerHTML = value;
}

function nextSong() {
  if(newrequest) { tmp = songlist.pop();
  } else { tmp = songlist.shift(); }
  ytplayer.loadVideoById(tmp.song);
  updateHTML("user", "@<a href=\"http://twitter.com/" + tmp.user +
             "\" target=\" _blank\">" + tmp.user + "</a>");
  updateHTML("link", "<a href=\"http://www.youtube.com/watch?v=" + tmp.song +
             "\" target=\" _blank\">" + tmp.song + "</a>");
  newrequest = false;
}

// This function is called when the player changes state
function onPlayerStateChange(newState) {
  if (newState <= 0) {
    nextSong();
  }
}

// Display information about the current state of the player
function updatePlayerInfo() {
  // Also check that at least one function exists since when IE unloads the
  // page, it will destroy the SWF before clearing the interval.
  if(ytplayer && ytplayer.getDuration) {
    updateHTML("videoPlayed", parseInt(100*ytplayer.getCurrentTime()/ytplayer.getDuration()));
    updateHTML("videoLoaded", parseInt(100*ytplayer.getVideoBytesLoaded()/ytplayer.getVideoBytesTotal()));
    updateHTML("volume", ytplayer.getVolume());
  }
}

// Allow the user to set the volume from 0-100
function setVideoVolume(volume) {
  if (ytplayer) {
    ytplayer.setVolume(volume);
  }
}

function playVideo() {
  if (ytplayer) {
    ytplayer.playVideo();
  }
}

function pauseVideo() {
  if (ytplayer) {
    ytplayer.pauseVideo();
  }
}

function muteVideo() {
  if(ytplayer) {
    ytplayer.mute();
  }
}

function unMuteVideo() {
  if(ytplayer) {
    ytplayer.unMute();
  }
}

function twitStand() {
  window.open("http://twitter.com/home/?status=STAND!%20%20http://portal.radiooofly.com/clip/" +
               tmp.song + "%20DJ%20@" + tmp.user + "%20%23radioooo%20http://bit.ly/E4TgH");
}

function twitClap() {
  window.open("http://twitter.com/home/?status=CLAP!%20%20http://portal.radiooofly.com/clip/" +
               tmp.song + "%20DJ%20@" + tmp.user + "%20%23radioooo%20http://bit.ly/E4TgH");
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
var tmp