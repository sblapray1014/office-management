const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator/check");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const config = require('config');
const User = require('../../models/User');
const auth = require('../../middleware/auth');

// @route   POST api/users
// @desc    register user
// @access  Public
router.post(
    "/",
    [
        check("name", "Name is required")
            .not()
            .isEmpty(),
        check("email", "Please include a valid email").isEmail(),
        check(
            "password",
            "Please enter a password with 6 or more characters"
        ).isLength({ min: 6 })
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, email, phone, password } = req.body;

        try {
            let user = await User.findOne({ email });

            if (user) {
                return res
                    .status(400)
                    .json({ errors: [{ message: "User already exists" }] });
            }

            user = new User({
                name,
                email,
                phone,
                password
            });

            const salt = await bcrypt.genSalt(10);

            user.password = await bcrypt.hash(password, salt);

            await user.save();

            const payload = {
                user: {
                    id: user.id
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
        } catch (error) {
            console.log("Error: " + error.message);
            res.status(500).send("Server Error");
        }
    }
);

// @route   POST api/users
// @desc    get user logged in user
// @access  Private
router.get('/', auth, async (req, res) => {
    const id = req.user.id;
    try {
        const user = await User.findById(id).select('-password');
        if (!user) {
            return res.status(400).json({ msg: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        console.log(error.message);
        res.status(500).json('Server Error');
    }
})


// @route   POST api/users/brokerage
// @desc    get user by logged in user's brokerage
// @access  Private

module.exports = router;
