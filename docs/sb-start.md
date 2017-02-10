# sb-start(1) - Run a sb-start(1) and sb-watch(1) in parallel and start a development workflow.

## SYNOPSIS

  sb-start [-l, --log-level <level>] [-h,--help] [-q,--quiet] [-V,--version]
            [-p, --port <port-number=9999>] [-tp, --test-port <port-number=9876>]
            [-o, --open] [-s, --sync] [-t, --tunnel] [-nui, --no-ui] [-nb, --no-build]
            [-nl, --no-lint]

## DESCRIPTION

  Starts a development workflow watching files for changes and doing the following:

  1. Building everything and re-building on change
  2. Linting everything and re-linting on change
  3. Starting a development server
  4. Starting a testing server
  5. Reloading the browser when a rebuild is finished

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

  -p, --port <port-number=9999>
    What port to open the development server on. Default is 9999.

  -tp, --test-port <port-number=9876>
    What port the test server for this development server will be running on. Defaults
    to 9876.

  -o, --open
    Open the development server address in the main browser for the OS. This does not
    happen by default.

  -s, --sync
    Should all open browsers be synced using BrowserSync? This causes all browsers to
    emulate any action that is done in another browser. So scrolling down will also scroll
    other browsers down. Clicking a link will cause other browsers to click that link. This
    behavior is off by default.

  -t, --tunnel
    Should browser sync tunnel your development server over the internet? By default this setting
    is off. The tunnel link will be reported when BrowserSync starts.

  -nui, --no-ui
    Turn off the browser-sync ui, which is used to configure specific browser-sync functionality.

  -nb, --no-build
    Do not build and watch for re-build.

  -nl, --no-lint
    Do not lint and watch for re-lint.

## EXAMPLES

  Get the current version of spellbook

    sb-start -V
    sb-start --version

  Get help for this binary

    sb-start --help
    sb-start -h

  Set the log level for this binary

    sb-start -l info
    sb-start -l fatal
    sb-start --log-level debug
    sb-start --log-level error

  Dont output anything

    sb-start -q
    sb-start -quiet

  Don't build and watch

    sb-start -nb
    sb-start --no-build

  Don't lint and watch

    sb-start -nl
    sb-start --no-lint

  Open the server in the main browser

    sb-server --open
    sb-server -o

  Do not start the BrowserSync UI

    sb-server -nui
    sb-server --no-ui

  Set the test server port

    sb-server --test-port 7777
    sb-server -tp 8888

  Set the server port

    sb-server --port 7777
    sb-server -p 8888

  Sync Browser actions across browsers

    sb-server --sync
    sb-server -s

  Tunnel your development server over the internet

    sb-server --tunnel
    sb-server -t

## ENVIRONMENT AND CONFIGURATION VARIABLES

  SB_LOG_LEVEL='info'
    An enviornment variable that sets the log level to use for all videojs-spellbook
    binaries. Can be set to fatal, error, warn, info, verbose, debug, or none.

  TEST_PORT=9876
    The port that the test server (karma-runner) is running on. Defaults to 9876.

  PORT=9999
    The port to run the development server on (browser-sync). Defaults to 9999.

  <package.json>.spellbook.log-level=info
    A package.json variable that sets the default log level to use for all videojs-spellbook
    binaries. Can be set to fatal, error, warn, info, verbose, debug, or none.

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

  sb(1), sb-watch(1), sb-server(1)

## EXIT

  will always exit 0

## Spellbook

  Part of the sb(1) suite
