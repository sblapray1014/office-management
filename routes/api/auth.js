const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator/check");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const config = require("config");
const User = require("../../models/User");
const Brokerage = require("../../models/Brokerage");

// @route   GET api/auth
// @desc    Get Auth User
// @access  Private
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .select("-password")
      .populate("brokerage");
    res.json({ user });
  } catch (err) {
    console.log(err.message);
    res.status(500).json("Server Error");
  }
});

// @route   GET api/auth
// @desc    Get All Users
// @access  Private
router.get("/all", auth, async (req, res) => {
  try {
    const users = await User.find()
      .populate("user", ["name"])
      .populate("brokerage");
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   POST api/auth
// @desc    login user and get token
// @access  Public
router.post(
  "/",
  [
    check("email", "Please enter a valid email").isEmail(),
    check("password", "Password is required").exists()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ message: "Invalid Credentials" }] });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ message: "Invalid Credentials" }] });
      }
      const payload = {
        user: {
          id: user.id,
          brokerage: user.brokerage
        }
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 2160000 }, // <---------- UPDATE IN PRODUCTION CODE
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.log(err.msg);
      res.status(500).send("Server Error");
    }
  }
);

//NEEDS
//forgot password
//password reset

module.exports = router;
