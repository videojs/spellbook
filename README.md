# video.js Spellbook

The video.js Spellbook is a collection of CLI commands (a.k.a. "spells") and utility modules (a.k.a. "reagents") which are useful when developing [standard video.js plugins][standard]. While [the Yeoman generator][generator] can be used to scaffold the files comprising a plugin, it is in no way required to use the tools found herein.

## Installation

Install Spellbook with npm:

```sh
npm install --save-dev videojs-spellbook
```

Spellbook is ideally suited to being installed as a local module - part of your project's `"devDependencies"`. The `cast` command it exposes can then be called within npm `"scripts"`.

_Global installation is not recommended!_

## `cast`ing Spells

The `cast` command is used to invoke spells. Spells are sub-commands that perform automation tasks when run in a video.js plugin's root directory.

`cast` expects a spell name as its first argument followed by any other arguments or options available on a per-spell basis.

The generic template for a command is:

```sh
cast <name> [args] [options]
```

Complete spell listing and other help is available:

```sh
cast --help
```

The same goes for individual spells:

```sh
cast <name> --help
```

## Mixing in Reagents

Reagents are `import`-able/`require`-able Node modules that help eliminate repetitive boilerplate when testing video.js plugins. Things like mocking an actual player instance and faking asynchronous timers are addressed by reagents.

They do not provide useful functionality to the plugins themselves; plugins should be largely self-contained and as free from complex/bundled dependencies as possible.


[generator]: https://github.com/videojs/generator-videojs-plugin/
[standard]: https://github.com/videojs/generator-videojs-plugin/blob/master/docs/standards.md
