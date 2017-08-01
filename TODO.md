* move the following over from spellbook:
  * sb-build-docs-manual
  * sb-lint-css
  * sb-lint-docs
  * sb-lint-lang
  * sb-release? (not sure if we need it)
  * sb-server? (livereload would be a nice to have)
  * sb-test-node (can/does it run in node)
  * sb-test-bundlers (webpack, browserify, rollup)
  * banner (spellbook inserts banners in a way that is source map compataible)?
  * source maps?
* Merge shared configuration in rollup configs
* Automatically change scripts.js based on available files. ex: don't have/run docs scipts if there are no docs etc
* Add back in config options from old spellbook
* migrate integration tests
