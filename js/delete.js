chrome.storage.sync.remove(window.location.href, function(){
    console.log('Deleted site: ' + window.location.href);
    chrome.runtime.sendMessage({greeting: 'Successfully updated'}, function(response) {
        console.log(response.farewell);
    });
});
