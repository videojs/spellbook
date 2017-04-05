var remarkrc = {
  settings: {
    bullet: '*',
    fence: '`',
    strong: '*',
    emphasis: '_',
    listItemIndent: 1,
    incrementListMarker: false
  },
  plugins: {
    'toc': {
      tight: true
    },
  }
};
var args = process.argv;

// only lint in non-output mode
if (args.indexOf('-o') === -1 && args.indexOf('--output') === -1) {
  remarkrc.plugins['remark-preset-lint-videojs'] = null;
}

module.exports = remarkrc;
