var assert = require('chai').assert;
var shelljs = require('shelljs');
var path = require('path');
var TestHelper = require('./test-helper.js');
var PathsExist = require('../../src/utils/paths-exist');
var binName = 'sb-clean';
var parallel = require('mocha.parallel');

[
  'sb-test',
  'sb-test-all',
  'sb-test-browser',
  'sb-test-node',
  'sb-test-node-all',
  'sb-test-node-require'
].forEach(function(binName) {
  parallel(binName, function() {
    it('should run error on linter', function(done) {
      var helper = new TestHelper({copyDist: true});

      helper.exec(binName, ['--no-build'], function(code, stdout, stderr) {

        assert.notEqual(code, 0, 'should return failure for linter');
        helper.cleanup(done);
      });
    });

    it('should run with no errors and --no-lint', function(done) {
      var helper = new TestHelper({copyDist: true});

      helper.exec(binName, ['--no-lint', '--no-build'], function(code, stdout, stderr) {

        assert.equal(code, 0, 'should return success');
        helper.cleanup(done);
      });
    });

    if ((/^sb-test-node/).test(binName)) {
      return
    }

    it('should error on fake browser', function(done) {
      var helper = new TestHelper({copyDist: true});

      helper.exec(binName, ['--no-lint', '--no-build', '--browsers', 'cow'], function(code, stdout, stderr) {

        assert.notEqual(code, 0, 'should return failure');
        helper.cleanup(done);
      });
    });

    it('should run just chrome', function(done) {
      var helper = new TestHelper({copyDist: true});

      helper.exec(binName, ['--no-lint', '--no-build', '--browsers', 'chrome'], function(code, stdout, stderr) {

        assert.equal(code, 0, 'should return success');
        helper.cleanup(done);
      });
    });

  it('should run on a different port', function(done) {
      var helper = new TestHelper({copyDist: true});

      helper.exec(binName, ['--no-lint', '--no-build', '--port', '9888'], function(code, stdout, stderr) {

        assert.equal(code, 0, 'should return success');
        helper.cleanup(done);
      });
    });

  });
});
