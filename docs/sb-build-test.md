# sb-build-test(1) - Build Unit tests files for a project

## SYNOPSIS

  sb-build-test [-l, --log-level <level>] [-h,--help] [-q,--quiet] [-V,--version]
                [<sub-command='all'> [<args...>]] [help <sub-command>]

## DESCRIPTION

  Run one following sub commands for test builds
    * browser - see sb-build-test-browser(1)
    * bundlers - see sb-build-test-bundlers(1)
    * all - see sb-build-test-all(1)

  By default if no command is passed in `sb-build-test` will be run as if it was
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
    Get help for a sub-command, this is an alias for running `sb-build-test <sub-command> --help`.

## EXAMPLES

  Build test assets with sub command

    sb-build-test browser [<args...>]
    sb-build-test bundlers [<args...>]
    sb-build-test all [<args...>]

  Get help for a command

    sb-build-test help browser
    sb-build-test help bundlers
    sb-build-test all --help

  Get the current version of spellbook

    sb-build-test -V
    sb-build-test --version

  Get help for this binary

    sb-build-test --help
    sb-build-test -h

  Set the log level for this binary

    sb-build-test -l info
    sb-build-test -l fatal
    sb-build-test --log-level debug
    sb-build-test --log-level error

  Dont output anything

    sb-build-test -q
    sb-build-test -quiet

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

  <package.json>.spellbook.test='{}'
    test configuration to use in spellbook. If this is set to a false value then test
    builds will never be attempted.

  <package.json>.spellbook.test.src='test/'
    Source directory to use for test files, set in package.json. If this is unset
    'test/' will be used. If this directory does not exist test will not be built.

  <package.json>.spellbook.js='{}'
    JS configuration to use in spellbook. If this is set to a false value
    then bundler builds will never be attempted.

  <package.json>.spellbook.js.src='src/js'
    Source directory to use for docs files, set in package.json. If this is unset
    'src/js' will be used. If this directory does not exist bundlers docs will not be built.

## SEE ALSO

  sb-build-all(1), sb-build(1), sb-build-test-all(1), sb-build-test-browser(1),
  sb-build-test-bundlers(1)

## EXIT

  0 - all commands succeeded
  1 - one or more sub-command failed

## Spellbook

  Part of the sb(1) suite
