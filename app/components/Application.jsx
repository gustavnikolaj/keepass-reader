import React, { Component, PropTypes } from 'react'
import LoginBox from './LoginBox'
import LoadingScreen from './LoadingScreen'
import PasswordSelector from './PasswordSelector'
import ClipboardScreen from './ClipboardScreen'
import { connect } from 'react-redux'

import fetchPasswordList from '../actions/fetchPasswordList'
import copyPassword from '../actions/copyPassword'

 class Application extends Component {
  constructor (props) {
    super(props)

    this.getPasswordTitleByUuid = this.getPasswordTitleByUuid.bind(this)
  }

  getPasswordTitleByUuid (uuid) {
    let passwordTitle
    this.props.passwordList.some(entry => {
      if (entry.uuid === uuid) {
        passwordTitle = entry.title
      }
    })
    return passwordTitle
  }

  render () {
    const {
      dispatch,
      isUnlocked,
      isUnlocking,
      passwordOnClipboard,
      isFetchingPasswordList,
      passwordList
    } = this.props

    if (passwordOnClipboard) {
      let title = this.getPasswordTitleByUuid(passwordOnClipboard)
      return (
        <ClipboardScreen title={ title } />
      )
    } else if (isUnlocked) {
      return (
        <PasswordSelector copyPassword={ uuid => dispatch(copyPassword(uuid)) }
                          passwords={ passwordList } />
      )
    } else if (isUnlocking) {
      return (
        <LoadingScreen />
      )
    } else {
      return (
        <LoginBox submitMasterKey={ key => dispatch(fetchPasswordList(key)) }
                  isSubmitting={isUnlocking} />
      )
    }
  }
}

Application.propTypes = {
  isUnlocked: PropTypes.bool,
  isUnlocking: PropTypes.bool,
  passwordOnClipboard: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool
  ]),
  isFetchingPasswordList: PropTypes.bool,
  passwordList: PropTypes.array
}

export default connect(state => state)(Application)
