const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    match: [/^\S+@\S+$/, "Please provide a valid email"],
    unique: true,
  },
  hash: {
    type: String,
  },
  year: {
    type: Number,
    required: true,
  },
  languages: {
    type: [String],
    required: true,
  },
  communication: {
    type: [String],
    required: true,
  },
  country: {
    type: String,
  },
  hobbies: {
    type: [String],
    required: true,
  },
  goals_dreams: {
    type: String,
    required: true,
  },
  aboutme: {
    type: String,
    required: true,
  },
  socials: {
    type: [String],
    required: true,
  },
  login_method: {
    type: String,
    required: true,
  },
  matched_users: {
    type: [String],
    required: true,
    default: [],
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  state: new mongoose.Schema({
    isApproved: { type: Boolean, required: true },
    isChanged: { type: Boolean, required: true },
    text: { type: String, default: "" },
  }),
  isAgreedToReceiveEmail: {
    type: Boolean,
    default: false,
  },
  uniqueHash: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("user", userSchema);
