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
    if (typeof c === 'number') {
      c = c.toString();
    }
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

      if (!options.nonFatal && !options.failAfter && exitCode !== 0) {
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

    // kill this child if the parent exits
    process.on('exit', function() {
      if (child) {
        child.kill();
      }
    });
    child.on('close', function() {
      child = null;
    });
    if (!options.toLog && !options.silent) {
      child.stdout.on('data', process.stdout.write.bind(process.stdout));
      child.stderr.on('data', process.stderr.write.bind(process.stderr));
    }

  }).catch(function(retval) {
    log.fatal('command: ' + retval.command + ', failed with exit code: ' + retval.status);
    // don't log the error if the command is an internal one
    // we will do that on our own
    if (!options.toLog && !options.silent && !(/^sb-/).test(path.basename(retval.command))) {
      log.fatal('stdout:', retval.stdout, 'stderr:', retval.stderr);
    }
    process.exit(retval.status);
  });
};

var runAll = function(mapCommand, commands, options) {
  options = options || {};
  commands = Array.isArray(commands) ? commands : [commands];

  return Promise[mapCommand](commands, function(command) {
    return one(command, options);
  }).then(function(retvals) {
    retvals.forEach(function(retval) {
      if (options.nonFatal || retval.status === 0) {
        return
      }

      log.fatal('some commands failed!');
      process.exit(retval.status);
    });
  });
};

// run concurrently
var parallel = function(commands, options) {
  return runAll('map', commands, options);
};

// run in order
var series = function(commands, options) {
  return runAll('mapSeries', commands, options);
};

module.exports = {
  one: one,
  parallel: parallel,
  series: series
};
