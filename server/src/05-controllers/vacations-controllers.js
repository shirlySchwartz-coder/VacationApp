const { request, response, next } = require('express');
const express = require('express');
const logic = require('../04-logics/vacations-logic');
//const paginatedResults = require('../06-middlewares/pagination')

const router = express.Router();

//Routing options

// //1. Get All Vacations
// router.get('/', async (request, response, next) => {
//   try {
//     //const vacations = await logic.getAllVacationsAsync();
//     let currentPageVacations = await logic.getVacationsByPage(pageNumber, limit);
    
//     console.log(currentPageVacations);
//     response.json(vacations);
//   } catch (error) {
//     console.log(`Vacations was not received `);
//     return next(error);
//   }
// });

//1. B Get All Vacations- By Pages
router.get("/", async (request, response, next) => { 
  try {
      let pageNumber = +request.query.page;
      
      // What a potential attack, a security issue may exists here ??
      let itemsPerPage = +request.query.itemsPerPage;
      
      let currentPageVacations = await logic.getVacationsByPage(pageNumber, itemsPerPage);
      console.log(currentPageVacations);
      response.json(currentPageVacations);
  }
  catch (e) {
      console.error(e);
      response.status(600).send(e.message)
  }
});


//2. Get Vacation By Id
router.get('/:vactionId', async (request, response, next) => {
  const vactionId = +request.params.vactionId;
  console.log(vactionId);
  try {
    const vacation = await logic.getOneVacationAsync(vactionId);
    if (vacation.length > 0) {
      response.json(vacation);
    } else {
      response.json(`Vacation does not exist.`);
    }
  } catch (error) {
    return next(error);
  }
});

//3. Add New Vacation
router.post('/', async (request, response, next) => {
  const vacation = request.body;

  try {
    const addedVacation = await logic.addVacationAsync(vacation);
    //console.log(addedVacation);
    if (addedVacation) {
      response.status(201).json(addedVacation);
    }
    response.status(400);
  } catch (error) {
    console.error('The vacation was not added');
    return next(error);
  }
});

//4. Delete Vacation
router.delete('/:vactionId', async (request, response, next) => {
  try {
    const vactionId = +request.params.vactionId;
    await logic.deleteVacationAsync(vactionId);
    console.log(`Vacation ${vactionId} Was Deleted Sucssefuly`);
    response.json(`Vacation ${vactionId} Was Deleted Sucssefuly`);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
