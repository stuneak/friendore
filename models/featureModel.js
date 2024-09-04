const mongoose = require("mongoose");

const feature = new mongoose.Schema({
  aiRequest: {
    type: Boolean,
    default: false,
  },
  sendConnectionEmail: {
    type: Boolean,
    default: false,
  },
  sendFriendEmail: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("feature", feature);
