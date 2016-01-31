import 'babel-polyfill';
import browserify from 'browserify';
import fs from 'fs-extra';
import glob from 'glob';
import path from 'path';
import uglifyjs from 'uglify-js';
import bannerize from '../bannerize';

const babel = require('babel');

// Paths relative to a plugin's root directory.
const PATH_DEST = 'dist';
const PATH_ES5 = 'es5';
const PATH_ENTRY = `${PATH_ES5}/plugin.js`;
const PATH_SRC = 'src';
const PATH_SOURCES = `${PATH_SRC}/**/*.js`;
const PATH_OUT = 'dist/%s.js';
const PATH_OUT_MIN = 'dist/%s.min.js';

/**
 * Transpile an array of ES6 source files with Babel.
 *
 * This occurs separately from the Browserify step because we want to keep
 * both the final bundle and the transpiled source files.
 *
 * @param  {Object} meta
 */
const transpile = (meta) => {
  glob.sync(meta.path(PATH_SOURCES))
    .forEach(filename => {
      let outname = filename.replace(meta.path(PATH_SRC), meta.path(PATH_ES5));

      fs.ensureDirSync(path.dirname(outname));
      fs.writeFileSync(outname, babel.transformFileSync(filename).code);
    });
};

/**
 * Creates a Browserify bundle from the transpiled plugin entry point and
 * returns a Promise reflecting the resolution of the Browserify operation.
 *
 * @param  {Object} meta
 * @return {Promise}
 */
const bundle = (meta) => {
  return new Promise((resolve, reject) => {
    fs.ensureDirSync(meta.path(PATH_DEST));
    transpile(meta);

    browserify(meta.path(PATH_ENTRY), {standalone: meta.name})
      .transform('browserify-shim')
      .bundle()
      .pipe(fs.createWriteStream(meta.path(PATH_OUT)))
      .on('finish', () => {
        let minified = uglifyjs.minify(meta.path(PATH_OUT));

        fs.writeFileSync(meta.path(PATH_OUT_MIN), minified.code);
        bannerize([meta.path(PATH_OUT), meta.path(PATH_OUT_MIN)]);
        resolve();
      })
      .on('error', reject);
  });
};

/**
 * Builds the plugin.
 *
 * @param  {Function} dirfn
 *         A function that creates paths relative to the project root.
 * @param  {String} name
 *         The plugin name (without a scope).
 * @return {Promise}
 */
const plugin = (dirfn, name) => {

  // Create a `meta` object that can be passed around to configure the build.
  const meta = {
    name,
    path: (which) => dirfn(which).replace(/%s/g, name)
  };

  return bundle(meta);
};

export default plugin;
