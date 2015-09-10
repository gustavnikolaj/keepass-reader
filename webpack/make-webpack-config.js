/* eslint func-names: 0 */
var webpack = require('webpack');
var path = require('path');
var loadersByExtension = require('loaders-by-extension');
var webpackTargetElectronRenderer = require('webpack-target-electron-renderer');

var projectRoot = path.join(__dirname, '..');
var appRoot = path.join(projectRoot, 'app');

module.exports = function(opts) {

  var entry = [];
  if (opts.hotComponents) {
      entry.push('webpack-dev-server/client?http://localhost:3000')
      entry.push('webpack/hot/only-dev-server')
  }
  entry.push(path.join(appRoot, 'app'))


  var loaders = {
    'jsx': opts.hotComponents ? [ 'react-hot', 'babel-loader' ] : 'babel-loader',
    'js': {
      loader: 'babel-loader',
      include: appRoot
    }
  };

  var cssLoader = 'css-loader?localIdentName=[path][name]---[local]---[hash:base64:5]';

  var stylesheetLoaders = {
    'css': cssLoader,
    'less': [ cssLoader, 'less-loader' ]
  };

  Object.keys(stylesheetLoaders).forEach(function(ext) {
    var stylesheetLoader = stylesheetLoaders[ext];
    if (Array.isArray(stylesheetLoader)) stylesheetLoader = stylesheetLoader.join('!');
    stylesheetLoaders[ext] = 'style-loader!' + stylesheetLoader;
  });

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
      loaders: [].concat(loadersByExtension(loaders)).concat(loadersByExtension(stylesheetLoaders))
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
  };

  options.target = webpackTargetElectronRenderer(options);

  return options;
};
