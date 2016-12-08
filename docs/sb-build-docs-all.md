# sb-build-docs-all(1) - Build all documentation for a project

## SYNOPSIS

  sb-build-docs-all [-l, --log-level <level>] [-h,--help] [-q,--quiet] [-V,--version]
                    [-w, --watch]

## DESCRIPTION

  Build all of the following:
    * manual docs - see sb-build-docs-manual(1)
    * api docs - see sb-build-docs-api(1)

  > NOTE: If js builds are turned off or js src folder does not exist, api docs will not be built.

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

    sb-build-docs-all -V
    sb-build-docs-all --version

  Get help for this binary

    sb-build-docs-all --help
    sb-build-docs-all -h

  Set the log level for this binary

    sb-build-docs-all -l info
    sb-build-docs-all -l fatal
    sb-build-docs-all --log-level debug
    sb-build-docs-all --log-level error

  Dont output anything

    sb-build-docs-all -q
    sb-build-docs-all -quiet

  Incrementally rebuild

    sb-build-docs-all --watch
    sb-build-docs-all -w

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

  <package.json>.spellbook.js='{}'
    JS configuration to use in spellbook. If this is set to a false value
    then bundler builds will never be attempted.

  <package.json>.spellbook.js.src='src/js'
    Source directory to use for docs files, set in package.json. If this is unset
    'src/js' will be used. If this directory does not exist bundlers docs will not be built.

## SEE ALSO

  sb-build-docs(1), sb-build-docs-manual(1), sb-build-docs-api(1)

## EXIT

  0 - all commands succeeded
  1 - one or more sub-command failed

## Spellbook

  Part of the sb(1) suite
