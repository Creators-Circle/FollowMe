
exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.table('thumbs', (table) => {
      table.dropColumn('lecture_id');
    }),
    knex.schema.createTable('topics', (table) => {
      table.string('id').primary();
      table.string('topic');
      table.string('lecture_id').references('id').inTable('lectures');
    }),
    knex.schema.table('thumbs', (table) => {
      table.string('topic_id').references('id').inTable('topics');
      table.integer('type');
    })
  ]);
};

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.table('thumbs', (table) => {
      table.string('lecture_id');
    }),
    knex.schema.dropTable('topics'),
    knex.schema.table('thumbs', (table) => {
      table.dropColumn('topic_id');
      table.dropColumn('type');
    })
  ]);
};
