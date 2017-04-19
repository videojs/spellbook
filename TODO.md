<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [General](#general)
- [Release](#release)
- [Lint](#lint)
  - [General](#general-1)
  - [JS](#js)
- [Build](#build)
  - [JS](#js-1)
  - [Docs](#docs)
  - [CSS](#css)
- [Test](#test)
  - [General](#general-2)
  - [nodejs](#nodejs)
- [Server](#server)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# General
* Pass commands, options, files, and flags down to child binaries
* Should we debounce all Watch functions?
* Should we make watch a [dashboard](https://github.com/FormidableLabs/nodejs-dashboard)
* Add [colors](https://github.com/chalk/chalk)
* Add [tab-completion](https://github.com/mklabs/node-tabtab)
* See if we follow:
  * http://docopt.org/
  * https://programmers.stackexchange.com/questions/307467/what-are-good-habits-for-designing-command-line-arguments
  * http://eng.localytics.com/exploring-cli-best-practices/
* githooks for spellbook (run things when certain actions happen)
* Try to cut down on dependencies
* switch to babel-inline-version rather than versionify

# Release
* Create a zip file of the source code to upload to github
* switch to `conventional-changelog` instead of `chg`
* support prerelease signifiers (beta, alpha etc)

# Lint
## Lang
* get --fix to work
* have more linting rules that make sense, ie: two spaced indent etc

## CSS
* use --fix on sb-lint-css-css & sb-lint-css-sass when it is available https://github.com/stylelint/stylelint/pull/2467

## JS
* eslint rules (see if there are any other useful ones)
* eslint-plugin-qunit
* use --fix with sb-lint-docs-examples when it is available https://github.com/eslint/eslint-plugin-markdown/issues/58

# Build
## JS
  * rollup to a temporary file seperately from browserify
  * only build the main code bundle once in with `js-browser-main` and include that in `js-browser-test`
  * add rollup bundler support in `build-test-bundlers`
  * fix issues with rollup and --watch (issue is in rollupify )
    * see: https://github.com/nolanlawson/rollupify/issues/54
  * when browserify-shim support config passing, use that rather than using browserify-shim in user pkg.json
    * see: https://github.com/thlorenz/browserify-shim/pull/195
    * maybe switch to exposify
  * jspm support?
  * noderify npm files?
  * jsx support?
  * ts support?

## Docs
* implement jsdoc tui theme
* html theme for guides
* build jsdocs without a manual docs folder as long as docs are turned on

## CSS
* styl support?
* less support?

# Test
## General
* Get `rerun`, `no-try-catch` etc.. to work on the non-debug page, aka get get parameters to work
* code coverage via istanbul
* test markdown examples js examples?

## nodejs
* get tests to run in nodejs, switch to mocha/chai?

# Server
* integrate with the hotel proxy to support project domain names?
