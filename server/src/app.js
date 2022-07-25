const express = require('express');
const cors = require('cors');

const usersController = require('./05-controllers/users-controllers');
const vacationController = require('./05-controllers/vacations-controllers');

const config = require('./01-utils/config');
const errorsHandler = require('./07-errors/error-handler');

const port = +config.port;
const origin = config.origin;

const server = express();

server.use(cors({ origin }));
server.use(express.json());

server.use('/users', usersController);
server.use('/vacations', vacationController);
server.use(errorsHandler);

server.listen(3001, () => console.log(`Listening on http://localhost:${port}`));
