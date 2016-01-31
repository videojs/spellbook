import 'babel-polyfill';
import fs from 'fs-extra';

/**
 * Clean spell.
 *
 * @param {Function} dir
 * @param {Object} argv
 */
const spell = (dir) => {
  ['dist', 'test/dist', 'es5'].map(n => dir(n)).forEach(fs.removeSync);
  return new Promise((resolve, reject) => resolve());
};

spell.help = () => 'help me!';

export default spell;
