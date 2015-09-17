var path = require('path')
var App = require('./app')
var KeepassClient = require('./keepassClient')
var AppDataClient = require('./appDataClient')
var ClipboardClient = require('./clipboardClient')
var IpcBus = require('./ipcBus')

module.exports = function bootstrap(nodeEnv) {
  var menuBarOpts = {
    dir: path.resolve(__dirname, '..', '..', 'app'),
    // width: 400,
    // height: 175,
    width: 500,
    height: 500,
    x: 0,
    y: 0
  }

  menuBarOpts.icon = path.resolve(menuBarOpts.dir, 'Icon-Template.png')

  if (nodeEnv === 'development') {
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
    .use('password', require('./handlers/password')({
      clipboardClient: clipboardClient,
      keepassClient: keepassClient
    }))
    .use('passwordList', require('./handlers/passwordList')({
      keepassClient: keepassClient
    }))
    .use('path', require('./handlers/path')({
      keepassClient: keepassClient,
      appDataClient: appDataClient
    }))
    .use('pathDialog', require('./handlers/pathDialog')({
      dialog: require('dialog'),
      keepassClient: keepassClient,
      appDataClient: appDataClient
    }))
}
