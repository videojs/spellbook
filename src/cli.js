#!/usr/bin/env node

import minimist from 'minimist';
import os from 'os';
import path from 'path';
import sh from 'shelljs';
import tsts from 'tsts';

const argv = minimist(process.argv.slice(2));

// Get a full list of spells.
const spells = sh.ls('./spells')
  .filter(f => path.extname(f) === '.js')
  .map(f => path.basename(f, '.js'));

const help = tsts.pre`
  Use the "cast" command to run automation sub-commands (a.k.a. "spells")
  on a video.js plugin project using this format:

    cast <spell-name> [args] [options]

  Available spells are:

    ${spells.join(os.EOL + '    ')}

  For more information on any of these spells, run:

    cast <spell-name> --help
` + os.EOL + os.EOL;

// Attempt to cast a spell...
if (argv._.length) {
  let name = argv._[0];

  if (spells.indexOf(name) === -1) {
    process.stdout.write(`"${name}" is not a known spell!` + os.EOL + os.EOL);
    process.stdout.write(help);
    process.exit(1);
  }

  let spell = require(`./spells/${name}`);

  // A spell takes an argv object and a string representing the cwd. It
  // returns a Readable stream, which is piped to stdout. It should also
  // have a `help` function attached to it, which returns a string.
  if (argv.help) {
    process.stdout.write(spell.help());
  } else {
    spell(argv, process.cwd()).pipe(process.stdout);
  }

// Everything that doesn't include at least a spell name dumps the help text.
} else {
  process.stdout.write(help);
}
