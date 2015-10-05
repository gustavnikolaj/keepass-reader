import React, { Component, PropTypes } from 'react'
import { HotKeys } from 'react-hotkeys'
import PasswordList from './PasswordList'
import styles from './PasswordSelector.less'

class PasswordSelector extends Component {
  constructor (props) {
    super(props)

    this.state = {
      filter: '',
      selectedIndex: 0
    }

    this.handleFilter = this.handleFilter.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.getFilteredPasswords = this.getFilteredPasswords.bind(this)
  }

  handleFilter () {
    this.setState({
      filter: this.refs.filter.getDOMNode().value,
      selectedIndex: 0
    })
  }

  getFilteredPasswords () {
    const { filter } = this.state
    let regexFilter = new RegExp(filter, 'i')
    return this.props.passwords.filter(entry => {
      return regexFilter.test(entry.title)
    })
  }

  handleSubmit (e) {
    e.preventDefault()
    const { selectedIndex } = this.state
    let uuid = this.getFilteredPasswords()[selectedIndex].uuid
    this.refs.filter.getDOMNode().value = ''
    this.setState({ filter: '' })
    this.props.copyPassword(uuid)
  }

  handleCtrlEnter (e) {
    const { selectedIndex } = this.state
    let uuid = this.getFilteredPasswords()[selectedIndex].uuid
    this.props.copyUsername(uuid)
    e.preventDefault()
  }

  handleEscape (e) {
    if (this.state.filter) {
      this.refs.filter.getDOMNode().value = ''
      this.handleFilter()
      e.stopPropagation()
    }
  }

  handleArrowUp (e) {
    const { selectedIndex } = this.state
    if (!(selectedIndex - 1 < 0)) {
      this.setState({
        selectedIndex: selectedIndex - 1
      })
    }
  }

  handleArrowDown (e) {
    const { selectedIndex } = this.state
    if (selectedIndex + 1 < this.getFilteredPasswords().length) {
      this.setState({
        selectedIndex: selectedIndex + 1
      })
    }
  }

  render () {
    const { selectedIndex } = this.state
    let filteredPasswords = this.getFilteredPasswords()

    const handlers = {
      'esc': this.handleEscape.bind(this),
      'ctrl+enter': this.handleCtrlEnter.bind(this),
      'up': this.handleArrowUp.bind(this),
      'down': this.handleArrowDown.bind(this),
      'ctrl+k': this.handleArrowUp.bind(this),
      'ctrl+j': this.handleArrowDown.bind(this)
    }

    return (
      <HotKeys keyMap={{}} handlers={ handlers }>
        <div>
          <form onSubmit={ this.handleSubmit }
                className={ styles.inputContainer }>
            <input type='input'
                   ref='filter'
                   autoFocus
                   className={ styles.inputWide }
                   onChange={this.handleFilter} />
          </form>
          <div className={ styles.passwordList }>
            <PasswordList passwords={ filteredPasswords }
                          selectedIndex= { selectedIndex } />
          </div>
        </div>
      </HotKeys>
    )
  }
}

PasswordSelector.propTypes = {
  passwords: PropTypes.array,
  copyPassword: PropTypes.function,
  copyUsername: PropTypes.function
}

export default PasswordSelector
