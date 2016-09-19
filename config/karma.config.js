var config = require('../src/utils/config');
var path = require('path');

module.exports = function(karmaConfig) {
  karmaConfig.set({
    autoWatch: false,
    singleRun: true,
    reporters: ['dots'],
    frameworks: ['qunit', 'detectBrowsers'],
    basePath: config.path,
    browsers: karmaConfig.browsers || [],
    detectBrowsers: {
      enabled: karmaConfig.browsers ? true : false,
      usePhantomJS: false
    },
    client: {
      clearContext: false,
      qunit: {showUI: true}
    },
    proxies: {
      '/test': 'http://localhost:' + (karmaConfig.port || config.port)
    },
    files: [
      'node_modules/sb/node_modules/sinon/pkg/sinon.js',
      'node_modules/sb/node_modules/sinon/pkg/sinon-ie.js',
      path.join(config.dist, 'browser', config.name + '.css'),
      path.join(config.dist, 'test', 'bundle.js')
    ],
  });
};


