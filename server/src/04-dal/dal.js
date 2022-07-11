const mysql = require('mysql2');
const ServerError = require('../03-errors/error-handler')
const ErrorType = require('../03-errors/error-type')

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'vacations_db',
});

// Connect to the database: 
connection.connect(err => {
  if (err) {
      console.log("Failed to create connection + " + err);
      return;
  }
  console.log("We're connected to MySQL");
});

function execute(sql) {
  return new Promise((resolve, reject) => {
    connection.query(sql, (err, result) => {
      if (err) {
        
        reject(err);
        return;
      }
      resolve(result);
    });
  });
}

function executeWithParams(sql, params) {
  return new Promise((resolve, reject) => {
    connection.execute(sql, params, (err, result) => {
      if (err) {
        console.log('Error' + err);
        reject(err);
        return;
      }
      resolve(result);
    });
  });
}

module.exports = {
  execute,
  executeWithParams,
};
