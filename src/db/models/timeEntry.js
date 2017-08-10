const knex = require('../db');
const parseNumber = require('../utils/parseNumber');

const User = require('./user');

const table = 'time_entry';

// TimeEntry
const TimeEntry = {
  async getTimeEntries({ page, limit }, userId) {
    const user = await User.getUser(userId);

    const limitNbr = parseNumber(limit) || 10;
    const pageNbr = parseNumber(page) || 1;
    const offset = (pageNbr - 1) * limitNbr;

    const timeEntries = await knex.select('project.name', 'elapsed_time', 'start_time', 'stop_time')
      .from(table)
      .leftJoin('project', 'project.id', `${table}.project`)
      .where(`${table}.user`, user.id)
      .orderBy(`${table}.created_at`, 'desc')
      .limit(limitNbr)
      .offset(offset);

    return timeEntries;
  },

  async getTimeEntryById(id) {
    const timeEntry = await knex.select('*')
      .from(table)
      .where('id', parseNumber(id));

    return timeEntry;
  },

  async createTimeEntry({ project, elapsed_time, start_time, stop_time }, userId) {
    const user = await User.getUser(userId);

    const newTimeEntry = {
      project,
      elapsed_time,
      start_time,
      stop_time,
      user: user.id,
    };

    const timeEntry = await knex(table)
      .insert(newTimeEntry, 'id');

    return timeEntry;
  },

  async deleteTimeEntry(id, userId) {
    const user = await User.getUser(userId);

    await knex(table)
      .where({
        id: parseNumber(id),
        user: user.id,
      })
      .del();

    return id;
  },

  async getTotalCount() {
    const count = await knex(table)
      .count('*');

    return parseNumber(count[0].count);
  },
};

module.exports = TimeEntry;
