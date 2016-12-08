# sb-lint-docs-md(1) - Lint markdown assets for a project

## SYNOPSIS

  sb-lint-docs-md [-l, --log-level <level>] [-h,--help] [-q,--quiet] [-V,--version]
                  [-w, --watch] [-e, --errors] [-f, --fix] [glob-or-file="<docs-src>/**/*.md"]

## DESCRIPTION

  This lints all markdown files under <glob-or-file>.

  This will use remark internally to lint docs. Rules can be found under the videojs-spellbook
  package in 'configs/remark-lint.config.js' or on the web at:
  https://github.com/videojs/spellbook/blob/master/config/remark-lint.config.js

  When using `--fix` any "Table of Contents" section will also be updated.

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
    Fix errors and warnings automatically before linting. Will not work in with --watch.

  <glob-or-file="<docs-src>/**/*.md">
    The file or glob to lint. By default "<docs-src>/**/*.md" is linted. <docs-src> is the
    source listed for docs in package.json or 'docs/' by default.

## EXAMPLES

  Get the current version of spellbook

    sb-lint-docs-md -V
    sb-lint-docs-md --version

  Get help for this binary

    sb-lint-docs-md --help
    sb-lint-docs-md -h

  Set the log level for this binary

    sb-lint-docs-md -l info
    sb-lint-docs-md -l fatal
    sb-lint-docs-md --log-level debug
    sb-lint-docs-md --log-level error

  Dont output anything

    sb-lint-docs-md -q
    sb-lint-docs-md -quiet

  Watch files for changes and lint again once they change

    sb-lint-docs-md -w
    sb-lint-docs-md --watch

  Fix any errors/warnings that can be fixed automatically

    sb-lint-docs-md -f
    sb-lint-docs-md --fix

  Only log errors, do not log warnings.

    sb-lint-docs-md -e
    sb-lint-docs-md --errors

  Automatically fix before linting

    sb-lint-docs-md -f
    sb-lint-docs-md --fix

 lint a specific glob or file.

    sb-lint-docs-md some-md-file.md
    sb-lint-docs-md src/docs/**/*.md

## ENVIRONMENT AND CONFIGURATION VARIABLES

  SB_LOG_LEVEL='info'
    An enviornment variable that sets the log level to use for all videojs-spellbook
    binaries. Can be set to fatal, error, warn, info, verbose, debug, or none.

  <package.json>.spellbook.log-level=info
    A package.json variable that sets the default log level to use for all videojs-spellbook
    binaries. Can be set to fatal, error, warn, info, verbose, debug, or none.

  <package.json>.spellbook.docs='{}'
    Docs configuration to use in spellbook. If this is set to a false value then docs
    linting will use default values.

  <package.json>.spellbook.docs.src='docs/'
    Source directory to use for docs files, set in package.json. If this is unset
    'docs/' will be used. If this directory does not exist docs linting will fail.

## SEE ALSO

  sb-lint-docs-all(1), sb-lint-docs(1)

## EXIT

  0 - all commands succeeded
  1 - one or more sub-command failed, unless --watch is active

## Spellbook

  Part of the sb(1) suite
