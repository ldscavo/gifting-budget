
exports.up = function(knex) {
    return knex.schema.createTable('budgets', (table) => {
        table.integer('userId').unsigned().notNullable();
        table.increments('id').unsigned().primary();
        table.string('name').notNullable();
        table.decimal('amount').notNullable();
    
        table.foreign('userId').references('id').inTable('users');
        table.timestamps(false, true);
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('budgets');
};
