/**
 * Rollup configuration for packaging the plugin in a module that is consumable
 * by either CommonJS (e.g. Node or Browserify) or ECMAScript (e.g. Rollup).
 *
 * These modules DO NOT include their dependencies as we expect those to be
 * handled by the module system.
 */
import babel from 'rollup-plugin-babel';
import json from 'rollup-plugin-json';
const config = require('../src/config');

export default {
  moduleName: config.name,
  entry: 'src/plugin.js',
  external: ['video.js'],
  globals: {
    'video.js': 'videojs'
  },
  legacy: true,
  plugins: [
    json(),
    babel({presets: __dirname + '/babel-preset.config.js'})
  ],
  targets: [
    {dest: 'dist/' + config.name + '.cjs.js', format: 'cjs'},
    {dest: 'dist/' + config.name + '.es.js', format: 'es'}
  ]
};
