var mongoose = require('mongoose');

var dataSchema = new mongoose.Schema({
  income: Number,
  rent: Number,
  transportation: Number,
  restaurants: Number,
  groceries: Number,
  clothes: Number,
  hygiene: Number,
  travel: Number,
  alcohol: Number,
  gym: Number,
  entertainment: Number
});

module.exports = mongoose.model('userData', dataSchema);