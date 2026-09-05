const mongoose = require("mongoose");

const walletSchema = new mongoose.Schema(
  {
    // Connect this wallet with the logged-in user
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User"
    },

    userName: {
      type: String,
      required: true
    },

    balance: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Wallet", walletSchema);