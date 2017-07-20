const knex = require('../db.js');

const table = 'app_user';

function parseId(id) {
  return parseInt(id, 10);
}

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
