const vkData = {
    data: {},
    loaded : false,

    _set: function (key, val) {
        chrome.storage.local.set({[key] : val});
    },

    _get: function (key, cb) {
        chrome.storage.local.get(key, (result) => {
            cb(result[key] || null);
        });
    },

    _del: function (key) {
        chrome.storage.local.remove([key]);
    },

    _parse : function(key, defaultVal, cb){
        var tcb = function(raw){
            let x = defaultVal;
            try{
                x = JSON.parse(raw) || x;
            } catch(e){}
            cb(x);
        };
        this._get(key, tcb);
    },

    set: function (key, val) {
        if (typeof key === "object") {
            for (let i in key) {
                this.data[i] = key[i];
            }
        } else {
            this.data[key] = val;
        }
        this._set("S_CONF", JSON.stringify(this.data));
    },

    get: function (key) {
        if(key) {
            return typeof this.data[key] !== "undefined" ? this.data[key] : null;
        }
        return this.data;
    },

    del: function (key) {
        if(typeof this.data[key] != "undefined") {
            delete this.data[key];
        }
        this._set("S_CONF", JSON.stringify(this.data));
    },

    init: function (afterLoaded) {
        let that = this, cb = function(raw){
            that.data = raw ? JSON.parse(raw) : {};
            that.loaded = true;
            if(typeof afterLoaded == "function"){
                afterLoaded();
            }
        };
        this.data = {};
        this._get("S_CONF", cb);
    }
};

vkData.init();
