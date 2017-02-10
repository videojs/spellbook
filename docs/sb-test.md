# sb-test(1) - Run tests for a project

## SYNOPSIS

  sb-test [-l, --log-level <level>] [-h,--help] [-q,--quiet] [-V,--version]
          [<sub-command='all'> [<args...>]] [help <sub-command>]

## DESCRIPTION

  Potentially test all or one of the following through sub-binaries:
    * node - see sb-test-node(1)
    * browser - see sb-test-browser(1)
    * all - see sb-test-all(1)

  By default if no command is passed in `sb-test` will be run as if it was
  passed `all`.

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

  <sub-command='all'> [<args...>]
    The sub-command to run. Defaults to all if nothing is passed in.
    [<args....>] will be passed along to sub command.

  help <sub-command>
    Get help for a sub-command, this is an alias for running `sb-test <sub-command> --help`.

## EXAMPLES

  Test specific assets

    sb-test node [<args...>]
    sb-test browser [<args...>]
    sb-test all [<args...>]

  Get help for a command

    sb-test help js
    sb-test help docs
    sb-test all --help
    sb-test css --help

  Get the current version of spellbook

    sb-test -V
    sb-test --version

  Get help for this binary

    sb-test --help
    sb-test -h

  Set the log level for this binary

    sb-test -l info
    sb-test -l fatal
    sb-test --log-level debug
    sb-test --log-level error

  Dont output anything

    sb-test -q
    sb-test -quiet

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

  sb-test-all(1), sb-test-browser(1), sb-test-node(1)

## EXIT

  0 - all commands succeeded
  1 - one or more sub-command failed

## Spellbook

  Part of the sb(1) suite
