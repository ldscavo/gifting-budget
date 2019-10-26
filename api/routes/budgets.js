var express = require('express');
var router = express.Router();

var knex = require('knex')(require('../db/conn'));

router.get('/budgets', (req, res) => {
    knex('budgets').where({ userId: req.userId })
        .then(budgets => res.json({ data: budgets }));
});

router.get('/budgets/:id', (req, res) => {
    knex('budgets').where({ id: req.params.id, userId: req.userId }).first()
        .then(budget => {
            if (!budget) {
                return res.status(404).json({ error: 'budget not found' })
            }
            if (req.query.expand) {
                return expandBudget(req, res, budget);
            } else {
                return res.json({ data: budget });
            }            
        });
});

function expandBudget(req, res, budget) {
    knex('recipients')
        .where({budgetId: budget.id})
        .then(recipients => {
            if (recipients.length === 0) {                
                budget.recipients = [];
                return res.json({data: budget});
            }
            recipients.forEach(recipient => {
                knex('items')
                    .where({recipientId: recipient.id})
                    .then(items => {
                        recipient.items = items;
                    })
                    .finally(() => {
                        budget.recipients = recipients;
                        return res.json({data: budget});
                    });
            });            
        });
}

router.post('/budgets', (req, res) => {
    var budget = req.body;
    budget.userId = req.userId;

    knex('budgets').insert(budget).returning('*')
        .then(insertedBudget => res.status(201).json({ data: insertedBudget[0] }))
        .catch(err => {
            console.log(err);
            res.status(400).json({ error: 'failed to create budget' })
        });
});

router.patch('/budgets/:id', (req, res) => {
    var newBudgetData = req.body;
    knex('budgets').where({ id: req.params.id, userId: req.userId })
        .update(newBudgetData)
        .returning('*')
        .then(data => res.json({ data: data[0] }));
});

router.delete('/budgets/:id', (req, res) => {
    knex('budgets').where({ id: req.params.id, userId: req.userId })
        .del()
        .then(() => res.sendStatus(204));
});

module.exports = router;