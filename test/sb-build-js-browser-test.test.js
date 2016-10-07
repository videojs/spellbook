var assert = require('chai').assert;
var shelljs = require('shelljs');
var path = require('path');
var Helper = require('./test-helper.js');
var PathExists = require('../src/utils/paths-exist');

describe('sb-build-js-browser-test', function() {
  beforeEach(function() {
    this.helper = new Helper();
    this.config = this.helper.setup();
    this.bin = path.join(__dirname, '..', 'src', 'sb-build-js-browser-test') + ' ';
  });
  afterEach(function() {
    this.helper.cleanup();
  });

  it('should build default files with no args', function(done) {
    var config = this.config;

    shelljs.exec(this.bin, function(code, stdout, stderr) {
      var stdouts = stdout.trim() ? stdout.trim().split('\n') : [];

      assert.equal(code, 0, 'should return success');
      assert.equal(stderr.length, 0, 'should stderr nothing');
      assert.equal(stdouts.length, 2, 'should stdout 2 lines one for each file built');
      assert.ok((new RegExp(path.join(config.dist, 'test'))).test(stdouts[0]), 'should contain dist');
      done();
    });
  });

  ['--dist', '-d'].forEach(function(option) {
    it('should build default files to a specific dist using ' + option, function(done) {
      var config = this.config;
      var newdist = path.join(config.dist, 'newdist');

      shelljs.exec(this.bin + option + ' ' + newdist, function(code, stdout, stderr) {
        var stdouts = stdout.trim() ? stdout.trim().split('\n') : [];

        assert.equal(code, 0, 'should return success');
        assert.equal(stderr.length, 0, 'should stderr nothing');
        assert.equal(stdouts.length, 2, 'should stdout 2 lines one for each file built');
        assert.ok((new RegExp(newdist)).test(stdouts[0]), 'should contain newdist');
        done();
      });
    });
  });

  it('should different src file to default dist if passed in', function(done) {
    var config = this.config;
    var newsrc = path.join(config.src, 'newsrc.test.js');

    shelljs.mv(path.join(config.src, 'test', 'index.test.js'), newsrc);

    shelljs.exec(this.bin + newsrc, function(code, stdout, stderr) {
      var stdouts = stdout.trim() ? stdout.trim().split('\n') : [];

      assert.equal(code, 0, 'should return success');
      assert.equal(stderr.length, 0, 'should stderr nothing');
      assert.equal(stdouts.length, 2, 'should stdout 2 lines one for each file built');
      done();
    });
  });
});
