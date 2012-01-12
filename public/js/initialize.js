
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
  $.getJSON("/shorturl/?" + channel_name, function(data){
    this_url = data.short;
  });
  
  // load Player
  setTimeout(_run, 1000);
  
  // get UserCount
  getUserCount();
});
