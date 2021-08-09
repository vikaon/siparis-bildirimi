var vkData = {
    data : {},
    _set : function(key, val){
        localStorage.setItem(key, val);
    },
    _get : function(key){
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
        localStorage.setItem("S_CONF", JSON.stringify(this.data));
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
    },
    init : function(){
        this.data = {};
        try{
            this.data = JSON.parse(localStorage.getItem("S_CONF")) || {};
        } catch(err){}
    }
};
vkData.init();