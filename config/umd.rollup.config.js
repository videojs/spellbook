/**
 * Rollup configuration for packaging the plugin in a module that is consumable
 * as the `src` of a `script` tag or via AMD or similar client-side loading.
 *
 * This module DOES include its dependencies.
 */
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import json from 'rollup-plugin-json';
import resolve from 'rollup-plugin-node-resolve';

const config = require('../src/config');

export default {
  moduleName: 'videojsTestington',
  entry: 'src/plugin.js',
  dest: 'dist/' + config.name + '.js',
  format: 'umd',
  external: ['video.js'],
  globals: {
    'video.js': 'videojs'
  },
  legacy: true,
  plugins: [
    resolve({
      browser: true,
      main: true,
      jsnext: true
    }),
    json(),
    commonjs({
      sourceMap: false
    }),
    babel({presets: __dirname + '/babel-preset.config.js'})
  ]
};
