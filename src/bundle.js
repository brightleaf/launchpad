const fs = require('fs')
module.exports = (inputPath, outputPath, name) => {
  console.log('inputPath', inputPath)
  console.log('outputPath', outputPath)
  return require('@zeit/ncc')(inputPath, {
    cache: false,
    externals: [],
  }).then(({ code, map, assets }) => {
    console.info('code', code)
    // Assets is an object of asset file names to { source, permissions, symlinks }
    // expected relative to the output code (if any)
    console.info('assets', assets)

    fs.writeFileSync(outputPath, code)
  })
}
