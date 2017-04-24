# TODO

## Table of Contents

* [General](#general)
* [Release](#release)
* [Lint](#lint)
  * [General](#general-1)
  * [Lang](#lang)
  * [CSS](#css)
  * [JS](#js)
* [Build](#build)
  * [JS](#js-1)
  * [Docs](#docs)
  * [CSS](#css-1)
* [Test](#test)
  * [General](#general-2)
  * [nodejs](#nodejs)
  * [Server](#server)

## General

* custom preinstall script so the project will only install the minimum required packages
* release sub packages for spellbook
* Can we include husky
* switch to memoryFS where we are building temp files
* test --watch somehow
* test build-turn-off

* Should we debounce all Watch functions?
* Should we make watch a [dashboard](https://github.com/FormidableLabs/nodejs-dashboard)
* Add [colors](https://github.com/chalk/chalk)
* Add [tab-completion](https://github.com/mklabs/node-tabtab)
* See if we follow:
  * <http://docopt.org/>
  * <https://programmers.stackexchange.com/questions/307467/what-are-good-habits-for-designing-command-line-arguments>
  * <http://eng.localytics.com/exploring-cli-best-practices/>
* githooks for spellbook (run things when certain actions happen)
* can spellbook provide husky?
* Try to cut down on dependencies
* switch to babel-inline-version rather than versionify

## Release

* Create a zip file of the source code to upload to github
* switch to `conventional-changelog` instead of `chg`
* support prerelease signifiers (beta, alpha etc)

## Lint

### General

* handle file arguments in all binaries

### Lang

* get --fix to work
* have more linting rules that make sense, ie: two spaced indent etc

### CSS

* use --fix on sb-lint-css-css & sb-lint-css-sass when it is available <https://github.com/stylelint/stylelint/pull/2467>

### JS

* eslint rules (see if there are any other useful ones)
* eslint-plugin-qunit
* use --fix with sb-lint-docs-examples when it is available <https://github.com/eslint/eslint-plugin-markdown/issues/58>

## Build

### JS

* rollup to a temporary file seperately from browserify
* only build the main code bundle once in with `js-browser-main` and include that in `js-browser-test`
* add rollup bundler support in `build-test-bundlers`
* switch to rollup rather than browserify
* fix issues with rollup and --watch (issue is in rollupify)
  * see: <https://github.com/nolanlawson/rollupify/issues/54>
* switch to exposify instead of browserify-shim
  * see: <https://github.com/thlorenz/exposify>
* jspm support?
* noderify npm files?
* jsx support?
* ts support?

### Docs

* implement jsdoc tui theme
* build jsdocs without a manual docs folder as long as docs are turned on
* throw manual docs under guides on tui theme

### CSS

* styl support?
* less support?

## Test

### General

* code coverage via istanbul
* Get `rerun`, `no-try-catch` etc.. to work on the non-debug page after reload
* test markdown examples js examples?

### nodejs

* get tests to run in nodejs, switch to mocha/chai?

### Server

* integrate with the hotel proxy to support project domain names?
