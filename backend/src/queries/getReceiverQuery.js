const Wallet = require("../models/Wallet");

// Find receiver details using wallet ID
const getReceiver = async (walletId) => {

    const wallet = await Wallet.findById(walletId)
        .select("_id userName");

    if (!wallet) {
        throw new Error("Receiver wallet not found");
    }

    // Only return public receiver information
    // Do not return balance or other private details
    return {
        walletId: wallet._id,
        userName: wallet.userName
    };
};

module.exports = {
    getReceiver
};