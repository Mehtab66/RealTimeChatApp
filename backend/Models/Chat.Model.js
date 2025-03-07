const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const chatSchema = new Schema({
  issueId: {
    type: Schema.Types.ObjectId, // Reference to the Issue model
    ref: "Issue",
    required: true,
    index: true, // For faster lookups by issue
  },
  senderId: {
    type: String, // User ID from JWT (admin or member)
    required: true,
  },
  text: {
    type: String,
    required: true,
    trim: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
    index: true, // For sorting messages by time
  },
});

const Chat = mongoose.model("Chat", chatSchema);

module.exports = Chat;
