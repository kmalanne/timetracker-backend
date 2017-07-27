const knex = require('../db');
const parseId = require('../utils/parseId');

const table = 'app_user';

const User = {
  async getUser(userId) {
    let user = await knex.first('*')
      .from(table)
      .where({
        user_id: userId,
      });

    if (user === undefined) {
      const newUser = {
        user_id: userId,
      };

      const id = await this.createUser(newUser);
      user = await this.getUserById(id);
    }

    return user;
  },

  async getUserById(id) {
    const user = await knex.first('*')
      .from(table)
      .where('id', parseId(id));

    return user;
  },

  async createUser(user) {
    const rows = await knex(table)
      .insert(user, 'id');

    return rows;
  },
};

module.exports = User;
