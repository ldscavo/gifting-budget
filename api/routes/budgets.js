module.exports = (router) => {
    var knex = require('knex')(require('../db/conn'));

    router.get('/budgets', (req, res) => {
        knex('budgets').where({userId: req.userId})
            .then(budgets => {
                console.log(budgets)
                res.json({data: budgets})
            });
    });

    router.get('/budgets/:id', (req, res) => {
        knex('budgets').where({id:req.params.id, userId: req.userId}).first()
            .then(budget => {
                if (!budget) {
                    return res.status(404).json({error: 'budget not found'})
                }
                return res.json({data: budget})
            });
    });

    router.post('/budgets', (req, res) => {
        var budget = req.body;
        budget.userId = req.userId;

        knex('budgets').insert(budget).returning('*')
            .then(insertedBudget => res.status(201).json({data: insertedBudget[0]}))
            .catch((err) => {
                console.log(err);
                res.status(400).json({error: 'failed to create budget'})
            });
    });   

    router.put('/budgets/:budgetId', (req, res) => {
        res.send(`editing the budget with id: ${req.params.budgetId}`);
    });

    router.delete('/budgets/:budgetId', (req, res) => {
        res.send(`deleting the budget with id: ${req.params.budgetId}`);
    });
}