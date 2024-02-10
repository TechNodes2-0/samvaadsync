import mongoose, { Schema, models } from "mongoose";

const MessageSchema = new Schema({
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

const Message = models.Message || mongoose.model("Message", MessageSchema);

export default Message;
