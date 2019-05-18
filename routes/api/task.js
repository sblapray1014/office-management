const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator/check");

const Task = require("../../models/Task");
const User = require("../../models/User");
const auth = require("../../middleware/auth");

// @route   GET api/task
// @desc    get all tasks by logged in user
// @access  Private
router.get("/", auth, async (req, res) => {
    try {
        const tasks = await Task.find({ assignee: req.user.id });
        if (tasks.length === 0) {
            return res.json({ msg: "User has no tasks" });
        }

        res.json(tasks);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Server Error" });
    }
});

// @route   POST api/task
// @desc    create a task
// @access  Private
router.post(
    "/",
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
        const { id, brokerage } = req.user;

        const { taskName, assignee, taskType, status, notes, template, dueDate, description } = req.body;

        try {
            let task = new Task({
                user: id,
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

            await task.save();

            res.json(task);
        } catch (error) {
            console.log(error.message);
            res.status(500).json({ msg: 'Server Error' })
        }
    });

// @route   GET api/task/brokerage
// @desc    get all tasks by logged in user's brokerage
// @access  Private
router.get('/brokerage', auth, async (req, res) => {
    try {
        const tasks = await Task.find({ brokerage: req.user.brokerage });
        if (tasks.length === 0) {
            return res.json({ msg: 'Brokerage has no tasks' })
        }

        res.json(tasks);

    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Server Error' })
    }
}
);

// @route   GET api/task/:id
// @desc    get a task
// @access  Private
router.get("/:id", auth, async (req, res) => {
    const id = req.params.id;
    try {
        const task = await Task.findById(id);

        if (!task) {
            return res.status(400).json({ msg: "Task not found" });
        }

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

    const updates = {};
    updates.status = "complete";
    updates.completeDate = Date.now();
    updates.completedBy = req.user.id;

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

// @route   POST api/task/:id/uncomplete
// @desc    Uncompletes a task
// @access  Private
router.post("/:id/uncomplete", auth, async (req, res) => {
    const id = req.params.id;

    // const setUpdates = {};
    // const unsetUpdates = {};
    // setUpdates.status = "open";
    // unsetUpdates.completeDate = "";
    // unsetUpdates.completedBy = "";

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
