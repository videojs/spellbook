var assert = require('chai').assert;
var shelljs = require('shelljs');
var path = require('path');
var TestHelper = require('./test-helper.js');
var PathsExist = require('../../src/utils/paths-exist');
var binName = 'sb-clean';
var parallel = require('mocha.parallel');

['sb-test-all', 'sb-test', 'sb-test-browser'].forEach(function(binName) {
  parallel(binName, function() {
    it('should run without error', function(done) {
      var helper = new TestHelper();

      helper.exec(binName, function(code, stdout, stderr) {

        assert.equal(code, 0, 'should return success');
        helper.cleanup(done);
      });
    });
  });
});
