import React, { Component, PropTypes } from 'react'
import PasswordList from './PasswordList'

let keyCodes = {
  ARROWUP: 38,
  ARROWDOWN: 40
}

export default class PasswordSelector extends Component {
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
    let regexFilter = new RegExp(filter)
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
        <form onSubmit={ this.handleSubmit }>
          <input type='input'
                 ref='filter'
                 autoFocus
                 onKeyDown={this.handleOnKeyDown}
                 onChange={this.handleFilter} />
        </form>
        <PasswordList passwords={ filteredPasswords }
                      selectedIndex= { selectedIndex } />
      </div>
    )
  }
}

PasswordSelector.propTypes = {
  passwords: PropTypes.array
}
