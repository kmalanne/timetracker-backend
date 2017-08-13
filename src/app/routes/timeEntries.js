const express = require('express');
const validate = require('express-validation');
const validations = require('./validations/timeEntries');
const TimeEntry = require('../../db/models/timeEntry');
const asyncRequest = require('../utils/asyncRequest');

const router = express.Router();

const getTimeEntries = async (req, res) => {
  const { query, user } = req;
  const timeEntries = await TimeEntry.getTimeEntries(query, user.sub);
  const count = await TimeEntry.getTotalCount();
  const result = Object.assign({}, { timeEntries }, { total: count });
  res.status(200).json(result);
};

const createTimeEntry = async (req, res) => {
  const { body, user } = req;
  const id = await TimeEntry.createTimeEntry(body, user.sub);
  const result = await TimeEntry.getTimeEntryById(id);
  res.status(200).json(result);
};

const deleteTimeEntry = async (req, res) => {
  const { params, user } = req;
  const result = TimeEntry.deleteTimeEntry(params.id, user.sub);
  res.status(200).json(result);
};

router.get('/', validate(validations.get), asyncRequest.bind(null, getTimeEntries));
router.post('/', validate(validations.create), asyncRequest.bind(null, createTimeEntry));
router.delete('/:id', validate(validations.delete), asyncRequest.bind(null, deleteTimeEntry));

module.exports = router;
