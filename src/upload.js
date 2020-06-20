const path = require('path')
const s3 = require('@auth0/s3')

module.exports = (file, bucket) => {
  const ZIP_FILE = file

  const client = s3.createClient({
    s3Options: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_DEFAULT_REGION,
    },
  })

  const params = {
    localFile: path.resolve(process.cwd(), ZIP_FILE),
    s3Params: {
      Bucket: bucket,
      Key: ZIP_FILE,
    },
  }
  console.info('the params', params)
  return new Promise((resolve, reject) => {
    const uploader = client.uploadFile(params)

    uploader.on('error', function(err) {
      console.error('unable to sync:', err.stack)
      reject(err)
    })

    uploader.on('progress', function() {
      console.info(
        'S3 Sync Progress',
        uploader.progressAmount,
        uploader.progressTotal
      )
    })

    uploader.on('end', function() {
      console.info('done uploading')
      return resolve(true)
    })
  })
}
