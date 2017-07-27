const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('express-jwt');
const cors = require('cors');
const dotenv = require('dotenv');

const signup = require('./routes/signup');
const projects = require('./routes/projects');
const timeEntries = require('./routes/timeEntries');
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
  });

  app.use('/signup', signup);
  app.use('/projects', authenticate, projects);
  app.use('/timeEntries', authenticate, timeEntries);
  app.use(error);

  return app;
};
