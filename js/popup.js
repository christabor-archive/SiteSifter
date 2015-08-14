window.panel_open = false;

function savePage(e) {
    e.preventDefault();
    var params = {
        use_origin: $('[name="use-origin"]').is(':checked'),
        theme: $('[name="themes"]').val(),
        strip_all: $('[name="strip-all"]').is(':checked')
    };
    chrome.tabs.executeScript({
        code: getParamString(params)
    }, function() {
        chrome.tabs.executeScript({file: 'js/save.js'});
    });
}

function deletePage(e) {
    e.preventDefault();
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
                cleanPage(data[url]);
            } else {
                console.log('Found match, but it is inactive.');
            }
        }
    });
}

function getParamString(params) {
    return 'var params = ' + JSON.stringify(params) + ';'
}

function cleanCurrentPage(e) {
    e.preventDefault();
    var params = {
        theme: $('[name="themes"]').val()
    };
    chrome.tabs.executeScript({
        code: getParamString(params)
    }, function() {
        chrome.tabs.executeScript({file: 'js/cleaners.js'});
    });
}

function init() {
    $('#open-panel').on('click', openPanel);
    $('#clean-page').on('click', cleanCurrentPage);
    $('#delete-page').on('click', deletePage);
    // http://stackoverflow.com
    // /questions/17567624/pass-parameter-using-executescript-chrome
    $('#save-page').on('submit', savePage);
    checkCache(window.location.href, window.location.origin);

    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
        // chrome.notifications.create(null, {
        //     title: 'SiteSifter',
        //     type: 'basic',
        //     message: 'Successfully removed url.'
        // });
        // chrome.tabs.reload({
        //     reloadProperties: false
        // });
        // console.log(sender.tab ?
        // "from a content script:" + sender.tab.url :
        // "from the extension");
        // sendResponse({farewell: "goodbye"});
    });
}

$(document).ready(init);
