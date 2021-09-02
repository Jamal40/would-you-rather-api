const router = require("express").Router();
const Question = require("../models/Question");
const { questionValidation } = require("../validation");

const mongoose = require("mongoose");
router.get("/", async (req, res) => {
  const allQuestions = await Question.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "author",
        foreignField: "_id",
        as: "author",
      },
    },
    {
      $unwind: {
        path: "$author",
      },
    },
    {
      $project: {
        _id: 1,
        author: {
          _id: 1,
          name: 1,
          avatarURL: 1,
        },
        timestamp: 1,
        optionOne: 1,
        optionTwo: 1,
      },
    },
  ]);
  res.send(allQuestions);
});

router.get("/:id", async (req, res) => {
  const allQuestions = await Question.aggregate([
    {
      $match: {
        _id: mongoose.Types.ObjectId(req.params.id),
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "author",
        foreignField: "_id",
        as: "author",
      },
    },
    {
      $unwind: {
        path: "$author",
      },
    },
    {
      $project: {
        _id: 1,
        author: {
          _id: 1,
          name: 1,
          avatarURL: 1,
        },
        timestamp: 1,
        optionOne: 1,
        optionTwo: 1,
      },
    },
  ]);
  res.send(allQuestions);
});

router.post("/", async (req, res) => {
  const { error } = questionValidation(req.body);

  if (error) {
    res.status(400).send(error.details[0].message);
  }

  const newQuestion = new Question({
    author: mongoose.Types.ObjectId(req.body.author),
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
