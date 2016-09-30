var assert = require('chai').assert;
var shelljs = require('shelljs');
var path = require('path');
var Helper = require('./test-helper.js');
var PathExists = require('../src/utils/path-exists');

describe('sb-build-js-browser-main', function() {
  beforeEach(function() {
    this.helper = new Helper();
    this.config = this.helper.setup();
    this.bin = path.join(__dirname, '..', 'src', 'sb-build-js-browser-main') + ' ';
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
      assert.equal(stdouts.length, 1, 'should stdout 1 line for the directory that was built');
      assert.ok((new RegExp(path.join(config.dist, 'docs', 'api'))).test(stdouts[0]), 'should contain dist');
      assert.ok((new RegExp(path.join(config.src, 'js'))).test(stdouts[0]), 'should contain js src');

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
        assert.equal(stdouts.length, 1, 'should stdout 1 line for the directory that was built');
        assert.ok((new RegExp(newdist)).test(stdouts[0]), 'should contain newdist');
        assert.ok((new RegExp(path.join(config.src, 'js'))).test(stdouts[0]), 'should contain js src');

        done();
      });
    });
  });

  it('should different src file to default dist if passed in', function(done) {
    var config = this.config;
    var newsrc = path.join(config.src, 'newsrc');

    shelljs.mv(path.join(config.src, 'js'), newsrc);

    shelljs.exec(this.bin + newsrc, function(code, stdout, stderr) {
      var stdouts = stdout.trim() ? stdout.trim().split('\n') : [];

      assert.equal(code, 0, 'should return success');
      assert.equal(stderr.length, 0, 'should stderr nothing');
      assert.equal(stdouts.length, 1, 'should stdout 1 line for the directory that was built');
      assert.ok((new RegExp(path.join(config.dist, 'docs', 'api'))).test(stdouts[0]), 'should contain dist');
      assert.ok((new RegExp(newsrc)).test(stdouts[0]), 'should contain new js src');

      done();
    });
  });
});
