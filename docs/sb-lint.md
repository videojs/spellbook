# sb-lint(1) - Lint assets for a project

## SYNOPSIS

  sb-lint [-l, --log-level <level>] [-h,--help] [-q,--quiet] [-V,--version]
           [<sub-command='all'> [<args...>]] [help <sub-command>]

## DESCRIPTION

  Potentially lint all or one of the following through sub-binaries:
    * css - see sb-lint-css(1)
    * js - see sb-lint-js(1)
    * lang - see sb-lint-lang(1)
    * test - see sb-lint-test(1)
    * docs - see sb-lint-docs(1)
    * all - see sb-lint-all(1)

  By default if no command is passed in `sb-lint` will be run as if it was
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
    Get help for a sub-command, this is an alias for running `sb-lint <sub-command> --help`.

## EXAMPLES

  lint specific assets assets

    sb-lint js [<args...>]
    sb-lint css [<args...>]
    sb-lint lang [<args...>]
    sb-lint docs [<args...>]
    sb-lint test [<args...>]
    sb-lint all [<args...>]

  Get help for a command

    sb-lint help js
    sb-lint help docs
    sb-lint all --help
    sb-lint css --help

  Get the current version of spellbook

    sb-lint -V
    sb-lint --version

  Get help for this binary

    sb-lint --help
    sb-lint -h

  Set the log level for this binary

    sb-lint -l info
    sb-lint -l fatal
    sb-lint --log-level debug
    sb-lint --log-level error

  Dont output anything

    sb-lint -q
    sb-lint -quiet

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

  sb-lint-all(1), sb-lint-js(1), sb-lint-css(1), sb-lint-lang(1),
  sb-lint-test(1), sb-lint-docs(1)

## EXIT

  0 - all commands succeeded
  1 - one or more sub-command failed

## Spellbook

  Part of the sb(1) suite
