
class Overlay {
  constructor(url) {
    this.node = document.createElement('div');
    this.node.style.position = 'absolute';
    this.node.style.top = 0;
    this.node.style.left = 0;
    this.node.style.width = '100%';
    this.node.style.height = '100%';
    this.node.style.zIndex = 999999999;
    this.node.style.backgroundSize = 'cover';
    this.node.style.opacity = 0.5;
    this.node.style.display = 'none';
    if (url) {
      this.setUrl(url)
    }
    this.mount()
  }
  setUrl(url) {
    if (url) {
      this.node.style.display = 'block';
      this.node.style.backgroundImage = 'url(' + url + ')';
    } else {
      this.node.style.display = 'none';
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

let overlay = createOverlay()

function updateOverlay(url) {
  overlay.setUrl(url)
}


chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
  updateOverlay(request.url);
  sendResponse('pouet')
});