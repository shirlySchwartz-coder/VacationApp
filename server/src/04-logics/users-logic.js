const dal = require('../03-dal/dal');
const ServerError = require('../07-errors/server-error');
const ErrorType = require('../07-errors/error-type');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const jwtHelper = require('../08-helpers/jwt-helpers');
const validateUserData = require('../06-middlewares/valid-data');
const ischeckUserData = require('../06-middlewares/valid-data');

async function registerAsync(user) {
  // Validation:
  const errors = validateUserData(user);
  if (errors) throw new ServerError(ErrorType.GENERAL_ERROR, errors);

  //If user exist
  if (await isUserNameExist(user.user_name)) {
    throw new ServerError(ErrorType.USER_NAME_ALREADY_EXIST);
  }

  //Normelaize Data
  normalizeOptionalData(user);

  //Encryption
  user.password = encryptPassword(user.password);

  // Save Data:
  await addUser(user);

  // Create JWT Token:
  const token = jwtHelper.getNewToken(user);

  // Return the Token:
  return token;
}

async function isUserNameExist(user_name) {
  let sql = 'SELECT id from users where user_name = ?';
  let params = [user_name];
  let users = await dal.executeWithParams(sql, params);

  if (users && users.length > 0) {
    return true;
  }
  return false;
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

async function addUser(user) {
  let sql =
    `insert into users(user_name, password, user_type, first_name, last_name) ` +
    `values(?, ?, ?, ?, ?)`;
  let params = [
    user.user_name,
    user.password,
    user.user_type,
    user.first_name,
    user.last_name,
  ];
  try {
    let newUser = await dal.executeWithParams(sql, params);
    return newUser.insertId;
  } catch (error) {
    throw new ServerError(ErrorType.GENERAL_ERROR, JSON.stringify(user), error);
  }
}

//Login
async function loginAsync(credentials) {
  // Validation:
  const errors = validateUserData(credentials);
  if (errors) throw new ServerError(ErrorType.GENERAL_ERROR);

  credentials.password = encryptPassword(credentials.password);
  const userData = await getUserAsync(credentials);

  if (!userData) throw new ServerError(ErrorType.WRONG_USER_NAME_OR_PASSWORD);

  // Create JWT Token:
  const token = jwtHelper.getNewToken(userData);
  let now = new Date();
  let tokenStart = now.toUTCString();
  console.log(`${tokenStart} )----- User ${userData.userName} got Token`);

  // Return Token:
  return token;
}

async function getUserAsync(credentials) {
  let sql = `SELECT id, user_type as userType, first_name as firstName, user_name as userName 
    from users where user_name = ? and password = ?`;
  let params = [credentials.user_name, credentials.password];
  let [userData] = await dal.executeWithParams(sql, params);

  if (!userData) {
    return null;
  }
  return userData;
}

///Update Functions
async function updatePasswordAsync(userToUpdate) {
  const updatedUser = await changePassword(userToUpdate);
  if (!updatedUser)
    throw new ServerError(ErrorType.WRONG_USER_NAME_OR_PASSWORD);

  const newToken = jwtHelper.getNewToken(userToUpdate);
  return newToken;
}

async function changePassword(user) {
  let newPassword = encryptPassword(user.newPassword);
  let originalPassword = encryptPassword(user.password);
  let id = +user.fullToken.userId;
  let sql =
    'UPDATE users SET password = ? where id=? and user_name = ? and password = ?';
  let params = [newPassword, id, user.user_name, originalPassword];
  let updatedUser = await dal.executeWithParams(sql, params);

  if (!updatedUser || updatedUser.affectedRows === 0) {
    throw new ServerError(ErrorType.WRONG_USER_NAME_OR_PASSWORD);
  }
  return true;
}

module.exports = {
  registerAsync,
  isUserNameExist,
  addUser,
  loginAsync,
  updatePasswordAsync,
};
