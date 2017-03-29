const knex = require('../db.js');

const table = 'time_entry';

function parseId(id) {
  return parseInt(id, 10);
}

// TimeEntry
const TimeEntry = {
  getTimeEntries() {
    return knex.select('*')
      .from(table)
      .orderBy('id', 'asc')
      .then(rows => Promise.resolve(rows));
  },

  getTimeEntryById(id) {
    return knex.select('*')
      .from(table)
      .where('id', parseId(id))
      .then(rows => Promise.resolve(rows));
  },

  createTimeEntry(timeEntry) {
    return knex(table)
      .insert(timeEntry, 'id')
      .then(rows => Promise.resolve(rows));
  },

  deleteTimeEntry(id) {
    return knex(table)
      .where('id', parseId(id))
      .del();
  },
};

module.exports = TimeEntry;
