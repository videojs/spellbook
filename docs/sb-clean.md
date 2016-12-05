# sb-clean(1) - Clean the dist folder and any npm-debug.log files

## SYNOPSIS

  sb-clean [-l, --log-level <level>] [-h,--help] [-q,--quiet] [-V,--version]
           [-d, --dry-run]

## DESCRIPTION

  This can be run standalone or will automatically be run by various binaries. It removes the
  root dist folder and any pesky npm-debug.logs in the project directory.

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

  -d, --dry-run
    Do not remove anything, only print what would have been removed

## EXAMPLES

  Get the current version of spellbook

    sb-clean -V
    sb-clean --version

  Get help for this binary

    sb-clean --help
    sb-clean -h

  Set the log level for this binary

    sb-clean -l info
    sb-clean -l fatal
    sb-clean --log-level debug
    sb-clean --log-level error

  Dont output anything

    sb-clean -q
    sb-clean -quiet

  Don't actually delete anything

    sb-clean -d
    sb-clean --dry-run

## ENVIRONMENT AND CONFIGURATION VARIABLES

  SB_LOG_LEVEL='info'
    An enviornment variable that sets the log level to use for all videojs-spellbook
    binaries. Can be set to fatal, error, warn, info, verbose, debug, or none.

  <package.json>.spellbook.log-level=info
    A package.json variable that sets the default log level to use for all videojs-spellbook
    binaries. Can be set to fatal, error, warn, info, verbose, debug, or none.

## SEE ALSO

  sb(1)

## EXIT

  0 - all commands succeeded
  1 - one or more sub-command failed

## Spellbook

  Part of the sb(1) suite
