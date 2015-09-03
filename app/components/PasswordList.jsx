import React from 'react'
import PasswordItem from './PasswordItem'

export default class PasswordList extends React.Component {
    render () {
        return (
            <div>
                <PasswordItem />
                <PasswordItem />
            </div>
        )
    }
}
