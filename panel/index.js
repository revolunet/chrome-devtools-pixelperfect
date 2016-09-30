import React from 'react'
import ReactDOM from 'react-dom'
import Dropzone from 'react-dropzone'

import Gallery from './Gallery'

//const PixelPerfect = () => <h1>Yay 2!</h1>

const items = [{
  url: 'http://a5.mzstatic.com/us/r30/Purple/v4/9a/15/79/9a157994-ffbd-9582-447b-4a23e9c75ca2/screen568x568.jpeg'
},{
  url: 'http://a2.mzstatic.com/us/r30/Purple6/v4/9b/e4/f0/9be4f0fa-12d6-4985-4e23-4e59245ce0d9/screen322x572.jpeg'
},{
  url: 'http://media.idownloadblog.com/wp-content/uploads/2013/07/iOS-7-Beta-4-screenshot-taking-Control-Center.png'
}]

function sendChromeRequest(data = {}, cb) {
  chrome.extension.sendRequest({
    tabId: chrome.devtools.inspectedWindow.tabId,
    ...data
  }, cb);
}

const Intro = () => <div>Try to drop some files here :)</div>

class PixelPerfect extends React.Component {
  state = {
    items: []
  }
  onClick = item => {
    sendChromeRequest({
      action: 'show',
      url: item.url
    }, function(res) {
      console.log('onClick res', res);
    })
  }
  onDrop = (files) => {
    files.forEach(file => {
      var reader = new FileReader();
      reader.onload = (readerEvt) => {
        let data = {
          url: readerEvt.target.result,
          name: file.name
        }
        sendChromeRequest({
          action: 'save',
          key: file.preview,
          data: data
        }, (res) => {
          console.log('save request callback', res);
          this.setState(prevState => ({
            items: prevState.items.concat([data])
          }))
        })
      };
      reader.readAsDataURL(file);
    })
  }
  onSelect = item => {
    console.log('onSelect', item);
    sendChromeRequest({
      action: 'show',
      url: item.url
    }, function(res) {
      console.log('onSelect res', res);
    })
  }
  onUnselect = item => {
    console.log('onUnselect', item);
    sendChromeRequest({
      action: 'show',
      url: null
    }, function(res) {
      console.log('onUnselect res', res);
    })
  }
  onRemoveItem = (item, idx) => {
    console.log('onRemoveItem', item, idx);
    this.setState(prevState => {
      prevState.items.splice(idx, 1);
      return {
        items: prevState.items
      }
    }, () => {
      sendChromeRequest({
        action: 'remove',
        key: item.key
      }, function(res) {
        console.log('onRemoveItem res', res);
      })
      sendChromeRequest({
        action: 'show',
        url: null
      }, function(res) {
        console.log('onRemoveItem res', res);
      })
    })
  } 
  componentDidMount() {
    sendChromeRequest({
      action: 'get',
      key: null
    }, (res) => {
      console.log('get res', res);
      const items = Object.keys(res).map(key => {
        return {
          key,
          ...res[key]
        }
      })
      this.setState({
        items
      })
    })
  }
  render() {
    const dropZoneStyle = {
      width:'100%',
      height: '100%',
      backgroundColor: 'white'
    }
    const dropZoneActiveStyle = {
      backgroundColor: 'silver'
    }
    return (<div>
              <h3>Pixel Perfect</h3>
              <Dropzone disableClick={ true } onDrop={this.onDrop} style={ dropZoneStyle } activeStyle={ dropZoneActiveStyle }>
                <Gallery items={ this.state.items } onSelect={ this.onSelect } onUnselect={ this.onUnselect } onRemoveItem={ this.onRemoveItem }/>
                { this.state.items.length === 0 ? <Intro /> : null }
              </Dropzone>
            </div>)
  }
}

window.onload = function() {
  ReactDOM.render(<PixelPerfect/>, document.getElementById('app'))
}
