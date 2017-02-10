# sb-build-js-all(1) - Build all javascipt assets for a project

## SYNOPSIS

  sb-build-js-all [-l, --log-level <level>] [-h,--help] [-q,--quiet] [-V,--version]
                  [-w, --watch]

## DESCRIPTION

  Build all of the following:
    * browser js - see sb-build-js-browser(1)
    * node.js - see sb-build-js-node(1)

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

    sb-build-js-all -V
    sb-build-js-all --version

  Get help for this binary

    sb-build-js-all --help
    sb-build-js-all -h

  Set the log level for this binary

    sb-build-js-all -l info
    sb-build-js-all -l fatal
    sb-build-js-all --log-level debug
    sb-build-js-all --log-level error

  Dont output anything

    sb-build-js-all -q
    sb-build-js-all -quiet

  Incrementally rebuild

    sb-build-js-all --watch
    sb-build-js-all -w

## ENVIRONMENT AND CONFIGURATION VARIABLES

  SB_LOG_LEVEL='info'
    An enviornment variable that sets the log level to use for all videojs-spellbook
    binaries. Can be set to fatal, error, warn, info, verbose, debug, or none.

  <package.json>.spellbook.log-level=info
    A package.json variable that sets the default log level to use for all videojs-spellbook
    binaries. Can be set to fatal, error, warn, info, verbose, debug, or none.

  <package.json>.spellbook.js='{}'
    JS configuration to use in spellbook. If this is set to a false value
    then js builds will never be attempted.

  <package.json>.spellbook.js.src='src/js'
    Source directory to use for js files, set in package.json. If this is unset
    'src/js' will be used. If this directory does not exist js will not be built.

  <package.json>.spellbook.ie8=false
    Make sure that IE8 is supported. Defaults to false.

  <package.json>.spellbook.shimVideojs=true
    Makes sure that video.js is included in unit tests but will not be bundled into
    distribution js files. Defaults to true.

## SEE ALSO

  sb-build-js(1), sb-build-js-node(1), sb-build-js-browser(1)

## EXIT

  0 - all commands succeeded
  1 - one or more sub-command failed

## Spellbook

  Part of the sb(1) suite
