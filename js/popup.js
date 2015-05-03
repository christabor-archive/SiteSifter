window.panel_open = false;

function savePage() {
    // // TODO: save parsed html if specified.
    chrome.tabs.executeScript({
        file: 'js/save.js'
    });
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

function cleanCurrentPage() {
    chrome.tabs.executeScript({
        file: 'js/clean.js'
    });
}

function init() {
    // Below scopes = popup DOM, unless injected.
    $('#open-panel').on('click', openPanel);
    $('#clean-page').on('click', cleanCurrentPage);
    $('#save-page').on('click', savePage);
    checkForMatch();
    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
        console.log('onMessage listener for popup', arguments);
    });
}

$(document).ready(init);
