import React, { Component, PropTypes } from 'react'
import PasswordItem from './PasswordItem'

export default class PasswordList extends Component {
  render () {
    let passwordNodes = this.props.passwords.map(function (password) {
      return (
        <PasswordItem uuid={password.uuid} title={password.title} />
      );
    });

    console.log('rendering with filter', this.props.filter)

    return (
      <div>
        {passwordNodes}
      </div>
    )
  }
}

PasswordList.propTypes = {
  passwords: PropTypes.array,
  filter: PropTypes.string
}
