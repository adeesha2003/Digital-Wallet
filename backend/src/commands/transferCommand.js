const Wallet = require("../models/Wallet");
const { saveEvent } = require("../events/eventStore");

const transferMoney = async (fromWalletId, toWalletId, amount, userId) => {

    // Find sender wallet
    const fromWallet = await Wallet.findById(fromWalletId);

    if (!fromWallet) {
        throw new Error("Sender wallet not found");
    }

    // Make sure the sender wallet belongs to the logged-in user
    if (fromWallet.userId.toString() !== userId.toString()) {
        throw new Error("You can only transfer from your own wallet");
    }

    // Find receiver wallet
    const toWallet = await Wallet.findById(toWalletId);

    if (!toWallet) {
        throw new Error("Receiver wallet not found");
    }

    // Sender and receiver cannot be the same
    if (fromWallet._id.toString() === toWallet._id.toString()) {
        throw new Error("You cannot transfer money to your own wallet");
    }

    if (!amount || amount <= 0) {
        throw new Error("Transfer amount must be greater than 0");
    }

    if (fromWallet.balance < amount) {
        throw new Error("Insufficient balance");
    }

    // Store sender event
    const transferEvent = await saveEvent({
        walletId: fromWallet._id,
        type: "MoneyTransferred",
        amount: amount,
        fromWalletId: fromWallet._id,
        toWalletId: toWallet._id,
        description: `Transferred Rs. ${amount} to ${toWallet.userName}`
    });

    // Store receiver event
    const receiveEvent = await saveEvent({
        walletId: toWallet._id,
        type: "MoneyReceived",
        amount: amount,
        fromWalletId: fromWallet._id,
        toWalletId: toWallet._id,
        description: `Received Rs. ${amount} from ${fromWallet.userName}`
    });

    // Update both wallet balances
    fromWallet.balance -= amount;
    toWallet.balance += amount;

    await fromWallet.save();
    await toWallet.save();

    return {
        transferEvent,
        receiveEvent,
        fromWallet,
        toWallet
    };
};

module.exports = {
    transferMoney
};