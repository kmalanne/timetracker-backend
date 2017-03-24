const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');

const auth = require('./routes/auth');
const projects = require('./routes/projects');
const timeEntries = require('./routes/time_entries');
const error = require('./routes/error');

require('./config/passport.js')(passport);

module.exports = () => {
  const app = express();

  app.use(bodyParser.urlencoded({
    extended: true,
  }));
  app.use(bodyParser.json());

  app.use(session({
    secret: 'my_secret',
    resave: false,
    saveUninitialized: false,
  }));
  app.use(passport.initialize());
  app.use(passport.session());

  // const authenticated = (req, res, next) => {
  //   if (req.isAuthenticated()) {
  //     return next();
  //   }
  //   return res.sendStatus(401);
  // };

  app.use('/projects', projects);
  app.use('/timeEntries', timeEntries);
  app.use('/auth', auth);
  app.use(error);

  return app;
};
