module.exports = (app) => {
    var knex = require('knex')(require('../db/conn'));

    app.get('/budgets', (req, res) => {
        var id = req.userId || 0;
        
        knex.select().table('budgets').where('userId', id)
            .then(budgets => res.send(`budgets found for id ${id}: ${budgets.length}`));
    });

    app.post('/budgets', (req, res) => {
        res.send(`adding a new budget!`);
    });

    app.get('/budgets/:budgetId', (req, res) => {
        res.send(`this is the budget with id: ${req.params.budgetId}`);
    });

    app.put('/budgets/:budgetId', (req, res) => {
        res.send(`editing the budget with id: ${req.params.budgetId}`);
    });

    app.delete('/budgets/:budgetId', (req, res) => {
        res.send(`deleting the budget with id: ${req.params.budgetId}`);
    });
}