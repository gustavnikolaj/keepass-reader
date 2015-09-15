module.exports = function (options) {
  options = options || {}

  if (!options.keepassClient) {
    throw new Error('needs options.keepassClient')
  }

  return function (masterKey, response) {
    if (masterKey) {
      options.keepassClient.masterKey(masterKey)
    }
    options.keepassClient.getList(function (err, passwords) {
      if (err) {
        return response({ error: 'LOCKED_DATABASE' })
      }

      return response({ passwords: passwords })
    })
  }
}
