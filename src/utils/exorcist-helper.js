var shelljs = require('shelljs');
var PathsExist = require('./paths-exist');
var log = require('./log');
var GetPath = require('./get-path');
var Promise = require('bluebird');

var exorcistHelper = function(dist) {
  return new Promise(function(resolve, reject) {
    if (!PathsExist(dist)) {
      log.fatal('Source file ' + dist + ' does not exist. Cannot exorcise its sourcemap');
      reject();
    }
    var retval = shelljs.cat(dist)
      .exec(GetPath('exorcist') + ' ' + dist + '.map', {silent: true})
      .to(dist);

    if (retval.code !== 0 || retval.stderr || !PathsExist(dist) || !PathsExist(dist + '.map')) {
      log.error('exorcist on ' + dist + ' failed with outputs:');
      log.error('stderr:\n' + retval.stderr, 'stdout:\n' + retval.stdout);
      process.exit(1);
    }
    log.info('Wrote: ' + dist + '.map');
    resolve();
  }).catch(function(error) {
    process.exit(1);
  });
};

module.exports = exorcistHelper;
