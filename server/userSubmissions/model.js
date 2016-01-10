var mongoose = require('mongoose');

var dataSchema = new mongoose.Schema({
  // CHECK WITH JOTA IF THESE CORRESPOND
  username: String,
  date: {
    type: Date,
    default: Date.now
  },  
  income: Number,
  // Demographics
  zipcode: Number,
  gender: Number,
  age: Number, 

  // Data
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

module.exports = mongoose.model( 'userSubmission', dataSchema);
