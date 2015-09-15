import React, { Component, PropTypes } from 'react'
import LoginBox from './LoginBox'
import LoadingScreen from './LoadingScreen'
import PasswordSelector from './PasswordSelector'
import ClipboardCountdown from './ClipboardCountdown'
import { connect } from 'react-redux'

import fetchPasswordList from '../actions/fetchPasswordList'
import requestPathDialog from '../actions/requestPathDialog'
import copyPassword from '../actions/copyPassword'

class Application extends Component {
  render () {
    const {
      dispatch,
      isUnlocked,
      isUnlocking,
      path,
      clipboard,
      passwordList
    } = this.props

    if (isUnlocked) {
      return (
        <div>
          <ClipboardCountdown clipboardTimer={ clipboard } />
          <PasswordSelector copyPassword={ uuid => dispatch(copyPassword(uuid)) }
                            passwords={ passwordList } />
        </div>
      )
    } else if (isUnlocking) {
      return (
        <LoadingScreen />
      )
    } else {
      return (
        <LoginBox submitMasterKey={ key => dispatch(fetchPasswordList(key)) }
                  requestPathDialog={ () => dispatch(requestPathDialog()) }
                  path= { path }
                  isSubmitting={ isUnlocking } />
      )
    }
  }
}

Application.propTypes = {
  dispatch: PropTypes.function,
  isUnlocked: PropTypes.bool,
  isUnlocking: PropTypes.bool,
  path: PropTypes.string,
  clipboard: PropTypes.obj,
  passwordList: PropTypes.array
}

export default connect(state => state)(Application)
