const router = require("express").Router();
const Question = require("../models/Question");
const { questionValidation } = require("../validation");
const mongoose = require("mongoose");

router.get("/", async (req, res) => {
  const userId = mongoose.Types.ObjectId(req.query.userId);

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
      $lookup: {
        from: "answers",
        localField: "_id",
        foreignField: "questionId",
        as: "answer",
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
        answer: {
          $filter: {
            input: "$answer",
            as: "ans",
            cond: {
              $eq: ["$$ans.userId", userId],
            },
          },
        },
      },
    },
    {
      $unwind: {
        path: "$answer",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $sort: {
        timestamp: -1,
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

router.get("/stats/:id", async (req, res) => {
  const questionId = mongoose.Types.ObjectId(req.params.id);

  const resultQuestion = await Question.aggregate([
    {
      $match: {
        _id: questionId,
      },
    },
    {
      $lookup: {
        from: "answers",
        localField: "_id",
        foreignField: "questionId",
        as: "answers",
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
        author: 1,
        timestamp: 1,
        optionOne: 1,
        optionTwo: 1,
        optionOneCount: {
          $size: {
            $filter: {
              input: "$answers",
              as: "ans",
              cond: {
                $eq: ["$$ans.answer", 1],
              },
            },
          },
        },
        optionTwoCount: {
          $size: {
            $filter: {
              input: "$answers",
              as: "ans",
              cond: {
                $eq: ["$$ans.answer", 2],
              },
            },
          },
        },
      },
    },
  ]);

  res.send(resultQuestion[0]);
});

router.get("/questionsCount/:id", async (req, res) => {
  const authorId = mongoose.Types.ObjectId(req.params.id);
  const questionsMade = await Question.aggregate([
    {
      $match: {
        author: authorId,
      },
    },
    {
      $count: "questionsMade",
    },
  ]);

  res.send(questionsMade);
});

router.post("/", async (req, res) => {
  const { error } = questionValidation(req.body);

  if (error) {
    res.status(400).send(error.details[0].message);
  }

  try {
    const newQuestion = new Question({
      author: mongoose.Types.ObjectId(req.body.author),
      timestamp: new Date(),
      optionOne: req.body.optionOne,

      optionTwo: req.body.optionTwo,
    });
    const savedQuestion = await newQuestion.save();
    res.send(savedQuestion);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
