/* eslint no-console:0 */
import fs from 'fs-extra';
import languages from 'videojs-languages';

/**
 * Build languages spell.
 *
 * @param {Function} tmp
 * @param {Object} argv
 */
const buildLangs = (tmp) => {
  const dist = tmp('dist/lang');

  fs.ensureDirSync(dist);
  languages(tmp('lang/*.json'), dist);
  console.log('build-lang complete.');
};

/**
 * Gets help text for the spell.
 *
 * @return {String}
 */
buildLangs.help = () => 'help me!';

export default buildLangs;
