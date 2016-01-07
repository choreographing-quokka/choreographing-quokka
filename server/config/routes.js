
var userSubmissionsController = require('../userSubmissions/controller.js');
var authController = require('../auth/controller.js');
var helpers = require('./helper.js'); 
var path = require('path');
var bodyParser = require('body-parser');
var request = require('request');

module.exports = function (app, express) {  

  app.set('views', path.join(__dirname, "/../../client"));  
  app.set('view engine', 'html');
  app.use(express.static(path.join(__dirname, "/../../client")));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true })); 

  app.post('/signup', authController.signup);
  app.post('/signin', authController.signin);

  // app.use(helpers.errorLogger);
  // app.use(helpers.errorHandler);
};