
var userSubmissionsController = require('../userSubmissions/controller.js');
var authController = require('../auth/controller.js');
var helpers = require('./helper.js'); 

module.exports = function (app, express) {  

  app.post('/signup', authController.signup);
  app.post('/signin', authController.signin);

  // app.use(helpers.errorLogger);
  // app.use(helpers.errorHandler);
};