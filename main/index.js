require('electron-debug')()
require('crash-reporter').start()

var bootstrap = require('./lib/bootstrap')

bootstrap({
  nodeEnv: process.env.NODE_ENV
})
