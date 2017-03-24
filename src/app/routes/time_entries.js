const express = require('express');
const validate = require('express-validation');
const validations = require('./validations/time_entries');
const TimeEntry = require('../../db/models/time_entry');

const router = express.Router();

router.get('/', (req, res, next) => {
  TimeEntry.getTimeEntries()
    .then(result => res.status(200).json(result))
    .catch(error => next(error));
});

router.post('/', validate(validations.create), (req, res, next) => {
  TimeEntry.createTimeEntry(req.body)
    .then(id => TimeEntry.getTimeEntryById(id))
    .then(result => res.status(200).json(result))
    .catch(error => next(error));
});

router.delete('/:id', validate(validations.delete), (req, res, next) => {
  TimeEntry.deleteTimeEntry(req.params.id)
    .then(result => res.status(200).json(result))
    .catch(error => next(error));
});

module.exports = router;
