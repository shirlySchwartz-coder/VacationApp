const { request, response, next } = require('express');
const express = require('express');
const logic = require('../04-logics/vacations-logic');

const router = express.Router();

//1. B Get All Vacations- By Pages
router.get('/', async (request, response, next) => {
  let pageNumber = +request.query.page;

  // What a potential attack, a security issue may exists here ??
  let itemsPerPage = +request.query.itemsPerPage;
  try {
    let currentPageVacations = await logic.getVacationsByPage(
      pageNumber,
      itemsPerPage
    );
    //console.log(currentPageVacations);
    response.json(currentPageVacations);
  } 
  catch (error) {
    return next(error);
  }
});

//2. Get Vacation By Id
router.get('/:vactionId', async (request, response, next) => {
  const vactionId = +request.params.vactionId;
  //console.log(vactionId);
  try {
    const vacation = await logic.getOneVacationAsync(vactionId);
    if (vacation.length > 0) {
      response.json(vacation);
    } else {
      response.json(`Vacation does not exist.`);
    }
  } 
  catch (error) {
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
    //response.status(400);
  } catch (error) {
    return next(error);
  }
});

//4. Delete Vacation
router.delete('/:vactionId', async (request, response, next) => {
  let vactionId = +request.params.vactionId;
  try {
    await logic.deleteVacationAsync(vactionId);
    //console.log(`Vacation ${vactionId} Was Deleted Sucssefuly`);
    response.json(`Vacation ${vactionId} Was Deleted Sucssefuly`);
  } catch (error) {
    return next(error);
  }
});

//http://localhost:3001/vacation/follow/:id
router.post('/follow/:vactionId', async (request, response, next) => {
  const id = request.body;

  try {
    const addedToFollowed = await logic.addVacationToFollow(id);
    console.log(addedToFollowed);
    if (addedToFollowed) {
      response.status(201).json(addedToFollowed);
    }
    //response.status(400);
  } catch (error) {
    return next(error);
  }
})

router.post('/:id/:vacation', async (req, res) => {
  console.log("in post");
  const userId = req.params.id;
  const favorite = req.params.vacation;
  console.log(userId, favorite);
  try{
      const result = await favoritesDal.addToFavorites(userId, favorite);
      socket.emitGetAllFavorites();
      res.status(200).send(result);
  }catch{
      res.status(500).send('Error');
  }
})
module.exports = router;
