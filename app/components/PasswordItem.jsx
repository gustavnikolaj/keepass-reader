import React, { Component, PropTypes } from 'react'
import Radium from 'radium'

class PasswordItem extends Component {
  render () {
    const { title, uuid, isSelected, username, url } = this.props
    let selectedStyle = {}
    if (isSelected) {
      selectedStyle.border = '3px solid blue'
    }

    let detailItems = [
      { label: 'Username', data: username },
      { label: 'URL', data: url }
    ].filter(entry => { return entry.data !== '' }).map(entry => {
        return (
          <div style={ styles.detailItem }>
            <b>{entry.label}:</b> {entry.data}
          </div>
        )
    });

    return (
      <div style={[ styles.base, isSelected && styles.selected ]}>
        <div style={ styles.title }>{title}</div>
        <div style={ styles.detail }>{detailItems}</div>
      </div>
    )
  }
}

PasswordItem.propTypes = {
  uuid: PropTypes.string,
  title: PropTypes.string,
  username: PropTypes.string,
  url: PropTypes.string,
  isSelected: PropTypes.bool
}

var styles = {
  selected: {
    background: '#eef',
    border: '1px solid #369'
  },
  base: {
    background: '#fafafa',
    borderRadius: 5,
    border: '1px solid #ddd',
    lineHeight: 1.5,
    paddingTop: 5,
    paddingRight: 10,
    paddingBottom: 5,
    paddingLeft: 10,
    margin: 10
  },
  title: {
    fontWeight: 'bold'
  },
  detail: {
    fontSize: '0.75em',
    display: 'flex'
  },
  detailItem: {
    flex: 1
  }
}

export default Radium(PasswordItem)
