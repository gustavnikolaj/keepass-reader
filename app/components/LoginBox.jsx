import React, { Component, PropTypes } from 'react'
import styles from './LoginBox.less'

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
    let {
      path,
      keyFilePath,
      clearKeyFilePath,
      isSubmitting,
      requestPathDialog,
      requestKeyFileDialog
    } = this.props

    let keyFileDialogOnClick = () => {
      if (keyFilePath) {
        return clearKeyFilePath()
      } else {
        return requestKeyFileDialog()
      }
    }

    let keyFileDialogButtonLabel = keyFilePath ? 'Remove' : '...'

    return (
      <form onSubmit={this.handleSubmit}>
        <div className={styles.inputContainer}>
          <input type='text'
                 className={ styles.inputWide }
                 disabled
                 value={ path }
                 placeholder='Path to .kdbx'
                 ref='path' />
          <button type='button'
                  ref='pathDialogButton'
                  onClick={ requestPathDialog }
                  className={ styles.inputWideButton }>...</button>
        </div>
        <div className={styles.inputContainer}>
          <input type='text'
                 className={ styles.inputWide }
                 disabled
                 value={ keyFilePath }
                 placeholder='Path to key file'
                 ref='keyFilePath' />
          <button type='button'
                  ref='keyFileDialogButton'
                  onClick={ keyFileDialogOnClick }
                  className={ styles.inputWideButton }>{ keyFileDialogButtonLabel }</button>
        </div>
        <div className={ styles.inputContainer }>
          <input type='password'
                 className={ styles.inputWide }
                 autoFocus
                 placeholder='Master key...'
                 disabled={ isSubmitting }
                 ref='masterKey' />
          <button disabled={ isSubmitting }
                  ref='unlockButton'
                  className={ styles.inputWideButton }
                  type='submit'>Unlock!</button>
        </div>
      </form>
    )
  }
}

LoginBox.propTypes = {
  submitMasterKey: PropTypes.function,
  requestPathDialog: PropTypes.function,
  requestKeyFileDialog: PropTypes.function,
  path: PropTypes.string,
  keyFilePath: PropTypes.string,
  clearKeyFilePath: PropTypes.string,
  isSubmitting: PropTypes.boolean
}

export default LoginBox
