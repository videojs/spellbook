var config = require('../src/utils/get-config')();
var path = require('path');

var shim = {
  "qunitjs": { exports: "global:QUnit" },
  "qunit": { exports: "global:QUnit" },
  "sinon": { exports: "global:sinon" },
  "video.js": {exports: "global:videojs"},
  "videojs": {exports: "global:videojs"}
};

if (!config.shimVideojs) {
  delete shim.videojs;
  delete shim['video.js'];
}

// copy over custom shims
if (config.shim) {
  Object.keys(config.shim).forEach(function(k) {
    if (typeof config.shim === 'string') {
      shim[k] = {exports: config.shim[k]};
    } else {
      shim[k] = config.shim[k];
    }
  });
}

module.exports = shim;
