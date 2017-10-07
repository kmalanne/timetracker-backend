const knex = require('../db');
const parseNumber = require('../utils/parseNumber');

const User = require('./user');

const table = 'time_entry';

// TimeEntry
const TimeEntry = {
  async createTimeEntry(options, userId) {
    const user = await User.getUser(userId);

    const { project, elapsed_time, start_time, stop_time } = options;
    const newTimeEntry = {
      project,
      elapsed_time,
      start_time,
      stop_time,
      user: user.id,
    };

    const inserted = await knex(table)
      .insert(newTimeEntry, 'id');

    return inserted;
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

  async getTimeEntries(options = {}, userId) {
    const user = await User.getUser(userId);

    const { limit, page, start_date: startDate, end_date: endDate } = options;

    if (limit && page) {
      return this.getTimeEntriesPaginated({ limit, page, user });
    }

    return this.getTimeEntriesByRange({ startDate, endDate, user });
  },

  async getTimeEntriesPaginated(options = {}) {
    const { limit, page, user } = options;
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

  async getTimeEntriesByRange(options = {}) {
    const { startDate, endDate, user } = options;

    const timeEntries = await knex.select('time_entry.*', 'project.name', 'project.url')
      .from(table)
      .leftJoin('project', 'project.id', `${table}.project`)
      .where(`${table}.user`, user.id)
      .whereBetween(`${table}.created_at`, [startDate, endDate])
      .orderBy(`${table}.created_at`, 'asc');

    return timeEntries;
  },

  async getTimeEntryById(id) {
    const timeEntry = await knex.select('*')
      .from(table)
      .where('id', parseNumber(id));

    return timeEntry;
  },

  async getTotalCount() {
    const count = await knex(table)
      .count('*');

    return parseNumber(count[0].count);
  },
};

module.exports = TimeEntry;
