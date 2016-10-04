var config = require('./get-config')();
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
  log.info('start');
  var program = commander
    .version(config.sbVersion)
    .option('-l, --log-level [level]', 'set the log to a specific level', /debug|fatal|error|info|warn/);

  program = fn(program);

  if (!program) {
    console.error('Command ' + path.basename(GetRootParent()) + ' is not returing commander to commander-wrapper!');
    process.exit(1);
  }

  // always finish the log
  var exit = function(code) {
    var elapsed = (Date.now() - startTime);
    log.info('finished in ' + elapsed + 'ms');
  };

  var sigexit = function() {
    process.exit(0);
  };

  process.on('SIGINT', sigexit);
  process.on('SIGQUIT', sigexit);
  process.on('exit', exit);

  program.parse(process.argv);

  if (program.logLevel) {
    process.NODE_ENV.SB_LOG_LEVEL = program.logLevel;
  }

  return program;
};

module.exports = CommanderWrapper;

