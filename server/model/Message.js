const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  message: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now(),
  },
  type: {
    type: String,
    default: "text",
  },
  mineType: {
    type: String,
  },
  fileName: {
    type: String,
  },
});

module.exports = mongoose.model("Message", MessageSchema);
