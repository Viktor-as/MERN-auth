const { model, models, Schema } = require("mongoose");

const taskShema = Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    task: {
      type: String,
      required: [true, "Please add a task value"],
    },
    users: {
      type: Array,
      required: [true, "Please assign users to this task"],
    },
    status: {
      type: String,
      required: [true, "Please add a status to this task"],
    },
    deadline: {
      type: Number,
      required: [true, "Please add a deadline to this task"],
    },
  },
  { timestamps: true }
);

const Task = models?.Task || model("Task", taskShema);

module.exports = Task;
