var User = require('./model.js');
    Q = require('q');

var findUser= Q.nbind(userData.findOne, userData);
var createUser = Q.nbind(userData.create, userData);

module.exports = {
  
  // post info acquired from front in (in form of JSON)
  addData: function (req, res, next) {
    console.log('Posting info: ' + req.body);

    // Find if user already exists
    findUser({username: req.body.username})
      .then(function (match) {
        if (match) {
          // Update the current user's information
          match = req.body;
        } else {
          // creates a new data-point in the userData Schema, but NOT SAVED
          // the req.body may not be an object yet, might be a JSON string
          createUser(req.body);
        }
      })
  },



}
