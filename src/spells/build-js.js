/* eslint no-console:0 */
import 'babel-polyfill';
import browserify from 'browserify';
import fs from 'fs-extra';
import glob from 'glob';
import path from 'path';
import uglifyjs from 'uglify-js';
import bannerize from '../lib/bannerize';
import descope from '../lib/descope';

const babel = require('babel');

/**
 * Transpile an array of files.
 *
 * @param {Function} tmp
 * @param {String[]} files
 */
const transpile = (tmp, files) => {
  files.forEach(filename => {
    filename = path.resolve(tmp(), filename);

    let result = babel.transformFileSync(filename);
    let outname = filename.replace(tmp('src'), tmp('es5'));

    fs.ensureDirSync(path.dirname(outname));
    fs.writeFileSync(outname, result.code);
  });
};

/**
 * Creates a Browserify bundle from the plugin entry point.
 *
 * @param  {Function} tmp
 * @param  {String} name
 * @return {Promise}
 */
const bundle = (tmp, name) => {
  return new Promise((resolve, reject) => {
    browserify(tmp('es5/plugin.js'), {standalone: name})
      .transform('browserify-shim')
      .bundle()
      .pipe(fs.createWriteStream(tmp(`dist/${name}.js`)))
      .on('finish', resolve)
      .on('error', reject);
  });
};

/**
 * Build JS spell.
 *
 * @param {Function} tmp
 * @param {Object} argv
 */
const buildJS = (tmp) => {
  const pkg = require(tmp('package.json'));
  const name = descope(pkg.name);

  transpile(tmp, glob.sync(tmp('src/**/*.js')));
  fs.ensureDirSync(tmp('dist'));

  bundle(tmp, name)
    .then(() => {
      let minified = uglifyjs.minify(tmp(`dist/${name}.js`));

      fs.writeFileSync(tmp(`dist/${name}.min.js`), minified.code);
      bannerize(tmp('dist/*.js'));
      console.log('build-js complete.');
    })
    .catch(err => {
      throw err;
    });
};

/**
 * Gets help text for the spell.
 *
 * @return {String}
 */
buildJS.help = () => 'help me!';

export default buildJS;
