# sb-build-docs-manual(1) - Build manual generated documentation into html

## SYNOPSIS

  sb-build-docs-manual [-l, --log-level <level>] [-h,--help] [-q,--quiet] [-V,--version]
                       [-w, --watch] [-d, --dist <dist-dir='dist/docs/manual'>]
                       [<src-dir='${pkg.spellbook.docs.src}'|'docs/'>]

## DESCRIPTION

  Build all manual markdown documenation from <src-dir> into html files at <dist-dir>.
  Be sure to add "Table of Contents" as a heading so that remark can automatically fill it out for you!

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

  -d, --dist <dist-dir='dist/docs/manual'>
    Write to a specific dist-dir. Defaults to 'dist/docs/manual'

  <src-dir='${pkg.spellbook.docs.src}'|'docs/'>
    Read from a specefic <src-dir> instead of `${pkg.spellbook.docs.src}` or
    the default of `docs/`

## EXAMPLES

  Get the current version of spellbook

    sb-build-docs-manual -V
    sb-build-docs-manual --version

  Get help for this binary

    sb-build-docs-manual --help
    sb-build-docs-manual -h

  Set the log level for this binary

    sb-build-docs-manual -l info
    sb-build-docs-manual -l fatal
    sb-build-docs-manual --log-level debug
    sb-build-docs-manual --log-level error

  Dont output anything

    sb-build-docs-manual -q
    sb-build-docs-manual -quiet

  Incrementally rebuild

    sb-build-docs-manual --watch
    sb-build-docs-manual -w

  Non default source directory

    sb-build-docs-manual src/docs
    sb-build-docs-manual src/docs/man

  Non default dist directory

    sb-build-docs-manual --dist dist/docs
    sb-build-docs-manual -d dist/manual-docs

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
    Source directory to use for docs files, set in package.json. If this is unset
    'docs/' will be used. If this directory is set and does not exist build will fail.

## SEE ALSO

  sb-build-docs(1), sb-build-docs-all(1)

## EXIT

  0 - all commands succeeded
  1 - one or more sub-command failed

## Spellbook

  Part of the sb(1) suite
