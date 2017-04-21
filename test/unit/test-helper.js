var shelljs = require('shelljs');
var GetConfig = require('../../src/utils/get-config');
var path = require('path');
var fixtureDir = path.join(__dirname, '..', 'fixtures');
var rootDir = path.join(__dirname, '..', '..');
var uuid = require('uuid');
var PathsExist = require('../../src/utils/paths-exist');
var GetFiles = require('../../src/utils/get-files');
var rimraf = require('rimraf');
var npmRun = require('npm-run');
var fs = require('fs');
var mkdirp = require('mkdirp');
var sbPkg = require('../../package.json');

shelljs.config.silent = false;
shelljs.config.fatal = true;

var TestHelper = function(options) {
  if (typeof options === 'boolean') {
    options = {debug: options};
  }
  options = options || {};
  this.options = {
    debug: options.debug || process.env.DEBUG_TEST || false,
    npmLink: options.npmLink || true,
    gitInit: options.gitInit || false,
    changePkg: options.changePkg || false,
    copyDist: options.copyDist || false
  };

  // allow a ton of process listeners
  process.setMaxListeners(1000);

  // do a normal exit on ctrl+c or ctrl+\
  var sigexit = function() {
    process.exit(0);
  };

  process.on('SIGINT', sigexit);
  process.on('SIGQUIT', sigexit);
  this.fixtureClean();

  this.projectDir = path.join(fixtureDir, 'test-pkg-main');

  while(PathsExist(this.projectDir)) {
    var id = uuid.v4();

    this.projectDir = path.join(shelljs.tempdir(), id);
  }
  shelljs.cp('-R', path.join(fixtureDir, 'test-pkg-main') + path.sep, this.projectDir);

  if (this.options.copyDist) {
    shelljs.cp('-R', path.join(__dirname, '..', 'expected', 'dist') + path.sep, path.join(this.projectDir, 'dist'));
    shelljs.cp('-R', path.join(__dirname, '..', 'expected', 'build') + path.sep, path.join(this.projectDir, 'build'));
  }

  if (!this.options.debug) {
    shelljs.config.silent = true;
  } else {
    shelljs.config.silent = false;
    console.log(this.projectDir);
    //console.log(this.lsProject());
  }

  if (this.options.npmLink) {
    this.npmLink(this.projectDir);
  }

  if (this.options.gitInit) {
    this.gitInit(this.projectDir);
  }

  if (this.options.changePkg) {
    this.changePkg(this.options.changePkg);
  }

  // always cleanup the tmpdir
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

  if (this.options.debug) {
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

  if (this.options.debug) {
    child.stdout.on('data', process.stdout.write.bind(process.stdout));
    child.stderr.on('data', process.stderr.write.bind(process.stderr));
  }

  return child;
};

TestHelper.prototype.cleanup = function(done) {
  if (this.options.debug && PathsExist(this.projectDir)) {
    console.log(this.projectDir);
    //console.log(this.lsProject());
  }

  rimraf.sync(this.projectDir);

  if (typeof done === 'function') {
    done();
  }
};

TestHelper.prototype.lsProject = function() {
  return shelljs.ls('-RA', this.projectDir)
    .grep('-v', '.git')
    .grep('-v', 'node_modules')
    .stdout;
};

TestHelper.prototype.gitInit = function(dir) {
  if (process.env.TRAVIS) {
    shelljs.exec('git config --global user.email "travis@tester.com"');
    shelljs.exec('git config --global user.name "Travis Tester"');
  }

  if (PathsExist(path.join(dir, '.git'))) {
    rimraf.sync(path.join(dir, '.git'));
  }

  shelljs.pushd(dir);
  shelljs.exec('git init');
  shelljs.exec('git add --all');
  shelljs.exec('git commit -a -m initial');
  shelljs.popd();
};

TestHelper.prototype.changePkg = function(newPkg, dir) {
  if (typeof dir === 'undefined') {
    dir = this.projectDir;
  }

  var pkgFile = path.join(dir, 'package.json');
  var pkg = JSON.parse(fs.readFileSync(pkgFile));

  pkg = Object.assign(pkg, newPkg);
  fs.writeFileSync(pkgFile, JSON.stringify(pkg, null, 2));
};

TestHelper.prototype.getPkg = function(dir) {
  if (typeof dir === 'undefined') {
    dir = this.projectDir;
  }

  var pkgFile = path.join(dir, 'package.json');
  return JSON.parse(fs.readFileSync(pkgFile));
};

TestHelper.prototype.npmLink = function(dir) {
  var nodeDir = path.join(dir, 'node_modules');
  var binDir = path.join(nodeDir, '.bin');


  if (PathsExist(nodeDir)) {
    rimraf.sync(nodir);
  }

  mkdirp.sync(binDir);

  // mimic npm link
  var pkgsToLink = shelljs.ls('-d', path.join(fixtureDir, '*'));
  pkgsToLink.push(path.join(__dirname, '..', '..'));
  pkgsToLink.push(path.join(__dirname, '..', '..', 'node_modules', 'video.js'));
  pkgsToLink.push(path.join(__dirname, '..', '..', 'node_modules', 'sinon'));

  pkgsToLink.forEach(function(folder) {
    // skip the main package
    if (path.basename(folder) === 'test-pkg-main') {
      return;
    }
    var pkg = JSON.parse(fs.readFileSync((path.join(folder, 'package.json'))));
    shelljs.ln('-sf', folder, path.join(nodeDir, pkg.name));

    if (!pkg.bin) {
      return;
    }
    Object.keys(pkg.bin).forEach(function(binName) {
      var binPath = pkg.bin[binName];

      shelljs.ln('-sf', path.join(folder, binPath), path.join(binDir, binName));
    });
  });
};

TestHelper.prototype.fixtureClean = function() {
  // pre-cleanup
  ['bower.json', 'npm-debug.log', 'dist', 'build', 'node_modules', '.git'].forEach(function(dir) {
    var d = path.join(fixtureDir, 'test-pkg-main', dir);

    if (PathsExist(d)) {
      rimraf.sync(d);
    }
  });
};

TestHelper.prototype.getBinList = function() {
  var files = GetFiles(path.join(__dirname, '..', '..', 'src', '*')).filter(function(file) {
      var basename = path.basename(file);

      // filter out folders
      if (fs.lstatSync(file).isDirectory()) {
        return false;
      }

      // filter out anything already in pkg.bin
      if (sbPkg.bin[basename]) {
        return false;
      }

      return true;
    });

  return Object.keys(sbPkg.bin).concat(files);
};

module.exports = TestHelper;
