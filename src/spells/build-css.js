/* eslint no-console:0 */
import fs from 'fs-extra';
import sass from 'node-sass';
import bannerize from '../lib/bannerize';
import descope from '../lib/descope';

/**
 * Build CSS spell.
 *
 * @param  {Object} pkg
 */
const buildCSS = (pkg) => {
  const name = descope(pkg.name);
  const result = sass.renderSync({
    file: 'src/plugin.scss',
    outputStyle: 'compressed'
  });

  fs.ensureDirSync('dist');
  fs.writeFileSync(`dist/${name}.css`, result.css);
  bannerize(`dist/${name}.css`);
  console.log('build-css complete.');
};

/**
 * Gets help text for the spell.
 *
 * @return {String}
 */
buildCSS.help = () => 'help me!';

export default buildCSS;
