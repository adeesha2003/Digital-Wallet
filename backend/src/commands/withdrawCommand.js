const Wallet = require("../models/Wallet");
const { saveEvent } = require("../events/eventStore");

const withdrawMoney = async (walletId, amount, userId) => {

    // Find the wallet
    const wallet = await Wallet.findById(walletId);

    if (!wallet) {
        throw new Error("Wallet not found");
    }

    // Make sure this wallet belongs to the logged-in user
    if (wallet.userId.toString() !== userId.toString()) {
        throw new Error("You can only withdraw from your own wallet");
    }

    if (!amount || amount <= 0) {
        throw new Error("Withdraw amount must be greater than 0");
    }

    if (wallet.balance < amount) {
        throw new Error("Insufficient balance");
    }

    // Store the event
    const event = await saveEvent({
        walletId: wallet._id,
        type: "MoneyWithdrawn",
        amount: amount,
        description: `Withdrawn Rs. ${amount}`
    });

    // Update the current balance
    wallet.balance -= amount;
    await wallet.save();

    return {
        event,
        wallet
    };
};

module.exports = {
    withdrawMoney
};