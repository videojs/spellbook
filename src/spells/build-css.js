/* eslint no-console:0 */
import fs from 'fs-extra';
import sass from 'node-sass';
import bannerize from '../lib/bannerize';
import descope from '../lib/descope';

/**
 * Build CSS spell.
 *
 * @param {Function} tmp
 * @param {Object} argv
 */
const buildCSS = (tmp) => {
  const pkg = require(tmp('package.json'));
  const name = descope(pkg.name);
  const result = sass.renderSync({
    file: tmp('src/plugin.scss'),
    outputStyle: 'compressed'
  });

  fs.ensureDirSync(tmp('dist'));
  fs.writeFileSync(tmp(`dist/${name}.css`), result.css);
  bannerize(tmp(`dist/${name}.css`));
  console.log('build-css complete.');
};

/**
 * Gets help text for the spell.
 *
 * @return {String}
 */
buildCSS.help = () => 'help me!';

export default buildCSS;
