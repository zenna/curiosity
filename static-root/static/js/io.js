// This file handles the url mediated communication between mturk and the physics simulation
$(document).ready(function() {
    // Get from hash: unique user identifying code

    // Bind the event.
    $(window).hashchange(function() {
        //TODO: Take 1)physics 2)userid store locally
        alert(location.hash);
    });

    // Trigger the event (useful on page load).
    $(window).hashchange();
    
    logAction = function(action) {
    	// Send action to database with username
    	console.log("Logging action");
    };
    
    $('canvas').click(function(){
    	if (isClickableObject) {
    		//
    	} 
    })
});

