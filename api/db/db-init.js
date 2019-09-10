var knex = require('./conn');

knex.schema.createTable('users', (table) => {
    table.increments('id').unsigned().primary();
    table.string('username').notNullable();
    table.string('email').unique().notNullable();
    table.string('password').notNullable();

    table.timestamps(false, true);
}).then(() => {
    console.log('created the table users!')
}).finally(() => knex.destroy());

knex.schema.createTable('budgets', (table) => {
    table.integer('userId').unsigned().notNullable();
    table.increments('id').unsigned().primary();
    table.string('name').notNullable();
    table.decimal('amount').unique().notNullable();

    table.foreign('userId').references('id').inTable('users');
    table.timestamps(false, true);
}).then(() => {
    console.log('created the table budgets!')
}).finally(() => knex.destroy());;

knex.schema.createTable('recipients', (table) => {
    table.integer('budgetId').unsigned().notNullable();
    table.increments('id').unsigned().primary();
    table.string('name').notNullable();
    table.decimal('amount').unique().notNullable();

    table.foreign('budgetId').references('id').inTable('budgets');
    table.timestamps(false, true);
}).then(() => {
    console.log('created the table recipients!')
}).finally(() => knex.destroy());;

knex.schema.createTable('items', (table) => {
    table.integer('recipientId').unsigned().notNullable();
    table.increments('id').unsigned().primary();
    table.string('name').notNullable();
    table.decimal('price').unique().notNullable();

    table.foreign('recipientId').references('id').inTable('recipients');
    table.timestamps(false, true);
}).then(() => {
    console.log('created the table items!')
}).finally(() => knex.destroy());;