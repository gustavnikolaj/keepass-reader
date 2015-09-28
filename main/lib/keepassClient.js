var kpio = require('keepass.io')
var passError = require('passerror')
var keepassUtils = require('./keepassUtils')

function KeepassClient (path, keyFile) {
  this._path = path || ''
  this._keyFile = keyFile || ''
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

KeepassClient.prototype.keyFile = function (path) {
  if (typeof path === 'undefined') {
    return this._keyFile
  }
  this._keyFile = path
}

KeepassClient.prototype.load = function (callback) {
  if (!this.credential) {
    return setImmediate(function () {
      return callback(new Error('No masterkey'))
    })
  }

  var db = new kpio.Database()

  db.addCredential(this.credential)

  if (this._keyFile) {
    console.log('using keyFile', this._keyFile)
    var keyFileCred = new kpio.Credentials.Keyfile(this._keyFile)
    db.addCredential(keyFileCred)
  }

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

KeepassClient.prototype.getUsername = function (uuid, callback) {
  this.load(passError(callback, function (list) {
    var username = false
    list.some(function (entry) {
      if (entry.uuid === uuid) {
        username = entry.username
      }
    })
    if (username) {
      return callback(null, username)
    } else {
      return callback(new Error('UUID not found in database.'))
    }
  }))
}

module.exports = KeepassClient
