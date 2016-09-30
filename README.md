<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [TODO](#todo)
- [Something to think about](#something-to-think-about)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# TODO
* general
  * better verbose logging support?
    * use RunCommand?
  * more configuration
  * have individual build packages run clean on files they will build to?
  * prepush git hooks (update readme with doctoc)
  * noderify when we switch to js instead of using shelljs
* build-js
  * ignore .js.tmp files during watchify?? (created by rollupify, seem to cause issues?)
  * noderify npm binaries?
  * test browserify-incremental
* build-css
  * add banner to the minified file and update the source map with the line offset of the banner that was added
* sb-release
  * support prerelease signifiers (beta, alpha etc)
* sb-build-html
  * use something like gulp-inject to inject css and js into html
  * one page for min files and one page for normal files
  * vulkanize min files into the index as well
  * create an example page in the index of dist/
* sb-lint-html ?
  * lint all html files found in html/
* sb-server
  * unify karma and dev server
    * Proxy? localhost:9876 etc to <project-name>.dev on your local machine
    * hotel?
    * mehserve?
    * vhost?
* sb-test
  * get bundler tests to work
  * get tests to run in nodejs
  * get tests to run in browser
  * watch all tests
  * code coverage
* sb-create
  * proxy to the generator
* Unit Tests
  * utils folder
  * check file contents
  * lint-*
  * test-*
  * server
  * --watch
* sb-docs
  * html theme?


# Something to think about
* better i18n build
