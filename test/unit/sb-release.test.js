var assert = require('chai').assert;
var shelljs = require('shelljs');
var path = require('path');
var TestHelper = require('./test-helper.js');
var PathsExist = require(path.join(TestHelper.rootDir, 'src', 'utils', 'paths-exist'));
var binFile = path.join('node_modules', '.bin', 'sb-release') + ' ';
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
  describe('invalid uses', function() {
    it('should exit with an error if no args are passed', function(done) {
      var helper = new TestHelper();

      shelljs.exec(binFile, function(code, stdout, stderr) {
        var stdouts = helper.trim(stdout);
        var stderrs = helper.trim(stderr);

        assert.equal(code, 1, 'should return failure');
        assert.equal(stdouts.length, 2, 'should stdout 2 lines');
        assert.equal(stderrs.length, 1, 'should stderr an error');
        helper.cleanup(done);
      });
    });

    it('should exit with an error if an invalid version is passed', function(done) {
      var helper = new TestHelper();

      shelljs.exec(binFile + 'foo', function(code, stdout, stderr) {
        var stdouts = helper.trim(stdout);
        var stderrs = helper.trim(stderr);

        assert.equal(code, 1, 'should return failure');
        assert.equal(stdouts.length, 2, 'should stdout 2 lines');
        assert.equal(stderrs.length, 2, 'should stderr an error');
        helper.cleanup(done);
      });
    });

    it('should exit with an error if there is no .git dir', function(done) {
      var helper = new TestHelper();

      shelljs.rm('-rf', path.join(helper.config.path, '.git'));
      shelljs.exec(binFile + '1.0.1', function(code, stdout, stderr) {
        var stdouts = helper.trim(stdout);
        var stderrs = helper.trim(stderr)

        assert.equal(code, 1, 'should return failure');
        assert.equal(stdouts.length, 2, 'should stdout 2 lines');
        assert.equal(stderrs.length, 1, 'should stderr an error');
        helper.cleanup(done);
      });
    });

    it('should exit with an error if there is no CHANGELOG', function(done) {
      var helper = new TestHelper();

      shelljs.rm('-f', path.join(helper.config.path, 'CHANGELOG.md'));
      shelljs.exec(binFile + '1.0.1', function(code, stdout, stderr) {
        var stdouts = helper.trim(stdout);
        var stderrs = helper.trim(stderr)

        assert.equal(code, 1, 'should return failure');
        assert.equal(stdouts.length, 2, 'should stdout 2 lines');
        assert.equal(stderrs.length, 1, 'should stderr an error');
        helper.cleanup(done);
      });
    });

    it('should exit with an error if version passed is the current version', function(done) {
      var helper = new TestHelper();

      shelljs.exec(binFile + '1.0.0', function(code, stdout, stderr) {
        var stdouts = helper.trim(stdout);
        var stderrs = helper.trim(stderr)

        assert.equal(code, 1, 'should return failure');
        assert.equal(stdouts.length, 2, 'should stdout 2 lines');
        assert.equal(stderrs.length, 2, 'should stderr an error');
        helper.cleanup(done);
      });
    });

    it('should exit with an error if run with npm version', function(done) {
      var helper = new TestHelper();

      shelljs.exec('npm version 1.0.0', function(code, stdout, stderr) {
        var stdouts = helper.trim(stdout);
        var stderrs = helper.trim(stderr)

        assert.equal(code, 1, 'should return failure');
        assert.equal(stdouts.length, 0, 'should stdout 0 lines');
        assert.equal(stderrs.length, 10, 'should stderr an error');
        helper.cleanup(done);
      });
    });
  });

  ['npm run version', binFile].forEach(function(bin) {
    describe('Running it with ' + path.basename(bin), function() {
      Object.keys(versions).forEach(function(versionName) {
        var versionNumber = versions[versionName];

        it('should run with version ' + versionName, function(done) {
          var helper = new TestHelper();

          shelljs.exec(bin + ' ' + versionName, function(code, stdout, stderr) {
            var stdouts = helper.trim(stdout);
            var stderrs = helper.trim(stderr)

            assert.equal(code, 0, 'should return success');
            assert.notEqual(stdouts.length, 0, 'should stdout multiple lines');
            assert.equal(stderr, '', 'should stderr nothing');

            var gitLog = shelljs.exec('git log --oneline -1').grep(versionNumber);
            var gitTag = shelljs.exec('git tag').grep(versionNumber);
            var changelog = shelljs.cat(path.join(helper.config.path, 'CHANGELOG.md')).grep(versionNumber)
            var pkg = JSON.parse(shelljs.cat(path.join(helper.config.path, 'package.json')));

            assert.notEqual(gitLog.stdout.length, 0,'git log should be correct');
            assert.notEqual(gitTag.stdout.length, 0, 'git tag should be correct');
            assert.notEqual(changelog.stdout.length, 0, 'change log should be correct');
            assert.equal(pkg.version, versionNumber, 'pkg.json should be correct');
            helper.cleanup(done);
          });
        })
      });
    });
  });

  /* TODO: find a way to change the path so we don't do the entire build here
  describe('bower', function() {
    it('should do a release for bower', function(done) {
      var helper = new TestHelper();

      shelljs.touch(path.join(helper.config.path, 'bower.json'));
      shelljs.exec(binFile + ' major', function(code, stdout, stderr) {
        var stdouts = helper.trim(stdout);
        var stderrs = helper.trim(stderr)
        console.log(stdout, stderr);

        assert.equal(code, 0, 'should return success');
        assert.equal(stdouts.length, 0, 'should stdout nothing');
        assert.equal(stderr.length, 0, 'should stderr nothing');
        helper.cleanup(done);
      });
    });
  });
  */

  ['--dry-run', '-d'].forEach(function(option) {
    describe(option, function() {
      it('should not change anything', function(done) {
        var helper = new TestHelper();

        shelljs.exec(binFile + ' 1.0.1 ' + option, function(code, stdout, stderr) {
          var stdouts = helper.trim(stdout);
          var stderrs = helper.trim(stderr)

          assert.equal(code, 0, 'should return success');
          assert.equal(stderr.length, 0, 'should stderr nothing');

          assert.notEqual(stdouts.length, 0, 'should stdout multiple lines');

          var gitLog = shelljs.exec('git log --oneline -1').grep('1.0.1');
          var gitTag = shelljs.exec('git tag');
          var changelog = shelljs.cat(path.join(helper.config.path, 'CHANGELOG.md')).grep('1.0.1')
          var pkg = JSON.parse(shelljs.cat(path.join(helper.config.path, 'package.json')));

          assert.equal(gitLog.stdout, '\n','git log should be correct');
          assert.equal(gitTag.stdout, '', 'git tag should be correct');
          assert.equal(changelog.stdout, '\n', 'change log should be correct');
          assert.notEqual(pkg.version, '1.0.1', 'pkg.json should have old version');
          helper.cleanup(done);
        });
      })
    });
  });
});
