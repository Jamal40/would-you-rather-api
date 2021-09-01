const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema({
  questionId: {
    type: mongoose.ObjectId,
  },
  answer: {
    type: Number,
    max: 2,
    min: 1,
  },
});

module.exports = mongoose.model("Answer", answerSchema);
