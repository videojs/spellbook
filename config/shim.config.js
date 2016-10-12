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

module.exports = shim;
