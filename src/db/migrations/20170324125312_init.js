exports.up = (knex, Promise) =>
  Promise.all([
    knex.schema.createTableIfNotExists('app_user', (user) => {
      user.increments('id').primary();
      user.string('user_id').notNullable();
      user.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    }),

    knex.schema.createTableIfNotExists('project', (project) => {
      project.increments('id').primary();
      project.integer('user').unsigned()
        .references('id')
        .inTable('app_user')
        .onDelete('cascade')
        .onUpdate('cascade');
      project.string('name').notNullable();
      project.string('url');
      project.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    }),

    knex.schema.createTableIfNotExists('time_entry', (timeEntry) => {
      timeEntry.increments('id').primary();
      timeEntry.integer('project').unsigned()
        .references('id')
        .inTable('project')
        .onDelete('cascade')
        .onUpdate('cascade');
      timeEntry.integer('user').unsigned()
        .references('id')
        .inTable('app_user')
        .onDelete('cascade')
        .onUpdate('cascade');
      timeEntry.bigInteger('elapsed_time');
      timeEntry.timestamp('start_time').defaultTo(knex.fn.now());
      timeEntry.timestamp('stop_time').defaultTo(knex.fn.now());
      timeEntry.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    }),
  ]);

exports.down = (knex, Promise) =>
  Promise.all([
    knex.schema.dropTable('time_entry'),
    knex.schema.dropTable('project'),
    knex.schema.dropTable('app_user'),
  ]);
