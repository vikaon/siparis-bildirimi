var sndControl = new Audio("data:audio/wav;base64,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qJrx4KOQjahZxWbcZgztj2c49nKmkId44S71j0c8eV9yDK6uPRzx5X18eDvjvQ6yKo9ZSS6l//8elePK/Lf//IInrOF/FvDoADYAGBMGb7FtErm5MXMlmPAJQVgWta7Zx2go+8xJ0UiCb8LHHdftWyLJE0QIAIsI+UbXu67dZMjmgDGCGl1H+vpF4NSDckSIkk7Vd+sxEhBQMRU8j/12UIRhzSaUdQ+rQU5kGeFxm+hb1oh6pWWmv3uvmReDl0UnvtapVaIzo1jZbf/pD6ElLqSX+rUmOQNpJFa/r+sa4e/pBlAABoAAAAA3CUgShLdGIxsY7AUABPRrgCABdDuQ5GC7DqPQCgbbJUAoRSUj+NIEig0YfyWUho1VBBBA//uQZB4ABZx5zfMakeAAAAmwAAAAF5F3P0w9GtAAACfAAAAAwLhMDmAYWMgVEG1U0FIGCBgXBXAtfMH10000EEEEEECUBYln03TTTdNBDZopopYvrTTdNa325mImNg3TTPV9q3pmY0xoO6bv3r00y+IDGid/9aaaZTGMuj9mpu9Mpio1dXrr5HERTZSmqU36A3CumzN/9Robv/Xx4v9ijkSRSNLQhAWumap82WRSBUqXStV/YcS+XVLnSS+WLDroqArFkMEsAS+eWmrUzrO0oEmE40RlMZ5+ODIkAyKAGUwZ3mVKmcamcJnMW26MRPgUw6j+LkhyHGVGYjSUUKNpuJUQoOIAyDvEyG8S5yfK6dhZc0Tx1KI/gviKL6qvvFs1+bWtaz58uUNnryq6kt5RzOCkPWlVqVX2a/EEBUdU1KrXLf40GoiiFXK///qpoiDXrOgqDR38JB0bw7SoL+ZB9o1RCkQjQ2CBYZKd/+VJxZRRZlqSkKiws0WFxUyCwsKiMy7hUVFhIaCrNQsKkTIsLivwKKigsj8XYlwt/WKi2N4d//uQRCSAAjURNIHpMZBGYiaQPSYyAAABLAAAAAAAACWAAAAApUF/Mg+0aohSIRobBAsMlO//Kk4soosy1JSFRYWaLC4qZBYWFRGZdwqKiwkNBVmoWFSJkWFxX4FFRQWR+LsS4W/rFRb/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////VEFHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU291bmRib3kuZGUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjAwNGh0dHA6Ly93d3cuc291bmRib3kuZGUAAAAAAAAAACU=");  

chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {
    if(sender && sender.id && sender.id == chrome.runtime.id && request && request.action){
        return contactPopup.action(request);
    }
    console.log("onMessage", request, sendResponse);
});

var _alarmControl = {
    alarms : [
        {"id": "order", "text": "Yeni Sipariş"},
        {"id": "orderCancel", "text": "Sipariş İptal Bildirimi"},
        {"id": "orderReturn", "text": "Sipariş İade Bildirimi"},
        {"id": "ticket", "text": "Yeni Destek Talebi"},
        {"id": "customer", "text": "Yeni Üye"},
    ],
    list : [
        {name: "netflix",           time: "3sn",  path: "/voice/ns.mp3"},
        {name: "tone",              time: "1sn",  path: "/voice/mixkit-alarm-tone-996.wav"},
        {name: "alarm",             time: "6sn",  path: "/voice/mixkit-alert-alarm-1005.wav"},
        {name: "battleship",        time: "26sn", path: "/voice/mixkit-battleship-alarm-1001.wav"},
        {name: "classic alarm",     time: "5sn",  path: "/voice/mixkit-classic-alarm-995.wav"},
        {name: "winner",            time: "10sn", path: "/voice/mixkit-classic-winner-alarm-1997.wav"},
        {name: "critical",          time: "3sn",  path: "/voice/mixkit-critical-alarm-1004.wav"},
        {name: "buzzer",            time: "8sn",  path: "/voice/mixkit-digital-clock-digital-alarm-buzzer-992.wav"},
        {name: "emergency",         time: "4sn",  path: "/voice/mixkit-emergency-alert-alarm-1007.wav"},
        {name: "facility",          time: "17sn", path: "/voice/mixkit-facility-alarm-sound-999.wav"},
        {name: "game notify",       time: "1sn",  path: "/voice/mixkit-game-notification-wave-alarm-987.wav"},
        {name: "morning clock",     time: "9sn",  path: "/voice/mixkit-morning-clock-alarm-1003.wav"},
        {name: "retro emergency",   time: "25sn", path: "/voice/mixkit-retro-game-emergency-alarm-1000.wav"},
        {name: "facility breach",   time: "4sn",  path: "/voice/mixkit-security-facility-breach-alarm-994.wav"},
        {name: "machine payout",    time: "10sn", path: "/voice/mixkit-slot-machine-payout-alarm-1996.wav"},
        {name: "machine win",       time: "6sn",  path: "/voice/mixkit-slot-machine-win-alarm-1995.wav"},
        {name: "in hall",           time: "13sn", path: "/voice/mixkit-sound-alert-in-hall-1006.wav"},
        {name: "spaceship",         time: "25sn", path: "/voice/mixkit-spaceship-alarm-998.wav"},
        {name: "shooter",           time: "7sn",  path: "/voice/mixkit-space-shooter-alarm-1002.wav"},
        {name: "street public",     time: "3sn",  path: "/voice/mixkit-street-public-alarm-997.wav"},
        {name: "wintage warning",   time: "8sn",  path: "/voice/mixkit-vintage-warning-alarm-990.wav"},
        {name: "buzzer warning",    time: "8sn",  path: "/voice/mixkit-warning-alarm-buzzer-991.wav"}
    ],
    audio : null,
    alarmIndis : function(id){
        for(var i in this.alarms){
            if(this.alarms[i].id == id){
                return i;
            }
        }
        return null;
    },
    get : function(path){
        for(var i in this.list){
            if(this.list[i].path == path){
                return this.list[i];
            }
        }
        return null;
    },
    render : function(){
        var that = this, ht = '', _item = this.get(vkData.get('VOICE') || "/voice/ns.mp3"), item;
        ht += '<div class="voption primary" data-path="'+_item.path+'">'+
                    '<div class="alias">'+_item.name+'</div>' +
                    '<div class="player"> <a href="" class="player-control"><i class="icon-play"></i></a>  '+_item.time+'</div>' +
                '</div>';
        for(var i in this.list){
            item = this.list[i];
            ht += '<div class="voption secondary" data-path="'+item.path+'">'+
                    '<div class="alias">'+item.name+'</div>' +
                    '<div class="player"> <a href="" class="player-control"><i class="icon-play"></i></a> '+item.time+'</div>' +
                '</div>';
        }
        $("#alarmVoiceContainer").html(ht);
        $("#alarmVoiceContainer .secondary[data-path='"+_item.path+"']").hide();
        
        $("#alarmVoiceContainer .primary").click(function(e){
            if($(e.target).parents(".player-control").length || $(e.target).hasClass("player-control")){
                return;
            }
            if($("#alarmVoiceContainer").hasClass("open")){
                $("#alarmVoiceContainer").removeClass("open");
            }
            else {
                $("#alarmVoiceContainer").addClass("open");
            }
        });
        $("#alarmVoiceContainer .secondary").click(function(e){
            if($(e.target).parents(".player-control").length || $(e.target).hasClass("player-control")){
                return;
            }
            var _item = that.get($(this).attr("data-path"));
            var ht = '<div class="alias">'+_item.name+'</div>' +
                    '<div class="player"> <a href="" class="player-control"><i class="icon-play"></i></a> '+_item.time+'</div>';
            $("#alarmVoiceContainer .secondary").show();
            $(this).hide();
            $("#alarmVoiceContainer .primary").attr("data-path", _item.path).html(ht);
            $("#alarmVoiceContainer").removeClass("open");
            $("#alarmVoiceContainer").scrollTop(0);
            if(that.audio != null){
                that.audio.pause();
                $("#alarmVoiceContainer .player-control").data("playing", 0);
                $("#alarmVoiceContainer .player-control i").removeClass("icon-stop").addClass("icon-play");
            }
        });
        $(document).on("click", "#alarmVoiceContainer .player-control", function(e){
            e.preventDefault();
            var item = that.get($(this).parents(".voption").attr("data-path")), _this = this;
            if($(this).data("playing") == 1){
                that.audio.pause();
                $(this).data("playing", 0);
                $("i", $(this)).removeClass("icon-stop").addClass("icon-play");
            }
            else {
                if(that.audio != null){
                    that.audio.pause();
                    $("#alarmVoiceContainer .player-control").data("playing", 0);
                }
                $("#alarmVoiceContainer .player-control i").removeClass("icon-stop").addClass("icon-play");
                $("i", $(this)).removeClass("icon-play").addClass("icon-stop");
                $(this).data("playing", 1);
                that.audio = new Audio(item.path);
                that.audio.onended = function(){
                    $(_this).data("playing", 0);
                    $("i", $(_this)).removeClass("icon-stop").addClass("icon-play");
                };
                that.audio.play();
            }
        });
    },
    render_ : function(){
        var that = this;
        $.each(that.alarms, function(i, item){
            var xtem = vkData.get("VOICES") || {};
            var ytem = xtem[item.id] || {};
            var _tem = that.get(ytem.voice || "/voice/ns.mp3");
            that.alarms[i].sp = _tem.path;
            var ht = '<div class="clearfix attribute xalarm-control" data-id="'+item.id+'">';
            ht += '<button class="btn dropdown-toggle btn-select attribute-name" data-toggle="dropdown">'+
                    item.text+' <span class="selected-name">'+_tem.name+'</span> '+
                    '</button>';
            ht += '<div class="dropdown-menu dropdown-menu-attr">';
            $.each(that.list, function(i, atem){
                ht += '<div class="attribute-option" data-path="'+atem.path+'">'+
                            atem.name + ' ' + atem.time + 
                            '<button type="button" class="xplayer"><i class="icon-play"></i></button>'+
                        '</div>';
            });
            ht += '</div>';
            ht += '</div>';
            $(".alarms-container").append(ht);
        });
        
        $(document).on("click", ".alarms-container .xplayer", function(e){
            e.preventDefault();
            e.stopPropagation();
            var item = that.get($(this).parents(".attribute-option").attr("data-path")), _this = this;
            if($(this).data("playing") == 1){
                that.audio.pause();
                $(this).data("playing", 0);
                $("i", $(this)).removeClass("icon-stop").addClass("icon-play");
            }
            else {
                $("i", $(this)).removeClass("icon-play").addClass("icon-stop");
                $(this).data("playing", 1);
                that.audio = new Audio(item.path);
                that.audio.onended = function(){
                    $(_this).data("playing", 0);
                    $("i", $(_this)).removeClass("icon-stop").addClass("icon-play");
                };
                that.audio.play();
            }
        });
        
        $(document).on("click", ".alarms-container .attribute-option", function(e){
            var c = $(this).parents(".xalarm-control");
            var i = $(c).attr("data-id");
            var _tem = that.get($(this).attr("data-path"));
            var _adx = that.alarmIndis(i);
            that.alarms[_adx].sp = _tem.path;
            $(".selected-name", c).html(_tem.name);
        });
    },
    bind : function(){
        this.render();
        this.render_();
    },
};


var _listData = [];
var contactPopup = {
    sendMessage : function(msg){
        try{
            chrome.runtime.sendMessage(msg, function(resp) {
                console.log(JSON.stringify(resp));
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
        }
        contactPopup.sendMessage({"action": "stopAlarm"});
    }
};
var reTryConnect = function(){
    contactPopup.sendMessage({action: "reConnectWS"});
    vkData._del("pref.stopped");
};
var loadSetupPrefences = function(){
    var valu;
    $.each($("#vkSetupPrefences .vk-data-control"), function(){
        valu = vkData.get($(this).attr("data-key"));
        if(valu){
            $(this).val(valu);
        }
    });
    
    //tekrar
    var r = vkData.get("REPEAT");
    if(r === null || r == "1"){
        $("#vkSetupPrefences .field-REPEAT").prop("checked", 1);
    }
};
var loadSectionContainer = function(){
    $("#sectionAlertContainer, #pageContainer, #stopButton, #sectionAlertContainer .content").hide();
    if(!vkData.get("LICENCE")){
        $("#sectionAlertContainer").removeClass("alert-info alert-danger alert-warning hide").addClass("alert-info").show();
        $("#sectionAlertContainer .no-licence").removeClass("hide").show();
    }
    else if(!vkData._get("connected")){
        $("#sectionAlertContainer").removeClass("alert-info alert-danger alert-warning hide").addClass("alert-danger").show();
        $("#sectionAlertContainer .no-connect").removeClass("hide").show();
    }
    else if(!_listData || !_listData.length){
        $("#stopButton").removeClass("hide").show();
        $("#sectionAlertContainer").removeClass("alert-info alert-danger alert-warning hide").addClass("alert-warning").show();
        $("#sectionAlertContainer .no-data").removeClass("hide").show();
    }
    else {
        $("#pageContainer").removeClass("hide").show();
        $("#stopButton").removeClass("hide").show();
    }
};

var renderMessageList_order = function(item, abs){
    var ht = '<div class="item item-order"> ' + 
                '<div class="xtitle"><small class="dt">'+abs.date+'</small>Yeni Sipariş - '+item.summary.orderNumber+'</div>' +
                '<div>'+item.customer.deliveryAddress.fullName+
                        ' <i>'+ item.customer.deliveryAddress.town+' / '+item.customer.deliveryAddress.city+'</i></div>' +
            '</div>';
    $("#pageContainer").prepend(ht);
};
var renderMessageList_orderCancel = function(item, abs){
    var ht = '<div class="item item-order"> ' + 
                '<div class="xtitle"><small class="dt">'+abs.date+'</small>Sipariş İptal Talebi- '+item.order_number+'</div>' +
                '<div><i>'+ (item.customer ? (item.customer.first_name+' '+item.customer.last_name) : '')+'</i></div>' +
                '<div>'+(item.options ? (item.options.note || "") : '')+'</div>'+
            '</div>';
    $("#pageContainer").prepend(ht);
};
var renderMessageList_orderReturn = function(item, abs){
    var ht = '<div class="item item-order"> ' + 
                '<div class="xtitle"><small class="dt">'+abs.date+'</small>Sipariş İade Talebi- '+item.order.order_number+'</div>' +
                '<div><i>'+ (item.customer_name || '')+'</i></div>' +
                '<div>'+(item.description)+'</div>'+
            '</div>';
    $("#pageContainer").prepend(ht);
};
var renderMessageList_ticket = function(item, abs){
    var ht = '<div class="item item-ticket"> ' + 
                '<div class="xtitle"><small class="dt">'+abs.date+'</small>Yeni Destek Talebi - '+item.subject+'</div>' +
                '<div>'+item.customer_name + '</div><div>' + item.customer_email + ' ' + item.customer_phone + '</div>' +
            '</div>';
    $("#pageContainer").prepend(ht);
};
var renderMessageList_customer = function(item, abs){
    var ht = '<div class="item item-customer"> ' + 
                '<div class="xtitle"><small class="dt">'+abs.date+'</small>Yeni Üye - '+item.first_name+' '+item.last_name+'</div>' +
                '<div>' + item.email + ' ' + item.mobile_phone + '</div>' +
            '</div>';
    $("#pageContainer").prepend(ht);
};
var renderMessageList_ = function(item){
    switch(item.type){
        case 'order' :
            return renderMessageList_order(item.data, item);
        case 'ticket' :
            return renderMessageList_ticket(item.data, item);
        case 'orderCancel' :
            return renderMessageList_orderCancel(item.data, item);
        case 'orderReturn' :
            return renderMessageList_orderReturn(item.data, item);
        case 'customer' :
            return renderMessageList_customer(item.data, item);
    }
};
var renderMessageList = function(){
    for(var i in _listData){
        renderMessageList_(_listData[i]);
    }
};
 
var saveSetupPrefences = function(){
    contactPopup.sendMessage({action: "disConnectWS"});
    var xData = {};
    $.each($("#vkSetupPrefences .vk-data-control"), function(){
        xData[$(this).attr("data-key")] = $(this).val();
    });
    xData.VOICES = {};
    xData.REPEAT = $("#vkSetupPrefences .field-REPEAT").prop("checked") ? 1 : 0;
    $.each(_alarmControl.alarms, function(i, item){
        xData.VOICES[item.id] = {voice: item.sp};
    });
    vkData.set(xData);
    contactPopup.sendMessage({action: "setConf", data: xData});
    contactPopup.sendMessage({action: "setVKData", data: vkData.data});
    loadSectionContainer();
    $("#vkSetupPrefences").modal("hide");
    reTryConnect();
};
var afterReady = function(){
    _listData = vkData._parse("list", []);
    loadSetupPrefences();
    loadSectionContainer();
    renderMessageList();
    _alarmControl.bind();
    $("#vkSetupPrefences button[type=submit]").click(function(e){
        e.preventDefault();
        saveSetupPrefences();
    });
    $("#reTryConnectBtn").click(function(e){
        reTryConnect();
    });
    $("#stopButton").click(function(e){
        vkData._set("pref.stopped", "1");
        contactPopup.sendMessage({action: "disConnectWS"});
    });
    $("#vkSetupPrefences .ui-volume-control").slider({
        max: 100,
        min: 0,
        value :  $("#vkSetupPrefences input[name=VOLUME]").val(),
        stop: function( event, ui ) {
            $("#vkSetupPrefences input[name=VOLUME]").val(ui.value);
            sndControl.volume = ui.value / 100;
            sndControl.play();
        }
    });
    contactPopup.sendMessage({"action": "releaseData"});
    contactPopup.sendMessage({"action": "stopAlarm"});
};

$(document).ready(function(){
    afterReady();
});