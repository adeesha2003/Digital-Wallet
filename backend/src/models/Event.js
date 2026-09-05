const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    walletId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Wallet"
    },

    type: {
      type: String,
      required: true
    },

    amount: {
      type: Number,
      required: true
    },

    fromWalletId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Wallet",
      default: null
    },

    toWalletId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Wallet",
      default: null
    },

    description: {
      type: String,
      default: ""
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Event", eventSchema);