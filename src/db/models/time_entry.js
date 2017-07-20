const knex = require('../db.js');

const table = 'time_entry';

function parseId(id) {
  return parseInt(id, 10);
}

// TimeEntry
const TimeEntry = {
  async getTimeEntries() {
    const rows = await knex.select('*')
      .from(table)
      .orderBy('id', 'asc');

    return rows;
  },

  async getTimeEntryById(id) {
    const rows = await knex.select('*')
      .from(table)
      .where('id', parseId(id));

    return rows;
  },

  async createTimeEntry(timeEntry) {
    const rows = await knex(table)
      .insert(timeEntry, 'id');

    return rows;
  },

  async deleteTimeEntry(id) {
    return knex(table)
      .where('id', parseId(id))
      .del();
  },
};

module.exports = TimeEntry;
