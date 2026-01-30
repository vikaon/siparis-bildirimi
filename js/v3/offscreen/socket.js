const vkSocket = {
    socket : null,
    data : [],
    sConf : {},
//    ws_uri : "ws://68.183.214.193:3003",TODO
    ws_uri : "ws://localhost:3003",
    wsTryCounter : 0,
    wsConnecting : null,
    badgeTimer : null,
    xlog : function(d){
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
        this.setIcon();
        contactPopup.sendMessage({"action":"reLoadSection"});
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
        vkData._get("pref.stopped", function(stopped){
            if(!stopped){
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
        });
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
            console.log("ws onerror");
            vkSocket.wsConnecting = null;
            vkSocket.disconnect();
        };
        this.socket.onmessage = function(event){
            vkSocket.wsConnecting = null;
            vkSocket.readMessage(event);
        };
        this.socket.onclose = function(){
            vkSocket.socket = null;
            vkSocket.wsConnecting = null;
            vkSocket.disconnect();
        };
    },
    setIcon : function(){
        let iconObj = {}, _list = '[]';
        try{
            _list = JSON.stringify(this.data)
        } catch (e){}
        iconObj.setIcon = {path: "/img/bell-16.png"};
        iconObj.setBadgeText = {text: ""};
        iconObj.setBadgeBackgroundColor = {color: "#6bb933"};
        iconObj.setTitle = {title: ""};
        if(this.socket == null){
            iconObj.setIcon = {path: "/img/bell-x-16.png"};
            iconObj.setBadgeText = {text: "x"};
            iconObj.setBadgeBackgroundColor = {color: "#ff0000"};
            iconObj.setTitle = {title: "bağlantı yok"};
        }
        if(this.socket && this.data && this.data.length){
            let len = this.data.length;
            if(len > 10){
                len = "9+";
            }
            iconObj.setBadgeText = {text:String(len)};
            iconObj.setBadgeBackgroundColor = {color: "#6bb933"};
            iconObj.setTitle = {title: this.data.length + " yeni bildirim"};
        }
        vkData._set("list", _list);
        if(this.socket){
            vkData._set("connected", 1);
        }
        else {
            vkData._del("connected");
        }
        chrome.runtime.sendMessage({type : 'UPDATE_ICON', iconObj : iconObj });
        this.badgeTimer && clearInterval(this.badgeTimer);
        if(this.socket && this.data && this.data.length){
            const colors = [
                "#8e24aa", // mor
                "#5e35b1", // mor-mavi
                "#3949ab", // mavi
                "#1e88e5", // mavi
                "#039be5", // açık mavi
                "#00acc1", // camgöbeği
                "#00897b", // teal
                "#43a047"  // yeşil
            ];
            let i = 0;
            this.badgeTimer = setInterval(function (){
                iconObj.setBadgeBackgroundColor = {color: colors[i] };
                chrome.runtime.sendMessage({type : 'UPDATE_ICON', iconObj : iconObj });
                i = (i + 1) % colors.length;
            }, 150);
        }
    },
    bind : function(){
        let cb = function(raw){
            try{
                vkSocket.sConf = JSON.parse(raw) || {};
            } catch(err){}
            vkSocket.init();
        };
        vkSocket.sConf = {};
        vkData._get("S_CONF", cb);
    },
    init : function(){
        if(typeof this.sConf.LICENCE != "undefined" && this.sConf.LICENCE){
            this.connect();
        }
        this.setIcon();
    }
};
