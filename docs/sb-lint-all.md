# sb-lint-all(1) - Lint all assets for a project

## SYNOPSIS

  sb-lint-all [-l, --log-level <level>] [-h,--help] [-q,--quiet] [-V,--version]
              [-w, --watch] [-e, --errors] [-f, --fix]

## DESCRIPTION

  This is run when sb-lint(1) is not passed any arguments or is passed all
  as the command to run.

  This command will lint css, js, lang, test, and docs depending on what is available.

  > NOTE: If no commands can be run, an error will be logged and this binary will exit
  >       with a failure return code.

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

    sb-lint-all -V
    sb-lint-all --version

  Get help for this binary

    sb-lint-all --help
    sb-lint-all -h

  Set the log level for this binary

    sb-lint-all -l info
    sb-lint-all -l fatal
    sb-lint-all --log-level debug
    sb-lint-all --log-level error

  Dont output anything

    sb-lint-all -q
    sb-lint-all -quiet

  Watch files for changes and lint again once they change

    sb-lint-all -w
    sb-lint-all --watch

  Fix any errors/warnings that can be fixed automatically

    sb-lint-all -f
    sb-lint-all --fix

  Only log errors, do not log warnings.

    sb-lint-all -e
    sb-lint-all --errors

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

  <package.json>.spellbook.js='{}'
    JS configuration to use in spellbook. If this is set to a false value then js
    linting will never be attempted.

  <package.json>.spellbook.js.src='src/js'
    Source directory to use for js files, set in package.json. If this is unset
    'src/js' will be used. If this directory does not exist js will not be linted.

  <package.json>.spellbook.lang='{}'
    Lang configuration to use in spellbook. If this is set to a false value then lang
    linting will never be attempted.

  <package.json>.spellbook.lang.src='lang/'
    Source directory to use for lang files, set in package.json. If this is unset
    'lang/' will be used. If this directory does not exist lang will not be linted.

  <package.json>.spellbook.docs='{}'
    Documentation configuration to use in spellbook. If this is set to a false value
    then docs linting will never be attempted.

  <package.json>.spellbook.docs.src='docs/'
    Source directory to use for docs files, set in package.json. If this is unset
    'docs/' will be used. If this directory does not exist docs will not be linted.

  <package.json>.spellbook.test='{}'
    Test configuration to use in spellbook. If this is set to a false value
    then test linting will never be attempted.

  <package.json>.spellbook.test.src='test/'
    Source directory to use for test files, set in package.json. If this is unset
    'test/' will be used. If this directory does not exist tests will not be linted.

## SEE ALSO

  sb-build-css-all(1), sb-build-js-all(1), sb-build-docs-all(1), sb-build-lang-all(1),
  sb-build-test-all(1)

## EXIT

  0 - all commands succeeded
  1 - one or more sub-command failed, unless --watch is active

## Spellbook

  Part of the sb(1) suite
