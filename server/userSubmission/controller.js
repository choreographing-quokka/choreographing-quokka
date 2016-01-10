var Data = require('./model.js');
    Q = require('q');
    util = require('../config/average-util');

var findUserInput = Q.nbind(Data.findOne, Data);

module.exports = {

  sendReport: function(req, res, next) {

    var username = req.body.username;
    console.log('Generating report for ', username);
    
    
    findUserInput({ username: username }).
      //expect the data to be an object with the latest user entry
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
      })
  }
};