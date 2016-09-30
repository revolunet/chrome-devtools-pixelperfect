import React from 'react'

const GalleryItem = ({ url, name, active, onClick, onCloseClick }) => {
  const style = {
    cursor: 'pointer',
    margin: 5,
    display: 'inline-block',
    border: '1px solid silver',
    borderColor: 'silver',
    borderSize: 1,
    width: 100,
    height: 100,
    backgroundPosition: 'center center',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundImage: `url(${url})`,
    position: 'relative'
  }
  const closeStyle = {
    position: 'absolute',
    top: 0,
    right: 0,
    background: 'white',
    color: 'black',
    width: 20,
    height: 20,
    textAlign: 'center'
  }
  if (active) {
    style.borderSize = 2
    style.borderColor = 'black'
  }
  const close = e => {
    e.stopPropagation()
    onCloseClick();
  }
  return (<div onClick={ onClick } title={ name } style={ style }>
      <div onClick={ close } style={ closeStyle }>x</div>
    </div>)
}

const GalleryView = ({ items, onClick, onCloseClick, activeItemIndex }) => {
  return (<div>
            { items.map((item, idx) => <GalleryItem onClick={ () => onClick(item, idx) } onCloseClick={ () => onCloseClick(item, idx) }  key={ item.key } active={ idx===activeItemIndex } url={ item.url } name={ item.name } />) }
          </div>);
}

class Gallery extends React.Component {
  state = {
    activeItemIndex: null
  }
  onClick = (item, idx) => {
    this.setState(prevState => {
      if (prevState.activeItemIndex === idx) {
        // toggle
        return {
          activeItemIndex: null
        }
      } else {
        // change
        return {
          activeItemIndex: idx
        }
      }
    }, () => {
      if (this.state.activeItemIndex !== null) {
        // selected something 
        this.props.onSelect(item)
      } else {
        // unselected something
        this.props.onUnselect(item)
      }
    })
  }
  onCloseClick = (item, idx) => {
    this.setState({
      activeItemIndex: null
    }, () => {
      this.props.onRemoveItem(item, idx)
    })
  }
  render() {
    return <GalleryView { ...this.props } onClick={ this.onClick } onCloseClick={ this.onCloseClick } activeItemIndex={ this.state.activeItemIndex }/>
  }

}

export default Gallery