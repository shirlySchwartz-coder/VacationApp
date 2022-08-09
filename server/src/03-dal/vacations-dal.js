//const connection = require('./dal');
const dal = require('../03-dal/dal');

async function getVacationsByPage(pageNumber, amountOfItemsPerPage) {
  let sql = `SELECT 
    vacation_id as vacationId, destination, price, amount_of_followers as amountOfFollowers,
    image_url as imageUrl, start_date as startDate, end_date as endDate, description 
   FROM vacations_db.vacations order by vacation_id LIMIT ? OFFSET ?`;

  let offset = (pageNumber - 1) * amountOfItemsPerPage;
  let params = [amountOfItemsPerPage, offset];

  try {
    let vacationsPerPage = await dal.query(sql, params);
    return vacationsPerPage;
  } catch (e) {
    throw e;
  }
}

async function getOneVacationAsync(id) {
  let params = id;
  const sql = `SELECT 
   vacation_id as vacationId, destination, price, amount_of_followers as amountOfFolowers,image_url as imageUrl, start_date as startDate, end_date as endDate, description FFROM vacations where vacation_id = ?`;
  try {
    const vacation = await dal.executeWithParams(sql, params);
    return vacation;
  } catch (error) {
    throw new ServerError(ErrorType.GENERAL_ERROR, JSON.stringify(), error);
  }
}

async function addVacationAsync(vacation) {
  const sql = `INSERT INTO vacations
  (destination, price , image_url, start_date, end_date, description )
  VALUES(?,?,?,?,?,?)`;

  const params = [
    vacation.destination,
    vacation.price,
    vacation.imageUrl,
    vacation.startDate,
    vacation.endDate,
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
async function addVacationToFollow(id) {
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
  getVacationsByPage,
  addVacationAsync,
  deleteVacationAsync,
  getVacationsByPage,
  getOneVacationAsync,
  addVacationToFollow,
};
