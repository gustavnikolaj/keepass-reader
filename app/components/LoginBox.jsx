import React, { Component, PropTypes } from 'react'
import Radium from 'radium'

class LoginBox extends Component {
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
        <div style={styles.inputContainer}>
          <input type='text'
                 style={[ styles.inputWide, styles.inputWideDisabled ]}
                 disabled
                 value={ path }
                 placeholder='Path to .kdbx'
                 ref='path' />
          <button type='button'
                  ref='pathDialogButton'
                  onClick={ requestPathDialog }
                  style={ styles.inputWideButton }>...</button>
        </div>
        <div style={ styles.inputContainer }>
          <input type='password'
                 style={ styles.inputWide }
                 autoFocus
                 placeholder='Master key...'
                 disabled={ isSubmitting }
                 ref='masterKey' />
          <button disabled={ isSubmitting }
                  ref='unlockButton'
                  style={ styles.inputWideButton }
                  type='submit'>Unlock!</button>
        </div>
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

var styles = {
  inputContainer: {
    position: 'relative',
    marginBottom: 10,
    width: '100%'
  },
  inputWide: {
    display: 'block',
    borderRadius: 5,
    border: '1px solid #ddd',
    outline: 'none',
    padding: 10,
    width: '100%',
    ':focus': {
      background: '#ffffee'
    }
  },
  inputWideDisabled: {
    background: '#f1f1f1'
  },
  inputWideButton: {
    position: 'absolute',
    border: '1px solid #ddd',
    outline: 0,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    width: 100,
    top: 0,
    right: 0,
    bottom: 0,
    ':hover': {
      borderColor: '#ccc'
    }
  }
}

export default Radium(LoginBox)
