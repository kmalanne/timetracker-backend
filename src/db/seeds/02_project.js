exports.seed = async (knex, Promise) => {
  await knex('project').del();

  return Promise.all([
    knex('project').insert({
      id: 1001,
      user: 1,
      name: 'project_name',
      url: 'http://www.url.com',
    }),
    knex('project').insert({
      id: 1002,
      user: 1,
      name: 'another_project_name',
      url: 'http://www.another_url.com',
    }),
    knex('project').insert({
      id: 1003,
      user: 1,
      name: 'final_project_name',
      url: 'http://www.final_url.com',
    }),
  ]);
};
