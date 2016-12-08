# sb-lint-lang(1) - Lint lang assets for a project

## SYNOPSIS

  sb-lint-lang [-l, --log-level <level>] [-h,--help] [-q,--quiet] [-V,--version]
              [<sub-command='all'> [<args...>]] [help <sub-command>]

## DESCRIPTION

  Potentially lint all or one of the following through sub-binaries:
    * src - see sb-lint-lang-src(1)
    * all - see sb-lint-lang-all(1)

  By default if no command is passed in `sb-lint-lang` will be run as if it was
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
    Get help for a sub-command, this is an alias for running `sb-lint-lang <sub-command> --help`.

## EXAMPLES

  lint specific assets assets

    sb-lint-lang all [<args...>]
    sb-lint-lang src [<args...>]

  Get help for a command

    sb-lint-lang help src
    sb-lint-lang help all
    sb-lint-lang all --help
    sb-lint-lang src --help

  Get the current version of spellbook

    sb-lint-lang -V
    sb-lint-lang --version

  Get help for this binary

    sb-lint-lang --help
    sb-lint-lang -h

  Set the log level for this binary

    sb-lint-lang -l info
    sb-lint-lang -l fatal
    sb-lint-lang --log-level debug
    sb-lint-lang --log-level error

  Dont output anything

    sb-lint-lang -q
    sb-lint-lang -quiet

## ENVIRONMENT AND CONFIGURATION VARIABLES

  SB_LOG_LEVEL='info'
    An enviornment variable that sets the log level to use for all videojs-spellbook
    binaries. Can be set to fatal, error, warn, info, verbose, debug, or none.

  <package.json>.spellbook.log-level=info
    A package.json variable that sets the default log level to use for all videojs-spellbook
    binaries. Can be set to fatal, error, warn, info, verbose, debug, or none.

  <package.json>.spellbook.lang='{}'
    Lang configuration to use in spellbook. If this is set to a false value then lang
    linting will never be attempted.

  <package.json>.spellbook.lang.src='lang/'
    Source directory to use for lang files, set in package.json. If this is unset
    'lang/' will be used. If this directory does not exist lang will not be linted.

## SEE ALSO

  sb-lint-lang-all(1), sb-lint-lang-src(1)

## EXIT

  0 - all commands succeeded
  1 - one or more sub-command failed

## Spellbook

  Part of the sb(1) suite
