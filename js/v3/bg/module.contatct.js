const vkContact = {
    sendMessage : function(msg){
        try{
            msg.__from = "sw";
            chrome.runtime.sendMessage(msg, function(resp) {});
        } catch(err){}
    },
    action : function (request, response){

    }
};
export default vkContact;