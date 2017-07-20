exports.seed = async (knex, Promise) => {
  await knex('app_user').del();
  return Promise.all([
    knex('app_user').insert({
      id: 1,
      user_id: 'id12345',
      email: 'test@test.com',
      name: 'Testy McTestface',
    }),
  ]);
};
