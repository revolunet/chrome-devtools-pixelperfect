
class Overlay {
  constructor(url) {
    this.node = document.createElement('img');
    this.node.style.position = 'absolute';
    this.node.style.top = 0;
    this.node.style.left = 0;
    this.node.style.width = '100%';
    this.node.style.height = '100%';
    this.node.style.zIndex = 999999999;
    this.node.style.backgroundSize = 'cover';
    this.node.style.opacity = 0.5;
    this.setUrl(url)
    this.mount()
  }
  setUrl(url) {
    if (url) {
      this.node.style.backgroundImage = 'url(' + url + ')';
    }
  }
  mount() {
    document.body.appendChild(this.node)
  }
  unmount() {
    this.node.parentNode.removeChild(this.node)
  }
}

function createOverlay(url) {
  return new Overlay(url)
}

let overlay;

function updateOverlay(url) {
  if (overlay) {
    overlay.setUrl(url)
  } else {
    overlay = createOverlay(url)
  }
}


function toggleOverlay(url) {
  if (overlay) {
    overlay.toggle()
  }
}

chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
  updateOverlay(request.url);
  sendResponse('pouet')
});