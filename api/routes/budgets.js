var express = require('express');
var router = express.Router();
var knex = require('knex')(require('../db/conn'));
var _ = require('lodash');

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

            return res.json({ data: budget });
        });
});

router.get('/budgets/:id/expanded', async (req, res) => {
    knex
        .select(
            'b.id as b_id',
            'b.name as b_name',
            'b.amount as b_amount',
            'r.id as r_id',
            'r.name as r_name',
            'r.amount as r_amount',
            'i.id as i_id',
            'i.name as i_name',
            'i.price as i_price',
            'i.purchased as i_purchased'
        )
        .from('budgets as b')
        .leftJoin('recipients as r', 'r.budgetId', 'b.id')
        .leftJoin('items as i', 'i.recipientId', 'r.id')
        .where('b.id', req.params.id)
        .orderBy([
            { column: 'r_id', order: 'asc' },
            { column: 'i_id', order: 'asc' }
        ])
        .then(data => {
            return res.json({ data: parseExpandedBudget(data) });
        });
});

function parseExpandedBudget(data) {
    let budget = { id: data[0].b_id, name: data[0].b_name, amount: data[0].b_amount };
    
    budget.recipients = _.map(
        _.uniqBy(_.filter(data, recipient => recipient.r_id), d => d.r_id), r => {
            return { id: r.r_id, name: r.r_name, amount: r.r_amount }
        }
    );

    budget.recipients.forEach(recipient => {
        recipient.items = _.map(_.filter(data, item => item.i_id && item.r_id == recipient.id), i => {
            return { id: i.i_id, name: i.i_name, price: i.i_price, purchased: i.i_purchased }
        });
    });
    
    return budget;
}

router.post('/budgets', (req, res) => {
    var budget = req.body;
    budget.userId = req.userId;

    knex('budgets').insert(budget).returning('*')
        .then(insertedBudget => {
            insertedBudget[0].recipients = [];
            res.status(201).json({ data: insertedBudget[0] })
        })
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