const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { generateUserData } = require("../utils/helper");
const tokenService = require("../services/token.service");
const router = express.Router({ mergeParams: true });

// /api/auth/signUp
// 1. get data from req (email, psw)
// 2. check if user already exists
// 3. hash password
// 4. create user
// 5. generate tokens

router.post("/signUp", async (req, res) => {
  try {
    const { email, password } = req.body;
    const exitingUser = User.findOne({ email: email }); // key = field
    if (exitingUser) {
      return res.status(400).json({
        error: {
          message: "EMAIL_EXIST",
          code: 400
        }
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await User.create({
      ...generateUserData(),
      ...req.body,
      password: hashedPassword
    });

    const tokens = tokenService.generate({ _id: newUser._id });

    res.status(201).send({ ...tokens, userId: newUser._id });
  } catch (e) {
    res.status(500).json({ message: "Server: error!" });
  }
});
router.post("/signInWithPassword", async (req, res) => {});
router.post("/token", async (req, res) => {});

module.exports = router;
