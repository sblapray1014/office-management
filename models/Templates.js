const mongoose = require("mongoose");

const TemplatesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    type: { //email or text
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
