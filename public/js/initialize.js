
$(function() {
  // === Interval ===
  
  // 60sec
  setInterval(function(){
    // get Timeline
    getTimeline();
    // get UserCount
    //getUserCount();
  }, 60000);
  
  
  
  // === Initialize ===
  
  // get Timeline
  getTimeline();
  
  // load Player
  setTimeout(_run, 1000);
  
  // get UserCount
  //getUserCount();
  
  
  // bookmarklet
  var bklink = $("a#bookmarklet");
  bklink.attr("href", 
    "javascript:tag='" + channel_name + 
    "';window.open('http://twitter.com/home/?status=@home%20'+"+ 
    "escape((location.href.match(/v=([^&=]{11})/)||[,0])[1])+'%20%2523'+tag);"+
    "undefined;"
  );
  bklink.html("request for #" + channel_name);
  // greasemonkey
  $("a#userscript").attr("href", "/scripts/" + channel_name + ".user.js");
});
