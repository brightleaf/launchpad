#!/usr/bin/env node

const program = require('commander')
const pkg = require('../package.json')

program
  .version(pkg.version)
  .description(pkg.description)
  .command('upload [name]', 'upload a directory or file', {
    executableFile: 'upload',
  })
  .alias('u')

program
  .command('promote [query]', 'Promote lambda function', {
    executableFile: 'promote',
  })
  .alias('r')

program
  .command('bundle [query]', 'bundle lambda functions', {
    executableFile: 'bundle',
  })
  .alias('b')

program
  .command('publish', 'publish the package', { executableFile: 'publish' })
  .alias('p')
  .action((cmd, options) => {
    console.info('Prepare for liftoff')
  })
  .parse(process.argv)

// here .command() is invoked with a description,
// and no .action(callback) calls to handle sub-commands.
// this tells commander that you're going to use separate
// executables for sub-commands, much like git(1) and other
// popular tools.

// here only ./pm-install(1) is implemented, however you
// would define ./pm-search(1) and ./pm-list(1) etc.

// Try the following:
//   ./examples/pm
//   ./examples/pm help install
//   ./examples/pm install -h
//   ./examples/pm install foo bar baz
//   ./examples/pm install foo bar baz --force
