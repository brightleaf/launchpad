var exampleParams = {
  Code: {
    /* required */
    S3Bucket: 'BUCKET_NAME',
    S3Key: 'ZIP_FILE_NAME',
  },
  FunctionName: 'slotTurn' /* required */,
  Handler: 'slotSpin.Slothandler' /* required */,
  Role: 'ROLE_ARN' /* required */,
  Runtime: 'nodejs8.10' /* required */,
  Description: 'Slot machine game results generator',
}

const AWS = require('aws-sdk')
const lambda = new AWS.Lambda({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_DEFAULT_REGION,
})

const iam = new AWS.IAM({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_DEFAULT_REGION,
})
module.exports = async (
  lambdaName,
  zipFile,
  bucket,
  handler,
  options = {
    runtime: 'nodejs12.x',
    description: 'Lambda Function',
    role: 'serverless-Lambda-Basic',
  },
  tEnv = 'dev'
) => {
  const target = tEnv[0].toUpperCase() + tEnv.substring(1)
  const LAMBDA_ENV = `${lambdaName}-${target.toLowerCase()}`

  const iamParams = {
    RoleName: options.role,
  }
  const roleDeets = await iam.getRole(iamParams).promise()
  console.log('role details', roleDeets)
  const params = {
    FunctionName: LAMBDA_ENV,

    Code: {
      /* required */
      S3Bucket: bucket,
      S3Key: zipFile,
    },
    Handler: handler /* required */,
    Role: roleDeets.Role.Arn,
    Runtime: options.runtime,
    Description: options.description,
  }

  return new Promise((resolve, reject) => {
    lambda.createFunction(params, function(err, data) {
      if (err) {
        console.info(err, err.stack)
        return reject(err)
      } else {
        return resolve(data)
      }
      // lambda.updateFunctionConfiguration()
    })
  })
}
