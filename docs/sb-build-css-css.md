# sb-build-css-css(1) - Build vanilla css assets into minified/unminified bundles with external source maps

## SYNOPSIS

  sb-build-css-css [-l, --log-level <level>] [-h,--help] [-q,--quiet] [-V,--version]
                   [-w, --watch] [-d, --dist <dist-dir='dist/browser'>]
                   [<src-dir='${pkg.spellbook.css.src}'|'src/css'>]

## DESCRIPTION

  Build vanilla css using postcss. This binary will do the following:
    1. Look for `index.css` in `<src-dir>` or fails if nothing is found
    2. Pass the file to postcss which will:
      1. Create a sourcemap
      2. inline all @import statements (treat this like require for css)
      3. Insert a banner comment at the top of the file
      4. autoprefix all css with vendor prefixes depending on `<pkg.spellbook.browserList>`.
         The default is `['> 1%', 'last 4 versions', 'Firefox ESR']`. See https://github.com/ai/browserslist for
         more information.
      5. Write the file to `<dist-dir>/<pkg.name>.css`.
    3. cssnano will be run on `<dist-dir>/<pkg.name>.css` and does the following:
      1. run in safe mode so that css will never be broken for any browser
      2. minify the css
      3. modifies the current internal map file as it minifies the css
      4. Write the file to `<dist-dir>/<pkg.name>.min.css`
    4. source maps will be extracted from both files using exorcist and written to:
      * `<dist-dir>/<pkg.name>.min.css.map`
      * `<dist-dir/<pkg.name>.css.map`

  > NOTE: During watch mode only steps 1-2 will run and build failures will not exit this
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

  -d, --dist <dist-dir='dist/browser'>
    Write to a specific dist-dir. Defaults to 'dist/browser'

  <src-dir='${pkg.spellbook.css.src}'|'src/css'>
    Read from a specefic <src-dir> instead of `${pkg.spellbook.css.src}` or
    the default of `src/css`

## EXAMPLES

  Get the current version of spellbook

    sb-build-css-css -V
    sb-build-css-css --version

  Get help for this binary

    sb-build-css-css --help
    sb-build-css-css -h

  Set the log level for this binary

    sb-build-css-css -l info
    sb-build-css-css -l fatal
    sb-build-css-css --log-level debug
    sb-build-css-css --log-level error

  Dont output anything

    sb-build-css-css -q
    sb-build-css-css -quiet

  Incrementally rebuild

    sb-build-css-css --watch
    sb-build-css-css -w

  Non default source directory

    sb-build-css-css src/styles
    sb-build-css-css css

  Non default dist directory

    sb-build-css-css --dist dist/css
    sb-build-css-css -d dist/something/css

## ENVIRONMENT AND CONFIGURATION VARIABLES

  SB_LOG_LEVEL='info'
    An enviornment variable that sets the log level to use for all videojs-spellbook
    binaries. Can be set to fatal, error, warn, info, verbose, debug, or none.

  <package.json>.spellbook.log-level=info
    A package.json variable that sets the default log level to use for all videojs-spellbook
    binaries. Can be set to fatal, error, warn, info, verbose, debug, or none.

  <package.json>.spellbook.css={}
    Setting this to a false value will not stop this binary from being run.

  <package.json>.spellbook.css.src
    package.json spellbook configuration for the default css source directory. Changes the default
    from `src/css` to whatever is specified. If this is set and does not exist this build will fail.

  <package.json>.spellbook.browserList
    packag.json spellbook configuration to override the default browserList of
    `['> 1%', 'last 4 versions', 'Firefox ESR']` with a custom browser list.
    See https://github.com/ai/browserslist for more information.

## SEE ALSO

  sb-build-css(1), sb-build-css-all(1)

## EXIT

  0 - all commands succeeded
  1 - one or more sub-command failed

## Spellbook

  Part of the sb(1) suite
