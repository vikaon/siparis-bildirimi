const contactPopup = {
    sendMessage : function(msg){
        try{
            chrome.runtime.sendMessage(msg, function(resp) {
//                console.log(JSON.stringify(resp));
            });
        } catch(err){
            console.error(err);
        }
    },
    action : function(request, sendResponse){
        switch(request.action){
            case "loadStore" :
                contactPopup.sendMessage({"action": "loadStore", "data": vkData.data, "request": request});
                return;
            case "reLoadSection" : loadSectionContainer(); break;
            case "reLoadData"    : loadSectionContainer(); break;
            case "addData"       :
                _listData.unshift(request.data);
                loadSectionContainer();
                renderMessageList_(request.data);
                break;
            case "STORAGE_KEY_SETED" :
                loadSectionContainer();
                break;
        }
        contactPopup.sendMessage({"action": "stopAlarm"});
    }
};

