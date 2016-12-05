# sb-lint-css(1) - Lint css assets for a project

## SYNOPSIS

  sb-lint-css [-l, --log-level <level>] [-h,--help] [-q,--quiet] [-V,--version]
              [<sub-command='all'> [<args...>]] [help <sub-command>]

## DESCRIPTION

  Potentially lint all or one of the following through sub-binaries:
    * css - see sb-lint-css-css(1)
    * sass - see sb-lint-css-sass(1)
    * all - see sb-lint-css-all(1)

  By default if no command is passed in `sb-lint-css` will be run as if it was
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
    Get help for a sub-command, this is an alias for running `sb-lint-css <sub-command> --help`.

## EXAMPLES

  lint specific assets assets

    sb-lint-css css [<args...>]
    sb-lint-css sass [<args...>]
    sb-lint-css all [<args...>]

  Get help for a command

    sb-lint-css help js
    sb-lint-css help docs
    sb-lint-css all --help
    sb-lint-css css --help

  Get the current version of spellbook

    sb-lint-css -V
    sb-lint-css --version

  Get help for this binary

    sb-lint-css --help
    sb-lint-css -h

  Set the log level for this binary

    sb-lint-css -l info
    sb-lint-css -l fatal
    sb-lint-css --log-level debug
    sb-lint-css --log-level error

  Dont output anything

    sb-lint-css -q
    sb-lint-css -quiet

## ENVIRONMENT AND CONFIGURATION VARIABLES

  SB_LOG_LEVEL='info'
    An enviornment variable that sets the log level to use for all videojs-spellbook
    binaries. Can be set to fatal, error, warn, info, verbose, debug, or none.

  <package.json>.spellbook.log-level=info
    A package.json variable that sets the default log level to use for all videojs-spellbook
    binaries. Can be set to fatal, error, warn, info, verbose, debug, or none.

  <package.json>.spellbook.css='{}'
    CSS configuration to use in spellbook. If this is set to a false value then css
    linting will never be attempted.

  <package.json>.spellbook.css.src='src/css'
    Source directory to use for css files, set in package.json. If this is unset
    'src/css' will be used. If this directory does not exist css will not be linted.

## SEE ALSO

  sb-lint-css-all(1), sb-lint-css-css(1), sb-lint-css-sass(1)

## EXIT

  0 - all commands succeeded
  1 - one or more sub-command failed

## Spellbook

  Part of the sb(1) suite
