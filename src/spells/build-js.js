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
 * @param {Function} dir
 * @param {String[]} files
 */
const transpile = (dir, files) => {
  files.forEach(filename => {
    filename = path.resolve(dir(), filename);

    let result = babel.transformFileSync(filename);
    let outname = filename.replace(dir('src'), dir('es5'));

    fs.ensureDirSync(path.dirname(outname));
    fs.writeFileSync(outname, result.code);
  });
};

/**
 * Creates a Browserify bundle from the plugin entry point.
 *
 * @param  {Function} dir
 * @param  {String} name
 * @return {Promise}
 */
const bundle = (dir, name) => {
  return new Promise((resolve, reject) => {
    browserify(dir('es5/plugin.js'), {standalone: name})
      .transform('browserify-shim')
      .bundle()
      .pipe(fs.createWriteStream(dir(`dist/${name}.js`)))
      .on('finish', resolve)
      .on('error', reject);
  });
};

/**
 * Build JS spell.
 *
 * @param {Function} dir
 * @param {Object} argv
 */
const spell = (dir) => {
  const pkg = require(dir('package.json'));
  const name = descope(pkg.name);

  transpile(dir, glob.sync(dir('src/**/*.js')));
  fs.ensureDirSync(dir('dist'));

  return bundle(dir, name)
    .then(() => {
      let minified = uglifyjs.minify(dir(`dist/${name}.js`));

      fs.writeFileSync(dir(`dist/${name}.min.js`), minified.code);
      bannerize(dir('dist/*.js'));
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
spell.help = () => 'help me!';

export default spell;
