
const offscreenAlarm = {
    audio : null,
    gainNode : null,
    audioContext : null,
    audioBuffer : null,
    audioSource : null,
    loadAudioContext : async function(){
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    },
    loadAudioBuffer : async function(){
        const response = await fetch(vkAlarm.getVoice());
        const arrayBuffer = await response.arrayBuffer();
        this.audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer);
    },
    play : async function(){
        if(!this.audioContext){
            await this.loadAudioContext();
        }
        await this.loadAudioBuffer();
        if(!this.audioSource){
            this.audioSource = this.audioContext.createBufferSource();
            this.gainNode = this.audioContext.createGain(); // ① Gain node oluştur
            this.audioSource.buffer = this.audioBuffer;
            this.audioSource.connect(this.audioContext.destination);
            this.gainNode.connect(this.audioContext.destination);
            this.gainNode.gain.value = (vkSocket.sConf?.VOLUME || 100) / 100;
            this.audioSource.onended = () => {
                offscreenAlarm.audioSource = null;
            };
            this.audioSource.start();
        }
    },
    stop : function(){
        if(this.audioSource){
            this.audioSource.stop();
        }
    },
};


const vkAlarm = {
    vtype : null,
    audio : null,
    name : 'vk',
    _counter : 0,
    _stopped : false,
    audioContext : null,
    audioBuffer : null,
    audioSource : null,
    offscreenCanvasId : null,
    getVoice : function(){
        let v = vkSocket.sConf.VOICES || {};
        let x = v[this.vtype] || {};
        return x.voice || "/voice/ns.mp3";
    },
    play : async function(){
        this._counter += 1;
        offscreenAlarm.play();
        setTimeout(() => {
            vkAlarm.rePlay();
        }, 6000);
    },
    rePlay : function(alarm){
        if(!this._stopped && this._counter < 10 && vkSocket.sConf.REPEAT){
            this.play();
        }
        else {
            this._counter = 0;
        }
    },
    stop : function(){
        this._counter = 0;
        this._stopped = true;
        offscreenAlarm.stop();
    },
    create : function(type){
        console.log("alarm ", this._counter);
        if(this._counter == 0){
            this.vtype = type;
            this._counter = 0;
            this._stopped = false;
            this.play();
        }
    }
};

