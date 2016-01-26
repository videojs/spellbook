/* eslint no-console:0 */
import sh from 'shelljs';

/**
 * Clean spell.
 *
 * @param {Function} tmp
 * @param {Object} argv
 */
const clean = (tmp) => {
  sh.rm('-rf', ['dist', 'dist-test', 'es5'].map(tmp));
  console.log('clean complete.');
};

clean.help = () => 'help me!';

export default clean;
