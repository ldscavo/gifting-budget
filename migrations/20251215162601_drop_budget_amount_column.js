
exports.up = function(knex) {
    return knex.schema.table('budgets', table => {
        table.dropColumn('amount');
    });
};

exports.down = function(knex) {
    return knex.schema.table('budgets', table => {
        table.decimal('amount').notNullable();
    });
};
