const router = require("express").Router();
const User = require("../models/User");
const mongoose = require("mongoose");

router.get("/", async (req, res) => {
  const allUsers = await User.find({});
  await res.send(allUsers);
});

router.get("/leaderboards", async (req, res) => {
  const leaderboards = await User.aggregate([
    {
      $lookup: {
        from: "questions",
        localField: "_id",
        foreignField: "author",
        as: "addedQuestions",
      },
    },
    {
      $lookup: {
        from: "answers",
        localField: "_id",
        foreignField: "userId",
        as: "addedAnswers",
      },
    },
    {
      $project: {
        name: 1,
        avatarURL: 1,
        addedQuestionsCount: {
          $size: "$addedQuestions",
        },
        addedAnswersCount: {
          $size: "$addedAnswers",
        },
        totalScore: {
          $add: [
            {
              $size: "$addedAnswers",
            },
            {
              $size: "$addedQuestions",
            },
          ],
        },
      },
    },
    {
      $sort: {
        totalScore: -1,
      },
    },
    {
      $limit: 3,
    },
  ]);

  await res.send(leaderboards);
});

router.get("/:id", async (req, res) => {
  const user = await User.findById(req.params.id);
  await res.send(user);
});

module.exports = router;
