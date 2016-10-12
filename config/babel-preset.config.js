var GetConfig = require('../src/utils/get-config');


var getBabelConfig = function() {
  var config = GetConfig();
  var babelConfig = {
    "plugins": ["transform-object-assign"],
    "presets": ["es2015"]
  };

  if (config.ie8) {
    babelConfig = {
      "presets": [
        ["es2015", {"loose": true}]
      ],
        "plugins": [
          "transform-es3-property-literals",
          "transform-es3-member-expression-literals",
          "transform-object-assign"
        ]
    };
  }

  return babelConfig;
};

module.exports = getBabelConfig();
