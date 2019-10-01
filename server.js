var express = require('express');
var path = require('path');
var serveStatic = require('serve-static');

app = express();
app.use(express.json())

// Add the registration and login routes
app.use('/api', require('./api/auth/routes'));

// Validate the rest of the api routes with user authentication
app.use('/api', require('./api/auth/validate'));

// All the other routes come in here!
app.use('/api', require('./api/routes/budgets'))

app.use('/api/budgets/:id', (req, res, next) => {
    var knex = require('knex')(require('./api/db/conn'));
    knex('budgets').where({ id: req.params.id, userId: req.userId }).first()
        .then(budget => {
            if (!budget) {
                return res.status(404).json({ error: 'not found' });
            }
            return next();
        });
});

app.use('/api/', require('./api/routes/recipients'));

// And lastly, the static site!
app.use(serveStatic(__dirname + "/dist"));

var port = process.env.PORT || 5000;

app.listen(port);
console.log('server started '+ port);                                                                                            