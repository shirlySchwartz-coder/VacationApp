const express = require('express');
const cors = require('cors');

const vacationController = require('./06-controllers/vacations-controllers');
const config = require('./01-utils/config');
const errorsHandler = require('./03-errors/error-handler');
const port = +config.port;
const origin = config.origin;

const server = express();

server.use(cors({ origin }));
server.use(express.json());

server.use('/', vacationController);
server.use(errorsHandler);

server.listen(3001, () => console.log(`Listening on http://localhost:${port}`));
