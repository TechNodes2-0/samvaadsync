const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  clerkId: { type: String, required: true },
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  picture: { type: String, required: true },
  joinedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", UserSchema);
