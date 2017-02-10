# sb-build-js-browser(1) - Build javascript assets into minified/unminified bundles with external source maps

## SYNOPSIS

  sb-build-js-browser [-l, --log-level <level>] [-h,--help] [-q,--quiet] [-V,--version]
                   [-w, --watch] [-d, --dist <dist-dir='dist/browser'>]
                   [<src-dir='${pkg.spellbook.js.src}'|'src/js'>]

## DESCRIPTION

  This binary will do the following:
    1. Look for index.js in <src-dir> or fail if it does not find one
    2. Pass what it found to browserify which will:
      1. Pass <pkg.name> to browserify, as standalone name. This will get exposed under window and be
        converted to title case. IE: `test-main-pkg` becomes `window.testMainPkg`
      2. Start watching code changes to generate an internal source map.
      3. ignore video.js if <package.json>.spellbook.shimVideojs is set to true (which is te default)
      4. rollup all es6 code and dependencies that support it (using jsnext:main). This saves a lot of bytes
      5. convert all code to es5 using babelify with ie8 support if <package.json>.spellbook.ie8 is set to true (default)
        is false)
      6. convert '__VERSION__' strings to the package version
      7. browserify all es5 assets into the bundle
      8. bundle-collapse all require paths so that they are 1 character numbers rather than long strings
      9. Write a dist file to <dist-dir>/<pkg.name>.js
    3. exorcist will remove the source map from <dist-dir>/<pkg.name>.js into <dist-dir>/<pkg.name>.js.map
    4. uglify will be run on <dist-dir>/<pkg.name>.js this will:
      1. Use the exorcised source map and update it to match the soon-to-be minified file
      2. minify the file
      3. Add a banner to the top of the file and update the source map with the line offsets
      4. write the minified output to <dist-dir>/<pkg.name>.min.js
      5. Write the updated souce map to <dist-dir>/<pkg.name>.min.js.map

  > NOTE: During watch watchify will be used for browserify, steps 1-2 will be the only steps run,
  >       and as of right now rollupify will not be used as it breaks watchify. This means that it will
  >       have to use `main` rather than `jsnext:main` to build projects. Basically sub projects will have to
  >       watch and rebuild their es6 -> es5 sources in order for the current project to be rebuilt.

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

  <src-dir='${pkg.spellbook.js.src}'|'src/js'>
    Read from a specefic <src-dir> instead of `${pkg.spellbook.js.src}` or
    the default of `src/js`


## EXAMPLES

  Get the current version of spellbook

    sb-build-js-browser -V
    sb-build-js-browser --version

  Get help for this binary

    sb-build-js-browser --help
    sb-build-js-browser -h

  Set the log level for this binary

    sb-build-js-browser -l info
    sb-build-js-browser -l fatal
    sb-build-js-browser --log-level debug
    sb-build-js-browser --log-level error

  Dont output anything

    sb-build-js-browser -q
    sb-build-js-browser -quiet

  Incrementally rebuild

    sb-build-js-browser --watch
    sb-build-js-browser -w

  Non default source directory

    sb-build-js-browser src/js/js
    sb-build-js-browser src/js/es6

  Non default dist directory

    sb-build-js-browser --dist dist/node
    sb-build-js-browser -d dist/js

## ENVIRONMENT AND CONFIGURATION VARIABLES

  SB_LOG_LEVEL='info'
    An enviornment variable that sets the log level to use for all videojs-spellbook
    binaries. Can be set to fatal, error, warn, info, verbose, debug, or none.

  <package.json>.spellbook.log-level=info
    A package.json variable that sets the default log level to use for all videojs-spellbook
    binaries. Can be set to fatal, error, warn, info, verbose, debug, or none.

  <package.json>.spellbook.js='{}'
    This setting will be ignored by this binary.

  <package.json>.spellbook.js.src='src/js'
    Source directory to use for js files, set in package.json. If this is unset
    'src/js' will be used. If this directory does not exist and is set, build will fail.

  <package.json>.spellbook.ie8=false
    Make sure that IE8 is supported. Defaults to false.

  <package.json>.spellbook.shimVideojs=true
    Makes sure that video.js is included in unit tests but will not be bundled into
    distribution js files. Defaults to true.


## SEE ALSO

  sb-build-js(1), sb-build-js-all(1)

## EXIT

  0 - all commands succeeded
  1 - one or more sub-command failed

## Spellbook

  Part of the sb(1) suite
