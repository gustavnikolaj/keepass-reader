var menubar = require('menubar')
var globalShortcut = require('global-shortcut')

var modes = {
  FIXED: 'fixed',
  MENUBAR: 'menubar'
}

function App (options) {
  this.options = options
  this.mode = process.env.MENUBAR === 'false' ? modes.FIXED : modes.MENUBAR
  this.mb = null
  this.init()
}

App.prototype.init = function () {
  var mb
  if (this.mode === modes.MENUBAR) {
    mb = menubar(this.options)
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

  if (this.mode === modes.FIXED) {
    this.mb.window = new (require('browser-window'))({
      show: true
    })
    this.mb.window.loadUrl(this.options.index)

    if (process.env.NODE_ENV === 'development') {
      this.mb.window.openDevTools()
    }
  }
}

App.prototype.onWillQuit = function () {
  this.unregisterShortcut()
}

App.prototype.registerShortcut = function () {
  if (this.mode === modes.MENUBAR) {
    var boundToggle = this.toggleWindow.bind(this)
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
  if (this.mode === modes.MENUBAR) {
    this.mb.tray.emit('clicked', {}, { x: 0, y: 0 })
  }
}

App.prototype.getAppDataPath = function () {
  return this.mb.app.getPath('appData')
}

module.exports = App
