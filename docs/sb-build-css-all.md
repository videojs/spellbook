# sb-build-css-all(1) - Build all css assets for a project

## SYNOPSIS

  sb-build-css-all [-l, --log-level <level>] [-h,--help] [-q,--quiet] [-V,--version]
                   [-w, --watch]

## DESCRIPTION

  Build one of the following based on directory structure:
    1. vanilla css - see sb-build-css-css(1)
    2. sass - see sb-build-css-sass(1)

  > NOTE: if more than one build could happen the builds will be prioritized by
  >       order in the above list. Once one build happens all other builds will
  >       be skipped.

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

    sb-build-css-all -V
    sb-build-css-all --version

  Get help for this binary

    sb-build-css-all --help
    sb-build-css-all -h

  Set the log level for this binary

    sb-build-css-all -l info
    sb-build-css-all -l fatal
    sb-build-css-all --log-level debug
    sb-build-css-all --log-level error

  Dont output anything

    sb-build-css-all -q
    sb-build-css-all -quiet

  Incrementally rebuild

    sb-build-css-all --watch
    sb-build-css-all -w

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

  sb-build-css(1), sb-build-css-sass(1), sb-build-css-css(1)

## EXIT

  0 - all commands succeeded
  1 - one or more sub-command failed

## Spellbook

  Part of the sb(1) suite
