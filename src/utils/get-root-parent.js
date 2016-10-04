module.exports = function() {
  // get the root parent
  var parent = module.parent;
  while(parent.parent) {
    parent = parent.parent;
  }

  return parent;
};
