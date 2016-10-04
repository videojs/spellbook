var chokidar = require('chokidar');
var log = require('./log');

var Watch = function(glob, fn) {
  var func = function() {
    log.info('rebuilding...');
    fn();
  };
  chokidar.watch(glob)
    .on('add', func)
    .on('addDir', func)
    .on('change', func)
    .on('unlink', func)
    .on('unlinkDir', func);
  log.info('watching ' + glob);
};

module.exports = Watch;
