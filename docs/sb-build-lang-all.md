# sb-build-lang-all(1) - Build all languages for a project

## SYNOPSIS

  sb-build-lang-all [-l, --log-level <level>] [-h,--help] [-q,--quiet] [-V,--version]
                    [-w, --watch]

## DESCRIPTION

  Build all of the following:
    * lang - see sb-build-lang-copy(1)

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

  -w, --watch
    Watch files for changes and incrementally rebuild on file change.
    Failed builds with this active will not exit.

## EXAMPLES

  Get the current version of spellbook

    sb-build-lang-all -V
    sb-build-lang-all --version

  Get help for this binary

    sb-build-lang-all --help
    sb-build-lang-all -h

  Set the log level for this binary

    sb-build-lang-all -l info
    sb-build-lang-all -l fatal
    sb-build-lang-all --log-level debug
    sb-build-lang-all --log-level error

  Dont output anything

    sb-build-lang-all -q
    sb-build-lang-all -quiet

  Incrementally rebuild

    sb-build-lang-all --watch
    sb-build-lang-all -w

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

  sb-build-lang(1), sb-build-lang-copy(1)

## EXIT

  0 - all commands succeeded
  1 - one or more sub-command failed

## Spellbook

  Part of the sb(1) suite
