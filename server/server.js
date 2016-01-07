var express = require('express');
var mongoose = require('mongoose');

var app = express();

// db for prod vs local
var dbURI = process.env.MONGO_URI || 'mongodb://localhost/rollercost';
// connect to mongo db
mongo.connect(dbURI);
console.log('MongoDB listening at...' + dbURI);

// configure our server with all the middleware and routing
require('./config/middleware.js')(app, express);
require('./config/routes.js')(app, express);

// start listening to requests on prod vs port 8000
var port = process.env.PORT || 8000;
app.listen(port);
console.log('Rent app listening on ' + port);

module.exports = app;