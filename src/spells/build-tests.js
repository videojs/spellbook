import 'babel-polyfill';
import browserify from 'browserify';
import fs from 'fs-extra';
import glob from 'glob';

/**
 * Build test spell.
 *
 * @param {Function} dir
 * @param {Object} argv
 */
const spell = (dir) => {
  return new Promise((resolve, reject) => {
    fs.ensureDirSync(dir('test/dist'));

    browserify(glob.sync(dir('test/**/*.test.js')))
      .transform('babelify')
      .transform('browserify-shim')
      .bundle()
      .pipe(fs.createWriteStream(dir(`test/dist/bundle.js`)))
      .on('finish', resolve)
      .on('error', reject);
  });
};

/**
 * Gets help text for the spell.
 *
 * @return {String}
 */
spell.help = () => 'help me!';

export default spell;
