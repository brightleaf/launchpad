#!/usr/bin/env node

const program = require('commander')
const pkg = require('../package.json')

program.storeOptionsAsProperties(true).passCommandToAction(true)
program
  .version(pkg.version)
  .description(pkg.description)
  .option('-p, --prefix', 'the prefix to upload to')
  .command('upload [name]', 'upload a directory or file', {
    executableFile: 'upload',
  })
  .alias('u')

program
  .version(pkg.version)
  .description(pkg.description)
  .command('invalidate [distID]', 'Invalidate CloudFront Distribution', {
    executableFile: 'invalidate',
  })
  .alias('i')

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
