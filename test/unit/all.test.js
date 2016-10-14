var assert = require('chai').assert;
var path = require('path');
var TestHelper = require('./test-helper.js');
var pkg = require(path.join(TestHelper.rootDir, 'package.json'));
var parallel = require('mocha.parallel');

Object.keys(pkg.bin).forEach(function(binName) {
  parallel(binName, function() {
    ['--help', '-h'].forEach(function(option) {
      it('should have ' + option, function(done) {
        var helper = new TestHelper();
        var child = helper.exec(binName, [option], function(code, stdout, stderr) {

          assert.equal(code, 0, 'should return success');
          assert.ok((new RegExp('^Usage: ' + binName)).test(stdout[0]), 'should print help');
          assert.equal(stderr.length, 0, 'no errors');
          helper.cleanup(done);
        });
      });
    });

    ['--version', '-V'].forEach(function(option) {
      it('should have ' + option, function(done) {
        var helper = new TestHelper();
        var child = helper.exec(binName, [option], function(code, stdout, stderr) {

          assert.equal(code, 0, 'should return success');
          assert.ok((new RegExp(pkg.version)).test(stdout[0]), 'should print version');
          assert.equal(stderr.length, 0, 'no errors');
          helper.cleanup(done);
        });
      });
    });
  });
});
