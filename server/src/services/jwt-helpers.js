const jwt = require('jsonwebtoken');
const config = require('../01-utils/config');

const secretKey = config.secretKey;

function getNewToken(user) {
  let payload = {};
  if (user.fullToken) {
    const updateUser = getUserFromUpdate(user);
    payload = updateUser;
  } else {
    payload = user;
  }

  const token = jwt.sign(payload, secretKey, {
    expiresIn: config.loginExpiresIn,
  });
  const tokenWithData = {
    token,
    userName: payload.userName,
    firstName: payload.firstName,
    userType: payload.userType,
    userId: payload.userId,
  };
  return tokenWithData;
}

function getUserFromUpdate(user) {
  let userData = user.fullToken;
  updateUser = {
    userName: userData.userName,
    firstName: userData.firstName,
    userType: userData.userType,
    userId: userData.userId,
  };

  return updateUser;
}

module.exports = {
  getNewToken,
};
