var Data = require('../userSubmissions/model.js')

// seed averages to get database going based on Alex Bailey
var averages = {
  income: 100000,
  rent: 1200,
  transportation: 70,
  eatingout: 15,
  groceries: 35,
  clothes: 40,
  hygiene: 20,
  travel: 1000,
  entertainment: 100,
  gym: 40
};
// number of entries in the database defaults to the one Alex Bailey entry
var entries = 1;

exports.getAverages = function () {
  if (averages) {
    return averages;
  } else {
  	console.log('No averages');
  }
};

exports.createAverages = function(callback) {
  Data.find({}, function (err, data) {
    sums = {};
    if (data.length > 0) {
      for (var item in data[0]) {
      	sums[item] = data[0][item];
      }
      for (var i = 1; i < data.length; i++) {
        for (var item in data[i]) {
          sums[item] += data[i][item];
        }
      }
      averages = {};
      entries = data.length;
      for (var item in sums) {
        averages[item] = sums[item] / entries;
      }
    }
  });
};

exports.updateAverages = function (submission) {
  for (var item in averages) {
  	averages[item] = (averages[item] * entries + submission[item]) / (entries + 1);
  }
};