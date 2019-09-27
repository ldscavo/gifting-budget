var express = require('express');
var router = express.Router();

require('./budgets')(router);

module.exports = router;