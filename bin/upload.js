#!/usr/bin/env node

const path = require('path')
const fs = require('fs-extra')
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
      console.info('Prepare to upload')

      const doc = yaml.safeLoad(
        fs.readFileSync(path.join(process.cwd(), 'launchpad.yml'), 'utf8')
      )

      const { app, buildDir } = doc
      const { bucket } = doc.env[process.env.NODE_ENV || 'dev']

      if (opts) {
        if (opts[0].indexOf('.zip') > 0) {
          console.info('Upload file', opts[0])
          await upload(opts[0], bucket)
        } else {
          // assume directory
          console.info('Upload directory', opts[0])
          await uploadDirectory(opts[0], bucket)
        }
      } else {
        const exists = await fs.pathExists(
          path.resolve(process.cwd(), `${app}.zip`)
        )
        if (exists) {
          console.info('Upload file', `${app}.zip`)
          await upload(`${app}.zip`, bucket)
        } else {
          console.info('Upload directory', buildDir)
          await uploadDirectory(buildDir, bucket)
        }
      }
    } catch (e) {
      console.error('Failed to upload', e)
    }
  })
  .parseAsync(process.argv)

console.info('is dir', program.dir)

console.log('end')
