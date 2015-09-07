import React, { Component, PropTypes } from 'react'

export default class PasswordFilter extends Component {
  constructor (props) {
    super(props)

    this.handleChange = this.handleChange.bind(this)
  }
  handleChange () {
    this.props.onInput(this.refs.filterInput.getDOMNode().value)
  }
  render () {
    return (
      <input type='input'
             ref='filterInput'
             onChange={this.handleChange} />
    )
  }
}

PasswordFilter.propTypes = {
  onChange: PropTypes.function
}
