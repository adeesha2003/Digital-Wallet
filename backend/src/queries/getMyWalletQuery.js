const Wallet = require("../models/Wallet");

const getMyWallet = async (userId) => {

    // Find the wallet belonging to the logged-in user
    const wallet = await Wallet.findOne({
        userId: userId
    });

    if (!wallet) {
        throw new Error("Wallet not found for this user");
    }

    return wallet;
};

module.exports = {
    getMyWallet
};