const errorHandler = (err, request, response, next) => {
    // Meaning: This is a ServerError (!) --> OUR ERROR
    if (err.errorType != undefined) {

      if (err.errorType.isShowStackTrace) {
          console.error(err);
      }

      response.status(err.errorType.httpCode).json({ error: err.errorType.message });
      return;
  }

  // This is most definitely a bug (not a ServerError) and so we want the log
  // Reaching here means that we got an UNEXPECTED BUG which we didn't wrap with a ServerError
  console.error(err);
  response.status(700).json({ error: "General error" });
};

module.exports = errorHandler;
