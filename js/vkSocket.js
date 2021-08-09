
chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {
    if(sender && sender.id && sender.id == chrome.runtime.id && request && request.action){
        return contactPopup.action(request, sendResponse);
    }
    sendResponse({"success" : true});
});

chrome.alarms.onAlarm.addListener(function(alarm){
    if(alarm.name == "vk"){
        vkAlarm.trigger(alarm);
    }
});
//chrome.alarms.create("vk", {delayInMinutes: 0.1, periodInMinutes: 0.1});
var contactPopup = {
    sendMessage : function(msg){
        try{
            chrome.extension.sendMessage(msg, function(resp) {});
        } catch(err){}
    },
    reConnectWS : function(request, sendResponse){
        if(vkSocket.wsConnecting == 1){
            sendResponse({"result" : "fail", "message" : "zaten bağlantı isteği gönderilmiş, biraz bekleyin"});
            return;
        }
        vkSocket.disconnect();
        vkSocket.init();
        sendResponse({"result" : "success"});
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
                vkAlarm.checkDelay();
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

var vkAlarm = {
    audio : null,
    name : 'vk',
    _counter : 0,
    getVoice : function(){
        var v = vkSocket.sConf.VOICE || "/voice/ns.mp3";
        return v.substring(1);
    },
    play : function(){
        if(!this.audio || this.audio.paused){
            this.audio = new Audio(this.getVoice());
            this.audio.volume = typeof vkSocket.sConf.VOLUME == "undefined" ? 1 : parseInt(vkSocket.sConf.VOLUME) / 100;
            this.audio.play();
        }
        
        if(this._counter < 10 && vkSocket.sConf.REPEAT){
            chrome.alarms.create("vk", {delayInMinutes: 0.1});//TODO 10 sn olacak şekilde yapalım
        }
    },
    trigger : function(alarm){
        this._counter += 1;
        this.play();
    },
    stop : function(){
        this._counter = 0;
        if(this.audio && !this.audio.paused){
            this.audio.pause();
        }
        chrome.alarms.clear("vk");
    },
    checkDelay : function(){
        if(!vkSocket.sConf.REPEAT){
            chrome.alarms.clear("vk");
        }
    },
    create : function(){
        this._counter = 0;
        chrome.alarms.clear("vk");
        this.play();
        
    }
};

var vkSocket = {
    socket : null,
    data : [],
    sConf : {},
    ws_uri : "ws://188.34.167.239:3003",//ws://localhost:3003",
    wsConnecting : null,
    xlog : function(d){
        fetch('http://localhost/be/vk/chrome-apps/_log/loger.php', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({data: d})
        });
    },
    register : function(){
        var data = {type:"register", idx: this.sConf.LICENCE};
        this.sendMessage(JSON.stringify(data));
    },
    readMessage : function(event){
        var data = {};
        try{
            data = JSON.parse(event.data);
        } catch(err){}
        if(data.id){
            this.data.unshift(data);
            this.setIcon();
            vkAlarm.create();
            contactPopup.sendMessage({"action":"reLoadSection"});
            contactPopup.sendMessage({"action":"addData", data: data});
        }
    },
    sendMessage : function(msg){
        if(this.socket){
            this.socket.send(msg);
        }
    },
    disconnect : function(){
        if(this.socket){
            this.sendMessage(JSON.stringify({type:"unregister"}));
            this.socket.close();
        }
        this.socket = null;
        this.data = [];
        this.setIcon();
        contactPopup.sendMessage({"action":"reLoadSection"});
    },
    connect : function(){
        if(this.socket){
            return;
        }
        vkSocket.wsConnecting = 1;
        this.socket = new WebSocket(this.ws_uri);
        this.socket.onopen = function(){
            vkSocket.wsConnecting = null;
            vkSocket.register();
        };
        this.socket.onerror = function(){
            vkSocket.wsConnecting = null;
            vkSocket.disconnect();
        };
        this.socket.onmessage = function(event){
            vkSocket.wsConnecting = null;
            vkSocket.readMessage(event);
        };
        this.socket.onclose = function(){
            vkSocket.wsConnecting = null;
            vkSocket.disconnect();
        };
    },
    setIcon : function(){
        chrome.browserAction.setIcon({path: "/img/bell-16.png"});
        chrome.browserAction.setBadgeText({text: ""});
        chrome.browserAction.setBadgeBackgroundColor({color: "#6bb933"});
        chrome.browserAction.setTitle({title: ""});
        if(this.socket == null){
            chrome.browserAction.setIcon({path: "/img/bell-x-16.png"});
            chrome.browserAction.setBadgeText({text: "x"});
            chrome.browserAction.setBadgeBackgroundColor({color: "#ff0000"});
            chrome.browserAction.setTitle({title: "bağlantı yok"});
        }
        if(this.socket && this.data && this.data.length){
            var len = this.data.length;
            if(len > 10){
                len = "9+";
            }
            chrome.browserAction.setBadgeText({text:String(len)});
            chrome.browserAction.setBadgeBackgroundColor({color: "#6bb933"});
            chrome.browserAction.setTitle({title: this.data.length + " yeni sipariş"});
        }
        vkData._del("connected");
        vkData._set("list", JSON.stringify(this.data || []));
        if(this.socket){
            vkData._set("connected", 1);
        }
    },
    bind : function(){
        vkSocket.sConf = {};
        try{
            vkSocket.sConf = JSON.parse(vkData._get("S_CONF")) || {};
        } catch(err){}
        this.init();
        
    },
    init : function(){
        if(this.sConf.LICENCE){
            this.connect();
        }
        this.setIcon();
    }
};
vkSocket.bind();
