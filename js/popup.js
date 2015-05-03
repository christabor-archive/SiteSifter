/*
    Structure:
    ==================================

    All events go directly through an external content_script
    (panel.js, clean.js, etc...), except persistence,
    which relays messages to background, which handles models.

    Popup/content_scripts are best thought of as views,
    background as controllers, and models/localStorage as models.

    e.g.

    popup -> ui events -> content_scripts
    popup -> save -> background -> save

*/

window.panel_open = false;

function sendMsg(data) {
    chrome.runtime.sendMessage(data, function(response) {
      console.log(response.message);
    });
}

function savePage() {
    // TODO: must use form submission in this page instead.
    var use_origin = confirm('Use entire domain (instead of just this page?)');
    var data = {
        is_active: true,
        dom_data: $('body').html(),
        theme: 'default',
        url: use_origin ? window.location.origin :  window.location.href
    };
    console.log('save...');
    sendMsg({command: 'save', savedata: data});
}

function openPanel() {
    console.log('open panel...');
    if(window.panel_open) return;
    chrome.tabs.executeScript({
        file: 'js/panel.js'
    });

    window.panel_open = !window.panel_open;
    $(this).text((window.panel_open ? 'Close' : 'Open') + ' panel');
}

function checkForMatch() {
    // See if the url has been saved before, and load if so.
    var url = window.location.href;
    chrome.storage.sync.get(url, function(data){
        // SCOPE = users browser DOM
        if($.isEmptyObject(data)) {
            console.log('No page found in existing storage.');
        } else {
            // TODO: load custom config per site,
            // not just the generic function
            cleanPage();
        }
    });
}

function init() {
    // Below scopes = popup DOM, unless injected.
    $('#open-panel').on('click', openPanel);
    $('#clean-page').on('click', function(){
        console.log('cleaning page...');
    });
    $('#save-page').on('click', savePage);

    checkForMatch();
    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
        console.log('onMessage listener for popup', arguments);
    });
}

$(document).ready(init);
