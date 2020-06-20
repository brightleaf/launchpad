const fs = require('fs')

const archiver = require('archiver')

module.exports = (fileToZip, filename) => {
  const ZIP_FILE = `${filename}.zip`

  return new Promise((resolve, reject) => {
    const output = fs.createWriteStream(process.cwd() + '/' + ZIP_FILE)
    const archive = archiver('zip', {
      zlib: { level: 9 },
    })

    output.on('close', function() {
      console.info(archive.pointer() + ' total bytes')
      console.info(
        'archiver has been finalized and the output file descriptor has closed.'
      )
      console.info(`${ZIP_FILE} written`)
      return resolve()
    })

    output.on('end', function() {
      console.info('Data has been drained')
    })

    archive.on('warning', function(err) {
      if (err.code === 'ENOENT') {
        console.warn(err)
      } else {
        reject(err)
      }
    })

    archive.on('error', function(err) {
      console.error(err)
      reject(err)
    })

    archive.pipe(output)
    const fname = fileToZip.split('/').pop()
    archive.file(fileToZip, { name: fname })

    archive.finalize()
  })
}
