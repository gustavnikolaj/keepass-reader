module.exports = function (options) {
  options = options || {}

  if (!options.keepassClient) {
    throw new Error('needs options.keepassClient')
  }
  if (!options.appDataClient) {
    throw new Error('needs options.appDataClient')
  }
  if (!options.dialog) {
    throw new Error('needs options.dialog')
  }

  return function (response) {
    var path = options.dialog.showOpenDialog({
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

    options.appDataClient.set('keepassDatabasePath', path, function () {
      options.keepassClient.path(path)
      return response({ path: path })
    })
  }
}
