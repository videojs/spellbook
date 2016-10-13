var assert = require('chai').assert;
var shelljs = require('shelljs');
var TestHelper = require('./test-helper.js');
var path = require('path');
var pkg = require(path.join(TestHelper.rootDir, 'package.json'));
var parallel = require('mocha.parallel');
var binFile = path.join('node_modules', '.bin', 'sb') + ' ';

shelljs.cd(TestHelper.fixtureDir);
parallel('sb', function() {
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
      shelljs.exec(binFile + name + ' --help', function(code, stdout, stderr) {

        assert.equal(code, 0, 'should return success');
        assert.ok((new RegExp('Usage: ' + key)).test(stdout), 'should print help');
        assert.equal(stderr.length, 0, 'no errors');
        done();
      });
    });
  });
});
