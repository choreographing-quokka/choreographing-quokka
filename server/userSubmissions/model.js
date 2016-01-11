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
  zipcode: String,
  gender: String,
  age: Number, 

  // Data
  rent: Number,
  transportation: Number,
  eatingout: Number,
  groceries: Number,
  clothes: Number,
  hygiene: Number,
  travel: Number,  
  gym: Number,
  entertainment: Number
});

module.exports = mongoose.model('userSubmission', dataSchema);
