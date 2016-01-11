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
    console.log('Posting info for user: ' + req.body.username);
    var username = req.body.username;
    // ******** Find if user already exists  ********
    findUserData({username: req.body.username})
      .then(function (match) {
        if (match) {
          console.log('exists: ' + match);
          // Update the current user's information
          UserSubmission.findOne({username: username}, function(err, doc) {
            doc.username = req.body.username;
            doc.income = req.body.income;
            doc.zipcode = req.body.zipcode;
            doc.gender = req.body.gender;
            doc.age = req.body.age;
            doc.rent = req.body.rent;
            doc.transportation = req.body.transportation;
            doc.eatingout = req.body.eatingout;
            doc.groceries = req.body.groceries;
            doc.clothes = req.body.clothes;
            doc.hygiene = req.body.hygiene;
            doc.travel = req.body.travel;  
            doc.gym = req.body.gym;
            doc.entertainment = req.body.entertainment;
            doc.save();
          });
          console.log('User information updated!');
        } else {          
          // creates a new data-point in the userData Schema, but MAY NOT BE SAVED
          // the req.body may not be an object yet, might be a JSON string
          var newData = req.body;
          utils.updateAverages(req.body);
          createUserSubmission(newData)
            .then(function(user) {
              console.log('sending back');
              res.status(201);
              res.send(user);              
            }, function(err) {
              console.log('DB submission error:', err);
            })
        }
      })
  },

};
