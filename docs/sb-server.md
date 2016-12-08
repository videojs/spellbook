# sb-server(1) - Run a development server that auto reloads when files change and proxies the browser test server.

## SYNOPSIS

  sb-server [-l, --log-level <level>] [-h,--help] [-q,--quiet] [-V,--version]
            [-p, --port <port-number=9999>] [-tp, --test-port <port-number=9876>]
            [-o, --open] [-s, --sync] [-t, --tunnel] [-nui, --no-ui]

## DESCRIPTION

  Starts a development server that uses BrowserSync to reload the browser when a file
  changes. Watches for changes in 'dist/**/*.{js,css,html)', 'examples/**/*.html',
  and index.html. Also proxies --test-port to `http://localhost:<port>/test`. BrowserSync's
  UI will also be opened on a port one above the port specified (9999; UI will be on 10000)

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

## EXAMPLES

  Get the current version of spellbook

    sb-server -V
    sb-server --version

  Get help for this binary

    sb-server --help
    sb-server -h

  Set the log level for this binary

    sb-server -l info
    sb-server -l fatal
    sb-server --log-level debug
    sb-server --log-level error

  Dont output anything

    sb-server -q
    sb-server -quiet

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

## SEE ALSO

  sb(1)

## EXIT

  0 - no problems starting BrowserSync.
  1 - Problems starting BrowserSync.

## Spellbook

  Part of the sb(1) suite
