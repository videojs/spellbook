var config = require('./get-config')();
var shelljs = require('shelljs');
var path = require('path');
var glob = require('glob');
var exorcistHelper = require('./exorcist-helper');
var log = require('./log');
var exec = require('./exec');
var GetFiles = require('./get-files');
var PathsExist = require('./paths-exist');

// dist, src, standalone
var browserifyHelper = function(options) {
  ['.js', '.js.map'].forEach(function(ext) {
    shelljs.rm('-rf', options.dist + ext);
  });

  var babelPreset = config.ie8 ? 'babel-preset-ie8.config.js' : 'babel-preset.config.js';
  var files = GetFiles(options.src);
  var cacheFile = path.join(config.cache, 'browserifyinc', path.basename(options.dist) + '.json');

  if (!files.length) {
    log.fatal('Source directory ' + program.src + ' does not exist or contains no js files!');
    process.exit(1);
  }

  shelljs.mkdir('-p', path.dirname(options.dist));

  var command = [
    '-v',
    '--debug',
    /*'--cachefile', cacheFile,*/
    /* currently broken: '-t', 'rollupify',*/
    '-t', '[', 'babelify', '--presets', babelPreset, ']',
    '-g', 'browserify-shim',
    '-g', 'browserify-versionify',
    '-p', 'bundle-collapser/plugin',
    '-o', options.dist + '.js',
  ].concat(files);

  if (options.standalone) {
    command.push('-s');
    command.push(config.name);
  }
  command.unshift('browserifyinc');
  var retval = exec(command, {silent: true});

  // remove rollup external deps errors...
  retval.stderr = retval.stderr || '';
  retval.stderr = retval.split(/^Treating '\w+' as external dependency\n$/).join('');

  if (retval.code !== 0 || retval.stderr || !PathsExist(options.dist + '.js')) {
    process.stderr.write(retval.stderr);
    process.stderr.write(retval.stdout);
    process.exit(1);
  }

  // rip sourcemap out
  exorcistHelper(options.dist + '.js');
  log.info('Wrote ' + options.dist + '.js');
  log.info('Wrote ' + options.dist + '.js.map');

  return retval;
};

module.exports = browserifyHelper;
