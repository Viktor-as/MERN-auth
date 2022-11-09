const { model, models, Schema } = require("mongoose");

const goalShema = Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    text: {
      type: String,
      required: [true, "Please add a text value"],
    },
  },
  { timestamps: true }
);

const Goal = models?.Goal || model("Goal", goalShema);

module.exports = Goal;
