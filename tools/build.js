var pathModule = require('path')
var argv = require('minimist')(process.argv.slice(2))
var packageJson = require('../package.json')
var packager = require('electron-packager')

var electronPrebuiltVersion = require('electron-prebuilt/package.json').version

var devDependenciesNames = Object.keys(packageJson.devDependencies)
var devNodeModules = devDependenciesNames.map(function (name) {
  return '/node_modules/' + name + '($|/)'
})

var options = {
  dir: pathModule.resolve(__dirname, '..'),
  name: 'keepass-reader',
  asar: true,
  ignore: [
    '/webpack($|/)',
    '/coverage($|/)',
    '/.gitignore$',
    '/.editorconfig$',
    '/Makefile$',
    '/tools($|/)',
    '/release($|/)'
  ].concat(devNodeModules),
  version: electronPrebuiltVersion,
  'app-version': packageJson.version,
  platform: argv.platform,
  arch: argv.arch,
  out: argv.out
}

packager(options, function (err, filepath) {
  if (err) {
    console.log('Error while building package')
    console.log(err)
    return
  }
  console.log('finished building', filepath)
})
