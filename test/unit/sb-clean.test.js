var assert = require('chai').assert;
var shelljs = require('shelljs');
var path = require('path');
var TestHelper = require('./test-helper.js');
var PathsExist = require(path.join(TestHelper.rootDir, 'src', 'utils', 'paths-exist'));
var binFile = path.join('node_modules', '.bin', 'sb-clean') + ' ';
var parallel = require('mocha.parallel');

var PathRemoved = function(helper, stdout, p) {
  var relpath = path.relative(helper.config.path, p)
    .replace(/^\.\//, '')
    .replace(/^\//, '');

  var regex = new RegExp('removing ' + relpath);

  assert.ok(regex.test(stdout), 'should have removed ' + relpath);
};

parallel('sb-clean:defaults', function() {
  it('should delete nothing if there is nothing to clean', function(done) {
    var helper = new TestHelper();

    shelljs.exec(binFile, function(code, stdout, stderr) {
      var stdouts = helper.trim(stdout);
      var stderrs = helper.trim(stderr)

      assert.equal(code, 0, 'should return success');
      assert.equal(stdouts.length, 2, 'should stdout start + finish only');
      assert.equal(stderr.length, 0, 'should stderr nothing');
      helper.cleanup(done);
    });
  });

  it('should delete the dist folder if it exists', function(done) {
    var helper = new TestHelper();

    shelljs.mkdir('-p', helper.config.dist);
    shelljs.exec(binFile, function(code, stdout, stderr) {
      var stdouts = helper.trim(stdout);
      var stderrs = helper.trim(stderr)

      assert.equal(code, 0, 'should return success');
      assert.equal(stderr.length, 0, 'should stderr nothing');
      assert.equal(stdouts.length, 3, 'should only print one removal');

      PathRemoved(helper, stdout, helper.config.dist);
      assert.equal(PathsExist(helper.config.dist), false, 'dist should be deleted');

      helper.cleanup(done);
    });
  });

  it('should delete npm-debug.log if it exists', function(done) {
    var helper = new TestHelper();
    var npmDebug = path.join(helper.config.path, 'npm-debug.log');

    shelljs.touch(npmDebug);
    shelljs.exec(binFile, function(code, stdout, stderr) {
      var stdouts = helper.trim(stdout);
      var stderrs = helper.trim(stderr)

      assert.equal(code, 0, 'should return success');
      assert.equal(stderr.length, 0, 'should stderr nothing');
      assert.equal(stdouts.length, 3, 'should only print one removal');

      PathRemoved(helper, stdout, npmDebug);
      assert.equal(PathsExist(npmDebug), false, 'npm-debug.log should be deleted');

      helper.cleanup(done);
    });
  });

  it('should delete npm-debug.log and dist if they exist', function(done) {
    var helper = new TestHelper();
    var npmDebug = path.join(helper.config.path, 'npm-debug.log');

    shelljs.mkdir('-p', helper.config.dist);
    shelljs.touch(npmDebug);
    shelljs.exec(binFile, function(code, stdout, stderr) {
      var stdouts = helper.trim(stdout);
      var stderrs = helper.trim(stderr)

      assert.equal(code, 0, 'should return success');
      assert.equal(stderr.length, 0, 'should not print to stderr');
      assert.equal(stdouts.length, 4, 'should print nothing');

      PathRemoved(helper, stdout, helper.config.dist);
      assert.equal(PathsExist(helper.config.dist), false, 'dist should be deleted');

      PathRemoved(helper, stdout, npmDebug);
      assert.equal(PathsExist(npmDebug), false, 'npm-debug.log should be deleted');
      helper.cleanup(done);
    });
  });
});

parallel('sb-clean:dry-run', function() {
  ['-d', '--dry-run'].forEach(function(option) {
    it(option + ': should not delete the dist folder if it exists', function(done) {
      var helper = new TestHelper();

      shelljs.mkdir('-p', helper.config.dist);
      shelljs.exec(binFile + option, function(code, stdout, stderr) {
        var stdouts = helper.trim(stdout);
        var stderrs = helper.trim(stderr)

        assert.equal(code, 0, 'should return success');
        assert.equal(stderr.length, 0, 'should not print to stderr');
        assert.equal(stdouts.length, 3, 'should print one removals');

        PathRemoved(helper, stdout, helper.config.dist);
        assert.equal(PathsExist(helper.config.dist), true, 'dist should exist');

        helper.cleanup(done);
      });
    });

    it(option + ': should not delete npm-debug.log or dist folder', function(done) {
      var helper = new TestHelper();
      var npmDebug = path.join(helper.config.path, 'npm-debug.log');

      shelljs.mkdir('-p', helper.config.dist);
      shelljs.touch(npmDebug);

      shelljs.exec(binFile + option, function(code, stdout, stderr) {
        var stdouts = helper.trim(stdout);
        var stderrs = helper.trim(stderr)

        assert.equal(code, 0, 'should return success');
        assert.equal(stderr.length, 0, 'should not print to stderr');
        assert.equal(stdouts.length, 4, 'should print two removals');

        PathRemoved(helper, stdout, helper.config.dist);
        assert.equal(PathsExist(helper.config.dist), true, 'dist should exist');
        assert.equal(PathsExist(npmDebug), true, 'debug log should exist');

        helper.cleanup(done);
      });
    });
  });
});
