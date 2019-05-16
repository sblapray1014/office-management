const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    first: {
      type: String,
      required: true
    },
    last: {
      type: String,
      required: true
    }
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  address: {
    type: String
  },
  printerId: {
    type: String
  },
  password: {
    type: String,
    required: true
  },
  joinDate: {
    type: Date,
    required: true
  },
  anniversaryDate: {
    type: Date
  },
  inCoaching: {
    type: Boolean,
    default: false,
    required: true
  },
  onTeam: {
    type: Boolean,
    default: false
  },
  teamName: {
    type: String
  },
  social: {
    facebook: {
      type: String
    },
    instagram: {
      type: String
    }
  },
  date: {
    type: Date,
    default: Date.now
  },
  lastLoggedIn: {
    type: Date
  },
  userLevel: {
    type: Number
  }
});

module.exports = User = mongoose.model("user", UserSchema);
