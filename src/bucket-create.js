const AWS = require('aws-sdk')

module.exports = bucket => {
  const s3 = new AWS.S3()
  const params = {
    Bucket: bucket,
  }
  return new Promise((resolve, reject) => {
    s3.createBucket(params, function(err, data) {
      if (err) {
        console.info('there is an err', err.statusCode)
        console.info('there is an err', err.code)
        console.info(err, err.stack)
      } else {
        return resolve(true)
      }
    })
  })
}
