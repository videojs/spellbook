# sb-build-lang(1) - Build languages for a project

## SYNOPSIS

  sb-build-lang [-l, --log-level <level>] [-h,--help] [-q,--quiet] [-V,--version]
                [<sub-command='all'> [<args...>]] [help <sub-command>]

## DESCRIPTION

  Run one following sub commands for lang builds
    * copy - see sb-build-lang-copy(1)
    * all - see sb-build-lang-all(1)

  By default if no command is passed in `sb-build-lang` will be run as if it was
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
    Get help for a sub-command, this is an alias for running `sb-build-lang <sub-command> --help`.

## EXAMPLES

  Build lang assets with sub command

    sb-build-lang copy [<args...>]
    sb-build-lang all [<args...>]

  Get help for a command

    sb-build-lang help copy
    sb-build-lang all --help

  Get the current version of spellbook

    sb-build-lang -V
    sb-build-lang --version

  Get help for this binary

    sb-build-lang --help
    sb-build-lang -h

  Set the log level for this binary

    sb-build-lang -l info
    sb-build-lang -l fatal
    sb-build-lang --log-level debug
    sb-build-lang --log-level error

  Dont output anything

    sb-build-lang -q
    sb-build-lang -quiet

## ENVIRONMENT AND CONFIGURATION VARIABLES

  SB_LOG_LEVEL='info'
    An enviornment variable that sets the log level to use for all videojs-spellbook
    binaries. Can be set to fatal, error, warn, info, verbose, debug, or none.

  <package.json>.spellbook.log-level=info
    A package.json variable that sets the default log level to use for all videojs-spellbook
    binaries. Can be set to fatal, error, warn, info, verbose, debug, or none.

  <package.json>.spellbook.lang='{}'
    Lang configuration to use in spellbook. If this is set to a false value then lang
    builds will never be attempted.

  <package.json>.spellbook.lang.src='lang/'
    Source directory to use for lang files, set in package.json. If this is unset
    'lang/' will be used. If this directory does not exist lang will not be built.

## SEE ALSO

  sb-build-all(1), sb-build(1), sb-build-lang-all(1), sb-build-lang-copy(1)

## EXIT

  0 - all commands succeeded
  1 - one or more sub-command failed

## Spellbook

  Part of the sb(1) suite
