var path = require('path');
var GetConfig = require('./get-config');
var pkg = require('../../package.json');
var getRootParent = require('./get-root-parent');
var os = require("os");

var LOG_LEVELS = {
  none: 0,
  fatal: 1,
  error: 2,
  warn:  3,
  info:  4,
  debug: 5,
};

// case insensitive log level number getter
var levelNumber = function(level) {
  if (typeof level === 'number') {
    return level;
  }

  for(var l in LOG_LEVELS) {
    if ((new RegExp(l, 'i')).test(level)) {
      return LOG_LEVELS[l]
    }
  }
  return 0;
}

var rightPad = function(str, len, char) {
  char = char || ' ';
  if (str.len == len) {
    return str;
  }
  while(str.length < len) {
    str += char;
  }
  return str;
};

/**
 * get the biggest lenght so we know how much to
 * pad the getParent prefix
 */
var biggestLen = 0;
Object.keys(pkg.bin).forEach(function(bin) {
  bin = bin.replace('sb-', '');
  if (bin.length > biggestLen) {
    biggestLen = bin.length;
  }
});
var getParent = function() {
  var parent = path.basename(getRootParent().filename)
    .replace('sb-', '');

  return '[' + rightPad(parent, biggestLen) + ']';
};

/**
 * get the current time
 */
var getTime = function() {
  var date = new Date();
  var hour = date.getHours();
  var min  = date.getMinutes();
  var sec  = date.getSeconds();
  var ms = date.getMilliseconds();

  hour = (hour < 10 ? "0" : "") + hour;
  min = (min < 10 ? "0" : "") + min;
  sec = (sec < 10 ? "0" : "") + sec;
  ms = (ms < 10 ? "0" : "") + ms;
  ms = (ms < 100 ? "0" : "") + ms;

  return '[' + hour + ":" + min + ":" + sec + ':' + ms + ']';
};

var log = function(level, msgs) {
  var config = GetConfig();
  // skip if the currently set log level
  // is less than this log line
  if (levelNumber(config.logLevel) < levelNumber(level)) {
    return;
  }

  while(msgs.length) {
    var msg = msgs.shift();

    // skip blank lines
    if (!msg.trim()) {
      continue;
    }

    // split on new lines
    // treat them as new log messages
    var lines = msg.split(os.EOL);

    if (lines.length > 1) {
      lines.forEach(function(line) {
        msgs.unshift(line);
      });
      continue;
    }

    // keep long paths out of logs
    msg = msg.split(path.join(__dirname, '..', '..', 'node_modules', '.bin') + path.sep).join('');
    msg = msg.split(path.join(__dirname, '..', '..', 'config') + path.sep).join('')
    msg = msg.split(path.join(__dirname, '..') + path.sep).join('');
    msg = msg.split(__dirname + path.sep).join('');
    msg = msg.split(config.path + path.sep).join('');

    console.log(getParent() + '[' + rightPad(level, 5) + ']: ' + msg);
  }
};

var logObj = {};
Object.keys(LOG_LEVELS).forEach(function(level) {
  logObj[level] = function() {
    var msgs = Array.prototype.slice.call(arguments) || [];
    log(level, msgs);
  };
});

module.exports = logObj;
