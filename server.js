var express = require('express');
var path = require('path');
var serveStatic = require('serve-static');

app = express();
var router = require('./api/router');
app.use('/api', router)

app.use(serveStatic(__dirname + "/dist"));

var port = process.env.PORT || 5000;

app.listen(port);
console.log('server started '+ port);