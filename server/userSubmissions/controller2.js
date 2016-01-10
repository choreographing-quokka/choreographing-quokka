var UserSubmission = require('./model.js');
    Q = require('q');

var findUserData = Q.nbind(UserSubmission.findOne, UserSubmission);
var createUserSubmission = Q.nbind(UserSubmission.create, UserSubmission);

module.exports = {
  
  // post info acquired from front in (in form of JSON)
  addData: function (req, res, next) {
    console.log('Posting info: ' + req.body);

    // ******** Find if user already exists  ********
    // findUserData({username: req.body.username})
    //   .then(function (match) {
    //     if (match) {
    //       console.log('exists');
    //       // Update the current user's information
    //       // Jota: this might not actually update the database, but just a copy of what's grabbed by the database.
    //       // match = req.body;
    //       // ------- otherwise --------          
    //       match.update(req.body);
    //       match.save(function (err, savedData) {
    //         if (err) {
    //           next(err);
    //         } else {
    //           console.log('updated data');
    //         }
    //       });
    //     } else {          
          // creates a new data-point in the userData Schema, but MAY NOT BE SAVED
          // the req.body may not be an object yet, might be a JSON string
          var newData = req.body;
          createUserSubmission(newData )
            .then(function(user) {
              res.status(201);
              res.send(user);
            })
            
      //   }
      // })
  },



}
