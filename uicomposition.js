(function() {
	
	var api = {
		host: {
			registerComponent: registerComponent,
			activateServiceComponent: activateServiceComponent
		},
		listenFor: listenFor,
		component: getClientApi,
	};
	window.uicomposition = api;
	
	var components = Array();
	var subscriptions = Array();
	
	function registerComponent(params) {
		components[params.serviceComponent] = params;
		var element = document.createElement("script");
		element.src = params.src;
		element.defer = true;
		if (typeof(params.events) === 'object') {
			for (var key in params.events) {
				if (params.events.hasOwnProperty(key)) {
					listenFor(params.serviceComponent, key, params.events[key]);
				}
			}
		}
		document.body.appendChild(element);
	}
	
	function activateServiceComponent(serviceComponent, args) {
		if (components && components[serviceComponent] && components[serviceComponent].onactivate)
			components[serviceComponent].onactivate(args);
	}
	
	function listenFor(serviceComponent, eventName, eventHandler) {
		var subscriptionKey = serviceComponent + "+" + eventName;
		var eventSubscriptions = subscriptions[subscriptionKey];
		if (!eventSubscriptions) {
			eventSubscriptions = Array();
			subscriptions[subscriptionKey] = eventSubscriptions;
		}
		eventSubscriptions.push(eventHandler);
	}
	
	function getClientApi(forComponentId) {
		var component = components[forComponentId];
		
		var api = 
		{
			respondWith: injectHtmlForComponent, 
			attachEventHandler: attachEventHandlerForComponent,
			callback: callbackFromComponent
		};
		return api;
		
		
		function injectHtmlForComponent(html) {
			var element = document.getElementById(component.responseElementId);
			element.innerHTML = html;
		}		

		function attachEventHandlerForComponent(eventHandler) {
			component.onactivate = eventHandler;
			var element = document.getElementById(component.targetElementId);
			element.onclick = function(event) {
				event.preventDefault ? event.preventDefault() : (event.returnValue = false);
				eventHandler(event);
			};
		}

		function callbackFromComponent(args) {
			var eventName = args[0];
			var eventArgs = args[1];
			var subscriptionKey = forComponentId + "+" + eventName;
			var eventHandlers = subscriptions[subscriptionKey];
			if (typeof(eventHandlers) === 'object' && eventHandlers.forEach) {
				eventHandlers.forEach(function(value, index) {
					value(eventArgs);
				});
			}
		}
	}
})();