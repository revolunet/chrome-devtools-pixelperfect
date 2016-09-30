
class Storage {
  constructor(storage) {
    this.storage = storage
  }
  get(key, cb) {
     this.storage.get(key, cb);
  }
  remove(key, cb) {
     this.storage.remove(key, cb);
  }
  set(key, data, cb) {
     this.storage.set({[key]: data}, cb);
  }
}

const storageMock = {
  get: (key, cb) => {
    console.log('MOCK GET', key, cb)
    cb()
  },
  remove: (key, cb) => {
    console.log('MOCK REMOVE', key, cb)
    cb()
  },
  set: (pair, cb) => {
    console.log('MOCK SET -', pair, '-', '-', cb)
    cb()
  }
}

const getStorage = () => {
  return new Storage(chrome && chrome.storage && chrome.storage.local || storageMock)
}

 
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
  console.log('updateOverlay', tabId, url)
  chrome.tabs.executeScript(tabId, { file: "content_script.js" }, function() {
    if (url) {
      getBase64FromImageUrl(url, function(b64) {
        chrome.tabs.sendRequest(tabId, {url: b64}, function(results) {
          callback(results)
        });
      });
    } else {
      chrome.tabs.sendRequest(tabId, {url: null}, function(results) {
          callback(results)
        });
    }
    
  });
}

chrome.extension.onRequest.addListener(function(request, sender, callback) {
  if (request.action === 'show') {
    updateOverlay(request.tabId, request.url, callback)
  } else if (request.action === 'save') {
    getStorage().set(request.key, request.data, result => {
      console.log('storage.set OK', result)
      callback(result)
    })
  } else if (request.action === 'get') {
    getStorage().get(request.key, result => {
      console.log('storage.get OK', result)
      callback(result)
    })
  } else if (request.action === 'remove') {
    getStorage().remove(request.key, result => {
      console.log('storage.remove OK', result)
      callback(result)
    })
  }
});

// TODO
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