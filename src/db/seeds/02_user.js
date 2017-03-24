exports.seed = (knex, Promise) =>
  knex('app_user').del()
    .then(() =>
      Promise.all([
        knex('app_user').insert({
          id: 1,
          oauth_id: 12345,
          name: 'Testy McTestface',
        }),
      ]));
