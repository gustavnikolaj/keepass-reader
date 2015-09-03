import React from 'react'
import Application from './components/Application.jsx'
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
    <Application />,
    application
)
