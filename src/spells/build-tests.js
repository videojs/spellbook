/* eslint no-console:0 */
import browserify from 'browserify';
import fs from 'fs-extra';
import glob from 'glob';
import descope from '../lib/descope';

/**
 * Build test spell.
 *
 * @param  {Object} pkg
 */
const buildTests = (pkg) => {
  const name = descope(pkg.name);

  fs.ensureDirSync('dist-test');

  browserify(glob.sync('test/**/*.test.js'))
    .transform('babelify')
    .transform('browserify-shim')
    .bundle()
    .pipe(fs.createWriteStream(`dist-test/${name}.js`))
    .on('finish', () => console.log('build-tests complete.'))
    .on('error', err => {
      throw err;
    });
};

/**
 * Gets help text for the spell.
 *
 * @return {String}
 */
buildTests.help = () => 'help me!';

export default buildTests;
