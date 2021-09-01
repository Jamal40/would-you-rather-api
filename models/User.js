const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    min: 6,
    max: 255,
  },
  avatarURL: {
    type: String,
  },
  answers: {
    type: Object,
  },
  questions: {
    type: [String],
  },
  password: {
    type: String,
    required: true,
    max: 1024,
    min: 6,
  },
});

module.exports = mongoose.model("User", userSchema);
