const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator/check");

const Brokerage = require("../../models/Brokerage");
const auth = require("../../middleware/auth");

// @route   GET api/brokerage
// @desc    get brokerage by logged in user
// @access  Private
router.get("/", auth, async (req, res) => {
  try {
    const brokerage = await Brokerage.find({ id: req.user.brokerage });
    if (!brokerage) {
      return res.json({ msg: "No brokerage found" });
    }

    res.json(brokerage);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server Error" });
  }
});

// @route   GET api/brokerage/all
// @desc    Get All Users
// @access  Private
router.get("/all", auth, async (req, res) => {
  try {
    const brokerages = await Brokerage.find().populate("brokerage", ["name"]);
    res.json(brokerages);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   POST api/brokerage
// @desc    create a brokerage
// @access  Public
router.post(
  "/",
  [
    check("name", "Brokerage name is require")
      .not()
      .isEmpty(),
    check("phone", "Phone must be a valid phone number").isMobilePhone()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, logo, address, city, state, zip, phone } = req.body;

    try {
      let brokerage = new Brokerage({
        name,
        logo,
        address,
        city,
        state,
        zip,
        phone
      });

      await brokerage.save();

      res.json(brokerage);
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ msg: "Server Error" });
    }
  }
);

// @route   POST api/brokerage
// @desc    create a brokerage
// @access  Private
router.post(
  "/update",
  [auth, [check("phone", "Must be a valid phone").isMobilePhone()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, logo, address, city, state, zip, phone } = req.body;

    const updates = {};
    if (name) updates.name = name;
    if (logo) updates.logo = logo;
    if (address) updates.address = address;
    if (city) updates.city = city;
    if (state) updates.state = state;
    if (zip) updates.zip = zip;
    if (phone) updates.phone = phone;

    const id = req.user.brokerage;
    try {
      let brokerage = await Brokerage.findOne(id);
      if (!brokerage) {
        res.status(400).json({ msg: "Brokerage not found" });
      }

      brokerage = await Brokerage.findOneAndUpdate(
        id,
        { $set: updates },
        { new: true, useFindAndModify: false }
      );
      res.json(brokerage);
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ msg: "Server Error" });
    }
  }
);

module.exports = router;
