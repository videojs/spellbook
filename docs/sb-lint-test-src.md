# sb-lint-test-src(1) - Lint es6 js test assets for a project

## SYNOPSIS

  sb-lint-test-src [-l, --log-level <level>] [-h,--help] [-q,--quiet] [-V,--version]
                   [-w, --watch] [-e, --errors] [-f, --fix]
                   [glob-or-file="<test-src>/**/*.test.js"]

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

  <glob-or-file="<test-src>/**/*.test.js">
    The file or glob to lint. By default "<test-src>/**/*.test.js" is linted. <test-src> is the
    source listed for js in package.json or 'test/' by default.

## EXAMPLES

  Get the current version of spellbook

    sb-lint-test-src -V
    sb-lint-test-src --version

  Get help for this binary

    sb-lint-test-src --help
    sb-lint-test-src -h

  Set the log level for this binary

    sb-lint-test-src -l info
    sb-lint-test-src -l fatal
    sb-lint-test-src --log-level debug
    sb-lint-test-src --log-level error

  Dont output anything

    sb-lint-test-src -q
    sb-lint-test-src -quiet

  Watch files for changes and lint again once they change

    sb-lint-test-src -w
    sb-lint-test-src --watch

  Only log errors, do not log warnings.

    sb-lint-test-src -e
    sb-lint-test-src --errors

  lint a specific glob or file.

    sb-lint-test-src some-js-file.js
    sb-lint-test-src js/**/*.js

## ENVIRONMENT AND CONFIGURATION VARIABLES

  SB_LOG_LEVEL='info'
    An enviornment variable that sets the log level to use for all videojs-spellbook
    binaries. Can be set to fatal, error, warn, info, verbose, debug, or none.

  <package.json>.spellbook.log-level=info
    A package.json variable that sets the default log level to use for all videojs-spellbook
    binaries. Can be set to fatal, error, warn, info, verbose, debug, or none.

  <package.json>.spellbook.test='{}'
    Test configuration to use in spellbook. If this is set to a false value then test
    linting will use the default values.

  <package.json>.spellbook.test.src='test/'
    Source directory to use for js files, set in package.json. If this is unset
    'test/' will be used. If this directory does not exist test linting will fail.

## SEE ALSO

  sb-lint-test(1), sb-lint-test-all(1)

## EXIT

  0 - all commands succeeded
  1 - The linter returned errors

## Spellbook

  Part of the sb(1) suite
