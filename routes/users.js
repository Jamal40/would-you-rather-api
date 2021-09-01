const router = require("express").Router();
const User = require("../models/User");

router.get("/", async (req, res) => {
  allUsers = await User.find({});
  await res.send(allUsers);
});

router.get("/:id", async (req, res) => {
  allUsers = await User.findById(req.params.id);
  await res.send(allUsers);
});

module.exports = router;
