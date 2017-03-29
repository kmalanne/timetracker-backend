exports.seed = (knex, Promise) =>
  knex('app_user').del()
    .then(() =>
      Promise.all([
        knex('app_user').insert({
          id: 1,
          email: 'test@test.com',
          name: 'Testy McTestface',
        }),
      ]));
