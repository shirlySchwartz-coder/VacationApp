const dal = require('../03-dal/dal');
const ServerError = require('../07-errors/server-error');
const ErrorType = require('../07-errors/error-type');
const vacationsDal = require('../03-dal/vacations-dal')

// async function getAllVacationsAsync() {
//   const sql = `SELECT * FROM vacations`;
//   try {
//     const vacations = await dal.execute(sql);
//     return vacations;
//   } catch (error) {
//     throw new ServerError(ErrorType.GENERAL_ERROR, JSON.stringify(), error);
//     next(err);
//   }
// }
async function getVacationsByPage(pageNumber, amountOfItemsPerPage){
  // Validation (helps prevent the security issue referenced in the controller)
  return await vacationsDal.getVacationsByPage(pageNumber, amountOfItemsPerPage);
}

async function getOneVacationAsync(id) {
  let params = id;
  const sql = `SELECT * FROM vacations where vacation_id = ?`;
  try {
    const vacation = await dal.executeWithParams(sql, params);
    return vacation;
  } catch (error) {
    throw new ServerError(ErrorType.GENERAL_ERROR, JSON.stringify(), error);
    next(err);
  }
}

async function addVacationAsync(vacation) {
  const sql = `INSERT INTO vacations
  (destination, price ,amount_of_followers, image_url, start_date, end_date,description )
  VALUES(?,?,?,?,?,?,?,?)`;

  const params = [
    vacation.destination,
    vacation.price,
    vacation.followers,
    vacation.followed,
    vacation.image,
    vacation.start,
    vacation.end,
    vacation.description,
  ];
  try {
    const info = await dal.executeWithParams(sql, params);
    vacation.vacationId = info.insertId;
    return vacation;
  } catch (error) {
    throw new ServerError(
      ErrorType.GENERAL_ERROR,
      json.stringify(vacation),
      error
    );
  }
}

async function deleteVacationAsync(id) {
  const params = [id];
  const sql = `DELETE FROM vacations WHERE vacation_id = ?`;
  try {
    await dal.executeWithParams(sql, params);
  } catch (error) {
    throw new ServerError(
      ErrorType.VACATION_DONT_EXIST,
      JSON.stringify(),
      error
    );
  }
}

module.exports = {
  //getAllVacationsAsync,
  getOneVacationAsync,
  addVacationAsync,
  deleteVacationAsync,
  getVacationsByPage,
};
