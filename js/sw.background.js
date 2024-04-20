//TODO
// manifest.version 3 için localStorage erişimi yok

var vkData = {
    data : {},
    _set : function(key, val){
        localStorage.setItem(key, val);
    },
    _get : function(key){
        console.log("key", key);
        console.log("chrome.storage.local", chrome.storage.local);
        console.log("chrome.storage.local", chrome.storage.local.get(key));
        chrome.storage.local.get(key, (data) => {
            if(chrome.runtime.lastError) {
                console.error(chrome.runtime.lastError.message);
            } else {
                const value = data;
                console.log("Data retrieved from chrome.storage.local:", value);
            }
        });
        return localStorage.getItem(key);
    },
    _del : function(key){
        localStorage.removeItem(key);
    },
    _parse : function(key, d){
        var x = d;
        try{
            x = JSON.parse(this._get(key));
        }catch(err){}
        return x;
    },
    set : function(key, val){
        if(typeof key == "object"){
            for(var i in key){
                this.data[i] = key[i];
            }
        }
        else {
            this.data[key] = val;
        }
        this._set("S_CONF", JSON.stringify(this.data));
        console.log("bu nedir yaw");
    },
    get : function(key){
        if(key){
            return typeof this.data[key] != "undefined" ? this.data[key] : null;
        }
        return this.data;
    },
    del : function(key){
        if(this.data[key]){
            delete this.data[key];
        }
        this._set("S_CONF", JSON.stringify(this.data));
    },
    init : function(){
        this.data = {};
        try{
            this.data = JSON.parse(localStorage.getItem("S_CONF")) || {};
        } catch(err){}
    }
};
vkData.init();

//////////////////////////////////////////////


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
            chrome.runtime.sendMessage(msg, function(resp) {});
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
            case "setVKData" :
                vkSocket.store = request.data;
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
            case "loadStore" : 
                console.log("loadStore", request);
                vkSocket.store = request.data || {};
                if(request.data && request.data.S_CONF){
                    for(var i in request.data.S_CONF){
                        vkSocket.sConf[i] = request.data.S_CONF[i];
                    }
                }
                if(request.request && request.request.fn){
                    request.request.fn();
                }
                break;
        }
    }
};

var vkAlarm = {
    vtype : null,
    audio : null,
    name : 'vk',
    _counter : 0,
    getVoice : function(){
//        var v = vkSocket.sConf.VOICE || "/voice/ns.mp3";
//        return v.substring(1);
        var v = vkSocket.sConf.VOICES || {};
        var x = v[this.vtype] || {};
        var z = x.voice || "/voice/ns.mp3";
        return z.substring(1);
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
    create : function(type){
        this.vtype = type;
        this._counter = 0;
        chrome.alarms.clear("vk");
        this.play();
        
    }
};

var vkSocket = {
    socket : null,
    data : [],
    sConf : {},
    store : {},
    ws_uri : "ws://68.183.214.193:3003",//ws://localhost:3003",
    wsTryCounter : 0,
    wsConnecting : null,
    xlog : function(d){
        fetch('http://localhost/be/vk/chrome-apps/log/loger.php', {
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
            vkAlarm.create(data.type);
            contactPopup.sendMessage({"action":"addData", data: data});
        }
        contactPopup.sendMessage({"action":"reLoadSection"});
        this.setIcon();
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
        if(!vkData._get("pref.stopped")){
            var wt = 10000;
            if(vkSocket.wsTryCounter > 500){
                wt = 2400000;
            }
            if(vkSocket.wsTryCounter > 100){
                wt = 1200000;
            }
            else if(vkSocket.wsTryCounter > 50){
                wt = 600000;
            }
            else if(vkSocket.wsTryCounter > 10){
                wt = 30000;
            }
            else if(vkSocket.wsTryCounter > 5){
                wt = 20000;
            }
            setTimeout(function(){
                vkSocket.connect();
            }, wt);
            
        }
    },
    connect : function(){
        if(this.socket){
            return;
        }
        vkData._del("pref.stopped");
        vkSocket.wsConnecting = 1;
        vkSocket.wsTryCounter += 1;
        console.log("new connect request ("+vkSocket.wsTryCounter+") " + new Date());
        this.socket = new WebSocket(this.ws_uri);
        this.socket.onopen = function(){
            vkSocket.wsConnecting = null;
            vkSocket.wsTryCounter = 0;
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
        return;
        chrome.browserAction.setIcon({path: "img/bell-16.png"});
        chrome.browserAction.setBadgeText({text: ""});
        chrome.browserAction.setBadgeBackgroundColor({color: "#6bb933"});
        chrome.browserAction.setTitle({title: ""});
        if(this.socket == null){
            chrome.browserAction.setIcon({path: "img/bell-x-16.png"});
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
            chrome.browserAction.setTitle({title: this.data.length + " yeni bildirim"});
        }
        vkData._del("connected");
        vkData._set("list", JSON.stringify(this.data || []));
        if(this.socket){
            vkData._set("connected", 1);
        }
    },
    bind : function(){
//        vkSocket.sConf = {};
//        try{
//            vkSocket.sConf = JSON.parse(vkData._get("S_CONF")) || {};
//        } catch(err){}
//        this.init();
        console.log("bind");
        contactPopup.sendMessage({"action": "loadStore", "fn": vkSocket.init});
    },
    init : function(){
        if(this.sConf.LICENCE){
            this.connect();
        }
        this.setIcon();
    }
};
vkSocket.bind();
