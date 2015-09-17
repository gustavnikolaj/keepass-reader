require('electron-debug')()
require('crash-reporter').start()

var bootstrap = require('./lib/bootstrap')

bootstrap(process.env.NODE_ENV)
