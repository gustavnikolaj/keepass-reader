import React, { Component, PropTypes } from 'react'
import PasswordList from './PasswordList'

export default class PasswordSelector extends Component {
  constructor (props) {
    super(props)

    this.state = {
      filter: ''
    }

    this.handleFilter = this.handleFilter.bind(this)
    this.handleOnKeyDown = this.handleOnKeyDown.bind(this)
  }

  handleFilter () {
    this.setState({
      filter: this.refs.filter.getDOMNode().value
    });
  }

  handleOnKeyDown (e) {
    // 40: Arrow Down
    // 38: Arrow Up
  }

  render () {
    const { passwords } = this.props;
    const { filter } = this.state;

    let regexFilter = new RegExp(filter)
    let filteredPasswords = passwords.filter(entry => {
      return regexFilter.test(entry.title)
    })

    let selectedIndex = 0

    return (
      <div>
        <form>
          <input type='input'
                 ref='filter'
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
