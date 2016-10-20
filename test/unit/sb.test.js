var assert = require('chai').assert;
var shelljs = require('shelljs');
var TestHelper = require('./test-helper.js');
var path = require('path');
var pkg = require('../../package.json');
var parallel = require('mocha.parallel');

parallel('sb', function() {
  Object.keys(pkg.bin).forEach(function(binName) {
    if (binName === 'sb') {
      return;
    }
    var nameArgs = binName.replace(/^sb-/, '').split('-');

    it('should be able to call ' + binName + ' through sb ' + nameArgs.join(' '), function(done) {
      var helper = new TestHelper();

      helper.exec('sb', nameArgs.concat(['--help']), function(code, stdout, stderr) {

        assert.equal(code, 0, 'should return success');
        assert.ok((new RegExp('Usage: ' + binName)).test(stdout.join('\n')), 'should print help');
        assert.equal(stderr.length, 0, 'no errors');
        helper.cleanup(done);
      });
    });
  });
});
