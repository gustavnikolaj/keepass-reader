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
    'less': [ cssLoader, 'less-loader' ],
    'styl': [ cssLoader, 'stylus-loader' ],
    'scss|sass': [ cssLoader, 'sass-loader' ]
  };

  var additionalLoaders = [
    // { test: /some-reg-exp$/, loader: 'any-loader' }
  ];

  var alias = {

  };

  var aliasLoader = {

  };

  var externals = [

  ];

  var modulesDirectories = [ 'node_modules' ];

  var extensions = [ '', '.js', '.jsx', '.json' ];

  var publicPath = opts.devServer
                 ? 'http://localhost:2992/dist/'
                 : '/dist/';


  var output = {
    path: projectRoot + '/dist/',
    filename: 'bundle.js',
    publicPath: publicPath,
    contentBase: projectRoot + '/dist/',
    libraryTarget: 'commonjs2'
  };

  var excludeFromStats = [
    /node_modules[\\\/]react(-router)?[\\\/]/
  ];


  var plugins = [
    new webpack.PrefetchPlugin('react'),
    new webpack.PrefetchPlugin('react/lib/ReactComponentBrowserEnvironment')
  ];

  Object.keys(stylesheetLoaders).forEach(function(ext) {
    var stylesheetLoader = stylesheetLoaders[ext];
    if (Array.isArray(stylesheetLoader)) stylesheetLoader = stylesheetLoader.join('!');
    stylesheetLoaders[ext] = 'style-loader!' + stylesheetLoader;
  });

  var options = {
    entry: entry,
    output: output,
    externals: externals,
    module: {
      loaders: [].concat(loadersByExtension(loaders)).concat(loadersByExtension(stylesheetLoaders))
    },
    devtool: opts.devtool,
    debug: opts.debug,
    resolve: {
      root: appRoot,
      modulesDirectories: modulesDirectories,
      extensions: extensions,
      alias: alias,
      packageMains: ['webpack', 'browser', 'web', 'browserify', ['jam', 'main'], 'main']
    },
    plugins: plugins,
    devServer: {
      stats: {
        cached: false,
        exclude: excludeFromStats
      }
    }
  };

  options.target = webpackTargetElectronRenderer(options);

  return options;
};
