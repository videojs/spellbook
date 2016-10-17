var shelljs = require('shelljs');
var GetConfig = require('../../src/utils/get-config');
var path = require('path');
var fixtureDir = path.join(__dirname, '..', 'fixtures');
var rootDir = path.join(__dirname, '..', '..');
var uuid = require('uuid');
var PathsExist = require('../../src/utils/paths-exist');
var rimraf = require('rimraf');
var npmRun = require('npm-run');

// intialize git
shelljs.config.silent = true;

var sigexit = function() {
  process.exit(0);
};

process.on('SIGINT', sigexit);
process.on('SIGQUIT', sigexit);

if (process.env.TRAVIS) {
  shelljs.exec('git config --global user.email "travis@tester.com"');
  shelljs.exec('git config --global user.name "Travis Tester"');
}

if (!PathsExist(path.join(fixtureDir, 'test-pkg-main', '.git'))) {
  console.log('setting up git for fixtures/test-pkg-main');
  shelljs.pushd(path.join(fixtureDir, 'test-pkg-main'));
  shelljs.exec('git init');
  shelljs.exec('git add --all');
  shelljs.exec('git commit -a -m initial');
  shelljs.popd();
}

// npm link fixtures
if (!PathsExist(path.join(fixtureDir, 'test-pkg-main', 'node_modules'))) {
  shelljs.pushd(path.join(fixtureDir, 'test-pkg-main'));
  shelljs.exec('npm link ' + rootDir);
  console.log('npm linking videojs-spellbook to fixtures/test-pkg-main');
  var pkgsToLink = shelljs.ls('-d', path.join(fixtureDir, '*'));

  pkgsToLink.forEach(function(folder) {
    if (path.basename(folder) === 'test-pkg-main') {
      return;
    }
    console.log('npm linking fixtures/' + path.basename(folder) + ' to fixtures/test-pkg-main');
    shelljs.exec('npm link ' + folder);
  });

  shelljs.popd();
}

shelljs.config.silent = false;
shelljs.config.fatal = true;
// remove dist if it exists
if (PathsExist(path.join(fixtureDir, 'test-pkg-main', 'dist'))) {
  shelljs.rm('-rf', path.join(fixtureDir, 'test-pkg-main', 'dist'));
}

var TestHelper = function(debug) {
  this.debug = debug || false;

  this.projectDir = fixtureDir;
  while(PathsExist(this.projectDir)) {
    var id = uuid.v4();
    this.projectDir = path.join(shelljs.tempdir(), id);
  }

  if (!this.debug) {
    shelljs.config.silent = true;
  } else {
    shelljs.config.silent = false;
  }

  shelljs.cp('-R', path.join(fixtureDir, 'test-pkg-main'), this.projectDir);
  // always allow cleanup to happen
  process.setMaxListeners(1000);
  process.on('exit', this.cleanup.bind(this));

  // make sure that tests can use a fresh config
  // and not the one from the previous cache
  this.config = GetConfig(this.projectDir);
  return this;
};

var splitString = TestHelper.prototype.trim = function(string) {
  var newStdout = [];

  string = string.trim().split('\n') || [];
  string.forEach(function(s) {
    if (!s.trim()) {
      return;
    }
    newStdout.push(s);
  });
  return newStdout;
};

TestHelper.prototype.exec = function(cmd, args, cb) {

  if (!cb && typeof args === 'function') {
    cb = args;
    args = [];
  }
  var stdout = '';
  var stderr = '';
  if (this.debug) {
    console.log('running ' + cmd + ' with args ' + args.join(' '));
    console.log('in dir ' + this.projectDir);
  }
  var child = npmRun.spawn(cmd, args, {cwd: this.projectDir}).on('close', function(code) {
    cb(code, splitString(stdout), splitString(stderr));
  });

  child.stdout.on('data', function(d) {
    stdout += d.toString();
  });

  child.stderr.on('data', function(d) {
    stderr += d.toString();
  });

  if (this.debug) {
    child.stdout.on('data', process.stdout.write.bind(process.stdout));
    child.stderr.on('data', process.stderr.write.bind(process.stderr));
  }

  return child;
};

TestHelper.prototype.cleanup = function(done) {
  rimraf.sync(this.projectDir);

  if (typeof done === 'function') {
    done();
  }
};

TestHelper.fixtureDir = fixtureDir;
TestHelper.rootDir = rootDir;

module.exports = TestHelper;
