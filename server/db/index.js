let Knex = require('knex');

let db = Knex({
  client: 'pg',
  connection: `${process.env.DATABASE_URL}`,
  searchPath: ['knex', 'public']
});

module.exports = db;