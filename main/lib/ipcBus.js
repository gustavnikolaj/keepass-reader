function IpcBus (ipcModule) {
  this.ipc = ipcModule || require('ipc')
}

IpcBus.prototype.responseCallbackFactory = function (eventName, event) {
  return function (payload) {
    return event.sender.send(eventName + 'Response', payload)
  }
}

IpcBus.prototype.use = function (eventName, handler) {
  var handlerArgLength = handler.length
  if (handlerArgLength < 1) {
    throw new Error('an ipc handler must take at least one argument')
  }
  this.ipc.on(eventName + 'Request', function (event) {
    var args = []
    if (handlerArgLength > 1) {
      args = Array.prototype.slice.call(arguments, 1, 1 + handlerArgLength - 1)
    }
    var response = this.responseCallbackFactory(eventName, event)
    args.push(response)
    return handler.apply(null, args)
  }.bind(this))

  return this
}

module.exports = IpcBus
