
exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.table('users', (table) => {
      table.boolean('guest').defaultTo(false);
    })
  ]);
};

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.table('users', (table) => {
      table.dropColumn('guest');
    })
  ]);
};
