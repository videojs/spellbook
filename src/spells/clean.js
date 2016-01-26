/* eslint no-console:0 */
import fs from 'fs-extra';

/**
 * Clean spell.
 *
 * @param {Function} tmp
 * @param {Object} argv
 */
const clean = (tmp) => {
  ['dist', 'dist-test', 'es5'].map(tmp).forEach(fs.removeSync);
  console.log('clean complete.');
};

clean.help = () => 'help me!';

export default clean;
