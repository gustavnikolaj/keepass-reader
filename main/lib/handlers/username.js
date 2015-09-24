module.exports = function (options) {
  options = options || {}

  if (!options.keepassClient) {
    throw new Error('needs options.keepassClient')
  }
  if (!options.clipboardClient) {
    throw new Error('needs options.clipboardClient')
  }

  return function (uuid, response) {
    options.keepassClient.getUsername(uuid, function (err, username) {
      if (err) {
        return response({ error: 'LOCKED_DATABASE' })
      }

      options.clipboardClient.set(username)

      return response({ error: null, timeout: 0 })
    })
  }
}
