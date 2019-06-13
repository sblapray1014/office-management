const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator/check");

const Template = require("../../models/Template");
const auth = require("../../middleware/auth");

// @route   GET api/template
// @desc    get all templates by logged in user
// @access  Private
router.get("/", auth, async (req, res) => {
  try {
    const templates = await Template.find({
      brokerage: req.user.brokerage
    }).populate("brokerage");
    if (templates.length === 0) {
      return res.json({ msg: "Brokerage has no templates" });
    }

    res.json(templates);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server Error" });
  }
});

// @route   POST api/template
// @desc    create a template
// @access  Private
router.post(
  "/",
  [
    auth,
    [
      check("templateName", "Template name is require")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { brokerage } = req.user;
    const { templateName, title, subject, body, type } = req.body;

    try {
      let template = new Template({
        brokerage,
        templateName,
        title,
        subject,
        body,
        type
      }).populate("brokerage");

      await template.save();

      res.json(template);
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ msg: "Server Error" });
    }
  }
);

module.exports = router;
