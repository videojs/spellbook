# sb-lint-css-sass(1) - Lint sass assets for a project

## SYNOPSIS

  sb-lint-css-sass [-l, --log-level <level>] [-h,--help] [-q,--quiet] [-V,--version]
                   [-w, --watch] [-e, --errors] [-f, --fix] [glob-or-file="<css-src>/**/*.{sass,scss}"]

## DESCRIPTION

  This lints all files under <glob-or-file>.

  This will use stylelint internally to lint sass. Rules can be found under the videojs-spellbook
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

  <glob-or-file="<css-src>/**/*.{sass,scss}">
    The file or glob to lint. By default "<css-src>/**/*.{sass,scss}" is linted. <css-src> is the
    source listed for css in package.json or 'src/css' by default.

## EXAMPLES

  Get the current version of spellbook

    sb-lint-css-sass -V
    sb-lint-css-sass --version

  Get help for this binary

    sb-lint-css-sass --help
    sb-lint-css-sass -h

  Set the log level for this binary

    sb-lint-css-sass -l info
    sb-lint-css-sass -l fatal
    sb-lint-css-sass --log-level debug
    sb-lint-css-sass --log-level error

  Dont output anything

    sb-lint-css-sass -q
    sb-lint-css-sass -quiet

  Watch files for changes and lint again once they change

    sb-lint-css-sass -w
    sb-lint-css-sass --watch

  Only log errors, do not log warnings.

    sb-lint-css-sass -e
    sb-lint-css-sass --errors

  lint a specific glob or file.

    sb-lint-css-sass some-sass-file.scss
    sb-lint-css-sass css/**/*.sass

## ENVIRONMENT AND CONFIGURATION VARIABLES

  SB_LOG_LEVEL='info'
    An enviornment variable that sets the log level to use for all videojs-spellbook
    binaries. Can be set to fatal, error, warn, info, verbose, debug, or none.

  <package.json>.spellbook.log-level=info
    A package.json variable that sets the default log level to use for all videojs-spellbook
    binaries. Can be set to fatal, error, warn, info, verbose, debug, or none.

  <package.json>.spellbook.css='{}'
    CSS configuration to use in spellbook. If this is set to a false value then this binary
    will be run with defaults.

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
