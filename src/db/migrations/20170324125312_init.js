exports.up = (knex, Promise) =>
  Promise.all([
    knex.schema.createTableIfNotExists('project', (project) => {
      project.increments('id').primary();
      project.string('name').unique().notNullable();
      project.string('url').unique().notNullable();
      project.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    }),

    knex.schema.createTableIfNotExists('app_user', (user) => {
      user.increments('id').primary();
      user.string('user_id').notNullable();
      user.string('email').unique().notNullable();
      user.string('name').notNullable();
      user.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    }),

    knex.schema.createTableIfNotExists('time_entry', (timeEntry) => {
      timeEntry.increments('id').primary();
      timeEntry.bigInteger('project').unsigned().index()
        .references('id')
        .inTable('project')
        .onDelete('cascade')
        .onUpdate('cascade');
      timeEntry.bigInteger('user').unsigned().index()
        .references('id')
        .inTable('app_user')
        .onDelete('cascade')
        .onUpdate('cascade');
      timeEntry.bigInteger('elapsed_time');
      timeEntry.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    }),
  ]);

exports.down = (knex, Promise) =>
  Promise.all([
    knex.schema.dropTable('time_entry'),
    knex.schema.dropTable('project'),
    knex.schema.dropTable('app_user'),
  ]);
