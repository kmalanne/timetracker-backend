const express = require('express');
const validate = require('express-validation');
const validations = require('./validations/timeEntries');
const TimeEntry = require('../../db/models/timeEntry');
const asyncRequest = require('../utils/asyncRequest');

const router = express.Router();

const getTimeEntries = async (req, res) => {
  const result = await TimeEntry.getTimeEntries();
  res.status(200).json(result);
};

const createTimeEntry = async (req, res) => {
  const id = await TimeEntry.createTimeEntry(req.body);
  const result = await TimeEntry.getTimeEntryById(id);
  res.status(200).json(result);
};

const deleteTimeEntry = async (req, res) => {
  const result = TimeEntry.deleteTimeEntry(req.params.id);
  res.status(200).json(result);
};

router.get('/', asyncRequest.bind(null, getTimeEntries));
router.post('/', validate(validations.create), asyncRequest.bind(null, createTimeEntry));
router.delete('/:id', validate(validations.delete), asyncRequest.bind(null, deleteTimeEntry));

module.exports = router;
