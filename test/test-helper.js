var shelljs = require('shelljs');
var GetConfig = require('../src/utils/get-config');
var path = require('path');
var fixtureDir = path.join(__dirname, 'fixtures');
var uuid = require('uuid');

module.exports = function() {
  // set silent to false if you want to debug
  // most of the time we want it to be true
  shelljs.config.silent = true;
  shelljs.config.fatal = true;

  this.setup = function() {
    this.projectDir = path.join(shelljs.tempdir(), uuid.v4());

    shelljs.mkdir('-p', path.dirname(this.projectDir));
    shelljs.cp('-R', fixtureDir, this.projectDir);
    shelljs.mkdir(path.join(this.projectDir, 'node_modules'));
    shelljs.ln('-s', path.join(__dirname, '..', 'src'), path.join(this.projectDir, 'node_modules', '.bin'));
    shelljs.pushd(this.projectDir);

    // make sure that tests can use a fresh config
    // and not the one from the previous cache
    return GetConfig();
  };

  this.cleanup = function(debug) {
    shelljs.popd();
    if (debug) {
      console.log(this.projectDir);
      return;
    }
    shelljs.rm('-rf', this.projectDir);
  };
};
