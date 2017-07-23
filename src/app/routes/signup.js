const express = require('express');
const User = require('../../db/models/user');
const asyncRequest = require('../utils/asyncRequest');

const router = express.Router();

const createUser = async (req, res) => {
  const user = await User.getUser({
    user_id: req.body.user_id,
    email: req.body.email,
  });

  if (user !== null) {
    res.status(200).json(user);
  } else {
    const newUser = {
      user_id: req.body.user_id,
      email: req.body.email,
      name: req.body.name,
    };

    const id = await User.createUser(newUser);
    const result = await User.getUserById(id);
    res.status(200).json(result);
  }
};

router.post('/', asyncRequest.bind(null, createUser));

module.exports = router;
