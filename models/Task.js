const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },
  taskName: {
    type: String
  },
  dueDate: {
    type: Date
  },
  description: {
    type: String
  },
  assignee: {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user"
    }
  },
  taskType: {
    type: String
  },
  template: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "templates"
  }
});

module.exports = Task = mongoose.model("task", TaskSchema);
