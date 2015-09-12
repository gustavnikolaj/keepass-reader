import React, { Component, PropTypes } from 'react'
import PasswordList from './PasswordList'
import Radium from 'radium'

let keyCodes = {
  ARROWUP: 38,
  ARROWDOWN: 40
}

class PasswordSelector extends Component {
  constructor (props) {
    super(props)

    this.state = {
      filter: '',
      selectedIndex: 0
    }

    this.handleFilter = this.handleFilter.bind(this)
    this.handleOnKeyDown = this.handleOnKeyDown.bind(this)
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
    console.log('select!')
    let uuid = this.getFilteredPasswords()[selectedIndex].uuid
    this.props.copyPassword(uuid)
  }

  handleOnKeyDown (e) {
    const { selectedIndex } = this.state

    if (e.keyCode === keyCodes.ARROWUP) {
      if (!(selectedIndex - 1 < 0)) {
        this.setState({
          selectedIndex: selectedIndex - 1
        })
      }
    } else if (e.keyCode === keyCodes.ARROWDOWN) {
      if (selectedIndex + 1 < this.getFilteredPasswords().length) {
        this.setState({
          selectedIndex: selectedIndex + 1
        })
      }
    }
  }

  render () {
    const { selectedIndex } = this.state
    let filteredPasswords = this.getFilteredPasswords()

    return (
      <div>
        <form onSubmit={ this.handleSubmit } style={ styles.inputContainer }>
          <input type='input'
                 ref='filter'
                 autoFocus
                 style={ styles.inputWide }
                 onKeyDown={this.handleOnKeyDown}
                 onChange={this.handleFilter} />
        </form>
        <div style={ styles.passwordList }>
          <PasswordList passwords={ filteredPasswords }
                        selectedIndex= { selectedIndex } />
        </div>
      </div>
    )
  }
}

PasswordSelector.propTypes = {
  passwords: PropTypes.array,
  copyPassword: PropTypes.function
}

var styles = {
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
  inputContainer: {
    position: 'absolute',
    top: 10,
    left: 10,
    right: 10
  },
  passwordList: {
    position: 'absolute',
    top: 60,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: 'auto'
  }
}

export default Radium(PasswordSelector)
