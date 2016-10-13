var assert = require('chai').assert;
var shelljs = require('shelljs');
var path = require('path');
var TestHelper = require('./test-helper.js');
var pkg = require(path.join(TestHelper.rootDir, 'package.json'));
var parallel = require('mocha.parallel');

shelljs.cd(TestHelper.fixtureDir);
Object.keys(pkg.bin).forEach(function(key) {
  parallel(key, function() {
    var binFile = path.join('node_modules', '.bin', key) + ' ';

    beforeEach(function() {
      shelljs.config.silent = true;
    });
    afterEach(function() {
      shelljs.config.silent = false;
    });


    ['--help', '-h'].forEach(function(option) {
      it('should have ' + option, function(done) {
        shelljs.exec(binFile + option, function(code, stdout, stderr) {

          assert.equal(code, 0, 'should return success');
          assert.ok((new RegExp('Usage: ' + key)).test(stdout), 'should print help');
          assert.equal(stderr.length, 0, 'no errors');
          done();
        });
      });
    });

    ['--version', '-V'].forEach(function(option) {
      it('should have ' + option, function(done) {
        shelljs.exec(binFile + option, function(code, stdout, stderr) {
          var stdouts = stdout.trim().split('\n');

          assert.equal(code, 0, 'should return success');
          assert.ok((new RegExp(pkg.version)).test(stdout), 'should print version');
          assert.equal(stderr.length, 0, 'no errors');
          done();
        });
      });
    });
  });
});
