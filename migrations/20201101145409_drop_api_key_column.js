
exports.up = async (knex) => {
  return knex('users')
    .then(users => {
      return users.map(user =>
        knex('apiKeys').insert({
          userId: user.id,
          api_key: user.api_key
        }).then(() => { }));      
    })
    .then(() => {
      return knex.schema.table('users', (table) => {
        table.dropColumn('api_key');
      });
    });
};

exports.down = function (knex) {
  return knex.schema.table('users', (table) => {
    table.string('api_key');
  });
};
