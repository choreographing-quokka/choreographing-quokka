var userSubmissionController = require('../userSubmissions/controller2.js');
var authController = require('../auth/controller.js');
var helpers = require('./helper.js'); 
var path = require('path');
var bodyParser = require('body-parser');
var request = require('request');

module.exports = function (app, express) {  
  // set up static files and serve up the index page
  app.set('views', path.join(__dirname, "/../../client"));  
  app.set('view engine', 'html');
  app.use(express.static(path.join(__dirname, "/../../client")));

  // set up the various backend routes for the app
  // auth routes
  app.post('/signup', authController.signup);

  app.post('/signin', authController.signin);
  // check if logged in
  app.get('/signin', authController.checkAuth);

  app.get('/logout', authController.signin);

  // user form submission routes
  app.post('/api/userSubmission', userSubmissionController.addData);

  // app.use(helpers.errorLogger);
  // app.use(helpers.errorHandler);
};