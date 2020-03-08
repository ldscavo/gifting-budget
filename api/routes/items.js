let express = require('express');
let router = express.Router();

let knex = require('../db');

router.get('/budgets/:budgetId/recipients/:recipientId/items', async (req, res) => {
  let items =
    await knex('items').where({ recipientId: req.params.recipientId });

  return res.json({ data: items });
});

router.get('/budgets/:budgetId/recipients/:recipientId/items/:id', async (req, res) => {
  let item = 
    await knex('items')
      .where({ id: req.params.id })
      .first();
  
  return item
    ? res.json({ data: item })
    : res.status(404).json({ error: 'item not found' });
});

router.post('/budgets/:budgetId/recipients/:recipientId/items', async (req, res) => {
  let item = req.body;
  item.recipientId = req.params.recipientId;
  try {
    let newItem = 
      await knex('items')
        .insert(item)
        .returning('*');

    return res.status(201).json({ data: newItem[0] });
  }
   catch(err) {
    console.log(err);
    return res.status(400).json({ error: 'failed to create item' });
  }
});

router.patch('/budgets/:budgetId/recipients/:recipientId/items/:id', async (req, res) => {
  let newItemData = req.body;

  let updatedItem =
    await knex('items')
      .where({ id: req.params.id })
      .update(newItemData)
      .returning('*');

  return res.json({ data: updatedItem[0] });
});

router.delete('/budgets/:budgetId/recipients/:recipientId/items/:id', async (req, res) => {
  await knex('items')
    .where({ id: req.params.id })
    .del();
    
  return res.sendStatus(204);
});

module.exports = router;