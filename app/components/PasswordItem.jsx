import React, { Component, PropTypes } from 'react'
import Radium from 'radium'

class PasswordItem extends Component {
  render () {
    const { title, uuid, isSelected } = this.props
    let selectedStyle = {}
    if (isSelected) {
      selectedStyle.border = '3px solid blue'
    }
    return (
      <div style={[ styles.base, isSelected && styles.selected ]}>
        <div style={ styles.title }>{title}</div>
        <div style={ styles.detail }>
          <i>{uuid}</i>
        </div>
      </div>
    )
  }
}

PasswordItem.propTypes = {
  uuid: PropTypes.string,
  title: PropTypes.string,
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
    fontSize: '0.75em'
  }
}

export default Radium(PasswordItem)
