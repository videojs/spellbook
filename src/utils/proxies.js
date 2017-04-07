var proxy = require('http-proxy-middleware');
var url = require('url');
var http = require('http');
var path = require('path');
var log = require('./log');

/* proxy /test to karma server */
var test = function(program, server) {
  var testPath = '/test'
  var filter = function (pathname, req) {


    // always re-write /test
    if ((new RegExp('^' + testPath + '/?')).test(pathname)) {
      return true;
    }

    // if it comes from
    if (req.headers.referer && (new RegExp('^' + testPath + '/?')).test(url.parse(req.headers.referer).pathname)) {
      return true;
    }

    // if it comes from /context.html
    if (req.headers.referer && (new RegExp('^/context.html\??')).test(url.parse(req.headers.referer).pathname)) {
      return true;
    }

    if (req.headers.referer && (new RegExp('^/debug.html\??')).test(url.parse(req.headers.referer).pathname)) {
      return true;
    }

    // if it comes from /socket.io
    if ((new RegExp('^/socket.io/')).test(pathname)) {
      return true;
    }

    // if it is the debug page directly
    if ((new RegExp('^/debug.html\??')).test(pathname)) {
      return true;
    }

    return false;
  };

  var interval;

  return proxy(filter, {
    target: 'http://0.0.0.0:' + program.testPort,
    pathRewrite: function(pathname, req) {
      var oldurl = url.parse(pathname);
      var newurl = oldurl;

      newurl.pathname = newurl.pathname
        .replace(new RegExp('^' + testPath + '/?$'), '/')
        .replace(new RegExp('^' + testPath + '/'), '/');

      return url.format(newurl);
    },
    ws: true,
    logLevel: 'error',
    onError: function(err, req, res) {
      // check every 3000 seconds to see if test port is open
      if (!interval) {
        interval = setInterval(function() {
          http.get({port: program.testPort, host: 'localhost'}, function(res) {
            log.info('Port ' + program.testPort + ' was opened, going to proxy and reload');
            server.reload();
            clearInterval(interval);
            interval = null;
          }).on('error', function() {
            log.info('Port ' + program.testPort + ' is not up yet...');
          });
        }, 5000);
      }

      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(
        '<script src="/browser-sync/browser-sync-client.js"></script>' +
        '<p>ERROR: Could not proxy http://locahost:' + program.port + testPath + ' to karma server at http://localhost:' + program.testPort + '. This may be due to one of two issues: </p>' +
        '<ol>' +
          '<li>The karma server is not started. Use `sb-test-browser --watch`,  `sb-watch`, or `sb-start` to start it.</li>' +
          '<li>The --test-port or TEST_PORT environment variable is not set to the correct karma server port.</li>' +
        '</ol>'
      );
      res.end();
    }
  });
};

module.exports = {
  test: test
};
