import React from 'react'
import ReactDOM from 'react-dom'

const PixelPerfect = () => <h1>Yay 2!</h1>

window.onload = function() {
  ReactDOM.render(<PixelPerfect/>, document.getElementById('app'))
  /*document.getElementById("test").onclick = function() {
    chrome.extension.sendRequest({ tabId: chrome.devtools.inspectedWindow.tabId },
        function(results) {
          console.log('result', results);
        }
    );
  }*/
}
