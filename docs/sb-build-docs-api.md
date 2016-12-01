# sb-build-docs-api(1) - Build jsdoc comments into html

## SYNOPSIS

  sb-build-docs-api [-l, --log-level <level>] [-h,--help] [-q,--quiet] [-V,--version]
                       [-w, --watch] [-d, --dist <dist-dir='dist/docs/api'>]
                       [<src-dir='${pkg.spellbook.js.src}'|'src/js'>]

## DESCRIPTION

  Build all api documenation from jsdoc comments in js at <src-dir> to html files in <dist-dir>.

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

  -d, --dist <dist-dir='dist/docs/api'>
    Write to a specific dist-dir. Defaults to 'dist/docs/api'

  <src-dir='${pkg.spellbook.js.src}'|'src/js'>
    Read from a specefic <src-dir> instead of `${pkg.spellbook.js.src}` or
    the default of `src/js`


## EXAMPLES

  Get the current version of spellbook

    sb-build-docs-api -V
    sb-build-docs-api --version

  Get help for this binary

    sb-build-docs-api --help
    sb-build-docs-api -h

  Set the log level for this binary

    sb-build-docs-api -l info
    sb-build-docs-api -l fatal
    sb-build-docs-api --log-level debug
    sb-build-docs-api --log-level error

  Dont output anything

    sb-build-docs-api -q
    sb-build-docs-api -quiet

  Incrementally rebuild

    sb-build-docs-api --watch
    sb-build-docs-api -w

  Non default source directory

    sb-build-docs-api js/
    sb-build-docs-api js/api

  Non default dist directory

    sb-build-docs-api --dist dist/docs
    sb-build-docs-api -d dist/api-docs

## ENVIRONMENT AND CONFIGURATION VARIABLES

  SB_LOG_LEVEL='info'
    An enviornment variable that sets the log level to use for all videojs-spellbook
    binaries. Can be set to fatal, error, warn, info, verbose, debug, or none.

  <package.json>.spellbook.log-level=info
    A package.json variable that sets the default log level to use for all videojs-spellbook
    binaries. Can be set to fatal, error, warn, info, verbose, debug, or none.

  <package.json>.spellbook.docs='{}'
    This setting will be ignored by this binary.

  <package.json>.spellbook.docs.src='docs/'
    This setting is not used by this binary.

  <package.json>.spellbook.js='{}'
    This setting will be ignored by this binary

  <package.json>.spellbook.js.src='src/js'
    Source directory to use for docs files, set in package.json. If this is unset
    'src/js' will be used. If this directory does not exist api docs build will fail.

## SEE ALSO

  sb-build-docs(1), sb-build-docs-all(1)

## EXIT

  0 - all commands succeeded
  1 - one or more sub-command failed

## Spellbook

  Part of the sb(1) suite
