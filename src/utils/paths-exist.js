var fs = require('fs');

var PathsExist = function() {
  var paths = Array.prototype.slice.call(arguments) || [];
  var returnValue = false;

  paths.forEach(function(p) {
    if (!p) {
      return;
    }

    if (Array.isArray(p)) {
      returnValue = PathsExist.apply(null, p);
      return;
    }
    try {
      fs.statSync(p);
      returnValue = true;
    } catch (x) {}
  });

  return returnValue;
};

module.exports = PathsExist
