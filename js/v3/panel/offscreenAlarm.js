
const offscreenAlarm = {
    audio : null,
    vtype : null,
    gainNode : null,
    audioContext : null,
    audioBuffer : null,
    audioSource : null,
    loadAudioContext : async function(){
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    },
    loadAudioBuffer : async function(request){
        const response = await fetch(request.data.src);
        const arrayBuffer = await response.arrayBuffer();
        this.audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer);
    },
    play : async function(request){
        if(!this.audioContext){
            await this.loadAudioContext();
        }
        await this.loadAudioBuffer(request);
        if(!this.audioSource){
            this.audioSource = this.audioContext.createBufferSource();
            this.gainNode = this.audioContext.createGain(); // ① Gain node oluştur
            this.audioSource.buffer = this.audioBuffer;
            this.audioSource.connect(this.audioContext.destination);
            this.gainNode.connect(this.audioContext.destination);
            this.gainNode.gain.value = request.data.volume;
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
//        if(this.audio && !this.audio.paused){
//            this.audio.pause();
//        }
    },
};


chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
    if(
        typeof request == "object"
        && typeof request.alarmAction == "string"
        && typeof request.alarmSender == "string"
        && request.alarmSender == "module-vkAlarm"){
        switch(request.alarmAction){
            case "play" :
                offscreenAlarm.play(request);
                break;
            case "stop" :
                offscreenAlarm.stop(request);
                break;
        }
    }
});

