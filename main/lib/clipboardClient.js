var crypto = require('crypto')

function ClipboardClient (options) {
  options = options || {}
  this.clipboard = options.clipboardModule || require('clipboard')
  this.hashOfLastSetValue = null
}

ClipboardClient.prototype.hash = function (value) {
  return crypto.createHash('sha1').update(value).digest('hex')
}

ClipboardClient.prototype.set = function (value) {
  this.hashOfLastSetValue = this.hash(value)
  this.clipboard.writeText(value)
}

ClipboardClient.prototype.clear = function () {
  var currentValue = this.clipboard.readText()
  var currentHash = this.hash(currentValue)
  if (currentHash === this.hashOfLastSetValue) {
    this.clipboard.clear()
  }
  this.hashOfLastSetValue = null
}

module.exports = ClipboardClient
