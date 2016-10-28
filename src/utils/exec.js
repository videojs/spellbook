var Promise = require('bluebird');
var shelljs = require('shelljs');
var GetPath = require('./get-path');
var log = require('./log');

module.exports = function(command, options) {
  options = options || {};
  var cmd = [command];

  if (Array.isArray(command)) {
    cmd = command;
  }

  for(var i = 0; i < cmd.length; i++) {
    cmd[i] = GetPath(cmd[i]);
  }

  cmd = cmd.join(' ');

  var logLine = 'executing `' + cmd + '`';

  if (Object.keys(options).length) {
    logLine += ' with options ' + JSON.stringify(options);
  }
  log.debug(logLine);

  var isError = function(code, stdout, stderr) {
    if (code === 0) {
      return;
    }
    log.error('command `' + cmd + '` failed with code ' + code + ' and outputs:');
    log.error('stderr:', stderr, 'stdout:', stdout);
    return false;
  };

  if (options.async) {
    return new Promise(function(resolve, reject) {
      shelljs.exec(cmd, options, function(code, stdout, stderr) {
        log.debug(cmd, 'result: ' + code);
        if (stdout) {
          log.debug(stdout);
        }
        if (stderr) {
          log.debug(stderr);
        }
        var p = {code: code, stdout: stdout, stderr: stderr};

        if (options.silent && isError(code, stdout, stderr)) {
          reject(p);
        }
        resolve(p);
      });
    });
  }
  var retval = shelljs.exec(cmd, options);

    log.debug(cmd, 'result: ' + retval.code);
    if (retval.stdout) {
      log.debug(retval.stdout);
    }
    if (retval.stderr) {
      log.debug(retval.stderr);
    }

  if (options.silent && isError(retval.code, retval.stdout, retval.stderr)) {
    process.exit(retval.code);
  }
  return retval;
};
