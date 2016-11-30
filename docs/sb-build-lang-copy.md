# sb-build-lang-copy(1) - Copy languages to dist folder

## SYNOPSIS

  sb-build-lang-copy [-l, --log-level <level>] [-h,--help] [-q,--quiet] [-V,--version]
                     [-w, --watch] [-d, --dist <dist-dir='dist/lang'>]
                     [<src-dir='${pkg.spellbook.lang.src}'|'lang/'>]

## DESCRIPTION

  Copy all lang files from <src-dir> into <dist-dir>.

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

  -d, --dist <dist-dir='dist/lang'>
    Write to a specific dist-dir. Defaults to 'dist/docs/manual'

  <src-dir='${pkg.spellbook.lang.src}'|'lang/'>
    Read from a specefic <src-dir> instead of `${pkg.spellbook.lang.src}` or
    the default of `lang/`


## EXAMPLES

  Get the current version of spellbook

    sb-build-lang-copy -V
    sb-build-lang-copy --version

  Get help for this binary

    sb-build-lang-copy --help
    sb-build-lang-copy -h

  Set the log level for this binary

    sb-build-lang-copy -l info
    sb-build-lang-copy -l fatal
    sb-build-lang-copy --log-level debug
    sb-build-lang-copy --log-level error

  Dont output anything

    sb-build-lang-copy -q
    sb-build-lang-copy -quiet

  Incrementally rebuild

    sb-build-lang-copy --watch
    sb-build-lang-copy -w

  Non default source directory

    sb-build-lang-copy src/docs
    sb-build-lang-copy src/docs/man

  Non default dist directory

    sb-build-lang-copy --dist dist/docs
    sb-build-lang-copy -d dist/manual-docs

## ENVIRONMENT AND CONFIGURATION VARIABLES

  SB_LOG_LEVEL='info'
    An enviornment variable that sets the log level to use for all videojs-spellbook
    binaries. Can be set to fatal, error, warn, info, verbose, debug, or none.

  <package.json>.spellbook.log-level=info
    A package.json variable that sets the default log level to use for all videojs-spellbook
    binaries. Can be set to fatal, error, warn, info, verbose, debug, or none.

  <package.json>.spellbook.lang='{}'
    Lang configuration to use in spellbook. If this is set to a false value then lang
    builds will never be attempted.

  <package.json>.spellbook.lang.src='lang/'
    Source directory to use for lang files, set in package.json. If this is unset
    'lang/' will be used. If this directory does not exist lang will not be built.

## SEE ALSO

  sb-build-lang(1), sb-build-lang-all(1)

## EXIT

  0 - all commands succeeded
  1 - one or more sub-command failed

## Spellbook

  Part of the sb(1) suite
