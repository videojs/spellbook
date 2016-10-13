<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [TODO](#todo)
- [Something to think about](#something-to-think-about)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# TODO
* sb-build-css-sass
  * add banner to the minified files (switch to postcss + cssnano)
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
* General
  * make these run faster
    * build-js-*
  * add support for [colors](https://github.com/chalk/chalk), and remove builtin colors from linters
  * add support for [tab-completion](https://github.com/mklabs/node-tabtab)
  * add documentation and a [man page](https://github.com/wooorm/remark-man)
  * convert everything to a promise based api and use [loud rejection](https://github.com/sindresorhus/loud-rejection)
  * http://docopt.org/
  * https://programmers.stackexchange.com/questions/307467/what-are-good-habits-for-designing-command-line-arguments
  * http://eng.localytics.com/exploring-cli-best-practices/
* js
  * get rollupify to work with watchify
* sb-build-js-npm
  * noderify npm binaries?
* sb-create && sb-upgrade
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
* sb-build-js-browser-tests
  * treat code being tested as external so we only build it once
* general
  * noderify when we switch to js instead of using shelljs
* sb-release
  * support prerelease signifiers (beta, alpha etc)
* shim
  * when browserify-shim support config passing, use that rather than using browserify-shim in user pkg.json
    * see: https://github.com/thlorenz/browserify-shim/pull/195
