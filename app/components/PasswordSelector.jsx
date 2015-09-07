import React, { Component, PropTypes } from 'react'
import PasswordFilter from './PasswordFilter'
import PasswordList from './PasswordList'

export default class PasswordSelector extends Component {
  constructor (props) {
    super(props)

    this.state = {
      filter: ''
    }

    this.handleInput = this.handleInput.bind(this)
  }

  handleInput (filterText) {
    this.setState({
      filter: filterText
    });
  }

  render () {
    const { passwords } = this.props;

    return (
      <div>
        <b>Select your password</b>
        <PasswordFilter onInput={ this.handleInput } />
        <PasswordList passwords={ passwords } filter={ this.state.filter } />
      </div>
    )
  }
}

PasswordSelector.propTypes = {
  passwords: PropTypes.array
}
