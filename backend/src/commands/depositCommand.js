const Wallet = require("../models/Wallet");
const { saveEvent } = require("../events/eventStore");

const depositMoney = async (walletId, amount, userId) => {

    // Find the wallet
    const wallet = await Wallet.findById(walletId);

    if (!wallet) {
        throw new Error("Wallet not found");
    }

    // Make sure this wallet belongs to the logged-in user
    if (wallet.userId.toString() !== userId.toString()) {
        throw new Error("You can only deposit to your own wallet");
    }

    if (!amount || amount <= 0) {
        throw new Error("Deposit amount must be greater than 0");
    }

    // Store the event first
    const event = await saveEvent({
        walletId: wallet._id,
        type: "MoneyDeposited",
        amount: amount,
        description: `Deposited Rs. ${amount}`
    });

    // Update the current balance
    wallet.balance += amount;
    await wallet.save();

    return {
        event,
        wallet
    };
};

module.exports = {
    depositMoney
};