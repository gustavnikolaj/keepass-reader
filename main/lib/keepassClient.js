var kpio = require('keepass.io')
var passError = require('passerror')
var keepassUtils = require('./keepassUtils')

function KeepassClient (path) {
  this._path = path || ''
}

KeepassClient.prototype.masterKey = function (masterKey) {
  this.credential = new kpio.Credentials.Password(masterKey)
}

KeepassClient.prototype.path = function (path) {
  if (typeof path === 'undefined') {
    return this._path
  }
  this.credential = null
  this._path = path
}

KeepassClient.prototype.load = function (callback) {
  if (!this.credential) {
    return setImmediate(function () {
      return callback(new Error('No masterkey'))
    })
  }

  var db = new kpio.Database()

  db.addCredential(this.credential)
  try {
    db.loadFile(this._path, passError(callback, function (api) {
      var data = api.getRaw()

      data = keepassUtils.parseRawDatabase(data)
      data = keepassUtils.flattenedList(data)
      keepassUtils.flagUniqueEntries(data)

      callback(null, data)
    }))
  } catch (e) {
    return callback(e)
  }
}

KeepassClient.prototype.getList = function (callback) {
  this.load(passError(callback, function (list) {
    return callback(null, list.map(function (entry) {
      return {
        uuid: entry.uuid,
        title: entry.title,
        username: entry.username,
        url: entry.url
      }
    }))
  }))
}

KeepassClient.prototype.getPassword = function (uuid, callback) {
  this.load(passError(callback, function (list) {
    var password = false
    list.some(function (entry) {
      if (entry.uuid === uuid) {
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

module.exports = KeepassClient
