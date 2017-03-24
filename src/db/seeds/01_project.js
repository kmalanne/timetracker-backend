exports.seed = (knex, Promise) =>
  knex('project').del()
    .then(() =>
      Promise.all([
        knex('project').insert({
          id: 1,
          name: 'another_project_name',
          url: 'http://www.another_url.com',
        }),
        knex('project').insert({
          id: 2,
          name: 'project_name',
          url: 'http://www.url.com',
        }),
        knex('project').insert({
          id: 3,
          name: 'final_project_name',
          url: 'http://www.final_url.com',
        }),
      ]));
