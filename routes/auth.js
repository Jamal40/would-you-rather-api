const router = require("express").Router();
const User = require("../models/User");
const { registerValidation } = require("../validation");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
  const { error } = registerValidation(req.body);

  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  //Checking if the user is already in the database
  const nameExist = await User.findOne({ name: req.body.name });
  if (nameExist) {
    return res.status(400).send("Name already exists");
  }

  //Hash passwords
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  //Create a new user
  const user = new User({
    name: req.body.name,
    avatarURL: req.body.avatarURL,
    password: hashedPassword,
  });
  try {
    const savedUser = await user.save();
    res.send({ user: savedUser._id });
  } catch (err) {
    console.log(err);

    res.status(400).send(err);
  }
});

router.post("/login", async (req, res) => {
  const { error } = registerValidation(req.body);

  if (error) {
    return res.status(400).send({ msg: error.details[0].message });
  }

  //Checking if the user is already in the database
  const user = await User.findOne({ name: req.body.name });
  if (!user) {
    return res.status(400).send({ msg: "Name doesn't exists" });
  }

  //Checking whether password is correct
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) {
    return res.status(400).send({ msg: "The password isn't correct" });
  }

  // Create and assign a token
  // console.log(process.env.TOKEN_SECRET);
  // const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  // res.header("auth-token", token).send(token);

  res.status(200).send("Logged in");
});

module.exports = router;
