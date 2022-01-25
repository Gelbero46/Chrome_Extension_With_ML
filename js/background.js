chrome.runtime.onInstalled.addListener(function() {
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
        chrome.declarativeContent.onPageChanged.addRules([{
            conditions: [
                // When a page contains a <video> tag...
                new chrome.declarativeContent.PageStateMatcher({
                    css: ["section"]
                })
            ],
            // ... show the page action.
            actions: [new chrome.declarativeContent.ShowPageAction() ]
        }]);
    });
    console.log(chrome);
});




const yourUrl = "http://localhost:8008";

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log(sender.tab ?
                  "from a content script:" + sender.tab.url :
                  "from the extension");
        console.log("background", request.data)
        if (request.message == "my_request"){
            fetch(yourUrl, {method: 'POST', body: JSON.stringify(request.data)}).then(r => r.text()).then(result => {
                console.log(result)
                sendResponse(result);
            })
        }
        return true
    }
  );

