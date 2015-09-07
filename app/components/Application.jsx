import React, { Component, PropTypes } from 'react'
import LoginBox from './LoginBox'
import LoadingScreen from './LoadingScreen'
import PasswordSelector from './PasswordSelector'
import { connect } from 'react-redux'

import fetchPasswordList from '../actions/fetchPasswordList'

 class Application extends Component {
  render () {
    const { dispatch, isUnlocked, isUnlocking, passwords } = this.props;
    if (isUnlocked) {
      return (
        <PasswordSelector passwords={ passwords }/>
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
  passwords: PropTypes.array
}

function select (state) {
  return {
    isUnlocked: state.database.isUnlocked,
    isUnlocking: state.database.isUnlocking,
    passwords: state.passwordList.passwords
  }
}

export default connect(select)(Application)
