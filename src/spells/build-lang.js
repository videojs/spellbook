/* eslint no-console:0 */
import fs from 'fs-extra';
import languages from 'videojs-languages';

/**
 * Build languages spell.
 *
 * @param  {Object} pkg
 */
const buildLangs = (pkg) => {
  fs.ensureDirSync('dist/lang');
  languages('lang/*.json', 'dist/lang');
  console.log('build-lang complete.');
};

/**
 * Gets help text for the spell.
 *
 * @return {String}
 */
buildLangs.help = () => 'help me!';

export default buildLangs;
