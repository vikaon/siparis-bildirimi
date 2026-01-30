const alarmControl = {
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

