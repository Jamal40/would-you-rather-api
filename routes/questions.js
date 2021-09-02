const router = require("express").Router();
const Question = require("../models/Question");
const { questionValidation } = require("../validation");

const mongoose = require("mongoose");
router.get("/", async (req, res) => {
  const allQuestions = await Question.find({});
  res.send(allQuestions);
});

router.post("/", async (req, res) => {
  const { error } = questionValidation(req.body);

  if (error) {
    res.status(400).send(error.details[0].message);
  }

  const newQuestion = new Question({
    author: new mongoose.Types.ObjectId(req.body.id),
    timestamp: new Date(),
    optionOne: req.body.optionOne,
    optionTwo: req.body.optionTwo,
  });
  try {
    const savedQuestion = await newQuestion.save();
    res.send(savedQuestion);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
