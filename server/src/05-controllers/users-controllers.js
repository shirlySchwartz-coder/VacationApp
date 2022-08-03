const { request, response, next } = require('express');
const express = require('express');
const Role = require('../02-models/role');
const logic = require('../04-logics/users-logic');
const validData = require('../06-middlewares/valid-data');

let isCheckUserData = validData.isCheckUserData;

const router = express.Router();

//Register - Add new user
router.post('/', async (request, response, next) => {
  let userToAdd = request.body;
  userToAdd.user_type = Role.User;
  try {
   
    let successfullRegisterData = await logic.registerAsync(userToAdd);
    //console.log(token);
    response.status(201).json(successfullRegisterData);
  } catch (error) {
    return next(error);
  }
});

//Login - get One User
router.post('/login', async (request, response, next) => {
  let user = request.body;

  try {
    let successfullLoginData = await logic.loginAsync(user);
    //console.log(token);
    response.status(200).json(successfullLoginData);
  } catch (error) {
    return next(error);
  }
});

//Update password
router.patch('/:id', isCheckUserData, async (request, response, next) => {
  const newPassword = request.body.newPassword;
    const userToUpdate = request.body;
  try {
    
    if (!newPassword) {
      return response.sendStatus(400);
    }

    const updatedToken = await logic.updatePasswordAsync(userToUpdate);
    console.log('Password changed successfully');
    response.status(200).json(updatedToken);
  }
   catch (error) {
    return next(error);
  }
});

module.exports = router;
