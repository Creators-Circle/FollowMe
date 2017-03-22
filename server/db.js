// js file for connecting to the database
const pg = require('pg');
pg.defaults.ssl = true;

const db = require('knex')({
  client: 'pg',
  connection: process.env.DATABASE_URL,
  searchPath: 'followme'
});

module.exports = db;
