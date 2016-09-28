var assert = require('chai').assert;
var shelljs = require('shelljs');
var path = require('path');
var Helper = require('./test-helper.js');
var PathExists = require('../src/utils/path-exists');

describe('sb-clean', function() {
  beforeEach(function() {
    this.helper = new Helper();
    this.config = this.helper.setup();
    this.bin = path.join(__dirname, '..', 'src/sb-clean') + ' ';
  });
  afterEach(function() {
    this.helper.cleanup();
  });

  after(function() {
    this.helper.after();
  });

  describe('no arguments', function() {
    it('should delete nothing if there is nothing to clean', function(done) {
      shelljs.exec(this.bin, function(code, stdout, stderr) {
        var stdouts = stdout.trim() ? stdout.trim().split('\n') : [];

        assert.equal(code, 0, 'should return success');
        assert.equal(stdouts.length, 0, 'should stdout nothing');
        assert.equal(stderr.length, 0, 'should stderr nothing');
        done();
      });
    });

    it('should delete the dist folder if it exists', function(done) {
      var config = this.config;

      shelljs.mkdir('-p', config.dist);
      shelljs.exec(this.bin, function(code, stdout, stderr) {
        var stdouts = stdout.trim() ? stdout.trim().split('\n') : [];

        assert.equal(code, 0, 'should return success');
        assert.equal(stderr.length, 0, 'should stderr nothing');
        assert.equal(stdouts.length, 1, 'should only print one removal');
        assert.notEqual(stdouts.indexOf('removing ' + config.dist), -1, 'should stdout correct removal');
        assert.equal(PathExists(config.dist), false, 'dist should be deleted');
        done();
      });
    });

    it('should not delete cache, only dist', function(done) {
      var config = this.config;

      shelljs.mkdir('-p', config.dist, config.cache);
      shelljs.exec(this.bin, function(code, stdout, stderr) {
        var stdouts = stdout.trim() ? stdout.trim().split('\n') : [];

        assert.equal(code, 0, 'should return success');
        assert.equal(stderr.length, 0, 'should stderr nothing');
        assert.equal(stdouts.length, 1, 'should only print one removal');
        assert.notEqual(stdouts.indexOf('removing ' + config.dist), -1, 'should stdout correct removal');
        assert.equal(PathExists(config.dist), false, 'dist should be deleted');
        assert.equal(PathExists(config.cache), true, 'cache should still exist');
        done();
      });
    });
  });

  ['-c', '--cache'].forEach(function(option) {
    describe(option, function() {
      it('should delete the dist folder if it exists', function(done) {
        var config = this.config;

        shelljs.mkdir('-p', config.dist);
        shelljs.exec(this.bin + option, function(code, stdout, stderr) {
          var stdouts = stdout.trim() ? stdout.trim().split('\n') : [];

          assert.equal(code, 0, 'should return success');
          assert.equal(stderr.length, 0, 'should not print to stderr');

          assert.equal(stdouts.length, 1, 'should only print one removal');
          assert.notEqual(stdouts.indexOf('removing ' + config.dist), -1, 'should stdout correct removal');
          assert.equal(PathExists(config.dist), false, 'dist should be deleted');
          done();
        });
      });

      it('should delete cache and dist', function(done) {
        var config = this.config;

        shelljs.mkdir('-p', config.dist, config.cache);
        shelljs.exec(this.bin + option, function(code, stdout, stderr) {
          var stdouts = stdout.trim() ? stdout.trim().split('\n') : [];

          assert.equal(code, 0, 'should return success');
          assert.equal(stderr.length, 0, 'should not print to stderr');

          assert.equal(stdouts.length, 2, 'should print two removals');
          assert.notEqual(stdouts.indexOf('removing ' + config.dist), -1, 'should stdout dist removal');
          assert.notEqual(stdouts.indexOf('removing ' + config.cache), -1, 'should stdout cache removal');
          assert.equal(PathExists(config.dist), false, 'dist should be deleted');
          assert.equal(PathExists(config.cache), false, 'cache should be deleted');
          done();
        });
      });

      it('should delete just cache', function(done) {
        var config = this.config;

        shelljs.mkdir('-p', config.cache);
        shelljs.exec(this.bin + option, function(code, stdout, stderr) {
          var stdouts = stdout.trim() ? stdout.trim().split('\n') : [];

          assert.equal(code, 0, 'should return success');
          assert.equal(stderr.length, 0, 'should not print to stderr');

          assert.equal(stdouts.length, 1, 'should only print one removal');
          assert.notEqual(stdouts.indexOf('removing ' + config.cache), -1, 'should stdout cache removal');
          assert.equal(PathExists(config.cache), false, 'cache should be deleted');
          done();
        });
      });
    });
  });

  ['-d', '--dry-run'].forEach(function(option) {
    describe(option, function() {
      it('should not delete the dist folder if it exists', function(done) {
        var config = this.config;

        shelljs.mkdir('-p', config.dist);
        shelljs.exec(this.bin + option, function(code, stdout, stderr) {
          var stdouts = stdout.trim() ? stdout.trim().split('\n') : [];

          assert.equal(code, 0, 'should return success');
          assert.equal(stderr.length, 0, 'should not print to stderr');

          assert.equal(stdouts.length, 1, 'should only print one removal');
          assert.notEqual(stdouts.indexOf('removing ' + config.dist), -1, 'should stdout removal');
          assert.equal(PathExists(config.dist), true, 'dist should exist');
          done();
        });
      });

      it('should not delete cache or dist folder', function(done) {
        var config = this.config;

        shelljs.mkdir('-p', config.dist, config.cache);
        shelljs.exec(this.bin + option, function(code, stdout, stderr) {
          var stdouts = stdout.trim() ? stdout.trim().split('\n') : [];

          assert.equal(code, 0, 'should return success');
          assert.equal(stderr.length, 0, 'should not print to stderr');

          assert.equal(stdouts.length, 1, 'should only print one removal');
          assert.notEqual(stdouts.indexOf('removing ' + config.dist), -1, 'should stdout removal');
          assert.equal(PathExists(config.dist), true, 'dist should exist');
          assert.equal(PathExists(config.cache), true, 'cache should exist');
          done();
        });
      });

      it('should not delete cache or dist folder with --cache', function(done) {
        var config = this.config;

        shelljs.mkdir('-p', config.dist, config.cache);
        shelljs.exec(this.bin + '--cache ' + option, function(code, stdout, stderr) {
          var stdouts = stdout.trim() ? stdout.trim().split('\n') : [];

          assert.equal(code, 0, 'should return success');
          assert.equal(stderr.length, 0, 'should not print to stderr');

          assert.equal(stdouts.length, 2, 'should print all removals');
          assert.notEqual(stdouts.indexOf('removing ' + config.dist), -1, 'should stdout removal');
          assert.notEqual(stdouts.indexOf('removing ' + config.cache), -1, 'should stdout removal');
          assert.equal(PathExists(config.dist), true, 'dist should exist');
          assert.equal(PathExists(config.cache), true, 'cache should exist');
          done();
        });
      });
    });
  });

  ['-q', '--quiet'].forEach(function(option) {
    describe(option, function() {
      it('should not print anything when removing', function(done) {
        var config = this.config;

        shelljs.mkdir('-p', config.dist, config.cache);
        shelljs.exec(this.bin + '--cache ' + option, function(code, stdout, stderr) {
          var stdouts = stdout.trim() ? stdout.trim().split('\n') : [];

          assert.equal(code, 0, 'should return success');
          assert.equal(stderr.length, 0, 'should not print to stderr');

          assert.equal(stdouts.length, 0, 'should print nothing');
          assert.equal(PathExists(config.dist), false, 'dist should be removed');
          assert.equal(PathExists(config.cache), false, 'cache should be removed');
          done();
        });
      });
    });
  });

});
