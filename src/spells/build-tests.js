import browserify from 'browserify';
import fs from 'fs-extra';
import glob from 'glob';
import descope from '../lib/descope';

/**
 * Build test spell.
 *
 * @param {Function} dir
 * @param {Object} argv
 */
const buildTests = (dir) => {
  const pkg = require(dir('package.json'));
  const name = descope(pkg.name);

  return new Promise((resolve, reject) => {
    fs.ensureDirSync(dir('dist-test'));

    browserify(glob.sync(dir('test/**/*.test.js')))
      .transform('babelify')
      .transform('browserify-shim')
      .bundle()
      .pipe(fs.createWriteStream(dir(`dist-test/${name}.js`)))
      .on('finish', resolve)
      .on('error', reject);
  });
};

/**
 * Gets help text for the spell.
 *
 * @return {String}
 */
buildTests.help = () => 'help me!';

export default buildTests;
