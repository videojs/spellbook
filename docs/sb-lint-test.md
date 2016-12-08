# sb-lint-test(1) - Lint unit test assets for a project

## SYNOPSIS

  sb-lint-test [-l, --log-level <level>] [-h,--help] [-q,--quiet] [-V,--version]
             [<sub-command='all'> [<args...>]] [help <sub-command>]

## DESCRIPTION

  Potentially lint all or one of the following through sub-binaries:
    * src - see sb-lint-test-src(1)
    * all - see sb-lint-test-all(1)

  By default if no command is passed in `sb-lint-test` will be run as if it was
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
    Get help for a sub-command, this is an alias for running `sb-lint-test <sub-command> --help`.

## EXAMPLES

  lint specific assets assets

    sb-lint-test all [<args...>]
    sb-lint-test src [<args...>]

  Get help for a command

    sb-lint-test help src
    sb-lint-test help all
    sb-lint-test all --help
    sb-lint-test src --help

  Get the current version of spellbook

    sb-lint-test -V
    sb-lint-test --version

  Get help for this binary

    sb-lint-test --help
    sb-lint-test -h

  Set the log level for this binary

    sb-lint-test -l info
    sb-lint-test -l fatal
    sb-lint-test --log-level debug
    sb-lint-test --log-level error

  Dont output anything

    sb-lint-test -q
    sb-lint-test -quiet

## ENVIRONMENT AND CONFIGURATION VARIABLES

  SB_LOG_LEVEL='info'
    An enviornment variable that sets the log level to use for all videojs-spellbook
    binaries. Can be set to fatal, error, warn, info, verbose, debug, or none.

  <package.json>.spellbook.log-level=info
    A package.json variable that sets the default log level to use for all videojs-spellbook
    binaries. Can be set to fatal, error, warn, info, verbose, debug, or none.

  <package.json>.spellbook.test='{}'
    Test configuration to use in spellbook. If this is set to a false value then test
    linting will never be attempted.

  <package.json>.spellbook.js.src='tests/'
    Source directory to use for test files, set in package.json. If this is unset
    'test/' will be used. If this directory does not exist tests  will not be linted.

## SEE ALSO

  sb-lint-test-all(1), sb-lint-test-src(1)

## EXIT

  0 - all commands succeeded
  1 - one or more sub-command failed

## Spellbook

  Part of the sb(1) suite
