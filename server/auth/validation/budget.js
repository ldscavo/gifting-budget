var knex = require('../../db');

module.exports = async (req, res, next) => {
  let budget =
    await knex('budgets')
      .where({ id: req.params.id, userId: req.userId })
      .first();

  return budget
    ? next()
    : res.status(404).json({ error: 'budget not found' });
};