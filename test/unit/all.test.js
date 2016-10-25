var assert = require('chai').assert;
var path = require('path');
var TestHelper = require('./test-helper.js');
var pkg = require('../../package.json');
var parallel = require('mocha.parallel');
var GetFiles = require('../../src/utils/get-files');

GetFiles(path.join(__dirname, '..', '..', 'src', '*')).forEach(function(file) {
  var binName = path.basename(file);
  // skip utils file, as its a folder
  if (binName === 'utils') {
    return;
  }

  parallel(binName, function() {
    it('should exist in pkg.json', function(done) {
      var helper = new TestHelper();

      assert.ok(pkg.bin[binName], 'should exist in pkg.json');
      helper.cleanup(done);
    });
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

