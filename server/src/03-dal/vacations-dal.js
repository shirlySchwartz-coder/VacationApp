//const connection = require('./dal');
const dal = require('../03-dal/dal');

async function getVacationsByPage(pageNumber, amountOfItemsPerPage) {
    let sql = `SELECT vacation_id, destination, price, amount_of_followers, image_url, start_date, end_date, description FROM vacations_db.vacations order by vacation_id LIMIT ? OFFSET ?`;

  let offset = (pageNumber - 1) * amountOfItemsPerPage;
  let params = [amountOfItemsPerPage , offset ];

  try {
    let vacationsPerPage = await dal.query(sql, params);
    return vacationsPerPage;
  } catch (e) {
    console.error(e);
    throw e;
  }
}

module.exports = {
  getVacationsByPage,
};
