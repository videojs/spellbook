var fs = require('fs');
var path = require('path');
var PathExists = require('./path-exists');
var findRoot = require('find-root');

var readJSON = function(file) {
  return JSON.parse(fs.readFileSync(file, 'utf8'));
};

var GetConfig = function (dir) {
  dir = dir || process.cwd();
  if (!path.isAbsolute(dir)) {
    dir = path.join(process.cwd(), dir);
  }

  var appRoot = findRoot(dir);

  var workingPkg = readJSON(path.join(appRoot, 'package.json'));
  var sbPkg = readJSON(path.join(__dirname, '..', '..', 'package.json'));
  var banner = ""
    + "/**\n"
    + " * @version "  + workingPkg.version + "\n"
    + " * @copyright " + workingPkg.author + "\n"
    + " * @license " + workingPkg.license + "\n"
    + " */\n";

  workingPkg.spellbook = workingPkg.spellbook || {};

  var config = {
    name: workingPkg.name,
    version: workingPkg.version,
    path: appRoot,
    sbVersion: sbPkg.version,
    main: path.join(appRoot, workingPkg.main),
    jsNextMain: workingPkg['jsnext:main'] ? path.join(appRoot, workingPkg['jsnext:main']) : '',

    verbose: workingPkg.spellbook.verbose || process.env.SB_VERBOSE || false,
    port: workingPkg.spellbook.port || 9999,
    src: workingPkg.spellbook.src || 'src',
    dist: workingPkg.spellbook.dist || 'dist',
    cache: workingPkg.spellbook.cache || '.sb-cache',
    banner: banner,
  };

  // tack on the fullpath
  config.src = path.join(config.path, config.src);
  config.dist = path.join(config.path, config.dist);
  config.cache = path.join(config.path, config.cache);
  return config;
};

module.exports = GetConfig;
