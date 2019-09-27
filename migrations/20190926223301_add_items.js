
exports.up = function(knex) {
    return knex.schema.createTable('items', (table) => {
        table.integer('recipientId').unsigned().notNullable();
        table.increments('id').unsigned().primary();
        table.string('name').notNullable();
        table.decimal('price').notNullable();
    
        table.foreign('recipientId').references('id').inTable('recipients');
        table.timestamps(false, true);
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('items');
};
