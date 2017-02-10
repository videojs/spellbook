# sb-build-all(1) - Build all assets for a project

## SYNOPSIS

  sb-build-all [-l, --log-level <level>] [-h,--help] [-q,--quiet] [-V,--version]
               [-w, --watch]

## DESCRIPTION

  This is run when sb-build(1) is not passed any arguments or is passed all
  as the command to run.

  This command will build css, js, lang, test, and docs depending on what is available.

  > NOTE: If no commands can be run, an error will be logged and this binary will exit
  >       with a failure return code.

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

## EXAMPLES

  Get the current version of spellbook

    sb-build-all -V
    sb-build-all --version

  Get help for this binary

    sb-build-all --help
    sb-build-all -h

  Set the log level for this binary

    sb-build-all -l info
    sb-build-all -l fatal
    sb-build-all --log-level debug
    sb-build-all --log-level error

  Dont output anything

    sb-build-all -q
    sb-build-all -quiet

  Watch builds for changes and incrementally rebuild

    sb-build-all -w
    sb-build-all --watch

## ENVIRONMENT AND CONFIGURATION VARIABLES

  SB_LOG_LEVEL='info'
    An enviornment variable that sets the log level to use for all videojs-spellbook
    binaries. Can be set to none, fatal, error, warn, info, verbose, or debug.

  <package.json>.spellbook.log-level=info
    A package.json variable that sets the default log level to use for all videojs-spellbook
    binaries. Can be set to none, fatal, error, warn, info, verbose, or debug.

  <package.json>.spellbook.ie8=false
    Should spellbook make sure that IE8 is supported. Defaults to false.

  <package.json>.spellbook.shimVideojs=true
    Makes sure that video.js is included in unit tests but will not be bundled into
    distribution js files. Defaults to true.

  <package.json>.spellbook.css='{}'
    CSS configuration to use in spellbook. If this is set to a false value then css
    builds will never be attempted.

  <package.json>.spellbook.css.src='src/css'
    Source directory to use for css files, set in package.json. If this is unset
    'src/css' will be used. If this directory does not exist css will not be built.

  <package.json>.spellbook.js='{}'
    JS configuration to use in spellbook. If this is set to a false value then js
    builds will never be attempted.

  <package.json>.spellbook.js.src='src/js'
    Source directory to use for js files, set in package.json. If this is unset
    'src/js' will be used. If this directory does not exist js will not be built.

  <package.json>.spellbook.lang='{}'
    Lang configuration to use in spellbook. If this is set to a false value then lang
    builds will never be attempted.

  <package.json>.spellbook.lang.src='lang/'
    Source directory to use for lang files, set in package.json. If this is unset
    'lang/' will be used. If this directory does not exist lang will not be built.

  <package.json>.spellbook.docs='{}'
    Documentation configuration to use in spellbook. If this is set to a false value
    then docs builds will never be attempted.

  <package.json>.spellbook.docs.src='docs/'
    Source directory to use for docs files, set in package.json. If this is unset
    'docs/' will be used. If this directory does not exist docs will not be built.

  <package.json>.spellbook.test='{}'
    Test configuration to use in spellbook. If this is set to a false value
    then test builds will never be attempted.

  <package.json>.spellbook.test.src='test/'
    Source directory to use for test files, set in package.json. If this is unset
    'test/' will be used. If this directory does not exist tests will not be built.

## SEE ALSO

  sb-build-css-all(1), sb-build-js-all(1), sb-build-docs-all(1), sb-build-lang-all(1),
  sb-build-test-all(1)

## EXIT

  0 - all commands succeeded
  1 - one or more sub-command failed, unless --watch is active

## Spellbook

  Part of the sb(1) suite
