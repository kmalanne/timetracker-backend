const express = require('express');
const asyncRequest = require('../utils/asyncRequest');

const router = express.Router();

const getPing = async (req, res) => res.status(200).json({ ping: 'pong' });

router.get('/', asyncRequest.bind(null, getPing));

module.exports = router;
