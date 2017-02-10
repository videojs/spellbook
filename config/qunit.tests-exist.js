QUnit.done(function(details) {
  if (details.total === 0) {
    throw new Error('No Tests were run!');
  }
});
