var assert = require('chai').assert;
var shelljs = require('shelljs');
var path = require('path');
var TestHelper = require('./test-helper.js');
var PathsExist = require(path.join(TestHelper.rootDir, 'src', 'utils', 'paths-exist'));
var binFile = path.join('node_modules', '.bin', 'sb-release') + ' ';
var parallel = require('mocha.parallel');
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

parallel('sb-release', function() {
  it('should exit with an error if no args are passed', function(done) {
    var helper = new TestHelper();

    shelljs.exec(helper.binPath(binFile), function(code, stdout, stderr) {
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

    shelljs.exec(helper.binPath(binFile) + 'foo', function(code, stdout, stderr) {
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
    shelljs.exec(helper.binPath(binFile) + '1.0.1', function(code, stdout, stderr) {
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
    shelljs.exec(helper.binPath(binFile) + '1.0.1', function(code, stdout, stderr) {
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

    shelljs.exec(helper.binPath(binFile) + '1.0.0', function(code, stdout, stderr) {
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

    shelljs.exec('npm version 1.0.1', function(code, stdout, stderr) {
      var stdouts = helper.trim(stdout);
      var stderrs = helper.trim(stderr)

      assert.equal(code, 1, 'should return failure');
      assert.equal(stdouts.length, 3, 'should stdout 0 lines');
      assert.notEqual(stderrs.length, 0, 'should stderr an error');
      helper.cleanup(done);
    });
  });

  ['npm run version ', binFile].forEach(function(bin) {
    Object.keys(versions).forEach(function(versionName) {
      var versionNumber = versions[versionName];

      it('should run with ' + bin + versionName, function(done) {
        var helper = new TestHelper();
        if (path.basename(bin) === 'sb-release') {
          bin = helper.binPath(bin);
        }

        shelljs.exec(bin + ' ' + versionName, function(code, stdout, stderr) {
          var stdouts = helper.trim(stdout);
          var stderrs = helper.trim(stderr)

          assert.equal(code, 0, 'should return success');
          assert.notEqual(stdouts.length, 0, 'should stdout multiple lines');
          assert.equal(stderr, '', 'should stderr nothing');

          shelljs.pushd(helper.config.path);
          var gitLog = shelljs.exec('git log --oneline -1');
          var gitTag = shelljs.exec('git tag');
          var changelog = shelljs.cat(path.join(helper.config.path, 'CHANGELOG.md'));
          var pkg = JSON.parse(shelljs.cat(path.join(helper.config.path, 'package.json')));
          var versionRegex = new RegExp(versionNumber);

          shelljs.popd();

          assert.isOk(versionRegex.test(gitLog.stdout),'git log should be correct');
          assert.isOk(versionRegex.test(gitTag.stdout), 'git tag should be correct');
          assert.isOk(versionRegex.test(changelog.stdout), 'change log should be correct');
          assert.equal(pkg.version, versionNumber, 'pkg.json should be correct');
          helper.cleanup(done);
        });
      })
    });
  });

    /* TODO: find a way to change the path so we don't do the entire build here
  describe('bower', function() {
    it('should do a release for bower', function(done) {
      var helper = new TestHelper();

      shelljs.touch(path.join(helper.config.path, 'bower.json'));
      shelljs.exec(helper.binPath(binFile) + ' major', function(code, stdout, stderr) {
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
    it('should not change anything when run with ' + option, function(done) {
      var helper = new TestHelper();

      shelljs.exec(binFile + ' 1.0.1 ' + option, function(code, stdout, stderr) {
        var stdouts = helper.trim(stdout);
        var stderrs = helper.trim(stderr)

        assert.equal(code, 0, 'should return success');
        assert.equal(stderr.length, 0, 'should stderr nothing');
        assert.notEqual(stdouts.length, 0, 'should stdout multiple lines');

        shelljs.pushd(helper.config.path);
        var gitLog = shelljs.exec('git log --oneline -1');
        var gitTag = shelljs.exec('git tag');
        var changelog = shelljs.cat(path.join(helper.config.path, 'CHANGELOG.md'));
        var pkg = JSON.parse(shelljs.cat(path.join(helper.config.path, 'package.json')));
        var versionRegex = new RegExp('1.0.1');
        shelljs.popd();

        assert.notOk(versionRegex.test(gitLog.stdout),'git log should not be changed');
        assert.notOk(versionRegex.test(gitTag.stdout), 'git tag should not be changed');
        assert.notOk(versionRegex.test(changelog.stdout), 'change log should not be changed');
        assert.notEqual(pkg.version, '1.0.1', 'pkg.json should be the old value correct');
        helper.cleanup(done);
      });
    })
  });
});
