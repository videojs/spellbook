module.exports = {
  "rules": {
    // number
    "number-leading-zero": "always",
    "number-no-trailing-zeros": true,
    // "number-zero-length-no-unit": true,

    // string
    "string-no-newline": true,
    "string-quotes": "double",

    // declaration
    "declaration-bang-space-after": "never",
    "declaration-bang-space-before": "always",
    "declaration-colon-space-after": "always",
    "declaration-colon-space-before": "never",

    // declaration block
    "declaration-block-no-duplicate-properties": true,
    "declaration-block-semicolon-newline-after": "always",
    "declaration-block-semicolon-newline-before": "never-multi-line",
    "declaration-block-semicolon-space-after": "never-single-line",
    "declaration-block-semicolon-space-before": "never",
    "declaration-block-trailing-semicolon": "always",

    // block
    "block-closing-brace-newline-after": "always",
    "block-closing-brace-newline-before": "always",
    "block-no-empty": true,
    "block-opening-brace-newline-after": "always",
    "block-opening-brace-newline-before": "always-single-line",
    "block-opening-brace-space-before": "always",

    // selector
    "selector-combinator-space-after": "always",
    "selector-combinator-space-before": "always",
    "selector-pseudo-element-colon-notation": "single",
    "selector-type-case": "lower",

    // selector list
    "selector-list-comma-newline-after": "always",
    "selector-list-comma-newline-before": "never-multi-line",
    "selector-list-comma-space-before": "never",

    // media feature
    "media-feature-colon-space-after": "always",
    "media-feature-colon-space-before": "never",
    "media-feature-range-operator-space-after": "always",
    "media-feature-range-operator-space-before": "never",

    // at rule
    "at-rule-empty-line-before": "always",
    "at-rule-semicolon-newline-after": "always",

    // comment
    "comment-empty-line-before": "always",
    "comment-whitespace-inside": "always",

    // general
    "indentation": 2,
    "max-empty-lines": 1,
    "max-line-length": [90, {
      "ignore": "non-comments",
      "severity": "warning"
    }],
    "max-nesting-depth": 5,
    "no-duplicate-selectors": true,
    "no-eol-whitespace": true,
    "no-invalid-double-slash-comments": true,
  }
};
