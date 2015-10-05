var webpack = require('webpack')
var path = require('path')
var webpackTargetElectronRenderer = require('webpack-target-electron-renderer')

var projectRoot = path.join(__dirname, '..')
var appRoot = path.join(projectRoot, 'app')

module.exports = function (opts) {
  var entry = []
  if (opts.hotComponents) {
    entry.push('webpack-dev-server/client?http://localhost:3000')
    entry.push('webpack/hot/only-dev-server')
  }
  entry.push(path.join(appRoot, 'app'))

  var jsxLoader = {
    test: /\.jsx$/,
    include: appRoot
  }

  if (opts.hotComponents) {
    jsxLoader.loaders = [ 'react-hot', 'babel' ]
  } else {
    jsxLoader.loader = 'babel'
  }

  var options = {
    entry: entry,
    output: {
      path: projectRoot + '/dist/',
      filename: 'bundle.js',
      publicPath: opts.devServer ? 'http://localhost:2992/dist/' : '/dist/',
      contentBase: projectRoot + '/dist/',
      libraryTarget: 'commonjs2'
    },
    module: {
      loaders: [
        jsxLoader,
        {
          test: /\.js$/,
          loader: 'babel',
          include: appRoot
        },
        {
          test: /\.less$/,
          loaders: [ 'style-loader', 'css-loader?modules', 'less-loader' ]
        },
        {
          test: /\.css$/,
          loaders: [ 'style-loader', 'css-loader?modules' ]
        }
      ]
    },
    devtool: opts.devtool,
    debug: opts.debug,
    resolve: {
      root: appRoot,
      modulesDirectories: [ 'node_modules' ],
      extensions: [ '', '.js', '.jsx', '.json' ],
      packageMains: ['webpack', 'browser', 'web', 'browserify', ['jam', 'main'], 'main']
    },
    plugins: [
      new webpack.PrefetchPlugin('react'),
      new webpack.PrefetchPlugin('react/lib/ReactComponentBrowserEnvironment')
    ],
    devServer: {
      stats: {
        cached: false,
        exclude: [
          /node_modules[\\\/]react(-router)?[\\\/]/
        ]
      }
    }
  }

  options.target = webpackTargetElectronRenderer(options)

  return options
}
