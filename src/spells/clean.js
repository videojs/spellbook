import fs from 'fs-extra';

/**
 * Clean spell.
 *
 * @param {Function} dir
 * @param {Object} argv
 */
const clean = (dir) => {
  ['dist', 'dist-test', 'es5'].map(dir).forEach(fs.removeSync);
  return new Promise((resolve, reject) => resolve());
};

clean.help = () => 'help me!';

export default clean;
