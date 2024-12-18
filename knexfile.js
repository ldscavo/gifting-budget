var dotenv = require('dotenv');
dotenv.config();

module.exports = {
  client: 'pg',
  connection: process.env.DATABASE_URL,
  migrations: {
    tableName: 'knex_migrations'
  }  
};
