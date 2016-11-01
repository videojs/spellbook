var chokidar = require('chokidar');
var log = require('./log');

var Watch = function(glob, fn) {
  chokidar.watch(glob, {ignored: '*.tmp', ignoreInitial: true})
    .on('add', fn)
    .on('addDir', fn)
    .on('change', fn)
    .on('unlink', fn)
    .on('unlinkDir', fn);
  log.info('watching ' + glob);
  fn();
};

module.exports = Watch;
