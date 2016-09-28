var shelljs = require('shelljs');
var GetConfig = require('../src/utils/get-config');
var path = require('path');
var uuid = require('node-uuid');
var baseDir = path.join(__dirname, 'test-' + path.basename(module.parent.filename));
var fixtureDir = path.join(__dirname, 'fixtures');

module.exports = function() {
  // set silent to false if you want to debug
  // most of the time we want it to be true
  shelljs.config.silent = true;
  shelljs.config.fatal = true;

  this.setup = function() {
    this.projectDir = path.join(baseDir, uuid.v4());

    shelljs.mkdir('-p', baseDir);
    shelljs.cp('-R', fixtureDir, this.projectDir);
    shelljs.pushd(this.projectDir);

    // make sure that tests can use a fresh config
    // and not the one from the previous cache
    return GetConfig();
  };

  this.cleanup = function() {
    shelljs.popd();
  };

  this.after = function() {
    shelljs.rm('-rf', baseDir);
  };
};
