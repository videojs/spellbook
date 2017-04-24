var glob = require('glob');
var path = require('path');
var PathsExists = require('./paths-exist');

var GetFiles = function() {
  var searches = Array.prototype.slice.call(arguments);
  var files = [];

  searches.forEach(function(search) {
    var fn = function() {
      if (PathsExists(search)) {
        return [search];
      }

      return glob.sync(search, {ignore: ['**/node_modules/**']});
    };
    if (Array.isArray(search)) {
      fn = function() {
        return GetFiles.apply(null, search);
      };
    } else if (typeof search === 'undefined') {
      return [];
    }
    var newFiles = fn();
    var i = newFiles.length;

    while (i--) {
      if (files.indexOf(newFiles[i]) === -1) {
        files.push(newFiles[i]);
      }
    }
  });

  return files;
};

module.exports = GetFiles;
