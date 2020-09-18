#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const program = require('commander') // include commander in git clone of commander repo
const yaml = require('js-yaml')

const { each, delay } = require('@kev_nz/async-tools')

// Get document, or throw exception on error

program
  .option('-f', '--file', 'upload a particular file')
  .action(async (cmd, opts) => {
    try {
      const ymlFilePath = path.join(process.cwd(), 'launchpad.yml')

      const doc = yaml.safeLoad(fs.readFileSync(ymlFilePath, 'utf8'))
      console.info('The DOC', doc)
      const targetEnv = process.env.NODE_ENV || 'dev'
      const { buildDir, app, functions } = doc
      const { bucket } = doc.env[process.env.NODE_ENV || 'dev']
      console.info('build dir', buildDir)
      console.info('bucket head', bucket)
      await each(Object.keys(functions), async fn => {
        const handler = functions[fn].handler
        const end = handler.split('/').pop()

        const name = end.split('.').pop()

        const newName = handler.replace(end, `${name}.js`)
        const filename = end.replace(end, `${name}.js`)

        await delay(10)
        console.info('cwd', process.cwd())
        console.info('buildDir', buildDir)
        console.log('update code args', fn, `${app}.zip`, bucket)
        const exists = await getCode(functions[fn].name)

        if (exists) {
          await updateCode(functions[fn].name, `${app}.zip`, bucket)
        } else {
          console.log('nope')
          await createLambda(
            functions[fn].name,
            `${app}.zip`,
            bucket,
            handler,
            functions[fn]
          )
        }
      })
      // await updateCode()
      // await updateConfig()
    } catch (e) {
      console.error('NOPE', e)
    }
  })
  .parseAsync(process.argv)
