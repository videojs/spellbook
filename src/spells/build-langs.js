import 'babel-polyfill';
import fs from 'fs-extra';
import languages from 'videojs-languages';

/**
 * Build languages spell.
 *
 * @param {Function} dir
 * @param {Object} argv
 */
const spell = (dir) => {
  const dist = dir('dist/lang');

  fs.ensureDirSync(dist);
  languages(dir('lang/*.json'), dist);
  return new Promise((resolve, reject) => resolve());
};

/**
 * Gets help text for the spell.
 *
 * @return {String}
 */
spell.help = () => 'help me!';

export default spell;
