var fs = require('fs')
var path = require('path')
var mkdirp = require('mkdirp')

function AppDataClient (options) {
  options = options || {}
  this.pathToAppData = options.appDataPath || ''
  this.appName = options.appName || ''
}

AppDataClient.prototype.getPath = function () {
  return path.join(this.pathToAppData, this.appName)
}

AppDataClient.prototype.get = function (key, callback) {
  var filePath = path.resolve(this.getPath(), key)
  return fs.readFile(filePath, 'utf-8', function (err, data) {
    if (err) {
      console.log(err)
      return callback(null, null)
    }
    return callback(null, data)
  })
}

AppDataClient.prototype.set = function (key, value, callback) {
  value = value || ''
  var dirPath = this.getPath()
  var filePath = path.resolve(dirPath, key)
  mkdirp(dirPath, function (err) {
    if (err) {
      console.log(err)
      return callback()
    }
    console.log('writing', value, 'to', filePath)
    fs.writeFile(filePath, value, 'utf-8', function (err) {
      if (err) {
        console.log(err)
      }
      return callback()
    })
  })
}

module.exports = AppDataClient
