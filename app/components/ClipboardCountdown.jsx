import React, { Component, PropTypes } from 'react'
import styles from './ClipboardCountdown.less'

class ClipboardCountdown extends Component {
  constructor (props) {
    super(props)
    this.interval = false
    this.state = { percentage: 0 }

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
        <div className={ styles.barBase }>
          <div style={ style }
               className={ [styles.barBase, styles.barFront].join(' ') }></div>
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

export default ClipboardCountdown
