var shelljs = require('shelljs');
var GetConfig = require('../../src/utils/get-config');
var path = require('path');
var fixtureDir = path.join(__dirname, '..', 'fixtures');
var rootDir = path.join(__dirname, '..', '..');
var uuid = require('uuid');
var PathsExist = require('../../src/utils/paths-exist');
var rimraf = require('rimraf');

// intialize git
if (!PathsExist(path.join(fixtureDir, '.git'))) {
  console.log('setting up git for fixtures');
  shelljs.config.silent = true;
  if (process.env.TRAVIS) {
    shelljs.exec('git config --global user.email "travis@tester.com"');
    shelljs.exec('git config --global user.name "Travis Tester"');
  }
  shelljs.pushd(fixtureDir);
  shelljs.exec('git init');
  shelljs.exec('git add --all');
  shelljs.exec('git commit -a -m initial');
  shelljs.popd();
  shelljs.config.silent = false;
}

// npm link fixtures
if (!PathsExist(path.join(fixtureDir, 'node_modules'))) {
  console.log('npm linking videojs-spellbook to fixtures');
  shelljs.config.silent = true;
  shelljs.pushd(fixtureDir);
  shelljs.exec('npm link ' + rootDir);
  shelljs.popd();
  shelljs.config.silent = false;
}

shelljs.config.fatal = true;
// remove dist if it exists
if (PathsExist(path.join(fixtureDir, 'dist'))) {
  shelljs.rm('-rf', path.join(fixtureDir, 'dist'));
}

var TestHelper = function(debug) {
  this.debug = debug || process.env.TRAVIS || false;
  if (!this.debug) {
    shelljs.config.silent = true;
  } else {
    shelljs.config.silent = false;
  }

  this.projectDir = fixtureDir;
  while(PathsExist(this.projectDir)) {
    var id = uuid.v4();
    this.projectDir = path.join(shelljs.tempdir(), id);
  }

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

TestHelper.prototype.binPath = function(bin) {
  return path.join(this.config.path, bin) + ' ';
};


TestHelper.prototype.cleanup = function(done) {
  shelljs.cd(TestHelper.fixtureDir);
  if (this.debug) {
    console.log(this.projectDir);
  }
  rimraf.sync(this.projectDir);

  if (done) {
    done();
  }
};

TestHelper.fixtureDir = fixtureDir;
TestHelper.rootDir = rootDir;

module.exports = TestHelper;
