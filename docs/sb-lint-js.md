# sb-lint-js(1) - Lint js assets for a project

## SYNOPSIS

  sb-lint-js [-l, --log-level <level>] [-h,--help] [-q,--quiet] [-V,--version]
             [<sub-command='all'> [<args...>]] [help <sub-command>]

## DESCRIPTION

  Potentially lint all or one of the following through sub-binaries:
    * src - see sb-lint-js-src(1)
    * all - see sb-lint-js-all(1)

  By default if no command is passed in `sb-lint-js` will be run as if it was
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
    Get help for a sub-command, this is an alias for running `sb-lint-js <sub-command> --help`.

## EXAMPLES

  lint specific assets assets

    sb-lint-js all [<args...>]
    sb-lint-js src [<args...>]

  Get help for a command

    sb-lint-js help src
    sb-lint-js help all
    sb-lint-js all --help
    sb-lint-js src --help

  Get the current version of spellbook

    sb-lint-js -V
    sb-lint-js --version

  Get help for this binary

    sb-lint-js --help
    sb-lint-js -h

  Set the log level for this binary

    sb-lint-js -l info
    sb-lint-js -l fatal
    sb-lint-js --log-level debug
    sb-lint-js --log-level error

  Dont output anything

    sb-lint-js -q
    sb-lint-js -quiet

## ENVIRONMENT AND CONFIGURATION VARIABLES

  SB_LOG_LEVEL='info'
    An enviornment variable that sets the log level to use for all videojs-spellbook
    binaries. Can be set to fatal, error, warn, info, verbose, debug, or none.

  <package.json>.spellbook.log-level=info
    A package.json variable that sets the default log level to use for all videojs-spellbook
    binaries. Can be set to fatal, error, warn, info, verbose, debug, or none.

  <package.json>.spellbook.js='{}'
    js configuration to use in spellbook. If this is set to a false value then js
    linting will never be attempted.

  <package.json>.spellbook.js.src='src/js'
    Source directory to use for js files, set in package.json. If this is unset
    'src/js' will be used. If this directory does not exist js will not be linted.

## SEE ALSO

  sb-lint-js-all(1), sb-lint-js-src(1)

## EXIT

  0 - all commands succeeded
  1 - one or more sub-command failed

## Spellbook

  Part of the sb(1) suite
