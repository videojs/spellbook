# sb-lint-docs-examples(1) - Lint javascript examples in markdown assets for a project

## SYNOPSIS

  sb-lint-docs-examples [-l, --log-level <level>] [-h,--help] [-q,--quiet] [-V,--version]
                        [-w, --watch] [-e, --errors] [-f, --fix]
                        [glob-or-file="<docs-src>/**/*.md"]

## DESCRIPTION

  This lints all files under <glob-or-file>.
o
  This will use eslint and eslint-plugin-markdown internally to lint js.
  Rules can be found under the videojs-spellbook package in 'configs/eslint.config.js'
  (which inherits from the 'eslint-config-videojs' package on npm)  or on the web at:
  https://github.com/videojs/spellbook/blob/master/config/stylelint.config.js
  https://github.com/videojs/eslint-config-videojs/blob/master/eslintrc.json

  For more information on the rules visit:
  http://eslint.org/docs/rules/

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
    This command will do nothing for this binary as --fix is not supported
    for eslint-plugin-markdown which is used internally

  <glob-or-file="<docs-src>/**/*.md">
    The file or glob to lint. By default "<docs-src>/**/*.md" is linted. <docs-src> is the
    source listed for docs in package.json or 'docs/' by default.

## EXAMPLES

  Get the current version of spellbook

    sb-lint-docs-examples -V
    sb-lint-docs-examples --version

  Get help for this binary

    sb-lint-docs-examples --help
    sb-lint-docs-examples -h

  Set the log level for this binary

    sb-lint-docs-examples -l info
    sb-lint-docs-examples -l fatal
    sb-lint-docs-examples --log-level debug
    sb-lint-docs-examples --log-level error

  Dont output anything

    sb-lint-docs-examples -q
    sb-lint-docs-examples -quiet

  Watch files for changes and lint again once they change

    sb-lint-docs-examples -w
    sb-lint-docs-examples --watch

  Only log errors, do not log warnings.

    sb-lint-docs-examples -e
    sb-lint-docs-examples --errors

 lint a specific glob or file.

    sb-lint-docs-examples some-md-file.md
    sb-lint-docs-examples src/docs/**/*.md

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

  sb-lint-docs-examples(1), sb-lint-docs-examples(1), sb-lint-docs(1)

## EXIT

  0 - all commands succeeded
  1 - one or more sub-command failed, unless --watch is active

## Spellbook

  Part of the sb(1) suite
