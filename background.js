
function getBase64FromImageUrl(url, cb) {
    var img = new Image();
    img.setAttribute('crossOrigin', 'anonymous');
    img.onload = function () {
        var canvas = document.createElement("canvas");
        canvas.width =this.width;
        canvas.height =this.height;
        var ctx = canvas.getContext("2d");
        ctx.drawImage(this, 0, 0);
        var dataURL = canvas.toDataURL("image/png");
        cb(dataURL);
    };
    img.src = url;
}

function updateOverlay(tabId, url, callback) {
  chrome.tabs.executeScript(tabId, { file: "content_script.js" }, function() {
    getBase64FromImageUrl(url, function(b64) {
      chrome.tabs.sendRequest(tabId, {url: b64}, function(results) {
        callback(results)
      });
    });
  });
}

let url = 'http://cdn.cultofmac.com/wp-content/uploads/2013/06/Screen-Shot-2013-06-10-at-3.52.24-PM.jpg'

chrome.extension.onRequest.addListener(function(request, sender, callback) {
  updateOverlay(request.tabId, url, callback)
});

function getHistory() {
  return [
    {content: "one", description: "the first one"},
    {content: "two", description: "the second entry"}
  ]
}

chrome.omnibox.onInputChanged.addListener(function(text, suggest) {
    suggest(getHistory());
});

chrome.omnibox.onInputEntered.addListener(function(text) {
    alert('You just typed "' + text + '"');
});