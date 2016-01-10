var UserSubmission = require('./model.js');
    Q = require('q');

var findUserSubmission = Q.nbind(UserSubmission.findOne, UserSubmission);
var createUserSubmission = Q.nbind(UserSubmission.create, UserSubmission);

module.exports = {

  sendReport: function(req, res, next) {

      var username = req.body.username;
      console.log('Generating report for ', username);
      
      
      findUserSubmission({ username: username }).
        //expect the data to be an object with the latest user submission
        then(function(data){
          console.log('query result is...', data);
          if (!data) {
            next(new Error('No past submission found from this user'));
          } else {
            var userData = data;
            var averageData = util.getAverages();
            console.log('averageData is...', averageData);

            //NOTE: report tuple index 0 is the user data and index 1 is the average
            var report = {
              income: [userData.income, averageData.income],
              rent: [userData.rent, averageData.rent],
              transportation: [userData.transportation, averageData.transportation],
              restaurants: [userData.restaurants, averageData.restaurants],
              groceries: [userData.groceries, averageData.groceries],
              clothes: [userData.clothes, averageData.clothes],
              hygiene: [userData.hygiene, averageData.hygiene],
              travel: [userData.travel, averageData.travel],
              entertainment: [userData.entertainment, averageData.entertainment],
              gym: [userData.gym, averageData.gym]
            };

            res.status(200).send(report);
          }
        }).
        fail(function (error) {
          res.send(500);
        });
    },

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

};