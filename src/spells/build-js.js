import descope from '../lib/descope';
import plugin from '../lib/builders/plugin';

/**
 * Build JS spell.
 *
 * @param {Function} dirfn
 * @param {Object} argv
 */
const spell = (dirfn) => {
  const pkg = require(dirfn('package.json'));

  return plugin(dirfn, descope(pkg.name));
};

/**
 * Gets help text for the spell.
 *
 * @return {String}
 */
spell.help = () => 'help me!';

export default spell;
