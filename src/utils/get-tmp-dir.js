var uuid = require('uuid');
var rimraf = require('rimraf');
var path = require('path');
var mkdirp = require('mkdirp');
var PathsExist = require('./paths-exist');
var os = require('os');

/**
 * Get a temporary directory, and auto clean it up on exit
 */
var GetTmpDir = function() {
  var dist;
  do {
    dist = path.join(os.tmpdir(), uuid.v4());
  } while(PathsExist(dist));

  process.on('exit', function(code) {
    rimraf.sync(dist);
  });

  mkdirp.sync(dist);
  return dist;
};

module.exports = GetTmpDir;
