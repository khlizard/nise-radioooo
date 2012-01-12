
$(function() {
  // === Interval ===
  
  // 60sec
  setInterval(function(){
    // get Timeline
    getTimeline();
    // get UserCount
    getUserCount();
  }, 60000);
  
  
  
  // === Initialize ===
  
  // get Timeline
  getTimeline();
  
  // get short url
  this_url = "http://radioooclone.vanu.jp/?" + channel_name;
  
  // load Player
  setTimeout(_run, 1000);
  
  // get UserCount
  getUserCount();
});
