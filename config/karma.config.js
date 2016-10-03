var config = require('../src/utils/get-config')();
var path = require('path');

module.exports = function(karmaConfig) {
  // somwhat hacky way to add files to karma on the fly
  var program = require('commander')
    .option('--sb-files [list]', 'comma seperated list files, to add to karma')
    .option('--sb-watch', 'tells the karma config that sb wants to watch')
    .parse(process.argv);

  program.sbFiles = program.sbFiles || [];
  if (program.sbFiles) {
    program.sbFiles = program.sbFiles.split(',');
  }

  karmaConfig.set({
    autoWatch: false,
    singleRun: true,
    reporters: ['dots'],
    frameworks: ['qunit', 'detectBrowsers'],
    basePath: config.path,
    browsers: karmaConfig.browsers || [],
    detectBrowsers: {
      enabled: program.sbWatch ? false : true,
      usePhantomJS: false
    },
    client: {
      clearContext: false,
      qunit: {showUI: true}
    },
    files: [
      'node_modules/videojs-spellbook/node_modules/sinon/pkg/sinon.js',
      'node_modules/videojs-spellbook/node_modules/sinon/pkg/sinon-ie.js',
      path.join(config.cache, '**', '*.test.js')
    ].concat(program.sbFiles),
  });
};

