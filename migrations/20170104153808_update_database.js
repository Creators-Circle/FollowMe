// created questions table
// add comment and no_of_clicks field to user_lectures table
// add preview_image field to lectures table

exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.table('user_lectures', (table) => {
      table.string('comment');
      table.integer('no_of_clicks');
    }),
    knex.schema.table('lectures', (table) => {
      table.string('preview_image');
    }),
    knex.schema.createTable('questions', (table) => {
      table.increments('id').primary();
      table.string('lecture_id').references('id').inTable('lectures');
      table.string('user_id').references('id').inTable('users');
      table.string('question');
      table.integer('votes');
    })
  ]);
};

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.table('user_lectures', (table) => {
      table.dropColumn('comment');
      table.dropColumn('no_of_clicks');
    }),
    knex.schema.table('lectures', (table) => {
      table.dropColumn('preview_image');
    }),
    knex.schema.dropTable('questions')
  ]);
};
