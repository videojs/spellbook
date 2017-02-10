# sb-test-browser(1) - Run browser unit tests that have been built for a project

## SYNOPSIS

  sb-test-browser [-l, --log-level <level>] [-h,--help] [-q,--quiet] [-V,--version]
                  [-w, --watch] [-nb, --no-build] [-nl, --no-lint]
                  [-b, --browsers <chrome,firefox,safari>] [-p, --port <port=9876>]

## DESCRIPTION

  Test all unit tests that have been built to 'dist/test/*.test.js' using karma.
  See sb-build-test(1) for more information on what is being built.

  Basic steps:
  1. Run sb-build unless we are passed --no-build
  2. Run sb-lint unless we are passed --no-lint, but don't exit on failure
  3. karma will be run with --no-auto-watch and --single-run unless this binary is run with
     --watch. If run with --watch karma will be run with --no-single-run and --auto-watch.
  2. Karma will shim sinon manually as only specific versions of sinon work for our needs.
     If you install sinon locally it will be used instead of the version included with spellbook.
  3. Karma will shim video.js unless `shimVideojs` is set to false in package.json
  4. Karma will start a sever on <port> and use karma-detect-browsers to decide what browsers to run on
     unless --browsers is provided.
  5. Karma will run tests and exit with a return code of success or failure depending on if the tests
     passed or failed.

  config file can be seen in configs/karma.config.js
  This uses karma and QUnit internally to run tests.

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

  -w, --watch
    Watch unit test dist files for changes and re-run/re-load tests.

  -nb, --no-build
    Do not build before testing.

  -nl, --no-lint
    Do not lint before testing.

  -b, --browsers <chrome,firefox,safari>
    comma seperated list of browsers to run on

  -p, --port <port=9876>
    The port to use for the browsers test server. Can be defined with the
    TEST_PORT environment variable as well. defaults to 9876

## EXAMPLES

  Get the current version of spellbook

    sb-test-browser -V
    sb-test-browser --version

  Get help for this binary

    sb-test-browser --help
    sb-test-browser -h

  Set the log level for this binary

    sb-test-browser -l info
    sb-test-browser -l fatal
    sb-test-browser --log-level debug
    sb-test-browser --log-level error

  Dont output anything

    sb-test-browser -q
    sb-test-browser -quiet

  Watch for changes and re-load/re-run tests

    sb-test-browser -w
    sb-test-browser --watch

  Do not build before testing

    sb-test-browser -nb
    sb-test-browser --no-build

  Do not lint before testing

    sb-test-browser -nl
    sb-test-browser --no-lint

  Only tests specific browsers not detected browsers

    sb-test-browser -b chrome
    sb-test-browser --browsers chorme,firefox

  Use a different port

    sb-test-browser -p 3333
    sb-test-browser --port 8888

## ENVIRONMENT AND CONFIGURATION VARIABLES

  SB_LOG_LEVEL='info'
    An enviornment variable that sets the log level to use for all videojs-spellbook
    binaries. Can be set to fatal, error, warn, info, verbose, debug, or none.

  TEST_PORT=9876
    The port that the test server (karma-runner) is running on. Defaults to 9876.

  <package.json>.spellbook.log-level=info
    A package.json variable that sets the default log level to use for all videojs-spellbook
    binaries. Can be set to fatal, error, warn, info, verbose, debug, or none.

  <package.json>.spellbook.shimVideojs=true
    If video.js is shimed it will be included in unit tests for use. Otherwise it won't be.

## SEE ALSO

  sb-test(1), sb-test-all(1), sb-build-test(1)

## EXIT

  0 - all commands succeeded
  1 - one or more sub-command failed

## Spellbook

  Part of the sb(1) suite
