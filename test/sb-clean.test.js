var assert = require('chai').assert;
var shelljs = require('shelljs');
var path = require('path');
var TestHelper = require('./test-helper.js');
var PathExists = require('../src/utils/paths-exist');
var binPath = path.join(__dirname, '..', 'src', 'sb-clean') + ' ';

var PathRemoved = function(helper, stdout, p) {
  var relpath = path.relative(helper.config.path, p)
    .replace(/^\.\//, '')
    .replace(/^\//, '');

  var regex = new RegExp('removing ' + relpath);

  assert.ok(regex.test(stdout), 'should have removed ' + relpath);
};

describe('sb-clean', function() {
  describe('no arguments', function() {

    it('should delete nothing if there is nothing to clean', function(done) {
      var helper = new TestHelper();

      shelljs.exec(binPath, function(code, stdout, stderr) {
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
      shelljs.exec(binPath, function(code, stdout, stderr) {
        var stdouts = helper.trim(stdout);
        var stderrs = helper.trim(stderr)

        assert.equal(code, 0, 'should return success');
        assert.equal(stderr.length, 0, 'should stderr nothing');
        assert.equal(stdouts.length, 3, 'should only print one removal');

        PathRemoved(helper, stdout, helper.config.dist);
        assert.equal(PathExists(helper.config.dist), false, 'dist should be deleted');

        helper.cleanup(done);
      });
    });

    it('should delete npm-debug.log if it exists', function(done) {
      var helper = new TestHelper();
      var npmDebug = path.join(helper.config.path, 'npm-debug.log');

      shelljs.touch(npmDebug);
      shelljs.exec(binPath, function(code, stdout, stderr) {
        var stdouts = helper.trim(stdout);
        var stderrs = helper.trim(stderr)

        assert.equal(code, 0, 'should return success');
        assert.equal(stderr.length, 0, 'should stderr nothing');
        assert.equal(stdouts.length, 3, 'should only print one removal');

        PathRemoved(helper, stdout, npmDebug);
        assert.equal(PathExists(npmDebug), false, 'npm-debug.log should be deleted');

        helper.cleanup(done);
      });
    });


    it('should not delete cache, only dist', function(done) {
      var helper = new TestHelper();

      shelljs.mkdir('-p', helper.config.dist, helper.config.cache);
      shelljs.exec(binPath, function(code, stdout, stderr) {
        var stdouts = helper.trim(stdout);
        var stderrs = helper.trim(stderr)

        assert.equal(code, 0, 'should return success');
        assert.equal(stderr.length, 0, 'should stderr nothing');
        assert.equal(stdouts.length, 3, 'should only print one removal');

        PathRemoved(helper, stdout, helper.config.dist);
        assert.equal(PathExists(helper.config.dist), false, 'dist should be deleted');

        assert.equal(PathExists(helper.config.cache), true, 'cache should still exist');
        helper.cleanup(done);
      });
    });
  });

  ['-c', '--cache'].forEach(function(option) {
    describe(option, function() {
      it('should delete the dist folder if it exists', function(done) {
        var helper = new TestHelper();

        shelljs.mkdir('-p', helper.config.dist);
        shelljs.exec(binPath + option, function(code, stdout, stderr) {
          var stdouts = helper.trim(stdout);
          var stderrs = helper.trim(stderr)

          assert.equal(code, 0, 'should return success');
          assert.equal(stderr.length, 0, 'should not print to stderr');
          assert.equal(stdouts.length, 3, 'should only print one removal');

          PathRemoved(helper, stdout, helper.config.dist);
          assert.equal(PathExists(helper.config.dist), false, 'dist should be deleted');

          helper.cleanup(done);
        });
      });

      it('should delete cache and dist', function(done) {
        var helper = new TestHelper();

        shelljs.mkdir('-p', helper.config.dist, helper.config.cache);
        shelljs.exec(binPath + option, function(code, stdout, stderr) {
          var stdouts = helper.trim(stdout);
          var stderrs = helper.trim(stderr)

          assert.equal(code, 0, 'should return success');
          assert.equal(stderr.length, 0, 'should not print to stderr');

          assert.equal(stdouts.length, 4, 'should print two removals');

          PathRemoved(helper, stdout, helper.config.dist);
          PathRemoved(helper, stdout, helper.config.cache);

          assert.equal(PathExists(helper.config.dist), false, 'dist should be deleted');
          assert.equal(PathExists(helper.config.cache), false, 'cache should be deleted');

          helper.cleanup(done);
        });
      });

      it('should delete just cache', function(done) {
        var helper = new TestHelper();

        shelljs.mkdir('-p', helper.config.cache);
        shelljs.exec(binPath + option, function(code, stdout, stderr) {
          var stdouts = helper.trim(stdout);
          var stderrs = helper.trim(stderr)

          assert.equal(code, 0, 'should return success');
          assert.equal(stderr.length, 0, 'should not print to stderr');
          assert.equal(stdouts.length, 3, 'should only print one removal');

          PathRemoved(helper, stdout, helper.config.cache);
          assert.equal(PathExists(helper.config.cache), false, 'cache should be deleted');

          helper.cleanup(done);
        });
      });
    });
  });

  ['-d', '--dry-run'].forEach(function(option) {
    describe(option, function() {
      it('should not delete the dist folder if it exists', function(done) {
        var helper = new TestHelper();

        shelljs.mkdir('-p', helper.config.dist);
        shelljs.exec(binPath + option, function(code, stdout, stderr) {
          var stdouts = helper.trim(stdout);
          var stderrs = helper.trim(stderr)

          assert.equal(code, 0, 'should return success');
          assert.equal(stderr.length, 0, 'should not print to stderr');
          assert.equal(stdouts.length, 3, 'should print one removals');

          PathRemoved(helper, stdout, helper.config.dist);
          assert.equal(PathExists(helper.config.dist), true, 'dist should exist');

          helper.cleanup(done);
        });
      });

      it('should not delete cache or dist folder', function(done) {
        var helper = new TestHelper();

        shelljs.mkdir('-p', helper.config.dist, helper.config.cache);
        shelljs.exec(binPath + option, function(code, stdout, stderr) {
          var stdouts = helper.trim(stdout);
          var stderrs = helper.trim(stderr)

          assert.equal(code, 0, 'should return success');
          assert.equal(stderr.length, 0, 'should not print to stderr');
          assert.equal(stdouts.length, 3, 'should print one removals');

          PathRemoved(helper, stdout, helper.config.dist);
          assert.equal(PathExists(helper.config.dist), true, 'dist should exist');

          helper.cleanup(done);
        });
      });

      it('should not delete cache or dist folder with --cache', function(done) {
        var helper = new TestHelper();

        shelljs.mkdir('-p', helper.config.dist, helper.config.cache);
        shelljs.exec(binPath + '--cache ' + option, function(code, stdout, stderr) {
          var stdouts = helper.trim(stdout);
          var stderrs = helper.trim(stderr)

          assert.equal(code, 0, 'should return success');
          assert.equal(stderr.length, 0, 'should not print to stderr');
          assert.equal(stdouts.length, 4, 'should print all removals');

          PathRemoved(helper, stdout, helper.config.dist);
          assert.equal(PathExists(helper.config.dist), true, 'dist should exist');

          PathRemoved(helper, stdout, helper.config.cache);
          assert.equal(PathExists(helper.config.cache), true, 'cache should exist');
          helper.cleanup(done);
        });
      });
    });
  });

  ['-q', '--quiet'].forEach(function(option) {
    describe(option, function() {
      it('should not print anything when removing', function(done) {
        var helper = new TestHelper();

        shelljs.mkdir('-p', helper.config.dist, helper.config.cache);
        shelljs.exec(binPath + '--cache ' + option, function(code, stdout, stderr) {
          var stdouts = helper.trim(stdout);
          var stderrs = helper.trim(stderr)

          assert.equal(code, 0, 'should return success');
          assert.equal(stderr.length, 0, 'should not print to stderr');

          assert.equal(stdouts.length, 0, 'should print nothing');
          assert.equal(PathExists(helper.config.dist), false, 'dist should be removed');
          assert.equal(PathExists(helper.config.cache), false, 'cache should be removed');
          helper.cleanup(done);
        });
      });
    });
  });
});
