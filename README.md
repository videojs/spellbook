<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [TODO](#todo)
- [Something to think about](#something-to-think-about)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# TODO
* js
  * ignore .js.tmp files during watchify?? (created by rollupify, seem to cause issues?)
  * fix watchify
  * fix js-bundlers watch
* sb-build-css-sass
  * add banner to the minified files
  * update the source map with the line offset of the banner that was added
* sb-build-css-css
  * support plain css
* Unit Tests
  * utils folder
  * check file contents in build tests
  * test-*
  * server
  * test with --watch arguments

# Future Ideas
* sb-build-js-browser
  * sourcemap during watchify
* sb-build-js-npm
  * noderify npm binaries?
* sb-create
  * proxy to the generator
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
* sb-build-js-bundles
  * concat these right into dist/test/<pkg-name>.js
* sb-build-js-browser-tests
  * treat code being tested as external so we only build it once
* general
  * more configuration
  * noderify when we switch to js instead of using shelljs
* sb-release
  * support prerelease signifiers (beta, alpha etc)
