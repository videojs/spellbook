# sb-build-css(1) - Build css assets for a project

## SYNOPSIS

  sb-build-css [-l, --log-level <level>] [-h,--help] [-q,--quiet] [-V,--version]
               [<sub-command='all'> [<args...>]] [help <sub-command>]

## DESCRIPTION

  Run one of the following sub commands for css builds
    * css - see sb-build-css-css(1)
    * sass - see sb-build-css-sass(1)
    * all - see sb-build-css-all(1)

  By default if no command is passed in `sb-build-css` will be run as if it was
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
    Get help for a sub-command, this is an alias for running `sb-build-css <sub-command> --help`.

## EXAMPLES

  Build css assets with sub command

    sb-build-css css [<args...>]
    sb-build-css sass [<args...>]
    sb-build-css all [<args...>]

  Get help for a command

    sb-build-css help css
    sb-build-css help sass
    sb-build-css all --help

  Get the current version of spellbook

    sb-build-css -V
    sb-build-css --version

  Get help for this binary

    sb-build-css --help
    sb-build-css -h

  Set the log level for this binary

    sb-build-css -l info
    sb-build-css -l fatal
    sb-build-css --log-level debug
    sb-build-css --log-level error

  Dont output anything

    sb-build-css -q
    sb-build-css -quiet

## ENVIRONMENT AND CONFIGURATION VARIABLES

  SB_LOG_LEVEL='info'
    An enviornment variable that sets the log level to use for all videojs-spellbook
    binaries. Can be set to fatal, error, warn, info, verbose, debug, or none.

  <package.json>.spellbook.log-level=info
    A package.json variable that sets the default log level to use for all videojs-spellbook
    binaries. Can be set to fatal, error, warn, info, verbose, debug, or none.

  <package.json>.spellbook.css={}
    CSS configuration to use in spellbook. If this is set to a false value then css
    builds will never be attempted.

  <package.json>.spellbook.css.src
    package.json spellbook configuration for the default css source directory. Changes the default
    from `src/css` to whatever is specified.

  <package.json>.spellbook.browserList
    packag.json spellbook configuration to override the default browserList of
    `['> 1%', 'last 4 versions', 'Firefox ESR']` with a custom browser list.
    See https://github.com/ai/browserslist for more information.

## SEE ALSO

  sb-build-all(1), sb-build(1), sb-build-css-all(1), sb-build-css-sass(1),
  sb-build-css-css(1)

## EXIT

  0 - all commands succeeded
  1 - one or more sub-command failed

## Spellbook

  Part of the sb(1) suite
