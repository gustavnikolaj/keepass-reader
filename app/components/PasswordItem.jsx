import React, { Component, PropTypes } from 'react'

export default class PasswordItem extends Component {
  render () {
    const { title, uuid, isSelected } = this.props
    let selectedStyle = {}
    if (isSelected) {
      selectedStyle.border = '3px solid blue'
    }
    return (
      <div className='passwordItem' style={ selectedStyle }>
        <h2 className='passwordItem title'>
          {title}
        </h2>
        <i>{uuid}</i>
      </div>
    )
  }
}

PasswordItem.propTypes = {
  uuid: PropTypes.string,
  title: PropTypes.string,
  isSelected: PropTypes.bool
}
