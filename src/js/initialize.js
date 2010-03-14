
google.setOnLoadCallback(function() {
  _run();
  $.getJSON("/shorturl/?" + channel_name, function(data){
    this_url = data.short;
  });
  
  setInterval(function(){
    getTimeline();
  }, 60000);
  
  getTimeline();
  
});
