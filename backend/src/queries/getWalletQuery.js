const Wallet = require("../models/Wallet");

const getWallet = async (walletId) => {

    const wallet = await Wallet.findById(walletId);

    if (!wallet) {
        throw new Error("Wallet not found");
    }

    return wallet;
};

module.exports = {
    getWallet
};