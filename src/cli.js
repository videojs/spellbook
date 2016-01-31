#!/usr/bin/env node

/* eslint no-console:0 */

import chalk from 'chalk';
import minimist from 'minimist';
import os from 'os';
import path from 'path';
import tsts from 'tsts';
import dirf from './lib/dirf';
import spells from './spells';

const argv = minimist(process.argv.slice(2));

const help = tsts.pre`
  Use the "cast" command to run automation sub-commands (a.k.a. "spells")
  on a video.js plugin project using this format:

    cast <spell-name> [args] [options]

  Available spells are:

    ${Object.keys(spells).join(os.EOL + '    ')}

  For more information on any of these spells, run:

    cast <spell-name> --help
` + os.EOL;

// Attempt to cast a spell...
if (argv._.length) {
  let name = argv._[0];

  if (!spells.hasOwnProperty(name)) {
    console.error(`"${name}" is not a known spell!`);
    console.log(os.EOL + help);
    process.exit(1);
  }

  let spell = require(path.join(__dirname, 'spells', name));

  if (argv.help) {
    console.log(spell.help());
  } else {
    try {
      let start = Date.now();

      spell(dirf(), argv)
        .then((output) => {
          if (output) {
            console.log(output + os.EOL);
          }
          console.log(chalk.green(
            `(∩｀-´)⊃━☆ﾟ.*･｡ﾟ ${name} completed in ${Date.now() - start}ms!`
          ));
        }, (output) => {
          if (output) {
            console.log(output + os.EOL);
          }
          console.log(chalk.red(`(u ´-\`)⊃━... . . ${name} failed!`));
        });
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
