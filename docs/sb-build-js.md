# sb-build-js(1) - Build javascipt assets for a project

## SYNOPSIS

  sb-build-js [-l, --log-level <level>] [-h,--help] [-q,--quiet] [-V,--version]
               [<sub-command='all'> [<args...>]] [help <sub-command>]

## DESCRIPTION

  Run one of the following sub commands for js builds
    * node - see sb-build-js-node(1)
    * browser - see sb-build-js-browser(1)
    * all - see sb-build-js-all(1)

  By default if no command is passed in `sb-build-js` will be run as if it was
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
    Get help for a sub-command, this is an alias for running `sb-build-js <sub-command> --help`.

## EXAMPLES

  Build js assets with sub command

    sb-build-js node [<args...>]
    sb-build-js browser [<args...>]
    sb-build-js all [<args...>]

  Get help for a command

    sb-build-js help node
    sb-build-js help browser
    sb-build-js all --help

  Get the current version of spellbook

    sb-build-js -V
    sb-build-js --version

  Get help for this binary

    sb-build-js --help
    sb-build-js -h

  Set the log level for this binary

    sb-build-js -l info
    sb-build-js -l fatal
    sb-build-js --log-level debug
    sb-build-js --log-level error

  Dont output anything

    sb-build-js -q
    sb-build-js -quiet

## ENVIRONMENT AND CONFIGURATION VARIABLES

  SB_LOG_LEVEL='info'
    An enviornment variable that sets the log level to use for all videojs-spellbook
    binaries. Can be set to fatal, error, warn, info, verbose, debug, or none.

  <package.json>.spellbook.log-level=info
    A package.json variable that sets the default log level to use for all videojs-spellbook
    binaries. Can be set to fatal, error, warn, info, verbose, debug, or none.

  <package.json>.spellbook.js={}
    JS configuration to use in spellbook. If this is set to a false value then js
    builds will never be attempted.

  <package.json>.spellbook.js.src
    package.json spellbook configuration for the default js source directory. Changes the default
    from `src/js` to whatever is specified.

  <package.json>.spellbook.ie8=false
    Make sure that IE8 is supported. Defaults to false.

  <package.json>.spellbook.shimVideojs=true
    Makes sure that video.js is included in unit tests but will not be bundled into
    distribution js files. Defaults to true.

## SEE ALSO

  sb-build-all(1), sb-build(1), sb-build-js-all(1), sb-build-js-node(1),
  sb-build-js-browser(1)

## EXIT

  0 - all commands succeeded
  1 - one or more sub-command failed

## Spellbook

  Part of the sb(1) suite
