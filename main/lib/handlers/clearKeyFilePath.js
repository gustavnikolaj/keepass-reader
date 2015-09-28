module.exports = function (options) {
  options = options || {}

  if (!options.keepassClient) {
    throw new Error('needs options.keepassClient')
  }
  if (!options.appDataClient) {
    throw new Error('needs options.appDataClient')
  }

  return function (response) {
    var path = null
    options.appDataClient.set('keyFilePath', path, function () {
      options.keepassClient.keyFile(path)
      return response({ path: path })
    })
  }
}
