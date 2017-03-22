// Update with your config settings.
const pg = require('pg');
pg.defaults.ssl = true;
require('dotenv').config({silent: true});

module.exports = {

  development: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    searchPath: 'followme'
  },

  staging: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    searchPath: 'followme',
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
