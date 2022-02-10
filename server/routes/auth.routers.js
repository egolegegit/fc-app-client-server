const express = require("express");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const User = require("../models/User");
const { generateUserData } = require("../utils/helper");
const tokenService = require("../services/token.service");
const { json } = require("express");
const router = express.Router({ mergeParams: true });

// /api/auth/signUp
// 1. get data from req (email, psw)
// 2. check if user already exists
// 3. hash password
// 4. create user
// 5. generate tokens

router.post("/signUp", [
  check("email", "Email invalid").isEmail(),
  check("password", "Vin length password: 8").isLength({ min: 8 }),

  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          error: {
            message: "INVALID_DATA",
            code: 400,
            error: errors.array()
          }
        });
      }
      const { email, password } = req.body;
      const exitingUser = await User.findOne({ email: email }); // key = field
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
      await tokenService.save(newUser._id, tokens.refreshToken);

      res.status(201).send({ ...tokens, userId: newUser._id });
    } catch (e) {
      res.status(500).json({ message: "Server: error!" });
    }
  }
]);

// /api/auth/signInWithPassword
// 1. validate data from req (email, psw)
// 2. find user
// 3. compare hashed password
// 4. generate tokens
// 5. return data

router.post("/signInWithPassword", [
  check("email", "Email invalid").normalizeEmail().isEmail(),
  check("password", "Password not null").exists(),

  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          error: {
            message: "INVALID_DATA",
            code: 400,
            error: errors.array()
          }
        });
      }

      const { email, password } = req.body;
      const exitingUser = await User.findOne({ email: email }); // key = field
      if (!exitingUser) {
        return res.status(400).json({
          error: {
            message: "EMAIL_EXIST",
            code: 400
          }
        });
      }

      const isPasswordEqual = await bcrypt.compare(
        password,
        exitingUser.password
      );

      if (!isPasswordEqual) {
        return res.status(400).json({
          error: {
            message: "INVALID_PASSWORD",
            code: 400
          }
        });
      }

      const tokens = tokenService.generate({ _id: exitingUser._id });
      await tokenService.save(exitingUser._id, tokens.refreshToken);
      res.status(200).send({ ...tokens, userId: exitingUser._id });
    } catch (e) {
      res.status(500).json({ message: "Server: error!" });
    }
  }
]);

function isTokenInvalid(data, dbToken) {
  return !data || !dbToken || data._id !== dbToken?.user?.toString();
}

// /api/auth/token
// 1. refreshToken from req
// 2. validate refreshToken
// 3. is there in the database refreshToken
// 4. check if all the data is there
// 5. return data

router.post("/token", async (req, res) => {
  try {
    const { refresh_token: refreshToken } = req.body;
    const data = tokenService.validateRefresh(refreshToken);
    const dbToken = await tokenService.findToken(refreshToken);

    if (isTokenInvalid(data, dbToken)) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const tokens = tokenService.generate({ _id: data._id });
    await tokenService.save(data._id, tokens.refreshToken);

    res.status(200).send({ ...tokens, userId: data._id });
  } catch (e) {
    res.status(500).json({ message: "Server: error!" });
  }
});

module.exports = router;
