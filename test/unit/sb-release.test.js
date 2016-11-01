var assert = require('chai').assert;
var shelljs = require('shelljs');
var path = require('path');
var TestHelper = require('./test-helper.js');
var PathsExist = require('../../src/utils/paths-exist');
var binName = 'sb-release';
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

parallel('sb-release:invalid', function() {
  it('should exit with an error if no args are passed', function(done) {
    var helper = new TestHelper({gitInit: true});

    helper.exec(binName, function(code, stdout, stderr) {

      assert.equal(code, 1, 'should return failure');
      assert.equal(stdout.length, 2, 'should stdout 2 lines');
      assert.equal(stderr.length, 1, 'should stderr an error');
      helper.cleanup(done);
    });
  });

  it('should exit with an error if an invalid version is passed', function(done) {
    var helper = new TestHelper({gitInit: true});

    helper.exec(binName, ['foo'], function(code, stdout, stderr) {

      assert.equal(code, 1, 'should return failure');
      assert.equal(stdout.length, 2, 'should stdout 2 lines');
      assert.equal(stderr.length, 2, 'should stderr an error');
      helper.cleanup(done);
    });
  });

  it('should exit with an error if there is no .git dir', function(done) {
    var helper = new TestHelper();

    helper.exec(binName, ['1.0.1'], function(code, stdout, stderr) {

      assert.equal(code, 1, 'should return failure');
      assert.equal(stdout.length, 2, 'should stdout 2 lines');
      assert.equal(stderr.length, 1, 'should stderr an error');
      helper.cleanup(done);
    });
  });

  it('should exit with an error if version passed is the current version', function(done) {
    var helper = new TestHelper({gitInit: true});

    helper.exec(binName, ['1.0.0'], function(code, stdout, stderr) {

      assert.equal(code, 1, 'should return failure');
      assert.equal(stdout.length, 2, 'should stdout 2 lines');
      assert.equal(stderr.length, 2, 'should stderr an error');
      helper.cleanup(done);
    });
  });
});

['npm version', 'npm run release', binName].forEach(function(bin) {
  parallel('sb-release:versions:' + bin, function() {
    Object.keys(versions).forEach(function(versionName) {
      var versionNumber = versions[versionName];

      it('should run with ' + bin + ' and ' + versionName, function(done) {
        var helper = new TestHelper({gitInit: true});
        var command = bin;
        var args = [];

        if (bin === 'npm run release') {
          command = 'npm';
          args = ['run', 'release'];
        }
        if (bin === 'npm version') {
          command = 'npm';
          args = ['version'];
        }

        helper.exec(command, args.concat([versionName]), function(code, stdout, stderr) {
          assert.equal(code, 0, 'should return success');
          assert.notEqual(stdout.length, 0, 'should stdout multiple lines');
          assert.equal(stderr.length, 0, 'should stderr nothing');

          shelljs.pushd(helper.config.path);
          var gitLog = shelljs.exec('git log --oneline -1');
          var gitTag = shelljs.exec('git tag');
          var gitDiff = shelljs.exec('git diff --name-only v' + versionNumber);
          var changelog = shelljs.cat(path.join(helper.config.path, 'CHANGELOG.md'));
          var pkg = JSON.parse(shelljs.cat(path.join(helper.config.path, 'package.json')));
          var versionRegex = new RegExp(versionNumber);
          shelljs.popd();

          assert.isOk(versionRegex.test(gitLog.stdout),'git log should be correct');
          assert.isOk(versionRegex.test(gitTag.stdout), 'git tag should be correct');
          assert.isOk(versionRegex.test(changelog.stdout), 'change log should be correct');
          assert.equal(pkg.version, versionNumber, 'pkg.json should be correct');
          assert.equal(gitDiff.length, 0, 'should be no diff between tag and master');
          helper.cleanup(done);
        });
      });
    });
  });
});

parallel('sb-release:extra', function() {
  it('should do a release for bower', function(done) {
    var helper = new TestHelper({gitInit: true});

    shelljs.touch(path.join(helper.config.path, 'bower.json'));
    helper.exec(binName, ['1.0.1'], function(code, stdout, stderr) {

      assert.equal(code, 0, 'should return success');
      assert.notEqual(stdout.length, 0, 'should stdout commands that were run');
      assert.deepEqual(stderr, [], 'should stderr nothing');

      shelljs.pushd(helper.config.path);
      var gitLog = shelljs.exec('git log --oneline -1');
      var gitTag = shelljs.exec('git tag');
      var gitDiff = shelljs.exec('git diff --name-only v1.0.1');
      var changelog = shelljs.cat(path.join(helper.config.path, 'CHANGELOG.md'));
      var pkg = JSON.parse(shelljs.cat(path.join(helper.config.path, 'package.json')));
      var versionRegex = new RegExp('1.0.1');
      shelljs.popd();

      assert.isOk(versionRegex.test(gitLog.stdout),'git log should be correct');
      assert.isOk(versionRegex.test(gitTag.stdout), 'git tag should be correct');
      assert.isOk(versionRegex.test(changelog.stdout), 'change log should be correct');
      assert.equal(pkg.version, '1.0.1', 'pkg.json should be correct');

      assert.isOk(gitDiff.length > 0, 'diff should contain dist');
      helper.trim(gitDiff).forEach(function(file) {
        assert.ok((/^dist/, file), 'all files should be from dist');
      });

      helper.cleanup(done);
    });
  });
  it('should do a release without a changelog', function(done) {
    var helper = new TestHelper({gitInit: true});

    shelljs.rm(path.join(helper.config.path, 'CHANGELOG.md'));
    helper.exec(binName, ['1.0.1'], function(code, stdout, stderr) {

      assert.equal(code, 0, 'should return success');
      assert.notEqual(stdout.length, 0, 'should stdout commands that were run');
      assert.equal(stderr.length, 1, 'should stderr 1 line about changelog');

      shelljs.pushd(helper.config.path);
      var gitLog = shelljs.exec('git log --oneline -1');
      var gitTag = shelljs.exec('git tag');
      var gitDiff = shelljs.exec('git diff --name-only v1.0.1');
      var pkg = JSON.parse(shelljs.cat(path.join(helper.config.path, 'package.json')));
      var versionRegex = new RegExp('1.0.1');
      shelljs.popd();

      assert.isOk(versionRegex.test(gitLog.stdout),'git log should be correct');
      assert.isOk(versionRegex.test(gitTag.stdout), 'git tag should be correct');
      assert.equal(pkg.version, '1.0.1', 'pkg.json should be correct');
      assert.equal(gitDiff.length, 0, 'should be no diff between tag and master');

      helper.cleanup(done);
    });
  });
});

parallel('sb-release:arguments', function() {
  ['--dry-run', '-d'].forEach(function(option) {
    it('should not change anything when run with ' + option, function(done) {
      var helper = new TestHelper({gitInit: true});

      helper.exec(binName, ['1.0.1', option], function(code, stdout, stderr) {

        assert.equal(code, 0, 'should return success');
        assert.equal(stderr.length, 0, 'should stderr nothing');
        assert.notEqual(stdout.length, 0, 'should stdout multiple lines');

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
    });
  });
});
