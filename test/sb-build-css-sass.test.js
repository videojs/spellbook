var assert = require('chai').assert;
var shelljs = require('shelljs');
var path = require('path');
var Helper = require('./test-helper.js');
var PathExists = require('../src/utils/paths-exist');

describe('sb-build-css-sass', function() {
  beforeEach(function() {
    this.helper = new Helper();
    this.config = this.helper.setup();
    this.bin = path.join(__dirname, '..', 'src', 'sb-build-css-sass') + ' ';
  });
  afterEach(function() {
    this.helper.cleanup();
  });

  it('should build default files with no args', function(done) {
    shelljs.exec(this.bin, function(code, stdout, stderr) {
      var stdouts = stdout.trim() ? stdout.trim().split('\n') : [];

      assert.equal(code, 0, 'should return success');
      assert.equal(stderr.length, 0, 'should stderr nothing');
      assert.equal(stdouts.length, 4, 'should stdout 4 lines, as it wrote 4 files');
      done();
    });
  });

  ['--dist', '-d'].forEach(function(option) {
    it('should build default files to a specific dist using ' + option, function(done) {
      var newdist = path.join(this.config.dist, 'newdist');
      shelljs.exec(this.bin + option + ' ' + newdist, function(code, stdout, stderr) {
        var stdouts = stdout.trim() ? stdout.trim().split('\n') : [];

        assert.equal(code, 0, 'should return success');
        assert.equal(stdouts.length, 4, 'should stdout 4 lines, as it wrote 4 files');
        assert.equal(stderr.length, 0, 'should stderr nothing');
        done();
      });
    });
  });

  it('should different src file to default dist if passed in', function(done) {
    var cssTwo = path.join(this.config.src, 'css-two');
    shelljs.mv(path.join(this.config.src, 'css'), cssTwo);
    shelljs.exec(this.bin + path.join(cssTwo, 'index.scss'), function(code, stdout, stderr) {
      var stdouts = stdout.trim() ? stdout.trim().split('\n') : [];

      assert.equal(code, 0, 'should return success');
      assert.equal(stdouts.length, 4, 'should stdout 4 lines, as it wrote 4 files');
      assert.equal(stderr.length, 0, 'should stderr nothing');
      done();
    });
  });
});
