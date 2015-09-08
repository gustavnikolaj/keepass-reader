import React, { Component, PropTypes } from 'react'
import PasswordItem from './PasswordItem'

export default class PasswordList extends Component {
  render () {
    const { passwords, selectedIndex } = this.props
    let passwordNodes = passwords.map(function (password, i) {
      let isSelected = i === selectedIndex
      return (
        <PasswordItem uuid={password.uuid}
                      title={password.title}
                      isSelected={isSelected} />
      );
    });

    return (
      <div>
        {passwordNodes}
      </div>
    )
  }
}

PasswordList.propTypes = {
  passwords: PropTypes.array,
  selectedIndex: PropTypes.number
}
