# sb-test-all(1) - Run all tests for a project

## SYNOPSIS

  sb-test-all [-l, --log-level <level>] [-h,--help] [-q,--quiet] [-V,--version]
              [-w, --watch] [-nb, --no-build] [-nl, --no-lint]
              [-b, --browsers <chrome,firefox,safari>] [-p, --port <port=9876>]

## DESCRIPTION

  Test all of the following through sub-binaries:
    * node - see sb-test-all-node(1)
    * browser - see sb-test-all-browser(1)

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

    sb-test-all -V
    sb-test-all --version

  Get help for this binary

    sb-test-all --help
    sb-test-all -h

  Set the log level for this binary

    sb-test-all -l info
    sb-test-all -l fatal
    sb-test-all --log-level debug
    sb-test-all --log-level error

  Dont output anything

    sb-test-all -q
    sb-test-all -quiet

  Watch for changes and re-load/re-run tests

    sb-test-all -w
    sb-test-all --watch

  Do not build before testing

    sb-test-all -nb
    sb-test-all --no-build

  Do not lint before testing

    sb-test-all -nl
    sb-test-all --no-lint

  Only tests specific browsers not detected browsers

    sb-test-all -b chrome
    sb-test-all --browsers chorme,firefox

  Use a different port

    sb-test-all -p 3333
    sb-test-all --port 8888

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

  <package.json>.spellbook.test='{}'
    Test configuration to use in spellbook. If this is set to a false value
    then tests will never be run.

## SEE ALSO

  sb-test(1), sb-test-all-browser(1), sb-test-all-node(1)

## EXIT

  0 - all commands succeeded
  1 - one or more sub-command failed

## Spellbook

  Part of the sb(1) suite
