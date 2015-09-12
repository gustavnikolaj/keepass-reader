var menubar = require('menubar')
var globalShortcut = require('global-shortcut')
var path = require('path')
var KeepassClient = require('./lib/keepassClient')
var AppDataClient = require('./lib/appDataClient')
var IpcBus = require('./lib/ipcBus')

require('electron-debug')()
require('crash-reporter').start()

var WINDOW_MODE = process.env.MENUBAR === 'false' ? 'fixed' : 'menubar'
var WINDOW_MODE_MENUBAR = WINDOW_MODE === 'menubar'
var WINDOW_MODE_FIXED = WINDOW_MODE === 'fixed'

var menuBarOpts = {
  dir: path.resolve(__dirname, '..', 'app'),
  // width: 400,
  // height: 175,
  width: 500,
  height: 500,
  x: 0,
  y: 0
}

menuBarOpts.icon = path.resolve(menuBarOpts.dir, 'Icon-Template.png')

if (process.env.NODE_ENV === 'development') {
  menuBarOpts.index = 'file://' + path.join(menuBarOpts.dir, 'index-dev.html')
} else {
  menuBarOpts.index = 'file://' + path.join(menuBarOpts.dir, 'index.html')
}

var mb
if (WINDOW_MODE_MENUBAR) {
  mb = menubar(menuBarOpts)
} else {
  mb = { /* replaces menubar(menuBarOpts) call */
    app: require('app')
  }
}

var ipcBus = new IpcBus(require('ipc'))
var keepassClient = new KeepassClient()
var appDataClient = new AppDataClient({
  appDataPath: mb.app.getPath('appData'),
  appName: 'keepass-menubar'
})

ipcBus
  .use('password', require('./lib/handlers/password')({
    keepassClient: keepassClient
  }))
  .use('passwordList', require('./lib/handlers/passwordList')({
    keepassClient: keepassClient
  }))
  .use('path', require('./lib/handlers/path')({
    keepassClient: keepassClient,
    appDataClient: appDataClient
  }))
  .use('pathDialog', require('./lib/handlers/pathDialog')({
    dialog: require('dialog'),
    keepassClient: keepassClient,
    appDataClient: appDataClient
  }))

function registerShortcut () {
  function openApplication () {
    mb.tray.emit('clicked', {}, { x: 0, y: 0 })
  }
  if (WINDOW_MODE_MENUBAR) {
    if (!globalShortcut.register('ctrl+shift+space', openApplication)) {
      throw new Error('Could not register shortcut to open application.')
    }
  }
}

function unregisterShortcut () {
  globalShortcut.unregisterAll()
}

function maybeOpenFixedWindow () {
  if (WINDOW_MODE_FIXED) {
    mb.window = new (require('browser-window'))({
      show: true
    })
    mb.window.loadUrl(menuBarOpts.index)

    if (process.env.NODE_ENV === 'development') {
      mb.window.openDevTools()
    }
  }
}

mb.app.on('ready', function () {
  registerShortcut()
  maybeOpenFixedWindow()
})

mb.app.on('will-quit', function () {
  unregisterShortcut()
})
