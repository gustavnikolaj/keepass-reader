var pathModule = require('path')
var modes = require('./modes')

module.exports = function (options) {
  var menubarOpts = {
    dir: pathModule.resolve(__dirname, '..', '..', 'app'),
    width: 500,
    height: 500,
    'window-position': 'center'
  }

  menubarOpts.icon = pathModule.resolve(menubarOpts.dir, 'Icon-Template.png')

  if (options.nodeEnv === 'development') {
    menubarOpts.index = 'file://' + pathModule.join(menubarOpts.dir, 'index-dev.html')
  } else {
    menubarOpts.index = 'file://' + pathModule.join(menubarOpts.dir, 'index.html')
  }

  var mode = options.menubar === 'false' ? modes.FIXED : modes.MENUBAR

  var config = {
    menubarOpts: menubarOpts,
    mode: mode
  }

  return config
}
