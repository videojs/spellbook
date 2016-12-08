# sb-lint-js-src(1) - Lint es6 js assets for a project

## SYNOPSIS

  sb-lint-js-src [-l, --log-level <level>] [-h,--help] [-q,--quiet] [-V,--version]
                 [-w, --watch] [-e, --errors] [-f, --fix] [glob-or-file="<js-src>/**/*.js"]

## DESCRIPTION

  This lints all files under <glob-or-file>.

  This will use eslint internally to lint js. Rules can be found under the videojs-spellbook
  package in configs/eslint.config.js (which inherits from the 'eslint-config-videojs' package on npm)
  or on the web at:
  https://github.com/videojs/spellbook/blob/master/config/stylelint.config.js
  https://github.com/videojs/eslint-config-videojs/blob/master/eslintrc.json

  For more information on the rules visit:
  http://eslint.org/docs/rules/

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
    Fix specific semantic errors with js via eslint.

  <glob-or-file="<js-src>/**/*.js">
    The file or glob to lint. By default "<js-src>/**/*.js" is linted. <js-src> is the
    source listed for js in package.json or 'src/js' by default.

## EXAMPLES

  Get the current version of spellbook

    sb-lint-js-src -V
    sb-lint-js-src --version

  Get help for this binary

    sb-lint-js-src --help
    sb-lint-js-src -h

  Set the log level for this binary

    sb-lint-js-src -l info
    sb-lint-js-src -l fatal
    sb-lint-js-src --log-level debug
    sb-lint-js-src --log-level error

  Dont output anything

    sb-lint-js-src -q
    sb-lint-js-src -quiet

  Watch files for changes and lint again once they change

    sb-lint-js-src -w
    sb-lint-js-src --watch

  Only log errors, do not log warnings.

    sb-lint-js-src -e
    sb-lint-js-src --errors

  lint a specific glob or file.

    sb-lint-js-src some-js-file.js
    sb-lint-js-src js/**/*.js

## ENVIRONMENT AND CONFIGURATION VARIABLES

  SB_LOG_LEVEL='info'
    An enviornment variable that sets the log level to use for all videojs-spellbook
    binaries. Can be set to fatal, error, warn, info, verbose, debug, or none.

  <package.json>.spellbook.log-level=info
    A package.json variable that sets the default log level to use for all videojs-spellbook
    binaries. Can be set to fatal, error, warn, info, verbose, debug, or none.

  <package.json>.spellbook.js='{}'
    JS configuration to use in spellbook. If this is set to a false value then js
    linting will use the default values.

  <package.json>.spellbook.js.src='src/js'
    Source directory to use for js files, set in package.json. If this is unset
    'src/js' will be used. If this directory does not exist js linting will fail.

## SEE ALSO

  sb-lint-js(1), sb-lint-js-all(1)

## EXIT

  0 - all commands succeeded
  1 - The linter returned errors

## Spellbook

  Part of the sb(1) suite
