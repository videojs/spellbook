# sb(1) - The main binary for spellbook

## SYNOPSIS

  sb [-l, --log-level <level>] [-h,--help] [-q,--quiet] [-V,--version]
     [help <sub-command>] <sub-command> [<args...>]

## DESCRIPTION

  Potentially run any of the following through sub-binaries:
    * build - see sb-build(1)
    * watch - see sb-watch(1)
    * clean - see sb-clean(1)
    * start - see sb-start(1)
    * server - see sb-server(1)
    * test - see sb-test(1)
    * lint - see sb-lint(1)
    * config - see sb-config(1)
    * release - see sb-release(1)

  By default if no command is passed in help will be shown

## OPTIONS

  -l, --log-level <level>
    The level of log messages that you want to see. Can be fatal, error,
    warn, info, verbose, or debug. Defaults to info.

  -h, --help
    View the help information for this binary

  -V, --version
    View the version of this binary

  -q, --quiet
    Do not log any messages to stdout or stderr

  <sub-command> [<args...>]
    The sub-command to run or get help for. Can be build, watch, clean, start, server, test,
    lint, config, or release. Help will be shown if nothing is passed in. [<args....>] will
    be passed along to sub command.

  help <sub-command>
    Get help for a sub-command, this is an alias for running `sb <sub-command> --help`.

## EXAMPLES

  Running sub commands

    sb clean [<args...>]
    sb watch [<args...>]
    sb build [<args...>]
    sb start [<args...>]

  Get help for a command

    sb help build
    sb help lint

  Get the current version of spellbook

    sb -V
    sb --version

  Get help for this binary

    sb --help
    sb -h

  Set the log level for this binary

    sb -l info
    sb -l fatal
    sb --log-level debug
    sb --log-level error

  Dont output anything

    sb -q
    sb -quiet

## DISCUSSION

  TODO: PROJECT LAYOUT
  TODO: HOW WE DETERMINE WHAT IS BUILT
  TODO: CONFIGURATION

## ENVIRONMENT AND CONFIGURATION VARIABLES

  SB_LOG_LEVEL
    An enviornment variable that sets the log level to use for all videojs-spellbook
    binaries.

## SEE ALSO

  sb-build(1), sb-lint(1), sb-clean(1), sb-watch(1), sb-start(1), sb-server(1),
  sb-test(1), sb-lint(1), sb-config(1), sb-release(1)

## EXIT

  0 - all commands succeeded
  1 - one or more sub-command failed

## Spellbook

  ,Part of the sb(1) suite
