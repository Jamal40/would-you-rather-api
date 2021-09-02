const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema({
  userId: {
    type: mongoose.ObjectId,
    required: true,
  },
  questionId: {
    type: mongoose.ObjectId,
    required: true,
  },
  answer: {
    type: Number,
    max: 2,
    min: 1,
  },
});

module.exports = mongoose.model("Answer", answerSchema);
