# sb-lint-docs-all(1) - Lint all documentation assets for a project

## SYNOPSIS

  sb-lint-docs-all [-l, --log-level <level>] [-h,--help] [-q,--quiet] [-V,--version]
              [-w, --watch] [-e, --errors] [-f, --fix]

## DESCRIPTION

  This is run when sb-lint-docs(1) is not passed any arguments or is passed all
  as the command to run.

  This command will run:
    * markdown files - see sb-lint-docs-md(1)
    * js examples in docs - see sb-lint-docs-examples(1)

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
    Fix warnings and errors automatically before linting.

## EXAMPLES

  Get the current version of spellbook

    sb-lint-docs-all -V
    sb-lint-docs-all --version

  Get help for this binary

    sb-lint-docs-all --help
    sb-lint-docs-all -h

  Set the log level for this binary

    sb-lint-docs-all -l info
    sb-lint-docs-all -l fatal
    sb-lint-docs-all --log-level debug
    sb-lint-docs-all --log-level error

  Dont output anything

    sb-lint-docs-all -q
    sb-lint-docs-all -quiet

  Watch files for changes and lint again once they change

    sb-lint-docs-all -w
    sb-lint-docs-all --watch

  Fix any errors/warnings that can be fixed automatically

    sb-lint-docs-all -f
    sb-lint-docs-all --fix

  Only log errors, do not log warnings.

    sb-lint-docs-all -e
    sb-lint-docs-all --errors

## ENVIRONMENT AND CONFIGURATION VARIABLES

  SB_LOG_LEVEL='info'
    An enviornment variable that sets the log level to use for all videojs-spellbook
    binaries. Can be set to fatal, error, warn, info, verbose, debug, or none.

  <package.json>.spellbook.log-level=info
    A package.json variable that sets the default log level to use for all videojs-spellbook
    binaries. Can be set to fatal, error, warn, info, verbose, debug, or none.

  <package.json>.spellbook.docs='{}'
    Docs configuration to use in spellbook. If this is set to a false value then docs
    linting will never be attempted.

  <package.json>.spellbook.docs.src='docs'
    Source directory to use for docs files, set in package.json. If this is unset
    'docs/' will be used. If this directory does not exist docs will not be linted.

## SEE ALSO

  sb-lint-docs-examples(1), sb-lint-docs-md(1), sb-lint-docs(1)

## EXIT

  0 - all commands succeeded
  1 - one or more sub-command failed, unless --watch is active

## Spellbook

  Part of the sb(1) suite
