import path from 'path';

export default (config) => {
  let browsers = config.browsers;
  let frameworks = ['qunit'];
  let plugins = ['karma-qunit'];
  let pkg = require(path.join(process.cwd(), 'package.json'));
  let launcher = b => plugins.push(`karma-${b}-launcher`);

  // On Travis CI, we can only run in Firefox.
  if (process.env.TRAVIS) {
    browsers = ['Firefox'];

  // If specific browsers are requested on the command line, load their
  // launchers.
  } else if (browsers.length) {
    browsers.forEach(launcher);

  // If no browsers are specified, we will do a `karma-detect-browsers` run,
  // which means we need to set up that plugin and all the browser plugins
  // we are supporting.
  } else {
    frameworks.push('detectBrowsers');
    plugins.push('karma-detect-browsers');
    ['chrome', 'firefox', 'ie', 'safari'].forEach(launcher);
  }

  config.set({

    files: [
      'node_modules/sinon/pkg/sinon.js',
      'node_modules/sinon/pkg/sinon-ie.js',
      'node_modules/video.js/dist/video.js',
      'node_modules/video.js/dist/video-js.css',
      `dist/${pkg.name.split('/').reverse()[0]}.css`,
      'test/dist/bundle.js'
    ],

    frameworks,
    browsers,
    plugins,

    detectBrowsers: {
      usePhantomJS: false
    },

    reporters: ['dots'],
    port: 9876,
    colors: true,
    autoWatch: false,
    singleRun: true,
    concurrency: Infinity
  });
};
