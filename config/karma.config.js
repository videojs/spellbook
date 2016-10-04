var config = require('../src/utils/get-config')();
var path = require('path');

module.exports = function(karmaConfig) {
  var detectBrowsers = true;

  if (karmaConfig.autoWatch && !karmaConfig.singleRun) {
    detectBrowsers = false;
  }

  console.log(karmaConfig.autoWatch);
  console.log(karmaConfig.singleRun);
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
    files: [
      'node_modules/videojs-spellbook/node_modules/sinon/pkg/sinon.js',
      'node_modules/videojs-spellbook/node_modules/sinon/pkg/sinon-ie.js',
      path.join(config.dist, 'test', '*.test.js')
    ]
  });
};

