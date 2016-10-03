var shelljs = require('shelljs');
var GetConfig = require('../src/utils/get-config');
var path = require('path');
var fixtureDir = path.join(__dirname, 'fixtures');
var uuid = require('uuid');

// pop and pushd print by default
  // lets not do that...
var popd = function() {
  var oldSilent = shelljs.config.silent;

  shelljs.config.silent = true;
  shelljs.popd();
  shelljs.config.silent = oldSilent;
};

var pushd = function(d) {
  var oldSilent = shelljs.config.silent;

  shelljs.config.silent = true;
  shelljs.pushd(d);
  shelljs.config.silent = oldSilent;
};

module.exports = function(debug) {
  this.debug = debug || false;
  if (!this.debug) {
    shelljs.config.silent = true;
  }
  shelljs.config.fatal = true;

  this.setup = function() {
    this.projectDir = path.join(shelljs.tempdir(), uuid.v4());
    shelljs.cp('-R', fixtureDir, this.projectDir);

    // mimic npm link
    shelljs.mkdir('-p', path.join(this.projectDir, 'node_modules'));
    shelljs.ln('-s', path.join(__dirname, '..'), path.join(this.projectDir, 'node_modules', 'sb'));
    shelljs.ln('-s', path.join(__dirname, '..', 'src'), path.join(this.projectDir, 'node_modules', '.bin'));

    pushd(this.projectDir);

    // make sure that tests can use a fresh config
    // and not the one from the previous cache
    this.config = GetConfig();
    return this.config;
  };

  this.cleanup = function() {
    popd();

    if (this.debug) {
      console.log(this.projectDir);
      return;
    }
    shelljs.rm('-rf', this.projectDir);
  };
};
