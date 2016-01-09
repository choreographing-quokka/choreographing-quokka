var User = require('./model.js');
    Q = require('q');

var findUserData = Q.nbind(userData.findOne, userData);
var createUserData = Q.nbind(userData.create, userData);

module.exports = {
  
  // post info acquired from front in (in form of JSON)
  addData: function (req, res, next) {
    console.log('Posting info: ' + req.body);

    // Find if user already exists
    findUserData({username: req.body.username})
      .then(function (match) {
        if (match) {
          // Update the current user's information
          // Jota: this might not actually update the database, but just a copy of what's grabbed by the database.
          // match = req.body;
          // ------- otherwise --------
          match.update(req.body);
          match.save(function (err, savedData) {
            if (err) {
              next(err);
            } else {
              console.log('updated data');
            }
          });
        } else {
          // creates a new data-point in the userData Schema, but MAY NOT BE SAVED
          // the req.body may not be an object yet, might be a JSON string
          var newData = createUserData(req.body);
          newData.save(function (err, savedData) {
            if (err) {
              next(err);
            } else {
              console.log('Added new user data');
            }
          });
        }
      })
  },



}
