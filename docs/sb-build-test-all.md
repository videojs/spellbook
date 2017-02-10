# sb-build-test-all(1) - Build all unit test files for a project

## SYNOPSIS

  sb-build-test-all [-l, --log-level <level>] [-h,--help] [-q,--quiet] [-V,--version]
                    [-w, --watch]

## DESCRIPTION

  Build all of the following:
    * bundles - see sb-build-test-bundles(1)
    * browser - see sb-build-test-browser(1)

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
    Watch files for changes and incrementally rebuild on file change.
    Failed builds with this active will not exit.

## EXAMPLES

  Get the current version of spellbook

    sb-build-test-all -V
    sb-build-test-all --version

  Get help for this binary

    sb-build-test-all --help
    sb-build-test-all -h

  Set the log level for this binary

    sb-build-test-all -l info
    sb-build-test-all -l fatal
    sb-build-test-all --log-level debug
    sb-build-test-all --log-level error

  Dont output anything

    sb-build-test-all -q
    sb-build-test-all -quiet

  Incrementally rebuild

    sb-build-test-all --watch
    sb-build-test-all -w

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

  sb-build-test(1), sb-build-test-browser(1), sb-build-test-bundles(1)

## EXIT

  0 - all commands succeeded
  1 - one or more sub-command failed

## Spellbook

  Part of the sb(1) suite
