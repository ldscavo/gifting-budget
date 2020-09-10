var knex = require('../../db');

module.exports = async (req, res, next) => {
  let recipient =
    await knex('recipients')
      .where({ id: req.params.id, budgetId: req.params.budgetId })
      .first();
      
  return recipient
    ? next()
    : res.status(404).json({ error: 'recipient not found' });
};