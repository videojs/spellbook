process.env.SB_LOG_LEVEL = 'none';
process.env.SB_INTERNAL = true;

var Promise = require('bluebird');
var mkdirp = require('mkdirp');
var rimraf = require('rimraf');
var glob = require('glob');
var version = require('../package.json').version;
var path = require('path');
var rootdir = path.join(__dirname, '..');
var srcdir = path.join(rootdir, 'docs');
var distdir = path.join(rootdir, 'dist', 'man');
var Run = require('../src/utils/run');
var fs = Promise.promisifyAll(require('fs'));

var command = [
  'remark',
  '--no-config',
  '--rc-path', 'remark-man.config.js',
];

rimraf.sync(distdir);
mkdirp.sync(distdir);

var files = glob.sync(path.join(srcdir, '**', '*.md'));
var promises = [];

// allow a ton of process listeners
process.setMaxListeners(1000);

// we have to build each file individually, as there is no directory style output
// aka src/docs/test/index.md would flatten to dist/docs/manual/index.html
// rather than dist/docs/manual/test/index.html
Promise.map(files, function(src) {
  var dist = src
    .replace(srcdir, distdir)
    .replace('.md', '.1');
  return fs.readFileAsync(src, 'utf8').then(function(content) {
    content = content.replace(/  /g, "\t");
    mkdirp.sync(path.dirname(dist));

    return fs.writeFileAsync(dist, content);
  }).then(function() {
    return Run.one(command.concat([dist, '--output', dist]), {silent: true, write: dist});
  }).then(function(retval) {
    var localdist = dist.replace(rootdir + path.sep, '');
    var localsrc = src.replace(rootdir + path.sep, '');

    console.log(localsrc + ' -> ' + localdist);
  });
}).then(function() {
  console.log('done');
});
