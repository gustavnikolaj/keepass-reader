var sinon = require('sinon')
var expect = require('unexpected')
  .clone()
  .use(require('unexpected-sinon'))
var ClipboardClient = require('../../lib/clipboardClient')

function ClipboardClientFactory(clipboardModule) {
  clipboardModule = clipboardModule || {}
  return new ClipboardClient({
    clipboardModule: clipboardModule
  })
}

describe('ClipboardClient', function () {
  it('should be an object', function () {
    var clipboard = ClipboardClientFactory()
    return expect(clipboard, 'to be an object')
  })
  describe('.set', function () {
    it('should be able to copy a password to the clipboard', function () {
      var writeTextSpy = sinon.spy()
      var clipboard = ClipboardClientFactory({
        writeText: writeTextSpy
      })
      clipboard.set('foo')
      return expect(writeTextSpy, 'was called with', 'foo')
    })
    it('should remember the hash value of the password it set', function () {
      var clipboard = ClipboardClientFactory({
        writeText: sinon.stub()
      })
      clipboard.set('foo')
      return expect(clipboard, 'to have property', 'hashOfLastSetValue',
                    '0beec7b5ea3f0fdbc95d0dd47f3c5bc275da8a33')
    })
  })
  describe('.clear', function () {
    it('should be able to clear a password from the clipboard', function () {
      var clearSpy = sinon.spy()
      var clipboard = ClipboardClientFactory({
        clear: clearSpy,
        readText: function () { return 'foo' },
        writeText: sinon.stub()
      })
      clipboard.set('foo')
      clipboard.clear()
      return expect(clearSpy, 'was called once')
    })
    it('should not clear a clipboard if the contents has changed', function () {
      var clearSpy = sinon.spy()
      var clipboard = ClipboardClientFactory({
        clear: clearSpy,
        readText: function () { return 'bar' },
        writeText: sinon.stub()
      })
      clipboard.set('foo')
      clipboard.clear()
      return expect(clearSpy, 'was not called')
    })
  })
  describe('.hash', function () {
    it('should have a method hash', function () {
      var clipboard = ClipboardClientFactory()
      return expect(clipboard.hash, 'to be a function')
    })
    it('should return the sha1 hash of its input', function () {
      var clipboard = ClipboardClientFactory()
      return expect(clipboard.hash, 'when called with', ['foo'],
                    'to equal', '0beec7b5ea3f0fdbc95d0dd47f3c5bc275da8a33')
    })
  })
})
