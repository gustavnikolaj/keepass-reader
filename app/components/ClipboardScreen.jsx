import React, { Component, PropTypes } from 'react'

class ClipboardScreen extends Component {
  render () {
    return (
      <div>
        Copied password for {this.props.title} to clipboard.
      </div>
    )
  }
}

ClipboardScreen.propTypes = {
  title: PropTypes.string
}

export default ClipboardScreen
