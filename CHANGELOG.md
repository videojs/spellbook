CHANGELOG
=========

## HEAD (Unreleased)
_(none)_

--------------------
## 3.1.1 (2017-04-12)
* fix builds where sub projects also use browserify-shim

## 3.1.0 (2017-04-11)
* Better doc example linting, allow videojs/player globals
* Support SauceLabs, BrowserStack, Travis, and TeamCity
* Fix node testing during watch
* Allow bundler tests to be turned off
* Update Uglify-js2
* Allow additional test files to be specified
* Better karma proxy
* add banner to unminified js bundle

## 3.0.2 (2017-04-05)
* revert sinon bump

## 3.0.1 (2017-04-05)
* dependency bumps

## 3.0.0 (2017-04-05)
* BREAKING: move source map url out of main dist files and into -with-map files
* BREAKING: Better documentation tooling, new sb-lint-docs-md rules that may break builds

## 2.1.5 (2017-04-05)
* dependency version bumps

## 2.1.4 (2017-02-13)
* re-include sinon
* fix --tunnel

## 2.1.3 (2017-02-13)
* Fix stylelint deprications
* Fix karma watch (fixes dev server watch)
* Remove video.js/sinon import from dependencies for spellbook

## 2.1.2 (2017-01-11)
* pin postcss-import to 9.0.0 to stop build failures

## 2.1.1 (2017-01-05)
* dependency major verion updates
* fix an issue causing unit tests to fail

## 2.1.0 (2016-12-08)
* update eslint-config-videojs to 3.0.1 (#18)
* added linting before testing, but fail after both (#13)
* fix es6 module resolution (#16)
* support linting for css and sass at the same time (#15)
* fix live-reload related issues (#17)
* prevent zombies by killing any running process when parent exits (#20)
* Add man pages and documenation on each binary in spellbook (#22)

## 2.0.2 (2016-11-03)
* fix node6 karma tests

## CHANGELOG.md (2016-11-03)
* fix issues with --watch
* use npm-run, rimraf, and mkdirp instead of shelljs
* dont support rollup in bundlers
* make sure that all linter return an error code when they fail
* make sure that nothing dies with an error code while watching
* added sb-config
* dont use css in tests if css is off
* support for special charaters in command line arguments (such as single quote)
* warn now logs to stdout
* sb-server now proxies /test and /test/ rather than just /test

## 2.0.0 (2016-11-03)
* BREAKING: change i18n wording and binaries to lang
* BREAKING: CHANGE npm wording to node and es5
* BREAKING: remove --watch from binaries that can't use it
* implement vanilla css linting and building
* add banners to css/scss files
* BREAKING: rename karma wording to browser
* added more -all binaries to future proof this build system

## 1.0.9 (2016-10-25)
* get tests working in TRAVIS
* make all tests run in parallel

## 1.0.8 (2016-10-25)
* use options rather than configs for eslint
* use vanilla eslint
* remove browserify-incremental and use vanilla browserify
* remove sb-cache
* update the readme with todo and goals
* set the process title to the curren running binary
* better error handling
* dont use configs for remark
* get build tests working

## 1.0.7 (2016-10-25)
* fix browseriy shim when using spellbooks modules in browserify

## 1.0.6 (2016-10-25)
* add a --no-build option in sb-test-all
* make videojs-shim work no matter what
* better linter output
* remove clean from utils folder
* add videojs as a dependency
* make sb-test-all always rebuild

## 1.0.5 (2016-10-25)
* remove --quiet from sb-release as it is builtin
* fix a bug where getConfig was being used incorrectly

## 1.0.4 (2016-10-25)
* fix tests locally
* make --quiet a builtin with command-wrapper
* allow users to turn off certain build/lint steps
* merge babel configs into one babel preset

## 1.0.2 (2016-10-25)
* add a shim-videojs option so that it can be turned off

## 1.0.1 (2016-10-25)
* overhaul command running with logging
* fix issues with remark
* merge linter tests into one file
* run some tests in parallel
* add utilities to get-files and check if paths-exist
* get watchify to work and fixed test bundle builds watching

## 1.0.0 (2016-10-25)
* initial

