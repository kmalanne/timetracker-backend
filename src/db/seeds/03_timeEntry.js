exports.seed = async (knex, Promise) => {
  await knex('time_entry').del();

  return Promise.all([
    knex('time_entry').insert({
      id: 1001,
      project: 1001,
      user: 1,
      elapsed_time: 3600,
    }),
    knex('time_entry').insert({
      id: 1002,
      project: 1002,
      user: 1,
      elapsed_time: 100000,
    }),
    knex('time_entry').insert({
      id: 1003,
      project: 1003,
      user: 1,
      elapsed_time: 300,
    }),
  ]);
};
