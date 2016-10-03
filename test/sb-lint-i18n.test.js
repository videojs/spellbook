var assert = require('chai').assert;
var shelljs = require('shelljs');
var path = require('path');
var Helper = require('./test-helper.js');
var PathExists = require('../src/utils/path-exists');

describe('sb-lint-i18n', function() {
  beforeEach(function() {
    this.helper = new Helper();
    this.config = this.helper.setup();
    this.bin = path.join(__dirname, '..', 'src', 'sb-lint-i18n') + ' ';
  });
  afterEach(function() {
    this.helper.cleanup();
  });

  // TODO: --fix, --errors
  it('should lint default files with no args', function(done) {
    shelljs.exec(this.bin, function(code, stdout, stderr) {
      var stdouts = stdout.trim() ? stdout.trim().split('\n') : [];

      assert.equal(code, 0, 'should return success');
      assert.equal(stderr.length, 0, 'should stderr nothing');
      assert.equal(stdouts.length, 6, 'should stdout 6 lines for errors/warns');
      done();
    });
  });

  it('should lint custom files', function(done) {
    var newsrc = path.join(this.config.src, 'newsrc');
    shelljs.mv(path.join(this.config.src, 'i18n'), newsrc)
    shelljs.exec(this.bin + newsrc, function(code, stdout, stderr) {
      var stdouts = stdout.trim() ? stdout.trim().split('\n') : [];

      assert.equal(code, 0, 'should return success');
      assert.equal(stderr.length, 0, 'should stderr nothing');
      assert.equal(stdouts.length, 6, 'should stdout 5 lines for errors/warns');
      done();
    });
  });

});
