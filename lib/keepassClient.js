var kpio = require('keepass.io')
var passError = require('passerror')
var keepassUtils = require('./keepassUtils')

function KeepassClient (path) {
  this.path = path
}

KeepassClient.prototype.masterKey = function (masterKey) {
  this.credential = new kpio.Credentials.Password(masterKey)
}

KeepassClient.prototype.load = function (callback) {
  if (!this.credential) {
    return setImmediate(function () {
      return callback(new Error('No masterkey'))
    })
  }

  var db = new kpio.Database()

  db.addCredential(this.credential)
  db.loadFile(this.path, passError(callback, function (api) {
    var data = api.getRaw()

    data = keepassUtils.parseRawDatabase(data)
    data = keepassUtils.flattenedList(data)
    keepassUtils.flagUniqueEntries(data)

    callback(null, data)
  }))
}

KeepassClient.prototype.getList = function (callback) {
  this.load(passError(callback, function (list) {
    return callback(null, list.map(function (entry) {
      return {
        uuid: entry.uuid,
        title: entry.title
      }
    }))
  }))
}

KeepassClient.prototype.getPassword = function (uuid, callback) {
  this.load(passError(callback, function (list) {
    var password = false;
    list.some(function (entry) {
      if (entry.uuid === uuid) {
        console.log(JSON.stringify(entry))
        password = entry.password
      }
    })
    if (password) {
      return callback(null, password)
    } else {
      return callback(new Error('UUID not found in database.'))
    }
  }))
}

module.exports = KeepassClient;
