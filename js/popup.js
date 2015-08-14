window.panel_open = false;

function savePage(e) {
    var params = {
        use_origin: $('[name="use-origin"]').is(':checked')
    };
    var code = 'var params = ' + JSON.stringify(params) + ';';
    console.log(code);
    chrome.tabs.executeScript({
        code: code
    }, function() {
        chrome.tabs.executeScript({file: 'js/save.js'});
    });
}

function deletePage(e) {
    chrome.tabs.executeScript({file: 'js/delete.js'});
}

function openPanel() {
    chrome.tabs.executeScript({file: 'js/panel.js'});
    window.panel_open = !window.panel_open;
    $(this).text((window.panel_open ? 'Close' : 'Open') + ' panel');
}

function checkCache(url, fallback_url) {
    chrome.storage.sync.get(url, function(data){
        console.log('Check cache data: ', data);
        if($.isEmptyObject(data)) {
            console.log('No page found in existing storage.');
            if(fallback_url) {
                console.log('...Attempting fallback url.');
                return checkCache(fallback_url, null);
            }
        } else {
            if(data[url].is_active) {
                cleanPage();
            } else {
                console.log('Found match, but it is inactive.');
            }
        }
    });
}

function cleanCurrentPage() {
    chrome.tabs.executeScript({
        file: 'js/clean.js'
    });
}

function init() {
    $('#open-panel').on('click', openPanel);
    $('#clean-page').on('click', cleanCurrentPage);
    $('#delete-page').on('click', deletePage);
    // http://stackoverflow.com
    // /questions/17567624/pass-parameter-using-executescript-chrome
    $('#save-page').on('click', savePage);
    checkCache(window.location.href, window.location.host);

    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
        chrome.notifications.create(null, {
            title: 'SiteSifter',
            type: 'basic',
            message: 'Successfully removed url.'
        });
        alert('Successfully removed url');
        // console.log(sender.tab ?
        // "from a content script:" + sender.tab.url :
        // "from the extension");
        // sendResponse({farewell: "goodbye"});
    });
}

$(document).ready(init);
