import React from 'react'
import LoginBox from './LoginBox'
import PasswordSelector from './PasswordSelector'

export default class Application extends React.Component {
  render () {
    if (this.props.hasPassword) {
      return (
        <PasswordSelector />
      )
    } else {
      return (
        <LoginBox />
      )
    }
  }
}

Application.propTypes = {
  hasPassword: React.PropTypes.bool
}
