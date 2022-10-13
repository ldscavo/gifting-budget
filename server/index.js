var express = require('express');
var dotenv = require('dotenv');
var cors = require('cors');

dotenv.config();

app = express();
app.use(express.json())
app.use(cors());

// Add the registration and login routes
app.use('/api', require('./auth/routes'));

// Validate and add the budget api routes
app.use('/api', require('./auth/validation/user'));
app.use('/api', require('./routes/budgets'))

// Validate and add the recipient api routes
app.use('/api/budgets/:id', require('./auth/validation/budget'));
app.use('/api/', require('./routes/recipients'));

// Validate and add the item api routes
app.use('/api/budgets/:budgetId/recipients/:id', require('./auth/validation/recipient'));
app.use('/api', require('./routes/items'));

// All other endpoint events get a 404
app.use('*', (req, res, next) => {
  return res.status(404).json({error:"invalid request"})
});

app.listen(8080);
console.log('server started '+ port);