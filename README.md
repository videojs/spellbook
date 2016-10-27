# videojs-spellbook
[![Build Status](https://travis-ci.org/videojs/spellbook.svg?branch=master)](https://travis-ci.org/videojs/spellbook)
[![NPM](https://nodei.co/npm/videojs-spellbook.png)](https://nodei.co/npm/videojs-spellbook/)

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Features & Information](#features-&-information)
  - [JavaScript](#javascript)
  - [Docs](#docs)
  - [CSS](#css)
  - [lang](#lang)
  - [Test](#test)
  - [Development](#development)
  - [npm Release management](#npm-release-management)
- [TODO](#todo)
  - [CSS](#css-1)
  - [General](#general)
  - [Docs](#docs-1)
  - [Build](#build)
- [Future Ideas](#future-ideas)
  - [JS](#js)
  - [General](#general-1)
  - [Test](#test-1)
  - [CSS](#css-2)
  - [lang](#lang-1)
  - [Development](#development-1)
  - [Docs](#docs-2)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Features & Information
### JavaScript
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
* transpose `src/js` to `dist/es5` and convert to es5 for npm deployment
* Inclusion of `global`, `qunitjs`, `sinon`, and `video.js` into your project without the need to install it yourself
* Support for super fast incremental rebuilds of all files using `watchify`
* Nicer `browserify`/`watchify` error reporting using `errorify`
* Linting of es6 code and es6 examples in documentation
* license banner insertion at the top of minified dist files

### Docs
* Generate html documents from all manual documenation in `src/docs`
* Automatic TOC generation for all manual documenation
* Manual documentation is generated to `dist/docs/manual`
* Automatic jsdoc generation for all code in `src/js/**/*.js` to `dist/docs/api`
* Lint manual docs for style errors
* Lint manual doc js examples with eslint

### CSS
* sass support with entry file at `src/css/index.scss`
* minfied and unminified dists `dist/browser/<pkg-name>.{css,min.css}`
* external source maps dists `dist/browser/<pkg-name>.{css.map,min.css.map}`

### lang
* lint json `lang` files in `src/lang/**/*.json`
* copy `lang` files to `dist/lang`

### Test
* Automatically run tests on all supported browsers for all files in `dist/test/*.test.js`
* build js files for tests just before testing
* incremental rebuilds and re-run when javascript has changed
* integration for manual debuging using --watch
* integration with the development server

### Development
* Super fast incremental rebuilds where possible
* Optimizations for node.js 6
* Proxy karma test runner to development server `http://localhost:9999/test` for easy debugging
* `sb-start` to:
  - start a dev server
  - build everything
  - lint everything
  - test everything
  - auto-reload when files change in `<project-root>/dist/**/*` or `<project-root>/*.html`
  - auto re-run lint/build/test where needed to get the build back up to date

### npm Release management
1. Release un-released changelog entries with `chg`
2. update the version in package.json
3. support/build dists for bower in the tag so they don't clutter the main repo
4. make a git commit with the version name as the message
5. tag a git branch
6. Advise the user on how to push to git, and publish to npm

## TODO
### CSS
* add banner to the minified files (switch to postcss + cssnano)
* update the source map with the line offset of the banner that was added
* support plain css
* autoprefixer css support

### General
* Automatic index file generation
* generate documentation index file to link to api/manual docs
* Create a zip file of the source code to upload to github

### Docs
* make remark-toc generation automatic rather than forcing users to add a section

### Build
* windows support
  - must run current executables with `node` rather than directly
* Unit Tests
  * utils folder

## Future Ideas
### JS
  * jspm support
  * noderify npm files?
  * only build the main code bundle once in with `js-browser-main` and include that in `js-browser-test`
  * jsx support
  * ts support

### General
* lint jsdoc examples (convert to md using jsdoc2md and lint)
* test jsdoc examples?
* test markdown examples?
* switch to `conventional-changelog` instead of `chg`
* add support for [colors](https://github.com/chalk/chalk), and remove builtin colors from linters
* add support for [tab-completion](https://github.com/mklabs/node-tabtab)
* add documentation and a [man page](https://github.com/wooorm/remark-man)
* convert everything to a promise based api and use [loud rejection](https://github.com/sindresorhus/loud-rejection)
* http://docopt.org/
* https://programmers.stackexchange.com/questions/307467/what-are-good-habits-for-designing-command-line-arguments
* http://eng.localytics.com/exploring-cli-best-practices/
* sb-create && sb-upgrade
  * proxy to the generator
* sb-check
  * proxy to npm-check-update
* sb-release
* support prerelease signifiers (beta, alpha etc)
* when browserify-shim support config passing, use that rather than using browserify-shim in user pkg.json
  * see: https://github.com/thlorenz/browserify-shim/pull/195

### Test
* get tests to run in nodejs
* code coverage
* watch, server, and sb-test-karma unit test

### CSS
* styl support
* postcss support
* less support

### lang
* sb-build-lang
* does doing a copy on the json make sense?

### Development
* localhost:<port> alternative such as <module-name>.dev
  * hotel?
  * mehserve?
  * vhost?

### Docs
* find an html theme
