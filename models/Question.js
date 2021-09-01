const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  author: mongoose.ObjectId,
  timestamp: Date,
  optionOne: String,
  optionTwo: String,
});

module.exports = mongoose.model("Question", questionSchema);
