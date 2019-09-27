
exports.up = function(knex) {
    return knex.schema.createTable('users', table => {
        table.increments('id').unsigned().primary();
        table.string('username').notNullable();
        table.string('email').unique().notNullable();
        table.string('password').notNullable();
    
        table.timestamps(false, true);
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('users');
};
