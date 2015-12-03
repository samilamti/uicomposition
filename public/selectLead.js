/*
	in-parameters:
	- selector			# CSS selector where we should inject our view
	- correlationId		# An id to pass to the below callback method
	- title / root		# The caller's name of the manipulated object (e.g. 'Customer' or 'Lead' instead of 'Person')
	- classNames		# List of class names to apply to button
	- callback			# JavaScript method name to call after completion
	- resultType		# Enumeration: 'shortname', 'name', 'address' ...
	
	Constraints: Must use vanilla JS, since we cannot possibly know which frameworks are in use in the host page.
*/	
	// (function(){
	// 	var targetElement = document.getElementById("lead");
	// 	targetElement.innerHTML =
	// 		'<span class="details hidden text text-info"></span>' + 
	// 		'<a class="btn btn-default" style="float: right" onclick="this.parentElement.attributes[\'data-selectLead\'](event)">Select Customer</a>';
	// 	var actionElement = targetElement.querySelector(".btn.btn-default");
	// 	var feedbackElement = targetElement.querySelector(".details");
	// 	targetElement.attributes['data-selectLead'] = function selectLead(event) {
	// 		event.preventDefault ? event.preventDefault() : (event.returnValue = false);
	// 		var childWindow = window.open('http://localhost:3000/', 'childWindow', 'width=500, height=300, top=' + (event.screenY-100) + ', left=' + (event.screenX-70));
	// 		window.addEventListener('message', function(event) {
	// 			var eventData = event.data;
	// 			var eventName = eventData[0];
	// 			var eventArgs = eventData[1];
	// 			if (eventName === 'personSelected') {
	// 				if (typeof(window.callMeMaybe) === 'function') {
	// 					window.callMeMaybe(eventArgs._id);
	// 				}
	// 				feedbackElement.innerHTML = '<p>' + eventArgs.firstName + " " + eventArgs.lastName + " (aged 34) <br/>" + eventArgs.location + "</p>";
	// 				feedbackElement.classList.remove('hidden');
	// 				actionElement.textContent = "(change)";
	// 				actionElement.classList.remove('btn-default');
	// 				actionElement.classList.remove('btn-link')
	// 			}
	// 			if (eventName === 'accept') {
	// 				childWindow.close();
	// 			}
	// 		});
	// 	};
	// })();
	
(function() {
	var self = window.uiComposition.component('person/find-person');
	self.attachEventHandler(function() {
		var childWindow = window.open('http://localhost:3000/', 'childWindow', 'width=500, height=300, top=' + (event.screenY-100) + ', left=' + (event.screenX-70));
		window.addEventListener('message', function(event) {
			self.callback(event.data);
			if (event.data[0] === 'accept') {
				childWindow.close();
			}
		});
	});
})();