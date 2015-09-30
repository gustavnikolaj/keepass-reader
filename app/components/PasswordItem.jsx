import React, { Component, PropTypes } from 'react'
import styles from './PasswordItem.less'

class PasswordItem extends Component {
  render () {
    const { title, isSelected, username, url } = this.props

    let detailItems = [
      { label: 'Username', data: username },
      { label: 'URL', data: url }
    ].filter(entry => { return entry.data !== '' }).map(entry => {
      return (
        <div className={ styles.detailItem }>
          <b>{entry.label}:</b> {entry.data}
        </div>
      )
    })

    let classNames = [styles.base]
    if (isSelected) {
      classNames.push(styles.selected)
    }

    return (
      <div className={ classNames.join(' ') }>
        <div className={ styles.title }>{title}</div>
        <div className={ styles.detail }>{detailItems}</div>
      </div>
    )
  }
}

PasswordItem.propTypes = {
  title: PropTypes.string,
  username: PropTypes.string,
  url: PropTypes.string,
  isSelected: PropTypes.bool
}

export default PasswordItem
