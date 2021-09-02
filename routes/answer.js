const router = require("express").Router();
const Question = require("../models/Answer");
const { answerValidation } = require("../validation");
const mongoose = require("mongoose");
const Answer = require("../models/Answer");

router.post("/", async (req, res) => {
  const { error } = answerValidation(req.body);

  if (error) {
    res.status(400).send(error.details[0].message);
  }

  const newAnswer = new Answer({
    userId: new mongoose.Types.ObjectId(req.body.userId),
    questionId: new mongoose.Types.ObjectId(req.body.questionId),
    answer: req.body.answer,
  });

  const savedAnswer = await newAnswer.save();

  res.send(savedAnswer);
});

module.exports = router;
