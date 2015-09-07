import React, { Component, PropTypes } from 'react'
import PasswordList from './PasswordList'

export default class PasswordSelector extends Component {
  constructor (props) {
    super(props)

    this.state = {
      filter: ''
    }

    this.handleFilter = this.handleFilter.bind(this)
  }

  handleFilter () {
    this.setState({
      filter: this.refs.filter.getDOMNode().value
    });
  }

  render () {
    const { passwords } = this.props;

    let regexFilter = new RegExp(this.state.filter)
    let filteredPasswords = passwords.filter(function (entry) {
      return regexFilter.test(entry.title)
    })

    return (
      <div>
        <form>
          <input type='input'
                 ref='filter'
                 onChange={this.handleFilter} />
        </form>
        <PasswordList passwords={ filteredPasswords } />
      </div>
    )
  }
}

PasswordSelector.propTypes = {
  passwords: PropTypes.array
}
