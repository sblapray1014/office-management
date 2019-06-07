const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  agent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true
  },
  taskName: {
    type: String,
    required: true
  },
  dueDate: {
    type: Date
  },
  description: {
    type: String
  },
  assignee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true
  },
  taskType: {
    type: String,
    required: true
  },
  template: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "templates"
  },
  completeDate: {
    type: Date
  },
  completedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },
  status: {
    //open, complete, in-progress, deleted
    type: String,
    default: "open"
  },
  notes: {
    type: String
  },
  brokerage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "brokerage",
    required: true
  }
});

module.exports = Task = mongoose.model("task", TaskSchema);
