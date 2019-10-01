var express = require('express');
var path = require('path');
var serveStatic = require('serve-static');

app = express();
app.use(express.json())

// Add the registration and login routes
app.use('/api', require('./api/auth/routes'));

// Validate and add the budget api routes
app.use('/api', require('./api/auth/validation/user'));
app.use('/api', require('./api/routes/budgets'))

// Validate and add the recipient api routes
app.use('/api/budgets/:id', require('./api/auth/validation/budget'));
app.use('/api/', require('./api/routes/recipients'));

app.use('/api/budgets/:budgetId/recipients/:id', require('./api/auth/validation/recipient'))
//app.use('/api', require('./api/routes/items'));

// And lastly, the static site!
app.use(serveStatic(__dirname + "/dist"));

var port = process.env.PORT || 5000;

app.listen(port);
console.log('server started '+ port);                                                                                            