#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const program = require('commander') // include commander in git clone of commander repo
const yaml = require('js-yaml')

const { each, delay } = require('@kev_nz/async-tools')
const updateCode = require('../src/update-lambda-code')
const getCode = require('../src/get-lambda')
const createLambda = require('../src/create-lambda')
const updateConfig = require('../src/update-lambda-config')
// Get document, or throw exception on error

program
  .option('-f', '--file', 'upload a particular file')
  .action(async (cmd, opts) => {
    try {
      console.info('opts', opts)
      const ymlFilePath = path.join(process.cwd(), 'launchpad.yml')

      const doc = yaml.safeLoad(fs.readFileSync(ymlFilePath, 'utf8'))
      console.info('The DOC', doc)

      const { buildDir, app, functions } = doc
      const { bucket } = doc.env[process.env.NODE_ENV || 'dev']
      console.info('build directory', buildDir)
      console.info('bucket head', bucket)
      await each(Object.keys(functions), async fn => {
        const handler = functions[fn].handler

        await delay(10)
        // eslint-disable-next-line spellcheck/spell-checker
        console.info('cwd', process.cwd())
        console.info('buildDir', buildDir)

        const exists = await getCode(functions[fn].name)

        if (exists) {
          console.info('update the Lambda', functions[fn].name)
          await updateCode(functions[fn].name, `${app}.zip`, bucket)
        } else {
          console.info('create the Lambda', functions[fn].name)
          await createLambda(
            functions[fn].name,
            `${app}.zip`,
            bucket,
            handler,
            functions[fn]
          )
        }
        // configure the lambda after create or update
      })
      // await updateCode()
      // await updateConfig()
    } catch (e) {
      console.error('NOPE', e)
    }

    console.info('promote complete')
  })
  .parseAsync(process.argv)
