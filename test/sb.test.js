var assert = require('chai').assert;
var shelljs = require('shelljs');
var path = require('path');
var binPath = path.join(__dirname, '..', 'src/sb');
var pkg = require('../package.json');


describe('sb', function() {
  beforeEach(function() {
    shelljs.config.silent = true;
  });
  afterEach(function() {
    shelljs.config.silent = false;
  });

  Object.keys(pkg.bin).forEach(function(key) {
    if (key === 'sb') {
      return;
    }
    var name = key.replace(/^sb-/, '').split('-').join(' ');

    it('should be able to call ' + key + ' through sb ' + name, function(done) {
      shelljs.exec(binPath + ' ' + name + ' --help', function(code, stdout, stderr) {
        var stdouts = stdout.trim().split('\n');

        assert.equal(code, 0, 'should return success');
        assert.ok((/^Usage:/).test(stdouts[0]), 'should print help');
        assert.equal(stderr.length, 0, 'no errors');
        done();
      });
    });
  });
})
