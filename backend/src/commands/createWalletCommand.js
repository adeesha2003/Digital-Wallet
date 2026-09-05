const Wallet = require("../models/Wallet");
const { saveEvent } = require("../events/eventStore");

const createWallet = async (userId, userName) => {

    // Check user details
    if (!userId) {
        throw new Error("User ID is required");
    }

    if (!userName || userName.trim() === "") {
        throw new Error("Username is required");
    }

    // Check whether this user already has a wallet
    const existingWallet = await Wallet.findOne({ userId });

    if (existingWallet) {
        throw new Error("This user already has a wallet");
    }

    // Create new wallet
    const wallet = await Wallet.create({
        userId: userId,
        userName: userName.trim(),
        balance: 0
    });

    // Store wallet creation event
    await saveEvent({
        walletId: wallet._id,
        type: "WalletCreated",
        amount: 0,
        description: `Wallet created for ${userName}`
    });

    return wallet;
};

module.exports = {
    createWallet
};