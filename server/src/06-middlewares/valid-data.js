const ServerError = require('./07-errors/server-error');

function validateUserData(userName, password) {
  if (!userName) {
    throw new ServerError(ErrorType.USER_NAME_IS_MISSING);
  }
  if (!password) {
    throw new ServerError(ErrorType.PASSWORD_IS_MISSING);
  }
  if (password.length < 5) {
    throw new ServerError(ErrorType.PASSWORD_TO_SHORT);
  }
}

function isCheckUserData(request, response, next) {
  if (!request) throw new ServerError(ErrorType.REQUEST_IS_EMPTY);
  if (!request.body.fullToken) throw new ServerError(JSON.stringify('Login first'));
  if (!request.body.fullToken.token) throw new ServerError(JSON.stringify('No Valid Token'));
  if (!request.body.fullToken.userId) throw new ServerError(JSON.stringify('Not Valid Id'));
  const errors = validateUserData(request.body.fullToken.userName,request.body.password);
  if (errors) {
     throw new ServerError(JSON.stringify('Some thing is missing'));
     return;
  }
  next();
}

module.exports = {
  isCheckUserData,
  validateUserData,
};
