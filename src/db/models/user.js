const knex = require('../db');
const parseId = require('../utils/parseId');

const table = 'app_user';

const User = {
  async getUser(params) {
    const rows = await knex.select('*')
      .from(table)
      .where({
        user_id: params.user_id,
        email: params.email,
      });

    return rows;
  },

  async getUserById(id) {
    const rows = await knex.select('*')
      .from(table)
      .where('id', parseId(id));

    return rows;
  },

  async createUser(user) {
    const rows = await knex(table)
      .insert(user, 'id');

    return rows;
  },
};

module.exports = User;
