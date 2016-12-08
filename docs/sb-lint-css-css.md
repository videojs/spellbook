# sb-lint-css-css(1) - Lint vanilla css assets for a project

## SYNOPSIS

  sb-lint-css-css [-l, --log-level <level>] [-h,--help] [-q,--quiet] [-V,--version]
                   [-w, --watch] [-e, --errors] [-f, --fix] [glob-or-file="<css-src>/**/*.css"]

## DESCRIPTION

  This lints all files under <glob-or-file>.

  This will use stylelint internally to lint css. Rules can be found under the videojs-spellbook
  package in configs/stylelint.config.js or on the web at:
  https://github.com/videojs/spellbook/blob/master/config/stylelint.config.js

  For more information on the rules visit:
  http://stylelint.io/user-guide/rules/

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
    This command will not do anything as stylelint does not support it. It is only added so that
    it has the same api as other linting binaries.

  <glob-or-file="<css-src>/**/*.css">
    The file or glob to lint. By default "<css-src>/**/*.css" is linted. <css-src> is the
    source listed for css in package.json or 'src/css' by default.

## EXAMPLES

  Get the current version of spellbook

    sb-lint-css-css -V
    sb-lint-css-css --version

  Get help for this binary

    sb-lint-css-css --help
    sb-lint-css-css -h

  Set the log level for this binary

    sb-lint-css-css -l info
    sb-lint-css-css -l fatal
    sb-lint-css-css --log-level debug
    sb-lint-css-css --log-level error

  Dont output anything

    sb-lint-css-css -q
    sb-lint-css-css -quiet

  Watch files for changes and lint again once they change

    sb-lint-css-css -w
    sb-lint-css-css --watch

  Only log errors, do not log warnings.

    sb-lint-css-css -e
    sb-lint-css-css --errors

  lint a specific glob or file.

    sb-lint-css-css some-css-file.css
    sb-lint-css-css css/**/*.css

## ENVIRONMENT AND CONFIGURATION VARIABLES

  SB_LOG_LEVEL='info'
    An enviornment variable that sets the log level to use for all videojs-spellbook
    binaries. Can be set to fatal, error, warn, info, verbose, debug, or none.

  <package.json>.spellbook.log-level=info
    A package.json variable that sets the default log level to use for all videojs-spellbook
    binaries. Can be set to fatal, error, warn, info, verbose, debug, or none.

  <package.json>.spellbook.css='{}'
    CSS configuration to use in spellbook. If this is set to a false value this binary
    will be run with defaults but still run.

  <package.json>.spellbook.css.src='src/css'
    Source directory to use for css files, set in package.json. If this is unset
    'src/css' will be used. If this directory does not exist css linting will fail.

## SEE ALSO

  sb-lint-css(1), sb-lint-css-all(1)

## EXIT

  0 - all commands succeeded
  1 - The linter returned errors

## Spellbook

  Part of the sb(1) suite
