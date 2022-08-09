//const jwt = require('jsonwebtoken');
const crypto = require('crypto');
//const dal = require('../03-dal/dal');
const ServerError = require('../06-middlewares/errors/server-error');
const ErrorType = require('../06-middlewares/errors/error-type');

const jwtHelper = require('../services/jwt-helpers');
const { validateUserData, normalizeOptionalData, encryptPassword } = require('../services/login-services');
const usersDal = require('../03-dal/users-dal');

async function registerAsync(user) {
  // // Validation:
  // const errors = validateUserData(user);
  // if (errors) throw new ServerError(ErrorType.GENERAL_ERROR, errors);

   validateUserData(user);
  

  //If user exist
  if (await usersDal.isUserNameExist(user.userName)) {
    throw new ServerError(ErrorType.USER_NAME_ALREADY_EXIST);
  }

  //Normelaize Data
  normalizeOptionalData(user);

  //Encryption
  user.password = encryptPassword(user.password);

  // Save Data:
  await usersDal.addUser(user);

  // // Create JWT Token:
  // const token = jwtHelper.getNewToken(user);

  // // Return the Token:
  // return token;
}


//Login
async function loginAsync(credentials) {
  // Validation:
  const errors = validateUserData(credentials);
  if (errors) throw new ServerError(ErrorType.GENERAL_ERROR);

  credentials.password = encryptPassword(credentials.password);
  const userData = await usersDal.getUserAsync(credentials);

  if (!userData) throw new ServerError(ErrorType.WRONG_USER_NAME_OR_PASSWORD);
  

  // Create JWT Token:
  const fullToken = jwtHelper.getNewToken(userData);
  let now = new Date();
  let tokenStart = now.toUTCString();
  console.log(`${tokenStart} )----- User ${userData.userName} got Token`);

  // Return Token:
  return fullToken;
}

///Update Functions
async function updatePasswordAsync(userToUpdate) {
  const updatedUser = await usersDal.changePassword(userToUpdate);
  if (!updatedUser)
    throw new ServerError(ErrorType.WRONG_USER_NAME_OR_PASSWORD);

  const newToken = jwtHelper.getNewToken(userToUpdate);
  return newToken;
}

module.exports = {
  registerAsync,
  loginAsync,
  updatePasswordAsync,
};
