var express = require('express');
var router = express.Router();

var knex = require('../db');

router.get('/budgets/:budgetId/recipients/:recipientId/items', (req, res) => {
  knex('items').where({ recipientId: req.params.recipientId })
    .then(items => res.json({ data: items }));
});

router.get('/budgets/:budgetId/recipients/:recipientId/items/:id', (req, res) => {
  knex('items').where({ id: req.params.id })
    .first()
    .then(item => {
      if (!item) {
        return res.status(404).json({ error: 'item not found' })
      }
      return res.json({ data: item })
    });
});

router.post('/budgets/:budgetId/recipients/:recipientId/items', (req, res) => {
  var item = req.body;
  item.recipientId = req.params.recipientId;

  knex('items').insert(item).returning('*')
    .then(insertedItem => res.status(201).json({ data: insertedItem[0] }))
    .catch(err => {
      console.log(err);
      res.status(400).json({ error: 'failed to create item' })
    });
});

router.patch('/budgets/:budgetId/recipients/:recipientId/items/:id', (req, res) => {
  var newItemData = req.body;
  knex('items').where({ id: req.params.id })
    .update(newItemData)
    .returning('*')
    .then(data => res.json({ data: data[0] }));
});

router.delete('/budgets/:budgetId/recipients/:recipientId/items/:id', (req, res) => {
  knex('items').where({ id: req.params.id })
    .del()
    .then(() => res.sendStatus(204));
});

module.exports = router;