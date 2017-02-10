# sb-build-test-bundlers(1) - Build Unit tests that verify that your code will work with certain browser bundlers

## SYNOPSIS

  sb-build-test-bundles [-l, --log-level <level>] [-h,--help] [-q,--quiet] [-V,--version]
                        [-w, --watch] [-d, --dist <dist-dir='dist/test'>]
                        [<src-dir='${pkg.spellbook.js.src}'|'src/js'>]

## DESCRIPTION

  Build bundles that test your code using bundlers. These are the steps this binary will take to build
    1. Look for es6 `index.js` in `<src-dir>` or fail if nothing is found
    2. Write QUnit test files to '<dist-dir>' that includes that main file. Currently writes:
      * <dist-dir>/webpack.start.js
      * <dist-dir>/browserify.start.js
    3. Runs browserify on `browserify.start.js` which:
      1. Start watching code changes to generate an internal source map.
      2. ignore video.js if <package.json>.spellbook.shimVideojs is set to true (which is te default)
      3. convert all code to es5 using babelify with ie8 support if <package.json>.spellbook.ie8 is set to true (default)
        is false)
      4. convert '__VERSION__' strings to the package version
      5. browserify all es5 assets into the bundle
      6. bundle-collapse all require paths so that they are 1 character numbers rather than long strings
      7. Write a dist file to <dist-dir>/browserify.test.js
    4. Runs webpack on `webpack.start.js` which:
      1. Start watching code changes to generate an internal source map.
      2. ignore video.js if <package.json>.spellbook.shimVideojs is set to true (which is te default)
      3. convert all code to es5 using babel-loader with ie8 support if <package.json>.spellbook.ie8 is set to true (default)
        is false)
      5. webpackify all es5 assets into the bundle
      7. Write a dist file to <dist-dir>/webpack.test.js
    5. Removes all `*.start.js` files

  > NOTE: During watch mode all steps will run and build failures will not exit this
  >       binary.

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

  -d, --dist <dist-dir='dist/test'>
    Write to a specific dist-dir. Defaults to 'dist/test'

  <src-dir='${pkg.spellbook.js.src}'|'src/js'>
    Read from a specefic <src-dir> instead of `${pkg.spellbook.js.src}` or
    the default of `src/js`

## EXAMPLES

  Get the current version of spellbook

    sb-build-test-bundles -V
    sb-build-test-bundles --version

  Get help for this binary

    sb-build-test-bundles --help
    sb-build-test-bundles -h

  Set the log level for this binary

    sb-build-test-bundles -l info
    sb-build-test-bundles -l fatal
    sb-build-test-bundles --log-level debug
    sb-build-test-bundles --log-level error

  Dont output anything

    sb-build-test-bundles -q
    sb-build-test-bundles -quiet

  Incrementally rebuild

    sb-build-test-bundles --watch
    sb-build-test-bundles -w

  Non default source directory

    sb-build-test-bundles src/js/idk
    sb-build-test-bundles js/

  Non default dist directory

    sb-build-test-bundles --dist dist/bunders
    sb-build-test-bundles -d dist/test-bundlers/spellbook

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
    Setting this to a false value will not stop this binary from being run.

  <package.json>.spellbook.test.src='test/'
    This value will have no effect on this binary.

  <package.json>.spellbook.js={}
    Setting this to a false value will not stop this binary from being run.

  <package.json>.spellbook.js.src
    package.json spellbook configuration for the default js source directory. Changes the default
    from `src/js` to whatever is specified. If this is set and does not exist this build will fail.

## SEE ALSO

  sb-build-test(1), sb-build-test-all(1)

## EXIT

  0 - all commands succeeded
  1 - one or more sub-command failed

## Spellbook

  Part of the sb(1) suite
