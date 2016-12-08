# sb-lint-docs(1) - Lint css assets for a project

## SYNOPSIS

  sb-lint-docs [-l, --log-level <level>] [-h,--help] [-q,--quiet] [-V,--version]
               [<sub-command='all'> [<args...>]] [help <sub-command>]

## DESCRIPTION

  Potentially lint all or one of the following through sub-binaries:
    * md - see sb-lint-docs-md(1)
    * examples - see sb-lint-docs-examples(1)
    * all - see sb-lint-docs-all(1)

  By default if no command is passed in `sb-lint-docs` will be run as if it was
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
    The sub-command to run Defaults to all if nothing is passed in.
    [<args....>] will be passed along to sub command.

  help <sub-command>
    Get help for a sub-command, this is an alias for running `sb-lint-docs <sub-command> --help`.

## EXAMPLES

  lint specific assets assets

    sb-lint-docs examples [<args...>]
    sb-lint-docs md [<args...>]
    sb-lint-docs all [<args...>]

  Get help for a command

    sb-lint-docs help md
    sb-lint-docs help examples
    sb-lint-docs all --help

  Get the current version of spellbook

    sb-lint-docs -V
    sb-lint-docs --version

  Get help for this binary

    sb-lint-docs --help
    sb-lint-docs -h

  Set the log level for this binary

    sb-lint-docs -l info
    sb-lint-docs -l fatal
    sb-lint-docs --log-level debug
    sb-lint-docs --log-level error

  Dont output anything

    sb-lint-docs -q
    sb-lint-docs -quiet

## ENVIRONMENT AND CONFIGURATION VARIABLES

  SB_LOG_LEVEL='info'
    An enviornment variable that sets the log level to use for all videojs-spellbook
    binaries. Can be set to fatal, error, warn, info, verbose, debug, or none.

  <package.json>.spellbook.log-level=info
    A package.json variable that sets the default log level to use for all videojs-spellbook
    binaries. Can be set to fatal, error, warn, info, verbose, debug, or none.

  <package.json>.spellbook.docs='{}'
    Docs configuration to use in spellbook. If this is set to a false value then docs
    linting will never be attempted.

  <package.json>.spellbook.docs.src='docs/'
    Source directory to use for docs files, set in package.json. If this is unset
    'docs/' will be used. If this directory does not exist docs will not be linted.

## SEE ALSO

  sb-lint-docs-all(1), sb-lint-docs-md(1), sb-lint-docs-examples(1)

## EXIT

  0 - all commands succeeded
  1 - one or more sub-command failed

## Spellbook

  Part of the sb(1) suite
