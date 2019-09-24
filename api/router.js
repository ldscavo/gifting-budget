var express = require('express');
var router = express.Router();

//require('./routes/auth')(router);
require('./routes/budgets')(router);

module.exports = router;