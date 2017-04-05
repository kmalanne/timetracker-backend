const express = require('express');
const User = require('../../db/models/user');

const router = express.Router();

router.post('/', (req, res, next) => {
  User.getUser({
    user_id: req.body.user_id,
    email: req.body.email,
  })
    .then((user) => {
      if (user !== null) {
        res.status(200).json(user);
      } else {
        const newUser = {
          user_id: req.body.user_id,
          email: req.body.email,
          name: req.body.name,
        };

        User.createUser(newUser)
          .then(id => User.getUserById(id))
          .then(result => res.status(200).json(result))
          .catch(error => next(error));
      }
    })
    .catch(error => next(error));
});

module.exports = router;
