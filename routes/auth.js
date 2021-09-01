const router = require("express").Router();
const User = require("../models/User");
router.post("/register", async (req, res) => {
  console.log(req.body);
  const user = new User({
    name: req.body.name,
    avatarURL: req.body.avatarURL,
    password: req.body.password,
  });
  try {
    const savedUser = await user.save();
    res.send(savedUser);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});

router.post("/login", (req, res) => {
  res.send("Login");
});

module.exports = router;
