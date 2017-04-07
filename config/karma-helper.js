// fail if no tests were run
QUnit.done(function(details) {
  if (details.total === 0) {
    throw new Error('No Tests were run!');
  }
});

// remove reload handling from browserSync, karma handles reloads for us
if (window.___browserSync___) {
  var bs = window.___browserSync___;

  bs.socket.on('init', function() {
    bs.socket.off('browser:reload');
  });
}
