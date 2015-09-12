var menubar = require('menubar')
var globalShortcut = require('global-shortcut')
var ipc = require('ipc')
var path = require('path')
var dialog = require('dialog')
var KeepassClient = require('./lib/keepassClient')
var AppDataClient = require('./lib/appDataClient')

require('electron-debug')();
require('crash-reporter').start();

var menuBarOpts = {
  dir: __dirname + '/app',
  //width: 400,
  //height: 175,
  width:500,
  height: 500,
  x: 0,
  y: 0,
  icon: __dirname + '/app/Icon-Template.png'
}

if (process.env.NODE_ENV === 'development') {
  menuBarOpts.index = 'file://' + path.join(menuBarOpts.dir, 'index-dev.html')
} else {
  menuBarOpts.index = 'file://' + path.join(menuBarOpts.dir, 'index.html')
}

// var mb = menubar(menuBarOpts)

var mb = { /* replaces menubar(menuBarOpts) call */
  app: require('app')
};

function openApplication () {
  mb.tray.emit('clicked', {}, { x: 0, y: 0 })
}

var keepassClient = new KeepassClient();
var appDataClient = new AppDataClient({
  appDataPath: mb.app.getPath('appData'),
  appName: 'keepass-menubar'
})

mb.app.on('ready', function () {
  if (!globalShortcut.register('ctrl+shift+space', openApplication)) {
    throw new Error('Could not register shortcut to open application.')
  }
  /* replaces menubar(menuBarOpts) call */
  mb.window = new (require('browser-window'))({
    show: true
  })
  mb.window.loadUrl(menuBarOpts.index)
  /***/

  if (process.env.NODE_ENV === 'development') {
    mb.window.openDevTools();
  }
})

mb.app.on('will-quit', function () {
  globalShortcut.unregisterAll()
})



ipc.on('passwordRequest', function (event, uuid) {
  keepassClient.getPassword(uuid, function (err, password) {
    if (err) {
      return event.sender.send('passwordResponse', {
        error: 'LOCKED_DATABASE'
      })
    }

    return event.sender.send('passwordResponse', { password })
  })
})

ipc.on('passwordListRequest', function (event, masterKey) {
  if (masterKey) {
    keepassClient.masterKey(masterKey)
  }
  keepassClient.getList(function (err, passwords) {
    if (err) {
      console.log(err)
      return event.sender.send('passwordListResponse', {
        error: 'LOCKED_DATABASE'
      })
    }

    return event.sender.send('passwordListResponse', {
      passwords
    })
  })
})

ipc.on('pathRequest', function (event) {
  appDataClient.get('keepassDatabasePath', function (err, databasePath) {
    if (databasePath !== keepassClient.path()) {
      keepassClient.path(databasePath)
    }
    return event.sender.send('pathResponse', { path: databasePath })
  })
})

ipc.on('pathDialogRequest', function (event) {
  var path = dialog.showOpenDialog({
    defaultPath: process.env.HOME,
    title: 'Select your kdbx database',
    filters: [
      {
        name: 'Keepass 2 Databases (.kdbx)',
        extensions: [ 'kdbx' ]
      }
    ],
    properties: [ 'openFile' ]
  })

  if (path && path.length === 1) {
    path = path[0]
  } else {
    path = null
  }

  appDataClient.set('keepassDatabasePath', path, function () {
    keepassClient.path(path)
    return event.sender.send('pathDialogResponse', { path: path })
  })
})
