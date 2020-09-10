let express = require('express');
let router = express.Router();
let knex = require('../db');
let _ = require('lodash');

router.get('/budgets', async (req, res) => {
  let budgets =
    await knex('budgets')
      .where({ userId: req.userId });

  return res.json({ data: budgets });
});

router.get('/budgets/:id', async (req, res) => {
  let budget =
    await knex('budgets')
      .where({ id: req.params.id, userId: req.userId })
      .first();

  return budget
    ? res.json({ data: budget })
    : res.status(404).json({ error: 'budget not found' });
});

router.get('/budgets/:id/expanded', async (req, res) => {
  let rawBudgetData =
    await knex
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
      ]);

  return res.json({ data: parseExpandedBudget(rawBudgetData) });
});

let parseExpandedBudget = data => {
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

router.post('/budgets', async (req, res) => {
  let budget = req.body;
  budget.userId = req.userId;

  try {
    let insertedBudget =
      await knex('budgets')
        .insert(budget)
        .returning('*');

    insertedBudget[0].recipients = [];

    return res.status(201).json({ data: insertedBudget[0] });
  }
  catch (err) {
    console.log(err);

    return res.status(400).json({ error: 'failed to create budget' })
  }
});

router.patch('/budgets/:id', async (req, res) => {
  let newBudgetData = req.body;

  let updatedBudget =
    await knex('budgets')
      .where({ id: req.params.id, userId: req.userId })
      .update(newBudgetData)
      .returning('*');

  return res.json({ data: updatedBudget[0] });
});

router.delete('/budgets/:id', async (req, res) => {
  await knex('budgets').where({ id: req.params.id, userId: req.userId }).del();

  return res.sendStatus(204);
});

module.exports = router;