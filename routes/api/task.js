const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator/check");
const config = require("config");
const sgMail = require("@sendgrid/mail");

const Task = require("../../models/Task");
const Template = require("../../models/Template");
const User = require("../../models/User");
const Brokerage = require("../../models/Brokerage");
const auth = require("../../middleware/auth");

sgMail.setApiKey(config.get("sendgridKey"));
const accountSid = config.get("twilioId");
const authToken = config.get("twilioAuth");
const client = require("twilio")(accountSid, authToken);

// @route   GET api/task
// @desc    get all tasks by logged in user
// @access  Private
router.get("/", auth, async (req, res) => {
  try {
    const tasks = await Task.find({ assignee: req.user.id })
      .populate("user")
      .populate("brokerage");

    if (tasks.length === 0) {
      return res.json({ msg: "User has no tasks" });
    }

    res.json(tasks);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server Error" });
  }
});

// @route   POST api/task/:user
// @desc    create a task
// @access  Private
router.post(
  "/:user",
  [
    auth,
    [
      check("taskName", "Task name is required")
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
    const user = req.params.user;
    const {
      taskName,
      assignee,
      taskType,
      status,
      notes,
      template,
      dueDate,
      description
    } = req.body;

    try {
      let task = new Task({
        user,
        taskName,
        taskType,
        assignee,
        brokerage,
        status,
        template,
        notes,
        dueDate,
        description
      });

      await task.save();

      res.json(task);
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ msg: "Server Error" });
    }
  }
);

// @route   GET api/task/brokerage
// @desc    get all tasks by logged in user's brokerage
// @access  Private
router.get("/brokerage", auth, async (req, res) => {
  try {
    const tasks = await Task.find({ brokerage: req.user.brokerage });
    if (tasks.length === 0) {
      return res.json({ msg: "Brokerage has no tasks" });
    }

    res.json(tasks);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server Error" });
  }
});

// @route   GET api/task/:id
// @desc    get a task
// @access  Private
router.get("/:id", auth, async (req, res) => {
  const id = req.params.id;
  try {
    let task = await Task.findById(id);

    if (!task) {
      return res.status(400).json({ msg: "Task not found" });
    }
    const user = await User.findById(task.user);
    const template = await Template.findById(task.template);

    task = {
      ...task._doc,
      templateInfo: { ...template._doc }
    };

    task.templateInfo.body = task.templateInfo.body.replace(
      /{{name}}/gi,
      user.name
    );

    res.json(task);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server Error" });
  }
});

// @route   POST api/task/:id
// @desc    Update a task
// @access  Private
router.post("/:id", auth, async (req, res) => {
  const id = req.params.id;
  const {
    taskName,
    dueDate,
    description,
    assignee,
    taskType,
    template
  } = req.body;

  const updates = {};
  if (taskName) updates.taskName = taskName;
  if (dueDate) updates.dueDate = dueDate;
  if (description) updates.description = description;
  if (assignee) updates.assignee = assignee;
  if (taskType) updates.taskType = taskType;
  if (template) updates.template = template;

  try {
    let task = await Task.findById(id);
    if (!task) {
      return res.status(400).json({ msg: "Task not found" });
    }

    task = await Task.findOneAndUpdate(
      id,
      { $set: updates },
      { new: true, useFindAndModify: false }
    );
    res.json(task);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server Error" });
  }
});

// @route   POST api/task/:id/complete
// @desc    Completes a task
// @access  Private
router.post("/:id/complete", auth, async (req, res) => {
  const id = req.params.id;
  const { body, subject } = req.body;

  const updates = {};
  updates.status = "complete";
  updates.completeDate = Date.now();
  updates.completedBy = req.user.id;

  try {
    let task = await Task.findById(id);
    if (!task) {
      return res.status(400).json({ msg: "Task not found" });
    }

    const user = await User.findById(task.user);
    const assignee = await User.findById(task.assignee);
    const brokerage = await Brokerage.findById(assignee.brokerage);

    if (task.taskType == "email") {
      let msg = {
        to: user.email,
        from: assignee.email,
        subject,
        text: body
      };
      sgMail.send(msg);
    }
    if (task.taskType == "text") {
      if (!brokerage.twilioPhone) {
        return res.status(400).json({ msg: "Texting number not set up" });
      }
      //send text through twilio
      console.log(brokerage.twilioPhone);
      let msg = {
        from: "+13852573286",
        body,
        to: user.phone
      };
      const sms = await client.messages.create(msg);
      console.log(sms);
    }

    task = await Task.findOneAndUpdate(
      { _id: id },
      { $set: updates },
      { new: true, useFindAndModify: false }
    );
    res.json(task);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server Error" });
  }
});

// @route   POST api/task/:id/uncomplete
// @desc    Uncompletes a task
// @access  Private
router.post("/:id/uncomplete", auth, async (req, res) => {
  const id = req.params.id;

  try {
    let task = await Task.findById(id);
    if (!task) {
      return res.status(400).json({ msg: "Task not found" });
    }

    task = await Task.findOneAndUpdate(
      id,
      {
        $set: { status: "open" },
        $unset: { completeDate: "", completedBy: "" }
      },
      { new: true, useFindAndModify: false }
    );
    res.json(task);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server Error" });
  }
});

module.exports = router;
