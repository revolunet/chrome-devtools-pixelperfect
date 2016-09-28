import React from 'react'
import ReactDOM from 'react-dom'

//const PixelPerfect = () => <h1>Yay 2!</h1>

const items = [{
  url: 'http://a5.mzstatic.com/us/r30/Purple/v4/9a/15/79/9a157994-ffbd-9582-447b-4a23e9c75ca2/screen568x568.jpeg'
},{
  url: 'http://a2.mzstatic.com/us/r30/Purple6/v4/9b/e4/f0/9be4f0fa-12d6-4985-4e23-4e59245ce0d9/screen322x572.jpeg'
},{
  url: 'http://media.idownloadblog.com/wp-content/uploads/2013/07/iOS-7-Beta-4-screenshot-taking-Control-Center.png'
}]

const GalleryItem = ({ url, active, onClick }) => {
  let style = {
    cursor: 'pointer',
    margin: 5,
    display: 'inline-block',
    border: '1px solid silver',
    width: 100,
    height: 100,
    backgroundPosition: 'center center',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundImage: `url(${url})`
  }
  if (active) {
    style.borderSize = 2
    style.borderColor = 'black'
  }
  return <div onClick={ onClick } title={ url } style={ style }></div>
}

const Gallery = ({ onClick }) => {
  return (<div>
            { items.map((item, idx) => <GalleryItem onClick={ () => onClick(item) } key={ item.url } active={ idx===1 } url={ item.url } />) }
          </div>);
}

function sendChromeRequest(data = {}, cb) {
  chrome.extension.sendRequest({
    tabId: chrome.devtools.inspectedWindow.tabId,
    ...data
  }, cb);
}


class PixelPerfect extends React.Component {
  onClick = item => {
    console.log('onClick', item);
    sendChromeRequest({
      action: 'show',
      url: item.url
    }, function(res) {
      console.log('onClick res', res);
    })
  }
  onToggle() {
    sendChromeRequest({
      action: 'toggle',
    }, function(res) {
      console.log('onToggle res', res);
    })
  }
  render() {
    return (<div>
              <h3>Pixel Perfect</h3>
              <button onClick={ this.onToggle }>toggle</button>
              <Gallery onClick={ this.onClick } />
            </div>)
  }
}

window.onload = function() {
  ReactDOM.render(<PixelPerfect/>, document.getElementById('app'))
}
