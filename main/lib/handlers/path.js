module.exports = function (options) {
  options = options || {}

  if (!options.keepassClient) {
    throw new Error('needs options.keepassClient')
  }
  if (!options.appDataClient) {
    throw new Error('needs options.appDataClient')
  }

  return function (response) {
    options.appDataClient.get('keepassDatabasePath', function (err, path) {
      if (err) {
        options.keepassClient.path(null)
        return response({ path: '' })
      }
      if (path !== options.keepassClient.path()) {
        options.keepassClient.path(path)
      }
      return response({ path: path })
    })
  }
}
