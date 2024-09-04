const mongoose = require("mongoose");

const matchSchema = new mongoose.Schema({
  users: {
    type: Object,
    of: new mongoose.Schema({
      approved: {
        type: Boolean,
        required: true,
      },
    }),
  },
  match_score: {
    type: String,
    required: true,
  },
  expiration_date: {
    type: Date,
    required: true,
  },
  friends_expiration_date: {
    type: Date,
  },

  isConnectionEmailSent: {
    type: Boolean,
    default: false,
  },

  isFriendEmailSent: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("matches", matchSchema);
