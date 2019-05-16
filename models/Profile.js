const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({});

module.exports = Profile = mongoose.model("profile", ProfileSchema);
