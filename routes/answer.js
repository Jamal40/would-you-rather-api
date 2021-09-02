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

router.get("/user-answers-count/:id", async (req, res) => {
  const userId = mongoose.Types.ObjectId(req.params.id);

  const answersCount = await Answer.aggregate([
    {
      $match: {
        userId: userId,
      },
    },
    {
      $count: "answersCount",
    },
  ]);

  res.send(answersCount);
});

router.get("/option-one-count/:questionId", async (req, res) => {
  const questionId = mongoose.Types.ObjectId(req.params.questionId);

  const optionOneCount = await Answer.aggregate([
    {
      $match: {
        questionId: questionId,
        answer: 1,
      },
    },
    {
      $count: "optionOnecount",
    },
  ]);
});
module.exports = router;
