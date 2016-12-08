# sb-build-js-node(1) - Build javascript assets for use in nodejs

## SYNOPSIS

  sb-build-js-node [-l, --log-level <level>] [-h,--help] [-q,--quiet] [-V,--version]
                   [-w, --watch] [-d, --dist <dist-dir='dist/es5'>]
                   [<src-dir='${pkg.spellbook.js.src}'|'src/js'>]

## DESCRIPTION

  Use babel to convert the entire es6 js directory (<src-dir>) into an es5 js directory
  (<dist-dir>) so that it can be used by nodejs on npm. Respects <pkg.spellbook.ie8>.

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

  -d, --dist <dist-dir='dist/es5'>
    Write to a specific dist-dir. Defaults to 'dist/es5'

  <src-dir='${pkg.spellbook.js.src}'|'src/js'>
    Read from a specefic <src-dir> instead of `${pkg.spellbook.js.src}` or
    the default of `src/js`

## EXAMPLES

  Get the current version of spellbook

    sb-build-js-node -V
    sb-build-js-node --version

  Get help for this binary

    sb-build-js-node --help
    sb-build-js-node -h

  Set the log level for this binary

    sb-build-js-node -l info
    sb-build-js-node -l fatal
    sb-build-js-node --log-level debug
    sb-build-js-node --log-level error

  Dont output anything

    sb-build-js-node -q
    sb-build-js-node -quiet

  Incrementally rebuild

    sb-build-js-node --watch
    sb-build-js-node -w

  Non default source directory

    sb-build-js-node src/node
    sb-build-js-node src/js/node

  Non default dist directory

    sb-build-js-node --dist dist/node
    sb-build-js-node -d dist/js

## ENVIRONMENT AND CONFIGURATION VARIABLES

  SB_LOG_LEVEL='info'
    An enviornment variable that sets the log level to use for all videojs-spellbook
    binaries. Can be set to fatal, error, warn, info, verbose, debug, or none.

  <package.json>.spellbook.log-level=info
    A package.json variable that sets the default log level to use for all videojs-spellbook
    binaries. Can be set to fatal, error, warn, info, verbose, debug, or none.

  <package.json>.spellbook.ie8=false
    Make sure that IE8 is supported. Defaults to false.

  <package.json>.spellbook.js='{}'
    This setting will be ignored by this binary.

  <package.json>.spellbook.js.src='src/js'
    Source directory to use for js files, set in package.json. If this is unset
    'src/js' will be used. If this directory does not exist and is set, build will fail.

## SEE ALSO

  sb-build-js(1), sb-build-js-all(1)

## EXIT

  0 - all commands succeeded
  1 - one or more sub-command failed

## Spellbook

  Part of the sb(1) suite
