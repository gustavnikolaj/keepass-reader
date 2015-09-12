import React, { Component, PropTypes } from 'react'

export default class LoginBox extends React.Component {
  constructor (props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleSubmit (e) {
    e.preventDefault()
    if (this.props.isSubmitting) return
    let masterKeyNode = React.findDOMNode(this.refs.masterKey)
    let masterKey = masterKeyNode.value
    this.props.submitMasterKey(masterKey)
  }
  render () {
    let { path, isSubmitting, requestPathDialog } = this.props
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <input type='text'
                 disabled
                 value={ path }
                 placeholder='Path to .kdbx'
                 ref='path' />
          <button type='button' onClick={ requestPathDialog }>...</button>
        </div>
        <input type='password'
               autoFocus
               placeholder='Master key...'
               disabled={ isSubmitting }
               ref='masterKey' />
        <button disabled={ isSubmitting }
                type="submit">Unlock!</button>
      </form>
    )
  }
}

LoginBox.propTypes = {
  submitMasterKey: PropTypes.function,
  requestPathDialog: PropTypes.function,
  path: PropTypes.string,
  isSubmitting: PropTypes.boolean
}
