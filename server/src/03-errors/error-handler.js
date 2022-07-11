const errorHandler = (err, request, response, next) => {
  console.log(err);

  // Crash, like throw...:
  if (err instanceof Error) {
    response.status(err.status || 500).send(err.message);
    return;
  }

  // Client error:
  if (err instanceof ClientError) {
    response.status(err.status).send(err.message);
    return;
  }

  next();
};

module.exports = errorHandler;
