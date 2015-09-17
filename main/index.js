var path = require('path')
var App = require('./lib/app')
var KeepassClient = require('./lib/keepassClient')
var AppDataClient = require('./lib/appDataClient')
var ClipboardClient = require('./lib/clipboardClient')
var IpcBus = require('./lib/ipcBus')

require('electron-debug')()
require('crash-reporter').start()

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

var app = new App(menuBarOpts)
var ipcBus = new IpcBus(require('ipc'))
var keepassClient = new KeepassClient()
var appDataClient = new AppDataClient({
  appDataPath: app.getAppDataPath(),
  appName: 'keepass-menubar'
})
var clipboardClient = new ClipboardClient({
  clipboardModule: require('clipboard')
})

ipcBus
  .use('password', require('./lib/handlers/password')({
    clipboardClient: clipboardClient,
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
