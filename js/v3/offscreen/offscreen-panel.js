chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {
    if(sender?.id == chrome.runtime.id && request?.action){
        return contactPopup.action(request, sendResponse);
    }
    sendResponse({"success" : true});
});

(async () => {
    await vkData.init();
    vkSocket.bind();
})();
