const mongoose = require("mongoose");

const TemplatesSchema = new mongoose.Schema({
  brokerage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "brokerage",
    required: true
  },
  title: {
    type: String,
    required: true
  },
  type: {
    //email or text
    type: String,
    required: true
  },
  subject: {
    type: String
  },
  body: {
    type: String,
    required: true
  }
});

module.exports = Templates = mongoose.model("templates", TemplatesSchema);
