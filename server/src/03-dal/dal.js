const mysql = require('mysql2');
const ServerError = require('../06-middlewares/07-errors/error-handler')
const ErrorType = require('../06-middlewares/07-errors/error-type')

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
    connection.execute(sql, (err, result) => {
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

function query(sql, parameters){
  return new Promise((resolve, reject) => {
      connection.query(sql, parameters, (err, result) => {
          if (err) {
              //console.log("Error " + err);
              console.log("Failed interacting with DB, calling reject")
              reject(err)
              return
          }
          resolve(result)
      })
  })
}

module.exports = {
  execute,
  executeWithParams,
  query
};
