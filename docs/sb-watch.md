# sb-watch(1) - Watch files for changes and rebuild test, re-lint, and re-test

## SYNOPSIS

  sb-watch [-l, --log-level <level>] [-h,--help] [-q,--quiet] [-V,--version]
           [-nb, --no-build] [-nl, --no-lint] [-p, --port <port-number=9876>]

## DESCRIPTION

  This binary is an alias for running the following in --watch mode:

  1. sb-build-all(1)
  2. sb-lint-all(1)
  3. sb-test-all(1) with '--no-build' and '--no-lint'

## OPTIONS

  -l, --log-level <level>
    The level of log messages that you want to see. Can be none, fatal, error,
    warn, info, verbose, or debug. Defaults to info.

  -h, --help
    View the help information for this binary

  -V, --version
    View the version of this binary

  -q, --quiet
    Do not log any messages to stdout or stderr

  -nb, --no-build
    Do not run an initial build and do not build on file changes.

  -nl, --no-lint
    Do not run an initial link and do not lint on file changes.

  -p, --port <port-number=9876>
    What port to open the watching test server on. Default is 9876.

## EXAMPLES

  Get the current version of spellbook

    sb-watch -V
    sb-watch --version

  Get help for this binary

    sb-watch --help
    sb-watch -h

  Set the log level for this binary

    sb-watch -l info
    sb-watch -l fatal
    sb-watch --log-level debug
    sb-watch --log-level error

  Dont output anything

    sb-watch -q
    sb-watch -quiet


  Don't build and watch

    sb-watch -nb
    sb-watch --no-build

  Don't lint and watch

    sb-watch -nl
    sb-watch --no-lint

  Set the test server port

    sb-watch --port 7777
    sb-watch -p 8888

## ENVIRONMENT AND CONFIGURATION VARIABLES

  SB_LOG_LEVEL='info'
    An enviornment variable that sets the log level to use for all videojs-spellbook
    binaries. Can be set to fatal, error, warn, info, verbose, debug, or none.

  TEST_PORT=9876
    The port to run the test server (karma-runner) on. Defaults to 9876.

  <package.json>.spellbook.log-level=info
    A package.json variable that sets the default log level to use for all videojs-spellbook
    binaries. Can be set to fatal, error, warn, info, verbose, debug, or none.

  <package.json>.spellbook.ie8=false
    Should spellbook make sure that IE8 is supported. Defaults to false.

  <package.json>.spellbook.shimVideojs=true
    Makes sure that video.js is included in unit tests but will not be bundled into
    distribution js files. Defaults to true.

  <package.json>.spellbook.css='{}'
    CSS configuration to use in spellbook. If this is set to a false value then css
    builds will never be attempted.

  <package.json>.spellbook.css.src='src/css'
    Source directory to use for css files, set in package.json. If this is unset
    'src/css' will be used. If this directory does not exist css will not be built.

  <package.json>.spellbook.js='{}'
    JS configuration to use in spellbook. If this is set to a false value then js
    builds will never be attempted.

  <package.json>.spellbook.js.src='src/js'
    Source directory to use for js files, set in package.json. If this is unset
    'src/js' will be used. If this directory does not exist js will not be built.

  <package.json>.spellbook.lang='{}'
    Lang configuration to use in spellbook. If this is set to a false value then lang
    builds will never be attempted.

  <package.json>.spellbook.lang.src='lang/'
    Source directory to use for lang files, set in package.json. If this is unset
    'lang/' will be used. If this directory does not exist lang will not be built.

  <package.json>.spellbook.docs='{}'
    Documentation configuration to use in spellbook. If this is set to a false value
    then docs builds will never be attempted.

  <package.json>.spellbook.docs.src='docs/'
    Source directory to use for docs files, set in package.json. If this is unset
    'docs/' will be used. If this directory does not exist docs will not be built.

  <package.json>.spellbook.test='{}'
    Test configuration to use in spellbook. If this is set to a false value
    then test builds will never be attempted.

  <package.json>.spellbook.test.src='test/'
    Source directory to use for test files, set in package.json. If this is unset
    'test/' will be used. If this directory does not exist tests will not be built.

## SEE ALSO

  sb(1), sb-build-all(1), sb-lint-all(1), sb-test-all(1)

## EXIT

  Not used will always exit 0.

## Spellbook

  Part of the sb(1) suite
