const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');

const Task = require('../../models/Task');
const auth = require('../../middleware/auth');

// @route   GET api/task
// @desc    get all tasks by logged in user
// @access  Private
router.get('/', auth, async (req, res) => {
    try {
        const tasks = await Task.find({ assignee: req.user.id });
        if (tasks.length === 0) {
            return res.json({ msg: 'User has no tasks' })
        }

        res.json(tasks);

    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Server Error' })
    }
})

// @route   POST api/task
// @desc    create a task
// @access  Private
router.post('/', [auth, [
    check('taskName', 'Task name is require').not().isEmpty()
]], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { user, taskName, assignee } = req.body;

    try {
        let task = new Task({
            user,
            taskName,
            assignee
        });

        await task.save();

        res.json(task);

    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Server Error' })
    }
})

module.exports = router;