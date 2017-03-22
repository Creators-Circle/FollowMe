
exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.table('lectures', (table) => {
      table.boolean('guest').defaultTo(false);
    })
  ]);
};

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.table('lectures', (table) => {
      table.dropColumn('guest');
    })
  ]);
};
