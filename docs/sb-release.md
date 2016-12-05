# sb-release(1) - Run basic release steps for npm, git, and bower. Can be used as a postversion script.

## SYNOPSIS

  sb-release [-l, --log-level <level>] [-h,--help] [-q,--quiet] [-V,--version]
             [-d, --dry-run] [<new-version=<semver-word-or-version>>]

## DESCRIPTION

  Run the basic release workflow which does the following:

  1. Update the changelog to the version being released using chg if you have a CHANGELOG.md
    - Add changes using `chg add`, they will be moved to unrelased changes in CHANGELOG.md
  2. Update package.json
  3. Build dist files and force add them to this commit if you have a bower.json.
  4. Commit to git using a version number as the message 'v1.0.0'
  5. Add a tag to git with the version number. IE 'v1.0.0'
  6. Remove dist files from the commit if using bower
  7. Explain how these changes can be published and pushed

## OPTIONS

  -l, --log-level <level>
    The level of log messages that you want to see. Can be none, fatal, error,
    warn, info, verbose, or debug. Defaults to info.

  -h, --help
    View the help information for this binary

  -V, --version
    View the version of this binary

  -q, --quiet
    Do not log any messages to stdout or stderr

  -d, --dry-run
    Do not run any commands, only print what would have been run.

  <new-version>
    Is any valid semver (except the current one) examples:
      * A valid semver version: X.X.X\n' +
      * A valid semver word: major, minor, etc.')

## EXAMPLES

  Get the current version of spellbook

    sb-release -V
    sb-release --version

  Get help for this binary

    sb-release --help
    sb-release -h

  Set the log level for this binary

    sb-release -l info
    sb-release -l fatal
    sb-release --log-level debug
    sb-release --log-level error

  Dont output anything

    sb-release -q
    sb-release -quiet

  Don't actually run any commands

    sb-release -d 1.0.1
    sb-release --dry-run 1.0.1

  Release a version

    sb-release major
    sb-release minor
    sb-release patch
    sb-release preminor
    sb-release prepatch
    sb-release prerelease
    sb-release 2.0.0
    sb-release 1.2.0
    sb-release 1.0.5

## ENVIRONMENT AND CONFIGURATION VARIABLES

  SB_LOG_LEVEL='info'
    An enviornment variable that sets the log level to use for all videojs-spellbook
    binaries. Can be set to fatal, error, warn, info, verbose, debug, or none.

  <package.json>.spellbook.log-level=info
    A package.json variable that sets the default log level to use for all videojs-spellbook
    binaries. Can be set to fatal, error, warn, info, verbose, debug, or none.

## SEE ALSO

  sb(1)

## EXIT

  0 - all commands succeeded
  1 - one or more sub-command failed

## Spellbook

  Part of the sb(1) suite
