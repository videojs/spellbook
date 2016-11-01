var Promise = require('bluebird');
var log = require('./log');
var npmRun = require('npm-run');
var path = require('path');
var baseDir = path.join(__dirname, '..', '..');
var GetPath = require('./get-path');
var PathsExist = require('./paths-exist');

var one = function(command, options) {
  options = options || {};
  if (options.write) {
    options.write = Array.isArray(options.write) ? options.write : [options.write];
  }
  var args = Array.isArray(command) ? command : [command];
  var spawnOptions = {};

  args = args.map(function(c) {
    return GetPath(c);
  });

  command = args.shift();

  return new Promise(function(resolve, reject) {
    var stdout = '';
    var stderr = '';
    var child = npmRun.spawn(command, args, spawnOptions).on('close', function(exitCode) {
      var retval = {command: command, args: args, status: exitCode, stdout: stdout, stderr: stderr};
      log.debug(retval);
      if (options.write) {
        options.write.forEach(function(p) {
          if (!PathsExist(p)) {
            log.fatal('File ' + p + ' was not written to the filesystem!');
            retval.status = 1;
          }
        });
      }

      if (!options.nonFatal && exitCode !== 0) {
        reject(retval);
      }
      resolve(retval);
    });
    child.stdout.on('data', function(d) {
      var str = d.toString();

      if (options.toLog) {
        log.info(str);
      }

      stdout += str;
    });

    child.stderr.on('data', function(d) {
      var str = d.toString();

      if (options.toLog) {
        log.error(str);
      }
      stderr += str;
    });

    if (!options.toLog && !options.silent) {
      child.stdout.on('data', process.stdout.write.bind(process.stdout));
      child.stderr.on('data', process.stderr.write.bind(process.stderr));
    }

  }).catch(function(retval) {
    log.fatal('command: ' + retval.command + ', failed with exit code: ' + retval.status);
    if (!options.toLog && !options.silent) {
      log.fatal('stdout:', retval.stdout, 'stderr:', retval.stderr);
    }
    process.exit(retval.status);
  });
};

var all = function(commands, options) {
  options = options || {};
  commands = Array.isArray(commands) ? commands : [commands];

  var promises = commands.map(function(command) {
    return one(command, {nonFatal: options.failAfter || options.nonFatal || false});
  });

  return Promise.all(promises).then(function(retvals) {
    retvals.forEach(function(retval) {
      if (retval.status !== 0) {
        log.fatal('some commands failed!');
        process.exit(retval.status);
      }
    });
  });
};

module.exports = {
  one: one,
  all: all,
};
