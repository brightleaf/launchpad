const AWS = require('aws-sdk')

module.exports = bucket => {
  const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_DEFAULT_REGION,
  })
  const params = {
    Bucket: bucket,
  }
  return new Promise((resolve, reject) => {
    s3.headBucket(params, function(err, data) {
      if (err) {
        console.info('there is an err', err.statusCode)
        console.info('there is an err', err.code)
        console.error('Error from head bucket', err)

        if (err.statusCode === 403) return reject(err)
        if (err.statusCode === 404) return resolve(false)
      } else {
        return resolve(true)
      }
    })
  })
}
