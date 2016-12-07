# sb-test-node-require(1) - Test that your package is requireable in node and that it exports something

## SYNOPSIS

  sb-test-node-require [-l, --log-level <level>] [-h,--help] [-q,--quiet] [-V,--version]
                       [-w, --watch] [-nb, --no-build] [-nl, --no-lint]

## DESCRIPTION

  This binary does the following:
    1. Build a `node-require.js` file in a 'dist/test'. This file will exit with
       error codes if it failes to require your package or if your package does not export anything.
    2. Run the file in node and get the exit code
    3. If the exit code is a failure we will interpret wether it is a warning or a failure and report that to the user.
    4. Remove the `node-require.js` file on exit.

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
    Watch unit test dist files for changes and re-run/re-load tests.

  -nb, --no-build
    Do not build before testing.

  -nl, --no-lint
    Do not lint before testing.

## EXAMPLES

  Get the current version of spellbook

    sb-test-node-require -V
    sb-test-node-require --version

  Get help for this binary

    sb-test-node-require --help
    sb-test-node-require -h

  Set the log level for this binary

    sb-test-node-require -l info
    sb-test-node-require -l fatal
    sb-test-node-require --log-level debug
    sb-test-node-require --log-level error

  Dont output anything

    sb-test-node-require -q
    sb-test-node-require -quiet

  Watch for changes and re-load/re-run tests

    sb-test-node-require -w
    sb-test-node-require --watch

  Do not build before testing

    sb-test-node-require -nb
    sb-test-node-require --no-build

  Do not lint before testing

    sb-test-node-require -nl
    sb-test-node-require --no-lint

## ENVIRONMENT AND CONFIGURATION VARIABLES

  SB_LOG_LEVEL='info'
    An enviornment variable that sets the log level to use for all videojs-spellbook
    binaries. Can be set to fatal, error, warn, info, verbose, debug, or none.

  <package.json>.spellbook.log-level=info
    A package.json variable that sets the default log level to use for all videojs-spellbook
    binaries. Can be set to fatal, error, warn, info, verbose, debug, or none.

## SEE ALSO

  sb-test-node(1), sb-test-node-all(1)

## EXIT

  0 - all commands succeeded
  1 - one or more sub-command failed

## Spellbook

  Part of the sb(1) suite
