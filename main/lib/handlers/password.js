module.exports = function (options) {
  options = options || {}

  if (!options.keepassClient) {
    throw new Error('needs options.keepassClient')
  }
  if (!options.clipboardClient) {
    throw new Error('needs options.clipboardClient')
  }

  return function (uuid, response) {
    options.keepassClient.getPassword(uuid, function (err, password) {
      if (err) {
        return response({ error: 'LOCKED_DATABASE' })
      }

      options.clipboardClient.set(password)

      var timeout = 12000

      setTimeout(function () {
        options.clipboardClient.clear()
      }, timeout)

      return response({ error: null, timeout: timeout })
    })
  }
}
