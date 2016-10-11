var config = require('../src/utils/get-config')();

var shim = {
  "qunitjs": { exports: "global:QUnit" },
  "sinon": { exports: "global:sinon" },
  "videojs": {exports: "global:videojs"};
};

if (!config.shimVideojs) {
  delete shim.videojs;
}

module.exports = shim;
