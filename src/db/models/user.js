const knex = require('../db.js');

const table = 'app_user';

function parseId(id) {
  return parseInt(id, 10);
}

const User = {
  getUserById(id) {
    return knex(table)
            .where('id', parseId(id))
            .then(rows => Promise.resolve(rows));
  },

  getUserByOAuthID(id) {
    return knex(table)
            .where('oauth_id', id)
            .then(rows => Promise.resolve(rows));
  },

  createUser(user) {
    return knex(table)
            .insert(user, 'id')
            .then(rows => Promise.resolve(rows));
  },
};

module.exports = User;
