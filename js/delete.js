chrome.storage.sync.remove(window.location.origin, function(){
    console.log('Deleted site: ' + window.location.origin);
    window.location.href = window.location.href;
    chrome.runtime.sendMessage({code: 'RELOAD', message: 'Successfully updated'}, function(response) {
        console.log(response.farewell);
    });
});
