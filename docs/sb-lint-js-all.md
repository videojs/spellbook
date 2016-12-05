# sb-lint-js-all(1) - Lint all js assets for a project

## SYNOPSIS

  sb-lint-js-all [-l, --log-level <level>] [-h,--help] [-q,--quiet] [-V,--version]
                 [-w, --watch] [-e, --errors] [-f, --fix]

## DESCRIPTION

  This is run when sb-lint-js(1) is not passed any arguments or is passed all
  as the command to run.

  This will lint all js source files. See sb-lint-js-src(1) for more info.

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
    Watch files for changes and re-lint on file change.
    Errors during linting with this active will not exit.

  -e, --errors
    Only log linting errors. Will not log any linting warnings.

  -f, --fix
    Automatically fix semantic errors where possible. This does not work
    for every binary!

## EXAMPLES

  Get the current version of spellbook

    sb-lint-js-all -V
    sb-lint-js-all --version

  Get help for this binary

    sb-lint-js-all --help
    sb-lint-js-all -h

  Set the log level for this binary

    sb-lint-js-all -l info
    sb-lint-js-all -l fatal
    sb-lint-js-all --log-level debug
    sb-lint-js-all --log-level error

  Dont output anything

    sb-lint-js-all -q
    sb-lint-js-all -quiet

  Watch files for changes and lint again once they change

    sb-lint-js-all -w
    sb-lint-js-all --watch

  Fix any errors/warnings that can be fixed automatically

    sb-lint-js-all -f
    sb-lint-js-all --fix

  Only log errors, do not log warnings.

    sb-lint-js-all -e
    sb-lint-js-all --errors

## ENVIRONMENT AND CONFIGURATION VARIABLES

  SB_LOG_LEVEL='info'
    An enviornment variable that sets the log level to use for all videojs-spellbook
    binaries. Can be set to fatal, error, warn, info, verbose, debug, or none.

  <package.json>.spellbook.log-level=info
    A package.json variable that sets the default log level to use for all videojs-spellbook
    binaries. Can be set to fatal, error, warn, info, verbose, debug, or none.

  <package.json>.spellbook.js='{}'
    JS configuration to use in spellbook. If this is set to a false value then js
    linting will never be attempted.

  <package.json>.spellbook.css.src='src/js'
    Source directory to use for js files, set in package.json. If this is unset
    'src/js' will be used. If this directory does not exist js will not be linted.

## SEE ALSO

  sb-lint-js-src(1), sb-lint-js(1)

## EXIT

  0 - all commands succeeded
  1 - One or more linters had an error

## Spellbook

  Part of the sb(1) suite
