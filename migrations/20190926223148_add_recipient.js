
exports.up = function(knex) {
    return knex.schema.createTable('recipients', (table) => {
        table.integer('budgetId').unsigned().notNullable();
        table.increments('id').unsigned().primary();
        table.string('name').notNullable();
        table.decimal('amount').notNullable();
    
        table.foreign('budgetId').references('id').inTable('budgets');
        table.timestamps(false, true);
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('recipients');
};
