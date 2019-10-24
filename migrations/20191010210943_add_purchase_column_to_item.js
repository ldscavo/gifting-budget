
exports.up = function(knex) {
    return knex.schema.table('items', (table) => {
        table.boolean('purchased').defaultTo(false);
    });
  };
  
  exports.down = function(knex) {
      return knex.schema.table('items', (table) => {
          table.dropColumn('purchased');
      });
  };
  