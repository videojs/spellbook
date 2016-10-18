<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [TODO](#todo)
- [Something to think about](#something-to-think-about)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Features & Information
## JavaScript
* es6/es5 support with entry file at `src/js/index.js`
* Smaller browser dists by using:
  - es6 dependency resolution using `rollupify` and packages with `jsnext:main` in their package.json
    - allows us to `scope-hoist` and `tree-shake`
    - allows us to only include `babel-external-helpers` once
    - es6 dependency resolution allows us to tree shake the entire es6 code base
  - `bundle-collapser` to convert long require strings to numbers
  - `babelify` configuired to polyfill `Object.assign` when needed
  - `browserify-shim` configuired to never add `video.js` to your dist files
* minfied and unminified dists `dist/browser/<pkg-name>.{js,min.js}`
* external source maps dists `dist/browser/<pkg-name>.{js.map,min.js.map}`
* ie8 support using a custom `babel` preset and `uglify` `--suport-ie8` flag
* Generate `webpack`, `browserify`, and `rollup` unit tests in `dist/test/<bundler-name>.test.js`
* Bundle all manual unit tests in `src/test/**/*.test.js` to `dist/test/<pkg-name>.test.js`
* transpose `src/js` to `dist/npm` and convert to es5 for npm deployment
* Inclusion of `global`, `qunitjs`, `sinon`, and `video.js` into your project without the need to install it yourself
* Support for super fast incremental rebuilds of all files using `watchify`
* Nicer `browserify`/`watchify` error reporting using `errorify`
* Linting of es6 code and es6 examples in documentation
* license banner insertion at the top of minified dist files

## Docs
* Generate html documents from all manual documenation in `src/docs`
* Automatic TOC generation for all manual documenation
* Manual documentation is generated to `dist/docs/manual`
* Automatic jsdoc generation for all code in `src/js/**/*.js` to `dist/docs/api`
* Lint manual docs for style errors
* Lint manual doc js examples with eslint

## CSS
* sass support with entry file at `src/css/index.scss`
* minfied and unminified dists `dist/browser/<pkg-name>.{css,min.css}`
* external source maps dists `dist/browser/<pkg-name>.{css.map,min.css.map}`

## i18n
* lint json `i18n` files in `src/i18n/**/*.json`
* copy `i18n` files to `dist/i18n`

## Test
* Automatically run tests on all supported browsers for all files in `dist/test/*.test.js`
* build js files for tests just before testing
* incremental rebuilds and re-run when javascript has changed
* integration for manual debuging using --watch
* integration with the development server

## Development
* Super fast incremental rebuilds where possible
* Optimizations for node.js 6
* Proxy karma test runner to development server `http://localhost:9999/test` for easy debugging
* `sb-start` to:
  - start a dev server
  - build everything
  - lint everything
  - test everything
  - auto-reload when files change in `<project-root>/dist/**/*` or `<project-root>/index.html`
  - auto re-run lint/build/test where needed to get the build back up to date

# TODO
* autoprefixer css support
* Automatic index file generation
* generate documentation index file to link to api/manual docs
* make remark-toc generation automatic rather than forcing users to add a section
* write docs
* kill sb-build-all binaries with `process.exit(1)` when a child fails to build
* windows support
  - must run current executables with `node` rather than directly
* sb-build-css-sass
  * add banner to the minified files (switch to postcss + cssnano)
  * update the source map with the line offset of the banner that was added
* sb-build-css-css
  * support plain css
* Unit Tests
  * utils folder
  * sb-test-karma
  * sb-server
  * test everything with sb-watch

# Future Ideas
* move js unit tests to `src/test/unit`
* General
* jspm support
* eslint-jsdoc support
  * make these run faster
    * build-js-*
  * add support for [colors](https://github.com/chalk/chalk), and remove builtin colors from linters
  * add support for [tab-completion](https://github.com/mklabs/node-tabtab)
  * add documentation and a [man page](https://github.com/wooorm/remark-man)
  * convert everything to a promise based api and use [loud rejection](https://github.com/sindresorhus/loud-rejection)
  * http://docopt.org/
  * https://programmers.stackexchange.com/questions/307467/what-are-good-habits-for-designing-command-line-arguments
  * http://eng.localytics.com/exploring-cli-best-practices/
* sb-build-js-npm
  * noderify npm binaries?
* sb-create && sb-upgrade
  * proxy to the generator
* sb-check
  * proxy to npm-check-update
* sb-test
  * get tests to run in nodejs
  * code coverage
* sb-build-i18n
  * does doing a copy on the json make sense?
* sb-server
  * localhost:<port> alternative such as <module-name>.dev
    * hotel?
    * mehserve?
    * vhost?
* sb-docs
  * find an html theme
* sb-build-js-browser-tests
  * treat code being tested as external so we only build it once
* general
  * noderify when we switch to js instead of using shelljs
* sb-release
  * support prerelease signifiers (beta, alpha etc)
* shim
  * when browserify-shim support config passing, use that rather than using browserify-shim in user pkg.json
    * see: https://github.com/thlorenz/browserify-shim/pull/195
* sb-check
  * npm-check-update
  * npm-check
