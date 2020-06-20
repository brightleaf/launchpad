#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const program = require('commander') // include commander in git clone of commander repo
const yaml = require('js-yaml')
const uploadDirectory = require('../src/upload-dir')
const upload = require('../src/upload')
// Get document, or throw exception on error

program
  .option('--no-dir', 'Not a directory')
  .option('-d, --dir', 'the target to upload is a directory')
  .option('-f', '--file', 'upload a particular file')
  .action(async (cmd, opts) => {
    try {
      console.info('opts', opts)

      const doc = yaml.safeLoad(
        fs.readFileSync(path.join(process.cwd(), 'launchpad.yml'), 'utf8')
      )
      console.info('The DOC', doc)
      const { app, buildDir } = doc
      const { bucket } = doc.env[process.env.NODE_ENV || 'dev']
      console.info('build dir', buildDir)
      console.info('bucket head', bucket)

      if (opts) {
        console.info('the options - expect file or files to upload')
        console.info('opts', opts)
        await upload(opts[0], bucket) // each this
      } else {
        await upload(`${app}.zip`, bucket)
        // await uploadDirectory(buildDir, bucket)
      }
    } catch (e) {
      console.error('NOPE', e)
    }
  })
  .parseAsync(process.argv)

console.info('is dir', program.dir)

console.log('end')
