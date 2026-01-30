const sndControl = new Audio("data:audio/wav;base64,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qJrx4KOQjahZxWbcZgztj2c49nKmkId44S71j0c8eV9yDK6uPRzx5X18eDvjvQ6yKo9ZSS6l//8elePK/Lf//IInrOF/FvDoADYAGBMGb7FtErm5MXMlmPAJQVgWta7Zx2go+8xJ0UiCb8LHHdftWyLJE0QIAIsI+UbXu67dZMjmgDGCGl1H+vpF4NSDckSIkk7Vd+sxEhBQMRU8j/12UIRhzSaUdQ+rQU5kGeFxm+hb1oh6pWWmv3uvmReDl0UnvtapVaIzo1jZbf/pD6ElLqSX+rUmOQNpJFa/r+sa4e/pBlAABoAAAAA3CUgShLdGIxsY7AUABPRrgCABdDuQ5GC7DqPQCgbbJUAoRSUj+NIEig0YfyWUho1VBBBA//uQZB4ABZx5zfMakeAAAAmwAAAAF5F3P0w9GtAAACfAAAAAwLhMDmAYWMgVEG1U0FIGCBgXBXAtfMH10000EEEEEECUBYln03TTTdNBDZopopYvrTTdNa325mImNg3TTPV9q3pmY0xoO6bv3r00y+IDGid/9aaaZTGMuj9mpu9Mpio1dXrr5HERTZSmqU36A3CumzN/9Robv/Xx4v9ijkSRSNLQhAWumap82WRSBUqXStV/YcS+XVLnSS+WLDroqArFkMEsAS+eWmrUzrO0oEmE40RlMZ5+ODIkAyKAGUwZ3mVKmcamcJnMW26MRPgUw6j+LkhyHGVGYjSUUKNpuJUQoOIAyDvEyG8S5yfK6dhZc0Tx1KI/gviKL6qvvFs1+bWtaz58uUNnryq6kt5RzOCkPWlVqVX2a/EEBUdU1KrXLf40GoiiFXK///qpoiDXrOgqDR38JB0bw7SoL+ZB9o1RCkQjQ2CBYZKd/+VJxZRRZlqSkKiws0WFxUyCwsKiMy7hUVFhIaCrNQsKkTIsLivwKKigsj8XYlwt/WKi2N4d//uQRCSAAjURNIHpMZBGYiaQPSYyAAABLAAAAAAAACWAAAAApUF/Mg+0aohSIRobBAsMlO//Kk4soosy1JSFRYWaLC4qZBYWFRGZdwqKiwkNBVmoWFSJkWFxX4FFRQWR+LsS4W/rFRb/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////VEFHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU291bmRib3kuZGUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjAwNGh0dHA6Ly93d3cuc291bmRib3kuZGUAAAAAAAAAACU=");

chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {
    if(sender && sender.id && sender.id == chrome.runtime.id && request && request.action){
        return contactPopup.action(request);
    }
});

let _listData = [];
const reTryConnect = function(){
    vkData._del("pref.stopped");
    contactPopup.sendMessage({action: "reConnectWS"});
};
const loadSetupPrefences = function(){
    let valu;
    $.each($("#vkSetupPrefences .vk-data-control"), function(){
        valu = vkData.get($(this).attr("data-key"));
        if(valu){
            $(this).val(valu);
        }
    });

    //tekrar
    let r = vkData.get("REPEAT");
    if(r === null || r == "1"){
        $("#vkSetupPrefences .field-REPEAT").prop("checked", 1);
    }
};
const loadSectionContainer = function(){
    $("#sectionAlertContainer, #pageContainer, #stopButton, #sectionAlertContainer .content").hide();
    let xdata = {
        connected : null,
        stopped : null
    };
    const xsetPanel = function(){
        $("#sectionAlertContainer, #pageContainer, #stopButton, #sectionAlertContainer .content").hide();
        if(xdata.stopped){
            $("#sectionAlertContainer").removeClass("alert-info alert-danger alert-warning hide").addClass("alert-danger").show();
            $("#sectionAlertContainer .stopped-connect").removeClass("hide").show();
        }
        else if(!xdata.connected){
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

    if(!vkData.get("LICENCE")){
        $("#sectionAlertContainer").removeClass("alert-info alert-danger alert-warning hide").addClass("alert-info").show();
        $("#sectionAlertContainer .no-licence").removeClass("hide").show();
    }
    else {
        vkData._get("connected", function(isConnected){
            xdata.connected = isConnected;
            vkData._get("pref.stopped", function(stopped){
                xdata.stopped = stopped;
                xsetPanel();
            });
        });
    }
};

const renderMessageList_order = function(item, abs){
    let ht = '<div class="item item-order"> ' +
        '<div class="xtitle"><small class="dt">' +
            (abs.date || "") +
            '</small>Yeni Sipariş - '+(item?.summary?.orderNumber || "")+'</div>' +
        '<div>'+(item?.customer?.deliveryAddress?.fullName || "")+
        ' <i>'+ (item?.customer?.deliveryAddress?.town || "")+' / ' + (item?.customer?.deliveryAddress?.city || "")+'</i></div>' +
        '</div>';
    $("#pageContainer").prepend(ht);
};
const renderMessageList_orderCancel = function(item, abs){
    let ht = '<div class="item item-order"> ' +
        '<div class="xtitle"><small class="dt">' +
            (abs.date || "") +
            '</small>Sipariş İptal Talebi- ' + (item.order_number || "")+'</div>' +
        '<div><i>'+ (item.customer ? (item.customer.first_name + ' ' + item.customer.last_name) : '')+'</i></div>' +
        '<div>'+(item?.options?.note || "")+'</div>'+
        '</div>';
    $("#pageContainer").prepend(ht);
};
const renderMessageList_orderReturn = function(item, abs){
    let ht = '<div class="item item-order"> ' +
        '<div class="xtitle"><small class="dt">'+(abs.date || "")+'</small>Sipariş İade Talebi- '+(item?.order?.order_number || "")+'</div>' +
        '<div><i>'+ (item.customer_name || '')+'</i></div>' +
        '<div>'+(item.description || "")+'</div>'+
        '</div>';
    $("#pageContainer").prepend(ht);
};
const renderMessageList_ticket = function(item, abs){
    let ht = '<div class="item item-ticket"> ' +
        '<div class="xtitle"><small class="dt">'+(abs.date || "")+'</small>Yeni Destek Talebi - '+(item.subject || "")+'</div>' +
        '<div>' + (item.customer_name || "") + '</div><div>' +
                (item.customer_email || "") + ' ' +
                (item.customer_phone || "") +
        '</div>' +
        '</div>';
    $("#pageContainer").prepend(ht);
};
const renderMessageList_customer = function(item, abs){
    let ht = '<div class="item item-customer"> ' +
        '<div class="xtitle"><small class="dt">'+(abs.date || "")+'</small>Yeni Üye - '+(item.first_name || "")+' '+(item.last_name || "")+'</div>' +
        '<div>' + (item.email || "") + ' ' + (item.mobile_phone || "") + '</div>' +
        '</div>';
    $("#pageContainer").prepend(ht);
};
const renderMessageList_ = function(item){
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
const renderMessageList = function(){
    _listData.forEach(function(item){
        renderMessageList_(item);
    });
};

const saveSetupPrefences = function(){
    contactPopup.sendMessage({action: "disConnectWS"});
    let xData = {};
    $.each($("#vkSetupPrefences .vk-data-control"), function(){
        xData[$(this).attr("data-key")] = $(this).val();
    });
    xData.VOICES = {};
    xData.REPEAT = $("#vkSetupPrefences .field-REPEAT").prop("checked") ? 1 : 0;
    $.each(alarmControl.alarms, function(i, item){
        xData.VOICES[item.id] = {voice: item.sp};
    });
    vkData.set(xData);
    contactPopup.sendMessage({action: "setConf", data: xData});
    contactPopup.sendMessage({action: "setVKData", data: vkData.data});
    loadSectionContainer();
    $("#vkSetupPrefences").modal("hide");
    reTryConnect();
};
const afterReady = function(){
    loadSetupPrefences();
    loadSectionContainer();
    renderMessageList();
    alarmControl.bind();
    $("#vkSetupPrefences button[type=submit]").click(function(e){
        e.preventDefault();
        saveSetupPrefences();
    });
    $("#reTryConnectBtn").click(function(e){
        reTryConnect();
    });
    $("#rePlayConnectBtn").click(function (e){
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
    vkData._parse("list", [], function(result){
        _listData = result;
        vkData.init(afterReady);
    });
});
