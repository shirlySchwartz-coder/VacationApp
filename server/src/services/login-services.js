const ServerError = require('../06-middlewares/errors/server-error');
const jwt = require('jsonwebtoken');
const crypto = require("crypto");

function validateUserData(data) {
  if (!data.userName) {
    throw new ServerError(ErrorType.USER_NAME_IS_MISSING);
  }
  if (!data.password) {
    throw new ServerError(ErrorType.PASSWORD_IS_MISSING);
  }
  if (data.password.length < 5) {
    throw new ServerError(ErrorType.PASSWORD_TO_SHORT);
  }
  
}

function isCheckUserData(request, response, next) {
  if (!request) throw new ServerError(ErrorType.REQUEST_IS_EMPTY);
  if (!request.body.fullToken) throw new ServerError(JSON.stringify('Login first'));
  if (!request.body.fullToken.token) throw new ServerError(JSON.stringify('No Valid Token'));
  if (!request.body.fullToken.userId) throw new ServerError(JSON.stringify('Not Valid Id'));
  const errors = validateUserData(request.body.fullToken.userName, request.body.password);
  if (errors) {
     throw new ServerError(JSON.stringify('Some thing is missing'));
     return;
  }
  next();
}

function normalizeOptionalData(user) {
  if (!user.first_name) {
    user.first_name = '';
  }
  if (!user.last_name) {
    user.last_name = '';
  }
}

function encryptPassword(password) {
  const saltRight = 'sdkjfhdskajh';
  const saltLeft = '--mnlcfs;@!$ ';
  let passwordWithSalt = saltLeft + password + saltRight;
  return crypto.createHash('md5').update(passwordWithSalt).digest('hex');
}

module.exports = {
  isCheckUserData,
  validateUserData,
  normalizeOptionalData,
  encryptPassword
};
