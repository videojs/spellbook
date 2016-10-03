var shelljs = require('shelljs');
var GetConfig = require('../src/utils/get-config');
var path = require('path');
var fixtureDir = path.join(__dirname, 'fixtures');
var uuid = require('uuid');

module.exports = function(debug) {
  this.debug = debug || false;
  this.start_ = process.cwd() || path.join(__dirname, '..');
  if (!this.debug) {
    shelljs.config.silent = true;
  }
  shelljs.config.fatal = true;

  this.setup = function() {
    this.projectDir = path.join(shelljs.tempdir(), uuid.v4());
    shelljs.cp('-R', fixtureDir, this.projectDir);

    // mimic npm link
    shelljs.mkdir('-p', path.join(this.projectDir, 'node_modules'));
    shelljs.ln('-sf', path.join(__dirname, '..'), path.join(this.projectDir, 'node_modules', 'sb'));
    shelljs.ln('-sf', path.join(__dirname, '..', 'src'), path.join(this.projectDir, 'node_modules', '.bin'));

    shelljs.cd(this.projectDir);

    // make sure that tests can use a fresh config
    // and not the one from the previous cache
    this.config = GetConfig();
    return this.config;
  };

  this.cleanup = function() {
    shelljs.cd(this.start_);

    if (this.debug) {
      console.log(this.projectDir);
      return;
    }
    shelljs.rm('-rf', this.projectDir);
  };
};
