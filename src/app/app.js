const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('express-jwt');
const cors = require('cors');
const dotenv = require('dotenv');

const projects = require('./routes/projects');
const timeEntries = require('./routes/time_entries');
const error = require('./routes/error');

module.exports = () => {
  dotenv.load();

  const app = express();

  app.use(bodyParser.urlencoded({
    extended: true,
  }));
  app.use(bodyParser.json());

  app.use(cors());

  const authenticate = jwt({
    secret: process.env.AUTH0_CLIENT_SECRET || 'wolololo',
    audience: process.env.AUTH0_CLIENT_ID || 'audience',
  });

  app.use('/projects', projects);
  app.use('/timeEntries', timeEntries);
  app.use(error);

  return app;
};
