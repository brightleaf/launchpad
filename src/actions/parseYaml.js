const fs = require('fs')
const path = require('path')
const yaml = require('js-yaml')

module.exports = (fileName = 'launchpad.yml') => {
  const yamlFilePath = path.join(process.cwd(), fileName)

  return yaml.safeLoad(fs.readFileSync(yamlFilePath, 'utf8'))
}
