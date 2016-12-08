# sb-lint-test-all(1) - Lint all test assets for a project

## SYNOPSIS

  sb-lint-test-all [-l, --log-level <level>] [-h,--help] [-q,--quiet] [-V,--version]
                   [-w, --watch] [-e, --errors] [-f, --fix]

## DESCRIPTION

  This is run when sb-lint-test(1) is not passed any arguments or is passed all
  as the command to run.

  This command will lint all test javascript files via sb-lint-test-src(1)

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
    This will use eslint to fix issues with javascript where possible.

## EXAMPLES

  Get the current version of spellbook

    sb-lint-test-all -V
    sb-lint-test-all --version

  Get help for this binary

    sb-lint-test-all --help
    sb-lint-test-all -h

  Set the log level for this binary

    sb-lint-test-all -l info
    sb-lint-test-all -l fatal
    sb-lint-test-all --log-level debug
    sb-lint-test-all --log-level error

  Dont output anything

    sb-lint-test-all -q
    sb-lint-test-all -quiet

  Watch files for changes and lint again once they change

    sb-lint-test-all -w
    sb-lint-test-all --watch

  Fix any errors/warnings that can be fixed automatically

    sb-lint-test-all -f
    sb-lint-test-all --fix

  Only log errors, do not log warnings.

    sb-lint-test-all -e
    sb-lint-test-all --errors

## ENVIRONMENT AND CONFIGURATION VARIABLES

  SB_LOG_LEVEL='info'
    An enviornment variable that sets the log level to use for all videojs-spellbook
    binaries. Can be set to fatal, error, warn, info, verbose, debug, or none.

  <package.json>.spellbook.log-level=info
    A package.json variable that sets the default log level to use for all videojs-spellbook
    binaries. Can be set to fatal, error, warn, info, verbose, debug, or none.

  <package.json>.spellbook.test='{}'
    Test configuration to use in spellbook. If this is set to a false value then test
    linting will never be attempted.

  <package.json>.spellbook.test.src='test/'
    Source directory to use for test files, set in package.json. If this is unset
    'test/' will be used. If this directory does not exist tests will not be linted.

## SEE ALSO

  sb-lint-test-src(1), sb-lint-test(1)

## EXIT

  0 - all commands succeeded
  1 - one or more sub-command failed, unless --watch is active

## Spellbook

  Part of the sb(1) suite
