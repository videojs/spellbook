import 'babel-polyfill';
import babelify from 'babelify';
import browserify from 'browserify';
import shim from 'browserify-shim';
import versionify from 'browserify-versionify';
import fs from 'fs-extra';
import glob from 'glob';

// Paths relative to a plugin's root directory.
const PATH_DEST = 'test/dist';
const PATH_SRC = 'test/**/*.test.js';
const PATH_BUNDLE = 'test/dist/bundle.js';

/**
 * Builds the tests.
 *
 * @param  {Function} dirfn
 *         A function that creates paths relative to the project root.
 * @return {Promise}
 */
const tests = (dirfn) => {
  return new Promise((resolve, reject) => {
    fs.ensureDirSync(dirfn(PATH_DEST));

    browserify(glob.sync(dirfn(PATH_SRC)))
      .transform(babelify)
      .transform(shim)
      .transform(versionify)
      .bundle()
      .pipe(fs.createWriteStream(dirfn(PATH_BUNDLE)))
      .on('finish', resolve)
      .on('error', reject);
  });
};

export default tests;
