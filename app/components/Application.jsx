import React, { Component, PropTypes } from 'react'
import LoginBox from './LoginBox'
import PasswordSelector from './PasswordSelector'
import { connect } from 'react-redux'

import fetchPasswordList from '../actions/fetchPasswordList'

 class Application extends Component {
  render () {
    const { dispatch, isUnlocked, isUnlocking } = this.props;
    if (isUnlocked) {
      return (
        <PasswordSelector />
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
  isUnlocking: PropTypes.bool
}

function select (state) {
  return {
    isUnlocked: state.database.isUnlocked,
    isUnlocking: state.database.isUnlocking
  }
}

export default connect(select)(Application)
