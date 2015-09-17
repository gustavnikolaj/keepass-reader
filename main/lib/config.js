var pathModule = require('path')

module.exports = function (options) {
  var config = {
    dir: pathModule.resolve(__dirname, '..', '..', 'app'),
    width: 500,
    height: 500,
    x: 0,
    y: 0
  }

  config.icon = pathModule.resolve(config.dir, 'Icon-Template.png')

  if (options.nodeEnv === 'development') {
    config.index = 'file://' + pathModule.join(config.dir, 'index-dev.html')
  } else {
    config.index = 'file://' + pathModule.join(config.dir, 'index.html')
  }

  return config
}
