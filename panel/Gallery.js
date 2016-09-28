import React from 'react'

const GalleryItem = ({ url, active, onClick }) => {
  let style = {
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
    backgroundImage: `url(${url})`
  }
  if (active) {
    style.borderSize = 2
    style.borderColor = 'black'
  }
  return <div onClick={ onClick } title={ url } style={ style }></div>
}

const GalleryView = ({ items, onClick, activeItemIndex }) => {
  return (<div>
            { items.map((item, idx) => <GalleryItem onClick={ () => onClick(item, idx) } key={ item.url } active={ idx===activeItemIndex } url={ item.url } />) }
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
  render() {
    console.log('render', this.state)
    return <GalleryView { ...this.props } onClick={ this.onClick } activeItemIndex={ this.state.activeItemIndex }/>
  }

}

export default Gallery