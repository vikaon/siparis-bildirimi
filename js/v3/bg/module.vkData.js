import vkContact from './module.contatct.js';

const vkData = {
    data: {},
    loaded : false,

    _set: function (key, val, cb) {
        chrome.storage.local.set({[key] : val}, () => {
            if (chrome.runtime.lastError) {
                return;
            }
            cb?.();
            setTimeout(function(){
                vkData._get(key, function(yv){
                    vkContact.sendMessage({action:"STORAGE_KEY_SETED", key: key, val: (val + "||" + yv)});
                });
            }, 10);


        });
    },

    _get: function (key, cb) {
        chrome.storage.local.get(key, (result) => {
            cb(result[key] || null);
        });
    },

    _del: function (key) {
        chrome.storage.local.remove([key]);
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

    init: function () {
        let that = this, cb = function(raw){
            that.data = raw ? JSON.parse(raw) : {};
            that.loaded = true;
        };
        this.data = {};
        this._get("S_CONF", cb);
    }
};

export default vkData;
