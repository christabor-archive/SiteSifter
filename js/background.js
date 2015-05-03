console.log('background!');

// chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//   chrome.tabs.sendMessage(tabs[0].id, {greeting: "hello"}, function(response) {
//     console.log(response.farewell);
//   });
// });

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log('onMessage listener for background', request, sender);
    if(request.command) {
        if(request.command === 'save' && request.savedata) {
            console.log('Saving site!', request.savedata);
            var site = new CleanedSite(request.savedata);
            site.save();
            sendResponse({message: 'Success! saveData'});
        } else if(request.command === 'clean') {
            initClean();
            sendResponse({message: 'Success! initClean'});
        } else if(request.commnd === 'panel') {
            initPanel();
            sendResponse({message: 'Success! initPanel'});
        }
    }
  });
