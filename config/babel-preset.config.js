var GetBabelConfig = function() {
  return {
    presets: [
      'es3',
      ['es2015', {loose: true, modules: false}]
    ],
    plugins: [
      'external-helpers',
      'transform-object-assign'
    ]
  };
};

module.exports = GetBabelConfig;
