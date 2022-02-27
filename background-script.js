function getYoutubeID(url){
    url = url.replace(/(>|<)/gi,'').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
    if(url[2] !== undefined) {
        return url[2].split(/[^0-9a-z_\-]/i)[0];
    }
    return null;
}

function sendMessage(action, message) {
    browser.tabs.query({active:true, currentWindow:true}, function(tabs) {
        browser.tabs.sendMessage(tabs[0].id, {action:action, message:message});  
    });
}
  
browser.contextMenus.create({
    id       : "invidious-url-open-here",
    title    : "Open Link Here",
    contexts : ["link"],
});

browser.contextMenus.create({
    id       : "invidious-url-open-tab",
    title    : "Open Link in New Tab",
    contexts : ["link"],
});

browser.contextMenus.create({
    id       : "invidious-url-open-window",
    title    : "Open Link in New Window",
    contexts : ["link"],
});

browser.contextMenus.create({
    id       : "invidious-url-open-window-private",
    title    : "Open Link in New Private Window",
    contexts : ["link"],
});
  
browser.contextMenus.onClicked.addListener(function(info, tab) {
    var watchID = getYoutubeID(info.linkUrl);   
  
    if (watchID !== null) {
        var invidiousUrl = "https://redirect.invidious.io/watch?v=" + watchID;

        switch (info.menuItemId) {
            case "invidious-url-open-here"           : sendMessage("action-open-url", invidiousUrl); break;
            case "invidious-url-open-tab"            : browser.tabs.create({ url: invidiousUrl }); break;
            case "invidious-url-open-window"         : browser.windows.create({ url: [invidiousUrl] }); break;
            case "invidious-url-open-window-private" : browser.windows.create({ url: [invidiousUrl], incognito:true }); break;
        }
    }
    else {
        sendMessage("action-bad-url", "This is not a Youtube url!");  
    }
});
