#!/usr/bin/env node

/* eslint no-console:0 */

import minimist from 'minimist';
import os from 'os';
import path from 'path';
import sh from 'shelljs';
import tsts from 'tsts';

const argv = minimist(process.argv.slice(2));

// Get a full list of spells.
const spells = sh.ls(path.join(__dirname, 'spells'))
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
` + os.EOL;

// Attempt to cast a spell...
if (argv._.length) {
  let name = argv._[0];

  if (spells.indexOf(name) === -1) {
    console.error(`"${name}" is not a known spell!`);
    console.log(os.EOL + help);
    process.exit(1);
  }

  // A spell takes an object representing the plugin's `package.json` file
  // and an argv object (as parsed by minimist). It should return a string
  // message indicating completion. It should also expose a `help()`
  // function, which returns a string with help text for the spell.
  let spell = require(path.join(__dirname, 'spells', name));

  if (argv.help) {
    console.log(spell.help());
  } else {
    try {
      let pkg = require(path.join(process.cwd(), 'package.json'));

      spell(pkg, argv);
    } catch (x) {
      if (x.code === 'MODULE_NOT_FOUND') {
        console.error(`cast must be called from a plugin directory`);
      } else {
        throw x;
      }
    }
  }

// Everything that doesn't include at least a spell name dumps the help text.
} else {
  console.log(help);
}
