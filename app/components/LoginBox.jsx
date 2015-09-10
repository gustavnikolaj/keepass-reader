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
    return (
      <form onSubmit={this.handleSubmit}>
        <input type='password'
               autoFocus
               placeholder='Type your master key'
               disabled={this.props.isSubmitting}
               ref='masterKey' />
        <button disabled={this.props.isSubmitting}
                type="submit">Unlock!</button>
      </form>
    )
  }
}

LoginBox.propTypes = {
  submitMasterKey: PropTypes.function,
  isSubmitting: PropTypes.boolean
}
