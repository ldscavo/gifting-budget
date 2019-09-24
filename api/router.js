var express = require('express');
var router = express.Router();

require('./routes/budgets')(router);

module.exports = router;