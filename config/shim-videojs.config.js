var mainShim = require('./shim.config.js');

mainShim.videojs = {exports: "global:videojs"};

module.exports = mainShim;
