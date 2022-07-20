const config = {
  port: 3001,
  mySql: {
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'vacations_db',
  },
  origin: 'http://localhost:3000',
  loginExpiresIn: "30m",
  secretKey: 'ThisisMySecretKeySentance@#$#$'
};

module.exports = config;
