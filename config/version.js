var semver = require('semver');
var config = require('../src/config');
var spawn = require('../src/spawn');
var path = require('path');

if (!semver.prerelease(config.version)) {
  var CHANGELOG_PATH = path.join(config.root, 'CHANGELOG.md');

  spawn('conventional-changelog -p videojs -i ' + CHANGELOG_PATH + ' -s').then(function() {
    return spawn('git add ' + CHANGELOG_PATH);
  }).then(function() {
    // done
  });
}
