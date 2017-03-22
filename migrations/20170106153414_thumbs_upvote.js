// Created Thumbs and Upvotes table
// Added end_time field to lectures table
exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTable('upvotes', (table) => {
      table.increments('id').primary();
      table.string('user_id').references('id').inTable('users');
      table.integer('question_id').references('id').inTable('questions');
    }),
    knex.schema.createTable('thumbs', (table) => {
      table.increments('id').primary();
      table.string('topic');
      table.string('user_id').references('id').inTable('users');
      table.string('lecture_id').references('id').inTable('lectures');
      table.string('thumb');
    }),
    knex.schema.table('lectures', (table) => {
      table.timestamp('end_time').defaultTo(knex.fn.now());
    })
  ]);
};

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('upvotes'),
    knex.schema.dropTable('thumbs'),
    knex.schema.table('lectures', (table) => {
      table.dropColumn('end_time');
    })
  ]);
};
