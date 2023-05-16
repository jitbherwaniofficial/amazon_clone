const express = require("express");
const User = require("../models/user");
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.post("/api/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "User with same email already exist!" })  //BAD REQUEST STATUS//
    }

    const hashedPassword = await bcryptjs.hash(password, 8);

    let user = new User({
      email,
      password: hashedPassword,
      name,
    })

    user = await user.save();
    res.status(200).json({ user: user, success: true })
  } catch (error) {
    res.status(500).json({error : error.message})
  }
});

router.post("/api/signin", async(req,res) => {
  try {
    const {email, password} = req.body;

    const user = await User.findOne({email});
    if (!user) {
      return res.status(400).json({msg: 'User with this email does not exist!'})
    }

    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({msg: 'Incorrect Password!'})
    }

    const token = jwt.sign({id: user._id},"passwordKey");
    res.json({token, ...user._doc});

  } catch (error) {
    res.status(500).json({error: error.message})
  }
})

module.exports = router;
