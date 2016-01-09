var express = require('express');
var mongoose = require('mongoose');

var app = express();

// db for prod vs local
var dbURI = process.env.MONGOLAB_URI || 'mongodb://localhost/rollercost';

// connect to mongo db
// to view prod mongo db: mongodb://dbuser:dbpass@host:port/dbname
// ours: MONGOLAB_URI: mongodb://heroku_td25rj4p:8r9p0r48cssu2fgnvtim5o0mk5@ds039195.mongolab.com:39195/heroku_td25rj4p
// general command: mongo somewhere.mongolayer.com:10011/my_database -u username -p password
// to view prod db from terminal: mongo ds039195.mongolab.com:39195/heroku_td25rj4p -u heroku_td25rj4p -p 8r9p0r48cssu2fgnvtim5o0mk5

mongoose.connect(dbURI);

console.log('MongoDB listening at...' + dbURI);

// configure our server with all the middleware and routing
require('./config/middleware.js')(app, express);
require('./config/routes.js')(app, express);

// start listening to requests on prod vs port 8000
var port = process.env.PORT || 8000;
app.listen(port);
console.log('Rent app listening on ' + port);

module.exports = app;
