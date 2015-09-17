var resolveConfig = require('./config')
var App = require('./app')
var KeepassClient = require('./keepassClient')
var AppDataClient = require('./appDataClient')
var ClipboardClient = require('./clipboardClient')
var IpcBus = require('./ipcBus')

module.exports = function bootstrap(options) {
  var appConfig = resolveConfig(options)

  var app = new App(appConfig)
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
