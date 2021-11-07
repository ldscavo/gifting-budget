let express = require('express');
let router = express.Router();

let itemService = require('../services/itemService');

router.get('/budgets/:budgetId/recipients/:recipientId/items', async (req, res) => {
  let items = await itemService.getItemsByRecipient(req.params.recipientId);

  return res.json({ data: items });
});

router.get('/budgets/:budgetId/recipients/:recipientId/items/:id', async (req, res) => {
  let item = await itemService.getItemById(req.params.id);
  
  return item
    ? res.json({ data: item })
    : res.status(404).json({ error: 'item not found' });
});

router.post('/budgets/:budgetId/recipients/:recipientId/items', async (req, res) => {
  try {
    let newItem = await itemService.addItemToRecipient(req.params.recipientId, req.body);

    return res.status(201).json({ data: newItem });
  }
  catch(err) {
    console.log(err);
    return res.status(400).json({ error: 'failed to create item' });
  }
});

router.patch('/budgets/:budgetId/recipients/:recipientId/items/:id', async (req, res) => {
  let updatedItem = await itemService.updateItem(req.params.id, req.body);

  return res.json({ data: updatedItem });
});

router.delete('/budgets/:budgetId/recipients/:recipientId/items/:id', async (req, res) => {
  await itemService.deleteItem(req.params.id);
    
  return res.sendStatus(204);
});

module.exports = router;