
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
});
