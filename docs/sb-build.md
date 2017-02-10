# sb-build(1) - Build assets for a project

## SYNOPSIS

  sb-build [-l, --log-level <level>] [-h,--help] [-q,--quiet] [-V,--version]
           [<sub-command='all'> [<args...>]] [help <sub-command>]

## DESCRIPTION

  Potentially build all or one of the following through sub-binaries:
    * css - see sb-build-css(1)
    * js - see sb-build-js(1)
    * lang - see sb-build-lang(1)
    * test - see sb-build-test(1)
    * docs - see sb-build-docs(1)
    * all - see sb-build-all(1)

  By default if no command is passed in `sb-build` will be run as if it was
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
    Get help for a sub-command, this is an alias for running `sb-build <sub-command> --help`.

## EXAMPLES

  Build specific assets

    sb-build js [<args...>]
    sb-build css [<args...>]
    sb-build lang [<args...>]
    sb-build docs [<args...>]
    sb-build test [<args...>]
    sb-build all [<args...>]

  Get help for a command

    sb-build help js
    sb-build help docs
    sb-build all --help
    sb-build css --help

  Get the current version of spellbook

    sb-build -V
    sb-build --version

  Get help for this binary

    sb-build --help
    sb-build -h

  Set the log level for this binary

    sb-build -l info
    sb-build -l fatal
    sb-build --log-level debug
    sb-build --log-level error

  Dont output anything

    sb-build -q
    sb-build -quiet

## ENVIRONMENT AND CONFIGURATION VARIABLES

  SB_LOG_LEVEL='info'
    An enviornment variable that sets the log level to use for all videojs-spellbook
    binaries. Can be set to fatal, error, warn, info, verbose, debug, or none.

  <package.json>.spellbook.log-level=info
    A package.json variable that sets the default log level to use for all videojs-spellbook
    binaries. Can be set to fatal, error, warn, info, verbose, debug, or none.

  <package.json>.spellbook.ie8=false
    Should spellbook make sure that IE8 is supported. Defaults to false.

  <package.json>.spellbook.shimVideojs=true
    Makes sure that video.js is included in unit tests but will not be bundled into
    distribution js files. Defaults to true.

  <package.json>.spellbook.css='{}'
    CSS configuration to use in spellbook. If this is set to a false value then css
    builds will never be attempted.

  <package.json>.spellbook.css.src='src/css'
    Source directory to use for css files, set in package.json. If this is unset
    'src/css' will be used. If this directory does not exist css will not be built.

  <package.json>.spellbook.js='{}'
    JS configuration to use in spellbook. If this is set to a false value then js
    builds will never be attempted.

  <package.json>.spellbook.js.src='src/js'
    Source directory to use for js files, set in package.json. If this is unset
    'src/js' will be used. If this directory does not exist js will not be built.

  <package.json>.spellbook.lang='{}'
    Lang configuration to use in spellbook. If this is set to a false value then lang
    builds will never be attempted.

  <package.json>.spellbook.lang.src='lang/'
    Source directory to use for lang files, set in package.json. If this is unset
    'lang/' will be used. If this directory does not exist lang will not be built.

  <package.json>.spellbook.docs='{}'
    Documentation configuration to use in spellbook. If this is set to a false value
    then docs builds will never be attempted.

  <package.json>.spellbook.docs.src='docs/'
    Source directory to use for docs files, set in package.json. If this is unset
    'docs/' will be used. If this directory does not exist docs will not be built.

  <package.json>.spellbook.test='{}'
    Test configuration to use in spellbook. If this is set to a false value
    then test builds will never be attempted.

  <package.json>.spellbook.test.src='test/'
    Source directory to use for test files, set in package.json. If this is unset
    'test/' will be used. If this directory does not exist tests will not be built.

## SEE ALSO

  sb-build-all(1), sb-build-js(1), sb-build-css(1), sb-build-lang(1),
  sb-build-test(1), sb-build-docs(1)

## EXIT

  0 - all commands succeeded
  1 - one or more sub-command failed

## Spellbook

  Part of the sb(1) suite
