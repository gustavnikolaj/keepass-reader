module.exports = function (options) {
  options = options || {}

  if (!options.keepassClient) {
    throw new Error('needs options.keepassClient')
  }

  return function (uuid, response) {
    options.keepassClient.getPassword(uuid, function (err, password) {
      if (err) {
        return response({ error: 'LOCKED_DATABASE' })
      }

      return response({ password: password })
    })
  }
}
