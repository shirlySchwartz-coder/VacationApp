const dal = require('../04-dal/dal');
const ServerError = require('../03-errors/error-handler');
const ErrorType = require('../03-errors/error-type');

async function getAllVacationsAsync() {
  const sql = `SELECT * FROM vacations`;
  try {
    const vacations = await dal.execute(sql);
  return vacations;
  } catch (error) {
    //throw new ServerError(ErrorType.GENERAL_ERROR, JSON.stringify(), e);
    next(err)
  }  
}

async function getOneVacationAsync(id) {
  let params = id;
  const sql = `SELECT * FROM vacations where id =` + params;
  try {
    const vacation = await dal.execute(sql, params);
  return vacation;
  } catch (error) {
    //throw new ServerError(ErrorType.GENERAL_ERROR, JSON.stringify(), e);
    next(err)
  }
  
}

async function addVacationAsync(vacation) {
  const sql = `INSERT INTO vacations
  (destination, price ,amount_of_followers,is_followed, image_url, start_date, end_date,description )
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
  try {
    const sql = `DELETE FROM vacations WHERE id = ${id}`;
  await dal.execute(sql);
  } catch (error) {
    throw new ServerError(ErrorType.VACATION_DONT_EXIST, JSON.stringify(), e);
  }
  
}

module.exports = {
  getAllVacationsAsync,
  getOneVacationAsync,
  addVacationAsync,
  deleteVacationAsync
};
