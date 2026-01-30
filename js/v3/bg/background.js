import vkData from './module.vkData.js';
import vkContact from './module.contatct.js';

chrome.offscreen.createDocument({
    url: 'panel/offscreenPanel.html',
    reasons: ['BLOBS', 'AUDIO_PLAYBACK'],
    justification: 'Keep websocket connection alive'
});
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if (msg.type === 'UPDATE_ICON') {
    }
    switch (msg.type){
        case "UPDATE_ICON" :
            chrome.action.setIcon(msg.iconObj.setIcon);
            chrome.action.setBadgeText(msg.iconObj.setBadgeText);
            chrome.action.setBadgeBackgroundColor(msg.iconObj.setBadgeBackgroundColor);
            chrome.action.setTitle(msg.iconObj.setTitle);
            break;
        case "STORAGE_SET" :
            vkData._set(msg.key, msg.val);
            break;
        case "STORAGE_GET" :
            vkData._get(msg.key, function(valu){
                sendResponse(valu);
            });
            return true;
        case "STORAGE_DEL" :
            vkData._del(msg.key);
            break;
    }
});

(async () => {
    vkData.init();
})();

