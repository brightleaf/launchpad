const AWS = require('aws-sdk')
const lambda = new AWS.Lambda({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_DEFAULT_REGION,
})
module.exports = (lambdaName, tEnv = 'dev') => {
  const target = tEnv[0].toUpperCase() + tEnv.substring(1)
  const LAMBDA_ENV = `${lambdaName}-${target.toLowerCase()}`

  const params = {
    FunctionName: LAMBDA_ENV,
  }

  return new Promise((resolve, reject) => {
    lambda.getFunction(params, function(err, data) {
      if (err) {
        console.info(err, err.stack)
        return resolve(false)
      } else {
        return resolve(true)
      }
    })
  })
}
