module.exports = function (options) {
  options = options || {}

  if (!options.app) {
    throw new Error('needs options.app')
  }

  return function (response) {
    options.app.toggleWindow()
  }
}
