// This file handles the url mediated communication between mturk and the physics simulation
$(document).ready(function() {
    // Get from hash: unique user identifying code
    guid = "GLOBALLYUNIQUE";

    // Bind the event.
    $(window).hashchange(function() {
        //TODO: Take 1)physics 2)userid store locally
        // alert(location.hash);
    });

    // Trigger the event (useful on page load).
    $(window).hashchange();
    
    logAction = function(action) {
    	action.guid = guid;
    	
    	// Send action to database with username
    	// console.log(action);
    };
});


// TODO:
// 1. Find out how to do attracting balls
// 2. Find out how to change gravity direction
// 3. paramterise physics rules
// 4. get guid and physics rules from hash
// 5. fix multiple impulse, mouse down
