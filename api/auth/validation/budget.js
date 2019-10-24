module.exports = (req, res, next) => {
    var knex = require('knex')(require('../../db/conn'));

    knex('budgets').where({ id: req.params.id, userId: req.userId }).first()
        .then(budget => {
            if (!budget) {
                return res.status(404).json({ error: 'budget not found' });
            }
            return next();
        });
};