const mongoose = require("mongoose");

const BrokerageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  phone: {
    type: String
  },
  logo: {
    type: String
  },
  address: {
    type: String
  },
  city: {
    type: String
  },
  state: {
    type: String
  },
  zip: {
    type: String
  }
});

module.exports = Brokerage = mongoose.model("brokerage", BrokerageSchema);
