module.exports.hello = async event => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Launchpad! Hello',
        input: event,
      },
      null,
      2
    ),
  }
}
