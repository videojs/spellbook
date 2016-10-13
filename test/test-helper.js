var shelljs = require('shelljs');
var GetConfig = require('../src/utils/get-config');
var path = require('path');
var fixtureDir = path.join(__dirname, 'fixtures');
var uuid = require('uuid');
var PathsExist = require('../src/utils/paths-exist');
var rimraf = require('rimraf');
shelljs.config.fatal = true;

// intialize git
if (!PathsExist(path.join(fixtureDir, '.git'))) {
  console.log('doing git setup');
  shelljs.config.silent = true;
  shelljs.pushd(fixtureDir);
  shelljs.exec('git init');
  shelljs.exec('git add --all');
  shelljs.exec('git commit -a -m initial');
  shelljs.popd();
  shelljs.config.silent = false;
}

// npm link fixtures
if (!PathsExist(path.join(fixtureDir, 'node_modules'))) {
  console.log('doing npm link to spellbook setup');
  shelljs.config.silent = true;
  shelljs.pushd(fixtureDir);
  shelljs.exec('npm link ' + path.join(__dirname, '..'));
  shelljs.popd();
  shelljs.config.silent = false;
}

// remove dist if it exists
if (PathsExist(path.join(fixtureDir, 'dist'))) {
  shelljs.rm('-rf', path.join(fixtureDir, 'dist'));
}

var TestHelper = function(debug) {
  this.debug = debug || false;
  this.start_ = process.cwd() || path.join(__dirname, '..');
  if (!this.debug) {
    shelljs.config.silent = true;
  } else {
    shelljs.config.silent = false;
  }

  var id = uuid.v4();
  this.projectDir = path.join(shelljs.tempdir(), id);

  shelljs.cp('-R', fixtureDir, this.projectDir);
  shelljs.cd(this.projectDir);

  // make sure that tests can use a fresh config
  // and not the one from the previous cache
  this.config = GetConfig();
  return this;
};

TestHelper.prototype.trim = function(stdout) {
  var newStdout = [];

  stdout = stdout.trim().split('\n') || [];
  stdout.forEach(function(s) {
    if (!s.trim()) {
      return
    }
    newStdout.push(s);
  });
  return newStdout;
};

TestHelper.prototype.cleanup = function(done) {
  shelljs.cd(this.start_);
  if (this.debug) {
    console.log(this.projectDir);
  }
  rimraf.sync(this.projectDir);

  if (done) {
    done();
  }
};

module.exports = TestHelper;
