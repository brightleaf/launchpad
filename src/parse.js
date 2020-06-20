const fs = require('fs')
const yaml = require('js-yaml')

module.exports = file => {
  try {
    const doc = yaml.safeLoad(fs.readFileSync(file, 'utf8'))
    console.info(doc)
    return doc
  } catch (e) {
    console.error(e)
  }
}
