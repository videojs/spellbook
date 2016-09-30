var config = require('./get-config')();
var GetPath = require('./get-path');
var shelljs = require('shelljs');

// dist, src, watch, standalone
var browserifyHelper = function(options) {
  ['.js', '.js.map'].forEach(function(ext) {
    shelljs.rm('-rf', options.dist + ext);
  });
  shelljs.mkdir('-p', path.dirname(options.dist));

  var babelPreset = config.ie8 ? GetPath('babel-preset-ie8.config.js') : GetPath('babel-preset.config.js');
  var files = [options.src];

  if (!PathExists(options.src)) {
    files = glob.sync(options.src);
  }

  var browserify = (options.watch ? GetPath('watchify') + ' -v' : GetPath('browserify'))
    + ' --debug'
    + ' -t rollupify'
    + ' -t [ babelify --preset ' + babelPreset + ' ]'
    + ' -g browserify-shim'
    + ' -g browserify-versionify'
    + ' -p bundle-collapser/plugin'
    + ' -p [ mapstraction ' + options.dist + '.js.map ]'
    + (config.standalone ? ' -s ' + config.name : '')
    + ' -o ' + options.dist + '.js'
    + files.join(' ');

  shelljs.exec(browserify);
};

module.exports = browserifyHelper;
