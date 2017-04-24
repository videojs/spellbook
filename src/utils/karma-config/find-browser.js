var findBrowser = function(browserList, browserToFind)  {
  var regexp = new RegExp(browserToFind.trim(), 'i');

  for (var i = 0; i < browserList.length; i++) {
    var currentBrowser = browserList[i].trim();

    if (regexp.test(currentBrowser)) {
      return i;

    }
  }

  return -1;
};

module.exports = findBrowser;
