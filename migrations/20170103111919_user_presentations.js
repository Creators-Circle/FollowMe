// creating user_presentations table
exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTable('user_presentations', (table) => {
      table.increments('id').primary();
      table.string('user_id').references('id').inTable('users');
      table.string('presentation_id').references('id').inTable('presentations');
      table.string('role');
    })
  ]);
};

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('user_presentations')
  ]);
};
