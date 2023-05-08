const express = require("express");
const User = require("../models/user");

const router = express.Router();

router.post("/api/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "User with same email already exist!" })  //BAD REQUEST STATUS//
    }

    let user = new User({
      email,
      password,
      name
    })

    user = await user.save();
    res.status(201).json({ user: user, success: true })
  } catch (error) {
    res.status(500).json({error : error})
  }
});

module.exports = router;
