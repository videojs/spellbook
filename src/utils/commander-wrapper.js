var config = require('./get-config')();
var pkg = require('../../package.json');
var log = require('./log');
var commander = require('commander');
var GetRootParent = require('./get-root-parent');
var path = require('path');

/**
 * Wrapper around commander so that:
 * 1. we can share the --version option
 * 2. we can automatically log command start and finish text
 */
var CommanderWrapper = function(fn) {
  var startTime = Date.now();

  var program = commander
    .version(pkg.version)
    .option('-l, --log-level [level]', 'set the log to a specific level [' + log.LEVELS.join('|') + ']', new RegExp(log.LEVELS.join('|')))
    .option('-q, --quiet', 'dont print any output');

  program = fn(program);

  if (!program) {
    log.fatal('Command ' + path.basename(GetRootParent().filename) + ' is not returing commander to commander-wrapper!');
    process.exit(1);
  }

  // always finish the log
  var exit = function(code) {
    // don't print anything on help/version exits
    for(var i = 0; i < program.rawArgs.length; i++) {
      var arg = program.rawArgs[i];

      if ((/-h|--help|-V|--version/).test(arg)) {
        return;
      }
    }

    // don't print anything on quiet
    if (program.quiet) {
      return;
    }
    var elapsed = (Date.now() - startTime);

    log.info('finished in ' + elapsed + 'ms');
  };

  var sigexit = function() {
    process.exit(0);
  };

  process.on('SIGINT', sigexit);
  process.on('SIGQUIT', sigexit);
  process.on('exit', exit);

  // allow a ton of process listeners
  process.setMaxListeners(1000);

  program.parse(process.argv);

  if (program.logLevel) {
    process.env.SB_LOG_LEVEL = program.logLevel;
  } else if (program.quiet) {
    process.env.SB_LOG_LEVEL = 'none';
  }

  process.chdir(config.path);
  process.title = path.basename(GetRootParent().filename);
  log.info('start');

  return program;
};

module.exports = CommanderWrapper;

