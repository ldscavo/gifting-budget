
exports.up = function(knex) {
  return knex.schema.createTable('apiKeys', (table) => {
    table.increments('id').unsigned().primary();
    table.integer('userId').unsigned().notNullable();
    table.string('api_key').notNullable();

    table.foreign('userId').references('id').inTable('users');
    table.timestamps(false, true);
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('apiKeys');
};
