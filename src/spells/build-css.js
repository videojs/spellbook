import descope from '../lib/descope';
import css from '../lib/builders/css';

/**
 * Build CSS spell.
 *
 * @param {Function} dirfn
 * @param {Object} argv
 */
const spell = (dirfn) => {
  const pkg = require(dirfn('package.json'));

  return css(dirfn, descope(pkg.name));
};

/**
 * Gets help text for the spell.
 *
 * @return {String}
 */
spell.help = () => 'help me!';

export default spell;
