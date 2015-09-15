import React, { Component, PropTypes } from 'react'
import Radium from 'radium'

class ClipboardCountdown extends Component {
  constructor (props) {
    super(props)
    this.interval = false

    this.setState({
      remainingPercentage: 0
    })

    this.componentWillReceiveProps(props)
    this.tick = this.tick.bind(this)
  }

  tick (nextProps) {
    clearInterval(this.interval)

    const { timeOut, timeIn } = nextProps

    let initDelta = Math.max(timeOut - timeIn, 0)
    let currDelta = Math.max(timeOut - Date.now(), 0)
    let percentage = initDelta * currDelta > 0 ? Math.floor(100 / initDelta * currDelta) : 0

    this.setState({ percentage })

    if (percentage) {
      this.interval = setInterval(() => {
        this.tick({ timeOut, timeIn })
      }, 250)
    }
  }

  componentWillReceiveProps (nextProps) {
    this.tick(nextProps.clipboardTimer)
  }

  render () {
    const { percentage } = this.state

    if (percentage > 0) {
      let style = {
        right: '' + (100 - percentage) + '%'
      }
      return (
        <div style={ styles.barBase }>
          <div style={[ styles.barBase, styles.barFront, style ]}></div>
        </div>
      )
    } else {
      return <div></div>
    }
  }
}

ClipboardCountdown.propTypes = {
  clipboardTimer: PropTypes.obj
}

var styles = {
  barBase: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 4,
    background: '#fafafa',
    zIndex: 1000
  },
  barFront: {
    zIndex: 1001,
    background: '#369',
    'transition': '200ms ease-in right'
  }
}

export default Radium(ClipboardCountdown)
