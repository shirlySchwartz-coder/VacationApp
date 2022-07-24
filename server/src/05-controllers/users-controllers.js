const { request, response, next } = require('express');
const express = require('express');
const Role = require('../02-models/role');
const logic = require('../04-logics/users-logic');
const checkUserData = require('../06-middlewares/valid-data');

const isCheckUserData = checkUserData.isCheckUserData;

const router = express.Router();
//Register - Add new user
router.post('/', async (request, response, next) => {
  try {
    const userToAdd = request.body;
    userToAdd.user_type = Role.User;
    const token = await logic.registerAsync(userToAdd);
    //console.log(token);
    response.status(201).json(token);
  } catch (err) {
    return next(err);
  }
});

//Login - get One User
router.post('/login', async (request, response, next) => {
  try {
    const credentials = request.body;
    const token = await logic.loginAsync(credentials);
    //console.log(token);
    response.status(200).json(token);
  } catch (err) {
    return next(err);
  }
});

//Update password
router.patch('/:id', isCheckUserData, async (request, response, next) => {
  try {
    const newPassword = request.body.newPassword;
    const userToUpdate = request.body;
    if (!newPassword) {
      return response.sendStatus(400);
    }

    const updatedToken = await logic.updatePasswordAsync(userToUpdate);
    console.log('Password changed successfully');
    response.status(200).json(updatedToken);
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
