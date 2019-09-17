module.exports = (app) => {
    app.get('/budgets', (req, res) => {
        knex = require('../db/conn');
        
        knex.select().table('budgets').where('userId', 0)
            .then(budgets => res.send(`budgets found: ${budgets.length}`))
            .finally(() => knex.destroy());
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