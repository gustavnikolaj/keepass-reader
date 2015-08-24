import React from 'react'
import LoginBox from './components/LoginBox.jsx'
import ipc from 'ipc'

var application = document.getElementById('application')

ipc.on('passwordResponse', function (hasPassword) {
    console.log('passwordResponse gotten');
});

function checkForPassword() {
    ipc.send('passwordRequest');
}

window.addEventListener('focus', checkForPassword)
window.addEventListener('load', checkForPassword)


React.render(
    <LoginBox />,
    application
)
