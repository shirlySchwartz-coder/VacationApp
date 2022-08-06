const dal = require('../03-dal/dal');

async function isUserNameExist(userName) {
  let sql = 'SELECT user_id as userId from users where user_name = ? as userName';
  let params = [userName];
  let users = await dal.executeWithParams(sql, params);

  if (users && users.length > 0) {
    return true;
  }
  return false;
}

async function addUser(user) {
  let sql =
    `INSERT into users( user_name, password,  user_type,  first_name,  last_name) ` +
    `values(?, ?, ?, ?, ?)`;
  let params = [
    user.userName,
    user.password,
    user.userType,
    user.firstName,
    user.lastName,
  ];
  try {
    let newUser = await dal.executeWithParams(sql, params);
    return newUser.insertId;
  } catch (error) {
    throw new ServerError(ErrorType.GENERAL_ERROR, JSON.stringify(user), error);
  }
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
  async function getUserAsync(credentials) {
    let sql = `SELECT user_id as UserId, user_type as userType, first_name as firstName, user_name as userName 
      from users where user_name = ? and password = ?`;
    let params = [credentials.userName, credentials.password];
    let [userData] = await dal.executeWithParams(sql, params);
  
    if (!userData) {
      return null;
    }
    return userData;
  }
module.exports = {
  isUserNameExist,
  addUser,
  changePassword,
  getUserAsync
};
