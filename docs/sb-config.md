# sb-config(1) - A debug binary to print to current projects default spellbook configuration to stdout

## SYNOPSIS

  sb-config [-l, --log-level <level>] [-h,--help] [-q,--quiet] [-V,--version]

## DESCRIPTION


## OPTIONS

  -l, --log-level <level>
    Does nothing for this binary

  -h, --help
    View the help information for this binary

  -V, --version
    View the version of this binary

  -q, --quiet
    Does nothing for this binary

## EXAMPLES

  Get the current version of spellbook

    sb-config -V
    sb-config --version

  Get help for this binary

    sb-config --help
    sb-config -h

## ENVIRONMENT AND CONFIGURATION VARIABLES

  SB_LOG_LEVEL='info'
    This will not be respected by this binary

  <package.json>.spellbook.log-level=info
    This will not be respected by this binary

## SEE ALSO

  sb(1)

## EXIT

  0 - all commands succeeded
  1 - one or more sub-command failed

## Spellbook

  Part of the sb(1) suite
