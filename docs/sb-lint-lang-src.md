# sb-lint-lang-src(1) - Lint json lang assets for a project

## SYNOPSIS

  sb-lint-lang-src [-l, --log-level <level>] [-h,--help] [-q,--quiet] [-V,--version]
                   [-w, --watch] [-e, --errors] [-f, --fix]
                   [glob-or-file="<lang-src>/**/*.json"]

## DESCRIPTION

  This lints all files under <glob-or-file>.

  This will use eslint and eslint-plugin-json internally to lint json.
  Rules can be found at:
  https://github.com/azeemba/eslint-plugin-json

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
    Watch files for changes and re-lint on file change.
    Errors during linting with this active will not exit.

  -e, --errors
    Only log linting errors. Will not log any linting warnings.

  -f, --fix
    This will not do anything as --fix does not work with eslint-plugin-json.

  <glob-or-file="<lang-src>/**/*.json">
    The file or glob to lint. By default "<lang-src>/**/*.md" is linted. <lang-src> is the
    source listed for docs in package.json or 'lang/' by default.

## EXAMPLES

  Get the current version of spellbook

    sb-lint-lang-src -V
    sb-lint-lang-src --version

  Get help for this binary

    sb-lint-lang-src --help
    sb-lint-lang-src -h

  Set the log level for this binary

    sb-lint-lang-src -l info
    sb-lint-lang-src -l fatal
    sb-lint-lang-src --log-level debug
    sb-lint-lang-src --log-level error

  Dont output anything

    sb-lint-lang-src -q
    sb-lint-lang-src -quiet

  Watch files for changes and lint again once they change

    sb-lint-lang-src -w
    sb-lint-lang-src --watch

  Fix any errors/warnings that can be fixed automatically

    sb-lint-lang-src -f
    sb-lint-lang-src --fix

  Only log errors, do not log warnings.

    sb-lint-lang-src -e
    sb-lint-lang-src --errors

 lint a specific glob or file.

    sb-lint-lang-src some-md-file.json
    sb-lint-lang-src src/lang/**/*.json

## ENVIRONMENT AND CONFIGURATION VARIABLES

  SB_LOG_LEVEL='info'
    An enviornment variable that sets the log level to use for all videojs-spellbook
    binaries. Can be set to fatal, error, warn, info, verbose, debug, or none.

  <package.json>.spellbook.log-level=info
    A package.json variable that sets the default log level to use for all videojs-spellbook
    binaries. Can be set to fatal, error, warn, info, verbose, debug, or none.

  <package.json>.spellbook.lang='{}'
    Lang configuration to use in spellbook. If this is set to a false value then lang
    linting will use default values.

  <package.json>.spellbook.lang.src='lang/'
    Source directory to use for lang files, set in package.json. If this is unset
    'lang/' will be used. If this directory does not exist lang linting will fail.

## SEE ALSO

  sb-lint-lang-all(1), sb-lint-lang(1)

## EXIT

  0 - all commands succeeded
  1 - one or more sub-command failed, unless --watch is active

## Spellbook

  Part of the sb(1) suite
