var Data = require('./model.js');
    Q = require('q');

var findUserInput = Q.nbind(Data.findOne, Data);

module.exports = {

  generateReport: function(req, res, next) {

    var username = req.body.username;

    findUserInput({ username: username }).
      then(function(data){
        if (!data) {
          next(new Error('No past submission found from this user'));
        } else {
          console.log(data);
          res.json(data);
        }
      }).
      fail(function (error) {
        next(error);
      })
  }
};