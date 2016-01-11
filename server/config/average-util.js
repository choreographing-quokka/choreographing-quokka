var Data = require('../userSubmissions/model.js')

var averages = null;
var entries = 0;

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
  if (averages) {
  	for (var item in averages) {
  	  averages[item] = (averages[item] * entries + submission[item]) / (entries + 1);
  	}
  // return averages
  } else {
    console.log('no averages to update');
  }
};