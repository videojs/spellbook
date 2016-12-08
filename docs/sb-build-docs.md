# sb-build-docs(1) - Build documentation for a project

## SYNOPSIS

  sb-build-docs [-l, --log-level <level>] [-h,--help] [-q,--quiet] [-V,--version]
               [<sub-command='all'> [<args...>]] [help <sub-command>]

## DESCRIPTION

  Run one following sub commands for docs builds
    * api - see sb-build-docs-api(1)
    * manual - see sb-build-docs-manual(1)
    * all - see sb-build-docs-all(1)

  By default if no command is passed in `sb-build-docs` will be run as if it was
  passed `all`.

  > NOTE1: API docs generation will fail if js builds are off, or the source folder does not exist
  > NOTE2: all will not run api docs generation if it would fail due to NOTE1

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
    Get help for a sub-command, this is an alias for running `sb-build-docs <sub-command> --help`.

## EXAMPLES

  Build docs assets with sub command

    sb-build-docs api [<args...>]
    sb-build-docs manual [<args...>]
    sb-build-docs all [<args...>]

  Get help for a command

    sb-build-docs help api
    sb-build-docs help manual
    sb-build-docs all --help

  Get the current version of spellbook

    sb-build-docs -V
    sb-build-docs --version

  Get help for this binary

    sb-build-docs --help
    sb-build-docs -h

  Set the log level for this binary

    sb-build-docs -l info
    sb-build-docs -l fatal
    sb-build-docs --log-level debug
    sb-build-docs --log-level error

  Dont output anything

    sb-build-docs -q
    sb-build-docs -quiet

## ENVIRONMENT AND CONFIGURATION VARIABLES

  SB_LOG_LEVEL='info'
    An enviornment variable that sets the log level to use for all videojs-spellbook
    binaries. Can be set to fatal, error, warn, info, verbose, debug, or none.

  <package.json>.spellbook.log-level=info
    A package.json variable that sets the default log level to use for all videojs-spellbook
    binaries. Can be set to fatal, error, warn, info, verbose, debug, or none.

  <package.json>.spellbook.docs='{}'
    Documentation configuration to use in spellbook. If this is set to a false value
    then docs builds will never be attempted.

  <package.json>.spellbook.docs.src='docs/'
    Source directory to use for docs files, set in package.json. If this is unset
    'docs/' will be used. If this directory does not exist docs will not be built.

  <package.json>.spellbook.js='{}'
    JS configuration to use in spellbook. If this is set to a false value
    then api docs builds will never be attempted.

  <package.json>.spellbook.js.src='src/js'
    Source directory to use for docs files, set in package.json. If this is unset
    'src/js' will be used. If this directory does not exist api docs will not be built.

## SEE ALSO

  sb-build-all(1), sb-build(1), sb-build-docs-all(1), sb-build-docs-api(1),
  sb-build-docs-manual(1)

## EXIT

  0 - all commands succeeded
  1 - one or more sub-command failed

## Spellbook

  Part of the sb(1) suite
