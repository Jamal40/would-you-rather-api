const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  author: {
    type: mongoose.ObjectId,
    reuired: true,
  },
  timestamp: {
    type: Date,
    reuired: true,
  },
  optionOne: {
    type: String,
    required: true,
  },
  optionTwo: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Question", questionSchema);
