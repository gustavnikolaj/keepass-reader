var menubar = require('menubar')
var globalShortcut = require('global-shortcut')
var ipc = require('ipc')

var mb = menubar({
  dir: __dirname + '/app',
  width: 400,
  height: 175,
  x: 0,
  y: 0,
  icon: __dirname + '/app/Icon-Template.png'
})

function openApplication () {
  mb.tray.emit('clicked', {}, { x: 0, y: 0 })
}

mb.app.on('ready', function () {
  if (!globalShortcut.register('ctrl+shift+space', openApplication)) {
    throw new Error('Could not register shortcut to open application.')
  }
})

mb.app.on('will-quit', function () {
  globalShortcut.unregisterAll()
})

ipc.on('passwordRequest', function (event) {
  console.log('passwordRequest received', Array.prototype.slice(arguments, 1))
  event.sender.send('passwordResponse', false)
})
