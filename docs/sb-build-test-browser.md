# sb-build-test-browser(1) - Build all user created unit tests into browser ready bundles

## SYNOPSIS

  sb-build-test-browser [-l, --log-level <level>] [-h,--help] [-q,--quiet] [-V,--version]
                   [-w, --watch] [-d, --dist <dist-dir='dist/browser'>]
                   [<src-dir='${pkg.spellbook.test.src}'|'test/'>]

## DESCRIPTION

  This binary will do the following:
    1. Look for *.test.js in <src-dir> or fail if it does not find one
    2. Pass what it found to browserify which will:
      1. Start watching code changes to generate an internal source map.
      2. ignore video.js if <package.json>.spellbook.shimVideojs is set to true (which is te default)
      3. rollup all es6 code and dependencies that support it (using jsnext:main). This saves a lot of bytes and
         mimics what we do on normal builds
      5. convert all code to es5 using babelify with ie8 support if <package.json>.spellbook.ie8 is set to true (default)
        is false)
      6. convert '__VERSION__' strings to the package version
      7. browserify all es5 assets into the bundle
      8. bundle-collapse all require paths so that they are 1 character numbers rather than long strings
      9. Write a dist file to <dist-dir>/<pkg.name>.test.js

  > NOTE: During watch watchify will be used for browserify and as of right now rollupify will not be used
  >       as it breaks watchify. This means that it will have to use `main` rather than `jsnext:main` to
  >       build projects. Basically sub projects will have to watch and rebuild their es6 -> es5 sources in
  >       order for the current project to be rebuilt.


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

  -d, --dist <dist-dir='dist/browser'>
    Write to a specific dist-dir. Defaults to 'dist/browser'

  <src-dir='${pkg.spellbook.test.src}'|'test/'>
    Read from a specefic <src-dir> instead of `${pkg.spellbook.test.src}` or
    the default of `test/`

## EXAMPLES

  Get the current version of spellbook

    sb-build-test-browser -V
    sb-build-test-browser --version

  Get help for this binary

    sb-build-test-browser --help
    sb-build-test-browser -h

  Set the log level for this binary

    sb-build-test-browser -l info
    sb-build-test-browser -l fatal
    sb-build-test-browser --log-level debug
    sb-build-test-browser --log-level error

  Dont output anything

    sb-build-test-browser -q
    sb-build-test-browser -quiet

  Incrementally rebuild

    sb-build-test-browser --watch
    sb-build-test-browser -w

  Non default source directory

    sb-build-test-browser src/test/unit
    sb-build-test-browser src/test

  Non default dist directory

    sb-build-test-browser --dist dist/test/unit
    sb-build-test-browser -d dist/whogives

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

## SEE ALSO

  sb-build-test(1), sb-build-test-all(1)

## EXIT

  0 - all commands succeeded
  1 - one or more sub-command failed

## Spellbook

  Part of the sb(1) suite
