import React, { Component, PropTypes } from 'react'

export default class PasswordItem extends Component {
  render () {
    return (
      <div className="passwordItem">
        <h2 className="passwordItem-title">
          {this.props.title}
        </h2>
        <i>{this.props.uuid}</i>
      </div>
    )
  }
}

PasswordItem.propTypes = {
  uuid: PropTypes.string,
  title: PropTypes.string
}
