var assert = require('chai').assert;
var shelljs = require('shelljs');
var path = require('path');
var Helper = require('./test-helper.js');
var PathExists = require('../src/utils/path-exists');

describe('sb-lint-docs-md', function() {
  beforeEach(function() {
    this.helper = new Helper();
    this.config = this.helper.setup();
    this.bin = path.join(__dirname, '..', 'src', 'sb-lint-docs-md') + ' ';
  });
  afterEach(function() {
    this.helper.cleanup();
  });

  // TODO: --fix, --errors
  it('should lint default files with no args', function(done) {
    shelljs.exec(this.bin, function(code, stdout, stderr) {
      var stdouts = stdout.trim() ? stdout.trim().split('\n') : [];
      var stderrs = stderr.trim() ? stderr.trim().split('\n') : [];

      assert.equal(code, 0, 'should return success');
      assert.equal(stderrs.length, 5, 'should stderr 5 lines');
      assert.equal(stdouts.length, 0, 'should stdout nothing');
      done();
    });
  });

  it('should lint custom files with no args', function(done) {
    var newsrc = path.join(this.config.src, 'newsrc');
    shelljs.mv(path.join(this.config.src, 'docs'), newsrc)
    shelljs.exec(this.bin + newsrc, function(code, stdout, stderr) {
      var stdouts = stdout.trim() ? stdout.trim().split('\n') : [];
      var stderrs = stderr.trim() ? stderr.trim().split('\n') : [];

      assert.equal(code, 0, 'should return success');
      assert.equal(stderrs.length, 5, 'should stderr 5 lines');
      assert.equal(stdouts.length, 0, 'should stdout nothing');
      done();
    });
  });

});
