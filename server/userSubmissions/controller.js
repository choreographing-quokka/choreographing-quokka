var UserSubmission = require('./model.js');
    Q = require('q');

var findUserData = Q.nbind(UserSubmission.findOne, UserSubmission);
var createUserSubmission = Q.nbind(UserSubmission.create, UserSubmission);

var findUserInput = Q.nbind(UserSubmission.findOne, UserSubmission);
var utils = require('../config/average-util.js');

module.exports = {

sendReport: function(req, res, next) {

    // CHNAGE BACK WHEN READY TO: req.body.username
    var username = req.body.username;
    console.log('Generating report for ', req.body.username);
    
    findUserInput({ username: username }).
      //expect the data to be an object with the latest user entry
      then(function(data){
        console.log('query result is...', data);
        if (!data) {
          next(new Error('No past submission found from this user'));
        } else {
          var userData = data;
          var averageData = utils.getAverages();          
          console.log('averageData is...', averageData);
          // remove this when averageData is working 
          averageData = {
            income: 55,
            rent:55,
            transportation:55,
            restaurants:55,
            groceries: 55,
            clothes: 55,
            hygiene: 55,
            travel: 55,
            entertainment: 55,
            gym:55
          };

          //report tuple index 0 is the user data and index 1 is the average
          var report = {
            income: [userData.income, averageData.income],
            rent: [userData.rent, averageData.rent],
            transportation: [userData.transportation, averageData.transportation],
            eatingout: [userData.restaurants, averageData.restaurants],
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
        console.log('report send failed becasue:', error);
        res.send(500);
      })
  },

    // post info acquired from front in (in form of JSON)
  addData: function (req, res, next) {    

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
          createUserSubmission(newData)
            .then(function(user) {
              console.log('sending back');
              res.status(201);
              res.send(user);              
            }, function(err) {
              console.log('DB submission error:', err);
            })
            
      //   }
      // })
  }

};
