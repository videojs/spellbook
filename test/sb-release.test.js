var assert = require('chai').assert;
var shelljs = require('shelljs');
var path = require('path');
var Helper = require('./test-helper.js');
var PathExists = require('../src/utils/path-exists');
var binPath = path.join(__dirname, '..', 'src/sb-release');
var versions = {
  'major': '2.0.0',
  'minor': '1.1.0',
  'patch': '1.0.1',
  'premajor': '2.0.0-0',
  'preminor': '1.1.0-0',
  'prepatch': '1.0.1-0',
  'prerelease': '1.0.1-0',
  '2.0.0': '2.0.0',
  '1.2.0': '1.2.0',
  '1.0.5': '1.0.5'
};

describe('sb-release', function() {
  beforeEach(function() {
    this.helper = new Helper();
    this.config = this.helper.setup();
    this.bin = binPath + ' ';
  });
  afterEach(function() {
    this.helper.cleanup();
  });

  after(function() {
    this.helper.after();
  });

  describe('invalid uses', function() {
    it('should exit with an error if no args are passed', function(done) {
      shelljs.exec(this.bin, function(code, stdout, stderr) {
        var stdouts = stdout.trim() ? stdout.trim().split('\n') : [];

        assert.equal(code, 1, 'should return failure');
        assert.equal(stdouts.length, 0, 'should not stdout');
        assert.ok(stderr.length > 0, 'should stderr an error');
        done();
      });
    });

    it('should exit with an error if an invalid version is passed', function(done) {
      shelljs.exec(this.bin + 'foo', function(code, stdout, stderr) {
        var stdouts = stdout.trim() ? stdout.trim().split('\n') : [];

        assert.equal(code, 1, 'should return failure');
        assert.equal(stdouts.length, 0, 'should not stdout');
        assert.ok(stderr.length > 0, 'should stderr an error');
        done();
      });
    });

    it('should exit with an error if there is no .git dir', function(done) {
      shelljs.rm('-rf', path.join(this.config.path, '.git'));

      shelljs.exec(this.bin + '1.0.1', function(code, stdout, stderr) {
        var stdouts = stdout.trim() ? stdout.trim().split('\n') : [];

        assert.equal(code, 1, 'should return failure');
        assert.equal(stdouts.length, 0, 'should not stdout');
        assert.ok(stderr.length > 0, 'should stderr an error');
        done();
      });
    });

    it('should exit with an error if there is no CHANGELOG', function(done) {
      shelljs.rm('-f', path.join(this.config.path, 'CHANGELOG.md'));

      shelljs.exec(this.bin + '1.0.1', function(code, stdout, stderr) {
        var stdouts = stdout.trim() ? stdout.trim().split('\n') : [];

        assert.equal(code, 1, 'should return failure');
        assert.equal(stdouts.length, 0, 'should not stdout');
        assert.ok(stderr.length > 0, 'should stderr an error');
        done();
      });
    });

    it('should exit with an error if version passed is the current version', function(done) {
      shelljs.exec(this.bin + '1.0.0', function(code, stdout, stderr) {
        var stdouts = stdout.trim() ? stdout.trim().split('\n') : [];

        assert.equal(code, 1, 'should return failure');
        assert.equal(stdouts.length, 0, 'should not stdout');
        assert.ok(stderr.length > 0, 'should stderr an error');
        done();
      });
    });

  it('should exit with an error if run with npm version', function(done) {
      shelljs.exec('npm version 1.0.0', function(code, stdout, stderr) {
        var stdouts = stdout.trim() ? stdout.trim().split('\n') : [];

        assert.equal(code, 1, 'should return failure');
        assert.equal(stdouts.length, 0, 'should not stdout');
        assert.ok(stderr.length > 0, 'should stderr an error');
        done();
      });
    });
  });

  ['npm run version', binPath].forEach(function(bin) {
    describe('Running it with ' + bin, function() {
      Object.keys(versions).forEach(function(versionName) {
        var versionNumber = versions[versionName];

        it('should run with version ' + versionName, function(done) {
          var config = this.config;

          shelljs.exec(bin + ' ' + versionName, function(code, stdout, stderr) {
            var stdouts = stdout.trim() ? stdout.trim().split('\n') : [];

            assert.equal(code, 0, 'should return success');
            assert.notEqual(stdouts.length, 0, 'should stdout multiple lines');
            assert.equal(stderr.length, 0, 'should stderr nothing');

            var gitLog = shelljs.exec('git log --oneline -1').grep(versionNumber);
            var gitTag = shelljs.exec('git tag').grep(versionNumber);
            var changelog = shelljs.cat(path.join(config.path, 'CHANGELOG.md')).grep(versionNumber)
            var pkg = JSON.parse(shelljs.cat(path.join(config.path, 'package.json')));

            assert.notEqual(gitLog.stdout.length, 0,'git log should be correct');
            assert.notEqual(gitTag.stdout.length, 0, 'git tag should be correct');
            assert.notEqual(changelog.stdout.length, 0, 'change log should be correct');
            assert.equal(pkg.version, versionNumber, 'pkg.json should be correct');
            done();
          });
        })
      });
    });
  });

  /* TODO: find a way to change the path so we don't do the entire build here

  describe('bower', function() {
    it('should do a release for bower', function(done) {
      shelljs.touch(path.join(this.config.path, 'bower.json'));

      shelljs.exec(this.bin + ' major', function(code, stdout, stderr) {
        var stdouts = stdout.trim() ? stdout.trim().split('\n') : [];
        console.log(stdout, stderr);

        assert.equal(code, 0, 'should return success');
        assert.equal(stdouts.length, 0, 'should stdout nothing');
        assert.equal(stderr.length, 0, 'should stderr nothing');
        done();
      });
    });
  });
  */

  ['--dry-run', '-d'].forEach(function(option) {
    describe(option, function() {
      it('should not change anything', function(done) {
        var config = this.config;

        shelljs.exec(this.bin + ' 1.0.1 ' + option, function(code, stdout, stderr) {
          var stdouts = stdout.trim() ? stdout.trim().split('\n') : [];

          assert.equal(code, 0, 'should return success');
          assert.equal(stderr.length, 0, 'should stderr nothing');

          assert.notEqual(stdouts.length, 0, 'should stdout multiple lines');

          var gitLog = shelljs.exec('git log --oneline -1').grep('1.0.1');
          var gitTag = shelljs.exec('git tag');
          var changelog = shelljs.cat(path.join(config.path, 'CHANGELOG.md')).grep('1.0.1')
          var pkg = JSON.parse(shelljs.cat(path.join(config.path, 'package.json')));

          assert.equal(gitLog.stdout, '\n','git log should be correct');
          assert.equal(gitTag.stdout, '', 'git tag should be correct');
          assert.equal(changelog.stdout, '\n', 'change log should be correct');
          assert.notEqual(pkg.version, '1.0.1', 'pkg.json should have old version');
          done();
        });
      })
    });
  });
  ['--quiet', '-q'].forEach(function(option) {
    describe(option, function() {
      it('should not print anything', function(done) {
        var config = this.config;

        shelljs.exec(this.bin + ' 1.0.1 ' + option, function(code, stdout, stderr) {
          var stdouts = stdout.trim() ? stdout.trim().split('\n') : [];

          assert.equal(code, 0, 'should return success');
          assert.equal(stderr.length, 0, 'should stderr nothing');

          assert.equal(stdouts.length, 0, 'should stdout nothing');

          var gitLog = shelljs.exec('git log --oneline -1').grep('1.0.1');
          var gitTag = shelljs.exec('git tag').grep('1.0.1');
          var changelog = shelljs.cat(path.join(config.path, 'CHANGELOG.md')).grep('1.0.1')
          var pkg = JSON.parse(shelljs.cat(path.join(config.path, 'package.json')));

          assert.notEqual(gitLog.stdout.length, 0,'git log should be correct');
          assert.notEqual(gitTag.stdout.length, 0, 'git tag should be correct');
          assert.notEqual(changelog.stdout.length, 0, 'change log should be correct');
          assert.equal(pkg.version, '1.0.1', 'pkg.json should have new version');
          done();
        });
      })
    });
  });
});
