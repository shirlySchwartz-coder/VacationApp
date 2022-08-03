const ServerError = require('../06-middlewares/07-errors/server-error');
const ErrorType = require('../06-middlewares/07-errors/error-type');
const vacationsDal = require('../03-dal/vacations-dal');
//const pushLogic = require('../04-logics/push-logic');

async function getVacationsByPage(pageNumber, amountOfItemsPerPage) {
  // Validation (helps prevent the security issue referenced in the controller)
  return await vacationsDal.getVacationsByPage(
    pageNumber,
    amountOfItemsPerPage
  );
}

async function getOneVacationAsync(id) {
  let vacation = await vacationsDal.getOneVacationAsync(sql, params);
  return vacation;
}

async function addVacationAsync(newVacation) {
  let vacation = await vacationsDal.addVacationAsync(sql, newVacation);
  return vacation;
}

async function deleteVacationAsync(id) {
  await vacationsDal.deleteVacationAsync(id);
  //pushLogic.broadcast("delete-vacation", {id});
}

module.exports = {
  getOneVacationAsync,
  addVacationAsync,
  deleteVacationAsync,
  getVacationsByPage,
};
