var PathsExist = require('../utils/paths-exist');
var path = require('path');

module.exports = function(program, config, karmaConfig) {
  var files = [];
  var nodeDir = path.join('node_modules');
  var sinonDir = path.join('sinon', 'pkg');
  var sbNodeDir = path.join('node_modules', 'videojs-spellbook', 'node_modules');

  if (PathsExist(path.join(nodeDir, sinonDir))) {
    files.push(path.join(nodeDir, sinonDir, 'sinon.js'));
    files.push(path.join(nodeDir, sinonDir, 'sinon-ie.js'));
  } else if (PathsExist(path.join(sbNodeDir, sinonDir))) {
    files.push(path.join(sbNodeDir, sinonDir, 'sinon.js'));
    files.push(path.join(sbNodeDir, sinonDir, 'sinon-ie.js'));
  } else {
    log.warn('sinon is not installed!');
  }

  // the default is true
  if (config.shimVideojs) {
    var vjsDir = path.join('video.js', 'dist');

    if (PathsExist(path.join(nodeDir, vjsDir))) {
      files.push(path.join(nodeDir, vjsDir, 'video.js'));
      files.push(path.join(nodeDir, vjsDir, 'video-js.css'));
    } else {
      log.fatal('video.js is not installed, use `spellbook.shimVideojs: false` in package.json if you dont need video.js');
      process.exit(1);
    }
  }

  if (config.test && config.test.files) {
    files = files.concat(config.test.files);
  }

  var dist = path.relative(config.path, config.dist);

  if (config.css && config.css.src && PathsExist(config.css.src)) {
    files.push(path.join(dist, 'browser', config.name + '.css'));
    files.push({pattern: path.join(dist, 'browser', config.name + '.css.map'), included: false});
  }

  files.push(path.join(__dirname, '..', '..', 'config', 'karma-helper.js'));
  files.push(path.join(dist, 'test', '**',  '*.test.js'));

  karmaConfig = {
    reporters: ['dots'],
    frameworks: ['qunit', 'detectBrowsers'],
    plugins: ['karma-*'],
    basePath: config.path,
    browsers: karmaConfig.browses || [],
    port: program.port,
    restartOnFileChange: false,
    singleRun: !program.watch,
    loggers: [{type: path.join(__dirname, '..', '..','src', 'utils', 'log.js')}],
    client: {clearContext: false, qunit: {showUI: true}},
    customHeaders: [
      {match: '.*', name: 'Cache-Control', value: 'no-cache, no-store, must-revalidate'},
      {match: '.*', name: 'Pragma', value: 'no-cache'},
      {match: '.*', name: 'Expires', value: '0'}
    ],
    files: files.map(function(pattern) {
      var obj = {pattern: pattern};
      if (typeof pattern !== 'string') {
        obj = pattern;
      }
      obj.nocache = true;
      //obj.served = true;
      obj.watched = false;

      return obj;
    })
  };


  return karmaConfig;
};
