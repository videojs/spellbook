var config = require('../src/utils/get-config')();
var PathsExist = require('../src/utils/paths-exist');
var path = require('path');
var log = require('../src/utils/log');

module.exports = function(karmaConfig) {
  var detectBrowsers = true;

  if (karmaConfig.autoWatch && !karmaConfig.singleRun) {
    detectBrowsers = false;
  }

  if (karmaConfig.browsers.length > 0) {
    detectBrowsers = false;
  }

  var files = [];
  var sbNodeDir = path.join('node_modules', 'videojs-spellbook', 'node_modules');
  var nodeDir = path.join('node_modules');
  var sinonDir = path.join('sinon', 'pkg');

  if (PathsExist(path.join(nodeDir, sinonDir))) {
    files.push(path.join(nodeDir, sinonDir, 'sinon.js'));
    files.push(path.join(nodeDir, sinonDir, 'sinon-ie.js'));
  } else if (PathsExist(path.join(sbNodeDir, sinonDir))) {
    files.push(path.join(sbNodeDir, sinonDir, 'sinon.js'));
    files.push(path.join(sbNodeDir, sinonDir, 'sinon-ie.js'));
  } else {
    log.fatal('sinon is not installed!');
    process.exit(1);
  }

  if (config.shimVideojs) {
    var vjsDir = path.join('video.js', 'dist');

    if (PathsExist(path.join(nodeDir, vjsDir))) {
      files.push(path.join(nodeDir, vjsDir, 'video.js'));
      files.push(path.join(nodeDir, vjsDir, 'video-js.css'));
    } else if (PathsExist(path.join(sbNodeDir, vjsDir))) {
      log.info('using videojs-spellbook\'s  version of video.js as there is no local version');
      files.push(path.join(sbNodeDir, vjsDir, 'video.js'));
      files.push(path.join(sbNodeDir, vjsDir, 'video-js.css'));
    } else {
      log.fatal('video.js is not installed, use spellbook.shim-video: true in package.json if you dont need it');
      process.exit(1);
    }
  }

  if (config.css && config.css.src && PathsExist(config.css.src)) {
    files.push(path.join(config.dist, 'browser', config.name + '.css'));
  }
  files.push(path.join(config.dist, 'test', '**', '*.test.js'));

  karmaConfig.set({
    reporters: ['dots'],
    frameworks: ['qunit', 'detectBrowsers'],
    basePath: config.path,
    browsers: karmaConfig.browsers || [],
    detectBrowsers: {
      enabled: detectBrowsers,
      usePhantomJS: false
    },
    client: {
      clearContext: false,
      qunit: {showUI: true}
    },
    files: files.map(function(pattern) {
      return {pattern: pattern, nocache: true}
    })
  });
};

