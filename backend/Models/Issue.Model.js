const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const issueSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  memberId: {
    type: String, // ID of the member who raised the issue (from JWT)
    required: true,
    index: true, // For faster queries by member
  },
  adminId: {
    type: String, // ID of the assigned admin (from JWT), null if unassigned
    default: null,
    index: true, // For faster queries by admin
  },
  status: {
    type: String,
    enum: ["Open", "Assigned", "Resolved", "Closed"], // Enforce valid states
    default: "Open",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Update `updatedAt` before saving
issueSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const Issue = mongoose.model("Issue", issueSchema);

module.exports = Issue;
