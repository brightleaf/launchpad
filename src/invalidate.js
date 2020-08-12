const AWS = require('aws-sdk')

const invalidate = async (accessKeyId, secretAccessKey, distributionId) => {
  console.info('Invalidate CloudFront Distribution')
  AWS.config.update({ accessKeyId, secretAccessKey })
  const cloudfront = new AWS.CloudFront()

  const timestamp = Math.floor(Date.now() / 1000).toString()
  const params = {
    DistributionId: distributionId,
    InvalidationBatch: {
      CallerReference: `launchpad-invalidate-s3-${timestamp}`,
      Paths: {
        Quantity: 4,
        Items: ['/index.html', '/static/*', '/*', '/*/*'],
      },
    },
  }

  await cloudfront.createInvalidation(params).promise()
}
module.exports = distId => {
  if (!distId && !process.env.DISTRIBUTION_ID) {
    throw new Error('A Distribution ID is required')
  }
  invalidate(
    process.env.AWS_SECRET_ACCESS_KEY_ID,
    process.env.AWS_SECRET_ACCESS_KEY,
    distId || process.env.DISTRIBUTION_ID
  )
    .then(() => {
      console.info('done')
    })
    .catch(_err => {
      console.error('Failed', _err)
    })
}
