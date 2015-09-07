var kpio = require('keepass.io')
var keepassUtils = require('./keepassUtils')

function KeepassClient (path) {
  this.path = path
}

KeepassClient.prototype.masterKey = function (masterKey) {
  this.masterKey = new kpio.Credentials.Password(masterKey)
}

KeepassClient.prototype.load = function (callback) {
  var db = new kpio.Database()
  db.addCredential(credential)
  db.loadFile(this.path, passError(callback, function (api) {
    var data = api.getRaw()

    data = keepassUtils.parseRawDatabase(data)
    data = keepassUtils.flattenedList(data)
    keepassUtils.flagUniqueEntries(data)

    callback(null, data)
  }))
}

KeepassClient.prototype.getList = function () {
  return [
    {
      id: 'foobar',
      label: 'Foo bar'
    }
  ]
}

KeepassClient.prototype.get = function (id) {
  // ...
}

module.exports = KeepassClient;
