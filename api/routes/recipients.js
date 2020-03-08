var express = require('express');
var router = express.Router();

var knex = require('../db');

router.get('/budgets/:budgetId/recipients', (req, res) => {
    knex('recipients').where({ budgetId: req.params.budgetId })
        .then(budgets => res.json({ data: budgets }));
});

router.get('/budgets/:budgetId/recipients/:id', (req, res) => {
    knex('recipients').where({ id: req.params.id })
        .first()
        .then(recipient => {
            if (!recipient) {
                return res.status(404).json({ error: 'recipient not found' })
            }
            return res.json({ data: recipient })
        });
});

router.post('/budgets/:budgetId/recipients', (req, res) => {
    var recipient = req.body;
    recipient.budgetId = req.params.budgetId;

    knex('recipients').insert(recipient).returning('*')
        .then(insertedRecipient => {
            insertedRecipient[0].items = [];
            res.status(201).json({ data: insertedRecipient[0] })
        })
        .catch(err => {
            console.log(err);
            res.status(400).json({ error: 'failed to create recipient' })
        });
});

router.patch('/budgets/:budgetId/recipients/:id', (req, res) => {
    var newRecipientData = req.body;
    knex('recipients').where({ id: req.params.id })
        .update(newRecipientData)
        .returning('*')
        .then(data => res.json({ data: data[0] }));
});

router.delete('/budgets/:budgetId/recipients/:id', (req, res) => {
    knex('recipients').where({ id: req.params.id })
        .del()
        .then(() => res.sendStatus(204));
});

module.exports = router;