import React from 'react'
import PasswordFilter from './PasswordFilter'
import PasswordList from './PasswordList'

export default class PasswordSelector extends React.Component {
    render () {
        return (
            <div>
                <PasswordFilter />
                <PasswordList />
            </div>
        )
    }
}
