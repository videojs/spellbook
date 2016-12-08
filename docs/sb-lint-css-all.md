# sb-lint-css-all(1) - Lint all css assets for a project

## SYNOPSIS

  sb-lint-css-all [-l, --log-level <level>] [-h,--help] [-q,--quiet] [-V,--version]
              [-w, --watch] [-e, --errors] [-f, --fix]

## DESCRIPTION

  This is run when sb-lint-css(1) is not passed any arguments or is passed all
  as the command to run.

  This command will lint css and sass if it exists, unlike the sb-build-css-all(1)
  counterpart.

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
    This will do nothing as the internal linter stylelint does not support it.

## EXAMPLES

  Get the current version of spellbook

    sb-lint-css-all -V
    sb-lint-css-all --version

  Get help for this binary

    sb-lint-css-all --help
    sb-lint-css-all -h

  Set the log level for this binary

    sb-lint-css-all -l info
    sb-lint-css-all -l fatal
    sb-lint-css-all --log-level debug
    sb-lint-css-all --log-level error

  Dont output anything

    sb-lint-css-all -q
    sb-lint-css-all -quiet

  Watch files for changes and lint again once they change

    sb-lint-css-all -w
    sb-lint-css-all --watch

  Fix any errors/warnings that can be fixed automatically

    sb-lint-css-all -f
    sb-lint-css-all --fix

  Only log errors, do not log warnings.

    sb-lint-css-all -e
    sb-lint-css-all --errors

## ENVIRONMENT AND CONFIGURATION VARIABLES

  SB_LOG_LEVEL='info'
    An enviornment variable that sets the log level to use for all videojs-spellbook
    binaries. Can be set to fatal, error, warn, info, verbose, debug, or none.

  <package.json>.spellbook.log-level=info
    A package.json variable that sets the default log level to use for all videojs-spellbook
    binaries. Can be set to fatal, error, warn, info, verbose, debug, or none.

  <package.json>.spellbook.css='{}'
    CSS configuration to use in spellbook. If this is set to a false value then css
    linting will never be attempted.

  <package.json>.spellbook.css.src='src/css'
    Source directory to use for css files, set in package.json. If this is unset
    'src/css' will be used. If this directory does not exist css will not be linted.

## SEE ALSO

  sb-lint-css-sass(1), sb-lint-css-css(1), sb-lint-css(1)

## EXIT

  0 - all commands succeeded
  1 - one or more sub-command failed, unless --watch is active

## Spellbook

  Part of the sb(1) suite
