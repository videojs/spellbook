var assert = require('chai').assert;
var shelljs = require('shelljs');
var path = require('path');
var pkg = require('../package.json');


describe('all --help, -h, -V, --version', function() {
  beforeEach(function() {
    shelljs.config.silent = true;
  });
  afterEach(function() {
    shelljs.config.silent = false;
  });

  Object.keys(pkg.bin).forEach(function(key) {
    var binPath = path.join(__dirname, '..', pkg.bin[key]);

    describe(key, function() {
      ['--help', '-h'].forEach(function(option) {
        it('should have ' + option, function(done) {
          shelljs.exec(binPath + ' ' + option, function(code, stdout, stderr) {
            var stdouts = stdout.trim().split('\n');

            assert.equal(code, 0, 'should return success');
            assert.ok((/^Usage:/).test(stdouts[0]), 'should print help');
            assert.equal(stderr.length, 0, 'no errors');
            done();
          });
        });
      });

      ['--version', '-V'].forEach(function(option) {
        it('should have ' + option, function(done) {
          shelljs.exec(binPath + ' ' + option, function(code, stdout, stderr) {
            var stdouts = stdout.trim().split('\n');

            assert.equal(code, 0, 'should return success');
            assert.ok(stdouts[0], pkg.version, 'should print version');
            assert.equal(stderr.length, 0, 'no errors');
            done();
          });
        });
      });
    });
  })
});
