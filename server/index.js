var express = require('express');
var cors = require('cors');
var dotenv = require('dotenv');

dotenv.config();

app = express();
app.use(express.json())
app.use(cors());

// Add the registration and login routes
app.use('/api', require('.//auth/routes'));

// Validate and add the budget api routes
app.use('/api', require('.//auth/validation/user'));
app.use('/api', require('.//routes/budgets'))

// Validate and add the recipient api routes
app.use('/api/budgets/:id', require('.//auth/validation/budget'));
app.use('/api/', require('.//routes/recipients'));

// Validate and add the item api routes
app.use('/api/budgets/:budgetId/recipients/:id', require('.//auth/validation/recipient'));
app.use('/api', require('.//routes/items'));

// All other api endpoint events get a 404
app.use('/api', (req, res, next) => {
  return res.status(404).json({error:"invalid endpoint"})
});

var port = process.env.PORT || 5000;

app.listen(port);
console.log('server started '+ port);                                                                                            