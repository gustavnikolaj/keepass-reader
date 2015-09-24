var crypto = require('crypto')

function ClipboardClient (options) {
  options = options || {}
  this.clipboard = options.clipboardModule || require('clipboard')
}

ClipboardClient.prototype.hash = function (value) {
  return crypto.createHash('sha1').update(value).digest('hex')
}

ClipboardClient.prototype.set = function (value) {
  this.clipboard.writeText(value)
  return this.hash(value)
}

ClipboardClient.prototype.clear = function (hash) {
  var currentValue = this.clipboard.readText()
  var currentHash = this.hash(currentValue)
  if (currentHash === hash) {
    this.clipboard.clear()
  }
}

module.exports = ClipboardClient
