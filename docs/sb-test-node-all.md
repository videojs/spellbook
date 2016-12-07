# sb-test-node-all(1) - Run all nodejs tests

## SYNOPSIS

  sb-test-node-all [-l, --log-level <level>] [-h,--help] [-q,--quiet] [-V,--version]
                   [-w, --watch] [-nb, --no-build] [-nl, --no-lint]

## DESCRIPTION

  Test all of the following through sub-binaries:
    * require - see sb-test-node-require(1)

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

## EXAMPLES

  Get the current version of spellbook

    sb-test-node-all -V
    sb-test-node-all --version

  Get help for this binary

    sb-test-node-all --help
    sb-test-node-all -h

  Set the log level for this binary

    sb-test-node-all -l info
    sb-test-node-all -l fatal
    sb-test-node-all --log-level debug
    sb-test-node-all --log-level error

  Dont output anything

    sb-test-node-all -q
    sb-test-node-all -quiet

  Watch for changes and re-load/re-run tests

    sb-test-node-all -w
    sb-test-node-all --watch

  Do not build before testing

    sb-test-node-all -nb
    sb-test-node-all --no-build

  Do not lint before testing

    sb-test-node-all -nl
    sb-test-node-all --no-lint

## ENVIRONMENT AND CONFIGURATION VARIABLES

  SB_LOG_LEVEL='info'
    An enviornment variable that sets the log level to use for all videojs-spellbook
    binaries. Can be set to fatal, error, warn, info, verbose, debug, or none.

  TEST_PORT=9876
    The port that the test server (karma-runner) is running on. Defaults to 9876.

  <package.json>.spellbook.log-level=info
    A package.json variable that sets the default log level to use for all videojs-spellbook
    binaries. Can be set to fatal, error, warn, info, verbose, debug, or none.

  <package.json>.spellbook.test='{}'
    Test configuration to use in spellbook. If this is set to a false value
    then tests will never be run.

## SEE ALSO

  sb-test-node(1), sb-test-node-require(1)

## EXIT

  0 - all commands succeeded
  1 - one or more sub-command failed

## Spellbook

  Part of the sb(1) suite
