exports.seed = (knex, Promise) =>
  knex('time_entry').del()
    .then(() =>
      Promise.all([
        knex('time_entry').insert({
          id: 1,
          project: 1,
          user: 1,
          elapsed_time: 3600,
        }),
        knex('time_entry').insert({
          id: 2,
          project: 2,
          user: 1,
          elapsed_time: 100000,
        }),
        knex('time_entry').insert({
          id: 3,
          project: 3,
          user: 1,
          elapsed_time: 300,
        }),
      ]));
