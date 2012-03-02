// This file handles the url mediated communication between mturk and the physics simulation
$(document).ready(function() {
	// Get from hash: unique user identifying code
	
	 // Bind the event.
  $(window).hashchange( function(){
    // Alerts every time the hash changes!
    alert( location.hash );
  })
 
  // Trigger the event (useful on page load).
  $(window).hashchange();
	
});