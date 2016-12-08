# sb-test-node(1) - Run test in nodejs

## SYNOPSIS

  sb-test-node [-l, --log-level <level>] [-h,--help] [-q,--quiet] [-V,--version]
          [<sub-command='all'> [<args...>]] [help <sub-command>]

## DESCRIPTION

  Potentially test all or one of the following through sub-binaries:
    * require - see sb-test-node-require(1)
    * all - see sb-test-node-all(1)

  By default if no command is passed in `sb-test-node` will be run as if it was
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
    Get help for a sub-command, this is an alias for running `sb-test-node <sub-command> --help`.

## EXAMPLES

  Test specific assets

    sb-test-node require [<args...>]
    sb-test-node all [<args...>]

  Get help for a command

    sb-test-node require
    sb-test-node all --help

  Get the current version of spellbook

    sb-test-node -V
    sb-test-node --version

  Get help for this binary

    sb-test-node --help
    sb-test-node -h

  Set the log level for this binary

    sb-test-node -l info
    sb-test-node -l fatal
    sb-test-node --log-level debug
    sb-test-node --log-level error

  Dont output anything

    sb-test-node -q
    sb-test-node -quiet

## ENVIRONMENT AND CONFIGURATION VARIABLES

  SB_LOG_LEVEL='info'
    An enviornment variable that sets the log level to use for all videojs-spellbook
    binaries. Can be set to fatal, error, warn, info, verbose, debug, or none.

  <package.json>.spellbook.log-level=info
    A package.json variable that sets the default log level to use for all videojs-spellbook
    binaries. Can be set to fatal, error, warn, info, verbose, debug, or none.

  <package.json>.spellbook.test='{}'
    Test configuration to use in spellbook. If this is set to a false value
    then tests will never be run.

## SEE ALSO

  sb-test-node-all(1), sb-test-all(1), sb-test-node-require(1)

## EXIT

  0 - all commands succeeded
  1 - one or more sub-command failed

## Spellbook

  Part of the sb(1) suite
