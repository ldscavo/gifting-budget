let express = require('express');
let router = express.Router();

let knex = require('../db');

router.get('/budgets/:budgetId/recipients', async (req, res) => {
  let recipients =
    await knex('recipients')
      .where({ budgetId: req.params.budgetId });

  return res.json({ data: recipients });
});

router.get('/budgets/:budgetId/recipients/:id', async (req, res) => {
  let recipient =
    await knex('recipients')
      .where({ id: req.params.id })
      .first();
    
  return recipient
    ? res.json({ data: recipient })
    : res.status(404).json({ error: 'recipient not found' });
});

router.post('/budgets/:budgetId/recipients', async (req, res) => {
  let recipient = req.body;
  recipient.budgetId = req.params.budgetId;

  try {
    let newRecipient =
      await knex('recipients')
        .insert(recipient)
        .returning('*');

    newRecipient[0].items = [];
    return res.status(201).json({ data: newRecipient[0] });
  }
  catch (err) {
    console.log(err);
    return res.status(400).json({ error: 'failed to create recipient' })
  }
});

router.patch('/budgets/:budgetId/recipients/:id', async (req, res) => {
  let newRecipientData = req.body;

  let updatedRecipient =
    await knex('recipients')
      .where({ id: req.params.id })
      .update(newRecipientData)
      .returning('*');
      
  return res.json({ data: updatedRecipient[0] });
});

router.delete('/budgets/:budgetId/recipients/:id', async (req, res) => {
  await knex('recipients')
    .where({ id: req.params.id })
    .del();
  return res.sendStatus(204);
});

module.exports = router;