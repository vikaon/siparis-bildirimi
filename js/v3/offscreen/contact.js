
const contactPopup = {
    sendMessage : function(msg){
        try{
            chrome.runtime.sendMessage(msg, function(resp) {});
        } catch(err){}
    },
    reConnectWS : function(request, sendResponse){
        console.log("reConnectWS");
        if(vkSocket.wsConnecting == 1){
            sendResponse({"result" : "fail", "message" : "zaten bağlantı isteği gönderilmiş, biraz bekleyin"});
            return;
        }
        vkSocket.disconnect();
        setTimeout(function (){
            vkSocket.init();
            sendResponse({"result" : "success"});
        }, 10);
    },
    action : function(request, sendResponse){
        switch(request.action){
            case "reConnectWS" :
                contactPopup.reConnectWS(request, sendResponse);
                break;
            case "disConnectWS" :
                vkSocket.disconnect();
                vkAlarm.stop();
                sendResponse({"success" : true});
                break;
            case "setConf" :
                if(request.data){
                    for(var i in request.data){
                        vkSocket.sConf[i] = request.data[i];
                    }
                }
                sendResponse({"success" : true});
                break;
            case "releaseData" :
                vkSocket.data = [];
                vkSocket.setIcon();
                sendResponse({"success" : true});
                break;
            case "stopAlarm" :
                vkAlarm.stop();
                sendResponse({"success" : true});
                break;
        }
    }
};
