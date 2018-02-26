const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('express-jwt');
const cors = require('cors');

const projects = require('./routes/projects');
const timeEntries = require('./routes/timeEntries');
const ping = require('./routes/ping');
const error = require('./routes/error');

module.exports = () => {
  const app = express();

  app.use(bodyParser.urlencoded({
    extended: true,
  }));
  app.use(bodyParser.json());

  app.use(cors());

  const authenticate = jwt({
    secret: process.env.AUTH0_CLIENT_SECRET || 'wolololo',
  });

  app.use('/projects', authenticate, projects);
  app.use('/timeEntries', authenticate, timeEntries);
  app.use('/ping', ping);
  app.use(error);

  return app;
};
