var express = require('express');
var router = express.Router();

require('./budgets')(router);
require('./recipients')(router);

module.exports = router;