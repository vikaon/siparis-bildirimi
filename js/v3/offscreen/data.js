const vkData = {
    data: {},
    loaded : false,

    _set: async function (key, val) {
        chrome.runtime.sendMessage(
            { type: 'STORAGE_SET', key : key, val : val }
        );
    },

    _get: async function (key, cb) {
        chrome.runtime.sendMessage(
            {type: 'STORAGE_GET', key: key},
            function(valu){
                cb(valu);
            }
        );
    },

    _del: async function (key) {
        chrome.runtime.sendMessage({
            type: 'STORAGE_DEL', key: key
        });
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

    init: async function () {
        let that = this, cb = function(raw){
            that.data = raw ? JSON.parse(raw) : {};
            that.loaded = true;
        };
        this.data = {};
        await this._get("S_CONF", cb);
    }
};
