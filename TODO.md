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
* Should we make watch a [dashboard](https://github.com/FormidableLabs/nodejs-dashboard)
* Add [colors](https://github.com/chalk/chalk)
* Add [tab-completion](https://github.com/mklabs/node-tabtab)
* Add documentation with a [man page](https://github.com/wooorm/remark-man)
* See if we follow:
  * http://docopt.org/
  * https://programmers.stackexchange.com/questions/307467/what-are-good-habits-for-designing-command-line-arguments
  * http://eng.localytics.com/exploring-cli-best-practices/
* githooks for spellbook (run things when certain actions happen)

# Release
* Create a zip file of the source code to upload to github
* switch to `conventional-changelog` instead of `chg`
* support prerelease signifiers (beta, alpha etc)

# Lint
## General
* verify that --fix and --errors work for each linter

## JS
* eslint rules (see if there are any other useful ones)
* eslint-plugin-qunit

# Build
## JS
  * rollup to a temporary file seperately from browserify
  * add banner to unminified browser bundle
  * jspm support?
  * noderify npm files?
  * only build the main code bundle once in with `js-browser-main` and include that in `js-browser-test`
  * jsx support
  * ts support
  * add rollup bundler support
  * fix issues with rollup and --watch
  * when browserify-shim support config passing, use that rather than using browserify-shim in user pkg.json
    * see: https://github.com/thlorenz/browserify-shim/pull/195

## Docs
* implement jsdoc tui theme
* html theme for guides

## CSS
* styl support?
* less support?

# Test
## General
* code coverage via istanbul
* sb-watch should auto-retest detected browsers. sb-start should pass and arg to sb-watch to disable this behavior
* test markdown examples js examples?

## nodejs
* get tests to run in nodejs, switch to mocha/chai?

# Server
* integrate with the hotel proxy to support project domain names?
