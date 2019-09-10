var knex = require('knex')({
    client: 'pg',
    connection: process.env.DATABASE_URL,
    searchPath: ['knex', 'public'],
});

knex.schema.createTable('users', (table) => {
    table.increments('id').unsigned().primary();
    table.string('username').notNullable();
    table.string('email').unique().notNullable();
    table.string('password').notNullable();

    table.timestamps(false, true);
}).then(() => {
    console.log('created the table users!')
});

knex.schema.createTable('budgets', (table) => {
    table.increments('id').unsigned().primary();
    table.string('name').notNullable();
    table.decimal('amount').unique().notNullable();

    table.timestamps(false, true);
}).then(() => {
    console.log('created the table budgets!')
});

knex.schema.createTable('recipients', (table) => {
    table.integer('budgetId').unsigned().notNullable();
    table.increments('id').unsigned().primary();
    table.string('name').notNullable();
    table.decimal('amount').unique().notNullable();

    table.foreign('budgetId').references('id').inTable('budgets');
    table.timestamps(false, true);
}).then(() => {
    console.log('created the table budgets!')
});

knex.schema.createTable('items', (table) => {
    table.integer('recipientId').unsigned().notNullable();
    table.increments('id').unsigned().primary();
    table.string('name').notNullable();
    table.decimal('price').unique().notNullable();

    table.foreign('recipientId').references('id').inTable('recipients');
    table.timestamps(false, true);
}).then(() => {
    console.log('created the table budgets!')
});