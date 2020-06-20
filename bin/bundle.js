#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const program = require('commander') // include commander in git clone of commander repo
const yaml = require('js-yaml')
const { each, delay } = require('@kev_nz/async-tools')
const bundle = require('../src/bundle')
const zipFile = require('../src/zip')
program
  .option('--no-dir', 'Not a directory')
  .option('-d, --dir', 'the target to upload is a directory')
  .option('-f', '--file', 'upload a particular file')
  .action(async (cmd, opts) => {
    try {
      const doc = yaml.safeLoad(
        fs.readFileSync(path.join(process.cwd(), 'launchpad.yml'), 'utf8')
      )

      const { app, functions, buildDir } = doc
      const { bucket } = doc.env[process.env.NODE_ENV || 'dev']
      console.info('app', app)
      console.info('bucket head', bucket)
      console.info('functions', functions)
      await each(Object.keys(functions), async fn => {
        const handler = functions[fn].handler
        const end = handler.split('/').pop()

        const name = end.split('.').pop()

        const newName = handler.replace(end, `${name}.js`)
        const filename = end.replace(end, `${name}.js`)

        await delay(10)
        console.info('cwd', process.cwd())
        console.info('buildDir', buildDir)
        await bundle(
          path.join(process.cwd(), newName),
          path.join(process.cwd(), buildDir, filename),
          fn
        )
      })
      console.info('zip it', path.join(process.cwd(), buildDir))
      await zipFile(path.join(process.cwd(), buildDir), `${app}`)
    } catch (e) {
      console.error('NOPE', e)
    }
  })
  .parseAsync(process.argv)
