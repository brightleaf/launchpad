#!/usr/bin/env node

const path = require('path')
const fs = require('fs-extra')
const program = require('commander') // include commander in git clone of commander repo
const yaml = require('js-yaml')
const invalidate = require('../src/invalidate')

program
  .action(async (cmd, opts) => {
    try {
      console.info('Prepare to invalidate', opts)
      const doc = yaml.safeLoad(
        fs.readFileSync(path.join(process.cwd(), 'launchpad.yml'), 'utf8')
      )

      const { distribution } = doc.env[process.env.NODE_ENV || 'dev']

      if (distribution) {
        await invalidate(distribution)
      } else if (opts && opts[0]) {
        await invalidate(opts[0])
      } else {
        console.warn('No Distribution ID to invalidate')
      }
    } catch (e) {
      console.error('Failed to upload', e)
    }
  })
  .parseAsync(process.argv)

console.log('end')
