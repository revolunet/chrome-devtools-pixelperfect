
window.onload = function() {
  document.getElementById("test").onclick = function() {
    chrome.extension.sendRequest({ tabId: chrome.devtools.inspectedWindow.tabId },
        function(results) {
          console.log('result', results);
        }
    );
  }
}