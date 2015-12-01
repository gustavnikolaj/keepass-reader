var menubar = require('menubar')
var globalShortcut = require('global-shortcut')
var modes = require('./modes')

function App (options) {
  this.options = options
  this.mb = null
  this.init()
}

App.prototype.init = function () {
  var mb
  if (this.options.mode === modes.MENUBAR) {
    mb = menubar(this.options.menubarOpts)
  } else {
    mb = { /* replaces menubar(menuBarOpts) call */
      app: require('app')
    }
  }
  this.mb = mb

  this.mb.app.on('ready', this.onReady.bind(this))
  this.mb.app.on('will-quit', this.onWillQuit.bind(this))
}

App.prototype.onReady = function () {
  this.registerShortcut()

  if (this.options.mode === modes.FIXED) {
    this.mb.window = new (require('browser-window'))({
      show: true
    })
    this.mb.window.loadUrl(this.options.menubarOpts.index)

    if (process.env.NODE_ENV === 'development') {
      this.mb.window.openDevTools()
    }
  }
}

App.prototype.onWillQuit = function () {
  this.unregisterShortcut()
}

App.prototype.registerShortcut = function () {
  if (this.options.mode === modes.MENUBAR) {
    var boundToggle = this.toggleWindow.bind(this)

    var problematicAccelerators = [
      'F12',
      'F5',
      'Control+R',
      'Control+Shift+I'
    ]

    problematicAccelerators
      .filter(globalShortcut.isRegistered.bind(globalShortcut))
      .forEach(globalShortcut.unregister.bind(globalShortcut))

    if (globalShortcut.isRegistered('F12')) {
      console.log('has binding for F12')
    }

    if (!globalShortcut.register('ctrl+shift+space', boundToggle)) {
      throw new Error('Could not register shortcut to open application.')
    }
  }
}

App.prototype.unregisterShortcut = function () {
  globalShortcut.unregisterAll()
}

App.prototype.toggleWindow = function () {
  // this could be done less hacky with mb.(show|hide)Window methods
  // but that requires us to keep state on wether or not our window is shown.
  if (this.options.mode === modes.MENUBAR) {
    this.mb.tray.emit('clicked', {}, { x: 0, y: 0 })
  }
}

App.prototype.getAppDataPath = function () {
  return this.mb.app.getPath('appData')
}

module.exports = App
