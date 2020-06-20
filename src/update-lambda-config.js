const AWS = require('aws-sdk')
const lambda = new AWS.Lambda({})
// eslint-disable-next-line spellcheck/spell-checker
/*
var params = {
  FunctionName: 'STRING_VALUE', * required *
  DeadLetterConfig: {
    TargetArn: 'STRING_VALUE'
  },
  Description: 'STRING_VALUE',
  Environment: {
    Variables: {
      '<EnvironmentVariableName>': 'STRING_VALUE',
       '<EnvironmentVariableName>': ...
    }
  },
  Handler: 'STRING_VALUE',
  KMSKeyArn: 'STRING_VALUE',
  Layers: [
    'STRING_VALUE',
    -* more items *-
  ],
  MemorySize: 'NUMBER_VALUE',
  RevisionId: 'STRING_VALUE',
  Role: 'STRING_VALUE',
  Runtime: nodejs | nodejs4.3 | nodejs6.10 | nodejs8.10 | nodejs10.x | nodejs12.x | java8 | java11 | python2.7 | python3.6 | python3.7 | python3.8 | dotnetcore1.0 | dotnetcore2.0 | dotnetcore2.1 | nodejs4.3-edge | go1.x | ruby2.5 | provided,
  Timeout: 'NUMBER_VALUE',
  TracingConfig: {
    Mode: Active | PassThrough
  },
  VpcConfig: {
    SecurityGroupIds: [
      'STRING_VALUE',
      -* more items *-
    ],
    SubnetIds: [
      'STRING_VALUE',
      -* more items *-
    ]
  }
};
*/
module.exports = config => {
  return new Promise((resolve, reject) => {
    if (config.FunctionName === undefined) {
      return reject(new Error('FunctionName is required'))
    }
    lambda.updateFunctionConfiguration(config, function(err, data) {
      if (err) {
        console.info(err, err.stack)
        return reject(err)
      } else {
        return resolve(data)
      }
    })
  })
}
