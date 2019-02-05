browser.runtime.onMessage.addListener((message) => {
	switch(message.action) {
		case "action-bad-url":
			window.alert(message.message);
			break;
			
		case "action-open-url":
			window.open(message.message, "_self");
			break;
	}
});