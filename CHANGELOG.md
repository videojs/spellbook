CHANGELOG
=========

## HEAD (Unreleased)
_(none)_

--------------------

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

