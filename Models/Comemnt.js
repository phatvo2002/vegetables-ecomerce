const mongoose = require("mongoose");
const commentSchema = new mongoose.Schema(
  {
    Content: {
      type: String,
      required: false,
    },
    idProduct: {
      type: String,
      require: true,
    },
    nameUser: {
      type: String,
      require: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Comments", commentSchema);
