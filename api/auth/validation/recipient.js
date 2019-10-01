module.exports = (req, res, next) => {
    var knex = require('knex')(require('../../db/conn'));

    knex('recipient').where({ id: req.params.id, budgetId: req.params.budgetId }).first()
        .then(recipient => {
            if (!recipient) {
                return res.status(404).json({ error: 'recipient not found' });
            }
            return next();
        });
};